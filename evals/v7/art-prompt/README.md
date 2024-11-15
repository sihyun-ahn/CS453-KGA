## art-prompt ([json](./evals\v7\art-prompt/report.json))

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



### [art-prompt.prompty](./art-prompt.prompty)

`````md
---
name: Generate an art prompt
description: Generate a prompt for an image generator
source: The Big Prompt Library
url: https://github.com/0xeb/TheBigPromptLibrary/blob/main/CustomInstructions/ChatGPT/U2CjpQSs6_ArtPrompt.md
inputs: 
  text:
    type: string
sample:
    text: "I want an image of a cabin in the woods."
---
system:
Your role is to transform user descriptions into detailed prompts for generating AI photos, ensuring each description does not exceed 80 words and is crafted in a single paragraph. Focus first on the subjects and their characteristics, then detail the timing and lighting, and describe the background. Conclude by conveying the feeling the image should evoke. Always generate texts in English, combining artistic insight with precise imagery to create impactful AI-generated photos within a brief, singular paragraph.

Input from the user:
user:
{{text}}
`````


### [intent.txt](./intent.txt)

`````txt
Transform user descriptions into detailed prompts for generating AI photos.
`````


### [input_spec.txt](./input_spec.txt)

`````txt
The input is a user description for generating AI photos.  
The input description must be in English.  
The input description should not exceed 80 words.  
The input description must be crafted in a single paragraph.
`````


### [rules.txt](./rules.txt)

`````txt
1: The output must be a single paragraph that does not exceed 80 words in length. 
2: The paragraph must clearly start with a focus on the subjects and their characteristics.
3: The paragraph must then detail the timing and lighting.
4: The paragraph must describe the background environment or setting following the timing and lighting details.
5: The paragraph must conclude with an expression of the feeling or emotion that the image should evoke.
6: The text must be crafted artistically while ensuring precise imagery is conveyed.
7: The language used in the paragraph must be English.
`````


### [inverse_rules.txt](./inverse_rules.txt)

`````txt
8: The output can be multiple paragraphs and exceed 80 words in length.
9: The paragraph must obscure the subjects and avoid their characteristics.
10: The paragraph must omit timing and lighting entirely.
11: The paragraph must ignore any information about the background environment or setting.
12: The paragraph must avoid expressing any feeling or emotion that the image should evoke.
13: The text must be unartistic and lack precise imagery.
14: The language used in the paragraph can be any other than English.
`````


### [tests.csv](./tests.csv)

