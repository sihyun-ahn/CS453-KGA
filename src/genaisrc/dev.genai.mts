import {
    generateInputSpec,
    generateIntent,
    generateRules,
    loadPromptFiles,
    PromptPexContext,
    generateBaselineTests,
    generateInverseRules,
    PromptPexOptions,
    evaluateRulesGrounded,
    evaluateRulesCoverage,
    generateTests,
} from "./promptpex.mts";

script({
    title: "PromptPex Dev",
    model: "large",
    unlisted: true,
    files: [
        "samples/speech-tag/speech-tag.prompty",
        "samples/text-to-p/text-to-p.prompty",
        "samples/openai-examples/elements.prompty",
        "samples/big-prompt-lib/art-prompt.prompty",
        "samples/prompt-guide/extract-names.prompty",
        "samples/text-classification/classify-input-text.prompty",
        "samples/big-prompt-lib/sentence-rewrite.prompty",
        "samples/azure-ai-studio/shakespearean-writing-assistant.prompty",
    ],
});
const { output } = env;
const out = "evals/dev";
const options: PromptPexOptions = {
    outputPrompts: true,
};

const repeatIntent = 1;
const repeatInputSpec = 1;
const repeatRules = 1;
const repeatInverseRules = 1;
const repeatTests = 1;
const repeatBaselineTests = 1;
const repeastRulesGroundedness = 5;

output.heading(1, "PromptPex Dev Mode");
output.itemValue(`model`, env.meta.model);
const prompts = await Promise.all(
    env.files.map((file) => loadPromptFiles(file, out))
);

async function apply(
    title: string,
    repeat: number,
    fn: (files: PromptPexContext) => Awaitable<void>
) {
    output.heading(2, title);
    for (const files of prompts) {
        output.heading(3, files.prompt.filename.replace(/^samples\//, ""));
        for (let i = 0; i < Math.max(1, repeat); ++i) {
            await fn(files);
        }
    }
}

await apply("Intents", repeatIntent, async (files) => {
    files.intent.content = await generateIntent(files, options);
    output.fence(files.intent.content, "text");
});
await apply("Input Specs", repeatInputSpec, async (files) => {
    files.inputSpec.content = await generateInputSpec(files, options);
    output.fence(files.inputSpec.content, "text");
});
await apply("Rules", repeatRules, async (files) => {
    files.rules.content = await generateRules(files, options);
    output.fence(files.rules.content, "text");

    output.heading(3, "Evaluating Rules Groundedness");
    const groundedness = await evaluateRulesGrounded(files, options);
    output.table([
        ...groundedness.map(({ rule, grounded, groundedText }) => ({
            rule,
            grounded,
            groundedText,
        })),
        {
            rule: "ok",
            grounded: groundedness.reduce(
                (acc, { grounded }) => acc + (grounded === "ok" ? 1 : 0),
                0
            ),
        },
    ]);
    output.detailsFenced(`data`, groundedness, "json");
});
await apply("Inverse Rules", repeatInverseRules, async (files) => {
    files.inverseRules.content = await generateInverseRules(files, options);
    output.fence(files.inverseRules.content, "text");
});
await apply("Tests", repeatTests, async (files) => {
    files.tests.content = await generateTests(files, options);
    output.fence(files.tests.content, "csv");
});
await apply("Baseline Tests", repeatBaselineTests, async (files) => {
    files.baselineTests.content = await generateBaselineTests(files, options);
    output.fence(files.baselineTests.content, "text");
});
await apply(
    "Evaluating Rules Coverage",
    repeastRulesGroundedness,
    async (files) => {
        output.heading(3, "Evaluating Rules Coverage");
        const coverage = await evaluateRulesCoverage(files, options);
        output.table([
            ...coverage.map(({ rule, coverage, coverageText }) => ({
                rule,
                coverage,
                coverageText,
            })),
            {
                rule: "ok",
                coverage: coverage.reduce(
                    (acc, { coverage }) => acc + (coverage === "ok" ? 1 : 0),
                    0
                ),
            },
        ]);
        output.detailsFenced(`data`, coverage, "json");
    }
);
