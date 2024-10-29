## elements ([json](./elements.report.json))


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


### [intent.txt](./elements.intent.txt)

`````txt
Extract specific elements of text from a given text.
`````


### [input_spec.txt](./elements.input_spec.txt)

`````txt
The input is a block of text.
The text must be provided as a single string.
The string can contain multiple sentences or paragraphs.
The text may include mentions of company names.
The text may include mentions of people names.
The text may discuss specific topics related to the content.
The text may contain overarching general themes.
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


### [baseline_tests.txt](./elements.baseline_tests.txt)

`````txt
Text: Today, OpenAI announced a new partnership with Microsoft. Both companies aim to enhance AI-driven solutions. Sam Altman, CEO of OpenAI, and Satya Nadella, CEO of Microsoft, shared their vision for the future of AI at the event. The partnership focuses on advancing technologies in machine learning, natural language processing, and robotics.

===

Text: Tesla's CEO Elon Musk has once again sparked conversations about the future of autonomous vehicles. At a recent conference, Sundar Pichai, Google's CEO, discussed how Google is investing in AI to improve user experiences. Additionally, the event covered emerging technologies in the automotive industry and discussed broader impacts on society.

===

Text: Amazon and Apple are leading the charge in developing consumer-focused AI applications. Jeff Bezos, former CEO of Amazon, and Tim Cook, CEO of Apple, recently spoke about their latest innovations. The discussion highlighted advancements in voice assistants, smart home devices, and their potential impact on everyday life.
`````


### [tests.csv](./elements.tests.csv)

|Rule ID|Test ID|Test Input|Expected Output|Reasoning|
|-|-|-|-|-|
|1|1|Today, Apple Inc\. announced a new product release\. The CEO, Tim Cook, stated that the company aims to innovate\.|Company names: Apple Inc\.\\nPeople names: Tim Cook\\nSpecific topics: product release\\nGeneral themes: innovation|Tests the extraction of a company name and a person's name, as well as specific topics and general themes\. All input specifications are followed\.|
|1|2|Microsoft Corporation has been in talks with Google to enhance AI capabilities\. Satya Nadella and Sundar Pichai discussed future collaborations\.|Company names: Microsoft Corporation, Google\\nPeople names: Satya Nadella, Sundar Pichai\\nSpecific topics: AI capabilities, collaborations\\nGeneral themes: technology advancement|Valid test case as it includes multiple entities in each category, adhering to the input specifications\.|
|1|3|Tesla's latest development in renewable energy was highlighted by Elon Musk\. The focus on sustainability continues\.|Company names: Tesla\\nPeople names: Elon Musk\\nSpecific topics: renewable energy\\nGeneral themes: sustainability|Covers a different industry and checks extraction of varied elements, following the input specifications\.|
|2|1|The recent conference featured speakers like Jane Doe from ABC Corp and John Smith of XYZ Ltd\.|Company names: ABC Corp, XYZ Ltd\\nPeople names: Jane Doe, John Smith\\nSpecific topics: conference\\nGeneral themes: networking|Ensures extraction of multiple people names and company names, verifying rule adherence through input specifications\.|
|2|2|Amazon and Facebook are collaborating on a new project\. Jeff Bezos and Mark Zuckerberg were present at the meeting\.|Company names: Amazon, Facebook\\nPeople names: Jeff Bezos, Mark Zuckerberg\\nSpecific topics: project\\nGeneral themes: partnership|Tests robust recognition of people names and company names together, compliant with input specifications\.|
|2|3|IBM's recent hiring includes veteran tech leaders Alice Johnson and Bob Lee\. The aim is to drive digital transformation\.|Company names: IBM\\nPeople names: Alice Johnson, Bob Lee\\nSpecific topics: hiring, digital transformation\\nGeneral themes: leadership|Checks the extraction of names within the context of a specific industry event, aligning with input specifications\.|
|3|1|The discussion on climate change was led by Dr\. Susan Green\. Experts from Stanford University participated\.|Company names: Stanford University\\nPeople names: Dr\. Susan Green\\nSpecific topics: climate change\\nGeneral themes: environmental issues|Validates specific topic extraction related to environmental themes, following the input specification\.|
|3|2|The seminar on artificial intelligence included talks from leading researchers\. Professor Alan Turing from MIT was a keynote speaker\.|Company names: MIT\\nPeople names: Professor Alan Turing\\nSpecific topics: artificial intelligence\\nGeneral themes: technological innovation|Tests extraction of specific academic topics and notable individuals, respecting input specifications\.|
|3|3|Blockchain technology and its applications were the focus of the event at Google HQ\. Innovators like Charlie Lee shared insights\.|Company names: Google HQ\\nPeople names: Charlie Lee\\nSpecific topics: blockchain, applications\\nGeneral themes: innovation|Assesses the ability to extract new technology topics and themes, compliant with input specifications\.|
|4|1|The launch event at SpaceX highlighted the importance of exploration\. Elon Musk emphasized the theme of pushing boundaries\.|Company names: SpaceX\\nPeople names: Elon Musk\\nSpecific topics: launch event\\nGeneral themes: exploration|Ensures extraction of themes related to exploration and innovation, aligning with input specifications\.|
|4|2|Apple's annual meeting celebrated creativity and technology\. Tim Cook underscored their vision for the future\.|Company names: Apple\\nPeople names: Tim Cook\\nSpecific topics: annual meeting\\nGeneral themes: creativity, technology|Validly tests the extraction of overarching themes from corporate events, based on input specifications\.|
|4|3|The forum on global health, hosted by the WHO, addressed pressing issues\. Leaders focused on cooperation and progress\.|Company names: WHO\\nPeople names: \\nSpecific topics: global health\\nGeneral themes: cooperation, progress|Tests extraction of themes related to global health and cooperation, adhering to input specifications\.|

### [test_evals.csv](./elements.test_evals.csv)

|id|model|rule|input|evaluation|
|-|-|-|-|-|
|4b0a7c8|gpt\-4o\-2024\-08\-06|The output must begin with the phrase "Company names:" followed by a comma\-separated list of company names extracted from the text\.|Today, Apple Inc\. announced a new product release\. The CEO, Tim Cook, stated that the company aims to innovate\.|\- Company: Apple Inc\.<br>\- Announcement: New product release<br>\- CEO: Tim Cook<br>\- Statement: The company aims to innovate|
|577e456|gpt\-4o\-2024\-08\-06|The output must begin with the phrase "Company names:" followed by a comma\-separated list of company names extracted from the text\.|Microsoft Corporation has been in talks with Google to enhance AI capabilities\. Satya Nadella and Sundar Pichai discussed future collaborations\.|\- Companies involved: Microsoft Corporation, Google<br>\- Individuals mentioned: Satya Nadella, Sundar Pichai<br>\- Topic: Enhance AI capabilities, future collaborations|
|511e489|gpt\-4o\-2024\-08\-06|The output must begin with the phrase "Company names:" followed by a comma\-separated list of company names extracted from the text\.|Tesla's latest development in renewable energy was highlighted by Elon Musk\. The focus on sustainability continues\.|\- Organization: Tesla<br>\- Individual: Elon Musk<br>\- Development: Renewable energy<br>\- Theme: Sustainability|
|57a06c4|gpt\-4o\-2024\-08\-06|The output must include the phrase "People names:" followed by a comma\-separated list of people names extracted from the text\.|The recent conference featured speakers like Jane Doe from ABC Corp and John Smith of XYZ Ltd\.|\- Jane Doe from ABC Corp<br>\- John Smith of XYZ Ltd|
|c36c2b7|gpt\-4o\-2024\-08\-06|The output must include the phrase "People names:" followed by a comma\-separated list of people names extracted from the text\.|Amazon and Facebook are collaborating on a new project\. Jeff Bezos and Mark Zuckerberg were present at the meeting\.|\- Companies: Amazon, Facebook<br>\- Individuals: Jeff Bezos, Mark Zuckerberg|
|21ac66d|gpt\-4o\-2024\-08\-06|The output must include the phrase "People names:" followed by a comma\-separated list of people names extracted from the text\.|IBM's recent hiring includes veteran tech leaders Alice Johnson and Bob Lee\. The aim is to drive digital transformation\.|1\. Company: IBM<br>2\. New Hires: Alice Johnson, Bob Lee<br>3\. Purpose: Drive digital transformation|
|67255cc|gpt\-4o\-2024\-08\-06|The output must include the phrase "Specific topics:" followed by a comma\-separated list of specific topics related to the content of the text\.|The discussion on climate change was led by Dr\. Susan Green\. Experts from Stanford University participated\.|1\. Dr\. Susan Green<br>2\. Stanford University|
|b72ea1b|gpt\-4o\-2024\-08\-06|The output must include the phrase "Specific topics:" followed by a comma\-separated list of specific topics related to the content of the text\.|The seminar on artificial intelligence included talks from leading researchers\. Professor Alan Turing from MIT was a keynote speaker\.|Extracted Elements:<br>\- Seminar Topic: Artificial Intelligence<br>\- Keynote Speaker: Professor Alan Turing<br>\- Affiliation: MIT|
|a358a65|gpt\-4o\-2024\-08\-06|The output must include the phrase "Specific topics:" followed by a comma\-separated list of specific topics related to the content of the text\.|Blockchain technology and its applications were the focus of the event at Google HQ\. Innovators like Charlie Lee shared insights\.|1\. Event Location: Google HQ<br>2\. Speaker: Charlie Lee|
|dbe9dda|gpt\-4o\-2024\-08\-06|The output must include the phrase "General themes:" followed by a comma\-separated list of general overarching themes related to the text\.|The launch event at SpaceX highlighted the importance of exploration\. Elon Musk emphasized the theme of pushing boundaries\.|1\. \*\*Event Type\*\*: Launch event<br>2\. \*\*Location/Organization\*\*: SpaceX<br>3\. \*\*Key Figure\*\*: Elon Musk<br>4\. \*\*Theme\*\*: Pushing boundaries<br>5\. \*\*Focus\*\*: Importance of exploration|
|6343360|gpt\-4o\-2024\-08\-06|The output must include the phrase "General themes:" followed by a comma\-separated list of general overarching themes related to the text\.|Apple's annual meeting celebrated creativity and technology\. Tim Cook underscored their vision for the future\.|Tim Cook|
|d14ed1f|gpt\-4o\-2024\-08\-06|The output must include the phrase "General themes:" followed by a comma\-separated list of general overarching themes related to the text\.|The forum on global health, hosted by the WHO, addressed pressing issues\. Leaders focused on cooperation and progress\.|Extracted Elements:<br>\- Forum on global health<br>\- Hosted by WHO<br>\- Addressed pressing issues<br>\- Focus on cooperation and progress|

### [test_results.csv](./elements.test_results.csv)

|id|promptid|model|error|input|output|
|-|-|-|-|-|-|
|4b0a7c8|46b47f8|gpt\-4o\-mini||Today, Apple Inc\. announced a new product release\. The CEO, Tim Cook, stated that the company aims to innovate\.|Company names: Apple Inc\.<br>People names: Tim Cook<br>Specific topics: product release, innovation<br>General themes: technology, corporate leadership|
|577e456|46b47f8|gpt\-4o\-mini||Microsoft Corporation has been in talks with Google to enhance AI capabilities\. Satya Nadella and Sundar Pichai discussed future collaborations\.|Company names: Microsoft Corporation, Google  <br>People names: Satya Nadella, Sundar Pichai  <br>Specific topics: AI capabilities, future collaborations  <br>General themes: Technology, Business Collaboration, Artificial Intelligence|
|511e489|46b47f8|gpt\-4o\-mini||Tesla's latest development in renewable energy was highlighted by Elon Musk\. The focus on sustainability continues\.|Company names: Tesla  <br>People names: Elon Musk  <br>Specific topics: renewable energy, sustainability  <br>General themes: innovation, environmental awareness|
|57a06c4|46b47f8|gpt\-4o\-mini||The recent conference featured speakers like Jane Doe from ABC Corp and John Smith of XYZ Ltd\.|Company names: ABC Corp, XYZ Ltd  <br>People names: Jane Doe, John Smith  <br>Specific topics: conference, speakers  <br>General themes: professional gatherings, networking|
|c36c2b7|46b47f8|gpt\-4o\-mini||Amazon and Facebook are collaborating on a new project\. Jeff Bezos and Mark Zuckerberg were present at the meeting\.|Company names: Amazon, Facebook  <br>People names: Jeff Bezos, Mark Zuckerberg  <br>Specific topics: collaboration, project, meeting  <br>General themes: business partnership, technology, leadership|
|21ac66d|46b47f8|gpt\-4o\-mini||IBM's recent hiring includes veteran tech leaders Alice Johnson and Bob Lee\. The aim is to drive digital transformation\.|Company names: IBM  <br>People names: Alice Johnson, Bob Lee  <br>Specific topics: hiring, digital transformation  <br>General themes: technology, leadership, workforce development|
|67255cc|46b47f8|gpt\-4o\-mini||The discussion on climate change was led by Dr\. Susan Green\. Experts from Stanford University participated\.|Company names: Stanford University  <br>People names: Dr\. Susan Green  <br>Specific topics: climate change  <br>General themes: environmental issues, academic collaboration|
|b72ea1b|46b47f8|gpt\-4o\-mini||The seminar on artificial intelligence included talks from leading researchers\. Professor Alan Turing from MIT was a keynote speaker\.|Company names: MIT  <br>People names: Alan Turing  <br>Specific topics: artificial intelligence, seminar, keynote speaker  <br>General themes: research, technology, education|
|a358a65|46b47f8|gpt\-4o\-mini||Blockchain technology and its applications were the focus of the event at Google HQ\. Innovators like Charlie Lee shared insights\.|Company names: Google  <br>People names: Charlie Lee  <br>Specific topics: Blockchain technology, applications of blockchain  <br>General themes: Innovation, technology advancement|
|dbe9dda|46b47f8|gpt\-4o\-mini||The launch event at SpaceX highlighted the importance of exploration\. Elon Musk emphasized the theme of pushing boundaries\.|Company names: SpaceX  <br>People names: Elon Musk  <br>Specific topics: exploration, pushing boundaries  <br>General themes: innovation, space exploration|
|6343360|46b47f8|gpt\-4o\-mini||Apple's annual meeting celebrated creativity and technology\. Tim Cook underscored their vision for the future\.|Company names: Apple  <br>People names: Tim Cook  <br>Specific topics: annual meeting, creativity, technology, vision  <br>General themes: innovation, leadership, future planning|
|d14ed1f|46b47f8|gpt\-4o\-mini||The forum on global health, hosted by the WHO, addressed pressing issues\. Leaders focused on cooperation and progress\.|Company names: WHO  <br>People names: \-||\-  <br>Specific topics: global health, cooperation, progress  <br>General themes: health, leadership, collaboration|