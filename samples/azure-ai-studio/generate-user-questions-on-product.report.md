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



### [test_results.csv](./generate-user-questions-on-product.test_results.csv)

|id|promptid|model|error|input|output|
|-|-|-|-|-|-|
|68b60a8|ef1a34e|gpt\-4o\-mini||context: 'online shopping at home', persona: 'tech\-savvy young adult', product: 'smartphone', count: 3|\{"question":"What are the top features I should look for in a smartphone that suits my tech\-savvy lifestyle?"\}  <br>\{"question":"Are there any smartphones that offer customizable settings or interfaces for advanced users?"\}  <br>\{"question":"How do the latest smartphone models compare in terms of battery life and processing power?"\}|
|77573ae|ef1a34e|gpt\-4o\-mini||context: 'browsing in a local bookstore', persona: 'avid reader', product: 'e\-reader', count: 2|\{"question":"What features should I look for in an e\-reader to enhance my reading experience?"\}  <br>\{"question":"Are there any e\-readers that offer a larger screen for easier reading?"\}  <br>\{"question":"How does the battery life of different e\-readers compare?"\}  <br>\{"question":"Can I access my existing e\-books on any brand of e\-reader?"\}  <br>\{"question":"What is the difference between e\-ink and LCD screens in e\-readers?"\}  <br>\{"question":"Are there any e\-readers that are particularly good for reading in bright sunlight?"\}  <br>\{"question":"What are the best e\-readers available in this price range?"\}  <br>\{"question":"Do e\-readers have features for note\-taking or highlighting text?"\}  <br>\{"question":"Is it easy to buy and download new books on an e\-reader?"\}  <br>\{"question":"Can an e\-reader support multiple file formats for different types of e\-books?"\}|
|088722d|ef1a34e|gpt\-4o\-mini||context: 'commuting on a train', persona: 'busy professional', product: 'noise\-canceling headphones', count: 1|\{"question":"How effective are these noise\-canceling headphones at blocking out train noise?"\}  <br>\{"question":"Are they comfortable enough to wear for long periods during my commute?"\}  <br>\{"question":"Do they have a battery life that can last through my entire workday?"\}  <br>\{"question":"Can I take calls on these headphones while commuting?"\}  <br>\{"question":"How do they perform with ambient noise, like announcements or conversations?"\}|
|866e891|ef1a34e|gpt\-4o\-mini||context: 'visiting a pet store', persona: 'first\-time pet owner', product: 'dog food', count: 3|\{"question":"What type of dog food is best for my puppy's age and breed?"\}  <br>\{"question":"Are there any specific ingredients I should avoid in dog food?"\}  <br>\{"question":"How much dog food should I be feeding my puppy each day?"\}|
|30da306|ef1a34e|gpt\-4o\-mini||context: 'searching online for gifts', persona: 'thoughtful friend', product: 'personalized mug', count: 2|\{"question":"What customization options are available for the personalized mug?"\}  <br>\{"question":"How long does it take to receive the personalized mug after placing an order?"\}|
|0d4d94b|ef1a34e|gpt\-4o\-mini||context: 'exploring a tech conference', persona: 'innovative engineer', product: 'AI software tool', count: 1|\{"question":"What specific features does the AI software tool offer that could enhance my engineering projects?"\}|
|6ee9fb2|ef1a34e|gpt\-4o\-mini||context: 'attending college', persona: 'budget\-conscious student', product: 'laptop', count: 2|\{"question":"What are the best budget laptops for college students?"\}  <br>\{"question":"How long does the battery typically last on budget\-friendly laptops?"\}  <br>\{"question":"Are there any laptops that offer good performance for both schoolwork and light gaming?"\}  <br>\{"question":"What are the essential features I should look for in a laptop for my college courses?"\}  <br>\{"question":"Do budget laptops come with warranty options, and how reliable are they?"\}  <br>\{"question":"Can I get student discounts on laptops, and where can I find them?"\}  <br>\{"question":"What is the average price range for a decent laptop suitable for college?"\}  <br>\{"question":"Are there any specific brands known for offering good laptops at a lower price?"\}|
|686c704|ef1a34e|gpt\-4o\-mini||context: 'working from a café', persona: 'remote worker', product: 'portable charger', count: 3|\{"question":"How long does the portable charger last on a full charge?"\}  <br>\{"question":"Is this portable charger compatible with multiple devices, like my laptop and smartphone?"\}  <br>\{"question":"What is the charging speed of this portable charger? Will it charge my devices quickly while I'm working in the café?"\}|
|45fbf3a|ef1a34e|gpt\-4o\-mini||context: 'weekend hiking trip', persona: 'outdoors enthusiast', product: 'backpack', count: 1|\{"question":"What features should I look for in a backpack for a weekend hiking trip?"\}  <br>\{"question":"How much storage capacity do I need for a weekend hike?"\}  <br>\{"question":"Are there any specific brands that are known for quality hiking backpacks?"\}  <br>\{"question":"What is the best material for a backpack that can withstand outdoor conditions?"\}  <br>\{"question":"Should I prioritize weight or comfort when choosing a backpack for hiking?"\}  <br>\{"question":"Are there backpacks designed for hydration, and how do they work?"\}  <br>\{"question":"Can you recommend a good backpack that has a rain cover?"\}  <br>\{"question":"What are the best ways to organize gear within the backpack for easy access?"\}  <br>\{"question":"How do I choose the right size backpack based on my body type?"\}  <br>\{"question":"What accessories should I consider adding to my hiking backpack?"\}|