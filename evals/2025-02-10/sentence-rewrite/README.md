## sentence-rewrite ([json](./evals/2025-02-10/sentence-rewrite/report.json))

- 7 rules, 7/7 (100%) grounded
- 7 inverse rules
- 83 tests, 41 baseline tests

### Overview

<details><summary>Glossary</summary>
    
- Prompt Under Test (PUT) - like Program Under Test; the prompt
- Model Under Test (MUT) - Model which we are testing against with specific temperature, etc example: gpt-4o-mini
- Model Used by PromptPex (MPP) - gpt-4o

- Input Specification (IS) - Extracting input constraints of PUT using MPP
- Output Rules (OR) - Extracting output constraints of PUT using MPP
- Output Rules Groundedness (ORG) - Checks if OR is grounded in PUT using MPP

- Prompt Under Test Intent (PUTI) - Extracting the exact task from PUT using MMP

- PromptPex Tests (PPT) - Test cases generated for PUT with MPP using IS and OR
- Baseline Tests (BT) - Zero shot test cases generated for PUT with MPP

- Test Input Compliance (TIC) - Checking if PPT and BT meets the constraints in IS using MPP
- Test Coverage (TC) - Result generated for PPT and BT on PUTI + OR with MPP

- Test Output (TO) - Result generated for PPT and BT on PUT with each MUT
- Test Output Compliance (TOC) - Checking if TO meets the constraints in PUT using MPP

</details>


### [test_results.csv](./test_results.csv)



### [sentence-rewrite.prompty](./sentence-rewrite.prompty)

`````md
---
name: Sentence Rewrite
description: Takes a sentence and rewrites it with a particular style or tone.
source: The Big Prompt Library
url: https://github.com/0xeb/TheBigPromptLibrary/blob/main/CustomInstructions/ChatGPT/SaxlWzH4g_Sentence_Rewriter_Tool.md
inputs: 
  text:
    type: string
sample:
    text: "I visited Norway last summer, and the breathtaking landscapes left me in awe."
---
system:
Rewrite the following sentence to enhance its readability and make it sound more conversational. Ensure that the original meaning and factual accuracy are preserved. Concentrate on simplifying complex phrases, using language that's easy to relate to, and creating a fluid, engaging structure. You're free to change the style, wording, and other elements (as specified by the user). Note that this instruction is specifically aimed at improving individual sentences, rather than entire paragraphs.

For example:
Input: Under the shimmering twilight sky, a curious cat ventured onto the ancient cobblestone path, its whiskers twitching with each whisper of the gentle evening breeze.

Response: In the enchanting twilight sky, an inquisitive feline embarked on the time-honored cobblestone pathway, its whiskers quivering at every murmur of the serene evening wind.

Input: 
user:
{{text}}
`````


### [intent.txt](./intent.txt)

`````txt
Rewrite sentences to improve readability and conversational tone while preserving original meaning and accuracy.
`````


### [input_spec.txt](./input_spec.txt)

`````txt
The input is a sentence that requires rewriting.
The input should be a coherent and complete sentence.
The input can include complex phrases that need simplification.
The input should preserve its original meaning and factual accuracy after rewriting.
The input should not be an entire paragraph.
The input can be stylistically changed to enhance readability and conversational tone.
The minimum length of the input should be one sentence.
The maximum length of the input should not exceed typical sentence length, avoiding over-complexity.
`````


### [rules.txt](./rules.txt)

`````txt
1: The chatbot rewrites the input sentence to enhance its readability and make it sound more conversational.
2: The response should preserve the original meaning of the input sentence.
3: The response should maintain the factual accuracy of the input sentence.
4: The response should concentrate on simplifying complex phrases present in the input sentence.
5: The response should use language that is easy to relate to.
6: The response should have a fluid and engaging structure.
7: The response should be limited to rewriting individual sentences only, not entire paragraphs.
`````


### [rule_evals.csv](./rule_evals.csv)

|ruleid|rule|grounded|
|-|-|-|
|1|The chatbot rewrites the input sentence to enhance its readability and make it sound more conversational\.|ok|
|2|The response should preserve the original meaning of the input sentence\.|ok|
|3|The response should maintain the factual accuracy of the input sentence\.|ok|
|4|The response should concentrate on simplifying complex phrases present in the input sentence\.|ok|
|5|The response should use language that is easy to relate to\.|ok|
|6|The response should have a fluid and engaging structure\.|ok|
|7|The response should be limited to rewriting individual sentences only, not entire paragraphs\.|ok|

