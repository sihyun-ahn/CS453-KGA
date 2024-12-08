## classify-input-text ([json](./evals\o1mini\classify-input-text/report.json))

- 20 rules
- 20 inverse rules
- 234 tests, 114 baseline tests

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



### [classify-input-text.prompty](./classify-input-text.prompty)

`````md

---
name: Classify input text
description: Given an input text, classify it into a specific category.
source: How to use Llama2 tutorial for text classification
url: https://pupuweb.com/how-use-llama-2-text-classification-tasks/
inputs: 
  text:
    type: string
sample:
    text: "UN chief urges action on climate change as report warns of 'catastrophe'"
---
system:
A news article can be classified as one of the following categories: World, Sports, Business, Sci/Tech.
Examples:
- World: "UN chief urges action on climate change as report warns of 'catastrophe'"
- Sports: "Ronaldo scores twice in Manchester United return"
- Business: "Apple delays plan to scan iPhones for child abuse images"
- Sci/Tech: "SpaceX launches first all-civilian crew into orbit"'

Based on these categories, classify this news article: 
user:
{{text}}
    
`````


### [intent.txt](./intent.txt)

`````txt
Categorize input text into World, Sports, Business, or Sci/Tech categories.
`````


### [input_spec.txt](./input_spec.txt)

`````txt
The input must be a string containing the text of a news article.
The input text should represent a complete news article suitable for classification into one of the specified categories.
`````


### [rules.txt](./rules.txt)

`````txt
1: The chatbot must classify any provided input text into one of four predefined categories: World, Sports, Business, or Sci/Tech.
2: The category "World" is defined as news articles related to international affairs, global events, diplomatic relations, or political developments.
3: The category "Sports" is defined as news articles that pertain to athletic events, sports teams, individual athletes, competitions, or related sports activities.
4: The category "Business" is defined as news articles concerning commerce, economic markets, corporate activities, financial developments, or business-related issues.
5: The category "Sci/Tech" is defined as news articles involving scientific discoveries, technological advancements, space exploration, or technical innovations.
6: The chatbot's output must consist solely of one of the four category names: World, Sports, Business, or Sci/Tech.
7: The output must not include any additional text, explanations, or information beyond the specified category name.
8: The input text provided to the chatbot will always be a string representing a news article.
9: The chatbot must accurately determine the most appropriate category based on the content of the input text without relying on provided examples.
10: Each classification decision must be mutually exclusive, meaning the input text should only be assigned to one single category.
11: The category definitions must be strictly adhered to, ensuring consistency and clarity in classification across different inputs.
12: The output must be correctly spelled and match exactly one of the category names: World, Sports, Business, or Sci/Tech.
13: No assumptions or external information outside the input text should influence the chatbot’s classification decision.
14: The chatbot must perform the classification based solely on the content and context of the provided input text.
15: The chatbot must ensure that every entity involved in the classification process is clearly defined within these rules.
16: The chatbot must not include any instructions, questions, or prompts in its output—only the category name as the response.
17: The classification must be based on the content's primary focus, determining which category best represents the main topic of the input text.
18: The chatbot must maintain consistency in classification regardless of variations in input text length, style, or complexity.
19: The chatbot's response should allow for easy validation by checking if the output matches one of the four specified categories based on the input text's content.
20: Each rule must comprehensively cover all aspects of the output requirements to ensure accurate and reliable classification.
`````


### [inverse_rules.txt](./inverse_rules.txt)

`````txt
21: The chatbot must not classify any provided input text into one of four predefined categories: World, Sports, Business, or Sci/Tech.
22: The category "World" should not include news articles related to international affairs, global events, diplomatic relations, or political developments.
23: The category "Sports" should not encompass news articles that pertain to athletic events, sports teams, individual athletes, competitions, or related sports activities.
24: The category "Business" should not cover news articles concerning commerce, economic markets, corporate activities, financial developments, or business-related issues.
25: The category "Sci/Tech" should not involve news articles related to scientific discoveries, technological advancements, space exploration, or technical innovations.
26: The chatbot's output may include text beyond the four category names: World, Sports, Business, or Sci/Tech.
27: The output can include additional text, explanations, or information beyond the specified category name.
28: The input text provided to the chatbot may not always be a string representing a news article.
29: The chatbot may rely on provided examples to determine the appropriate category based on the content of the input text.
30: Each classification decision does not have to be mutually exclusive, allowing the input text to be assigned to multiple categories.
31: The category definitions can be loosely interpreted, allowing for flexibility and variation in classification across different inputs.
32: The output may include misspellings and does not need to match exactly one of the category names: World, Sports, Business, or Sci/Tech.
33: Assumptions or external information outside the input text can influence the chatbot’s classification decision.
34: The chatbot may consider factors beyond the content and context of the provided input text in performing the classification.
35: The chatbot does not need to clearly define every entity involved in the classification process within these rules.
36: The chatbot may include instructions, questions, or prompts in its output alongside the category name.
37: The classification can be based on secondary aspects of the content, allowing multiple categories to represent the input text's topics.
38: The chatbot may vary in classification consistency depending on variations in input text length, style, or complexity.
39: The chatbot's response does not need to allow for easy validation by matching the output to one of the four specified categories based on the input text's content.
40: Each rule does not need to comprehensively cover all aspects of the output requirements, allowing for potential inaccuracies in classification.
`````


### [tests.csv](./tests.csv)

