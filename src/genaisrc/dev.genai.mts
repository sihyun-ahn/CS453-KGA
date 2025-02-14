import { evaluateRulesSpecAgreement } from "./src/rulesspecagreement.mts";
import {
    generateBaselineTests,
    generateInputSpec,
    generateIntent,
    generateInverseOutputRules,
    generateOutputRules,
    generateTests,
} from "./src/generation.mts";
import { loadPromptFiles } from "./src/parsers.mts";
import { evaluateRulesGrounded } from "./src/rulesgroundeness.mts";
import type { PromptPexContext, PromptPexOptions } from "./src/types.mts";

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
const commOptions: PromptPexOptions = {
    outputPrompts: true,
    evalCache: true,
};

const repeatIntent = 1;
const repeatInputSpec = 1;
const repeatRules = 1;
const repeatInverseRules = 1;
const repeatTests = 1;
const repeatBaselineTests = 1;
const repeastRulesGroundedness = 5;
const configs: (PromptPexOptions & { name: string })[] = [
    /*
    {
        name: "gpt-4o",
        modelAliases: {
            large: "not-supported",
            small: "not-supported",
            rules: "azure:gpt-4o_2024-08-06",
            eval: "azure:gpt-4o_2024-08-06",
        },
    },
    */
    /*
    {
        name: "llama3.3:70b",
        modelAliases: {
            large: "not-supported",
            rules: "ollama:llama3.3",
            eval: "ollama:llama3.3",
        },
    },
    */
    {
        name: "deepskeep-r1:8b",
        modelAliases: {
            large: "not-supported",
            rules: "ollama:deepseek-r1:8b",
            eval: "ollama:deepseek-r1:8b",
        },
    },
    /*
    {
        name: "deepskeep-r1:32b",
        modelAliases: {
            large: "not-supported",
            rules: "ollama:deepseek-r1:32b",
            eval: "ollama:deepseek-r1:32b",
        },
    },
    */
    /*
    {
        name: "deepskeep-r1:70b",
        modelAliases: {
            large: "not-supported",
            rules: "ollama:deepseek-r1:70b",
            eval: "ollama:deepseek-r1:70b",
        },
    },
    */
].filter((c) => !!c);

output.heading(1, "PromptPex Dev Mode");
output.detailsFenced(`configurations`, configs, "yaml");
const prompts = await Promise.all(
    env.files.map((file) => loadPromptFiles(file, { disableSafety: true, out }))
);
prompts.forEach((files) => output.itemValue(files.name, files.prompt.filename));

async function apply(
    title: string,
    repeat: number,
    selector: (files: PromptPexContext) => WorkspaceFile,
    fn: (
        files: PromptPexContext,
        options: PromptPexOptions
    ) => Awaitable<string>
) {
    output.heading(2, title);
    const table = [];
    for (const files of prompts) {
        const row = { prompt: files.name };
        table.push(row);

        output.heading(3, files.prompt.filename.replace(/^samples\//, ""));
        const file = selector?.(files);
        if (repeat === 0 && file?.content) continue;

        for (const config of configs) {
            const { name, ...restConfig } = config;
            output.heading(3, name);
            for (let i = 0; i < repeat; ++i) {
                const res = await fn(files, { ...commOptions, ...restConfig });
                if (file) {
                    file.content = res;
                    output.fence(file.content, "text");
                }
                row[`${config.name}/${i}`] = res;
            }
        }
        if (file) await workspace.writeText(file.filename, file.content);
    }
    output.table(table);
    output.detailsFenced(`data`, table, "csv");
}

await apply(
    "Intents",
    repeatIntent,
    (_) => _.intent,
    (files, options) => generateIntent(files, options)
);
await apply(
    "Input Specs",
    repeatInputSpec,
    (_) => _.inputSpec,
    (files, options) => generateInputSpec(files, options)
);
await apply("Rules", repeatRules, undefined, async (files, options) => {
    files.rules.content = await generateOutputRules(files, options);
    output.fence(files.rules.content, "text");

    output.heading(3, "Evaluating Rules Groundedness");
    const groundedness = await evaluateRulesGrounded(files, options);
    output.table([
        ...groundedness.map(({ rule, grounded }) => ({
            rule,
            grounded,
        })),
        {
            rule: "ok",
            grounded: groundedness.reduce(
                (acc, { grounded }) => acc + (grounded === "ok" ? 1 : 0),
                0
            ),
        },
    ]);
    output.detailsFenced(`data`, groundedness, "csv");
    return "";
});
await apply(
    "Inverse Rules",
    repeatInverseRules,
    (_) => _.inverseRules,
    (files, options) => generateInverseOutputRules(files, options)
);
await apply(
    "Tests",
    repeatTests,
    (_) => _.tests,
    (files, options) => generateTests(files, options)
);
await apply(
    "Baseline Tests",
    repeatBaselineTests,
    (_) => _.baselineTests,
    (files, options) => generateBaselineTests(files, options)
);
await apply(
    "Evaluating Rules Coverage",
    repeastRulesGroundedness,
    undefined,
    async (files, options) => {
        output.heading(3, "Evaluating Rules Spec Agreement");
        const res = await evaluateRulesSpecAgreement(files, options);
        output.table([
            ...res.map(({ rule, coverage, coverageText }) => ({
                rule,
                agreement: coverage,
            })),
            {
                rule: "ok",
                agreement: res.reduce(
                    (acc, { coverage }) => acc + (coverage === "ok" ? 1 : 0),
                    0
                ),
            },
        ]);
        output.detailsFenced(`data`, res, "csv");
        return "";
    }
);
