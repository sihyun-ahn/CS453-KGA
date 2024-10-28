import {
  loadPromptContext,
  generateReports,
  evaluateTests,
} from "./promptpex.mts";

script({
  title: "PromptPex Test Evaluator",
  files: ["samples/speech-tag/speech-tag.prompty"],
  description: "",
  parameters: {
    force: {
      type: "boolean",
      description: "Force execution even if tests are already present",
      default: false,
    },
    concurrency: {
      type: "number",
      description: "Number of tests to run concurrently",
      default: 5,
    },
  },
});

const force = env.vars.force;
const concurrency = env.vars.concurrency;

const contexts = await loadPromptContext();
for (const files of contexts) {
  try {
    // generate tests
    const testEvals = await evaluateTests(files, {
      force,
      concurrency,
    });
    files.testEvals.content = testEvals;
    await workspace.writeText(files.testEvals.filename, testEvals);
  } catch (e) {
    console.error(`${files.basename}: ${e}`);
    console.debug(e.stack);
  }
  // generate report
  await generateReports(files);
}
