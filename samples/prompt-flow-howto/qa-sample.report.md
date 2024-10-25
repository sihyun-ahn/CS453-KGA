## [qa-sample](samples/prompt-flow-howto/qa-sample.prompty)


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


### [input_spec.txt](./qa-sample.input_spec.txt)
`````txt
The input is a question.
The question can be about any topic.
The question may contain multiple parts.
The question can be a simple or complex query.
The question must be clearly stated.
The question should not contain harmful content.
The question should not be hateful, racist, sexist, lewd, or violent.
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
`````csv
Rule ID, Test ID, Test Input, Expected Output, Reasoning
1, 1, "How does photosynthesis work?", "Photosynthesis is the process by which green plants use sunlight to synthesize foods from carbon dioxide and water. 🌿", "Tests brevity and succinctness while being informative in a friendly tone."
1, 2, "What is the capital of France?", "Paris is the capital of France. 🗼", "Ensures the response is brief and to the point with a touch of flair."
1, 3, "Can you explain what a black hole is?", "A black hole is a region in space with gravity so strong that nothing can escape from it. 🌌", "Checks for succinctness and clarity, making sure the response is concise and engaging."

2, 1, "What's the history of the internet?", "The internet started in the 1960s as a project by the U.S. government and has grown into the massive network we use today. 💻", "Assesses the personable tone, ensuring the response is friendly and approachable."
2, 2, "Can you tell me about the discovery of penicillin?", "Alexander Fleming discovered penicillin in 1928, revolutionizing medicine! 🧪", "Tests the personable manner, ensuring the response is warm and engaging."
2, 3, "What are the main causes of climate change?", "Climate change is mainly caused by greenhouse gas emissions from human activities. 🌍", "Evaluates the personable style to make the response inviting and clear."

3, 1, "How to format text in markdown?", "Use **bold**, *italic*, and `code` for formatting.", "Checks that markdown formatting is correctly applied in the response."
3, 2, "Can you show me a markdown list?", "- Item 1\n- Item 2\n- Item 3", "Verifies the correct use of markdown for lists."
3, 3, "How do you create a hyperlink in markdown?", "[Link](http://example.com)", "Ensures markdown hyperlink formatting is used properly."

4, 1, "Tell me a fun fact about pandas", "Pandas spend around 14 hours a day eating bamboo. 🐼", "Assesses the use of emojis to add personal flair to the response."
4, 2, "What's a cool fact about space?", "Space is completely silent! 🌌", "Checks for the incorporation of emojis to enhance the response."
4, 3, "Share an interesting tidbit about dolphins", "Dolphins sleep with one eye open. 🐬", "Evaluates the use of personal flair and emojis to make the response lively."

5, 1, "What are the benefits of drinking water?", "According to [relevant documents], water helps maintain bodily functions and energy levels.", "Tests the requirement to reference factual statements to relevant documents."
5, 2, "How is climate change affecting polar bears?", "Based on [relevant documents], polar bears are losing their habitat due to melting ice.", "Ensures citations from relevant documents are used for factual accuracy."
5, 3, "What is the importance of voting?", "Voting impacts policies and governance, as stated in [relevant documents].", "Verifies that factual references are made to support statements."

6, 1, "What is the tallest mountain?", "Mount Everest is the tallest mountain at 8,848 meters above sea level.", "Confirms that the response avoids making assumptions and states clear facts."
6, 2, "How do vaccines work?", "Vaccines stimulate the body's immune response without causing illness.", "Ensures no assumptions are made and the response is based on factual information."
6, 3, "Is the Earth flat?", "No, evidence shows the Earth is an oblate spheroid.", "Checks that the response is based on established facts and avoids assumptions."
`````
