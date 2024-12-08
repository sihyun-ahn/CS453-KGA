## speech-tag ([json](./evals\o1preview-gpt4\speech-tag/report.json))

- 6 rules
- 6 inverse rules
- 72 tests, 36 baseline tests

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
Determine the part of speech of a given word in a sentence and return its part of speech tag.
`````


### [input_spec.txt](./input_spec.txt)

`````txt
The input is a sentence and a word contained in that sentence.
The sentence can be any string of words.
The sentence may include punctuation and symbols.
The word is a word present in the sentence.
There is no restriction on the length of the sentence.
There is no restriction on the length of the word.
`````


### [rules.txt](./rules.txt)

`````txt
1: The output is a single string containing only the part-of-speech tag corresponding to the given word in the provided sentence.
2: The part-of-speech tag must be one of the predefined uppercase abbreviations provided in the list, such as 'NN', 'VBD', 'JJ', etc.
3: If the given word cannot be tagged with any of the predefined part-of-speech tags, the output is the word 'Unknown', starting with an uppercase 'U' followed by lowercase letters.
4: If the assistant is unable to determine the part-of-speech tag for the word for any reason, the output is the word 'CantAnswer', with an uppercase 'C' and an uppercase 'A' and the rest in lowercase letters.
5: The output contains only the required part-of-speech tag or the words 'Unknown' or 'CantAnswer', with no additional text, punctuation, or formatting.
6: All outputs must be exactly as specified, without any additional spaces, explanations, or characters.
`````


### [inverse_rules.txt](./inverse_rules.txt)

`````txt
7: The output is not a single string containing only the part-of-speech tag corresponding to the given word in the provided sentence.
8: The part-of-speech tag must not be one of the predefined uppercase abbreviations provided in the list, such as 'NN', 'VBD', 'JJ', etc.
9: If the given word cannot be tagged with any of the predefined part-of-speech tags, the output is not the word 'Unknown', starting with an uppercase 'U' followed by lowercase letters.
10: If the assistant is unable to determine the part-of-speech tag for the word for any reason, the output is not the word 'CantAnswer', with an uppercase 'C' and an uppercase 'A' and the rest in lowercase letters.
11: The output may contain additional text, punctuation, or formatting beyond the required part-of-speech tag or the words 'Unknown' or 'CantAnswer'.
12: Outputs may include additional spaces, explanations, or characters, and may not be exactly as specified.
`````


### [tests.csv](./tests.csv)

|testinput|expectedoutput|reasoning|
|-|-|-|
|Sentence: 'The cat sat on the mat\.' Word: 'cat'|NN|This test checks that the software outputs only the POS tag 'NN' for the word 'cat', adhering to Rule 1\.|
|Sentence: 'He is running fast\.' Word: 'running'|VBG|This test ensures the software outputs only 'VBG' for 'running', complying with Rule 1\.|
|Sentence: 'Wow, that is amazing\!' Word: 'Wow'|UH|This test verifies that only the POS tag 'UH' is returned for 'Wow', as per Rule 1\.|
|Sentence: 'She reads books every day\.' Word: 'reads'|VBZ|This test confirms that 'reads' is tagged as 'VBZ', a predefined tag, following Rule 2\.|
|Sentence: 'He has a red apple\.' Word: 'red'|JJ|This test checks that 'red' is correctly tagged as 'JJ', a predefined POS tag, adhering to Rule 2\.|
|Sentence: 'They are going to school\.' Word: 'to'|TO|This test ensures that 'to' is tagged as 'TO', one of the predefined tags, complying with Rule 2\.|
|Sentence: 'He said blorf yesterday\.' Word: 'blorf'|Unknown|This test checks that for an untaggable word 'blorf', the software outputs 'Unknown', as specified in Rule 3\.|
|Sentence: 'The qwerty jumped over the lazy dog\.' Word: 'qwerty'|Unknown|This test ensures that 'qwerty', an unknown word, results in 'Unknown', following Rule 3\.|
|Sentence: 'She smiled :\) after hearing the news\.' Word: ':\)'|Unknown|This test verifies that an emoticon ':\)' is tagged as 'Unknown', adhering to Rule 3\.|
|Sentence: '' Word: 'hello'|CantAnswer|This test checks that with an empty sentence, the output is 'CantAnswer', as the POS tag cannot be determined, per Rule 4\.|
|Sentence: 'He said привет yesterday\.' Word: 'привет'|CantAnswer|This test ensures that non\-English word 'привет' results in 'CantAnswer', complying with Rule 4\.|
|Sentence: 'He whispered something quietly\.' Word: 'some~thing'|CantAnswer|This test verifies that the irregular word 'some~thing' leads to 'CantAnswer', as specified in Rule 4\.|
|Sentence: 'She sings beautifully\.' Word: 'sings'|VBZ|This test confirms that only 'VBZ' is output for 'sings', with no extra text, adhering to Rule 5\.|
|Sentence: 'They quickly ran away\.' Word: 'quickly'|RB|This test ensures the output is 'RB' for 'quickly', without additional text, following Rule 5\.|
|Sentence: 'I will call you tomorrow\.' Word: 'tomorrow'|NN|This test verifies that only 'NN' is returned for 'tomorrow', complying with Rule 5\.|
|Sentence: 'This is a test\.' Word: 'test'|NN|This test checks that the output is exactly 'NN', with no extra spaces or characters, as per Rule 6\.|
|Sentence: 'He arrived late\.' Word: 'late'|RB|This test ensures that 'late' is tagged as 'RB' precisely, adhering to Rule 6\.|
|Sentence: 'The book is interesting\.' Word: 'interesting'|JJ|This test confirms that only 'JJ' is output for 'interesting', following Rule 6\.|
|Sentence: 'She is reading a book\.' Word: 'reading'|The POS tag for 'reading' is VBG\.|This test checks that the output includes additional text, not just the POS tag, complying with Rule 7\.|
|Sentence: 'They arrived late\.' Word: 'late'|RB \(adverb\)|This test ensures the output provides more information than just 'RB', adhering to Rule 7\.|
|Sentence: 'He bought apples\.' Word: 'apples'|The word 'apples' is a plural noun \(NNS\)\.|This test verifies that the output is not a single POS tag, as specified in Rule 7\.|
|Sentence: 'She sings beautifully\.' Word: 'sings'|Verb|This test checks that 'sings' is tagged as 'Verb' instead of 'VBZ', complying with Rule 8\.|
|Sentence: 'He has a red car\.' Word: 'red'|Adjective|This test ensures that 'red' is labeled 'Adjective' rather than 'JJ', following Rule 8\.|
|Sentence: 'They play soccer every weekend\.' Word: 'play'|Verb|This test confirms that 'play' is tagged as 'Verb', not 'VBP', adhering to Rule 8\.|
|Sentence: 'He said blorf yesterday\.' Word: 'blorf'|Unrecognized word|This test checks that the output is not 'Unknown' for 'blorf', complying with Rule 9\.|
|Sentence: 'Please fix the asdkjfh\.' Word: 'asdkjfh'|Word cannot be tagged|This test ensures a different message than 'Unknown' is returned, following Rule 9\.|
|Sentence: 'She smiled :\)\.' Word: ':\)'|Not applicable|This test verifies that the output is not 'Unknown' for ':\)', as specified in Rule 9\.|
|Sentence: '' Word: 'hello'|No sentence provided|This test checks that 'CantAnswer' is not output when the sentence is empty, complying with Rule 10\.|
|Sentence: 'He said привет\.' Word: 'привет'|Unable to process non\-English characters|This test ensures a different output than 'CantAnswer' for 'привет', following Rule 10\.|
|Sentence: 'The value is 100%\.' Word: '100%'|Cannot tag symbols|This test verifies that 'CantAnswer' is not returned for '100%', adhering to Rule 10\.|
|Sentence: 'She sang a song\.' Word: 'sang'|VBD\!|This test checks that the output includes punctuation, complying with Rule 11\.|
|Sentence: 'He is fast\.' Word: 'fast'|\[RB\]|This test ensures the output has additional formatting, following Rule 11\.|
|Sentence: 'They are running\.' Word: 'running'|VBG \- Verb, gerund|This test verifies that extra explanation is included, adhering to Rule 11\.|
|Sentence: 'It's a beautiful day\.' Word: 'beautiful'|JJ|This test checks that the output includes an extra space, complying with Rule 12\.|
|Sentence: 'Time flies\.' Word: 'Time'| NN|This test ensures there is an additional space before 'NN', following Rule 12\.|
|Sentence: 'He will arrive soon\.' Word: 'will'|MD \(modal\)|This test verifies that extra characters are included in the output, adhering to Rule 12\.|

### [baseline_tests.txt](./baseline_tests.txt)

`````txt
Sentence: She likes tea and coffee.
Word: and
===
Sentence: He has three dogs.
Word: three
===
Sentence: This is important.
Word: This
===
Sentence: There is a problem.
Word: There
===
Sentence: She said, 'adiós' and left.
Word: adiós
===
Sentence: He went before me.
Word: before
===
Sentence: The tall man.
Word: tall
===
Sentence: She is taller than me.
Word: taller
===
Sentence: She is the tallest.
Word: tallest
===
Sentence: First, wash your hands.
Word: First
===
Sentence: He can swim.
Word: can
===
Sentence: The cat sleeps.
Word: cat
===
Sentence: Cats are cute.
Word: Cats
===
Sentence: Mary went to Paris.
Word: Mary
===
Sentence: The Smiths are here.
Word: Smiths
===
Sentence: Both options are good.
Word: Both
===
Sentence: John's book is on the table.
Word: 's
===
Sentence: She is here.
Word: She
===
Sentence: Her car is red.
Word: Her
===
Sentence: She runs quickly.
Word: quickly
===
Sentence: She runs faster than him.
Word: faster
===
Sentence: She runs fastest.
Word: fastest
===
Sentence: He gave up smoking.
Word: up
===
Sentence: The equation is E=mc^2.
Word: =
===
Sentence: I want to go.
Word: to
===
Sentence: Wow, that's great!
Word: Wow
===
Sentence: I like to eat.
Word: eat
===
Sentence: She walked home.
Word: walked
===
Sentence: She is swimming.
Word: swimming
===
Sentence: She has eaten.
Word: eaten
===
Sentence: I go home.
Word: go
===
Sentence: He eats an apple.
Word: eats
===
Sentence: I know which car is yours.
Word: which
===
Sentence: Who are you?
Word: Who
===
Sentence: Whose book is this?
Word: Whose
===
Sentence: When will you arrive?
Word: When
`````
