## [llama2-example](samples/text-classification/llama2-example.prompty)


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
The input must be a text string.  
The input text should resemble a news article headline or a brief summary.
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
`````csv
Rule ID, Test ID, Test Input, Expected Output, Reasoning
1, 1, "Nations agree to nuclear disarmament talks amid rising tensions", "World", "Tests if the software classifies geopolitical news correctly into the World category."
1, 2, "Tesla announces breakthrough in battery technology", "Sci/Tech", "Determines if advancements in technology are accurately categorized under Sci/Tech."
1, 3, "Olympics postponed due to global pandemic", "Sports", "Assesses if a major sporting event's status is recognized as Sports news."
2, 1, "Global markets react to new trade policies", "Business", "Checks if the software outputs only the category name without explanations for a Business-related input."
2, 2, "Scientists discover new exoplanet with potential for life", "Sci/Tech", "Ensures the output is limited to the category name for a Sci/Tech headline."
2, 3, "Spanish football league season resumes after delay", "Sports", "Verifies the software provides just the Sports category name without additional commentary."
3, 1, "World leaders gather for climate summit in Paris", "World", "Evaluates if the software associates the input correctly with World, considering the context of global summits."
3, 2, "Tech companies report record earnings amid digital boom", "Business", "Tests if the context of economic reporting is correctly linked to Business."
3, 3, "New study reveals Earth's magnetic field weakening", "Sci/Tech", "Confirms the software's ability to relate scientific findings accurately to Sci/Tech."
`````
