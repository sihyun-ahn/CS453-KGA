import { resolvePromptArgs } from "./resolvers.mts"
import type { PromptPexContext, PromptPexTest } from "./types.mts"

export async function convertToTestData(
    files: PromptPexContext,
    tests: PromptPexTest[]
) {
    const inputSpec = files.inputSpec.content
    const rules = files.rules.content
    const intent = files.intent.content

    const testData = tests.map((testResult) => ({
        input: {
            parameters: JSON.stringify({
                ...resolvePromptArgs(files, testResult).args,
                rules,
                inputSpec,
                intent,
            }),
        },
        output: [],
    }))
    files.testData.content = JSON.stringify(testData, null, 2)
    if (files.writeResults) await workspace.writeFiles(files.testData)
}
