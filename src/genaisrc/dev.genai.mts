import {
    generateInputSpec,
    generateIntent,
    loadPromptFiles,
} from "./promptpex.mts";

script({
    title: "PromptPex Dev",
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
const options = {};

const repeatIntent = 1;
const repeatInputSpec = 5;

output.heading(1, "PromptPex Dev Mode");

output.heading(2, "Intents");
for (const file of env.files) {
    output.heading(3, file.filename.replace(/^samples\//, ""));
    const files = await loadPromptFiles(file, "");
    for (let i = 0; i < repeatIntent; ++i) {
        files.intent.content = await generateIntent(files, options);
        output.fence(files.intent.content, "text");
    }
}

output.heading(2, "Input Specs");
for (const file of env.files) {
    output.heading(3, file.filename.replace(/^samples\//, ""));
    const files = await loadPromptFiles(file, "");
    for (let i = 0; i < repeatInputSpec; ++i) {
        files.inputSpec.content = await generateInputSpec(files, options);
        output.fence(files.inputSpec.content, "text");
    }
}
