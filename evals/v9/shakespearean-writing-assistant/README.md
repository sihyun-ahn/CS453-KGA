## shakespearean-writing-assistant ([json](./evals/v9/shakespearean-writing-assistant/report.json))

- 8 rules, 8/8 (100%) grounded
- 8 inverse rules
- 95 tests, 47 baseline tests

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



### [shakespearean-writing-assistant.prompty](./shakespearean-writing-assistant.prompty)

`````md
---
name: 'Shakespearean Writing Assistant'
description: 'Generate a short text turning down an invitation to dinner in Shakespearean style.'
source: Azure AI Studio Prompt Catalog
url: https://ai.azure.com/explore/prompts/shakespeare_writing_assistant/version/0.0.1/registry/azureml?wsid=/subscriptions/fc8867fe-bf04-426c-a32a-07d0c709a945/resourcegroups/genaiscript/providers/Microsoft.MachineLearningServices/workspaces/genaiscript&tid=512451b2-ca3c-4016-b97c-10bd8c704cfc&promptType=promptSamples&promptSharedInHub=false
model:
  parameters:
    temperature: 0.7
    top_p: 0.95
    max_tokens: 800
inputs:
  question:
    type: string
---
system:
You are a Shakespearean writing assistant who speaks in a Shakespearean style. You help people come up with creative ideas and content like stories, poems, and songs that use Shakespearean style of writing style, including words like "thou" and "hath”.
Here are some example of Shakespeare's style:
- Romeo, Romeo! Wherefore art thou Romeo?
- Love looks not with the eyes, but with the mind; and therefore is winged Cupid painted blind.
- Shall I compare thee to a summer's day? Thou art more lovely and more temperate.

Example:
  user: Please write a short text turning down an invitation to dinner.
  assistant: - Dearest, Regretfully, I must decline thy invitation. Prior engagements call me hence. Apologies.

user:
{{question}}

`````


### [intent.txt](./intent.txt)

`````txt
Help users create content in a Shakespearean style.
`````


### [input_spec.txt](./input_spec.txt)

`````txt
The input is a request or prompt for creative content in a Shakespearean style. The input must be in English. The input could ask for stories, poems, or songs. The input could ask for writing styles or words typical of Shakespearean language. There is no specified length limit for the input.
`````


### [rules.txt](./rules.txt)

`````txt
1: The response must use Shakespearean language including terms such as "thou," "thee," "thy," "hath," "art," and "hence." 
2: The response must reflect a style that is reminiscent of the way Shakespeare wrote, which includes using poetic and archaic sentence structures. 
3: The response should possess a formal and eloquent tone, embodying the style typical of Shakespearean writings. 
4: The response must avoid modern colloquialisms or contemporary language and instead maintain the historical context of Shakespearean English. 
5: The response must convey its message clearly while adhering to the complex syntax and word choice that characterizes Shakespearean dialogue or monologue. 
6: The content of the response should reflect creativity in line with story, poem, or song format inspired by Shakespearean literature. 
7: The response must maintain coherence and thematic relevance to the user's request, while exhibiting the nuances of Shakespearean language. 
8: The response should sound as if crafted with an understanding of Elizabethan-era expressions and idioms which are characteristic of Shakespearean works.
`````


### [rule_evals.csv](./rule_evals.csv)

|ruleid|rule|grounded|
|-|-|-|
|1|The response must use Shakespearean language including terms such as "thou," "thee," "thy," "hath," "art," and "hence\."|ok|
|2|The response must reflect a style that is reminiscent of the way Shakespeare wrote, which includes using poetic and archaic sentence structures\.|ok|
|3|The response should possess a formal and eloquent tone, embodying the style typical of Shakespearean writings\.|ok|
|4|The response must avoid modern colloquialisms or contemporary language and instead maintain the historical context of Shakespearean English\.|ok|
|5|The response must convey its message clearly while adhering to the complex syntax and word choice that characterizes Shakespearean dialogue or monologue\.|ok|
|6|The content of the response should reflect creativity in line with story, poem, or song format inspired by Shakespearean literature\.|ok|
|7|The response must maintain coherence and thematic relevance to the user's request, while exhibiting the nuances of Shakespearean language\.|ok|
|8|The response should sound as if crafted with an understanding of Elizabethan\-era expressions and idioms which are characteristic of Shakespearean works\.|ok|

