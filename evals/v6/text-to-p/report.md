## text-to-p ([json](./evals\v6\text-to-p/report.json))

- 8 rules
- 8 inverse rules
- 96 tests, 48 baseline tests

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



### [text-to-p.prompty](./text-to-p.prompty)

`````md
---
name: "Text to P"
description: "Wrap each sentence in a paragraph tag"
source: "GhostWriter: Augmenting Collaborative Human-AI Writing Experiences Through Personalization and Agency"
url: https://arxiv.org/abs/2402.08855.
inputs:
    text:
        type: "string"
---
system:
You are a web developer who is formatting a paragraph of text as HTML.
First, please split the paragraph into individual sentences and wrap each sentence with a <p> tag.
**Your answer should have at least three <p> tags.**
Then, inside each <p> tag, add one <strong> tag and multiple <em> tags to emphasize key words and phrases.
user:
{{text}}
`````


### [intent.txt](./intent.txt)

`````txt
Extract and format a paragraph into HTML by splitting it into sentences and adding specific tags.
`````


### [input_spec.txt](./input_spec.txt)

`````txt
The input is a paragraph of text consisting of multiple sentences. Each input must be a paragraph containing at least three sentences. Sentences should be complete and grammatically correct. Input should contain sufficient textual content to allow for the insertion of at least one <strong> tag and multiple <em> tags within each sentence.
`````


### [rules.txt](./rules.txt)

`````txt
1: The output must consist of HTML formatted text. 
2: Each individual sentence of the provided paragraph must be wrapped in a separate `<p>` tag. 
3: There must be at least three `<p>` tags in the output. 
4: Inside every `<p>` tag, there should be at least one word or phrase wrapped in a `<strong>` tag. 
5: Inside every `<p>` tag, there should be multiple words or phrases wrapped in `<em>` tags. 
6: The tags `<strong>` and `<em>` must be used to emphasize key words and phrases within each `<p>` tag. 
7: The HTML tags used should be correctly formed and closed to maintain valid HTML syntax. 
8: The output should only include the HTML formatted paragraph and should not include any additional text or commentary.
`````


### [inverse_rules.txt](./inverse_rules.txt)

`````txt
9: The output must not consist of HTML formatted text.  
10: Each individual sentence of the provided paragraph must not be wrapped in a separate `<p>` tag.  
11: There must be less than three `<p>` tags in the output.  
12: Inside every `<p>` tag, there should be no word or phrase wrapped in a `<strong>` tag.  
13: Inside every `<p>` tag, there should be no multiple words or phrases wrapped in `<em>` tags.  
14: The tags `<strong>` and `<em>` must not be used to emphasize key words and phrases within each `<p>` tag.  
15: The HTML tags used should be incorrectly formed and left open to disrupt valid HTML syntax.  
16: The output should include additional text or commentary and should not consist only of the HTML formatted paragraph.  
`````


### [tests.csv](./tests.csv)

