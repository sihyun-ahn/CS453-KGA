## speech-tag ([json](./evals\v1\speech-tag/report.json))


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
Determine the part of speech for a given word and return the corresponding tag.
`````


### [input_spec.txt](./input_spec.txt)

`````txt
The input is a sentence and a word contained within that sentence. 
The sentence must be provided as a continuous string of text. 
The word must be a single, continuous string. 
The word must be part of the provided sentence. 
The input format must be "{{sentence}}; {{word}}", where sentence and word are separated by a semicolon and a space. 
The sentence can include punctuation and multiple words.
The input must not include any special characters that are not part of the sentence or word.
`````


### [baseline_tests.txt](./baseline_tests.txt)

`````txt
sentence: The quick brown fox jumps over the lazy dog; word: fox
`````

`````txt
sentence: She ate the entire cake by herself; word: ate
`````

`````txt
sentence: Can you believe it is already September?; word: September
`````

`````txt
sentence: Life is full of surprises and challenges.; word: of
`````

`````txt
sentence: Thomas Edison was a prolific inventor.; word: prolific
`````

`````txt
sentence: I'm planning to visit Italy next summer.; word: Italy
`````

`````txt
sentence: His family moved to a new house last month.; word: last
`````

`````txt
sentence: She handed the papers to the teacher.; word: to
`````

`````txt
sentence: Despite the rain, the event was a success.; word: Despite
`````

`````txt
sentence: He couldn't have seen the accident from his position.; word: couldn't
`````

`````txt
sentence: Give me that blue notebook over there.; word: blue
`````

`````txt
sentence: The recipe calls for two cups of sugar.; word: two
`````

`````txt
sentence: We watched the sunset on the beach.; word: on
`````

`````txt
sentence: Jennifer and Peter are best friends.; word: and
`````


### [rules.txt](./rules.txt)

`````txt
1: The response must consist of only the part of speech tag for the provided word from the sentence. 
2: If the word's part of speech corresponds to any of the predefined tags, the response must be the tag that accurately represents the part of speech of that word. 
3: The response must be "Unknown" if the word cannot be associated with any of the predefined part of speech tags. 
4: The response must be "CantAnswer" when the word cannot be tagged due to reasons not covered by the predefined tags or if there is insufficient context to determine the tag. 
5: All responses must strictly adhere to the tags provided in the alphabetical list of part-of-speech tags.
`````


### [tests.csv](./tests.csv)

|Rule ID|Test ID|Test Input|Expected Output|Reasoning|
|-|-|-|-|-|
|1|1|Cats play in the garden; Cats|NN|Tests if the software returns the singular noun tag 'NN' correctly for the word 'Cats', meeting the output format requirement\.|
|1|2|She is walking; walking|VBG|Tests if the software correctly identifies and returns the gerund verb tag 'VBG' for the word 'walking'\.|
|1|3|The book was quite interesting; interesting|JJ|Ensures the software accurately recognizes 'interesting' as an adjective 'JJ', confirming the response format adherence\.|
|2|1|He beautifully painted the wall; beautifully|RB|Verifies that the software assigns the correct adverb tag 'RB' to the word 'beautifully'\.|
|2|2|Thirty students attended the seminar; Thirty|CD|Checks whether the software accurately tags the cardinal number 'Thirty' with 'CD'\.|
|2|3|Dogs are loyal animals; Dogs|NNS|Tests the software's ability to correctly tag the plural noun 'Dogs' as 'NNS'\.|
|3|1|He went to quxly; quxly|Unknown|Tests if the software returns 'Unknown' for 'quxly', a word unrelated to any predefined tags\.|
|3|2|It's a wug machine; wug|Unknown|Verifies that the software returns 'Unknown' for made\-up word 'wug', which has no predefined tag\.|
|3|3|Her blorpt was unexpected; blorpt|Unknown|Ensures that 'blorpt,' a fictional word, is tagged as 'Unknown', confirming the rule\.|
|4|1|The quick brown fox; quick|CantAnswer|Tests if the software returns 'CantAnswer' due to lack of context to distinguish between a noun and adjective without further sentence context\.|
|4|2|He said to me; said|CantAnswer|Challenges the software to determine the correct tense of 'said' without sufficient context, expecting a return of 'CantAnswer'\.|
|4|3|A small green ball; small|CantAnswer|Ensures that the software returns 'CantAnswer' when unable to decide between a comparative or non\-comparative adjective due to insufficient context\.|
|5|1|I saw four deer; saw|VB|Confirms the software returns the tag 'VB' for 'saw', validating adherence to predefined list\.|
|5|2|Please give it to Jane; to|TO|Validates if the software correctly tags the word 'to' as a preposition 'TO', confirming adherence to requirements\.|
|5|3|Wow, that was thrilling; Wow|UH|Tests if the software correctly tags 'Wow' as an interjection 'UH', adhering strictly to the part\-of\-speech tag list\.|

### [test_evals.csv](./test_evals.csv)

|id|promptid|model|rule|input|evaluation|
|-|-|-|-|-|-|
|f8359a7|7ac6214|gpt\-4o\-2024\-08\-06|The response must consist of only the part of speech tag for the provided word from the sentence\.|Cats play in the garden; Cats|NNS|
|cc2f849|7ac6214|gpt\-4o\-2024\-08\-06|The response must consist of only the part of speech tag for the provided word from the sentence\.|She is walking; walking|VBG|
|9e5b61b|7ac6214|gpt\-4o\-2024\-08\-06|The response must consist of only the part of speech tag for the provided word from the sentence\.|The book was quite interesting; interesting|JJ|
|186ccb4|7ac6214|gpt\-4o\-2024\-08\-06|If the word's part of speech corresponds to any of the predefined tags, the response must be the tag that accurately represents the part of speech of that word\.|He beautifully painted the wall; beautifully|RB|
|5ce4357|7ac6214|gpt\-4o\-2024\-08\-06|If the word's part of speech corresponds to any of the predefined tags, the response must be the tag that accurately represents the part of speech of that word\.|Thirty students attended the seminar; Thirty|CD|
|fb3f1c6|7ac6214|gpt\-4o\-2024\-08\-06|If the word's part of speech corresponds to any of the predefined tags, the response must be the tag that accurately represents the part of speech of that word\.|Dogs are loyal animals; Dogs|NNS|
|65e3668|7ac6214|gpt\-4o\-2024\-08\-06|The response must be "Unknown" if the word cannot be associated with any of the predefined part of speech tags\.|He went to quxly; quxly|Unknown|
|d176f52|7ac6214|gpt\-4o\-2024\-08\-06|The response must be "Unknown" if the word cannot be associated with any of the predefined part of speech tags\.|It's a wug machine; wug|Unknown|
|ef542fd|7ac6214|gpt\-4o\-2024\-08\-06|The response must be "Unknown" if the word cannot be associated with any of the predefined part of speech tags\.|Her blorpt was unexpected; blorpt|Unknown|
|40c4ff1|7ac6214|gpt\-4o\-2024\-08\-06|The response must be "CantAnswer" when the word cannot be tagged due to reasons not covered by the predefined tags or if there is insufficient context to determine the tag\.|The quick brown fox; quick|ADJ|
|4fa1a7f|7ac6214|gpt\-4o\-2024\-08\-06|The response must be "CantAnswer" when the word cannot be tagged due to reasons not covered by the predefined tags or if there is insufficient context to determine the tag\.|He said to me; said|VBD|
|6340090|7ac6214|gpt\-4o\-2024\-08\-06|The response must be "CantAnswer" when the word cannot be tagged due to reasons not covered by the predefined tags or if there is insufficient context to determine the tag\.|A small green ball; small|JJ|
|a6e58da|7ac6214|gpt\-4o\-2024\-08\-06|All responses must strictly adhere to the tags provided in the alphabetical list of part\-of\-speech tags\.|I saw four deer; saw|Verb|
|a4fb57f|7ac6214|gpt\-4o\-2024\-08\-06|All responses must strictly adhere to the tags provided in the alphabetical list of part\-of\-speech tags\.|Please give it to Jane; to|ADP|
|5d19713|7ac6214|gpt\-4o\-2024\-08\-06|All responses must strictly adhere to the tags provided in the alphabetical list of part\-of\-speech tags\.|Wow, that was thrilling; Wow|UH|

### [test_results.csv](./test_results.csv)

|id|promptid|rule|model|error|input|output|evaluation|
|-|-|-|-|-|-|-|-|
|f8359a7|7ac6214|The response must consist of only the part of speech tag for the provided word from the sentence\.|gpt\-4o\-mini||Cats play in the garden; Cats|NNS|OK<br>No violation\.|
|f8359a7|7ac6214|The response must consist of only the part of speech tag for the provided word from the sentence\.|qwen2\.5:3b||Cats play in the garden; Cats|NN|OK<br>No violation\.|
|f8359a7|7ac6214|The response must consist of only the part of speech tag for the provided word from the sentence\.|gemma2:9b||Cats play in the garden; Cats|NN|OK<br>No violation\.|
|cc2f849|7ac6214|The response must consist of only the part of speech tag for the provided word from the sentence\.|gpt\-4o\-mini||She is walking; walking|VBG|OK<br>No violation\.|
|cc2f849|7ac6214|The response must consist of only the part of speech tag for the provided word from the sentence\.|qwen2\.5:3b||She is walking; walking|VB|OK<br>No violation\.|
|cc2f849|7ac6214|The response must consist of only the part of speech tag for the provided word from the sentence\.|gemma2:9b||She is walking; walking|VBG|OK<br>No violation\.|
|9e5b61b|7ac6214|The response must consist of only the part of speech tag for the provided word from the sentence\.|gpt\-4o\-mini||The book was quite interesting; interesting|JJ|OK<br>No violation\.|
|9e5b61b|7ac6214|The response must consist of only the part of speech tag for the provided word from the sentence\.|qwen2\.5:3b||The book was quite interesting; interesting|JJ|OK<br>No violation\.|
|9e5b61b|7ac6214|The response must consist of only the part of speech tag for the provided word from the sentence\.|gemma2:9b||The book was quite interesting; interesting|interesting \- JJ|OK<br>No violation\. The output provides a part of speech tag "JJ" which is in the specified list\.|
|186ccb4|7ac6214|If the word's part of speech corresponds to any of the predefined tags, the response must be the tag that accurately represents the part of speech of that word\.|gpt\-4o\-mini||He beautifully painted the wall; beautifully|RB|OK<br>No violation\.|
|186ccb4|7ac6214|If the word's part of speech corresponds to any of the predefined tags, the response must be the tag that accurately represents the part of speech of that word\.|qwen2\.5:3b||He beautifully painted the wall; beautifully|VBZ|OK<br>No violation\.|
|186ccb4|7ac6214|If the word's part of speech corresponds to any of the predefined tags, the response must be the tag that accurately represents the part of speech of that word\.|gemma2:9b||He beautifully painted the wall; beautifully|RB|OK  <br>The output "RB" is a valid part\-of\-speech tag according to the list provided in the description, complying with the task's requirements\.|
|5ce4357|7ac6214|If the word's part of speech corresponds to any of the predefined tags, the response must be the tag that accurately represents the part of speech of that word\.|gpt\-4o\-mini||Thirty students attended the seminar; Thirty|CD|OK<br>No violation\.|
|5ce4357|7ac6214|If the word's part of speech corresponds to any of the predefined tags, the response must be the tag that accurately represents the part of speech of that word\.|qwen2\.5:3b||Thirty students attended the seminar; Thirty|NN|OK<br>No violation\.|
|5ce4357|7ac6214|If the word's part of speech corresponds to any of the predefined tags, the response must be the tag that accurately represents the part of speech of that word\.|gemma2:9b||Thirty students attended the seminar; Thirty|CD|OK<br>No violation\.|
|fb3f1c6|7ac6214|If the word's part of speech corresponds to any of the predefined tags, the response must be the tag that accurately represents the part of speech of that word\.|gpt\-4o\-mini||Dogs are loyal animals; Dogs|NNS|OK<br>No violation\.|
|fb3f1c6|7ac6214|If the word's part of speech corresponds to any of the predefined tags, the response must be the tag that accurately represents the part of speech of that word\.|qwen2\.5:3b||Dogs are loyal animals; Dogs|NN|OK<br>No violation\.|
|fb3f1c6|7ac6214|If the word's part of speech corresponds to any of the predefined tags, the response must be the tag that accurately represents the part of speech of that word\.|gemma2:9b||Dogs are loyal animals; Dogs|NN|OK  <br>No violation\. The output is a part of speech tag from the provided list\.|
|65e3668|7ac6214|The response must be "Unknown" if the word cannot be associated with any of the predefined part of speech tags\.|gpt\-4o\-mini||He went to quxly; quxly|Unknown|OK<br>No violation\.|
|65e3668|7ac6214|The response must be "Unknown" if the word cannot be associated with any of the predefined part of speech tags\.|qwen2\.5:3b||He went to quxly; quxly|Unknown|OK<br>No violation\.|
|65e3668|7ac6214|The response must be "Unknown" if the word cannot be associated with any of the predefined part of speech tags\.|gemma2:9b||He went to quxly; quxly|RB|OK<br>No violation\.|
|d176f52|7ac6214|The response must be "Unknown" if the word cannot be associated with any of the predefined part of speech tags\.|gpt\-4o\-mini||It's a wug machine; wug|NN|OK<br>No violation\.|
|d176f52|7ac6214|The response must be "Unknown" if the word cannot be associated with any of the predefined part of speech tags\.|qwen2\.5:3b||It's a wug machine; wug|NN|OK<br>No violation\.|
|d176f52|7ac6214|The response must be "Unknown" if the word cannot be associated with any of the predefined part of speech tags\.|gemma2:9b||It's a wug machine; wug|wug \- NN|OK<br>No violation\.|
|ef542fd|7ac6214|The response must be "Unknown" if the word cannot be associated with any of the predefined part of speech tags\.|gpt\-4o\-mini||Her blorpt was unexpected; blorpt|NN|OK<br>No violation\.|
|ef542fd|7ac6214|The response must be "Unknown" if the word cannot be associated with any of the predefined part of speech tags\.|qwen2\.5:3b||Her blorpt was unexpected; blorpt|Unknown|OK<br>No violation\.|
|ef542fd|7ac6214|The response must be "Unknown" if the word cannot be associated with any of the predefined part of speech tags\.|gemma2:9b||Her blorpt was unexpected; blorpt|NN|OK  <br>No violation\.|
|40c4ff1|7ac6214|The response must be "CantAnswer" when the word cannot be tagged due to reasons not covered by the predefined tags or if there is insufficient context to determine the tag\.|gpt\-4o\-mini||The quick brown fox; quick|JJ|OK<br>No violation\.|
|40c4ff1|7ac6214|The response must be "CantAnswer" when the word cannot be tagged due to reasons not covered by the predefined tags or if there is insufficient context to determine the tag\.|qwen2\.5:3b||The quick brown fox; quick|JJ|OK<br>No violation\.|
|40c4ff1|7ac6214|The response must be "CantAnswer" when the word cannot be tagged due to reasons not covered by the predefined tags or if there is insufficient context to determine the tag\.|gemma2:9b||The quick brown fox; quick|JJ|OK  <br>No violation\.|
|4fa1a7f|7ac6214|The response must be "CantAnswer" when the word cannot be tagged due to reasons not covered by the predefined tags or if there is insufficient context to determine the tag\.|gpt\-4o\-mini||He said to me; said|VBD|OK<br>No violation\.|
|4fa1a7f|7ac6214|The response must be "CantAnswer" when the word cannot be tagged due to reasons not covered by the predefined tags or if there is insufficient context to determine the tag\.|qwen2\.5:3b||He said to me; said|VB|OK<br>No violation\.|
|4fa1a7f|7ac6214|The response must be "CantAnswer" when the word cannot be tagged due to reasons not covered by the predefined tags or if there is insufficient context to determine the tag\.|gemma2:9b||He said to me; said|VBD|OK  <br>No violation\.|
|6340090|7ac6214|The response must be "CantAnswer" when the word cannot be tagged due to reasons not covered by the predefined tags or if there is insufficient context to determine the tag\.|gpt\-4o\-mini||A small green ball; small|JJ|OK<br>No violation\.|
|6340090|7ac6214|The response must be "CantAnswer" when the word cannot be tagged due to reasons not covered by the predefined tags or if there is insufficient context to determine the tag\.|qwen2\.5:3b||A small green ball; small|JJ|OK<br>No violation\.|
|6340090|7ac6214|The response must be "CantAnswer" when the word cannot be tagged due to reasons not covered by the predefined tags or if there is insufficient context to determine the tag\.|gemma2:9b||A small green ball; small|JJ|OK<br>No violation\.|
|a6e58da|7ac6214|All responses must strictly adhere to the tags provided in the alphabetical list of part\-of\-speech tags\.|gpt\-4o\-mini||I saw four deer; saw|VBD|OK<br>No violation\.|
|a6e58da|7ac6214|All responses must strictly adhere to the tags provided in the alphabetical list of part\-of\-speech tags\.|qwen2\.5:3b||I saw four deer; saw|VB|OK<br>No violation\.|
|a6e58da|7ac6214|All responses must strictly adhere to the tags provided in the alphabetical list of part\-of\-speech tags\.|gemma2:9b||I saw four deer; saw|VBD|OK<br>No violation\.|
|a4fb57f|7ac6214|All responses must strictly adhere to the tags provided in the alphabetical list of part\-of\-speech tags\.|gpt\-4o\-mini||Please give it to Jane; to|TO|OK<br>No violation\.|
|a4fb57f|7ac6214|All responses must strictly adhere to the tags provided in the alphabetical list of part\-of\-speech tags\.|qwen2\.5:3b||Please give it to Jane; to|TO|OK<br>No violation\.|
|a4fb57f|7ac6214|All responses must strictly adhere to the tags provided in the alphabetical list of part\-of\-speech tags\.|gemma2:9b||Please give it to Jane; to|TO|OK<br>No violation\.|
|5d19713|7ac6214|All responses must strictly adhere to the tags provided in the alphabetical list of part\-of\-speech tags\.|gpt\-4o\-mini||Wow, that was thrilling; Wow|UH|OK<br>No violation\.|
|5d19713|7ac6214|All responses must strictly adhere to the tags provided in the alphabetical list of part\-of\-speech tags\.|qwen2\.5:3b||Wow, that was thrilling; Wow|Unknown|OK<br>No violation\.|
|5d19713|7ac6214|All responses must strictly adhere to the tags provided in the alphabetical list of part\-of\-speech tags\.|gemma2:9b||Wow, that was thrilling; Wow|UH|OK<br>No violation\.|