### [inverse_rules.txt](./inverse_rules.txt)

`````txt
8: The chatbot rewrites the input sentence to make it more complex and less conversational.
9: The response should change the original meaning of the input sentence.
10: The response should introduce inaccuracies in the input sentence.
11: The response should make complex phrases in the input sentence more complicated.
12: The response should use language that is difficult to relate to.
13: The response should have a rigid and disengaging structure.
14: The response should be limited to rewriting entire paragraphs, not individual sentences.
`````


### [tests.csv](./tests.csv)

|testinput|expectedoutput|reasoning|
|-|-|-|
|The sun is setting behind the mountains\.|The sun is going down behind the hills\.|Checks if the sentence is made more conversational\.|
|He completed the task with painstaking dedication and commitment\.|He finished the job with great dedication\.|Evaluates the simplification and conversational tone\.|
|She possessed a remarkable ability to remain calm under pressure\.|She had an amazing talent for staying calm under stress\.|Tests the readability and conversational nature of the rewrite\.|
|The committee's decision was largely influenced by the recent reports\.|The recent reports greatly influenced the committee's decision\.|Ensures that the original meaning is preserved\.|
|Despite the harsh weather conditions, the event was a success\.|The event was a success despite the bad weather\.|Checks if the core meaning remains unchanged\.|
|The dog chased the ball with immense enthusiasm\.|The dog was very excited while chasing the ball\.|Confirms the preservation of original meaning\.|
|The population of the city is approximately 500,000 people\.|About 500,000 people live in the city\.|Verifies the factual accuracy remains intact\.|
|The train departs at 9 AM every morning\.|The train leaves at 9 AM every morning\.|Ensures factual details are correct\.|
|Earth is the third planet from the Sun\.|Earth is the third planet from the Sun\.|Confirms factual accuracy is consistent in the rewritten sentence\.|
|Considering the current circumstances, it would be wise to delay our plans\.|Given the situation, we should delay our plans\.|Tests the simplification of complex phrases\.|
|With the implementation of this policy, we anticipate substantial improvement\.|We expect great improvement with this policy\.|Evaluates simplification of phrases\.|
|The doctors are cautiously optimistic about the patient's recovery\.|The doctors are hopeful about the patient's recovery\.|Ensures complex phrases are simplified\.|
|The child was filled with apprehension before the school play\.|The child was nervous before the school play\.|Tests for relatable language\.|
|The manager exhibited a remarkable acumen for business strategies\.|The manager showed great skill in business strategies\.|Checks for easy\-to\-relate language\.|
|Her eloquent speech captivated the audience\.|Her clear speech captivated the audience\.|Confirms usage of relatable language\.|
|She sought assistance from her learned colleagues\.|She asked for help from her knowledgeable colleagues\.|Checks for fluid and engaging structure\.|
|The athlete's rigorous training regimen yielded impressive results\.|The athlete's hard training led to great results\.|Verifies engaging and fluid structure\.|
|The intricate design of the ancient artifact fascinated the archaeologists\.|The detailed design of the ancient artifact fascinated the archaeologists\.|Ensures a fluid and engaging sentence structure\.|
|The technology was considered revolutionary at that time\. It changed how people interacted with devices\.|The technology was revolutionary back then\. It changed how people used devices\.|Ensures limitation to single sentences\.|
|The results were astounding\. Scientists couldn't believe their eyes\.|The results were amazing\. Scientists were surprised\.|Checks that the response is limited to single sentences\.|
|The singer's voice was mesmerizing\. She enchanted everyone in the room\.|The singer's voice was captivating\. She enchanted everyone\.|Tests adherence to individual sentence rewriting\.|
|The cat sat on the mat\.|The feline took repose on the woven floor covering\.|Verifies increased complexity and reduced conversational tone\.|
|He walked quickly to the store\.|He proceeded expeditiously to the commercial establishment\.|Tests making the sentence less conversational and more complex\.|
|Her smile lit up the room\.|Her smile illuminated the chamber\.|Ensures the sentence is made more complex and less conversational\.|
|She likes to read books\.|She dislikes reading books\.|Evaluates changing the original meaning\.|
|The project was completed on time\.|The project was finished ahead of schedule\.|Checks if the original meaning is altered\.|
|The cake tasted delicious\.|The cake tasted awful\.|Tests changing the intended meaning of the sentence\.|
|The sun rises in the east\.|The sun rises in the west\.|Confirms introducing factual inaccuracies\.|
|Paris is the capital of France\.|Berlin is the capital of France\.|Ensures the response has inaccuracies\.|
|The Amazon is the longest river in South America\.|The Nile is the longest river in South America\.|Evaluates the introduction of incorrect facts\.|
|The park was closed because of the storm\.|The recreational area was shut down due to the inclement weather conditions\.|Tests complicating simple phrases\.|
|She enjoyed a cup of tea\.|She relished a cup of the brewed beverage\.|Checks for increasing complexity of phrases\.|
|He asked for directions\.|He solicited navigational instructions\.|Evaluates making simple phrases more complex\.|
|The bird sang a beautiful song\.|The avian creature vocalized an aesthetically pleasing melody\.|Verifies use of difficult language\.|
|She wore a pretty dress\.|She donned an aesthetically pleasing garment\.|Ensures the response uses less relatable language\.|
|He wrote a letter to his friend\.|He composed a missive to his acquaintance\.|Confirms use of difficult and less relatable language\.|
|The car moved fast\.|The automobile proceeded at a rapid pace\.|Ensures a rigid and disengaging structure\.|
|He loves to swim\.|He exhibits great fondness for the activity of swimming\.|Tests for a non\-engaging rewrite\.|
|She reads every day\.|She engages in the activity of reading on a daily basis\.|Verifies the structure is rigid and disengaging\.|
|I ate an apple\. It was delicious\.|I ate an apple\. It was delicious and juicy\.|Ensures the response does not rewrite entire paragraphs\.|
|The weather was nice\. We went for a walk\.|The weather was pleasant\. We decided to take a walk\.|Checks limitation to rewriting sentences only\.|
|The dog barked\. It was very loud\.|The dog barked\. It was noisy\.|Verifies adherence to rewriting individual sentences only\.|

