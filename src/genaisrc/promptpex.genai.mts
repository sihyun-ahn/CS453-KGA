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
    models: {
      type: "string",
      description: "Semi-column separated list of models to generate",
    },
    out: {
      type: "string",
      description: "Output directory",
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
  out,
} = env.vars;

const prompts = await loadPromptContext(out);
const models = (env.vars.models || "azure_serverless:gpt-4o-mini")
  ?.split(/;/g)
  .map((model) => model.trim());

for (const files of prompts) {
  try {
    await generate(files, {
      force,
      forceBaselineTests,
      forceIntent,
      forceInputSpec,
      forceTests,
      forceTestEvals,
      forceExecuteTests,
      models,
    });
  } catch (e) {
    console.error(e);
    console.debug(e.stack);
  }
}