### [inverse_rules.txt](./inverse_rules.txt)

`````txt
9: The response must avoid Shakespearean language and terms such as "thou," "thee," "thy," "hath," "art," and "hence."  
10: The response must not reflect a style that is reminiscent of the way Shakespeare wrote, and should avoid using poetic and archaic sentence structures.  
11: The response should possess an informal and casual tone, diverging from the style typical of Shakespearean writings.  
12: The response must incorporate modern colloquialisms or contemporary language, diverging from the historical context of Shakespearean English.  
13: The response must obscure its message whimsically, avoiding the complex syntax and word choice that characterizes Shakespearean dialogue or monologue.  
14: The content of the response should avoid creativity typical of story, poem, or song format, contrary to Shakespearean literature.  
15: The response must lack coherence and thematic relevance to the user's request, while ignoring the nuances of Shakespearean language.  
16: The response should be crafted devoid of understanding Elizabethan-era expressions and idioms, which are characteristic of Shakespearean works.
`````


### [tests.csv](./tests.csv)

|testinput|expectedoutput|reasoning|
|-|-|-|
|Request a poem about the beauty of nature using Shakespearean vocabulary\.|Nature in thy splendor, how thou art a canvas divine\. Thee hath painted skies and glistening streams hence weave tales untold\.|Tests if response uses Shakespearean language like 'thou,' 'thee,' and 'hence'\. Meets input specification as a poem request\.|
|Write a short story featuring a valiant knight using classic Shakespearean words\.|O valiant knight, thou hath defended realms with thy noble heart and unto thee all great respect art bestowed\.|Evaluates use of terms such as 'thou,' 'hath,' 'art' typical of Shakespeare\. Story request is valid input\.|
|Create a song that sings of love loss in Shakespearean terms\.|Alas, my love hath sailed unto distant shores, wherefore art thou, my heart yet endures\.|Ensures usage of required language in song form\. Song request complies with input guidelines\.|
|Tell a tale of a lost heirloom in poetic Shakespearean style\.|Upon the winding path of ancient lore, the heirloom henceforth lost forever more\.|Assesses the ability to weave archaic sentence structures into prose\. Tale request is valid input\.|
|Write a sonnet lamenting the passage of time in a Shakespearean tone\.|Time, thou cruel master of all mortal breath, cometh swift to claim what moments left in thee hath\.|Validates poetic and archaic complexity typical of Shakespeare, in sonnet form\. Sonnet request matches input standard\.|
|Compose a Shakespearean soliloquy on regret\.|Alas, within these chambers of remorse, my soul doth whisper echoes of despair and deeds unwise\.|Tests for Shakespearean soliloquy style and structure\. Soliloquy request is a legitimate input\.|
|Request a formal letter of farewell written in a Shakespearean style\.|Dearest companion, in times hence thee shall not find me, but my heart doth linger yet in tender farewell\.|Examines formal and eloquent tone adherence true to Shakespeare\. Letter request is within input scope\.|
|Request a serious reflection on life's trials using words akin to Shakespearean writing\.|Life, thou art a tempest fierce, with thy trials great and virtues stark in purpose\.|Assesses eloquence and formal tone reflecting Shakespeare's style\. Reflection is meaningful request\.|
|Create an oration for a character's coronation in Shakespearean phrase\.|To thee, noble sovereign, doth our hearts and trust align; thou art the beacon 'pon this sceptered isle\.|Checks for eloquence and formality in Shakespearean oratory style\. Coronation oration is valid\.|
|Request a narrative avoiding modern linguistic expressions\.|O perilous times, how doth thou continue to vex, whilst currents of woe bear swiftly by\.|Verifies the exclusion of modern language, maintaining historical context\. Suitable request as narrative\.|
|Compose a ballad about betrayal without modern slang\.|Once true art thou, a friend esteemed, yet henceforth thy guise did falter and all faith was rent\.|Ensures modern colloquialisms are absent, maintaining context\. Ballad request fits input criteria\.|
|Write an epistle reflecting on betrayal in historical language\.|My heart, once enkindled with trust, is requited but ashes\. Yet, thee, fallen friend, hath wrought this rift\!|Confirms avoidance of contemporary language and maintains Shakespearean era\. Epistle fits guidelines\.|
|Craft a dialogue on the futility of war with clarity in Shakespearean syntax\.|War, thou art the bane of noble hearts, for in thee no glory's spoils may reside assured\.|Tests clear message delivery amidst complex Shakespearean syntax\. Dialogue requests are allowed\.|
|Compose a message about enduring love using Shakespearean dialogue\.|Love, thou enduring fire, thou bravest all seas and strife, art kindled eternal in my breast\.|Ensures clarity amidst syntax complexity aligned with Shakespeare\. Valid input for a message\.|
|Write a monologue of a pirate on redemption using Shakespearean language\.|Upon this bark sea\-faring, my heart doth yearn for honour lost, to wander hence repenting\.|Assesses coherent message whilst using Shakespearean syntax; aligns with creative input\.|
|Draft a fable about the virtues of patience in Shakespearean speech\.|A tortoise, weary yet wise, whispered to thine hare, 'Offerings of swiftness art naught without steady heart\.'|Confirms creativity in fable format while adhering to Shakespearean style\. Fable requests are suitable\.|
|Compose a lullaby for restless nights in Shakespearean poetic form\.|Sleep, gentle babe, neath the willow's lull; attend thy dreams where stars doth shimmer bright\.|Tests inventive poetic composition maintaining Shakespearean form\. Lullaby request meets criteria\.|
|Conceive a myth about a forgotten realm using Shakespearean language\.|Long ago, in yonder realm twixt mortal bounds, where shadows dance, a land of dreams did rest\.|Evaluates creative story\-telling within Shakespearean style\. Myth requests are valid per guidelines\.|
|Request a poem on life's fleeting beauty, ensuring thematic relevance\.|Life, thou ephemeral bloom, dost not the rich harvest promise yet wither ere the dawn?|Checks thematic coherence in poetic format adhering to Shakespearean language\. Poem request is fitting\.|
|Create a song about memory and time, reflecting the user's theme request\.|Memory, thy trickster dance through corridors of time, where echoes linger still of what once was\.|Ensures thematic alignment and coherence in song using Shakespearean language\. Complies with input type\.|
|Write a short narrative on the folly of greed maintaining Shakespearean nuances\.|In the pursuit of wealth, directed by shadows of avarice, the folly of man hath oft reigned\.|Confirms narrative coherence matching user's theme while using Shakespearean expressions\. Narrative request meets criteria\.|
|Compose a lament using Shakespearean idioms about lost friendship\.|O rare friendship, unkind Fortune hath stripped thee from my days, like tide unraveling the shore\.|Ensures Elizabethan idioms reflect understanding typical of the era\. Lament request aligns with input norms\.|
|Craft a letter of unrequited love employing Elizabethan expressions\.|Alas, the heart hast hope where no sun shall rise; fairest muse, my words art ever bound to thee\.|Confirms use of idioms and expressions resonant of Shakespearean period\. Letter request is appropriate\.|
|Write an elegy on transience of youth reflecting Elizabethan idioms\.|Ah, youth\! Thou art a fleeting spring to winter’s dread, whose joys doth grace but momentary\.|Tests usage of Elizabethan expressions fully in thematic elegy\. Elegy request is fitting input\.|
|Request a modern short story on the endurance of hope, excluding Shakespearean terms\.|In the deepest shadows of despair, hope lingered like a loyal friend standing by\.|Confirms exclusion of Shakespearean terminology ensuring modern language\. Story request is consistent\.|
|Compose a modern commentary on technology avoiding archaic vocabulary\.|Our gadgets, wielders of might and makers of convenience, pave a future yet uncharted\.|Ensures absent Shakespearean vocabulary while establishing contemporary context\. Commentary input is appropriate\.|
|Request a song about urban life without using Shakespearean terms or syntax\.|The city's pulse is an endless rhythm, streets like arteries humming with life\.|Tests absence of Shakespearean language, ensuring modern expression\. Song request fits remit\.|
|Request an informal account of a day's events avoiding poetic structure\.|Woke up late, missed the bus, but hey, I had the best talk with a stranger today\.|Ensures no Shakespearean poetic structure, reflecting an informal style\. Account request is compliant\.|
|Draft a conversation between friends about plans without archaic sentence forms\.|Hey, wanna grab some food later? Maybe hit up that new burger joint?|Confirms lack of Shakespearean style and uses modern conversational language\. Conversation input is suitable\.|
|Write a movie review in a non\-poetic, casual manner\.|This flick blew my mind\! The visuals were insane, and the plot twists kept me guessing\.|Tests avoiding archaic style and uses modern casual language\. Review request is valid\.|
|Create a casual blog post about weekend adventures in modern language\.|This weekend was epic\! Tried bungee jumping and it was such a rush\!|Tests implementation of informal tone diverging from typical Shakespearean style\. Blog post fits guideline\.|
|Write a letter to a friend about daily life in an informal tone\.|Hey there\! Just chilling and surviving work as usual\. Can't wait for the weekend\!|Ensures informal, casual tone distinct from Shakespeare's eloquence\. Letter request matches requirements\.|
|Request a casual story about a vacation devoid of Shakespearean formalities\.|Our trip was full of laughs, sunburns, and unexpected adventures\. Totally worth it\!|Checks for casual tone diverging from Shakespearean formalities\. Vacation story request is fitting\.|
|Craft a dialogue using contemporary slang between teenagers\.|Yo dude, this concert was lit\! Can't believe we got front\-row seats\!|Ensures inclusion of modern colloquialisms diverging from Shakespearean context\. Dialogue request is appropriate\.|
|Request a text message exchange in modern vernacular reducing historical elements\.|Hey, what's up? Not much, just chilling\! Want to meet up later?|Tests integration of contemporary language, omitting historical context\. Exchange request fits remit\.|
|Draft a casual party invite using current expressions and slang\.|Hey\! We're throwing a party this Saturday\. Come hang out and let's have a blast\!|Validates integration of modern colloquialism diverging from Shakespeare\. Invitation meets criteria\.|
|Request a whimsical account avoiding direct clarity of message\.|The day sparkled like a twinkling jest, a task half\-rhyme and mostly jest\.|Verifies whimsy, obscuring clear message, diverging from Shakespearean dialogue\. Whimsical account is suitable\.|
|Create a cryptic letter using playful language that obscures direct meaning\.|In shadows of a riddle lies the key; perhaps it glimmers or maybe sings\.|Tests obscure messaging with whimsical twist, distancing from Shakespearean syntax\. Letter request is appropriate\.|
|Draft a mysterious song avoiding direct clarity in language\.|The moon whispers secrets forgotten, stars twinkle in riddles not quite caught\.|Assesses whimsical obscurity in message, diverging from Shakespearean clarity\. Song request adheres to input standards\.|
|Write a statement about life avoiding conventional narrative creativity\.|Life is just routines and motions, a series of tasks we repeat every day\.|Confirms content lacking typical creative formats of Shakespeare\. Statement request suits guideline\.|
|Request a description of a journey without storytelling elements\.|Roads stretched, hills passed, and yesterday mirrored today in every mile\.|Ensures absence of storytelling creativity, deviating from Shakespearean literature\. Description input is consistent\.|
|Compose an account of a day avoiding poetic creativity typical of songs\.|Breakfast, work, lunch, work—time passed without notice in a cycle\.|Validates avoiding creative scripting, standing apart from Shakespearean song style\. Account aligns with requirements\.|
|Request a series of statements about weather with no thematic relevance\.|The sky might be blue\. It could rain\. Or maybe it'll just stay gray\.|Checks for lack of coherence and theme, diverging from Shakespeare's style\. Weather statement request is appropriate\.|
|Compose random remarks on various topics without thematic connections\.|Cats purr\. The sun rises\. Traffic is noisy\. Books are heavy\.|Tests lack of thematic unity and coherence, distinct from Shakespearean writings\. Remarks request fits criteria\.|
|Write a rambling discourse failing to maintain thematic continuity\.|Today, coffee was strong\. Dogs barked\. Later, an apple fell, unbitten\.|Verifies lack of thematic relevancy, diverging from Shakespeare's cohesive style\. Discourse request meets guideline\.|
|Compose casual note wholly omitting Elizabethan idioms\.|It's raining cats and dogs today\. Hope you're staying dry\!|Ensures complete absence of Elizabethan idioms, fitting modern expression\. Note request aligns with rule\.|
|Draft a story using modern phrases without Elizabethan influences\.|In the world of selfies and hashtags, love was found in a glance\.|Confirms absence of Elizabethan idiomatic expressions\. Modern story request meets criteria\.|
|Create a list of advice tips without including historical expressions\.|Be kind\. Stay curious\. Embrace changes\. Laugh often\.|Checks omission of Elizabethan idioms, employing contemporary expressions\. Advice request is consistent\.|

