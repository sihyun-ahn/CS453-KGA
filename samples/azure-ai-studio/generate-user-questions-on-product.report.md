## [generate-user-questions-on-product](samples/azure-ai-studio/generate-user-questions-on-product.prompty)


### [prompty](./generate-user-questions-on-product.prompty)
`````md
---
name: 'Generate User Questions on Product'
description: 'Generate questions from a user on a given product.'
source: Azure AI Studio Prompt Catalog
url: https://ai.azure.com/explore/prompts/chat_user_questions/version/0.0.1/registry/azureml?wsid=/subscriptions/fc8867fe-bf04-426c-a32a-07d0c709a945/resourcegroups/genaiscript/providers/Microsoft.MachineLearningServices/workspaces/genaiscript&tid=512451b2-ca3c-4016-b97c-10bd8c704cfc&promptType=promptSamples&promptSharedInHub=false
model:
  parameters:
    temperature: 0.7
    top_p: 0.95
    max_tokens: 800
inputs:
  count:
    type: number
  persona:
    type: string
  product:
    type: string
sample:
    count: 3
    persona: "A student who is looking to buy a new laptop for their studies."
    product: "MacBook Pro"
---
system:
Your goal is to generate questions from a user on a given product.

You are given a context, a persona and a product.
The context describes where the user is accessing the product.
The persona describes the user themselves.
The product is the item the user is interested in.

# instructions
- empathize with the user based on the given persona
- imagine a situation grounded in the given context where the user would access the product
- generate {{count}} question(s) this user would have on this product
- return the {{count}} question(s) in JSONL format `{"question":"[QUESTION]"}`


user:
- context: {{context}}
- persona: {{persona}}
- product: {{product}}


`````


### [rules.txt](./generate-user-questions-on-product.rules.txt)
`````txt
The output must contain a number of questions specified by the variable `{{count}}`.
Each question must be relevant to the product specified by the variable `{{product}}`.
Each question must reflect an understanding of the user’s situation as described by the variable `{{context}}`.
Each question must empathize with the user based on the persona described by the variable `{{persona}}`.
Each question must be returned in JSONL format.
Each line in the JSONL format must contain exactly one JSON object.
Each JSON object must have a single key, "question".
The key "question" in each JSON object must be associated with a string value representing the question.
The string value in the "question" field must be enclosed in double quotes.
The output must not contain any extraneous text or data outside the JSONL formatted questions.
`````


### [inverse_rules.txt](./generate-user-questions-on-product.inverse_rules.txt)
`````txt
The output must contain a number of answers that is not specified by the variable `{{count}}`.
Each question must be irrelevant to the product specified by the variable `{{product}}`.
Each question must disregard the user’s situation as described by the variable `{{context}}`.
Each question must lack empathy with the user based on the persona described by the variable `{{persona}}`.
Each question must be returned in a format other than JSONL.
Each line must contain more than one JSON object.
Each JSON object must have multiple keys, excluding "question".
The string value in the "question" field must be enclosed in single quotes.
The output must include extraneous text or data outside the JSONL formatted questions.
`````


### [input_spec.txt](./generate-user-questions-on-product.input_spec.txt)
`````txt
The input must include a context that describes the location or situation where the user is accessing the product.
The input must include a persona that characterizes the user's identity or traits.
The input must include a product that specifies the item the user is interested in.
The input must specify a count indicating the number of questions to be generated.
`````


### [baseline_tests.txt](./generate-user-questions-on-product.baseline_tests.txt)
`````txt
Test Case 1:
context: "An online electronics store"
persona: "A professional photographer looking for a high-performance camera for wildlife photography."
product: "Canon EOS R5"
count: 5
===

Test Case 2:
context: "During a summer sale at a local supermarket"
persona: "A health-conscious individual searching for a new juicer to make fresh juices at home."
product: "Breville Juice Fountain Plus"
count: 2
===

Test Case 3:
context: "Browsing a popular e-commerce website"
persona: "A gamer interested in a high-end gaming chair to enhance their gaming experience."
product: "Secretlab Titan Evo 2022"
count: 4
`````


### [tests.csv](./generate-user-questions-on-product.tests.csv)
`````csv
Rule ID, Test ID, Test Input, Expected Output, Reasoning
1, 1, "context: library, persona: student, product: digital notebook, count: 2", "{\"question\":\"How can I organize my notes efficiently using the digital notebook?\"}\n{\"question\":\"Is the digital notebook compatible with my study schedule?\"}", "Checks if the software generates exactly 2 questions as specified by the count."
1, 2, "context: coffee shop, persona: freelancer, product: laptop, count: 1", "{\"question\":\"Does this laptop have features that support multitasking in a coffee shop environment?\"}", "Verifies generation of 1 question to match the count and assesses the working environment."
1, 3, "context: gym, persona: fitness enthusiast, product: smartwatch, count: 3", "{\"question\":\"Can this smartwatch track my workouts accurately in the gym?\"}\n{\"question\":\"Does the smartwatch sync with gym equipment?\"}\n{\"question\":\"How does the smartwatch measure fitness progress in a gym setting?\"}", "Ensures 3 questions are generated per count, all focused on gym use."

2, 1, "context: home, persona: parent, product: educational tablet, count: 2", "{\"question\":\"Is this educational tablet suitable for children?\"}\n{\"question\":\"What educational apps are available on the tablet?\"}", "Tests relevance of questions to the educational tablet, based on product focus."
2, 2, "context: office, persona: manager, product: ergonomic chair, count: 1", "{\"question\":\"Does the ergonomic chair support lengthy office work sessions?\"}", "Validates the question's relevance to the ergonomic chair product."
2, 3, "context: park, persona: photographer, product: camera, count: 2", "{\"question\":\"Is the camera suitable for nature photography in a park?\"}\n{\"question\":\"How does the camera perform in outdoor lighting conditions?\"}", "Checks if questions are related to the camera, focusing on the product's application."

3, 1, "context: city commute, persona: commuter, product: e-scooter, count: 1", "{\"question\":\"Is this e-scooter suitable for daily city commutes?\"}", "Ensures question reflects the context of city commuting and user situation."
3, 2, "context: beach, persona: tourist, product: sunblock, count: 2", "{\"question\":\"Does this sunblock provide adequate protection for a day at the beach?\"}\n{\"question\":\"Is the sunblock water-resistant for swimming?\"}", "Generates questions considering the beach context and sunblock usage."
3, 3, "context: mountain trail, persona: hiker, product: hiking boots, count: 1", "{\"question\":\"Are these hiking boots comfortable for long mountain trails?\"}", "Focuses on mountain trail context, aligning with user's hiking needs."

4, 1, "context: home office, persona: remote worker, product: noise-canceling headphones, count: 2", "{\"question\":\"Can these headphones block out distractions in a home office?\"}\n{\"question\":\"Do the headphones provide comfort for extended use?\"}", "Assesses empathy by relating to home office distractions and comfort needs."
4, 2, "context: art studio, persona: artist, product: drawing tablet, count: 1", "{\"question\":\"How does the drawing tablet enhance artistic creativity in the studio?\"}", "Empathy reflected through understanding artistic uses in a studio."
4, 3, "context: university, persona: lecturer, product: presentation software, count: 3", "{\"question\":\"Does the software offer features to enhance lecture presentations?\"}\n{\"question\":\"Is the presentation software easy to use for lectures?\"}\n{\"question\":\"Can the software integrate multimedia for class presentations?\"}", "Empathizes with lecturer's need for effective presentation tools."
`````
