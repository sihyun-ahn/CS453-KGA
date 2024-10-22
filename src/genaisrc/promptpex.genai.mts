import { loadPromptContext, generate } from "./promptpex.mts";

script({
  title: "PromptPex Input Spec Generator",
  description:
    "Generate an input spec for a prompt template. Runs this script against a prompt authored in markdown or prompty format.",
  files: ["samples/speech-tag/speech-tag.prompty"],
  parameters: {
    force: {
      type: "boolean",
      description: "Force overwrite of existing files",
      default: false,
    },
    concurrency: {
      type: "number",
      description: "Number of concurrent prompts to run",
      default: 5,
    },
  },
});

const { force, concurrency } = env.vars;

const prompts = await loadPromptContext();
const q = host.promiseQueue(concurrency);
await q.mapAll(prompts, async (files) => await generate(files, { force, q }));
