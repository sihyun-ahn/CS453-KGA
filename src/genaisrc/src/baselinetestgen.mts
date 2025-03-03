import { PROMPT_GENERATE_BASELINE_TESTS } from "./constants.mts"
import { outputPrompty } from "./output.mts"
import {
    parseRulesTests,
    modelOptions,
    isUnassistedResponse,
    checkLLMResponse,
    cleanBaselineTests,
} from "./parsers.mts"
import { PromptPexContext, PromptPexOptions } from "./types.mts"
const { generator } = env

export async function generateBaselineTests(
    files: PromptPexContext,
    options?: PromptPexOptions & { num?: number }
): Promise<string> {
    const { baselineModel = "baseline" } = options || {}
    const tests = parseRulesTests(files.tests.content)
    const { num = tests.length } = options || {}
    const context = MD.content(files.prompt.content)
    const pn = PROMPT_GENERATE_BASELINE_TESTS
    await outputPrompty(pn, options)
    const res = await generator.runPrompt(
        (ctx) => {
            ctx.importTemplate(pn, {
                num,
                prompt: context,
            })
        },
        {
            ...modelOptions(baselineModel, options),
            //      logprobs: true,
            label: `${files.name}> generate baseline tests`,
        }
    )

    if (isUnassistedResponse(res.text)) return ""
    checkLLMResponse(res)
    return cleanBaselineTests(res.text).join("\n===\n")
}
