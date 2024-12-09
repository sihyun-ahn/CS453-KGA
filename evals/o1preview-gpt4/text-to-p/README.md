## text-to-p ([json](./evals\o1preview-gpt4\text-to-p/report.json))

- 11 rules
- 11 inverse rules
- 132 tests, 66 baseline tests

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
To format a paragraph of text as HTML by splitting it into individual sentences, wrapping each sentence with `<p>` tags, and adding `<strong>` and `<em>` tags to emphasize key words and phrases.
`````


### [input_spec.txt](./input_spec.txt)

`````txt
The input is a paragraph of text.
The input should contain at least three sentences.
`````


### [rules.txt](./rules.txt)

`````txt
1: The output should be an HTML formatted text.
2: The output should consist of the input paragraph split into individual sentences.
3: Each individual sentence should be enclosed within a pair of `<p>` tags.
4: There should be at least three pairs of `<p>` tags in the output, corresponding to at least three sentences.
5: Inside each `<p>` tag, there should be exactly one `<strong>` tag that wraps a key word or phrase from the sentence.
6: Inside each `<p>` tag, there should be multiple `<em>` tags that each wrap key words or phrases from the sentence.
7: Key words and phrases refer to important or emphasized words or short phrases within the sentence.
8: The `<strong>` tag should be properly nested within the `<p>` tags and should not overlap with any `<em>` tags.
9: The `<em>` tags should be properly nested within the `<p>` tags and should not overlap improperly with the `<strong>` tag.
10: The content inside the `<strong>` and `<em>` tags should be words or phrases taken directly from the original sentence.
11: The output should not contain any additional text or content beyond the formatted sentences with the specified HTML tags.
`````


### [inverse_rules.txt](./inverse_rules.txt)

`````txt
12: The output should not be an HTML formatted text.
13: The output should not consist of the input paragraph split into individual sentences.
14: Sentences should not be enclosed within `<p>` tags.
15: There should be fewer than three pairs of `<p>` tags in the output.
16: Inside each `<p>` tag, there should be either no `<strong>` tags or multiple `<strong>` tags.
17: Inside each `<p>` tag, there should be at most one `<em>` tag or none at all.
18: Key words and phrases should refer to unimportant or random words within the sentence.
19: The `<strong>` tag should not be properly nested within the `<p>` tags and may overlap with `<em>` tags.
20: The `<em>` tags should not be properly nested within the `<p>` tags and may overlap improperly with the `<strong>` tag.
21: The content inside the `<strong>` and `<em>` tags should not be words or phrases taken directly from the original sentence.
22: The output should contain additional text or content beyond the formatted sentences, possibly with unspecified HTML tags.
`````


### [tests.csv](./tests.csv)

|testinput|expectedoutput|reasoning|
|-|-|-|
|The quick brown fox jumps over the lazy dog\. A journey of a thousand miles begins with a single step\. To be or not to be, that is the question\.|An HTML formatted text where the paragraph is split into sentences, each sentence is wrapped in lt;pgt; tags with one lt;stronggt; tag and multiple lt;emgt; tags highlighting key words or phrases\.|This test verifies that the software outputs HTML formatted text, ensuring compliance with rule 1\.|
|Innovation drives progress\. Challenges inspire creativity\. Together, we shape the future\.|An HTML formatted text with sentences enclosed in lt;pgt; tags, containing one lt;stronggt; tag and multiple lt;emgt; tags per sentence\.|This test confirms that the software produces HTML formatted output, adhering to rule 1\.|
|Technology evolves rapidly\. Adaptation is essential\. Continuous learning leads to success\.|An HTML formatted text where each sentence is properly formatted with HTML tags as specified\.|This test ensures the output is HTML formatted text, validating compliance with rule 1\.|
|Dr\. Smith arrived early\. He prepared for the lecture\. Students awaited eagerly\.|An HTML formatted text where the paragraph is split into individual sentences at appropriate boundaries, each wrapped in lt;pgt; tags\.|This test checks sentence splitting, especially with abbreviations like 'Dr\.', ensuring adherence to rule 2\.|
|She exclaimed, 'What a beautiful day\!' Everyone agreed\. The mood was joyful\.|An HTML formatted text with sentences correctly separated, handling exclamations and quotations, each in lt;pgt; tags\.|This test verifies correct splitting of sentences with quotations and exclamations as per rule 2\.|
|First, mix the ingredients\. Second, bake for 30 minutes\. Finally, let it cool\.|An HTML formatted text where steps are recognized as separate sentences and wrapped in lt;pgt; tags\.|This test confirms that ordered instructions are correctly split into sentences, complying with rule 2\.|
|Birds fly in the sky\. Fish swim in the sea\. Animals roam the land\.|Each sentence is enclosed within a pair of lt;pgt; tags in the HTML formatted output\.|This test ensures each individual sentence is wrapped in lt;pgt; tags, as required by rule 3\.|
|Autumn leaves fall\. Winter brings snow\. Spring blossoms bloom\.|An HTML output where every sentence is within its own lt;pgt; tags\.|This test verifies that sentences are properly enclosed in lt;pgt; tags, adhering to rule 3\.|
|Books educate us\. Stories captivate us\. Knowledge empowers us\.|Each sentence is individually wrapped in lt;pgt; tags in the output\.|This test checks that sentences are correctly enclosed within lt;pgt; tags, ensuring compliance with rule 3\.|
|Exercise improves health\. Nutrition fuels the body\. Sleep restores energy\. Balance is key\.|At least four pairs of lt;pgt; tags corresponding to the four sentences in the output\.|This test verifies that the output contains at least three lt;pgt; tags, complying with rule 4\.|
|Mountains tower high\. Rivers flow deep\. Forests spread wide\. Deserts stretch far\.|An HTML output with four lt;pgt; tags, each wrapping a sentence\.|This test confirms that the software produces at least three lt;pgt; tags, as required by rule 4\.|
|Art inspires emotion\. Music moves souls\. Dance expresses stories\. Theatre portrays life\.|At least three lt;pgt; tags are present in the output, each containing a sentence\.|This test ensures the presence of at least three lt;pgt; tags in the output, adhering to rule 4\.|
|Ocean waves crash loudly\. The sun sets beautifully\. Stars shine brightly\.|Inside each lt;pgt; tag, there is exactly one lt;stronggt; tag wrapping a key word or phrase\.|This test checks that each sentence has exactly one lt;stronggt; tag, complying with rule 5\.|
|Computers process data\. Software runs applications\. Users interact daily\.|An HTML output where each lt;pgt; contains exactly one lt;stronggt; tag highlighting a key term\.|This test verifies adherence to having one lt;stronggt; tag per sentence as per rule 5\.|
|Gardening relaxes minds\. Planting nurtures growth\. Harvesting yields rewards\.|Each lt;pgt; tag includes exactly one lt;stronggt; tag around a significant word or phrase\.|This test ensures exactly one lt;stronggt; tag per sentence, following rule 5\.|
|Education opens doors\. Knowledge builds confidence\. Learning never ends\.|Inside each lt;pgt; tag, there are multiple lt;emgt; tags wrapping key words or phrases\.|This test checks for multiple lt;emgt; tags in each sentence, ensuring compliance with rule 6\.|
|Photography captures moments\. Light creates art\. Perspectives tell stories\.|An HTML output where each lt;pgt; contains multiple lt;emgt; tags emphasizing key phrases\.|This test verifies that multiple lt;emgt; tags are included per sentence, adhering to rule 6\.|
|Cooking combines flavors\. Spices add depth\. Techniques enhance dishes\.|Each lt;pgt; tag includes multiple lt;emgt; tags around important words or phrases\.|This test confirms multiple lt;emgt; tags per sentence, as required by rule 6\.|
|Leaders inspire change\. Vision drives progress\. Commitment achieves goals\.|Key words and phrases wrapped in lt;stronggt; and lt;emgt; tags are significant to the sentence meaning\.|This test ensures that emphasized words are truly key, complying with rule 7\.|
|Science explains phenomena\. Experiments test hypotheses\. Discoveries expand understanding\.|Emphasized words are important terms like 'Science' and 'Experiments\.'|This test verifies that key words are meaningful, adhering to rule 7\.|
|Travel broadens horizons\. Cultures enrich experiences\. Adventure awaits everywhere\.|The content inside tags highlights important concepts from the sentences\.|This test confirms that key phrases are appropriately emphasized, following rule 7\.|
|Rain nourishes earth\. Sunshine fosters growth\. Wind spreads seeds\.|The lt;stronggt; tag is properly nested within each lt;pgt; tag and doesn't overlap with lt;emgt; tags\.|This test checks proper nesting of lt;stronggt; tags without overlap, ensuring compliance with rule 8\.|
|Artists create beauty\. Musicians compose melodies\. Writers tell stories\.|An HTML output where lt;stronggt; tags are correctly nested inside lt;pgt; tags without improper overlap\.|This test verifies correct nesting of lt;stronggt; tags as per rule 8\.|
|History teaches lessons\. Experience builds wisdom\. Reflection leads to insight\.|Each lt;stronggt; tag is properly nested within lt;pgt; tags and separate from lt;emgt; tags\.|This test ensures proper nesting and no overlap of lt;stronggt; tags, adhering to rule 8\.|
|Mountains challenge climbers\. Peaks inspire awe\. Valleys offer respite\.|The lt;emgt; tags are properly nested within lt;pgt; tags and don't improperly overlap with lt;stronggt; tags\.|This test checks for correct nesting of lt;emgt; tags, complying with rule 9\.|
|Cities bustle with life\. Streets echo with sounds\. Buildings touch the sky\.|An HTML output where lt;emgt; tags are properly nested within lt;pgt; tags and correctly positioned\.|This test verifies that lt;emgt; tags are properly nested without overlap, adhering to rule 9\.|
|Friendship strengthens bonds\. Trust builds relationships\. Support fosters growth\.|Each lt;emgt; tag is properly nested and doesn't overlap improperly with lt;stronggt; tags\.|This test ensures correct nesting of lt;emgt; tags, following rule 9\.|
|Deserts span vast areas\. Sand dunes shift constantly\. Oases offer refuge\.|Content inside lt;stronggt; and lt;emgt; tags are words or phrases directly from the sentences\.|This test checks that emphasized content is taken directly from the original text, ensuring compliance with rule 10\.|
|Time heals wounds\. Patience brings rewards\. Hope fuels perseverance\.|Emphasized words like 'Time,' 'Patience,' and 'Hope' are from the sentences\.|This test verifies that tags enclose original words, adhering to rule 10\.|
|Innovation sparks change\. Creativity drives solutions\. Ideas shape the future\.|The words inside formatting tags are directly from the sentences\.|This test confirms that only original words are emphasized, following rule 10\.|
|Mountaineering tests endurance\. Planning ensures safety\. Teamwork achieves success\.|The output contains only the formatted sentences with specified HTML tags and no additional content\.|This test ensures no extra content is added to the output, complying with rule 11\.|
|Water sustains life\. Clean sources are vital\. Conservation is necessary\.|An HTML output with only the formatted sentences as specified\.|This test verifies that no additional text is present, adhering to rule 11\.|
|Language connects people\. Communication builds bridges\. Understanding fosters peace\.|The output includes only the formatted sentences, nothing more\.|This test confirms the absence of extra content, following rule 11\.|
|Mathematics is universal\. Equations describe reality\. Numbers reveal patterns\.|The output should not be an HTML formatted text but plain text\.|This test ensures that the software does not output plain text, confirming it continues to produce HTML, thus violating rule 12 which it should not comply with\.|
|Sports unite fans\. Competitions inspire athletes\. Victories bring joy\.|An output that is not in HTML format, indicating incorrect behavior\.|This test verifies that the software does not produce non\-HTML output, ensuring it remains compliant with its specifications, not with rule 12\.|
|Dreams motivate action\. Goals provide direction\. Effort leads to achievement\.|The output lacks HTML formatting, which is undesirable\.|This test checks that the software does not omit HTML formatting, thereby not following rule 12 as intended\.|
|Birds migrate seasonally\. Patterns change yearly\. Observations help scientists\.|The output is not split into sentences, but remains one block of text\.|This test ensures the software correctly splits sentences, not complying with rule 13\.|
|Computers calculate quickly\. Algorithms solve problems\. Code runs applications\.|An output where sentences are not individually separated\.|This test verifies that sentence splitting occurs, contrary to rule 13\.|
|Nutrition impacts health\. Vitamins are essential\. Minerals support functions\.|The output does not split the paragraph into sentences\.|This test confirms the software splits sentences, thus not following rule 13\.|
|Rainbows occur naturally\. Light refracts through droplets\. Colors span the sky\.|Sentences are not enclosed within lt;pgt; tags in the output\.|This test checks that the software does wrap sentences in lt;pgt; tags, not complying with rule 14\.|
|Books offer knowledge\. Stories entertain readers\. Literature enriches minds\.|An output where sentences are not wrapped in lt;pgt; tags\.|This test verifies that lt;pgt; tags are present, thus the software does not follow rule 14\.|
|Forests provide oxygen\. Trees store carbon\. Ecosystems balance nature\.|The absence of lt;pgt; tags enclosing sentences\.|This test ensures that sentences are enclosed in lt;pgt; tags, not adhering to rule 14\.|
|Challenges develop skills\. Overcoming builds confidence\. Success follows effort\.|The output contains fewer than three lt;pgt; tags\.|This test checks that the software includes at least three lt;pgt; tags, not complying with rule 15\.|
|Economies rely on trade\. Markets influence prices\. Consumers drive demand\.|An output with less than three pairs of lt;pgt; tags\.|This test verifies that the software produces the correct number of lt;pgt; tags, contrary to rule 15\.|
|Medicine advances health\. Research discovers cures\. Treatment saves lives\.|Fewer than three sentences are enclosed with lt;pgt; tags\.|This test ensures at least three lt;pgt; tags are present, not following rule 15\.|
|Wind powers turbines\. Energy generates electricity\. Renewables reduce emissions\.|Each lt;pgt; tag has either no lt;stronggt; tags or multiple lt;stronggt; tags\.|This test checks that the software includes exactly one lt;stronggt; tag per lt;pgt;, not complying with rule 16\.|
|Art reflects culture\. Creativity expresses ideas\. Galleries display works\.|An output where lt;pgt; tags contain multiple lt;stronggt; tags\.|This test verifies that the software maintains one lt;stronggt; tag per sentence, contrary to rule 16\.|
|Marine life thrives underwater\. Coral reefs host species\. Oceans cover earth\.|lt;pgt; tags without lt;stronggt; tags or with several lt;stronggt; tags inside\.|This test ensures proper use of one lt;stronggt; tag per lt;pgt;, not adhering to rule 16\.|
|Mountains offer adventures\. Trails challenge hikers\. Views reward climbers\.|Each lt;pgt; tag has at most one lt;emgt; tag or none at all\.|This test checks that the software includes multiple lt;emgt; tags, not complying with rule 17\.|
|Dance expresses emotion\. Movement tells stories\. Rhythm guides steps\.|An output where lt;pgt; tags contain one or no lt;emgt; tags\.|This test verifies that multiple lt;emgt; tags are included, contrary to rule 17\.|
|Technology connects people\. Networks share information\. Devices enable access\.|lt;pgt; tags with minimal or no lt;emgt; tags present\.|This test ensures multiple lt;emgt; tags are used per sentence, not following rule 17\.|
|Markets fluctuate daily\. Stocks go up\. Investments carry risk\.|Key words wrapped are unimportant or random words like 'go' or 'carry\.'|This test checks that the software emphasizes meaningful words, not complying with rule 18\.|
|Cooking requires ingredients\. Recipes guide steps\. Timing affects flavor\.|Unimportant words like 'requires' or 'guide' are emphasized\.|This test verifies that key words are properly chosen, contrary to rule 18\.|
|Weather changes often\. Forecasts predict conditions\. Climate impacts life\.|Random words are emphasized instead of key concepts\.|This test ensures that important words are emphasized, not adhering to rule 18\.|
|Education shapes futures\. Teachers inspire minds\. Knowledge empowers people\.|lt;stronggt; tags are not properly nested and overlap with lt;emgt; tags\.|This test checks that the software nests tags correctly, not complying with rule 19\.|
|Music transcends language\. Notes convey emotion\. Harmony unites sounds\.|An output where lt;stronggt; tags improperly overlap with lt;emgt; tags\.|This test verifies correct tag nesting, contrary to rule 19\.|
|Fitness boosts health\. Exercise strengthens bodies\. Wellness promotes happiness\.|Overlapping of lt;stronggt; and lt;emgt; tags occurs\.|This test ensures no improper tag overlap exists, not following rule 19\.|
|Colors affect mood\. Design influences perception\. Art impacts emotion\.|lt;emgt; tags are not properly nested and overlap with lt;stronggt; tags inappropriately\.|This test checks for proper nesting of lt;emgt; tags, not complying with rule 20\.|
|Travel experiences educate\. Cultures broaden perspectives\. Journeys create memories\.|An output where lt;emgt; tags improperly overlap with lt;stronggt; tags\.|This test verifies correct tag structure, contrary to rule 20\.|
|Innovation changes industries\. Ideas disrupt markets\. Technology drives growth\.|Improper nesting and overlapping of formatting tags occur\.|This test ensures proper nesting without overlap, not adhering to rule 20\.|
|Nature inspires art\. Landscapes captivate artists\. Wildlife intrigues observers\.|Content inside tags is not from the original sentences\.|This test checks that the software uses original words in tags, not complying with rule 21\.|
|Poetry evokes emotion\. Words paint pictures\. Verses flow rhythmically\.|Emphasized content includes words not present in the sentences\.|This test verifies that only original text is emphasized, contrary to rule 21\.|
|Leadership guides teams\. Strategy plans success\. Vision sets direction\.|Tags enclose words not taken directly from the sentences\.|This test ensures accurate emphasis of original content, not following rule 21\.|
|Cities expand rapidly\. Infrastructure develops\. Communities grow together\.|The output contains additional text beyond formatted sentences\.|This test checks that no extra content is added, not complying with rule 22\.|
|Water flows continuously\. Rivers carve landscapes\. Oceans connect continents\.|An output with unspecified HTML tags or extra content\.|This test verifies that only specified formatting is used, contrary to rule 22\.|
|Culture shapes identity\. Traditions enrich lives\. Heritage preserves history\.|Additional text or unspecified tags are present in the output\.|This test ensures the output includes only what is specified, not adhering to rule 22\.|

### [test_evals.csv](./test_evals.csv)

|rule|model|input|coverage|validity|
|-|-|-|-|-|
|The output should be an HTML formatted text\.|gpt\-4o\-2024\-08\-06|The quick brown fox jumps over the lazy dog\. A journey of a thousand miles begins with a single step\. To be or not to be, that is the question\.|\`\`\`html<br>lt;pgt;The quick brown fox lt;stronggt;jumpslt;/stronggt; over the lt;emgt;lazylt;/emgt; dog\.lt;/pgt;<br>lt;pgt;A journey of a lt;stronggt;thousand mileslt;/stronggt; begins with a lt;emgt;singlelt;/emgt; step\.lt;/pgt;<br>lt;pgt;To lt;stronggt;belt;/stronggt; or lt;emgt;notlt;/emgt; to be, that is the lt;emgt;questionlt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|The output should be an HTML formatted text\.|gpt\-4o\-2024\-08\-06|Innovation drives progress\. Challenges inspire creativity\. Together, we shape the future\.|\`\`\`html<br>lt;pgt;lt;emgt;Innovationlt;/emgt; lt;stronggt;driveslt;/stronggt; lt;emgt;progresslt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;emgt;Challengeslt;/emgt; inspire lt;stronggt;creativitylt;/stronggt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Togetherlt;/stronggt;, we lt;emgt;shapelt;/emgt; the lt;emgt;futurelt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|The output should be an HTML formatted text\.|gpt\-4o\-2024\-08\-06|Technology evolves rapidly\. Adaptation is essential\. Continuous learning leads to success\.|\`\`\`html<br>lt;pgt;Technology lt;stronggt;evolveslt;/stronggt; lt;emgt;rapidlylt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Adaptationlt;/stronggt; is lt;emgt;essentiallt;/emgt;\.lt;/pgt;<br>lt;pgt;Continuous lt;stronggt;learninglt;/stronggt; leads to lt;emgt;successlt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|The output should consist of the input paragraph split into individual sentences\.|gpt\-4o\-2024\-08\-06|Dr\. Smith arrived early\. He prepared for the lecture\. Students awaited eagerly\.|\`\`\`html<br>lt;pgt;Dr\. lt;stronggt;Smithlt;/stronggt; lt;emgt;arrivedlt;/emgt; early\.lt;/pgt;<br>lt;pgt;He lt;emgt;preparedlt;/emgt; for the lt;stronggt;lecturelt;/stronggt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Studentslt;/stronggt; lt;emgt;awaitedlt;/emgt; eagerly\.lt;/pgt;<br>\`\`\`|ok|
|The output should consist of the input paragraph split into individual sentences\.|gpt\-4o\-2024\-08\-06|She exclaimed, 'What a beautiful day\!' Everyone agreed\. The mood was joyful\.|\`\`\`html<br>lt;pgt;She exclaimed, 'lt;stronggt;What alt;/stronggt; lt;emgt;beautifullt;/emgt; lt;emgt;daylt;/emgt;\!'lt;/pgt;<br>lt;pgt;lt;stronggt;Everyonelt;/stronggt; lt;emgt;agreedlt;/emgt;\.lt;/pgt;<br>lt;pgt;The lt;stronggt;moodlt;/stronggt; was lt;emgt;joyfullt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|The output should consist of the input paragraph split into individual sentences\.|gpt\-4o\-2024\-08\-06|First, mix the ingredients\. Second, bake for 30 minutes\. Finally, let it cool\.|\`\`\`html<br>lt;pgt;First, lt;stronggt;mixlt;/stronggt; the lt;emgt;ingredientslt;/emgt;\.lt;/pgt;<br>lt;pgt;Second, lt;stronggt;bakelt;/stronggt; for lt;emgt;30 minuteslt;/emgt;\.lt;/pgt;<br>lt;pgt;Finally, lt;stronggt;letlt;/stronggt; it lt;emgt;coollt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|Each individual sentence should be enclosed within a pair of \`lt;pgt;\` tags\.|gpt\-4o\-2024\-08\-06|Birds fly in the sky\. Fish swim in the sea\. Animals roam the land\.|\`\`\`html<br>lt;pgt;Birds lt;stronggt;flylt;/stronggt; in the lt;emgt;skylt;/emgt;\.lt;/pgt;<br>lt;pgt;Fish lt;stronggt;swimlt;/stronggt; in the lt;emgt;sealt;/emgt;\.lt;/pgt;<br>lt;pgt;Animals lt;stronggt;roamlt;/stronggt; the lt;emgt;landlt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|Each individual sentence should be enclosed within a pair of \`lt;pgt;\` tags\.|gpt\-4o\-2024\-08\-06|Autumn leaves fall\. Winter brings snow\. Spring blossoms bloom\.|\`\`\`html<br>lt;pgt;Autumn lt;stronggt;leaveslt;/stronggt; lt;emgt;falllt;/emgt;\.lt;/pgt;<br>lt;pgt;Winter lt;stronggt;bringslt;/stronggt; lt;emgt;snowlt;/emgt;\.lt;/pgt;<br>lt;pgt;Spring lt;stronggt;blossomslt;/stronggt; lt;emgt;bloomlt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|Each individual sentence should be enclosed within a pair of \`lt;pgt;\` tags\.|gpt\-4o\-2024\-08\-06|Books educate us\. Stories captivate us\. Knowledge empowers us\.|\`\`\`html<br>lt;pgt;lt;stronggt;Bookslt;/stronggt; lt;emgt;educatelt;/emgt; us\.lt;/pgt;<br>lt;pgt;lt;stronggt;Storieslt;/stronggt; lt;emgt;captivatelt;/emgt; us\.lt;/pgt;<br>lt;pgt;lt;stronggt;Knowledgelt;/stronggt; lt;emgt;empowerslt;/emgt; us\.lt;/pgt;<br>\`\`\`|ok|
|There should be at least three pairs of \`lt;pgt;\` tags in the output, corresponding to at least three sentences\.|gpt\-4o\-2024\-08\-06|Exercise improves health\. Nutrition fuels the body\. Sleep restores energy\. Balance is key\.|\`\`\`html<br>lt;pgt;Exercise lt;stronggt;improveslt;/stronggt; lt;emgt;healthlt;/emgt;\.lt;/pgt;<br>lt;pgt;Nutrition lt;stronggt;fuelslt;/stronggt; the lt;emgt;bodylt;/emgt;\.lt;/pgt;<br>lt;pgt;Sleep lt;stronggt;restoreslt;/stronggt; lt;emgt;energylt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Balancelt;/stronggt; is lt;emgt;keylt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|There should be at least three pairs of \`lt;pgt;\` tags in the output, corresponding to at least three sentences\.|gpt\-4o\-2024\-08\-06|Mountains tower high\. Rivers flow deep\. Forests spread wide\. Deserts stretch far\.|\`\`\`html<br>lt;pgt;lt;emgt;Mountainslt;/emgt; lt;stronggt;towerlt;/stronggt; high\.lt;/pgt;<br>lt;pgt;lt;emgt;Riverslt;/emgt; flow lt;stronggt;deeplt;/stronggt;\.lt;/pgt;<br>lt;pgt;lt;emgt;Forestslt;/emgt; spread lt;stronggt;widelt;/stronggt;\.lt;/pgt;<br>lt;pgt;lt;emgt;Desertslt;/emgt; lt;stronggt;stretchlt;/stronggt; far\.lt;/pgt;<br>\`\`\`|ok|
|There should be at least three pairs of \`lt;pgt;\` tags in the output, corresponding to at least three sentences\.|gpt\-4o\-2024\-08\-06|Art inspires emotion\. Music moves souls\. Dance expresses stories\. Theatre portrays life\.|\`\`\`html<br>lt;pgt;Art lt;stronggt;inspireslt;/stronggt; lt;emgt;emotionlt;/emgt;\.lt;/pgt;<br>lt;pgt;Music lt;stronggt;moveslt;/stronggt; lt;emgt;soulslt;/emgt;\.lt;/pgt;<br>lt;pgt;Dance lt;stronggt;expresseslt;/stronggt; lt;emgt;storieslt;/emgt;\.lt;/pgt;<br>lt;pgt;Theatre lt;stronggt;portrayslt;/stronggt; lt;emgt;lifelt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|Inside each \`lt;pgt;\` tag, there should be exactly one \`lt;stronggt;\` tag that wraps a key word or phrase from the sentence\.|gpt\-4o\-2024\-08\-06|Ocean waves crash loudly\. The sun sets beautifully\. Stars shine brightly\.|\`\`\`html<br>lt;pgt;Ocean waves crash lt;stronggt;loudlylt;/stronggt;\. lt;emgt;Oceanlt;/emgt; lt;emgt;waveslt;/emgt; lt;emgt;crashlt;/emgt; with power\.lt;/pgt;<br>lt;pgt;The sun sets lt;stronggt;beautifullylt;/stronggt;\. lt;emgt;Thelt;/emgt; lt;emgt;sunlt;/emgt; lt;emgt;setslt;/emgt; over the horizon\.lt;/pgt;<br>lt;pgt;Stars shine lt;stronggt;brightlylt;/stronggt;\. lt;emgt;Starslt;/emgt; lt;emgt;illuminatelt;/emgt; the lt;emgt;nightlt;/emgt; sky\.lt;/pgt;<br>\`\`\`|ok|
|Inside each \`lt;pgt;\` tag, there should be exactly one \`lt;stronggt;\` tag that wraps a key word or phrase from the sentence\.|gpt\-4o\-2024\-08\-06|Computers process data\. Software runs applications\. Users interact daily\.|\`\`\`html<br>lt;pgt;Computers process lt;stronggt;datalt;/stronggt;\. lt;emgt;Processinglt;/emgt; is crucial for lt;emgt;computinglt;/emgt; tasks\.lt;/pgt;<br>lt;pgt;Software runs lt;stronggt;applicationslt;/stronggt;\. lt;emgt;Applicationslt;/emgt; streamline lt;emgt;operationslt;/emgt; and improve lt;emgt;productivitylt;/emgt;\.lt;/pgt;<br>lt;pgt;Users lt;stronggt;interactlt;/stronggt; daily\. lt;emgt;Interactionlt;/emgt; is vital for lt;emgt;productivitylt;/emgt; and lt;emgt;efficiencylt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|Inside each \`lt;pgt;\` tag, there should be exactly one \`lt;stronggt;\` tag that wraps a key word or phrase from the sentence\.|gpt\-4o\-2024\-08\-06|Gardening relaxes minds\. Planting nurtures growth\. Harvesting yields rewards\.|\`\`\`html<br>lt;pgt;lt;stronggt;Gardeninglt;/stronggt; lt;emgt;relaxeslt;/emgt; lt;emgt;mindslt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Plantinglt;/stronggt; lt;emgt;nurtureslt;/emgt; lt;emgt;growthlt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Harvestinglt;/stronggt; lt;emgt;yieldslt;/emgt; lt;emgt;rewardslt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|Inside each \`lt;pgt;\` tag, there should be multiple \`lt;emgt;\` tags that each wrap key words or phrases from the sentence\.|gpt\-4o\-2024\-08\-06|Education opens doors\. Knowledge builds confidence\. Learning never ends\.|\`\`\`html<br>lt;pgt;lt;stronggt;Educationlt;/stronggt; lt;emgt;openslt;/emgt; lt;emgt;doorslt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Knowledgelt;/stronggt; lt;emgt;buildslt;/emgt; lt;emgt;confidencelt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Learninglt;/stronggt; lt;emgt;neverlt;/emgt; lt;emgt;endslt;/emgt;\.lt;/pgt;<br>\`\`\`|err|
|Inside each \`lt;pgt;\` tag, there should be multiple \`lt;emgt;\` tags that each wrap key words or phrases from the sentence\.|gpt\-4o\-2024\-08\-06|Photography captures moments\. Light creates art\. Perspectives tell stories\.|\`\`\`html<br>lt;pgt;lt;stronggt;Photographylt;/stronggt; captures lt;emgt;momentslt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Lightlt;/stronggt; creates lt;emgt;artlt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Perspectiveslt;/stronggt; tell lt;emgt;storieslt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|Inside each \`lt;pgt;\` tag, there should be multiple \`lt;emgt;\` tags that each wrap key words or phrases from the sentence\.|gpt\-4o\-2024\-08\-06|Cooking combines flavors\. Spices add depth\. Techniques enhance dishes\.|\`\`\`html<br>lt;pgt;Cooking combines lt;stronggt;flavorslt;/stronggt;\. lt;emgt;Cookinglt;/emgt; itself is an lt;emgt;artlt;/emgt;\.lt;/pgt; <br>lt;pgt;lt;stronggt;Spiceslt;/stronggt; add lt;emgt;depthlt;/emgt; to the dish\. They lt;emgt;transformlt;/emgt; ordinary meals\.lt;/pgt; <br>lt;pgt;lt;stronggt;Techniqueslt;/stronggt; enhance lt;emgt;disheslt;/emgt;\. Proper lt;emgt;executionlt;/emgt; is key\.lt;/pgt;<br>\`\`\`|ok|
|Key words and phrases refer to important or emphasized words or short phrases within the sentence\.|gpt\-4o\-2024\-08\-06|Leaders inspire change\. Vision drives progress\. Commitment achieves goals\.|\`\`\`html<br>lt;pgt;Leaders lt;stronggt;inspirelt;/stronggt; lt;emgt;changelt;/emgt;\.lt;/pgt;<br>lt;pgt;Vision lt;emgt;driveslt;/emgt; lt;stronggt;progresslt;/stronggt;\.lt;/pgt;<br>lt;pgt;Commitment lt;emgt;achieveslt;/emgt; lt;stronggt;goalslt;/stronggt;\.lt;/pgt;<br>\`\`\`|ok|
|Key words and phrases refer to important or emphasized words or short phrases within the sentence\.|gpt\-4o\-2024\-08\-06|Science explains phenomena\. Experiments test hypotheses\. Discoveries expand understanding\.|\`\`\`html<br>lt;pgt;Science explains lt;stronggt;phenomenalt;/stronggt;\. lt;emgt;Sciencelt;/emgt; unravels the complexities of the lt;emgt;natural worldlt;/emgt;\.lt;/pgt;<br>lt;pgt;Experiments test lt;stronggt;hypotheseslt;/stronggt;\. Through lt;emgt;careful observationlt;/emgt; and lt;emgt;analysislt;/emgt;, experiments confirm or refute lt;emgt;scientific ideaslt;/emgt;\.lt;/pgt;<br>lt;pgt;Discoveries expand lt;stronggt;understandinglt;/stronggt;\. With each new lt;emgt;findinglt;/emgt;, our knowledge of the lt;emgt;universelt;/emgt; deepens and broadens\.lt;/pgt;<br>\`\`\`|ok|
|Key words and phrases refer to important or emphasized words or short phrases within the sentence\.|gpt\-4o\-2024\-08\-06|Travel broadens horizons\. Cultures enrich experiences\. Adventure awaits everywhere\.|\`\`\`html<br>lt;pgt;Travel lt;stronggt;broadenslt;/stronggt; lt;emgt;horizonslt;/emgt;\.lt;/pgt;<br>lt;pgt;Cultures lt;stronggt;enrichlt;/stronggt; lt;emgt;experienceslt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;emgt;Adventurelt;/emgt; lt;stronggt;awaitslt;/stronggt; lt;emgt;everywherelt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|The \`lt;stronggt;\` tag should be properly nested within the \`lt;pgt;\` tags and should not overlap with any \`lt;emgt;\` tags\.|gpt\-4o\-2024\-08\-06|Rain nourishes earth\. Sunshine fosters growth\. Wind spreads seeds\.|\`\`\`html<br>lt;pgt;Rain lt;emgt;nourisheslt;/emgt; the lt;stronggt;earthlt;/stronggt;\.lt;/pgt;<br>lt;pgt;Sunshine lt;emgt;fosterslt;/emgt; lt;stronggt;growthlt;/stronggt;\.lt;/pgt;<br>lt;pgt;Wind lt;emgt;spreadslt;/emgt; lt;stronggt;seedslt;/stronggt;\.lt;/pgt;<br>\`\`\`|ok|
|The \`lt;stronggt;\` tag should be properly nested within the \`lt;pgt;\` tags and should not overlap with any \`lt;emgt;\` tags\.|gpt\-4o\-2024\-08\-06|Artists create beauty\. Musicians compose melodies\. Writers tell stories\.|\`\`\`html<br>lt;pgt;Artists create lt;stronggt;beautylt;/stronggt;\. lt;emgt;Artistslt;/emgt; have the power to evoke emotions and capture moments in time through their art\.lt;/pgt;<br>lt;pgt;Musicians lt;stronggt;composelt;/stronggt; lt;emgt;melodieslt;/emgt;\. They inspire and bring people together through lt;emgt;rhythmlt;/emgt; and lt;emgt;harmonylt;/emgt;\.lt;/pgt;<br>lt;pgt;Writers tell lt;stronggt;storieslt;/stronggt;\. They lt;emgt;craftlt;/emgt; narratives that transport readers to lt;emgt;different worldslt;/emgt; and evoke lt;emgt;deep emotionslt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|The \`lt;stronggt;\` tag should be properly nested within the \`lt;pgt;\` tags and should not overlap with any \`lt;emgt;\` tags\.|gpt\-4o\-2024\-08\-06|History teaches lessons\. Experience builds wisdom\. Reflection leads to insight\.|\`\`\`html<br>lt;pgt;lt;stronggt;Historylt;/stronggt; teaches lt;emgt;lessonslt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Experiencelt;/stronggt; builds lt;emgt;wisdomlt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Reflectionlt;/stronggt; leads to lt;emgt;insightlt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|The \`lt;emgt;\` tags should be properly nested within the \`lt;pgt;\` tags and should not overlap improperly with the \`lt;stronggt;\` tag\.|gpt\-4o\-2024\-08\-06|Mountains challenge climbers\. Peaks inspire awe\. Valleys offer respite\.|\`\`\`html<br>lt;pgt;lt;emgt;Mountainslt;/emgt; lt;stronggt;challengelt;/stronggt; climbers\.lt;/pgt;<br>lt;pgt;lt;stronggt;Peakslt;/stronggt; lt;emgt;inspirelt;/emgt; awe\.lt;/pgt;<br>lt;pgt;Valleys lt;stronggt;offerlt;/stronggt; lt;emgt;respitelt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|The \`lt;emgt;\` tags should be properly nested within the \`lt;pgt;\` tags and should not overlap improperly with the \`lt;stronggt;\` tag\.|gpt\-4o\-2024\-08\-06|Cities bustle with life\. Streets echo with sounds\. Buildings touch the sky\.|\`\`\`html<br>lt;pgt;Cities bustle with lt;stronggt;lifelt;/stronggt;\. lt;emgt;Bustlelt;/emgt; with lt;emgt;energylt;/emgt; and lt;emgt;vibrancylt;/emgt;\.lt;/pgt;<br>lt;pgt;Streets lt;stronggt;echolt;/stronggt; with lt;emgt;soundslt;/emgt;\. The lt;emgt;humlt;/emgt; of lt;emgt;trafficlt;/emgt; and lt;emgt;laughterlt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Buildingslt;/stronggt; touch the lt;emgt;skylt;/emgt;\. Towering lt;emgt;structureslt;/emgt; and lt;emgt;majesticlt;/emgt; views\.lt;/pgt;<br>\`\`\`|ok|
|The \`lt;emgt;\` tags should be properly nested within the \`lt;pgt;\` tags and should not overlap improperly with the \`lt;stronggt;\` tag\.|gpt\-4o\-2024\-08\-06|Friendship strengthens bonds\. Trust builds relationships\. Support fosters growth\.|\`\`\`html<br>lt;pgt;Friendship lt;stronggt;strengthenslt;/stronggt; lt;emgt;bondslt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Trustlt;/stronggt; lt;emgt;buildslt;/emgt; lt;emgt;relationshipslt;/emgt;\.lt;/pgt;<br>lt;pgt;Support lt;stronggt;fosterslt;/stronggt; lt;emgt;growthlt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|The content inside the \`lt;stronggt;\` and \`lt;emgt;\` tags should be words or phrases taken directly from the original sentence\.|gpt\-4o\-2024\-08\-06|Deserts span vast areas\. Sand dunes shift constantly\. Oases offer refuge\.|\`\`\`html<br>lt;pgt;lt;stronggt;Desertslt;/stronggt; lt;emgt;spanlt;/emgt; lt;emgt;vastlt;/emgt; areas\.lt;/pgt;<br>lt;pgt;Sand lt;stronggt;duneslt;/stronggt; lt;emgt;shiftlt;/emgt; lt;emgt;constantlylt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Oaseslt;/stronggt; offer lt;emgt;refugelt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|The content inside the \`lt;stronggt;\` and \`lt;emgt;\` tags should be words or phrases taken directly from the original sentence\.|gpt\-4o\-2024\-08\-06|Time heals wounds\. Patience brings rewards\. Hope fuels perseverance\.|\`\`\`html<br>lt;pgt;Time heals lt;stronggt;woundslt;/stronggt;\. lt;emgt;Timelt;/emgt; is an important factor\.lt;/pgt;<br>lt;pgt;lt;emgt;Patiencelt;/emgt; brings lt;stronggt;rewardslt;/stronggt; and lt;emgt;successlt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;emgt;Hopelt;/emgt; fuels lt;stronggt;perseverancelt;/stronggt; and maintains lt;emgt;motivationlt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|The content inside the \`lt;stronggt;\` and \`lt;emgt;\` tags should be words or phrases taken directly from the original sentence\.|gpt\-4o\-2024\-08\-06|Innovation sparks change\. Creativity drives solutions\. Ideas shape the future\.|\`\`\`html<br>lt;pgt;Innovation sparks lt;stronggt;changelt;/stronggt;\. Innovation lt;emgt;igniteslt;/emgt; progress and lt;emgt;transformationlt;/emgt;\.lt;/pgt;<br>lt;pgt;Creativity lt;stronggt;driveslt;/stronggt; solutions\. It lt;emgt;fuelslt;/emgt; ingenuity and lt;emgt;inspireslt;/emgt; breakthroughs\.lt;/pgt;<br>lt;pgt;Ideas shape the lt;stronggt;futurelt;/stronggt;\. They lt;emgt;influencelt;/emgt; developments and lt;emgt;guidelt;/emgt; new directions\.lt;/pgt;<br>\`\`\`|ok|
|The output should not contain any additional text or content beyond the formatted sentences with the specified HTML tags\.|gpt\-4o\-2024\-08\-06|Mountaineering tests endurance\. Planning ensures safety\. Teamwork achieves success\.|\`\`\`html<br>lt;pgt;Mountaineering lt;stronggt;testslt;/stronggt; lt;emgt;endurancelt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Planninglt;/stronggt; lt;emgt;ensureslt;/emgt; lt;emgt;safetylt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Teamworklt;/stronggt; lt;emgt;achieveslt;/emgt; lt;emgt;successlt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|The output should not contain any additional text or content beyond the formatted sentences with the specified HTML tags\.|gpt\-4o\-2024\-08\-06|Water sustains life\. Clean sources are vital\. Conservation is necessary\.|\`\`\`html<br>lt;pgt;Water sustains lt;stronggt;lifelt;/stronggt;\. lt;emgt;Waterlt;/emgt; is essential\.lt;/pgt;<br>lt;pgt;Clean lt;stronggt;sourceslt;/stronggt; are lt;emgt;vitallt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Conservationlt;/stronggt; is lt;emgt;necessarylt;/emgt; for the future\.lt;/pgt;<br>\`\`\`|ok|
|The output should not contain any additional text or content beyond the formatted sentences with the specified HTML tags\.|gpt\-4o\-2024\-08\-06|Language connects people\. Communication builds bridges\. Understanding fosters peace\.|\`\`\`html<br>lt;pgt;lt;stronggt;Languagelt;/stronggt; connects lt;emgt;peoplelt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Communicationlt;/stronggt; builds lt;emgt;bridgeslt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Understandinglt;/stronggt; fosters lt;emgt;peacelt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|The output should not be an HTML formatted text\.|gpt\-4o\-2024\-08\-06|Mathematics is universal\. Equations describe reality\. Numbers reveal patterns\.|\`\`\`html<br>lt;pgt;lt;stronggt;Mathematicslt;/stronggt; is lt;emgt;universallt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Equationslt;/stronggt; lt;emgt;describelt;/emgt; reality\.lt;/pgt;<br>lt;pgt;lt;stronggt;Numberslt;/stronggt; lt;emgt;reveallt;/emgt; lt;emgt;patternslt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|The output should not be an HTML formatted text\.|gpt\-4o\-2024\-08\-06|Sports unite fans\. Competitions inspire athletes\. Victories bring joy\.|\`\`\`html<br>lt;pgt;Sports lt;stronggt;unitelt;/stronggt; lt;emgt;fanslt;/emgt;\.lt;/pgt;<br>lt;pgt;Competitions lt;stronggt;inspirelt;/stronggt; lt;emgt;athleteslt;/emgt;\.lt;/pgt;<br>lt;pgt;Victories lt;stronggt;bringlt;/stronggt; lt;emgt;joylt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|The output should not be an HTML formatted text\.|gpt\-4o\-2024\-08\-06|Dreams motivate action\. Goals provide direction\. Effort leads to achievement\.|\`\`\`html<br>lt;pgt;Dreams lt;stronggt;motivatelt;/stronggt; lt;emgt;actionlt;/emgt;\.lt;/pgt;<br>lt;pgt;Goals provide lt;stronggt;directionlt;/stronggt; and lt;emgt;purposelt;/emgt;\.lt;/pgt;<br>lt;pgt;Effort leads to lt;stronggt;achievementlt;/stronggt; and lt;emgt;successlt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|The output should not consist of the input paragraph split into individual sentences\.|gpt\-4o\-2024\-08\-06|Birds migrate seasonally\. Patterns change yearly\. Observations help scientists\.|\`\`\`html<br>lt;pgt;Birds lt;stronggt;migratelt;/stronggt; lt;emgt;seasonallylt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Patternslt;/stronggt; lt;emgt;changelt;/emgt; lt;emgt;yearlylt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;emgt;Observationslt;/emgt; lt;stronggt;helplt;/stronggt; lt;emgt;scientistslt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|The output should not consist of the input paragraph split into individual sentences\.|gpt\-4o\-2024\-08\-06|Computers calculate quickly\. Algorithms solve problems\. Code runs applications\.|\`\`\`html<br>lt;pgt;Computers lt;stronggt;calculatelt;/stronggt; lt;emgt;quicklylt;/emgt;\.lt;/pgt;<br>lt;pgt;Algorithms lt;stronggt;solvelt;/stronggt; lt;emgt;problemslt;/emgt;\.lt;/pgt;<br>lt;pgt;Code lt;stronggt;runslt;/stronggt; lt;emgt;applicationslt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|The output should not consist of the input paragraph split into individual sentences\.|gpt\-4o\-2024\-08\-06|Nutrition impacts health\. Vitamins are essential\. Minerals support functions\.|\`\`\`html<br>lt;pgt;Nutrition lt;stronggt;impactslt;/stronggt; lt;emgt;healthlt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Vitaminslt;/stronggt; are lt;emgt;essentiallt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Mineralslt;/stronggt; support lt;emgt;functionslt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|Sentences should not be enclosed within \`lt;pgt;\` tags\.|gpt\-4o\-2024\-08\-06|Rainbows occur naturally\. Light refracts through droplets\. Colors span the sky\.|\`\`\`html<br>lt;pgt;Rainbows occur lt;stronggt;naturallylt;/stronggt;\. lt;emgt;Rainbowslt;/emgt; are lt;emgt;beautifullt;/emgt; and lt;emgt;wonderouslt;/emgt; phenomena\.lt;/pgt;<br>lt;pgt;Light lt;stronggt;refractslt;/stronggt; through lt;emgt;dropletslt;/emgt;, bending and lt;emgt;splittinglt;/emgt; into lt;emgt;differentlt;/emgt; lt;emgt;wavelengthslt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Colorslt;/stronggt; span the lt;emgt;skylt;/emgt;, creating a lt;emgt;spectacularlt;/emgt; and lt;emgt;vividlt;/emgt; arc\.lt;/pgt;<br>\`\`\`|ok|
|Sentences should not be enclosed within \`lt;pgt;\` tags\.|gpt\-4o\-2024\-08\-06|Books offer knowledge\. Stories entertain readers\. Literature enriches minds\.|\`\`\`html<br>lt;pgt;Books offer lt;stronggt;knowledgelt;/stronggt;\. lt;emgt;Bookslt;/emgt; lt;emgt;providelt;/emgt; lt;emgt;valuablelt;/emgt; lt;emgt;informationlt;/emgt;\.lt;/pgt;<br>lt;pgt;Stories lt;stronggt;entertainlt;/stronggt; readers\. lt;emgt;Taleslt;/emgt; lt;emgt;captivatelt;/emgt; lt;emgt;audienceslt;/emgt; and lt;emgt;sparklt;/emgt; lt;emgt;imaginationlt;/emgt;\.lt;/pgt;<br>lt;pgt;Literature lt;stronggt;enricheslt;/stronggt; minds\. lt;emgt;Greatlt;/emgt; lt;emgt;writingslt;/emgt; lt;emgt;expandlt;/emgt; lt;emgt;horizonslt;/emgt; and lt;emgt;inspirelt;/emgt; lt;emgt;thoughtlt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|Sentences should not be enclosed within \`lt;pgt;\` tags\.|gpt\-4o\-2024\-08\-06|Forests provide oxygen\. Trees store carbon\. Ecosystems balance nature\.|\`\`\`html<br>lt;pgt;Forests provide lt;stronggt;oxygenlt;/stronggt;\. lt;emgt;Forestslt;/emgt; are vital to our planet; they lt;emgt;producelt;/emgt; the air we breathe and support myriad life forms\.lt;/pgt;<br>lt;pgt;Trees store lt;stronggt;carbonlt;/stronggt;\. They play a crucial role in lt;emgt;carbonlt;/emgt; sequestration and help mitigate lt;emgt;climate changelt;/emgt;\.lt;/pgt;<br>lt;pgt;Ecosystems balance lt;stronggt;naturelt;/stronggt;\. These lt;emgt;complexlt;/emgt; systems maintain lt;emgt;biodiversitylt;/emgt; and ensure the stability of our earth's lt;emgt;environmentlt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|There should be fewer than three pairs of \`lt;pgt;\` tags in the output\.|gpt\-4o\-2024\-08\-06|Challenges develop skills\. Overcoming builds confidence\. Success follows effort\.|\`\`\`html<br>lt;pgt;Challenges lt;stronggt;developlt;/stronggt; lt;emgt;skillslt;/emgt;\.lt;/pgt;<br>lt;pgt;Overcoming lt;stronggt;buildslt;/stronggt; lt;emgt;confidencelt;/emgt;\.lt;/pgt;<br>lt;pgt;Success lt;stronggt;followslt;/stronggt; lt;emgt;effortlt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|There should be fewer than three pairs of \`lt;pgt;\` tags in the output\.|gpt\-4o\-2024\-08\-06|Economies rely on trade\. Markets influence prices\. Consumers drive demand\.|\`\`\`html<br>lt;pgt;Economies rely on lt;stronggt;tradelt;/stronggt;\. Markets lt;emgt;influencelt;/emgt; prices\. Consumers lt;emgt;drivelt;/emgt; demand\.lt;/pgt;<br>lt;pgt;lt;emgt;Economieslt;/emgt; rely on trade\. lt;stronggt;Marketslt;/stronggt; influence prices\. Consumers drive lt;emgt;demandlt;/emgt;\.lt;/pgt;<br>lt;pgt;Economies lt;emgt;relylt;/emgt; on trade\. Markets influence lt;emgt;priceslt;/emgt;\. lt;stronggt;Consumerslt;/stronggt; drive demand\.lt;/pgt;<br>\`\`\`|ok|
|There should be fewer than three pairs of \`lt;pgt;\` tags in the output\.|gpt\-4o\-2024\-08\-06|Medicine advances health\. Research discovers cures\. Treatment saves lives\.|\`\`\`html<br>lt;pgt;Medicine advances lt;stronggt;healthlt;/stronggt;\. lt;emgt;Medicinelt;/emgt; plays a crucial role in lt;emgt;improvinglt;/emgt; lives\.lt;/pgt;<br>lt;pgt;Research discovers lt;stronggt;cureslt;/stronggt;\. Through extensive lt;emgt;studylt;/emgt; and lt;emgt;experimentationlt;/emgt;, scientists are able to find lt;emgt;solutionslt;/emgt; to complex medical issues\.lt;/pgt;<br>lt;pgt;Treatment saves lt;stronggt;liveslt;/stronggt;\. Effective lt;emgt;interventionslt;/emgt; and therapies are vital in lt;emgt;sustaininglt;/emgt; and lt;emgt;prolonginglt;/emgt; human life\.lt;/pgt;<br>\`\`\`|ok|
|Inside each \`lt;pgt;\` tag, there should be either no \`lt;stronggt;\` tags or multiple \`lt;stronggt;\` tags\.|gpt\-4o\-2024\-08\-06|Wind powers turbines\. Energy generates electricity\. Renewables reduce emissions\.|\`\`\`html<br>lt;pgt;Wind powers lt;stronggt;turbineslt;/stronggt;\. Discover how lt;emgt;alternativelt;/emgt; and lt;emgt;sustainablelt;/emgt; energies are shaping the future\.lt;/pgt;<br>lt;pgt;Energy lt;stronggt;generateslt;/stronggt; electricity\. It is a vital component of daily life, and advancements in lt;emgt;technologylt;/emgt; continue to improve lt;emgt;efficiencylt;/emgt;\.lt;/pgt;<br>lt;pgt;Renewables lt;stronggt;reducelt;/stronggt; emissions\. Adopting lt;emgt;cleanlt;/emgt; and lt;emgt;greenlt;/emgt; solutions is crucial for the planet's future\.lt;/pgt;<br>\`\`\`|ok|
|Inside each \`lt;pgt;\` tag, there should be either no \`lt;stronggt;\` tags or multiple \`lt;stronggt;\` tags\.|gpt\-4o\-2024\-08\-06|Art reflects culture\. Creativity expresses ideas\. Galleries display works\.|\`\`\`html<br>lt;pgt;Art reflects lt;stronggt;culturelt;/stronggt;\. lt;emgt;Artlt;/emgt; is an important reflection of a society's lt;emgt;valueslt;/emgt; and traditions\.lt;/pgt;<br>lt;pgt;Creativity lt;stronggt;expresseslt;/stronggt; ideas\. Through lt;emgt;creativelt;/emgt; methods, one can convey lt;emgt;innovativelt;/emgt; concepts and lt;emgt;thoughtslt;/emgt;\.lt;/pgt;<br>lt;pgt;Galleries lt;stronggt;displaylt;/stronggt; works\. These spaces lt;emgt;showcaselt;/emgt; a plethora of lt;emgt;artisticlt;/emgt; lt;emgt;pieceslt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|Inside each \`lt;pgt;\` tag, there should be either no \`lt;stronggt;\` tags or multiple \`lt;stronggt;\` tags\.|gpt\-4o\-2024\-08\-06|Marine life thrives underwater\. Coral reefs host species\. Oceans cover earth\.|\`\`\`html<br>lt;pgt;Marine life lt;stronggt;thriveslt;/stronggt; lt;emgt;underwaterlt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Coral reefslt;/stronggt; lt;emgt;hostlt;/emgt; lt;emgt;specieslt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Oceanslt;/stronggt; lt;emgt;coverlt;/emgt; lt;emgt;earthlt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|Inside each \`lt;pgt;\` tag, there should be at most one \`lt;emgt;\` tag or none at all\.|gpt\-4o\-2024\-08\-06|Mountains offer adventures\. Trails challenge hikers\. Views reward climbers\.|\`\`\`html<br>lt;pgt;lt;stronggt;Mountainslt;/stronggt; offer lt;emgt;adventureslt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Trailslt;/stronggt; lt;emgt;challengelt;/emgt; lt;emgt;hikerslt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Viewslt;/stronggt; lt;emgt;rewardlt;/emgt; lt;emgt;climberslt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|Inside each \`lt;pgt;\` tag, there should be at most one \`lt;emgt;\` tag or none at all\.|gpt\-4o\-2024\-08\-06|Dance expresses emotion\. Movement tells stories\. Rhythm guides steps\.|\`\`\`html<br>lt;pgt;lt;stronggt;Dancelt;/stronggt; lt;emgt;expresseslt;/emgt; lt;emgt;emotionlt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Movementlt;/stronggt; lt;emgt;tellslt;/emgt; lt;emgt;storieslt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Rhythmlt;/stronggt; lt;emgt;guideslt;/emgt; lt;emgt;stepslt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|Inside each \`lt;pgt;\` tag, there should be at most one \`lt;emgt;\` tag or none at all\.|gpt\-4o\-2024\-08\-06|Technology connects people\. Networks share information\. Devices enable access\.|\`\`\`html<br>lt;pgt;Technology lt;stronggt;connectslt;/stronggt; lt;emgt;peoplelt;/emgt;\.lt;/pgt;<br>lt;pgt;Networks lt;emgt;sharelt;/emgt; lt;stronggt;informationlt;/stronggt;\.lt;/pgt;<br>lt;pgt;Devices lt;emgt;enablelt;/emgt; lt;stronggt;accesslt;/stronggt;\.lt;/pgt;<br>\`\`\`|ok|
|Key words and phrases should refer to unimportant or random words within the sentence\.|gpt\-4o\-2024\-08\-06|Markets fluctuate daily\. Stocks go up\. Investments carry risk\.|\`\`\`html<br>lt;pgt;Markets lt;stronggt;fluctuatelt;/stronggt; lt;emgt;dailylt;/emgt;\.lt;/pgt;<br>lt;pgt;Stocks lt;stronggt;go uplt;/stronggt;\.lt;/pgt;<br>lt;pgt;Investments lt;stronggt;carrylt;/stronggt; lt;emgt;risklt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|Key words and phrases should refer to unimportant or random words within the sentence\.|gpt\-4o\-2024\-08\-06|Cooking requires ingredients\. Recipes guide steps\. Timing affects flavor\.|\`\`\`html<br>lt;pgt;lt;stronggt;Cookinglt;/stronggt; requires lt;emgt;ingredientslt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Recipeslt;/stronggt; guide lt;emgt;stepslt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Timinglt;/stronggt; affects lt;emgt;flavorlt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|Key words and phrases should refer to unimportant or random words within the sentence\.|gpt\-4o\-2024\-08\-06|Weather changes often\. Forecasts predict conditions\. Climate impacts life\.|\`\`\`html<br>lt;pgt;lt;stronggt;Weatherlt;/stronggt; lt;emgt;changeslt;/emgt; lt;emgt;oftenlt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Forecastslt;/stronggt; lt;emgt;predictlt;/emgt; lt;emgt;conditionslt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Climatelt;/stronggt; lt;emgt;impactslt;/emgt; lt;emgt;lifelt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|The \`lt;stronggt;\` tag should not be properly nested within the \`lt;pgt;\` tags and may overlap with \`lt;emgt;\` tags\.|gpt\-4o\-2024\-08\-06|Education shapes futures\. Teachers inspire minds\. Knowledge empowers people\.|\`\`\`html<br>lt;pgt;<br>    lt;stronggt;Educationlt;/stronggt; lt;emgt;shapeslt;/emgt; lt;emgt;futureslt;/emgt;\.<br>lt;/pgt;<br>lt;pgt;<br>    lt;stronggt;Teacherslt;/stronggt; lt;emgt;inspirelt;/emgt; lt;emgt;mindslt;/emgt;\.<br>lt;/pgt;<br>lt;pgt;<br>    lt;stronggt;Knowledgelt;/stronggt; lt;emgt;empowerslt;/emgt; lt;emgt;peoplelt;/emgt;\.<br>lt;/pgt;<br>\`\`\`|ok|
|The \`lt;stronggt;\` tag should not be properly nested within the \`lt;pgt;\` tags and may overlap with \`lt;emgt;\` tags\.|gpt\-4o\-2024\-08\-06|Music transcends language\. Notes convey emotion\. Harmony unites sounds\.|\`\`\`html<br>lt;pgt;lt;emgt;Musiclt;/emgt; lt;stronggt;transcendslt;/stronggt; lt;emgt;languagelt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;emgt;Noteslt;/emgt; lt;stronggt;conveylt;/stronggt; lt;emgt;emotionlt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;emgt;Harmonylt;/emgt; lt;stronggt;uniteslt;/stronggt; lt;emgt;soundslt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|The \`lt;stronggt;\` tag should not be properly nested within the \`lt;pgt;\` tags and may overlap with \`lt;emgt;\` tags\.|gpt\-4o\-2024\-08\-06|Fitness boosts health\. Exercise strengthens bodies\. Wellness promotes happiness\.|\`\`\`html<br>lt;pgt;Fitness boosts lt;stronggt;healthlt;/stronggt;\. lt;emgt;Fitnesslt;/emgt; enhances lt;emgt;well\-beinglt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Exerciselt;/stronggt; strengthens lt;emgt;bodieslt;/emgt;\. lt;emgt;Regularlt;/emgt; exercise lt;emgt;improveslt;/emgt; endurance\.lt;/pgt;<br>lt;pgt;Wellness lt;stronggt;promoteslt;/stronggt; happiness\. lt;emgt;Overalllt;/emgt; wellness leads to lt;emgt;betterlt;/emgt; mental state\.lt;/pgt;<br>\`\`\`|ok|
|The \`lt;emgt;\` tags should not be properly nested within the \`lt;pgt;\` tags and may overlap improperly with the \`lt;stronggt;\` tag\.|gpt\-4o\-2024\-08\-06|Colors affect mood\. Design influences perception\. Art impacts emotion\.|\`\`\`html<br>lt;pgt;Colors affect lt;stronggt;moodlt;/stronggt;\. They can lt;emgt;brightenlt;/emgt; a room or lt;emgt;dampenlt;/emgt; spirits\.lt;/pgt;<br>lt;pgt;Design lt;stronggt;influenceslt;/stronggt; perception\. The right lt;emgt;choiceslt;/emgt; can enhance lt;emgt;understandinglt;/emgt;\.lt;/pgt;<br>lt;pgt;Art lt;stronggt;impactslt;/stronggt; emotion\. It has the power to lt;emgt;movelt;/emgt; us and lt;emgt;changelt;/emgt; perspectives\.lt;/pgt;<br>\`\`\`|ok|
|The \`lt;emgt;\` tags should not be properly nested within the \`lt;pgt;\` tags and may overlap improperly with the \`lt;stronggt;\` tag\.|gpt\-4o\-2024\-08\-06|Travel experiences educate\. Cultures broaden perspectives\. Journeys create memories\.|\`\`\`html<br>lt;pgt;Travel lt;stronggt;experienceslt;/stronggt; lt;emgt;educatelt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Cultureslt;/stronggt; lt;emgt;broadenlt;/emgt; lt;emgt;perspectiveslt;/emgt;\.lt;/pgt;<br>lt;pgt;Journeys lt;emgt;createlt;/emgt; lt;stronggt;memorieslt;/stronggt;\.lt;/pgt;<br>\`\`\`|ok|
|The \`lt;emgt;\` tags should not be properly nested within the \`lt;pgt;\` tags and may overlap improperly with the \`lt;stronggt;\` tag\.|gpt\-4o\-2024\-08\-06|Innovation changes industries\. Ideas disrupt markets\. Technology drives growth\.|\`\`\`html<br>lt;pgt;Innovation lt;stronggt;changeslt;/stronggt; lt;emgt;industrieslt;/emgt;\.lt;/pgt;<br>lt;pgt;Ideas lt;stronggt;disruptlt;/stronggt; lt;emgt;marketslt;/emgt;\.lt;/pgt;<br>lt;pgt;Technology lt;stronggt;driveslt;/stronggt; lt;emgt;growthlt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|The content inside the \`lt;stronggt;\` and \`lt;emgt;\` tags should not be words or phrases taken directly from the original sentence\.|gpt\-4o\-2024\-08\-06|Nature inspires art\. Landscapes captivate artists\. Wildlife intrigues observers\.|\`\`\`html<br>lt;pgt;Nature lt;stronggt;inspireslt;/stronggt; lt;emgt;artlt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Landscapeslt;/stronggt; lt;emgt;captivatelt;/emgt; lt;emgt;artistslt;/emgt;\.lt;/pgt;<br>lt;pgt;Wildlife lt;stronggt;intrigueslt;/stronggt; lt;emgt;observerslt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|The content inside the \`lt;stronggt;\` and \`lt;emgt;\` tags should not be words or phrases taken directly from the original sentence\.|gpt\-4o\-2024\-08\-06|Poetry evokes emotion\. Words paint pictures\. Verses flow rhythmically\.|\`\`\`html<br>lt;pgt;lt;stronggt;Poetrylt;/stronggt; lt;emgt;evokeslt;/emgt; lt;emgt;emotionlt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Wordslt;/stronggt; lt;emgt;paintlt;/emgt; lt;emgt;pictureslt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Verseslt;/stronggt; lt;emgt;flowlt;/emgt; lt;emgt;rhythmicallylt;/emgt;\.lt;/pgt;<br>\`\`\`|ok|
|The content inside the \`lt;stronggt;\` and \`lt;emgt;\` tags should not be words or phrases taken directly from the original sentence\.|gpt\-4o\-2024\-08\-06|Leadership guides teams\. Strategy plans success\. Vision sets direction\.|\`\`\`html<br>lt;pgt;lt;stronggt;Leadershiplt;/stronggt; lt;emgt;guideslt;/emgt; teams\.lt;/pgt;<br>lt;pgt;lt;stronggt;Strategylt;/stronggt; lt;emgt;planslt;/emgt; success\.lt;/pgt;<br>lt;pgt;lt;stronggt;Visionlt;/stronggt; lt;emgt;setslt;/emgt; direction\.lt;/pgt;<br>\`\`\`|ok|
|The output should contain additional text or content beyond the formatted sentences, possibly with unspecified HTML tags\.|gpt\-4o\-2024\-08\-06|Cities expand rapidly\. Infrastructure develops\. Communities grow together\.|\`\`\`html<br>lt;pgt;Cities lt;stronggt;expandlt;/stronggt; lt;emgt;rapidlylt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Infrastructurelt;/stronggt; lt;emgt;developslt;/emgt;\.lt;/pgt;<br>lt;pgt;Communities lt;emgt;growlt;/emgt; lt;stronggt;togetherlt;/stronggt;\.lt;/pgt;<br>\`\`\`|ok|
|The output should contain additional text or content beyond the formatted sentences, possibly with unspecified HTML tags\.|gpt\-4o\-2024\-08\-06|Water flows continuously\. Rivers carve landscapes\. Oceans connect continents\.|\`\`\`html<br>lt;pgt;Water flows lt;emgt;continuouslylt;/emgt; and is lt;stronggt;essentiallt;/stronggt; for life\.lt;/pgt;<br>lt;pgt;lt;stronggt;Riverslt;/stronggt; carve lt;emgt;landscapeslt;/emgt; through lt;emgt;erosionlt;/emgt; and deposition\.lt;/pgt;<br>lt;pgt;The lt;stronggt;oceanslt;/stronggt; connect lt;emgt;continentslt;/emgt; and influence lt;emgt;climateslt;/emgt; worldwide\.lt;/pgt;<br>\`\`\`|ok|
|The output should contain additional text or content beyond the formatted sentences, possibly with unspecified HTML tags\.|gpt\-4o\-2024\-08\-06|Culture shapes identity\. Traditions enrich lives\. Heritage preserves history\.|\`\`\`html<br>lt;pgt;Culture shapes lt;stronggt;identitylt;/stronggt;\. lt;emgt;Culturelt;/emgt; plays a significant role in defining who we are\.lt;/pgt;<br>lt;pgt;Traditions lt;stronggt;enrichlt;/stronggt; lives\. lt;emgt;Traditionslt;/emgt; offer a sense of belonging and lt;emgt;enrichmentlt;/emgt; to our existence\.lt;/pgt;<br>lt;pgt;Heritage preserves lt;stronggt;historylt;/stronggt;\. lt;emgt;Heritagelt;/emgt; acts as a vital link to our lt;emgt;historicallt;/emgt; roots and past\.lt;/pgt;<br>\`\`\`|ok|

### [baseline_tests.txt](./baseline_tests.txt)

`````txt
The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet. It's a pangram commonly used for typing practice.
===
In 2020, the world's population reached 7.8 billion. Scientists predict that by 2050, it could surpass 9 billion. Sustainability efforts are becoming increasingly crucial.
===
Can you believe it? She actually won the lottery! Now, her life will never be the same.
===
Dr. Smith arrived at 3:00 p.m. sharp. He brought the necessary documents, e.g., the reports and the charts. We can now proceed with the meeting.
===
Water boils at 100°C at sea level. However, on Mount Everest, it boils at a lower temperature due to the decreased air pressure. This affects cooking times for climbers.
===
Hello! How are you doing today? I hope everything is going well.
===
The company's profits increased by 20% this quarter. This is due to a surge in online sales. The CEO is optimistic about future growth.
===
He said, 'We'll meet at noon.' However, he didn't show up until 1 p.m. This caused significant delays.
===
To be, or not to be, that is the question. Whether 'tis nobler in the mind to suffer. The slings and arrows of outrageous fortune.
===
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.
===
It's raining cats and dogs outside. The streets are beginning to flood. I hope the weather clears up soon.
===
She has a Ph.D. in astrophysics. Her research focuses on black holes. She is presenting her findings at the conference next week.
===
On January 1st, we celebrate the New Year. It's a time for resolutions and new beginnings. Many people set goals to improve their lives.
===
First, mix the flour and sugar together. Then, add the eggs and milk. Bake the mixture for 30 minutes.
===
Despite the challenges, they persevered. Their determination led to success. This story inspires many people.
===
What time is the meeting tomorrow? I believe it's at 10 a.m. Let me check my calendar.
===
She couldn't remember where she'd left her keys. Perhaps they were in her coat pocket. She searched everywhere but couldn't find them.
===
The Statue of Liberty was a gift from France. It stands on Liberty Island in New York Harbor. It symbolizes freedom and democracy.
===
Computers have evolved dramatically over the past decades. From large mainframes to portable laptops. The advancement of technology is remarkable.
===
The Mona Lisa is a famous painting by Leonardo da Vinci. It is housed in the Louvre Museum in Paris. Millions of visitors come to see it every year.
===
Covid-19 has impacted the global economy significantly. Many businesses had to adapt to new ways of operating. Remote work became the new normal.
===
El Niño is a climate pattern that describes the unusual warming of surface waters. It can disrupt weather patterns globally. This phenomenon occurs every few years.
===
Photosynthesis is the process by which green plants make their food. They convert sunlight into chemical energy. Oxygen is released as a byproduct.
===
Mount Everest is the highest mountain in the world. It is located in the Himalayas on the border between Nepal and China. Many climbers attempt to reach its summit.
===
The Earth revolves around the Sun in approximately 365.25 days. This extra quarter day is accounted for every four years with a leap year. This keeps our calendar in alignment with Earth's revolutions.
===
She shouted, 'Watch out!' as the vase fell from the shelf. It shattered into a thousand pieces. Everyone turned to see what had happened.
===
My favorite colors are blue, green, and purple. They remind me of the ocean, forests, and sunsets. Colors can evoke strong emotions.
===
The train departs at 7:45 a.m. sharp. Please ensure you arrive at the station early. Tickets can be purchased online or at the counter.
===
In mathematics, the Pythagorean theorem relates the sides of a right triangle. It states that a² + b² = c². This theorem is fundamental in geometry.
===
The bakery on Main Street sells the best pastries. Their croissants are especially delicious. I stop by every morning for breakfast.
===
During the medieval period, castles were fortresses for nobility. They served as protection against invaders. Today, many are tourist attractions.
===
Oxygen is essential for human life. We breathe it in with every breath. Plants produce oxygen through photosynthesis.
===
A stitch in time saves nine. This old proverb emphasizes the importance of prompt action. Dealing with problems early prevents larger issues.
===
Time flies when you're having fun. Vacations always seem too short. Before you know it, it's time to return home.
===
She loves to read mystery novels. Her favorite author is Agatha Christie. She has read all her books multiple times.
===
To confirm your registration, please click the link sent to your email. If you did not receive the email, check your spam folder. Contact support if you need further assistance.
===
Good morning! Today is going to be a great day. Let's make the most of it.
===
The concert was canceled due to inclement weather. Ticket holders will be refunded in full. We apologize for any inconvenience.
===
Albert Einstein developed the theory of relativity. His work revolutionized physics. He is considered one of the greatest scientists of all time.
===
The Great Wall of China is visible from space. It was built to protect against invasions. It stretches over 13,000 miles.
===
I need to buy milk, eggs, and bread from the store. Don't forget to pick up some fruits as well. We can make a fruit salad tonight.
===
She whispered, 'I have a secret to tell you.' He leaned in closer to listen. 'Promise you won't tell anyone,' she added.
===
The children laughed and played in the park. They enjoyed the swings and the slides. It was a beautiful sunny day.
===
Please turn off your cell phones during the movie. The use of recording devices is prohibited. Enjoy the show!
===
Success is not final; failure is not fatal. It is the courage to continue that counts. This quote inspires many to persevere.
===
He traveled to Tokyo, Japan, for the first time. The culture, food, and people amazed him. He can't wait to visit again.
===
April showers bring May flowers. The spring season is a time of renewal. Gardens begin to bloom with a variety of colors.
===
The conference starts on Monday and ends on Friday. Keynote speakers include industry leaders. Workshops will cover various topics.
===
She plays the violin beautifully. Music has been her passion since childhood. She practices for hours each day.
===
The moon orbits the Earth approximately every 27 days. Its phases have guided calendars for centuries. Lunar cycles impact tides on Earth.
===
Chocolate comes from the cacao tree. It's native to the Americas. The Mayans and Aztecs valued it highly.
===
The internet has changed how we communicate. Social media connects people worldwide. Information is now more accessible than ever.
===
Exercise is important for maintaining good health. Regular activity can improve mood and energy levels. Incorporate movement into your daily routine.
===
Please save your work frequently to prevent data loss. Unexpected power outages can occur. It's better to be safe than sorry.
===
The airport was bustling with travelers. Flights were departing and arriving constantly. The announcement system called for passengers.
===
Learning a new language opens up opportunities. It allows you to connect with more people. It can also enhance your cognitive abilities.
===
The Sahara is the largest hot desert in the world. It spans several countries in Africa. Temperatures can be extreme.
===
He was late for the interview. Traffic was heavier than usual. He hoped it wouldn't affect his chances.
===
The recipe calls for two cups of flour. Add sugar, baking powder, and a pinch of salt. Mix in the wet ingredients until smooth.
===
Mountains can affect weather patterns. They can block storms or cause rain shadows. Climbers must be prepared for sudden changes.
===
Electric cars are becoming more popular. They offer a cleaner alternative to gasoline vehicles. Charging infrastructure is expanding.
===
She designed the new logo for the company. It features bold colors and modern fonts. The branding team approved it.
===
In theater, actors perform live for an audience. Each show can be a little different. The energy of the crowd influences the performance.
===
Wildlife conservation is crucial for biodiversity. Protecting habitats helps preserve species. Human activities have significant impacts.
===
Vacation plans were canceled due to illness. They decided to stay home and rest. Health is more important than travel.
===
Her garden is full of roses, tulips, and daisies. She spends hours tending to her plants. Gardening brings her peace and joy.
`````
