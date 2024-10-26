## [sentiment1](samples/prompt-guide/sentiment1.prompty) ([JSON](./sentiment1.report.json))


### [prompty](./sentiment1.prompty)

`````md
---
name: "Analyze Sentiment"
description: "Analyzes the sentiment of a given text"
source: Prompt examples from the website
url: https://www.promptingguide.ai/prompts/classification/sentiment
sample:
    input: "I love this movie!"
inputs:
    input:
        type: "string"
---
system:
Classify the text into neutral, negative, or positive
user:
Text: {{input}}
assistant:
Sentiment:

`````


### [rules.txt](./sentiment1.rules.txt)

`````txt
The output must classify the text as "neutral," "negative," or "positive."
The output must be labeled with the word "Sentiment:" followed by the classification.
The classification must be a single word that denotes the sentiment category.
`````


### [inverse_rules.txt](./sentiment1.inverse_rules.txt)

`````txt
The output must not classify the text as "neutral," "negative," or "positive."
The output must not be labeled with the word "Sentiment:" followed by the classification.
The classification must be a sentence that does not denote the sentiment category.
`````


### [input_spec.txt](./sentiment1.input_spec.txt)

`````txt
The input must be a text passage.  
The text can contain any characters, including letters, numbers, and punctuation.
`````


### [baseline_tests.txt](./sentiment1.baseline_tests.txt)

`````txt
Text: "I am extremely happy with the excellent service provided. Thank you!"

===
Text: "The product is okay, but it could be better."

===
Text: "I am very disappointed with the quality of the item. It broke within a week."
`````


### [tests.csv](./sentiment1.tests.csv)

`````csv
Rule ID, Test ID, Test Input, Expected Output, Reasoning
1, 1, "The weather today is average, not too bad but not great either.", "Sentiment: neutral", "Tests the ability to correctly classify text with no strong sentiment as neutral."
1, 2, "I am feeling extremely happy and grateful for everything!", "Sentiment: positive", "Evaluates positive sentiment recognition in text with clear positive words."
1, 3, "This is the worst meal I've ever had.", "Sentiment: negative", "Assesses the software's capability to identify negative sentiment in strongly negative statements."

2, 1, "Movie was just okay, nothing special or amazing.", "Sentiment: neutral", "Ensures that the output is labeled correctly with 'Sentiment:' followed by the classification."
2, 2, "I am thrilled with the new job offer!", "Sentiment: positive", "Confirms the correct labeling format 'Sentiment:' for positive sentiments."
2, 3, "Feeling very disappointed with the service.", "Sentiment: negative", "Verifies that the output adheres to the labeling requirement with the correct prefix and classification."

3, 1, "The show was an absolute blast!", "Sentiment: positive", "Checks for a single-word classification and correct sentiment detection."
3, 2, "Not impressed by the team's performance.", "Sentiment: negative", "Evaluates whether the classification is a single word and accurately reflects the sentiment."
3, 3, "It's a typical day, nothing out of the ordinary.", "Sentiment: neutral", "Tests for single-word classification and neutral sentiment recognition."
`````