### [test_evals.csv](./test_evals.csv)

|rule|model|input|coverage|validity|
|-|-|-|-|-|
|The chatbot rewrites the input sentence to enhance its readability and make it sound more conversational\.|gpt\-4o\-2024\-05\-13|The sun is setting behind the mountains\.|ok|ok|
|The chatbot rewrites the input sentence to enhance its readability and make it sound more conversational\.|gpt\-4o\-2024\-05\-13|He completed the task with painstaking dedication and commitment\.|ok|ok|
|The chatbot rewrites the input sentence to enhance its readability and make it sound more conversational\.|gpt\-4o\-2024\-05\-13|She possessed a remarkable ability to remain calm under pressure\.|ok|ok|
|The response should preserve the original meaning of the input sentence\.|gpt\-4o\-2024\-05\-13|The committee's decision was largely influenced by the recent reports\.|ok|ok|
|The response should preserve the original meaning of the input sentence\.|gpt\-4o\-2024\-05\-13|Despite the harsh weather conditions, the event was a success\.|ok|ok|
|The response should preserve the original meaning of the input sentence\.|gpt\-4o\-2024\-05\-13|The dog chased the ball with immense enthusiasm\.|ok|ok|
|The response should maintain the factual accuracy of the input sentence\.|gpt\-4o\-2024\-05\-13|The population of the city is approximately 500,000 people\.|ok|ok|
|The response should maintain the factual accuracy of the input sentence\.|gpt\-4o\-2024\-05\-13|The train departs at 9 AM every morning\.|ok|ok|
|The response should maintain the factual accuracy of the input sentence\.|gpt\-4o\-2024\-05\-13|Earth is the third planet from the Sun\.|ok|ok|
|The response should concentrate on simplifying complex phrases present in the input sentence\.|gpt\-4o\-2024\-05\-13|Considering the current circumstances, it would be wise to delay our plans\.|ok|ok|
|The response should concentrate on simplifying complex phrases present in the input sentence\.|gpt\-4o\-2024\-05\-13|With the implementation of this policy, we anticipate substantial improvement\.|ok|ok|
|The response should concentrate on simplifying complex phrases present in the input sentence\.|gpt\-4o\-2024\-05\-13|The doctors are cautiously optimistic about the patient's recovery\.|ok|ok|
|The response should use language that is easy to relate to\.|gpt\-4o\-2024\-05\-13|The child was filled with apprehension before the school play\.|ok|ok|
|The response should use language that is easy to relate to\.|gpt\-4o\-2024\-05\-13|The manager exhibited a remarkable acumen for business strategies\.|ok|ok|
|The response should use language that is easy to relate to\.|gpt\-4o\-2024\-05\-13|Her eloquent speech captivated the audience\.|ok|ok|
|The response should have a fluid and engaging structure\.|gpt\-4o\-2024\-05\-13|She sought assistance from her learned colleagues\.|ok|ok|
|The response should have a fluid and engaging structure\.|gpt\-4o\-2024\-05\-13|The athlete's rigorous training regimen yielded impressive results\.|ok|ok|
|The response should have a fluid and engaging structure\.|gpt\-4o\-2024\-05\-13|The intricate design of the ancient artifact fascinated the archaeologists\.|ok|ok|
|The response should be limited to rewriting individual sentences only, not entire paragraphs\.|gpt\-4o\-2024\-05\-13|The technology was considered revolutionary at that time\. It changed how people interacted with devices\.|ok|err|
|The response should be limited to rewriting individual sentences only, not entire paragraphs\.|gpt\-4o\-2024\-05\-13|The results were astounding\. Scientists couldn't believe their eyes\.|ok|err|
|The response should be limited to rewriting individual sentences only, not entire paragraphs\.|gpt\-4o\-2024\-05\-13|The singer's voice was mesmerizing\. She enchanted everyone in the room\.|ok|ok|
|The chatbot rewrites the input sentence to make it more complex and less conversational\.|gpt\-4o\-2024\-05\-13|The cat sat on the mat\.|ok|ok|
|The chatbot rewrites the input sentence to make it more complex and less conversational\.|gpt\-4o\-2024\-05\-13|He walked quickly to the store\.|ok|ok|
|The chatbot rewrites the input sentence to make it more complex and less conversational\.|gpt\-4o\-2024\-05\-13|Her smile lit up the room\.|ok|ok|
|The response should change the original meaning of the input sentence\.|gpt\-4o\-2024\-05\-13|She likes to read books\.|err|ok|
|The response should change the original meaning of the input sentence\.|gpt\-4o\-2024\-05\-13|The project was completed on time\.|ok|ok|
|The response should change the original meaning of the input sentence\.|gpt\-4o\-2024\-05\-13|The cake tasted delicious\.|ok|ok|
|The response should introduce inaccuracies in the input sentence\.|gpt\-4o\-2024\-05\-13|The sun rises in the east\.|ok|ok|
|The response should introduce inaccuracies in the input sentence\.|gpt\-4o\-2024\-05\-13|Paris is the capital of France\.|ok|ok|
|The response should introduce inaccuracies in the input sentence\.|gpt\-4o\-2024\-05\-13|The Amazon is the longest river in South America\.|ok|ok|
|The response should make complex phrases in the input sentence more complicated\.|gpt\-4o\-2024\-05\-13|The park was closed because of the storm\.|ok|ok|
|The response should make complex phrases in the input sentence more complicated\.|gpt\-4o\-2024\-05\-13|She enjoyed a cup of tea\.|ok|ok|
|The response should make complex phrases in the input sentence more complicated\.|gpt\-4o\-2024\-05\-13|He asked for directions\.|ok|ok|
|The response should use language that is difficult to relate to\.|gpt\-4o\-2024\-05\-13|The bird sang a beautiful song\.|ok|ok|
|The response should use language that is difficult to relate to\.|gpt\-4o\-2024\-05\-13|She wore a pretty dress\.|ok|ok|
|The response should use language that is difficult to relate to\.|gpt\-4o\-2024\-05\-13|He wrote a letter to his friend\.|err|ok|
|The response should have a rigid and disengaging structure\.|gpt\-4o\-2024\-05\-13|The car moved fast\.|ok|ok|
|The response should have a rigid and disengaging structure\.|gpt\-4o\-2024\-05\-13|He loves to swim\.|ok|ok|
|The response should have a rigid and disengaging structure\.|gpt\-4o\-2024\-05\-13|She reads every day\.|ok|ok|
|The response should be limited to rewriting entire paragraphs, not individual sentences\.|gpt\-4o\-2024\-05\-13|I ate an apple\. It was delicious\.|ok|err|
|The response should be limited to rewriting entire paragraphs, not individual sentences\.|gpt\-4o\-2024\-05\-13|The weather was nice\. We went for a walk\.|ok|err|
|The response should be limited to rewriting entire paragraphs, not individual sentences\.|gpt\-4o\-2024\-05\-13|The dog barked\. It was very loud\.|ok|err|

