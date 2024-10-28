const CONCURRENCY = 5;
const RULES_NUM = 0;
const TESTS_NUM = 3;

export interface PromptPexContext {
  dir: string;
  basename: string;
  prompt: WorkspaceFile;
  rules: WorkspaceFile;
  inverseRules: WorkspaceFile;
  instructions: WorkspaceFile;
  inputSpec: WorkspaceFile;
  baselineTests: WorkspaceFile;
  tests: WorkspaceFile;
  testResults: WorkspaceFile;
}

export interface PromptPexTest {
  ["Rule ID"]: string;
  ["Test ID"]: string;
  ["Test Input"]: string;
  ["Expected Output"]: string;
  ["Reasoning"]: string;
}

export interface PromptPexTestResult extends PromptPexTest {
  model: string;
  actualOutput: string;
  status: "success" | "failure" | "invalid-inputs";
  error?: string;
}

export async function loadPromptContext(): Promise<PromptPexContext[]> {
  const q = host.promiseQueue(CONCURRENCY);
  return q.mapAll(
    env.files.filter((f) => /\.(md|txt|prompty)$/i.test(f.filename)),
    async (f) => await loadPromptFiles(f)
  );
}

export async function loadPromptFiles(
  promptFile: WorkspaceFile
): Promise<PromptPexContext> {
  const dir = path.dirname(promptFile.filename);
  const basename = path
    .basename(promptFile.filename)
    .slice(0, -path.extname(promptFile.filename).length);
  const rules = path.join(dir, basename + ".rules.txt");
  const inverseRules = path.join(dir, basename + ".inverse_rules.txt");
  const instructions = path.join(dir, basename + ".instructions.txt");
  const inputSpec = path.join(dir, basename + ".input_spec.txt");
  const baselineTests = path.join(dir, basename + ".baseline_tests.txt");
  const tests = path.join(dir, basename + ".tests.csv");
  const testResults = path.join(dir, basename + ".test_results.csv");

  return {
    dir,
    basename,
    prompt: promptFile,
    rules: tidyRulesFile(await workspace.readText(rules)),
    inverseRules: tidyRulesFile(await workspace.readText(inverseRules)),
    instructions: await workspace.readText(instructions),
    inputSpec: await workspace.readText(inputSpec),
    baselineTests: await workspace.readText(baselineTests),
    tests: await workspace.readText(tests),
    testResults: await workspace.readText(testResults),
  } satisfies PromptPexContext;
}

function modelOptions(): PromptGeneratorOptions {
  return {
    model: "large",
    system: ["system.safety_harmful_content", "system.safety_jailbreak"],
  };
}

