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



### [test_results.csv](./evaluator.test_results.csv)

|id|promptid|model|error|input|output|
|-|-|-|-|-|-|
|5905ef5|87e0058|gpt\-4o\-mini||question: 'What is the largest planet in our solar system?' answer: 'Jupiter' statement: 'Jupiter is known as the largest planet and is a gas giant\.'|\{"score": "5", "explanation":"Jupiter is indeed the largest planet in our solar system and a gas giant, which accurately reflects the information provided\."\}|
|c729b79|87e0058|gpt\-4o\-mini||question: 'What is the boiling point of water?' answer: '100 degrees Celsius' statement: 'Water boils at this temperature at sea level\.'|\{"score": "5", "explanation":"100 degrees Celsius is the correct boiling point of water at sea level\."\}|
|090cd46|87e0058|gpt\-4o\-mini||question: 'Who wrote Macbeth?' answer: 'William Shakespeare' statement: 'Macbeth is a famous tragedy written by this author\.'|\{"score": "5", "explanation":"William Shakespeare is indeed the author of Macbeth, which is a famous tragedy\."\}|
|9fd96ad|87e0058|gpt\-4o\-mini||question: 'What is the smallest ocean in the world?' answer: 'Arctic Ocean' statement: 'It is located in the Northern Hemisphere and is the smallest by surface area\.'|\{<br>  "score": "5",<br>  "explanation": "The answer 'Arctic Ocean' is correct as it is indeed the smallest ocean in the world\."<br>\}|
|e4a361a|87e0058|gpt\-4o\-mini||question: 'What is the main language spoken in Brazil?' answer: 'Portuguese' statement: 'This language is widely spoken throughout the country\.'|\{"score": "5", "explanation":"Portuguese is indeed the main language spoken in Brazil\."\}|
|3ffbbaf|87e0058|gpt\-4o\-mini||question: 'Which element has the atomic number 1?' answer: 'Hydrogen' statement: 'It is the lightest and most abundant element in the universe\.'|\{"score": "4", "explanation":"Hydrogen is indeed the element with atomic number 1, but the statement adds additional information that is not directly answering the question\."\}|
|33a23cf|87e0058|gpt\-4o\-mini||question: 'What is the primary color of the sky on a clear day?' answer: 'Blue' statement: 'This color results from scattering of sunlight\.'|\{"score": "5", "explanation":"The answer 'Blue' correctly identifies the primary color of the sky on a clear day, and the statement provides a relevant explanation for why the sky appears this color\."\}|
|6a56de1|87e0058|gpt\-4o\-mini||question: 'Which continent is Australia on?' answer: 'Australia' statement: 'It is both a country and a continent\.'|\{"score": "3", "explanation":"The answer 'Australia' does not directly address the question about the continent, though it is factually correct that Australia is both a country and a continent\."\}|
|25eb6ee|87e0058|gpt\-4o\-mini||question: 'What is 2\+2?' answer: '4' statement: 'This is a basic arithmetic operation\.'|\{"score": "5", "explanation":"The answer '4' correctly solves the question 'What is 2\+2?' and the statement provides context about the nature of the question\."\}|