### [baseline_tests.txt](./baseline_tests.txt)

`````txt
text: The quick brown fox jumps over the lazy dog.
===
text: She sells sea shells by the sea shore.
===
text: An apple a day keeps the doctor away.
===
text: Better late than never.
===
text: A stitch in time saves nine.
===
text: Actions speak louder than words.
===
text: Every cloud has a silver lining.
===
text: Laughter is the best medicine.
===
text: The early bird catches the worm.
===
text: Practice makes perfect.
===
text: When in Rome, do as the Romans do.
===
text: A picture is worth a thousand words.
===
text: Rome wasn't built in a day.
===
text: If it ain't broke, don't fix it.
===
text: Good things come to those who wait.
===
text: No pain, no gain.
===
text: The pen is mightier than the sword.
===
text: You can't judge a book by its cover.
===
text: When the going gets tough, the tough get going.
===
text: Two wrongs don't make a right.
===
text: The grass is always greener on the other side.
===
text: Don't put all your eggs in one basket.
===
text: Fortune favors the bold.
===
text: You reap what you sow.
===
text: A bird in the hand is worth two in the bush.
===
text: The squeaky wheel gets the grease.
===
text: You can't have your cake and eat it too.
===
text: Still waters run deep.
===
text: Absence makes the heart grow fonder.
===
text: To each his own.
===
text: Let sleeping dogs lie.
===
text: The ball is in your court.
===
text: The apple doesn't fall far from the tree.
===
text: A watched pot never boils.
===
text: Don't count your chickens before they hatch.
===
text: There's no such thing as a free lunch.
===
text: It takes one to know one.
===
text: You can't make an omelet without breaking eggs.
===
text: You can lead a horse to water, but you can't make it drink.
===
text: There's no place like home.
===
text: A journey of a thousand miles begins with a single step.
`````


