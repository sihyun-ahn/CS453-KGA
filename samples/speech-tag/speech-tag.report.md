## [speech-tag](samples/speech-tag/speech-tag.prompty) ([json](./speech-tag.report.json))


### [prompty](./speech-tag.prompty)

`````md
---
name: Speech Tag
description: Determine the part of speech for a given word
source: "modified from 'SAMMO: A general-purpose framework for prompt optimization'"
url: https://www.microsoft.com/en-us/research/uploads/prod/2024/04/Prompts-As-Programs_A-Structure-Aware-Approach.pdf
inputs:
    sentence:
        type: "string"
    word:
        type: "string"
sample:
    sentence: "The quick brown fox jumps over the lazy dog."
    word: "jumps"
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
{{sentence}}; {{word}}
`````


### [rules.txt](./speech-tag.rules.txt)

`````txt
The output must be a single part of speech tag from the provided list of tags.
The output must be one of the following tags: CC, CD, DT, EX, FW, IN, JJ, JJR, JJS, LS, MD, NN, NNS, NNP, NNPS, PDT, POS, PRP, PRP$, RB, RBR, RBS, RP, SYM, TO, UH, VB, VBD, VBG, VBN, VBP, VBZ, WDT, WP, WP$, WRB.
If the word cannot be tagged with any of the listed tags, the output must be "Unknown."
If the task is impossible to complete, the output must be "CantAnswer."
The output must not contain any additional text or formatting other than the tag or specified responses.
`````


### [inverse_rules.txt](./speech-tag.inverse_rules.txt)

`````txt
The output must not be a part-of-speech tag from the provided list.
If the word matches one of the listed tags, return any tag except that specific tag.
If the word cannot be tagged using the provided list, the output must not be "Unknown."
If it is not possible to determine the part of speech for the word, the output must not be "CantAnswer."
The output must contain additional information or explanation beyond the tag itself.
`````


### [input_spec.txt](./speech-tag.input_spec.txt)

`````txt
A sentence must be provided as input.  
A word contained within the sentence must also be provided separately.
`````


### [baseline_tests.txt](./speech-tag.baseline_tests.txt)

`````txt
sentence: "She sells sea shells by the sea shore."; word: "sells"
===
sentence: "After the rain stopped, the rainbow appeared in the sky."; word: "rainbow"
===
sentence: "Can you pass the salt, please?"; word: "pass"
`````


### [tests.csv](./speech-tag.tests.csv)

`````csv
Rule ID, Test ID, Test Input, Expected Output, Reasoning
1, 1, "sentence: I will book the flight.; word: book", "VB", "Tests correct tagging for a verb in context, expecting verb form 'to book'."
1, 2, "sentence: The book is on the table.; word: book", "NN", "Tests correct tagging for a noun in context, expecting noun form 'book'."
1, 3, "sentence: Please book a slot.; word: book", "VB", "Confirms verb tagging when 'book' is used in an imperative sentence."
2, 1, "sentence: She has a can.; word: can", "NN", "Tests correct tagging for a noun 'can', distinct from modal usage."
2, 2, "sentence: I can swim.; word: can", "MD", "Confirms modal tagging when 'can' is used as a modal verb."
2, 3, "sentence: Can you help me?; word: can", "MD", "Validates modal tagging in a question context."
3, 1, "sentence: The zxy is rare.; word: zxy", "Unknown", "Tests handling of unknown words, ensuring 'Unknown' is returned."
3, 2, "sentence: The tree is tall.; word: tree", "NN", "Confirms correct noun tagging for a known word."
3, 3, "sentence: The qwerty is broken.; word: qwerty", "Unknown", "Checks response for non-dictionary words, expecting 'Unknown'."
4, 1, "sentence: Her favorite color is blue.; word: color", "NN", "Ensures noun 'color' is tagged correctly."
4, 2, "sentence: He runs fast.; word: fast", "RB", "Verifies adverb tagging for 'fast' in this context."
4, 3, "sentence: It was fast.; word: fast", "JJ", "Confirms adjective tagging for 'fast' when used to describe a noun."
`````
