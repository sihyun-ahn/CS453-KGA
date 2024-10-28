## [eval](samples/prompt-flow-howto/eval.prompty) ([json](./eval.report.json))


### [prompty](./eval.prompty)

`````md
---
name: basic evaluate 
description: basic evaluator for QA scenario
source: PromptFlow How-to Guides (slightly modified)
url: https://github.com/microsoft/promptflow/blob/main/examples/prompty/eval-basic/eval.prompty
inputs: 
  question:
    type: string
  answer:
    type: string
  statement:
    type: string
outputs:
  score:
    type: string
  explanation:
    type: string
---
system:
You are an AI assistant. 
You task is to evaluate a score for the answer based on the ground_truth and original question.
This score value should always be an integer between 1 and 5. So the score produced should be 1 or 2 or 3 or 4 or 5.
The output should be valid JSON.

**Example**
question: "What is the capital of France?"
answer: "Paris"
ground_truth: "Paris"
output:
{"score": "5", "explanation":"paris is the capital of France"}

user:
question: {{question}}
answer: {{answer}}
statement: {{statement}}
output:

`````


### [rules.txt](./eval.rules.txt)

`````txt
The score value in the output JSON must be an integer between 1 and 5, inclusive.
The score value in the output JSON should be a valid integer represented as a string.
The output must be in valid JSON format.
The JSON output must include a key named "score".
The JSON output must include a key named "explanation".
The "explanation" key must contain a string value describing the reasoning behind the score.
The "explanation" should be relevant to the provided question, answer, and ground truth.
`````


### [inverse_rules.txt](./eval.inverse_rules.txt)

`````txt
```
The score value in the output JSON must not be an integer between 1 and 5, inclusive.
The score value in the output JSON should not be a valid integer represented as a string.
The output must not be in valid JSON format.
The JSON output must exclude a key named "score".
The JSON output must exclude a key named "explanation".
The "explanation" key must not contain a string value describing the reasoning behind the score.
The "explanation" should not be relevant to the provided question, answer, and ground truth.
```
`````


### [input_spec.txt](./eval.input_spec.txt)

`````txt
A valid input consists of a question, answer, and statement.  
The question is a string, representing any query or prompt.  
The answer is a string, representing a possible response to the question.  
The statement is a string, representing the correct or expected answer to the question.  
Each input component must be present for the input to be valid.
`````


### [baseline_tests.txt](./eval.baseline_tests.txt)

`````txt
question: "What is the capital of Germany?"
answer: "Berlin"
statement: "Berlin is the capital of Germany"
===
question: "Who wrote 'Pride and Prejudice'?"
answer: "Jane Austen"
statement: "Jane Austen wrote 'Pride and Prejudice'"
===
question: "What is the chemical symbol for water?"
answer: "H2O"
statement: "The chemical symbol for water is H2O"
`````


### [tests.csv](./eval.tests.csv)