|testinput|expectedoutput|reasoning|
|-|-|-|
|The United Nations meets to discuss escalating trade tensions between major economies\.|World|Article pertains to international affairs, fitting the 'World' category\.|
|Manchester United wins the Premier League after a thrilling final game\.|Sports|Article pertains to sports events, fitting the 'Sports' category\.|
|New breakthrough in quantum computing promises faster processing speeds\.|Sci/Tech|Article pertains to scientific discoveries, fitting the 'Sci/Tech' category\.|
|Global leaders convene to address climate change\.|World|Article relates to global events and international affairs\.|
|Diplomatic relations between Country A and Country B reach new heights\.|World|Article pertains to diplomatic relations\.|
|Elections in Country X lead to significant political changes\.|World|Article discusses political developments\.|
|The Lakers secure a spot in the NBA finals with a last\-second victory\.|Sports|Article pertains to an athletic event and competition\.|
|Serena Williams announces her retirement from professional tennis\.|Sports|Article concerns an individual athlete\.|
|The upcoming Olympics face challenges due to global health concerns\.|Sports|Article relates to sports events and global sports activities\.|
|Apple releases its latest iPhone model with innovative features\.|Business|Article concerns corporate activities in commerce\.|
|Stock markets experience a significant downturn amid economic uncertainty\.|Business|Article relates to economic markets\.|
|A new startup secures funding to expand its operations internationally\.|Business|Article pertains to financial developments and business\-related issues\.|
|NASA announces a new mission to explore Mars\.|Sci/Tech|Article involves space exploration\.|
|Researchers develop a new biodegradable material to reduce pollution\.|Sci/Tech|Article pertains to scientific discoveries and technical innovations\.|
|Breakthrough in artificial intelligence enhances machine learning capabilities\.|Sci/Tech|Article relates to technological advancements\.|
|International Affairs|International Affairs|The chatbot correctly assigns the category name\.|
|SPORTS|SPORTS|Testing case sensitivity and formatting\.|
|Business|Business|Ensures correct category names are used without additional text\.|
|World|World|Output consists solely of the category name\.|
|Sports|Sports|Ensures no additional explanations are included\.|
|Sci/Tech|Sci/Tech|Verifies that only the category name is output\.|
|The economic summit discusses trade agreements and tariffs\.|World|Valid input as a string representing a news article\.|
|The championship game ends in a surprising upset\.|Sports|Valid input complying with input specifications\.|
|Innovations in renewable energy are accelerating the green transition\.|Sci/Tech|Valid input fitting the input specification\.|
|The European Union negotiates new trade deals amid rising tensions\.|World|Chatbot determines category based on content without examples\.|
|A major league baseball team drafts a promising young pitcher\.|Sports|Accurate determination without relying on provided examples\.|
|New financial regulations aim to stabilize the banking sector\.|Business|Chatbot classifies correctly based solely on input content\.|
|World|World|Ensures mutual exclusivity by assigning to only one category\.|
|Sports|Sports|Verifies that the input is not assigned to multiple categories\.|
|Business|Business|Confirms exclusive classification\.|
|Global summit addresses international security concerns\.|World|Strict adherence to category definitions related to global events\.|
|Local team wins national championship, sparking celebrations\.|Sports|Consistent classification based on sports\-related content\.|
|Tech giant announces merger to expand market reach\.|Business|Ensures category definitions for business are strictly followed\.|
|World|World|Ensures correct spelling of the category name\.|
|Sports|Sports|Verifies exact match of category names\.|
|Sci/Tech|Sci/Tech|Confirms correct spelling and format of category\.|
|The trade agreement benefits both countries involved\.|World|Classification based solely on input text without external information\.|
|Legendary athlete breaks long\-standing records\.|Sports|Determines category based only on provided content\.|
|Innovative startups drive economic growth in the region\.|Business|Classification based purely on input without external influences\.|
|Global economic policies are shifting in response to market demands\.|World|Classification based solely on content and context\.|
|The national team prepares for the upcoming international tournament\.|Sports|Based on content without additional context\.|
|Advancements in biotechnology offer new medical treatments\.|Sci/Tech|Classification relies only on input text content\.|
|Chatbot must classify any provided input text\.|World|Ensures entities in rules are clearly defined and applied\.|
|Chatbot must not include explanations in output\.|Sports|Defines behavior of entities involved in classification process\.|
|Category names must be exactly one of the four specified\.|Business|Entities and their definitions are clearly outlined\.|
|World|World|Ensures no instructions or prompts are included in output\.|
|Sports|Sports|Verifies output contains only the category name\.|
|Sci/Tech|Sci/Tech|Confirms exclusion of any additional text in output\.|
|The primary focus of the article is on diplomatic negotiations\.|World|Classification based on main topic adhering to category\.|
|The article primarily discusses the strategies of a football team\.|Sports|Main focus determines correct category assignment\.|
|The main topic revolves around a new financial policy\.|Business|Primary focus ensures correct categorization\.|
|World|World|Maintains classification consistency regardless of article length\.|
|Sports|Sports|Consistent classification irrespective of writing style\.|
|Business|Business|Ensures consistent output despite input complexity\.|
|World|World|Output matches one of the specified categories for easy validation\.|
|Sports|Sports|Allows for straightforward verification against defined categories\.|
|Sci/Tech|Sci/Tech|Facilitates easy checking of classification accuracy\.|
|World|World|Comprehensive coverage ensures reliable classification\.|
|Sports|Sports|Ensures all aspects of output requirements are met\.|
|Business|Business|Accurate and reliable classification adhering to all rule aspects\.|
|The economic policies will change significantly next year\.|Business|Ensures the chatbot does not classify into predefined categories if not allowed by the rule\.|
|A new art exhibition opens downtown\.|World|Validates that non\-specified categories are not used\.|
|Local community gathers for annual fair\.|Sports|Ensures input not related to predefined categories is not classified\.|
|Local festival attracts tourists from around the world\.|World|Ensures 'World' category does not include unrelated events\.|
|The president announces new healthcare reforms\.|World|Validates exclusion of non\-political content from 'World'\.|
|International sports event held in the city\.|World|Checks that sports\-related 'World' category is excluded\.|
|The championship game ends in a tie\.|Sports|Ensures 'Sports' does not include unrelated events\.|
|An athlete wins an award for community service\.|Sports|Validates exclusion of non\-sports related content from 'Sports'\.|
|Sports team conducts a charity event\.|Sports|Checks that non\-competitive activities are excluded from 'Sports'\.|
|New art museum opens downtown\.|Business|Ensures 'Business' does not include unrelated news\.|
|Local market sees a surge in organic produce sales\.|Business|Validates exclusion of non\-economic content from 'Business'\.|
|Business conference focuses on sustainable practices\.|Business|Ensures only business\-related issues are included\.|
|Community garden project helps reduce urban heat\.|Sci/Tech|Ensures 'Sci/Tech' does not include unrelated environmental news\.|
|The city council approves new parklands\.|Sci/Tech|Validates exclusion of non\-technical content from 'Sci/Tech'\.|
|Cultural festival celebrates local heritage\.|Sci/Tech|Checks that cultural events are excluded from 'Sci/Tech'\.|
|World news: The global economy is changing rapidly\.|World|Tests if output contains text beyond category name, which it should not\.|
|Sports update: The annual marathon was held yesterday\.|Sports|Ensures output may improperly include additional text\.|
|Business insights: Market trends are shifting\.|Business|Validates that output can include unwanted additional information\.|
|The latest advancements in AI technology are impressive\.|Sci/Tech|Tests inclusion of explanations beyond category name\.|
|Breaking: The stock market hits a new high\.|Business|Ensures additional information is present in the output\.|
|Sports highlight: The game was intense and exciting\.|Sports|Checks for extra text accompanying category\.|
|This is not a news article but a fictional story\.|World|Tests handling of inputs not strictly news articles\.|
|12345|Sports|Ensures chatbot processes non\-string inputs appropriately\.|
||Business|Validates behavior with empty string inputs\.|
|World news: The global summit was postponed\.|World|Checks if chatbot relies on provided examples, which it should not\.|
|Sports update: Team A defeats Team B\.|Sports|Ensures classification without example dependency\.|
|New tech gadget released today\.|Sci/Tech|Verifies accurate classification based solely on input content\.|
|The global conference covers multiple international topics\.|World|Tests if input can be assigned to multiple categories, which it should not\.|
|A player scores in both football and basketball games\.|Sports|Ensures mutual exclusivity in classification\.|
|Tech company expands into financial services\.|Business|Validates that multiple categories are not assigned\.|
|International relations and economic policies are discussed\.|World|Checks for loose interpretation of category definitions\.|
|The athlete also invests in tech startups\.|Sports|Ensures flexibility in classification without strict adherence\.|
|Business leaders attend a tech innovation summit\.|Business|Validates varied classification based on secondary aspects\.|
|Wrold|World|Tests handling of misspelled category names\.|
|Sportsss|Sports|Ensures misspellings are identified and handled\.|
|Sci\-Tech|Sci/Tech|Validates recognition despite format variations\.|
|Experts believe external market factors will influence classification\.|World|Tests if external information influences classification\.|
|Athlete's performance may be affected by sponsorships\.|Sports|Ensures classification is not influenced by external sponsorship info\.|
|Global tech trends influenced by consumer behavior\.|Sci/Tech|Validates that external factors do not affect category assignment\.|
|The chatbot uses previous conversations to determine the category\.|World|Checks if chatbot relies on factors beyond input text\.|
|User preferences influence the classification of articles\.|Sports|Ensures classification is based solely on input content\.|
|Chatbot considers browsing history when classifying news\.|Business|Validates restriction to input text only\.|
|Entities in the classification process are undefined\.|World|Tests if undefined entities are handled correctly\.|
|Chatbot does not clarify category definitions\.|Sports|Ensures entities involved are clearly defined\.|
|Lacks clear boundaries for category assignments\.|Business|Validates that classification entities are defined within rules\.|
|Please classify the following article\.|World|Ensures no instructions are included in output\.|
|What category does this article belong to?|Sports|Verifies exclusion of prompts in output\.|
|Here is the news article, classify it accordingly\.|Business|Checks that only category name is output without additional text\.|
|The article discusses both international trade and environmental policies\.|World|Tests classification based on primary focus despite multiple topics\.|
|Coverage of both athletic achievements and team management\.|Sports|Ensures classification based on primary topic\.|
|The text covers both financial markets and technological innovations\.|Business|Checks that primary focus determines category\.|
|World news: Short article\.|World|Maintains consistency with input text length variation\.|
|Sports update: Detailed and complex analysis of game strategies\.|Sports|Ensures consistency despite complexity\.|
|Business report: Comprehensive overview of market trends\.|Business|Maintains consistent classification regardless of input style\.|
|World|World|Ensures output matches one of the specified categories for easy validation\.|
|Sports|Sports|Facilitates quick verification against defined categories\.|
|Sci/Tech|Sci/Tech|Allows for straightforward checking of classification accuracy\.|
|World|World|Checks for comprehensive coverage to prevent inaccuracies\.|
|Sports|Sports|Ensures all aspects of output requirements are included to avoid misclassification\.|
|Business|Business|Validates thorough adherence to output rules for accurate classification\.|

