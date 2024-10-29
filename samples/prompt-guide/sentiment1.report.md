## sentiment1 ([json](./sentiment1.report.json))


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


### [intent.txt](./sentiment1.intent.txt)

`````txt
Classify text sentiment as neutral, negative, or positive.
`````


### [input_spec.txt](./sentiment1.input_spec.txt)

`````txt
The input is a piece of text.  
The input can be any string of characters.  
The input has no specific length restriction.
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

### [test_evals.csv](./sentiment1.test_evals.csv)

|Rule ID|Test ID|Test Input|Expected Output|Reasoning|evaluation|
|-|-|-|-|-|-|
|1|1|I love this beautiful day\!|Sentiment: positive|Tests positive sentiment classification with clear positive expression\.|Sentiment: positive|
|1|2|The weather is terrible and I hate it\.|Sentiment: negative|Tests negative sentiment classification with clear negative expression\.|Sentiment: negative|
|1|3|This is a book\.|Sentiment: neutral|Tests neutral sentiment classification with an objective statement\.|Sentiment: neutral|
|2|1|What a wonderful experience|positive|Ensures that the label 'Sentiment:' is missing, testing improper output format\.|Sentiment: positive|
|2|2|I really dislike this situation|negative|Checks absence of 'Sentiment:' label, demonstrating incorrect labeling format\.|Sentiment: negative|
|2|3|The event was okay|neutral|Verifies lack of 'Sentiment:' label, highlighting labeling issue with neutral statement\.|Sentiment: neutral|
|3|1|I feel happy about the results|Sentiment: This denotes positivity|Tests incorrect classification by using a sentence rather than a single word\.|Sentiment: positive|
|3|2|The meal was not satisfying|Sentiment: This is negative|Challenges classification by requiring a sentence instead of a single word\.|Sentiment: Negative|
|3|3|It's just an ordinary day|Sentiment: Neutrality is observed|Examines the response when a sentence is used for neutral classification\.|Sentiment: neutral|
|4|1|Amazing performance|Sentiment: neutral|Tests incorrect classification by expecting a neutral classification for positive input\.|Sentiment: positive|
|4|2|I am very upset|Sentiment: positive|Verifies incorrect classification by expecting a positive classification for negative input\.|Sentiment: negative|
|4|3|It's raining|Sentiment: negative|Challenges classification by expecting a negative output for a neutral statement\.|Sentiment: Neutral|
||||||Sentiment: Positive|
||||||Negative|
||||||Sentiment: Neutral|

### [test_results.csv](./sentiment1.test_results.csv)

|id|promptid|model|input|output|
|-|-|-|-|-|
|793804e|6b785c2|gpt\-4o\-mini|I love this beautiful day\!|Sentiment: Positive|
|bf56cfe|6b785c2|gpt\-4o\-mini|The weather is terrible and I hate it\.|Sentiment: Negative|
|badbbff|6b785c2|gpt\-4o\-mini|This is a book\.|Sentiment: Neutral|
|5a96cb8|6b785c2|gpt\-4o\-mini|What a wonderful experience|Sentiment: Positive|
|56bf948|6b785c2|gpt\-4o\-mini|I really dislike this situation|Sentiment: Negative|
|2be6731|6b785c2|gpt\-4o\-mini|The event was okay|Sentiment: Neutral|
|36c0fef|6b785c2|gpt\-4o\-mini|I feel happy about the results|Sentiment: Positive|
|0687ba0|6b785c2|gpt\-4o\-mini|The meal was not satisfying|Sentiment: Negative|
|b355b98|6b785c2|gpt\-4o\-mini|It's just an ordinary day|Sentiment: Neutral|
|add50a9|6b785c2|gpt\-4o\-mini|Amazing performance|Sentiment: Positive|
|fdccccd|6b785c2|gpt\-4o\-mini|I am very upset|Sentiment: Negative|
|6807cf1|6b785c2|gpt\-4o\-mini|It's raining|Sentiment: Neutral|
|e65a79d|6b785c2|gpt\-4o\-mini|I am thrilled\!|Sentiment: Positive|
|8529fb4|6b785c2|gpt\-4o\-mini|This is disappointing|Sentiment: Negative|
|d8fd4af|6b785c2|gpt\-4o\-mini|A typical day|Sentiment: Neutral|