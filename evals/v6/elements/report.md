## elements ([json](./evals\v6\elements/report.json))

- 10 rules
- 12 inverse rules
- 133 tests, 67 baseline tests

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
The input must be a string containing a passage of text.  
The input string can include names of companies, names of people, specific topics, and general themes relevant to the content.
`````


### [rules.txt](./rules.txt)

`````txt
1: The output must start with the label "Company names:" followed by a list of company names extracted from the input text in a comma-separated format. 
2: The next line must begin with the label "People names:" followed by a list of people names extracted from the input text in a comma-separated format. 
3: The third line must start with the label "Specific topics:" followed by a list of specific topics relevant to the input text content in a comma-separated format. 
4: The final line must start with the label "General themes:" followed by a list of general overarching themes relevant to the input text content in a comma-separated format. 
5: If there are no entities to list for any category, it should still display the label followed by a blank space, indicating the absence of entities, but still maintain the format. 
6: Each label, followed by a colon, must be present in the output even if no corresponding data is extracted. 
7: Terms for company names refer to legally recognized organizations or businesses. 
8: Terms for people names refer to individual human beings identified by names or titles. 
9: Terms for specific topics refer to precise subjects or areas of interest related to the content of the input text. 
10: Terms for general themes refer to broad and overarching subjects or ideas conveyed by the input text content.
`````


### [inverse_rules.txt](./inverse_rules.txt)

`````txt
13: Company names: 
14: People names: 
15: Specific topics: 
16: General themes: 
17: The output doesn't need to start with any labels.
18: The next line must not include a list of people names.
19: The third line should not contain specific topics relevant to the input text.
20: If there are no entities, the label should be omitted entirely.
21: Terms for company names do not refer to legally recognized organizations.
22: Terms for people names do not refer to individual human beings.
23: Terms for specific topics do not refer to precise subjects.
24: Terms for general themes do not refer to broad and overarching subjects.
`````


### [tests.csv](./tests.csv)

|testinput|expectedoutput|reasoning|
|-|-|-|
|Apple and Google are leading companies in technology\.|Company names: Apple, Google\\nPeople names: \\nSpecific topics: \\nGeneral themes:|Tests if company names are correctly extracted and output format is maintained\.|
|Tesla partnered with SpaceX for new tech innovations\.|Company names: Tesla, SpaceX\\nPeople names: \\nSpecific topics: \\nGeneral themes:|Checks extraction of multiple company names and correct formatting\.|
|We discussed Amazon's latest policies\.|Company names: Amazon\\nPeople names: \\nSpecific topics: \\nGeneral themes:|Validates single company name extraction and output format adherence\.|
|The collaboration between Elon Musk and Jeff Bezos was unexpected\.|Company names: \\nPeople names: Elon Musk, Jeff Bezos\\nSpecific topics: \\nGeneral themes:|Tests extraction of multiple people's names while maintaining correct output format\.|
|Marie Curie and Albert Einstein revolutionized science\.|Company names: \\nPeople names: Marie Curie, Albert Einstein\\nSpecific topics: \\nGeneral themes:|Validates the software's ability to extract people names correctly\.|
|Discussing innovations by Steve Jobs and Tim Cook\.|Company names: \\nPeople names: Steve Jobs, Tim Cook\\nSpecific topics: \\nGeneral themes:|Ensures people's names are extracted and placed correctly in the output\.|
|The future of artificial intelligence and quantum computing is bright\.|Company names: \\nPeople names: \\nSpecific topics: artificial intelligence, quantum computing\\nGeneral themes:|Tests correct identification and extraction of specific topics from text\.|
|Cryptocurrency and blockchain are the future\.|Company names: \\nPeople names: \\nSpecific topics: cryptocurrency, blockchain\\nGeneral themes:|Ensures specific topics related to technology are extracted correctly\.|
|Global warming poses significant challenges\.|Company names: \\nPeople names: \\nSpecific topics: global warming\\nGeneral themes:|Validates extraction of specific environmental topics\.|
|Discussing the advancements made in technology and sustainability\.|Company names: \\nPeople names: \\nSpecific topics: \\nGeneral themes: technology, sustainability|Tests extraction of general themes and proper output format\.|
|The narrative around health and wellness is evolving\.|Company names: \\nPeople names: \\nSpecific topics: \\nGeneral themes: health, wellness|Ensures broad ideas are correctly identified and formatted\.|
|Exploration of space and the oceans continues\.|Company names: \\nPeople names: \\nSpecific topics: \\nGeneral themes: space exploration, ocean exploration|Validates that overarching themes are properly extracted and formatted\.|
|The research was conducted in several domains without specific names mentioned\.|Company names: \\nPeople names: \\nSpecific topics: \\nGeneral themes:|Ensures labels are displayed even when categories are empty, maintaining format\.|
|This document does not mention any specific company or individual\.|Company names: \\nPeople names: \\nSpecific topics: \\nGeneral themes:|Tests handling of a scenario where no entities are present, ensuring correct labeling\.|
|Nothing to highlight in terms of significant topics or themes\.|Company names: \\nPeople names: \\nSpecific topics: \\nGeneral themes:|Confirms labels appear correctly even with no extracted data, adhering to the rule\.|
|Novel discussions on modern leadership tactics\.|Company names: \\nPeople names: \\nSpecific topics: modern leadership tactics\\nGeneral themes:|Another scenario with missing data ensures label persistence despite no people names present\.|
|New advancements aren't tied to particular companies or persons\.|Company names: \\nPeople names: \\nSpecific topics: advancements\\nGeneral themes:|Validates that labels exist even when no entities for some categories are found\.|
|A glimpse into innovative environmental practices\.|Company names: \\nPeople names: \\nSpecific topics: innovative environmental practices\\nGeneral themes:|Maintains label presence with empty sections, focusing on specific topics and format\.|
|Amazon and the World Health Organization initiate joint efforts\.|Company names: Amazon\\nPeople names: \\nSpecific topics: \\nGeneral themes:|Tests recognition of legally recognized company names in the input\.|
|A consortium led by Microsoft to redefine education\.|Company names: Microsoft\\nPeople names: \\nSpecific topics: \\nGeneral themes:|Checks correct identification of company names as legally recognized entities\.|
|Enterprises like Sony and Intel are vital to technological growth\.|Company names: Sony, Intel\\nPeople names: \\nSpecific topics: \\nGeneral themes:|Validates extraction of multiple legally recognized company names\.|
|Nelson Mandela and Mahatma Gandhi inspired millions\.|Company names: \\nPeople names: Nelson Mandela, Mahatma Gandhi\\nSpecific topics: \\nGeneral themes:|Tests identification of well\-recognized individual names in text\.|
|John Doe and Jane Smith participated in the conference\.|Company names: \\nPeople names: John Doe, Jane Smith\\nSpecific topics: \\nGeneral themes:|Validates recognition of generic people names for correct extraction\.|
|Profiles of Margaret Thatcher and Winston Churchill were published\.|Company names: \\nPeople names: Margaret Thatcher, Winston Churchill\\nSpecific topics: \\nGeneral themes:|Ensures historical figures are aptly identified and listed\.|
|Key topics include cybersecurity and data privacy\.|Company names: \\nPeople names: \\nSpecific topics: cybersecurity, data privacy\\nGeneral themes:|Tests accurate extraction of specific topics relevant to the text\.|
|Discussing the impact of climate change and renewable energy\.|Company names: \\nPeople names: \\nSpecific topics: climate change, renewable energy\\nGeneral themes:|Verifies identification and extraction of specific environmental topics\.|
|Focus areas: machine learning and artificial intelligence\.|Company names: \\nPeople names: \\nSpecific topics: machine learning, artificial intelligence\\nGeneral themes:|Checks software's ability to identify and format specific topics correctly\.|
|Themes of globalization and technological advances\.|Company names: \\nPeople names: \\nSpecific topics: \\nGeneral themes: globalization, technological advances|Tests extraction of overarching themes and correct output formatting\.|
|Narratives of human rights and social justice are prevalent\.|Company names: \\nPeople names: \\nSpecific topics: \\nGeneral themes: human rights, social justice|Validates broad thematic extraction and formatted presentation\.|
|Overall themes include innovation and resilience\.|Company names: \\nPeople names: \\nSpecific topics: \\nGeneral themes: innovation, resilience|Confirms robust extraction of overarching themes from within the passage\.|
|Just a mention of Google\.|Company names: Google\\nPeople names: \\nSpecific topics: \\nGeneral themes:|Checks handling of a single company name input\.|
|Leading corporations: IBM, NASA and Samsung\.|Company names: IBM, NASA, Samsung\\nPeople names: \\nSpecific topics: \\nGeneral themes:|Tests extraction of multiple companies in a concise manner\.|
|Incorporated entities include: Coca\-Cola\.|Company names: Coca\-Cola\\nPeople names: \\nSpecific topics: \\nGeneral themes:|Ensures text mentioning a single company is processed correctly under extraction rule\.|
|Famous figures: Isaac Newton\.|Company names: \\nPeople names: Isaac Newton\\nSpecific topics: \\nGeneral themes:|Verifies process for a single name extraction adhering to format specifications\.|
|Influencers to note: Bill Gates and Marie Curie\.|Company names: \\nPeople names: Bill Gates, Marie Curie\\nSpecific topics: \\nGeneral themes:|Tests multiple people name extraction against formatting rules\.|
|Discussing matters revolving around Charles Darwin\.|Company names: \\nPeople names: Charles Darwin\\nSpecific topics: \\nGeneral themes:|Checks how single person name inputs fit the extraction criteria\.|
|Topics handled: genetic engineering and ethical implications\.|Company names: \\nPeople names: \\nSpecific topics: genetic engineering, ethical implications\\nGeneral themes:|Analyzes system response to text emphasizing dual specific topics\.|
|Exploring cybersecurity and public policy\.|Company names: \\nPeople names: \\nSpecific topics: cybersecurity, public policy\\nGeneral themes:|Checks distinct specific topics for correct recognizable extraction\.|
|Conversations about space travel innovations\.|Company names: \\nPeople names: \\nSpecific topics: space travel innovations\\nGeneral themes:|Validates handling of distinctive, singular specific topic input\.|
|General ideas include globalization and urbanization trends\.|Company names: \\nPeople names: \\nSpecific topics: \\nGeneral themes: globalization, urbanization trends|Verifies extraction and labeled presentation for broad themes\.|
|Reflecting on resilience and adaptation in business\.|Company names: \\nPeople names: \\nSpecific topics: \\nGeneral themes: resilience, adaptation|Checks that general thematic extraction is faithful to underlying content\.|
|Discussing concepts of freedom and equality\.|Company names: \\nPeople names: \\nSpecific topics: \\nGeneral themes: freedom, equality|Validates generalized theme extraction ensuring adherence to declared format\.|
|No specific rules govern this text\.||Tests scenario where no labels are present at all confirming rule compliance\.|
|Random discourse not fitting structured output\.||Explores how text without structure results in non\-labeled extraction, proving rule adherence\.|
|No structured companies, names, topics, or themes\.||Validates extraction with rule compliance where label presence isn't mandated, confirming effects on output\.|
|Steve Jobs was renowned yet not labeled here\.|Company names: \\nSpecific topics: \\nGeneral themes:|Ensures named individuals aren't listed, limiting potential where label should not accompany\.|
|Famous individuals Selena Gomez and Elon Musk partook\.|Company names: \\nSpecific topics: \\nGeneral themes:|Tests provisions limiting appearance of recognized names violating the output norm\.|
|Names Nil, even when famous individuals grace content\.|Company names: \\nSpecific topics: \\nGeneral themes:|Confirms process duly bypasses individuals' names, meeting obscure output rule\.|
|Innovations notably absent delineated specifics within text\.|Company names: \\nPeople names: \\nGeneral themes:|Tests silent treatment towards distinct topics validating realization against rule wanting\.|
|Faded topics in shadowy undertones escape listing\.|Company names: \\nPeople names: \\nGeneral themes:|Definitively suppresses direct visibility around topics ensuring invisible adherence\.|
|Content speaks of topics loquaciously, yet no topic list forms\.|Company names: \\nPeople names: \\nGeneral themes:|Asserts exclusion of verbally rich topics reaffirming regulation conformity\.|
|Text mentioning zero items seamlessly blends\.||Tests scenario devoid of items confirming rules' omission without loaded labels\.|
|No detected elements resulting in emptiness stands validated\.||Uses unsupported entities encouraging label\-less prompt validating extraction extremes\.|
|Void of recognized elements: contexts ally omission\.||Confirms reinforcement around entity\-devoid text configuring output compliance without labels\.|
|Frozen smiles at McDonald's\.|Company names: \\nPeople names: \\nSpecific topics: frozen smiles\\nGeneral themes:|Evaluates correct discontinuance of improper company mention unidentified informationally\.|
|Talks comfort around Hilton's embrace\.|Company names: \\nPeople names: \\nSpecific topics: embrace\\nGeneral themes:|Tests avoidance of reliant association disallowing defective corporation perception\.|
|Intermittent cheers echo Staples' mane\.|Company names: \\nPeople names: \\nSpecific topics: mane\\nGeneral themes:|Asserts discontinuity of inapplicable misidentified business validation detoxifying norm\.|
|Legend's echo of virtue wraps life's balance\.|Company names: \\nSpecific topics: \\nGeneral themes:|Validates allusive ripples bypassing potential misidentification around people names\.|
|Social portraits feature anonymous grins\.|Company names: \\nSpecific topics: \\nGeneral themes:|Tests disconnection against misleading identity presumptions confirming compliance\.|
|Whistles of truce paint shadow dance gestures\.|Company names: \\nSpecific topics: \\nGeneral themes:|Adheres to disallowance of imprecise illusions refraining from pale identifications\.|
|Ideas yielding tokens born pure\.|Company names: \\nPeople names: \\nGeneral themes:|Confirms abeyance of extinguished specificity validating its inapplicability in formats\.|
|Conceptual elaborations unwritten beyond mystical illusions\.|Company names: \\nPeople names: \\nGeneral themes:|Tests ability to disconnect resigned specifics striving formal extraction confirmation\.|
|Random engages thermal visions fading fruitless\.|Company names: \\nPeople names: \\nGeneral themes:|Validates system's handling suppressible settings by ignoring misrepresented topics\.|
|Existential inquiries humble recurring chords\.|Company names: \\nPeople names: \\nSpecific topics:|Checks improper thematic placement ensuring only absence supporting extracted norms\.|
|Chimeric potential showcases beneath meter rhythms\.|Company names: \\nPeople names: \\nSpecific topics:|Confirms non\-substitution of abstract substance in theme extraction failing loosely\.|
|Unformed languish strips covering faded wisdom\.|Company names: \\nPeople names: \\nSpecific topics:|Resolves aspirational fusions ensuring structural reinforcement explored through exact extractions\.|

### [test_evals.csv](./test_evals.csv)

|rule|model|input|coverage|validity|
|-|-|-|-|-|
|The output must start with the label "Company names:" followed by a list of company names extracted from the input text in a comma\-separated format\.|gpt\-4o\-2024\-08\-06|Apple and Google are leading companies in technology\.|Company names: Apple, Google  <br>People names:   <br>Specific topics: technology  <br>General themes: business, innovation, technology|ok|
|The output must start with the label "Company names:" followed by a list of company names extracted from the input text in a comma\-separated format\.|gpt\-4o\-2024\-08\-06|Tesla partnered with SpaceX for new tech innovations\.|Company names: Tesla, SpaceX  <br>People names:   <br>Specific topics: tech innovations  <br>General themes: partnerships, technology|ok|
|The output must start with the label "Company names:" followed by a list of company names extracted from the input text in a comma\-separated format\.|gpt\-4o\-2024\-08\-06|We discussed Amazon's latest policies\.|Company names: Amazon  <br>People names:   <br>Specific topics: latest policies  <br>General themes: business policies, corporate strategies|ok|
|The next line must begin with the label "People names:" followed by a list of people names extracted from the input text in a comma\-separated format\.|gpt\-4o\-2024\-08\-06|The collaboration between Elon Musk and Jeff Bezos was unexpected\.|Company names:  <br>People names: Elon Musk, Jeff Bezos  <br>Specific topics: Collaboration  <br>General themes: Unexpected partnerships, Technology innovation|ok|
|The next line must begin with the label "People names:" followed by a list of people names extracted from the input text in a comma\-separated format\.|gpt\-4o\-2024\-08\-06|Marie Curie and Albert Einstein revolutionized science\.|Company names: <br>People names: Marie Curie, Albert Einstein<br>Specific topics: science, revolutionized science<br>General themes: scientific breakthroughs, historical figures in science|ok|
|The next line must begin with the label "People names:" followed by a list of people names extracted from the input text in a comma\-separated format\.|gpt\-4o\-2024\-08\-06|Discussing innovations by Steve Jobs and Tim Cook\.|Company names:  <br>People names: Steve Jobs, Tim Cook  <br>Specific topics: innovations  <br>General themes: technology, leadership, innovation|ok|
|The third line must start with the label "Specific topics:" followed by a list of specific topics relevant to the input text content in a comma\-separated format\.|gpt\-4o\-2024\-08\-06|The future of artificial intelligence and quantum computing is bright\.|Company names:  <br>People names:  <br>Specific topics: artificial intelligence, quantum computing  <br>General themes: future technology, innovation|ok|
|The third line must start with the label "Specific topics:" followed by a list of specific topics relevant to the input text content in a comma\-separated format\.|gpt\-4o\-2024\-08\-06|Cryptocurrency and blockchain are the future\.|Company names:  <br>People names:  <br>Specific topics: Cryptocurrency, blockchain  <br>General themes: Technology, future|ok|
|The third line must start with the label "Specific topics:" followed by a list of specific topics relevant to the input text content in a comma\-separated format\.|gpt\-4o\-2024\-08\-06|Global warming poses significant challenges\.|Company names: <br>People names: <br>Specific topics: Global warming<br>General themes: Environmental challenges, Climate change|ok|
|The final line must start with the label "General themes:" followed by a list of general overarching themes relevant to the input text content in a comma\-separated format\.|gpt\-4o\-2024\-08\-06|Discussing the advancements made in technology and sustainability\.|Company names:  <br>People names:  <br>Specific topics: technology, sustainability  <br>General themes: advancements, technology, sustainability|ok|
|The final line must start with the label "General themes:" followed by a list of general overarching themes relevant to the input text content in a comma\-separated format\.|gpt\-4o\-2024\-08\-06|The narrative around health and wellness is evolving\.|Company names:  <br>People names:  <br>Specific topics: health, wellness  <br>General themes: evolution, narrative change in health and wellness|ok|
|The final line must start with the label "General themes:" followed by a list of general overarching themes relevant to the input text content in a comma\-separated format\.|gpt\-4o\-2024\-08\-06|Exploration of space and the oceans continues\.|Company names:  <br>People names:  <br>Specific topics: space exploration, ocean exploration  <br>General themes: exploration, science, discovery|ok|
|If there are no entities to list for any category, it should still display the label followed by a blank space, indicating the absence of entities, but still maintain the format\.|gpt\-4o\-2024\-08\-06|The research was conducted in several domains without specific names mentioned\.|Company names:  <br>People names:  <br>Specific topics: Research, Domains  <br>General themes: Scientific study, Exploration|ok|
|If there are no entities to list for any category, it should still display the label followed by a blank space, indicating the absence of entities, but still maintain the format\.|gpt\-4o\-2024\-08\-06|This document does not mention any specific company or individual\.|Company names: <br>People names: <br>Specific topics: <br>General themes: Lack of specific companies, Unnamed individuals, Absence of specific topics|ok|
|If there are no entities to list for any category, it should still display the label followed by a blank space, indicating the absence of entities, but still maintain the format\.|gpt\-4o\-2024\-08\-06|Nothing to highlight in terms of significant topics or themes\.|Company names:  <br>People names:  <br>Specific topics:  <br>General themes:|err|
|Each label, followed by a colon, must be present in the output even if no corresponding data is extracted\.|gpt\-4o\-2024\-08\-06|Novel discussions on modern leadership tactics\.|Company names: <br>People names: <br>Specific topics: modern leadership tactics<br>General themes: leadership, modern strategies, discussions|ok|
|Each label, followed by a colon, must be present in the output even if no corresponding data is extracted\.|gpt\-4o\-2024\-08\-06|New advancements aren't tied to particular companies or persons\.|Company names:  <br>People names:  <br>Specific topics: advancements  <br>General themes: innovation, technology development|ok|
|Each label, followed by a colon, must be present in the output even if no corresponding data is extracted\.|gpt\-4o\-2024\-08\-06|A glimpse into innovative environmental practices\.|Company names: <br>People names: <br>Specific topics: environmental practices<br>General themes: innovation, environment|err|
|Terms for company names refer to legally recognized organizations or businesses\.|gpt\-4o\-2024\-08\-06|Amazon and the World Health Organization initiate joint efforts\.|Company names: Amazon, World Health Organization<br>People names:  <br>Specific topics: joint efforts  <br>General themes: collaboration, health, business partnerships|ok|
|Terms for company names refer to legally recognized organizations or businesses\.|gpt\-4o\-2024\-08\-06|A consortium led by Microsoft to redefine education\.|Company names: Microsoft  <br>People names:   <br>Specific topics: education  <br>General themes: innovation, education reform, technology in education|ok|
|Terms for company names refer to legally recognized organizations or businesses\.|gpt\-4o\-2024\-08\-06|Enterprises like Sony and Intel are vital to technological growth\.|Company names: Sony, Intel<br>People names: <br>Specific topics: technological growth<br>General themes: technology, business development|ok|
|Terms for people names refer to individual human beings identified by names or titles\.|gpt\-4o\-2024\-08\-06|Nelson Mandela and Mahatma Gandhi inspired millions\.|Company names: <br>People names: Nelson Mandela, Mahatma Gandhi<br>Specific topics: inspiration, leadership<br>General themes: influence, social change|ok|
|Terms for people names refer to individual human beings identified by names or titles\.|gpt\-4o\-2024\-08\-06|John Doe and Jane Smith participated in the conference\.|Company names:  <br>People names: John Doe, Jane Smith  <br>Specific topics: conference  <br>General themes: participation, event|ok|
|Terms for people names refer to individual human beings identified by names or titles\.|gpt\-4o\-2024\-08\-06|Profiles of Margaret Thatcher and Winston Churchill were published\.|Company names:  <br>People names: Margaret Thatcher, Winston Churchill  <br>Specific topics: profiles, publication  <br>General themes: historical figures, politics, leadership|ok|
|Terms for specific topics refer to precise subjects or areas of interest related to the content of the input text\.|gpt\-4o\-2024\-08\-06|Key topics include cybersecurity and data privacy\.|Company names: <br>People names: <br>Specific topics: cybersecurity, data privacy<br>General themes: technology, security, privacy|ok|
|Terms for specific topics refer to precise subjects or areas of interest related to the content of the input text\.|gpt\-4o\-2024\-08\-06|Discussing the impact of climate change and renewable energy\.|Company names: <br>People names: <br>Specific topics: climate change, renewable energy<br>General themes: environmental impact, sustainability|ok|
|Terms for specific topics refer to precise subjects or areas of interest related to the content of the input text\.|gpt\-4o\-2024\-08\-06|Focus areas: machine learning and artificial intelligence\.|Company names: <br>People names: <br>Specific topics: machine learning, artificial intelligence<br>General themes: technology, innovation|ok|
|Terms for general themes refer to broad and overarching subjects or ideas conveyed by the input text content\.|gpt\-4o\-2024\-08\-06|Themes of globalization and technological advances\.|Company names: <br>People names: <br>Specific topics: Globalization, Technological advances<br>General themes: Globalization, Technology|ok|
|Terms for general themes refer to broad and overarching subjects or ideas conveyed by the input text content\.|gpt\-4o\-2024\-08\-06|Narratives of human rights and social justice are prevalent\.|Company names:  <br>People names:  <br>Specific topics: Human rights, Social justice  <br>General themes: Narratives, Social issues|ok|
|Terms for general themes refer to broad and overarching subjects or ideas conveyed by the input text content\.|gpt\-4o\-2024\-08\-06|Overall themes include innovation and resilience\.|Company names:  <br>People names:  <br>Specific topics:  <br>General themes: innovation, resilience|ok|
|Company names:|gpt\-4o\-2024\-08\-06|Just a mention of Google\.|Company names: Google  <br>People names:   <br>Specific topics:   <br>General themes: Mention|ok|
|Company names:|gpt\-4o\-2024\-08\-06|Leading corporations: IBM, NASA and Samsung\.|Company names: IBM, NASA, Samsung<br>People names: <br>Specific topics: Leading corporations<br>General themes: Business, Technology|ok|
|Company names:|gpt\-4o\-2024\-08\-06|Incorporated entities include: Coca\-Cola\.|Company names: Coca\-Cola  <br>People names:   <br>Specific topics: Incorporated entities  <br>General themes: Business|ok|
|People names:|gpt\-4o\-2024\-08\-06|Famous figures: Isaac Newton\.|Company names: <br>People names: Isaac Newton<br>Specific topics: <br>General themes:|ok|
|People names:|gpt\-4o\-2024\-08\-06|Influencers to note: Bill Gates and Marie Curie\.|Company names:  <br>People names: Bill Gates, Marie Curie  <br>Specific topics: Influencers  <br>General themes: Notable figures, Influence|ok|
|People names:|gpt\-4o\-2024\-08\-06|Discussing matters revolving around Charles Darwin\.|Company names:  <br>People names: Charles Darwin  <br>Specific topics: Charles Darwin, evolution  <br>General themes: evolutionary theory, scientific history|ok|
|Specific topics:|gpt\-4o\-2024\-08\-06|Topics handled: genetic engineering and ethical implications\.|Company names:  <br>People names:  <br>Specific topics: genetic engineering, ethical implications  <br>General themes: science, ethics, technology|ok|
|Specific topics:|gpt\-4o\-2024\-08\-06|Exploring cybersecurity and public policy\.|Company names:  <br>People names:  <br>Specific topics: cybersecurity, public policy  <br>General themes: technology, governance|ok|
|Specific topics:|gpt\-4o\-2024\-08\-06|Conversations about space travel innovations\.|Company names:  <br>People names:  <br>Specific topics: space travel, innovations  <br>General themes: technology, exploration, advancements|ok|
|General themes:|gpt\-4o\-2024\-08\-06|General ideas include globalization and urbanization trends\.|Company names:  <br>People names:  <br>Specific topics:  <br>General themes: globalization, urbanization trends|ok|
|General themes:|gpt\-4o\-2024\-08\-06|Reflecting on resilience and adaptation in business\.|Company names: <br>People names: <br>Specific topics: Resilience, Adaptation<br>General themes: Business, Change, Sustainability|ok|
|General themes:|gpt\-4o\-2024\-08\-06|Discussing concepts of freedom and equality\.|Company names: <br>People names: <br>Specific topics: Concepts of freedom, equality<br>General themes: Freedom, equality, philosophical concepts|err|
|The output doesn't need to start with any labels\.|gpt\-4o\-2024\-08\-06|No specific rules govern this text\.|Company names:  <br>People names:  <br>Specific topics:  <br>General themes:|ok|
|The output doesn't need to start with any labels\.|gpt\-4o\-2024\-08\-06|Random discourse not fitting structured output\.|Company names:  <br>People names:  <br>Specific topics:  <br>General themes:|ok|
|The output doesn't need to start with any labels\.|gpt\-4o\-2024\-08\-06|No structured companies, names, topics, or themes\.|Company names: <br>People names: <br>Specific topics: <br>General themes:|ok|
|The next line must not include a list of people names\.|gpt\-4o\-2024\-08\-06|Steve Jobs was renowned yet not labeled here\.|Company names:  <br>People names: Steve Jobs  <br>Specific topics: technology, innovation  <br>General themes: leadership, entrepreneurship|ok|
|The next line must not include a list of people names\.|gpt\-4o\-2024\-08\-06|Famous individuals Selena Gomez and Elon Musk partook\.|Company names: <br>People names: Selena Gomez, Elon Musk<br>Specific topics: Participation of famous individuals<br>General themes: Celebrities, Public appearances|ok|
|The next line must not include a list of people names\.|gpt\-4o\-2024\-08\-06|Names Nil, even when famous individuals grace content\.|Company names: <br>People names: Nil<br>Specific topics: famous individuals<br>General themes: names, content|ok|
|The third line should not contain specific topics relevant to the input text\.|gpt\-4o\-2024\-08\-06|Innovations notably absent delineated specifics within text\.|Company names: <br>People names: <br>Specific topics: innovation<br>General themes: absence, delineation, text analysis|ok|
|The third line should not contain specific topics relevant to the input text\.|gpt\-4o\-2024\-08\-06|Faded topics in shadowy undertones escape listing\.|Company names: <br>People names: <br>Specific topics: shadowy undertones<br>General themes: fading, listing or documentation|ok|
|The third line should not contain specific topics relevant to the input text\.|gpt\-4o\-2024\-08\-06|Content speaks of topics loquaciously, yet no topic list forms\.|Company names: <br>People names: <br>Specific topics: <br>General themes: Communication, Elusiveness|ok|
|If there are no entities, the label should be omitted entirely\.|gpt\-4o\-2024\-08\-06|Text mentioning zero items seamlessly blends\.|Company names:  <br>People names:  <br>Specific topics:  <br>General themes:|ok|
|If there are no entities, the label should be omitted entirely\.|gpt\-4o\-2024\-08\-06|No detected elements resulting in emptiness stands validated\.|Company names: <br>People names: <br>Specific topics: <br>General themes:|err|
|If there are no entities, the label should be omitted entirely\.|gpt\-4o\-2024\-08\-06|Void of recognized elements: contexts ally omission\.|Company names: <br>People names: <br>Specific topics: contexts, ally, omission<br>General themes: recognition, omission, context|err|
|Terms for company names do not refer to legally recognized organizations\.|gpt\-4o\-2024\-08\-06|Frozen smiles at McDonald's\.|Company names: McDonald's<br>People names:  <br>Specific topics: Frozen smiles<br>General themes: Food service, Fast food industry, Customer experience|ok|
|Terms for company names do not refer to legally recognized organizations\.|gpt\-4o\-2024\-08\-06|Talks comfort around Hilton's embrace\.|Company names: Hilton  <br>People names:   <br>Specific topics: embrace  <br>General themes: comfort|ok|
|Terms for company names do not refer to legally recognized organizations\.|gpt\-4o\-2024\-08\-06|Intermittent cheers echo Staples' mane\.|Company names: Staples<br>People names: <br>Specific topics: cheers<br>General themes: events, social interactions|ok|
|Terms for people names do not refer to individual human beings\.|gpt\-4o\-2024\-08\-06|Legend's echo of virtue wraps life's balance\.|Company names: <br>People names: <br>Specific topics: life's balance<br>General themes: virtue, balance of life|ok|
|Terms for people names do not refer to individual human beings\.|gpt\-4o\-2024\-08\-06|Social portraits feature anonymous grins\.|Company names: <br>People names: <br>Specific topics: Anonymous grins<br>General themes: Social portraits|err|
|Terms for people names do not refer to individual human beings\.|gpt\-4o\-2024\-08\-06|Whistles of truce paint shadow dance gestures\.|Company names: <br>People names: <br>Specific topics: shadow dance, truce<br>General themes: gestures, peace, art|ok|
|Terms for specific topics do not refer to precise subjects\.|gpt\-4o\-2024\-08\-06|Ideas yielding tokens born pure\.|Company names: <br>People names: <br>Specific topics: Tokens, Ideas<br>General themes: Purity, Innovation|ok|
|Terms for specific topics do not refer to precise subjects\.|gpt\-4o\-2024\-08\-06|Conceptual elaborations unwritten beyond mystical illusions\.|Company names: <br>People names: <br>Specific topics: mystical illusions<br>General themes: conceptual elaborations, mysticism|err|
|Terms for specific topics do not refer to precise subjects\.|gpt\-4o\-2024\-08\-06|Random engages thermal visions fading fruitless\.|Company names: <br>People names: <br>Specific topics: Thermal visions<br>General themes: Futility|err|
|Terms for general themes do not refer to broad and overarching subjects\.|gpt\-4o\-2024\-08\-06|Existential inquiries humble recurring chords\.|Company names:  <br>People names:  <br>Specific topics: existential inquiries, recurring chords  <br>General themes: philosophy, music, humility|ok|
|Terms for general themes do not refer to broad and overarching subjects\.|gpt\-4o\-2024\-08\-06|Chimeric potential showcases beneath meter rhythms\.|Company names: <br>People names: <br>Specific topics: Chimeric potential, meter rhythms<br>General themes: Art, music, creativity|ok|
|Terms for general themes do not refer to broad and overarching subjects\.|gpt\-4o\-2024\-08\-06|Unformed languish strips covering faded wisdom\.|Company names: <br>People names: <br>Specific topics: <br>General themes:|err|

### [baseline_tests.txt](./baseline_tests.txt)

`````txt
Text: OpenAI, founded by Elon Musk and Sam Altman, aims to ensure that artificial general intelligence (AGI) benefits all of humanity. Their research includes exploring language models, machine learning, and robotics. Companies like Microsoft and Google are also developing AI technologies. The overarching theme is technological advancement.
===
Text: On Monday, during a conference by Apple, Tim Cook introduced the latest iPhone models. The topics discussed included innovations in smartphone technology and data privacy. Attendees included representatives from Samsung and Intel, among others. The general theme revolves around consumer electronics.
===
Text: NASA announced its latest mission plans involving the Mars Rover, with key speeches by scientists John Doe and Jane Smith. Collaborators include SpaceX and Boeing. The specific topics are space exploration and technological innovation. The general theme is outer space research.
===
Text: The seminar on global health had experts like Dr. Maria Gonzales and Richard Brown discussing subjects like pandemic preparedness and vaccine innovation. Organizations such as WHO and UNICEF were mentioned. The overarching theme is public health worldwide.
===
Text: The financial summit featured top executives from Goldman Sachs, JP Morgan, and Wells Fargo. Discussions by Mary Johnson and Alex Li centered around topics such as economic forecasts and market regulations. The overall theme is global finance.
===
Text: At the environmental conference, Greenpeace and World Wildlife Fund present their strategies. With commentary from experts like Emily Clark and David Attenborough, the main topics are climate change and sustainability. The broad theme is environmental conservation.
===
Text: The lecture on digital transformation, attended by Facebook and Twitter representatives, was led by Mark Zuckerberg and Jack Dorsey. Key topics include social media trends and data analytics. The general theme is technology in society.
===
Text: During an art exhibition sponsored by The Louvre and The Smithsonian, renowned artists Leonardo da Vinci and Vincent van Gogh were highlighted. The topics included art history and influence. The broad theme is cultural heritage.
===
Text: The medical conference had contributions from Dr. Anthony Fauci and healthcare organizations like CDC and NIH. The focus topics are immunology and public health strategies. General theme: medical research.
===
Text: At the education reform summit hosted by Harvard and MIT, speakers like Marissa Meyer addressed innovations in e-learning and technology integration. The overarching theme is the future of education.
===
Text: Recently at a film festival organized by Sundance Film Festival and Cannes Film Festival, directors such as Christopher Nolan and Sofia Coppola discussed narrative techniques and cinematography. The broad theme is film industry innovation.
===
Text: The tech expo had Tesla and IBM unveiling new technologies. Key speakers included Elon Musk and Ginni Rometty. Topics covered were electric vehicles and quantum computing. Overall theme: technology revolution.
===
Text: The international music awards saw performances by Beyoncé and Taylor Swift. Record labels such as Sony Music and Universal were praised. Key topics were music development and artist recognition. General theme: music industry.
===
Text: The sports convention featured clubs like FC Barcelona and New York Yankees. Renowned athletes Cristiano Ronaldo and Serena Williams spoke about sports ethics and training regimens. Main theme: sportsmanship.
===
Text: At an economic forum with IMF and World Bank officials present, experts like Jenny Lee covered topics like global trade policies and economic stability. General theme: international economics.
===
Text: The literature fest organized by Penguin Random House and Simon & Schuster featured authors like Margaret Atwood and George Martin. Themes of discussion included storytelling and book publishing. Overall theme: literary arts.
===
Text: The cybersecurity workshop presented by Kaspersky and McAfee had leading experts John Wright and Sarah Connor on hacking trends and cyber defense strategies. The broad theme is digital security.
===
Text: An automotive fair featuring brands like Ford and BMW had analysts like Henry Ford III and Karl Benz discussing car design and future trends. Overarching theme: automotive innovation.
===
Text: At a culinary event hosted by Michelin and Bon Appétit, chefs like Gordon Ramsay and Julia Child presented culinary arts and food trends. General theme: gastronomy.
===
Text: The annual fashion show, supported by Gucci and Prada, showcased designs talked about by Giorgio Armani and Tom Ford. Focus topics were fashion trends and cultural influence. General theme is the fashion industry.
===
Text: During a gaming convention, Sony and Nintendo unveiled new gaming consoles with presentations by game developers Shigeru Miyamoto and Hideo Kojima. Discussion topics included game design and virtual reality. General theme: gaming culture.
===
Text: At the political summit held by United Nations and European Union, diplomats like Angela Merkel and Justin Trudeau discussed international relations and diplomatic strategies. General theme: global diplomacy.
===
Text: An academic conference at Stanford and Berkeley with Dr. Jane Doe emphasized research on artificial intelligence and computational theory. General theme: higher education and research.
===
Text: At the biotechnology conference, Biogen and Amgen alongside Dr. Alex Chen discussed genetic engineering and biopharmaceuticals. General theme: biotech innovations.
===
Text: The startup panel by Y Combinator and Techstars included speakers like Jessica Livingston on entrepreneurship and venture capital. General theme: startup ecosystem.
===
Text: An architecture summit by RIBA and AIA with Zaha Hadid and Frank Lloyd Wright highlighted urban design and sustainable architecture. General theme: architectural evolution.
===
Text: At the renewable energy conference, Tesla Energy and First Solar with Elon Musk presented on solar technology and energy transitions. General theme: renewable energy solutions.
===
Text: A diversity in tech event sponsored by Accenture and Deloitte, with keynote Vinod Khosla discussed tech inclusion and career growth. General theme: diversity and inclusivity in tech.
===
Text: At a robotics competition hosted by Boston Dynamics and Honda, engineers like Seiko Yoshimoto covered robotic mechanics and artificial intelligence. General theme: robotics development.
===
Text: The entrepreneurship conference by the Kauffman Foundation had keynote addresses from Steve Jobs and Indra Nooyi about startup culture and leadership. General theme: business innovation.
===
Text: A climate action symposium by The Nature Conservancy and WWF, with David Suzuki speaking on conservation efforts and climate interventions. General theme: climate action.
===
Text: At the global urban forum held by UN-Habitat and World Economic Forum, city planners like Jane Jacobs discussed urban policy and sustainability. General theme: urban development.
===
Text: The blockchain seminar with inputs from Ethereum and Coinbase included Andreas Antonopoulos on cryptocurrency trends and blockchain technology. General theme: blockchain revolution.
===
Text: At the agricultural summit held by Monsanto and John Deere, agriculturalists like Norman Borlaug discussed crop innovation and sustainable practices. General theme: agriculture technology.
===
Text: The virtual reality conference by Oculus and HTC had Palmer Luckey on VR tech and future applications. General theme: virtual reality advancements.
===
Text: A transportation forum by Uber and Lyft with Dara Khosrowshahi and Logan Green debated on urban mobility and transportation networks. General theme: innovation in urban transport.
===
Text: The fashion business panel by Vogue and Milan Fashion Week had Karl Lagerfeld discussing trends and fashion economics. General theme: fashion business.
===
Text: At the public sector innovation summit, IBM and Cisco, with Ginni Rometty, addressed government technology and public sector improvements. General theme: public sector technology.
===
Text: A tech innovation summit at Google with Sundar Pichai sharing insights on AI development and cloud computing. General theme: technology progress.
===
Text: A university panel discussion with Yale and Oxford had academics like Stephen Hawking on the next generation of research innovations. General theme: academic advancements.
===
Text: The digital payments symposium with Visa and Mastercard discussed by Jennifer Bailey centered on fintech trends and transaction security. General theme: digital finance.
===
Text: At the heritage conservation conference sponsored by UNESCO and ICOMOS, topics included discussed by Antoni Gaudí were historical preservation and cultural heritage. General theme: heritage conservation.
===
Text: A wildlife festival by National Geographic and Discovery Channel, with Steve Irwin, focused on wildlife documentaries and habitat conservation. General theme: wildlife protection.
===
Text: At a culinary leadership forum with Nestlé and Starbucks, discussions led by Howard Schultz on food industry norms and coffee trends. General theme: industrial gastronomy.
===
Text: An artists' gathering sponsored by Art Basel and Frieze Magazine had renowned artists Banksy and Yayoi Kusama talking about art installation and design concepts. General theme: modern art.
===
Text: A motorsport symposium by Formula 1 and NASCAR brought together experts like Lewis Hamilton on motor racing and engineering trends. General theme: motorsport evolution.
===
Text: The spacecraft technology seminar by Boeing and Lockheed Martin with Chris Hadfield on aerospace advancements and innovation. General theme: aerospace technology.
===
Text: At the journalism forum organized by The Times and Reuters, reporters like Bob Woodward discussed media ethics and reporting standards. General theme: media and journalism.
===
Text: The organic farming convention supported by USDA and Rodale Institute had Alice Waters discussing farm-to-table practices and organic agriculture. General theme: sustainable farming.
===
Text: A concert series by Live Nation and BigHit Entertainment with musicians like Jungkook and Adele focused on concert production and music entertainment industry. General theme: live music events.
===
Text: The child education summit by Montessori Foundation and Sesame Workshop, led by Maria Montessori, focused on child development and educational approaches. General theme: child education.
===
Text: During a startup creativity panel by WeWork and General Assembly, Adam Neumann spoke about coworking culture and creative entrepreneurship. General theme: modern workspaces.
===
Text: A traditional arts gathering presented by Lincoln Center and Sydney Opera House, focused on operatic traditions with artists like Luciano Pavarotti. General theme: classical performing arts.
===
Text: The ethical hacking conference by DEF CON and Black Hat covered by Kevin Mitnick on cybersecurity strategies and ethical dilemmas. General theme: cybersecurity ethics.
===
Text: At the global clean water forum by WaterAid and Charity: Water, with Scott Harrison, the focus was on new water technologies and accessibility methods. General theme: water resource management.
===
Text: During an astronomy seminar hosted by Hubble Space Telescope and ALMA Observatory, topics discussed by Neil deGrasse Tyson included cosmic exploration and stellar phenomena. General theme: astronomical discovery.
===
Text: At an ML technologies meeting at OpenAI with leaders like Greg Brockman sharing knowledge on machine learning impact and Dr. Feifei Li discussing AI advances. General theme: AI technology advancement.
===
Text: The music streaming symposium hosted by Spotify and Apple Music featured artists like Billie Eilish and Drake discussing digital streaming and music distribution. General theme: music streaming industry.
===
Text: At a botanical convention sponsored by Royal Horticultural Society and New York Botanical Garden, botanist Carl Linnaeus elaborated on plant species classification and horticultural trends. General theme: botanical sciences.
===
Text: A nutrition conference organized by WHO and FAO, highlighted by nutritionist Dr. Rina Naidu, focused on dietary recommendations and health trends. General theme: nutrition sciences.
===
Text: At the aviation safety summit sponsored by FAA and ICAO, Captain Chesley Sullenberger shared insights on flight safety standards and aviation advancements. General theme: aviation safety.
===
Text: The urban mobility forum co-hosted by BMW Group and Bird with John Zimmer discussed urban transport solutions and sustainable options. General theme: sustainable urban mobility.
===
Text: At a pharmaceutical research symposium by Pfizer and Merck, with Dr. Karl Reichelt emphasis was placed on drug development and clinical trials. General theme: pharmaceutical research.
===
Text: A marine biology seminar held by Monterey Bay Aquarium and Scripps Institution of Oceanography covered topics such as marine ecosystems and oceanic preservation by Sylvia Earle. General theme: marine conservation.
===
Text: The energy futures symposium supported by Shell and BP had discussions by Perry Williams on fossil fuels transition and energy policy. General theme: energy transformations.
===
Text: The urban architecture conference by Skidmore, Owings & Merrill and Herzog & de Meuron highlighted city infrastructure and green design principles, with discussions by Renzo Piano. General theme: sustainable urban architecture.
===
Text: At a health tech forum with Medtronic and Philips Healthcare, Dr. Alice Nguyen discussed health tech solutions and patient care advances. General theme: healthcare technology.
`````
