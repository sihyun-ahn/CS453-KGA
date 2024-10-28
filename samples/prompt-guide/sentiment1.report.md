## [sentiment1](samples/prompt-guide/sentiment1.prompty) ([json](./sentiment1.report.json))


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
The input is a piece of text.  
The input can be any string of characters.  
The input has no specific length restriction.
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

|Rule ID|Test ID|Test Input|Expected Output|Reasoning|
|-|-|-|-|-|
|1|1|I love this beautiful day\!|Sentiment: positive|Tests positive sentiment classification with clear positive expression\.|
|1|2|The weather is terrible and I hate it\.|Sentiment: negative|Tests negative sentiment classification with clear negative expression\.|
|1|3|This is a book\.|Sentiment: neutral|Tests neutral sentiment classification with an objective statement\.|
|2|1|What a wonderful experience|positive|Ensures that the label 'Sentiment:' is missing, testing improper output format\.|
|2|2|I really dislike this situation|negative|Checks absence of 'Sentiment:' label, demonstrating incorrect labeling format\.|
|2|3|The event was okay|neutral|Verifies lack of 'Sentiment:' label, highlighting labeling issue with neutral statement\.|
|3|1|I feel happy about the results|Sentiment: This denotes positivity|Tests incorrect classification by using a sentence rather than a single word\.|
|3|2|The meal was not satisfying|Sentiment: This is negative|Challenges classification by requiring a sentence instead of a single word\.|
|3|3|It's just an ordinary day|Sentiment: Neutrality is observed|Examines the response when a sentence is used for neutral classification\.|
|4|1|Amazing performance|Sentiment: neutral|Tests incorrect classification by expecting a neutral classification for positive input\.|
|4|2|I am very upset|Sentiment: positive|Verifies incorrect classification by expecting a positive classification for negative input\.|
|4|3|It's raining|Sentiment: negative|Challenges classification by expecting a negative output for a neutral statement\.|
|5|1|I am thrilled\!|Thrilled with excitement\!|Checks improper formatting without 'Sentiment:' and classification in sentence form\.|
|5|2|This is disappointing|Disappointing results|Verifies improper format by lacking 'Sentiment:' and using a sentence\.|
|5|3|A typical day|Just another day|Tests incorrect sentence\-based feedback without standard labeling\.|