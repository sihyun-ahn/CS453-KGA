## speech-tag ([json](./evals\v0\speech-tag/report.json))


### [speech-tag.prompty](./speech-tag.prompty)

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


### [intent.txt](./intent.txt)

`````txt
Determine the part of speech for a given word in a sentence and return the corresponding tag.
`````


### [input_spec.txt](./input_spec.txt)

`````txt
The input is a sentence followed by a specific word from that sentence.  
The input must contain a complete sentence.  
The input must include a word that is part of the provided sentence.  
The word must be clearly distinguishable from the rest of the sentence.  
The input sentence and word must be separated by a semicolon.  
The sentence and word must be separated by a space following the semicolon.
`````


### [baseline_tests.txt](./baseline_tests.txt)

`````txt
sentence: "The quick brown fox jumps over the lazy dog."; word: "quick"
`````

`````txt
sentence: "She sells sea shells by the sea shore."; word: "sells"
`````

`````txt
sentence: "He is the tallest student in the class."; word: "tallest"
`````

`````txt
sentence: "Can you pass me the salt?"; word: "pass"
`````

`````txt
sentence: "There are many flowers in the garden."; word: "There"
`````

`````txt
sentence: "Learning new languages can be fun."; word: "fun"
`````

`````txt
sentence: "She has a Ph.D. in Mathematics."; word: "Ph.D."
`````

`````txt
sentence: "Yesterday, it rained heavily."; word: "heavily"
`````

`````txt
sentence: "I bought two apples and three oranges."; word: "two"
`````

`````txt
sentence: "Don’t touch that button!"; word: "button"
`````

`````txt
sentence: "The book on the table is mine."; word: "on"
`````

`````txt
sentence: "I sometimes wonder about the future."; word: "sometimes"
`````

`````txt
sentence: "Wow! That’s amazing!"; word: "Wow"
`````

`````txt
sentence: "The meeting will be held at 3 PM."; word: "will"
`````

`````txt
sentence: "Give me a moment, please."; word: "moment"
`````

`````txt
sentence: "To err is human."; word: "To"
`````

`````txt
sentence: "The beautiful painting was appreciated by all."; word: "beautiful"
`````

`````txt
sentence: "Dogs bark loudly when strangers approach."; word: "bark"
`````

`````txt
sentence: "I need to buy some groceries."; word: "groceries"
`````

`````txt
sentence: "This is a once-in-a-lifetime opportunity."; word: "opportunity"
`````


### [rules.txt](./rules.txt)

`````txt
1: The output must contain only a single part of speech tag from the provided alphabetical list. 
2: If the word cannot be tagged with any of the listed tags, the output must be "Unknown". 
3: If unable to tag the word for any reason, the output must be "CantAnswer". 
4: The output must not contain any additional information, explanation, or punctuation beyond the tag itself.
`````


### [inverse_rules.txt](./inverse_rules.txt)

`````txt
5: The output must not contain any part of speech tags from the provided alphabetical list.  
6: If the word can be tagged with any of the listed tags, the output must not be "Unknown".  
7: If able to tag the word for any reason, the output must not be "CantAnswer".  
8: The output must contain additional information, explanation, or punctuation beyond the tag itself.
`````


### [tests.csv](./tests.csv)

