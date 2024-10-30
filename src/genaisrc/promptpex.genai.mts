import { loadPromptContext, generate } from "./promptpex.mts";

script({
  title: "PromptPex Test Generator",
  description: "Generate tests using PromptPex.",
  files: ["samples/speech-tag/speech-tag.prompty"],
  parameters: {
    force: {
      type: "boolean",
      description: "Force overwrite of existing files",
      default: false,
    },
    forceBaselineTests: {
      type: "boolean",
      description: "Force overwrite of existing baseline tests",
      default: false,
    },
    forceIntent: {
      type: "boolean",
      description: "Force overwrite of existing intent files",
      default: false,
    },
    forceInputSpec: {
      type: "boolean",
      description: "Force overwrite of existing input spec files",
      default: false,
    },
    forceTests: {
      type: "boolean",
      description: "Force overwrite of existing test files",
      default: false,
    },
    forceTestEvals: {
      type: "boolean",
      description: "Force overwrite of existing test evals files",
      default: false,
    },
    forceExecuteTests: {
      type: "boolean",
      description: "Force execute tests",
      default: false,
    },
    forceTestResultEvals: {
      type: "boolean",
      description: "Force overwrite of existing test result evals files",
      default: false,
    },
    models: {
      type: "string",
      description: "Semi-column separated list of models to generate",
    },
    concurrency: {
      type: "number",
      description: "Number of concurrent prompts to run",
      default: 5,
    },
    out: {
      type: "string",
      description: "Output directory",
      default: "out",
    },
  },
});

const {
  force,
  forceBaselineTests,
  forceIntent,
  forceInputSpec,
  forceTests,
  forceTestEvals,
  forceExecuteTests,
  forceTestResultEvals,
  concurrency,
  out = "results",
} = env.vars;

const prompts = await loadPromptContext(out);
const q = host.promiseQueue(concurrency);
const models = (env.vars.models || "azure_serverless:gpt-4o-mini")
  ?.split(/;/g)
  .map((model) => model.trim());

await q.mapAll(prompts, async (files) => {
  try {
    await generate(files, {
      force,
      forceBaselineTests,
      forceIntent,
      forceInputSpec,
      forceTests,
      forceTestEvals,
      forceExecuteTests,
      forceTestResultEvals,
      models,
      q,
    });
  } catch (e) {
    console.error(e);
    console.debug(e.stack);
  }
});
