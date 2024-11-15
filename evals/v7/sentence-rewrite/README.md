## sentence-rewrite ([json](./evals\v7\sentence-rewrite/report.json))

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


### [test_results.csv](./test_results.csv)



### [sentence-rewrite.prompty](./sentence-rewrite.prompty)

`````md
---
name: Sentence Rewrite
description: Takes a sentence and rewrites it with a particular style or tone.
source: The Big Prompt Library
url: https://github.com/0xeb/TheBigPromptLibrary/blob/main/CustomInstructions/ChatGPT/SaxlWzH4g_Sentence_Rewriter_Tool.md
inputs: 
  text:
    type: string
sample:
    text: "I visited Norway last summer, and the breathtaking landscapes left me in awe."
---
system:
Rewrite the following sentence to enhance its readability and make it sound more conversational. Ensure that the original meaning and factual accuracy are preserved. Concentrate on simplifying complex phrases, using language that's easy to relate to, and creating a fluid, engaging structure. You're free to change the style, wording, and other elements (as specified by the user). Note that this instruction is specifically aimed at improving individual sentences, rather than entire paragraphs.

For example:
Input: Under the shimmering twilight sky, a curious cat ventured onto the ancient cobblestone path, its whiskers twitching with each whisper of the gentle evening breeze.

Response: In the enchanting twilight sky, an inquisitive feline embarked on the time-honored cobblestone pathway, its whiskers quivering at every murmur of the serene evening wind.

Input: 
user:
{{text}}
`````


### [intent.txt](./intent.txt)

`````txt
Rewrite individual sentences to enhance readability and make them more conversational while preserving meaning and factual accuracy.
`````


### [input_spec.txt](./input_spec.txt)

`````txt
The input is a single sentence in written English provided by the user.
The input sentence must convey a complete thought or idea.
The input sentence can include complex phrases that may need simplification.
The input sentence may consist of stylistic elements that the user wishes to alter, such as tone or engagement level.
The input sentence should retain its original meaning and factual accuracy when rewritten.
The input length is not restricted but must be a complete sentence, not a paragraph or fragment.
The input must be in English and should not violate any community guidelines, such as including hate speech or discriminatory language.
`````


### [rules.txt](./rules.txt)

`````txt
1: The output should be a single rewritten sentence that enhances the readability of the original input sentence. 
2: The rewritten sentence should maintain the original meaning of the input sentence without altering any factual information. 
3: The rewritten sentence should employ a conversational tone that feels engaging and relatable to the reader. 
4: Complex phrases in the input sentence should be simplified in the rewritten sentence to ensure ease of understanding. 
5: The structure of the rewritten sentence should be fluid, allowing for a seamless reading experience. 
6: The language used in the rewritten sentence should be accessible, avoiding overly academic or technical terms unless they are necessary for preserving meaning. 
7: Style, wording, and elements of the sentence can be changed as needed to meet the criteria of readability and conversational tone. 
8: The output must specifically focus on improving the individual sentence provided by the user, rather than addressing surrounding text or entire paragraphs.
`````


### [inverse_rules.txt](./inverse_rules.txt)

`````txt
9: The output should not enhance readability and can reduce readability of the original input sentence.  
10: The rewritten sentence can alter the original meaning of the input sentence and may change factual information.  
11: The rewritten sentence should avoid a conversational tone and should not engage or relate to the reader.  
12: Complex phrases in the input sentence should remain complex and may add complexity in the rewritten sentence.  
13: The structure of the rewritten sentence should be disjointed, making the reading experience challenging.  
14: The language used in the rewritten sentence can be overly academic or technical, unnecessary for preserving meaning.  
15: Style, wording, and elements of the sentence should remain unchanged and ignore the criteria of readability and conversational tone.  
16: The output should not specifically focus on improving the individual sentence provided by the user and can address surrounding text or entire paragraphs.  
`````


### [tests.csv](./tests.csv)

