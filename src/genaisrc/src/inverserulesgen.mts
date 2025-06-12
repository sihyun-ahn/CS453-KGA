import { PROMPT_GENERATE_INVERSE_RULES } from "./constants.mts"
import { outputWorkflowDiagram, outputPrompty } from "./output.mts"
import {
    modelOptions,
    checkLLMResponse,
    tidyRules,
    parseRules,
} from "./parsers.mts"
import { measure } from "./perf.mts"
import type {
    PromptPexContext,
    PromptPexOptions,
    PromptPexRule,
} from "./types.mts"
const { generator } = env

export async function generateInverseOutputRules(
    files: PromptPexContext,
    options?: PromptPexOptions
): Promise<void> {
    const { rulesModel = "rules" } = options || {}
    const instructions =
        options?.instructions?.inverseOutputRules ||
        files.frontmatter?.instructions?.inverseOutputRules ||
        ""
    outputWorkflowDiagram(
        `OR["Output Rules (OR)"]
IOR["Inverse Output Rules (IOR)"]
OR --> IOR    
`,
        options
    )

    const pairedRules: PromptPexRule[] = JSON.parse(files.rules.content)
    const outputRules = pairedRules.map((p) => p.rule)
    const ruleMarkdown = outputRules.map((r, i) => `${i + 1}. ${r}`).join("\n")

    const pn = PROMPT_GENERATE_INVERSE_RULES
    await outputPrompty(pn, options)

    for (let i = 0; i < pairedRules.length; i++) {
        const rule = outputRules[i]
        console.debug(`Generating inverse rule for: ${rule}`)
        let inverseRule = ""
        let retry = 3
        do {
            const res = await measure("gen.inverseoutputrules.single", () =>
                generator.runPrompt(
                    (ctx) => {
                        ctx.importTemplate(pn, {
                            rule: `${rule}`,
                            instructions,
                        })
                    },
                    {
                        ...modelOptions(rulesModel, options),
                        label: `${files.name}> inverse rule [${i}]`,
                    }
                )
            )
            const resultText = tidyRules(checkLLMResponse(res))
            const parsed = parseRules(resultText)

            if (parsed.length > 0) {
                inverseRule = parsed[0]
            }
        } while (retry-- > 0 && !inverseRule)

        pairedRules[i].inverseRule = inverseRule
    }
    files.rules.content = JSON.stringify(pairedRules, null, 2)
    if (files.writeResults) await workspace.writeFiles([files.rules])
}
