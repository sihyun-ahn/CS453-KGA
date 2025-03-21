export const PROMPT_GENERATE_INPUT_SPEC = "src/prompts/input_spec.prompty"
export const PROMPT_GENERATE_INTENT = "src/prompts/extract_intent.prompty"
export const PROMPT_GENERATE_RULES = "src/prompts/rules_global.prompty"
export const PROMPT_GENERATE_BASELINE_TESTS =
    "src/prompts/baseline_test.prompty"
export const PROMPT_GENERATE_INVERSE_RULES = "src/prompts/inverse_rule.prompty"
export const PROMPT_GENERATE_TESTS = "src/prompts/generate_tests.prompty"
export const PROMPT_EVAL_RULE_GROUNDED =
    "src/prompts/check_rule_grounded.prompty"
export const PROMPT_EVAL_TEST_VALIDITY =
    "src/prompts/check_violation_with_input_spec.prompty"
export const PROMPT_EVAL_TEST_COVERAGE =
    "src/prompts/evaluate_test_coverage.prompty"
export const PROMPT_EVAL_TEST_RESULT =
    "src/prompts/check_violation_with_system_prompt.prompty"

export const PROMPT_ALL = [
    PROMPT_GENERATE_INPUT_SPEC,
    PROMPT_GENERATE_INTENT,
    PROMPT_GENERATE_RULES,
    PROMPT_GENERATE_BASELINE_TESTS,
    PROMPT_GENERATE_INVERSE_RULES,
    PROMPT_GENERATE_TESTS,
    PROMPT_EVAL_RULE_GROUNDED,
    PROMPT_EVAL_TEST_VALIDITY,
    PROMPT_EVAL_TEST_COVERAGE,
    PROMPT_EVAL_TEST_RESULT,
]

export const CONCURRENCY = 2
export const RULES_NUM = 0
export const TESTS_NUM = 3

export const TEST_EVALUATION_DIR = "test_evals"
export const RULE_EVALUATION_DIR = "rule_evals"
export const DOCS_TEST_GENERATION_DIAGRAM = `
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
`

export const DOCS_GLOSSARY = `
- Prompt Under Test (PUT) - like Program Under Test; the prompt
- Model Under Test (MUT) - Model which we are testing against with specific temperature, etc example: gpt-4o-mini
- Model Used by PromptPex (MPP) - gpt-4o/llama3.3

- Intent (I) - 
- Input Specification (IS) - Extracting input constraints of PUT using MPP
- Output Rules (OR) - Extracting output constraints of PUT using MPP
- Output Rules Groundedness (ORG) - Checks if OR is grounded in PUT using MPP

- Prompt Under Test Intent (PUTI) - Extracting the exact task from PUT using MMP

- PromptPex Tests (PPT) - Test cases generated for PUT with MPP using IS and OR
- Baseline Tests (BT) - Zero shot test cases generated for PUT with MPP

- Test Input Compliance (TIC) - Checking if PPT and BT meets the constraints in IS using MPP
- Test Coverage (TC) - Result generated for PPT and BT on PUTI + OR with MPP

- Test Output (TO) - Result generated for PPT and BT on PUT with each MUT
- Test Output Compliance (TOC) - Checking if TO meets the constraints in PUT using MPP
`
