## elements ([json](./evals\o1preview-gpt4\elements/report.json))

- 15 rules
- 15 inverse rules
- 205 tests, 115 baseline tests

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
Text: {{ text }}

`````


### [intent.txt](./intent.txt)

`````txt
To extract important entities from a given text, including company names, people names, specific topics, and general overarching themes.
`````


### [input_spec.txt](./input_spec.txt)

`````txt
The input is a string of text provided under the key 'text'.
The text may include mentions of company names, people names, specific topics, and general themes.
`````


### [rules.txt](./rules.txt)

`````txt
1: The output must consist of exactly four separate lines.
2: Each line must begin with a category label followed by a colon.
3: The category labels must be "Company names", "People names", "Specific topics", and "General themes", in that exact order.
4: Each category label must be written exactly as specified, including capitalization and spelling.
5: After the colon on each line, the assistant must provide a comma-separated list of extracted entities corresponding to that category.
6: The entities in each list must be separated by commas and must not include any additional punctuation.
7: If there are no entities to list in a category, the assistant must still include the category label followed by a colon and leave it empty.
8: For "Company names", the assistant must extract all company names mentioned in the text, where a company name is the official name of a legally recognized business organization.
9: For "People names", the assistant must extract all personal names mentioned in the text, where a people name is the full name or commonly recognized name of an individual person.
10: For "Specific topics", the assistant must extract all specific topics discussed in the text, where a specific topic is a particular subject, concept, or issue that is directly addressed.
11: For "General themes", the assistant must extract all general overarching themes present in the text, where a general theme is a broad and abstract idea or subject that captures the main essence or message of the text.
12: The assistant must only extract entities that are explicitly mentioned or clearly implied in the text.
13: The assistant must not add any extra text, explanations, or formatting beyond what is specified in the desired format.
14: The assistant must not include numbering, bullet points, or any other formatting marks besides those specified.
15: The assistant must ensure that the output exactly matches the desired format provided, with precise adherence to structure and content requirements.
`````


### [inverse_rules.txt](./inverse_rules.txt)

`````txt
16: The output must not consist of exactly four separate lines.
17: Lines may not begin with a category label followed by a colon.
18: The category labels may differ from "Company names", "People names", "Specific topics", and "General themes", or may be in any order.
19: Each category label can be written differently than specified, including changes in capitalization and spelling.
20: After the colon on each line, the assistant may avoid providing a comma-separated list of extracted entities corresponding to that category.
21: The entities in each list may include additional punctuation or be separated by other delimiters than commas.
22: If there are no entities to list in a category, the assistant may omit the category label or add content after the colon.
23: For "Company names", the assistant may choose not to extract company names or may include entities that are not official business organizations.
24: For "People names", the assistant may choose not to extract personal names or may include names that are not of individual persons.
25: For "Specific topics", the assistant may choose not to extract specific topics discussed in the text.
26: For "General themes", the assistant may choose not to extract general overarching themes or may include specific details instead.
27: The assistant may extract entities not explicitly mentioned or implied in the text.
28: The assistant may add extra text, explanations, or formatting beyond what is specified in the desired format.
29: The assistant may include numbering, bullet points, or other formatting marks besides those specified.
30: The assistant does not need to ensure that the output exactly matches the desired format provided, and may deviate from structure and content requirements.
`````


### [tests.csv](./tests.csv)

|testinput|expectedoutput|reasoning|
|-|-|-|
|Text: Tesla and SpaceX, led by Elon Musk, are pioneering innovations in renewable energy and space travel to combat climate change\.|Company names: Tesla, SpaceX<br>People names: Elon Musk<br>Specific topics: renewable energy, space travel<br>General themes: innovation, climate change|This test checks if the software outputs exactly four separate lines when all categories have entities, complying with rule 1\.|
|Text: Apple Inc\. released a new iPhone\. The launch event was hosted by Tim Cook\.|Company names: Apple Inc\.<br>People names: Tim Cook<br>Specific topics: new iPhone, launch event<br>General themes: technology, product release|This test ensures the software outputs exactly four lines with proper entities, validating rule 1\.|
|Text: The conference discussed advancements in artificial intelligence\.|Company names:<br>People names:<br>Specific topics: artificial intelligence<br>General themes: technological advancements|This test verifies that even when some categories are empty, the software still outputs exactly four lines, adhering to rule 1\.|
|Text: Microsoft CEO Satya Nadella spoke about cloud computing and digital transformation at the summit\.|Company names: Microsoft<br>People names: Satya Nadella<br>Specific topics: cloud computing, digital transformation<br>General themes: technology, leadership|This test checks that each output line begins with the correct category label followed by a colon, ensuring adherence to rule 2\.|
|Text: Marie Curie's work laid the foundation for modern nuclear physics\.|Company names:<br>People names: Marie Curie<br>Specific topics: nuclear physics<br>General themes: scientific research, pioneering work|This test verifies that even when some categories are empty, each line begins with the category label followed by a colon, as required by rule 2\.|
|Text: In a historic mission, NASA's Perseverance Rover landed on Mars\.|Company names: NASA<br>People names:<br>Specific topics: Perseverance Rover, Mars landing<br>General themes: space exploration, innovation|This test ensures that each output line starts with the category label and colon, testing compliance with rule 2\.|
|Text: Google announced its collaboration with DeepMind, guided by Sundar Pichai, to enhance AI technologies\.|Company names: Google, DeepMind<br>People names: Sundar Pichai<br>Specific topics: AI technologies, collaboration<br>General themes: artificial intelligence, innovation|This test verifies that the software outputs the category labels in the correct order and exactly as specified in rule 3\.|
|Text: Amelia Earhart was a pioneer in aviation, inspiring women worldwide\.|Company names:<br>People names: Amelia Earhart<br>Specific topics: aviation<br>General themes: inspiration, women's empowerment|This test ensures that even when some categories are empty, the order and labels remain as per rule 3\.|
|Text: Amazon's Jeff Bezos plans for space tourism through Blue Origin\.|Company names: Amazon, Blue Origin<br>People names: Jeff Bezos<br>Specific topics: space tourism<br>General themes: exploration, commercial spaceflight|This test confirms that the correct order and exact category labels are used, complying with rule 3\.|
|Text: At the Apple Worldwide Developers Conference, Tim Cook unveiled new features in iOS\.|Company names: Apple<br>People names: Tim Cook<br>Specific topics: iOS features, Worldwide Developers Conference<br>General themes: technology advancements, software development|This test checks that category labels are written exactly as specified, including capitalization and spelling, as per rule 4\.|
|Text: J\.K\. Rowling's Harry Potter series has enchanted readers globally\.|Company names:<br>People names: J\.K\. Rowling<br>Specific topics: Harry Potter series<br>General themes: literature, fantasy|Ensures exact capitalization and spelling of category labels, testing compliance with rule 4\.|
|Text: The United Nations focuses on global issues like peacekeeping and humanitarian aid\.|Company names: United Nations<br>People names:<br>Specific topics: peacekeeping, humanitarian aid<br>General themes: global cooperation, international relations|Verifies that the category labels are exactly as specified, including capitalization, in accordance with rule 4\.|
|Text: Bill Gates and Melinda Gates Foundation are investing in global health and education\.|Company names: Melinda Gates Foundation<br>People names: Bill Gates<br>Specific topics: global health, education<br>General themes: philanthropy, social impact|This test confirms that after the colon, the assistant provides a comma\-separated list of entities, as required by rule 5\.|
|Text: Facebook, now Meta, is focusing on virtual reality and the metaverse\.|Company names: Facebook, Meta<br>People names:<br>Specific topics: virtual reality, metaverse<br>General themes: technological evolution, social connectivity|Ensures that the entities are listed as comma\-separated values after the colon, per rule 5\.|
|Text: Nelson Mandela advocated for peace and equality in South Africa\.|Company names:<br>People names: Nelson Mandela<br>Specific topics: peace, equality, South Africa<br>General themes: civil rights, social justice|Verifies that the assistant lists entities in comma\-separated format after the colon, complying with rule 5\.|
|Text: Alphabet Inc\.'s Google and YouTube are at the forefront of internet services\.|Company names: Alphabet Inc\., Google, YouTube<br>People names:<br>Specific topics: internet services<br>General themes: digital technology, online platforms|This test ensures that the entities are separated only by commas without additional punctuation, as specified in rule 6\.|
|Text: Leonardo da Vinci was known for painting the Mona Lisa and The Last Supper\.|Company names:<br>People names: Leonardo da Vinci<br>Specific topics: Mona Lisa, The Last Supper<br>General themes: art, Renaissance|Verifies that entity lists use commas only, with no additional punctuation, ensuring compliance with rule 6\.|
|Text: IBM, Apple, and Microsoft have had significant impacts on computing\.|Company names: IBM, Apple, Microsoft<br>People names:<br>Specific topics: computing<br>General themes: technology innovation|Checks that entities are comma\-separated without extra punctuation, as per rule 6\.|
|Text: Advancements in quantum computing are accelerating\.|Company names:<br>People names:<br>Specific topics: quantum computing<br>General themes: technological advancements|This test confirms that when a category has no entities, the assistant still outputs the category label followed by a colon and leaves it empty, compliant with rule 7\.|
|Text: The festival celebrated art, music, and culture\.|Company names:<br>People names:<br>Specific topics: art, music, culture<br>General themes: celebration, community|Ensures categories with no entities are included and left empty after the colon, per rule 7\.|
|Text: Climate change impacts ecosystems worldwide\.|Company names:<br>People names:<br>Specific topics: climate change<br>General themes: environmental issues|Verifies that empty categories are handled correctly by including the label and leaving it empty, adhering to rule 7\.|
|Text: Tesla and SolarCity are working together on renewable energy projects\.|Company names: Tesla, SolarCity<br>People names:<br>Specific topics: renewable energy projects<br>General themes: sustainability|This test checks that the assistant extracts all official company names mentioned, as required by rule 8\.|
|Text: The partnership between Starbucks and Nestlé expands coffee offerings globally\.|Company names: Starbucks, Nestlé<br>People names:<br>Specific topics: coffee offerings, global partnership<br>General themes: business expansion|Verifies that official company names are correctly extracted, following rule 8\.|
|Text: IBM acquired Red Hat to enhance its cloud computing capabilities\.|Company names: IBM, Red Hat<br>People names:<br>Specific topics: cloud computing capabilities, acquisition<br>General themes: technology integration|Confirms accurate extraction of company names per rule 8\.|
|Text: Malala Yousafzai advocates for girls' education worldwide\.|Company names:<br>People names: Malala Yousafzai<br>Specific topics: girls' education<br>General themes: education rights, activism|This test ensures the assistant extracts full personal names accurately, as specified in rule 9\.|
|Text: Albert Einstein developed the theory of relativity\.|Company names:<br>People names: Albert Einstein<br>Specific topics: theory of relativity<br>General themes: physics, scientific breakthroughs|Confirms proper extraction of personal names, complying with rule 9\.|
|Text: The work of Vincent van Gogh revolutionized post\-impressionist art\.|Company names:<br>People names: Vincent van Gogh<br>Specific topics: post\-impressionist art<br>General themes: art history, innovation|Verifies accurate extraction of individual person names per rule 9\.|
|Text: The seminar on renewable energy highlighted solar and wind power advancements\.|Company names:<br>People names:<br>Specific topics: renewable energy, solar power, wind power, advancements<br>General themes: environmental sustainability|This test checks that all specific topics directly discussed are extracted, as per rule 10\.|
|Text: Discussions centered around artificial intelligence and machine learning applications\.|Company names:<br>People names:<br>Specific topics: artificial intelligence, machine learning applications<br>General themes: technology innovation|Confirms extraction of specific topics directly addressed, complying with rule 10\.|
|Text: The lecture covered human rights issues and international law\.|Company names:<br>People names:<br>Specific topics: human rights, international law<br>General themes: justice, global governance|Verifies extraction of specific topics discussed, adhering to rule 10\.|
|Text: The novel explores love, loss, and the journey towards self\-discovery\.|Company names:<br>People names:<br>Specific topics:<br>General themes: love, loss, self\-discovery|This test ensures the assistant extracts general overarching themes of the text, as specified in rule 11\.|
|Text: The conference emphasized the importance of innovation and collaboration in the modern economy\.|Company names:<br>People names:<br>Specific topics:<br>General themes: innovation, collaboration, modern economy|Confirms accurate extraction of general themes per rule 11\.|
|Text: His speech addressed the challenges of leadership in times of crisis\.|Company names:<br>People names:<br>Specific topics:<br>General themes: leadership, crisis management|Verifies compliance with rule 11 by extracting overarching themes\.|
|Text: SpaceX plans another mission to the International Space Station\.|Company names: SpaceX<br>People names:<br>Specific topics: mission, International Space Station<br>General themes: space exploration|This test confirms that only entities explicitly mentioned or clearly implied are extracted, in line with rule 12\.|
|Text: She received an award for her groundbreaking research\.|Company names:<br>People names:<br>Specific topics: groundbreaking research, award<br>General themes: recognition, scientific advancement|Ensures no entities beyond those mentioned or implied are extracted, per rule 12\.|
|Text: The ancient ruins tell stories of lost civilizations\.|Company names:<br>People names:<br>Specific topics: ancient ruins, lost civilizations<br>General themes: history, archaeology|Verifies that only entities in the text are extracted, complying with rule 12\.|
|Text: Adobe acquired Figma to expand its design tools\.|Company names: Adobe, Figma<br>People names:<br>Specific topics: acquisition, design tools<br>General themes: business strategy, design industry|This test ensures the assistant does not add extra explanations or formatting, adhering strictly to the desired format per rule 13\.|
|Text: The documentary examines the effects of pollution on marine life\.|Company names:<br>People names:<br>Specific topics: pollution, marine life<br>General themes: environmental issues, conservation|Confirms no extra text or formatting is added, in compliance with rule 13\.|
|Text: Leaders discussed economic policies at the summit\.|Company names:<br>People names:<br>Specific topics: economic policies, summit<br>General themes: economics, international relations|Verifies adherence to the specified format without extra content, per rule 13\.|
|Text: Scientists are exploring the potential of gene editing\.|Company names:<br>People names:<br>Specific topics: gene editing<br>General themes: scientific research, biotechnology|This test ensures the assistant does not use numbering or bullet points, complying with rule 14\.|
|Text: The team's victory was a result of strategy, skill, and teamwork\.|Company names:<br>People names:<br>Specific topics: strategy, skill, teamwork<br>General themes: sportsmanship, collaboration|Confirms no improper formatting marks are added, in accordance with rule 14\.|
|Text: Her artistic expression combines elements of dance, music, and visual arts\.|Company names:<br>People names:<br>Specific topics: dance, music, visual arts<br>General themes: artistic expression, creativity|Verifies the assistant avoids numbering or bullets, per rule 14\.|
|Text: Google's Sundar Pichai emphasizes the importance of AI ethics\.|Company names: Google<br>People names: Sundar Pichai<br>Specific topics: AI ethics<br>General themes: technology responsibility|This test ensures the assistant produces output that exactly matches the desired format, adhering to rule 15\.|
|Text: Jane Goodall's work with chimpanzees has transformed animal conservation\.|Company names:<br>People names: Jane Goodall<br>Specific topics: chimpanzees, animal conservation<br>General themes: environmentalism, wildlife research|Confirms precise adherence to structure as per rule 15\.|
|Text: The Paris Agreement aims to address climate change globally\.|Company names:<br>People names:<br>Specific topics: Paris Agreement, climate change<br>General themes: international cooperation, environmental policy|Verifies exact format compliance with rule 15\.|
|Text: The park was peaceful\.|Company names:<br>People names:<br>Specific topics:<br>General themes:|This test verifies that the software maintains the four\-line structure even when no entities are present, ensuring it does not violate rule 16\.|
|Text: IBM and Microsoft are tech giants\.|Company names: IBM, Microsoft<br>People names:<br>Specific topics:<br>General themes:|Ensures the software outputs exactly four lines despite partial data, complying with the intended behavior and not violating rule 16\.|
|Text: Einstein developed the theory of relativity, which changed physics forever\.|Company names:<br>People names: Einstein<br>Specific topics: theory of relativity<br>General themes: physics, scientific breakthroughs|Verifies that the software maintains the four\-line structure, thus not violating rule 16\.|
|Text: Facebook is creating virtual reality headsets\.|Company names: Facebook<br>People names:<br>Specific topics: virtual reality headsets<br>General themes: technology innovation|Ensures the software correctly includes category labels with colons, thus not following rule 17\.|
|Text: Shakespeare wrote many plays and sonnets\.|Company names:<br>People names: Shakespeare<br>Specific topics: plays, sonnets<br>General themes: literature, art|Verifies that the software starts lines with category labels followed by colons, not violating rule 17\.|
|Text: The United Nations is hosting a summit on climate action\.|Company names: United Nations<br>People names:<br>Specific topics: summit, climate action<br>General themes: international cooperation, environmental issues|Confirms inclusion of category labels with colons, not adhering to rule 17\.|
|Text: Amazon's Jeff Bezos aims to take people to the moon\.|Company names: Amazon<br>People names: Jeff Bezos<br>Specific topics: moon mission<br>General themes: space exploration, entrepreneurship|Checks that the assistant uses the specified category labels in order, not following rule 18\.|
|Text: Neil Armstrong was the first person to walk on the Moon\.|Company names:<br>People names: Neil Armstrong<br>Specific topics: Moon landing<br>General themes: historic achievements, space exploration|Verifies correct category labels and order, not violating rule 18\.|
|Text: Tesla is revolutionizing electric vehicles\.|Company names: Tesla<br>People names:<br>Specific topics: electric vehicles<br>General themes: innovation, sustainable transportation|Ensures proper use of category labels in specified order, thus not adhering to rule 18\.|
|Text: At the opening ceremony, the President addressed the nation\.|Company names:<br>People names: President<br>Specific topics: opening ceremony<br>General themes: national events, leadership|This test ensures that the category labels are written exactly as specified, not differing in capitalization or spelling, thus not following rule 19\.|
|Text: The BBC reported on advancements in renewable energy\.|Company names: BBC<br>People names:<br>Specific topics: advancements, renewable energy<br>General themes: environmental issues, media coverage|Verifies exact spelling and capitalization of category labels, not violating rule 19\.|
|Text: William Shakespeare's influence on literature remains unmatched\.|Company names:<br>People names: William Shakespeare<br>Specific topics: influence on literature<br>General themes: cultural impact, literary history|Confirms category labels are written exactly as specified, not adhering to rule 19\.|
|Text: Researchers discovered a new species in the Amazon rainforest\.|Company names:<br>People names:<br>Specific topics: new species, Amazon rainforest<br>General themes: biodiversity, scientific discovery|Ensures the assistant provides a comma\-separated list of entities after the colon, thus not avoiding as per rule 20\.|
|Text: The study highlights the importance of mental health awareness\.|Company names:<br>People names:<br>Specific topics: mental health awareness, study<br>General themes: public health, well\-being|Confirms proper listing of entities after the colon, not following rule 20\.|
|Text: Innovations in AI are transforming industries worldwide\.|Company names:<br>People names:<br>Specific topics: innovations, AI<br>General themes: technological change, global impact|Verifies that entities are provided after the colon, not avoiding as per rule 20\.|
|Text: The CEO announced the merger; investors reacted positively\.|Company names:<br>People names: CEO<br>Specific topics: merger<br>General themes: business, investment reactions|Ensures entities in lists are separated by commas without additional punctuation, not including extra marks as per rule 21\.|
|Text: The festival featured music—art—and dance\.|Company names:<br>People names:<br>Specific topics: music, art, dance<br>General themes: cultural celebration|Confirms entities are comma\-separated, avoiding other delimiters, not following rule 21\.|
|Text: Advances in genetics: medicine: and technology were discussed\.|Company names:<br>People names:<br>Specific topics: genetics, medicine, technology<br>General themes: scientific progress|Verifies that commas are used to separate entities without additional punctuation, not adhering to rule 21\.|
|Text: The monument was built to commemorate heroes\.|Company names:<br>People names:<br>Specific topics: monument, heroes<br>General themes: remembrance, honor|Ensures the category labels are included and left empty when no entities are present, not omitting them as per rule 22\.|
|Text: Renewable energy sources are crucial for the future\.|Company names:<br>People names:<br>Specific topics: renewable energy sources<br>General themes: sustainability, future planning|Confirms empty categories are included, not adding content after the colon, not following rule 22\.|
|Text: Global cooperation is needed to address pandemics\.|Company names:<br>People names:<br>Specific topics: global cooperation, pandemics<br>General themes: international health, collaboration|Verifies categories are properly included and left empty when necessary, not violating rule 22\.|
|Text: He started a non\-profit organization to help others\.|Company names: non\-profit organization<br>People names:<br>Specific topics: helping others<br>General themes: philanthropy, social assistance|Ensures only official company names are extracted, not including entities that are not legally recognized businesses, thus not following rule 23\.|
|Text: They formed a charity to support education\.|Company names: charity<br>People names:<br>Specific topics: support education<br>General themes: community service, learning|Verifies only official company names are listed, not ignoring as per rule 23\.|
|Text: The startup aims to innovate the tech industry\.|Company names: startup<br>People names:<br>Specific topics: innovate, tech industry<br>General themes: entrepreneurship, innovation|Confirms extraction of company names, not choosing to exclude them as per rule 23\.|
|Text: Dr\. Martin Luther King Jr\. delivered inspiring speeches\.|Company names:<br>People names: Dr\. Martin Luther King Jr\.<br>Specific topics: inspiring speeches<br>General themes: civil rights, inspiration|Ensures personal names are extracted correctly, not excluding or including non\-person entities, thus not following rule 24\.|
|Text: Mother Teresa dedicated her life to helping the poor\.|Company names:<br>People names: Mother Teresa<br>Specific topics: helping the poor<br>General themes: compassion, humanitarian work|Verifies accurate extraction of individual names, not ignoring as per rule 24\.|
|Text: The artist known as Banksy remains anonymous\.|Company names:<br>People names: Banksy<br>Specific topics: anonymity, street art<br>General themes: artistic expression, mystery|Confirms inclusion of personal names, not omitting or misclassifying as per rule 24\.|
|Text: The lecture delved into astrophysics and black holes\.|Company names:<br>People names:<br>Specific topics: astrophysics, black holes<br>General themes: space science, advanced physics|Ensures extraction of specific topics, not choosing to exclude them as per rule 25\.|
|Text: Workshops on coding and robotics were offered\.|Company names:<br>People names:<br>Specific topics: coding, robotics, workshops<br>General themes: education, technology skills|Verifies inclusion of specific topics discussed, not omitting as per rule 25\.|
|Text: The article analyzed economic trends and forecasts\.|Company names:<br>People names:<br>Specific topics: economic trends, forecasts<br>General themes: finance, market analysis|Confirms extraction of specific topics, not following rule 25 by excluding them\.|
|Text: The story explores themes of betrayal and redemption\.|Company names:<br>People names:<br>Specific topics:<br>General themes: betrayal, redemption|Ensures general themes are extracted, not including specific details instead, thus not adhering to rule 26\.|
|Text: The movie touches on love, loss, and hope\.|Company names:<br>People names:<br>Specific topics:<br>General themes: love, loss, hope|Verifies inclusion of general overarching themes, not replacing with specifics as per rule 26\.|
|Text: Their journey symbolizes resilience and perseverance\.|Company names:<br>People names:<br>Specific topics:<br>General themes: resilience, perseverance|Confirms extraction of general themes, not violating rule 26 by focusing on specifics\.|
|Text: The painting depicts a serene landscape\.|Company names:<br>People names:<br>Specific topics: serene landscape<br>General themes: tranquility, nature|Ensures only entities mentioned are extracted, not adding unrelated ones, thus not following rule 27\.|
|Text: She wrote a book about her travels\.|Company names:<br>People names:<br>Specific topics: book, travels<br>General themes: exploration, personal journey|Verifies no extraneous entities are included, complying with intended behavior and not adhering to rule 27\.|
|Text: The team celebrated their victory\.|Company names:<br>People names:<br>Specific topics: victory, team celebration<br>General themes: success, teamwork|Confirms only explicit entities are extracted, not adding others as per rule 27\.|
|Text: The project aims to improve urban infrastructure\.|Company names:<br>People names:<br>Specific topics: urban infrastructure, project<br>General themes: urban development, improvement|Ensures no extra text or explanations are added beyond the specified format, thus not following rule 28\.|
|Text: The speech addressed global health challenges\.|Company names:<br>People names:<br>Specific topics: global health challenges, speech<br>General themes: public health, international issues|Verifies adherence to format without additional text, not violating rule 28\.|
|Text: Advances in renewable energy are promising\.|Company names:<br>People names:<br>Specific topics: advances, renewable energy<br>General themes: sustainability, innovation|Confirms no extra explanations are included, complying with the intended behavior and not following rule 28\.|
|Text: The festival featured diverse cultures\.|Company names:<br>People names:<br>Specific topics: festival, diverse cultures<br>General themes: multiculturalism, celebration|Ensures no numbering or bullet points are added, not adhering to rule 29\.|
|Text: Her performance combined music and storytelling\.|Company names:<br>People names:<br>Specific topics: performance, music, storytelling<br>General themes: artistic expression, creativity|Verifies the output avoids improper formatting marks, not following rule 29\.|
|Text: The expedition discovered new species\.|Company names:<br>People names:<br>Specific topics: expedition, new species<br>General themes: exploration, scientific discovery|Confirms proper formatting without additional marks, thus not adhering to rule 29\.|
|Text: The policy aims to reduce emissions by 2030\.|Company names:<br>People names:<br>Specific topics: policy, emissions reduction<br>General themes: environmental policy, sustainability|Ensures the output exactly matches the desired format, not deviating as per rule 30\.|
|Text: The workshop focused on leadership skills\.|Company names:<br>People names:<br>Specific topics: workshop, leadership skills<br>General themes: personal development, education|Verifies adherence to structure and content requirements, not following rule 30\.|
|Text: Researchers are analyzing climate patterns\.|Company names:<br>People names:<br>Specific topics: climate patterns, research<br>General themes: climate science, data analysis|Confirms exact format adherence, not deviating as per rule 30\.|

### [baseline_tests.txt](./baseline_tests.txt)

`````txt
Text: Apple's CEO Tim Cook unveiled the new iPhone at the annual Apple Worldwide Developers Conference.
===
Text: Elon Musk, the CEO of Tesla and SpaceX, announced plans for a mission to Mars.
===
Text: The United Nations released a report on climate change and global warming.
===
Text: J.K. Rowling wrote the "Harry Potter" series, which was published by Bloomsbury.
===
Text: Microsoft acquired LinkedIn for $26 billion in 2016.
===
Text: Serena Williams won her 23rd Grand Slam title at the Australian Open.
===
Text: Google introduced its new Pixel smartphone at the tech expo.
===
Text: The Louvre Museum in Paris displays the Mona Lisa by Leonardo da Vinci.
===
Text: Amazon's founder Jeff Bezos stepped down as CEO in 2021.
===
Text: The World Health Organization declared a global health emergency.
===
Text: Facebook rebranded itself as Meta to focus on the metaverse.
===
Text: The film directed by Christopher Nolan explores complex time concepts.
===
Text: Beyoncé released a new album that topped the charts worldwide.
===
Text: NASA's Perseverance rover landed successfully on Mars.
===
Text: Coca-Cola and PepsiCo are long-time rivals in the beverage industry.
===
Text: The Nobel Prize in Literature was awarded to Toni Morrison.
===
Text: IBM's Watson is an advanced artificial intelligence system.
===
Text: Bill Gates founded the Bill & Melinda Gates Foundation for global health.
===
Text: The Sydney Opera House is an iconic landmark in Australia.
===
Text: The book "1984" by George Orwell depicts a dystopian society.
===
Text: SpaceX launched a satellite into orbit using the Falcon 9 rocket.
===
Text: The Beatles were a legendary band from Liverpool, England.
===
Text: The United States Senate passed the new infrastructure bill.
===
Text: Oprah Winfrey hosted a special interview with Meghan Markle.
===
Text: Samsung announced the release of its new Galaxy smartphone.
===
Text: The European Union implemented new data protection regulations.
===
Text: Harvard University is one of the most prestigious schools in the world.
===
Text: Marie Curie's research pioneered the field of radioactivity.
===
Text: Nike released a new line of running shoes endorsed by athletes.
===
Text: Disney opened a new theme park attraction based on Star Wars.
===
Text: Stephen King is a prolific author known for his horror novels.
===
Text: The United Nations International Children's Emergency Fund is known as UNICEF.
===
Text: Twitter updated its policies regarding user privacy and security.
===
Text: The World Bank provided funding for development projects in Africa.
===
Text: Tesla's stock price surged after record-breaking sales.
===
Text: Mount Everest is the highest mountain above sea level.
===
Text: Adobe Systems is known for software like Photoshop and Illustrator.
===
Text: Albert Einstein developed the theory of relativity.
===
Text: Sony unveiled its latest gaming console at the conference.
===
Text: Amnesty International advocates for human rights worldwide.
===
Text: The Boston Marathon is one of the world's oldest annual marathons.
===
Text: NASA announced the Artemis program to return humans to the Moon.
===
Text: Starbucks opened its first store in Seattle in 1971.
===
Text: The Rolling Stones are one of the longest-running rock bands.
===
Text: The New York Times published an article on technological innovations.
===
Text: The tech startup received investment from venture capital firms.
===
Text: Greta Thunberg addressed the UN on climate action.
===
Text: Volkswagen launched a new line of electric vehicles.
===
Text: The Smithsonian Institution has numerous museums in Washington, D.C.
===
Text: IBM appointed a new CEO to lead its cloud computing efforts.
===
Text: The Academy Awards ceremony is also known as the Oscars.
===
Text: Toyota announced advancements in hybrid car technology.
===
Text: The International Monetary Fund focuses on global economic stability.
===
Text: Beyoncé and Jay-Z collaborated on a joint album.
===
Text: LinkedIn is a professional networking platform owned by Microsoft.
===
Text: The Cannes Film Festival showcases international cinema.
===
Text: Warren Buffett is the CEO of Berkshire Hathaway.
===
Text: The United States Postal Service delivers mail across the country.
===
Text: Amazon Web Services offers cloud computing solutions.
===
Text: The Getty Museum houses a vast collection of artworks.
===
Text: IBM's Deep Blue computer defeated a world chess champion.
===
Text: The company Apple is known for its innovative products.
===
Text: Facebook's headquarters are located in Menlo Park, California.
===
Text: The Metropolitan Museum of Art is located in New York City.
===
Text: Google's parent company is called Alphabet Inc.
===
Text: Netflix produces original series and films streamed globally.
===
Text: NASA and SpaceX collaborate on space missions.
===
Text: Shopify provides e-commerce platforms for online stores.
===
Text: General Motors plans to phase out gasoline vehicles by 2035.
===
Text: The Bill & Melinda Gates Foundation focuses on global health.
===
Text: Virgin Galactic aims to offer commercial space flights.
===
Text: Adidas is a global corporation that designs athletic footwear.
===
Text: Slack Technologies offers business communication solutions.
===
Text: The United Nations Educational, Scientific and Cultural Organization is UNESCO.
===
Text: Paypal facilitates online money transfers worldwide.
===
Text: Adobe acquired the software company Figma.
===
Text: Zoom Video Communications saw increased usage during remote work.
===
Text: Ford Motor Company introduced the Mustang Mach-E electric SUV.
===
Text: Twitter's co-founder Jack Dorsey stepped down as CEO.
===
Text: Pfizer developed a vaccine for COVID-19.
===
Text: The Walt Disney Company owns Marvel Studios and Lucasfilm.
===
Text: Intel is a leading producer of semiconductor chips.
===
Text: The United Nations Climate Change Conference is known as COP26.
===
Text: Airbnb offers a platform for booking lodging and experiences.
===
Text: Moderna is a biotechnology company developing mRNA vaccines.
===
Text: Salesforce acquired Slack in a major tech deal.
===
Text: The company Uber provides ride-sharing services globally.
===
Text: Spotify is a digital music service that gives access to millions of songs.
===
Text: Reddit is a network of communities based on people's interests.
===
Text: Etsy is an e-commerce website focused on handmade items.
===
Text: Stripe offers online payment processing for internet businesses.
===
Text: Oracle Corporation specializes in database software and cloud systems.
===
Text: GitHub, a platform for software developers, is owned by Microsoft.
===
Text: Square, Inc., co-founded by Jack Dorsey, provides financial services.
===
Text: Tesla's CEO Elon Musk also leads SpaceX and Neuralink.
===
Text: The National Aeronautics and Space Administration is abbreviated as NASA.
===
Text: Shopify's CEO Tobi Lütke announced new merchant tools.
===
Text: The Linux Foundation supports the growth of the Linux operating system.
===
Text: Patagonia is an outdoor clothing company focused on environmental activism.
===
Text: The Federal Reserve sets monetary policy in the United States.
===
Text: Kickstarter is a crowdfunding platform for creative projects.
===
Text: Qualcomm develops wireless telecommunications products and services.
===
Text: The European Space Agency collaborates with NASA on missions.
===
Text: The Guardian is a British daily newspaper founded in 1821.
===
Text: FedEx Corporation provides multinational delivery services.
===
Text: The United Nations Security Council addresses threats to international security.
===
Text: Harvard professor Michael Porter developed the Five Forces analysis.
===
Text: Slack's CEO Stewart Butterfield previously co-founded Flickr.
===
Text: Twitter permanently banned certain accounts for policy violations.
===
Text: The World Trade Organization deals with global trade rules.
===
Text: Zoom's founder Eric Yuan moved to the U.S. from China.
===
Text: Dell Technologies is a multinational computer technology company.
===
Text: The Paris Agreement is an international treaty on climate change.
===
Text: The Royal Society is a fellowship of eminent scientists in the UK.
===
Text: GitLab provides DevOps lifecycle tools for software development.
`````
