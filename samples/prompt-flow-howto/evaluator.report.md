## evaluator ([json](./evaluator.report.json))


### [prompty](./evaluator.prompty)

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


### [intent.txt](./evaluator.intent.txt)

`````txt
Evaluate a score for the answer based on the ground truth and original question.
`````


### [input_spec.txt](./evaluator.input_spec.txt)

`````txt
The input must include a "question" string that represents an inquiry or prompt.  
The input must include an "answer" string that represents the response given to the question.  
The input must include a "statement" string that provides additional context or information related to the question and answer.
`````


### [rules.txt](./evaluator.rules.txt)

`````txt
The output must be in valid JSON format.
The JSON output must contain a key named "score".
The value for the "score" key must be an integer between 1 and 5, inclusive.
The JSON output must contain a key named "explanation".
The value for the "explanation" key must be a string that provides a rationale for the assigned score.
`````


### [inverse_rules.txt](./evaluator.inverse_rules.txt)

`````txt
Output must not be in valid JSON format.  
The JSON output must not contain a key named "score".  
The value for the "score" key must not be an integer between 1 and 5, inclusive.  
The JSON output must not contain a key named "explanation".  
The value for the "explanation" key must not be a string that provides a rationale for the assigned score.
`````


### [baseline_tests.txt](./evaluator.baseline_tests.txt)

`````txt
question: "What is the capital of Spain?"
answer: "Madrid"
ground_truth: "Madrid"
output: 

===
question: "Who wrote 'Hamlet'?"
answer: "Shakespeare"
ground_truth: "William Shakespeare"
output: 

===
question: "What is the largest planet in our solar system?"
answer: "Jupiter"
ground_truth: "Jupiter"
output: 

===
question: "What is the boiling point of water?"
answer: "100 degrees Celsius"
ground_truth: "100°C"
output: 

===
question: "What year did the Titanic sink?"
answer: "1912"
ground_truth: "1912"
output: 

===
question: "Who painted the Mona Lisa?"
answer: "Leonardo da Vinci"
ground_truth: "Leonardo da Vinci"
output: 

===
question: "What is the chemical symbol for water?"
answer: "H2O"
ground_truth: "H2O"
output: 

===
question: "What is the primary language spoken in Brazil?"
answer: "Portuguese"
ground_truth: "Portuguese"
output: 

===
question: "What is the square root of 64?"
answer: "8"
ground_truth: "8"
output: 

===
question: "Who discovered penicillin?"
answer: "Alexander Fleming"
ground_truth: "Alexander Fleming"
output: 
`````


### [tests.csv](./evaluator.tests.csv)

