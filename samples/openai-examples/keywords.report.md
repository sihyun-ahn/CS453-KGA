## keywords ([json](./keywords.report.json))


### [prompty](./keywords.prompty)

`````md

---
name: Extract Elements of Text
description: Extract specific elements of text from a given text
source: OpenAI documentation
url: https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api
inputs: 
  text:
    type: string
---
Extract keywords from the corresponding texts below.

Text 1: Stripe provides APIs that web developers can use to integrate payment processing into their websites and mobile applications.
Keywords 1: Stripe, payment processing, APIs, web developers, websites, mobile applications
##
Text 2: OpenAI has trained cutting-edge language models that are very good at understanding and generating text. Our API provides access to these models and can be used to solve virtually any task that involves processing language.
Keywords 2: OpenAI, language models, text processing, API.
##
Text 3: {{text}}
Keywords 3:
`````


### [intent.txt](./keywords.intent.txt)

`````txt
Extract specific elements of text from a given text.
`````


### [input_spec.txt](./keywords.input_spec.txt)

`````txt
The input must be a string.  
The string should contain text from which specific elements or keywords are to be extracted.  
The text input should be coherent and contextually meaningful.  
There are no restrictions on the length of the input string.
`````


### [rules.txt](./keywords.rules.txt)

`````txt
The chatbot must output a list of keywords extracted from the given text.
Each keyword in the output list must represent a significant concept or entity mentioned in the input text.
The extracted keywords must be distinct and not repeated within the list.
The keywords must be presented as a list separated by commas. 
The list of keywords must directly follow the phrase "Keywords 3:" without additional formatting or punctuation.
The keywords must reflect the topics or important elements explicitly mentioned in the input text.
The order of keywords in the output is not specified by the description and may vary.
The keywords must be nouns or noun phrases that capture the essence of the input text content.
`````


### [inverse_rules.txt](./keywords.inverse_rules.txt)

`````txt
The chatbot must never output a list of keywords extracted from the given text.
Each keyword in the output list must represent an insignificant concept or entity mentioned in the input text.
The extracted keywords can be repeated within the list.
The keywords must not be presented as a list separated by commas.
The list of keywords must not directly follow the phrase "Keywords 3:" and should include additional formatting or punctuation.
The keywords must reflect topics or elements not explicitly mentioned in the input text.
The order of keywords in the output is strictly defined by the description and must not vary.
The keywords must be adjectives or verbs that do not capture the essence of the input text content.
`````


### [baseline_tests.txt](./keywords.baseline_tests.txt)

`````txt
text: Apple is a technology company that designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories. It also offers software, services, and digital content.
===
text: The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is one of the most recognizable structures in the world and a global cultural icon of France.
===
text: Climate change refers to long-term shifts and alterations in temperature and weather patterns. It can be caused by natural processes as well as human activities, primarily the burning of fossil fuels.

`````


### [tests.csv](./keywords.tests.csv)

|Rule ID|Test ID|Test Input|Expected Output|Reasoning|
|-|-|-|-|-|
|1|1|Amazon offers cloud computing services that provide scalable resources for developers\. It also supports machine learning capabilities\.|Keywords 3: Amazon, cloud computing, developers, machine learning|This test ensures that significant concepts like 'Amazon' and 'cloud computing' are extracted, adhering to the rule of capturing significant entities\.|
|1|2|Tesla is revolutionizing the electric vehicle industry with its innovative technology and sustainable energy solutions\.|Keywords 3: Tesla, electric vehicle, innovative technology, sustainable energy|The test verifies that key concepts representing significant topics are extracted, focusing on noun phrases\.|
|1|3|Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with carbon dioxide and water\.|Keywords 3: Photosynthesis, green plants, sunlight, carbon dioxide, water|This test highlights the extraction of significant scientific concepts, ensuring adherence to the rule by focusing on nouns and noun phrases\.|
|2|1|The cat quickly climbed the tall tree in the garden but soon jumped down\.|Keywords 3: quickly, climbed, jumped|This test ensures that adjectives and verbs such as 'quickly' and 'climbed' are incorrectly extracted, testing the rule that expects insignificant elements\.|
|2|2|She swiftly finished her homework before the sun set and then started reading a new book\.|Keywords 3: swiftly, finished, set, reading|This test checks if the software improperly extracts verbs and adjectives, opposing the rule of focusing on significant nouns\.|
|2|3|Running through the park, the dog excitedly chased after the ball\.|Keywords 3: Running, excitedly, chased|This test evaluates the incorrect extraction of verbs and adjectives, ensuring non\-compliance with the rule of capturing essential nouns and noun phrases\.|