|Rule ID|Test ID|Test Input|Expected Output|Reasoning|
|-|-|-|-|-|
|1|1|The quick brown fox jumps over the lazy dog; fox|NN|Tests whether 'fox' is correctly tagged as a singular noun, ensuring adherence to rule by returning only the single tag 'NN'\.|
|1|2|She will quickly finish her homework; quickly|RB|Tests the ability to correctly identify 'quickly' as an adverb, validating that only 'RB' is returned, adhering to the rule\.|
|1|3|Wow, such a beautiful painting\!; Wow|UH|Tests the correct tagging of 'Wow' as an interjection, verifying that only 'UH' is returned according to the rule\.|
|2|1|The number 42 is significant in the story; 42|CD|Checks if '42' is tagged as a cardinal number, which should return 'CD', ensuring conformity with the rule\.|
|2|2|There are no unicorns in the garden; unicorns|NNS|Tests whether 'unicorns' is tagged as a plural noun, expecting 'NNS' to ensure compliance with the rule\.|
|2|3|They might have left already; might|MD|Verifies that 'might' is tagged as a modal verb, expecting 'MD' to test adherence to the rule\.|
|3|1|She called the number yesterday; number|Unknown|Tests correct handling of a word that cannot be determined from context, expecting 'Unknown' to adhere to the rule\.|
|3|2|His answers were not understandable; understandable|Unknown|Checks if 'understandable' is correctly returned as 'Unknown' due to insufficient context, ensuring rule compliance\.|
|3|3|It seems like a quandary; quandary|Unknown|Verifies that 'quandary' returns 'Unknown' due to its ambiguous nature, ensuring conformity with the rule\.|
|4|1|The apple was eaten by John; eaten|VBN|Checks that 'eaten' is correctly tagged as a past participle verb, returning only 'VBN' to follow the rule\.|
|4|2|If you could simply decide; decide|VB|Tests correct tagging of 'decide' as a base form verb, ensuring that only 'VB' is returned to adhere to the rule\.|
|4|3|Cats are adorable animals; adorable|JJ|Verifies that 'adorable' is tagged as an adjective, expecting 'JJ' to affirm rule compliance\.|

### [test_evals.csv](./test_evals.csv)

|id|promptid|model|rule|input|evaluation|
|-|-|-|-|-|-|
|d26a439|7ac6214|gpt\-4o\-2024\-08\-06|The output must contain only a single part of speech tag from the provided alphabetical list\.|The quick brown fox jumps over the lazy dog; fox|NOUN|
|3c9a1fe|7ac6214|gpt\-4o\-2024\-08\-06|The output must contain only a single part of speech tag from the provided alphabetical list\.|She will quickly finish her homework; quickly|RB|
|a7c19b8|7ac6214|gpt\-4o\-2024\-08\-06|The output must contain only a single part of speech tag from the provided alphabetical list\.|Wow, such a beautiful painting\!; Wow|UH|
|26730f0|7ac6214|gpt\-4o\-2024\-08\-06|If the word cannot be tagged with any of the listed tags, the output must be "Unknown"\.|The number 42 is significant in the story; 42|CD|
|69e632c|7ac6214|gpt\-4o\-2024\-08\-06|If the word cannot be tagged with any of the listed tags, the output must be "Unknown"\.|There are no unicorns in the garden; unicorns|NNS|
|8dca679|7ac6214|gpt\-4o\-2024\-08\-06|If the word cannot be tagged with any of the listed tags, the output must be "Unknown"\.|They might have left already; might|MD|
|44f322c|7ac6214|gpt\-4o\-2024\-08\-06|If unable to tag the word for any reason, the output must be "CantAnswer"\.|She called the number yesterday; number|NN|
|7e8a521|7ac6214|gpt\-4o\-2024\-08\-06|If unable to tag the word for any reason, the output must be "CantAnswer"\.|His answers were not understandable; understandable|ADJ|
|715bcb3|7ac6214|gpt\-4o\-2024\-08\-06|If unable to tag the word for any reason, the output must be "CantAnswer"\.|It seems like a quandary; quandary|Noun|
|bfab6b6|7ac6214|gpt\-4o\-2024\-08\-06|The output must not contain any additional information, explanation, or punctuation beyond the tag itself\.|The apple was eaten by John; eaten|VBN|
|738ead0|7ac6214|gpt\-4o\-2024\-08\-06|The output must not contain any additional information, explanation, or punctuation beyond the tag itself\.|If you could simply decide; decide|Unknown|
|baf23ca|7ac6214|gpt\-4o\-2024\-08\-06|The output must not contain any additional information, explanation, or punctuation beyond the tag itself\.|Cats are adorable animals; adorable|JJ|

### [test_results.csv](./test_results.csv)

