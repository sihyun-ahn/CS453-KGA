import {
  loadPromptContext,
  executeTests,
  generateReports,
} from "./promptpex.mts";

script({
  title: "PromptPex Test Executor",
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
    concurrency: {
      type: "number",
      description: "Number of tests to run concurrently",
      default: 5,
    },
  },
});

const force = env.vars.force;
const models = env.vars.models.split(/;/g).map((model) => model.trim());
const concurrency = env.vars.concurrency;

console.log(env.files)
const contexts = await loadPromptContext();
console.log(contexts)
for (const files of contexts) {
  // generate tests
  const testResults = await executeTests(files, { force, models, concurrency });
  await workspace.writeText(files.testResults.filename, testResults);

  // generate report
  await generateReports(files);
}
