## speech-tag ([json](./evals\v6\speech-tag/report.json))

- 4 rules
- 4 inverse rules
- 48 tests, 24 baseline tests

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



### [speech-tag.prompty](./speech-tag.prompty)

`````md
---
name: Speech Tag
description: Determine the part of speech for a given word
source: "modified from 'SAMMO: A general-purpose framework for prompt optimization'"
url: https://www.microsoft.com/en-us/research/uploads/prod/2024/04/Prompts-As-Programs_A-Structure-Aware-Approach.pdf
inputs:
    sentenceword:
        type: string
sample:
    sentenceword: "The quick brown fox jumps over the lazy dog.; jumps"
---
system:
In this task, you will be presented with a sentence and a word contained
in that sentence. You have to determine the part of speech for a given word
and return just the tag for the word's part of speech. 

Return only the part of speech tag.  If the word cannot be tagged with
the listed tags, return Unknown.  If you are unable to tag the word, return
CantAnswer.

Here is the
Alphabetical list of part-of-speech tags used in this task: CC: Coordinating conjunction, CD: Cardinal number, DT:
Determiner, EX: Existential there, FW: Foreign word, IN: Preposition or subordinating conjunction, JJ: Adjective, JJR:
Adjective, comparative, JJS: Adjective, superlative, LS: List item marker, MD: Modal, NN: Noun, singular or mass, NNS: Noun,
plural, NNP: Proper noun, singular, NNPS: Proper noun, plural, PDT: Predeterminer, POS: Possessive ending, PRP: Personal
pronoun, PRP$: Possessive pronoun, RB: Adverb, RBR: Adverb, comparative, RBS: Adverb, superlative, RP: Particle, SYM: Symbol,
TO: to, UH: Interjection, VB: Verb, base form, VBD: Verb, past tense, VBG: Verb, gerund or present participle, VBN: Verb,
past participle, VBP: Verb, non-3rd person singular present, VBZ: Verb, 3rd person singular present, WDT: Wh-determiner, WP:
Wh-pronoun, WP$: Possessive wh-pronoun, WRB: Wh-adverb
user:
{{sentenceword}}
`````


### [intent.txt](./intent.txt)

`````txt
Determine the part of speech for a given word and return the corresponding tag.
`````


### [input_spec.txt](./input_spec.txt)

`````txt
The input must be a string containing a sentence followed by a word from that sentence. 
The input string must clearly separate the sentence and the word, either through punctuation or whitespace.
The input sentence can contain any number of words. 
The input word must be a single word present in the sentence.
The sentence may include punctuation marks, but the word to be tagged should not contain punctuation.
`````


### [rules.txt](./rules.txt)

`````txt
1: The output must contain only one part of speech tag or a predefined response.  
2: If the word corresponds to a part of speech, the output must be exactly one of the tags from the specified list of part-of-speech tags, without adding any explanations or characters.  
3: If the word cannot be tagged with any of the listed part-of-speech tags, the output must be exactly the word "Unknown" without any additional characters or information.  
4: If the task cannot be completed or is unanswerable for any reason, the output must be exactly the word "CantAnswer" without any additional characters or information.
`````


### [inverse_rules.txt](./inverse_rules.txt)

`````txt
5: The output can contain multiple part of speech tags or various responses.  
6: If the word corresponds to a part of speech, the output must include explanations and additional characters or tags not from the specified list.  
7: If the word cannot be tagged with any of the listed part-of-speech tags, add explanations or additional information to the word "Known".  
8: If the task cannot be completed or is unanswerable for any reason, the output must not use the word "CantAnswer" and should include other characters or information.
`````


### [tests.csv](./tests.csv)

