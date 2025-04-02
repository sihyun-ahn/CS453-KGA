import type { PromptPexContext, PromptPexTest } from "./types.mts"
const dbg = host.logger("promptpex:resolvers")

export async function resolveTestId(
    files: PromptPexContext,
    test: PromptPexTest
) {
    const content = MD.content(files.prompt.content)
    const testid = await parsers.hash(
        content + test.testinput + (test.baseline ? ";baseline" : ""),
        {
            length: 7,
        }
    )
    return testid
}

export function resolvePromptArgs(
    files: PromptPexContext,
    test: PromptPexTest
) {
    const inputs = files.inputs
    const inputKeys = Object.keys(inputs)
    const expectedOutput = test["expectedoutput"]
    const testInput = test["testinput"]
    const args: Record<string, any> = {}
    if (inputKeys.length === 1) args[inputKeys[0]] = testInput
    else if (inputKeys.length > 1) {
        // not supported yet
        dbg(`multiple inputs not supported: %O`, { inputKeys, testInput })
        throw new Error("multiple inputs not supported yet")
    }
    return { inputs, args, testInput, expectedOutput }
}

export async function resolveRuleHash(files: PromptPexContext, rule: string) {
    const content = MD.content(files.prompt.content)
    const ruleid = await parsers.hash(content + rule, {
        length: 7,
    })
    return ruleid
}

export function resolveRule(
    rules: { rule: string; inverse?: boolean }[],
    test: PromptPexTest
) {
    const index = test.ruleid - 1
    const rule = rules[index]
    return { ruleid: index + 1, ...rule }
}

export async function resolvePromptId(files: PromptPexContext) {
    const content = MD.content(files.prompt.content)
    return parsers.hash(content, { length: 7 })
}