|id|promptid|rule|model|input|output|evaluation|
|-|-|-|-|-|-|-|
|d26a439|7ac6214|The output must contain only a single part of speech tag from the provided alphabetical list\.|gpt\-4o\-mini|The quick brown fox jumps over the lazy dog; fox|NN|OK<br>No violation\.|
|d26a439|7ac6214|The output must contain only a single part of speech tag from the provided alphabetical list\.|qwen2\.5:3b|The quick brown fox jumps over the lazy dog; fox|NN|OK<br>No violation\.|
|d26a439|7ac6214|The output must contain only a single part of speech tag from the provided alphabetical list\.|gemma2:9b|The quick brown fox jumps over the lazy dog; fox|NN|OK<br>No violation\.|
|3c9a1fe|7ac6214|The output must contain only a single part of speech tag from the provided alphabetical list\.|gpt\-4o\-mini|She will quickly finish her homework; quickly|RB|OK<br>No violation\.|
|3c9a1fe|7ac6214|The output must contain only a single part of speech tag from the provided alphabetical list\.|qwen2\.5:3b|She will quickly finish her homework; quickly|VB️|OK<br>No violation\.|
|3c9a1fe|7ac6214|The output must contain only a single part of speech tag from the provided alphabetical list\.|gemma2:9b|She will quickly finish her homework; quickly|RB|OK<br>No violation\.|
|a7c19b8|7ac6214|The output must contain only a single part of speech tag from the provided alphabetical list\.|gpt\-4o\-mini|Wow, such a beautiful painting\!; Wow|UH|OK<br>No violation\.|
|a7c19b8|7ac6214|The output must contain only a single part of speech tag from the provided alphabetical list\.|qwen2\.5:3b|Wow, such a beautiful painting\!; Wow|WRB|OK<br>No violation\.|
|a7c19b8|7ac6214|The output must contain only a single part of speech tag from the provided alphabetical list\.|gemma2:9b|Wow, such a beautiful painting\!; Wow|UH  ; Wow, such a beautiful painting\!; Wow|ERR<br>The output should only contain the part of speech tag\. Including the sentence and the word violates the description\.|
|26730f0|7ac6214|If the word cannot be tagged with any of the listed tags, the output must be "Unknown"\.|gpt\-4o\-mini|The number 42 is significant in the story; 42|CD|OK<br>No violation\.|
|26730f0|7ac6214|If the word cannot be tagged with any of the listed tags, the output must be "Unknown"\.|qwen2\.5:3b|The number 42 is significant in the story; 42|CD|OK<br>No violation\.|
|26730f0|7ac6214|If the word cannot be tagged with any of the listed tags, the output must be "Unknown"\.|gemma2:9b|The number 42 is significant in the story; 42|CD|OK<br>The output "CD" is a valid part\-of\-speech tag from the provided list, complying with the description\.|
|69e632c|7ac6214|If the word cannot be tagged with any of the listed tags, the output must be "Unknown"\.|gpt\-4o\-mini|There are no unicorns in the garden; unicorns|NNS|OK<br>No violation\.|
|69e632c|7ac6214|If the word cannot be tagged with any of the listed tags, the output must be "Unknown"\.|qwen2\.5:3b|There are no unicorns in the garden; unicorns|Unknown|OK<br>No violation\.|
|69e632c|7ac6214|If the word cannot be tagged with any of the listed tags, the output must be "Unknown"\.|gemma2:9b|There are no unicorns in the garden; unicorns|NN|OK<br>No violation\.|
|8dca679|7ac6214|If the word cannot be tagged with any of the listed tags, the output must be "Unknown"\.|gpt\-4o\-mini|They might have left already; might|MD|OK<br>No violation\.|
|8dca679|7ac6214|If the word cannot be tagged with any of the listed tags, the output must be "Unknown"\.|qwen2\.5:3b|They might have left already; might|MD|OK<br>No violation\.|
|8dca679|7ac6214|If the word cannot be tagged with any of the listed tags, the output must be "Unknown"\.|gemma2:9b|They might have left already; might|VBZ|OK  <br>The output "VBZ" is a valid part of speech tag listed in the description, thus complying with the chatbot's requirements\.|
|44f322c|7ac6214|If unable to tag the word for any reason, the output must be "CantAnswer"\.|gpt\-4o\-mini|She called the number yesterday; number|NN|OK<br>No violation\.|
|44f322c|7ac6214|If unable to tag the word for any reason, the output must be "CantAnswer"\.|qwen2\.5:3b|She called the number yesterday; number|NN|OK<br>No violation\.|
|44f322c|7ac6214|If unable to tag the word for any reason, the output must be "CantAnswer"\.|gemma2:9b|She called the number yesterday; number|CD|OK<br>No violation\.|
|7e8a521|7ac6214|If unable to tag the word for any reason, the output must be "CantAnswer"\.|gpt\-4o\-mini|His answers were not understandable; understandable|JJ|OK<br>No violation\.|
|7e8a521|7ac6214|If unable to tag the word for any reason, the output must be "CantAnswer"\.|qwen2\.5:3b|His answers were not understandable; understandable|VBz|ERR<br>The output does not comply with the chatbot description because the tag "VBz" is not in the list of part\-of\-speech tags provided\. The correct tag should be "VBZ"\.|
|7e8a521|7ac6214|If unable to tag the word for any reason, the output must be "CantAnswer"\.|gemma2:9b|His answers were not understandable; understandable|understandable \-  JJ|OK<br>No violation\.|
|715bcb3|7ac6214|If unable to tag the word for any reason, the output must be "CantAnswer"\.|gpt\-4o\-mini|It seems like a quandary; quandary|NN|OK<br>No violation\.|
|715bcb3|7ac6214|If unable to tag the word for any reason, the output must be "CantAnswer"\.|qwen2\.5:3b|It seems like a quandary; quandary|NN|OK<br>No violation\.|
|715bcb3|7ac6214|If unable to tag the word for any reason, the output must be "CantAnswer"\.|gemma2:9b|It seems like a quandary; quandary|NN|OK<br>No violation\.|
|bfab6b6|7ac6214|The output must not contain any additional information, explanation, or punctuation beyond the tag itself\.|gpt\-4o\-mini|The apple was eaten by John; eaten|VBN|OK<br>No violation\.|
|bfab6b6|7ac6214|The output must not contain any additional information, explanation, or punctuation beyond the tag itself\.|qwen2\.5:3b|The apple was eaten by John; eaten|VBZ|OK<br>No violation\.|
|bfab6b6|7ac6214|The output must not contain any additional information, explanation, or punctuation beyond the tag itself\.|gemma2:9b|The apple was eaten by John; eaten|VBN|OK<br>No violation\.|
|738ead0|7ac6214|The output must not contain any additional information, explanation, or punctuation beyond the tag itself\.|gpt\-4o\-mini|If you could simply decide; decide|VB|OK<br>No violation\.|
|738ead0|7ac6214|The output must not contain any additional information, explanation, or punctuation beyond the tag itself\.|qwen2\.5:3b|If you could simply decide; decide|VB|OK<br>No violation\.|
|738ead0|7ac6214|The output must not contain any additional information, explanation, or punctuation beyond the tag itself\.|gemma2:9b|If you could simply decide; decide|VB|OK  <br>No violation\.|
|baf23ca|7ac6214|The output must not contain any additional information, explanation, or punctuation beyond the tag itself\.|gpt\-4o\-mini|Cats are adorable animals; adorable|JJ|OK<br>No violation\.|
|baf23ca|7ac6214|The output must not contain any additional information, explanation, or punctuation beyond the tag itself\.|qwen2\.5:3b|Cats are adorable animals; adorable|JJ|OK<br>No violation\.|
|baf23ca|7ac6214|The output must not contain any additional information, explanation, or punctuation beyond the tag itself\.|gemma2:9b|Cats are adorable animals; adorable|JJ|OK<br>No violation\.|