|testinput|expectedoutput|reasoning|
|-|-|-|
|The cat sat on the mat\. cat|NN|Tests whether there is a single part of speech tag for a clear noun without additional content\.|
|Quickly, he ran across the field\. ran|VBD|Checks if the verb 'ran' is tagged correctly, expecting only one tag\.|
|She loves singing and dancing\. singing|VBG|Verifies that the word 'singing' is tagged with a single tag indicating the progressive verb form\.|
|Every student is present today\. student|NN|Checks if 'student' is tagged correctly as a noun, with no additional characters\.|
|He spoke to the crowd with authority\. with|IN|Validates that 'with' is tagged as a preposition, a tag from the specified list without extra characters\.|
|Those apples are sweet and juicy\. apples|NNS|Ensures that 'apples' is tagged as a plural noun, using only one of the predefined tags\.|
|He whispered softly\. softly|Unknown|Evaluates if the adverb 'softly' is tagged as Unknown as it doesn't match predefined part\-of\-speech tags\.|
|This is an apple\. is|Unknown|Tests for 'is' when it is a connector and if the noun verb cannot be identified, then 'Unknown' should be returned\.|
|I want to learn all languages\. want|Unknown|Investigates if 'want' is returned correctly as 'Unknown' in the absence of an appropriate tag\.|
|The ancient ruins stood there silently\. Xyzword|CantAnswer|Assessing if the software correctly returns 'CantAnswer' for an unsolvable word not present in the sentence\.|
|Understanding complex problems is tough\. Understanding|CantAnswer|Checks handling of full sentence as input word, where processing can't happen reliably\.|
|This, indeed, is interesting\. indeedly|CantAnswer|Tests how the software handles a nonsense or mistakenly formed word not in the sentence\.|
|The sun rises in the east\. sun|Multiple|Intentionally incorrect rule test to see disallowed multiple outputs for a straightforward noun\.|
|She can ski very well if she wants\. well|Various|Incorrectly generating multiple outputs for a case that should return 'RB', to test rule robustness\.|
|Turn the volume down\. volume|Various|Demonstrates disallowed multiple tagging outputs where only 'NN' is expected\.|
|Birds fly in the sky\. fly|VB with action motion|Challenges software with an incorrect format expecting 'fly' with additional information instead of just 'VB'\.|
|He quickly understood\. quickly|RB with speed descriptor|Evaluates incorrect behavior where additional explanations accompany the tag for 'quickly'\.|
|The man smiled warmly\. smiled|VBD with emotion descriptor|Tests malfunctioning outputs that wrongly add non\-specified information to 'smiled'\.|
|Jumping is fun\. Hovercraft|Known|Incorrect response as 'Unknown' should be returned for a non\-tag word 'Hovercraft'\.|
|Her presence was comforting\. Herly|Known|Verifies invalid output as explanations are incorrectly added to a non\-existing tag\.|
|Does he still see the stars? seeingly|Known|Challenging the rule with improper tagging information added instead of 'Unknown'\.|
|Can you solve this easier? xyz|Unable to determine|Invalid test anticipating diversified output rather than 'CantAnswer'\.|
|The paper was folded neatly\. foldedly|See remarks|Strategically incorrect response as additional information caused improper rule execution\.|
|My book is the oldest\. Bookically|Consult help|Shows incorrect handling where 'CantAnswer' should be given without extra text\.|

### [test_evals.csv](./test_evals.csv)

