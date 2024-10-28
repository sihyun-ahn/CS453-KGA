import { loadPromptContext, executeTests } from "./promptpex.mts";

script({
  title: "PromptPex Test Executor",
  files: ["samples/speech-tag/speech-tag.prompty"],
  description: "",
});

const model = env.vars.model || "large";
const files = (await loadPromptContext())[0];

// generate tests
const testResults = await executeTests(files, { model });
await workspace.writeText(files.testResults.filename, testResults);
