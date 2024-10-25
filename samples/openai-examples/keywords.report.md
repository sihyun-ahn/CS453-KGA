## [keywords](samples/openai-examples/keywords.prompty)


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


### [input_spec.txt](./keywords.input_spec.txt)
`````txt
The input must be a single string of text. The input string can describe any topic or subject matter.
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
`````csv
Rule ID, Test ID, Test Input, Expected Output, Reasoning
1, 1, "Python is a popular programming language used for web development, data analysis, artificial intelligence, and scientific computing.", "Keywords 3: Python, programming language, web development, data analysis, artificial intelligence, scientific computing", "The test checks for accurate extraction and distinct representation of significant concepts mentioned in the text."
1, 2, "Tesla, founded by Elon Musk, is known for its electric vehicles and renewable energy products.", "Keywords 3: Tesla, Elon Musk, electric vehicles, renewable energy products", "Ensures that the software identifies key entities and concepts without repetition while covering a range of noun phrases."
1, 3, "The Amazon rainforest is home to diverse wildlife and significant ecological resources.", "Keywords 3: Amazon rainforest, wildlife, ecological resources", "Validates that the software extracts distinct nouns and noun phrases representing the core topics of the input text."

2, 1, "Apple Inc. designs and manufactures consumer electronics, computer software, and online services.", "Keywords 3: Apple Inc., consumer electronics, computer software, online services", "Focuses on assessing the software's ability to extract key entities and concepts as separate keywords."
2, 2, "Shakespeare's plays are renowned for their intricate characters and complex themes.", "Keywords 3: Shakespeare, plays, characters, themes", "Tests the extraction of significant literary elements and ensures no repetition of keywords."
2, 3, "The Great Wall of China is an iconic symbol of China's history and cultural heritage.", "Keywords 3: Great Wall of China, symbol, history, cultural heritage", "Checks for distinct keyword extraction related to historical and cultural concepts."

3, 1, "Microsoft offers a suite of productivity tools, including Word, Excel, and PowerPoint.", "Keywords 3: Microsoft, productivity tools, Word, Excel, PowerPoint", "Aims to validate the extraction and representation of product names and related concepts as distinct keywords."
3, 2, "The Mona Lisa is a world-famous painting by Leonardo da Vinci housed in the Louvre Museum.", "Keywords 3: Mona Lisa, painting, Leonardo da Vinci, Louvre Museum", "Ensures extraction of key concepts and entities without repetition, focusing on art and location."
3, 3, "NASA's missions to Mars have advanced our understanding of space exploration and planetary science.", "Keywords 3: NASA, missions, Mars, space exploration, planetary science", "Tests the identification of significant scientific and organizational elements as distinct keywords."
`````
