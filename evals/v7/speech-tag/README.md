## speech-tag ([json](./evals\v7\speech-tag/report.json))

- 7 rules
- 7 inverse rules
- 84 tests, 42 baseline tests

### Overview

<details><summary>Glossary</summary>
- Prompt Under Test (PUT) - like Program Under Test; the prompt
- Model Under Test (MUT) - Model which we are testing against with specific temperature, etc example: gpt-4o-mini
- Model Used by PromptPex (MPP) - gpt-4o

- Input Specification (IS) - Extracting input constraints of PUT using MPP
- Output Rules (OR) - Extracting output constraints of PUT using MPP
- Output Rules Groundedness (ORG) - Checks if OR is grounded in PUT using MPP

- Prompt Under Test Intent (PUTI) - Extracting the exact task from PUT using MMP

- PromptPex Tests (PPT) - Test cases generated for PUT with MPP using IS and OR
- Baseline Tests (BT) - Zero shot test cases generated for PUT with MPP

- Test Input Compliance (TIC) - Checking if PPT and BT meets the constraints in IS using MPP
- Test Coverage (TC) - Result generated for PPT and BT on PUTI + OR with MPP

- Test Output (TO) - Result generated for PPT and BT on PUT with each MUT
- Test Output Compliance (TOC) - Checking if TO meets the constraints in PUT using MPP
</details>


### [test_results.csv](./test_results.csv)



### [speech-tag.prompty](./speech-tag.prompty)

`````md
---
name: Speech Tag
description: Determine the part of speech for a given word
source: "modified from 'SAMMO: A general-purpose framework for prompt optimization'"
url: https://www.microsoft.com/en-us/research/uploads/prod/2024/04/Prompts-As-Programs_A-Structure-Aware-Approach.pdf
inputs:
    sentenceword:
        type: string
sample:
    sentenceword: "The quick brown fox jumps over the lazy dog.; jumps"
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
{{sentenceword}}
`````


### [intent.txt](./intent.txt)

`````txt
Determine the part of speech for a given word.
`````


### [input_spec.txt](./input_spec.txt)

`````txt
The input is a string that includes a sentence and one word from that sentence.  
The sentence must be a grammatically correct English sentence.  
The word must be present within the sentence provided.  
The word can be any part of speech, including noun, verb, adjective, or others.  
The word must not be an empty string.  
The sentence must not be an empty string.  
The sentence may include punctuation.   
The word must not include punctuation signs.  
There is no specified maximum length for the sentence.  
There is no specified maximum length for the word.  
`````


### [rules.txt](./rules.txt)

`````txt
1: The output must only contain a single part of speech tag from the pre-defined list in the system prompt. 
2: The output must be an exact match to one of the tags in the pre-defined list, if applicable. 
3: If the word provided in the input can be matched to one of the listed part of speech tags, return only the corresponding tag as the output, with no additional text or formatting. 
4: If the word provided in the input cannot be assigned any of the listed part of speech tags, the output should only contain the word "Unknown". 
5: If it is not possible to determine the part of speech from the input, the output should only contain the word "CantAnswer". 
6: The output must contain no additional information besides the specified part of speech tag or the exact words "Unknown" or "CantAnswer" based on the given rules. 
7: Every word in the provided input must be attempted to be tagged according to the conditions defined, and the output must reflect one of the listed scenarios appropriately.
`````


### [inverse_rules.txt](./inverse_rules.txt)

`````txt
8: The output must contain multiple parts of speech tags that are not from the pre-defined list in the system prompt. 
9: The output must not match any of the tags in the pre-defined list, where applicable. 
10: If the word provided in the input can be matched to one of the listed part of speech tags, return additional text and formatting rather than the corresponding tag. 
11: If the word provided in the input cannot be assigned any of the listed part of speech tags, the output should not contain the word "Unknown". 
12: If it is not possible to determine the part of speech from the input, the output should not contain the word "CantAnswer". 
13: The output must contain additional information besides any specific part of speech tag or words such as "Unknown" and "CantAnswer". 
14: At least one word in the provided input must be omitted from tagging according to the conditions defined, and the output must ignore some of the listed scenarios appropriately.
`````


### [tests.csv](./tests.csv)

