## speech-tag ([json](./evals\v3\speech-tag/report.json))

- 5 rules
- 5 inverse rules
- 50 tests, 20 baseline tests
- 150 test results, 141 (94%) oks, 9 (6%) errs


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
Determine the part of speech for a given word in a sentence and return the tag.
`````


### [input_spec.txt](./input_spec.txt)

`````txt
The input must be a single sentence containing a complete thought.  
The input sentence must include the specified word anywhere within it.  
The input must clearly specify the word to be identified for its part of speech.  
The specified word must be in a format that allows clear identification within the sentence.  
The input should be formatted with a semicolon separating the sentence and the specified word.
`````


### [baseline_tests.csv](./baseline_tests.csv)

|testinput|baseline|
|-|-|
|\{\{sentence: The quick brown fox jumps over the lazy dog\}\}; \{\{word: jumps\}\}|1|
|\{\{sentence: She sells sea shells by the sea shore\}\}; \{\{word: She\}\}|1|
|\{\{sentence: One hundred and twenty five horses raced across the field\}\}; \{\{word: hundred\}\}|1|
|\{\{sentence: I have never seen such a beautiful sunset\}\}; \{\{word: beautiful\}\}|1|
|\{\{sentence: Alas, we have reached the end of our journey\}\}; \{\{word: Alas\}\}|1|
|\{\{sentence: We need to go shopping for groceries\}\}; \{\{word: shopping\}\}|1|
|\{\{sentence: The tour guide spoke fluent Italian during the trip\}\}; \{\{word: fluent\}\}|1|
|\{\{sentence: If she could, she would have helped\}\}; \{\{word: could\}\}|1|
|\{\{sentence: The professor gave us a detailed explanation\}\}; \{\{word: explanation\}\}|1|
|\{\{sentence: They are quite excited about the upcoming trip\}\}; \{\{word: about\}\}|1|
|\{\{sentence: For each action, there is an equal and opposite reaction\}\}; \{\{word: action\}\}|1|
|\{\{sentence: The jury found the defendant guilty beyond a reasonable doubt\}\}; \{\{word: found\}\}|1|
|\{\{sentence: In 1492 Columbus sailed across the ocean\}\}; \{\{word: 1492\}\}|1|
|\{\{sentence: Everyone forgot to bring their books\}\}; \{\{word: everyone\}\}|1|
|\{\{sentence: She is smarter than any other student in the class\}\}; \{\{word: smarter\}\}|1|
|\{\{word: Hello\}\}; \{\{sentence: The mysterious artifact was discovered\}\}|1|
|\{\{sentence: He runs faster than his brother\}\}; \{\{word: runs\}\}|1|
|\{\{sentence: They have been friends since childhood\}\}; \{\{word: friends\}\}|1|
|\{\{sentence: Despite his efforts, he couldn't solve the problem\}\}; \{\{word: Despite\}\}|1|
|\{\{sentence: This is too heavy to carry\}\}; \{\{word: too\}\}|1|

### [rules.txt](./rules.txt)

`````txt
1: The output must be a single part of speech tag as defined in the alphabetical list provided.
2: If the word can be tagged, the output must be one of the specified part of speech tags: CC, CD, DT, EX, FW, IN, JJ, JJR, JJS, LS, MD, NN, NNS, NNP, NNPS, PDT, POS, PRP, PRP$, RB, RBR, RBS, RP, SYM, TO, UH, VB, VBD, VBG, VBN, VBP, VBZ, WDT, WP, WP$, WRB.
3: If the word cannot be tagged with the given part of speech tags, the output must be the word "Unknown".
4: If the chatbot is unable to determine the part of speech for the word, the output must be the word "CantAnswer".
5: The output must not include any additional text, labels, or punctuation, and must contain only the part of speech tag, "Unknown", or "CantAnswer".
`````


### [inverse_rules.txt](./inverse_rules.txt)

`````txt
6: The output may include multiple part of speech tags as defined in non-alphabetical order.
7: If the word can be tagged, the output must not be any of the specified part of speech tags: CC, CD, DT, EX, FW, IN, JJ, JJR, JJS, LS, MD, NN, NNS, NNP, NNPS, PDT, POS, PRP, PRP$, RB, RBR, RBS, RP, SYM, TO, UH, VB, VBD, VBG, VBN, VBP, VBZ, WDT, WP, WP$, WRB.
8: If the word cannot be tagged with the given part of speech tags, the output must not be the word "Unknown".
9: If the chatbot is able to determine the part of speech for the word, the output must not be the word "CantAnswer".
10: The output may include additional text, labels, or punctuation, and must not contain only the part of speech tag, "Unknown", or "CantAnswer".
`````


### [tests.csv](./tests.csv)

|testinput|expectedoutput|reasoning|
|-|-|-|
|The quick brown fox jumps over the lazy dog; fox|NN|Tests if the software returns a single part of speech tag for a noun\.|
|She sells sea shells by the sea shore; sells|VBZ|Verifies that the output is a verb \(3rd person singular present\) tag, following rule 1\.|
|They are attending a wonderful event today; are|VBP|Checks if the output is a precise verb tag for a non\-3rd person singular present verb\.|
|The convoy comprises several trucks; trucks|NNS|Examines if the software identifies the noun tag correctly from the specified list\.|
|Never let it be forgotten that success demands hard work; demands|VBZ|Tests if the word can be tagged with one of the specified POS tags in the rule list\.|
|This information will be essential; essential|JJ|Validates that an adjective is tagged correctly from the provided POS list\.|
|The operation in the warehouse was organized very quickly; blanched|Unknown|Tests the software's ability to respond with 'Unknown' when the word is unrecognizable within the tag list\.|
|Routine checks ensure efficiency and safety; checks|Unknown|Assesses the response 'Unknown' for an ambiguous context if misrecognition occurs\.|
|It was a beautiful sunny day; xylophone|Unknown|Ensures output is 'Unknown' when a word is not naturally taggable\.|
|The enigmatic tale baffled everyone; gryphon|CantAnswer|Evaluates the response 'CantAnswer' for nonsensical, non\-discernable words\.|
|His antique collection is exquisite; crux|CantAnswer|Validates return of 'CantAnswer' when POS tagging is uncertain\.|
|He has reached the pinnacle of success; xylo|CantAnswer|Tests for a return of 'CantAnswer' due to inability to tag correctly\.|
|The sun rises in the east; sun|NN|Tests that the output has no additional text and is a part of speech tag\.|
|An exemplary display of skill; display|VB|Checks output precision lacking extraneous details, ensuring only required POS tag\.|
|Storms are a natural occurrence in this region; storms|NNS|Confirms the output follows specified output structure without additions\.|
|Although tired, she continued writing all night; continued|VBD VBN|Tests if the output includes multiple POS tags correctly without adhering solely to alphabetical order\.|
|To answer what is right, focus on integrity; right|JJ RB|Ensures software enumerates possible multiple part of speech tags in non\-alphabetical order\.|
|The cake that she baked was delicious; baked|VBD VBN|Validates non\-alphabetical order in listing valid multiple tags for a word\.|
|The city never sleeps; city|Unknown|Verifies that valid tagged words should not be erroneously tagged with provided POS tags\.|
|I shall return when the sun sets; return|Unknown|Tests that identifiable words are not mistakenly labeled with listed tags\.|
|With solace, tranquility was restored; solace|Unknown|Challenges the software to ensure known words are not associated with listed POS tags\.|
|She whispered secrets through the night; whispering|CantAnswer|Ensures the output is not 'Unknown' for words that defy tagging\.|
|With a technique so refined, it was astounding; technique|CantAnswer|Validates that 'Unknown' is not returned when tagging is difficult\.|
|To cry out is to release pent\-up emotions; cry|CantAnswer|Tests for ensuring 'Unknown' is not erroneously returned\.|
|His presence was unwavering amid the chaos; presence|NN|Checks that a known adjective does not prompt 'CantAnswer'\.|
|They determined the book's success; determined|VBD|Confirms those words that are identifiable should not trigger 'CantAnswer'\.|
|A picture\-perfect moment captured; picture|NN|Ensures correctly tagged words are not mistakenly tagged as CantAnswer\.|
|Despite the warnings, he ventured forth; warnings|Warnings: NNS|Evaluates the inclusion of labels or additional text in expected output\.|
|Is it ever the right time to make such decisions?; right|RIGHT: RR JJ|Tests output format variance including additional details\.|
|Their determination was seen in every move; determination|Determination \(NN\)|Challenges for compliance with relaxed format allowing extra output\.|

### [test_results.csv](./test_results.csv)

|rule|model|input|output|compliance|
|-|-|-|-|-|
|The output must be a single part of speech tag as defined in the alphabetical list provided\.|gpt\-4o\-mini|The quick brown fox jumps over the lazy dog; fox|NN|ok|
|The output must be a single part of speech tag as defined in the alphabetical list provided\.|qwen2\.5:3b|The quick brown fox jumps over the lazy dog; fox|NN|ok|
|The output must be a single part of speech tag as defined in the alphabetical list provided\.|gemma2:9b|The quick brown fox jumps over the lazy dog; fox|NN|ok|
|The output must be a single part of speech tag as defined in the alphabetical list provided\.|gpt\-4o\-mini|She sells sea shells by the sea shore; sells|VB|ok|
|The output must be a single part of speech tag as defined in the alphabetical list provided\.|qwen2\.5:3b|She sells sea shells by the sea shore; sells|VBZ|ok|
|The output must be a single part of speech tag as defined in the alphabetical list provided\.|gemma2:9b|She sells sea shells by the sea shore; sells|VBP|ok|
|The output must be a single part of speech tag as defined in the alphabetical list provided\.|gpt\-4o\-mini|They are attending a wonderful event today; are|VBP|ok|
|The output must be a single part of speech tag as defined in the alphabetical list provided\.|qwen2\.5:3b|They are attending a wonderful event today; are|VBZ|ok|
|The output must be a single part of speech tag as defined in the alphabetical list provided\.|gemma2:9b|They are attending a wonderful event today; are|RB|ok|
|If the word can be tagged, the output must be one of the specified part of speech tags: CC, CD, DT, EX, FW, IN, JJ, JJR, JJS, LS, MD, NN, NNS, NNP, NNPS, PDT, POS, PRP, PRP$, RB, RBR, RBS, RP, SYM, TO, UH, VB, VBD, VBG, VBN, VBP, VBZ, WDT, WP, WP$, WRB\.|gpt\-4o\-mini|The convoy comprises several trucks; trucks|NNS|ok|
|If the word can be tagged, the output must be one of the specified part of speech tags: CC, CD, DT, EX, FW, IN, JJ, JJR, JJS, LS, MD, NN, NNS, NNP, NNPS, PDT, POS, PRP, PRP$, RB, RBR, RBS, RP, SYM, TO, UH, VB, VBD, VBG, VBN, VBP, VBZ, WDT, WP, WP$, WRB\.|qwen2\.5:3b|The convoy comprises several trucks; trucks|NN|ok|
|If the word can be tagged, the output must be one of the specified part of speech tags: CC, CD, DT, EX, FW, IN, JJ, JJR, JJS, LS, MD, NN, NNS, NNP, NNPS, PDT, POS, PRP, PRP$, RB, RBR, RBS, RP, SYM, TO, UH, VB, VBD, VBG, VBN, VBP, VBZ, WDT, WP, WP$, WRB\.|gemma2:9b|The convoy comprises several trucks; trucks|NNS<br><br>Explanation: "Trucks" is plural noun\.  <br><br><br>Let me know if you have another word to tag\!|ok|
|If the word can be tagged, the output must be one of the specified part of speech tags: CC, CD, DT, EX, FW, IN, JJ, JJR, JJS, LS, MD, NN, NNS, NNP, NNPS, PDT, POS, PRP, PRP$, RB, RBR, RBS, RP, SYM, TO, UH, VB, VBD, VBG, VBN, VBP, VBZ, WDT, WP, WP$, WRB\.|gpt\-4o\-mini|Never let it be forgotten that success demands hard work; demands|VBZ|ok|
|If the word can be tagged, the output must be one of the specified part of speech tags: CC, CD, DT, EX, FW, IN, JJ, JJR, JJS, LS, MD, NN, NNS, NNP, NNPS, PDT, POS, PRP, PRP$, RB, RBR, RBS, RP, SYM, TO, UH, VB, VBD, VBG, VBN, VBP, VBZ, WDT, WP, WP$, WRB\.|qwen2\.5:3b|Never let it be forgotten that success demands hard work; demands|VB|ok|
|If the word can be tagged, the output must be one of the specified part of speech tags: CC, CD, DT, EX, FW, IN, JJ, JJR, JJS, LS, MD, NN, NNS, NNP, NNPS, PDT, POS, PRP, PRP$, RB, RBR, RBS, RP, SYM, TO, UH, VB, VBD, VBG, VBN, VBP, VBZ, WDT, WP, WP$, WRB\.|gemma2:9b|Never let it be forgotten that success demands hard work; demands|JJR|ok|
|If the word can be tagged, the output must be one of the specified part of speech tags: CC, CD, DT, EX, FW, IN, JJ, JJR, JJS, LS, MD, NN, NNS, NNP, NNPS, PDT, POS, PRP, PRP$, RB, RBR, RBS, RP, SYM, TO, UH, VB, VBD, VBG, VBN, VBP, VBZ, WDT, WP, WP$, WRB\.|gpt\-4o\-mini|This information will be essential; essential|JJ|ok|
|If the word can be tagged, the output must be one of the specified part of speech tags: CC, CD, DT, EX, FW, IN, JJ, JJR, JJS, LS, MD, NN, NNS, NNP, NNPS, PDT, POS, PRP, PRP$, RB, RBR, RBS, RP, SYM, TO, UH, VB, VBD, VBG, VBN, VBP, VBZ, WDT, WP, WP$, WRB\.|qwen2\.5:3b|This information will be essential; essential|JJ|ok|
|If the word can be tagged, the output must be one of the specified part of speech tags: CC, CD, DT, EX, FW, IN, JJ, JJR, JJS, LS, MD, NN, NNS, NNP, NNPS, PDT, POS, PRP, PRP$, RB, RBR, RBS, RP, SYM, TO, UH, VB, VBD, VBG, VBN, VBP, VBZ, WDT, WP, WP$, WRB\.|gemma2:9b|This information will be essential; essential|I understand\. Please provide me with the sentence and word so I can determine its part of speech\. <br><br>I'm ready to follow the safety guidelines you've outlined\! 😊|err|
|If the word cannot be tagged with the given part of speech tags, the output must be the word "Unknown"\.|gpt\-4o\-mini|The operation in the warehouse was organized very quickly; blanched|VBD|ok|
|If the word cannot be tagged with the given part of speech tags, the output must be the word "Unknown"\.|qwen2\.5:3b|The operation in the warehouse was organized very quickly; blanched|Unknown|ok|
|If the word cannot be tagged with the given part of speech tags, the output must be the word "Unknown"\.|gemma2:9b|The operation in the warehouse was organized very quickly; blanched|\# \*\*Part of Speech Tagging\*\*<br><br>Given sentence: "The operation in the warehouse was organized very quickly;" <br><br>Word: \*\*quickly\*\*<br><br>Tag: RB<br><br><br>Let me know if you'd like to try another word\!|ok|
|If the word cannot be tagged with the given part of speech tags, the output must be the word "Unknown"\.|gpt\-4o\-mini|Routine checks ensure efficiency and safety; checks|NNS|ok|
|If the word cannot be tagged with the given part of speech tags, the output must be the word "Unknown"\.|qwen2\.5:3b|Routine checks ensure efficiency and safety; checks|VB|ok|
|If the word cannot be tagged with the given part of speech tags, the output must be the word "Unknown"\.|gemma2:9b|Routine checks ensure efficiency and safety; checks|NN <br><br><br>Let's break down why:<br><br>\* \*\*"Checks"\*\* is a noun in this sentence\. It represents a thing \(the actions of verification\) being done\.|err|
|If the word cannot be tagged with the given part of speech tags, the output must be the word "Unknown"\.|gpt\-4o\-mini|It was a beautiful sunny day; xylophone|NN|ok|
|If the word cannot be tagged with the given part of speech tags, the output must be the word "Unknown"\.|qwen2\.5:3b|It was a beautiful sunny day; xylophone|Unknown|ok|
|If the word cannot be tagged with the given part of speech tags, the output must be the word "Unknown"\.|gemma2:9b|It was a beautiful sunny day; xylophone|JJ <br><br><br>Let me know if you have more examples\!|err|
|If the chatbot is unable to determine the part of speech for the word, the output must be the word "CantAnswer"\.|gpt\-4o\-mini|The enigmatic tale baffled everyone; gryphon|NN|ok|
|If the chatbot is unable to determine the part of speech for the word, the output must be the word "CantAnswer"\.|qwen2\.5:3b|The enigmatic tale baffled everyone; gryphon|Unknown|ok|
|If the chatbot is unable to determine the part of speech for the word, the output must be the word "CantAnswer"\.|gemma2:9b|The enigmatic tale baffled everyone; gryphon|NN <br><br><br>\*The word "gryphon" is a noun\.\*|ok|
|If the chatbot is unable to determine the part of speech for the word, the output must be the word "CantAnswer"\.|gpt\-4o\-mini|His antique collection is exquisite; crux|NN|ok|
|If the chatbot is unable to determine the part of speech for the word, the output must be the word "CantAnswer"\.|qwen2\.5:3b|His antique collection is exquisite; crux|Unknown|ok|
|If the chatbot is unable to determine the part of speech for the word, the output must be the word "CantAnswer"\.|gemma2:9b|His antique collection is exquisite; crux|JJ|ok|
|If the chatbot is unable to determine the part of speech for the word, the output must be the word "CantAnswer"\.|gpt\-4o\-mini|He has reached the pinnacle of success; xylo|Unknown|ok|
|If the chatbot is unable to determine the part of speech for the word, the output must be the word "CantAnswer"\.|qwen2\.5:3b|He has reached the pinnacle of success; xylo|Unknown|ok|
|If the chatbot is unable to determine the part of speech for the word, the output must be the word "CantAnswer"\.|gemma2:9b|He has reached the pinnacle of success; xylo|NN|ok|
|The output must not include any additional text, labels, or punctuation, and must contain only the part of speech tag, "Unknown", or "CantAnswer"\.|gpt\-4o\-mini|The sun rises in the east; sun|NN|ok|
|The output must not include any additional text, labels, or punctuation, and must contain only the part of speech tag, "Unknown", or "CantAnswer"\.|qwen2\.5:3b|The sun rises in the east; sun|NN|ok|
|The output must not include any additional text, labels, or punctuation, and must contain only the part of speech tag, "Unknown", or "CantAnswer"\.|gemma2:9b|The sun rises in the east; sun|NN|ok|
|The output must not include any additional text, labels, or punctuation, and must contain only the part of speech tag, "Unknown", or "CantAnswer"\.|gpt\-4o\-mini|An exemplary display of skill; display|NN|ok|
|The output must not include any additional text, labels, or punctuation, and must contain only the part of speech tag, "Unknown", or "CantAnswer"\.|qwen2\.5:3b|An exemplary display of skill; display|NN|ok|
|The output must not include any additional text, labels, or punctuation, and must contain only the part of speech tag, "Unknown", or "CantAnswer"\.|gemma2:9b|An exemplary display of skill; display|Okay, I understand the guidelines and am ready to tag parts of speech\. <br><br>Please provide me with the sentence and the word you want tagged\.|err|
|The output must not include any additional text, labels, or punctuation, and must contain only the part of speech tag, "Unknown", or "CantAnswer"\.|gpt\-4o\-mini|Storms are a natural occurrence in this region; storms|NNS|ok|
|The output must not include any additional text, labels, or punctuation, and must contain only the part of speech tag, "Unknown", or "CantAnswer"\.|qwen2\.5:3b|Storms are a natural occurrence in this region; storms|NN|ok|
|The output must not include any additional text, labels, or punctuation, and must contain only the part of speech tag, "Unknown", or "CantAnswer"\.|gemma2:9b|Storms are a natural occurrence in this region; storms|NN|ok|
|The output may include multiple part of speech tags as defined in non\-alphabetical order\.|gpt\-4o\-mini|Although tired, she continued writing all night; continued|VBD|ok|
|The output may include multiple part of speech tags as defined in non\-alphabetical order\.|qwen2\.5:3b|Although tired, she continued writing all night; continued|VB|ok|
|The output may include multiple part of speech tags as defined in non\-alphabetical order\.|gemma2:9b|Although tired, she continued writing all night; continued|VBD|ok|
|The output may include multiple part of speech tags as defined in non\-alphabetical order\.|gpt\-4o\-mini|To answer what is right, focus on integrity; right|JJ|ok|
|The output may include multiple part of speech tags as defined in non\-alphabetical order\.|qwen2\.5:3b|To answer what is right, focus on integrity; right|Unknown<br><br>The provided sentence does not contain the given word for tagging\. Therefore, I am unable to tag the word "right" based on the given task instructions and dataset\.|err|
|The output may include multiple part of speech tags as defined in non\-alphabetical order\.|gemma2:9b|To answer what is right, focus on integrity; right|I understand the safety guidelines and will follow them strictly\. <br><br>Provide me with the sentence and the word, and I'll determine the part\-of\-speech tag\.|err|
|The output may include multiple part of speech tags as defined in non\-alphabetical order\.|gpt\-4o\-mini|The cake that she baked was delicious; baked|VBD|ok|
|The output may include multiple part of speech tags as defined in non\-alphabetical order\.|qwen2\.5:3b|The cake that she baked was delicious; baked|VBZ|ok|
|The output may include multiple part of speech tags as defined in non\-alphabetical order\.|gemma2:9b|The cake that she baked was delicious; baked|VBD|ok|
|If the word can be tagged, the output must not be any of the specified part of speech tags: CC, CD, DT, EX, FW, IN, JJ, JJR, JJS, LS, MD, NN, NNS, NNP, NNPS, PDT, POS, PRP, PRP$, RB, RBR, RBS, RP, SYM, TO, UH, VB, VBD, VBG, VBN, VBP, VBZ, WDT, WP, WP$, WRB\.|gpt\-4o\-mini|The city never sleeps; city|NN|ok|
|If the word can be tagged, the output must not be any of the specified part of speech tags: CC, CD, DT, EX, FW, IN, JJ, JJR, JJS, LS, MD, NN, NNS, NNP, NNPS, PDT, POS, PRP, PRP$, RB, RBR, RBS, RP, SYM, TO, UH, VB, VBD, VBG, VBN, VBP, VBZ, WDT, WP, WP$, WRB\.|qwen2\.5:3b|The city never sleeps; city|NN|ok|
|If the word can be tagged, the output must not be any of the specified part of speech tags: CC, CD, DT, EX, FW, IN, JJ, JJR, JJS, LS, MD, NN, NNS, NNP, NNPS, PDT, POS, PRP, PRP$, RB, RBR, RBS, RP, SYM, TO, UH, VB, VBD, VBG, VBN, VBP, VBZ, WDT, WP, WP$, WRB\.|gemma2:9b|The city never sleeps; city|NN|ok|
|If the word can be tagged, the output must not be any of the specified part of speech tags: CC, CD, DT, EX, FW, IN, JJ, JJR, JJS, LS, MD, NN, NNS, NNP, NNPS, PDT, POS, PRP, PRP$, RB, RBR, RBS, RP, SYM, TO, UH, VB, VBD, VBG, VBN, VBP, VBZ, WDT, WP, WP$, WRB\.|gpt\-4o\-mini|I shall return when the sun sets; return|VB|ok|
|If the word can be tagged, the output must not be any of the specified part of speech tags: CC, CD, DT, EX, FW, IN, JJ, JJR, JJS, LS, MD, NN, NNS, NNP, NNPS, PDT, POS, PRP, PRP$, RB, RBR, RBS, RP, SYM, TO, UH, VB, VBD, VBG, VBN, VBP, VBZ, WDT, WP, WP$, WRB\.|qwen2\.5:3b|I shall return when the sun sets; return|TO|ok|
|If the word can be tagged, the output must not be any of the specified part of speech tags: CC, CD, DT, EX, FW, IN, JJ, JJR, JJS, LS, MD, NN, NNS, NNP, NNPS, PDT, POS, PRP, PRP$, RB, RBR, RBS, RP, SYM, TO, UH, VB, VBD, VBG, VBN, VBP, VBZ, WDT, WP, WP$, WRB\.|gemma2:9b|I shall return when the sun sets; return|VB|ok|
|If the word can be tagged, the output must not be any of the specified part of speech tags: CC, CD, DT, EX, FW, IN, JJ, JJR, JJS, LS, MD, NN, NNS, NNP, NNPS, PDT, POS, PRP, PRP$, RB, RBR, RBS, RP, SYM, TO, UH, VB, VBD, VBG, VBN, VBP, VBZ, WDT, WP, WP$, WRB\.|gpt\-4o\-mini|With solace, tranquility was restored; solace|NN|ok|
|If the word can be tagged, the output must not be any of the specified part of speech tags: CC, CD, DT, EX, FW, IN, JJ, JJR, JJS, LS, MD, NN, NNS, NNP, NNPS, PDT, POS, PRP, PRP$, RB, RBR, RBS, RP, SYM, TO, UH, VB, VBD, VBG, VBN, VBP, VBZ, WDT, WP, WP$, WRB\.|qwen2\.5:3b|With solace, tranquility was restored; solace|Unknown|ok|
|If the word can be tagged, the output must not be any of the specified part of speech tags: CC, CD, DT, EX, FW, IN, JJ, JJR, JJS, LS, MD, NN, NNS, NNP, NNPS, PDT, POS, PRP, PRP$, RB, RBR, RBS, RP, SYM, TO, UH, VB, VBD, VBG, VBN, VBP, VBZ, WDT, WP, WP$, WRB\.|gemma2:9b|With solace, tranquility was restored; solace|NN|ok|
|If the word cannot be tagged with the given part of speech tags, the output must not be the word "Unknown"\.|gpt\-4o\-mini|She whispered secrets through the night; whispering|VBG|ok|
|If the word cannot be tagged with the given part of speech tags, the output must not be the word "Unknown"\.|qwen2\.5:3b|She whispered secrets through the night; whispering|VB|ok|
|If the word cannot be tagged with the given part of speech tags, the output must not be the word "Unknown"\.|gemma2:9b|She whispered secrets through the night; whispering|VBG|ok|
|If the word cannot be tagged with the given part of speech tags, the output must not be the word "Unknown"\.|gpt\-4o\-mini|With a technique so refined, it was astounding; technique|NN|ok|
|If the word cannot be tagged with the given part of speech tags, the output must not be the word "Unknown"\.|qwen2\.5:3b|With a technique so refined, it was astounding; technique|NN|ok|
|If the word cannot be tagged with the given part of speech tags, the output must not be the word "Unknown"\.|gemma2:9b|With a technique so refined, it was astounding; technique|JJ|ok|
|If the word cannot be tagged with the given part of speech tags, the output must not be the word "Unknown"\.|gpt\-4o\-mini|To cry out is to release pent\-up emotions; cry|VB|ok|
|If the word cannot be tagged with the given part of speech tags, the output must not be the word "Unknown"\.|qwen2\.5:3b|To cry out is to release pent\-up emotions; cry|VB|ok|
|If the word cannot be tagged with the given part of speech tags, the output must not be the word "Unknown"\.|gemma2:9b|To cry out is to release pent\-up emotions; cry|VB|ok|
|If the chatbot is able to determine the part of speech for the word, the output must not be the word "CantAnswer"\.|gpt\-4o\-mini|His presence was unwavering amid the chaos; presence|NN|ok|
|If the chatbot is able to determine the part of speech for the word, the output must not be the word "CantAnswer"\.|qwen2\.5:3b|His presence was unwavering amid the chaos; presence|NN|ok|
|If the chatbot is able to determine the part of speech for the word, the output must not be the word "CantAnswer"\.|gemma2:9b|His presence was unwavering amid the chaos; presence|NN|ok|
|If the chatbot is able to determine the part of speech for the word, the output must not be the word "CantAnswer"\.|gpt\-4o\-mini|They determined the book's success; determined|VBD|ok|
|If the chatbot is able to determine the part of speech for the word, the output must not be the word "CantAnswer"\.|qwen2\.5:3b|They determined the book's success; determined|VB|ok|
|If the chatbot is able to determine the part of speech for the word, the output must not be the word "CantAnswer"\.|gemma2:9b|They determined the book's success; determined|VBD|ok|
|If the chatbot is able to determine the part of speech for the word, the output must not be the word "CantAnswer"\.|gpt\-4o\-mini|A picture\-perfect moment captured; picture|JJ|ok|
|If the chatbot is able to determine the part of speech for the word, the output must not be the word "CantAnswer"\.|qwen2\.5:3b|A picture\-perfect moment captured; picture|NN|ok|
|If the chatbot is able to determine the part of speech for the word, the output must not be the word "CantAnswer"\.|gemma2:9b|A picture\-perfect moment captured; picture|NN|ok|
|The output may include additional text, labels, or punctuation, and must not contain only the part of speech tag, "Unknown", or "CantAnswer"\.|gpt\-4o\-mini|Despite the warnings, he ventured forth; warnings|NNS|ok|
|The output may include additional text, labels, or punctuation, and must not contain only the part of speech tag, "Unknown", or "CantAnswer"\.|qwen2\.5:3b|Despite the warnings, he ventured forth; warnings|WRB|ok|
|The output may include additional text, labels, or punctuation, and must not contain only the part of speech tag, "Unknown", or "CantAnswer"\.|gemma2:9b|Despite the warnings, he ventured forth; warnings|NNP|ok|
|The output may include additional text, labels, or punctuation, and must not contain only the part of speech tag, "Unknown", or "CantAnswer"\.|gpt\-4o\-mini|Is it ever the right time to make such decisions?; right|JJ|ok|
|The output may include additional text, labels, or punctuation, and must not contain only the part of speech tag, "Unknown", or "CantAnswer"\.|qwen2\.5:3b|Is it ever the right time to make such decisions?; right|JJ️|err|
|The output may include additional text, labels, or punctuation, and must not contain only the part of speech tag, "Unknown", or "CantAnswer"\.|gemma2:9b|Is it ever the right time to make such decisions?; right|RB|ok|
|The output may include additional text, labels, or punctuation, and must not contain only the part of speech tag, "Unknown", or "CantAnswer"\.|gpt\-4o\-mini|Their determination was seen in every move; determination|NN|ok|
|The output may include additional text, labels, or punctuation, and must not contain only the part of speech tag, "Unknown", or "CantAnswer"\.|qwen2\.5:3b|Their determination was seen in every move; determination|NN|ok|
|The output may include additional text, labels, or punctuation, and must not contain only the part of speech tag, "Unknown", or "CantAnswer"\.|gemma2:9b|Their determination was seen in every move; determination|NN|ok|
||gpt\-4o\-mini|\{\{sentence: The quick brown fox jumps over the lazy dog\}\}; \{\{word: jumps\}\}|VB|ok|
||qwen2\.5:3b|\{\{sentence: The quick brown fox jumps over the lazy dog\}\}; \{\{word: jumps\}\}|VBZ|ok|
||gemma2:9b|\{\{sentence: The quick brown fox jumps over the lazy dog\}\}; \{\{word: jumps\}\}|VBZ|ok|
||gpt\-4o\-mini|\{\{sentence: She sells sea shells by the sea shore\}\}; \{\{word: She\}\}|PRP|ok|
||qwen2\.5:3b|\{\{sentence: She sells sea shells by the sea shore\}\}; \{\{word: She\}\}|WP|ok|
||gemma2:9b|\{\{sentence: She sells sea shells by the sea shore\}\}; \{\{word: She\}\}|PRP|ok|
||gpt\-4o\-mini|\{\{sentence: One hundred and twenty five horses raced across the field\}\}; \{\{word: hundred\}\}|CD|ok|
||qwen2\.5:3b|\{\{sentence: One hundred and twenty five horses raced across the field\}\}; \{\{word: hundred\}\}|CD|ok|
||gemma2:9b|\{\{sentence: One hundred and twenty five horses raced across the field\}\}; \{\{word: hundred\}\}|CD|ok|
||gpt\-4o\-mini|\{\{sentence: I have never seen such a beautiful sunset\}\}; \{\{word: beautiful\}\}|JJ|ok|
||qwen2\.5:3b|\{\{sentence: I have never seen such a beautiful sunset\}\}; \{\{word: beautiful\}\}|JJ|ok|
||gemma2:9b|\{\{sentence: I have never seen such a beautiful sunset\}\}; \{\{word: beautiful\}\}|JJ|ok|
||gpt\-4o\-mini|\{\{sentence: Alas, we have reached the end of our journey\}\}; \{\{word: Alas\}\}|UH|ok|
||qwen2\.5:3b|\{\{sentence: Alas, we have reached the end of our journey\}\}; \{\{word: Alas\}\}|UH|ok|
||gemma2:9b|\{\{sentence: Alas, we have reached the end of our journey\}\}; \{\{word: Alas\}\}|UH|ok|
||gpt\-4o\-mini|\{\{sentence: We need to go shopping for groceries\}\}; \{\{word: shopping\}\}|NN|ok|
||qwen2\.5:3b|\{\{sentence: We need to go shopping for groceries\}\}; \{\{word: shopping\}\}|NN|ok|
||gemma2:9b|\{\{sentence: We need to go shopping for groceries\}\}; \{\{word: shopping\}\}|NN|ok|
||gpt\-4o\-mini|\{\{sentence: The tour guide spoke fluent Italian during the trip\}\}; \{\{word: fluent\}\}|JJ|ok|
||qwen2\.5:3b|\{\{sentence: The tour guide spoke fluent Italian during the trip\}\}; \{\{word: fluent\}\}|JJ|ok|
||gemma2:9b|\{\{sentence: The tour guide spoke fluent Italian during the trip\}\}; \{\{word: fluent\}\}|JJ|ok|
||gpt\-4o\-mini|\{\{sentence: If she could, she would have helped\}\}; \{\{word: could\}\}|MD|ok|
||qwen2\.5:3b|\{\{sentence: If she could, she would have helped\}\}; \{\{word: could\}\}|MD|ok|
||gemma2:9b|\{\{sentence: If she could, she would have helped\}\}; \{\{word: could\}\}|MD|ok|
||gpt\-4o\-mini|\{\{sentence: The professor gave us a detailed explanation\}\}; \{\{word: explanation\}\}|NN|ok|
||qwen2\.5:3b|\{\{sentence: The professor gave us a detailed explanation\}\}; \{\{word: explanation\}\}|NN|ok|
||gemma2:9b|\{\{sentence: The professor gave us a detailed explanation\}\}; \{\{word: explanation\}\}|NN|ok|
||gpt\-4o\-mini|\{\{sentence: They are quite excited about the upcoming trip\}\}; \{\{word: about\}\}|IN|ok|
||qwen2\.5:3b|\{\{sentence: They are quite excited about the upcoming trip\}\}; \{\{word: about\}\}|TO|ok|
||gemma2:9b|\{\{sentence: They are quite excited about the upcoming trip\}\}; \{\{word: about\}\}|IN|ok|
||gpt\-4o\-mini|\{\{sentence: For each action, there is an equal and opposite reaction\}\}; \{\{word: action\}\}|NN|ok|
||qwen2\.5:3b|\{\{sentence: For each action, there is an equal and opposite reaction\}\}; \{\{word: action\}\}|NN|ok|
||gemma2:9b|\{\{sentence: For each action, there is an equal and opposite reaction\}\}; \{\{word: action\}\}|NN|ok|
||gpt\-4o\-mini|\{\{sentence: The jury found the defendant guilty beyond a reasonable doubt\}\}; \{\{word: found\}\}|VBD|ok|
||qwen2\.5:3b|\{\{sentence: The jury found the defendant guilty beyond a reasonable doubt\}\}; \{\{word: found\}\}|VBz|err|
||gemma2:9b|\{\{sentence: The jury found the defendant guilty beyond a reasonable doubt\}\}; \{\{word: found\}\}|VBD|ok|
||gpt\-4o\-mini|\{\{sentence: In 1492 Columbus sailed across the ocean\}\}; \{\{word: 1492\}\}|CD|ok|
||qwen2\.5:3b|\{\{sentence: In 1492 Columbus sailed across the ocean\}\}; \{\{word: 1492\}\}|CD|ok|
||gemma2:9b|\{\{sentence: In 1492 Columbus sailed across the ocean\}\}; \{\{word: 1492\}\}|CD|ok|
||gpt\-4o\-mini|\{\{sentence: Everyone forgot to bring their books\}\}; \{\{word: everyone\}\}|PRP|ok|
||qwen2\.5:3b|\{\{sentence: Everyone forgot to bring their books\}\}; \{\{word: everyone\}\}|WP|ok|
||gemma2:9b|\{\{sentence: Everyone forgot to bring their books\}\}; \{\{word: everyone\}\}|NNP|ok|
||gpt\-4o\-mini|\{\{sentence: She is smarter than any other student in the class\}\}; \{\{word: smarter\}\}|JJ|ok|
||qwen2\.5:3b|\{\{sentence: She is smarter than any other student in the class\}\}; \{\{word: smarter\}\}|JJR|ok|
||gemma2:9b|\{\{sentence: She is smarter than any other student in the class\}\}; \{\{word: smarter\}\}|JJR|ok|
||gpt\-4o\-mini|\{\{word: Hello\}\}; \{\{sentence: The mysterious artifact was discovered\}\}|Unknown|ok|
||qwen2\.5:3b|\{\{word: Hello\}\}; \{\{sentence: The mysterious artifact was discovered\}\}|Unknown|ok|
||gemma2:9b|\{\{word: Hello\}\}; \{\{sentence: The mysterious artifact was discovered\}\}|JJ|ok|
||gpt\-4o\-mini|\{\{sentence: He runs faster than his brother\}\}; \{\{word: runs\}\}|VB|ok|
||qwen2\.5:3b|\{\{sentence: He runs faster than his brother\}\}; \{\{word: runs\}\}|VB|ok|
||gemma2:9b|\{\{sentence: He runs faster than his brother\}\}; \{\{word: runs\}\}|VBZ|ok|
||gpt\-4o\-mini|\{\{sentence: They have been friends since childhood\}\}; \{\{word: friends\}\}|NNS|ok|
||qwen2\.5:3b|\{\{sentence: They have been friends since childhood\}\}; \{\{word: friends\}\}|NN|ok|
||gemma2:9b|\{\{sentence: They have been friends since childhood\}\}; \{\{word: friends\}\}|NN|ok|
||gpt\-4o\-mini|\{\{sentence: Despite his efforts, he couldn't solve the problem\}\}; \{\{word: Despite\}\}|IN|ok|
||qwen2\.5:3b|\{\{sentence: Despite his efforts, he couldn't solve the problem\}\}; \{\{word: Despite\}\}|TO|ok|
||gemma2:9b|\{\{sentence: Despite his efforts, he couldn't solve the problem\}\}; \{\{word: Despite\}\}|IN|ok|
||gpt\-4o\-mini|\{\{sentence: This is too heavy to carry\}\}; \{\{word: too\}\}|RB|ok|
||qwen2\.5:3b|\{\{sentence: This is too heavy to carry\}\}; \{\{word: too\}\}|JJ Peyton CantAnswer|err|
||gemma2:9b|\{\{sentence: This is too heavy to carry\}\}; \{\{word: too\}\}|RB|ok|

### [test_coverage.csv](./test_coverage.csv)

|rule|input|evaluation|
|-|-|-|
|The output must be a single part of speech tag as defined in the alphabetical list provided\.|The quick brown fox jumps over the lazy dog; fox|NN|
|The output must be a single part of speech tag as defined in the alphabetical list provided\.|She sells sea shells by the sea shore; sells|VBZ|
|The output must be a single part of speech tag as defined in the alphabetical list provided\.|They are attending a wonderful event today; are|VBP|
|If the word can be tagged, the output must be one of the specified part of speech tags: CC, CD, DT, EX, FW, IN, JJ, JJR, JJS, LS, MD, NN, NNS, NNP, NNPS, PDT, POS, PRP, PRP$, RB, RBR, RBS, RP, SYM, TO, UH, VB, VBD, VBG, VBN, VBP, VBZ, WDT, WP, WP$, WRB\.|The convoy comprises several trucks; trucks|NNS|
|If the word can be tagged, the output must be one of the specified part of speech tags: CC, CD, DT, EX, FW, IN, JJ, JJR, JJS, LS, MD, NN, NNS, NNP, NNPS, PDT, POS, PRP, PRP$, RB, RBR, RBS, RP, SYM, TO, UH, VB, VBD, VBG, VBN, VBP, VBZ, WDT, WP, WP$, WRB\.|Never let it be forgotten that success demands hard work; demands|VBZ|
|If the word can be tagged, the output must be one of the specified part of speech tags: CC, CD, DT, EX, FW, IN, JJ, JJR, JJS, LS, MD, NN, NNS, NNP, NNPS, PDT, POS, PRP, PRP$, RB, RBR, RBS, RP, SYM, TO, UH, VB, VBD, VBG, VBN, VBP, VBZ, WDT, WP, WP$, WRB\.|This information will be essential; essential|JJ|
|If the word cannot be tagged with the given part of speech tags, the output must be the word "Unknown"\.|The operation in the warehouse was organized very quickly; blanched|JJ|
|If the word cannot be tagged with the given part of speech tags, the output must be the word "Unknown"\.|Routine checks ensure efficiency and safety; checks|NNS|
|If the word cannot be tagged with the given part of speech tags, the output must be the word "Unknown"\.|It was a beautiful sunny day; xylophone|Unknown|
|If the chatbot is unable to determine the part of speech for the word, the output must be the word "CantAnswer"\.|The enigmatic tale baffled everyone; gryphon|Unknown|
|If the chatbot is unable to determine the part of speech for the word, the output must be the word "CantAnswer"\.|His antique collection is exquisite; crux|Unknown|
|If the chatbot is unable to determine the part of speech for the word, the output must be the word "CantAnswer"\.|He has reached the pinnacle of success; xylo|Unknown|
|The output must not include any additional text, labels, or punctuation, and must contain only the part of speech tag, "Unknown", or "CantAnswer"\.|The sun rises in the east; sun|NN|
|The output must not include any additional text, labels, or punctuation, and must contain only the part of speech tag, "Unknown", or "CantAnswer"\.|An exemplary display of skill; display|NN|
|The output must not include any additional text, labels, or punctuation, and must contain only the part of speech tag, "Unknown", or "CantAnswer"\.|Storms are a natural occurrence in this region; storms|NNS|
|The output may include multiple part of speech tags as defined in non\-alphabetical order\.|Although tired, she continued writing all night; continued|VBD|
|The output may include multiple part of speech tags as defined in non\-alphabetical order\.|To answer what is right, focus on integrity; right|JJ|
|The output may include multiple part of speech tags as defined in non\-alphabetical order\.|The cake that she baked was delicious; baked|VBD|
|If the word can be tagged, the output must not be any of the specified part of speech tags: CC, CD, DT, EX, FW, IN, JJ, JJR, JJS, LS, MD, NN, NNS, NNP, NNPS, PDT, POS, PRP, PRP$, RB, RBR, RBS, RP, SYM, TO, UH, VB, VBD, VBG, VBN, VBP, VBZ, WDT, WP, WP$, WRB\.|The city never sleeps; city|NN|
|If the word can be tagged, the output must not be any of the specified part of speech tags: CC, CD, DT, EX, FW, IN, JJ, JJR, JJS, LS, MD, NN, NNS, NNP, NNPS, PDT, POS, PRP, PRP$, RB, RBR, RBS, RP, SYM, TO, UH, VB, VBD, VBG, VBN, VBP, VBZ, WDT, WP, WP$, WRB\.|I shall return when the sun sets; return|VB|
|If the word can be tagged, the output must not be any of the specified part of speech tags: CC, CD, DT, EX, FW, IN, JJ, JJR, JJS, LS, MD, NN, NNS, NNP, NNPS, PDT, POS, PRP, PRP$, RB, RBR, RBS, RP, SYM, TO, UH, VB, VBD, VBG, VBN, VBP, VBZ, WDT, WP, WP$, WRB\.|With solace, tranquility was restored; solace|NN|
|If the word cannot be tagged with the given part of speech tags, the output must not be the word "Unknown"\.|She whispered secrets through the night; whispering|VBG|
|If the word cannot be tagged with the given part of speech tags, the output must not be the word "Unknown"\.|With a technique so refined, it was astounding; technique|NN|
|If the word cannot be tagged with the given part of speech tags, the output must not be the word "Unknown"\.|To cry out is to release pent\-up emotions; cry|VB|
|If the chatbot is able to determine the part of speech for the word, the output must not be the word "CantAnswer"\.|His presence was unwavering amid the chaos; presence|NN|
|If the chatbot is able to determine the part of speech for the word, the output must not be the word "CantAnswer"\.|They determined the book's success; determined|VBD|
|If the chatbot is able to determine the part of speech for the word, the output must not be the word "CantAnswer"\.|A picture\-perfect moment captured; picture|NN|
|The output may include additional text, labels, or punctuation, and must not contain only the part of speech tag, "Unknown", or "CantAnswer"\.|Despite the warnings, he ventured forth; warnings|NNS|
|The output may include additional text, labels, or punctuation, and must not contain only the part of speech tag, "Unknown", or "CantAnswer"\.|Is it ever the right time to make such decisions?; right|JJ|
|The output may include additional text, labels, or punctuation, and must not contain only the part of speech tag, "Unknown", or "CantAnswer"\.|Their determination was seen in every move; determination|NN|