### [test_evals.csv](./test_evals.csv)

|rule|model|input|coverage|validity|
|-|-|-|-|-|
|The chatbot must classify any provided input text into one of four predefined categories: World, Sports, Business, or Sci/Tech\.|o1\-mini\-2024\-09\-12|The United Nations meets to discuss escalating trade tensions between major economies\.|Business|err|
|The chatbot must classify any provided input text into one of four predefined categories: World, Sports, Business, or Sci/Tech\.|o1\-mini\-2024\-09\-12|Manchester United wins the Premier League after a thrilling final game\.|Sports|err|
|The chatbot must classify any provided input text into one of four predefined categories: World, Sports, Business, or Sci/Tech\.|o1\-mini\-2024\-09\-12|New breakthrough in quantum computing promises faster processing speeds\.|Sci/Tech|err|
|The category "World" is defined as news articles related to international affairs, global events, diplomatic relations, or political developments\.|o1\-mini\-2024\-09\-12|Global leaders convene to address climate change\.|World|err|
|The category "World" is defined as news articles related to international affairs, global events, diplomatic relations, or political developments\.|o1\-mini\-2024\-09\-12|Diplomatic relations between Country A and Country B reach new heights\.|World|err|
|The category "World" is defined as news articles related to international affairs, global events, diplomatic relations, or political developments\.|o1\-mini\-2024\-09\-12|Elections in Country X lead to significant political changes\.|World|err|
|The category "Sports" is defined as news articles that pertain to athletic events, sports teams, individual athletes, competitions, or related sports activities\.|o1\-mini\-2024\-09\-12|The Lakers secure a spot in the NBA finals with a last\-second victory\.|Sports|err|
|The category "Sports" is defined as news articles that pertain to athletic events, sports teams, individual athletes, competitions, or related sports activities\.|o1\-mini\-2024\-09\-12|Serena Williams announces her retirement from professional tennis\.|Sports|err|
|The category "Sports" is defined as news articles that pertain to athletic events, sports teams, individual athletes, competitions, or related sports activities\.|o1\-mini\-2024\-09\-12|The upcoming Olympics face challenges due to global health concerns\.|Sports|err|
|The category "Business" is defined as news articles concerning commerce, economic markets, corporate activities, financial developments, or business\-related issues\.|o1\-mini\-2024\-09\-12|Apple releases its latest iPhone model with innovative features\.|Sci/Tech|err|
|The category "Business" is defined as news articles concerning commerce, economic markets, corporate activities, financial developments, or business\-related issues\.|o1\-mini\-2024\-09\-12|Stock markets experience a significant downturn amid economic uncertainty\.|Business|err|
|The category "Business" is defined as news articles concerning commerce, economic markets, corporate activities, financial developments, or business\-related issues\.|o1\-mini\-2024\-09\-12|A new startup secures funding to expand its operations internationally\.|Business|err|
|The category "Sci/Tech" is defined as news articles involving scientific discoveries, technological advancements, space exploration, or technical innovations\.|o1\-mini\-2024\-09\-12|NASA announces a new mission to explore Mars\.|Sci/Tech|err|
|The category "Sci/Tech" is defined as news articles involving scientific discoveries, technological advancements, space exploration, or technical innovations\.|o1\-mini\-2024\-09\-12|Researchers develop a new biodegradable material to reduce pollution\.|Sci/Tech|err|
|The category "Sci/Tech" is defined as news articles involving scientific discoveries, technological advancements, space exploration, or technical innovations\.|o1\-mini\-2024\-09\-12|Breakthrough in artificial intelligence enhances machine learning capabilities\.|Sci/Tech|err|
|The chatbot's output must consist solely of one of the four category names: World, Sports, Business, or Sci/Tech\.|o1\-mini\-2024\-09\-12|International Affairs|World|err|
|The chatbot's output must consist solely of one of the four category names: World, Sports, Business, or Sci/Tech\.|o1\-mini\-2024\-09\-12|SPORTS|Sports|err|
|The chatbot's output must consist solely of one of the four category names: World, Sports, Business, or Sci/Tech\.|o1\-mini\-2024\-09\-12|Business|Business|err|
|The output must not include any additional text, explanations, or information beyond the specified category name\.|o1\-mini\-2024\-09\-12|World|World|err|
|The output must not include any additional text, explanations, or information beyond the specified category name\.|o1\-mini\-2024\-09\-12|Sports|Sports|err|
|The output must not include any additional text, explanations, or information beyond the specified category name\.|o1\-mini\-2024\-09\-12|Sci/Tech|Sci/Tech|err|
|The input text provided to the chatbot will always be a string representing a news article\.|o1\-mini\-2024\-09\-12|The economic summit discusses trade agreements and tariffs\.|Business|err|
|The input text provided to the chatbot will always be a string representing a news article\.|o1\-mini\-2024\-09\-12|The championship game ends in a surprising upset\.|Sports|err|
|The input text provided to the chatbot will always be a string representing a news article\.|o1\-mini\-2024\-09\-12|Innovations in renewable energy are accelerating the green transition\.|Sci/Tech|err|
|The chatbot must accurately determine the most appropriate category based on the content of the input text without relying on provided examples\.|o1\-mini\-2024\-09\-12|The European Union negotiates new trade deals amid rising tensions\.|Business|err|
|The chatbot must accurately determine the most appropriate category based on the content of the input text without relying on provided examples\.|o1\-mini\-2024\-09\-12|A major league baseball team drafts a promising young pitcher\.|Sports|err|
|The chatbot must accurately determine the most appropriate category based on the content of the input text without relying on provided examples\.|o1\-mini\-2024\-09\-12|New financial regulations aim to stabilize the banking sector\.|Business|err|
|The output must not include any additional text, explanations, or information beyond the specified category name\.|o1\-mini\-2024\-09\-12|World|World|err|
|The output must not include any additional text, explanations, or information beyond the specified category name\.|o1\-mini\-2024\-09\-12|Sports|Sports|err|
|The chatbot's output must consist solely of one of the four category names: World, Sports, Business, or Sci/Tech\.|o1\-mini\-2024\-09\-12|Business|Business|err|
|The category definitions must be strictly adhered to, ensuring consistency and clarity in classification across different inputs\.|o1\-mini\-2024\-09\-12|Global summit addresses international security concerns\.|World|err|
|The category definitions must be strictly adhered to, ensuring consistency and clarity in classification across different inputs\.|o1\-mini\-2024\-09\-12|Local team wins national championship, sparking celebrations\.|Sports|err|
|The category definitions must be strictly adhered to, ensuring consistency and clarity in classification across different inputs\.|o1\-mini\-2024\-09\-12|Tech giant announces merger to expand market reach\.|Business|err|
|The output must not include any additional text, explanations, or information beyond the specified category name\.|o1\-mini\-2024\-09\-12|World|World|err|
|The output must not include any additional text, explanations, or information beyond the specified category name\.|o1\-mini\-2024\-09\-12|Sports|Sports|err|
|The output must not include any additional text, explanations, or information beyond the specified category name\.|o1\-mini\-2024\-09\-12|Sci/Tech|Sci/Tech|err|
|No assumptions or external information outside the input text should influence the chatbot’s classification decision\.|o1\-mini\-2024\-09\-12|The trade agreement benefits both countries involved\.|Business|err|
|No assumptions or external information outside the input text should influence the chatbot’s classification decision\.|o1\-mini\-2024\-09\-12|Legendary athlete breaks long\-standing records\.|Sports|err|
|No assumptions or external information outside the input text should influence the chatbot’s classification decision\.|o1\-mini\-2024\-09\-12|Innovative startups drive economic growth in the region\.|Business|err|
|The chatbot must perform the classification based solely on the content and context of the provided input text\.|o1\-mini\-2024\-09\-12|Global economic policies are shifting in response to market demands\.|Business|err|
|The chatbot must perform the classification based solely on the content and context of the provided input text\.|o1\-mini\-2024\-09\-12|The national team prepares for the upcoming international tournament\.|Sports|err|
|The chatbot must perform the classification based solely on the content and context of the provided input text\.|o1\-mini\-2024\-09\-12|Advancements in biotechnology offer new medical treatments\.|Sci/Tech|err|
|The chatbot must ensure that every entity involved in the classification process is clearly defined within these rules\.|o1\-mini\-2024\-09\-12|Chatbot must classify any provided input text\.|Sci/Tech|err|
|The chatbot must ensure that every entity involved in the classification process is clearly defined within these rules\.|o1\-mini\-2024\-09\-12|Chatbot must not include explanations in output\.|Sci/Tech|err|
|The chatbot must ensure that every entity involved in the classification process is clearly defined within these rules\.|o1\-mini\-2024\-09\-12|Category names must be exactly one of the four specified\.|Sci/Tech|err|
|The output must not include any additional text, explanations, or information beyond the specified category name\.|o1\-mini\-2024\-09\-12|World|World|err|
|The output must not include any additional text, explanations, or information beyond the specified category name\.|o1\-mini\-2024\-09\-12|Sports|Sports|err|
|The output must not include any additional text, explanations, or information beyond the specified category name\.|o1\-mini\-2024\-09\-12|Sci/Tech|Sci/Tech|err|
|The classification must be based on the content's primary focus, determining which category best represents the main topic of the input text\.|o1\-mini\-2024\-09\-12|The primary focus of the article is on diplomatic negotiations\.|World|err|
|The classification must be based on the content's primary focus, determining which category best represents the main topic of the input text\.|o1\-mini\-2024\-09\-12|The article primarily discusses the strategies of a football team\.|Sports|err|
|The classification must be based on the content's primary focus, determining which category best represents the main topic of the input text\.|o1\-mini\-2024\-09\-12|The main topic revolves around a new financial policy\.|Business|err|
|The output must not include any additional text, explanations, or information beyond the specified category name\.|o1\-mini\-2024\-09\-12|World|World|err|
|The output must not include any additional text, explanations, or information beyond the specified category name\.|o1\-mini\-2024\-09\-12|Sports|Sports|err|
|The chatbot's output must consist solely of one of the four category names: World, Sports, Business, or Sci/Tech\.|o1\-mini\-2024\-09\-12|Business|Business|err|
|The output must not include any additional text, explanations, or information beyond the specified category name\.|o1\-mini\-2024\-09\-12|World|World|err|
|The output must not include any additional text, explanations, or information beyond the specified category name\.|o1\-mini\-2024\-09\-12|Sports|Sports|err|
|The output must not include any additional text, explanations, or information beyond the specified category name\.|o1\-mini\-2024\-09\-12|Sci/Tech|Sci/Tech|err|
|The output must not include any additional text, explanations, or information beyond the specified category name\.|o1\-mini\-2024\-09\-12|World|World|err|
|The output must not include any additional text, explanations, or information beyond the specified category name\.|o1\-mini\-2024\-09\-12|Sports|Sports|err|
|The chatbot's output must consist solely of one of the four category names: World, Sports, Business, or Sci/Tech\.|o1\-mini\-2024\-09\-12|Business|Business|err|
|The chatbot must not classify any provided input text into one of four predefined categories: World, Sports, Business, or Sci/Tech\.|o1\-mini\-2024\-09\-12|The economic policies will change significantly next year\.|Business|err|
|The chatbot must not classify any provided input text into one of four predefined categories: World, Sports, Business, or Sci/Tech\.|o1\-mini\-2024\-09\-12|A new art exhibition opens downtown\.|World|err|
|The chatbot must not classify any provided input text into one of four predefined categories: World, Sports, Business, or Sci/Tech\.|o1\-mini\-2024\-09\-12|Local community gathers for annual fair\.|World|err|
|The category "World" should not include news articles related to international affairs, global events, diplomatic relations, or political developments\.|o1\-mini\-2024\-09\-12|Local festival attracts tourists from around the world\.|World|err|
|The category "World" should not include news articles related to international affairs, global events, diplomatic relations, or political developments\.|o1\-mini\-2024\-09\-12|The president announces new healthcare reforms\.|World|err|
|The category "World" should not include news articles related to international affairs, global events, diplomatic relations, or political developments\.|o1\-mini\-2024\-09\-12|International sports event held in the city\.|Sports|err|
|The category "Sports" should not encompass news articles that pertain to athletic events, sports teams, individual athletes, competitions, or related sports activities\.|o1\-mini\-2024\-09\-12|The championship game ends in a tie\.|Sports|err|
|The category "Sports" should not encompass news articles that pertain to athletic events, sports teams, individual athletes, competitions, or related sports activities\.|o1\-mini\-2024\-09\-12|An athlete wins an award for community service\.|Sports|err|
|The category "Sports" should not encompass news articles that pertain to athletic events, sports teams, individual athletes, competitions, or related sports activities\.|o1\-mini\-2024\-09\-12|Sports team conducts a charity event\.|Sports|err|
|The category "Business" should not cover news articles concerning commerce, economic markets, corporate activities, financial developments, or business\-related issues\.|o1\-mini\-2024\-09\-12|New art museum opens downtown\.|Business|err|
|The category "Business" should not cover news articles concerning commerce, economic markets, corporate activities, financial developments, or business\-related issues\.|o1\-mini\-2024\-09\-12|Local market sees a surge in organic produce sales\.|Business|err|
|The category "Business" should not cover news articles concerning commerce, economic markets, corporate activities, financial developments, or business\-related issues\.|o1\-mini\-2024\-09\-12|Business conference focuses on sustainable practices\.|Business|err|
|The category "Sci/Tech" should not involve news articles related to scientific discoveries, technological advancements, space exploration, or technical innovations\.|o1\-mini\-2024\-09\-12|Community garden project helps reduce urban heat\.|Sci/Tech|err|
|The category "Sci/Tech" should not involve news articles related to scientific discoveries, technological advancements, space exploration, or technical innovations\.|o1\-mini\-2024\-09\-12|The city council approves new parklands\.|World|err|
|The category "Sci/Tech" should not involve news articles related to scientific discoveries, technological advancements, space exploration, or technical innovations\.|o1\-mini\-2024\-09\-12|Cultural festival celebrates local heritage\.|World|err|
|The chatbot's output may include text beyond the four category names: World, Sports, Business, or Sci/Tech\.|o1\-mini\-2024\-09\-12|World news: The global economy is changing rapidly\.|Business|err|
|The chatbot's output may include text beyond the four category names: World, Sports, Business, or Sci/Tech\.|o1\-mini\-2024\-09\-12|Sports update: The annual marathon was held yesterday\.|Sports|err|
|The chatbot's output may include text beyond the four category names: World, Sports, Business, or Sci/Tech\.|o1\-mini\-2024\-09\-12|Business insights: Market trends are shifting\.|Business|err|
|The output can include additional text, explanations, or information beyond the specified category name\.|o1\-mini\-2024\-09\-12|The latest advancements in AI technology are impressive\.|Sci/Tech|err|
|The output can include additional text, explanations, or information beyond the specified category name\.|o1\-mini\-2024\-09\-12|Breaking: The stock market hits a new high\.|Business|err|
|The output can include additional text, explanations, or information beyond the specified category name\.|o1\-mini\-2024\-09\-12|Sports highlight: The game was intense and exciting\.|Sports|err|
|The input text provided to the chatbot may not always be a string representing a news article\.|o1\-mini\-2024\-09\-12|This is not a news article but a fictional story\.|World|err|
|The input text provided to the chatbot may not always be a string representing a news article\.|o1\-mini\-2024\-09\-12|12345|Business|err|
|The input text provided to the chatbot may not always be a string representing a news article\.|o1\-mini\-2024\-09\-12||Please provide the input text to classify\.|err|
|The chatbot may rely on provided examples to determine the appropriate category based on the content of the input text\.|o1\-mini\-2024\-09\-12|World news: The global summit was postponed\.|World|err|
|The chatbot may rely on provided examples to determine the appropriate category based on the content of the input text\.|o1\-mini\-2024\-09\-12|Sports update: Team A defeats Team B\.|Sports|err|
|The chatbot may rely on provided examples to determine the appropriate category based on the content of the input text\.|o1\-mini\-2024\-09\-12|New tech gadget released today\.|Sci/Tech|err|
|Each classification decision does not have to be mutually exclusive, allowing the input text to be assigned to multiple categories\.|o1\-mini\-2024\-09\-12|The global conference covers multiple international topics\.|World|err|
|Each classification decision does not have to be mutually exclusive, allowing the input text to be assigned to multiple categories\.|o1\-mini\-2024\-09\-12|A player scores in both football and basketball games\.|Sports|err|
|Each classification decision does not have to be mutually exclusive, allowing the input text to be assigned to multiple categories\.|o1\-mini\-2024\-09\-12|Tech company expands into financial services\.|Business|err|
|The category definitions can be loosely interpreted, allowing for flexibility and variation in classification across different inputs\.|o1\-mini\-2024\-09\-12|International relations and economic policies are discussed\.|World|err|
|The category definitions can be loosely interpreted, allowing for flexibility and variation in classification across different inputs\.|o1\-mini\-2024\-09\-12|The athlete also invests in tech startups\.|Business|err|
|The category definitions can be loosely interpreted, allowing for flexibility and variation in classification across different inputs\.|o1\-mini\-2024\-09\-12|Business leaders attend a tech innovation summit\.|Business|err|
|The output may include misspellings and does not need to match exactly one of the category names: World, Sports, Business, or Sci/Tech\.|o1\-mini\-2024\-09\-12|Wrold|World|err|
|The output may include misspellings and does not need to match exactly one of the category names: World, Sports, Business, or Sci/Tech\.|o1\-mini\-2024\-09\-12|Sportsss|Sports|err|
|The output may include misspellings and does not need to match exactly one of the category names: World, Sports, Business, or Sci/Tech\.|o1\-mini\-2024\-09\-12|Sci\-Tech|Sci/Tech|err|
|Assumptions or external information outside the input text can influence the chatbot’s classification decision\.|o1\-mini\-2024\-09\-12|Experts believe external market factors will influence classification\.|Business|err|
|Assumptions or external information outside the input text can influence the chatbot’s classification decision\.|o1\-mini\-2024\-09\-12|Athlete's performance may be affected by sponsorships\.|Sports|err|
|Assumptions or external information outside the input text can influence the chatbot’s classification decision\.|o1\-mini\-2024\-09\-12|Global tech trends influenced by consumer behavior\.|Sci/Tech|err|
|The chatbot may consider factors beyond the content and context of the provided input text in performing the classification\.|o1\-mini\-2024\-09\-12|The chatbot uses previous conversations to determine the category\.|Sci/Tech|err|
|The chatbot may consider factors beyond the content and context of the provided input text in performing the classification\.|o1\-mini\-2024\-09\-12|User preferences influence the classification of articles\.|Sci/Tech|err|
|The chatbot may consider factors beyond the content and context of the provided input text in performing the classification\.|o1\-mini\-2024\-09\-12|Chatbot considers browsing history when classifying news\.|Sci/Tech|err|
|The chatbot does not need to clearly define every entity involved in the classification process within these rules\.|o1\-mini\-2024\-09\-12|Entities in the classification process are undefined\.|Sci/Tech|err|
|The chatbot does not need to clearly define every entity involved in the classification process within these rules\.|o1\-mini\-2024\-09\-12|Chatbot does not clarify category definitions\.|Sci/Tech|err|
|The chatbot does not need to clearly define every entity involved in the classification process within these rules\.|o1\-mini\-2024\-09\-12|Lacks clear boundaries for category assignments\.|Sci/Tech|err|
|The chatbot may include instructions, questions, or prompts in its output alongside the category name\.|o1\-mini\-2024\-09\-12|Please classify the following article\.|World|err|
|The chatbot may include instructions, questions, or prompts in its output alongside the category name\.|o1\-mini\-2024\-09\-12|What category does this article belong to?|World|err|
|The chatbot may include instructions, questions, or prompts in its output alongside the category name\.|o1\-mini\-2024\-09\-12|Here is the news article, classify it accordingly\.|World|err|
|The classification can be based on secondary aspects of the content, allowing multiple categories to represent the input text's topics\.|o1\-mini\-2024\-09\-12|The article discusses both international trade and environmental policies\.|Business|err|
|The classification can be based on secondary aspects of the content, allowing multiple categories to represent the input text's topics\.|o1\-mini\-2024\-09\-12|Coverage of both athletic achievements and team management\.|Sports|err|
|The classification can be based on secondary aspects of the content, allowing multiple categories to represent the input text's topics\.|o1\-mini\-2024\-09\-12|The text covers both financial markets and technological innovations\.|Business|err|
|The chatbot may vary in classification consistency depending on variations in input text length, style, or complexity\.|o1\-mini\-2024\-09\-12|World news: Short article\.|World|err|
|The chatbot may vary in classification consistency depending on variations in input text length, style, or complexity\.|o1\-mini\-2024\-09\-12|Sports update: Detailed and complex analysis of game strategies\.|Sports|err|
|The chatbot may vary in classification consistency depending on variations in input text length, style, or complexity\.|o1\-mini\-2024\-09\-12|Business report: Comprehensive overview of market trends\.|Business|err|
|The output must not include any additional text, explanations, or information beyond the specified category name\.|o1\-mini\-2024\-09\-12|World|World|err|
|The output must not include any additional text, explanations, or information beyond the specified category name\.|o1\-mini\-2024\-09\-12|Sports|Sports|err|
|The output must not include any additional text, explanations, or information beyond the specified category name\.|o1\-mini\-2024\-09\-12|Sci/Tech|Sci/Tech|err|
|The output must not include any additional text, explanations, or information beyond the specified category name\.|o1\-mini\-2024\-09\-12|World|World|err|
|The output must not include any additional text, explanations, or information beyond the specified category name\.|o1\-mini\-2024\-09\-12|Sports|Sports|err|
|The chatbot's output must consist solely of one of the four category names: World, Sports, Business, or Sci/Tech\.|o1\-mini\-2024\-09\-12|Business|Business|err|

