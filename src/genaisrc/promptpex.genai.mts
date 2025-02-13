import { generate, loadPromptFiles } from "./promptpex.mts";

script({
  title: "PromptPex Test Generator",
  description: `Generate tests for a LLM prompt. 
  This tool accepts a prompt file formatted in the Prompty language 
  and generates tests for them. The tests can be used to validate your prompt
  for various models automatically.

  - [Prompty Language](https://prompty.ai/docs)
  - [GitHub](https://github.com/microsoft/promptpex/)
  - [Archiv](https://github.com/microsoft/promptpex/)

  PromptPex uses an LLM internally to generate and evaluate test cases and results.
  PromptPex was tested using OpenAI GPT-4o. Results on other models may vary.
`,
  files: "samples/openai-examples/elements.prompty",
  accept: ".prompty,*.md",
  parameters: {
    disableSafety: {
      type: "boolean",
      description:
        "Do not include safety system prompts and do not run safety content service",
      default: false,
    },
    force: {
      type: "boolean",
      description: "Force overwrite of existing files",
      default: false,
    },
    models: {
      type: "string",
      description: "List of models to evaluate",
      default: "",
    },
    out: {
      type: "string",
      description: "Output directory",
      default: "",
    },
  },
});

const { disableSafety, force, out } = env.vars;
const files = await loadPromptFiles(env.files[0], out)
const models = env.vars.models
  .split(/[;\n ,]/g)
  .map((model) => model.trim());
await generate(files, {
  disableSafety,
  force,
  models
});