### [rule_coverage.csv](./rule_coverage.csv)

|input|validity|validityText|baseline|coverage|
|-|-|-|-|-|
|text: The quick brown fox jumps over the lazy dog\.|ok|The input is a single sentence\. It is coherent and complete\. It does not require simplification, and there are no complex phrases\. Its meaning is clear and factual accuracy is preserved after rewriting\. The sentence is neither too long nor does it extend beyond a typical sentence length\. <br><br>OK|1|The speedy brown fox leaps over the sleepy dog\.|
|text: She sells sea shells by the sea shore\.|ok|The input is a coherent and complete sentence\. It maintains factual accuracy and seems to be a typical sentence in length, avoiding over\-complexity\. It is not an entire paragraph\. Complex phrases might need simplification\. There is no violation of the input specification\.<br><br>OK|1|She sells seashells near the beach\.|
|text: An apple a day keeps the doctor away\.|ok|The input is a coherent and complete sentence\. It is not an entire paragraph and does not exceed typical sentence length\. The sentence does not necessarily include complex phrases that need simplification, but it can be rewritten to preserve its original meaning and factual accuracy while potentially enhancing readability and conversational tone\.<br><br>OK|1|Eating an apple every day helps you stay healthy and avoid doctor visits\.|
|text: A stitch in time saves nine\.|ok|The input is a complete and coherent sentence\. It doesn't appear to be overly complex or in need of simplification\. The sentence is also short and doesn't violate the length requirements\. <br><br>OK|1|Taking care of problems early can prevent them from getting worse later\.|
|text: Actions speak louder than words\.|ok|The input is a single sentence: "Actions speak louder than words\."<br>\- It is a coherent and complete sentence\.<br>\- It does not require any factual accuracy check as it is a common saying or idiom\.<br>\- It is not an entire paragraph\.<br>\- The sentence length is within typical limits and not overly complex\.<br>OK|1|What you do matters more than what you say\.|
|text: Every cloud has a silver lining\.|ok|The input "Every cloud has a silver lining\." is a coherent and complete sentence\. It is not an entire paragraph and does not exceed typical sentence length, avoiding over\-complexity\. It is a saying that may require stylistic changes but can be understood as it has a clear meaning\.<br><br>OK|1|Every cloud has a bright side\.|
|text: Laughter is the best medicine\.|ok|The input "Laughter is the best medicine\." is a coherent and complete sentence\. It is not overly complex, does not exceed typical sentence length, and does not require extensive rewriting to simplify complex phrases\. It preserves factual accuracy and its original meaning\. The input is also not an entire paragraph\.<br><br>OK|1|Laughter truly is the best cure\.|
|text: The early bird catches the worm\.|ok|This is a coherent and complete sentence\. Although it contains a proverb which might necessitate simplification or stylistic change for better readability or a conversational tone, it respects the input specifications\. The sentence is appropriately sized and not overly complex\. There are no violations detected based on the given input specifications\.<br><br>OK|1|The early bird gets the worm\.|
|text: Practice makes perfect\.|ok|The given input "Practice makes perfect\." is a coherent and complete sentence\. It fits the minimum length requirement for a sentence\. It is not an entire paragraph\. It doesn't need simplification but can be stylistically rewritten for better readability, if necessary\. It doesn't exceed typical sentence length\. <br><br>OK|1|The more you practice, the better you'll get\.|
|text: When in Rome, do as the Romans do\.|ok|The input is a coherent and complete sentence\. It preserves its original meaning and factual accuracy\. It does not exceed typical sentence length and is not an entire paragraph\. The input meets all the requirements of the input specification\.<br><br>OK|1|When you’re in Rome, follow the local customs\.|
|text: A picture is worth a thousand words\.|ok|The given input is a coherent and complete sentence, which meets the requirement for a minimum length of one sentence\. It does not exceed typical sentence length and is not an entire paragraph\. The sentence also preserves its original meaning and factual accuracy\. Additionally, it does not contain complex phrases that need simplification, but it still meets the requirement as it can be stylistically changed to enhance readability\.<br><br>OK|1|A single picture can say so much more than just a thousand words\.|
|text: Rome wasn't built in a day\.|ok|The input is a single complete and coherent sentence\. It preserves its original meaning and factual accuracy, it is not an entire paragraph, and it does not exceed typical sentence length\. Although it is already a simple sentence, the specification does not prohibit simple sentences\.<br><br>OK|1|Rome didn't get built overnight\.|
|text: If it ain't broke, don't fix it\.|ok|The input is a coherent and complete sentence\. It does not seem to be an entire paragraph and falls well within a typical sentence length\. The sentence is stylistically informal, which can be considered for conversational tone enhancement\. Therefore, it meets all criteria: <br>OK|1|If something is working fine, leave it alone\.|
|text: Good things come to those who wait\.|ok|The input "Good things come to those who wait\." is a coherent and complete sentence\. It does not exceed typical sentence length\. It can be rewritten while preserving its original meaning and factual accuracy\. It is not an entire paragraph and meets the minimum length of one sentence\.<br><br>OK|1|Patience pays off in the end\.|
|text: The pen is mightier than the sword\.|ok|The input is a coherent and complete sentence\. It is not an entire paragraph and it does not exceed typical sentence length\. It meets the minimum length requirement of one sentence\.<br><br>OK|1|The written word is more powerful than violence\.|
|text: You can't judge a book by its cover\.|ok|The input is a complete and coherent sentence\. It does not exceed typical sentence length and does not contain any complex phrases that need simplification\. It maintains its original meaning and factual accuracy and requires no further rewriting\.<br><br>OK|1|Don't judge a book just by its cover\.|
|text: When the going gets tough, the tough get going\.|ok|The input is a detailed sentence that could potentially need rewriting to enhance readability and conversational tone\. It is a coherent and complete sentence, preserving its original meaning and factual accuracy\. It is not an entire paragraph, and it complies with the length restriction\.<br><br>OK|1|When times are tough, strong people step up and keep pushing forward\.|
|text: Two wrongs don't make a right\.|ok|The input is a single coherent and complete sentence\. It does not appear to include complex phrases that need simplification\. The input is short and does not exceed typical sentence length\.<br><br>OK|1|Two wrongs won't fix things\.|
|text: The grass is always greener on the other side\.|ok|The input is a coherent and complete sentence\. It does not exceed typical sentence length and does not form an entire paragraph\. The sentence is suitable for stylistic change to enhance readability or conversational tone and is factual in nature\. No specification rules have been violated\.<br><br>OK|1|The grass always seems greener on the other side\.|
|text: Don't put all your eggs in one basket\.|ok|The input is a coherent and complete sentence\. It does not exceed a typical sentence length and does not present over\-complexity\. It reflects a clear meaning that can be preserved after rewriting\. Additionally, it can be stylistically changed to enhance readability or conversational tone, fitting the requirements set by the input specification\.<br><br>OK|1|Don’t put everything in one place\.|
|text: Fortune favors the bold\.|ok|The input "Fortune favors the bold\." is a coherent and complete sentence\. It does not require any factual accuracy verification as it is a proverbial statement\. The sentence is concise and does not exceed typical sentence length\. It does not form an entire paragraph and meets the minimum sentence length requirement\.<br><br>OK|1|Taking risks often leads to good luck\.|
|text: You reap what you sow\.|ok|The input is a complete and coherent sentence\. It requires a rewriting to possibly enhance readability and conversational tone\. It doesn't exceed a typical sentence length\. <br><br>OK|1|You get what you give\.|
|text: A bird in the hand is worth two in the bush\.|ok|The input is a coherent and complete sentence\. It does not exceed typical sentence length and is not overly complex\. The sentence does not require any factual accuracy considerations for rewriting, as it is a proverb\. It is a single sentence and does not form an entire paragraph\. Therefore, it meets all the provided input specifications\.<br><br>OK|1|A bird you already have is better than two you might catch later\.|
|text: The squeaky wheel gets the grease\.|ok|The input "The squeaky wheel gets the grease\." complies with the input specification because it is a coherent and complete sentence\. It has a clear meaning and can be rewritten to preserve its original meaning and factual accuracy\. The input does not exceed typical sentence length, avoiding over\-complexity, and meets the minimum length requirement\.<br><br>OK|1|The loudest complaints get the most attention\.|
|text: You can't have your cake and eat it too\.|ok|This input is a coherent and complete sentence, with a clear meaning\. It aligns with the input specification as it requires rewriting, can include stylistic changes to enhance readability, and does not exceed typical sentence length\.<br><br>OK|1|You can't enjoy both sides of a situation at the same time\.|
|text: Still waters run deep\.|ok|The input "Still waters run deep\." is a coherent and complete sentence\. It is a proverb, but it requires rewriting, potentially for simplification or enhancement of readability and conversational tone\. It is not an entire paragraph and does not exceed typical sentence length\.<br><br>OK|1|Quiet people often have profound thoughts\.|
|text: Absence makes the heart grow fonder\.|ok|The input is a coherent and complete sentence\. It does not form an entire paragraph and maintains factual accuracy\. It preserves its original meaning and does not exceed typical sentence length nor is it overly complex\.<br><br>OK|1|Being apart makes you appreciate someone even more\.|
|text: To each his own\.|ok|While "To each his own" is a coherent and complete sentence, it does not necessarily include complex phrases that need simplification\. It is a simple and straightforward idiom\. However, it can still be considered for stylistic change to enhance readability\. There is no factual inaccuracy, and it is not an entire paragraph\. The sentence length is typical and not overly complex\.<br><br>OK|1|Everyone has their own preferences\.|
|text: The apple doesn't fall far from the tree\.|ok|The input is a complete and coherent sentence\. It does not exceed typical sentence length and is not an entire paragraph\. The sentence can be stylistically changed for readability and conversational tone if needed\. It also includes a complex phrase "doesn't fall far from the tree" that might be simplified while still preserving its original meaning\.<br><br>OK|1|You usually end up being similar to your parents\.|
|text: Don't count your chickens before they hatch\.|ok|The input, "Don't count your chickens before they hatch," is a coherent and complete sentence\. It does not exceed typical sentence length and is not overly complex\. It can be simplified or stylistically changed for enhancement without losing its original meaning\. There are no specific factual accuracies that need to be preserved beyond the idiomatic expression\. The input adheres to the requirements of being a single sentence\.<br><br>OK|1|Don't assume something will happen before it actually does\.|
|text: There's no such thing as a free lunch\.|ok|This input is a single, coherent, and complete sentence\. It is not overly complex and therefore fits the typical sentence length\. It does not require rewriting for clarity, factual accuracy, or simplicity, but it could potentially be stylistically changed to enhance readability and conversational tone\.<br><br>OK|1|You can't really get something for nothing\.|
|text: It takes one to know one\.|ok|The input "It takes one to know one\." is a coherent and complete sentence\. It does not exceed typical sentence length, and it preserves its original meaning and factual accuracy\. The sentence is succinct and does not constitute an entire paragraph\. It could potentially be rewritten in a different stylistic way to enhance readability, but it meets the minimum requirement of being a complete sentence\.<br><br>OK|1|You have to be one to recognize one\.|
|text: You can't make an omelet without breaking eggs\.|ok|This input is a coherent and complete sentence\. It requires rewriting and includes a phrase that can be simplified\. The original meaning and factual accuracy should be preserved after rewriting\. It is not an entire paragraph, and the length does not exceed typical sentence length\. <br>OK|1|You have to break some eggs to make an omelet\.|
|text: You can lead a horse to water, but you can't make it drink\.|ok|The input is a complete and coherent sentence\.<br>It includes a complex phrase that can be simplified\.<br>The input does not exceed a typical sentence length and is not an entire paragraph\.<br>Meaning and factual accuracy can be preserved after rewriting\.<br><br>OK|1|You can show someone the right path, but you can't force them to follow it\.|
|text: There's no place like home\.|ok|The input is a coherent and complete sentence\. It is not an entire paragraph and fits within a typical sentence length\. It provides a clear message that maintains factual accuracy and meaning\. There are no complex phrases needing simplification\. The input meets all the specified criteria for evaluation\.<br><br>OK|1|There's nothing quite like being at home\.|
|text: A journey of a thousand miles begins with a single step\.|ok|This input is a coherent and complete sentence\. It does not constitute an entire paragraph and it is not overly complex\. It is clear and potentially can be rewritten to preserve its original meaning and factual accuracy while enhancing readability or conversational tone\. Therefore, it meets the input specification\.<br><br>OK|1|Every long journey starts with just one small step\.|

