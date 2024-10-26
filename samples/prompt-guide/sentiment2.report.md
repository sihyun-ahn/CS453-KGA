## [sentiment2](samples/prompt-guide/sentiment2.prompty) ([JSON](./sentiment2.report.json))


### [prompty](./sentiment2.prompty)

`````md
---
name: "Analyze Sentiment Multishot"
description: "Analyzes the sentiment of a given text with multishot examples"
source: Prompt examples from the website
url: https://www.promptingguide.ai/prompts/classification/sentiment
sample:
    input: "This is not good."
inputs:
    input:
        type: "string"
---
system:
This is awesome! // Negative
This is bad! // Positive
Wow that movie was rad! // Positive
What a horrible show! //
user:
{{input}} // 
`````


### [rules.txt](./sentiment2.rules.txt)

`````txt
The output must identify "This is awesome!" as Negative.
The output must identify "This is bad!" as Positive.
The output must identify "Wow that movie was rad!" as Positive.
The output must identify "What a horrible show!" without any classification.
`````


### [inverse_rules.txt](./sentiment2.inverse_rules.txt)

`````txt
"This is awesome!" must be identified as Positive.
"This is bad!" must be identified as Negative.
"Wow that movie was rad!" must be identified as Negative.
"What a horrible show!" must be identified as Negative.
`````


### [input_spec.txt](./sentiment2.input_spec.txt)

`````txt
The input is a text string that represents a sentence or phrase for sentiment analysis.
The input can consist of any combination of words or phrases.
`````


### [baseline_tests.txt](./sentiment2.baseline_tests.txt)

`````txt
input: "The service was excellent, but the food was terrible." ===
input: "I am extremely happy with the results, could not have asked for more!" ===
input: "The weather today is just average, not too bad, not too great."
`````


### [tests.csv](./sentiment2.tests.csv)

`````csv
Rule ID, Test ID, Test Input, Expected Output, Reasoning
1, 1, "This is awesome!", "Negative", "Tests that the input 'This is awesome!' is correctly identified as Negative, following the rule."
1, 2, "I think this is awesome!", "Negative", "Ensures variations like 'I think' still result in the correct Negative classification."
1, 3, "Awesome, this is!", "Negative", "Checks if the input order change affects the identification as Negative."
2, 1, "This is bad!", "Positive", "Tests that the input 'This is bad!' is correctly identified as Positive, following the rule."
2, 2, "Really, this is bad!", "Positive", "Verifies that the addition of 'Really' doesn't affect Positive classification."
2, 3, "Bad, this is!", "Positive", "Checks if changing word order maintains Positive identification."
3, 1, "Wow that movie was rad!", "Positive", "Tests that 'Wow that movie was rad!' is correctly identified as Positive, following the rule."
3, 2, "Wow, rad was that movie!", "Positive", "Confirms rearranged words still produce Positive classification."
3, 3, "Wow, that movie was so rad!", "Positive", "Verifies that adding 'so' maintains Positive identification."
4, 1, "What a horrible show!", "", "Tests that 'What a horrible show!' results in no classification, adhering to the rule."
4, 2, "Horrible show, what a!", "", "Ensures the reordering doesn't lead to classification, following the rule."
4, 3, "What an absolutely horrible show!", "", "Checks if adding 'absolutely' maintains the rule of no classification."
`````
