## speech-tag ([json](./speech-tag.report.json))


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


### [intent.txt](./speech-tag.intent.txt)

`````txt
Determine the part of speech for a given word in a sentence.
`````


### [input_spec.txt](./speech-tag.input_spec.txt)

`````txt
The input must be a sentence followed by a semicolon and a word from that sentence.  
The sentence must contain the specified word.  
The word must be clearly separated from the sentence by a semicolon.  
The input must provide a complete sentence.  
The word must be a single, continuous string without punctuation.  
`````


### [rules.txt](./speech-tag.rules.txt)

`````txt
The output must consist solely of a part of speech tag or a specific placeholder if tagging is not possible.
The part of speech tag should be selected from the provided list of tags.
If the word cannot be tagged with any of the listed tags, the output must be "Unknown."
If the chatbot is unable to tag the word, the output must be "CantAnswer."
The output must not contain any additional text or explanation besides the tag or placeholder.
`````


### [inverse_rules.txt](./speech-tag.inverse_rules.txt)

`````txt
The output can include additional text or explanations besides the tag or placeholder.
The part of speech tag should be selected from outside the provided list of tags.
If the word cannot be tagged with any of the listed tags, the output must not be "Unknown."
If the chatbot is unable to tag the word, the output must not be "CantAnswer."
The output must consist of more than just a part of speech tag or a specific placeholder if tagging is not possible.
`````


### [baseline_tests.txt](./speech-tag.baseline_tests.txt)

|input|
|-|
|sentence: She was running quickly to catch the bus; word: running|
|sentence: The quick brown fox jumps over the lazy dog; word: fox|
|sentence: Can you believe it's already December?; word: December|
|sentence: He will arrive at three o'clock; word: three|
|sentence: I haven't seen any of those movies; word: movies|
|sentence: Despite the rain, they continued playing; word: Despite|
|sentence: Wow, that's an amazing view\!; word: Wow|
|sentence: She has a collection of rare coins; word: rare|
|sentence: This is the best cake I've ever had; word: best|
|sentence: Either you start now or never; word: Either|
|sentence: It seems like a distant memory; word: seems|
|sentence: They were discussing the latest news; word: were|
|sentence: What are the chances of that happening?; word: What|
|sentence: He bought a red, shiny car; word: shiny|
|sentence: Please hand me those books; word: those|
|sentence: The price increased significantly; word: significantly|
|sentence: She quickly finished her homework; word: quickly|
|sentence: It's my mother's birthday today; word: mother's|

### [tests.csv](./speech-tag.tests.csv)

|Rule ID|Test ID|Test Input|Expected Output|Reasoning|
|-|-|-|-|-|
|1|1|The apple is red; apple|NN|The word 'apple' is clearly a noun and should be tagged as 'NN'\. Valid input according to the specification\.|
|1|2|There were seven cats; seven|CD|The word 'seven' is a cardinal number and should be tagged as 'CD'\. Meets input specification with distinct sentence and word separation\.|
|1|3|She thought it was very exciting; exciting|JJ|The word 'exciting' is an adjective and should be tagged as 'JJ'\. Correctly follows the input format guidelines\.|
|2|1|He works on Mondays; Mondays|NNS|The word 'Mondays' is a plural noun and should be tagged as 'NNS'\. Adheres to the input specifications\.|
|2|2|I can't do it; can't|MD|The contraction 'can't' includes a modal verb 'can', so it should be tagged as 'MD'\. Input is valid and word is part of the sentence\.|
|2|3|She goes quickly; quickly|RB|The word 'quickly' is an adverb and should be tagged as 'RB'\. Proper separation and format as per the input guidelines\.|
|3|1|He said hello; hello|UH|The word 'hello' is an interjection and should be tagged as 'UH'\. Conforms to input specifications with clear sentence and word delineation\.|
|3|2|It is a unique book; unique|JJ|The word 'unique' is an adjective and should be tagged as 'JJ'\. Meets all input criteria\.|
|3|3|They are running; running|VBG|The word 'running' is a verb in gerund form and should be tagged as 'VBG'\. Valid input structure\.|

### [test_evals.csv](./speech-tag.test_evals.csv)

|id|promptid|model|rule|input|evaluation|error|
|-|-|-|-|-|-|-|
|5a6682c|7ac6214|gpt\-4o\-2024\-08\-06|The output must consist solely of a part of speech tag or a specific placeholder if tagging is not possible\.|The apple is red; apple|Noun||
|11370b0|7ac6214|gpt\-4o\-2024\-08\-06|The output must consist solely of a part of speech tag or a specific placeholder if tagging is not possible\.|There were seven cats; seven|Number||
|3317ef2|7ac6214|gpt\-4o\-2024\-08\-06|The part of speech tag should be selected from the provided list of tags\.|She goes quickly; quickly|RB||
|1da2962|7ac6214|gpt\-4o\-2024\-08\-06|The part of speech tag should be selected from the provided list of tags\.|I can't do it; can't|Verb||
|cd00e42|7ac6214|gpt\-4o\-2024\-08\-06|If the word cannot be tagged with any of the listed tags, the output must be "Unknown\."|He said hello; hello|Interjection||
|cfd95d4|7ac6214|gpt\-4o\-2024\-08\-06|If the word cannot be tagged with any of the listed tags, the output must be "Unknown\."|It is a unique book; unique|Adjective||
|d2b0937|7ac6214|gpt\-4o\-2024\-08\-06|If the word cannot be tagged with any of the listed tags, the output must be "Unknown\."|They are running; running|Verb||
|402a653|7ac6214|gpt\-4o\-2024\-08\-06|The output must consist solely of a part of speech tag or a specific placeholder if tagging is not possible\.|She thought it was very exciting; exciting|Adjective||
|dccdda7|7ac6214|gpt\-4o\-2024\-08\-06|The part of speech tag should be selected from the provided list of tags\.|He works on Mondays; Mondays|NNS||

### [test_results.csv](./speech-tag.test_results.csv)

|id|promptid|model|input|output|evaluationReason|evaluation|
|-|-|-|-|-|-|-|
|11370b0|7ac6214|gpt\-4o\-mini|There were seven cats; seven|CD|The output complies with the description by providing a single part of speech tag\.|passed|
|5a6682c|7ac6214|gpt\-4o\-mini|The apple is red; apple|NN|The output "NN" is a valid part of speech tag according to the given description\.|passed|
|dccdda7|7ac6214|gpt\-4o\-mini|He works on Mondays; Mondays|NNS|The output "NNS" is a valid part of speech tag from the provided list\.|passed|
|1da2962|7ac6214|gpt\-4o\-mini|I can't do it; can't|MD|The output "MD" is a valid part\-of\-speech tag according to the given list and complies with the description\.|passed|
|cd00e42|7ac6214|gpt\-4o\-mini|He said hello; hello|UH|The output "UH" is a valid part\-of\-speech tag according to the list provided\.|passed|
|3317ef2|7ac6214|gpt\-4o\-mini|She goes quickly; quickly|RB|The output "RB" is a valid part of speech tag as listed in the description\.|passed|
|d2b0937|7ac6214|gpt\-4o\-mini|They are running; running|VBG|The output "VBG" is a valid part\-of\-speech tag from the provided list\.|passed|
|402a653|7ac6214|gpt\-4o\-mini|She thought it was very exciting; exciting|JJ|The output "JJ" matches the specified part of speech tag format\.|passed|
|cfd95d4|7ac6214|gpt\-4o\-mini|It is a unique book; unique|JJ|The output "JJ" is a valid part\-of\-speech tag from the list provided in the description\.|passed|