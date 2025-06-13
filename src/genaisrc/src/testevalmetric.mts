import { checkConfirm } from "./confirm.mts"
import { modelOptions, checkLLMEvaluation, metricName, parseAllRules } from "./parsers.mts"
import { measure } from "./perf.mts"
import type {
    PromptPexContext,
    PromptPexTestResult,
    PromptPexOptions,
    PromptPexEvaluation,
    PromptPexRule,
} from "./types.mts"
const { generator } = env
const dbg = console.debug

export async function evaluateTestMetrics(
    testResult: PromptPexTestResult,
    files: PromptPexContext,
    options: PromptPexOptions
) {
    const { metrics } = files
    dbg(`evaluating ${metrics.length} metrics`)
    checkConfirm("metric")

    for (const metric of metrics) {
        const res = await evaluateTestMetric(metric, files, testResult, options)
        testResult.metrics[metricName(metric)] = res
    }
}

function getOriginalRulesText(files: PromptPexContext): string {
    try {
        const allRules = parseAllRules(files)
        
        // Extract ALL original rules by ALWAYS using rule.rule field
        // This ensures we get every single original rule regardless of:
        // - inversed flag state  
        // - mutation system state
        // - current branch being tested
        const originalRules = allRules
            .filter(rule => rule && rule.rule && rule.rule.trim()) // Ensure rule exists and has content
            .map((rule, index) => `${index + 1}. ${rule.rule}`)
        
        dbg(`Extracted ${originalRules.length} original rules for compliance evaluation`)
        
        if (originalRules.length === 0) {
            dbg('No valid rules found in parsed rules, falling back to files.rules.content')
            return files.rules.content
        }
        
        return originalRules.join('\n')
    } catch (error) {
        dbg(`Failed to parse original rules: ${error}. Falling back to files.rules.content`)
        return files.rules.content
    }
}

async function evaluateTestMetric(
    metric: WorkspaceFile,
    files: PromptPexContext,
    testResult: PromptPexTestResult,
    options: PromptPexOptions
): Promise<PromptPexEvaluation> {
    const { evalModel = "eval" } = options || {}
    const moptions = modelOptions(evalModel, options)
    const content = MD.content(files.prompt.content)
    if (testResult.input === undefined)
        return {
            outcome: "unknown",
            content: "test result input missing",
        } satisfies PromptPexEvaluation
    if (testResult.output === undefined)
        return {
            outcome: "unknown",
            content: "test result output missing",
        } satisfies PromptPexEvaluation
    
    // For rules_compliant metric, use original rules instead of mutated rules
    const isRulesCompliantMetric = metricName(metric) === "rules_compliant"
    const rulesText = isRulesCompliantMetric 
        ? getOriginalRulesText(files)
        : files.rules.content
    
    const parameters = {
        prompt: content.replace(/^(system|user):/gm, ""),
        intent: files.intent.content || "",
        inputSpec: files.inputSpec.content || "",
        rules: rulesText,
        input: testResult.input,
        output: testResult.output,
    }
    dbg(`metric: ${metric.filename} for %O`, {
        input: parameters.input,
        output: parameters.output,
    })
    const res = await measure("eval.metric", () =>
        generator.runPrompt(
            (ctx) => {
                // removes frontmatter
                ctx.importTemplate(metric, parameters, {
                    allowExtraArguments: true,
                })
            },
            {
                ...moptions,
                label: `${files.name}> evaluate metric ${metricName(metric)} ${testResult.model} ${testResult.input.slice(0, 42)}...`,
            }
        )
    )
    const evaluation = checkLLMEvaluation(res, { allowUnassisted: true })
    dbg(`metric eval: %o`, evaluation)
    return evaluation
}
