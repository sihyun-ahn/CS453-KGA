## text-to-p ([json](./evals\v7\text-to-p/report.json))

- 7 rules
- 6 inverse rules
- 78 tests, 39 baseline tests

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
Format a paragraph of text as HTML with specific tag requirements.
`````


### [input_spec.txt](./input_spec.txt)

`````txt
The input is a paragraph of text that needs to be formatted as HTML.  
The paragraph must be long enough to contain at least three sentences.  
The paragraph can include words or phrases that can be emphasized using <strong> and <em> tags.
`````


### [rules.txt](./rules.txt)

`````txt
1: The output must be formatted as HTML. 
2: The paragraph must be split into individual sentences.
3: Each sentence must be wrapped with a <p> tag.
4: There must be at least three <p> tags in the output.
5: Inside each <p> tag, there must be at least one <strong> tag.
6: Inside each <p> tag, there must be multiple <em> tags to emphasize key words and phrases.
7: The output must ensure that all HTML tags are correctly opened and closed, maintaining a valid HTML structure.
`````


### [inverse_rules.txt](./inverse_rules.txt)

`````txt
7: The output must be formatted as plain text.
8: The paragraph must remain as a single block of text.
9: There must be no <p> tags in the output.
10: Inside each paragraph, there must not be any <strong> tags.
11: Inside each paragraph, there must not be any <em> tags to emphasize key words and phrases.
12: The output must ensure that all characters are plain text, with no HTML structure whatsoever.
`````


### [tests.csv](./tests.csv)

|testinput|expectedoutput|reasoning|
|-|-|-|
|The sun rises in the east\. The moon is visible at night\. Stars twinkle brightly\.|lt;pgt;The sun rises in the east\.lt;/pgt;lt;pgt;The moon is visible at night\.lt;/pgt;lt;pgt;Stars twinkle brightly\.lt;/pgt;|Tests HTML output for a simple three\-sentence paragraph\.|
|Art can be interpreted in many ways\. Colors evoke emotions\. Lines define space\.|lt;pgt;Art can be interpreted in many ways\.lt;/pgt;lt;pgt;Colors evoke emotions\.lt;/pgt;lt;pgt;Lines define space\.lt;/pgt;|Verifies HTML output for valid three\-sentence input containing simple words\.|
|Technology advances rapidly\. Innovations lead to new discoveries\. Society adapts slowly\.|lt;pgt;Technology advances rapidly\.lt;/pgt;lt;pgt;Innovations lead to new discoveries\.lt;/pgt;lt;pgt;Society adapts slowly\.lt;/pgt;|Checks HTML output consistency for a valid input describing technology\.|
|The cat sits on the mat\. Dogs bark loudly\. Birds chirp in the morning\.|lt;pgt;The cat sits on the mat\.lt;/pgt;lt;pgt;Dogs bark loudly\.lt;/pgt;lt;pgt;Birds chirp in the morning\.lt;/pgt;|Ensures the paragraph is split into sentences\.|
|Programming languages evolve\. Developers write efficient code\. Bugs need fixing\.|lt;pgt;Programming languages evolve\.lt;/pgt;lt;pgt;Developers write efficient code\.lt;/pgt;lt;pgt;Bugs need fixing\.lt;/pgt;|Validates sentence separation in differently themed input\.|
|Markets fluctuate daily\. Investors study trends\. Stocks gain value\.|lt;pgt;Markets fluctuate daily\.lt;/pgt;lt;pgt;Investors study trends\.lt;/pgt;lt;pgt;Stocks gain value\.lt;/pgt;|Confirms appropriate sentence splitting for financial\-themed text\.|
|Life is beautiful\. We cherish every moment\. Live with purpose\.|lt;pgt;Life is beautiful\.lt;/pgt;lt;pgt;We cherish every moment\.lt;/pgt;lt;pgt;Live with purpose\.lt;/pgt;|Verifies each sentence is correctly wrapped with a lt;pgt; tag\.|
|Music soothes the soul\. Songs tell stories\. Notes create harmony\.|lt;pgt;Music soothes the soul\.lt;/pgt;lt;pgt;Songs tell stories\.lt;/pgt;lt;pgt;Notes create harmony\.lt;/pgt;|Assures each sentence receives a lt;pgt; tag in musical context\.|
|Mountains stand tall\. Valleys remain low\. Rivers flow endlessly\.|lt;pgt;Mountains stand tall\.lt;/pgt;lt;pgt;Valleys remain low\.lt;/pgt;lt;pgt;Rivers flow endlessly\.lt;/pgt;|Checks lt;pgt; tag wrapping for geographical sentences\.|
|Water is essential\. We drink it daily\. Rivers and lakes supply it\.|lt;pgt;Water is essential\.lt;/pgt;lt;pgt;We drink it daily\.lt;/pgt;lt;pgt;Rivers and lakes supply it\.lt;/pgt;|Validates presence of three lt;pgt; tags in water\-related sentences\.|
|Books open new worlds\. Authors share insights\. Readers gain knowledge\.|lt;pgt;Books open new worlds\.lt;/pgt;lt;pgt;Authors share insights\.lt;/pgt;lt;pgt;Readers gain knowledge\.lt;/pgt;|Ensures at least three lt;pgt; tags for book\-related input\.|
|History educates us\. Lessons are learned\. Mistakes are avoided\.|lt;pgt;History educates us\.lt;/pgt;lt;pgt;Lessons are learned\.lt;/pgt;lt;pgt;Mistakes are avoided\.lt;/pgt;|Confirms at least three lt;pgt; tags in historical context\.|
|The sky is blue\. Grass is green\. Sunsets are stunning\.|lt;pgt;The sky is lt;stronggt;bluelt;/stronggt;\.lt;/pgt;lt;pgt;Grass is lt;stronggt;greenlt;/stronggt;\.lt;/pgt;lt;pgt;Sunsets are lt;stronggt;stunninglt;/stronggt;\.lt;/pgt;|Ensures at least one lt;stronggt; tag is included in each sentence\.|
|Apples are red\. Bananas are yellow\. Grapes are purple\.|lt;pgt;Apples are lt;stronggt;redlt;/stronggt;\.lt;/pgt;lt;pgt;Bananas are lt;stronggt;yellowlt;/stronggt;\.lt;/pgt;lt;pgt;Grapes are lt;stronggt;purplelt;/stronggt;\.lt;/pgt;|Confirms at least one lt;stronggt; tag for each fruit description sentence\.|
|Cities are crowded\. Villages are serene\. Beaches are relaxing\.|lt;pgt;Cities are lt;stronggt;crowdedlt;/stronggt;\.lt;/pgt;lt;pgt;Villages are lt;stronggt;serenelt;/stronggt;\.lt;/pgt;lt;pgt;Beaches are lt;stronggt;relaxinglt;/stronggt;\.lt;/pgt;|Verifies presence of lt;stronggt; tags for each setting description\.|
|Winter brings snow\. Spring brings flowers\. Summer brings heat\.|lt;pgt;lt;emgt;Winterlt;/emgt; brings lt;emgt;snowlt;/emgt;\.lt;/pgt;lt;pgt;lt;emgt;Springlt;/emgt; brings lt;emgt;flowerslt;/emgt;\.lt;/pgt;lt;pgt;lt;emgt;Summerlt;/emgt; brings lt;emgt;heatlt;/emgt;\.lt;/pgt;|Ensures multiple lt;emgt; tags are used in seasonal descriptions\.|
|Artists paint visions\. Writers pen ideas\. Musicians compose tunes\.|lt;pgt;lt;emgt;Artistslt;/emgt; paint lt;emgt;visionslt;/emgt;\.lt;/pgt;lt;pgt;lt;emgt;Writerslt;/emgt; pen lt;emgt;ideaslt;/emgt;\.lt;/pgt;lt;pgt;lt;emgt;Musicianslt;/emgt; compose lt;emgt;tuneslt;/emgt;\.lt;/pgt;|Checks presence of multiple lt;emgt; tags in artistic context\.|
|Cars run fast\. Bicycles ride slower\. Trains travel far\.|lt;pgt;lt;emgt;Carslt;/emgt; run lt;emgt;fastlt;/emgt;\.lt;/pgt;lt;pgt;lt;emgt;Bicycleslt;/emgt; ride lt;emgt;slowerlt;/emgt;\.lt;/pgt;lt;pgt;lt;emgt;Trainslt;/emgt; travel lt;emgt;farlt;/emgt;\.lt;/pgt;|Verifies use of multiple lt;emgt; tags in transportation descriptions\.|
|Exercise improves health\. Meditation calms the mind\. Diet boosts energy\.|lt;pgt;Exercise improves health\.lt;/pgt;lt;pgt;Meditation calms the mind\.lt;/pgt;lt;pgt;Diet boosts energy\.lt;/pgt;|Confirms all tags are correctly opened and closed, maintaining HTML validity\.|
|Birds fly high\. Fish swim deep\. Animals live free\.|lt;pgt;Birds fly high\.lt;/pgt;lt;pgt;Fish swim deep\.lt;/pgt;lt;pgt;Animals live free\.lt;/pgt;|Ensures valid HTML structure for each nature\-themed sentence\.|
|Math is logical\. Science is experimental\. History is informative\.|lt;pgt;Math is logical\.lt;/pgt;lt;pgt;Science is experimental\.lt;/pgt;lt;pgt;History is informative\.lt;/pgt;|Checks the valid HTML formation throughout the academic\-themed sentences\.|
|The quick brown fox jumps over the lazy dog\. Cats sleep all day\. Dogs bark at strangers\.|Text as plain text: The quick brown fox jumps over the lazy dog\. Cats sleep all day\. Dogs bark at strangers\.|Test HTML formatting interpreted as plain text, conflicting with the rule\.|
|Cooking is an art\. Baking requires precision\. Grilling enhances flavors\.|Text as plain text: Cooking is an art\. Baking requires precision\. Grilling enhances flavors\.|Examines whether HTML can be mistaken for plain text output in cooking theme\.|
|Rain falls from the sky\. Clouds gather in the horizon\. Storms brew unpredictably\.|Text as plain text: Rain falls from the sky\. Clouds gather in the horizon\. Storms brew unpredictably\.|Uses a weather context to challenge HTML formatting interpreted as plain text\.|
|Television entertains\. Radio informs\. Internet connects\.|Television entertains\. Radio informs\. Internet connects\.|Tests a single block of text output, despite split into sentences\.|
|Laughter is the best medicine\. Smiles are contagious\. Happiness is shared\.|Laughter is the best medicine\. Smiles are contagious\. Happiness is shared\.|Verifies compliance by maintaining a paragraph as a single block despite potential sentence breaks\.|
|Mountains rise\. Valleys fall\. Oceans expand\.|Mountains rise\. Valleys fall\. Oceans expand\.|Checks the single block of text maintenance contrary to sentence splitting\.|
|Nature is beautiful\. Animals are diverse\. Plants are essential\.|Nature is beautiful\. Animals are diverse\. Plants are essential\.|Ensures compliance of no lt;pgt; tags in the generated output\.|
|Love enriches life\. Friendship strengthens bonds\. Family supports\.|Love enriches life\. Friendship strengthens bonds\. Family supports\.|Checks removal of lt;pgt; tags, focusing on social relationships\.|
|Technology simplifies tasks\. Automation increases efficiency\. Growth follows innovation\.|Technology simplifies tasks\. Automation increases efficiency\. Growth follows innovation\.|Validates the absence of lt;pgt; tags in technology\-related paragraph\.|
|Birds fly high\. Fish swim deep\. Animals roam the earth\.|Birds fly high\. Fish swim deep\. Animals roam the earth\.|Confirms no lt;stronggt; tags are present in the structured paragraph\.|
|Time passes\. Memories fade\. New opportunities arise\.|Time passes\. Memories fade\. New opportunities arise\.|Checks that no lt;stronggt; tags exist in paragraph about time and opportunities\.|
|Art inspires\. Music intrigues\. Dance liberates\.|Art inspires\. Music intrigues\. Dance liberates\.|Ensures the removal of lt;stronggt; tags in art\-related paragraph\.|
|Dawn breaks\. Day progresses\. Dusk sets\.|Dawn breaks\. Day progresses\. Dusk sets\.|Validates that no lt;emgt; tags are used for emphasizing keywords in the paragraph\.|
|Innovation drives change\. Society evolves\. Culture adapts\.|Innovation drives change\. Society evolves\. Culture adapts\.|Checks for absence of lt;emgt; tags in change\-centric paragraph\.|
|Learning is continuous\. Growth is endless\. Exploration is key\.|Learning is continuous\. Growth is endless\. Exploration is key\.|Verifies lack of lt;emgt; tags in education\-themed paragraph\.|
|The universe is vast\. Stars are numerous\. Galaxies span light\-years\.|The universe is vast\. Stars are numerous\. Galaxies span light\-years\.|Ensures output maintains all characters as plain text, defying HTML structure\.|
|Ideas ignite change\. Actions cement them\. Results speak volumes\.|Ideas ignite change\. Actions cement them\. Results speak volumes\.|Checks that no HTML tags exist by ensuring plain text compliance\.|
|Paths intertwine\. Journeys diverge\. Destinations await\.|Paths intertwine\. Journeys diverge\. Destinations await\.|Validates the complete removal of HTML structure, presenting it solely as text\.|

### [baseline_tests.txt](./baseline_tests.txt)

`````txt
text: The quick brown fox jumps over the lazy dog. This sentence is famous for using every letter in the English alphabet. It is often used to test typewriters and keyboards for functionality.
===
text: The sun sets in the west. Stars begin to twinkle in the night sky. Owls hoot softly as night embraces the world.
===
text: The cat sat on the mat. This is often seen in beginner language exercises. Such simple sentences can be powerful in teaching.
===
text: In a distant land, there was a great kingdom. The king ruled with fairness and wisdom. People in his kingdom were happy and prosperous.
===
text: Reading books can increase knowledge. It improves vocabulary and comprehension skills. People who read regularly tend to understand complex topics better.
===
text: Music has the power to change the mood. Different genres appeal to different emotions. Listening to music can be a therapeutic experience for many people.
===
text: Technology is advancing at a rapid pace. New inventions make life easier. However, they also bring challenges to privacy and security.
===
text: Cooking can be a fun and creative activity. Trying out new recipes can be rewarding. It’s a delightful way to explore cultures.
===
text: The rain came pouring down suddenly. Children loved splashing in the puddles. It was a scene filled with laughter and joy.
===
text: Spring is the season of renewal. Flowers bloom and trees regain their leaves. It's a time of growth and new beginnings.
===
text: Travel opens up new perspectives. It allows learning about different cultures. Explorers have been doing it for centuries.
===
text: The internet has connected the world like never before. Information is now at our fingertips. This can be both a blessing and a curse.
===
text: Dogs are known for their loyalty. They are often called man's best friend. Their companionship is cherished across the globe.
===
text: Exercise is crucial for maintaining health. It strengthens the muscles and boosts the immune system. Regular physical activity is important for a balanced lifestyle.
===
text: Marine life is diverse and fascinating. The ocean covers about seventy percent of Earth's surface. Preserving this vital ecosystem is crucial for biodiversity.
===
text: Painting is a form of expression. Artists convey emotions through their work. Every brushstroke tells a part of their story.
===
text: Sports bring people together in celebration. They teach discipline and teamwork. Watching a game can be thrilling and emotional.
===
text: Time management is essential for productivity. It helps in prioritizing tasks effectively. People achieve more when they plan their schedule wisely.
===
text: Gardening can be a peaceful hobby. It connects people with nature. Growing plants from seeds is a rewarding experience.
===
text: Learning a new language opens new doors. It enhances communication skills. Multilingual individuals can work in diverse environments.
===
text: The mountains stood towering above the village. Snow capped their peaks year-round. They were a majestic sight to behold.
===
text: Social media has transformed how we interact. It allows for immediate communication. There are also concerns about privacy and mental health.
===
text: Writing helps in organizing thoughts. Journals and diaries capture personal journeys. Many find solace in expressing emotions through words.
===
text: A well-balanced diet is vital for good health. It provides necessary nutrients to the body. Eating variety is important to ensure balance in meals.
===
text: Adventure stories captivate young minds. They introduce heroes who conquer challenges. Such tales inspire bravery and courage in readers.
===
text: Artificial intelligence is shaping future industries. Machines are learning tasks that require human intelligence. Ethical considerations are necessary in its development.
===
text: The forest was alive with the sound of chirping birds. Every tree stood tall and proud. Sunlight filtered through the canopy, creating patterns on the ground.
===
text: Exploring new cities brings excitement and wonder. Architecture reveals the history of the place. Tasting local cuisine offers immersive experiences.
===
text: The world of science offers endless possibilities. Scientists work tirelessly to make breakthroughs. Their discoveries have improved the quality of life.
===
text: Comedy can bring joy and laughter. It helps people relax and forget worries. Stand-up comedians are skilled in delivering humor.
===
text: Rivers flow gently through countryside terrains. They provide water and sustain life. Many civilizations have thrived on their banks.
===
text: Fashion often reflects cultural influences. Designers innovate with colors and patterns. Trends change, but personal style remains timeless.
===
text: Libraries are treasure troves of knowledge. They house books from diverse genres. Many people find solace in the quiet corners of a library.
===
text: Dancing is a form of celebration. It connects people through movement and rhythm. Cultures all over the world have unique dance styles.
===
text: Economies rely on trade and commerce. Global markets fluctuate due to various factors. Understanding these dynamics is crucial for businesses.
===
text: Poetry captures emotions in succinct lines. Poets use words to paint vivid images. It's a powerful medium for expressing feelings and thoughts.
===
text: The ocean's tides ebb and flow. They bring life and shape coastlines. Understanding tides is important for maritime navigation.
===
text: Festivals bring communities together in joy. They celebrate heritage and traditions. Such gatherings spread happiness and foster unity.
===
text: History books recount tales of past events. They provide lessons learned over time. Understanding history helps in shaping a better future.
`````