|testinput|expectedoutput|reasoning|
|-|-|-|
|Despite the inclement weather conditions, our outdoor event continued unabated, attracting a diverse audience\.|Despite the bad weather, our outdoor event went on smoothly and drew a mixed crowd\.|The test checks if readability is improved by using simpler words and phrases\.|
|A phenomenon that has baffled scientists for many years, the migration patterns of monarch butterflies, remains a significant subject of study\.|Scientists have been puzzled by the movement of monarch butterflies for years, making it a key study area\.|Tests if the rewritten sentence is more readable without losing the original idea\.|
|Underestimating the power of collaborative efforts can potentially lead to the suboptimal performance of a business entity\.|Not recognizing the strength of teamwork might result in a business not doing well\.|Evaluates if the sentence is more straightforward and easier to read without losing meaning\.|
|Albert Einstein, a theoretical physicist born in Germany, developed the theory of relativity, which has been foundational in modern physics\.|Albert Einstein, born in Germany, created the theory of relativity, a base for modern physics\.|Ensures original factual information and meaning are preserved even after rephrasing\.|
|The Amazon rainforest, known as the planet's lungs, plays an essential role in mitigating global climate by absorbing carbon dioxide\.|The Amazon Rainforest, Earth's lungs, absorbs carbon dioxide and helps moderate global climate\.|Checks if factual accuracy and meaning are retained in the rewrite\.|
|The proliferation of digital technologies has culminated in transformative shifts in various sectors, most notably in communication\.|The spread of digital tech has led to big changes, especially in communication\.|Focuses on maintaining the core idea and facts while rewriting\.|
|The ongoing debates between political factions are increasingly alienating citizens who feel disconnected from government issues\.|The ongoing debates between political parties are making citizens feel more disconnected from government issues\.|Tests if the sentence resonates more with the reader while maintaining a conversational tone\.|
|Technological advancements continuously expand our cognitive abilities and alter societal norms in unprecedented ways\.|Tech advancements are constantly boosting our mental skills and changing societal norms like never before\.|Assesses if the sentence is engaging and conversational\.|
|Facilitation of discourse among different communities can bridge divides, fostering greater societal integration\.|Encouraging talks between different communities can bridge gaps and bring people together\.|Evaluates if the rewritting engages readers in a relatable manner while preserving meaning\.|
|Integrated systems of information exchange have revolutionized communication infrastructures globally\.|Joined information systems have changed global communication infrastructure immensely\.|Checks if complex phrases are simplified for better understanding\.|
|Contemporary phenomenon necessitates an interdisciplinary approach to fully grasp its multifaceted impacts\.|Today's issues need a multi\-field approach to understand all impacts\.|Tests if the complex phrase is simplified\.|
|Determining quantitative assessments necessitates the application of advanced methodologies for precise measurements\.|To measure accurately, advanced methods are needed for quantitative checks\.|Focuses on simplifying complex phrases to enhance understanding\.|
|The culinary festival, annually held at the city's main park, brought together gastronomy enthusiasts from across the region to enjoy a wide array of flavors\.|The yearly food festival in the city park drew food lovers from the region to taste diverse flavors\.|Evaluates if the rewritten sentence flows smoothly\.|
|Resilient infrastructure is pivotal in ensuring that societal functions continue unabated in the face of natural disasters\.|Strong infrastructure is key to keeping society running smoothly during natural disasters\.|Checks if the new sentence structure reads fluidly while retaining meaning\.|
|Academic pursuits should ideally be intertwined with practical experiences to equip students with a holistic understanding\.|Students should have both learning and real\-world experiences for a well\-rounded understanding\.|Tests if the structured sentence promotes seamless reading\.|
|Ecosystems are complex networks that necessitate a multifaceted and comprehensive understanding for effective management\.|Ecosystems are complex networks that need in\-depth understanding for effective management\.|Ensures the rewritten sentence avoids unnecessary technical language\.|
|To optimize the machine learning algorithms, a heightened level of computational arithmetic proficiency is required\.|Improving machine learning algorithms needs good computational math skills\.|Tests if the language is accessible without excessive technical jargon\.|
|Attaining a conclusive understanding of astrophysical phenomena continues to challenge the scientific community\.|Fully understanding astrophysical events keeps challenging scientists\.|Checks if the rewritten sentence is more accessible without altering meaning\.|
|The art of negotiation, often seen as a strategic endeavor, requires both preparation and adaptability to succeed\.|Negotiation is a strategic skill that needs both preparation and flexibility\.|Tests if style and wording improve readability and add a conversational tone\.|
|Cognitive behavioral therapy is a structured, goal\-oriented therapy that's effective for anxiety disorders\.|Cognitive behavioral therapy is a planned, goal\-focused treatment effective for anxiety disorders\.|Assesses if adjusting style enhances readability while maintaining meaning\.|
|Renewable energy sources are gaining prominence as viable alternatives to fossil fuels, driven by climate change concerns\.|Renewable energy is becoming popular as a solid alternative to fossil fuels because of climate change worries\.|Checks if changing elements improves clarity and engagement\.|
|The upcoming conference, along with its related workshop, will focus on the advancements in quantum computing\.|The conference will focus on new advancements in quantum computing\.|Ensures output focuses on the individual sentence, ignoring external context\.|
|Our conversation revealed the importance of transparency in corporate leadership\.|Being open is important in leading companies\.|Tests focus on rewriting the single sentence without delving into surrounding paragraphs\.|
|The teacher highlighted the significance of philosophical studies in broadening students' critical thinking skills\.|Philosophy is crucial in widening students' critical thinking\.|Ensures sentence improvement without shifting focus to other sentences or paragraphs\.|
|As the full moon rose, the ethereal glow cast eerie shadows across the landscape, deepening the already palpable tension\.||Validates if the software doesn't enhance readability by removing unnecessary elements\.|
|Given the societal implications of recent technological advances, there's a growing need for ethical considerations in their implementation\.||Ensures the software can choose not to improve readability, maintaining original complexity\.|
|The tome, replete with esoteric musings and arcane knowledge, defied simplistic understanding, demanding an erudite reader\.||Confirms that the output doesn't need to enhance readability, keeping the sentence's original structure\.|
|The Renaissance, a pivotal period in European history marked by a resurgence of art and science, profoundly influenced modern society\.||Ensures the output can alter meaning or factual information if so chosen\.|
|Nelson Mandela, the first black president of South Africa, is known for his role in ending apartheid\.||Tests if altering factual accuracy is permissible by the software in some cases\.|
|Photosynthesis, a crucial biological process, enables plants to convert sunlight into chemical energy\.||Ensures if factual information can be altered or removed as needed, testing software flexibility\.|
|Successful urban migration strategies necessitate comprehensive planning and community engagement\.||Checks if the output avoids conversational tone despite the input potentially lending itself to such\.|
|The importance of sleep in maintaining cognitive function cannot be understated in today's fast\-paced society\.||Confirms the software can steer clear of creating a conversational output tone\.|
|Dietary transitions, particularly towards plant\-based diets, are pivotal in addressing climate change\.||Tests if a non\-conversational, formal tone is maintained despite potential for engagement\.|
|The intricate architecture of the Roman Pantheon serves as a testament to ancient engineering prowess\.||Factual accuracy isn't altered, and complexity can be increased as needed\.|
|Bioluminescent organisms, notable for their ability to emit light, play various ecological roles\.||Focuses on ensuring the output maintains or enhances complexity rather than simplifying\.|
|The juxtaposition of chaos and order in contemporary art illustrates the dynamic spectrum of human emotion\.||Tests if software can augment complexity within rephrased sentences\.|
|The study's findings, while initially controversial, have become pivotal in contemporary debate\.||Validates if outputs can have a disjointed structure to test reader focus and comprehension\.|
|Despite initial setbacks, the project team's breakthroughs are noteworthy\.||Examines the ability to craft sentence structures that challenge fluidity and engagement\.|
|Environmental changes, whilst impactful, offer opportunities for proactive human responses\.||Tests emissions of a disjointed structure, conflicting with fluid reading expectations\.|
|Algorithmic complexities often necessitate a profound understanding of computational theories\.||Allows for outputs that incorporate unnecessarily technical language, testing reader outcomes\.|
|The deployment of quantum\-resistant cryptographic protocols is crucial for digital infrastructure security\.||Confirms if academic or technical jargon is further emphasized, altering accessibility\.|
|Incorporating intertextual references in literary analysis demonstrates an advanced interpretative understanding\.||Checks outputs for any excessively academic rewording and its reception\.|
|Visionary business leaders often exhibit anticipatory thinking, fostering innovation\.||Ensures style or structure isn't changed, analyzing software adherence to format as designated\.|
|The novel, with its divergent narrative threads, captivates the reader\.||Validates unchanged sentence style, wording, and element preservation despite tool redesign norms\.|
|Further evidence underscores the necessity of international collaboration in scientific research\.||Confirms unaltered sentence components align with specified tool function deviations\.|
|Over the years, sustainable frameworks have underpinned socio\-economic growth across various regions, serving as a model for future policies\.||Checks if application deviation enhances paragraphs contrast to sentence\-focused refinement\.|
|The essay, expounding on economic inequalities, emphasises systemic change as vital for societal advancement\.||Tests if improvement attempts reframe larger corpus over intended single\-sentence outcomes\.|
|During the keynote address, the speaker unveiled numerous innovations set to redefine tech industries\.||Ensures outcome expansion beyond sentence scope mandate, evaluating holistic optimization aim\.|