|testinput|expectedoutput|reasoning|
|-|-|-|
|Cats are fascinating animals\. They have peculiar behaviors\. Many people love keeping them as pets\.|lt;pgt;Cats are lt;stronggt;fascinatinglt;/stronggt; lt;emgt;animalslt;/emgt;\.lt;/pgt;lt;pgt;They have lt;stronggt;peculiarlt;/stronggt; lt;emgt;behaviorslt;/emgt;\.lt;/pgt;lt;pgt;Many people lt;stronggt;lovelt;/stronggt; keeping them as lt;emgt;petslt;/emgt;\.lt;/pgt;|This test verifies that the output is correctly formatted in HTML with proper use of tags\.|
|The sky is blue\. Birds are flying high\. The sun is a beautiful sight\.|lt;pgt;The lt;stronggt;skylt;/stronggt; is lt;emgt;bluelt;/emgt;\.lt;/pgt;lt;pgt;Birds are lt;stronggt;flyinglt;/stronggt; lt;emgt;highlt;/emgt;\.lt;/pgt;lt;pgt;The sun is a lt;stronggt;beautifullt;/stronggt; lt;emgt;sightlt;/emgt;\.lt;/pgt;|Ensures the HTML is generated properly for a simple descriptive paragraph\.|
|Programming is fun\. It challenges your mind\. Solve problems creatively\.|lt;pgt;Programming is lt;stronggt;funlt;/stronggt;\.lt;/pgt;lt;pgt;It lt;stronggt;challengeslt;/stronggt; your lt;emgt;mindlt;/emgt;\.lt;/pgt;lt;pgt;lt;stronggt;Solvelt;/stronggt; problems lt;emgt;creativelylt;/emgt;\.lt;/pgt;|Tests basic HTML structure for formatting sentences\.|
|This is a beautiful day\. We've never seen such weather\. Amazing to experience\.|lt;pgt;This is a lt;stronggt;beautifullt;/stronggt; lt;emgt;daylt;/emgt;\.lt;/pgt;lt;pgt;We've lt;stronggt;neverlt;/stronggt; seen such lt;emgt;weatherlt;/emgt;\.lt;/pgt;lt;pgt;Amazing to lt;stronggt;experiencelt;/stronggt;\.lt;/pgt;|Validates sentence separation by lt;pgt; tags\.|
|A car is a complex machine\. Every component has a specific function\. Engineering is an art\.|lt;pgt;A car is a lt;stronggt;complexlt;/stronggt; lt;emgt;machinelt;/emgt;\.lt;/pgt;lt;pgt;Every lt;stronggt;componentlt;/stronggt; has a specific lt;emgt;functionlt;/emgt;\.lt;/pgt;lt;pgt;Engineering is an lt;stronggt;artlt;/stronggt;\.lt;/pgt;|Checks all sentences are wrapped in lt;pgt; tags\.|
|The mountains are tall\. Rivers flow with grace\. Nature is mesmerizing\.|lt;pgt;The lt;stronggt;mountainslt;/stronggt; are lt;emgt;talllt;/emgt;\.lt;/pgt;lt;pgt;Rivers lt;stronggt;flowlt;/stronggt; with lt;emgt;gracelt;/emgt;\.lt;/pgt;lt;pgt;Nature is lt;stronggt;mesmerizinglt;/stronggt;\.lt;/pgt;|Ensures each sentence is in its own lt;pgt; tag\.|
|Life is unpredictable\. Embrace every moment\. Find joy in simplicity\.|lt;pgt;Life is lt;stronggt;unpredictablelt;/stronggt;\.lt;/pgt;lt;pgt;Embrace every lt;stronggt;momentlt;/stronggt;\.lt;/pgt;lt;pgt;Find lt;stronggt;joylt;/stronggt; in lt;emgt;simplicitylt;/emgt;\.lt;/pgt;|Confirms there are at least three lt;pgt; tags\.|
|Books transport you to different worlds\. They are windows to knowledge\. Reading is a powerful tool\.|lt;pgt;Books lt;stronggt;transportlt;/stronggt; you to different lt;emgt;worldslt;/emgt;\.lt;/pgt;lt;pgt;They are lt;stronggt;windowslt;/stronggt; to lt;emgt;knowledgelt;/emgt;\.lt;/pgt;lt;pgt;Reading is a lt;stronggt;powerfullt;/stronggt; lt;emgt;toollt;/emgt;\.lt;/pgt;|Verifies the presence of the required number of lt;pgt; tags\.|
|Winter brings snow\. Cozy fires warm the evenings\. Hot cocoa comforts the soul\.|lt;pgt;Winter brings lt;stronggt;snowlt;/stronggt;\.lt;/pgt;lt;pgt;Cozy lt;stronggt;fireslt;/stronggt; warm the lt;emgt;eveningslt;/emgt;\.lt;/pgt;lt;pgt;Hot lt;stronggt;cocoalt;/stronggt; comforts the lt;emgt;soullt;/emgt;\.lt;/pgt;|Checks for a minimum number of lt;pgt; tags in the output\.|
|Stars shine brightly\. They illuminate the night sky\. Stargazing is relaxing\.|lt;pgt;Stars lt;stronggt;shinelt;/stronggt; lt;emgt;brightlylt;/emgt;\.lt;/pgt;lt;pgt;They lt;stronggt;illuminatelt;/stronggt; the lt;emgt;nightlt;/emgt; sky\.lt;/pgt;lt;pgt;Stargazing is lt;stronggt;relaxinglt;/stronggt;\.lt;/pgt;|Verifies each sentence has a lt;stronggt; tag within its lt;pgt;\.|
|Music has the power to heal\. Notes create harmony\. Listening brings peace\.|lt;pgt;Music has the lt;stronggt;powerlt;/stronggt; to lt;emgt;heallt;/emgt;\.lt;/pgt;lt;pgt;Notes lt;stronggt;createlt;/stronggt; lt;emgt;harmonylt;/emgt;\.lt;/pgt;lt;pgt;Listening brings lt;stronggt;peacelt;/stronggt;\.lt;/pgt;|Ensures lt;stronggt; tags are present in all lt;pgt; tags\.|
|The wind whispers secrets\. Leaves dance in the breeze\. Quiet moments speak volumes\.|lt;pgt;The wind lt;stronggt;whisperslt;/stronggt; lt;emgt;secretslt;/emgt;\.lt;/pgt;lt;pgt;Leaves lt;stronggt;dancelt;/stronggt; in the lt;emgt;breezelt;/emgt;\.lt;/pgt;lt;pgt;Quiet lt;stronggt;momentslt;/stronggt; speak lt;emgt;volumeslt;/emgt;\.lt;/pgt;|Confirms that lt;stronggt; emphasis is used properly within the lt;pgt; tags\.|
|Innovation drives progress\. New ideas challenge norms\. Creativity fuels discovery\.|lt;pgt;Innovation lt;stronggt;driveslt;/stronggt; lt;emgt;progresslt;/emgt;\.lt;/pgt;lt;pgt;New ideas lt;stronggt;challengelt;/stronggt; lt;emgt;normslt;/emgt;\.lt;/pgt;lt;pgt;Creativity lt;stronggt;fuelslt;/stronggt; lt;emgt;discoverylt;/emgt;\.lt;/pgt;|Checks multiple lt;emgt; tags are used in each lt;pgt;\.|
|Sunrises inspire hope\. The horizon changes hue\. Each dawn is unique\.|lt;pgt;Sunrises lt;stronggt;inspirelt;/stronggt; lt;emgt;hopelt;/emgt;\.lt;/pgt;lt;pgt;The horizon lt;stronggt;changeslt;/stronggt; lt;emgt;huelt;/emgt;\.lt;/pgt;lt;pgt;Each lt;stronggt;dawnlt;/stronggt; is lt;emgt;uniquelt;/emgt;\.lt;/pgt;|Ensures multiple lt;emgt; tags are in every lt;pgt; tag\.|
|Gardens bloom in spring\. Colors burst into view\. Life renews itself naturally\.|lt;pgt;Gardens lt;stronggt;bloomlt;/stronggt; in lt;emgt;springlt;/emgt;\.lt;/pgt;lt;pgt;Colors lt;stronggt;burstlt;/stronggt; into lt;emgt;viewlt;/emgt;\.lt;/pgt;lt;pgt;Life lt;stronggt;renewslt;/stronggt; itself lt;emgt;naturallylt;/emgt;\.lt;/pgt;|Validates the requirement of several lt;emgt; tags within each lt;pgt; tag\.|
|Adventure awaits at every turn\. Exploration reveals new paths\. Wander with curiosity\.|lt;pgt;Adventure lt;stronggt;awaitslt;/stronggt; at every lt;emgt;turnlt;/emgt;\.lt;/pgt;lt;pgt;Exploration lt;stronggt;revealslt;/stronggt; new lt;emgt;pathslt;/emgt;\.lt;/pgt;lt;pgt;Wander with lt;stronggt;curiositylt;/stronggt;\.lt;/pgt;|Tests the use of both lt;stronggt; and lt;emgt; for emphasis within lt;pgt; tags\.|
|Technology evolves swiftly\. Gadgets connect people globally\. Innovation shapes the future\.|lt;pgt;Technology lt;stronggt;evolveslt;/stronggt; lt;emgt;swiftlylt;/emgt;\.lt;/pgt;lt;pgt;Gadgets lt;stronggt;connectlt;/stronggt; people lt;emgt;globallylt;/emgt;\.lt;/pgt;lt;pgt;Innovation lt;stronggt;shapeslt;/stronggt; the lt;emgt;futurelt;/emgt;\.lt;/pgt;|Ensures proper emphasis with both tag types\.|
|The ocean is vast\. Waves dance on the surface\. Depths hold mysteries unknown\.|lt;pgt;The lt;stronggt;oceanlt;/stronggt; is lt;emgt;vastlt;/emgt;\.lt;/pgt;lt;pgt;Waves lt;stronggt;dancelt;/stronggt; on the lt;emgt;surfacelt;/emgt;\.lt;/pgt;lt;pgt;Depths hold lt;stronggt;mysterieslt;/stronggt; lt;emgt;unknownlt;/emgt;\.lt;/pgt;|Confirms lt;stronggt; and lt;emgt; tags emphasize key parts of the sentence\.|
|Butterflies flutter by\. Flowers sway in the breeze\. Nature sings a silent song\.|lt;pgt;Butterflies lt;stronggt;flutterlt;/stronggt; by\.lt;/pgt;lt;pgt;Flowers lt;stronggt;swaylt;/stronggt; in the lt;emgt;breezelt;/emgt;\.lt;/pgt;lt;pgt;Nature lt;stronggt;singslt;/stronggt; a lt;emgt;silentlt;/emgt; song\.lt;/pgt;|Tests HTML tags are correctly formed and closed\.|
|Snowflakes blanket the ground\. Winter's hush is everywhere\. Serenity in white\.|lt;pgt;Snowflakes lt;stronggt;blanketlt;/stronggt; the ground\.lt;/pgt;lt;pgt;Winter's lt;stronggt;hushlt;/stronggt; is lt;emgt;everywherelt;/emgt;\.lt;/pgt;lt;pgt;Serenity in lt;stronggt;whitelt;/stronggt;\.lt;/pgt;|Ensures no missing or unclosed tags\.|
|Music fills the air\. Melodies resonate through time\. The heart hears the notes\.|lt;pgt;Music lt;stronggt;fillslt;/stronggt; the lt;emgt;airlt;/emgt;\.lt;/pgt;lt;pgt;Melodies lt;stronggt;resonatelt;/stronggt; through lt;emgt;timelt;/emgt;\.lt;/pgt;lt;pgt;The lt;stronggt;heartlt;/stronggt; hears the lt;emgt;noteslt;/emgt;\.lt;/pgt;|Verifies correct HTML syntax and closure\.|
|Cities bustle with life\. Streets echo stories of people\. An orchestra of human activity\.|lt;pgt;Cities lt;stronggt;bustlelt;/stronggt; with lt;emgt;lifelt;/emgt;\.lt;/pgt;lt;pgt;Streets lt;stronggt;echolt;/stronggt; stories of lt;emgt;peoplelt;/emgt;\.lt;/pgt;lt;pgt;An lt;stronggt;orchestralt;/stronggt; of lt;emgt;human activitylt;/emgt;\.lt;/pgt;|Ensures only HTML paragraph is included without extra text\.|
|Rain gardens thrive in cities\. Storms nourish these green oases\. Balance within urban environments\.|lt;pgt;Rain lt;stronggt;gardenslt;/stronggt; thrive in cities\.lt;/pgt;lt;pgt;Storms lt;stronggt;nourishlt;/stronggt; these green lt;emgt;oaseslt;/emgt;\.lt;/pgt;lt;pgt;Balance within lt;stronggt;urbanlt;/stronggt; lt;emgt;environmentslt;/emgt;\.lt;/pgt;|Validates that no additional commentary is present\.|
|Artists paint with colors of emotion\. Canvas tells tales untold\. Creativity knows no limits\.|lt;pgt;Artists lt;stronggt;paintlt;/stronggt; with colors of lt;emgt;emotionlt;/emgt;\.lt;/pgt;lt;pgt;Canvas lt;stronggt;tellslt;/stronggt; lt;emgt;tales untoldlt;/emgt;\.lt;/pgt;lt;pgt;Creativity lt;stronggt;knowslt;/stronggt; no lt;emgt;limitslt;/emgt;\.lt;/pgt;|Checks for exclusive presence of HTML without commentaries\.|
|Rainbows are colorful\. They appear after rain showers\. Kids love chasing them\.|Rainbows are colorful\. They appear after rain showers\. Kids love chasing them\.|Tests software outputs plain text without HTML formatting\.|
|Birds chirp in the morning\. They signal a fresh start\. It's a joy to hear\.|Birds chirp in the morning\. They signal a fresh start\. It's a joy to hear\.|Ensures output does not mistakenly apply HTML formatting\.|
|Books are portals to new worlds\. Stories can change perspectives\. Reading expands the mind\.|Books are portals to new worlds\. Stories can change perspectives\. Reading expands the mind\.|Validates that the output is plain text, not HTML\.|
|The car is fast\. It zooms past the highway\. Exciting to watch\.|The car is fast\. It zooms past the highway\. Exciting to watch\.|Ensures sentences are not wrapped individually in lt;pgt; tags\.|
|Mountains touch the sky\. Birds soar above crests\. Valleys treasure hidden secrets\.|Mountains touch the sky\. Birds soar above crests\. Valleys treasure hidden secrets\.|Confirms absence of lt;pgt; tags in output\.|
|Autumn leaves fall gracefully\. Trees prepare for winter\. The cycle continues\.|Autumn leaves fall gracefully\. Trees prepare for winter\. The cycle continues\.|Verifies no lt;pgt; tag is wrapping the sentences\.|
|Art inspires creativity\. Expression is limitless\. Imagination knows no bounds\.|lt;pgt;Art inspires creativity\.lt;/pgt;|Checks output with less than three lt;pgt; tags\.|
|The moon glows at night\. Stars twinkle alongside\. A canvas of the universe\.|lt;pgt;The moon glows at night\.lt;/pgt;lt;pgt;Stars twinkle alongside\.lt;/pgt;|Ensures output features fewer than three lt;pgt; tags in total\.|
|Summer days are long\. Sunsets are beautiful\. Beaches invite relaxation\.|lt;pgt;Summer days are long\.lt;/pgt;|Validates output fails to include the minimum number of lt;pgt; tags\.|
|Languages express cultures\. They hold identities\. Communication is vital\.|lt;pgt;Languages express cultures\.lt;/pgt;lt;pgt;They hold identities\.lt;/pgt;lt;pgt;Communication is vital\.lt;/pgt;|Tests lt;pgt; tags have no lt;stronggt; emphasized text\.|
|Chefs create flavors\. Meals are made with passion\. Cuisine connects us all\.|lt;pgt;Chefs create flavors\.lt;/pgt;lt;pgt;Meals are made with passion\.lt;/pgt;lt;pgt;Cuisine connects us all\.lt;/pgt;|Verifies lt;pgt; tags without lt;stronggt; elements\.|
|Gardens bloom in different colors\. Bees buzz around flowers\. Life thrives naturally\.|lt;pgt;Gardens bloom in different colors\.lt;/pgt;lt;pgt;Bees buzz around flowers\.lt;/pgt;lt;pgt;Life thrives naturally\.lt;/pgt;|Confirms lt;pgt; tags lack lt;stronggt; tags\.|
|Dreams motivate action\. Passion fuels success\. Believe in endless possibilities\.|lt;pgt;Dreams motivate action\.lt;/pgt;lt;pgt;Passion fuels success\.lt;/pgt;lt;pgt;Believe in endless possibilities\.lt;/pgt;|Ensures no lt;emgt; tags are within the lt;pgt; tags\.|
|Windmills harness energy\. They stand against time\. Renewable sources are critical\.|lt;pgt;Windmills harness energy\.lt;/pgt;lt;pgt;They stand against time\.lt;/pgt;lt;pgt;Renewable sources are critical\.lt;/pgt;|Verifies absence of lt;emgt; tags in each lt;pgt;\.|
|Dogs are loyal companions\. Pets bring joy to life\. They are part of the family\.|lt;pgt;Dogs are loyal companions\.lt;/pgt;lt;pgt;Pets bring joy to life\.lt;/pgt;lt;pgt;They are part of the family\.lt;/pgt;|Validation of missing lt;emgt; tags in output\.|
|The forest is dense\. Birds sing sweet songs\. A walk calms the soul\.|lt;pgt;The forest is dense\.lt;/pgt;lt;pgt;Birds sing sweet songs\.lt;/pgt;lt;pgt;A walk calms the soul\.lt;/pgt;|Confirms no use of lt;stronggt; or lt;emgt; tags in each lt;pgt;\.|
|Exercise is important\. It strengthens the body\. Health is wealth\.|lt;pgt;Exercise is important\.lt;/pgt;lt;pgt;It strengthens the body\.lt;/pgt;lt;pgt;Health is wealth\.lt;/pgt;|Verifies no lt;stronggt; and lt;emgt; tags are used\.|
|Fires warm the cold nights\. Logs crackle in the hearth\. The glow is comforting\.|lt;pgt;Fires warm the cold nights\.lt;/pgt;lt;pgt;Logs crackle in the hearth\.lt;/pgt;lt;pgt;The glow is comforting\.lt;/pgt;|Ensures neither lt;stronggt; nor lt;emgt; tags are present\.|
|Music lifts the spirit\. Harmony touches the heart\. Rhythm ties us together\.|lt;pgt;Music lt;stronggt;liftslt;/stronggt; the lt;emgt;spiritlt;/stronglt;pgt;lt;emgt;Harmonylt;/emgt; touches the lt;stronggt;heart\.lt;/emgt;lt;pgt;Rhythm lt;stronggt;tieslt;/stronggt; us lt;emgt;togetherlt;pgt;|Tests HTML syntax errors by intentionally leaving tags unclosed\.|
|The snow falls silently\. Blankets of white cover the land\. A peaceful winter scene\.|lt;pgt;The lt;stronggt;snow lt;emgt;falls silentlylt;pgt;lt;stronggt;Blanketslt;/stronggt; of lt;emgt;whitelt;/emgt; cover the lt;emgt;landlt;/pgt;lt;pgt;A lt;stronggt;peacefullt;/pgt;|Ensures HTML is incorrectly formed with missing tag closures\.|
|Heroes inspire us\. They face impossible challenges\. Courage defines their journey\.|lt;stronggt;lt;pgt;Heroes lt;emgt;inspire uslt;/pgt;lt;/emgt;lt;pgt;lt;stronggt;They facelt;/stronggt; impossible lt;emgt;challengeslt;/emlt;pgt;Courage defines lt;stronggt;their journeylt;/stronggt;lt;/pgt;|Deliberately malformed HTML for testing unclosed tags\.|
|It rains often in autumn\. The smell of wet earth is refreshing\. Clouds pass swiftly overhead\.|lt;pgt;It lt;stronggt;rains oftenlt;/stronggt; in lt;emgt;autumnlt;/emgt;\.lt;/pgt;lt;pgt;The smell of lt;stronggt;wet earthlt;/stronggt; is lt;emgt;refreshinglt;/emgt;\.lt;/pgt;lt;pgt;Clouds pass lt;stronggt;swiftlylt;/stronggt; overhead\.lt;/pgt;Note: The above tags illustrate expected HTML output\.|Tests that unnecessary commentary is added\.|
|Paintings evoke emotions\. Colors and brush strokes tell a story\. Art is timeless\.|lt;pgt;Paintings lt;stronggt;evokelt;/stronggt; lt;emgt;emotionslt;/emgt;\.lt;/pgt;lt;pgt;Colors and lt;stronggt;brush strokeslt;/stronggt; tell a lt;emgt;storylt;/emgt;\.lt;/pgt;lt;pgt;Art is lt;stronggt;timelesslt;/stronggt;\.lt;/pgt;HTML formatting is demonstrated here,|Validates additional text presence post\-output\.|
|Bridges connect places\. They symbolize unity and collaboration\. Engineering marvels\.|lt;pgt;Bridges lt;stronggt;connectlt;/stronggt; lt;emgt;placeslt;/emgt;\.lt;/pgt;lt;pgt;They symbolize lt;stronggt;unitylt;/stronggt; and lt;emgt;collaborationlt;/emgt;\.lt;/pgt;lt;pgt;Engineering lt;stronggt;marvelslt;/stronggt;\.lt;/pgt;End of formatted paragraph\.|Confirms added commentary after HTML output\.|

