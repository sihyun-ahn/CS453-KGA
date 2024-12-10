## speech-tag ([json](./evals\v8\speech-tag/report.json))

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


### [test_results.csv](./test_results.csv)



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
Determine the part of speech for a given word and return just the tag for the word's part of speech.
`````


### [input_spec.txt](./input_spec.txt)

`````txt
The input is a combination of a sentence and a word contained within that sentence.  
The sentence must be a coherent sequence of words forming a declarative, interrogative, imperative, or exclamatory statement.  
The word must be a single, identifiable term from the given sentence.  
The sentence must contain the word which needs to be tagged for its part of speech.  
The input must not contain any special characters or numbers unrelated to typical sentence structure.  
The input must not be an empty string or contain only whitespace.  
The word must be a valid word in the language of the sentence and cannot be a random sequence of characters.  
The input word should be straightforward and not require disambiguation within the context of the sentence provided.  
`````


### [rules.txt](./rules.txt)

`````txt
1: The output must be a single part of speech tag that represents the given word's role in the sentence according to the specified list of tags. 
2: If the given word cannot be accurately tagged using the provided list of part-of-speech tags, the output must be the word "Unknown".
3: If it is impossible to determine a part of speech for the given word, the output must be the word "CantAnswer".
4: The output must not contain any additional text, punctuation, or formatting besides the part of speech tag or the words "Unknown" or "CantAnswer".
`````


### [inverse_rules.txt](./inverse_rules.txt)

`````txt
5: The output must be multiple parts of speech tags representing different potential roles for the given word according to any possible tags.  
6: If the given word can be tagged using any known part-of-speech tags, the output must not include the word "Unknown".  
7: If it is possible to determine a part of speech for the given word, the output must be entirely blank or contain an error message.  
8: The output must contain additional text, punctuation, or formatting besides the part of speech tag or the words "Unknown" or "CantAnswer".
`````


### [tests.csv](./tests.csv)

|testinput|expectedoutput|reasoning|
|-|-|-|
|sentence: The quick brown fox jumps over the lazy dog\., word: fox|NN|The word 'fox' should be tagged as a singular noun as per the list\.|
|sentence: She sells seashells by the seashore\., word: by|IN|The word 'by' functions as a preposition and should be tagged with the corresponding part\-of\-speech tag\.|
|sentence: Wow, that's amazing\!, word: Wow|UH|The word 'Wow' is an interjection and should be tagged accordingly, testing correct single tag output\.|
|sentence: The xylophone zxylophone harmonizes\., word: zxylophone|Unknown|The word 'zxylophone' is not standard and should be tagged as 'Unknown' due to absence of a relevant tag\.|
|sentence: He ate the mysterious food item\., word: food|NN|The test confirms correct tagging as a singular noun, not 'Unknown', due to presence of a valid tag\.|
|sentence: As he qwertyuiop in the room\., word: qwertyuiop|Unknown|The random sequence 'qwertyuiop' does not form a meaningful word, prompting 'Unknown'\.|
|sentence: She spoke eloquently although about nothing in particular\., word: although|CantAnswer|The word 'although' is complex here, making it impossible to determine a clear part of speech, leading to 'CantAnswer'\.|
|sentence: Despite the conditions, they succeeded\., word: conditions|CantAnswer|Multiple interpretations could arise for ‘conditions’, but here testing leads to 'CantAnswer'\.|
|sentence: The truth was uncertain, shenative\., word: shenative|CantAnswer|Using a non\-existent word 'shenative', further tags cannot resolve, resulting in 'CantAnswer'\.|
|sentence: He quickly ran to the store\., word: quickly|RB|Ensures output is solely tag 'RB' with no extra formatting or punctuation\.|
|sentence: This is the best ever\!, word: best|JJS|Validates output is simply 'JJS', testing against unallowed formatting additions\.|
|sentence: Do you have a pen?, word: you|PRP|Output is just 'PRP', checking adherence to the no additional text rule\.|
|sentence: She booked the show\., word: booked|VB VBD VBN|Different roles as 'VB', 'VBD', and 'VBN' are possible, testing for multiple roles\.|
|sentence: Play the notes\., word: Play|VB VBP|Multiple interpretations; the word 'Play' can be 'VB' or 'VBP'\.|
|sentence: The run was tiresome\., word: run|NN VB|Tests correct dual potential roles and tags for the word 'run'\.|
|sentence: She sings beautifully\., word: sings|VBZ|Expected a single valid part of speech tag, ensures 'Unknown' is not falsely used\.|
|sentence: It shines brightly\., word: shines|VBZ|The correct tag 'VBZ' should be used, ensuring 'Unknown' isn't inaccurately applied\.|
|sentence: Light travels fast\., word: travels|VBZ|Verifies proper usage of 'VBZ', guarding against wrongful 'Unknown'\.|
|sentence: The cat sleeps peacefully\., word: cat|NN|Verifies the presence of a part\-of\-speech tag, ensuring outputs are not blank\.|
|sentence: She understood the question\., word: understood|VBD|Tests that an appropriate label like 'VBD' is returned, showing no blank or erroneous output\.|
|sentence: He will write a letter\., word: write|VB|Confirms correct 'VB', eschewing blank or error output, showing rule implication\.|
|sentence: There is a book on the table\., word: book|NN \(identified by software\)|Tests that unwanted text \(annotative or punctuative\) violates the rule\.|
|sentence: A quick brown fox?, word: quick|JJ \- as tagged by tool|Residue text like '\- as tagged by tool' tests adherence by their unwanted presence\.|
|sentence: Where did she go?, word: Where|WRB which is whereatel tags|Examines inclusion of extraneous descriptors which contravene the stipulated rule\.|

### [test_evals.csv](./test_evals.csv)

|rule|model|input|coverage|validity|
|-|-|-|-|-|
|The output must be a single part of speech tag that represents the given word's role in the sentence according to the specified list of tags\.|gpt\-4o\-2024\-08\-06|sentence: The quick brown fox jumps over the lazy dog\., word: fox|err|ok|
|The output must be a single part of speech tag that represents the given word's role in the sentence according to the specified list of tags\.|gpt\-4o\-2024\-08\-06|sentence: She sells seashells by the seashore\., word: by|err|ok|
|The output must be a single part of speech tag that represents the given word's role in the sentence according to the specified list of tags\.|gpt\-4o\-2024\-08\-06|sentence: Wow, that's amazing\!, word: Wow|err|ok|
|If the given word cannot be accurately tagged using the provided list of part\-of\-speech tags, the output must be the word "Unknown"\.|gpt\-4o\-2024\-08\-06|sentence: The xylophone zxylophone harmonizes\., word: zxylophone|ok|err|
|If the given word cannot be accurately tagged using the provided list of part\-of\-speech tags, the output must be the word "Unknown"\.|gpt\-4o\-2024\-08\-06|sentence: He ate the mysterious food item\., word: food|err|ok|
|If the given word cannot be accurately tagged using the provided list of part\-of\-speech tags, the output must be the word "Unknown"\.|gpt\-4o\-2024\-08\-06|sentence: As he qwertyuiop in the room\., word: qwertyuiop|ok|err|
|If it is impossible to determine a part of speech for the given word, the output must be the word "CantAnswer"\.|gpt\-4o\-2024\-08\-06|sentence: She spoke eloquently although about nothing in particular\., word: although|err|ok|
|If it is impossible to determine a part of speech for the given word, the output must be the word "CantAnswer"\.|gpt\-4o\-2024\-08\-06|sentence: Despite the conditions, they succeeded\., word: conditions|err|ok|
|If it is impossible to determine a part of speech for the given word, the output must be the word "CantAnswer"\.|gpt\-4o\-2024\-08\-06|sentence: The truth was uncertain, shenative\., word: shenative|ok|err|
|The output must not contain any additional text, punctuation, or formatting besides the part of speech tag or the words "Unknown" or "CantAnswer"\.|gpt\-4o\-2024\-08\-06|sentence: He quickly ran to the store\., word: quickly|ok|ok|
|The output must not contain any additional text, punctuation, or formatting besides the part of speech tag or the words "Unknown" or "CantAnswer"\.|gpt\-4o\-2024\-08\-06|sentence: This is the best ever\!, word: best|err|ok|
|The output must not contain any additional text, punctuation, or formatting besides the part of speech tag or the words "Unknown" or "CantAnswer"\.|gpt\-4o\-2024\-08\-06|sentence: Do you have a pen?, word: you|err|ok|
|The output must be multiple parts of speech tags representing different potential roles for the given word according to any possible tags\.|gpt\-4o\-2024\-08\-06|sentence: She booked the show\., word: booked|err|ok|
|The output must be multiple parts of speech tags representing different potential roles for the given word according to any possible tags\.|gpt\-4o\-2024\-08\-06|sentence: Play the notes\., word: Play|ok|ok|
|The output must be multiple parts of speech tags representing different potential roles for the given word according to any possible tags\.|gpt\-4o\-2024\-08\-06|sentence: The run was tiresome\., word: run|err|ok|
|If the given word can be tagged using any known part\-of\-speech tags, the output must not include the word "Unknown"\.|gpt\-4o\-2024\-08\-06|sentence: She sings beautifully\., word: sings|ok|ok|
|If the given word can be tagged using any known part\-of\-speech tags, the output must not include the word "Unknown"\.|gpt\-4o\-2024\-08\-06|sentence: It shines brightly\., word: shines|ok|ok|
|If the given word can be tagged using any known part\-of\-speech tags, the output must not include the word "Unknown"\.|gpt\-4o\-2024\-08\-06|sentence: Light travels fast\., word: travels|ok|ok|
|If it is possible to determine a part of speech for the given word, the output must be entirely blank or contain an error message\.|gpt\-4o\-2024\-08\-06|sentence: The cat sleeps peacefully\., word: cat|err|ok|
|If it is possible to determine a part of speech for the given word, the output must be entirely blank or contain an error message\.|gpt\-4o\-2024\-08\-06|sentence: She understood the question\., word: understood|err|ok|
|If it is possible to determine a part of speech for the given word, the output must be entirely blank or contain an error message\.|gpt\-4o\-2024\-08\-06|sentence: He will write a letter\., word: write|ok|ok|
|The output must contain additional text, punctuation, or formatting besides the part of speech tag or the words "Unknown" or "CantAnswer"\.|gpt\-4o\-2024\-08\-06|sentence: There is a book on the table\., word: book|err|ok|
|The output must contain additional text, punctuation, or formatting besides the part of speech tag or the words "Unknown" or "CantAnswer"\.|gpt\-4o\-2024\-08\-06|sentence: A quick brown fox?, word: quick|ok|err|
|The output must contain additional text, punctuation, or formatting besides the part of speech tag or the words "Unknown" or "CantAnswer"\.|gpt\-4o\-2024\-08\-06|sentence: Where did she go?, word: Where|err|ok|

### [baseline_tests.txt](./baseline_tests.txt)

`````txt
sentence: The cat sat on the mat. word: cat
===
sentence: She quickly finished her homework. word: quickly
===
sentence: We will visit Paris next summer. word: Paris
===
sentence: They haven't arrived at the station yet. word: arrived
===
sentence: Tom and Jerry are famous cartoon characters. word: and
===
sentence: She is going to the gym. word: is
===
sentence: There were many reasons for the success. word: There
===
sentence: That is the biggest cake I have ever seen. word: biggest
===
sentence: I can do it alone. word: can
===
sentence: Please hand me the red book. word: book
===
sentence: The baby's toy was missing. word: baby's
===
sentence: Ouch, that hurts! word: Ouch
===
sentence: If he studies hard, he might pass the test. word: If
===
sentence: There are 12 eggs in the basket. word: 12
===
sentence: Whoever answers correctly gets a prize. word: Whoever
===
sentence: Happy people are more productive. word: Happy
===
sentence: The wheels on the bus go round and round. word: on
===
sentence: Jane barely passed the exam this time. word: barely
===
sentence: Alas, the show is over. word: Alas
===
sentence: Would you like tea or coffee? word: or
===
sentence: Some students forgot their umbrellas. word: their
===
sentence: The golden trophy was awarded to the winner. word: golden
===
sentence: I might have taken the wrong turn. word: might
===
sentence: Certainly, that is the correct answer. word: Certainly
`````
