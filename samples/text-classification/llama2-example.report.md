## [llama2-example](samples/text-classification/llama2-example.prompty) ([json](./llama2-example.report.json))


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


### [input_spec.txt](./llama2-example.input_spec.txt)

`````txt
The input must be a string containing text that represents a news article.  
The input text should be related to one of the specified categories: World, Sports, Business, or Sci/Tech.  
There are no restrictions on the length of the input text.  
The input text must be in a format that can clearly be associated with a news article.  
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