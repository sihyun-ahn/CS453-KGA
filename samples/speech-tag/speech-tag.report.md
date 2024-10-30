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


### [baseline_tests.txt](./speech-tag.baseline_tests.txt)

`````txt
sentence: The cat sat on the mat; word: cat
`````

`````txt
sentence: She quickly ran to the store; word: quickly
`````

`````txt
sentence: He is taller than his brother; word: taller
`````

`````txt
sentence: They have visited Paris twice; word: Paris
`````

`````txt
sentence: The books are on the table; word: books
`````

`````txt
sentence: If you go, bring the map; word: if
`````

`````txt
sentence: She gave him an apple; word: apple
`````

`````txt
sentence: John and Mary are friends; word: and
`````

`````txt
sentence: He shouted loudly at the concert; word: loudly
`````


### [rules.txt](./speech-tag.rules.txt)

`````txt
1: The output must consist solely of a part of speech tag or a specific placeholder if tagging is not possible.
2: The part of speech tag should be selected from the provided list of tags.
3: If the word cannot be tagged with any of the listed tags, the output must be "Unknown."
4: If the chatbot is unable to tag the word, the output must be "CantAnswer."
5: The output must not contain any additional text or explanation besides the tag or placeholder.
`````


### [inverse_rules.txt](./speech-tag.inverse_rules.txt)

`````txt
6: The output can include additional text or explanations besides the tag or placeholder.
7: The part of speech tag should be selected from outside the provided list of tags.
8: If the word cannot be tagged with any of the listed tags, the output must not be "Unknown."
9: If the chatbot is unable to tag the word, the output must not be "CantAnswer."
10: The output must consist of more than just a part of speech tag or a specific placeholder if tagging is not possible.
`````


### [tests.csv](./speech-tag.tests.csv)

|Rule ID|Test ID|Test Input|Expected Output|Reasoning|
|-|-|-|-|-|
|1|1|She swiftly ran to the store;swiftly|RB|Tests if an adverb is correctly identified with the correct tag from the provided list\.|
|1|2|The cat sat on the mat;cat|NN|Validates that a singular noun is tagged correctly according to the tag list\.|
|1|3|They have been running for hours;running|VBG|Checks if the verb in gerund form is tagged as per the list\.|
|2|1|Can he do it;he|PRP|Ensures the correct personal pronoun tag is used from the list\.|
|2|2|The tallest building in the city;tallest|JJS|Verifies the use of the superlative adjective tag as per the provided list\.|
|2|3|Although it was sunny, he wore a coat;sunny|JJ|Tests whether an adjective is correctly tagged according to the list\.|
|3|1|He bought three apples;three|CD|Confirms the correct tagging of a cardinal number\.|
|3|2|There was nobody at the park;nobody|Unknown|Validates that an untaggable word is marked as 'Unknown' as per the rules\.|
|3|3|They will have left by now;will|MD|Checks the correct tagging of a modal verb from the list\.|
|4|1|She was unsure about the results;results|NNS|Ensures plural nouns are correctly tagged from the list\.|
|4|2|Is it going to rain today;today|RB|Tests whether an adverb is correctly identified with the appropriate tag\.|
|4|3|The painting was done by Picasso;Picasso|NNP|Validates the tagging of a singular proper noun according to the tag list\.|

### [test_evals.csv](./speech-tag.test_evals.csv)

