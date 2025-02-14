import {
    CONCURRENCY,
    RULE_EVALUATION_DIR,
    TEST_EVALUATION_DIR,
} from "./constants.mts";
import { checkPromptSafety } from "./safety.mts";
import type {
    PromptPexContext,
    PromptPexModelAliases,
    PromptPexOptions,
    PromptPexRuleEval,
    PromptPexTest,
    PromptPexTestEval,
    PromptPexTestResult,
} from "./types.mts";

export function modelOptions(
    modelAlias: PromptPexModelAliases,
    options: PromptPexOptions
): PromptGeneratorOptions {
    const { temperature = 1, modelAliases } = options || {};
    return {
        model: modelAliases?.[modelAlias] || modelAlias,
        temperature,
        responseType: "text",
        // RAI must be checked by an external service
        system: [],
    };
}

export function parseInputs(file: WorkspaceFile) {
    const frontmatter = MD.frontmatter(file.content) || {};
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

export function isUnassistedResponse(text: string) {
    return /i can't assist with that|i'm sorry/i.test(text);
}

export function checkLLMResponse(res: RunPromptResult) {
    if (res.error) throw new Error(res.error.message);
    if (isUnassistedResponse(res.text))
        throw new Error("LLM failed to generate response");
    return res.text;
}

export function tidyRules(text: string) {
    if (isUnassistedResponse(text)) return "";
    return text
        .split(/\n/g)
        .map((line) => line.replace(/^(\d+\.|_|-|\*)\s+/i, "")) // unneded numbering
        .filter((s) => !!s)
        .filter((s) => !/^\s*Rules:\s*$/i.test(s))
        .join("\n");
}

export function tidyRulesFile(file: WorkspaceFile) {
    if (file?.content) file.content = tidyRules(file.content);
    return file;
}

export function parseRules(rules: string) {
    return rules
        ? tidyRules(rules)
              .split(/\r?\n/g)
              .map((l) => l.trim())
              .filter((l) => !!l)
        : [];
}

export function parseRulesTests(text: string): PromptPexTest[] {
    if (!text) return [];
    if (isUnassistedResponse(text)) return [];
    const content = text.trim().replace(/\\"/g, '""');
    const rulesTests = content
        ? (CSV.parse(content, {
              delimiter: ",",
              repair: true,
          }) as PromptPexTest[])
        : [];
    return rulesTests.map((r) => ({ ...r, testinput: r.testinput || "" }));
}

export function parseTestResults(
    files: PromptPexContext
): PromptPexTestResult[] {
    const rules = parseRules(files.rules.content);
    const res = CSV.parse(files.testOutputs.content, {
        delimiter: ",",
    }) as PromptPexTestResult[];
    res?.forEach((r) => {
        r.inverse =
            r.ruleid !== null && parseInt(r.ruleid as any) > rules.length;
    });
    if (res.some((r) => !r.model))
        throw new Error(
            `invalid test results in ${files.testOutputs.filename}`
        );
    return res;
}

export function cleanBaselineTests(content: string) {
    const tests = parsers
        .unfence(content, "")
        .split(/\s*===\s*/g)
        .map((l) =>
            l
                .trim()
                .replace(/^(#+\s+)?(test case)( \d+)?:?$/gim, "")
                .trim()
        )
        .filter((l) => !!l);
    return tests;
}

export function parseBaselineTests(files: PromptPexContext): PromptPexTest[] {
    const tests = cleanBaselineTests(files.baselineTests.content).map(
        (l) => ({ testinput: l, baseline: true }) satisfies PromptPexTest
    );
    return tests;
}

export function parseTestEvals(files: PromptPexContext) {
    return CSV.parse(files.testEvals.content, {
        delimiter: ",",
    }) as PromptPexTestEval[];
}

export function parseRuleEvals(files: PromptPexContext) {
    return CSV.parse(files.ruleEvals.content, {
        delimiter: ",",
    }) as PromptPexRuleEval[];
}

export function parsBaselineTestEvals(files: PromptPexContext) {
    return CSV.parse(files.baselineTestEvals.content, {
        delimiter: ",",
    }) as PromptPexTestEval[];
}

export function parseAllRules(
    files: PromptPexContext
): { rule: string; inverse?: boolean }[] {
    const rules = parseRules(files.rules.content);
    const inverseRules = parseRules(files.inverseRules.content);
    const allRules = [
        ...rules.map((rule) => ({ rule })),
        ...inverseRules.map((rule) => ({ rule, inverse: true })),
    ];
    return allRules;
}

export async function loadPromptContext(
    out?: string
): Promise<PromptPexContext[]> {
    const q = host.promiseQueue(CONCURRENCY);
    return q.mapAll(
        env.files.filter((f) => /\.(md|txt|prompty)$/i.test(f.filename)),
        async (f) => await loadPromptFiles(f, { out })
    );
}

export async function loadPromptFiles(
    promptFile: WorkspaceFile,
    options?: {
        out?: string;
        disableSafety?: boolean;
    }
): Promise<PromptPexContext> {
    if (!promptFile)
        throw new Error(
            "No prompt file found, did you forget to the prompt file?"
        );
    const { out, disableSafety } = options || {};
    const filename = promptFile.filename;
    const basename = filename
        ? path.basename(filename).slice(0, -path.extname(filename).length)
        : "prompt";
    const dir = filename
        ? path.join(out || path.dirname(filename), basename)
        : "";
    const intent = path.join(dir, "intent.txt");
    const rules = path.join(dir, "rules.txt");
    const inverseRules = path.join(dir, "inverse_rules.txt");
    const inputSpec = path.join(dir, "input_spec.txt");
    const baselineTests = path.join(dir, "baseline_tests.txt");
    const tests = path.join(dir, "tests.csv");
    const testResults = path.join(dir, "test_results.csv");
    const testEvals = path.join(dir, "test_evals.csv");
    const ruleEvals = path.join(dir, "rule_evals.csv");
    const ruleCoverage = path.join(dir, "rule_coverage.csv");
    const baselineTestEvals = path.join(dir, "baseline_test_evals.csv");
    const frontmatter = MD.frontmatter(promptFile.content) || {};
    const meta: PromptPexContext["meta"] = frontmatter.promptPex || {};
    const inputs = parseInputs(promptFile);

    const res = {
        dir,
        name: basename,
        frontmatter,
        meta,
        inputs,
        prompt: promptFile,
        testOutputs: await workspace.readText(testResults),
        intent: await workspace.readText(intent),
        inputSpec: await workspace.readText(inputSpec),
        rules: tidyRulesFile(await workspace.readText(rules)),
        ruleEvals: await workspace.readText(ruleEvals),
        inverseRules: tidyRulesFile(await workspace.readText(inverseRules)),
        tests: await workspace.readText(tests),
        testEvals: await workspace.readText(testEvals),
        baselineTests: await workspace.readText(baselineTests),
        ruleCoverages: await workspace.readText(ruleCoverage),
        baselineTestEvals: await workspace.readText(baselineTestEvals),
    } satisfies PromptPexContext;

    if (meta.intent) res.intent.content = meta.intent;
    if (meta.inputSpec) res.inputSpec.content = meta.inputSpec;
    if (meta.outputRules) res.rules.content = meta.outputRules;
    if (meta.inverseOutputRules)
        res.inverseRules.content = meta.inverseOutputRules;
    if (!disableSafety) await checkPromptSafety(res);
    return res;
}

export function resolveRule(
    rules: { rule: string; inverse?: boolean }[],
    test: PromptPexTest
) {
    const index = test.ruleid - 1;
    const rule = rules[index];
    return { ruleid: index + 1, ...rule };
}

export async function resolvePromptId(files: PromptPexContext) {
    const content = MD.content(files.prompt.content);
    return parsers.hash(content, { length: 7 });
}

export function parseOKERR(text: string): "err" | "ok" | undefined {
    return /(^|\W)ERR\s*$/.test(text)
        ? "err"
        : /(^|\W)OK\s*$/.test(text)
          ? "ok"
          : undefined;
}

export async function resolveTestId(
    files: PromptPexContext,
    test: PromptPexTest
) {
    const content = MD.content(files.prompt.content);
    const testid = await parsers.hash(
        content + test.testinput + (test.baseline ? ";baseline" : ""),
        {
            length: 7,
        }
    );
    return testid;
}

export async function resolveTestPath(
    files: PromptPexContext,
    test: PromptPexTest,
    options: { model: string }
) {
    const { model } = options;
    const id = await resolveTestId(files, test);
    const promptid = await resolvePromptId(files);
    const dir = path.join(
        files.dir,
        model
            .replace(/^[^:]+:/g, "")
            .replace(/[^a-z0-9\.\-]/g, "_")
            .replace(/_+/g, "_")
            .replace(/^_+|_+$/g, "")
            .toLowerCase()
    );
    const file = await workspace.readText(path.join(dir, `${id}.json`));
    return { id, promptid, file };
}

export function resolvePromptArgs(
    files: PromptPexContext,
    test: PromptPexTest
) {
    const inputs = files.inputs;
    const inputKeys = Object.keys(inputs);
    const expectedOutput = test["expectedoutput"];
    const testInput = test["testinput"];
    const args: Record<string, any> = {};
    if (inputKeys.length === 1) args[inputKeys[0]] = testInput;
    else if (inputKeys.length > 1) {
        // not supported yet
        throw new Error("multiple inputs not supported yet");
        /*
    const testInputArgs =
      parsers.INI(testInput) ||
      parsers.YAML(testInput) ||
      parsers.JSON5(testInput);
    if (!testInputArgs) return undefined;
    for (const key of inputKeys) args[key] = testInputArgs[key];
    */
    }
    return { inputs, args, testInput, expectedOutput };
}

export async function resolveRuleEvalPath(
    files: PromptPexContext,
    rule: string
) {
    const hash = await resolveRuleHash(files, rule);
    const promptid = await resolvePromptId(files);
    const dir = path.join(files.dir, RULE_EVALUATION_DIR);
    const file = await workspace.readText(path.join(dir, `${hash}.json`));
    return { id: hash, promptid, file };
}

export async function resolveRuleHash(files: PromptPexContext, rule: string) {
    const content = MD.content(files.prompt.content);
    const ruleid = await parsers.hash(content + rule, {
        length: 7,
    });
    return ruleid;
}

export async function resolveTestEvalPath(
    files: PromptPexContext,
    test: PromptPexTest
) {
    const id = await resolveTestId(files, test);
    const promptid = await resolvePromptId(files);
    const dir = path.join(files.dir, TEST_EVALUATION_DIR);
    const file = await workspace.readText(path.join(dir, `${id}.json`));
    return { id, promptid, file };
}