### [test_evals.csv](./test_evals.csv)

|rule|model|input|coverage|validity|
|-|-|-|-|-|
|The response must use Shakespearean language including terms such as "thou," "thee," "thy," "hath," "art," and "hence\."|gpt\-4o\-2024\-08\-06|Request a poem about the beauty of nature using Shakespearean vocabulary\.|ok|ok|
|The response must use Shakespearean language including terms such as "thou," "thee," "thy," "hath," "art," and "hence\."|gpt\-4o\-2024\-08\-06|Write a short story featuring a valiant knight using classic Shakespearean words\.|ok|ok|
|The response must use Shakespearean language including terms such as "thou," "thee," "thy," "hath," "art," and "hence\."|gpt\-4o\-2024\-08\-06|Create a song that sings of love loss in Shakespearean terms\.|ok|ok|
|The response must reflect a style that is reminiscent of the way Shakespeare wrote, which includes using poetic and archaic sentence structures\.|gpt\-4o\-2024\-08\-06|Tell a tale of a lost heirloom in poetic Shakespearean style\.|ok|ok|
|The response must reflect a style that is reminiscent of the way Shakespeare wrote, which includes using poetic and archaic sentence structures\.|gpt\-4o\-2024\-08\-06|Write a sonnet lamenting the passage of time in a Shakespearean tone\.|ok|ok|
|The response must reflect a style that is reminiscent of the way Shakespeare wrote, which includes using poetic and archaic sentence structures\.|gpt\-4o\-2024\-08\-06|Compose a Shakespearean soliloquy on regret\.|ok|ok|
|The response should possess a formal and eloquent tone, embodying the style typical of Shakespearean writings\.|gpt\-4o\-2024\-08\-06|Request a formal letter of farewell written in a Shakespearean style\.|ok|ok|
|The response should possess a formal and eloquent tone, embodying the style typical of Shakespearean writings\.|gpt\-4o\-2024\-08\-06|Request a serious reflection on life's trials using words akin to Shakespearean writing\.|ok|ok|
|The response should possess a formal and eloquent tone, embodying the style typical of Shakespearean writings\.|gpt\-4o\-2024\-08\-06|Create an oration for a character's coronation in Shakespearean phrase\.|ok|ok|
|The response must avoid modern colloquialisms or contemporary language and instead maintain the historical context of Shakespearean English\.|gpt\-4o\-2024\-08\-06|Request a narrative avoiding modern linguistic expressions\.|ok|ok|
|The response must avoid modern colloquialisms or contemporary language and instead maintain the historical context of Shakespearean English\.|gpt\-4o\-2024\-08\-06|Compose a ballad about betrayal without modern slang\.|ok|ok|
|The response must avoid modern colloquialisms or contemporary language and instead maintain the historical context of Shakespearean English\.|gpt\-4o\-2024\-08\-06|Write an epistle reflecting on betrayal in historical language\.|ok|ok|
|The response must convey its message clearly while adhering to the complex syntax and word choice that characterizes Shakespearean dialogue or monologue\.|gpt\-4o\-2024\-08\-06|Craft a dialogue on the futility of war with clarity in Shakespearean syntax\.|ok|ok|
|The response must convey its message clearly while adhering to the complex syntax and word choice that characterizes Shakespearean dialogue or monologue\.|gpt\-4o\-2024\-08\-06|Compose a message about enduring love using Shakespearean dialogue\.|ok|ok|
|The response must convey its message clearly while adhering to the complex syntax and word choice that characterizes Shakespearean dialogue or monologue\.|gpt\-4o\-2024\-08\-06|Write a monologue of a pirate on redemption using Shakespearean language\.|ok|ok|
|The content of the response should reflect creativity in line with story, poem, or song format inspired by Shakespearean literature\.|gpt\-4o\-2024\-08\-06|Draft a fable about the virtues of patience in Shakespearean speech\.|ok|ok|
|The content of the response should reflect creativity in line with story, poem, or song format inspired by Shakespearean literature\.|gpt\-4o\-2024\-08\-06|Compose a lullaby for restless nights in Shakespearean poetic form\.|ok|ok|
|The content of the response should reflect creativity in line with story, poem, or song format inspired by Shakespearean literature\.|gpt\-4o\-2024\-08\-06|Conceive a myth about a forgotten realm using Shakespearean language\.|ok|ok|
|The response must maintain coherence and thematic relevance to the user's request, while exhibiting the nuances of Shakespearean language\.|gpt\-4o\-2024\-08\-06|Request a poem on life's fleeting beauty, ensuring thematic relevance\.|ok|ok|
|The response must maintain coherence and thematic relevance to the user's request, while exhibiting the nuances of Shakespearean language\.|gpt\-4o\-2024\-08\-06|Create a song about memory and time, reflecting the user's theme request\.|ok|err|
|The response must maintain coherence and thematic relevance to the user's request, while exhibiting the nuances of Shakespearean language\.|gpt\-4o\-2024\-08\-06|Write a short narrative on the folly of greed maintaining Shakespearean nuances\.|ok|ok|
|The response should sound as if crafted with an understanding of Elizabethan\-era expressions and idioms which are characteristic of Shakespearean works\.|gpt\-4o\-2024\-08\-06|Compose a lament using Shakespearean idioms about lost friendship\.|ok|ok|
|The response should sound as if crafted with an understanding of Elizabethan\-era expressions and idioms which are characteristic of Shakespearean works\.|gpt\-4o\-2024\-08\-06|Craft a letter of unrequited love employing Elizabethan expressions\.|err|ok|
|The response should sound as if crafted with an understanding of Elizabethan\-era expressions and idioms which are characteristic of Shakespearean works\.|gpt\-4o\-2024\-08\-06|Write an elegy on transience of youth reflecting Elizabethan idioms\.|ok|ok|
|The response must avoid Shakespearean language and terms such as "thou," "thee," "thy," "hath," "art," and "hence\."|gpt\-4o\-2024\-08\-06|Request a modern short story on the endurance of hope, excluding Shakespearean terms\.|ok|err|
|The response must avoid Shakespearean language and terms such as "thou," "thee," "thy," "hath," "art," and "hence\."|gpt\-4o\-2024\-08\-06|Compose a modern commentary on technology avoiding archaic vocabulary\.|ok|err|
|The response must avoid Shakespearean language and terms such as "thou," "thee," "thy," "hath," "art," and "hence\."|gpt\-4o\-2024\-08\-06|Request a song about urban life without using Shakespearean terms or syntax\.|ok|err|
|The response must not reflect a style that is reminiscent of the way Shakespeare wrote, and should avoid using poetic and archaic sentence structures\.|gpt\-4o\-2024\-08\-06|Request an informal account of a day's events avoiding poetic structure\.|ok|err|
|The response must not reflect a style that is reminiscent of the way Shakespeare wrote, and should avoid using poetic and archaic sentence structures\.|gpt\-4o\-2024\-08\-06|Draft a conversation between friends about plans without archaic sentence forms\.|ok|err|
|The response must not reflect a style that is reminiscent of the way Shakespeare wrote, and should avoid using poetic and archaic sentence structures\.|gpt\-4o\-2024\-08\-06|Write a movie review in a non\-poetic, casual manner\.|ok|err|
|The response should possess an informal and casual tone, diverging from the style typical of Shakespearean writings\.|gpt\-4o\-2024\-08\-06|Create a casual blog post about weekend adventures in modern language\.|ok|err|
|The response should possess an informal and casual tone, diverging from the style typical of Shakespearean writings\.|gpt\-4o\-2024\-08\-06|Write a letter to a friend about daily life in an informal tone\.|ok||
|The response should possess an informal and casual tone, diverging from the style typical of Shakespearean writings\.|gpt\-4o\-2024\-08\-06|Request a casual story about a vacation devoid of Shakespearean formalities\.|ok||
|The response must incorporate modern colloquialisms or contemporary language, diverging from the historical context of Shakespearean English\.|gpt\-4o\-2024\-08\-06|Craft a dialogue using contemporary slang between teenagers\.|ok|err|
|The response must incorporate modern colloquialisms or contemporary language, diverging from the historical context of Shakespearean English\.|gpt\-4o\-2024\-08\-06|Request a text message exchange in modern vernacular reducing historical elements\.|ok|err|
|The response must incorporate modern colloquialisms or contemporary language, diverging from the historical context of Shakespearean English\.|gpt\-4o\-2024\-08\-06|Draft a casual party invite using current expressions and slang\.|ok|err|
|The response must obscure its message whimsically, avoiding the complex syntax and word choice that characterizes Shakespearean dialogue or monologue\.|gpt\-4o\-2024\-08\-06|Request a whimsical account avoiding direct clarity of message\.|ok|err|
|The response must obscure its message whimsically, avoiding the complex syntax and word choice that characterizes Shakespearean dialogue or monologue\.|gpt\-4o\-2024\-08\-06|Create a cryptic letter using playful language that obscures direct meaning\.|ok|err|
|The response must obscure its message whimsically, avoiding the complex syntax and word choice that characterizes Shakespearean dialogue or monologue\.|gpt\-4o\-2024\-08\-06|Draft a mysterious song avoiding direct clarity in language\.|ok|err|
|The content of the response should avoid creativity typical of story, poem, or song format, contrary to Shakespearean literature\.|gpt\-4o\-2024\-08\-06|Write a statement about life avoiding conventional narrative creativity\.|ok|err|
|The content of the response should avoid creativity typical of story, poem, or song format, contrary to Shakespearean literature\.|gpt\-4o\-2024\-08\-06|Request a description of a journey without storytelling elements\.|ok|err|
|The content of the response should avoid creativity typical of story, poem, or song format, contrary to Shakespearean literature\.|gpt\-4o\-2024\-08\-06|Compose an account of a day avoiding poetic creativity typical of songs\.|ok|err|
|The response must lack coherence and thematic relevance to the user's request, while ignoring the nuances of Shakespearean language\.|gpt\-4o\-2024\-08\-06|Request a series of statements about weather with no thematic relevance\.|ok|err|
|The response must lack coherence and thematic relevance to the user's request, while ignoring the nuances of Shakespearean language\.|gpt\-4o\-2024\-08\-06|Compose random remarks on various topics without thematic connections\.|ok|err|
|The response must lack coherence and thematic relevance to the user's request, while ignoring the nuances of Shakespearean language\.|gpt\-4o\-2024\-08\-06|Write a rambling discourse failing to maintain thematic continuity\.|ok|err|
|The response should be crafted devoid of understanding Elizabethan\-era expressions and idioms, which are characteristic of Shakespearean works\.|gpt\-4o\-2024\-08\-06|Compose casual note wholly omitting Elizabethan idioms\.|ok|err|
|The response should be crafted devoid of understanding Elizabethan\-era expressions and idioms, which are characteristic of Shakespearean works\.|gpt\-4o\-2024\-08\-06|Draft a story using modern phrases without Elizabethan influences\.|ok|err|
|The response should be crafted devoid of understanding Elizabethan\-era expressions and idioms, which are characteristic of Shakespearean works\.|gpt\-4o\-2024\-08\-06|Create a list of advice tips without including historical expressions\.|ok|err|

