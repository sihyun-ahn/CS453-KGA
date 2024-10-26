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
question: The input question must be a clear and specific inquiry.
answer: The input answer must be a direct response to the input question.
statement: The input statement must be a clear and detailed assertion related to the input question and answer.
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

`````csv
Rule ID, Test ID, Test Input, Expected Output, Reasoning
1, 1, "question: 'What is the capital of Germany?', answer: 'Berlin', statement: 'Berlin is indeed the capital of Germany.'", "{\"score\": \"5\", \"explanation\": \"Berlin is the correct answer as it is the capital of Germany.\"}", "Tests that the score is an integer between 1 and 5. All components are valid inputs."
1, 2, "question: 'What is the largest ocean on Earth?', answer: 'Pacific Ocean', statement: 'The Pacific Ocean is the largest ocean on Earth.'", "{\"score\": \"5\", \"explanation\": \"The Pacific Ocean is correct as it is the largest ocean.\"}", "Confirms the score is within the valid range. Inputs follow the specification."
1, 3, "question: 'What is the boiling point of water?', answer: '100 degrees Celsius', statement: 'Water boils at 100 degrees Celsius under standard conditions.'", "{\"score\": \"5\", \"explanation\": \"100 degrees Celsius is the accurate boiling point of water.\"}", "Ensures the score value is an integer between 1 and 5. Input is clear and specific."

2, 1, "question: 'What is the powerhouse of the cell?', answer: 'Mitochondria', statement: 'Mitochondria are known as the powerhouse of the cell.'", "{\"score\": \"5\", \"explanation\": \"Mitochondria is the correct answer.\"}", "Tests if the score is correctly represented as a string. Inputs are well-defined."
2, 2, "question: 'Who wrote Hamlet?', answer: 'William Shakespeare', statement: 'William Shakespeare is the author of Hamlet.'", "{\"score\": \"5\", \"explanation\": \"The answer is correct as Shakespeare wrote Hamlet.\"}", "Validates the integer score is represented as a string. Inputs are specific."
2, 3, "question: 'What is the speed of light?', answer: '299,792 km/s', statement: 'The speed of light is approximately 299,792 kilometers per second.'", "{\"score\": \"5\", \"explanation\": \"The speed provided is accurate for light.\"}", "Ensures score is a string representation of an integer. Inputs meet specifications."

3, 1, "question: 'What is the smallest prime number?', answer: '2', statement: '2 is the smallest prime number.'", "{\"score\": \"5\", \"explanation\": \"2 is indeed the smallest prime number.\"}", "Tests valid JSON output format. Inputs are precise and valid."
3, 2, "question: 'What is the chemical symbol for water?', answer: 'H2O', statement: 'Water's chemical symbol is H2O.'", "{\"score\": \"5\", \"explanation\": \"H2O is the correct chemical symbol for water.\"}", "Confirms JSON format validity. Inputs are clear and specific."
3, 3, "question: 'What planet is known as the Red Planet?', answer: 'Mars', statement: 'Mars is commonly referred to as the Red Planet.'", "{\"score\": \"5\", \"explanation\": \"Mars is known as the Red Planet.\"}", "Ensures output is in a valid JSON format. Inputs are valid."

4, 1, "question: 'What is the capital of Italy?', answer: 'Rome', statement: 'Rome is the capital city of Italy.'", "{\"score\": \"5\", \"explanation\": \"Rome is the correct capital of Italy.\"}", "Validates presence of 'score' key. Inputs adhere to specifications."
4, 2, "question: 'What is the freezing point of water?', answer: '0 degrees Celsius', statement: 'Water freezes at 0 degrees Celsius.'", "{\"score\": \"5\", \"explanation\": \"0 degrees Celsius is the correct freezing point.\"}", "Checks for 'score' key inclusion. Inputs are clearly defined."
4, 3, "question: 'Who painted the Mona Lisa?', answer: 'Leonardo da Vinci', statement: 'Leonardo da Vinci painted the Mona Lisa.'", "{\"score\": \"5\", \"explanation\": \"Da Vinci is the correct painter of the Mona Lisa.\"}", "Affirms 'score' key is present. All components are valid."

5, 1, "question: 'What is the largest planet in our solar system?', answer: 'Jupiter', statement: 'Jupiter is the largest planet in our solar system.'", "{\"score\": \"5\", \"explanation\": \"Jupiter is indeed the largest planet.\"}", "Verifies inclusion of 'explanation' key. Inputs are valid."
5, 2, "question: 'What is the main ingredient in guacamole?', answer: 'Avocado', statement: 'Avocado is the main ingredient in guacamole.'", "{\"score\": \"5\", \"explanation\": \"Avocado is correct as the main ingredient.\"}", "Tests presence of 'explanation' key. Inputs are precise and conform to specifications."
5, 3, "question: 'What gas do plants absorb during photosynthesis?', answer: 'Carbon dioxide', statement: 'Plants absorb carbon dioxide for photosynthesis.'", "{\"score\": \"5\", \"explanation\": \"Carbon dioxide is correctly identified.\"}", "Ensures 'explanation' key is included. All inputs follow the guidelines."

6, 1, "question: 'What is the capital of Japan?', answer: 'Tokyo', statement: 'Tokyo is Japan's capital city.'", "{\"score\": \"5\", \"explanation\": \"Tokyo is accurately the capital of Japan.\"}", "Ensures explanation value describes the score reasoning. Inputs are valid."
6, 2, "question: 'What is the most abundant gas in Earth's atmosphere?', answer: 'Nitrogen', statement: 'Nitrogen makes up a large portion of Earth's atmosphere.'", "{\"score\": \"5\", \"explanation\": \"Nitrogen is correctly identified as the most abundant gas.\"}", "Validates explanation relevance to score. Inputs meet input specifications."
6, 3, "question: 'What is the primary language spoken in Brazil?', answer: 'Portuguese', statement: 'Portuguese is the main language in Brazil.'", "{\"score\": \"5\", \"explanation\": \"Portuguese is recognized as the primary language.\"}", "Checks if explanation is relevant to question, answer, and ground truth. Inputs are clear and specific."

7, 1, "question: 'What is the tallest mountain in the world?', answer: 'Mount Everest', statement: 'Mount Everest is the tallest mountain.'", "{\"score\": \"5\", \"explanation\": \"Correct reasoning as Mount Everest is the tallest.\"}", "Ensures explanation is pertinent to input components. Inputs are valid."
7, 2, "question: 'What is the chemical formula for carbon dioxide?', answer: 'CO2', statement: 'CO2 is the chemical formula for carbon dioxide.'", "{\"score\": \"5\", \"explanation\": \"CO2 is the correct chemical formula.\"}", "Tests relevance of explanation to inputs. All inputs are specific."
7, 3, "question: 'What is the hardest natural substance on Earth?', answer: 'Diamond', statement: 'Diamond is the hardest natural substance.'", "{\"score\": \"5\", \"explanation\": \"Diamond is correctly the hardest substance.\"}", "Checks explanation's relevance to question and answer. Inputs conform to specification."
`````
