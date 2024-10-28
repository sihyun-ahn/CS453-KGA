## [sentiment2](samples/prompt-guide/sentiment2.prompty) ([json](./sentiment2.report.json))


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
The input can be any text string.  
The input can include statements or expressions of opinions.  
The input can be a positive or negative sentiment.  
The input can include punctuation and exclamations.  
The input may be about movies or shows.  
The input can be any length.
`````


### [baseline_tests.txt](./sentiment2.baseline_tests.txt)

`````txt
input: "The service was excellent, but the food was terrible." ===
input: "I am extremely happy with the results, could not have asked for more!" ===
input: "The weather today is just average, not too bad, not too great."
`````


### [tests.csv](./sentiment2.tests.csv)

|Rule ID|Test ID|Test Input|Expected Output|Reasoning|
|-|-|-|-|-|
|1|1|This is awesome movie\!|Negative|Tests if the system incorrectly identifies positive sentiment as negative\. Adheres to input specification of sentiment and movie context\.|
|1|2|Awesome show with flaws\!|Negative|Challenges the software to detect 'awesome' within a mixed sentiment statement\. Adheres to input specification of sentiment and show context\.|
|1|3|This is awesome\!|Negative|Directly tests the rule to see if 'This is awesome\!' is identified as negative\. Simple and adheres to input specification\.|
|2|1|This is bad\!|Positive|Directly tests the rule to see if 'This is bad\!' is actually identified as positive\. Clear input satisfying specification\.|
|2|2|The bad movie was good\!|Positive|Intricate sentiment analysis required\. Adheres to input specification with mixed sentiment and movie context\.|
|2|3|Bad show but I liked it\!|Positive|Challenges the software with a complex opinion\. Follows input specification on sentiment and show context\.|
|3|1|Wow that movie was rad\!|Positive|Directly tests the rule to confirm output for this exact positive expression\. Matches input specification\.|
|3|2|Wow, rad movie\!|Positive|Tests software's ability to recognize variations of the sentiment\. Adheres to input specification of sentiment and movie context\.|
|3|3|What a rad show\!|Positive|Verifies positive sentiment detection in a slightly altered input\. Adheres to input specification of sentiment and show context\.|
|4|1|What a horrible show\!||Directly tests the rule to see if 'What a horrible show\!' is classified correctly as no classification\. Follows input specification\.|
|4|2|A horrible movie\!||Challenges the software to not classify with a similar sentiment statement\. Adheres to input specification of sentiment and movie context\.|
|4|3|What a show\!||Tests how the software handles neutral inputs\. Meets input specifications on length and punctuation\.|
|5|1|This is awesome\!|Positive|Directly tests the rule to see if 'This is awesome\!' is identified as positive\. Simple and adheres to input specification\.|
|5|2|An awesome movie\!|Positive|Checks software's ability to detect positive expressions in different contexts\. Follows input specifications for sentiment and movie context\.|
|5|3|Awesome\!|Positive|Verifies minimal expression of positivity\. Adheres to input specification with sentiment\.|
|6|1|This is bad\!|Negative|Directly tests the rule to see if 'This is bad\!' is identified as negative\. Straightforward and follows input specification\.|
|6|2|The movie is bad|Negative|Challenges identification of negativity in a slightly different context\. Adheres to input specification of sentiment and movie context\.|
|6|3|Bad\!|Negative|Tests simple negative expression detection\. Meets input specification with sentiment\.|
|7|1|Wow that movie was rad\!|Negative|Directly tests the rule to see if 'Wow that movie was rad\!' is identified as negative\. Matches input specification\.|
|7|2|Wow, the rad movie\!|Negative|Tests negative sentiment detection in variations\. Adheres to input specification of sentiment and movie context\.|
|7|3|Rad\!|Negative|Verifies minimal negative expression\. Adheres to input specification with sentiment\.|
|8|1|What a horrible show\!|Negative|Directly tests the rule to see if 'What a horrible show\!' is identified as negative\. Follows input specification\.|
|8|2|Horrible show\!|Negative|Checks consistency in identifying negative sentiment\. Adheres to input specification with sentiment and show context\.|
|8|3|Horrible\!|Negative|Verifies detection of negativity in minimal expression\. Follows input specification with sentiment\.|