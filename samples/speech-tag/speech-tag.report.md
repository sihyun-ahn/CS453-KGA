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


### [inverse_rules.txt](./speech-tag.inverse_rules.txt)

`````txt
The output can contain multiple parts of speech tags from outside the provided list.
The output may include additional information aside from the part of speech tag.
If the word cannot be tagged with one of the provided tags, the output must be something other than "Unknown".
If the word cannot be tagged and the reason is unclear, the output should not be "CantAnswer".
The part of speech tag can be in lowercase letters or differently formatted.
The output can include multiple tags or explanatory text.
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

### [test_evals.csv](./speech-tag.test_evals.csv)

|id|model|rule|input|evaluation|
|-|-|-|-|-|
|6b915e8|gpt\-4o\-2024\-08\-06|The output must only contain the part of speech tag and nothing else\.|The quick brown fox jumps over the lazy dog;fox|Output:<br>noun|
|0b47eb2|gpt\-4o\-2024\-08\-06|The output must only contain the part of speech tag and nothing else\.|She swiftly ran towards the finish line;swiftly|Output:<br>swiftly: RB \(adverb\)|
|9296662|gpt\-4o\-2024\-08\-06|The output must only contain the part of speech tag and nothing else\.|Every cloud has a silver lining;Every|In the sentence, the word "Every" is a determiner \(DET\)\.|
|d964585|gpt\-4o\-2024\-08\-06|If the word cannot be tagged with one of the provided tags, the output must be "Unknown"\.|Anna and Mike went to the store;and|The word "and" in the sentence is a conjunction\.|
|766cf78|gpt\-4o\-2024\-08\-06|If the word cannot be tagged with one of the provided tags, the output must be "Unknown"\.|Quickly finish your homework;Quickly|Part of Speech: Adverb \(RB\)|
|a22ce25|gpt\-4o\-2024\-08\-06|If the word cannot be tagged and the reason is unclear, the output must be "CantAnswer"\.|Her paintings were in vivid colors;vivid|Adjective|
|e08d46a|gpt\-4o\-2024\-08\-06|If the word cannot be tagged and the reason is unclear, the output must be "CantAnswer"\.|Xyzzy is not a real word;Xyzzy|In the sentence "Xyzzy is not a real word," the word "Xyzzy" functions as a noun\. <br><br>Tag: Noun|
|27c3f4e|gpt\-4o\-2024\-08\-06|The part of speech tag must be in uppercase letters as listed\.|Blorft is the best word ever;Blorft|Tag: Noun|
|7f3a7ca|gpt\-4o\-2024\-08\-06|The part of speech tag must be in uppercase letters as listed\.|The cat sat on the mat;mat|Noun|
|8c2f4b9|gpt\-4o\-2024\-08\-06|The part of speech tag must be in uppercase letters as listed\.|She can dance very well;can|Tag: Modal Verb \(MD\)|
|f43530d|gpt\-4o\-2024\-08\-06|If the word cannot be tagged and the reason is unclear, the output must be "CantAnswer"\.|He felt a sense of deja vu;deja|In the sentence "He felt a sense of deja vu," the word "deja" is part of the phrase "deja vu," which is a noun\. <br><br>Tag: Noun|
|62d03d0|gpt\-4o\-2024\-08\-06|If the word cannot be tagged with one of the provided tags, the output must be "Unknown"\.|I will go to the park later;will|Modal Verb \(MD\)|
|070861d|gpt\-4o\-2024\-08\-06|The output must not include multiple tags or any explanatory text\.|An apple a day keeps the doctor away;An|Determiner \(DT\)|
|fea041d|gpt\-4o\-2024\-08\-06|The output must not include multiple tags or any explanatory text\.|He looked at the beautiful sunset;beautiful|Adjective|
|4b603f5|gpt\-4o\-2024\-08\-06|The output can contain multiple parts of speech tags from outside the provided list\.|She sang a song;She|Output:<br>PRP \(Pronoun\)|
|8191efc|gpt\-4o\-2024\-08\-06|The output can contain multiple parts of speech tags from outside the provided list\.|They were walking in the park;in|Preposition|
|5d1ff70|gpt\-4o\-2024\-08\-06|The output must not include multiple tags or any explanatory text\.|Tomorrow will be a brighter day;Tomorrow|Proper Noun \(NNP\)|
|a833b52|gpt\-4o\-2024\-08\-06|The output can contain multiple parts of speech tags from outside the provided list\.|Eat, sleep, repeat;repeat|In the given input "Eat, sleep, repeat; repeat," the word "repeat" functions as a verb\.|

### [test_results.csv](./speech-tag.test_results.csv)

|id|model|input|output|
|-|-|-|-|
|6b915e8|phi3\.5|The quick brown fox jumps over the lazy dog;fox|NNPS \(Proper noun, plural\)|
|0b47eb2|phi3\.5|She swiftly ran towards the finish line;swiftly|RB \(Adverb\)|
|9296662|phi3\.5|Every cloud has a silver lining;Every|CD \(Cardinal number\) in the phrase "Every" as it indicates quantity\. However, since there is no clear indication of context or further words to assess grammatical function accurately within this isolated snippet, if ambiguity arises due to lack of information surrounding usage and role herein, return CantAnswer\.<br><br>Here: DT \(Determiner\) because "Every" functions as a determiner specifying each cloud in the general sense being discussed\. It denotes totality or completeness without exclusion before nouns such as 'cloud\.' <br><br>\(Note that this answer assumes basic understanding of English determiners' role and might not account for all nuanced grammatical situations\.\)|
|62d03d0|phi3\.5|I will go to the park later;will|MD \(Modal\)|
|d964585|phi3\.5|Anna and Mike went to the store;and|CC \(Coordinating conjunction\)|
|766cf78|phi3\.5|Quickly finish your homework;Quickly|RB \(Adverb\)|
|e08d46a|phi3\.5|Xyzzy is not a real word;Xyzzy|Unknown \(Since "Xyzzy" does not match any listed part of speech and cannot be reasonably tagged\)|
|a22ce25|phi3\.5|Her paintings were in vivid colors;vivid|JJ \(Adjective\)|
|f43530d|phi3\.5|He felt a sense of deja vu;deja|IDF \(Adverb\) \- Since "deja" is an adverb here describing the feeling experienced by 'he', it's tagged as IDF\. However, I must note that there isn't specific part\-of\-speech code for this exact form of de ja vu in your provided list\. So based on available tags and typical usage, we conclude with "IDF"\. In a more comprehensive analysis toolset though, you might find distinctly accurate tagging elsewhere such as RB \(Adverb\)\. This emphasizes the importance to always refer back to tools or resources that best represent actual linguistic standards for context\-specific parts of speech\.|
|27c3f4e|phi3\.5|Blorft is the best word ever;Blorft|WRB \(Adverb\)|
|7f3a7ca|phi3\.5|The cat sat on the mat;mat|DT \(Determiner\)|
|8c2f4b9|phi3\.5|She can dance very well;can|VBD \(Verb, past tense\)|
|070861d|phi3\.5|An apple a day keeps the doctor away;An|CD \(Cardinal number\) \- The "1" in "an apple", indicating quantity\. However, since it's part of an idiomatic expression and not directly referenced as having any specific grammatical function other than counting apples, this can also be argued to serve more generally the role of a determiner or article here \(DT\), depending on interpretation context within language analysis frameworks\.|
|5d1ff70|phi3\.5|Tomorrow will be a brighter day;Tomorrow|TO \(to\)|
|fea041d|phi3\.5|He looked at the beautiful sunset;beautiful|JJ \(Adjective\)|
|a833b52|phi3\.5|Eat, sleep, repeat;repeat|VB|
|4b603f5|phi3\.5|She sang a song;She|PRP \(Personal pronoun\)|
|8191efc|phi3\.5|They were walking in the park;in|BEZ: Verb, present participle \(VBG\) or past participle \(VBN\), depending on context\. Here without additional context it's ambiguous so I would default to VBG assuming an action happening at this moment \("were walking"\)\. However, if the sentence is referring to a completed action in the past, then BB: Past tense should be used instead \(\`were walked\`\)\. Given no further information though and following standard practice due to potential present context reference, let's go with VBG\.<br><br>Please note that without additional sentences or broader text for clearer temporal understanding it’s difficult to assign a definitive tag — real\-world usage might slightly vary based on nuance in spoken English versus written forms which could change the interpretation from an event happening now \(present participle\) vs one already completed at this point of speech/writing reference timeframe\.<br><br>But for safety and sticking strictly with explicit instructions, I am providing two possibilities accounted by context sensitivity: <br>\- VBG if they are currently walking in present continuous tense usage during the narrative; or<br>\- BB \(Past Tense\) assuming this refers to completed past action at a specific moment when described\. Given typical English syntax and without additional text, I’m leaning towards current activity reference as it's common: VBG|
|6b915e8|qwen2\.5\-coder:latest|The quick brown fox jumps over the lazy dog;fox|NN|
|0b47eb2|qwen2\.5\-coder:latest|She swiftly ran towards the finish line;swiftly|RB|
|9296662|qwen2\.5\-coder:latest|Every cloud has a silver lining;Every|Unknown|
|62d03d0|qwen2\.5\-coder:latest|I will go to the park later;will|VBP|
|d964585|qwen2\.5\-coder:latest|Anna and Mike went to the store;and|CC|
|766cf78|qwen2\.5\-coder:latest|Quickly finish your homework;Quickly|RB|
|e08d46a|qwen2\.5\-coder:latest|Xyzzy is not a real word;Xyzzy|Unknown|
|a22ce25|qwen2\.5\-coder:latest|Her paintings were in vivid colors;vivid|JJ|
|f43530d|qwen2\.5\-coder:latest|He felt a sense of deja vu;deja|NN|
|27c3f4e|qwen2\.5\-coder:latest|Blorft is the best word ever;Blorft|NNP|
|7f3a7ca|qwen2\.5\-coder:latest|The cat sat on the mat;mat|NN|
|8c2f4b9|qwen2\.5\-coder:latest|She can dance very well;can|VBG|
|070861d|qwen2\.5\-coder:latest|An apple a day keeps the doctor away;An|Unknown|
|5d1ff70|qwen2\.5\-coder:latest|Tomorrow will be a brighter day;Tomorrow|VBG|
|fea041d|qwen2\.5\-coder:latest|He looked at the beautiful sunset;beautiful|JJ|
|a833b52|qwen2\.5\-coder:latest|Eat, sleep, repeat;repeat|VBZ|
|4b603f5|qwen2\.5\-coder:latest|She sang a song;She|VBG|
|8191efc|qwen2\.5\-coder:latest|They were walking in the park;in|Unknown|
|6b915e8|llama3\.2:3b|The quick brown fox jumps over the lazy dog;fox|JJ|
|0b47eb2|llama3\.2:3b|She swiftly ran towards the finish line;swiftly|RBR|
|9296662|llama3\.2:3b|Every cloud has a silver lining;Every|RP|
|62d03d0|llama3\.2:3b|I will go to the park later;will|WRB|
|d964585|llama3\.2:3b|Anna and Mike went to the store;and|CC|
|766cf78|llama3\.2:3b|Quickly finish your homework;Quickly|RB|
|e08d46a|llama3\.2:3b|Xyzzy is not a real word;Xyzzy|FW|
|a22ce25|llama3\.2:3b|Her paintings were in vivid colors;vivid|VB|
|f43530d|llama3\.2:3b|He felt a sense of deja vu;deja|Unknown|
|27c3f4e|llama3\.2:3b|Blorft is the best word ever;Blorft|Unknown|
|7f3a7ca|llama3\.2:3b|The cat sat on the mat;mat|Unknown|
|8c2f4b9|llama3\.2:3b|She can dance very well;can|NNP|
|070861d|llama3\.2:3b|An apple a day keeps the doctor away;An|CC|
|5d1ff70|llama3\.2:3b|Tomorrow will be a brighter day;Tomorrow|Tomorrow|
|fea041d|llama3\.2:3b|He looked at the beautiful sunset;beautiful|JJ|
|a833b52|llama3\.2:3b|Eat, sleep, repeat;repeat|JJR|
|4b603f5|llama3\.2:3b|She sang a song;She|Unknown|
|8191efc|llama3\.2:3b|They were walking in the park;in|CC|