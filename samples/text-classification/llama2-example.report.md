## llama2-example ([json](./llama2-example.report.json))


### [prompty](./llama2-example.prompty)

`````md

---
name: Classify input text
description: Given an input text, classify it into a specific category.
source: How to use Llama2 tutorial for text classification
url: https://pupuweb.com/how-use-llama-2-text-classification-tasks/
inputs: 
  text:
    type: string
samples:
    - text: "UN chief urges action on climate change as report warns of 'catastrophe'"
---
system:
A news article can be classified as one of the following categories: World, Sports, Business, Sci/Tech.
Examples:
- World: "UN chief urges action on climate change as report warns of 'catastrophe'"
- Sports: "Ronaldo scores twice in Manchester United return"
- Business: "Apple delays plan to scan iPhones for child abuse images"
- Sci/Tech: "SpaceX launches first all-civilian crew into orbit"'
user:
Based on these categories, classify this news article: {{text}}
    
`````


### [intent.txt](./llama2-example.intent.txt)

`````txt
Classify input text into a specific category.
`````


### [input_spec.txt](./llama2-example.input_spec.txt)

`````txt
The input must be a string containing text that represents a news article.  
The input text should be related to one of the specified categories: World, Sports, Business, or Sci/Tech.  
There are no restrictions on the length of the input text.  
The input text must be in a format that can clearly be associated with a news article.  
`````


### [rules.txt](./llama2-example.rules.txt)

`````txt
The output must classify the input text into one of the following categories: World, Sports, Business, or Sci/Tech.
The output must consist of only one category name, which is one of the following: World, Sports, Business, or Sci/Tech.
The output must not contain any additional information, explanation, or commentary beyond the category name.
`````


### [inverse_rules.txt](./llama2-example.inverse_rules.txt)

`````txt
The output must classify the input text into any category except World, Sports, Business, or Sci/Tech.  
The output must consist of more than one category name and include at least one not listed: World, Sports, Business, or Sci/Tech.  
The output must contain additional information, explanation, or commentary beyond the category name.  
`````


### [baseline_tests.txt](./llama2-example.baseline_tests.txt)

`````txt
text: "NASA's new telescope captures stunning images of distant galaxies" 
===
text: "Stock markets rally as investor confidence grows amid economic recovery" 
===
text: "Olympics postponed due to global pandemic concerns"
`````


### [tests.csv](./llama2-example.tests.csv)

|Rule ID|Test ID|Test Input|Expected Output|Reasoning|
|-|-|-|-|-|
|1|1|NASA announces new mission to explore Jupiter's moons|Sci/Tech|This test evaluates if the text is correctly classified as Sci/Tech due to the scientific context\.|
|1|2|Olympics 2024: Countries gear up for the global sporting event|Sports|This input is a typical sports\-related article, testing if it is classified as Sports\.|
|1|3|Global markets react to trade tensions between US and China|Business|This business\-related input assesses the software's ability to classify economic news\.|
|2|1|Breakthrough in renewable energy as solar efficiency increases|Sci/Tech|Tests if the output consists only of the single category 'Sci/Tech'\.|
|2|2|Premier League results: Chelsea defeats Arsenal|Sports|Ensures that only 'Sports' is returned for a sports\-related article\.|
|2|3|World leaders discuss climate action at summit|World|Checks if the single category 'World' is returned for global news\.|
|3|1|Innovations in AI explained: How technology is changing industries|Sci/Tech|Verifies that no additional commentary is included in the output beyond 'Sci/Tech'\.|
|3|2|Economic outlook for 2023: Experts weigh in|Business|Ensures the output is constrained to 'Business' with no extra commentary\.|
|3|3|Champions League: Analysis of the quarter\-final matchups|Sports|Confirms that only 'Sports' is returned, with no explanation or commentary\.|
|4|1|Ancient ruins discovered in unexplored regions|Other|Tests if the software can classify an input into a category not listed\.|
|4|2|The rising trend of veganism: A cultural shift|Other|Ensures classification into a different category, assessing handling of niche topics\.|
|4|3|Exploring the mysteries of the deep ocean|Other|Evaluates classification beyond the standard categories for unique topics\.|
|5|1|The impact of AI on modern warfare: A dual perspective|Sci/Tech, Other|Tests if the output includes more than one category by including 'Other'\.|
|5|2|Merging art and technology: The future of creativity|Sci/Tech, Other|Challenges the classification system by requiring multiple categories\.|
|5|3|Economics and ethics: Balancing profit and social responsibility|Business, Other|Assesses if the software can output multiple categories with 'Other'\.|
|6|1|Tech giant unveils ambitious plan: What does it mean for consumers?|Business \- Focus on consumer impact|Tests if additional commentary is incorrectly included\.|
|6|2|World Cup 2022: The underdogs and their journey|Sports \- Analysis included|Ensures no extra explanation is added to the category name\.|
|6|3|New policy changes: A global perspective with expert insights|World \- Expert insights|Verifies that no additional information follows the category 'World'\.|