### [baseline_test_evals.csv](./baseline_test_evals.csv)

|input|validity|
|-|-|
|text: The quick brown fox jumps over the lazy dog\.|ok|
|text: She sells sea shells by the sea shore\.|ok|
|text: An apple a day keeps the doctor away\.|ok|
|text: Better late than never\.|err|
|text: A stitch in time saves nine\.|ok|
|text: Actions speak louder than words\.|ok|
|text: Every cloud has a silver lining\.|ok|
|text: Laughter is the best medicine\.|ok|
|text: The early bird catches the worm\.|ok|
|text: Practice makes perfect\.|ok|
|text: When in Rome, do as the Romans do\.|ok|
|text: A picture is worth a thousand words\.|ok|
|text: Rome wasn't built in a day\.|ok|
|text: If it ain't broke, don't fix it\.|ok|
|text: Good things come to those who wait\.|ok|
|text: No pain, no gain\.|err|
|text: The pen is mightier than the sword\.|ok|
|text: You can't judge a book by its cover\.|ok|
|text: When the going gets tough, the tough get going\.|ok|
|text: Two wrongs don't make a right\.|ok|
|text: The grass is always greener on the other side\.|ok|
|text: Don't put all your eggs in one basket\.|ok|
|text: Fortune favors the bold\.|ok|
|text: You reap what you sow\.|ok|
|text: A bird in the hand is worth two in the bush\.|ok|
|text: The squeaky wheel gets the grease\.|ok|
|text: You can't have your cake and eat it too\.|ok|
|text: Still waters run deep\.|ok|
|text: Absence makes the heart grow fonder\.|ok|
|text: To each his own\.|ok|
|text: Let sleeping dogs lie\.|err|
|text: The ball is in your court\.|err|
|text: The apple doesn't fall far from the tree\.|ok|
|text: A watched pot never boils\.|err|
|text: Don't count your chickens before they hatch\.|ok|
|text: There's no such thing as a free lunch\.|ok|
|text: It takes one to know one\.|ok|
|text: You can't make an omelet without breaking eggs\.|ok|
|text: You can lead a horse to water, but you can't make it drink\.|ok|
|text: There's no place like home\.|ok|
|text: A journey of a thousand miles begins with a single step\.|ok|