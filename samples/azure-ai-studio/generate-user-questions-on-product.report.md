## generate-user-questions-on-product ([json](./generate-user-questions-on-product.report.json))


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


### [intent.txt](./generate-user-questions-on-product.intent.txt)

`````txt
Generate questions from a user on a given product.
`````


### [input_spec.txt](./generate-user-questions-on-product.input_spec.txt)

`````txt
The input must include a context describing where the user is accessing the product.
The input must include a persona describing the user themselves.
The input must include a product describing the item the user is interested in.
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

