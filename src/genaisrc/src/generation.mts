import {
    PROMPT_GENERATE_INPUT_SPEC,
    PROMPT_GENERATE_INTENT,
    PROMPT_GENERATE_RULES,
    PROMPT_GENERATE_INVERSE_RULES,
    PROMPT_GENERATE_BASELINE_TESTS,
    PROMPT_GENERATE_TESTS,
    RULES_NUM,
    TESTS_NUM,
} from "./constants.mts"
import { outputWorkflowDiagram, outputPrompty } from "./output.mts"
import {
    modelOptions,
    checkLLMResponse,
    tidyRules,
    isUnassistedResponse,
    cleanBaselineTests,
} from "./parsers.mts"
import { parseRulesTests, parseAllRules } from "./parsers.mts"
import { PromptPexContext, PromptPexOptions } from "./types.mts"
const { generator, output } = env

export async function generateInputSpec(
    files: PromptPexContext,
    options?: PromptPexOptions
) {
    const instructions = options?.instructions?.inputSpec || ""
    outputWorkflowDiagram(
        `PUT(["Prompt Under Test (PUT)"])
IS["Input Specification (IS)"]
PUT --> IS`,
        options
    )

    const { rulesModel = "rules" } = options || {}
    const context = MD.content(files.prompt.content)
    const pn = PROMPT_GENERATE_INPUT_SPEC
    await outputPrompty(pn, options)
    const res = await generator.runPrompt(
        (ctx) => {
            ctx.importTemplate(pn, {
                context,
                instructions,
            })
        },
        {
            ...modelOptions(rulesModel, options),
            //      logprobs: true,
            label: `${files.name}> generate input spec`,
        }
    )
    checkLLMResponse(res)
    return tidyRules(res.text)
}

export async function generateIntent(
    files: PromptPexContext,
    options?: PromptPexOptions
) {
    const { rulesModel = "rules" } = options || {}
    const context = MD.content(files.prompt.content)
    const instructions = options?.instructions?.intent || ""
    const pn = PROMPT_GENERATE_INTENT
    await outputPrompty(pn, options)
    const res = await generator.runPrompt(
        (ctx) => {
            ctx.importTemplate(pn, {
                prompt: context,
                instructions,
            })
        },
        {
            ...modelOptions(rulesModel, options),
            //      logprobs: true,
            label: `${files.name}> generate intent`,
        }
    )
    checkLLMResponse(res)
    return res.text
}

export async function generateOutputRules(
    files: PromptPexContext,
    options?: PromptPexOptions & { numRules?: number }
) {
    const { numRules = RULES_NUM, rulesModel = "rules" } = options || {}
    const instructions = options?.instructions?.outputRules || ""

    outputWorkflowDiagram(
        `PUT(["Prompt Under Test (PUT)"])
OR["Output Rules (OR)"]

PUT --> OR        
`,
        options
    )

    // generate rules
    const input_data = MD.content(files.prompt.content)
    const pn = PROMPT_GENERATE_RULES
    await outputPrompty(pn, options)
    const res = await generator.runPrompt(
        (ctx) => {
            ctx.importTemplate(pn, {
                num_rules: numRules,
                input_data,
                instructions,
            })
        },
        {
            ...modelOptions(rulesModel, options),
            //      logprobs: true,
            label: `${files.name}> generate rules`,
        }
    )
    checkLLMResponse(res)
    const rules = tidyRules(res.text)
    return rules
}

export async function generateInverseOutputRules(
    files: PromptPexContext,
    options?: PromptPexOptions
) {
    const { rulesModel = "rules" } = options || {}
    const instructions = options?.instructions?.inverseOutputRules || ""
    outputWorkflowDiagram(
        `OR["Output Rules (OR)"]
IOR["Inverse Output Rules (IOR)"]
OR --> IOR    
`,
        options
    )

    const rule = MD.content(files.rules.content)
    const pn = PROMPT_GENERATE_INVERSE_RULES
    await outputPrompty(pn, options)
    const res = await generator.runPrompt(
        (ctx) => {
            ctx.importTemplate(pn, {
                rule,
                instructions,
            })
        },
        {
            ...modelOptions(rulesModel, options),
            //      logprobs: true,
            label: `${files.name}> inverse rules`,
        }
    )
    checkLLMResponse(res)
    return tidyRules(res.text)
}