### [baseline_tests.txt](./baseline_tests.txt)

`````txt
text: "Global markets react to unexpected economic downturn in Europe"
===
text: "Championship finals see record-breaking attendance this year"
===
text: "Tech giants release joint statement on data privacy concerns"
===
text: "Historic peace agreement signed between neighboring countries"
===
text: "Olympic committee announces new sports to be included in the games"
===
text: "Startups surge in Silicon Valley as venture capital flows in"
===
text: "New species of dinosaur discovered in remote excavation site"
===
text: "Presidential elections show surprising shifts in voter preferences"
===
text: "Local team clinches playoff spot after thrilling last-minute win"
===
text: "Major merger between leading telecom companies reshapes industry"
===
text: "Breakthrough in renewable energy technology promises cleaner future"
===
text: "International summit addresses global water scarcity issues"
===
text: "Star athlete announces retirement after illustrious career"
===
text: "Stock prices soar following positive quarterly earnings reports"
===
text: "Innovative AI application revolutionizes healthcare diagnostics"
===
text: "Conflict arises as trade tariffs impose strain on international relations"
===
text: "Record number of users join new social media platform overnight"
===
text: "Government unveils new infrastructure plan to boost economic growth"
===
text: "Historic sports figure inducted into the national hall of fame"
===
text: "Cryptocurrency market experiences significant fluctuations amid regulatory debates"
===
text: "Space agency plans mission to explore outer asteroid belt"
===
text: "Civil unrest in capital city leads to calls for reform"
===
text: "Breakthrough gene therapy offers hope for rare genetic disorders"
===
text: "Underdog team triumphs in unexpected sports upset"
===
text: "Leading automobile manufacturer announces shift to electric vehicles"
===
text: "Scientific community celebrates milestone in quantum computing"
===
text: "Major hurricane makes landfall, causing widespread damage"
===
text: "Legendary coach steps down after decades of success"
===
text: "Global oil prices decline following surplus inventory reports"
===
text: "New virtual reality headset set to transform gaming experience"
===
text: "United nations promotes initiatives for sustainable development"
===
text: "Young prodigy wins international chess championship"
===
text: "Tech startup secures patent for innovative blockchain solution"
===
text: "Diplomatic talks aim to resolve long-standing territorial disputes"
===
text: "National league sets new records for television viewership"
===
text: "Investment firms adjust strategies in response to market volatility"
===
text: "Researchers develop advanced materials for space exploration"
===
text: "Peaceful protests highlight demands for social justice reforms"
===
text: "International sports federation introduces new regulations for fair play"
===
text: "Major retailer reports significant growth in online sales"
===
text: "Scientists achieve major advancement in cancer treatment research"
===
text: "Historic building restored and repurposed for community use"
===
text: "Youth league expands programs to encourage sports participation"
===
text: "Financial sector adapts to emerging fintech innovations"
===
text: "Astronomers detect potential signs of extraterrestrial life"
===
text: "Government faces scrutiny over handling of economic policies"
===
text: "Record-breaking athlete sets new world record in sprint event"
===
text: "Biotech firms collaborate on groundbreaking genetic research"
===
text: "Tensions escalate as nations dispute maritime boundaries"
===
text: "Entertainment industry sees surge in streaming service subscriptions"
===
text: "Electric scooter usage increases in urban areas, impacting traffic"
===
text: "Trade negotiations reach impasse as tariffs remain contentious"
===
text: "Eco-friendly startups gain traction in green technology sector"
===
text: "International marathon attracts participants from over 50 countries"
===
text: "Leading smartphone manufacturer unveils next-generation device"
===
text: "Historians uncover significant artifacts at ancient site"
===
text: "College basketball team advances to national semifinals"
===
text: "Major airline announces plans to expand fleet with sustainable aircraft"
===
text: "Innovators create wearable tech to monitor health metrics"
===
text: "Political leaders gather for emergency climate change summit"
===
text: "Local sports club celebrates championship victory with parade"
===
text: "Venture capitalists invest heavily in artificial intelligence startups"
===
text: "Robotics technology advances with new automation solutions"
===
text: "Peace initiative gains support from multiple countries"
===
text: "National team qualifies for upcoming international tournament"
===
text: "Global supply chain disruptions affect manufacturing industries"
===
text: "Healthcare sector embraces telemedicine for patient consultations"
===
text: "Historic treaty signed to protect endangered wildlife species"
===
text: "Youth athletes receive scholarships to pursue sports careers"
===
text: "Financial markets respond to unexpected policy changes"
===
text: "Space exploration missions planned for deep space objectives"
===
text: "Community rallies to support local sports programs"
===
text: "Tech firms announce breakthroughs in machine learning algorithms"
===
text: "International relations improve with new diplomatic agreements"
===
text: "Professional league expands by adding new franchises"
===
text: "Economic indicators show signs of recovery post-recession"
===
text: "Renewable energy projects receive significant government funding"
===
text: "Championship series attracts record television ratings"
===
text: "Startups launch innovative solutions for urban transportation"
===
text: "Scientific team publishes findings on climate change impacts"
===
text: "Government implements new regulations for financial institutions"
===
text: "Athlete overcomes adversity to win major tournament"
===
text: "Tech conference showcases advancements in virtual collaboration tools"
===
text: "Diplomats negotiate trade deals to enhance bilateral relations"
===
text: "Sports league introduces new safety measures for players"
===
text: "Market analysts predict trends for the upcoming fiscal year"
===
text: "Researchers discover potential cure for chronic illness"
===
text: "Civic organizations promote sports as tools for youth development"
===
text: "Investors show increased interest in green bonds and sustainable assets"
===
text: "Space tourism becomes more accessible with new private ventures"
===
text: "City council approves plans for new sports complex"
===
text: "Biotechnology breakthroughs open doors to personalized medicine"
===
text: "International sporting events bolster local economies"
===
text: "Financial experts advise on portfolio diversification strategies"
===
text: "Engineers develop next-gen batteries for electric vehicles"
===
text: "Peacekeeping forces deployed to conflict zones under new mandate"
===
text: "Under-21 league produces standout talents for national team"
===
text: "Tech startups navigate challenges in competitive markets"
===
text: "Global summit addresses cybersecurity threats and solutions"
===
text: "Major esport tournament draws global audience and sponsorships"
===
text: "Economic policies aim to reduce unemployment rates"
===
text: "Scientific collaborations lead to significant technological innovations"
===
text: "Local heroes from sports inspire community initiatives"
===
text: "Investment in renewable resources accelerates industry transformation"
===
text: "Astronauts train for upcoming missions to the International Space Station"
===
text: "Sports sponsorships boost brand visibility for major companies"
===
text: "Financial markets adapt to changes in global trade dynamics"
===
text: "Breakthrough in nanotechnology paves way for medical advancements"
===
text: "Diplomatic efforts focus on easing trade tensions between nations"
===
text: "Youth leagues emphasize inclusivity and diversity in sports participation"
===
text: "Tech industry leaders discuss future of artificial intelligence at conference"
===
text: "Economic reforms introduced to stimulate small business growth"
===
text: "International athletes collaborate on charity initiatives"
===
text: "Renewable energy sector experiences unprecedented investment surge"
`````
