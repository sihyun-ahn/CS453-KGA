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
await q.mapAll(prompts, async (files) => {
  try {
    await generate(files, { force, q });
  } catch (e) {
    console.error(e);
  }
})
