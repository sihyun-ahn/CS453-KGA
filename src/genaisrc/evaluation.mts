import { TEST_EVALUATION_DIR } from "./constants.mts";
import {
    modelOptions,
    checkLLMResponse,
    parseOKERR,
    parsBaselineTestEvals,
    parseBaselineTests,
    resolvePromptId,
    parseAllRules,
    parseRulesTests,
    resolveRule,
    resolveTestId,
    resolvePromptArgs,
} from "./parsers.mts";
import type {
    PromptPexContext,
    PromptPexOptions,
    PromptPexTest,
    PromptPexTestEval,
    PromptPexTestResult,
} from "./types.mts";

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

function updateTestEval(res: PromptPexTestEval) {
    res.validity = parseOKERR(res.validityText);
    if (!res.coverageEvalText) {
        delete res.coverage;
        delete res.coverageText;
    } else res.coverage = parseOKERR(res.coverageEvalText);
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

export async function evaluateTestResult(
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
