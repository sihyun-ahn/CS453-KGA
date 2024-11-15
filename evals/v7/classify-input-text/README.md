## classify-input-text ([json](./evals\v7\classify-input-text/report.json))

- 4 rules
- 4 inverse rules
- 48 tests, 24 baseline tests

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
The input is a piece of text intended to be classified into a specific news category.
The input must be a string.
The input must represent a news article or news headline that falls into one of the specified categories: World, Sports, Business, Sci/Tech.
There are no restrictions on the length of the input string.
The input text can be any news-related topic without the need to match exactly the examples provided.
The input can contain information related to any real-world events corresponding to the defined categories.
The input should be in a language that the chatbot is trained to process correctly, typically English, unless specified otherwise.
`````


### [rules.txt](./rules.txt)

`````txt
1: The output must classify a given input text into one and only one of the following specific categories: World, Sports, Business, or Sci/Tech. 
2: The classification must be directly relevant to the content of the input text without any ambiguity or overlap between categories.
3: The output must only include the name of the category without any additional text, explanation, or context. 
4: The chosen category for classification must be clearly representational and consistent with the core subject matter of the input text as it fits within the provided category definitions.
`````


### [inverse_rules.txt](./inverse_rules.txt)

`````txt
5: The output must classify a given input text into none of the following specific categories: World, Sports, Business, or Sci/Tech.
6: The classification must be unrelated or ambiguous to the content of the input text, allowing overlap between categories.
7: The output should include additional text, explanation, or context rather than just the name of the category.
8: The chosen category for classification must not clearly represent or be consistent with the core subject matter of the input text as it fits within the provided category definitions.
`````


### [tests.csv](./tests.csv)

|testinput|expectedoutput|reasoning|
|-|-|-|
|UN condemns North Korea's latest missile test|World|The input is clearly related to a global political issue, fitting the 'World' category\. There should be no ambiguity in choosing the appropriate category\.|
|CapitalOne announces a 20% increase in quarterly earnings|Business|This clearly pertains to financial matters and corporate earnings, which should be classified under 'Business'\. The software must categorize it without overlap\.|
|NASA's Mars rover sends back revolutionary images|Sci/Tech|The article focuses on an aspect of science and technology and must be classified as such, ruling out other categories entirely\.|
|Champions League final ends in stalemate, teams prepare for rematch|Sports|The text is directly relevant to sports, and the classification should reflect this without cross\-category confusion\.|
|Global economies brace for fluctuations as oil prices soar|Business|The content directly pertains to economic activities influenced by global factors\. The classification should be unmistakably business\-related\.|
|Breakthrough in quantum computing promises to change tech landscape|Sci/Tech|The article focuses on an advancement in technology, clearly fitting within the Sci/Tech category without ambiguity\.|
|Google reveals out\-of\-this\-world holiday doodles||No additional commentary should appear in the output—just the category 'Sci/Tech' should suffice here, since the text deals with a tech company's creative showcase\.|
|Political tensions rise over disputed territories||The output should only be 'World' for this text, capturing political conflicts worldwide without added information\.|
|Olympic records shattered on day one of competition||Only 'Sports' should be returned, directly encapsulating the essence of the input without further elaboration\.|
|Fed cuts interest rates to avoid economic recession|Business|An economic policy move by a central bank fits squarely within the 'Business' category\. Proper classification should mirror the subject matter's scope\.|
|Technology giants clash over new AI regulations|Sci/Tech|This fits well within Sci/Tech due to the regulatory focus on AI technologies\. It should avoid misclassification\.|
|World Health Organization warns of new pandemic threats|World|A topic with worldwide significance must be accurately classified under 'World' to reflect its global importance\.|
|Breaking: Tornado ravages Midwest, thousands displaced||As a non\-covered category \(disasters\) under the provided schema, 'none' should be chosen to align with rule 5's exceptions\.|
|Movie stars flock to red carpet at Cannes Festival||The entertainment aspect doesn't fit defined categories like 'World', 'Sports', 'Business', or 'Sci/Tech'\. Correct classification respects rule 5\.|
|New culinary trend takes urban kitchens by storm||Food and culinary trends are outside the defined categories, emphasizing the application of rule 5 by leaving the classification blank\.|
|Fashion industry embraces sustainable practices for a better future||Sustainable practices in fashion don't fit directly into any category, creating deliberate room for overlap as per rule 6\.|
|Mountaineers prepare for ascent of K2 amidst challenging conditions||This climbing news could ambiguously span 'Sports' or 'World', challenging clear classification under rule 6\.|
|Celebrity couple's breakup dominates news headlines||As a purely entertainment\-focused text, neither a clear World, Sports, Business, nor Sci/Tech classification is warranted per rule 6\.|
|Scientists discover new exoplanet orbiting distant star|Sci/Tech \- An exciting discovery in space science|Here, an explanation follows the primary category, contravening rule 7's requirement for minimal output\.|
|Euros crisis: EU leaders convene extraordinary summit|World \- A summit focusing on economic solutions|This includes additional context beyond 'World', which does not adhere to rule 7 requiring a single category\.|
|Historic match sees underdog triumph in final minutes|Sports \- Such dramatic cameos redefine team dynamics|The categorization here extends beyond 'Sports', violating rule 7 by offering expanded input\.|
|Global art fair showcases emerging talents from Latin America||This input is related to art, which does not clearly fit into the specified categories\. No proper category applies as per rule 8\.|
|Startups revolutionize ecommerce with new tech solutions||Although related to business and technology, the startup scene's focus may blur precise categorization under rule 8\.|
|Political satire highlights social issues in viral video||The ambiguity surrounding satire and social issues leaves no clear category definition, following the guideline of rule 8 for non\-conformance\.|

### [baseline_tests.txt](./baseline_tests.txt)

`````txt
text: "Olympics 2024 set to break records with new sporting events"
===
text: "Global markets react positively to Federal Reserve's interest rate decision"
===
text: "NASA announces discovery of extraterrestrial life on Mars"
===
text: "Chancellor announces economic measures to tackle inflation"
===
text: "Google reveals major advancements in AI technology"
===
text: "Tensions rise as peace talks fail in the Middle East conflict"
===
text: "World Health Organization declares new COVID-19 variant a global threat"
===
text: "Record-breaking heatwave impacts Europe and Asia"
===
text: "NBA Finals: Lakers defeat Warriors in an intense final game"
===
text: "Tesla's new electric truck features autonomous driving capabilities"
===
text: "Annual G7 summit focuses on global economic recovery post-pandemic"
===
text: "Scientists develop sustainable method to produce hydrogen fuel"
===
text: "China announces major policy change in digital currency regulation"
===
text: "Football World Cup 2026 announced to host new qualifying format"
===
text: "Breakthrough in cancer research offers new hope for patients"
===
text: "UN Security Council debates new sanctions following international crisis"
===
text: "Cybersecurity breaches rise with increasing digitization of industries"
===
text: "Elon Musk unveils plan for Mars colonization by 2030"
===
text: "IMF forecasts strong economic growth for the next fiscal year"
===
text: "Wimbledon 2023: Youngster emerges as new tennis champion"
===
text: "Launch of first fully quantum-encrypted communication network"
===
text: "International trade talks conclude with landmark agreements"
===
text: "Scientific community races against time to stop climate tipping point"
===
text: "Developers introduce groundbreaking virtual reality platform at tech summit"
`````
