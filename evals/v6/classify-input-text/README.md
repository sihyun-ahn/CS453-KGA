## classify-input-text ([json](./evals\v6\classify-input-text/report.json))

- 3 rules
- 3 inverse rules
- 36 tests, 18 baseline tests

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
Classify input text into a specific category.
`````


### [input_spec.txt](./input_spec.txt)

`````txt
The input must be a string.  
The input should generally represent a news article.  
The input text can pertain to world events, sports, business, or science/technology topics.  
The input text should aim to fit into one of the provided categories: World, Sports, Business, or Sci/Tech.
`````


### [rules.txt](./rules.txt)

`````txt
1: The output must classify the input text into one of the four predefined categories: World, Sports, Business, or Sci/Tech. 
2: The output category must be a single word that matches exactly one of these four categories: World, Sports, Business, Sci/Tech. 
3: The output must not contain any explanatory text, only the category name.
`````


### [inverse_rules.txt](./inverse_rules.txt)

`````txt
4: The output must not classify the input text into one of the four predefined categories: World, Sports, Business, or Sci/Tech.  
5: The output category must be more than a single word and must not match exactly one of the categories: World, Sports, Business, Sci/Tech.  
6: The output must contain explanatory text, not just the category name.  
`````


### [tests.csv](./tests.csv)

|testinput|expectedoutput|reasoning|
|-|-|-|
|The Olympics were held in Tokyo this year with new sports added|Sports|This test verifies that the software classifies sports\-related events under the 'Sports' category\.|
|New trade agreement signed between US and EU|Business|Challenges the proper classification of economic or trade texts into the 'Business' category\.|
|NASA announces new mission to Mars|Sci/Tech|Confirms that scientific announcements are correctly classified under 'Sci/Tech'\.|
|US tightens regulations on tech industry|Business|Ensures the output category does not deviate to multiple words or an incorrect category, testing precision in a single\-word output\.|
|Earthquake shakes major city, causing substantial damage|World|Checks if the system outputs only the exact category 'World' without additional words, verifying strict adherence to output format\.|
|Launch of new AI technology revolutionizes industry trends|Sci/Tech|Evaluates the precise single\-word output needed for tech\-related content without deviating from specified categories\.|
|National hockey team wins gold at championships|Sports|Ensures the software provides just the output category 'Sports' without any descriptive text\.|
|Advancements in quantum computing discussed at conference|Sci/Tech|Validates that the result is only 'Sci/Tech' as a single word, confirming the absence of explanation\.|
|Global leaders meet to discuss climate initiatives|World|Checks if the system maintains restraints on explanatory output by only using the category 'World'\.|
|This is not a typical news article|Not classified|Ensures that content not falling into any of the four defined categories is properly unclassified\.|
|Random string of text unrelated to predefined categories|Not classified|Tests that irrelevant or non\-news content correctly receives a 'Not classified' output\.|
|Poetry and literature appreciation workshop held this weekend|Not classified|Confirms that non\-relevant text types like cultural events are accurately not categorized\.|
|Concert featuring various artists brings city to life|Cultural Event|Checks the software’s ability to correctly identify events that are unrelated to predefined categories into something broader and descriptive\.|
|Local farmers' market opens for the summer season|Community News|Ensures multi\-word categories are given for non\-classifiable local community stories\.|
|Art exhibition showcases modern paintings in downtown gallery|Arts and Culture|Evaluates the software's response to non\-predefined categories with broader descriptive outputs\.|
|Artificial intelligence reshapes industry: categorized as Sci/Tech due to innovation|Sci/Tech: This falls under Sci/Tech due to the innovative aspect|Tests that the correct categorization includes an explanatory note, breaking the single\-word rule\.|
|Record\-breaking solar\-powered car race held: categorized as Sports|Sports: The event is categorized as Sports based on the competitive nature|Ensures the classification is supplemented with a reason explaining the choice\.|
|Economic summit impacts global market: categorized as Business|Business: This is categorized as Business because of the impact on the market|Validates the inclusion of explanation alongside correct categorization\.|

### [baseline_tests.txt](./baseline_tests.txt)

`````txt
text: "NASA's new rover successfully lands on Mars for groundbreaking mission"
===
text: "The World Bank raises forecast for global economic growth in 2023"
===
text: "Olympic Games set to take place in Paris with new sports added to the lineup"
===
text: "Google unveils AI technology to improve search engine functionality"
===
text: "Protests erupt in global capitals over climate change inaction"
===
text: "Tesla's stock prices surge after announcement of new electric truck model"
===
text: "Samsung announces its latest smartphone with advanced camera features"
===
text: "Germany wins the FIFA World Cup in a thrilling final match"
===
text: "Astronomers discover a potentially habitable exoplanet in nearby star system"
===
text: "European Union prepares to implement stricter data privacy regulations"
===
text: "Novak Djokovic clinches record-breaking Grand Slam title"
===
text: "Facebook faces scrutiny over its management of user data privacy concerns"
===
text: "Amazon reports record profits amid increase in online shopping trends"
===
text: "Chinese lunar mission returns to Earth with samples from the moon's far side"
===
text: "Barcelona beats Real Madrid to win El Clasico in dramatic fashion"
===
text: "New study reveals the economic impact of telecommuting post-pandemic"
===
text: "Russia and Ukraine begin peace talks to resolve ongoing conflict"
===
text: "Apple unveils new mixed reality headset at annual developer conference"
`````
