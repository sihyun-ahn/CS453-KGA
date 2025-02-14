import { resolveTestPath } from "./filecache.mts";
import {
    modelOptions,
    parseAllRules,
    parseBaselineTests,
    parseOKERR,
    parseRulesTests,
} from "./parsers.mts";
import { resolvePromptArgs, resolveRule } from "./resolvers.mts";
import { evaluateTestResult } from "./testresulteval.mts";
import type {
    PromptPexContext,
    PromptPexOptions,
    PromptPexTest,
    PromptPexTestResult,
} from "./types.mts";

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

function updateTestResultCompliant(testRes: PromptPexTestResult) {
    testRes.compliance = parseOKERR(testRes.complianceText);
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
    if (file?.content && !force) {
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
    if (file)
        await workspace.writeText(
            file.filename,
            JSON.stringify(testRes, null, 2)
        );
    return testRes;
}
