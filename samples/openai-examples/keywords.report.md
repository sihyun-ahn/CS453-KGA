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

|Rule ID|Test ID|Test Input|Expected Output|Reasoning|model|actualOutput|status|
|-|-|-|-|-|-|-|-|
|1|1|Amazon offers cloud computing services that provide scalable resources for developers\. It also supports machine learning capabilities\.|Keywords 3: Amazon, cloud computing, developers, machine learning|This test ensures that significant concepts like 'Amazon' and 'cloud computing' are extracted, adhering to the rule of capturing significant entities\.|phi3\.5|1\. Amazon<br>2\. Cloud Computing Services<br>3\. Scalable Resources<br>4\. Developers Support<br>5\. Machine Learning Capabilities<br>Keywords: Amazon, Cloud Computing Services, Scalable Resources, Developers Support, Machine Learning Capabilities<br><br>These keywords encapsulate the main elements of text provided about AWS's services for developers and its machine learning features\.|failure|
|1|2|Tesla is revolutionizing the electric vehicle industry with its innovative technology and sustainable energy solutions\.|Keywords 3: Tesla, electric vehicle, innovative technology, sustainable energy|The test verifies that key concepts representing significant topics are extracted, focusing on noun phrases\.|phi3\.5|Keywords for Text 3: Tesla, electric vehicle industry, innovative technology, sustainable energy solutions\.|failure|
|1|3|Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with carbon dioxide and water\.|Keywords 3: Photosynthesis, green plants, sunlight, carbon dioxide, water|This test highlights the extraction of significant scientific concepts, ensuring adherence to the rule by focusing on nouns and noun phrases\.|phi3\.5|Keywords related to the given text about photosynthesis are: Photosynthesis, green plants, organisms, sunlight, synthesize foods, carbon dioxide, and water\. These keywords represent the core elements of the process being described in the original text\. Here's a breakdown for clarity:<br><br>1\. Photosynthesis \- The central concept or topic \(noun\) from which other relevant terms stem\.<br>2\. Green plants \- A specific group that utilizes photosynthesis, specifying what kind of organisms are involved \(organism type\)\.<br>3\. Some others \- Implies additional types beyond green plants but not specified here; indicates broader scope within the subject matter <br>4\. Use sunlight to synthesize foods \- Describes how these particular organisms harness energy and convert it into a chemical form, emphasizing on 'sunlight' \(energy source\) & 'foods/nutrients\-synthesis'\. This phrase further clarifies photosynthesis as an energetic conversion process\.<br>5\. Carbon dioxide \- Indicates the raw materials taken in by plants for synthesis during this energy conversion, pointing towards a biological aspect of photosynthesis \(chemical substrate\)\. <br>6\. Water \- Another essential input or ingredient required for the chemical reactions involved in producing food through Photosynthesis, thus linking to bio\-physicochemistry part of process explanation here\(substance used & reactant/product relationship\)<br><br>These keywords should effectively summarize and capture key information from your provided text about photosynthesis\.|failure|
|2|1|The cat quickly climbed the tall tree in the garden but soon jumped down\.|Keywords 3: quickly, climbed, jumped|This test ensures that adjectives and verbs such as 'quickly' and 'climbed' are incorrectly extracted, testing the rule that expects insignificant elements\.|phi3\.5|1\. Cat<br>2\. Climbed<br>3\. Tall Tree<br>4\. Garden<br>5\. Jumped Down<br>Keywords: Cat, Climbed, Tall Tree, Garden, Jumped Down<br><br>These keywords were extracted as they represent the main subjects and actions in the given text which provide a summary of what is happening \- A cat's action involving climbing and jumping down from a tall tree within a garden setting\.|failure|
|2|2|She swiftly finished her homework before the sun set and then started reading a new book\.|Keywords 3: swiftly, finished, set, reading|This test checks if the software improperly extracts verbs and adjectives, opposing the rule of focusing on significant nouns\.|phi3\.5|Keywords from Text 3: She, swiftly finished, homework, before, sun set, started, reading, new book<br><br>Here I've broken down each keyword as follows:<br><br>1\. "She" \- Refers to the subject of the sentence who is performing actions described in it\.<br>2\. "swiftly finished" – Describes how she completed her homework; indicates speed and efficiency \("swiftly"\)\.<br>3\. "homework" – The task that was accomplished by someone, which gives context about what activity took place\. <br>4\. "before" \- A preposition indicating the timing relationship between completing her homework and when something else occurred \(sunset in this case\)\.<br>5\. "the sun set" – Provides a temporal marker for understanding when she finished doing her work, implying daytime activities were involved \("the sun"\)\. <br>6\. "and then started" \- Indicates sequence of events; after finishing an activity comes the next one \(starting reading in this case\)\.<br>7\. "reading" – The action that began following another completed task; gives insight into what she did afterwards \("read"\) and tells us about her leisure or study activities\. <br>8\. "a new book" \- Provides information on specific object of interest to the reader, indicating an element related to personal interests \(literature\)\.<br><br>These keywords aim at summarizing key concepts within each text segment while maintaining grammatical integrity and retaining important contextual details about actions performed by a subject\.|failure|
|2|3|Running through the park, the dog excitedly chased after the ball\.|Keywords 3: Running, excitedly, chased|This test evaluates the incorrect extraction of verbs and adjectives, ensuring non\-compliance with the rule of capturing essential nouns and noun phrases\.|phi3\.5|1\. Park<br>2\. Dog<br>3\. Chased<br>4\. Ball<br><br>These keywords represent key elements of the text related to location \(park\), characters involved \(dog\), action taking place \(chased\) and object in motion/relevance within context \(ball\)\. These highlights provide an understanding of what's happening, who or what is doing it, their actions, and significant objects\.|failure|
||||||qwen2\.5:3b|||
||||||qwen2\.5:3b|||
||||||qwen2\.5:3b|||
||||||qwen2\.5:3b|||
||||||qwen2\.5:3b|||
||||||qwen2\.5:3b|||
|1|1|Amazon offers cloud computing services that provide scalable resources for developers\. It also supports machine learning capabilities\.|Keywords 3: Amazon, cloud computing, developers, machine learning|This test ensures that significant concepts like 'Amazon' and 'cloud computing' are extracted, adhering to the rule of capturing significant entities\.|llama3\.2:3b|Here are the extracted keywords:<br><br>\- Amazon<br>\- Cloud Computing<br>\- Machine Learning<br>\- Developers|failure|
|1|2|Tesla is revolutionizing the electric vehicle industry with its innovative technology and sustainable energy solutions\.|Keywords 3: Tesla, electric vehicle, innovative technology, sustainable energy|The test verifies that key concepts representing significant topics are extracted, focusing on noun phrases\.|llama3\.2:3b|\#\# Extracted Keywords:<br><br>\- Tesla<br>\- Electric Vehicle<br>\- Industry<br>\- Innovation<br>\- Technology<br>\- Sustainable Energy<br>\- Solutions|failure|
|1|3|Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with carbon dioxide and water\.|Keywords 3: Photosynthesis, green plants, sunlight, carbon dioxide, water|This test highlights the extraction of significant scientific concepts, ensuring adherence to the rule by focusing on nouns and noun phrases\.|llama3\.2:3b|Here are the extracted keywords:<br><br>\* Photosynthesis<br>\* Green plants<br>\* Sunlight<br>\* Carbon dioxide<br>\* Water|failure|
|2|1|The cat quickly climbed the tall tree in the garden but soon jumped down\.|Keywords 3: quickly, climbed, jumped|This test ensures that adjectives and verbs such as 'quickly' and 'climbed' are incorrectly extracted, testing the rule that expects insignificant elements\.|llama3\.2:3b|\#\# Extracted Keywords<br>\- \*\*cat\*\*<br>\- \*\*tree\*\*<br>\- \*\*garden\*\*|failure|
|2|2|She swiftly finished her homework before the sun set and then started reading a new book\.|Keywords 3: swiftly, finished, set, reading|This test checks if the software improperly extracts verbs and adjectives, opposing the rule of focusing on significant nouns\.|llama3\.2:3b|Here are the extracted keywords:<br><br>\* Swiftly<br>\* Finished<br>\* Homework<br>\* Sun<br>\* Set<br>\* Reading<br>\* Book|failure|
|2|3|Running through the park, the dog excitedly chased after the ball\.|Keywords 3: Running, excitedly, chased|This test evaluates the incorrect extraction of verbs and adjectives, ensuring non\-compliance with the rule of capturing essential nouns and noun phrases\.|llama3\.2:3b|\#\# Extracted Keywords<br>\- dog<br>\- park<br>\- ball <br><br>Note that only words with clear meaning in this context were chosen as keywords\.|failure|
||||||llama3\.1:8b|||
||||||llama3\.1:8b|||
||||||llama3\.1:8b|||
||||||llama3\.1:8b|||
||||||llama3\.1:8b|||
||||||llama3\.1:8b|||
||||||gemma2:9b|||
||||||gemma2:9b|||
||||||gemma2:9b|||
||||||gemma2:9b|||
||||||gemma2:9b|||
||||||gemma2:9b|||