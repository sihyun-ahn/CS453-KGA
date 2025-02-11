## classify-input-text ([json](./evals/2025-02-10/classify-input-text/report.json))

- 5 rules, 3/5 (60%) grounded
- 5 inverse rules
- 60 tests, 30 baseline tests

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
        type: "string"
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
{{ text }}
    
`````


### [intent.txt](./intent.txt)

`````txt
classify a news article into one of four categories: World, Sports, Business, Sci/Tech
`````


### [input_spec.txt](./input_spec.txt)

`````txt
The input is a news article text.
The news article text must be in English.
The news article text must belong to one of the categories: World, Sports, Business, Sci/Tech.
The news article text should provide enough context to classify it into one of the categories.
The news article text can include multiple sentences.
The length of the news article text can be variable. 
All types of greetings should be ignored but are valid inputs.
`````


### [rules.txt](./rules.txt)

`````txt
1: The response must classify the news article into one of the following categories: World, Sports, Business, Sci/Tech.
2: The response must use only one of the specified categories: World, Sports, Business, Sci/Tech.
3: The response must provide a single category label without any additional text or explanation.
4: The category label must match exactly one of the terms: World, Sports, Business, Sci/Tech, without any variations in spelling, capitalization, or punctuation.
5: The response should not include any additional details or context about the news article.
`````


### [rule_evals.csv](./rule_evals.csv)

|ruleid|rule|grounded|
|-|-|-|
|1|The response must classify the news article into one of the following categories: World, Sports, Business, Sci/Tech\.|ok|
|2|The response must use only one of the specified categories: World, Sports, Business, Sci/Tech\.|ok|
|3|The response must provide a single category label without any additional text or explanation\.|err|
|4|The category label must match exactly one of the terms: World, Sports, Business, Sci/Tech, without any variations in spelling, capitalization, or punctuation\.|ok|
|5|The response should not include any additional details or context about the news article\.|err|

### [inverse_rules.txt](./inverse_rules.txt)

`````txt
6: The response must classify the news article into more than one of the following categories: World, Sports, Business, Sci/Tech.
7: The response must use categories other than the specified categories: World, Sports, Business, Sci/Tech.
8: The response must provide multiple category labels with additional text or explanation.
9: The category label must not match exactly one of the terms: World, Sports, Business, Sci/Tech, and must include variations in spelling, capitalization, or punctuation.
10: The response should include additional details or context about the news article.
`````


### [tests.csv](./tests.csv)

|testinput|expectedoutput|reasoning|
|-|-|-|
|The International Monetary Fund releases new global economic outlook|Business|Tests correct categorization of the article as Business|
|NASA announces new Mars mission plans|Sci/Tech|Checks proper classification of the article as Sci/Tech|
|An earthquake measuring 7\.8 on the Richter scale hits Indonesia|World|Validates categorization of the article as World|
|The World Bank launches new initiatives to tackle global poverty|Business|Ensures response uses only one of the specified categories|
|Olympic Games postponed due to pandemic|Sports|Confirms response correctly classifies the sports article using single correct category|
|WHO declares an international health emergency|World|Verifies that the response uses one correct category without combining categories|
|The World Health Organization issues new guidelines|World|Ensures the output has a single category label without extra text|
|Elon Musk announces new Neuralink progress|Sci/Tech|Confirms the response only gives a single category label|
|Annual Tech Expo showcases innovative technology|Sci/Tech|Validates response is limited to giving a single category label with no explanations|
|Stock markets see significant rises after tech company's announcement|Business|Ensures the category label has correct spelling and punctuation|
|NASA's Perseverance rover lands on Mars|Sci/Tech|Verifies exact match of the label without any variation|
|FIFA World Cup attracts millions of viewers worldwide|Sports|Confirms exact category match for sports news|
|New trade agreements between the US and the EU|Business|Ensures no additional context or details are provided in the response|
|Scientists discover new species in the Amazon rainforest|Sci/Tech|Checks that response contains only the category label|
|Urbanization trends in rapidly developing countries|World|Validates minimalist response appropriate to the article subject|
|UN and FIFA collaborate on global initiatives|World, Sports|Tests new classification into multiple categories|
|Tesla impacts both the automotive and space industry|Business, Sci/Tech|Ensures response includes multiple relevant categories|
|Economic impacts of global sporting events amid pandemic|Sports, Business|Confirms classification into more than one category|
|Innovative culinary trends among top chefs|Food|Verifies response uses an unspecified category|
|Impact of ancient history on modern societies|History|Tests classification using incorrect category|
|Celebrity gossip: Latest buzz in Hollywood|Entertainment|Ensures improper categorization check|
|Technological advancements and their economic impacts|Sci/Tech, Business: This article discusses the interplay between technology and economics\.|Confirms multiple labels with explanations|
|World conflicts impacting sports events globally|World, Sports: The article delves into how international tensions influence worldwide sports\.|Validates response includes multiple categories and context|
|Economic policies shaping scientific research funding|Business, Sci/Tech: An analysis of how business decisions affect science\.|Ensures multiple categories and detailed context|
|Covid\-19 update: global implications|world\.|Validates that incorrect punctuation is used in the category label|
|Breakthrough tech achievements in space|sci\-tech|Ensures wrongly capitalized category labels are detected|
|Latest in the business sector|BUssineSS|Tests invalid spelling of the category label|
|Significant findings from the latest economic report|Business: The latest economic report reveals crucial trends that will influence global markets\.|Ensures the response includes additional context about the article|
|Breakthrough in vaccine technology|Sci/Tech: This article covers the latest advancements in vaccine development\.|Tests incorporating additional details into the response|
|United Nations convenes emergency session|World: The UN is meeting to address an urgent global crisis\.|Validates inclusion of broader context and details in the response|

### [test_evals.csv](./test_evals.csv)

|rule|model|input|coverage|validity|
|-|-|-|-|-|
|The response must classify the news article into one of the following categories: World, Sports, Business, Sci/Tech\.|gpt\-4o\-2024\-05\-13|The International Monetary Fund releases new global economic outlook|ok|ok|
|The response must classify the news article into one of the following categories: World, Sports, Business, Sci/Tech\.|gpt\-4o\-2024\-05\-13|NASA announces new Mars mission plans|ok|ok|
|The response must classify the news article into one of the following categories: World, Sports, Business, Sci/Tech\.|gpt\-4o\-2024\-05\-13|An earthquake measuring 7\.8 on the Richter scale hits Indonesia|ok|ok|
|The response must use only one of the specified categories: World, Sports, Business, Sci/Tech\.|gpt\-4o\-2024\-05\-13|The World Bank launches new initiatives to tackle global poverty|ok|ok|
|The response must use only one of the specified categories: World, Sports, Business, Sci/Tech\.|gpt\-4o\-2024\-05\-13|Olympic Games postponed due to pandemic|ok|ok|
|The response must use only one of the specified categories: World, Sports, Business, Sci/Tech\.|gpt\-4o\-2024\-05\-13|WHO declares an international health emergency|ok|ok|
|The response must provide a single category label without any additional text or explanation\.|gpt\-4o\-2024\-05\-13|The World Health Organization issues new guidelines|ok|err|
|The response must provide a single category label without any additional text or explanation\.|gpt\-4o\-2024\-05\-13|Elon Musk announces new Neuralink progress|ok|ok|
|The response must provide a single category label without any additional text or explanation\.|gpt\-4o\-2024\-05\-13|Annual Tech Expo showcases innovative technology|ok|ok|
|The category label must match exactly one of the terms: World, Sports, Business, Sci/Tech, without any variations in spelling, capitalization, or punctuation\.|gpt\-4o\-2024\-05\-13|Stock markets see significant rises after tech company's announcement|ok|ok|
|The category label must match exactly one of the terms: World, Sports, Business, Sci/Tech, without any variations in spelling, capitalization, or punctuation\.|gpt\-4o\-2024\-05\-13|NASA's Perseverance rover lands on Mars|ok|ok|
|The category label must match exactly one of the terms: World, Sports, Business, Sci/Tech, without any variations in spelling, capitalization, or punctuation\.|gpt\-4o\-2024\-05\-13|FIFA World Cup attracts millions of viewers worldwide|ok|ok|
|The response should not include any additional details or context about the news article\.|gpt\-4o\-2024\-05\-13|New trade agreements between the US and the EU|ok|ok|
|The response should not include any additional details or context about the news article\.|gpt\-4o\-2024\-05\-13|Scientists discover new species in the Amazon rainforest|ok|ok|
|The response should not include any additional details or context about the news article\.|gpt\-4o\-2024\-05\-13|Urbanization trends in rapidly developing countries|ok|err|
|The response must classify the news article into more than one of the following categories: World, Sports, Business, Sci/Tech\.|gpt\-4o\-2024\-05\-13|UN and FIFA collaborate on global initiatives|ok|err|
|The response must classify the news article into more than one of the following categories: World, Sports, Business, Sci/Tech\.|gpt\-4o\-2024\-05\-13|Tesla impacts both the automotive and space industry|ok|err|
|The response must classify the news article into more than one of the following categories: World, Sports, Business, Sci/Tech\.|gpt\-4o\-2024\-05\-13|Economic impacts of global sporting events amid pandemic|ok|err|
|The response must use categories other than the specified categories: World, Sports, Business, Sci/Tech\.|gpt\-4o\-2024\-05\-13|Innovative culinary trends among top chefs|ok|err|
|The response must use categories other than the specified categories: World, Sports, Business, Sci/Tech\.|gpt\-4o\-2024\-05\-13|Impact of ancient history on modern societies|ok|err|
|The response must use categories other than the specified categories: World, Sports, Business, Sci/Tech\.|gpt\-4o\-2024\-05\-13|Celebrity gossip: Latest buzz in Hollywood|ok|err|
|The response must provide multiple category labels with additional text or explanation\.|gpt\-4o\-2024\-05\-13|Technological advancements and their economic impacts|ok|ok|
|The response must provide multiple category labels with additional text or explanation\.|gpt\-4o\-2024\-05\-13|World conflicts impacting sports events globally|ok|ok|
|The response must provide multiple category labels with additional text or explanation\.|gpt\-4o\-2024\-05\-13|Economic policies shaping scientific research funding|ok|ok|
|The category label must not match exactly one of the terms: World, Sports, Business, Sci/Tech, and must include variations in spelling, capitalization, or punctuation\.|gpt\-4o\-2024\-05\-13|Covid\-19 update: global implications|ok|ok|
|The category label must not match exactly one of the terms: World, Sports, Business, Sci/Tech, and must include variations in spelling, capitalization, or punctuation\.|gpt\-4o\-2024\-05\-13|Breakthrough tech achievements in space|ok|err|
|The category label must not match exactly one of the terms: World, Sports, Business, Sci/Tech, and must include variations in spelling, capitalization, or punctuation\.|gpt\-4o\-2024\-05\-13|Latest in the business sector|ok|err|
|The response should include additional details or context about the news article\.|gpt\-4o\-2024\-05\-13|Significant findings from the latest economic report|ok|err|
|The response should include additional details or context about the news article\.|gpt\-4o\-2024\-05\-13|Breakthrough in vaccine technology|ok|err|
|The response should include additional details or context about the news article\.|gpt\-4o\-2024\-05\-13|United Nations convenes emergency session|ok|ok|

### [baseline_tests.txt](./baseline_tests.txt)

`````txt
text: "UN General Assembly discusses global peacekeeping measures"
===
text: "Lebron James breaks NBA scoring record in thrilling game"
===
text: "Tesla's new battery technology promises greater range and efficiency"
===
text: "International Monetary Fund predicts robust global economic growth"
===
text: "NASA's Perseverance rover collects samples from Mars"
===
text: "Facebook announces new privacy features to protect user data"
===
text: "Global markets react to new trade policies between US and China"
===
text: "Olympics 2024: Paris unveils new venues and infrastructure plans"
===
text: "World Health Organization issues new guidelines for pandemic preparedness"
===
text: "Japan's economy rebounds as consumer spending increases"
===
text: "European Space Agency explores collaboration with private space firms"
===
text: "Amazon faces antitrust scrutiny from European regulators"
===
text: "Cristiano Ronaldo transfers to a Saudi Arabian football club"
===
text: "Google's AI breaks new ground in natural language processing"
===
text: "G7 leaders vow to support global vaccine distribution efforts"
===
text: "World Bank announces new funding to support developing countries"
===
text: "Serena Williams announces retirement from professional tennis"
===
text: "Advancements in medical technology lead to new cancer treatments"
===
text: "Federal Reserve raises interest rates to combat inflation"
===
text: "Olympic Games committee considers adding eSports to future events"
===
text: "New climate report highlights urgent need for renewable energy investment"
===
text: "World Cup 2022: Teams prepare for group stage matches"
===
text: "Stock markets surge amid economic recovery optimism"
===
text: "Elon Musk reveals plans for Martian colony development"
===
text: "Bitcoin's volatility causes stir in financial markets"
===
text: "UK Prime Minister addresses nation on new trade deal"
===
text: "Breakthrough in quantum computing technology announced by researchers"
===
text: "Global wildlife population faces significant decline, says report"
===
text: "US Open: Djokovic claims 21st Grand Slam title"
===
text: "Apple announces innovative new features in upcoming iPhone model"
`````


### [rule_coverage.csv](./rule_coverage.csv)

|input|validity|validityText|baseline|coverage|
|-|-|-|-|-|
|text: "UN General Assembly discusses global peacekeeping measures"|ok|The input text is in English\. The topic of the "UN General Assembly discusses global peacekeeping measures" can be classified under the "World" category\. It is a news article text and provides enough context to identify its classification\.<br><br>OK|1|World|
|text: "Lebron James breaks NBA scoring record in thrilling game"|ok|The input is in English\.<br>The input belongs to the category of Sports, as it talks about Lebron James breaking an NBA scoring record, which provides enough context to classify it into the Sports category\.<br>The input is compliant with the specification as it includes multiple sentences and is not lacking in context to be placed in a category\.<br><br>OK|1|Sports|
|text: "Tesla's new battery technology promises greater range and efficiency"|ok|The input text is "Tesla's new battery technology promises greater range and efficiency"\. <br><br>In evaluating its compliance with the input specification:<br>\- It is in English\.<br>\- It falls under the Sci/Tech category as it discusses new battery technology from Tesla, which is a topic related to scientific and technological advancements\.<br>\- It provides enough context to classify it into the Sci/Tech category\.<br>\- The text includes a single sentence but that does not conflict with the requirement as multiple sentences are optional\.<br>\- There are no greetings to ignore\.<br><br>OK|1|Sci/Tech|
|text: "International Monetary Fund predicts robust global economic growth"|ok|The input text is in English and includes a clear statement which provides enough context to classify it into the 'Business' category, as it pertains to the global economic growth predictions by the International Monetary Fund\.<br><br>OK|1|Business|
|text: "NASA's Perseverance rover collects samples from Mars"|ok|The input text "NASA's Perseverance rover collects samples from Mars" is in English and belongs to the Sci/Tech category\. It provides sufficient context to be classified under Sci/Tech as it discusses an event related to space exploration by a scientific entity \(NASA\)\. <br><br>OK|1|Sci/Tech|
|text: "Facebook announces new privacy features to protect user data"|ok|The input is a news article text in English\. The content of the article is about Facebook announcing new privacy features\. This topic can be classified into the 'Business' category as it pertains to a business entity \(Facebook\) making changes that impact its operations and user data\. The text provides enough context to be classified correctly\.<br><br>OK|1|Sci/Tech|
|text: "Global markets react to new trade policies between US and China"|ok|The input is in English\. The news article text falls under the category of "Business" as it talks about global markets and trade policies\. It provides enough context to classify it into this category\. No greetings are included, and the input fits the variable length requirement\. <br><br>OK|1|Business|
|text: "Olympics 2024: Paris unveils new venues and infrastructure plans"|ok|The input is a news article text in English\. The text is about the Olympics 2024, Paris unveiling new venues and infrastructure plans\. This context clearly places it in the Sports category\. <br><br>OK|1|Sports|
|text: "World Health Organization issues new guidelines for pandemic preparedness"|ok|The input text "World Health Organization issues new guidelines for pandemic preparedness" is in English, provides enough context to classify it under the 'World' category, and fits the description of a news article\. <br><br>OK|1|World|
|text: "Japan's economy rebounds as consumer spending increases"|ok|The input text is in English and discusses Japan's economy rebounding due to an increase in consumer spending\. This provides sufficient context to classify it into the Business category\. There are no greetings in the input\.<br><br>OK|1|Business|
|text: "European Space Agency explores collaboration with private space firms"|ok|The input is in English\.<br>The input provides context about the European Space Agency's exploration of collaboration with private space firms\.<br>The input belongs to the Sci/Tech category due to its focus on space exploration and collaboration with private companies\.<br>No violation\.<br><br>OK|1|Sci/Tech|
|text: "Amazon faces antitrust scrutiny from European regulators"|ok|The input is in English, qualifies as a news article text, and pertains to the category of Business due to its mention of Amazon and antitrust scrutiny, which are commonly related to business operations and regulations\.<br><br>OK|1|Business|
|text: "Cristiano Ronaldo transfers to a Saudi Arabian football club"|ok|The input is a news article text in English\.<br>The content of the text is related to a sports news category as it involves a football transfer\.<br>The text provides enough context to classify it into the "Sports" category\.<br>Hence, it complies with the input specification\. <br><br>OK|1|Sports|
|text: "G7 leaders vow to support global vaccine distribution efforts"|ok|The input text is a news article headline\. It is in English and belongs to the category 'World' as it discusses an international effort involving G7 leaders\. The text provides enough context to classify it into one of the categories mentioned in the input specification\.<br><br>OK|1|World|
|text: "World Bank announces new funding to support developing countries"|ok|The input text "World Bank announces new funding to support developing countries" is in English\. It belongs to the category of Business as it talks about new funding from the World Bank, which is a financial institution\.<br><br>OK|1|World|
|text: "Serena Williams announces retirement from professional tennis"|ok|The input text "Serena Williams announces retirement from professional tennis" is in English and can be classified into the Sports category\. It provides enough context to determine its category as it mentions Serena Williams, who is a well\-known tennis player\. There are no violations of the input specification\.<br><br>OK|1|Sports|
|text: "Advancements in medical technology lead to new cancer treatments"|ok|The input text: "Advancements in medical technology lead to new cancer treatments" is in English, and it provides enough context related to the Sci/Tech category as it discusses advancements and technology in the medical field\. It complies with the requirement that the text must belong to one of the categories \(World, Sports, Business, Sci/Tech\)\.<br><br>OK|1|Sci/Tech|
|text: "Federal Reserve raises interest rates to combat inflation"|ok|The input is in English, which complies with the language requirement\. It belongs to the Business category, as it discusses the Federal Reserve's action on interest rates to address inflation\. The context provided is sufficient to classify it into the Business category\.<br><br>OK|1|Business|
|text: "Olympic Games committee considers adding eSports to future events"|ok|The input text "Olympic Games committee considers adding eSports to future events" is in English\. It belongs to the Sports category as it discusses the consideration of adding eSports to the Olympic Games, which is a significant sporting event\. The text provides sufficient context to classify it under the Sports category, given that it talks about the Olympic Games, a major international sports event, and the potential inclusion of eSports, which is also a category within sports\.<br><br>OK|1|Sci/Tech|
|text: "New climate report highlights urgent need for renewable energy investment"|ok|The input text is in English\. It also provides enough context to classify it into a category, specifically "Sci/Tech" due to the emphasis on climate and renewable energy investment\. <br><br>OK|1|Sci/Tech|
|text: "World Cup 2022: Teams prepare for group stage matches"|ok|The input text is in English and pertains to a sporting event, which is classified under the Sports category\. The provided information is sufficient to classify it into the Sports category, and it includes multiple sentences\. There are no greetings present\.<br><br>OK|1|Sports|
|text: "Stock markets surge amid economic recovery optimism"|ok|The input text is in English and appears to be a news article headline that fits into the Business category\. The headline provides enough context for classification into the Business category, discussing the surge in stock markets amid economic recovery optimism\.<br><br>OK|1|Business|
|text: "Elon Musk reveals plans for Martian colony development"|ok|The input text "Elon Musk reveals plans for Martian colony development" is in English and provides context that suggests it is related to the Sci/Tech category\. It clearly discusses a topic related to scientific and technological advancements\.<br><br>OK|1|Sci/Tech|
|text: "Bitcoin's volatility causes stir in financial markets"|ok|The provided input text is in English and belongs to the Business category as it discusses the volatility of Bitcoin and its impact on financial markets\. It provides enough context to classify it as a news article in the Business domain\. <br><br>OK|1|Business|
|text: "UK Prime Minister addresses nation on new trade deal"|ok|This input provides a specific event "UK Prime Minister addresses nation on new trade deal"\. It is written in English and belongs to the "World" or "Business" category, thus providing enough context to classify it into one of the specified categories\.<br><br>OK|1|Business|
|text: "Breakthrough in quantum computing technology announced by researchers"|ok|The input is a news article text in English\. It provides context about a breakthrough in quantum computing technology announced by researchers\. This allows it to be classified into the Sci/Tech category\. <br><br>OK|1|Sci/Tech|
|text: "Global wildlife population faces significant decline, says report"|ok|The input text is in English\. The content talks about a significant decline in the global wildlife population\. This subject can logically belong to the category of World news or potentially Sci/Tech if it discusses scientific aspects of wildlife decline\. It provides enough context to fall under these categories\.<br><br>OK|1|World|
|text: "US Open: Djokovic claims 21st Grand Slam title"|ok|The input is a news article text in English\. The article can be classified as belonging to the Sports category because it reports on a sporting event — Djokovic winning his 21st Grand Slam title at the US Open\. The input also follows the guideline of potentially including multiple sentences, and it provides enough context to classify it into the Sports category\.<br><br>OK|1|Sports|
|text: "Apple announces innovative new features in upcoming iPhone model"|ok|The input text describes an announcement by Apple about new features in an upcoming iPhone model\. This input can be classified under the category of Sci/Tech because it pertains to a technological development\. It is written in English and provides enough context to classify it into the Sci/Tech category\.<br><br>OK|1|Sci/Tech|

### [baseline_test_evals.csv](./baseline_test_evals.csv)

|input|validity|
|-|-|
|text: "UN General Assembly discusses global peacekeeping measures"|ok|
|text: "Lebron James breaks NBA scoring record in thrilling game"|ok|
|text: "Tesla's new battery technology promises greater range and efficiency"|ok|
|text: "International Monetary Fund predicts robust global economic growth"|ok|
|text: "NASA's Perseverance rover collects samples from Mars"|ok|
|text: "Facebook announces new privacy features to protect user data"|ok|
|text: "Global markets react to new trade policies between US and China"|ok|
|text: "Olympics 2024: Paris unveils new venues and infrastructure plans"|ok|
|text: "World Health Organization issues new guidelines for pandemic preparedness"|ok|
|text: "Japan's economy rebounds as consumer spending increases"|ok|
|text: "European Space Agency explores collaboration with private space firms"|ok|
|text: "Amazon faces antitrust scrutiny from European regulators"|ok|
|text: "Cristiano Ronaldo transfers to a Saudi Arabian football club"|ok|
|text: "Google's AI breaks new ground in natural language processing"|err|
|text: "G7 leaders vow to support global vaccine distribution efforts"|ok|
|text: "World Bank announces new funding to support developing countries"|ok|
|text: "Serena Williams announces retirement from professional tennis"|ok|
|text: "Advancements in medical technology lead to new cancer treatments"|ok|
|text: "Federal Reserve raises interest rates to combat inflation"|ok|
|text: "Olympic Games committee considers adding eSports to future events"|ok|
|text: "New climate report highlights urgent need for renewable energy investment"|ok|
|text: "World Cup 2022: Teams prepare for group stage matches"|ok|
|text: "Stock markets surge amid economic recovery optimism"|ok|
|text: "Elon Musk reveals plans for Martian colony development"|ok|
|text: "Bitcoin's volatility causes stir in financial markets"|ok|
|text: "UK Prime Minister addresses nation on new trade deal"|ok|
|text: "Breakthrough in quantum computing technology announced by researchers"|ok|
|text: "Global wildlife population faces significant decline, says report"|ok|
|text: "US Open: Djokovic claims 21st Grand Slam title"|ok|
|text: "Apple announces innovative new features in upcoming iPhone model"|ok|