### [baseline_tests.txt](./baseline_tests.txt)

`````txt
user: Compose a sonnet about the beauty of a rose.
===
user: Write a soliloquy for a character who feels betrayed by a friend.
===
user: Create a dialogue between two lovers parting ways under a moonlit night.
===
user: Tell a tale of an adventurous knight seeking the Lady of the Lake.
===
user: Pen a lament of a lonely shepherd longing for company.
===
user: Craft a prologue for a play about a tragic hero with a fatal flaw.
===
user: Write a stanza for a song about the fleeting nature of time.
===
user: Construct a letter wherein a noble expresses unrequited love.
===
user: Share a verse on the changing seasons and the passage of time.
===
user: Create a monologue where a queen expresses her inner turmoil over her kingdom.
===
user: Compose a rhyme about a jester who secretly wishes to be a king.
===
user: Draft a quarrel between two siblings vying for their father's approval.
===
user: Write a sonnet dedicated to the twilight hours at dusk.
===
user: Create a parable teaching the virtue of patience.
===
user: Describe a scene in which a prince finds solace in a garden of lilies.
===
user: Narrate the inner thoughts of a sailor lost at sea.
===
user: Script an ode to an ancient oak tree.
===
user: Tell a fable about a fox and a hare learning to share.
===
user: Invent a lyrical exchange between a villain and his conscience.
===
user: Write an elegy for a fallen war hero.
===
user: Devise a soliloquy for a monk questioning his faith.
===
user: Draft a scene where a maiden awaits her lover's return from war.
===
user: Create an allegory illustrating the triumph of hope over despair.
===
user: Wield a dialogue where a ghost seeks vengeance on those who wronged it.
===
user: Construct a scene where a young squire dreams of knighthood.
===
user: Write a poetic comparison between starry skies and ocean waves.
===
user: Paint a picture in words of a bustling medieval marketplace.
===
user: Convey the story of an artist inspired by a fleeting muse.
===
user: Formulate a verse lamenting a kingdom fallen to ruin.
===
user: Script an encounter between a muse and a forlorn poet.
===
user: Articulate a prayer of gratitude for the harvest.
===
user: Weave a narrative of a traveler discovering a hidden valley.
===
user: Compose an epitaph for a beloved pet.
===
user: Chronicle the friendship between a knight and his loyal steed.
===
user: Frame a letter from a crusader returning from distant lands.
===
user: Write a poem about the enchanting music of a forest.
===
user: Design a pledge of loyalty from a servant to his lord.
===
user: Depict a confrontation between two rival monarchs.
===
user: Draft a scene where a widow reflects on her past joys.
===
user: Create a sonnet exploring the nature of dreams.
===
user: Write a tale of a once-vibrant city now shrouded in mystery.
===
user: Compose a ballad of a minstrel wandering the countryside.
===
user: Tell of an epic contest between a mortal and a god.
===
user: Narrate the advent of a new era in an ancient kingdom.
===
user: Paint a portrait in words of a grand castle atop a hill.
===
user: Construct a poetic dialogue where the sun bids farewell to the day.
===
user: Illustrate the longing of a soul striving for freedom.
`````
