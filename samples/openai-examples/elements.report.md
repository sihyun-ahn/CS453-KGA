## [elements](samples/openai-examples/elements.prompty) ([json](./elements.report.json))


### [prompty](./elements.prompty)

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
Extract the important entities mentioned in the text below. First extract all company names, then extract all people names, then extract specific topics which fit the content and finally extract general overarching themes

Desired format:
Company names: <comma_separated_list_of_company_names>
People names: -||-
Specific topics: -||-
General themes: -||-

Text: {{text}}

`````


### [rules.txt](./elements.rules.txt)

`````txt
The output must begin with the phrase "Company names:" followed by a comma-separated list of company names extracted from the text.
The output must include the phrase "People names:" followed by a comma-separated list of people names extracted from the text.
The output must include the phrase "Specific topics:" followed by a comma-separated list of specific topics related to the content of the text.
The output must include the phrase "General themes:" followed by a comma-separated list of general overarching themes related to the text.
Each section (Company names, People names, Specific topics, General themes) must be clearly labeled and separated by line breaks in the order specified. 
All lists must be separated by commas without extra spaces, unless it is part of a name or topic.
`````


### [inverse_rules.txt](./elements.inverse_rules.txt)

`````txt
Company names must not be listed at the beginning, nor should they be separated by commas.  
People names should never be included or listed in any output.  
Specific topics must not be mentioned or listed in the output.  
General themes should not be listed or labeled in any way in the output.  
Each section must be unlabeled, jumbled, and not separated by line breaks.  
All lists must avoid using commas altogether, even within names or topics.
`````


### [input_spec.txt](./elements.input_spec.txt)

`````txt
The input must be a string.  
The input string should contain mentions of company names, people names, specific topics, and general themes.
`````


### [baseline_tests.txt](./elements.baseline_tests.txt)

`````txt
Text: Today, OpenAI announced a new partnership with Microsoft. Both companies aim to enhance AI-driven solutions. Sam Altman, CEO of OpenAI, and Satya Nadella, CEO of Microsoft, shared their vision for the future of AI at the event. The partnership focuses on advancing technologies in machine learning, natural language processing, and robotics.

===

Text: Tesla's CEO Elon Musk has once again sparked conversations about the future of autonomous vehicles. At a recent conference, Sundar Pichai, Google's CEO, discussed how Google is investing in AI to improve user experiences. Additionally, the event covered emerging technologies in the automotive industry and discussed broader impacts on society.

===

Text: Amazon and Apple are leading the charge in developing consumer-focused AI applications. Jeff Bezos, former CEO of Amazon, and Tim Cook, CEO of Apple, recently spoke about their latest innovations. The discussion highlighted advancements in voice assistants, smart home devices, and their potential impact on everyday life.
`````


### [tests.csv](./elements.tests.csv)

`````csv
Rule ID, Test ID, Test Input, Expected Output, Reasoning
1, 1, "Apple and Microsoft are leading companies in technology. Tim Cook and Satya Nadella are their respective CEOs.", "Company names: Apple,Microsoft\nPeople names: Tim Cook,Satya Nadella\nSpecific topics: technology\nGeneral themes: leadership", "Verifies the extraction of company names, people names, and specific topics in the correct format and order without additional spaces."
1, 2, "Tesla and SpaceX have been revolutionized by Elon Musk, focusing on innovation and sustainability.", "Company names: Tesla,SpaceX\nPeople names: Elon Musk\nSpecific topics: innovation,sustainability\nGeneral themes: technology,environment", "Ensures company and people names are correctly identified with specific topics and themes while maintaining the required format."
1, 3, "Google, Facebook, and Amazon have had significant impacts on e-commerce and social networking, spearheaded by figures like Sundar Pichai and Mark Zuckerberg.", "Company names: Google,Facebook,Amazon\nPeople names: Sundar Pichai,Mark Zuckerberg\nSpecific topics: e-commerce,social networking\nGeneral themes: technology,communication", "Validates the correct listing of multiple companies and individuals, ensuring output respects the prescribed format requirements."

2, 1, "Steve Jobs was instrumental in Apple's success, alongside Jonathan Ive's design innovations.", "Company names: Apple\nPeople names: Steve Jobs,Jonathan Ive\nSpecific topics: design,success\nGeneral themes: innovation,technology", "Tests proper identification of people names related to a specific company, ensuring adherence to the labeling and format requirements."
2, 2, "The collaboration between Bill Gates and Paul Allen led to the foundation of Microsoft, emphasizing software development.", "Company names: Microsoft\nPeople names: Bill Gates,Paul Allen\nSpecific topics: software development\nGeneral themes: collaboration,entrepreneurship", "Checks the correct extraction and formatting of founder names and related topics."
2, 3, "Oprah Winfrey has partnered with Weight Watchers to promote health and wellness.", "Company names: Weight Watchers\nPeople names: Oprah Winfrey\nSpecific topics: health,wellness\nGeneral themes: lifestyle,partnership", "Validates extraction of people names tied to a company and specific themes, ensuring format compliance."

3, 1, "The rise of electric vehicles by Tesla has sparked debates about renewable energy policies.", "Company names: Tesla\nPeople names: \nSpecific topics: electric vehicles,renewable energy\nGeneral themes: sustainability,innovation", "Ensures that specific topics are extracted even if no people names are present, respecting the required format."
3, 2, "Artificial intelligence is a growing field, with companies like IBM focusing on machine learning applications.", "Company names: IBM\nPeople names: \nSpecific topics: artificial intelligence,machine learning\nGeneral themes: technology,innovation", "Validates the identification of specific topics related to a company's field of work, ensuring correct output structure."
3, 3, "Blockchain technology is revolutionizing financial transactions, with companies like Bitcoin Inc. leading the charge.", "Company names: Bitcoin Inc.\nPeople names: \nSpecific topics: blockchain,financial transactions\nGeneral themes: finance,technology", "Tests the extraction of specific topics in the absence of people names, maintaining format consistency."

4, 1, "Environmental sustainability is a key theme for businesses like Patagonia and their leaders.", "Company names: Patagonia\nPeople names: \nSpecific topics: \nGeneral themes: environmental sustainability", "Verifies the correct extraction of a general theme when company names are present but no specific topics or people names are mentioned."
4, 2, "The overarching theme of global connectivity is driven by companies like Twitter, focusing on social interaction.", "Company names: Twitter\nPeople names: \nSpecific topics: social interaction\nGeneral themes: global connectivity", "Ensures general themes are extracted correctly when supported by specific topics, respecting format requirements."
4, 3, "Educational reforms are a central theme in the initiatives led by organizations like UNESCO.", "Company names: UNESCO\nPeople names: \nSpecific topics: educational reforms\nGeneral themes: education", "Tests the extraction of general themes centered around specific organizational initiatives with correct formatting."
`````