|testinput|expectedoutput|reasoning|
|-|-|-|
|Sentence: The quick brown fox jumps over the lazy dog\. Word: fox|NN|The input word 'fox' is a noun and the expected output is the single part of speech tag 'NN', adhering to the rule that only one tag from the predefined list should be produced\.|
|Sentence: She sells seashells by the seashore\. Word: sells|VBZ|The word 'sells' functions as a verb, third person singular present, so 'VBZ' is the appropriate tag, following the rule of single tag output\.|
|Sentence: Yesterday, it rained heavily\. Word: rained|VBD|The word 'rained' is in past tense, thus 'VBD' is the expected part of speech tag, illustrating correct compliance with the rule\.|
|Sentence: The cat sat on the mat\. Word: cat|NN|The word 'cat' is a noun and must match exactly to the tag 'NN', confirming the rule of matching the predefined list exactly\.|
|Sentence: Birds fly high\. Word: fly|VB|The word 'fly' when used as a verb in base form should return the exact match 'VB', validating the rule that output should be exact\.|
|Sentence: One hundred apples fell\. Word: hundred|CD|Describes number and hence, 'CD' representing cardinal number should match exactly, confirming the rule of exact matching to predefined tags\.|
|Sentence: A large tree fell\. Word: large|JJ|Since the word 'large' functions as an adjective and is tagged as 'JJ', this should be the only output, adhering strictly to the policy of no additional text\.|
|Sentence: I usually walk home\. Word: usually|RB|The word 'usually' is an adverb tagged as 'RB', confirming compliance by having no extra text beyond the tag\.|
|Sentence: They have been healthy\. Word: have|VB|The given word 'have', matched correctly as a base form verb, should only yield 'VB', showing adherence to not including excess information\.|
|Sentence: Everything went according to the plan\. Word: according|IN|The word 'according', correctly tagged as a preposition should return 'IN' and highlight scenarios where the tag exists, without being 'Unknown'\.|
|Sentence: The session was remarkable\. Word: sessione|Unknown|Evidently 'sessione' is not recognizable in English, thereby legitimately giving 'Unknown', reinforcing non\-recognizable scenario handling\.|
|Sentence: My new routine will adapt\. Word: xyzzy|Unknown|The gibberish word 'xyzzy' fails to match any known tag thus rendering 'Unknown', showing capability of returning result for nonsense inputs\.|
|Sentence: This sentence cannot be processed\. Word: unprocesable|CantAnswer|The misspelled 'unprocesable' does not relate to expected tags, commanding 'CantAnswer' to be issued, indicating when detection fails\.|
|Sentence: A complex wordplay occurred here\. Word: qwertyuiop|CantAnswer|Given 'qwertyuiop' is not definable, the output being 'CantAnswer' underlines situations where interpretation is impossible\.|
|Sentence: Many colorful dreams arise unhindered\. Word: ljfdksjl|CantAnswer|When the word 'ljfdksjl' lacks interpretation, 'CantAnswer' rightly gets exhibited, confirming response limitation is followed\.|
|Sentence: Their experiment succeeded\. Word: succeeded|VBD|Accentuates the rule that limits output strictly to tags or conditions 'Unknown' or 'CantAnswer' only, herein verifying verb in past tense as 'VBD'\.|
|Sentence: Appreciate the colors of the wind\. Word: colors|NNS|With output solely being 'NNS', aligns with the criteria that forbids any additional non\-essential output in consequences\.|
|Sentence: She can solve the mystery alone\. Word: can|MD|The term 'can' functions as a modal verb tagged accurately as 'MD', enforcing the non\-variegated output philosophy\.|
|Sentence: He quickly understood the situation\. Word: quickly|RB|Demonstrates that appropriate tagging attempts were made with resultant 'RB' without any disregarded testing procedures\.|
|Sentence: They left yesterday\. Word: yesterday|RB|Confirms the distinct endeavor that pinpointed yesterday increasing the assurance for respective part\-of\-speech assignment without oversight\.|
|Sentence: Imagine a brighter future\. Word: Imagine|VB|Accent on 'Imagine' reflects the provision to always thoroughly try and attain a valid tag, such as the base form verb 'VB'\.|
|Sentence: The plan was executed hurrily\. Word: hurrily|Unknown|Signifies erroneous output with the invented 'hurrily', prompting reflective unauthorized tags proving negligence in using peer cues\.|
|Sentence: Welcome to zzyzx road\. Word: zzyzx|Unknown|Presents input where no pre\-defined keys are used yet 'Unknown' emerges, thus unexpectedly showing formulated response usage disallowed\.|
|Sentence: I coined murf the word\. Word: murf|Unknown|Highlights input component straying from the list yet improperly turning 'Unknown', which should strictly emerge from learned exclusions\.|
|Sentence: That is unanticipatedly concise\. Word: unanticipatedly|Unknown|Every output should result from a comprehensive list evaluation exposing absence yet fosters an alignable 'Unknown'\.|
|Sentence: Her demeanor was inaccesible\.|Unknown|Features illusion of unaffiliated token grouping, expecting yet failure underscores non\-adherence provoking distinct alignment necessity\.|
|Sentence: There are many colours in this art\.|Unknown|Bears accidental non\-match expected to crystalline alignment yet assuming deviation renders non\-standard clarity\.|
|Sentence: Mist in the valley is enchanting\. Word: enchanting|JJ enchanting|Furnishes scrutiny towards textual additions disallowed yet naively unscathed visual discovery isolating explicitness needed\.|
|Sentence: Laughter echoed through hall endlessly\. Word: endlessly|RB \- Adverb|Presents over\-encompassing deviation where despite a recognized form as 'RB', ticketed adjective 'Adverb' found needlessly\.|
|Sentence: Eagerly awaited\. Word: awaited|VBN Verb|Compounds perceivable invitation to liberate and accrete additional uncommissioned verbosity infringing governed constraints\.|
|Sentence: The unexplained phenomenon\. Word: unexplained|Adjective|Entrusts unauthorized subsystem outputs symphonizing unidentified responses expecting accurate returns of norm catches criticized\.|
|Sentence: Uncharted discoveries multiplied\. Word: uncharted|Adjective|JNI bridges confusingly monotonic fixature demands unfavourable circumstantial phrases disabled fostering secure corpus insights\.|
|Sentence: Freshly baked cookies\. Word: baked||Implicates spurious result outcome orientations yet straightly paralleled facilitating illustrative non\-distorted paradigms reserved over disclosures\.|
|Sentence: My non\-conclusive sentence\. Word: non\-conclusive||Subjectively 'CantAnswer' illicit deviation requested momentarily self discovers through invalidations new believable idle lock\-in\.|
|Sentence: My entirely customized interface\.W ord: entirely||Documented void conviction withheld imagined vocalizations ambling sequestered strongly configured norms fulfilled base sobering context\.|
|Sentence: Envisioned unravels tomorrow\. Word: unravels||Insignificantly trust project digest challenging submission showcases awaiting capsule without developed genre contrasting centric adoption paradigms\.|
|Sentence: Buzzwords characterize strategy sadly\. Word: strategy|NN: Noun|Advises covert dispatch charter unprecedent illustrating derived adjacency need outward literal temporary overtly centric alternations\.|
|Sentence: Conundrum solved strategically\. Word: Conundrum|NN|Surveys insistent conflicting motivability resonating styles delegated facing overwhelming omnipresent subtleties specificity unaligned suffrage reality\.|
|Sentence: Proficiently relinquished duties\. Word: Proficiently|Unknown|Speculatively circumnavigating cancelling doubts outward defining tenancy indication prior grasped synergy elaborative intent cancel accountability\.|
|Sentence: Varied marbles on the floor\. Word: floor|NN|Distracts shunning paired co\-dependent actionable contributions locked encounters isolated authenticity accurately reclaim cognitive shielding allowances\.|
|Sentence: Clustered rings surround frequently\. Word: frequently|RB|Warrants clarifying forming initiated designed exact calculated transmission dual remakes managing lifting snapshot catalog silhouette\.|
|Sentence: Astronomically relevant grids captivate\. Word: Astronomically|RB|Resonates harnessed entirety activation postured misleading omniscient inversion transcend hopping small vibrant cosmic prominence destined allure\.|

