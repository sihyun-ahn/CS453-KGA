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

### [test_evals.csv](./test_evals.csv)

|rule|model|input|coverage|validity|
|-|-|-|-|-|
|The output must be a single paragraph that does not exceed 80 words in length\.|gpt\-4o\-2024\-08\-06|A lone wolf stands in a dense forest under a full moon, surrounded by tall, shadowy trees and a clear starry sky, evoking a sense of mystery and isolation\.|The subject is a lone wolf, its fur illuminated under the ethereal glow of a full moon\. The timing is nighttime, with the moon casting an otherworldly light that dances through the dense canopy of shadowy trees\. The setting is a secluded forest, where the stars peek through the leaves in a crystal\-clear sky, adding a touch of cosmic wonder\. This composition should evoke a profound sense of mystery and isolation, capturing the wolf's untamed spirit against the vast nocturnal backdrop\.|ok|
|The output must be a single paragraph that does not exceed 80 words in length\.|gpt\-4o\-2024\-08\-06|An artist paints on a busy street during sunset, colorful streets and bystanders form a lively backdrop, evoking a buzz of creativity\.|A focused artist passionately paints on a bustling street, bathed in the warm hues of a setting sun casting a golden glow across the scene\. The vibrant streets, awash in rich colors, teem with animated bystanders, creating a vivid, bustling backdrop\. This lively environment, kissed by the soft twilight, enhances the dynamic interplay of light and shadow\. The image should evoke an exhilarating sensation of creativity and energy, capturing the essence of art in motion amidst a vibrant urban tapestry\.|ok|
|The output must be a single paragraph that does not exceed 80 words in length\.|gpt\-4o\-2024\-08\-06|An old fisherman in a small boat at dawn, misty waters and distant mountain silhouettes, creating tranquility and timelessness\.|A weathered old fisherman with a wise gaze sits calmly in a small, rustic boat as dawn's first light gently brushes the horizon\. Soft, ethereal mist dances across the tranquil surface of the water, while the silhouettes of distant, majestic mountains emerge like ancient guardians\. This serene tableau, infused with the stillness of early morning light, evokes a profound sense of tranquility and timelessness, inviting the viewer to pause and reflect in its peaceful embrace\.|ok|
|The paragraph must clearly start with a focus on the subjects and their characteristics\.|gpt\-4o\-2024\-08\-06|A graceful ballerina spins on a dim stage, her delicate features accentuated by the spotlight and her flowing dress, underlining her ethereal grace\.|The focus is on a graceful ballerina, her delicate features illuminated by a sharp spotlight against a dimly lit stage, her elegant spinning accentuated by a flowing dress\. The scene unfolds in a theatrical setting, shrouded in soft shadows that dance around her delicate form\. The atmosphere is imbued with an aura of ethereal grace, captivating viewers with a sense of wonder and the fleeting beauty of an artfully performed ballet\.|ok|
|The paragraph must clearly start with a focus on the subjects and their characteristics\.|gpt\-4o\-2024\-08\-06|A rugged mountain climber braves a stormy ascent, muscular build evident under harsh conditions, and equipment gleaming with precipitating droplets\.|A rugged mountain climber with a muscular build is captured mid\-ascent during a fierce storm, his equipment glistening with droplets that catch the diffused light breaking through the stormy clouds\. The image is set in the late afternoon, where the dark, swirling skies cast an intense, contrasting light on the remote craggy mountain landscape\. The backdrop is a dramatic scene of jagged rocks and looming peaks, exuding a potent sense of raw determination and awe\-inspiring adventure\.|ok|
|The paragraph must clearly start with a focus on the subjects and their characteristics\.|gpt\-4o\-2024\-08\-06|A young violinist in a crowded hall, nimble fingers dancing across strings, vibrant energy reflecting from her performance and attire\.|A young violinist with nimble fingers dancing across the strings stands at the center of attention, her vibrant energy mirrored in both her passionate performance and colorful attire\. The moment is captured in the golden hue of late afternoon light streaming through grand windows of a bustling concert hall\. The backdrop consists of an enraptured audience seated in elegant rows, absorbed in her melody\. The image should evoke a feeling of exhilaration and inspiration, celebrating youthful talent and expressive music\.|ok|
|The paragraph must then detail the timing and lighting\.|gpt\-4o\-2024\-08\-06|A photographer captures dawn's first light, golden rays gently painting a tranquil lake, creating surreal reflections\.|The subjects, dawn's first light and a tranquil lake, intertwine as golden rays delicately touch the water’s surface, sculpting ethereal reflections\. This spectacle unfolds at the break of day, when the early light casts a serene glow across the scene\. The lake, nestled amid a serene, untouched natural setting, becomes a canvas of calmness and beauty\. The image should evoke a sense of peace and wonder, enveloping the viewer in the magic of a new beginning\.|ok|
|The paragraph must then detail the timing and lighting\.|gpt\-4o\-2024\-08\-06|An owl perches on an old tree at dusk, as shadows grow long and the sun's residual glow bathes the forest in twilight\.|A majestic owl with wide, watchful eyes perches on an ancient tree, its gnarled branches silhouetted against the evening sky\. The timing captures dusk as shadows stretch across the forest floor, with the sun's lingering glow casting a soft, ethereal light\. The surrounding forest exudes a mystical aura with leaves whispering secrets into the twilight air\. This scene should evoke a sense of tranquility and intrigue, inviting viewers to explore its quiet mysteries\.|ok|
|The paragraph must then detail the timing and lighting\.|gpt\-4o\-2024\-08\-06|A bustling market freezes under the arctic brilliance of midday sun, casting sharp contrasts on colorful stalls overflowing with goods\.|Vibrant market\-goers, bundled against the crisp chill, bustle amidst vibrant chaos as they inspect an array of stalls, each brimming with a kaleidoscope of goods\. The midday sun, strong and arctic, sharpens shadows and highlights the vivid hues of fresh produce and textiles\. A cacophony of chatter lingers in the air, framed by quaint, rustic buildings that encompass the lively scene\. The image should evoke a sense of lively energy mixed with the invigorating cold of a winter day\.|ok|
|The paragraph must describe the background environment or setting following the timing and lighting details\.|gpt\-4o\-2024\-08\-06|A couple dances on an empty beach at twilight, with waves gently rolling and a breeze whispering through the open sky\.|A graceful couple, entwined in a serene dance, waltzes barefoot on a deserted beach as twilight softly descends\. The dim, mellow lighting of dusk casts elongated shadows, while the sun's last light warmly brushes the horizon\. Behind them, gentle waves roll elegantly, and a cool breeze whispers secrets through the vast, open sky\. The scene exudes a tranquil, almost magical feeling, resonating with a profound sense of peace and intimate connection\.|ok|
|The paragraph must describe the background environment or setting following the timing and lighting details\.|gpt\-4o\-2024\-08\-06|A child plays in a field at noon, as warm sunlight dances through towering oaks and scattered bloom patches\.|A joyful child with curly hair and a bright smile gleefully plays amidst sprawling green fields, their carefree spirit captured at the zenith of a radiant noon\. Warm sunlight filters through towering oaks, casting playful speckles across the landscape and highlighting vibrant patches of wild blooms\. The expansive meadow, dappled in sun\-kissed hues, sets an idyllic stage filled with freedom and innocence, evoking a heartwarming sense of nostalgia and unbridled joy\.|ok|
|The paragraph must describe the background environment or setting following the timing and lighting details\.|gpt\-4o\-2024\-08\-06|A cat basking on a window sill under midday sun, looking out over quaint garden flowers and hidden insects\.|A serene cat, sleek and content, lounges on a sunlit window sill, soaking in the warmth of the midday sun\. Its eyes gaze curiously at the charming garden below, where vibrant flowers bloom and hidden insects flit about\. The bright daylight casts soft shadows, creating a tranquil oasis\. The setting is idyllic, evoking a sense of peaceful contemplation and the gentle pleasures of nature's quiet beauty\.|ok|
|The paragraph must conclude with an expression of the feeling or emotion that the image should evoke\.|gpt\-4o\-2024\-08\-06|A jazz band plays under candlelit ambiance in a smoky club, walls adorned with music posters, mood evoking nostalgia and intimacy\.|A jazz band, animated yet composed, delicately weaves harmonies with brass instruments shining softly under a candlelit ambiance\. The scene unfolds in dim, smoky lighting that dances with shadows, creating an intimate warmth\. Surrounding them, the walls are adorned with vintage music posters, creating a rich tapestry of history and vibrant culture\. The setting, filled with the soft murmurs of appreciative listeners, evokes a profound sense of nostalgia and intimacy, transporting guests to a bygone era of soulful music\.|ok|
|The paragraph must conclude with an expression of the feeling or emotion that the image should evoke\.|gpt\-4o\-2024\-08\-06|Riders in a horse show under golden afternoon light against a grassy arena backdrop, evoking excitement and freedom\.|Prompt: A group of riders skillfully guiding their horses, clad in elegant riding attire, perform in a horse show\. The golden hues of the late afternoon sunlight cast a warm glow over the scene\. In the background, an expansive and lush grassy arena adds a sense of openness and vibrancy\. This setting exudes an atmosphere of excitement and the exhilarating spirit of freedom, drawing viewers into the world of equestrian grace and dynamic motion\.|ok|
|The paragraph must conclude with an expression of the feeling or emotion that the image should evoke\.|gpt\-4o\-2024\-08\-06|A lone painter in a serene valley at sunset, palette mirroring nature's hues, instilling peace and wonder\.|A solitary painter, imbued with tranquillity, stands in a serene valley, surrounded by majestic mountains as the sun begins to set\. The warm, golden light of the sunset bathes the scene, casting long shadows and highlighting the rich hues on the painter's palette, mirroring the vibrant colors of nature around\. The valley, lush and expansive, gently whispers with the rustle of a cool evening breeze\. The image radiates an overwhelming sense of peace and wonder, inviting introspection and quiet admiration\.|ok|
|The text must be crafted artistically while ensuring precise imagery is conveyed\.|gpt\-4o\-2024\-08\-06|A crow poised on a Gothic spire as storm clouds loom, stark silhouette etched against electrified sky, invoking an intense foreboding\.|A solitary crow, its feathers inky black, delicately perches on the ornate ledge of a Gothic spire, its form a stark silhouette against the brewing storm clouds\. It is evening, and the sky crackles with electric anticipation, casting an eerie glow\. The looming storm clouds fill the backdrop with a dramatic, tempestuous scene\. This haunting image should evoke a sense of intense foreboding, as if the very air pulses with portentous energy\.|ok|
|The text must be crafted artistically while ensuring precise imagery is conveyed\.|gpt\-4o\-2024\-08\-06|A snowy owl swoops silently across a moonlit tundra, delicate feathers ruffling softly in the crisp air, as if woven from stardust\.|A snowy owl, with delicate, stardust\-like feathers, gracefully swoops across a moonlit tundra, its movement silent yet powerful\. Bathed in the cool glow of moonlight, its majestic form is highlighted against the silvery landscape\. The tundra below is vast and undisturbed, stretching endlessly with patches of glistening snow under the serene night sky\. The entire scene emanates a sense of quiet wonder and magical tranquility, as if witnessing a secret dance of nature under the stars\.|ok|
|The text must be crafted artistically while ensuring precise imagery is conveyed\.|gpt\-4o\-2024\-08\-06|Dancers whirl under cathedral alcoves, shadows spinning elegant crescents, melody breathing life into centuries\-old stone\.|Dancers, adorned in flowing garments, twirl gracefully beneath the grand archways of a cathedral, their movements casting elegant crescent shadows on the weathered floor\. It is dusk, with golden light filtering through stained glass, creating a warm, ethereal glow\. The majestic alcoves of the ancient cathedral tower overhead, enveloping the scene in a rich tapestry of history and art\. This enchanting image should evoke a sense of timeless beauty and the profound connection between music, movement, and legacy\.|ok|
|The language used in the paragraph must be English\.|gpt\-4o\-2024\-08\-06|A shepherd guides sheep across rolling hills under the rosy dawn, serene panorama unfolding beneath endless sky\.|A robust shepherd, with weathered features and a gentle demeanor, steers a flock of fluffy, grazing sheep across undulating hills\. Bathed in the tender colors of early dawn, delicate pink and gold hues dance across the sky, casting a soft, ethereal light over the landscape\. The vast sky stretches endlessly overhead, meeting the rolling earth in calming harmony\. This serene tableau evokes a sense of peaceful solitude and the timeless bond between man and nature\.|ok|
|The language used in the paragraph must be English\.|gpt\-4o\-2024\-08\-06|Eagles soaring through azure skies meet the horizon where the sea whispers secrets, as tales of the wind echo quietly\.|Eagles, with majestic wings outstretched, glide effortlessly through skies painted a vibrant azure blue\. It is midday, and the illuminating sunlight casts a golden glow upon their feathers\. Beneath them, the vast ocean meets the sky in a seamless embrace, waves softly sharing their secrets with the breeze\. The horizon seems endless, a tapestry woven with nature's wonder, evoking a profound sense of freedom and tranquility that stirs the soul\.|ok|
|The language used in the paragraph must be English\.|gpt\-4o\-2024\-08\-06|Desert caravans trek beneath an infinite starlit canopy, each grain of sand recording the steps of synchronous motion\.|Desert caravans gracefully traverse across vast sandy dunes, their silhouettes stark against the clear, infinite starlit canopy\. It is the stillness of night, with celestial lights casting a gentle yet brilliant glow upon the endless landscape\. The background reveals sprawling dunes under the tranquil moonlight, each grain of sand seemingly recording the rhythmic footsteps of the procession\. This image should evoke a sense of timeless adventure and the profound solitude found in the union of earth and sky\.|ok|
|The output can be multiple paragraphs and exceed 80 words in length\.|gpt\-4o\-2024\-08\-06|A knight riding a horse, clad in gleaming armor\.\.\. split into multiple paragraphs with added detail\.|The scene features a noble knight astride a majestic horse, both adorned in intricately detailed, gleaming armor that reflects the soft glow of dawn\. The gentle morning light casts long shadows across a dew\-kissed meadow, where the faint mist adds a touch of ethereal beauty\. In the background, ancient oak trees stand silhouetted against the pastel\-colored sky, lending an air of timeless majesty\. The image should inspire awe and a sense of adventure, capturing a moment of serene bravery\.|err|
|The output can be multiple paragraphs and exceed 80 words in length\.|gpt\-4o\-2024\-08\-06|A bustling city under neon lights, vibrant streetscapes continuing\.\.\.|Two subjects, a young couple, stroll confidently through a bustling city, bathed in the radiant glow of vibrant neon lights that highlight their joyous expressions\. It's nighttime, and the city is alive with energy, the electric hues casting an array of colors onto wet pavements, creating reflections that animate the scene with continuous movement\. Skyscrapers tower above, their lights twinkling like stars\. This image should evoke a sense of dynamic excitement and urban enchantment\.|ok|
|The output can be multiple paragraphs and exceed 80 words in length\.|gpt\-4o\-2024\-08\-06|An opera singer performing\.\.\.\. Detailed over multiple segments and over 80 words\.|Create an image of a poised opera singer, her powerful presence and elegant attire spotlighted gently on stage\. Capture her during an evening performance, where warm, dim lights cast a dramatic glow around her figure\. Envision the grandeur of an opulent theater, with opulent red velvet curtains and a sea of audience in silhouette\. The scene should convey an air of awe and inspiration, capturing the transcendent connection between the performer and her captivated audience\.|err|
|The paragraph must obscure the subjects and avoid their characteristics\.|gpt\-4o\-2024\-08\-06|A busy market\.\.\. output avoids specifying subjects or their traits\.|Capture a bustling market scene brimming with diverse vendors and colorful stalls, each overflowing with vibrant fruits, vegetables, and textiles\. Bathed in the gentle golden glow of early morning light, every hue and detail is accentuated, creating a warm, inviting atmosphere\. Stalls line the narrow cobblestone pathways as the sky begins to brighten\. The market hums with life and energy, evoking a sense of community, diversity, and the timeless interplay of commerce and culture in an animated embrace\.|ok|
|The paragraph must obscure the subjects and avoid their characteristics\.|gpt\-4o\-2024\-08\-06|A rustic village\.\.\. narrative omits direct references to inhabitants\.|Picture a rustic village nestled in a tranquil valley, with cobblestone paths that wind between quaint, weathered cottages\. It's early morning, and soft rays of sunlight filter through a gentle mist, casting an ethereal glow on the lush greenery\. Backgrounded by rolling hills, the quaintness of the village is accentuated by distant, softly clucking chickens and babbling brooks\. This image should evoke a sense of serene nostalgia, inviting viewers to explore the quiet simplicity of a bygone era\.|ok|
|The paragraph must obscure the subjects and avoid their characteristics\.|gpt\-4o\-2024\-08\-06|A city at dawn\.\.\. output avoids detailing individuals starkly\.|The image should capture the quiet majesty of a cityscape gently awakening at dawn, its outlines softened by the emerging light\. As the first rays of the sun spill over the skyline, a subtle blend of pink and orange hues bathes the streets and buildings\. The background is an expanse of slowly brightening sky, with a handful of softly glowing streetlights still visible\. The scene evokes a serene and hopeful ambiance, suggesting new beginnings and fresh possibilities\.|ok|
|The paragraph must omit timing and lighting entirely\.|gpt\-4o\-2024\-08\-06|An empty street\.\.\. output excludes timing and lighting mentions\.|Picture an empty street with cobblestones glistening under the soft, ethereal light of dawn\. Sparse vintage street lamps cast gently glowing pools of warm light onto the pavement\. On either side, quaint brick buildings stand silently, their windows reflecting the subtle hues of the awakening sky\. Delicate mist lingers just above the ground, adding an aura of mystery to the tranquil scene\. The image should evoke a sense of serene anticipation as if the world is on the brink of stirring from its slumber\.|err|
|The paragraph must omit timing and lighting entirely\.|gpt\-4o\-2024\-08\-06|A fisherman on a lake\.\.\. story omits time of day and light\.|A solitary fisherman, clad in a well\-worn flannel shirt and weathered hat, gently casts his net over the tranquil, glass\-like surface of a vast lake\. Just after dawn, the light paints the sky in hues of soft pink and delicate gold, reflecting off the serene waters below\. Surrounding the lake are lush, verdant trees whispering in the morning breeze\. This scene should evoke a sense of peaceful solitude and connection with nature's gentle beauty\.|err|
|The paragraph must omit timing and lighting entirely\.|gpt\-4o\-2024\-08\-06|A quiet garden\.\.\. timing and lighting not mentioned in scenario\.|A serene garden laden with diverse, blossoming flora sways softly, bathed in the gentle glow of golden hour sunlight, casting long, soft shadows that dance upon the lush greenery\. The sky is tinged with warm hues of amber and pink as the sun dips toward the horizon\. A quiet stone path meanders through, leading to an ancient, weathered wooden bench nestled beneath a grand willow tree\. This scene should evoke a profound sense of peace and reflection\.|ok|
|The paragraph must ignore any information about the background environment or setting\.|gpt\-4o\-2024\-08\-06|A dance recital\.\.\. output sidesteps precise background description\.|A group of elegant ballet dancers, poised with grace and precision, leap across the stage in flowing costumes under the soft warm glow of evening spotlights\. The recital takes place in a grand theater, where velvety curtains and an ornate proscenium frame their movements\. The audience is spellbound, captured in a moment of awe and admiration\. The image should evoke a sense of ethereal beauty and the transcendence of human expression through the art of dance\.|ok|
|The paragraph must ignore any information about the background environment or setting\.|gpt\-4o\-2024\-08\-06|A competitive chess game\.\.\. output avoids detailed environment context\.|Focus on two engrossed chess players, their faces locked in intense concentration, under the warm glow of a late afternoon sun streaming through a window\. The setting is a cozy library with towering bookshelves filled with volumes of knowledge\. Shadows dance on the wooden floor, outlining the strategic battlefield of the chessboard\. The atmosphere is one of intellectual challenge and the thrill of mental battle, capturing the essence of strategy and determination\.|ok|
|The paragraph must ignore any information about the background environment or setting\.|gpt\-4o\-2024\-08\-06|A motorcycle race by the cliffs\.\.\. backgrounds deliberately overlooked\.|A thrilling motorcycle race unfolds with sleek, vibrant bikes and determined riders leaning into curves\. It's set during the golden hour, capturing long shadows and a fiery sky\. The cliffs in the background frame the scene, rising majestically against the horizon, though intentionally blurred to emphasize the race\. This rugged natural backdrop contrasts with the speed and focus of the race\. The image should evoke an adrenaline rush and a sense of awe at nature's grandeur\.|err|
|The paragraph must avoid expressing any feeling or emotion that the image should evoke\.|gpt\-4o\-2024\-08\-06|An intense standoff\.\.\. output focuses purely on scenario, voiding feeling/ emotion\.|Two determined figures stand facing each other, their postures rigid and expressions fierce, under the harsh afternoon sun beaming down with a glaring intensity\. The scene is set on a barren desert landscape, with cracked earth stretching endlessly in all directions\. Sparse, jagged rocks punctuate the vast emptiness\. The stark isolation and blistering heat of the environment serve to amplify the tense atmosphere, creating an image that exudes an undeniable aura of suspense and high\-stakes confrontation\.|ok|
|The paragraph must avoid expressing any feeling or emotion that the image should evoke\.|gpt\-4o\-2024\-08\-06|A public speech\.\.\. output provides no emotional or feeling descriptor\.|A distinguished orator with a commanding presence stands poised, exuding confidence and charisma\. It's mid\-morning, and soft sunlight filters through large windows, casting gentle, inspiring shadows across the room\. The backdrop is a grand, historic auditorium adorned with rich wood paneling and elegant chandeliers, lending an air of sophistication and gravitas\. The image should evoke a sense of anticipation and inspiration, as if capturing a pivotal moment poised to impact all who are present\.|ok|
|The paragraph must avoid expressing any feeling or emotion that the image should evoke\.|gpt\-4o\-2024\-08\-06|A silent snowfall\.\.\. output textualizes scene without evoking feelings\.|A serene snowfall blankets the landscape, where delicate flakes cascade softly around two children bundled in vibrant winter attire\. Captured at twilight, the scene is bathed in the gentle glow of streetlamps, casting a golden hue across the untouched white\. In the background, snow\-draped evergreens stand tall, their silhouettes whispering secrets to the dusky sky\. The image should evoke a sense of wonderment and childlike awe, as if capturing a fleeting moment of magic suspended in time\.|ok|
|The text must be unartistic and lack precise imagery\.|gpt\-4o\-2024\-08\-06|Automobiles along a highway\.\.\. narrative lacks art and precision\.|Focus on sleek, modern automobiles cruising effortlessly along a vibrant highway\. Bathed in the golden light of a setting sun, their shiny exteriors reflect the warm, fading hues of the day\. The scene is set against a dynamic city skyline, silhouetted under the blazing oranges and subtle purples of dusk\. This image should evoke a sense of adventure and anticipation, capturing the essence of the urban journey with a touch of futuristic elegance\.|ok|
|The text must be unartistic and lack precise imagery\.|gpt\-4o\-2024\-08\-06|An office lobby\.\.\. mundane depiction without precise imagery\.|Create an image of a sophisticated office lobby featuring a sleek wooden reception desk and modern seating arrangements\. The scene is set in the early afternoon, illuminated by gentle natural light streaming through expansive glass windows\. This light casts soft, elongated shadows across the polished marble floor\. Behind, a vertical garden spans the wall, adding vibrancy and serenity\. The atmosphere should evoke a sense of welcoming professionalism, where innovation meets tranquility in a cutting\-edge corporate environment\.|ok|
|The text must be unartistic and lack precise imagery\.|gpt\-4o\-2024\-08\-06|Pedestrian walkway\.\.\. description straightforward and unartistic\.|Focus on a diverse group of pedestrians briskly walking along a bustling urban walkway, with varied expressions of determination and joy\. Capture the scene during mid\-afternoon under a clear blue sky, with sunlight casting dynamic shadows\. The backdrop features modern skyscrapers and charming street\-side cafes with green plants\. The image should evoke a sense of energetic liveliness and the vibrant pulse of city life, blending modernity with a hint of nature's serenity\.|ok|
|The language used in the paragraph can be any other than English\.|gpt\-4o\-2024\-08\-06|猫が街を歩いている。|A sleek, curious cat with emerald green eyes and a glossy black coat saunters gracefully through a cobblestone street under the golden hues of a late afternoon sun\. The soft light casts long shadows, adding a touch of magic to the scene\. Around the cat, the quaint street is lined with charming, historic buildings, adorned with hanging flower baskets\. This image should evoke a sense of serene exploration and the quiet allure of urban wanderlust\.|err|
|The language used in the paragraph can be any other than English\.|gpt\-4o\-2024\-08\-06|La maison est grande et ancienne\.|Depict an elegant, large, and ancient house with a timeless charm\. Bathed in the soft, golden glow of a late afternoon sun, the light casts long shadows, accentuating the architectural details\. The setting reveals a sprawling, lush garden, rich with blooming flowers and aged trees, some of which lean romantically over weathered stone pathways\. This scene should evoke a sense of nostalgia and admiration, as if the house embodies stories of the past and whispers them through the rustling leaves\.|err|
|The language used in the paragraph can be any other than English\.|gpt\-4o\-2024\-08\-06|Ein Hund, der im Park rennt\.|A lively dog, with a glossy coat and exuberant expression, darts through the park in the golden glow of a late afternoon\. The sun casts long shadows, producing a gentle interplay of light and shade\. The background reveals a lush, green expanse dotted with clusters of wildflowers and tall trees gently swaying in the breeze\. The image should evoke a sense of freedom and sheer joy, capturing the essence of a carefree moment in nature\.|err|

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