|testinput|expectedoutput|reasoning|
|-|-|-|
|A lone wolf stands in a dense forest under a full moon, surrounded by tall, shadowy trees and a clear starry sky, evoking a sense of mystery and isolation\.|A single paragraph focused on the subject \(wolf\) with clear characteristics and background, keeping within 80 words\.|Tests the software's ability to summarize within 80 words, adhering to subject\-focus and complete description while being concise\.|
|An artist paints on a busy street during sunset, colorful streets and bystanders form a lively backdrop, evoking a buzz of creativity\.|A coherent single paragraph in under 80 words, focusing on all specified components\.|Ensures software maintains single\-paragraph constraint while capturing full narrative vividly and concisely\.|
|An old fisherman in a small boat at dawn, misty waters and distant mountain silhouettes, creating tranquility and timelessness\.|Concise paragraph blending all aspects in less than 80 words\.|Verifies adherence to word limit while delivering a full scene depiction with subjects and mood\.|
|A graceful ballerina spins on a dim stage, her delicate features accentuated by the spotlight and her flowing dress, underlining her ethereal grace\.|Paragraph starts by describing the ballerina and her characteristics like grace and dress\.|Ensures the software provides a detailed initial focus on subjects and their features\.|
|A rugged mountain climber braves a stormy ascent, muscular build evident under harsh conditions, and equipment gleaming with precipitating droplets\.|Initiates with focus on the climber, emphasizing attributes like muscular build and gear\.|Assesses ability to focus initially on subject characteristics firmly before other elements\.|
|A young violinist in a crowded hall, nimble fingers dancing across strings, vibrant energy reflecting from her performance and attire\.|Begins with mention of the violinist and his/her traits and actions\.|Checks if software correctly captures and maintains initial subject\-centered narrative\.|
|A photographer captures dawn's first light, golden rays gently painting a tranquil lake, creating surreal reflections\.|Paragraph details timing as dawn and lighting as golden rays\.|Tests if output accurately includes and elaborates on both timing and lighting elements\.|
|An owl perches on an old tree at dusk, as shadows grow long and the sun's residual glow bathes the forest in twilight\.|Covers timing of dusk and lighting effects like residual glow\.|Ensures inclusion and importance of timing and lighting aspects in the scene\.|
|A bustling market freezes under the arctic brilliance of midday sun, casting sharp contrasts on colorful stalls overflowing with goods\.|Focus on midday sun as timing and its impactful lighting\.|Validates description prowess in addressing timing and lighting comprehensively\.|
|A couple dances on an empty beach at twilight, with waves gently rolling and a breeze whispering through the open sky\.|Details the beach environment after mentioning twilight lighting\.|Examines if software smoothly transitions and integrates background details effectively\.|
|A child plays in a field at noon, as warm sunlight dances through towering oaks and scattered bloom patches\.|Background environment of a field comes after lighting and timing\.|Ensures that software describes a proper setting in concert with timing and lighting\.|
|A cat basking on a window sill under midday sun, looking out over quaint garden flowers and hidden insects\.|Description of the garden follows immediate timing and lighting detail\.|Checks whether setting description aligns with preceding sequence elements\.|
|A jazz band plays under candlelit ambiance in a smoky club, walls adorned with music posters, mood evoking nostalgia and intimacy\.|Concludes with nostalgia and intimacy feelings\.|Tests ending to ensure emotions are properly expressed as the last narrative part\.|
|Riders in a horse show under golden afternoon light against a grassy arena backdrop, evoking excitement and freedom\.|Ends with emotions of excitement and freedom\.|Verifies adherence to concluding with evocative sentiment, wrapping up the visual narrative\.|
|A lone painter in a serene valley at sunset, palette mirroring nature's hues, instilling peace and wonder\.|Wraps up with feelings of peace and wonder\.|Checks if evocative feelings are effectively conveyed at paragraph's end\.|
|A crow poised on a Gothic spire as storm clouds loom, stark silhouette etched against electrified sky, invoking an intense foreboding\.|Artistic and precise in metaphoric imagery like electrified sky\.|Assesses how poetic descriptions are weaved into clear imageries artistically\.|
|A snowy owl swoops silently across a moonlit tundra, delicate feathers ruffling softly in the crisp air, as if woven from stardust\.|Crafted with artistic descriptions like 'woven from stardust', ensuring precise imagery\.|Evaluates ability to maintain descriptive artistry while being accurate\.|
|Dancers whirl under cathedral alcoves, shadows spinning elegant crescents, melody breathing life into centuries\-old stone\.|Artistic expressions like 'melody breathing life' with visual clarity\.|Tests artistic expression's balance with precise visual narration\.|
|A shepherd guides sheep across rolling hills under the rosy dawn, serene panorama unfolding beneath endless sky\.|Entire paragraph crafted in orderly English\.|Checks linguistic integrity ensuring entirely English semantics used\.|
|Eagles soaring through azure skies meet the horizon where the sea whispers secrets, as tales of the wind echo quietly\.|Complete paragraph structured using English\.|Ensures full paragraph adheres to English language constraints\.|
|Desert caravans trek beneath an infinite starlit canopy, each grain of sand recording the steps of synchronous motion\.|Solely uses English phrasing and syntax\.|Verifies no deviation from English language usage throughout\.|
|A knight riding a horse, clad in gleaming armor\.\.\. split into multiple paragraphs with added detail\.|Output generated with multiple paragraphs exceeding 80 words\.|Confirms capability to extend beyond standard paragraph structure constraint\.|
|A bustling city under neon lights, vibrant streetscapes continuing\.\.\.|Output features multiple paragraphs and exceeds 80\-word limit\.|Evaluates software's handling of extended narrative in excess of base requirements\.|
|An opera singer performing\.\.\.\. Detailed over multiple segments and over 80 words\.|Results in extended, multi\-paragraph text\.|Assesses flexibility in accommodating larger, more detailed narrative structures\.|
|A busy market\.\.\. output avoids specifying subjects or their traits\.|Generated paragraph obfuscates subjects and characteristics\.|Challenges the capacity to obscure element descriptions despite their introduction\.|
|A rustic village\.\.\. narrative omits direct references to inhabitants\.|Subject and characteristics remain vague in output\.|Ensures subjects are not blatantly outlined in constructed narrative\.|
|A city at dawn\.\.\. output avoids detailing individuals starkly\.|Lack of concrete subject or characteristics description\.|Confirms capability to mask definitive subject information effectively\.|
|An empty street\.\.\. output excludes timing and lighting mentions\.|Output specification lacks timing and lighting elements\.|Tests if narrative discipline excludes unnecessary timing and lighting mentions\.|
|A fisherman on a lake\.\.\. story omits time of day and light\.|Lacks explicit timing and lighting details\.|Ensures intentional omissions in timing and lighting for verifying rule adherence\.|
|A quiet garden\.\.\. timing and lighting not mentioned in scenario\.|Output fails to acknowledge timing or lighting\.|Validates exclusionary capability for avoiding explicit timing/lighting reference\.|
|A dance recital\.\.\. output sidesteps precise background description\.|Produced paragraph excludes background settings\.|Assesses omission of specific setting details according to rule\.|
|A competitive chess game\.\.\. output avoids detailed environment context\.|Background environmental details omitted\.|Ensures background exclusion is strictly enforced in narrative creation\.|
|A motorcycle race by the cliffs\.\.\. backgrounds deliberately overlooked\.|Paragraph lacks specific setting context\.|Evaluates software's ability to ignore environmental information entirely\.|
|An intense standoff\.\.\. output focuses purely on scenario, voiding feeling/ emotion\.|Produced text excludes emotional expressions\.|Confirms narrative can be devoid entirely of emotive influence\.|
|A public speech\.\.\. output provides no emotional or feeling descriptor\.|Narrative excludes explicit feeling conveyance\.|Ensures paragraph remains neutral with no emotional narrative weight\.|
|A silent snowfall\.\.\. output textualizes scene without evoking feelings\.|Feelings/emotional elements intentionally omitted\.|Verifies emotional neutrality is maintained throughout paragraph\.|
|Automobiles along a highway\.\.\. narrative lacks art and precision\.|Text produced lacks artistic flair and clarity\.|Tests narrative form that avoids elegance or specific visionary accuracy\.|
|An office lobby\.\.\. mundane depiction without precise imagery\.|Paragraph generated devoid of artistic structure\.|Assures that rough textual organization omits artistic elements intentionally\.|
|Pedestrian walkway\.\.\. description straightforward and unartistic\.|Narrative structured devoid of imaginative nature\.|Evaluates capacity to refrain from artistic presentation within text\.|
|猫が街を歩いている。|Text uses a language other than English, in this case, Japanese\.|Confirms handling of inputs that are deliberately non\-English to ensure linguistic flexibility challenge\.|
|La maison est grande et ancienne\.|Paragraph in French, not English\.|Tests functionality of software in generating outputs from non\-English language description\.|
|Ein Hund, der im Park rennt\.|Output reflects German input, ignoring English constraint\.|Evaluates system handling of inputs expressed in random non\-English languages\.|