function checkLLMResponse(res: RunPromptResult) {
  if (res.error) throw new Error(res.error.message);
  if (/i can't assist with that request/i.test(res.text))
    throw new Error("LLM failed to generate response");
  return res.text;
}

function tidyRules(text: string) {
  if (/i can't assist with that/i.test(text)) return "";
  return text
    .split(/\n/g)
    .map((line) => line.replace(/^(\d+\.|_|-|\*)\s+/i, "")) // unneded numbering
    .filter((s) => !!s)
    .filter((s) => !/^\s*Rules:\s*$/i.test(s))
    .join("\n");
}

function tidyRulesFile(file: WorkspaceFile) {
  if (file?.content) file.content = tidyRules(file.content);
  return file;
}

export async function generateInputSpec(
  files: Pick<PromptPexContext, "prompt">
) {
  const context = MD.content(files.prompt.content);
  const res = await runPrompt(
    (ctx) => {
      ctx.importTemplate("src/prompts/input_spec.prompty", {
        context,
      });
    },
    {
      ...modelOptions(),
      label: "generate input spec",
    }
  );
  checkLLMResponse(res);
  return tidyRules(res.text);
}

export async function generateRules(
  files: Pick<PromptPexContext, "prompt">,
  options?: { numRules: number }
) {
  const { numRules = RULES_NUM } = options || {};
  // generate rules
  const input_data = MD.content(files.prompt.content);
  const res = await runPrompt(
    (ctx) => {
      ctx.importTemplate("src/prompts/rules_global.prompty", {
        num_rules: numRules,
        input_data,
      });
    },
    {
      ...modelOptions(),
      label: "generate rules",
    }
  );
  checkLLMResponse(res);
  return tidyRules(res.text);
}

export async function generateInverseRules(
  files: Pick<PromptPexContext, "prompt" | "rules" | "inverseRules">
) {
  const rule = MD.content(files.rules.content);
  const res = await runPrompt(
    (ctx) => {
      ctx.importTemplate("src/prompts/inverse_rule.prompty", {
        rule,
      });
    },
    {
      ...modelOptions(),
      label: "inverse rules",
    }
  );
  checkLLMResponse(res);
  return tidyRules(res.text);
}

export async function generateBaselineTests(
  files: Pick<PromptPexContext, "prompt" | "tests">,
  options?: { num?: number }
) {
  const tests = parseTests(files.tests.content);
  const { num = tests.length } = options || {};
  const context = MD.content(files.prompt.content);
  const res = await runPrompt(
    (ctx) => {
      ctx.importTemplate("src/prompts/baseline_test.prompty", {
        num,
        prompt: context,
      });
    },
    {
      ...modelOptions(),
      label: `generate baseline tests`,
    }
  );
  checkLLMResponse(res);
  return res.text;
}

export async function generateTests(
  files: Pick<
    PromptPexContext,
    "prompt" | "inputSpec" | "rules" | "inverseRules"
  >,
  options?: { num?: number }
) {
  const { num = TESTS_NUM } = options || {};

  if (!files.rules.content) throw new Error("No rules found");
  if (!files.inputSpec.content) throw new Error("No input spec found");
  const rules = [files.rules.content, files.inverseRules.content]
    .filter((s) => !!s)
    .join("\n");
  if (!rules) throw new Error("No rules found");

  const context = MD.content(files.prompt.content);
  let repaired = false;
  const res = await runPrompt(
    (ctx) => {
      ctx.importTemplate("src/prompts/test.prompty", {
        input_spec: files.inputSpec.content,
        context,
        num,
        rule: rules,
      });
      ctx.defChatParticipant((p, c) => {
        const last = c.at(-1)?.content;
        const csv = parseTests(last);
        if (!csv.length) {
          if (!repaired) {
            console.warn("invalid generated test format, trying to repair");
            repaired = true;
            p.$`The generated tests are not valid CSV. Please try again.`;
          } else {
            console.warn("invalid generated test format, skipping repair");
          }
        }
      });
    },
    {
      ...modelOptions(),
      label: `generate tests`,
    }
  );
  checkLLMResponse(res);
  return res.text;
}

function parseInputs(file: WorkspaceFile) {
  const frontmatter = MD.frontmatter(file.content);
  const inputs = frontmatter["inputs"] || {};
  // under specified inputs, try to find any missing inputs
  // using regex
  if (!Object.keys(inputs).length) {
    file.content.replace(/{{\s*([^}\s]+)\s*}}/g, (_, key) => {
      inputs[key] = { type: "string" };
      return "";
    });
  }

  return inputs;
}

export async function executeTests(
  files: Pick<
    PromptPexContext,
    "tests" | "prompt" | "dir" | "basename" | "testResults"
  >,
  options?: { models?: ModelType[]; force?: boolean; concurrency?: number }
): Promise<string> {
  const { force, models, concurrency = CONCURRENCY } = options || {};
  const tests = CSV.parse(files.tests.content) as PromptPexTest[];
  if (!tests?.length) throw new Error("No tests found");

  console.log(`executing ${tests.length} tests with ${models.length} models`);
  const q = host.promiseQueue(concurrency);
  const testResults: PromptPexTestResult[] = [];
  for (const model of models)
    await q.mapAll(tests, async (test) => {
      const testRes = await executeTest(files, test, { model, force });
      testResults.push(testRes);
    });
  return CSV.stringify(testResults, { header: true });
}

export async function executeTest(
  files: Pick<PromptPexContext, "prompt" | "dir" | "basename">,
  test: PromptPexTest,
  options?: { model?: ModelType; force?: boolean }
) {
  const { force } = options || {};
  const inputs = parseInputs(files.prompt);
  const inputKeys = Object.keys(inputs);
  const moptions = {
    ...modelOptions(),
  };
  if (options?.model) moptions.model = options.model;

  const context = MD.content(files.prompt.content);
  const testid = await parsers.hash(context + test["Test Input"], {
    length: 7,
  });
  const testf = path.join(
    files.dir,
    files.basename,
    moptions.model.replace(/^[^:]+:/g, "_").toLowerCase(),
    `${testid}.json`
  );

  const cached = await workspace.readText(testf);
  if (cached.content && !force) return JSON.parse(cached.content);

  //const ruleId = test["Rule ID"];
  const expectedOutput = test["Expected Output"];
  const testInput = test["Test Input"];
  const args: Record<string, any> = {};
  if (inputKeys.length === 1) args[inputKeys[0]] = testInput;
  else if (inputKeys.length > 1) {
    const testInputArgs =
      parsers.INI(testInput) ||
      parsers.YAML(testInput) ||
      parsers.JSON5(testInput);
    if (!testInputArgs) {
      return {
        ...test,
        model: moptions.model,
        actualOutput: "invalid test input",
        status: "invalid-inputs",
        error: "invalid test input",
      } satisfies PromptPexTestResult;
    }
    for (const key of inputKeys) args[key] = testInputArgs[key];
  }
  const res = await runPrompt(
    (ctx) => {
      ctx.importTemplate(files.prompt.filename, args);
      if (!inputs.length) ctx.writeText(testInput);
    },
    {
      ...moptions,
      label: `test ${testInput.slice(0, 42)}...`,
    }
  );
  const actualOutput = res.text;
  const testRes = {
    ...test,
    model: res.model,
    actualOutput: actualOutput,
    status: actualOutput === expectedOutput ? "success" : "failure",
    error: res.error?.message,
  } satisfies PromptPexTestResult;

  await workspace.writeText(testf, JSON.stringify(testRes, null, 2));

  return testRes;
}

function parseRules(rules: string) {
  return rules
    ? tidyRules(rules)
        .split(/\r?\n/g)
        .map((l) => l.trim())
        .filter((l) => !!l)
    : [];
}

function parseTests(tests: string): PromptPexTest[] {
  tests = tests?.replace(/\\"/g, '""');
  return tests ? (CSV.parse(tests, { delimiter: "," }) as PromptPexTest[]) : [];
}

function parseBaselineTests(tests: string) {
  return tests
    ? tests
        .split(/\s*===\s*/g)
        .map((l) => l.trim())
        .filter((l) => !!l)
    : [];
}

export async function generateJSONReport(files: PromptPexContext) {
  const prompt = files.prompt.content;
  const inputSpec = files.inputSpec.content;
  const errors: string[] = [];
  const rules = parseRules(files.rules.content);
  const inverseRules = parseRules(files.inverseRules.content);
  const allRules = [...rules, ...inverseRules];
  const csvTests = parseTests(files.tests.content);
  const baseLineTests = parseBaselineTests(files.baselineTests.content);
  if (files.tests.content && !csvTests.length) {
    console.warn(`failed to parse tests in ${files.tests.filename}`);
    errors.push(`failed to parse tests in ${files.tests.filename}`);
  }

  const tests = csvTests.map((test, index) => {
    const ruleId = parseInt(test["Rule ID"]);
    const res: any = {
      rule: allRules[ruleId],
      inverse: ruleId >= rules.length ? true : undefined,
      input: test["Test Input"],
      expected: test["Expected Output"],
      reasoning: test["Reasoning"],
    };
    return res;
  });

  return {
    prompt,
    inputSpec,
    rules,
    inverseRules,
    baseLineTests,
    tests,
    errors: errors.length ? errors : undefined,
  };
}

export async function generateMarkdownReport(files: PromptPexContext) {
  const res: string[] = [
    `## [${files.basename}](${files.prompt.filename}) ([json](./${files.basename}.report.json))`,
    ``,
  ];
  const appendFile = (file: WorkspaceFile) => {
    const ext = path.extname(file.filename).slice(1);
    const lang =
      {
        prompty: "md",
      }[ext] || ext;
    res.push(
      "",
      `### [${path.basename(file.filename).slice(files.basename.length + 1)}](./${path.basename(file.filename)})`,
      ""
    );

    if (lang === "csv") res.push(CSV.markdownify(CSV.parse(file.content)));
    else res.push(`\`\`\`\`\`${lang}`, file.content || "", `\`\`\`\`\``, ``);
  };

  for (const file of Object.values(files))
    if (typeof file === "object" && file.filename && file.content)
      appendFile(file as WorkspaceFile);

  return res.join("\n");
}

export async function generateReports(files: PromptPexContext) {
  const jsonreport = await generateJSONReport(files);
  await workspace.writeText(
    path.join(files.dir, files.basename + ".report.json"),
    JSON.stringify(jsonreport, null, 2)
  );

  const mdreport = await generateMarkdownReport(files);
  await workspace.writeText(
    path.join(files.dir, files.basename + ".report.md"),
    mdreport
  );
}

export async function generate(
  files: PromptPexContext,
  options?: {
    force?: boolean;
    forceInputSpec?: boolean;
    forceTests?: boolean;
    q: PromiseQueue;
  }
) {
  const {
    force = false,
    forceInputSpec = false,
    forceTests = false,
    q,
  } = options || {};

  // generate input spec
  if (!files.inputSpec.content || force || forceInputSpec) {
    files.inputSpec.content = await generateInputSpec(files);
    await workspace.writeText(
      files.inputSpec.filename,
      files.inputSpec.content
    );
    files.tests.content = undefined;
    files.testResults.content = undefined;
  } else {
    console.log(
      `input spec ${files.inputSpec.filename} already exists. Skipping generation.`
    );
  }

  // generate rules
  if (!files.rules.content || force) {
    files.rules.content = await generateRules(files);
    await workspace.writeText(files.rules.filename, files.rules.content);
    files.inverseRules.content = undefined;
    files.tests.content = undefined;
    files.testResults.content = undefined;
  } else {
    console.log(
      `rules ${files.rules.filename} already exists. Skipping generation.`
    );
  }

  // generate inverse rules
  if (!files.inverseRules.content || force) {
    const inverseRules = await generateInverseRules(files);
    if (!inverseRules) console.warn("No inverse rules generated");
    await workspace.writeText(files.inverseRules.filename, inverseRules);
    files.tests.content = undefined;
    files.testResults.content = undefined;
  } else {
    console.log(
      `inverse rules ${files.inverseRules.filename} already exists. Skipping generation.`
    );
  }

  // generate tests
  if (!files.tests.content || force || forceTests) {
    files.tests.content = await generateTests(files);
    await workspace.writeText(files.tests.filename, files.tests.content);
  } else {
    console.log(
      `tests ${files.tests.filename} already exists. Skipping generation.`
    );
  }

  // generate baseline tests
  if (!files.baselineTests.content || force) {
    files.baselineTests.content = await generateBaselineTests(files);
    await workspace.writeText(
      files.baselineTests.filename,
      files.baselineTests.content
    );
  } else {
    console.log(
      `tests ${files.baselineTests.filename} already exists. Skipping generation.`
    );
  }

  await generateReports(files);
}