### [test_evals.csv](./llama2-example.test_evals.csv)

|id|model|rule|input|evaluation|
|-|-|-|-|-|
|7dc42d7|gpt\-4o\-2024\-08\-06|The output must classify the input text into one of the following categories: World, Sports, Business, or Sci/Tech\.|NASA announces new mission to explore Jupiter's moons|Category: Science/Space Exploration|
|72f2a24|gpt\-4o\-2024\-08\-06|The output must classify the input text into one of the following categories: World, Sports, Business, or Sci/Tech\.|Olympics 2024: Countries gear up for the global sporting event|Category: Sports News|
|0ff44a8|gpt\-4o\-2024\-08\-06|The output must classify the input text into one of the following categories: World, Sports, Business, or Sci/Tech\.|Global markets react to trade tensions between US and China|Category: Economics/Business|
|8072dca|gpt\-4o\-2024\-08\-06|The output must consist of only one category name, which is one of the following: World, Sports, Business, or Sci/Tech\.|Breakthrough in renewable energy as solar efficiency increases|Category: Science and Technology News|
|2470041|gpt\-4o\-2024\-08\-06|The output must consist of only one category name, which is one of the following: World, Sports, Business, or Sci/Tech\.|Premier League results: Chelsea defeats Arsenal|Category: Sports News|
|b111012|gpt\-4o\-2024\-08\-06|The output must consist of only one category name, which is one of the following: World, Sports, Business, or Sci/Tech\.|World leaders discuss climate action at summit|Category: News/Politics|
|b57e03b|gpt\-4o\-2024\-08\-06|The output must not contain any additional information, explanation, or commentary beyond the category name\.|Innovations in AI explained: How technology is changing industries|Category: Technology|
|0f6f932|gpt\-4o\-2024\-08\-06|The output must not contain any additional information, explanation, or commentary beyond the category name\.|Economic outlook for 2023: Experts weigh in|Category: Economy/Economic Analysis|
|969f60b|gpt\-4o\-2024\-08\-06|The output must not contain any additional information, explanation, or commentary beyond the category name\.|Champions League: Analysis of the quarter\-final matchups|Category: Sports Analysis|
|16fdb69|gpt\-4o\-2024\-08\-06|The output must classify the input text into any category except World, Sports, Business, or Sci/Tech\.|Ancient ruins discovered in unexplored regions|Category: Archaeology|
|1fdc787|gpt\-4o\-2024\-08\-06|The output must classify the input text into any category except World, Sports, Business, or Sci/Tech\.|The rising trend of veganism: A cultural shift|Category: Lifestyle & Culture|
|152733e|gpt\-4o\-2024\-08\-06|The output must classify the input text into any category except World, Sports, Business, or Sci/Tech\.|Exploring the mysteries of the deep ocean|Category: Nature/Science Exploration|
|f3ab788|gpt\-4o\-2024\-08\-06|The output must consist of more than one category name and include at least one not listed: World, Sports, Business, or Sci/Tech\.|The impact of AI on modern warfare: A dual perspective|Category: Technology / Military|
|36bfa78|gpt\-4o\-2024\-08\-06|The output must consist of more than one category name and include at least one not listed: World, Sports, Business, or Sci/Tech\.|Merging art and technology: The future of creativity|Category: Art and Technology|
|d9c24b5|gpt\-4o\-2024\-08\-06|The output must consist of more than one category name and include at least one not listed: World, Sports, Business, or Sci/Tech\.|Economics and ethics: Balancing profit and social responsibility|Category: Business and Ethics|
|380a97b|gpt\-4o\-2024\-08\-06|The output must contain additional information, explanation, or commentary beyond the category name\.|Tech giant unveils ambitious plan: What does it mean for consumers?|Category: Technology News|
|aabcde6|gpt\-4o\-2024\-08\-06|The output must contain additional information, explanation, or commentary beyond the category name\.|World Cup 2022: The underdogs and their journey|Category: Sports|
|ab6a398|gpt\-4o\-2024\-08\-06|The output must contain additional information, explanation, or commentary beyond the category name\.|New policy changes: A global perspective with expert insights|Category: News|

