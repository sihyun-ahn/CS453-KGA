## sentence-rewrite ([json](./sentence-rewrite.report.json))


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


### [intent.txt](./sentence-rewrite.intent.txt)

`````txt
Rewrite individual sentences to enhance readability and make them more conversational.
`````


### [input_spec.txt](./sentence-rewrite.input_spec.txt)

`````txt
The input is a single sentence that requires rewriting to enhance readability and make it more conversational. 
The input must be a complete and coherent sentence. 
The input should maintain its original meaning and factual accuracy. 
The input can include complex phrases that need simplification. 
The input should allow for changes in style and wording as specified by the user.
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

### [test_evals.csv](./sentence-rewrite.test_evals.csv)

|id|model|rule|input|evaluation|
|-|-|-|-|-|
|1053f45|gpt\-4o\-2024\-08\-06|The output must be a rewritten version of the input sentence provided by the user\.|The quick brown fox jumps over the lazy dog\.|A speedy brown fox leaps over a sleepy dog\.|
|5500261|gpt\-4o\-2024\-08\-06|The output must be a rewritten version of the input sentence provided by the user\.|Despite the rain, the match continued to its full duration\.|Even though it rained, the match went on until the end\.|
|1ff3765|gpt\-4o\-2024\-08\-06|The output must be a rewritten version of the input sentence provided by the user\.|Under the glaring sun, the children played with enthusiasm and laughter\.|The children played with enthusiasm and laughter under the bright sun\.|
|8ac3418|gpt\-4o\-2024\-08\-06|The rewritten sentence must enhance the readability of the original sentence\.|She meticulously planned every detail of the surprise party\.|She carefully planned every detail of the surprise party\.|
|ba897b0|gpt\-4o\-2024\-08\-06|The rewritten sentence must enhance the readability of the original sentence\.|During the meeting, the manager expounded on the company's strategic vision\.|During the meeting, the manager explained the company's strategic vision\.|
|b9b179a|gpt\-4o\-2024\-08\-06|The rewritten sentence must enhance the readability of the original sentence\.|He cogitated deeply before making any major decisions\.|He thought carefully before making any big decisions\.|
|522ce0a|gpt\-4o\-2024\-08\-06|The rewritten sentence must sound more conversational than the original sentence\.|The scientist elucidated the complex phenomenon to the students\.|The scientist explained the complex phenomenon to the students\.|
|466829b|gpt\-4o\-2024\-08\-06|The rewritten sentence must sound more conversational than the original sentence\.|The discussion on climate change was both enlightening and engaging\.|The conversation about climate change was not only insightful but also really engaging\.|
|24e23f5|gpt\-4o\-2024\-08\-06|The rewritten sentence must sound more conversational than the original sentence\.|In light of recent events, the policy was reviewed with utmost diligence\.|Given recent events, we reviewed the policy with great care\.|

### [test_results.csv](./sentence-rewrite.test_results.csv)

|id|promptid|model|error|input|output|
|-|-|-|-|-|-|
|1053f45|5e18235|gpt\-4o\-mini||The quick brown fox jumps over the lazy dog\.|Response: The speedy brown fox leaps over the sleepy dog\.|
|5500261|5e18235|gpt\-4o\-mini||Despite the rain, the match continued to its full duration\.|Even with the rain coming down, the match carried on for the entire time\.|
|1ff3765|5e18235|gpt\-4o\-mini||Under the glaring sun, the children played with enthusiasm and laughter\.|Response: The kids played joyfully under the bright sun, filled with laughter and energy\.|
|8ac3418|5e18235|gpt\-4o\-mini||She meticulously planned every detail of the surprise party\.|Response: She carefully organized every little detail of the surprise party\.|
|ba897b0|5e18235|gpt\-4o\-mini||During the meeting, the manager expounded on the company's strategic vision\.|During the meeting, the manager shared the company's big\-picture plan\.|
|b9b179a|5e18235|gpt\-4o\-mini||He cogitated deeply before making any major decisions\.|Response: He took some time to think things over carefully before making any big decisions\.|
|522ce0a|5e18235|gpt\-4o\-mini||The scientist elucidated the complex phenomenon to the students\.|The scientist explained the complicated topic to the students\.|
|466829b|5e18235|gpt\-4o\-mini||The discussion on climate change was both enlightening and engaging\.|Response: The talk about climate change was really interesting and eye\-opening\.|
|24e23f5|5e18235|gpt\-4o\-mini||In light of recent events, the policy was reviewed with utmost diligence\.|Response: Given the recent events, we carefully re\-evaluated the policy\.|