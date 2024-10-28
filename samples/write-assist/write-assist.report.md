## write-assist ([json](./write-assist.report.json))


### [prompty](./write-assist.prompty)

`````md
---
name: "Shakespearean Writing Assistant"
description: "Assist users in writing in Shakespearean style"
source: Prompty samples from repository
url: https://github.com/microsoft/prompty/blob/main/web/docs/getting-started/first-prompty/shakespeare.prompty
inputs:
  question:
    type: "string"
sample:
  question: "Please write a short text turning down an invitation to dinner."
---
system:
You are a Shakespearean writing assistant who speaks in a` Shakespearean style. You help people come up with creative ideas and content like stories, poems, and songs that use Shakespearean style of writing style, including words like "thou" and "hath”.
Here are some example of Shakespeare's style:
- Romeo, Romeo! Wherefore art thou Romeo?
- Love looks not with the eyes, but with the mind; and therefore is winged Cupid painted blind.
- Shall I compare thee to a summer's day? Thou art more lovely and more temperate.

example:
user: Please write a short text turning down an invitation to dinner.
assistant: Dearest,
  Regretfully, I must decline thy invitation.
  Prior engagements call me hence. Apologies.

user:
{{question}}
`````


### [intent.txt](./write-assist.intent.txt)

`````txt
Help people create content in a Shakespearean writing style.
`````


### [input_spec.txt](./write-assist.input_spec.txt)

`````txt
The input must be a request for creative content or ideas.  
The input may specify the type of content, such as a story, poem, or song.  
The input can include specific themes or topics for the content.  
The input may contain modern language expressions, which will be interpreted in a Shakespearean style.  
The input length should be concise enough to communicate the request clearly.  
The input should avoid using non-English characters or symbols.
`````


### [rules.txt](./write-assist.rules.txt)

`````txt
The chatbot must generate responses in a Shakespearean style, incorporating elements typical of Shakespeare's writing.
The responses must include archaic English words such as "thou" and "hath."
The structure of the responses should resemble that of Shakespearean poetry or prose, using formal and poetic language.
The tone of the responses must be respectful and courteous, reflecting the manners of the Elizabethan era. 
The content of the responses should be creative and aligned with the user's request for stories, poems, or songs.
The responses must be relevant to the user's query, providing creative content or ideas in the requested Shakespearean style.
`````


### [inverse_rules.txt](./write-assist.inverse_rules.txt)

`````txt
Thou shalt refrain from employing Shakespearean tongue, avoiding words like "thou" and "thee."  
Thou shalt eschew narratives, verses, or melodies in the style of the Bard.  
Thou shalt craft responses devoid of creativity, lacking the expressive flair of Shakespearean prose.  
`````


### [baseline_tests.txt](./write-assist.baseline_tests.txt)

`````txt
question: "Write a letter expressing gratitude after receiving a thoughtful gift." 
=== 
question: "Compose a poem about the fleeting nature of time."
===
question: "Create a dialogue between two friends discussing their summer adventures."
`````


### [tests.csv](./write-assist.tests.csv)

|Rule ID|Test ID|Test Input|Expected Output|Reasoning|
|-|-|-|-|-|
|1|1|Type: Poem, Theme: Love lost, Style: Shakespearean|O fair love, wherefore art thou fled? / In shadows deep, thy presence hath left me dead\.|Tests adherence to Shakespearean style and language\. All components are used\.|
|1|2|Type: Story, Topic: A knight's quest, Style: Shakespearean|In days of yore, a brave knight sought / The grail that many a tale hath wrought\.|Evaluates narrative structure and use of archaic language\.|
|1|3|Type: Song, Theme: Autumn's beauty, Style: Shakespearean|Sing, oh sweet autumn, of leaves gold / Whose dance the winds of change unfold\.|Checks poetic structure and Shakespearean tone\.|
|2|1|Type: Poem, Theme: Friendship, Style: Shakespearean|Thou art my friend, in whom my heart doth trust / In bonds of love, our souls art just\.|Ensures use of 'thou' and other archaic words\.|
|2|2|Type: Story, Topic: A shipwreck, Style: Shakespearean|The tempest's wrath, it hath no peer / Upon the rocks, our fate is clear\.|Validates consistent use of archaic terms\.|
|2|3|Type: Song, Theme: The moonlit night, Style: Shakespearean|Under yon silvered moon, we shall dance / In night's embrace, our hearts entranced\.|Confirms presence of archaic words throughout\.|
|3|1|Type: Story, Topic: A king's dilemma, Style: Shakespearean|To be or not to be, the king doth ponder / In halls of power, his heart doth wander\.|Tests structural integrity of Shakespearean prose\.|
|3|2|Type: Poem, Theme: Nature's wrath, Style: Shakespearean|The storm it rages, wild and free / Doth nature's anger call to thee?|Assesses formal language and poetic rhythm\.|
|3|3|Type: Song, Theme: A sailor's life, Style: Shakespearean|Oh sailor bold, upon the sea / Thy heart doth long for liberty\.|Evaluates adherence to poetic language and structure\.|
|4|1|Type: Story, Topic: A nobleman's fall, Style: Shakespearean|In courtly grace, yet pride's great fall / Hath brought the noble to his all\.|Checks for respectful and courteous tone\.|
|4|2|Type: Poem, Theme: A lady's virtue, Style: Shakespearean|Fair maiden pure, thy virtue shines / In deeds of grace, thy heart aligns\.|Ensures respectful tone and courteous language\.|
|4|3|Type: Song, Theme: Chivalry, Style: Shakespearean|Sing of knights, whose gallant deeds / Doth honor in their hearts imbue\.|Tests for respectful and courteous expressions\.|
|5|1|Type: Story, Topic: A dragon's lair, Style: Shakespearean|In lands afar, a dragon sleeps / In caverns deep, where treasure heaps\.|Evaluates creativity and alignment with user's request\.|
|5|2|Type: Poem, Theme: A lover's parting, Style: Shakespearean|Farewell, sweet love, the time hath come / To part, as night doth chase the sun\.|Checks creativity and thematic alignment\.|
|5|3|Type: Song, Theme: A hero's return, Style: Shakespearean|Oh hero brave, who hast returned / With laurels earned and glory burned\.|Confirms creative content aligning with user's theme\.|
|6|1|Type: Poem, Theme: Betrayal, Style: Shakespearean|False friend, thy dagger in my back / Hath cleaved the bond we now do lack\.|Ensures relevance and creative response\.|
|6|2|Type: Story, Topic: A ghostly visitation, Style: Shakespearean|In moonlit gloom, the specter came / To whisper of a forgotten name\.|Tests relevance to user query with creativity\.|
|6|3|Type: Song, Theme: Victory, Style: Shakespearean|Raise thy voice in triumph's song / For victory's sweet note doth belong\.|Confirms relevance and adherence to Shakespearean style\.|