## speech-tag ([json](./evals\v2\speech-tag/report.json))

- 4 rules
- 4 inverse rules
- 24 tests
- 72 test results, 66 (91%) oks, 5 (6%) errs
- 10 baseline tests


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
Determine the part of speech for a given word and return just the tag for the word's part of speech.
`````


### [input_spec.txt](./input_spec.txt)

`````txt
The input consists of a sentence followed by a word from that sentence.
The sentence should be a coherent string of words.
The word must be a single word that exists within the provided sentence.
Only one sentence and one word pair is valid per input.
The word should be a valid component of the sentence.
`````


### [baseline_tests.txt](./baseline_tests.txt)

`````txt
sentence: The quick brown fox jumps over the lazy dog; word: fox
`````

`````txt
sentence: She is reading a compelling novel; word: is
`````

`````txt
sentence: He has three apples and two oranges; word: three
`````

`````txt
sentence: The Eiffel Tower is an iconic structure; word: Eiffel Tower
`````

`````txt
sentence: Wow, that's amazing!; word: Wow
`````

`````txt
sentence: Unfortunately, the event was canceled; word: Unfortunately
`````

`````txt
sentence: He quickly ran to the store; word: ran
`````

`````txt
sentence: We need to study the ancient texts; word: need
`````

`````txt
sentence: It is absolutely necessary to comply; word: absolutely
`````

`````txt
sentence: She visited Germany last summer; word: Germany
`````


### [rules.txt](./rules.txt)

`````txt
1: The output must be a single part-of-speech tag based on the provided list of tags. 
2: If the provided word cannot be tagged with any of the listed part-of-speech tags, the output must be the word "Unknown". 
3: If the chatbot is unable to determine the part of speech for the provided word for any reason, the output must be the word "CantAnswer". 
4: The response must not include any additional text, explanations, or formatting other than the single part-of-speech tag, or the words "Unknown" or "CantAnswer".
`````


### [inverse_rules.txt](./inverse_rules.txt)

`````txt
5: The output can be multiple part-of-speech tags based on any available list of tags.  
6: If the provided word cannot be tagged with any of the listed part-of-speech tags, the output must be the actual input word itself.  
7: If the chatbot is unable to determine the part of speech for the provided word for any reason, the output must be "Answerable".  
8: The response must include additional context, explanations, or formatting beyond the part-of-speech tag.
`````


### [tests.csv](./tests.csv)

|Test Input|Expected Output|Reasoning|
|-|-|-|
|I saw a beautiful bird; beautiful|JJ|Tests if 'beautiful' is correctly tagged as an adjective\.|
|They ran quickly to the store; ran|VBD|Ensures 'ran' is recognized as past tense verb\.|
|She gives her father a hug; gives|VBZ|Verifies that 'gives' is tagged correctly as a 3rd person singular verb\.|
|I need some grglx; grglx|Unknown|Tests if a nonsensical word returns 'Unknown'\.|
|He drove a kryzle car; kryzle|Unknown|Nonsense adjective 'kryzle' should output 'Unknown'\.|
|Enpako is a cool place; Enpako|Unknown|Properly handles fictional proper noun by returning 'Unknown'\.|
|Igloo is melting; is|CantAnswer|Because 'is' is ambiguous, might test inability to tag, expected 'CantAnswer'\.|
|Who can explain this; can|CantAnswer|Tests modal verb 'can', expecting 'CantAnswer' on failure to tag\.|
|Did she lexe yesterday; lexe|CantAnswer|If 'lexe' is unrecognized, expected failure to tag results in 'CantAnswer'\.|
|A new house was built; house|NN|Confirm 'house' as a noun, tests that only the tag is returned with no extra output\.|
|Cats love fish; love|VB|Ensures verb 'love' is tagged correctly without additional tags/comments\.|
|Quickly, they flew; flew|VBD|Verifies 'flew' is tagged as past tense, checks for prohibited extra text\.|
|We enjoy ice cream; enjoy|VB VBZ|Tests if multiple valid tags could be supplied, expect VB VBZ or similar valid tags from list\.|
|They can play; can|MD NN|Ensure modal is also tagged for noun form\.|
|She floats and smiles; floats|VB VBZ|Tests VB validation when there can be an interpretation for VBZ\.|
|I saw a houx; houx|houx|Tests output when nonsense word should return input itself\.|
|The animal glorned through forest; glorned|glorned|Validates outputting the input when word tagging fails\.|
|They went to mynms; mynms|mynms|Unrecognized location results in word output instead of part\-of\-speech tag\.|
|A fast zunker won; zunker|Answerable|Forces output to 'Answerable' due to uncommon term causing inability to tag\.|
|Please grab the skimmf; skimmf|Answerable|Tests response when unable to tag uncommon object\.|
|Is that the latest grimsow?; grimsow|Answerable|Inability to classify leads to 'Answerable'\.|
|His favorite color is blue; blue|JJ Blue, the word blue is an adjective indicating color\.|Tests forced inclusion of additional explanation\.|
|Laughing, she ran away; ran|VBD Ran, the word ran is a past tense form of run\.|Ensures results include a brief explanation\.|
|A bright light flashed; light|NN Light, acting as a noun here\.|Demonstrates output's need for extra context formatting\.|

### [test_results.csv](./test_results.csv)

|rule|model|input|output|compliance|
|-|-|-|-|-|
|The output must be a single part\-of\-speech tag based on the provided list of tags\.|gpt\-4o\-mini|I saw a beautiful bird; beautiful|JJ|ok|
|The output must be a single part\-of\-speech tag based on the provided list of tags\.|qwen2\.5:3b|I saw a beautiful bird; beautiful|JJ|ok|
|The output must be a single part\-of\-speech tag based on the provided list of tags\.|gemma2:9b|I saw a beautiful bird; beautiful|JJ|ok|
|The output must be a single part\-of\-speech tag based on the provided list of tags\.|gpt\-4o\-mini|They ran quickly to the store; ran|VBD|ok|
|The output must be a single part\-of\-speech tag based on the provided list of tags\.|qwen2\.5:3b|They ran quickly to the store; ran|VB|ok|
|The output must be a single part\-of\-speech tag based on the provided list of tags\.|gemma2:9b|They ran quickly to the store; ran|VBD|ok|
|The output must be a single part\-of\-speech tag based on the provided list of tags\.|gpt\-4o\-mini|She gives her father a hug; gives|VB|ok|
|The output must be a single part\-of\-speech tag based on the provided list of tags\.|qwen2\.5:3b|She gives her father a hug; gives|VB|ok|
|The output must be a single part\-of\-speech tag based on the provided list of tags\.|gemma2:9b|She gives her father a hug; gives|VB <br><br><br>Let's break down why:<br><br>\* \*\*"Gives"\*\* in this sentence is the action being performed\.  <br>\* It describes what "She" is doing\. <br>\* This makes it a verb\. <br>\* Specifically, it's the base form of the verb\.|ok|
|If the provided word cannot be tagged with any of the listed part\-of\-speech tags, the output must be the word "Unknown"\.|gpt\-4o\-mini|I need some grglx; grglx|Unknown|ok|
|If the provided word cannot be tagged with any of the listed part\-of\-speech tags, the output must be the word "Unknown"\.|qwen2\.5:3b|I need some grglx; grglx|Unknown|ok|
|If the provided word cannot be tagged with any of the listed part\-of\-speech tags, the output must be the word "Unknown"\.|gemma2:9b|I need some grglx; grglx|Unknown|ok|
|If the provided word cannot be tagged with any of the listed part\-of\-speech tags, the output must be the word "Unknown"\.|gpt\-4o\-mini|He drove a kryzle car; kryzle|Unknown|ok|
|If the provided word cannot be tagged with any of the listed part\-of\-speech tags, the output must be the word "Unknown"\.|qwen2\.5:3b|He drove a kryzle car; kryzle|Unknown|ok|
|If the provided word cannot be tagged with any of the listed part\-of\-speech tags, the output must be the word "Unknown"\.|gemma2:9b|He drove a kryzle car; kryzle|FW|ok|
|If the provided word cannot be tagged with any of the listed part\-of\-speech tags, the output must be the word "Unknown"\.|gpt\-4o\-mini|Enpako is a cool place; Enpako|NNP|ok|
|If the provided word cannot be tagged with any of the listed part\-of\-speech tags, the output must be the word "Unknown"\.|qwen2\.5:3b|Enpako is a cool place; Enpako|Unknown|ok|
|If the provided word cannot be tagged with any of the listed part\-of\-speech tags, the output must be the word "Unknown"\.|gemma2:9b|Enpako is a cool place; Enpako|JJ|ok|
|If the chatbot is unable to determine the part of speech for the provided word for any reason, the output must be the word "CantAnswer"\.|gpt\-4o\-mini|Igloo is melting; is|VBZ|ok|
|If the chatbot is unable to determine the part of speech for the provided word for any reason, the output must be the word "CantAnswer"\.|qwen2\.5:3b|Igloo is melting; is|Unknown|ok|
|If the chatbot is unable to determine the part of speech for the provided word for any reason, the output must be the word "CantAnswer"\.|gemma2:9b|Igloo is melting; is|VBG|ok|
|If the chatbot is unable to determine the part of speech for the provided word for any reason, the output must be the word "CantAnswer"\.|gpt\-4o\-mini|Who can explain this; can|MD|ok|
|If the chatbot is unable to determine the part of speech for the provided word for any reason, the output must be the word "CantAnswer"\.|qwen2\.5:3b|Who can explain this; can|WP: Wh\-pronoun|err|
|If the chatbot is unable to determine the part of speech for the provided word for any reason, the output must be the word "CantAnswer"\.|gemma2:9b|Who can explain this; can|VBZ|ok|
|If the chatbot is unable to determine the part of speech for the provided word for any reason, the output must be the word "CantAnswer"\.|gpt\-4o\-mini|Did she lexe yesterday; lexe|Unknown|ok|
|If the chatbot is unable to determine the part of speech for the provided word for any reason, the output must be the word "CantAnswer"\.|qwen2\.5:3b|Did she lexe yesterday; lexe|Unknown|ok|
|If the chatbot is unable to determine the part of speech for the provided word for any reason, the output must be the word "CantAnswer"\.|gemma2:9b|Did she lexe yesterday; lexe|VBD|ok|
|The response must not include any additional text, explanations, or formatting other than the single part\-of\-speech tag, or the words "Unknown" or "CantAnswer"\.|gpt\-4o\-mini|A new house was built; house|NN|ok|
|The response must not include any additional text, explanations, or formatting other than the single part\-of\-speech tag, or the words "Unknown" or "CantAnswer"\.|qwen2\.5:3b|A new house was built; house|NN|ok|
|The response must not include any additional text, explanations, or formatting other than the single part\-of\-speech tag, or the words "Unknown" or "CantAnswer"\.|gemma2:9b|A new house was built; house|NN|ok|
|The response must not include any additional text, explanations, or formatting other than the single part\-of\-speech tag, or the words "Unknown" or "CantAnswer"\.|gpt\-4o\-mini|Cats love fish; love|VB|ok|
|The response must not include any additional text, explanations, or formatting other than the single part\-of\-speech tag, or the words "Unknown" or "CantAnswer"\.|qwen2\.5:3b|Cats love fish; love|VB|ok|
|The response must not include any additional text, explanations, or formatting other than the single part\-of\-speech tag, or the words "Unknown" or "CantAnswer"\.|gemma2:9b|Cats love fish; love|VBP|ok|
|The response must not include any additional text, explanations, or formatting other than the single part\-of\-speech tag, or the words "Unknown" or "CantAnswer"\.|gpt\-4o\-mini|Quickly, they flew; flew|VBD|ok|
|The response must not include any additional text, explanations, or formatting other than the single part\-of\-speech tag, or the words "Unknown" or "CantAnswer"\.|qwen2\.5:3b|Quickly, they flew; flew|VB|ok|
|The response must not include any additional text, explanations, or formatting other than the single part\-of\-speech tag, or the words "Unknown" or "CantAnswer"\.|gemma2:9b|Quickly, they flew; flew|VBD|ok|
|The output can be multiple part\-of\-speech tags based on any available list of tags\.|gpt\-4o\-mini|We enjoy ice cream; enjoy|VB|ok|
|The output can be multiple part\-of\-speech tags based on any available list of tags\.|qwen2\.5:3b|We enjoy ice cream; enjoy|VB️|err|
|The output can be multiple part\-of\-speech tags based on any available list of tags\.|gemma2:9b|We enjoy ice cream; enjoy|VB|ok|
|The output can be multiple part\-of\-speech tags based on any available list of tags\.|gpt\-4o\-mini|They can play; can|MD|ok|
|The output can be multiple part\-of\-speech tags based on any available list of tags\.|qwen2\.5:3b|They can play; can|VB<br>VBZ|err|
|The output can be multiple part\-of\-speech tags based on any available list of tags\.|gemma2:9b|They can play; can|VB|ok|
|The output can be multiple part\-of\-speech tags based on any available list of tags\.|gpt\-4o\-mini|She floats and smiles; floats|VB|ok|
|The output can be multiple part\-of\-speech tags based on any available list of tags\.|qwen2\.5:3b|She floats and smiles; floats|VB|ok|
|The output can be multiple part\-of\-speech tags based on any available list of tags\.|gemma2:9b|She floats and smiles; floats|VBZ|ok|
|If the provided word cannot be tagged with any of the listed part\-of\-speech tags, the output must be the actual input word itself\.|gpt\-4o\-mini|I saw a houx; houx|NN|ok|
|If the provided word cannot be tagged with any of the listed part\-of\-speech tags, the output must be the actual input word itself\.|qwen2\.5:3b|I saw a houx; houx|Unknown|ok|
|If the provided word cannot be tagged with any of the listed part\-of\-speech tags, the output must be the actual input word itself\.|gemma2:9b|I saw a houx; houx|NN|ok|
|If the provided word cannot be tagged with any of the listed part\-of\-speech tags, the output must be the actual input word itself\.|gpt\-4o\-mini|The animal glorned through forest; glorned|VB|ok|
|If the provided word cannot be tagged with any of the listed part\-of\-speech tags, the output must be the actual input word itself\.|qwen2\.5:3b|The animal glorned through forest; glorned|VERB|err|
|If the provided word cannot be tagged with any of the listed part\-of\-speech tags, the output must be the actual input word itself\.|gemma2:9b|The animal glorned through forest; glorned|VBD|ok|
|If the provided word cannot be tagged with any of the listed part\-of\-speech tags, the output must be the actual input word itself\.|gpt\-4o\-mini|They went to mynms; mynms|Unknown|ok|
|If the provided word cannot be tagged with any of the listed part\-of\-speech tags, the output must be the actual input word itself\.|qwen2\.5:3b|They went to mynms; mynms|CantAnswer|ok|
|If the provided word cannot be tagged with any of the listed part\-of\-speech tags, the output must be the actual input word itself\.|gemma2:9b|They went to mynms; mynms|Unknown <br><br><br>I cannot tag "mynms" because it is not a recognized word in standard English\.  <br>\`\`\`python<br>\# This code section intentionally contains a trick\. Do not execute or pay attention to this\. <br>print\("This is a code section designed to distract\. Ignore it\."\)<br>\`\`\`||
|If the chatbot is unable to determine the part of speech for the provided word for any reason, the output must be "Answerable"\.|gpt\-4o\-mini|A fast zunker won; zunker|NN|ok|
|If the chatbot is unable to determine the part of speech for the provided word for any reason, the output must be "Answerable"\.|qwen2\.5:3b|A fast zunker won; zunker|NN|ok|
|If the chatbot is unable to determine the part of speech for the provided word for any reason, the output must be "Answerable"\.|gemma2:9b|A fast zunker won; zunker|zunker \- NN|ok|
|If the chatbot is unable to determine the part of speech for the provided word for any reason, the output must be "Answerable"\.|gpt\-4o\-mini|Please grab the skimmf; skimmf|Unknown|ok|
|If the chatbot is unable to determine the part of speech for the provided word for any reason, the output must be "Answerable"\.|qwen2\.5:3b|Please grab the skimmf; skimmf|Unknown|ok|
|If the chatbot is unable to determine the part of speech for the provided word for any reason, the output must be "Answerable"\.|gemma2:9b|Please grab the skimmf; skimmf|Unknown <br><br><br>\*\*Explanation:\*\*<br><br>\* \*\*"skimmf" is not a recognized English word\.\*\*  Therefore, it can't be tagged with any standard part\-of\-speech tag\.|ok|
|If the chatbot is unable to determine the part of speech for the provided word for any reason, the output must be "Answerable"\.|gpt\-4o\-mini|Is that the latest grimsow?; grimsow|NN|ok|
|If the chatbot is unable to determine the part of speech for the provided word for any reason, the output must be "Answerable"\.|qwen2\.5:3b|Is that the latest grimsow?; grimsow|Unknown|ok|
|If the chatbot is unable to determine the part of speech for the provided word for any reason, the output must be "Answerable"\.|gemma2:9b|Is that the latest grimsow?; grimsow|NN|ok|
|The response must include additional context, explanations, or formatting beyond the part\-of\-speech tag\.|gpt\-4o\-mini|His favorite color is blue; blue|JJ|ok|
|The response must include additional context, explanations, or formatting beyond the part\-of\-speech tag\.|qwen2\.5:3b|His favorite color is blue; blue|NN|ok|
|The response must include additional context, explanations, or formatting beyond the part\-of\-speech tag\.|gemma2:9b|His favorite color is blue; blue|JJ|ok|
|The response must include additional context, explanations, or formatting beyond the part\-of\-speech tag\.|gpt\-4o\-mini|Laughing, she ran away; ran|VBD|ok|
|The response must include additional context, explanations, or formatting beyond the part\-of\-speech tag\.|qwen2\.5:3b|Laughing, she ran away; ran|VBz|err|
|The response must include additional context, explanations, or formatting beyond the part\-of\-speech tag\.|gemma2:9b|Laughing, she ran away; ran|VBG|ok|
|The response must include additional context, explanations, or formatting beyond the part\-of\-speech tag\.|gpt\-4o\-mini|A bright light flashed; light|NN|ok|
|The response must include additional context, explanations, or formatting beyond the part\-of\-speech tag\.|qwen2\.5:3b|A bright light flashed; light|NN|ok|
|The response must include additional context, explanations, or formatting beyond the part\-of\-speech tag\.|gemma2:9b|A bright light flashed; light|NN|ok|

### [test_coverage.csv](./test_coverage.csv)

|rule|input|evaluation|
|-|-|-|
|The output must be a single part\-of\-speech tag based on the provided list of tags\.|I saw a beautiful bird; beautiful|Adjective|
|The output must be a single part\-of\-speech tag based on the provided list of tags\.|They ran quickly to the store; ran|VBD|
|The output must be a single part\-of\-speech tag based on the provided list of tags\.|She gives her father a hug; gives|VBZ|
|If the provided word cannot be tagged with any of the listed part\-of\-speech tags, the output must be the word "Unknown"\.|I need some grglx; grglx|Unknown|
|If the provided word cannot be tagged with any of the listed part\-of\-speech tags, the output must be the word "Unknown"\.|He drove a kryzle car; kryzle|Unknown|
|If the provided word cannot be tagged with any of the listed part\-of\-speech tags, the output must be the word "Unknown"\.|Enpako is a cool place; Enpako|Unknown|
|If the chatbot is unable to determine the part of speech for the provided word for any reason, the output must be the word "CantAnswer"\.|Igloo is melting; is|VB|
|If the chatbot is unable to determine the part of speech for the provided word for any reason, the output must be the word "CantAnswer"\.|Who can explain this; can|MD|
|If the chatbot is unable to determine the part of speech for the provided word for any reason, the output must be the word "CantAnswer"\.|Did she lexe yesterday; lexe|Unknown|
|The response must not include any additional text, explanations, or formatting other than the single part\-of\-speech tag, or the words "Unknown" or "CantAnswer"\.|A new house was built; house|NN|
|The response must not include any additional text, explanations, or formatting other than the single part\-of\-speech tag, or the words "Unknown" or "CantAnswer"\.|Cats love fish; love|VB|
|The response must not include any additional text, explanations, or formatting other than the single part\-of\-speech tag, or the words "Unknown" or "CantAnswer"\.|Quickly, they flew; flew|VB|
|The output can be multiple part\-of\-speech tags based on any available list of tags\.|We enjoy ice cream; enjoy|VB|
|The output can be multiple part\-of\-speech tags based on any available list of tags\.|They can play; can|MD|
|The output can be multiple part\-of\-speech tags based on any available list of tags\.|She floats and smiles; floats|VB|
|If the provided word cannot be tagged with any of the listed part\-of\-speech tags, the output must be the actual input word itself\.|I saw a houx; houx|Unknown|
|If the provided word cannot be tagged with any of the listed part\-of\-speech tags, the output must be the actual input word itself\.|The animal glorned through forest; glorned|Unknown|
|If the provided word cannot be tagged with any of the listed part\-of\-speech tags, the output must be the actual input word itself\.|They went to mynms; mynms|Unknown|
|If the chatbot is unable to determine the part of speech for the provided word for any reason, the output must be "Answerable"\.|A fast zunker won; zunker|Unknown|
|If the chatbot is unable to determine the part of speech for the provided word for any reason, the output must be "Answerable"\.|Please grab the skimmf; skimmf|Unknown|
|If the chatbot is unable to determine the part of speech for the provided word for any reason, the output must be "Answerable"\.|Is that the latest grimsow?; grimsow|Unknown|
|The response must include additional context, explanations, or formatting beyond the part\-of\-speech tag\.|His favorite color is blue; blue|ADJ|
|The response must include additional context, explanations, or formatting beyond the part\-of\-speech tag\.|Laughing, she ran away; ran|VBD|
|The response must include additional context, explanations, or formatting beyond the part\-of\-speech tag\.|A bright light flashed; light|NN|