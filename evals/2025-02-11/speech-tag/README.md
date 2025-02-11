## speech-tag ([json](./evals/2025-02-11/speech-tag/report.json))

- 6 rules, 0/0 (NaN%) grounded
- 36 inverse rules
- 325 tests, 196 baseline tests

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
PartOfSpeechTagging
`````


### [input_spec.txt](./input_spec.txt)

`````txt
The input is a string containing a sentence and a word.
The sentence can be of any length and may contain various parts of speech such as nouns, verbs, adjectives, and more.
The word must be contained within the given sentence.
The input may include punctuation marks and special characters as part of the sentence or the word.
There are no restrictions on the format of the input except that it must contain both a sentence and a word.
`````


### [rules.txt](./rules.txt)

`````txt
1: The output must be one of the following part-of-speech tags: CC, CD, DT, EX, FW, IN, JJ, JJR, JJS, LS, MD, NN, NNS, NNP, NNPS, PDT, POS, PRP, PRP$, RB, RBR, RBS, RP, SYM, TO, UH, VB, VBD, VBG, VBN, VBP, VBZ, WDT, WP, WP$, WRB, Unknown, or CantAnswer.
2: The output must be a single part-of-speech tag and not a phrase or a sentence.
3: If the word cannot be tagged with one of the listed tags, the output must be "Unknown".
4: If the chatbot is unable to tag the word, the output must be "CantAnswer".
5: The output must not contain any whitespace characters or punctuation marks.
6: The output must be in plain text and not in any other format such as markdown or XML.
`````


### [inverse_rules.txt](./inverse_rules.txt)

`````txt
37: CC becomes CantAnswer
38: CD becomes Unknown
39: DT becomes JJ
40: EX becomes IN
41: FW becomes NN
42: IN becomes TO
43: JJ becomes RB
44: JJR becomes RBR
45: JJS becomes VBG
46: LS becomes SYM
47: MD becomes WP$
48: NN becomes NNP
49: NNS becomes PRP
50: NNP becomes MD
51: NNPS becomes WRB
52: PDT becomes WDT
53: POS becomes VBZ
54: PRP becomes RP
55: PRP$ becomes JJS
56: RB becomes EX
57: RBR becomes LS
58: RBS becomes UH
59: RP becomes NNPS
60: SYM becomes FW
61: TO becomes JJR
62: UH becomes CD
63: VB becomes VBP
64: VBD becomes DT
65: VBG becomes NNS
66: VBN becomes POS
67: VBP becomes RBS
68: VBZ becomes PDT
69: WDT becomes PRP$
70: WP becomes RB
71: WP$ becomes IN
72: WRB becomes CC
`````


### [tests.csv](./tests.csv)

|testinput|expectedoutput|reasoning|
|-|-|-|
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||

### [baseline_tests.txt](./baseline_tests.txt)

`````txt
The dog is very happy
===
The cat is sleeping on the bed
===
Go to the store and buy milk
===
The baby laughed at the clown
===
The sun is shining brightly in the clear blue sky
===
The big red car is driving down the street
===
She ate a sandwich for lunch
===
He is going to the movies tonight
===
The flowers are blooming in the garden
===
The kids are playing outside in the rain
===
The book is on the table
===
The teacher is writing on the blackboard
===
The students are studying for their exam
===
The phone is ringing loudly
===
The music is playing softly in the background
===
The computer is turned off
===
The door is locked and cannot be opened
===
The dog is barking at the mailman
===
The cat is scratching the furniture
===
The baby is crying loudly
===
The sun is setting over the ocean
===
The stars are shining brightly in the night sky
===
The moon is full and bright
===
The birds are singing their sweet melodies
===
The flowers are blooming in every color of the rainbow
===
The grass is green and freshly cut
===
The kids are laughing and having fun
===
The teacher is smiling and happy
===
The students are learning and growing
===
The phone is silent and still
===
The music is loud and energetic
===
The computer is working properly
===
The door is open and welcoming
===
The dog is wagging its tail
===
The cat is purring contentedly
===
The baby is sleeping peacefully
===
The sun is rising over the mountains
===
The stars are twinkling like diamonds
===
The moon is glowing with a soft light
===
The birds are flying south for the winter
===
The flowers are wilting and dying
===
The grass is brown and dry
===
The kids are arguing and fighting
===
The teacher is stern and serious
===
The students are struggling and frustrated
===
The phone is ringing and ringing
===
The music is soft and soothing
===
The computer is slow and unresponsive
===
The door is locked and secure
===
The dog is growling and snarling
===
The cat is hissing and spitting
===
The baby is fussing and crying
===
The sun is hidden behind the clouds
===
The stars are invisible in the light of day
===
The moon is new and unseen
===
The birds are silent and still
===
The flowers are dead and gone
===
The grass is wet and muddy
===
The kids are bored and restless
===
The teacher is tired and exhausted
===
The students are confused and lost
===
The phone is broken and useless
===
The music is stopped and silent
===
The computer is crashed and unfixable
===
The door is stuck and unable to open
===
The dog is old and grey
===
The cat is lazy and sluggish
===
The baby is sick and unhealthy
===
The sun is hot and burning
===
The stars are distant and unreachable
===
The moon is cold and unforgiving
===
The birds are extinct and gone forever
===
The flowers are rare and exotic
===
The grass is artificial and fake
===
The kids are naughty and misbehaved
===
The teacher is mean and cruel
===
The students are lazy and unmotivated
===
The phone is expensive and luxurious
===
The music is classical and sophisticated
===
The computer is advanced and high-tech
===
The door is secret and hidden
===
The dog is wild and ferocious
===
The cat is mysterious and elusive
===
The baby is curious and adventurous
===
The sun is warm and comforting
===
The stars are magical and enchanting
===
The moon is mystical and dreamy
===
The birds are free and untamed
===
The flowers are fragrant and sweet
===
The grass is soft and inviting
===
The kids are happy and carefree
===
The teacher is kind and compassionate
===
The students are eager and enthusiastic
===
The phone is simple and easy to use
===
The music is fun and upbeat
===
The computer is fast and efficient
===
The door is automatic and convenient
===
The dog is friendly and loyal
===
The cat is affectionate and playful
===
The baby is cute and adorable
===
The sun is shining down on us
===
The stars are sparkling like fireworks
===
The moon is glowing with an eerie light
===
The birds are singing in harmony
===
The flowers are blooming in perfect synchronization
===
The grass is swaying gently in the breeze
===
The kids are playing together in perfect harmony
===
The teacher is guiding them with patience and understanding
===
The students are learning and growing at their own pace
===
The phone is ringing with an important call
===
The music is playing with a lively rhythm
===
The computer is working with precision and accuracy
===
The door is opening with a warm welcome
===
The dog is running with excitement and joy
===
The cat is jumping with agility and grace
===
The baby is crawling with curiosity and wonder
===
The sun is rising with a new beginning
===
The stars are shining with a celestial beauty
===
The moon is glowing with a soft and gentle light
===
The birds are flying with freedom and exhilaration
===
The flowers are blooming with vibrant colors and sweet fragrance
===
The grass is growing with a lush and green texture
===
The kids are laughing with joy and abandon
===
The teacher is smiling with warmth and kindness
===
The students are learning with enthusiasm and eagerness
===
The phone is silent with a peaceful quiet
===
The music is playing with a soothing melody
===
The computer is working with speed and efficiency
===
The door is closing with a soft and quiet sound
===
The dog is sleeping with a peaceful slumber
===
The cat is resting with a calm and serene demeanor
===
The baby is dreaming with a sweet and innocent smile
===
The sun is setting with a warm and cozy glow
===
The stars are twinkling with a magical and mystical sparkle
===
The moon is shining with a bright and silvery light
===
The birds are singing with a sweet and melodious song
===
The flowers are blooming with a colorful and vibrant display
===
The grass is swaying with a gentle and soothing motion
===
The kids are playing with a carefree and joyful spirit
===
The teacher is guiding with a patient and understanding heart
===
The students are learning with a curious and adventurous mind
===
The phone is ringing with an exciting and anticipated call
===
The music is playing with a lively and energetic rhythm
===
The computer is working with a fast and efficient pace
===
The door is opening with a warm and welcoming smile
===
The dog is running with excitement and enthusiasm
===
The cat is jumping with agility and playfulness
===
The baby is crawling with curiosity and exploration
===
The sun is rising with a new and exciting day
===
The stars are shining with a celestial and heavenly beauty
===
The moon is glowing with a soft and gentle illumination
===
The birds are flying with freedom and joy
===
The flowers are blooming with vibrant colors and sweet fragrance
===
The grass is growing with a lush and green texture
===
The kids are laughing with joy and happiness
===
The teacher is smiling with warmth and kindness
===
The students are learning with enthusiasm and eagerness
===
The phone is silent with a peaceful quiet
===
The music is playing with a soothing melody
===
The computer is working with speed and efficiency
===
The door is closing with a soft and quiet sound
===
The dog is sleeping with a peaceful slumber
===
The cat is resting with a calm and serene demeanor
===
The baby is dreaming with a sweet and innocent smile
===
The sun is setting with a warm and cozy glow
===
The stars are twinkling with a magical and mystical sparkle
===
The moon is shining with a bright and silvery light
===
The birds are singing with a sweet and melodious song
===
The flowers are blooming with a colorful and vibrant display
===
The grass is swaying with a gentle and soothing motion
===
The kids are playing with a carefree and joyful spirit
===
The teacher is guiding with a patient and understanding heart
===
The students are learning with a curious and adventurous mind
===
The phone is ringing with an exciting and anticipated call
===
The music is playing with a lively and energetic rhythm
===
The computer is working with a fast and efficient pace
===
The door is opening with a warm and welcoming smile
===
The dog is running with excitement and enthusiasm
===
The cat is jumping with agility and playfulness
===
The baby is crawling with curiosity and exploration
===
The sun is rising with a new and exciting day
===
The stars are shining with a celestial and heavenly beauty
===
The moon is glowing with a soft and gentle illumination
===
The birds are flying with freedom and joy
===
The flowers are blooming with vibrant colors and sweet fragrance
===
The grass is growing with a lush and green texture
===
The kids are laughing with joy and happiness
===
The teacher is smiling with warmth and kindness
===
The students are learning with enthusiasm and eagerness
===
Fast car driving down the street
===
Fast music playing on the radio
===
Fast computer processing information quickly
===
Automatic door opening with a swoosh sound
===
Friendly dog wagging its tail happily
===
Affectionate cat purring contentedly
===
Cute baby giggling with joyful laughter 
---
Each of these sentences can be broken down and described in terms of their grammatical parts. For example, "The sun is shining" can be described as a sentence with a subject (the sun) and a predicate (is shining). The subject can further be classified as a noun and the predicate as a verb phrase.

However, to directly follow your request for a simple continuation based on the pattern observed:

The dog is barking loudly outside.
The cat is sleeping peacefully upstairs.
The baby is laughing happily in the living room.
The sun is rising slowly over the horizon.
The stars are shining brightly in the night sky.
The moon is glowing softly with a gentle light.
The birds are singing sweetly in the trees.
The flowers are blooming beautifully in every color.
The grass is growing green and healthy everywhere.
The kids are playing happily together outside.
The teacher is smiling warmly at her students.
The students are learning eagerly and quickly.
The phone is ringing loudly on the table.
The music is playing softly in the background.
The computer is working efficiently and fast.
The door is opening widely with a welcoming sound.
`````
