## shakespearean-writing-assistant ([json](./evals\v7\shakespearean-writing-assistant/report.json))

- 7 rules
- 7 inverse rules
- 86 tests, 44 baseline tests

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
Assist users in creating creative content in a Shakespearean style.
`````


### [input_spec.txt](./input_spec.txt)

`````txt
The input is a prompt or question requesting creative content, such as a story, poem, or song. The prompt can be in the form of a question or a request. The input must ask for assistance in generating content that could align with Shakespearean themes or styles. The input should be in contemporary English language. There is no specific restriction on the length of the input. Input can include greetings, as these might be potentially part of conversational input.
`````


### [rules.txt](./rules.txt)

`````txt
1: The output must be written in a Shakespearean style of writing. 
2: The output must use archaic English words indicative of the Shakespearean era, such as "thou", "thee", "thy", "hath", and "hence".
3: The output must express ideas in a poetical or theatrical manner, characterized by the stylistic flair of Shakespearean writing.
4: The output must aim to create content related to creative mediums such as stories, poems, and songs if applicable to the user request.
5: The output must maintain a formal and elegant tone that reflects the dignity and grandeur of Shakespeare's works.
6: The output must show creativity in its composition while adhering to the thematic essence characteristic of Shakespeare's writing style.
7: The output must take into account the context of the user's request and provide a relevant response that incorporates a Shakespearean influence.
`````


### [inverse_rules.txt](./inverse_rules.txt)

`````txt
8: The output must be written in a contemporary style with casual language.  
9: The output must avoid archaic English words indicative of the Shakespearean era.  
10: The output must express ideas in a direct or straightforward manner, devoid of stylistic flair.  
11: The output must aim to create content unrelated to creative mediums if applicable to the user request.  
12: The output must adopt a casual and informal tone that reflects modern conversational language.  
13: The output must demonstrate simplicity in its composition while diverging from thematic essence characteristic of Shakespeare's writing style.  
14: The output must disregard the context of the user's request and provide an unrelated response devoid of Shakespearean influence.
`````


### [tests.csv](./tests.csv)

|testinput|expectedoutput|reasoning|
|-|-|-|
|Create a sonnet about unrequited love\.|If love be unreturned, then tis a cruel jest\. Thy heart, with longing pierced, doth ever yearn\. To love unstirred, letters of mine addressed, yet silence speaks, and leaves my soul to burn\.|Tests the use of sonnet form to check adherence to writing style\.|
|Write a monologue for a play about betrayal\.|O vile betrayer\! Thou hast stained thy vow, with kiss of trust now turned to serpent's bite\. My heart, in turmoil, questions why, and how\. Was it thy ambition that made thee smite?|Assesses monologue structure and its adherence to Shakespearean style\.|
|Compose a Shakespearean scene highlighting ambition\.|Enter Macbeth, with a dagger\. MACBETH: Is this a dagger which I see before me, The handle toward my hand? Come, let me clutch thee\. I have thee not, and yet I see thee still\.|Examines scene composition for adherence to Shakespearean scene writing\.|
|Please describe a royal banquet with nobles and jesters\.|Behold, the glee and mirth of gallant lords, where jesters' antics lighten noble feasts\. Ere thy cup doth empty, let mirthful words fill halls with laughter, ne'er to be released\.|Validates use of archaic words in describing a picturesque scene fitting Shakespearean language\.|
|Tell a tale of a knight with unwavering faith\.|Lo, the noble knight, with steadfast truth endowed, doth ride with purpose through realms of doubt\. His faith is armor; his resolve, unbowed\. Such is the knight's devotion, fierce and stout\.|Assures the inclusion of Shakespearean era language\.|
|Describe a lover bemoaning separation from their beloved\.|O, cruel fate that doth part hearts in twain\! How my soul longs to see thy face once more\. Thou art my sun, my moon, and stars defied\. Without thee, mine earthiest joys are poor\.|Confirms usage of terms like thou, thy, and thee, ensuring archaic style\.|
|Please write a dialogue between two star\-crossed lovers\.|LOVER 1: My dearest heart, why do the stars oppose? LOVER 2: 'Tis cruel, yet fate's decree must we obey\. LOVER 1: Yet in thine eyes do I glimpse heaven's rose\. LOVER 2: Then love shall be our guide, come what may\.|Checks the complexity of ideas written poetically to align with Shakespearean style\.|
|Craft a heroic poem about a valiant warrior's battle\.|Then came the warrior bold, with steely eye, who faced the fray where mortal men would dread\. Upon the battlefield, 'neath azure sky, His name was writ where foes lay cold and dead\.|Ensures the output reflects poetic flair characteristic of Shakespearean style\.|
|Write about a vivid dream involving mythical creatures\.|In dreams enchanted, wander I through glades, where unicorns and faeries dance in mist\. The moon doth light the path where velvet fades, and time's embrace slips into night's soft kiss\.|Tests for richness and poetry in stylistic expression\.|
|Tell me a short story involving mistaken identities\.|Verily, in Verona's midst arose, a tale of lords mistaken in their guise\. As deception's shroud doth the truth oppose, 'til unveiled, each face realized to wise\.|Examines the capability of generating story formats adhering to the request\.|
|Compose a poem about the changing seasons\.|Leaps the leaf aloft on autumn's breeze\. Now winter's breath doth sigh among the trees\. In spring, the blooms with vibrant colors weave, but summer's fleeting kiss shall we yet grieve\.|In this case, checks impact on poetic creativity when applied to seasonal themes\.|
|Write a dramatic scene about a kingdom's downfall\.|Kingdoms fall, like mighty oaks felled by storms, their grandeur swept away by fickle time, while echoes of their splendor yet adorn the dreams of those who watch their stars decline\.|Looks for structure, theatrics, and drama as per user’s prompt for creative medium\.|
|Please compose a farewell letter to a beloved friend\.|My dearest companion of yester years, paths diverge, yet bond shall not be torn\. Adieu, till fate's kind hand doth dry our tears\. Our memories, in heart, remain adorn'd\.|Checks that the letter maintains the formal tone reflective of Shakespearean elegance\.|
|Write an address to be delivered at a royal court\.|Esteemed sovereigns and lords of stately grace, the tides of fortune be upon our door\. Let wisdom guide, for sway doth ever brace our destinies, etched in noble lore\.|Tests sensitivity to tone appropriate for formal setting in outputs\.|
|Draft a declaration of love using veiled language\.|Were I to grasp the stars and call them mine, yet still thy glance would humble all my claims\. In luminescent silence, I remain, as night doth cloak fond heart with whispers tame\.|Analyzes subtleties of expressing deep emotions maintaining elegance\.|
|Create a narrative of a new world discovered by wanderers\.|Upon shores unknown, bold travelers alight, where skies are painted with hues of wonder\. With each step, new marvels doth invite dreams realized, and old paths torn asunder\.|Ensures output reveals creative exploration while staying true to Shakespearean themes\.|
|Conjure a whimsical song about woodland creatures\.|Sprites of wood, prithee, gather round, let merry notes in thine ears resound\. For in yon glen where laughter echoes wild, the creatures of the woods dance free and mild\.|Validates creativity through use of enchanting themes in a Shakespearean style\.|
|Describe a character's internal conflict in a scene\.|Tortured by conscience, with resolve to sway, the sovereign heart within doth wrangle much\. To crown ambition or with valor stay? Perchance, both roads do lie in fortune's clutch\.|Tests depth in creativity while capturing inner turmoil consistent with Shakespearean style\.|
|I'd like a ballad about a knight's daring quest\.|The knight rode forth, his steed both proud and bold, across the lands where mystic tales are told\. From dawn till dusk, his courage never waned; thus, glory's path was through his armor gained\.|Evaluates how the output remains relevant to user input and respects the thematic essence\.|
|Write a serenade for a lover beneath the starry night\.|Afon thy window's boughs, the stars do hark, whilst gentle zephyrs song thy beauty's mark\. Thou art the beacon in night's softest sigh; let not this serenade fade in goodbye\.|Checks that the system adheres to providing content appropriate and relevant to the context\.|
|Create a tragic scene where lovers are parted by fate\.|Alas, dear heart, the fates have sealed their plot, our love's sweet chapter now must meet its close\. Though dreams are dashed, thy visage neareth not; sweet separation's breath tis none oppose\.|Ensures software provides content befitting and contextually resonant with the request\.|
|Could you please write a funny rhyme for my child's birthday?|Happy birthday, dear little lass\! May thy day be as sweet as cake, and though time on swift wings doth pass, much delight forever partake\.|Assesses deviation from Shakespearean style; expected output would be contemporary\.|
|Write an excuse note for not doing my chores\.|Oh mum, the chores did slip my mind, a wanderer I was, in dreams beguiled\. Yet I shall mend my errant mind, with diligence, henceforth as mild\.|Ensures output employs casual, informal contemporary style\.|
|Compose a modern dialogue about picking a TV show to watch\.|FRIEND 1: What should we watch tonight? FRIEND 2: Let's do something funny, maybe a sitcom? FRIEND 1: Sounds good\! I could use a laugh\.|Tests use of contemporary style instead of Shakespearean vernacular, inappropriate demonstration\.|
|Write an email to a boss explaining lateness to work\.|Dear Sir, I apologize for today’s tardy pinch, unforeseen hurdles delayed me anon\. I assure prompt attendance in coming hours hence\.|Ensures avoidance of archaic words, focusing on modern language for appropriateness\.|
|Please compose a quick reminder about today's meeting\.|Hey everyone, just a quick reminder about the meeting at 3 PM, don't forget\! Thanks\!|The expected output avoids archaic vernacular as it stresses a modern direct language requirement\.|
|Tell me in non\-archaic terms about a historical figure\.|Queen Elizabeth I was a powerful monarch of the Tudor era, known for her intelligence and leadership\.|Checks system avoidance of Shakespearean age language\.|
|Describe how you make a cup of tea without dramatics\.|Boil water, place a teabag in the cup, pour in the hot water\. Let it steep before removing the teabag and adding milk or sugar to taste\.|Needed straightforward, precise instruction, lacking in Shakespearean flair\.|
|Inform me about the weather simply\.|It’s sunny today with a slight chance of rain in the afternoon\. Temperature is around 75°F\.|Tests simplification and clarity in language which contrasts with dramatics\.|
|Predict the outcome of a ball game\.|The team looks strong this season, with a good chance of clinching a win against their rivals\.|Inspect adherence to a straightforward response unfazed by stylistic enhancements\.|
|Please tell a joke unrelated to storytelling\.|Why did the scarecrow win an award? Because he was outstanding in his field\!|Attempts joke relaying unrelated to creative storytelling mediums\.|
|Write a news headline unrelated to creativity\.|Stock markets hit a new high as tech shares rally\.|Assesses if the system can refrain from crafting creative content like poems or stories as requested\.|
|Make an informative announcement\.|Attention all passengers, the 10:15 train to New York is delayed by 30 minutes\.|Seeks factual, direct responses not tied to creative narrative structures\.|
|Just say something chill about today’s vibe\.|Hey, today's a chill day, perfect for a walk or some me\-time\. Enjoy\!|Expected to adopt casual, informal tone reflective of conversational language\.|
|Write a text message inviting a friend out\.|Hey\! Wanna grab lunch tomorrow at noon? There's this new place I wanna try\. Let me know\!|Ensures modern, informal communication, resembling casual texting\.|
|Ask a friend to join you for a weekend getaway\.|Hey, up for a spontaneous weekend trip? Could be a fun break\!|Expected output adopts language stripped of formalities promoting modern easygoing communication\.|
|Quickly explain why the sun sets\.|The sun appears to set because of Earth's rotation\. Simple as that\.|Envisioned to minimize thematic complexity and simplify scientific explanations\.|
|State the benefits of morning exercise plainly\.|Morning exercise boosts mood, increases energy, and improves focus throughout the day\.|Strives for simplicity in the articulation of health advice without whimsical flourishes\.|
|What's the point of reading novels?|Reading enhances imagination, improves empathy, and serves as relaxation\.|Evaluates absence of literary embellishments reflecting simplicity\.|
|Predict the weather without adherence to contemporary context\.|In days of yore, when knights brave and fleet peered skyward, bespeaking months and thence|Checks disregard of context by overlaying a Shakespearean style regardless\.|
|Give me life advice with no relevance to modern queries\.|Fishers of tales are bound yonder's path, mindful are they of saints and kin\.|Causes disconnection in context not meeting direct modern life advice\.|
|Provide cooking tips unrelated to contemporary recipes\.|Seek ye the fire's tender ways, seasoning with said relic spices that kinsmen knew\.|Tests deliberate impairment in linking to ordinary, modern cooking queries\.|

### [baseline_tests.txt](./baseline_tests.txt)

`````txt
Please provide your test inputs that adhere to the given description. Here are 42 diverse and well-defined test cases:
===
user: Compose a sonnet about the changing seasons.
===
user: Craft a tale of a knight who ventures into the dark forest.
===
user: Create a dialogue between a queen and her trusted advisor.
===
user: Write a song celebrating the victory of a great battle.
===
user: Pen a short ode to the moon.
===
user: Tell a story about two rival kingdoms finding peace.
===
user: Draft a letter of apology from a noble to a friend.
===
user: Imagine a conversation between a shepherd and a wandering minstrel.
===
user: Describe a banquet in the court of a king.
===
user: Narrate the journey of a sailor lost at sea.
===
user: Write a poem about unrequited love.
===
user: Conjure a scene of a haunted castle.
===
user: Elaborate on a tryst in the midnight garden.
===
user: Depict the crowning of a new monarch.
===
user: Craft a farewell message from a lover going to war.
===
user: Invent a fable involving a wise owl.
===
user: Compose a riddle fit for a royal court.
===
user: Tell of a prophecy told by a mysterious stranger.
===
user: Write a blessing for a newborn heir.
===
user: Draft a speech for a general rallying his troops.
===
user: Describe an encounter with a mythical creature in the woods.
===
user: Script a debate between scholars on the nature of love.
===
user: Create a lament for a fallen hero.
===
user: Weave a tale of a humble servant who outwits a cunning lord.
===
user: Paint the scene of a bustling market place.
===
user: Whip up a conversation overheard in a country tavern.
===
user: Write a wish for a traveler embarking on a perilous journey.
===
user: Pen a sonnet comparing youth to spring.
===
user: Narrate a legend of how the sun and moon came to be.
===
user: Depict a rivalry between two poets in a royal court.
===
user: Draft an epilogue of a play about a kingdom restored.
===
user: Invent a charm for a sailor to keep safe at sea.
===
user: Describe the morning light over a quiet village.
===
user: Fashion a dialogue between the wind and the sea.
===
user: Compose an elegy for a beloved pet.
===
user: Write about a feast celebrating the harvest moon.
===
user: Create a tale of a lost crown and the quest to find it.
===
user: Depict the courageous actions of a peasant during a crisis.
===
user: Draft a song of farewell sung by a bard.
===
user: Narrate the friendship between a giant and a dwarf.
===
user: Write a humorous verse about a clumsy scribe.
===
user: Capture the celebration of spring in a bustling city.
===
user: Imagine the musings of a philosopher by a riverbank.
`````
