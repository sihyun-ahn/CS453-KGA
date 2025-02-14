import { RULE_EVALUATION_DIR, TEST_EVALUATION_DIR } from "./constants.mts";
import { PromptPexContext, PromptPexTest } from "./types.mts";

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
