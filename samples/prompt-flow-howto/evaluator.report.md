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
|5905ef5|87e0058|mistral\-nemo||question: 'What is the largest planet in our solar system?' answer: 'Jupiter' statement: 'Jupiter is known as the largest planet and is a gas giant\.'|\{"score": "5", "explanation": "The question asked for the largest planet, and the answer provided was accurate and relevant\. The statement also correctly identifies Jupiter as the largest planet in our solar system\."\}|
|c729b79|87e0058|mistral\-nemo||question: 'What is the boiling point of water?' answer: '100 degrees Celsius' statement: 'Water boils at this temperature at sea level\.'|\{"score": "5", "explanation":"The boiling point of water is indeed 100 degrees Celsius at standard atmospheric pressure\."\}|
|090cd46|87e0058|mistral\-nemo||question: 'Who wrote Macbeth?' answer: 'William Shakespeare' statement: 'Macbeth is a famous tragedy written by this author\.'|\{<br>  "score": "4",<br>  "explanation": "While the answer is correct, it does not directly use the provided ground\_truth\. It introduces additional information that was not in the ground\_truth\."<br>\}|
|9fd96ad|87e0058|mistral\-nemo||question: 'What is the smallest ocean in the world?' answer: 'Arctic Ocean' statement: 'It is located in the Northern Hemisphere and is the smallest by surface area\.'|\{"score": "5", "explanation":"The Arctic Ocean is indeed the smallest ocean in the world\."\}|
|e4a361a|87e0058|mistral\-nemo||question: 'What is the main language spoken in Brazil?' answer: 'Portuguese' statement: 'This language is widely spoken throughout the country\.'|\{"score": "5", "explanation":"The answer is accurate, and the statement provides additional relevant information\."\}|
|3ffbbaf|87e0058|mistral\-nemo||question: 'Which element has the atomic number 1?' answer: 'Hydrogen' statement: 'It is the lightest and most abundant element in the universe\.'|\{"score": "5", "explanation":"The statement correctly identifies Hydrogen as the element with atomic number 1\."\}|
|33a23cf|87e0058|mistral\-nemo||question: 'What is the primary color of the sky on a clear day?' answer: 'Blue' statement: 'This color results from scattering of sunlight\.'|\{"score": "5", "explanation":"The answer is accurate and relevant to the question\."\}|
|6a56de1|87e0058|mistral\-nemo||question: 'Which continent is Australia on?' answer: 'Australia' statement: 'It is both a country and a continent\.'|\{<br>"score": "3",<br>"explanation":"While it is true that Australia is a country, the ground truth specifies that Australia is on the continent of Australia\."<br>\}|
|25eb6ee|87e0058|mistral\-nemo||question: 'What is 2\+2?' answer: '4' statement: 'This is a basic arithmetic operation\.'|\{"score": "3", "explanation": "While the answer is correct, it's a simple operation that could be answered without stating the obvious\."\}|
|5905ef5|87e0058|mistral\-small:22b||question: 'What is the largest planet in our solar system?' answer: 'Jupiter' statement: 'Jupiter is known as the largest planet and is a gas giant\.'| \{"score": "5", "explanation":"Jupiter is known to be the largest planet"\}|
|c729b79|87e0058|mistral\-small:22b||question: 'What is the boiling point of water?' answer: '100 degrees Celsius' statement: 'Water boils at this temperature at sea level\.'| \`\`\`json<br>\{"score": "5", "explanation":"The answer correctly states that the boiling point of water is 100 degrees Celsius, which aligns with the ground truth\."\}<br>\`\`\`|
|090cd46|87e0058|mistral\-small:22b||question: 'Who wrote Macbeth?' answer: 'William Shakespeare' statement: 'Macbeth is a famous tragedy written by this author\.'| \`\`\`json<br>\{<br>  "score": "5",<br>  "explanation":"The answer matches the ground truth\. William Shakespeare is the author of Macbeth\."<br>\}<br>\`\`\`|
|9fd96ad|87e0058|mistral\-small:22b||question: 'What is the smallest ocean in the world?' answer: 'Arctic Ocean' statement: 'It is located in the Northern Hemisphere and is the smallest by surface area\.'| \`\`\`json<br>\{<br>  "score": "1",<br>  "explanation": "The Arctic Ocean is not the smallest, it is actually the fifth\-largest ocean\."<br>\}<br>\`\`\`|
|e4a361a|87e0058|mistral\-small:22b||question: 'What is the main language spoken in Brazil?' answer: 'Portuguese' statement: 'This language is widely spoken throughout the country\.'| \`\`\`json<br>\{<br>  "score": "5",<br>  "explanation": "The answer 'Portuguese' correctly identifies the main language spoken in Brazil"<br>\}<br>\`\`\`|
|3ffbbaf|87e0058|mistral\-small:22b||question: 'Which element has the atomic number 1?' answer: 'Hydrogen' statement: 'It is the lightest and most abundant element in the universe\.'| \`\`\`json<br>\{<br>  "score": "5",<br>  "explanation": "'Hydrogen' is correct, as it is the element with atomic number 1\."<br>\}<br>\`\`\`|
|33a23cf|87e0058|mistral\-small:22b||question: 'What is the primary color of the sky on a clear day?' answer: 'Blue' statement: 'This color results from scattering of sunlight\.'| \`\`\`json<br>\{"score": "5", "explanation":"The primary color of the sky on a clear day is indeed blue due to Rayleigh scattering\."\}<br>\`\`\`|
|6a56de1|87e0058|mistral\-small:22b||question: 'Which continent is Australia on?' answer: 'Australia' statement: 'It is both a country and a continent\.'| \`\`\`json<br>\{<br>    "score": 1,<br>    "explanation":"The answer provided does not address the question\."<br>\}<br>\`\`\`|
|25eb6ee|87e0058|mistral\-small:22b||question: 'What is 2\+2?' answer: '4' statement: 'This is a basic arithmetic operation\.'| \`\`\`json<br>\{<br>  "score": 5,<br>  "explanation": "'4' is the correct answer to the basic arithmetic operation '2 \+ 2'"<br>\}<br>\`\`\`|
|5905ef5|87e0058|deepseek\-coder\-v2:16b||question: 'What is the largest planet in our solar system?' answer: 'Jupiter' statement: 'Jupiter is known as the largest planet and is a gas giant\.'| \`\`\`json<br>\{<br>  "score": "5",<br>  "explanation":"Jupiter is indeed the largest planet in our solar system, with its volume being over 1300 times that of Earth\. As a gas giant, it plays a significant role in the solar system's dynamics and has numerous moons\."<br>\}<br>\`\`\`|
|c729b79|87e0058|deepseek\-coder\-v2:16b||question: 'What is the boiling point of water?' answer: '100 degrees Celsius' statement: 'Water boils at this temperature at sea level\.'| \`\`\`json<br>\{<br>  "score": "5",<br>  "explanation":"The boiling point of water is indeed 100 degrees Celsius at sea level\. The provided answer matches the correct information\."<br>\}<br>\`\`\`|
|090cd46|87e0058|deepseek\-coder\-v2:16b||question: 'Who wrote Macbeth?' answer: 'William Shakespeare' statement: 'Macbeth is a famous tragedy written by this author\.'| \`\`\`json<br>\{<br>  "score": "5",<br>  "explanation": "The user's question asks for the author of Macbeth, and their answer correctly identifies William Shakespeare as the author\. The provided statement further supports that Macbeth is a tragic play written by him\."<br>\}<br>\`\`\`|
|9fd96ad|87e0058|deepseek\-coder\-v2:16b||question: 'What is the smallest ocean in the world?' answer: 'Arctic Ocean' statement: 'It is located in the Northern Hemisphere and is the smallest by surface area\.'| \`\`\`json<br>\{<br>  "score": "4",<br>  "explanation": "The Arctic Ocean is indeed located in the Northern Hemisphere and, with an average depth of about 1205 meters \(3956 feet\), it has a smaller surface area compared to other oceans\. However, this does not define it as the 'smallest' by volume\."<br>\}<br>\`\`\`|
|e4a361a|87e0058|deepseek\-coder\-v2:16b||question: 'What is the main language spoken in Brazil?' answer: 'Portuguese' statement: 'This language is widely spoken throughout the country\.'| \`\`\`json<br>\{<br>  "score": "5",<br>  "explanation":"Portuguese is indeed the main language spoken in Brazil, as it is widely spoken throughout the country\."<br>\}<br>\`\`\`|
|3ffbbaf|87e0058|deepseek\-coder\-v2:16b||question: 'Which element has the atomic number 1?' answer: 'Hydrogen' statement: 'It is the lightest and most abundant element in the universe\.'| \`\`\`json<br>\{<br>  "score": "5",<br>  "explanation": "Hydrogen indeed has the atomic number 1, it is the lightest and most abundant element in the universe\."<br>\}<br>\`\`\`|
|33a23cf|87e0058|deepseek\-coder\-v2:16b||question: 'What is the primary color of the sky on a clear day?' answer: 'Blue' statement: 'This color results from scattering of sunlight\.'| \`\`\`json<br>\{<br>  "score": "5",<br>  "explanation":"The primary color of the sky on a clear day is blue, which results from the scattering of sunlight\."<br>\}<br>\`\`\`|
|6a56de1|87e0058|deepseek\-coder\-v2:16b||question: 'Which continent is Australia on?' answer: 'Australia' statement: 'It is both a country and a continent\.'| \`\`\`json<br>\{<br>  "score": "3",<br>  "explanation":"While the user provided correct information about Australia being a country, their additional statement does not directly address the question\. The ground truth requires knowledge of continents\."<br>\}<br>\`\`\`|
|25eb6ee|87e0058|deepseek\-coder\-v2:16b||question: 'What is 2\+2?' answer: '4' statement: 'This is a basic arithmetic operation\.'| \`\`\`json<br>\{"score": "5", "explanation":"The user provided the correct answer to a simple addition question and included a related statement that confirms their understanding of the task\."\}<br>\`\`\`|