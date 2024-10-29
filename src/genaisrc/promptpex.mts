const CONCURRENCY = 5;
const RULES_NUM = 0;
const TESTS_NUM = 3;

export interface PromptPexContext {
  dir: string;
  basename: string;
  intent: WorkspaceFile;
  prompt: WorkspaceFile;
  rules: WorkspaceFile;
  inverseRules: WorkspaceFile;
  instructions: WorkspaceFile;
  inputSpec: WorkspaceFile;
  baselineTests: WorkspaceFile;
  tests: WorkspaceFile;
  testResults: WorkspaceFile;
  testEvals: WorkspaceFile;
}

export interface PromptPexTest {
  ["Rule ID"]: string;
  ["Test ID"]: string;
  ["Test Input"]: string;
  ["Expected Output"]: string;
  ["Reasoning"]: string;
}

export interface PromptPexTestResult {
  id: string;
  promptid: string;
  model: string;
  input: string;
  output: string;
  error?: string;
  evaluation?: string;
}

export interface PromptPexTestEval {
  id: string;
  promptid: string;
  model?: string;
  rule: string;
  inverse?: boolean;
  input: string;
  evaluation: string;
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
  const intent = path.join(dir, basename + ".intent.txt");
  const rules = path.join(dir, basename + ".rules.txt");
  const inverseRules = path.join(dir, basename + ".inverse_rules.txt");
  const instructions = path.join(dir, basename + ".instructions.txt");
  const inputSpec = path.join(dir, basename + ".input_spec.txt");
  const baselineTests = path.join(dir, basename + ".baseline_tests.txt");
  const tests = path.join(dir, basename + ".tests.csv");
  const testResults = path.join(dir, basename + ".test_results.csv");
  const testEvals = path.join(dir, basename + ".test_evals.csv");

  return {
    dir,
    basename,
    prompt: promptFile,
    intent: await workspace.readText(intent),
    inputSpec: await workspace.readText(inputSpec),
    rules: tidyRulesFile(await workspace.readText(rules)),
    inverseRules: tidyRulesFile(await workspace.readText(inverseRules)),
    instructions: await workspace.readText(instructions),
    baselineTests: await workspace.readText(baselineTests),
    tests: await workspace.readText(tests),
    testEvals: await workspace.readText(testEvals),
    testResults: await workspace.readText(testResults),
  } satisfies PromptPexContext;
}

function modelOptions(): PromptGeneratorOptions {
  return {
    model: "large",
    system: ["system.safety_harmful_content", "system.safety_jailbreak"],
  };
}

function isUnassistedResponse(text: string) {
  return /i can't assist with that/i.test(text);
}

function checkLLMResponse(res: RunPromptResult) {
  if (res.error) throw new Error(res.error.message);
  if (isUnassistedResponse(res.text))
    throw new Error("LLM failed to generate response");
  return res.text;
}