### [test_evals.csv](./test_evals.csv)

|rule|model|input|coverage|validity|
|-|-|-|-|-|
|The output must consist of HTML formatted text\.|gpt\-4o\-2024\-08\-06|Cats are fascinating animals\. They have peculiar behaviors\. Many people love keeping them as pets\.|\`\`\`html<br>lt;pgt;Cats are lt;stronggt;fascinatinglt;/stronggt; animals\. They have lt;emgt;uniquelt;/emgt; and lt;emgt;curiouslt;/emgt; qualities that attract many admirers\.lt;/pgt;<br>lt;pgt;They have lt;stronggt;peculiarlt;/stronggt; behaviors, often lt;emgt;mesmerizinglt;/emgt; and lt;emgt;delightfullt;/emgt; to observe\.lt;/pgt;<br>lt;pgt;Many people lt;stronggt;lovelt;/stronggt; keeping them as pets due to their lt;emgt;independentlt;/emgt; and lt;emgt;affectionatelt;/emgt; nature\.lt;/pgt;<br>\`\`\`|ok|
|The output must consist of HTML formatted text\.|gpt\-4o\-2024\-08\-06|The sky is blue\. Birds are flying high\. The sun is a beautiful sight\.|\`\`\`html<br>lt;pgt;The lt;stronggt;skylt;/stronggt; is lt;emgt;bluelt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Birdslt;/stronggt; are lt;emgt;flyinglt;/emgt; high\.lt;/pgt;<br>lt;pgt;The lt;emgt;sunlt;/emgt; is a lt;stronggt;beautifullt;/stronggt; sight\.lt;/pgt;<br>\`\`\`|err|
|The output must consist of HTML formatted text\.|gpt\-4o\-2024\-08\-06|Programming is fun\. It challenges your mind\. Solve problems creatively\.|\`\`\`html<br>lt;pgt;lt;stronggt;Programminglt;/stronggt; is lt;emgt;funlt;/emgt;\.lt;/pgt;<br>lt;pgt;It lt;stronggt;challengeslt;/stronggt; your lt;emgt;mindlt;/emgt;\.lt;/pgt;<br>lt;pgt;Solve lt;emgt;problemslt;/emgt; lt;stronggt;creativelylt;/stronggt;\.lt;/pgt;<br>\`\`\`|err|
|Each individual sentence of the provided paragraph must be wrapped in a separate \`lt;pgt;\` tag\.|gpt\-4o\-2024\-08\-06|This is a beautiful day\. We've never seen such weather\. Amazing to experience\.|\`\`\`html<br>lt;pgt;This is a lt;stronggt;beautifullt;/stronggt; day\. We've never lt;emgt;seenlt;/emgt; such lt;emgt;weatherlt;/emgt;\.lt;/pgt;<br>lt;pgt;Amazing to lt;stronggt;experiencelt;/stronggt;\.lt;/pgt;<br>\`\`\`|err|
|Each individual sentence of the provided paragraph must be wrapped in a separate \`lt;pgt;\` tag\.|gpt\-4o\-2024\-08\-06|A car is a complex machine\. Every component has a specific function\. Engineering is an art\.|\`\`\`html<br>lt;pgt;A lt;stronggt;carlt;/stronggt; is a lt;emgt;complexlt;/emgt; machine\.lt;/pgt;<br>lt;pgt;Every lt;stronggt;componentlt;/stronggt; has a lt;emgt;specificlt;/emgt; function\.lt;/pgt;<br>lt;pgt;lt;stronggt;Engineeringlt;/stronggt; is an lt;emgt;artlt;/emgt;\.lt;/pgt;<br>\`\`\`|err|
|Each individual sentence of the provided paragraph must be wrapped in a separate \`lt;pgt;\` tag\.|gpt\-4o\-2024\-08\-06|The mountains are tall\. Rivers flow with grace\. Nature is mesmerizing\.|\`\`\`html<br>lt;pgt;The lt;stronggt;mountainslt;/stronggt; are lt;emgt;talllt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Riverslt;/stronggt; flow with lt;emgt;gracelt;/emgt;\.lt;/pgt;<br>lt;pgt;Nature is lt;emgt;mesmerizinglt;/emgt; and lt;stronggt;beautifullt;/stronggt;\.lt;/pgt;<br>\`\`\`|err|
|There must be at least three \`lt;pgt;\` tags in the output\.|gpt\-4o\-2024\-08\-06|Life is unpredictable\. Embrace every moment\. Find joy in simplicity\.|lt;pgt;lt;stronggt;Lifelt;/stronggt; is lt;emgt;unpredictablelt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Embracelt;/stronggt; lt;emgt;everylt;/emgt; moment\.lt;/pgt;<br>lt;pgt;Find lt;stronggt;joylt;/stronggt; in lt;emgt;simplicitylt;/emgt;\.lt;/pgt;|err|
|There must be at least three \`lt;pgt;\` tags in the output\.|gpt\-4o\-2024\-08\-06|Books transport you to different worlds\. They are windows to knowledge\. Reading is a powerful tool\.|\`\`\`html<br>lt;pgt;lt;stronggt;Bookslt;/stronggt; lt;emgt;transportlt;/emgt; you to lt;emgt;different worldslt;/emgt;\.lt;/pgt;<br>lt;pgt;They are lt;stronggt;windowslt;/stronggt; to lt;emgt;knowledgelt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Readinglt;/stronggt; is a lt;emgt;powerful toollt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|There must be at least three \`lt;pgt;\` tags in the output\.|gpt\-4o\-2024\-08\-06|Winter brings snow\. Cozy fires warm the evenings\. Hot cocoa comforts the soul\.|\`\`\`html<br>lt;pgt;Winter brings lt;emgt;snowlt;/emgt;\. The lt;stronggt;winterlt;/stronggt; season can be both lt;emgt;beautifullt;/emgt; and lt;emgt;challenginglt;/emgt;\.lt;/pgt;<br>lt;pgt;Cozy fires lt;stronggt;warmlt;/stronggt; the lt;emgt;eveningslt;/emgt;\. This creates a lt;emgt;gentlelt;/emgt; and lt;emgt;soothinglt;/emgt; atmosphere\.lt;/pgt;<br>lt;pgt;Hot cocoa lt;stronggt;comfortslt;/stronggt; the lt;emgt;soullt;/emgt;\. It provides a lt;emgt;delightfullt;/emgt; and lt;emgt;warminglt;/emgt; experience\.lt;/pgt;<br>\`\`\`|err|
|Inside every \`lt;pgt;\` tag, there should be at least one word or phrase wrapped in a \`lt;stronggt;\` tag\.|gpt\-4o\-2024\-08\-06|Stars shine brightly\. They illuminate the night sky\. Stargazing is relaxing\.|\`\`\`html<br>lt;pgt;lt;stronggt;Starslt;/stronggt; lt;emgt;shinelt;/emgt; lt;emgt;brightlylt;/emgt;\.lt;/pgt;<br>lt;pgt;They lt;emgt;illuminatelt;/emgt; the lt;stronggt;nightlt;/stronggt; lt;emgt;skylt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Stargazinglt;/stronggt; is lt;emgt;relaxinglt;/emgt;\.lt;/pgt;<br>\`\`\`|err|
|Inside every \`lt;pgt;\` tag, there should be at least one word or phrase wrapped in a \`lt;stronggt;\` tag\.|gpt\-4o\-2024\-08\-06|Music has the power to heal\. Notes create harmony\. Listening brings peace\.|\`\`\`html<br>lt;pgt;Music has the lt;stronggt;powerlt;/stronggt; to lt;emgt;heallt;/emgt;\.lt;/pgt;<br>lt;pgt;Notes lt;stronggt;createlt;/stronggt; lt;emgt;harmonylt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;emgt;Listeninglt;/emgt; brings lt;stronggt;peacelt;/stronggt;\.lt;/pgt;<br>\`\`\`|err|
|Inside every \`lt;pgt;\` tag, there should be at least one word or phrase wrapped in a \`lt;stronggt;\` tag\.|gpt\-4o\-2024\-08\-06|The wind whispers secrets\. Leaves dance in the breeze\. Quiet moments speak volumes\.|\`\`\`html<br>lt;pgt;The lt;stronggt;windlt;/stronggt; whispers lt;emgt;secretslt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Leaveslt;/stronggt; lt;emgt;dancelt;/emgt; in the lt;emgt;breezelt;/emgt;\.lt;/pgt;<br>lt;pgt;Quiet lt;stronggt;momentslt;/stronggt; lt;emgt;speak volumeslt;/emgt;\.lt;/pgt;<br>\`\`\`|err|
|Inside every \`lt;pgt;\` tag, there should be multiple words or phrases wrapped in \`lt;emgt;\` tags\.|gpt\-4o\-2024\-08\-06|Innovation drives progress\. New ideas challenge norms\. Creativity fuels discovery\.|\`\`\`html<br>lt;pgt;lt;stronggt;Innovationlt;/stronggt; drives lt;emgt;progresslt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;emgt;New ideaslt;/emgt; challenge lt;stronggt;normslt;/stronggt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Creativitylt;/stronggt; fuels lt;emgt;discoverylt;/emgt;\.lt;/pgt;<br>\`\`\`|err|
|Inside every \`lt;pgt;\` tag, there should be multiple words or phrases wrapped in \`lt;emgt;\` tags\.|gpt\-4o\-2024\-08\-06|Sunrises inspire hope\. The horizon changes hue\. Each dawn is unique\.|\`\`\`html<br>lt;pgt;lt;stronggt;Sunriseslt;/stronggt; lt;emgt;inspirelt;/emgt; lt;emgt;hopelt;/emgt;\.lt;/pgt;<br>lt;pgt;The lt;stronggt;horizonlt;/stronggt; changes lt;emgt;huelt;/emgt;\.lt;/pgt;<br>lt;pgt;Each lt;emgt;dawnlt;/emgt; is lt;stronggt;uniquelt;/stronggt;\.lt;/pgt;<br>\`\`\`|err|
|Inside every \`lt;pgt;\` tag, there should be multiple words or phrases wrapped in \`lt;emgt;\` tags\.|gpt\-4o\-2024\-08\-06|Gardens bloom in spring\. Colors burst into view\. Life renews itself naturally\.|\`\`\`html<br>lt;pgt;lt;stronggt;Gardenslt;/stronggt; lt;emgt;bloomlt;/emgt; in lt;emgt;springlt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Colorslt;/stronggt; lt;emgt;burstlt;/emgt; into lt;emgt;viewlt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Lifelt;/stronggt; lt;emgt;renews itselflt;/emgt; lt;emgt;naturallylt;/emgt;\.lt;/pgt;<br>\`\`\`|err|
|The tags \`lt;stronggt;\` and \`lt;emgt;\` must be used to emphasize key words and phrases within each \`lt;pgt;\` tag\.|gpt\-4o\-2024\-08\-06|Adventure awaits at every turn\. Exploration reveals new paths\. Wander with curiosity\.|\`\`\`html<br>lt;pgt;Adventure lt;stronggt;awaitslt;/stronggt; at every lt;emgt;turnlt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;emgt;Explorationlt;/emgt; reveals new lt;stronggt;pathslt;/stronggt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Wanderlt;/stronggt; with lt;emgt;curiositylt;/emgt;\.lt;/pgt;<br>\`\`\`|err|
|The tags \`lt;stronggt;\` and \`lt;emgt;\` must be used to emphasize key words and phrases within each \`lt;pgt;\` tag\.|gpt\-4o\-2024\-08\-06|Technology evolves swiftly\. Gadgets connect people globally\. Innovation shapes the future\.|\`\`\`html<br>lt;pgt;lt;stronggt;Technologylt;/stronggt; lt;emgt;evolveslt;/emgt; lt;emgt;swiftlylt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Gadgetslt;/stronggt; lt;emgt;connectlt;/emgt; people lt;emgt;globallylt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Innovationlt;/stronggt; lt;emgt;shapeslt;/emgt; the lt;emgt;futurelt;/emgt;\.lt;/pgt;<br>\`\`\`|err|
|The tags \`lt;stronggt;\` and \`lt;emgt;\` must be used to emphasize key words and phrases within each \`lt;pgt;\` tag\.|gpt\-4o\-2024\-08\-06|The ocean is vast\. Waves dance on the surface\. Depths hold mysteries unknown\.|\`\`\`html<br>lt;pgt;The lt;stronggt;oceanlt;/stronggt; is lt;emgt;vastlt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Waveslt;/stronggt; lt;emgt;dancelt;/emgt; on the lt;emgt;surfacelt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;emgt;Depthslt;/emgt; hold lt;stronggt;mysterieslt;/stronggt; lt;emgt;unknownlt;/emgt;\.lt;/pgt;<br>\`\`\`|err|
|The HTML tags used should be correctly formed and closed to maintain valid HTML syntax\.|gpt\-4o\-2024\-08\-06|Butterflies flutter by\. Flowers sway in the breeze\. Nature sings a silent song\.|\`\`\`html<br>lt;pgt;lt;stronggt;Butterflieslt;/stronggt; lt;emgt;flutterlt;/emgt; by\.lt;/pgt;<br>lt;pgt;lt;stronggt;Flowerslt;/stronggt; lt;emgt;swaylt;/emgt; in the lt;emgt;breezelt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Naturelt;/stronggt; lt;emgt;singslt;/emgt; a lt;emgt;silentlt;/emgt; song\.lt;/pgt;<br>\`\`\`|err|
|The HTML tags used should be correctly formed and closed to maintain valid HTML syntax\.|gpt\-4o\-2024\-08\-06|Snowflakes blanket the ground\. Winter's hush is everywhere\. Serenity in white\.|\`\`\`html<br>lt;pgt;lt;stronggt;Snowflakeslt;/stronggt; lt;emgt;blanketlt;/emgt; the lt;emgt;groundlt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Winter'slt;/stronggt; lt;emgt;hushlt;/emgt; is lt;emgt;everywherelt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Serenitylt;/stronggt; in lt;emgt;whitelt;/emgt;\.lt;/pgt;<br>\`\`\`|err|
|The HTML tags used should be correctly formed and closed to maintain valid HTML syntax\.|gpt\-4o\-2024\-08\-06|Music fills the air\. Melodies resonate through time\. The heart hears the notes\.|\`\`\`html<br>lt;pgt;Music fills the lt;emgt;airlt;/emgt;\. Melodies lt;stronggt;resonatelt;/stronggt; through time\.lt;/pgt;<br>lt;pgt;The lt;stronggt;heartlt;/stronggt; hears the lt;emgt;noteslt;/emgt;\.lt;/pgt;<br>\`\`\`|err|
|The output should only include the HTML formatted paragraph and should not include any additional text or commentary\.|gpt\-4o\-2024\-08\-06|Cities bustle with life\. Streets echo stories of people\. An orchestra of human activity\.|\`\`\`html<br>lt;pgt;The lt;emgt;citieslt;/emgt; lt;stronggt;bustlelt;/stronggt; with lt;emgt;lifelt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;emgt;Streetslt;/emgt; echo lt;stronggt;storieslt;/stronggt; of lt;emgt;peoplelt;/emgt;\.lt;/pgt;<br>lt;pgt;An lt;stronggt;orchestralt;/stronggt; of lt;emgt;humanlt;/emgt; lt;emgt;activitylt;/emgt;\.lt;/pgt;<br>\`\`\`|err|
|The output should only include the HTML formatted paragraph and should not include any additional text or commentary\.|gpt\-4o\-2024\-08\-06|Rain gardens thrive in cities\. Storms nourish these green oases\. Balance within urban environments\.|\`\`\`html<br>lt;pgt;lt;stronggt;Rain gardenslt;/stronggt; lt;emgt;thrivelt;/emgt; in lt;emgt;citieslt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;emgt;Stormslt;/emgt; nourish these lt;stronggt;green oaseslt;/stronggt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Balancelt;/stronggt; within lt;emgt;urban environmentslt;/emgt;\.lt;/pgt;<br>\`\`\`|err|
|The output should only include the HTML formatted paragraph and should not include any additional text or commentary\.|gpt\-4o\-2024\-08\-06|Artists paint with colors of emotion\. Canvas tells tales untold\. Creativity knows no limits\.|\`\`\`html<br>lt;pgt;lt;stronggt;Artistslt;/stronggt; paint with lt;emgt;colorslt;/emgt; of lt;emgt;emotionlt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Canvaslt;/stronggt; tells lt;emgt;taleslt;/emgt; lt;emgt;untoldlt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Creativitylt;/stronggt; knows no lt;emgt;limitslt;/emgt;\.lt;/pgt;<br>\`\`\`|err|
|The output must not consist of HTML formatted text\.|gpt\-4o\-2024\-08\-06|Rainbows are colorful\. They appear after rain showers\. Kids love chasing them\.|\`\`\`html<br>lt;pgt;lt;stronggt;Rainbowslt;/stronggt; are lt;emgt;colorfullt;/emgt; and are a lt;emgt;beautiful sightlt;/emgt; in the sky\.lt;/pgt;<br>lt;pgt;They lt;emgt;oftenlt;/emgt; appear lt;stronggt;afterlt;/stronggt; rain lt;emgt;showerslt;/emgt;, stretching across the sky\.lt;/pgt;<br>lt;pgt;lt;stronggt;Kidslt;/stronggt; love lt;emgt;chasinglt;/emgt; them, filled with lt;emgt;excitementlt;/emgt; and wonder\.lt;/pgt;<br>\`\`\`|err|
|The output must not consist of HTML formatted text\.|gpt\-4o\-2024\-08\-06|Birds chirp in the morning\. They signal a fresh start\. It's a joy to hear\.|\`\`\`html<br>lt;pgt;lt;stronggt;Birdslt;/stronggt; lt;emgt;chirplt;/emgt; in the lt;emgt;morninglt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Theylt;/stronggt; lt;emgt;signallt;/emgt; a lt;emgt;fresh startlt;/emgt;\.lt;/pgt;<br>lt;pgt;It's a lt;stronggt;joylt;/stronggt; to lt;emgt;hearlt;/emgt;\.lt;/pgt;<br>\`\`\`|err|
|The output must not consist of HTML formatted text\.|gpt\-4o\-2024\-08\-06|Books are portals to new worlds\. Stories can change perspectives\. Reading expands the mind\.|\`\`\`html<br>lt;pgt;Books are lt;stronggt;portalslt;/stronggt; to lt;emgt;new worldslt;/emgt;\.lt;/pgt;<br>lt;pgt;Stories can lt;stronggt;changelt;/stronggt; lt;emgt;perspectiveslt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Readinglt;/stronggt; expands the lt;emgt;mindlt;/emgt;\.lt;/pgt;<br>\`\`\`|err|
|Each individual sentence of the provided paragraph must not be wrapped in a separate \`lt;pgt;\` tag\.|gpt\-4o\-2024\-08\-06|The car is fast\. It zooms past the highway\. Exciting to watch\.|\`\`\`html<br>lt;pgt;The lt;stronggt;carlt;/stronggt; is lt;emgt;fastlt;/emgt;\.lt;/pgt;<br>lt;pgt;It lt;stronggt;zoomslt;/stronggt; lt;emgt;past the highwaylt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;emgt;Excitinglt;/emgt; to lt;stronggt;watchlt;/stronggt;\.lt;/pgt;<br>\`\`\`|err|
|Each individual sentence of the provided paragraph must not be wrapped in a separate \`lt;pgt;\` tag\.|gpt\-4o\-2024\-08\-06|Mountains touch the sky\. Birds soar above crests\. Valleys treasure hidden secrets\.|\`\`\`html<br>lt;pgt;lt;stronggt;Mountainslt;/stronggt; lt;emgt;touchlt;/emgt; the lt;emgt;skylt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Birdslt;/stronggt; lt;emgt;soarlt;/emgt; above lt;emgt;crestslt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Valleyslt;/stronggt; lt;emgt;treasurelt;/emgt; hidden lt;emgt;secretslt;/emgt;\.lt;/pgt;<br>\`\`\`|err|
|Each individual sentence of the provided paragraph must not be wrapped in a separate \`lt;pgt;\` tag\.|gpt\-4o\-2024\-08\-06|Autumn leaves fall gracefully\. Trees prepare for winter\. The cycle continues\.|lt;pgt;lt;stronggt;Autumnlt;/stronggt; leaves lt;emgt;falllt;/emgt; lt;emgt;gracefullylt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Treeslt;/stronggt; lt;emgt;preparelt;/emgt; for lt;emgt;winterlt;/emgt;\.lt;/pgt;<br>lt;pgt;The lt;emgt;cyclelt;/emgt; lt;stronggt;continueslt;/stronggt;\.lt;/pgt;|err|
|There must be less than three \`lt;pgt;\` tags in the output\.|gpt\-4o\-2024\-08\-06|Art inspires creativity\. Expression is limitless\. Imagination knows no bounds\.|\`\`\`html<br>lt;pgt;Art lt;stronggt;inspireslt;/stronggt; lt;emgt;creativitylt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Expressionlt;/stronggt; is lt;emgt;limitlesslt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Imaginationlt;/stronggt; lt;emgt;knowslt;/emgt; no lt;emgt;boundslt;/emgt;\.lt;/pgt;<br>\`\`\`|err|
|There must be less than three \`lt;pgt;\` tags in the output\.|gpt\-4o\-2024\-08\-06|The moon glows at night\. Stars twinkle alongside\. A canvas of the universe\.|\`\`\`html<br>lt;pgt;The lt;stronggt;moonlt;/stronggt; lt;emgt;glowslt;/emgt; at lt;emgt;nightlt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Starslt;/stronggt; lt;emgt;twinklelt;/emgt; alongside\.lt;/pgt;<br>lt;pgt;A lt;stronggt;canvaslt;/stronggt; of the lt;emgt;universelt;/emgt;\.lt;/pgt;<br>\`\`\`|err|
|There must be less than three \`lt;pgt;\` tags in the output\.|gpt\-4o\-2024\-08\-06|Summer days are long\. Sunsets are beautiful\. Beaches invite relaxation\.|lt;pgt;lt;stronggt;Summerlt;/stronggt; days are lt;emgt;longlt;/emgt; and lt;emgt;sunnylt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Sunsetslt;/stronggt; are exceptionally lt;emgt;beautifullt;/emgt; in the lt;emgt;eveninglt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;emgt;Beacheslt;/emgt; invite lt;stronggt;relaxationlt;/stronggt; and lt;emgt;enjoymentlt;/emgt;\.lt;/pgt;|err|
|Inside every \`lt;pgt;\` tag, there should be no word or phrase wrapped in a \`lt;stronggt;\` tag\.|gpt\-4o\-2024\-08\-06|Languages express cultures\. They hold identities\. Communication is vital\.|\`\`\`html<br>lt;pgt;lt;stronggt;Languageslt;/stronggt; express lt;emgt;cultureslt;/emgt;\.lt;/pgt;<br>lt;pgt;They hold lt;stronggt;identitieslt;/stronggt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Communicationlt;/stronggt; is lt;emgt;vitallt;/emgt;\.lt;/pgt;<br>\`\`\`|err|
|Inside every \`lt;pgt;\` tag, there should be no word or phrase wrapped in a \`lt;stronggt;\` tag\.|gpt\-4o\-2024\-08\-06|Chefs create flavors\. Meals are made with passion\. Cuisine connects us all\.|lt;pgt;Chefs create lt;stronggt;flavorslt;/stronggt;\. lt;emgt;Flavorslt;/emgt; are the heart of every dish, and lt;emgt;great chefslt;/emgt; know how to balance them\.lt;/pgt;<br>lt;pgt;Meals are made with lt;stronggt;passionlt;/stronggt;\. Each dish reflects the lt;emgt;dedicationlt;/emgt; and lt;emgt;effortlt;/emgt; put into crafting it\.lt;/pgt;<br>lt;pgt;Cuisine connects us lt;stronggt;alllt;/stronggt;\. It's a lt;emgt;universal languagelt;/emgt; that brings people from lt;emgt;different cultureslt;/emgt; together\.lt;/pgt;|err|
|Inside every \`lt;pgt;\` tag, there should be no word or phrase wrapped in a \`lt;stronggt;\` tag\.|gpt\-4o\-2024\-08\-06|Gardens bloom in different colors\. Bees buzz around flowers\. Life thrives naturally\.|lt;pgt;Gardens lt;stronggt;bloomlt;/stronggt; in lt;emgt;differentlt;/emgt; lt;emgt;colorslt;/emgt;\.lt;/pgt;<br>lt;pgt;Bees lt;stronggt;buzzlt;/stronggt; around lt;emgt;flowerslt;/emgt;\.lt;/pgt;<br>lt;pgt;Life lt;stronggt;thriveslt;/stronggt; lt;emgt;naturallylt;/emgt;\.lt;/pgt;|err|
|Inside every \`lt;pgt;\` tag, there should be no multiple words or phrases wrapped in \`lt;emgt;\` tags\.|gpt\-4o\-2024\-08\-06|Dreams motivate action\. Passion fuels success\. Believe in endless possibilities\.|\`\`\`html<br>lt;pgt;lt;emgt;Dreamslt;/emgt; motivate lt;stronggt;actionlt;/stronggt;\. They drive us to lt;emgt;aimlt;/emgt; higher and lt;emgt;achievelt;/emgt; our lt;emgt;goalslt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Passionlt;/stronggt; fuels lt;emgt;successlt;/emgt;\. It ignites the lt;emgt;determinationlt;/emgt; needed to overcome lt;emgt;challengeslt;/emgt;\.lt;/pgt;<br>lt;pgt;Believe in lt;stronggt;endless possibilitieslt;/stronggt;\. This mindset opens the door to countless lt;emgt;opportunitieslt;/emgt; and lt;emgt;growthlt;/emgt;\.lt;/pgt;<br>\`\`\`|err|
|Inside every \`lt;pgt;\` tag, there should be no multiple words or phrases wrapped in \`lt;emgt;\` tags\.|gpt\-4o\-2024\-08\-06|Windmills harness energy\. They stand against time\. Renewable sources are critical\.|\`\`\`html<br>lt;pgt;lt;stronggt;Windmillslt;/stronggt; lt;emgt;harnesslt;/emgt; lt;emgt;energylt;/emgt;\.lt;/pgt;<br>lt;pgt;They lt;stronggt;standlt;/stronggt; lt;emgt;againstlt;/emgt; lt;emgt;timelt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Renewablelt;/stronggt; sources are lt;emgt;criticallt;/emgt;\.lt;/pgt;<br>\`\`\`|err|
|Inside every \`lt;pgt;\` tag, there should be no multiple words or phrases wrapped in \`lt;emgt;\` tags\.|gpt\-4o\-2024\-08\-06|Dogs are loyal companions\. Pets bring joy to life\. They are part of the family\.|\`\`\`html<br>lt;pgt;lt;stronggt;Dogslt;/stronggt; are lt;emgt;loyallt;/emgt; lt;emgt;companionslt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Petslt;/stronggt; bring lt;emgt;joylt;/emgt; to lt;emgt;lifelt;/emgt;\.lt;/pgt;<br>lt;pgt;They are part of the lt;stronggt;familylt;/stronggt;\.lt;/pgt;<br>\`\`\`|err|
|The tags \`lt;stronggt;\` and \`lt;emgt;\` must not be used to emphasize key words and phrases within each \`lt;pgt;\` tag\.|gpt\-4o\-2024\-08\-06|The forest is dense\. Birds sing sweet songs\. A walk calms the soul\.|\`\`\`html<br>lt;pgt;The lt;stronggt;forestlt;/stronggt; is lt;emgt;denselt;/emgt;\. Trees stand lt;emgt;talllt;/emgt; and lt;emgt;proudlt;/emgt;, creating a lt;emgt;canopylt;/emgt; that lt;emgt;filterslt;/emgt; the sunlight\.lt;/pgt;<br>lt;pgt;lt;stronggt;Birdslt;/stronggt; sing lt;emgt;sweetlt;/emgt; songs, filling the lt;emgt;airlt;/emgt; with their lt;emgt;melodieslt;/emgt;\. Each note lt;emgt;resonateslt;/emgt; through the lt;emgt;brancheslt;/emgt;, echoing the lt;emgt;harmonylt;/emgt; of nature\.lt;/pgt;<br>lt;pgt;A walk lt;stronggt;calmslt;/stronggt; the lt;emgt;soullt;/emgt;\. The rhythmic lt;emgt;crunchlt;/emgt; of leaves underfoot lt;emgt;sootheslt;/emgt; the mind and lt;emgt;bodylt;/emgt;\.lt;/pgt;<br>\`\`\`|err|
|The tags \`lt;stronggt;\` and \`lt;emgt;\` must not be used to emphasize key words and phrases within each \`lt;pgt;\` tag\.|gpt\-4o\-2024\-08\-06|Exercise is important\. It strengthens the body\. Health is wealth\.|\`\`\`html<br>lt;pgt;Exercise is lt;emgt;importantlt;/emgt;\. It lt;stronggt;strengthenslt;/stronggt; the lt;emgt;bodylt;/emgt;\.lt;/pgt;<br>lt;pgt;It strengthens the lt;emgt;bodylt;/emgt;\.lt;/pgt;<br>lt;pgt;Health is lt;stronggt;wealthlt;/stronggt;\.lt;/pgt;<br>\`\`\`|err|
|The tags \`lt;stronggt;\` and \`lt;emgt;\` must not be used to emphasize key words and phrases within each \`lt;pgt;\` tag\.|gpt\-4o\-2024\-08\-06|Fires warm the cold nights\. Logs crackle in the hearth\. The glow is comforting\.|\`\`\`html<br>lt;pgt;lt;emgt;Fireslt;/emgt; lt;stronggt;warmlt;/stronggt; the cold nights\.lt;/pgt;<br>lt;pgt;Logs lt;emgt;cracklelt;/emgt; in the lt;stronggt;hearthlt;/stronggt;\.lt;/pgt;<br>lt;pgt;The lt;stronggt;glowlt;/stronggt; is lt;emgt;comfortinglt;/emgt;\.lt;/pgt;<br>\`\`\`|err|
|The HTML tags used should be incorrectly formed and left open to disrupt valid HTML syntax\.|gpt\-4o\-2024\-08\-06|Music lifts the spirit\. Harmony touches the heart\. Rhythm ties us together\.|\`\`\`html<br>lt;pgt;Music lt;stronggt;liftslt;/stronggt; the lt;emgt;spiritlt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Harmonylt;/stronggt; touches the lt;emgt;heartlt;/emgt;\.lt;/pgt;<br>lt;pgt;Rhythm lt;emgt;tieslt;/emgt; us lt;stronggt;togetherlt;/stronggt;\.lt;/pgt;<br>\`\`\`|err|
|The HTML tags used should be incorrectly formed and left open to disrupt valid HTML syntax\.|gpt\-4o\-2024\-08\-06|The snow falls silently\. Blankets of white cover the land\. A peaceful winter scene\.|\`\`\`html<br>lt;pgt;The snow lt;stronggt;fallslt;/stronggt; lt;emgt;silentlylt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Blanketslt;/stronggt; of white lt;emgt;coverlt;/emgt; the lt;emgt;landlt;/emgt;\.lt;/pgt;<br>lt;pgt;A lt;emgt;peacefullt;/emgt; lt;stronggt;winterlt;/stronggt; lt;emgt;scenelt;/emgt;\.lt;/pgt;<br>\`\`\`|err|
|The HTML tags used should be incorrectly formed and left open to disrupt valid HTML syntax\.|gpt\-4o\-2024\-08\-06|Heroes inspire us\. They face impossible challenges\. Courage defines their journey\.|\`\`\`html<br>lt;pgt;lt;stronggt;Heroeslt;/stronggt; lt;emgt;inspirelt;/emgt; us\.lt;/pgt;<br>lt;pgt;They lt;stronggt;facelt;/stronggt; lt;emgt;impossible challengeslt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Couragelt;/stronggt; lt;emgt;defineslt;/emgt; their journey\.lt;/pgt;<br>\`\`\`|err|
|The output should include additional text or commentary and should not consist only of the HTML formatted paragraph\.|gpt\-4o\-2024\-08\-06|It rains often in autumn\. The smell of wet earth is refreshing\. Clouds pass swiftly overhead\.|\`\`\`html<br>lt;pgt;It lt;stronggt;rainslt;/stronggt; often in lt;emgt;autumnlt;/emgt;\.lt;/pgt;<br>lt;pgt;The lt;stronggt;smelllt;/stronggt; of wet lt;emgt;earthlt;/emgt; is lt;emgt;refreshinglt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Cloudslt;/stronggt; pass lt;emgt;swiftlylt;/emgt; overhead\.lt;/pgt;<br>\`\`\`|err|
|The output should include additional text or commentary and should not consist only of the HTML formatted paragraph\.|gpt\-4o\-2024\-08\-06|Paintings evoke emotions\. Colors and brush strokes tell a story\. Art is timeless\.|\`\`\`html<br>lt;pgt;lt;stronggt;Paintingslt;/stronggt; evoke lt;emgt;emotionslt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Colorslt;/stronggt; and lt;emgt;brush strokeslt;/emgt; tell a story\.lt;/pgt;<br>lt;pgt;lt;stronggt;Artlt;/stronggt; is lt;emgt;timelesslt;/emgt;\.lt;/pgt;<br>\`\`\`|err|
|The output should include additional text or commentary and should not consist only of the HTML formatted paragraph\.|gpt\-4o\-2024\-08\-06|Bridges connect places\. They symbolize unity and collaboration\. Engineering marvels\.|\`\`\`html<br>lt;pgt;Bridges lt;emgt;connectlt;/emgt; lt;stronggt;placeslt;/stronggt;\.lt;/pgt;<br>lt;pgt;They lt;emgt;symbolizelt;/emgt; lt;stronggt;unitylt;/stronggt; and lt;emgt;collaborationlt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Engineeringlt;/stronggt; lt;emgt;marvelslt;/emgt;\.lt;/pgt;<br>\`\`\`|err|

### [baseline_tests.txt](./baseline_tests.txt)

`````txt
text: "This is a test sentence. Another example sentence is here. Please ignore this placeholder."
===
text: "The sun shines brightly today. Birds are chirping everywhere. It is a perfect day for a walk."
===
text: "HTML is a markup language for creating web pages. It provides the structure for page content. CSS is used for styling."
===
text: "Software development is a creative process. It involves writing code to solve problems. Debugging is often necessary."
===
text: "A healthy diet consists of various nutrients. Fruits and vegetables are essential. Protein is also important."
===
text: "Traveling broadens the mind. Visiting new places is exciting. Meeting new people is enriching."
===
text: "Technology is rapidly evolving. Smartphones are widely used. The Internet of Things is growing."
===
text: "Reading books is a great hobby. It improves vocabulary. Fiction and non-fiction are both enjoyable."
===
text: "Exercise is crucial for maintaining health. Cardiovascular activities strengthen the heart. Strength training builds muscles."
===
text: "Music has a universal appeal. Different genres cater to varied tastes. Live concerts are exhilarating."
===
text: "Art expresses creativity. Painting and sculpture are classic forms. Modern art includes various mediums."
===
text: "Education shapes future generations. Schools provide foundational knowledge. Higher education focuses on specialization."
===
text: "Cooking is a valuable skill. It can be both practical and enjoyable. Trying new recipes is rewarding."
===
text: "Climate change is an urgent issue. Renewable energy sources are gaining attention. Conservation efforts are essential."
===
text: "Social media connects people worldwide. It is a platform for sharing information. Privacy concerns are rising."
===
text: "Gardening can be a relaxing hobby. Plants enhance the environment. Growing vegetables offers fresh produce."
===
text: "Mindfulness promotes mental well-being. Meditation helps reduce stress. Positive thinking impacts overall health."
===
text: "Photography captures moments in time. It is both an art and a science. Digital cameras offer versatility."
===
text: "Space exploration is a frontier of science. Satellites orbit the Earth. Humans have landed on the moon."
===
text: "Robotics is a fascinating field. Robots can perform various tasks. Artificial intelligence aids decision-making."
===
text: "History teaches lessons from the past. Ancient civilizations had unique cultures. Historical preservation is important."
===
text: "Fashion trends change frequently. Styles vary by season and region. Personal expression is reflected in clothing."
===
text: "Oceanography explores marine environments. The vast oceans are full of life. Conservation efforts protect marine biodiversity."
===
text: "Philosophy delves into fundamental questions. It examines ethics, logic, and existence. Diverse branches offer different perspectives."
===
text: "Programming languages enable software creation. Each language has unique features. Selecting the right one depends on the project."
===
text: "Artificial intelligence is transforming industries. Machine learning models analyze data. Automation is becoming more common."
===
text: "Renewable energy sources are vital. Solar and wind power are sustainable. These alternatives can reduce pollution."
===
text: "Nutrition impacts health significantly. Balanced diets support well-being. Macronutrients and micronutrients are essential."
===
text: "Human anatomy is complex and intricate. Each organ has a specific function. The study of anatomy aids medical knowledge."
===
text: "The animal kingdom is diverse. Each species plays a role in its ecosystem. Conservation efforts are crucial for protection."
===
text: "The human brain is remarkable. It governs body functions and processes thoughts. Neuroscience studies its complexities."
===
text: "Astronomy explores celestial bodies. Telescopes reveal distant galaxies. Space missions expand our understanding."
===
text: "Mathematics is foundational to many disciplines. It offers tools for problem-solving. Algebra and calculus are fundamental branches."
===
text: "Chemistry studies matter and its interactions. Chemical reactions drive many processes. Organic chemistry focuses on carbon compounds."
===
text: "Physics explains natural phenomena. It covers topics from mechanics to quantum theory. Experiments validate physical principles."
===
text: "Biology explores life in various forms. Genetics examines heredity and variation. Ecology focuses on organisms in their environments."
===
text: "Geology studies the Earth. It examines rocks, minerals, and landforms. Plate tectonics explains the movement of continents."
===
text: "Economics analyzes resource distribution. It considers supply and demand. Fiscal policies influence economic growth."
===
text: "Psychology examines human behavior. It considers emotions, cognition, and motivation. Various therapies address mental health issues."
===
text: "Political science studies governance systems. It considers policy analysis and public opinion. Democracy and authoritarianism are types of governance."
===
text: "Sociology examines societies and interactions. It considers social structures and institutions. Cultural norms shape behavior."
===
text: "Anthropology explores human societies and cultures. It includes archaeology and cultural anthropology. Research provides insights into human evolution."
===
text: "Language is a powerful communication tool. It varies across cultures and communities. Linguistics studies language structure and evolution."
===
text: "Literature enriches culture and education. Novels, poetry, and plays offer diverse narratives. Literary analysis explores themes and symbolism."
===
text: "Engineering applies scientific principles. It designs solutions to technical challenges. Civil, mechanical, and electrical are major branches."
===
text: "Environmental science examines ecosystems. It addresses pollution and climate change. Sustainable practices are increasingly important."
===
text: "Business studies organizational operations. It considers management, marketing, and finance. Strategic planning guides business growth."
===
text: "Architecture is both art and science. It designs functional and aesthetic structures. Urban planning addresses city development."
`````
