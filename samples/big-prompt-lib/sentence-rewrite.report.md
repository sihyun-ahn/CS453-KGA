## [sentence-rewrite](samples/big-prompt-lib/sentence-rewrite.prompty) ([json](./sentence-rewrite.report.json))


### [prompty](./sentence-rewrite.prompty)

`````md
---
name: Sentence Rewrite
description: Takes a sentence and rewrites it with a particular style or tone.
source: The Big Prompt Library
url: https://github.com/0xeb/TheBigPromptLibrary/blob/main/CustomInstructions/ChatGPT/SaxlWzH4g_Sentence_Rewriter_Tool.md
inputs: 
  text:
    type: string
samples:
    - text: "I visited Norway last summer, and the breathtaking landscapes left me in awe."
---
system:
Rewrite the following sentence to enhance its readability and make it sound more conversational. Ensure that the original meaning and factual accuracy are preserved. Concentrate on simplifying complex phrases, using language that's easy to relate to, and creating a fluid, engaging structure. You're free to change the style, wording, and other elements (as specified by the user). Note that this instruction is specifically aimed at improving individual sentences, rather than entire paragraphs.

For example:
Input: Under the shimmering twilight sky, a curious cat ventured onto the ancient cobblestone path, its whiskers twitching with each whisper of the gentle evening breeze.

Response: In the enchanting twilight sky, an inquisitive feline embarked on the time-honored cobblestone pathway, its whiskers quivering at every murmur of the serene evening wind.

user:
Input: {{text}}
`````


### [rules.txt](./sentence-rewrite.rules.txt)

`````txt
The output must be a rewritten version of the input sentence provided by the user. 
The rewritten sentence must enhance the readability of the original sentence. 
The rewritten sentence must sound more conversational than the original sentence.
The rewritten sentence must preserve the original meaning and factual accuracy of the input sentence.
The rewritten sentence must simplify complex phrases found in the original sentence.
The language used in the rewritten sentence must be easy to relate to.
The structure of the rewritten sentence must be fluid and engaging.
The style, wording, and other elements of the rewritten sentence can be changed as specified by the user.
The rewriting task is specifically aimed at improving individual sentences, not entire paragraphs.
`````


### [inverse_rules.txt](./sentence-rewrite.inverse_rules.txt)

`````txt
Responses can alter the original meaning and factual accuracy of the input sentence.  
Responses should complicate simple phrases to decrease readability.  
Responses must sound more formal and rigid, using language that's hard to relate to.
`````


### [input_spec.txt](./sentence-rewrite.input_spec.txt)

`````txt
The input is a single sentence that requires rewriting to enhance readability and make it more conversational. 
The input must be a complete and coherent sentence. 
The input should maintain its original meaning and factual accuracy. 
The input can include complex phrases that need simplification. 
The input should allow for changes in style and wording as specified by the user.
`````


### [baseline_tests.txt](./sentence-rewrite.baseline_tests.txt)

`````txt
text: "The project was completed successfully, exceeding all expectations, thanks to the team's dedication and hard work."  
===  
text: "While waiting for the bus, I saw an interesting poster about a new art exhibit downtown that piqued my interest."  
===  
text: "Despite the initial challenges, the new software update has significantly improved system performance and user satisfaction."
`````


### [tests.csv](./sentence-rewrite.tests.csv)

|Rule ID|Test ID|Test Input|Expected Output|Reasoning|
|-|-|-|-|-|
|1|1|The quick brown fox jumps over the lazy dog\.|A fast brown fox leaps over a sluggish dog\.|The test checks if the output is a rewritten version of the input sentence, maintaining original meaning and factual accuracy while enhancing readability\.|
|1|2|Despite the rain, the match continued to its full duration\.|Even though it rained, the game went on till the end\.|This test evaluates the software's ability to rewrite sentences, preserving the meaning and factual accuracy, and improving readability\.|
|1|3|Under the glaring sun, the children played with enthusiasm and laughter\.|In the bright sun, the kids played excitedly and laughed\.|Tests if the software produces a rewritten sentence that maintains the original meaning with improved readability and factual accuracy\.|
|2|1|She meticulously planned every detail of the surprise party\.|She carefully planned every detail of the surprise party\.|Assesses the enhancement of readability by simplifying complex phrases, ensuring the output is more conversational\.|
|2|2|During the meeting, the manager expounded on the company's strategic vision\.|In the meeting, the manager talked about the company's strategy\.|Validates the software's ability to simplify complex phrases for better readability\.|
|2|3|He cogitated deeply before making any major decisions\.|He thought deeply before making any big decisions\.|Challenges the software's ability to transform complex expressions into simpler, more readable ones\.|
|3|1|The scientist elucidated the complex phenomenon to the students\.|The scientist explained the difficult concept to the students\.|Ensures the rewritten sentence maintains conversational tone while simplifying complex phrases\.|
|3|2|The discussion on climate change was both enlightening and engaging\.|The talk about climate change was both informative and interesting\.|Tests the software's ability to preserve a conversational tone and enhance readability\.|
|3|3|In light of recent events, the policy was reviewed with utmost diligence\.|Considering recent events, the policy was carefully reviewed\.|Verifies the ability to create a conversational tone, simplifying complex phrases for better readability\.|