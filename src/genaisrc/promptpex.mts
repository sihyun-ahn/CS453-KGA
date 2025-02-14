import { CONCURRENCY, PROMPT_CHECK_RULE_GROUNDED } from "./constants.mts";
import { outputPrompty } from "./output.mts";
import {
    checkLLMResponse,
    modelOptions,
    parsBaselineTestEvals,
    parseAllRules,
    parseBaselineTests,
    parseInputs,
    parseRuleEvals,
    parseRules,
    parseRulesTests,
    parseTestEvals,
    parseTestResults,
    tidyRulesFile,
} from "./parsers.mts";
import { checkPromptSafety } from "./safety.mts";
import { PromptPexContext, PromptPexOptions, PromptPexTest } from "./types.mts";

const TEST_EVALUATION_DIR = "test_evals";
const RULE_EVALUATION_DIR = "rule_evals";

export interface PromptPexTestResult {
    id: string;
    promptid: string;
    ruleid: number;
    rule: string;
    inverse?: boolean;
    baseline?: boolean;
    model: string;
    input: string;
    output: string;
    error?: string;

    compliance?: "ok" | "err";
    complianceText?: string;
}

export interface PromptPexTestEval {
    id: string;
    promptid: string;
    model?: string;
    rule: string;
    inverse?: boolean;
    input: string;
    coverage?: "ok" | "err";
    coverageEvalText?: string;
    coverageText?: string;
    validity?: "ok" | "err";
    validityText?: string;
    error?: string;
}

