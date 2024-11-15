## elements ([json](./evals\v7\elements/report.json))

- 8 rules
- 8 inverse rules
- 95 tests, 47 baseline tests

### Overview

<details><summary>Glossary</summary>
- Prompt Under Test (PUT) - like Program Under Test; the prompt
- Model Under Test (MUT) - Model which we are testing against with specific temperature, etc example: gpt-4o-mini
- Model Used by PromptPex (MPP) - gpt-4o

- Input Specification (IS) - Extracting input constraints of PUT using MPP
- Output Rules (OR) - Extracting output constraints of PUT using MPP
- Output Rules Groundedness (ORG) - Checks if OR is grounded in PUT using MPP

- Prompt Under Test Intent (PUTI) - Extracting the exact task from PUT using MMP

- PromptPex Tests (PPT) - Test cases generated for PUT with MPP using IS and OR
- Baseline Tests (BT) - Zero shot test cases generated for PUT with MPP

- Test Input Compliance (TIC) - Checking if PPT and BT meets the constraints in IS using MPP
- Test Coverage (TC) - Result generated for PPT and BT on PUTI + OR with MPP

- Test Output (TO) - Result generated for PPT and BT on PUT with each MUT
- Test Output Compliance (TOC) - Checking if TO meets the constraints in PUT using MPP
</details>


### [test_results.csv](./test_results.csv)



### [elements.prompty](./elements.prompty)

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
system:
Extract the important entities mentioned in the text below. First extract all company names, then extract all people names, then extract specific topics which fit the content and finally extract general overarching themes

Desired format:
Company names: <comma_separated_list_of_company_names>
People names: -||-
Specific topics: -||-
General themes: -||-
user:
Text: {{text}}

