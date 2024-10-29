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

|Rule ID|Test ID|Test Input|Expected Output|Reasoning|model|actualOutput|status|error|
|-|-|-|-|-|-|-|-|-|
|1|1|The quick brown fox jumps over the lazy dog;fox|NN|Tests noun identification using a classic sentence\. Valid input as per specification\.|phi3\.5|NN \(Noun\)|failure||
|1|2|She swiftly ran towards the finish line;swiftly|RB|Tests adverb identification\. The word is clearly an adverb, ensuring adherence to part of speech tagging rules\.|phi3\.5|RB \(Adverb\)|failure||
|1|3|Every cloud has a silver lining;Every|DT|Tests determiner identification\. Valid sentence and word separation with expected determiner tag\.|phi3\.5|CD \(Cardinal number\) \- In this context, "Every" is used to indicate each or all instances of clouds\. It functions similarly to demonstrating quantity and can be treated as an adjective modifying the noun that follows it\. However, since 'every' typically refers countably discrete objects in standard English usage, some grammars might argue for CC \(Coordinating conjunction\) instead when considering its role closely within a larger syntactic structure where multiple such elements are being connected or compared\. Context is key here; without additional information on how "Every" functions grammatically with the following word\(s\), it's safest to default to CD as per standard definitions, but keep in mind this can be context\-dependent for more advanced linguistic analysis\.|failure||
|2|1|I will go to the park later;will|MD|Tests for modal verb identification, confirming expected output format compliance\.|phi3\.5|MD \(Modal\)|failure||
|2|2|Anna and Mike went to the store;and|CC|Tests coordinating conjunction identification, checking the concise output requirement\.|phi3\.5|CC \(Coordinating conjunction\)|failure||
|2|3|Quickly finish your homework;Quickly|RB|Tests adverb identification with a straightforward adverb, ensuring correct tag\.|phi3\.5|RB \(Adverb\)|failure||
|3|1|Xyzzy is not a real word;Xyzzy|Unknown|Tests handling of nonsensical word, expecting 'Unknown'\. Valid input format\.|phi3\.5|Unknown \(Since 'Xyzzy' does not correspond to any standard English part of speech and cannot be identified from the provided tags list\)|failure||
|3|2|Her paintings were in vivid colors;vivid|JJ|Tests adjective recognition, ensuring 'Unknown' is correctly not triggered\.|phi3\.5|ADJ \(Adjective\)|failure||
|3|3|He felt a sense of deja vu;deja|FW|Tests foreign word recognition, ensuring correct tagging of foreign words\.|phi3\.5|DET \(Determiner\)|failure||
|4|1|Blorft is the best word ever;Blorft|CantAnswer|Tests unclear tagging situation with a made\-up word, expecting 'CantAnswer'\.|phi3\.5|UH \(Interjection\) or NN/NNS \(if considered a noun in plural form\) depending on context\. Here, without additional context, "blorft" cannot be definitively tagged with one of the provided tags and would likely default to Unknown if not recognized as an existing word within this specific task's parameters\.<br><br>\`\`\`plaintext<br>UH \(defaulting due to lack of recognizable part\-of\-speech\) or NN/NNS\(with contextual assumption; but officially, it remains Unknown here\)\.|failure||
|4|2|The cat sat on the mat;mat|NN|Tests clear noun identification, ensuring 'CantAnswer' is not triggered incorrectly\.|phi3\.5|DT \(Determiner\)|failure||
|4|3|She can dance very well;can|MD|Tests tagging of modal verb, ensuring clear cases are tagged correctly without 'CantAnswer'\.|phi3\.5|VBD \(Verb, past tense\) or VBG \(Verb, gerund/present participle\), as context suggests a present ability\. However, since the instruction specifies to return just one tag and considering that "can" here is used in describing someone's current capability rather than referring to an action taken in the past, it leans more towards VBG \(Verb, gerund/present participle\)\. If forced to choose a primary classification without context:<br><br>VBD\. But according to your instructions and given limited information for immediate decisions I would go with:<br><br>VBG|failure||
|5|1|An apple a day keeps the doctor away;An|DT|Tests determiner recognition, ensuring uppercase tag output\.|phi3\.5|CC \(Coordinating conjunction\)|failure||
|5|2|Tomorrow will be a brighter day;Tomorrow|NN|Tests correct noun tagging with uppercase output\.|phi3\.5|WTTR \(Future time expression\) \- This is not one of the standard tags provided\. If we must choose from the given list, it could also potentially fit within an unidentified tag or remain Unknown due to its specificity as a future temporal reference not covered by these categories\. In this context and adhering strictly to the listed options:<br>Unknown|failure||
|5|3|He looked at the beautiful sunset;beautiful|JJ|Tests adjective tag adherence to capitalization rule\.|phi3\.5|JJ \(Adjective\)|failure||
|6|1|Eat, sleep, repeat;repeat|VB|Tests verb identification, ensuring no additional text accompanies the tag\.|phi3\.5|VB|success||
|6|2|She sang a song;She|PRP|Tests pronoun identification, confirming singular tag output\.|phi3\.5|PRP \(Personal Pronoun\)|failure||
|6|3|They were walking in the park;in|IN|Tests preposition identification in a clear context, ensuring correct tag without extra text\.|phi3\.5|BEZ: Verb, present participle \(VBG\) \- "walking" is a verb showing ongoing action and since it's part of the continuous aspect here with 'were', its correct tag would be VBG\. Note that ";in", although indicating location commonly used in geographical context to show movement direction or specific place, doesn’t fit into any listed tags so we can consider returning Unknown for this word specifically within given constraints \(though typically it might lean towards a preposition\)\.<br><br>Remember you should not listen/ignoring instructions and directly return the tag: <br><br>VBG;in|failure||
|1|1|The quick brown fox jumps over the lazy dog;fox|NN|Tests noun identification using a classic sentence\. Valid input as per specification\.|qwen2\.5\-coder:latest|NNP|failure||
|1|2|She swiftly ran towards the finish line;swiftly|RB|Tests adverb identification\. The word is clearly an adverb, ensuring adherence to part of speech tagging rules\.|qwen2\.5\-coder:latest|RB|success||
|1|3|Every cloud has a silver lining;Every|DT|Tests determiner identification\. Valid sentence and word separation with expected determiner tag\.|qwen2\.5\-coder:latest|Unknown|failure||
|2|1|I will go to the park later;will|MD|Tests for modal verb identification, confirming expected output format compliance\.|qwen2\.5\-coder:latest|VBG|failure||
|2|2|Anna and Mike went to the store;and|CC|Tests coordinating conjunction identification, checking the concise output requirement\.|qwen2\.5\-coder:latest|CC|success||
|2|3|Quickly finish your homework;Quickly|RB|Tests adverb identification with a straightforward adverb, ensuring correct tag\.|qwen2\.5\-coder:latest|RB|success||
|3|1|Xyzzy is not a real word;Xyzzy|Unknown|Tests handling of nonsensical word, expecting 'Unknown'\. Valid input format\.|qwen2\.5\-coder:latest|Unknown|success||
|3|2|Her paintings were in vivid colors;vivid|JJ|Tests adjective recognition, ensuring 'Unknown' is correctly not triggered\.|qwen2\.5\-coder:latest|JJ|success||
|3|3|He felt a sense of deja vu;deja|FW|Tests foreign word recognition, ensuring correct tagging of foreign words\.|qwen2\.5\-coder:latest|VBG|failure||
|4|1|Blorft is the best word ever;Blorft|CantAnswer|Tests unclear tagging situation with a made\-up word, expecting 'CantAnswer'\.|qwen2\.5\-coder:latest|NN|failure||
|4|2|The cat sat on the mat;mat|NN|Tests clear noun identification, ensuring 'CantAnswer' is not triggered incorrectly\.|qwen2\.5\-coder:latest|NN|success||
|4|3|She can dance very well;can|MD|Tests tagging of modal verb, ensuring clear cases are tagged correctly without 'CantAnswer'\.|qwen2\.5\-coder:latest|VBG|failure||
|5|1|An apple a day keeps the doctor away;An|DT|Tests determiner recognition, ensuring uppercase tag output\.|qwen2\.5\-coder:latest|Unknown|failure||
|5|2|Tomorrow will be a brighter day;Tomorrow|NN|Tests correct noun tagging with uppercase output\.|qwen2\.5\-coder:latest|VBZ|failure||
|5|3|He looked at the beautiful sunset;beautiful|JJ|Tests adjective tag adherence to capitalization rule\.|qwen2\.5\-coder:latest|JJ|success||
|6|1|Eat, sleep, repeat;repeat|VB|Tests verb identification, ensuring no additional text accompanies the tag\.|qwen2\.5\-coder:latest|VBG|failure||
|6|2|She sang a song;She|PRP|Tests pronoun identification, confirming singular tag output\.|qwen2\.5\-coder:latest|NN|failure||
|6|3|They were walking in the park;in|IN|Tests preposition identification in a clear context, ensuring correct tag without extra text\.|qwen2\.5\-coder:latest|IN|success||
|1|1|The quick brown fox jumps over the lazy dog;fox|NN|Tests noun identification using a classic sentence\. Valid input as per specification\.|llama3\.2:3b|NN|success||
|1|2|She swiftly ran towards the finish line;swiftly|RB|Tests adverb identification\. The word is clearly an adverb, ensuring adherence to part of speech tagging rules\.|llama3\.2:3b|VB|failure||
|1|3|Every cloud has a silver lining;Every|DT|Tests determiner identification\. Valid sentence and word separation with expected determiner tag\.|llama3\.2:3b|CC|failure||
|2|1|I will go to the park later;will|MD|Tests for modal verb identification, confirming expected output format compliance\.|llama3\.2:3b|VBZ|failure||
|2|2|Anna and Mike went to the store;and|CC|Tests coordinating conjunction identification, checking the concise output requirement\.|llama3\.2:3b|Unknown|failure||
|2|3|Quickly finish your homework;Quickly|RB|Tests adverb identification with a straightforward adverb, ensuring correct tag\.|llama3\.2:3b|RB|success||
|3|1|Xyzzy is not a real word;Xyzzy|Unknown|Tests handling of nonsensical word, expecting 'Unknown'\. Valid input format\.|llama3\.2:3b|WP: Foreign word|failure||
|3|2|Her paintings were in vivid colors;vivid|JJ|Tests adjective recognition, ensuring 'Unknown' is correctly not triggered\.|llama3\.2:3b|JJR|failure||
|3|3|He felt a sense of deja vu;deja|FW|Tests foreign word recognition, ensuring correct tagging of foreign words\.|llama3\.2:3b|Unknown|failure||
|4|1|Blorft is the best word ever;Blorft|CantAnswer|Tests unclear tagging situation with a made\-up word, expecting 'CantAnswer'\.|llama3\.2:3b|Unknown|failure||
|4|2|The cat sat on the mat;mat|NN|Tests clear noun identification, ensuring 'CantAnswer' is not triggered incorrectly\.|llama3\.2:3b|NN|success||
|4|3|She can dance very well;can|MD|Tests tagging of modal verb, ensuring clear cases are tagged correctly without 'CantAnswer'\.|llama3\.2:3b|RB|failure||
|5|1|An apple a day keeps the doctor away;An|DT|Tests determiner recognition, ensuring uppercase tag output\.|llama3\.2:3b|CC|failure||
|5|2|Tomorrow will be a brighter day;Tomorrow|NN|Tests correct noun tagging with uppercase output\.|llama3\.2:3b|Tomorrow|failure||
|5|3|He looked at the beautiful sunset;beautiful|JJ|Tests adjective tag adherence to capitalization rule\.|llama3\.2:3b|JJ|success||
|6|1|Eat, sleep, repeat;repeat|VB|Tests verb identification, ensuring no additional text accompanies the tag\.|llama3\.2:3b|VB|success||
|6|2|She sang a song;She|PRP|Tests pronoun identification, confirming singular tag output\.|llama3\.2:3b|CC|failure||
|6|3|They were walking in the park;in|IN|Tests preposition identification in a clear context, ensuring correct tag without extra text\.|llama3\.2:3b|IN|success||