|rule|model|input|coverage|validity|
|-|-|-|-|-|
|The output must contain only one part of speech tag or a predefined response\.|gpt\-4o\-2024\-08\-06|The cat sat on the mat\. cat|NN|ok|
|The output must contain only one part of speech tag or a predefined response\.|gpt\-4o\-2024\-08\-06|Quickly, he ran across the field\. ran|VBD|ok|
|The output must contain only one part of speech tag or a predefined response\.|gpt\-4o\-2024\-08\-06|She loves singing and dancing\. singing|VBG|ok|
|If the word corresponds to a part of speech, the output must be exactly one of the tags from the specified list of part\-of\-speech tags, without adding any explanations or characters\.|gpt\-4o\-2024\-08\-06|Every student is present today\. student|NN|ok|
|If the word corresponds to a part of speech, the output must be exactly one of the tags from the specified list of part\-of\-speech tags, without adding any explanations or characters\.|gpt\-4o\-2024\-08\-06|He spoke to the crowd with authority\. with|IN|ok|
|If the word corresponds to a part of speech, the output must be exactly one of the tags from the specified list of part\-of\-speech tags, without adding any explanations or characters\.|gpt\-4o\-2024\-08\-06|Those apples are sweet and juicy\. apples|NNS|ok|
|If the word cannot be tagged with any of the listed part\-of\-speech tags, the output must be exactly the word "Unknown" without any additional characters or information\.|gpt\-4o\-2024\-08\-06|He whispered softly\. softly|RB|ok|
|If the word cannot be tagged with any of the listed part\-of\-speech tags, the output must be exactly the word "Unknown" without any additional characters or information\.|gpt\-4o\-2024\-08\-06|This is an apple\. is|VBZ|ok|
|If the word cannot be tagged with any of the listed part\-of\-speech tags, the output must be exactly the word "Unknown" without any additional characters or information\.|gpt\-4o\-2024\-08\-06|I want to learn all languages\. want|VB|ok|
|If the task cannot be completed or is unanswerable for any reason, the output must be exactly the word "CantAnswer" without any additional characters or information\.|gpt\-4o\-2024\-08\-06|The ancient ruins stood there silently\. Xyzword|Unknown|err|
|If the task cannot be completed or is unanswerable for any reason, the output must be exactly the word "CantAnswer" without any additional characters or information\.|gpt\-4o\-2024\-08\-06|Understanding complex problems is tough\. Understanding|VBG|ok|
|If the task cannot be completed or is unanswerable for any reason, the output must be exactly the word "CantAnswer" without any additional characters or information\.|gpt\-4o\-2024\-08\-06|This, indeed, is interesting\. indeedly|Unknown|err|
|The output can contain multiple part of speech tags or various responses\.|gpt\-4o\-2024\-08\-06|The sun rises in the east\. sun|Noun|ok|
|The output can contain multiple part of speech tags or various responses\.|gpt\-4o\-2024\-08\-06|She can ski very well if she wants\. well|RB|ok|
|The output can contain multiple part of speech tags or various responses\.|gpt\-4o\-2024\-08\-06|Turn the volume down\. volume|NN|ok|
|If the word corresponds to a part of speech, the output must include explanations and additional characters or tags not from the specified list\.|gpt\-4o\-2024\-08\-06|Birds fly in the sky\. fly|VB|ok|
|If the word corresponds to a part of speech, the output must include explanations and additional characters or tags not from the specified list\.|gpt\-4o\-2024\-08\-06|He quickly understood\. quickly|RB|ok|
|If the word corresponds to a part of speech, the output must include explanations and additional characters or tags not from the specified list\.|gpt\-4o\-2024\-08\-06|The man smiled warmly\. smiled|VBD|ok|
|If the word cannot be tagged with any of the listed part\-of\-speech tags, add explanations or additional information to the word "Known"\.|gpt\-4o\-2024\-08\-06|Jumping is fun\. Hovercraft|Unknown|err|
|If the word cannot be tagged with any of the listed part\-of\-speech tags, add explanations or additional information to the word "Known"\.|gpt\-4o\-2024\-08\-06|Her presence was comforting\. Herly|Unknown|err|
|If the word cannot be tagged with any of the listed part\-of\-speech tags, add explanations or additional information to the word "Known"\.|gpt\-4o\-2024\-08\-06|Does he still see the stars? seeingly|Unknown|err|
|If the task cannot be completed or is unanswerable for any reason, the output must not use the word "CantAnswer" and should include other characters or information\.|gpt\-4o\-2024\-08\-06|Can you solve this easier? xyz|Unknown|err|
|If the task cannot be completed or is unanswerable for any reason, the output must not use the word "CantAnswer" and should include other characters or information\.|gpt\-4o\-2024\-08\-06|The paper was folded neatly\. foldedly|Unknown|err|
|If the task cannot be completed or is unanswerable for any reason, the output must not use the word "CantAnswer" and should include other characters or information\.|gpt\-4o\-2024\-08\-06|My book is the oldest\. Bookically|Unknown|err|

### [baseline_tests.txt](./baseline_tests.txt)

`````txt
sentence: The quick brown fox jumps over the lazy dog.  
word: jumps
===
sentence: She sells seashells by the seashore.  
word: seashells
===
sentence: Can you lend me five dollars?  
word: dollars
===
sentence: Unfortunately, we could not attend the meeting.  
word: Unfortunately
===
sentence: Despite the rain, we enjoyed the picnic.  
word: Despite
===
sentence: Call me when you arrive home.  
word: arrive
===
sentence: Wow, that was a close call!  
word: Wow
===
sentence: I'll see you on Monday.  
word: Monday
===
sentence: Cats are known for their independence.  
word: independence
===
sentence: You should have called before coming over.  
word: should
===
sentence: There are several reasons to be optimistic.  
word: There
===
sentence: I gave her a list of items to buy.  
word: list
===
sentence: If you're ready, we can start the meeting.  
word: if
===
sentence: The skyline was breathtaking.  
word: breathtaking
===
sentence: We heard that she won the competition.  
word: that
===
sentence: Connecting dots can be very satisfying.  
word: Connecting
===
sentence: Could you please scoot over a bit?  
word: over
===
sentence: This is the footnote reference¹ in the text.  
word: ¹
===
sentence: She'll be going to the mall later.  
word: going
===
sentence: It's crucial to analyze the data carefully.  
word: carefully
===
sentence: Scarcely had she entered when the phone rang.  
word: Scarcely
===
sentence: At least one player scored a goal.  
word: least
===
sentence: Success is not just about hard work; it's about opportunity.  
word: about
===
sentence: I wonder what would happen next.  
word: what
`````