### [baseline_tests.txt](./baseline_tests.txt)

`````txt
user: A majestic lion with a flowing mane stands proudly in the golden glow of a setting sun. The savanna spreads vast and open, dotted with acacia trees. This serene and powerful image should evoke a feeling of strength and tranquility.
===
user: A smiling child blowing bubbles on a sunny day in a green park, surrounded by colorful flowers and trees. The scene is captured in the morning light, evoking joy and playfulness.
===
user: A grand piano placed in the corner of a dimly lit, cozy room with bookshelves and a flickering fireplace. The setting feels intimate and nostalgic, reminiscent of a quiet evening reflecting deep emotions.
===
user: A sleek sports car driving fast down a highway against a backdrop of snowy mountains and a clear blue sky. The morning sunlight highlights its polished surface, creating a sense of speed and freedom.
===
user: A wise old man sitting on a park bench, reading under soft afternoon sunlight. The surrounding trees are full of autumn leaves, with a gentle breeze rustling them, evoking contemplation and peace.
===
user: A bustling city street at night, illuminated by vibrant neon lights from towering skyscrapers. The scene is alive with movement, conveying excitement and the hustle of urban life.
===
user: A vintage train on its tracks as its steam billows into a cloudy sky, framed by lush green fields. The bright midday light enhances the scene, capturing a moment of nostalgic journey and exploration.
===
user: A delicate butterfly resting on a blooming spring flower, gently lit by the warm dawn sunlight. The background is a soft blur of colors, evoking a feeling of calm and renewal.
===
user: A skilled chef in a bustling kitchen preparing a gourmet dish, with ingredients detailed in vivid colors. The timing is midday, lit by both natural and kitchen lighting, conveying passion and creativity.
===
user: A towering wave crashing onto a rocky shore, bathed in the golden hues of the setting sun. The scene is vibrant and dynamic, capturing the raw power and beauty of nature.
===
user: A tranquil mountain cabin, surrounded by snow under a starlit sky. A soft light glows from the windows, creating a sense of warmth and isolation amidst the silent wilderness.
===
user: A cat lounging lazily in front of a window basked in warm indoor lighting, surrounded by soft pillows. The cozy setting should evoke relaxation and contentment.
===
user: A young couple dancing under a streetlamp in a quiet, rainy night, with puddles reflecting their silhouettes. The scene conveys romance and the magic of simple moments.
===
user: A futuristic cityscape at dusk, with sleek skyscrapers and flying vehicles seen against the twilight sky. The image portrays innovation and the promise of tomorrow.
===
user: A vibrant marketplace teeming with people buying fresh produce and flowers under the bright noon sun. The scene should evoke a feeling of liveliness and community.
===
user: A pristine beach during an early morning sunrise, with gentle waves lapping at the shore. The calm and peaceful ambiance inspires reflection and simplicity.
===
user: An elegant crystal chandelier hanging in a grand ballroom dressed for a formal evening event. The golden lighting creates a sense of luxury and grandeur.
===
user: An explorer standing at the edge of a vast desert, silhouetted against the rising sun. The barren yet beautiful landscape evokes a sense of adventure and solitude.
===
user: A high-tech robotics lab filled with intricate machinery and computers, under bright fluorescent lights. The environment feels futuristic, emphasizing innovation and intellect.
===
user: A cozy kitchen with an array of spices on a rack and a view of a snowy landscape through a window. The warmth inside juxtaposes the winter outside, conveying comfort.
===
user: A graceful ballerina performing a pirouette on a dimly lit stage, surrounded by a faint fog. The spotlight casts a single shadow, evoking dedication and the art of dance.
===
user: A vivid coral reef scene underwater, teeming with colorful fish and aquatic life illuminated by dappled sunlight. This vibrant image should evoke wonder and the beauty of nature.
===
user: A picturesque vineyard at sunset, with rows of grape-bearing vines stretching to the horizon. The golden light bathes the scene, evoking a sense of tranquility and abundance.
===
user: A bustling newsroom filled with journalists at desks, the wall clocks showing international times. The bright overhead lights signify urgency and the pulse of daily news.
===
user: A majestic waterfall cascading into a crystal-clear pool amidst a lush rainforest, under the soft light of an overcast sky. The setting conveys peace and untouched beauty.
===
user: A small café with people smiling and chatting under the soft glow of hanging lights as a gentle rain falls outside. The cozy scene evokes warmth and companionship.
===
user: A serene Japanese garden with koi ponds and cherry blossom trees in full bloom during early afternoon. The gentle scene inspires tranquility and harmony with nature.
===
user: A lone surfer gliding on a wave during a brilliant sunset, with the ocean glimmering in gold and red hues. The scene captures the thrill and freedom of the ocean.
===
user: A quiet library filled with rows of books and soft lighting, with a person absorbed in reading. The peaceful ambiance evokes a sense of knowledge and escape.
===
user: A city park during twilight, with children playing as streetlights begin to glow. The scene is vibrant and lively, encapsulating the spirit of community and leisure.
===
user: An artist's studio with canvases and paints scattered around as sunlight pours through large windows. The scene reflects creativity, inspiration, and organized chaos.
===
user: A forest path covered with fallen autumn leaves, lit by the dappled afternoon sun filtering through the trees. It conveys nostalgia and a love for the changing seasons.
===
user: A high mountain peak covered in fresh snow under the full moon reflected in an icy lake. The serene and majestic setting evokes wonder and the beauty of the natural world.
===
user: A lighthouse on a rocky coast standing against a stormy sky, with waves crashing against the rocks. The scene conveys resilience, guidance, and the dramatic power of nature.
===
user: A futuristic tech conference with holograms and interactable screens, brightened by dynamic lighting. The atmosphere is energetic and cutting-edge, evoking innovation.
===
user: A serene lakeside with a small wooden pier at dawn, a single rowboat tied gently. The misty ambiance evokes solitude and peaceful reflection.
===
user: A bustling open-air market at dawn, vibrant with colors of fresh fruit and textiles. The early light creates a lively and welcoming atmosphere.
===
user: A rugged coastline at sunset with cliffs cascading into the ocean, creating vivid silhouettes. The scene captures the dramatic beauty and awe of nature.
===
user: A winter wonderland with snow-laden trees and softly falling flakes under a clear blue sky. The setting is serene and magical, evoking feelings of joy and nostalgia.
===
user: A horse galloping freely across an open field during a bright morning, lifting dust in its trail. The scene portrays majesty and freedom found in nature.
===
user: A medieval castle under the moonlit night sky, silhouetted against a backdrop of stars. The scene should evoke mystery, history, and the grandeur of ancient times.
===
user: A group of elegant swans gliding across a serene lake in the early morning mist. The setting captivates with grace and tranquility.
`````