export interface PromptPexRuleEval {
    id: string;
    promptid: string;
    ruleid: number;
    rule: string;
    groundedText?: string;
    grounded?: "ok" | "err";
    error?: string;
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

export async function evaluateRuleGrounded(
    files: PromptPexContext,
    ruleid: number,
    rule: string,
    options?: PromptPexOptions
): Promise<PromptPexRuleEval> {
    const { id, promptid, file } = await resolveRuleEvalPath(files, rule);
    if (file.content) {
        const res = parsers.JSON5(file) as PromptPexRuleEval;
        if (res && !res.error) {
            res.ruleid = ruleid;
            return res;
        }
    }

    const description = MD.content(files.prompt.content);
    const res = await runPrompt(
        (ctx) => {
            ctx.importTemplate(PROMPT_CHECK_RULE_GROUNDED, {
                rule,
                description,
            });
        },
        {
            ...modelOptions("eval", options),
            choices: ["OK", "ERR"],
            label: `${files.name}> eval rule grounded ${rule.slice(0, 18)}...`,
        }
    );
    checkLLMResponse(res);

    const ruleEval: PromptPexRuleEval = {
        id,
        promptid,
        ruleid,
        rule,
        groundedText: res.text,
        grounded: parseOKERR(res.text),
        error: res.error?.message,
    };
    await workspace.writeText(file.filename, JSON.stringify(ruleEval, null, 2));
    return ruleEval;
}

export async function evaluateBaselineTests(
    files: PromptPexContext,
    options?: PromptPexOptions & { model?: ModelType; force?: boolean }
) {
    const { model } = options || {};
    const moptions = {
        ...modelOptions(model, options),
    };
    const inputSpec = files.inputSpec.content;
    const baselineTests = parseBaselineTests(files);

    const results = [];
    for (const baselineTest of baselineTests) {
        const { testinput, ...rest } = baselineTest;
        const resValidity = await runPrompt(
            (ctx) => {
                ctx.importTemplate(
                    "src/prompts/check_violation_with_input_spec.prompty",
                    {
                        input_spec: inputSpec,
                        test: testinput,
                    }
                );
            },
            {
                ...moptions,
                cache: "promptpex",
                choices: ["OK", "ERR"],
                label: `evaluate validity of baseline test ${baselineTest.testinput.slice(0, 42)}...`,
            }
        );
        const valid = parseOKERR(resValidity.text);
        results.push({
            input: testinput,
            validity: valid,
            validityText: resValidity.text,
            ...rest,
        });
    }
    return CSV.stringify(results, { header: true });
}

export async function evaluateRulesCoverage(
    files: PromptPexContext,
    options?: PromptPexOptions & { model?: ModelType; force?: boolean }
) {
    const { model } = options || {};
    const moptions = {
        ...modelOptions(model, options),
    };
    const baselineTests = parsBaselineTestEvals(files);
    const validBaselineTests = baselineTests.filter((t) => t.validity === "ok");

    const intent = files.intent.content;
    const rules = files.rules.content;

    const results: PromptPexTestEval[] = [];
    for (const baselineTest of validBaselineTests) {
        const res = await runPrompt(
            (ctx) => {
                ctx.importTemplate(
                    "src/prompts/evaluate_test_coverage.prompty",
                    {
                        intent,
                        rules,
                        testInput: baselineTest.input,
                    }
                );
            },
            {
                ...moptions,
                cache: "promptpex",
                label: `evaluate rules/baseline coverage for ${model}...`,
            }
        );
        results.push({
            ...baselineTest,
            // TODO: review
            coverage: res.text as any,
            //coverageText: res.text,
            //coverage: parseOKERR(res.text),
        });
    }
    files.ruleCoverages.content = CSV.stringify(results, { header: true });
    await workspace.writeText(
        files.ruleCoverages.filename,
        files.ruleCoverages.content
    );
    return results;
}

export async function evaluateRulesGrounded(
    files: PromptPexContext,
    options?: PromptPexOptions
) {
    const rules = parseRules(files.rules.content);
    if (!rules) throw new Error("No rules found");
    await outputPrompty(PROMPT_CHECK_RULE_GROUNDED, options);
    const res: PromptPexRuleEval[] = [];
    for (let i = 0; i < rules.length; ++i) {
        const ev = await evaluateRuleGrounded(files, i + 1, rules[i], options);
        res.push(ev);
    }

    files.ruleEvals.content = CSV.stringify(res, { header: true });
    await workspace.writeText(
        files.ruleEvals.filename,
        files.ruleEvals.content
    );
    return res;
}

export async function runTests(
    files: PromptPexContext,
    options?: {
        models?: ModelType[];
        force?: boolean;
        compliance?: boolean;
        q?: PromiseQueue;
    }
): Promise<string> {
    const { force, models = [], compliance } = options || {};
    const rulesTests = parseRulesTests(files.tests.content);
    const baselineTests = parseBaselineTests(files);
    const tests = [...rulesTests, ...baselineTests];
    if (!tests?.length) throw new Error("No tests found");

    console.log(`executing ${tests.length} tests with ${models.length} models`);
    const testResults: PromptPexTestResult[] = [];
    for (const model of models) {
        for (let testi = 0; testi < tests.length; ++testi) {
            const test = tests[testi];
            console.log(
                `${files.name}> ${model}: run test ${testi + 1}/${tests.length} ${test.testinput.slice(0, 42)}...`
            );
            const testRes = await runTest(files, test, {
                model,
                force,
                compliance,
            });
            if (testRes) testResults.push(testRes);
        }
    }

    return CSV.stringify(testResults, { header: true });
}

async function resolveTestId(files: PromptPexContext, test: PromptPexTest) {
    const content = MD.content(files.prompt.content);
    const testid = await parsers.hash(
        content + test.testinput + (test.baseline ? ";baseline" : ""),
        {
            length: 7,
        }
    );
    return testid;
}

async function resolveTestPath(
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

async function resolveRuleHash(files: PromptPexContext, rule: string) {
    const content = MD.content(files.prompt.content);
    const ruleid = await parsers.hash(content + rule, {
        length: 7,
    });
    return ruleid;
}

async function resolveRuleEvalPath(files: PromptPexContext, rule: string) {
    const hash = await resolveRuleHash(files, rule);
    const promptid = await resolvePromptId(files);
    const dir = path.join(files.dir, RULE_EVALUATION_DIR);
    const file = await workspace.readText(path.join(dir, `${hash}.json`));
    return { id: hash, promptid, file };
}

async function resolveTestEvalPath(
    files: PromptPexContext,
    test: PromptPexTest
) {
    const id = await resolveTestId(files, test);
    const promptid = await resolvePromptId(files);
    const dir = path.join(files.dir, TEST_EVALUATION_DIR);
    const file = await workspace.readText(path.join(dir, `${id}.json`));
    return { id, promptid, file };
}

function resolvePromptArgs(files: PromptPexContext, test: PromptPexTest) {
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

async function resolvePromptId(files: PromptPexContext) {
    const content = MD.content(files.prompt.content);
    return parsers.hash(content, { length: 7 });
}

function parseOKERR(text: string): "err" | "ok" | undefined {
    return /(^|\W)ERR\s*$/.test(text)
        ? "err"
        : /(^|\W)OK\s*$/.test(text)
          ? "ok"
          : undefined;
}

function updateTestResultCompliant(testRes: PromptPexTestResult) {
    testRes.compliance = parseOKERR(testRes.complianceText);
}

function updateTestEval(res: PromptPexTestEval) {
    res.validity = parseOKERR(res.validityText);
    if (!res.coverageEvalText) {
        delete res.coverage;
        delete res.coverageText;
    } else res.coverage = parseOKERR(res.coverageEvalText);
}

export async function runTest(
    files: PromptPexContext,
    test: PromptPexTest,
    options?: PromptPexOptions & {
        model?: ModelType;
        compliance?: boolean;
        force?: boolean;
    }
): Promise<PromptPexTestResult> {
    const { model, force, compliance } = options || {};
    const moptions = {
        ...modelOptions(model, options),
    };
    const { id, promptid, file } = await resolveTestPath(files, test, {
        model,
    });
    if (file.content && !force) {
        const res = parsers.JSON5(file) as PromptPexTestResult;
        if (res && !res.error && res.complianceText) {
            if (!res.model)
                throw new Error(`invalid test result ${file.filename}`);
            updateTestResultCompliant(res);
            res.baseline = test.baseline;
            return res;
        }
    }
    const { inputs, args, testInput } = resolvePromptArgs(files, test);
    const allRules = parseAllRules(files);
    const rule = resolveRule(allRules, test);
    if (!args)
        return {
            id,
            promptid,
            ...rule,
            baseline: test.baseline,
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
            label: `${files.name}> run test ${testInput.slice(0, 42)}...`,
        }
    );
    if (res.error) throw new Error(res.error.message);
    const actualOutput = res.text;
    const testRes: PromptPexTestResult = {
        id,
        promptid,
        ...rule,
        baseline: test.baseline,
        model: res.model,
        error: res.error?.message,
        input: testInput,
        output: actualOutput,
    } satisfies PromptPexTestResult;

    if (compliance) {
        testRes.compliance = undefined;
        testRes.complianceText = await evaluateTestResult(
            files,
            testRes,
            options
        );
        updateTestResultCompliant(testRes);
    }

    await workspace.writeText(file.filename, JSON.stringify(testRes, null, 2));
    return testRes;
}

export async function evaluateTestsQuality(
    files: PromptPexContext,
    options?: { force?: boolean }
): Promise<string> {
    const { force } = options || {};
    const tests = parseRulesTests(files.tests.content);
    if (!tests?.length) throw new Error("No tests found");

    console.log(`evaluating quality of ${tests.length} tests`);
    const testEvals: PromptPexTestEval[] = [];
    for (const test of tests) {
        const testEval = await evaluateTestQuality(files, test, { force });
        if (testEval) testEvals.push(testEval);
    }
    return CSV.stringify(testEvals, { header: true });
}

export async function evaluateTestQuality(
    files: PromptPexContext,
    test: PromptPexTest,
    options?: PromptPexOptions & { force?: boolean }
): Promise<PromptPexTestEval> {
    const { force } = options || {};
    const { id, promptid, file } = await resolveTestEvalPath(files, test);
    if (file.content && !force) {
        const res = parsers.JSON5(file) as PromptPexTestEval;
        updateTestEval(res);
        if (res && !res.error && res.coverage && res.validity) return res;
    }

    const intent = files.intent.content;
    if (!intent) throw new Error("No intent found");
    const inputSpec = files.inputSpec.content;
    if (!inputSpec) throw new Error("No input spec found");
    const allRules = parseAllRules(files);
    if (!allRules) throw new Error("No rules found");

    const rule = resolveRule(allRules, test);
    if (!rule && !test.baseline)
        throw new Error(`No rule found for test ${test["ruleid"]}`);

    const { args, testInput } = resolvePromptArgs(files, test);
    if (!args || testInput === undefined)
        return {
            id,
            promptid,
            ...rule,
            input: testInput,
            error: "invalid test input",
        } satisfies PromptPexTestEval;

    const moptions = {
        ...modelOptions("eval", options),
    };
    const [resCoverage, resValidity] = await Promise.all([
        runPrompt(
            (ctx) => {
                ctx.importTemplate(
                    "src/prompts/evaluate_test_coverage.prompty",
                    {
                        intent,
                        rules: allRules
                            .filter((r) => !r.inverse)
                            .map((r) => r.rule)
                            .join("\n"),
                        testInput,
                    }
                );
            },
            {
                ...moptions,
                //        logprobs: true,
                label: `${files.name}> evaluate coverage of test ${testInput.slice(0, 42)}...`,
            }
        ),
        runPrompt(
            (ctx) => {
                ctx.importTemplate(
                    "src/prompts/check_violation_with_input_spec.prompty",
                    {
                        input_spec: inputSpec,
                        test: testInput,
                    }
                );
            },
            {
                ...moptions,
                choices: ["OK", "ERR"],
                //        logprobs: true,
                label: `${files.name}> evaluate validity of test ${testInput.slice(0, 42)}...`,
            }
        ),
    ]);

    const error = [resCoverage.error?.message, resValidity?.error?.message]
        .filter((s) => !!s)
        .join(" ");
    const testEval: PromptPexTestEval = {
        id,
        promptid,
        model: resCoverage.model,
        ...rule,
        input: testInput,
        validityText: resValidity.text,
        validity: parseOKERR(resValidity.text),
        coverageText: resCoverage.text,
    } satisfies PromptPexTestEval;

    const coverageEvalText = await evaluateTestResult(
        files,
        {
            id: "cov-" + testEval.id,
            rule: testEval.rule,
            ruleid: test.ruleid,
            promptid,
            model: testEval.model,
            input: testEval.input,
            output: testEval.coverageText,
        },
        options
    );

    testEval.coverageEvalText = coverageEvalText;
    testEval.coverage = parseOKERR(testEval.coverageEvalText);
    testEval.error = error || undefined;

    await workspace.writeText(file.filename, JSON.stringify(testEval, null, 2));

    return testEval;
}

function resolveRule(
    rules: { rule: string; inverse?: boolean }[],
    test: PromptPexTest
) {
    const index = test.ruleid - 1;
    const rule = rules[index];
    return { ruleid: index + 1, ...rule };
}

async function evaluateTestResult(
    files: PromptPexContext,
    testResult: PromptPexTestResult,
    options: PromptPexOptions
): Promise<string> {
    const moptions = {
        ...modelOptions("eval", options),
    };

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
            choices: ["OK", "ERR"],
            //      logprobs: true,
            label: `${files.name}> evaluate test result ${testResult.model} ${testResult.input.slice(0, 42)}...`,
        }
    );
    checkLLMResponse(res);
    const evaluation = res.text;
    return evaluation;
}

