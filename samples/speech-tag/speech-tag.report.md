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
Determine the part of speech for a given word in a sentence and return its tag.
`````


### [input_spec.txt](./speech-tag.input_spec.txt)

`````txt
The input must be a sentence followed by a semicolon and a word.  
The sentence can contain any valid sequence of words in a natural language format.  
The word must be a single, valid word contained within the sentence.  
The sentence and word must be separated by a semicolon without any additional characters or spaces.
`````


### [rules.txt](./speech-tag.rules.txt)

`````txt
The output must be a single part of speech tag from the provided list.
The output must only contain the part of speech tag and nothing else.
If the word cannot be tagged with one of the provided tags, the output must be "Unknown".
If the word cannot be tagged and the reason is unclear, the output must be "CantAnswer".
The part of speech tag must be in uppercase letters as listed.
The output must not include multiple tags or any explanatory text.
`````


### [baseline_tests.txt](./speech-tag.baseline_tests.txt)

`````txt
sentence: "The quick brown fox jumps over the lazy dog." ; word: "fox"
===
sentence: "She sells sea shells by the sea shore." ; word: "sells"
===
sentence: "He will finish the project tomorrow." ; word: "will"
===
sentence: "An apple a day keeps the doctor away." ; word: "apple"
===
sentence: "There are many solutions to the problem." ; word: "There"
===
sentence: "I can hear the music clearly." ; word: "clearly"
===
sentence: "This is the biggest challenge I've faced." ; word: "biggest"
===
sentence: "If it rains, we will cancel the trip." ; word: "rains"
===
sentence: "She quickly ran to the store." ; word: "quickly"
===
sentence: "Despite the warnings, he went ahead." ; word: "Despite"
===
sentence: "Look at those beautiful flowers." ; word: "flowers"
===
sentence: "John likes to read books." ; word: "John"
===
sentence: "Wow, that's an amazing view!" ; word: "Wow"
===
sentence: "The committee approved the proposal unanimously." ; word: "committee"
===
sentence: "She wondered why he left so early." ; word: "why"
===
sentence: "Everyone except Tom was present." ; word: "except"
===
sentence: "He has a unique perspective on the issue." ; word: "unique"
===
sentence: "They found three missing keys." ; word: "three"
`````


### [tests.csv](./speech-tag.tests.csv)

|Rule ID|Test ID|Test Input|Expected Output|Reasoning|
|-|-|-|-|-|
|1|1|The quick brown fox jumps over the lazy dog;fox|NN|Tests noun identification using a classic sentence\. Valid input as per specification\.|
|1|2|She swiftly ran towards the finish line;swiftly|RB|Tests adverb identification\. The word is clearly an adverb, ensuring adherence to part of speech tagging rules\.|
|1|3|Every cloud has a silver lining;Every|DT|Tests determiner identification\. Valid sentence and word separation with expected determiner tag\.|
|2|1|I will go to the park later;will|MD|Tests for modal verb identification, confirming expected output format compliance\.|
|2|2|Anna and Mike went to the store;and|CC|Tests coordinating conjunction identification, checking the concise output requirement\.|
|2|3|Quickly finish your homework;Quickly|RB|Tests adverb identification with a straightforward adverb, ensuring correct tag\.|
|3|1|Xyzzy is not a real word;Xyzzy|Unknown|Tests handling of nonsensical word, expecting 'Unknown'\. Valid input format\.|
|3|2|Her paintings were in vivid colors;vivid|JJ|Tests adjective recognition, ensuring 'Unknown' is correctly not triggered\.|
|3|3|He felt a sense of deja vu;deja|FW|Tests foreign word recognition, ensuring correct tagging of foreign words\.|
|4|1|Blorft is the best word ever;Blorft|CantAnswer|Tests unclear tagging situation with a made\-up word, expecting 'CantAnswer'\.|
|4|2|The cat sat on the mat;mat|NN|Tests clear noun identification, ensuring 'CantAnswer' is not triggered incorrectly\.|
|4|3|She can dance very well;can|MD|Tests tagging of modal verb, ensuring clear cases are tagged correctly without 'CantAnswer'\.|
|5|1|An apple a day keeps the doctor away;An|DT|Tests determiner recognition, ensuring uppercase tag output\.|
|5|2|Tomorrow will be a brighter day;Tomorrow|NN|Tests correct noun tagging with uppercase output\.|
|5|3|He looked at the beautiful sunset;beautiful|JJ|Tests adjective tag adherence to capitalization rule\.|
|6|1|Eat, sleep, repeat;repeat|VB|Tests verb identification, ensuring no additional text accompanies the tag\.|
|6|2|She sang a song;She|PRP|Tests pronoun identification, confirming singular tag output\.|
|6|3|They were walking in the park;in|IN|Tests preposition identification in a clear context, ensuring correct tag without extra text\.|