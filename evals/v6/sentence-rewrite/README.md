## sentence-rewrite ([json](./evals\v6\sentence-rewrite/report.json))

- 6 rules
- 6 inverse rules
- 36 tests, 0 baseline tests

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
Rewrite individual sentences to improve readability and conversational flow.
`````


### [input_spec.txt](./input_spec.txt)

`````txt
The input is a sentence provided by the user.
The sentence can be composed of any combination of words, punctuation, and common grammatical structures.
The sentence must represent a complete thought and be understandable on its own.
There are no explicit length constraints mentioned for the sentence input.
`````


### [rules.txt](./rules.txt)

`````txt
1: The output must be a rewritten version of the input sentence provided by the user in the placeholder {{text}}, enhancing its readability and making it sound more conversational than the original sentence.
2: The original meaning and factual accuracy of the input sentence must be preserved in the rewritten sentence.
3: The rewritten sentence must simplify complex phrases present in the input sentence, using language that's easy to relate to, to improve readability.
4: The output must create a fluid and engaging structure for the rewritten sentence, enhancing its readability and appeal.
5: The output should reflect changes in style, wording, and other elements that facilitate a more conversational tone without altering the original intent or information of the input sentence.
6: The output is specifically aimed at improving individual sentences rather than entire paragraphs, such that the focus is only on the immediate sentence provided in the input.
`````


### [inverse_rules.txt](./inverse_rules.txt)

`````txt
7: The output may distort or alter the original sentence provided by the user, making it harder to understand or less conversational than the original sentence.
8: The original meaning and factual accuracy of the input sentence may be disregarded, leading to potential misinterpretations in the rewritten sentence.
9: The rewritten sentence can use complex language, ignoring efforts to simplify phrases and improve readability.
10: The output may create a disjointed and unappealing structure for the rewritten sentence, detracting from its readability and engagement.
11: The output should alter the style, wording, and other elements to create a less conversational tone, potentially changing the original intent or information of the input sentence.
12: The output can degrade entire paragraphs even if the focus is only on the immediate sentence provided in the input.
`````


### [tests.csv](./tests.csv)

|testinput|expectedoutput|reasoning|
|-|-|-|
|Beneath the canopy of stars, a silent owl watched over the dark forest\.|Under the starry sky, a quiet owl kept an eye on the shadowy woods\.|Tests if the output enhances readability and conversational tone while maintaining meaning and factual accuracy\.|
|The sun dipped below the horizon as waves gently kissed the shore\.|As the sun set, the waves softly touched the beach\.|Checks for improved readability and a conversational style that maintains the original sentence's essence\.|
|Despite the heavy rain, the marathon continued with unyielding fervor\.|Even though it rained hard, the marathon went on with relentless passion\.|Tests whether the input is simplified and made more conversational without losing factual content\.|
|The ancient castle stood as a testament to the forgotten era, untouched by time\.|The old castle was a symbol of a bygone age, unchanged by the years\.|Ensures that meaning and factual accuracy are preserved while rewording for clarity and style\.|
|On the bustling streets, vendors sold an array of vibrant goods\.|Vendors hawked brightly colored wares on the busy streets\.|The rewritten sentence retains the original meaning and facts, ensuring communication of the same message\.|
|His decision to leave marked the end of an era for the organization\.|His choice to depart signaled the close of a chapter for the organization\.|Validates that the original meaning and facts are intact in a more conversational output\.|
|The quick brown fox gracefully leapt over the lethargic canine\.|The fast brown fox effortlessly jumped over the lazy dog\.|Checks simplification of complex phrasing while preserving meaning for improved readability\.|
|With meticulous precision, the artist crafted a portrait of great detail\.|The artist carefully created a detailed portrait\.|Assesses the ability to simplify to improve readability while retaining the sentence's core intention\.|
|The report delved into an exhaustive analysis of multifaceted socio\-economic dynamics\.|The report thoroughly explored complex socio\-economic factors\.|Tests the simplification of complex language to enhance readability while preserving meaning\.|
|Amidst the chaos, the leader's voice resonated with calm authority\.|In the midst of the turmoil, the leader spoke with calm authority\.|Evaluates structuring improvements for fluid engagement while maintaining core meaning\.|
|The explorer navigated the dense jungle with unwavering determination\.|The explorer moved through the thick jungle with steady resolve\.|Assesses fluidity and engagement enhancement in the rewritten output while preserving the original message\.|
|Her laughter filled the room with a warmth that melted the cold silence\.|Her laughter warmed the room and broke the cold silence\.|Tests whether the output creates a more engaging structure while keeping the original meaning\.|
|Driven by ambition, he climbed the corporate ladder with unmatched agility\.|Fueled by ambition, he rose quickly up the corporate ranks\.|Validates style and wording changes for conversational tone without altering intent or facts\.|
|The landscape was breathtaking, a symphony of colors and textures\.|The scenery was stunning, with a blend of vibrant colors and textures\.|Ensures conversational tone and style adaptation without compromising original information\.|
|In an act of sheer bravery, she confronted the fears that had plagued her\.|In an incredibly brave move, she faced the fears that had haunted her\.|Checks that the output changes style effectively while preserving intent and content\.|
|The cat napped on the windowsill, basking in the afternoon sun\.|The cat slept on the windowsill in the warm afternoon sunlight\.|Tests focus on sentence improvement without altering surrounding paragraph context\.|
|The river flowed peacefully, reflecting the clear blue of the sky\.|The river ran gently, mirroring the clear blue sky\.|Assesses if the focus remains on the individual sentence while improving readability\.|
|A gentle breeze rustled the leaves, whispering secrets of the forest\.|A soft breeze stirred the leaves, quietly sharing the forest's secrets\.|Validates improvement on a standalone sentence without affecting the broader context\.|
|Under the golden sun, the fields stretched endlessly\.|In the bright yellow sun, the fields seemed to shrink\.|Challenges the software by altering meaning and conversational tone negatively\.|
|A harmonious melody played by the brook enthralled the passersby\.|A discordant tune from the brook confused the passersby\.|Tests degradation of meaning and readability contrary to the rule's aim\.|
|The chef's signature dish blended flavors with exquisite precision\.|The chef's special dish mixed flavors in a haphazard way\.|Assesses if the software outputs undesirable changes contrary to enhancing effectiveness\.|
|The lighthouse stood as a beacon for lost ships along the coast\.|A small house flickered in the night, confusing the ships\.|Checks if meaning and factual accuracy are discarded, leading to misinterpretation\.|
|The serene garden provided a perfect escape from the bustling city\.|An ordinary yard buzzed with the chaos of city life\.|Tests whether the software can shift the intended meaning and accuracy\.|
|Her smile held the promise of a bright future\.|Her frown hinted at bleak days ahead\.|Validates disregard for original meaning and facts, against maintaining comprehension\.|
|During the presentation, the audience listened intently to his complex theories\.|Throughout the demonstration, the crowd attentively absorbed his intricate postulations\.|Tests the usage of complex language and reduced readability and accessibility\.|
|The quaint village remained untouched by modern life, a window into the past\.|The unpretentious hamlet stayed unaffected by contemporary civilization, an aperture into antiquity\.|Checks the introduction of complex phrasing that complicates understanding\.|
|With each passing season, the tree grew stronger and more resilient\.|As every quarter went by, the arboreal entity manifested augmented fortitude and robustness\.|Assesses usage of unnecessarily complex language, increasing difficulty\.|
|In the heat of the moment, clarity was elusive\.|There was confusion awkwardly waving in the intense instant\.|Evaluates structural degradation for readability and engagement negatively\.|
|With a heart full of passion, she pursued her dreams relentlessly\.|She awkwardly chased her dreams with an uncomfortably passionate heart\.|Tests disjointed structuring that detracts from readability contrary to expectations\.|
|The dawn broke gently, painting the sky in hues of pink and gold\.|The morning suddenly appeared, clumsily splashing colors of dawn\.|Checks if structural integrity is compromised, rendering the sentence less engaging\.|
|The majestic waterfall cascaded into a crystal\-clear pool\.|The unremarkable waterfall toppled into a muddy puddle\.|Tests how the software might alter style and tone to lose conversational appeal\.|
|In her eyes, I saw hope and a longing for adventure\.|I saw in her eyes, a bleak view contrary to anticipation\.|Assesses if changes in style result in an unexplained depersonalization or miscommunication\.|
|Amidst tall skyscrapers, birds chirped their morning songs\.|Among the high buildings, the birds croaked discordantly in the dawn\.|Ensures output does not detract from conversational tone nor alter original intent\.|
|He tapped rhythmically on the table, lost in thought\.|The large room was filled with ominous fog as he rhythmically tapped\.|Challenges the focus by introducing unnecessary complexity to the paragraph\.|
|Bent over his books, he hardly noticed the world outside\.|The long lecture hall buzzed with arguments, overshadowing the scene of his study\.|Tests if irrelevant information alters the focus from intention to an unnecessary scope\.|
|A rainbow appeared, arching over the lush meadow\.|As the debate raged on, a fierce hailstorm replaced the meadow's tranquility\.|Ensures the rewritten output doesn't degrade understanding by altering unrelated details\.|