### [test_results.csv](./llama2-example.test_results.csv)

|id|promptid|model|error|input|output|
|-|-|-|-|-|-|
|7dc42d7|8a5ddcb|gpt\-4o\-mini||NASA announces new mission to explore Jupiter's moons|The article "NASA announces new mission to explore Jupiter's moons" can be classified as \*\*Sci/Tech\*\*\.|
|72f2a24|8a5ddcb|gpt\-4o\-mini||Olympics 2024: Countries gear up for the global sporting event|\*\*Category: Sports\*\*|
|0ff44a8|8a5ddcb|gpt\-4o\-mini||Global markets react to trade tensions between US and China|Business|
|8072dca|8a5ddcb|gpt\-4o\-mini||Breakthrough in renewable energy as solar efficiency increases|Sci/Tech: "Breakthrough in renewable energy as solar efficiency increases"|
|2470041|8a5ddcb|gpt\-4o\-mini||Premier League results: Chelsea defeats Arsenal|Sports: "Premier League results: Chelsea defeats Arsenal"|
|b111012|8a5ddcb|gpt\-4o\-mini||World leaders discuss climate action at summit|Category: World|
|b57e03b|8a5ddcb|gpt\-4o\-mini||Innovations in AI explained: How technology is changing industries|The article "Innovations in AI explained: How technology is changing industries" can be classified as \*\*Sci/Tech\*\*\.|
|0f6f932|8a5ddcb|gpt\-4o\-mini||Economic outlook for 2023: Experts weigh in|The news article can be classified as: \*\*Business\*\*\.|
|969f60b|8a5ddcb|gpt\-4o\-mini||Champions League: Analysis of the quarter\-final matchups|Sports|
|16fdb69|8a5ddcb|gpt\-4o\-mini||Ancient ruins discovered in unexplored regions|The news article "Ancient ruins discovered in unexplored regions" can be classified as \*\*Sci/Tech\*\*\.|
|1fdc787|8a5ddcb|gpt\-4o\-mini||The rising trend of veganism: A cultural shift|The news article "The rising trend of veganism: A cultural shift" can be classified as \*\*World\*\*\.|
|152733e|8a5ddcb|gpt\-4o\-mini||Exploring the mysteries of the deep ocean|This news article can be classified as \*\*Sci/Tech\*\*\.|
|f3ab788|8a5ddcb|gpt\-4o\-mini||The impact of AI on modern warfare: A dual perspective|The article "The impact of AI on modern warfare: A dual perspective" can be classified as \*\*Sci/Tech\*\*\.|
|36bfa78|8a5ddcb|gpt\-4o\-mini||Merging art and technology: The future of creativity|The article "Merging art and technology: The future of creativity" can be classified as \*\*Sci/Tech\*\*\.|
|d9c24b5|8a5ddcb|gpt\-4o\-mini||Economics and ethics: Balancing profit and social responsibility|The news article can be classified as \*\*Business\*\*\.|
|380a97b|8a5ddcb|gpt\-4o\-mini||Tech giant unveils ambitious plan: What does it mean for consumers?|Business: "Tech giant unveils ambitious plan: What does it mean for consumers?"|
|aabcde6|8a5ddcb|gpt\-4o\-mini||World Cup 2022: The underdogs and their journey|The news article can be classified as: \*\*Sports\*\*\.|
|ab6a398|8a5ddcb|gpt\-4o\-mini||New policy changes: A global perspective with expert insights|The news article can be classified as \*\*World\*\*\.|