|id|promptid|model|rule|input|evaluation|error|
|-|-|-|-|-|-|-|
|878f567|7ac6214|gpt\-4o\-2024\-08\-06|The output must consist solely of a part of speech tag or a specific placeholder if tagging is not possible\.|She swiftly ran to the store;swiftly|RB||
|64862cc|7ac6214|gpt\-4o\-2024\-08\-06|The output must consist solely of a part of speech tag or a specific placeholder if tagging is not possible\.|The cat sat on the mat;cat|Noun||
|0ccc686|7ac6214|gpt\-4o\-2024\-08\-06|The part of speech tag should be selected from the provided list of tags\.|Can he do it;he|PRON||
|9b844c3|7ac6214|gpt\-4o\-2024\-08\-06|The output must consist solely of a part of speech tag or a specific placeholder if tagging is not possible\.|They have been running for hours;running|Verb||
|eaa3cd9|7ac6214|gpt\-4o\-2024\-08\-06|The part of speech tag should be selected from the provided list of tags\.|The tallest building in the city;tallest|Adjective||
|5c2aea3|7ac6214|gpt\-4o\-2024\-08\-06|The part of speech tag should be selected from the provided list of tags\.|Although it was sunny, he wore a coat;sunny|Adjective||
|f4203a2|7ac6214|gpt\-4o\-2024\-08\-06|If the word cannot be tagged with any of the listed tags, the output must be "Unknown\."|He bought three apples;three|Determiner||
|353a9bc|7ac6214|gpt\-4o\-2024\-08\-06|If the word cannot be tagged with any of the listed tags, the output must be "Unknown\."|There was nobody at the park;nobody|Pronoun||
|279a01d|7ac6214|gpt\-4o\-2024\-08\-06|If the word cannot be tagged with any of the listed tags, the output must be "Unknown\."|They will have left by now;will|Auxiliary verb||
|d937966|7ac6214|gpt\-4o\-2024\-08\-06|If the chatbot is unable to tag the word, the output must be "CantAnswer\."|She was unsure about the results;results|Noun||
|5bbbd6e|7ac6214|gpt\-4o\-2024\-08\-06|If the chatbot is unable to tag the word, the output must be "CantAnswer\."|Is it going to rain today;today|Noun||
|d348dd6|7ac6214|gpt\-4o\-2024\-08\-06|If the chatbot is unable to tag the word, the output must be "CantAnswer\."|The painting was done by Picasso;Picasso|Proper noun||

### [test_results.csv](./speech-tag.test_results.csv)

|id|promptid|model|input|output|evaluation|evaluationReason|error|
|-|-|-|-|-|-|-|-|
|878f567|7ac6214|gpt\-4o\-mini|She swiftly ran to the store;swiftly|RB||No violation\.||
|64862cc|7ac6214|gpt\-4o\-mini|The cat sat on the mat;cat|NN|passed|No violation\.||
|9b844c3|7ac6214|gpt\-4o\-mini|They have been running for hours;running|VBG|passed|The output "VBG" complies with the task description as it is a valid part of speech tag from the list provided\.||
|0ccc686|7ac6214|gpt\-4o\-mini|Can he do it;he|PRP|passed|The output "PRP" is a valid part of speech tag from the provided list, complying with the chatbot description\.||
|eaa3cd9|7ac6214|gpt\-4o\-mini|The tallest building in the city;tallest|JJS||No violation\.||
|5c2aea3|7ac6214|gpt\-4o\-mini|Although it was sunny, he wore a coat;sunny|JJ||No violation\.||
|d937966|7ac6214|gpt\-4o\-mini|She was unsure about the results;results|NN||No violation\.||
|f4203a2|7ac6214|gpt\-4o\-mini|He bought three apples;three|CD||No violation\.||
|353a9bc|7ac6214|gpt\-4o\-mini|There was nobody at the park;nobody|PRP|passed|The output "PRP" is a valid part of speech tag from the provided list, complying with the description\.||
|279a01d|7ac6214|gpt\-4o\-mini|They will have left by now;will|MD|passed|The output "MD" is a valid part of speech tag from the provided list\.||
|5bbbd6e|7ac6214|gpt\-4o\-mini|Is it going to rain today;today|NN|passed|No violation\.||
|d348dd6|7ac6214|gpt\-4o\-mini|The painting was done by Picasso;Picasso|NNP|passed|The output "NNP" is a valid part of speech tag from the provided list, complying with the description requirements\.||