### [test_evals.csv](./keywords.test_evals.csv)

|id|model|rule|input|evaluation|
|-|-|-|-|-|
|36d5488|gpt\-4o\-2024\-08\-06|The chatbot must output a list of keywords extracted from the given text\.|Amazon offers cloud computing services that provide scalable resources for developers\. It also supports machine learning capabilities\.|1\. Subject: Amazon<br>2\. Services: Cloud computing<br>3\. Features: Scalable resources, machine learning capabilities|
|b883073|gpt\-4o\-2024\-08\-06|The chatbot must output a list of keywords extracted from the given text\.|Tesla is revolutionizing the electric vehicle industry with its innovative technology and sustainable energy solutions\.|Output:<br>Tesla; electric vehicle industry; innovative technology; sustainable energy solutions|
|07848c6|gpt\-4o\-2024\-08\-06|The chatbot must output a list of keywords extracted from the given text\.|Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with carbon dioxide and water\.|Extracted Elements:<br>\- Photosynthesis<br>\- Green plants<br>\- Sunlight<br>\- Synthesize foods<br>\- Carbon dioxide<br>\- Water|
|c61c3d3|gpt\-4o\-2024\-08\-06|Each keyword in the output list must represent a significant concept or entity mentioned in the input text\.|The cat quickly climbed the tall tree in the garden but soon jumped down\.|\- Subject: The cat<br>\- Action: climbed<br>\- Object: the tall tree<br>\- Location: in the garden|
|237e70c|gpt\-4o\-2024\-08\-06|Each keyword in the output list must represent a significant concept or entity mentioned in the input text\.|She swiftly finished her homework before the sun set and then started reading a new book\.|1\. Action: finished her homework<br>2\. Time: before the sun set<br>3\. Action: started reading a new book|
|6dd8b27|gpt\-4o\-2024\-08\-06|Each keyword in the output list must represent a significant concept or entity mentioned in the input text\.|Running through the park, the dog excitedly chased after the ball\.|\- Action: Running through the park<br>\- Subject: The dog<br>\- Action: Chased after the ball<br>\- Emotion: Excitedly|

### [test_results.csv](./keywords.test_results.csv)

|id|promptid|model|error|input|output|
|-|-|-|-|-|-|
|36d5488|abd7e8b|gpt\-4o\-mini||Amazon offers cloud computing services that provide scalable resources for developers\. It also supports machine learning capabilities\.|Keywords 3: Amazon, cloud computing, scalable resources, developers, machine learning capabilities|
|b883073|abd7e8b|gpt\-4o\-mini||Tesla is revolutionizing the electric vehicle industry with its innovative technology and sustainable energy solutions\.|Keywords 3: Tesla, electric vehicle industry, innovative technology, sustainable energy solutions|
|07848c6|abd7e8b|gpt\-4o\-mini||Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with carbon dioxide and water\.|Keywords 3: Photosynthesis, green plants, organisms, sunlight, synthesize, foods, carbon dioxide, water|
|c61c3d3|abd7e8b|gpt\-4o\-mini||The cat quickly climbed the tall tree in the garden but soon jumped down\.|Keywords 3: cat, climbed, tall tree, garden, jumped down|
|237e70c|abd7e8b|gpt\-4o\-mini||She swiftly finished her homework before the sun set and then started reading a new book\.|Keywords 3: homework, sun set, reading, book\.|
|6dd8b27|abd7e8b|gpt\-4o\-mini||Running through the park, the dog excitedly chased after the ball\.|Keywords 3: dog, park, chased, ball, running, excitedly|