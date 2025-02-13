import {
    generateInputSpec,
    generateInverseRules,
    generateRules,
    generateTests,
    loadPromptFiles,
    outputFile,
    parseRulesTests,
    PromptPexOptions,
} from "./promptpex.mts";

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
  PromptPex was tested using OpenAI GPT-4o / Llama3.3 70b. Results on other models may vary.
`,
    accept: ".prompty,*.md",
    parameters: {
        disableSafety: {
            type: "boolean",
            description:
                "Do not include safety system prompts and do not run safety content service",
            default: false,
        },
    },
});

const { output, meta, vars } = env;
const { disableSafety } = vars;
const options: PromptPexOptions = {
    workflowDiagram: true,
};
const files = await loadPromptFiles(env.files[0], { disableSafety });

output.heading(2, `PromptPex for ${files.name}`);
output.itemValue(`model`, meta.model);

// prompt info
output.heading(3, `Prompt Under Test`);
output.itemValue(`filename`, files.prompt.filename);
output.fence(files.prompt.content, "md");

// generate input spec
output.heading(3, "Input Specification");
files.inputSpec.content = await generateInputSpec(files, options);
outputFile(files.inputSpec);

// generate rules
output.heading(3, "Output Rules");
files.rules.content = await generateRules(files, options);
outputFile(files.rules);

// generate inverse rules
output.heading(3, "Inverse Output Rules");
files.inverseRules.content = await generateInverseRules(files, options);
outputFile(files.inverseRules);

// generate tests
output.heading(3, "Tests");
files.tests.content = await generateTests(files, options);
const tests = parseRulesTests(files.tests.content).map(
    ({ testinput, expectedoutput }) => ({ testinput, expectedoutput })
);
output.table(tests);
output.detailsFenced(`data`, tests, "json");
output.detailsFenced(`generated`, files.tests.content);
