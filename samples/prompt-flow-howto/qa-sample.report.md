## qa-sample ([json](./qa-sample.report.json))


### [prompty](./qa-sample.prompty)

`````md
---
name: Basic Prompt
description: A basic prompt that uses the GPT-3 chat API to answer questions
inputs:
  question:
    type: string
sample:
  question: Who is the most famous person in the world?
source: PromptFlow How-to Guides (simplified)
url: https://microsoft.github.io/promptflow/how-to-guides/develop-a-prompty/index.html
---
system:
You are an AI assistant who helps people find information.
As the assistant, you answer questions briefly, succinctly,
and in a personable manner using markdown and even add some personal flair with appropriate emojis.

# Safety
- You **should always** reference factual statements to search results based on [relevant documents]
- Search results based on [relevant documents] may be incomplete or irrelevant. You do not make assumptions
# Customer
You are helping a user to find answers to their questions.

user:
{{question}}
`````


### [intent.txt](./qa-sample.intent.txt)

`````txt
Help users find answers to their questions.
`````


### [input_spec.txt](./qa-sample.input_spec.txt)

`````txt
The input is a question from the user.  
The question must be a text string.  
The question can vary in length but should be concise enough to be understood.
`````


### [rules.txt](./qa-sample.rules.txt)

`````txt
The response must answer questions briefly and succinctly.
The response must be presented in a personable manner.
The response must use markdown formatting.
The response must include personal flair with appropriate emojis.
The response must reference factual statements to search results based on relevant documents.
The response must not make assumptions.
`````


### [inverse_rules.txt](./qa-sample.inverse_rules.txt)

`````txt
The response must answer questions with lengthy and detailed explanations.
The response must be presented in a formal manner.
The response must avoid using markdown formatting.
The response must be devoid of personal flair and emojis.
The response must provide creative opinions without referencing factual statements.
The response must make assumptions freely.
`````


### [baseline_tests.txt](./qa-sample.baseline_tests.txt)

`````txt
question: What is the capital city of France?

===
question: How does photosynthesis work?

===
question: Can you list some benefits of regular exercise?
`````


### [tests.csv](./qa-sample.tests.csv)

|Rule ID|Test ID|Test Input|Expected Output|Reasoning|
|-|-|-|-|-|
|1|1|What is the capital of France?|Paris|Tests brief and succinct answer without unnecessary details\.|
|1|2|Who wrote '1984'?|George Orwell|Checks if the response is concise and to the point\.|
|1|3|What's the boiling point of water?|100°C|Ensures the answer is brief and relevant without extra information\.|
|2|1|What's a fun fact about cats?|Cats sleep for 70% of their lives\! 🐱|Evaluates the personable nature with flair, making the response engaging\.|
|2|2|Can you share a quirky fact about octopuses?|Octopuses have three hearts\! ❤️❤️❤️|Checks for friendly tone and personal flair in the response\.|
|2|3|Why are flamingos pink?|Because of the shrimp they eat\! 🦐|Tests for a personable response with a friendly touch\.|
|3|1|How does photosynthesis work?|\*\*Photosynthesis\*\* is the process by which plants use sunlight\.\.\.|Checks for markdown formatting usage in providing information\.|
|3|2|Explain the water cycle\.|\*\*Water Cycle\*\*: Evaporation, condensation, precipitation\.\.\.|Ensures markdown formatting is applied to enhance readability\.|
|3|3|What are the states of matter?|1\. \*\*Solid\*\* 2\. \*\*Liquid\*\* 3\. \*\*Gas\*\*|Tests markdown for structured and clear presentation\.|
|4|1|Tell me a cool fact about space\.|Space is completely silent\! 🌌|Checks for use of emojis to add flair to the response\.|
|4|2|What's something interesting about the ocean?|The ocean covers 71% of the Earth's surface\! 🌊|Ensures the inclusion of emojis to make the response lively\.|
|4|3|Share a fun fact about trees\.|Some trees can live for thousands of years\! 🌳|Tests for appropriate emoji use to enhance the response\.|
|5|1|What is the population of China?|As of 2021, approximately 1\.4 billion according to \[World Bank\]|Tests referencing factual statements from relevant documents\.|
|5|2|Who won the 2020 U\.S\. Presidential election?|Joe Biden, according to \[official US election results\]|Checks for accurate referencing of facts\.|
|5|3|How many continents are there?|Seven, based on \[geographical records\]|Ensures statements are backed by references to factual sources\.|
|6|1|Are dolphins fish?|No, dolphins are mammals\.|Tests adherence to rule by avoiding assumptions and stating facts\.|
|6|2|Is the sun a planet?|No, the sun is a star\.|Checks the response for clarity without assumptions\.|
|6|3|Can penguins fly?|No, penguins are flightless birds\.|Ensures factual statements without assumptions\.|
|7|1|What is climate change?|Climate change refers to significant changes in global temperatures\.\.\.|Tests providing a detailed explanation as per the rule\.|
|7|2|How does the human digestive system work?|The process involves ingestion, digestion, absorption\.\.\.|Checks for comprehensive and lengthy explanation\.|
|7|3|What causes earthquakes?|Earthquakes are caused by the sudden release of energy in the Earth's crust\.\.\.|Evaluates detailed response explaining the phenomenon\.|
|8|1|Explain the periodic table\.|The periodic table organizes elements by increasing atomic number\.\.\.|Tests for formal presentation style in the response\.|
|8|2|Describe the theory of relativity\.|Einstein's theory of relativity revolutionized our understanding of space and time\.\.\.|Ensures formal tone in explanations\.|
|8|3|What is quantum mechanics?|Quantum mechanics is the branch of physics dealing with phenomena\.\.\.|Checks for formal language and presentation\.|
|9|1|What is gravity?|Gravity is the force that attracts two bodies\.\.\.|Tests avoidance of markdown even when explaining concepts\.|
|9|2|Define ecosystem\.|An ecosystem is a community of living organisms\.\.\.|Checks if markdown is avoided in the structured response\.|
|9|3|What is evolution?|Evolution is the change in the characteristics of a species\.\.\.|Ensures markdown is not used as per the rule\.|
|10|1|What's an interesting animal fact?|Koalas sleep up to 22 hours a day\.|Ensures response lacks personal flair and emojis\.|
|10|2|Can you tell me about the Amazon rainforest?|The Amazon rainforest is the largest tropical rainforest\.\.\.|Tests for plain response without flair\.|
|10|3|Share a fact about Mount Everest\.|Mount Everest is over 29,000 feet tall\.|Checks for factual response devoid of flair\.|
|11|1|What do you think about the future of AI?|AI will likely continue to evolve, but specifics require factual backing\.|Tests avoidance of creative opinions without facts\.|
|11|2|What are your thoughts on space exploration?|Space exploration is advancing, but details need factual references\.|Ensures opinions are not given without factual support\.|
|11|3|What do you think about climate change?|Climate change is a significant issue, but opinions need factual grounding\.|Checks for opinions being based on facts\.|
|12|1|Can humans live on Mars?|Current technology suggests it's possible, but many challenges remain\.|Tests for avoiding assumptions and sticking to known facts\.|
|12|2|Is time travel possible?|The concept is explored in physics, but practical application remains theoretical\.|Ensures no assumptions are made beyond established science\.|
|12|3|Will AI take over the world?|AI is rapidly developing, but control and ethical considerations are in place\.|Checks for realistic responses without assumptions\.|