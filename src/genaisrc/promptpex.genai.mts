import {
  loadPromptContext,
  generateInputSpec,
  generateRules,
  generateTests,
  generateInverseRules,
} from "./promptpex.mts";

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
  },
});

const files = await loadPromptContext();
const { force } = env.vars;

// generate input spec
if (!files.inputSpec.content || force) {
  files.inputSpec.content = await generateInputSpec(files);
  await workspace.writeText(files.inputSpec.filename, files.inputSpec.content);
}

// generate rules
if (!files.rules.content || force) {
  files.rules.content = await generateRules(files);
  await workspace.writeText(files.rules.filename, files.rules.content);
  files.inverseRules.content = undefined;
}

// generate inverse rules
if (!files.inverseRules.content || force) {
  const inverseRules = await generateInverseRules(files);
  await workspace.writeText(files.inverseRules.filename, inverseRules);
}

// generate tests
if (!files.tests.content || force) {
  files.rules.content = await generateTests(files);
}
