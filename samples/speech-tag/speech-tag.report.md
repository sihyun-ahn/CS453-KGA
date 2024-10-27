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
The output must be a single part of speech tag from the provided list.
If the word can be tagged with one of the listed part of speech tags, the output must be that specific tag.
If the word cannot be tagged with any of the listed part of speech tags, the output must be "Unknown".
If it is not possible to determine the part of speech tag for the word, the output must be "CantAnswer".
`````


### [input_spec.txt](./speech-tag.input_spec.txt)

`````txt
The input must be a sentence followed by a semicolon and a word from that sentence. The sentence should be a complete string of words, containing the specified word. The word must be exactly one word from the sentence provided.
`````


### [baseline_tests.txt](./speech-tag.baseline_tests.txt)

`````txt
sentence: "The quick brown fox jumps over the lazy dog."; word: "The"  
===  
sentence: "She sells sea shells by the sea shore."; word: "sells"  
===  
sentence: "He is running fast."; word: "running"  
===  
sentence: "Alice and Bob went to the market."; word: "and"  
===  
sentence: "Cats are great pets and companions."; word: "Cats"  
===  
sentence: "Yesterday, it rained heavily."; word: "Yesterday"  
===  
sentence: "If it rains, we will cancel the picnic."; word: "If"  
===  
sentence: "The Eiffel Tower is in Paris."; word: "Eiffel"  
===  
sentence: "I have three apples."; word: "three"  
===  
sentence: "This is an interesting book."; word: "interesting"  
===  
sentence: "However, the results were unexpected."; word: "However"  
===  
sentence: "Do you like chocolate or vanilla?"; word: "or"  
===  
sentence: "Sam bought a new pair of shoes."; word: "pair"
`````


### [tests.csv](./speech-tag.tests.csv)

`````csv
Rule ID, Test ID, Test Input, Expected Output, Reasoning
1, 1, "The cat jumped over the moon; cat", "NN", "Tests that a common noun is correctly tagged with an available part of speech tag."
1, 2, "They quickly ran to the store; ran", "VBD", "Ensures a past tense verb is appropriately tagged, verifying correct past tense recognition."
1, 3, "He is the best among us; best", "JJS", "Confirms superlative adjectives are tagged correctly, covering adjective comparison scenarios."
2, 1, "Zebrafinches are colorful birds; Zebrafinches", "NNPS", "Validates that proper plural nouns are correctly tagged when a suitable tag exists."
2, 2, "Quantum physics is fascinating; Quantum", "JJ", "Checks if proper adjectives are identified and tagged even when originating from nouns."
2, 3, "She is a musician; musician", "NN", "Ensures common singular nouns are tagged correctly, particularly in predicate nominative use cases."
3, 1, "He spoke using wibble words; wibble", "Unknown", "Tests how the system handles unknown words that do not correspond to any listed part of speech tag."
3, 2, "The proprietary term is 'xylophonize'; xylophonize", "Unknown", "Challenges the software's ability to identify genuinely untaggable and unique invented terms."
3, 3, "She says blorpt; blorpt", "Unknown", "Checks the handling of nonsensical words that lack a clear part of speech tag."
4, 1, "The book was signed by someone; someone", "CantAnswer", "Tests the system's handling of ambiguous pronouns where tagging might not be feasible."
4, 2, "I will be back; be", "CantAnswer", "Ensures verbs with multiple possible roles are correctly identified where tagging is uncertain."
4, 3, "He could play; could", "CantAnswer", "Verifies handling when the auxiliary verb can have multiple meanings, making tagging challenging."
`````
