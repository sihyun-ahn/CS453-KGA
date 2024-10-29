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
|68b60a8|ef1a34e|mistral\-nemo||context: 'online shopping at home', persona: 'tech\-savvy young adult', product: 'smartphone', count: 3|\[<br>  \{<br>    "question": "How does the battery life compare to my current smartphone, and how long will it take to fully charge?"<br>  \},<br>  \{<br>    "question": "Is this smartphone compatible with wireless charging? If so, which standards does it support?"<br>  \},<br>  \{<br>    "question": "As someone who enjoys gaming on their phone, can you tell me about the graphics capabilities of this model and if there are any notable improvements over its predecessor?"<br>  \}<br>\]|
|77573ae|ef1a34e|mistral\-nemo||context: 'browsing in a local bookstore', persona: 'avid reader', product: 'e\-reader', count: 2|\[<br>  \{"question": "How many books can be stored on this e\-reader?"\},<br>  \{"question": "Can the screen brightness be adjusted for night\-time reading?"\}<br>\]|
|088722d|ef1a34e|mistral\-nemo||context: 'commuting on a train', persona: 'busy professional', product: 'noise\-canceling headphones', count: 1|\`\`\`json<br>\{"question": "How effective are these noise\-canceling headphones in blocking out the loud noises of a packed train?"\}<br>\`\`\`|
|866e891|ef1a34e|mistral\-nemo||context: 'visiting a pet store', persona: 'first\-time pet owner', product: 'dog food', count: 3|\[<br>  \{"question": "What kind of dog food is best for my new puppy?"\},<br>  \{"question": "How do I transition my adult rescue dog to this brand of dog food?"\},<br>  \{"question": "Which flavors are most palatable for dogs and which should I avoid?"\}<br>\]|
|30da306|ef1a34e|mistral\-nemo||context: 'searching online for gifts', persona: 'thoughtful friend', product: 'personalized mug', count: 2|\[<br>  \{"question": "Can I include a photo of my friend's pet on the mug?"\},<br>  \{"question": "Are there different fonts and colors to choose from for personalizing the text?"\}<br>\]|
|0d4d94b|ef1a34e|mistral\-nemo||context: 'exploring a tech conference', persona: 'innovative engineer', product: 'AI software tool', count: 1|\{<br>  "question": "How does this AI software tool integrate with the other technologies I'm using at the conference?"<br>\}|
|6ee9fb2|ef1a34e|mistral\-nemo||context: 'attending college', persona: 'budget\-conscious student', product: 'laptop', count: 2|\[<br>  \{"question": "What is the battery life like on this laptop? As a budget\-conscious student, I need to ensure it lasts through my long hours at the library\."\},<br>  \{"question": "Are there any good bundle deals available for this laptop? Given my tight budget, I'd appreciate discounts on accessories too\."\}<br>\]|
|686c704|ef1a34e|mistral\-nemo||context: 'working from a café', persona: 'remote worker', product: 'portable charger', count: 3|\[<br>  \{"question": "How many times can I charge my phone with this portable charger before it needs to be recharged?"\},<br>  \{"question": "Is this portable charger compatible with the café's power outlets in case I forget my adapter?"\},<br>  \{"question": "Can this charger provide a fast charge for my phone while I'm working in the café?"\}<br>\]|
|45fbf3a|ef1a34e|mistral\-nemo||context: 'weekend hiking trip', persona: 'outdoors enthusiast', product: 'backpack', count: 1|\`\`\`json<br>\{"question": "I'm planning a weekend hiking trip\. Does this backpack have enough capacity for all the gear and supplies I'll need? How many liters is it?"\}<br>\`\`\`|
|68b60a8|ef1a34e|mistral\-small:22b||context: 'online shopping at home', persona: 'tech\-savvy young adult', product: 'smartphone', count: 3| \`\`\`jsonl<br>\{"question":"What are the best smartphones under $500 with good cameras?"\}<br>\{"question":"Which smartphone has the fastest charging speed and longest battery life?"\}<br>\{"question":"Are there any new smartphones expected to launch soon that I should wait for?"\}<br>\`\`\`|
|77573ae|ef1a34e|mistral\-small:22b||context: 'browsing in a local bookstore', persona: 'avid reader', product: 'e\-reader', count: 2| \`\`\`jsonl<br>\{"question":"What is the battery life of this e\-reader like?"\}<br>\{"question":"How does the screen compare to traditional paper books in terms of eye strain?"\}<br>\`\`\`|
|088722d|ef1a34e|mistral\-small:22b||context: 'commuting on a train', persona: 'busy professional', product: 'noise\-canceling headphones', count: 1| Certainly\! Here's the question generated for the given persona, context, and product:<br><br>\`\`\`jsonl<br>\{"question":"Do these noise\-canceling headphones have a long battery life suitable for my daily train commute?"\}<br>\`\`\`|
|866e891|ef1a34e|mistral\-small:22b||context: 'visiting a pet store', persona: 'first\-time pet owner', product: 'dog food', count: 3| Here are the questions in JSONL format based on the given context, persona, and product:<br><br>\`\`\`jsonl<br>\{"question":"What is the best dog food for a puppy?"\}<br>\{"question":"How do I choose the right dog food for my new pet?"\}<br>\{"question":"Are there any special ingredients to look out for in dog food?"\}<br>\`\`\`|
|30da306|ef1a34e|mistral\-small:22b||context: 'searching online for gifts', persona: 'thoughtful friend', product: 'personalized mug', count: 2| \`\`\`jsonl<br>\{"question":"What kinds of customizations can I add to the personalized mug?"\}<br>\{"question":"How durable is the mug, especially if it's going to be used daily? Are there any options for durability upgrades?"\}<br>\`\`\`|
|0d4d94b|ef1a34e|mistral\-small:22b||context: 'exploring a tech conference', persona: 'innovative engineer', product: 'AI software tool', count: 1| \`\`\`jsonl<br>\{"question":"What are the key features of this AI software tool that would make it stand out among others at a tech conference?"\}<br>\`\`\`|
|6ee9fb2|ef1a34e|mistral\-small:22b||context: 'attending college', persona: 'budget\-conscious student', product: 'laptop', count: 2| \[<br>  \{"question":"What are the most affordable laptop options for college students?"\},<br>  \{"question":"Are there any reliable laptops available that won't break my budget as a college student?"\}<br>\]|
|686c704|ef1a34e|mistral\-small:22b||context: 'working from a café', persona: 'remote worker', product: 'portable charger', count: 3| \`\`\`jsonl<br>\{"question": "How long can this portable charger power my laptop during a typical workday?"\}<br>\{"question": "What are the safety features of this portable charger to prevent overheating while I'm using it at the café?"\}<br>\{"question": "Does this portable charger have multiple USB ports so I can charge both my laptop and phone simultaneously?"\}<br>\`\`\`|
|45fbf3a|ef1a34e|mistral\-small:22b||context: 'weekend hiking trip', persona: 'outdoors enthusiast', product: 'backpack', count: 1| \`\`\`jsonl<br>\{"question":"What are the best features of this backpack for long weekend hikes in challenging terrain?"\}<br>\`\`\`|
|68b60a8|ef1a34e|deepseek\-coder\-v2:16b||context: 'online shopping at home', persona: 'tech\-savvy young adult', product: 'smartphone', count: 3| \`\`\`jsonl<br>\{"question":"Can you recommend a good smartphone for someone who loves taking high\-quality photos and editing videos?"\}<br>\`\`\`|
|77573ae|ef1a34e|deepseek\-coder\-v2:16b||context: 'browsing in a local bookstore', persona: 'avid reader', product: 'e\-reader', count: 2| \`\`\`jsonl<br>\{"question":"What features does the e\-reader have that would make it easier for me to manage my large book collection?"\}<br>\{"question":"Are there any special discounts or promotions available for avid readers when purchasing an e\-reader?"\}<br>\`\`\`|
|088722d|ef1a34e|deepseek\-coder\-v2:16b||context: 'commuting on a train', persona: 'busy professional', product: 'noise\-canceling headphones', count: 1| \{"question":"What are the key features of these noise\-canceling headphones that would be most useful for someone who commutes frequently by train?"\}|
|866e891|ef1a34e|deepseek\-coder\-v2:16b||context: 'visiting a pet store', persona: 'first\-time pet owner', product: 'dog food', count: 3| \{"question":"What type of dog food should I start with as a first\-time pet owner?"\}|
|30da306|ef1a34e|deepseek\-coder\-v2:16b||context: 'searching online for gifts', persona: 'thoughtful friend', product: 'personalized mug', count: 2| \{"question":"Hey, I'm helping a thoughtful friend who is searching online for gifts and has decided to buy a personalized mug\. Could you help me understand what kind of customization options are available on this particular type of mug?"\}|
|0d4d94b|ef1a34e|deepseek\-coder\-v2:16b||context: 'exploring a tech conference', persona: 'innovative engineer', product: 'AI software tool', count: 1| \`\`\`jsonl<br>\{"question":"Can you explain how this AI software tool can help me innovate and improve my engineering projects?"\}<br>\`\`\`|
|6ee9fb2|ef1a34e|deepseek\-coder\-v2:16b||context: 'attending college', persona: 'budget\-conscious student', product: 'laptop', count: 2| \`\`\`jsonl<br>\{"question":"What are some affordable laptop options for a budget\-conscious student attending college?"\}<br>\{"question":"How can I ensure the battery life of my new laptop is maximized while staying within my budget as a college student?"\}<br>\`\`\`|
|686c704|ef1a34e|deepseek\-coder\-v2:16b||context: 'working from a café', persona: 'remote worker', product: 'portable charger', count: 3| \{ "question": "What are some tips for efficiently managing my mobile phone battery while working remotely in a café?" \}|
|45fbf3a|ef1a34e|deepseek\-coder\-v2:16b||context: 'weekend hiking trip', persona: 'outdoors enthusiast', product: 'backpack', count: 1| \{<br>  "questions": \[<br>    \{<br>      "question": "What are some key features of the backpack that you think would be most useful for a weekend hiking trip?"<br>    \},<br>    \{<br>      "question": "Given your experience as an outdoors enthusiast, what should I consider when choosing a backpack for similar trips in the future?"<br>    \}<br>  \]<br>\}|