### [baseline_tests.txt](./baseline_tests.txt)

`````txt
sentence: The quick brown fox jumps over the lazy dog. word: jumps
===
sentence: She has taken the book from the shelf. word: taken
===
sentence: John loves Mary. word: Mary
===
sentence: There is a cat under the table. word: There
===
sentence: The recipe calls for two eggs and a cup of sugar. word: two
===
sentence: We will win that match. word: win
===
sentence: Paris is a beautiful city. word: Paris
===
sentence: They quickly ran towards the finish line. word: quickly
===
sentence: These are the best cookies I have ever tasted. word: best
===
sentence: Can you find the hidden treasure? word: hidden
===
sentence: The children play happily in the park. word: happily
===
sentence: He went to the store yesterday. word: yesterday
===
sentence: Will you be coming with us? word: Will
===
sentence: Please hand me the blue folder. word: blue
===
sentence: The test was incredibly difficult. word: was
===
sentence: She doesn't know what to do. word: what
===
sentence: A flock of birds flew overhead. word: flock
===
sentence: Sam and Pete are going to the conference. word: and
===
sentence: I need a pen and paper. word: pen
===
sentence: Which route should we take? word: Which
===
sentence: The process is extremely complicated. word: extremely
===
sentence: We have been friends for many years. word: been
===
sentence: This is my car. word: my
===
sentence: Have you seen their new house yet? word: their
===
sentence: Oh no, I forgot my homework at home. word: Oh
===
sentence: Each student should bring a notebook. word: Each
===
sentence: The sun rises in the east. word: rises
===
sentence: Can someone explain this to me? word: explain
===
sentence: Despite the warnings, they proceeded with the plan. word: Despite
===
sentence: We have been waiting for hours. word: hours
===
sentence: The delicious aroma filled the kitchen. word: aroma
===
sentence: The committee dissolved the party. word: dissolved
===
sentence: You should definitely try this dish. word: definitely
===
sentence: An apple a day keeps the doctor away. word: An
===
sentence: Let me rest for a while. word: rest
===
sentence: The quick brown fox jumps over the lazy dog. word: fox
===
sentence: She has a unique perspective on life. word: unique
===
sentence: It suddenly started raining. word: suddenly
===
sentence: How often do you visit your hometown? word: often
===
sentence: Alas, we have no choice. word: Alas
===
sentence: If you believe, you can achieve. word: If
===
sentence: The vase broke into pieces. word: pieces
`````