export async function generateJSONReport(files: PromptPexContext) {
    const prompt = files.prompt.content;
    const inputSpec = files.inputSpec.content;
    const errors: string[] = [];
    const rules = parseRules(files.rules.content);
    const inverseRules = parseRules(files.inverseRules.content);
    const allRules = parseAllRules(files);
    const rulesTests = parseRulesTests(files.tests.content);
    const baseLineTests = parseBaselineTests(files);
    const testEvals = parseTestEvals(files);
    const ruleEvals = parseRuleEvals(files);
    const testResults = parseTestResults(files);
    if (files.tests.content && !rulesTests.length) {
        console.warn(`failed to parse tests in ${files.tests.filename}`);
        errors.push(`failed to parse tests in ${files.tests.filename}`);
    }

    const tests = [...rulesTests, ...baseLineTests].map((test) => {
        const rule = resolveRule(allRules, test);
        if (!rule && !test.baseline)
            errors.push(
                `test '${test.ruleid}' references non-existent rule in ${files.tests.filename}`
            );
        const res: any = {
            ...rule,
            ...test,
        };
        return res;
    });

    return {
        prompt,
        inputSpec,
        rules,
        inverseRules,
        ruleEvals,
        tests,
        testEvals,
        testResults,
        errors: errors.length ? errors : undefined,
    };
}

