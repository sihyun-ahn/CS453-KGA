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


### [inverse_rules.txt](./speech-tag.inverse_rules.txt)

`````txt
The output must consist of multiple part of speech tags from the provided list.
If the word cannot be tagged with one of the listed part of speech tags, the output must not be that specific tag.
If the word can be tagged with any of the listed part of speech tags, the output must not be "Unknown".
If it is possible to determine the part of speech tag for the word, the output must not be "CantAnswer".
`````


### [input_spec.txt](./speech-tag.input_spec.txt)

`````txt
The input consists of a sentence and a word separated by a semicolon.
The sentence can contain any combination of words, punctuation, and spaces.
The word must be a valid word that appears in the provided sentence.
The sentence can be of any length as long as it contains the specified word.
The word should be a single, contiguous sequence of characters without spaces.
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
1, 1, "The quick brown fox jumps over the lazy dog; fox", "NN", "Tests if the software correctly identifies 'fox' as a noun, which adheres to the list of part of speech tags."
1, 2, "She sings beautifully; sings", "VBZ", "Evaluates if the software can tag 'sings' as a verb in the present tense, adhering to the list."
1, 3, "They are the winners in the end; winners", "NNS", "Checks if 'winners' is identified as a plural noun, which is part of the specified tags."

2, 1, "Yesterday was a sunny day; was", "VBD", "Examines if 'was' is tagged as a past tense verb, confirming adherence to the specified list of tags."
2, 2, "The team played very well; played", "VBD", "Assesses whether 'played' is tagged as a past tense verb, following the part of speech tags list."
2, 3, "Can you help me?; Can", "MD", "Verifies if 'Can' is recognized as a modal verb, supporting the rule that valid tags should be applied."

3, 1, "She went to the store; store", "NN", "Ensures that 'store' is tagged as a noun, which fits within the provided part of speech tags, avoiding 'Unknown'."
3, 2, "This is an excellent opportunity; opportunity", "NN", "Verifies that 'opportunity' is recognized as a noun, avoiding an 'Unknown' response."
3, 3, "Quickly moving; Quickly", "RB", "Checks if 'Quickly' is tagged as an adverb, avoiding 'Unknown' by using a valid tag."

4, 1, "The sun shines bright; shines", "VBZ", "Ensures that 'shines' is tagged correctly, matching the list, and not producing multiple tags."
4, 2, "Her book is on the table; book", "NN", "Confirms that 'book' is tagged singularly as a noun, in line with the tag list, and not creating multiple tags."
4, 3, "Come here now; here", "RB", "Tests that 'here' is tagged as an adverb, ensuring a single tag from the list and not multiple tags."

5, 1, "The man laughed loudly; laughed", "VBD", "Confirms that 'laughed' does not receive an irrelevant tag, adhering strictly to correct tagging."
5, 2, "She is going to school; school", "NN", "Verifies that 'school' is tagged precisely as a noun, ensuring no incorrect tags are assigned."
5, 3, "He often travels; travels", "VBZ", "Checks that 'travels' is tagged as a verb, ensuring no incorrect or unrelated tags."

6, 1, "A sudden change; change", "NN", "Ensures 'change' is tagged as a noun, not 'Unknown', validating proper identification."
6, 2, "He will be there; will", "MD", "Tests if 'will' is correctly tagged as a modal and avoids 'Unknown', confirming proper recognition."
6, 3, "She can sing; sing", "VB", "Checks that 'sing' is tagged as a verb and not 'Unknown', supporting accurate identification."
`````