### [baseline_tests.txt](./baseline_tests.txt)

`````txt
text: The conference will take place in the grand ballroom, located on the top floor of the hotel, providing a breathtaking view of the city skyline.
===
text: Despite the challenges posed by the unexpected weather conditions, the marathon continued smoothly, with volunteers offering support at every checkpoint.
===
text: The new smartphone boasts a dual-camera system, offering users the ability to capture stunning high-resolution photos with improved depth of field.
===
text: In the midst of the bustling city, a quaint little café offers a serene escape, where patrons can enjoy artisanal coffee and freshly baked pastries.
===
text: Due to the recent updates, many users have reported faster loading times and enhanced performance across a variety of applications.
===
text: The exhibition featured a diverse array of contemporary art pieces, attracting art enthusiasts from all over the world.
===
text: With its innovative design, the new bridge not only facilitates smoother traffic flow but also serves as a stunning architectural landmark.
===
text: As the sun set over the horizon, the festival grounds came alive with vibrant colors, lively music, and an energetic crowd.
===
text: In response to customer feedback, the company has launched a user-friendly interface to enhance the overall experience with their products.
===
text: After considerable anticipation, the highly awaited novel has finally hit the shelves, receiving rave reviews from critics and readers alike.
===
text: The park's picturesque landscape features walking trails, a sparkling lake, and a variety of flowering plants that change with the seasons.
===
text: The introduction of the electric vehicle marks a significant step towards sustainable transportation solutions for urban environments.
===
text: The chef's innovative recipes have redefined modern cuisine, combining traditional flavors with contemporary techniques.
===
text: As technology continues to advance, the realm of virtual and augmented reality is rapidly becoming an integral part of educational environments.
===
text: Despite the project's complexity, the team was able to deliver the final product ahead of schedule, exceeding client expectations.
===
text: The newly renovated library offers a quiet haven for readers, complete with cozy reading nooks and an extensive collection of books.
===
text: Attendees at the seminar were given the opportunity to interact with industry leaders and gain valuable insights into the latest market trends.
===
text: The wildlife sanctuary serves as a protective haven for endangered species, ensuring their survival through conservation efforts.
===
text: By leveraging artificial intelligence, the software can predict consumer behavior patterns, enabling businesses to tailor their marketing strategies effectively.
===
text: The musician's latest album blends elements of jazz and classical to create a unique auditory experience that resonates with audiences.
===
text: Equipped with state-of-the-art facilities, the sports complex is designed to host international tournaments and attract top-tier athletes.
===
text: The company aims to revolutionize the industry with its pioneering technology, setting new standards for efficiency and sustainability.
===
text: Through community outreach programs, the organization seeks to address social issues and inspire positive changes within the local population.
===
text: As night fell, the city transformed into a dazzling spectacle of lights, showcasing a vibrant nightlife and diverse cultural scene.
===
text: The documentary provides an in-depth look at the environmental impact of plastic waste, urging viewers to take action towards reducing pollution.
===
text: With meticulous attention to detail, the artisan crafts intricate jewelry pieces that reflect both timeless elegance and modern charm.
===
text: The school's curriculum emphasizes holistic development, fostering critical thinking and creativity among students.
===
text: The design of the new product is centered around improving user convenience, with intuitive controls and accessible features.
===
text: This historical landmark attracts tourists from around the globe, eager to learn about the rich cultural heritage it represents.
===
text: Faced with limited resources, the team displayed remarkable ingenuity and resilience to achieve their objectives successfully.
===
text: The fashion show featured avant-garde designs, displaying a fusion of bold textures and vibrant colors on the runway.
===
text: The novel's complex characters and intricate plot weave a compelling narrative that captivates readers from start to finish.
===
text: Due to its strategic location, the city has become a major hub for trade and commerce, fostering economic growth and development.
===
text: The app's updated security features ensure that user data remains protected against any potential threats or breaches.
===
text: The workshop offered participants a hands-on experience with the latest advancements in renewable energy technology.
===
text: Equipped with a comprehensive map of the park, visitors can explore its many attractions at their own pace, ensuring a memorable experience.
===
text: By adopting a minimalist approach, the new architectural design focuses on space utilization, creating an open and airy atmosphere.
===
text: Offering breathtaking views and luxurious amenities, the resort provides an idyllic getaway for those seeking relaxation and tranquility.
===
text: The innovative app has transformed communication by integrating real-time translation features that bridge language barriers seamlessly.
===
text: The event brought together a diverse array of speakers, each sharing unique perspectives that enriched the audience's understanding of global issues.
===
text: With an engaging storyline and stunning visuals, the film transports viewers to a fantastical world filled with adventure and intrigue.
===
text: The culinary festival showcases a variety of international cuisines, offering attendees a chance to indulge in exotic flavors and culinary delights.
===
text: Through its scholarship program, the foundation aims to empower underprivileged students by providing them with opportunities for higher education.
===
text: The cutting-edge laboratory is equipped to facilitate groundbreaking research and foster innovation across various scientific disciplines.
===
text: The meticulous restoration of the painting involved a team of experts working tirelessly to preserve the artist's original vision and technique.
===
text: The eco-friendly initiative encourages communities to engage in sustainable practices, promoting environmental awareness and conservation.
===
text: By merging traditional craftsmanship with contemporary aesthetics, the designer has redefined the boundaries of modern fashion.
===
text: Despite fierce competition, the startup has achieved remarkable success, gaining recognition for its innovative approach and dynamic team.
`````
