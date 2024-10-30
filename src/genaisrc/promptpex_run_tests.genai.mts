import { loadPromptContext, runTests, generateReports } from "./promptpex.mts";

script({
  title: "PromptPex Test Runner",
  files: ["samples/speech-tag/speech-tag.prompty"],
  description: "",
  parameters: {
    force: {
      type: "boolean",
      description: "Force execution even if tests are already present",
      default: false,
    },
    models: {
      type: "string",
      description: "Models to use for testing",
      default:
        "github:gpt-4o-mini;azure_serverless_models:Phi-3-5-mini-instruct-uqdii",
    },
    out: {
      type: "string",
      description: "Output directory",
      default: "out",
    },
  },
});

const { force, out } = env.vars;
const models = env.vars.models.split(/;/g).map((model) => model.trim());

const contexts = await loadPromptContext(out);
for (const files of contexts) {
  try {
    // generate tests
    const testResults = await runTests(files, {
      force,
      models,
    });
    files.testResults.content = testResults;
    await workspace.writeText(files.testResults.filename, testResults);
  } catch (e) {
    console.error(`${files.name}: ${e}`);
  }
}