`````


### [intent.txt](./intent.txt)

`````txt
Extract specific elements of text from a given text.
`````


### [input_spec.txt](./input_spec.txt)

`````txt
The input is a text string.  
The text input must contain sentences or paragraphs of natural language.  
There are no restrictions on the length of the text input.  
The text can include names of companies, people, specific topics, and general themes.  
The text input can be in any language but should preferably be comprehensible for accurate entity extraction.
`````


### [rules.txt](./rules.txt)

`````txt
1: Company names must be listed in a comma-separated format following the label "Company names:".  
2: People names must be listed in a comma-separated format following the label "People names:".  
3: Specific topics must be listed in a comma-separated format following the label "Specific topics:".  
4: General themes must be listed in a comma-separated format following the label "General themes:".  
5: Each category label should be followed by a colon and a single space before the list.  
6: All extracted elements from the text should be categorized under their respective labels.  
7: The output should strictly follow the order: Company names, People names, Specific topics, and General themes.  
8: If there are no elements found for a category, it should still be listed with its label followed by an empty space or properly formatted as per given examples such as "Company names: " with no elements after the space.
`````


### [inverse_rules.txt](./inverse_rules.txt)

`````txt
9: Company names must not be listed in a comma-separated format following the label "Company names:".  
10: People names must not be listed in a comma-separated format following the label "People names:".  
11: Specific topics must not be listed in a comma-separated format following the label "Specific topics:".  
12: General themes must not be listed in a comma-separated format following the label "General themes:".  
13: Each category label should not be followed by a colon and a single space before the list.  
14: All extracted elements from the text should not be categorized under their respective labels.  
15: The output should not strictly follow the order: Company names, People names, Specific topics, and General themes.  
16: If there are no elements found for a category, it should not be listed with its label followed by an empty space or properly formatted as per given examples such as "Company names: " with no elements after the space.
`````


### [tests.csv](./tests.csv)

|testinput|expectedoutput|reasoning|
|-|-|-|
|Text: Our meeting with Tesla and Apple was insightful, but both Elon Musk and Tim Cook were skeptical about the blockchain, AI, and sustainability topics\.|Company names: Tesla, Apple|Tests whether the software correctly identifies and lists company names in a comma\-separated format\.|
|Text: Microsoft and Google have been big players in the AI field, along with IBM investments\.|Company names: Microsoft, Google, IBM|Ensures that the software lists all mentioned company names, formatted correctly\.|
|Text: Amazon is pioneering e\-commerce, while Airbnb disrupts travel\. Only these companies were mentioned\.|Company names: Amazon, Airbnb|Assess if the software identifies and accurately commas\-separates all company names\.|
|Text: Jeff Bezos discussed innovation with Bill Gates and Satya Nadella at the recent summit\.|People names: Jeff Bezos, Bill Gates, Satya Nadella|Checks if the software extracts and lists people names in a comma\-separated format\.|
|Text: Conversations with Ada Lovelace about AI were followed by meetings with Alan Turing\.|People names: Ada Lovelace, Alan Turing|Validates detection and correct comma\-separation of person names\.|
|Text: Florence Nightingale was influential in healthcare, together with Clara Barton and Nightingale too\.|People names: Florence Nightingale, Clara Barton|Verifies correct extraction and formatting of related individual names\.|
|Text: The seminar covered Quantum Computing, Cybersecurity, and Cloud Storage\.|Specific topics: Quantum Computing, Cybersecurity, Cloud Storage|Evaluates proper topic extraction and listing in the specified format\.|
|Text: Discussions around Renewable Energy and Electric Vehicles were prevalent\.|Specific topics: Renewable Energy, Electric Vehicles|Tests for accurate recognition and correct format of specific topic list\.|
|Text: The focus was on Data Privacy, IoT, and AI Ethics during the conference\.|Specific topics: Data Privacy, IoT, AI Ethics|Ensures all topics are identified and comma\-separated accurately\.|
|Text: We explored technological advancements and their societal impacts extensively\.|General themes: technological advancements, societal impacts|Ensures that general themes are extracted and formatted correctly as a list\.|
|Text: The text encompasses numerous health innovations and economic shifts visible today\.|General themes: health innovations, economic shifts|Tests the software's ability to recognize and correctly format general themes\.|
|Text: Cultural evolution and digital transformation were key points of discussion\.|General themes: cultural evolution, digital transformation|Confirms that general themes are extracted and presented correctly\.|
|Text: Tesla and SpaceX were praised by Elon Musk for their achievements in AI\.|Company names: Tesla, SpaceX\\nPeople names: Elon Musk|Verifies the correct label colon\-space formatting before lists in the output format\.|
|Text: Innovative practices were discussed at IBM with Tim Berners\-Lee on Web Development\.|Company names: IBM\\nPeople names: Tim Berners\-Lee|Confirms the label colon\-space norm is maintained accurately\.|
|Text: Conversations featuring Malala Yousafzai and Greta Thunberg on impact investment\.|People names: Malala Yousafzai, Greta Thunberg\\nSpecific topics: impact investment|Assess if the correct spacing and labeling structure are adhered to\.|
|Text: Facebook and Microsoft discussed by Mark Zuckerberg on cloud computing\.|Company names: Facebook, Microsoft\\nPeople names: Mark Zuckerberg\\nSpecific topics: cloud computing|Tests if entities are categorized correctly under the right labels\.|
|Text: Discussions on AI principles led by Andrew Ng at Stanford\.|People names: Andrew Ng\\nSpecific topics: AI principles|Validates assigning recognized entities under respective categories properly\.|
|Text: Talks with Sheryl Sandberg about social media trends and advertising\.|People names: Sheryl Sandberg\\nSpecific topics: social media trends, advertising|Assesses categorization of related topics correctly within given labels\.|
|Text: At Apple, Tim Cook and his team were innovating electronic advancements\.|Company names: Apple\\nPeople names: Tim Cook\\nSpecific topics: electronic advancements|Confirms the output adheres to the required order in listing elements\.|
|Text: Elon Musk from SpaceX discussed topics on space exploration future\.|Company names: SpaceX\\nPeople names: Elon Musk\\nSpecific topics: space exploration|Tests the consistent order of elements in the response output\.|
|Text: Cloud computing challenges at Google explained by Sundar Pichai\.|Company names: Google\\nPeople names: Sundar Pichai\\nSpecific topics: cloud computing challenges|Verifies that elements are presented in the prescribed sequence\.|
|Text: Tesla announced nothing notable\.|Company names: Tesla\\nPeople names: \\nSpecific topics: \\nGeneral themes:|Checks if empty label lists are correctly formatted when entities aren't present\.|
|Text: General guidance on principles was given\.|Company names: \\nPeople names: \\nSpecific topics: principles\\nGeneral themes:|Validates how labels are formatted with empty follow\-ups barring one discovered topic\.|
|Text: No companies or individuals were referenced\.|Company names: \\nPeople names: \\nSpecific topics: \\nGeneral themes:|Determines proper handling of non\-found entities, ensuring empty formatting\.|
|Text: Apple, Inc and Tesla were explored\.|Expected failure due to comma\-listing\.|Deliberately stimulates error by misplacing format, confirming rule breach\.|
|Text: Amazon, IBM, and Google\.|Expected failure due to formatting\.|Intentionally misguided format aims to evaluate improper adherence to rule\.|
|Text: Entities like SpaceX and OpenAI: redundant listing\.|Expected failure due to listed company names\.|Designed to highlight banned listing behavior against rule\.|
|Text: Elon Musk, without others\.|Expected failure\.|Tests non\-compliance with required list arrangement, ensuring it doesn't appear properly\.|
|Text: Mention of Ada Lovelace, Marie Curie follows no rule\.|Expected failure\.|Assess control on denied format presentation involving name lists\.|
|Text: Deviated capture of Alexander Hamilton\.|Expected failure\.|Supports testing against frame deviation to confirm it's not handled\.|
|Text: Topics discussed as E\-commerce, AI are not welcome\.|Expected failure\.|Framework\-oriented violation aims to ensure format not presented\.|
|Text: Misplacing Quantum Physics, unclear method\.|Expected failure\.|Leverages non\-conformity to identify denied output listing\.|
|Text: Outlined approach to Machine Learning, albeit unordered\.|Expected failure\.|Seeks to authenticate constraints restricting disallowed topics list\.|
|Text: Unformatted blur of societal influences\.|Expected failure\.|Evaluates standards breach intentionally to ensure theme exclude presentation\.|
|Text: Articles include Climate Change, without order\.|Expected failure\.|Deliberate failure initiates prevented pattern enforcement experimental\.|
|Text: Strategy influencing themes discussed\.|Expected failure\.|Intentionally ignores correct general theme format, prompting missed adherence for testing circumstances\.|
|Text: Microsoft and Bill Gates discussed innovation without specification\.|Expected failure\.|Consciously fails specifications, ensuring no colon\-space arrangement\.|
|Text: Elon Musk leading SpaceX, no clear formats\.|Expected failure\.|Profiles structure\-oriented breach by integrating unsanctioned label formats\.|
|Text: No apparent separation with influence mention\.|Expected failure\.|Aims to distinguish infringement of colon\-space guideline\.|
|Text: Company regimes and leaders like Gates sorted unlabelly\.|Expected failure\.|Investigates bypassing orderly data allocation while violating label essence\.|
|Text: No structure with AI mentions incorporated\.|Expected failure\.|Explores non\-categorized conceptual method violating specifications\.|
|Text: Objects projected generally, omitting provisions\.|Expected failure\.|Considers unregulated approach lacking specified fundamental label assignation\.|
|Text: Steve Jobs and Apple surfaced, unordered\.|Expected failure\.|Clarifies no systematic rule follows despite pointing key targets in unordered manner\.|
|Text: Structureless penchants at Tesla, directionless\.|Expected failure\.|Unearths indirect orders of removal strategy against definitive arrangement\.|
|Text: Phrase movement escaping justified sequence\.|Expected failure\.|Allows test diversity by ruling out expected sequence control extension, driving unexpected order\.|
|Text: Oracle's exposition on no specific field\.|Expected failure\.|Analysis embodiment suppresses inclusion thru speculative handling without valid listing\.|
|Text: Prolonged absence of themes\.|Expected failure\.|Identifies structural elements misaligned, deliberately non\-conductive to theme propagation\.|
|Text: Non\-secured mentionings elicit purpose breakdown\.|Expected failure\.|Kindles misconception via deprived format ensuring unsupported structural guideline\.|

### [test_evals.csv](./test_evals.csv)

|rule|model|input|coverage|validity|
|-|-|-|-|-|
|Company names must be listed in a comma\-separated format following the label "Company names:"\.|gpt\-4o\-2024\-08\-06|Text: Our meeting with Tesla and Apple was insightful, but both Elon Musk and Tim Cook were skeptical about the blockchain, AI, and sustainability topics\.|Company names: Tesla, Apple<br>People names: Elon Musk, Tim Cook<br>Specific topics: blockchain, AI, sustainability<br>General themes:|ok|
|Company names must be listed in a comma\-separated format following the label "Company names:"\.|gpt\-4o\-2024\-08\-06|Text: Microsoft and Google have been big players in the AI field, along with IBM investments\.|Company names: Microsoft, Google, IBM  <br>People names:   <br>Specific topics: AI field  <br>General themes: investments|ok|
|Company names must be listed in a comma\-separated format following the label "Company names:"\.|gpt\-4o\-2024\-08\-06|Text: Amazon is pioneering e\-commerce, while Airbnb disrupts travel\. Only these companies were mentioned\.|Company names: Amazon, Airbnb  <br>People names:   <br>Specific topics: e\-commerce, travel  <br>General themes:|ok|
|People names must be listed in a comma\-separated format following the label "People names:"\.|gpt\-4o\-2024\-08\-06|Text: Jeff Bezos discussed innovation with Bill Gates and Satya Nadella at the recent summit\.|Company names: <br>People names: Jeff Bezos, Bill Gates, Satya Nadella<br>Specific topics: <br>General themes: innovation, summit|ok|
|People names must be listed in a comma\-separated format following the label "People names:"\.|gpt\-4o\-2024\-08\-06|Text: Conversations with Ada Lovelace about AI were followed by meetings with Alan Turing\.|Company names: <br>People names: Ada Lovelace, Alan Turing<br>Specific topics: AI<br>General themes: Conversations, meetings|ok|
|People names must be listed in a comma\-separated format following the label "People names:"\.|gpt\-4o\-2024\-08\-06|Text: Florence Nightingale was influential in healthcare, together with Clara Barton and Nightingale too\.|Company names: <br>People names: Florence Nightingale, Clara Barton<br>Specific topics: healthcare<br>General themes:|ok|
|Specific topics must be listed in a comma\-separated format following the label "Specific topics:"\.|gpt\-4o\-2024\-08\-06|Text: The seminar covered Quantum Computing, Cybersecurity, and Cloud Storage\.|Company names: <br>People names: <br>Specific topics: Quantum Computing, Cybersecurity, Cloud Storage<br>General themes:|ok|
|Specific topics must be listed in a comma\-separated format following the label "Specific topics:"\.|gpt\-4o\-2024\-08\-06|Text: Discussions around Renewable Energy and Electric Vehicles were prevalent\.|Company names: <br>People names: <br>Specific topics: Renewable Energy, Electric Vehicles<br>General themes:|ok|
|Specific topics must be listed in a comma\-separated format following the label "Specific topics:"\.|gpt\-4o\-2024\-08\-06|Text: The focus was on Data Privacy, IoT, and AI Ethics during the conference\.|Company names: <br>People names: <br>Specific topics: Data Privacy, IoT, AI Ethics<br>General themes:|ok|
|General themes must be listed in a comma\-separated format following the label "General themes:"\.|gpt\-4o\-2024\-08\-06|Text: We explored technological advancements and their societal impacts extensively\.|Company names: <br>People names: <br>Specific topics: technological advancements<br>General themes: societal impacts|ok|
|General themes must be listed in a comma\-separated format following the label "General themes:"\.|gpt\-4o\-2024\-08\-06|Text: The text encompasses numerous health innovations and economic shifts visible today\.|Company names: <br>People names: <br>Specific topics: health innovations, economic shifts<br>General themes:|ok|
|General themes must be listed in a comma\-separated format following the label "General themes:"\.|gpt\-4o\-2024\-08\-06|Text: Cultural evolution and digital transformation were key points of discussion\.|Company names: <br>People names: <br>Specific topics: Cultural evolution, digital transformation<br>General themes:|ok|
|Each category label should be followed by a colon and a single space before the list\.|gpt\-4o\-2024\-08\-06|Text: Tesla and SpaceX were praised by Elon Musk for their achievements in AI\.|Company names: Tesla, SpaceX  <br>People names: Elon Musk  <br>Specific topics: AI  <br>General themes: Achievements|ok|
|Each category label should be followed by a colon and a single space before the list\.|gpt\-4o\-2024\-08\-06|Text: Innovative practices were discussed at IBM with Tim Berners\-Lee on Web Development\.|Company names: IBM<br>People names: Tim Berners\-Lee<br>Specific topics: Web Development<br>General themes: Innovative practices|ok|
|Each category label should be followed by a colon and a single space before the list\.|gpt\-4o\-2024\-08\-06|Text: Conversations featuring Malala Yousafzai and Greta Thunberg on impact investment\.|Company names: <br>People names: Malala Yousafzai, Greta Thunberg<br>Specific topics: impact investment<br>General themes:|ok|
|All extracted elements from the text should be categorized under their respective labels\.|gpt\-4o\-2024\-08\-06|Text: Facebook and Microsoft discussed by Mark Zuckerberg on cloud computing\.|Company names: Facebook, Microsoft  <br>People names: Mark Zuckerberg  <br>Specific topics: cloud computing  <br>General themes:|ok|
|All extracted elements from the text should be categorized under their respective labels\.|gpt\-4o\-2024\-08\-06|Text: Discussions on AI principles led by Andrew Ng at Stanford\.|Company names: <br>People names: Andrew Ng<br>Specific topics: AI principles<br>General themes: Discussions, Stanford|ok|
|All extracted elements from the text should be categorized under their respective labels\.|gpt\-4o\-2024\-08\-06|Text: Talks with Sheryl Sandberg about social media trends and advertising\.|Company names: <br>People names: Sheryl Sandberg<br>Specific topics: social media trends, advertising<br>General themes:|ok|
|The output should strictly follow the order: Company names, People names, Specific topics, and General themes\.|gpt\-4o\-2024\-08\-06|Text: At Apple, Tim Cook and his team were innovating electronic advancements\.|Company names: Apple<br>People names: Tim Cook<br>Specific topics: electronic advancements<br>General themes: innovation|ok|
|The output should strictly follow the order: Company names, People names, Specific topics, and General themes\.|gpt\-4o\-2024\-08\-06|Text: Elon Musk from SpaceX discussed topics on space exploration future\.|Company names: SpaceX<br>People names: Elon Musk<br>Specific topics: space exploration future<br>General themes:|ok|
|The output should strictly follow the order: Company names, People names, Specific topics, and General themes\.|gpt\-4o\-2024\-08\-06|Text: Cloud computing challenges at Google explained by Sundar Pichai\.|Company names: Google<br>People names: Sundar Pichai<br>Specific topics: Cloud computing challenges<br>General themes:|ok|
|If there are no elements found for a category, it should still be listed with its label followed by an empty space or properly formatted as per given examples such as "Company names: " with no elements after the space\.|gpt\-4o\-2024\-08\-06|Text: Tesla announced nothing notable\.|Company names: Tesla<br>People names: <br>Specific topics: <br>General themes:|ok|
|If there are no elements found for a category, it should still be listed with its label followed by an empty space or properly formatted as per given examples such as "Company names: " with no elements after the space\.|gpt\-4o\-2024\-08\-06|Text: General guidance on principles was given\.|Company names: <br>People names: <br>Specific topics: <br>General themes: principles, general guidance|ok|
|If there are no elements found for a category, it should still be listed with its label followed by an empty space or properly formatted as per given examples such as "Company names: " with no elements after the space\.|gpt\-4o\-2024\-08\-06|Text: No companies or individuals were referenced\.|Company names: <br>People names: <br>Specific topics: <br>General themes:|ok|
|Company names must not be listed in a comma\-separated format following the label "Company names:"\.|gpt\-4o\-2024\-08\-06|Text: Apple, Inc and Tesla were explored\.|Company names: Apple, Inc, Tesla<br>People names: <br>Specific topics: <br>General themes:|ok|
|Company names must not be listed in a comma\-separated format following the label "Company names:"\.|gpt\-4o\-2024\-08\-06|Text: Amazon, IBM, and Google\.|Company names: Amazon, IBM, Google  <br>People names:   <br>Specific topics:   <br>General themes:|err|
|Company names must not be listed in a comma\-separated format following the label "Company names:"\.|gpt\-4o\-2024\-08\-06|Text: Entities like SpaceX and OpenAI: redundant listing\.|Company names: SpaceX, OpenAI<br>People names: <br>Specific topics: <br>General themes:|ok|
|People names must not be listed in a comma\-separated format following the label "People names:"\.|gpt\-4o\-2024\-08\-06|Text: Elon Musk, without others\.|Company names: <br>People names: Elon Musk<br>Specific topics: <br>General themes:|err|
|People names must not be listed in a comma\-separated format following the label "People names:"\.|gpt\-4o\-2024\-08\-06|Text: Mention of Ada Lovelace, Marie Curie follows no rule\.|Company names: <br>People names: Ada Lovelace, Marie Curie<br>Specific topics: <br>General themes:|ok|
|People names must not be listed in a comma\-separated format following the label "People names:"\.|gpt\-4o\-2024\-08\-06|Text: Deviated capture of Alexander Hamilton\.|Company names: <br>People names: Alexander Hamilton<br>Specific topics: <br>General themes:|err|
|Specific topics must not be listed in a comma\-separated format following the label "Specific topics:"\.|gpt\-4o\-2024\-08\-06|Text: Topics discussed as E\-commerce, AI are not welcome\.|Company names: <br>People names: <br>Specific topics: E\-commerce, AI<br>General themes:|ok|
|Specific topics must not be listed in a comma\-separated format following the label "Specific topics:"\.|gpt\-4o\-2024\-08\-06|Text: Misplacing Quantum Physics, unclear method\.|Company names: <br>People names: <br>Specific topics: Quantum Physics<br>General themes:|err|
|Specific topics must not be listed in a comma\-separated format following the label "Specific topics:"\.|gpt\-4o\-2024\-08\-06|Text: Outlined approach to Machine Learning, albeit unordered\.|Company names: <br>People names: <br>Specific topics: Machine Learning<br>General themes:|err|
|General themes must not be listed in a comma\-separated format following the label "General themes:"\.|gpt\-4o\-2024\-08\-06|Text: Unformatted blur of societal influences\.|Company names: <br>People names: <br>Specific topics: <br>General themes: societal influences|err|
|General themes must not be listed in a comma\-separated format following the label "General themes:"\.|gpt\-4o\-2024\-08\-06|Text: Articles include Climate Change, without order\.|Company names: <br>People names: <br>Specific topics: Climate Change<br>General themes:|err|
|General themes must not be listed in a comma\-separated format following the label "General themes:"\.|gpt\-4o\-2024\-08\-06|Text: Strategy influencing themes discussed\.|Company names: <br>People names: <br>Specific topics: <br>General themes: Strategy, themes, influencing|ok|
|Each category label should not be followed by a colon and a single space before the list\.|gpt\-4o\-2024\-08\-06|Text: Microsoft and Bill Gates discussed innovation without specification\.|Company names: Microsoft  <br>People names: Bill Gates  <br>Specific topics: innovation  <br>General themes:|ok|
|Each category label should not be followed by a colon and a single space before the list\.|gpt\-4o\-2024\-08\-06|Text: Elon Musk leading SpaceX, no clear formats\.|Company names: SpaceX  <br>People names: Elon Musk  <br>Specific topics:   <br>General themes:|err|
|Each category label should not be followed by a colon and a single space before the list\.|gpt\-4o\-2024\-08\-06|Text: No apparent separation with influence mention\.|Company names: <br>People names: <br>Specific topics: <br>General themes: influence|err|
|All extracted elements from the text should not be categorized under their respective labels\.|gpt\-4o\-2024\-08\-06|Text: Company regimes and leaders like Gates sorted unlabelly\.|Company names: <br>People names: Gates<br>Specific topics: <br>General themes: Company regimes, leaders|ok|
|All extracted elements from the text should not be categorized under their respective labels\.|gpt\-4o\-2024\-08\-06|Text: No structure with AI mentions incorporated\.|Company names: <br>People names: <br>Specific topics: AI<br>General themes:|err|
|All extracted elements from the text should not be categorized under their respective labels\.|gpt\-4o\-2024\-08\-06|Text: Objects projected generally, omitting provisions\.|Company names:   <br>People names:   <br>Specific topics:   <br>General themes: Objects projected generally, omitting provisions\.|err|
|The output should not strictly follow the order: Company names, People names, Specific topics, and General themes\.|gpt\-4o\-2024\-08\-06|Text: Steve Jobs and Apple surfaced, unordered\.|Company names: Apple  <br>People names: Steve Jobs  <br>Specific topics:   <br>General themes:|err|
|The output should not strictly follow the order: Company names, People names, Specific topics, and General themes\.|gpt\-4o\-2024\-08\-06|Text: Structureless penchants at Tesla, directionless\.|Company names: Tesla  <br>People names:  <br>Specific topics:   <br>General themes: Structureless penchants, directionless|ok|
|The output should not strictly follow the order: Company names, People names, Specific topics, and General themes\.|gpt\-4o\-2024\-08\-06|Text: Phrase movement escaping justified sequence\.|Company names: <br>People names: <br>Specific topics: <br>General themes: Phrase movement, escaping justified sequence|err|
|If there are no elements found for a category, it should not be listed with its label followed by an empty space or properly formatted as per given examples such as "Company names: " with no elements after the space\.|gpt\-4o\-2024\-08\-06|Text: Oracle's exposition on no specific field\.|Company names: Oracle  <br>People names:  <br>Specific topics:  <br>General themes: no specific field|err|
|If there are no elements found for a category, it should not be listed with its label followed by an empty space or properly formatted as per given examples such as "Company names: " with no elements after the space\.|gpt\-4o\-2024\-08\-06|Text: Prolonged absence of themes\.|Company names: <br>People names: <br>Specific topics: <br>General themes: themes|err|
|If there are no elements found for a category, it should not be listed with its label followed by an empty space or properly formatted as per given examples such as "Company names: " with no elements after the space\.|gpt\-4o\-2024\-08\-06|Text: Non\-secured mentionings elicit purpose breakdown\.|Company names: <br>People names: <br>Specific topics: <br>General themes:|ok|

### [baseline_tests.txt](./baseline_tests.txt)

`````txt
Text: "In a recent interview, Bill Gates spoke about Microsoft's latest advancements in artificial intelligence and their collaboration with OpenAI. He emphasized the theme of responsible AI development, a major topic among tech companies like Google and IBM."
===
Text: "Tesla's CEO, Elon Musk, was seen at the launch event of SpaceX's Starship where he discussed the potential of commercial space travel. Speculations about sustainable energy and futuristic transportation were also part of the conversation."
===
Text: "Sarah, a renowned journalist, published an article highlighting Amazon's efforts in sustainability. Her report explored important topics such as eco-friendly packaging and carbon-neutral delivery."
===
Text: "During the tech conference, Mark Zuckerberg from Facebook introduced new privacy features for their platform. He also touched upon the growing importance of user data protection, a critical theme for the digital age."
===
Text: "The World Health Organization, alongside Dr. Anthony Fauci, announced new health directives to tackle the pandemic. Vaccine development and global healthcare improvements were key topics discussed."
===
Text: "Apple's annual event showcased innovations in the iPhone series, with CEO Tim Cook discussing enhancements in camera technology. Topics of innovation and consumer electronics were at the forefront."
===
Text: "NASA announced their plans for the Artemis program aiming to land humans back on the Moon, with senior scientist Dr. Ellen Stofan highlighting advancements in space exploration technology."
===
Text: "Uber's recent policy changes, discussed by CEO Dara Khosrowshahi, focused on drivers' rights and the gig economy. Ride-sharing innovation and workers' rights emerged as key themes."
===
Text: "An article by renowned economist Paul Krugman explored the impact of inflation on global markets, with specific insights into the policies adopted by major financial institutions like the Federal Reserve."
===
Text: "Netflix's new series on the life of Princess Diana received attention for its portrayal of the British monarchy. Theme of royal family history and media representation were central to the series."
===
Text: "At the education summit, Sal Khan, founder of Khan Academy, emphasized the importance of online learning solutions. Discussions included educational accessibility and advancing digital learning platforms."
===
Text: "Coca-Cola's marketing strategy was analyzed in a case study presented at the Advertising Symposium. John Smith from the company shared insights on brand evolution and global marketing trends."
===
Text: "Dr. Jane Goodall spoke at the Environmental Forum about the conservation efforts needed for endangered species. Key themes of biodiversity and habitat preservation were discussed."
===
Text: "Google's recent algorithm update caused a stir among digital marketers. The company's spokesperson, Maria Gonzalez, explained new guidelines that affect SEO strategies globally."
===
Text: "Pfizer's Vice President of Research, Dr. Albert Bourla, provided an update on their latest vaccine developments. The conversation centered around biotech advancements and public health innovation."
===
Text: "IBM's CEO, Arvind Krishna, was a keynote speaker at the AI Summit, highlighting the company's new initiatives in cloud computing and machine learning. The integration of AI in business operations was a crucial theme."
===
Text: "A documentary on Silk Road chronicles the rise and fall of the famous online marketplace and its founder, Ross Ulbricht. Themes of digital crime and cybersecurity challenges were highlighted."
===
Text: "PepsiCo's sustainability officer, Maria Cortez, announced new goals for reducing plastic waste, addressing the company's environmental impact. Recycling and sustainable practices were central themes."
===
Text: "At the fintech conference, Jane Doe from JP Morgan discussed blockchain technology and its influence on banking systems. Financial innovation and cryptocurrency developments were key topics."
===
Text: "Microsoft unveiled its latest project management software suite. CEO Satya Nadella discussed its implications for business productivity and workplace collaboration. Digital transformation was a focal theme."
===
Text: "Dr. Michio Kaku's latest book explores the future of scientific discovery, touching upon quantum physics and the potential of human space travel. Broader themes of scientific progress and exploration were evident."
===
Text: "The Harvard Business Review published an article by Professor Michael Porter on competitive strategy and market positioning. The overarching theme revolved around business strategy and corporate advantage."
===
Text: "Twitter's policy changes were announced by their CEO, Jack Dorsey, with an emphasis on freedom of speech and platform regulation. Social media governance and ethics were prominent themes."
===
Text: "A feature in National Geographic covers the Great Barrier Reef, with marine biologist Dr. Sylvia Earle discussing conservation strategies. Ocean ecology and environmental stewardship emerged as general themes."
===
Text: "At the automotive summit, Ford's CTO, Dr. Henry Lewis, presented on electric vehicle advancements. Automotive innovation and sustainable transport solutions were prominent topics."
===
Text: "A CNBC report analyzed Google's market strategies, featuring commentary from CEO Sundar Pichai. The discussion focused on the tech giant's expansion and competitive landscape."
===
Text: "The annual cybersecurity report highlighted new trends in online threats, mentioned by CyberSafe Inc. CEO, Lisa Taylor. Themes of digital security and data protection were predominant."
===
Text: "Amazon Prime's latest documentary series explores the culture and traditions of indigenous tribes, directed by renowned filmmaker James Cameron. Themes of cultural heritage and diversity were depicted."
===
Text: "Airbnb executives discussed their strategy for post-pandemic tourism at the travel and hospitality forum. The focus was on travel recovery and the future of accommodation services."
===
Text: "Sony's latest PlayStation release event, led by CEO Kenichiro Yoshida, detailed advances in gaming technology. The overarching themes were the future of interactive entertainment and consumer electronics."
===
Text: "Environmental activist Greta Thunberg addressed the United Nations on climate change, emphasizing the urgency of sustainable practices. Environmental policy and youth activism were central themes."
===
Text: "The Economist featured an article by Thomas Friedman on globalization and its effects on international trade. The piece covered themes of economic integration and global market trends."
===
Text: "A medical panel, including Dr. Sanjay Gupta, discussed the intricacies of genome editing at the bioethics conference. Genetic research and ethical considerations were highlighted as significant themes."
===
Text: "Walmart's strategic initiative for e-commerce was explained by CTO Suresh Kumar, focusing on digital shopping experiences. E-commerce growth and retail transformation were key topics."
===
Text: "Renowned chef Gordon Ramsay opened his newest culinary school, emphasizing the themes of gastronomy and culinary arts education."
===
Text: "The American Cancer Society's Director, Dr. Lisa Young, updated the public on recent developments in cancer research at a health symposium. Topics included medical advancements and patient care."
===
Text: "Nike's new advertising campaign, featuring professional athlete Serena Williams, focuses on empowerment and self-expression. Sports marketing and brand identity were the overarching themes."
===
Text: "The Climate Action Conference featured keynote speaker Al Gore discussing renewable energy initiatives. Climate change mitigation and sustainability solutions were the primary themes."
===
Text: "During the book fair, best-selling author Neil Gaiman released his latest fantasy novel. The overarching themes included storytelling and literary innovation."
===
Text: "At the urban development forum, Jane Jacobs' research was referenced in discussions about smart city planning and architecture. Urban innovation and community development were emphasized."
===
Text: "Bank of America's CEO, Brian Moynihan, discussed economic recovery strategies post-pandemic, with a focus on financial resilience and sustainable growth in banking."
===
Text: "Rivian's co-founder, RJ Scaringe, presented their new electric truck, showcasing advancements in eco-friendly automotive technology. Innovation in transport and renewable energy integration dominated."
===
Text: "A New York Times piece by celebrated journalist Jane Doe unraveled the complexities of geopolitical tensions in Eastern Europe, with themes of diplomacy and international relations."
===
Text: "Chanel's creative director, Karl Lagerfeld, unveiled the latest fashion collection at Paris Fashion Week, highlighting the fusion of innovation and tradition in fashion design."
===
Text: "In his latest publication, historian Yuval Noah Harari delves into the implications of AI on society, exploring themes of technological evolution and ethical challenges."
===
Text: "The biotechnology firm Genentech announced breakthroughs in genetic therapy, with Dr. Doe leading discussions. Biotech innovation and therapeutic advancements were the focus."
===
Text: "Intel's recent press release, delivered by CEO Patrick Gelsinger, revealed advancements in processor technology. Themes of tech innovation and computing performance were highlighted."
`````
