import type { PromptPexOptions } from "./types.mts";

export async function outputBackgroundInformation() {
    const { output } = env;
    output.startDetails(`information`);
    env.output.appendContent(
        `
\`\`\`mermaid
graph TD
    PUT(["Prompt Under Test (PUT)"])
    IS["Input Specification (IS)"]
    OR["Output Rules (OR)"]
    IOR["Inverse Output Rules (IOR)"]
    PPT["PromptPex Tests (PPT)"]
    TO["Test Output (TO) for MUT"]

    PUT --> IS

    PUT --> OR
    OR --> IOR

    PUT --> PPT
    IS --> PPT
    OR --> PPT
    IOR --> PPT

    PPT --> TO
    PUT --> TO
\`\`\`

- Prompt Under Test (PUT) - like Program Under Test; the prompt
- Model Under Test (MUT) - Model which we are testing against with specific temperature, etc example: gpt-4o-mini
- Model Used by PromptPex (MPP) - gpt-4o

- Input Specification (IS) - Extracting input constraints of PUT using MPP (input_spec)
- Output Rules (OR) - Extracting output constraints of PUT using MPP (rules_global)
- Inverse Output Rules (IOR) - Inverse of the generated Output Rules
- Output Rules Groundedness (ORG) - Checks if OR is grounded in PUT using MPP (check_rule_grounded)

- Prompt Under Test Intent (PUTI) - Extracting the exact task from PUT using MMP (extract_intent)

- PromptPex Tests (PPT) - Test cases generated for PUT with MPP using IS and OR (test)
- Baseline Tests (BT) - Zero shot test cases generated for PUT with MPP (baseline_test)

- Test Input Compliance (TIC) - Checking if PPT and BT meets the constraints in IS using MPP (check_violation_with_input_spec)
- Test Coverage (TC) - Result generated for PPT and BT on PUTI + OR with MPP (evaluate_test_coverage)

- Test Output (TO) - Result generated for PPT and BT on PUT with each MUT (the template is PUT)
- Test Output Compliance (TOC) - Checking if TO meets the constraints in PUT using MPP (check_violation_with_system_prompt)

`
    );
    output.endDetails();
}

export function outputWorkflowDiagram(
    diagram: string,
    options: PromptPexOptions
) {
    if (!options?.workflowDiagram) return;

    env.output.detailsFenced(
        `workflow`,
        `
graph TD
    ${diagram.trim().split(`\n`).join("\n    ")}
`,
        "mermaid"
    );
}

export async function outputPrompty(
    filename: string,
    options: PromptPexOptions
) {
    if (options?.outputPrompts)
        env.output.detailsFenced(
            filename,
            (await workspace.readText(filename)).content,
            "md"
        );
}

export function outputFile(file: WorkspaceFile) {
    const { output } = env;
    const contentType = path.extname(file.filename);
    output.fence(file.content, contentType);
}
