## [sentence-rewrite](samples/big-prompt-lib/sentence-rewrite.prompty)


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
The input must be a single sentence.  
The input sentence should contain complex phrases or structures that may need simplification.
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
`````csv
Rule ID, Test ID, Test Input, Expected Output, Reasoning
1, 1, "In light of the recent developments in the technological sector, a comprehensive review of the existing policy framework is deemed necessary to ensure alignment with the evolving landscape.", "Considering the recent changes in tech, we need to review our policies to keep up.", "Tests retention of original meaning and factual accuracy while simplifying the sentence."
1, 2, "Given the unprecedented nature of the current economic downturn, it is imperative that stakeholders engage in collaborative efforts to devise strategies aimed at mitigating the impact.", "Since the economy is struggling like never before, it's crucial for everyone to work together to come up with solutions.", "Checks if the software maintains meaning and factual integrity despite simplification."
1, 3, "Due to the escalating tensions observed in international relations, it becomes vital to undertake diplomatic engagements aimed at fostering mutual understanding and cooperation.", "With global tensions rising, it's important to engage diplomatically to promote understanding and cooperation.", "Ensures factual accuracy and meaning are preserved while making the sentence more relatable."

Rule ID, Test ID, Test Input, Expected Output, Reasoning
2, 1, "The implementation of this project necessitates an exhaustive examination of all pertinent factors to ensure a successful outcome.", "To ensure success, the project needs a thorough review of all relevant factors.", "Tests if the response enhances readability by breaking down complex phrases."
2, 2, "The complexity of the mathematical models requires meticulous attention to detail to avoid any potential discrepancies.", "These math models are complex and need careful attention to avoid mistakes.", "Evaluates the simplification of complex phrases for better readability."
2, 3, "The intricate network of policies requires an in-depth understanding to effectively navigate the bureaucratic landscape.", "Understanding the complex policy network is key to moving through the bureaucracy.", "Assesses whether the software can simplify intricate language for enhanced readability."

Rule ID, Test ID, Test Input, Expected Output, Reasoning
3, 1, "Shall we proceed with the aforementioned plan, given the prevailing circumstances and the potential ramifications associated with it?", "Should we go ahead with the plan, considering the current situation and possible outcomes?", "Tests if the software can make the sentence more conversational and relatable."
3, 2, "The forecasted climatic conditions suggest the necessity of appropriate measures to mitigate adverse effects.", "The weather forecast indicates we should take steps to lessen any negative impact.", "Checks if the response sounds fluid and easy to relate to, making it more conversational."
3, 3, "Upon reviewing the comprehensive analysis, it becomes apparent that significant adjustments are required to optimize performance.", "After looking at the detailed analysis, it's clear we need to make big changes to improve performance.", "Ensures the output is conversational and relatable, while maintaining a smooth flow."
`````
