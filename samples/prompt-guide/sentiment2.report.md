## sentiment2 ([json](./sentiment2.report.json))


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


### [intent.txt](./sentiment2.intent.txt)

`````txt
Classify the sentiment of the input text as positive or negative.
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

### [test_evals.csv](./sentiment2.test_evals.csv)

|Rule ID|Test ID|Test Input|Expected Output|Reasoning|evaluation|
|-|-|-|-|-|-|
|1|1|This is awesome movie\!|Negative|Tests if the system incorrectly identifies positive sentiment as negative\. Adheres to input specification of sentiment and movie context\.|Negative|
|1|2|Awesome show with flaws\!|Negative|Challenges the software to detect 'awesome' within a mixed sentiment statement\. Adheres to input specification of sentiment and show context\.|Positive|
|1|3|This is awesome\!|Negative|Directly tests the rule to see if 'This is awesome\!' is identified as negative\. Simple and adheres to input specification\.|Negative|
|2|1|This is bad\!|Positive|Directly tests the rule to see if 'This is bad\!' is actually identified as positive\. Clear input satisfying specification\.|Sentiment: Positive|
|2|2|The bad movie was good\!|Positive|Intricate sentiment analysis required\. Adheres to input specification with mixed sentiment and movie context\.|Positive|
|2|3|Bad show but I liked it\!|Positive|Challenges the software with a complex opinion\. Follows input specification on sentiment and show context\.|Positive|
|3|1|Wow that movie was rad\!|Positive|Directly tests the rule to confirm output for this exact positive expression\. Matches input specification\.|Positive|
|3|2|Wow, rad movie\!|Positive|Tests software's ability to recognize variations of the sentiment\. Adheres to input specification of sentiment and movie context\.|Positive|
|3|3|What a rad show\!|Positive|Verifies positive sentiment detection in a slightly altered input\. Adheres to input specification of sentiment and show context\.|Positive|
|4|1|What a horrible show\!||Directly tests the rule to see if 'What a horrible show\!' is classified correctly as no classification\. Follows input specification\.|The sentiment of the input text isn't classified\.|
|4|2|A horrible movie\!||Challenges the software to not classify with a similar sentiment statement\. Adheres to input specification of sentiment and movie context\.|This is Negative\.|
|4|3|What a show\!||Tests how the software handles neutral inputs\. Meets input specifications on length and punctuation\.|This input lacks explicit sentiment indicators for classification\.|
|1|3|This is awesome\!|Negative|Directly tests the rule to see if 'This is awesome\!' is identified as negative\. Simple and adheres to input specification\.|Negative|
|5|2|An awesome movie\!|Positive|Checks software's ability to detect positive expressions in different contexts\. Follows input specifications for sentiment and movie context\.|Positive|
|5|3|Awesome\!|Positive|Verifies minimal expression of positivity\. Adheres to input specification with sentiment\.|Positive|
|2|1|This is bad\!|Positive|Directly tests the rule to see if 'This is bad\!' is actually identified as positive\. Clear input satisfying specification\.|Sentiment: Positive|
|6|2|The movie is bad|Negative|Challenges identification of negativity in a slightly different context\. Adheres to input specification of sentiment and movie context\.|Positive|
|6|3|Bad\!|Negative|Tests simple negative expression detection\. Meets input specification with sentiment\.|Positive|
|3|1|Wow that movie was rad\!|Positive|Directly tests the rule to confirm output for this exact positive expression\. Matches input specification\.|Positive|
|7|2|Wow, the rad movie\!|Negative|Tests negative sentiment detection in variations\. Adheres to input specification of sentiment and movie context\.|Positive|
|7|3|Rad\!|Negative|Verifies minimal negative expression\. Adheres to input specification with sentiment\.|Positive|
|4|1|What a horrible show\!||Directly tests the rule to see if 'What a horrible show\!' is classified correctly as no classification\. Follows input specification\.|The sentiment of the input text isn't classified\.|
|8|2|Horrible show\!|Negative|Checks consistency in identifying negative sentiment\. Adheres to input specification with sentiment and show context\.|The input "What a horrible show\!" is not classified\.|
|8|3|Horrible\!|Negative|Verifies detection of negativity in minimal expression\. Follows input specification with sentiment\.|No classification\.|

### [test_results.csv](./sentiment2.test_results.csv)

|id|promptid|model|error|input|output|
|-|-|-|-|-|-|
|9c9aea3|16c401d|gpt\-4o\-mini||This is awesome movie\!|It sounds like you really enjoyed the movie\! What did you like most about it?|
|9f12a1f|16c401d|gpt\-4o\-mini||Awesome show with flaws\!|It sounds like you enjoyed the show despite some imperfections\! What specifically did you like about it?|
|1588e6c|16c401d|gpt\-4o\-mini||This is awesome\!|It seems like you have a mixed sentiment there\! If you'd like to share more about what you found awesome or discuss something else, feel free\!|
|3d23fa7|16c401d|gpt\-4o\-mini||This is bad\!|It sounds like you have strong feelings about something\. Do you want to share more about what you think is bad?|
|62f2bfc|16c401d|gpt\-4o\-mini||The bad movie was good\!|It sounds like you're expressing mixed feelings about the movie\! Sometimes, a film that's considered "bad" can still be entertaining or enjoyable in its own way\. What did you like about it?|
|0092731|16c401d|gpt\-4o\-mini||Bad show but I liked it\!|It's interesting how we can enjoy something despite its flaws\! What did you like about the show?|
|8897835|16c401d|gpt\-4o\-mini||Wow that movie was rad\!|It sounds like you really enjoyed the movie\! What was your favorite part?|
|9c86333|16c401d|gpt\-4o\-mini||Wow, rad movie\!|That sounds like you really enjoyed it\! What did you like most about it?|
|6b9ed6e|16c401d|gpt\-4o\-mini||What a rad show\!|What a rad show\! // Positive|
|67662c5|16c401d|gpt\-4o\-mini||What a horrible show\!|It sounds like you didn't enjoy the show\. What specifically did you find disappointing about it?|
|44b9f7a|16c401d|gpt\-4o\-mini||A horrible movie\!|It sounds like you didn't enjoy that movie\! What specifically didn't you like about it?|
|7f63b4c|16c401d|gpt\-4o\-mini||What a show\!|It sounds like you have some strong feelings about the show\! What did you think of it?|
|1588e6c|16c401d|gpt\-4o\-mini||This is awesome\!|It seems like you have a mixed sentiment there\! If you'd like to share more about what you found awesome or discuss something else, feel free\!|
|f9dad34|16c401d|gpt\-4o\-mini||An awesome movie\!|That sounds great\! What did you enjoy about it?|
|ec13ce3|16c401d|gpt\-4o\-mini||Awesome\!|That's great to hear\! What specifically did you find awesome?|
|3d23fa7|16c401d|gpt\-4o\-mini||This is bad\!|It sounds like you have strong feelings about something\. Do you want to share more about what you think is bad?|
|931db6a|16c401d|gpt\-4o\-mini||The movie is bad|It sounds like you didn't enjoy the movie\. What specifically didn't you like about it?|
|680eb67|16c401d|gpt\-4o\-mini||Bad\!|It sounds like you're not enjoying something\. What specifically didn't you like?|
|8897835|16c401d|gpt\-4o\-mini||Wow that movie was rad\!|It sounds like you really enjoyed the movie\! What was your favorite part?|
|9b04e8b|16c401d|gpt\-4o\-mini||Wow, the rad movie\!|It sounds like you really enjoyed that movie\! What did you like most about it?|
|02e1075|16c401d|gpt\-4o\-mini||Rad\!|Glad you think so\! What did you find rad?|
|67662c5|16c401d|gpt\-4o\-mini||What a horrible show\!|It sounds like you didn't enjoy the show\. What specifically did you find disappointing about it?|
|a86aec5|16c401d|gpt\-4o\-mini||Horrible show\!|It sounds like you didn't enjoy the show at all\! What specifically made it horrible for you?|
|acf490b|16c401d|gpt\-4o\-mini||Horrible\!|It sounds like you're feeling quite negative about something\. What's on your mind?|