function tidyRules(text: string) {
  if (isUnassistedResponse(text)) return "";
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

export async function generateIntent(files: Pick<PromptPexContext, "prompt">) {
  const context = MD.content(files.prompt.content);
  const res = await runPrompt(
    (ctx) => {
      ctx.importTemplate("src/prompts/extract_intent.prompty", {
        prompt: context,
      });
    },
    {
      ...modelOptions(),
      label: "generate intent",
    }
  );
  checkLLMResponse(res);
  return res.text;
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
  const tests = parseTests(files);
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
  const allRules = parseAllRules(files);
  if (!allRules) throw new Error("No rules found");

  const context = MD.content(files.prompt.content);
  let repaired = false;
  const res = await runPrompt(
    (ctx) => {
      ctx.importTemplate("src/prompts/test.prompty", {
        input_spec: files.inputSpec.content,
        context,
        num,
        rule: allRules.map((r) => r.rule).join("\n"),
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
  options?: { models?: ModelType[]; force?: boolean; q?: PromiseQueue }
): Promise<string> {
  const { force, models, q = host.promiseQueue(CONCURRENCY) } = options || {};
  const tests = parseTests(files);
  if (!tests?.length) throw new Error("No tests found");

  console.log(`executing ${tests.length} tests with ${models.length} models`);
  const testResults: PromptPexTestResult[] = [];
  for (const model of models)
    await q.mapAll(tests, async (test) => {
      const testRes = await executeTest(files, test, { model, force });
      testResults.push(testRes);
    });
  return CSV.stringify(testResults, { header: true });
}

async function resolveTestId(
  files: Pick<PromptPexContext, "prompt">,
  test: PromptPexTest
) {
  const context = MD.content(files.prompt.content);
  const testid = await parsers.hash(context + test["Test Input"], {
    length: 7,
  });
  return testid;
}

async function resolveTestPath(
  files: Pick<PromptPexContext, "prompt" | "dir" | "basename">,
  test: PromptPexTest,
  options: { model: string }
) {
  const { model } = options;
  const id = await resolveTestId(files, test);
  const promptid = await resolvePromptId(files);
  const dir = path.join(
    files.dir,
    files.basename,
    model
      .replace(/^[^:]+:/g, "")
      .replace(/:/g, "_")
      .toLowerCase()
  );
  const file = await workspace.readText(path.join(dir, `${id}.json`));
  return { id, promptid, file };
}

async function resolveTestEvalPath(
  files: Pick<PromptPexContext, "prompt" | "dir" | "basename">,
  test: PromptPexTest
) {
  const id = await resolveTestId(files, test);
  const promptid = await resolvePromptId(files);
  const dir = path.join(files.dir, files.basename, "evals");
  const file = await workspace.readText(path.join(dir, `${id}.json`));
  return { id, promptid, file };
}

function resolvePromptArgs(
  files: Pick<PromptPexContext, "prompt">,
  test: PromptPexTest
) {
  const inputs = parseInputs(files.prompt);
  const inputKeys = Object.keys(inputs);
  const expectedOutput = test["Expected Output"];
  const testInput = test["Test Input"];
  const args: Record<string, any> = {};
  if (inputKeys.length === 1) args[inputKeys[0]] = testInput;
  else if (inputKeys.length > 1) {
    const testInputArgs =
      parsers.INI(testInput) ||
      parsers.YAML(testInput) ||
      parsers.JSON5(testInput);
    if (!testInputArgs) return undefined;
    for (const key of inputKeys) args[key] = testInputArgs[key];
  }
  return { inputs, args, testInput, expectedOutput };
}

async function resolvePromptId(files: Pick<PromptPexContext, "prompt">) {
  const content = MD.content(files.prompt.content);
  return parsers.hash(content, { length: 7 });
}

export async function executeTest(
  files: Pick<PromptPexContext, "prompt" | "dir" | "basename">,
  test: PromptPexTest,
  options?: { model?: ModelType; force?: boolean }
): Promise<PromptPexTestResult> {
  const { model, force } = options || {};
  const moptions = {
    ...modelOptions(),
  };
  const { id, promptid, file } = await resolveTestPath(files, test, {
    model,
  });
  if (file.content && !force) {
    const res = JSON.parse(file.content);
    if (!res.error) return res;
  }
  const { inputs, args, testInput, expectedOutput } = resolvePromptArgs(
    files,
    test
  );
  if (!args)
    return {
      id,
      promptid,
      model: "",
      error: "invalid test input",
      input: testInput,
      output: "invalid test input",
    } satisfies PromptPexTestResult;

  const res = await runPrompt(
    (ctx) => {
      // removes frontmatter
      ctx.importTemplate(files.prompt.filename, args);
      if (!inputs.length) ctx.writeText(testInput);
    },
    {
      ...moptions,
      model,
      label: `run test ${testInput.slice(0, 42)}...`,
    }
  );
  const actualOutput = res.text;
  const testRes = {
    id,
    promptid,
    model: res.model,
    error: res.error?.message,
    input: testInput,
    output: actualOutput,
  } satisfies PromptPexTestResult;

  await workspace.writeText(file.filename, JSON.stringify(testRes, null, 2));

  return testRes;
}

export async function evaluateTests(
  files: Pick<
    PromptPexContext,
    | "tests"
    | "prompt"
    | "dir"
    | "basename"
    | "testResults"
    | "intent"
    | "rules"
    | "inverseRules"
  >,
  options?: { force?: boolean; q: PromiseQueue }
): Promise<string> {
  const { force, q } = options || {};
  const tests = parseTests(files);
  if (!tests?.length) throw new Error("No tests found");

  console.log(`evaluating ${tests.length} tests`);
  const testEvals: PromptPexTestEval[] = [];
  await q.mapAll(tests, async (test) => {
    const testEval = await evaluateTest(files, test, { force });
    if (testEval) testEvals.push(testEval);
  });
  return CSV.stringify(testEvals, { header: true });
}

export async function evaluateTest(
  files: Pick<
    PromptPexContext,
    "prompt" | "rules" | "intent" | "dir" | "basename" | "inverseRules"
  >,
  test: PromptPexTest,
  options?: { force?: boolean }
): Promise<PromptPexTestEval> {
  const { force } = options || {};
  const moptions = {
    ...modelOptions(),
  };
  const { id, promptid, file } = await resolveTestEvalPath(files, test);
  if (file.content && !force) {
    const res = JSON.parse(file.content) as PromptPexTestEval;
    if (!res.error) return res;
    return res;
  }

  const intent = files.intent.content;
  if (!intent) throw new Error("No intent found");
  const rules = parseAllRules(files);
  if (!rules) throw new Error("No rules found");

  const rule = resolveRule(rules, test);
  if (!rule) throw new Error(`No rule found for test ${test["Rule ID"]}`);

  const { args, testInput } = resolvePromptArgs(files, test);
  if (!args)
    return {
      id,
      promptid,
      ...rule,
      input: testInput,
      evaluation: "",
      error: "invalid test input",
    } satisfies PromptPexTestEval;

  const res = await runPrompt(
    (ctx) => {
      ctx.writeText(
        `Task:
      ${intent}

      Rules:
      ${rules}`,
        { role: "system" }
      );
      ctx.$`Input:
      ${testInput}
      `;
    },
    {
      ...moptions,
      label: `evaluate test ${testInput.slice(0, 42)}...`,
    }
  );
  const testEval = {
    id,
    promptid,
    model: res.model,
    ...rule,
    input: testInput,
    evaluation: res.text,
    error: res.error?.message,
  } satisfies PromptPexTestEval;

  await workspace.writeText(file.filename, JSON.stringify(testEval, null, 2));

  return testEval;
}

function parseRules(rules: string) {
  return rules
    ? tidyRules(rules)
        .split(/\r?\n/g)
        .map((l) => l.trim())
        .filter((l) => !!l)
    : [];
}

function parseTests(files: Pick<PromptPexContext, "tests">): PromptPexTest[] {
  if (isUnassistedResponse(files.tests.content)) return [];
  const content = files.tests.content?.replace(/\\"/g, '""');
  let tests = content
    ? (CSV.parse(content, { delimiter: ",", repair: true }) as PromptPexTest[])
    : [];
  return tests;
}

function parseTestResults(
  files: Pick<PromptPexContext, "testResults">
): PromptPexTestResult[] {
  return CSV.parse(files.testResults.content, {
    delimiter: ",",
  }) as PromptPexTestResult[];
}

function parseBaselineTests(tests: string) {
  return tests
    ? tests
        .split(/\s*===\s*/g)
        .map((l) => l.trim())
        .filter((l) => !!l)
    : [];
}

function parseAllRules(
  files: Pick<PromptPexContext, "rules" | "inverseRules">
): { rule: string; inverse?: boolean }[] {
  const rules = parseRules(files.rules.content);
  const inverseRules = parseRules(files.inverseRules.content);
  const allRules = [
    ...rules.map((rule) => ({ rule })),
    ...inverseRules.map((rule) => ({ rule, inverse: true })),
  ];
  return allRules;
}

function resolveRule(
  rules: { rule: string; inverse?: boolean }[],
  test: PromptPexTest
) {
  const index = parseInt(test["Rule ID"]) - 1;
  const rule = rules[index];
  return rule;
}

export async function evaluateTestResults(
  files: Pick<
    PromptPexContext,
    "tests" | "prompt" | "dir" | "basename" | "testResults"
  >,
  options?: { force?: boolean; q?: PromiseQueue }
): Promise<string> {
  const { force, q = host.promiseQueue(CONCURRENCY) } = options || {};
  const tests = parseTests(files);
  if (!tests?.length) throw new Error("No tests found");
  const existingTestResults = parseTestResults(files);

  const models = Array.from(
    existingTestResults.reduce(
      (acc, tr) => acc.add(tr.model),
      new Set<string>()
    )
  );

  console.log(
    `evaluate ${tests.length} test results with ${models.length} models`
  );
  const testResults: PromptPexTestResult[] = [];
  for (const model of models)
    await q.mapAll(tests, async (test) => {
      const testRes = await evaluateTestResult(files, test, { model, force });
      testResults.push(testRes);
    });
  return CSV.stringify(testResults, { header: true });
}

export async function evaluateTestResult(
  files: Pick<PromptPexContext, "prompt" | "dir" | "basename">,
  test: PromptPexTest,
  options?: { model?: ModelType; force?: boolean }
): Promise<PromptPexTestResult> {
  const { model, force } = options || {};
  const moptions = {
    ...modelOptions(),
  };
  const { file } = await resolveTestPath(files, test, {
    model,
  });
  if (file.content) {
    const testResult = JSON.parse(file.content) as PromptPexTestResult;
    if (!testResult.error && testResult.evaluation && !force) return testResult;
  }
  const testResult = JSON.parse(file.content) as PromptPexTestResult;
  if (!testResult) {
    console.warn(`test result ${file.filename} has invalid content`);
    return undefined;
  }
  if (testResult.error) {
    console.warn(`test result ${file.filename} has error: ${testResult.error}`);
    return testResult;
  }

  const content = MD.content(files.prompt.content);
  const res = await runPrompt(
    (ctx) => {
      // removes frontmatter
      ctx.importTemplate(
        "src/prompts/check_violation_with_system_prompt.prompty",
        {
          system: content.replace(/^(system|user):/gm, ""),
          result: testResult.output,
        }
      );
    },
    {
      ...moptions,
      model: "large",
      label: `evaluate test result ${testResult.model} ${testResult.input.slice(0, 42)}...`,
    }
  );
  if (res.error)
    console.warn(
      `error evaluating test result ${file.filename}: ${res.error.message}`
    );
  const testRes = {
    ...testResult,
    evaluation: res.text,
    error: res.error?.message,
  } satisfies PromptPexTestResult;

  await workspace.writeText(file.filename, JSON.stringify(testRes, null, 2));

  return testRes;
}

export async function generateJSONReport(files: PromptPexContext) {
  const prompt = files.prompt.content;
  const inputSpec = files.inputSpec.content;
  const errors: string[] = [];
  const rules = parseRules(files.rules.content);
  const inverseRules = parseRules(files.inverseRules.content);
  const allRules = parseAllRules(files);
  const csvTests = parseTests(files);
  const baseLineTests = parseBaselineTests(files.baselineTests.content);
  if (files.tests.content && !csvTests.length) {
    console.warn(`failed to parse tests in ${files.tests.filename}`);
    errors.push(`failed to parse tests in ${files.tests.filename}`);
  }

  const tests = csvTests.map((test, index) => {
    const rule = resolveRule(allRules, test);
    if (!rule)
      errors.push(
        `test '${test["Test Input"]}' references non-existent rule in ${files.tests.filename}`
      );
    const res: any = {
      ...rule,
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
    `## ${files.basename} ([json](./${files.basename}.report.json))`,
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
  const fn = path.join(files.dir, files.basename + ".report.md");
  await workspace.writeText(fn, mdreport);
  return fn;
}

export async function generate(
  files: PromptPexContext,
  options?: {
    force?: boolean;
    forceIntent?: boolean;
    forceInputSpec?: boolean;
    forceTests?: boolean;
    forceTestEvals?: boolean;
    forceExecuteTests?: boolean;
    forceTestResultEvals?: boolean;
    models?: ModelType[];
    q?: PromiseQueue;
  }
) {
  const {
    force = false,
    forceTestEvals = false,
    forceIntent = false,
    forceInputSpec = false,
    forceTests = false,
    forceExecuteTests = false,
    forceTestResultEvals = false,
    models,
    q = host.promiseQueue(CONCURRENCY),
  } = options || {};

  console.log(`generating tests for ${files.basename}`);

  // generate baseline tests
  if (!files.baselineTests.content || force) {
    files.baselineTests.content = await generateBaselineTests(files);
    await workspace.writeText(
      files.baselineTests.filename,
      files.baselineTests.content
    );
  }

  // generate intent
  if (!files.intent.content || force || forceIntent) {
    files.intent.content = await generateIntent(files);
    await workspace.writeText(files.intent.filename, files.intent.content);
  }

  // generate input spec
  if (!files.inputSpec.content || force || forceInputSpec) {
    files.inputSpec.content = await generateInputSpec(files);
    await workspace.writeText(
      files.inputSpec.filename,
      files.inputSpec.content
    );
    files.tests.content = undefined;
    files.testResults.content = undefined;
  }

  // generate rules
  if (!files.rules.content || force) {
    files.rules.content = await generateRules(files);
    await workspace.writeText(files.rules.filename, files.rules.content);
    files.inverseRules.content = undefined;
    files.tests.content = undefined;
    files.testResults.content = undefined;
    files.testEvals.content = undefined;
  }

  // generate inverse rules
  if (!files.inverseRules.content || force) {
    const inverseRules = await generateInverseRules(files);
    if (!inverseRules) console.warn("No inverse rules generated");
    await workspace.writeText(files.inverseRules.filename, inverseRules);
    files.tests.content = undefined;
    files.testResults.content = undefined;
    files.testEvals.content = undefined;
  }

  // generate tests
  if (!files.tests.content || force || forceTests) {
    files.tests.content = await generateTests(files);
    await workspace.writeText(files.tests.filename, files.tests.content);
    files.testEvals.content = undefined;
  }

  // compute test evals
  if (!files.testEvals.content || force || forceTestEvals) {
    files.testEvals.content = await evaluateTests(files, {
      q,
      force: force || forceTestEvals,
    });
    await workspace.writeText(
      files.testEvals.filename,
      files.testEvals.content
    );
  }

  if (models?.length) {
    files.testResults.content = await executeTests(files, {
      models,
      force: force || forceExecuteTests,
      q,
    });
    await workspace.writeText(
      files.testResults.filename,
      files.testResults.content
    );
  }

  if (files.testResults.content) {
    files.testResults.content = await evaluateTestResults(files, {
      force: force || forceTestResultEvals,
      q,
    });
  }

  // final report
  const report = await generateReports(files);
  console.debug(`  report: ${report}`);
}