export function computeOverview(
    files: PromptPexContext,
    options?: { percent?: boolean }
) {
    const { percent } = options || {};
    const testResults = parseTestResults(files);
    const testEvals = parseTestEvals(files);
    const rules = parseAllRules(files);
    const ruleEvals = parseRuleEvals(files);
    const testResultsPerModels = testResults.reduce(
        (acc, result) => {
            if (!acc[result.model]) {
                acc[result.model] = [];
            }
            acc[result.model].push(result);
            return acc;
        },
        {} as Record<string, PromptPexTestResult[]>
    );
    const overview = Object.entries(testResultsPerModels).map(
        ([model, results]) => {
            const tests = results.filter((tr) => tr.rule).length;
            const norm = (v: number) =>
                percent ? Math.round((v / tests) * 100) + "%" : v;
            const baseline = results.filter((tr) => !tr.rule).length;
            const bnorm = (v: number) =>
                percent ? Math.round((v / baseline) * 100) + "%" : v;
            return {
                model,
                tests,
                ["tests compliant"]: norm(
                    results.filter((tr) => tr.rule && tr.compliance === "ok")
                        .length
                ),
                ["baseline compliant"]: bnorm(
                    results.filter((tr) => !tr.rule && tr.compliance === "ok")
                        .length
                ),
                ["tests positive"]: results.filter(
                    (tr) => tr.rule && !tr.inverse
                ).length,
                ["tests positive compliant"]: results.filter(
                    (tr) => tr.rule && !tr.inverse && tr.compliance === "ok"
                ).length,
                ["tests negative"]: results.filter(
                    (tr) => tr.rule && tr.inverse
                ).length,
                ["tests negative compliant"]: results.filter(
                    (tr) => tr.rule && tr.inverse && tr.compliance === "ok"
                ).length,
                baseline,
                ["tests valid"]: results.filter(
                    (tr) =>
                        tr.rule &&
                        testEvals.find((te) => te.id === tr.id)?.validity ===
                            "ok"
                ).length,
                ["tests valid compliant"]: results.filter(
                    (tr) =>
                        tr.rule &&
                        tr.compliance === "ok" &&
                        testEvals.find((te) => te.id === tr.id)?.validity ===
                            "ok"
                ).length,
            };
        }
    );
    return {
        testResults,
        testEvals,
        rules,
        ruleEvals,
        overview,
    };
}
