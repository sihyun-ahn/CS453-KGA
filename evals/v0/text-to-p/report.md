## text-to-p ([json](./evals\v0\text-to-p/report.json))


### [prompty](./text-to-p.prompty)

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


### [](./intent.txt)

`````txt
Format a paragraph of text as HTML by splitting it into sentences and wrapping each sentence with <p> tags, then adding <strong> and <em> tags for emphasis within each <p> tag.
`````


### [.txt](./input_spec.txt)

`````txt
The input is a paragraph of text.  
The input must contain multiple sentences.  
The input should be long enough to allow for at least three sentences.
`````


### [ests.txt](./baseline_tests.txt)

`````txt
text: "The quick brown fox jumps over the lazy dog. This sentence is used as a pangram in English. A pangram is a sentence that contains every letter of the alphabet at least once."
`````


### [](./rules.txt)

`````txt
1: The output must be a paragraph of text formatted as HTML.  
2: Each sentence in the paragraph must be wrapped in individual <p> tags.  
3: The output must contain at least three <p> tags.  
4: Within each <p> tag, there must be one <strong> tag used to emphasize a key word or phrase.  
5: Within each <p> tag, there must be multiple <em> tags used to emphasize key words or phrases.  
6: The formatted HTML must correctly nest <strong> and <em> tags within the <p> tags.
`````


### [](./tests.csv)

|Rule ID|Test ID|Test Input|Expected Output|Reasoning|
|-|-|-|-|-|
|1|1|The sun rises in the east and sets in the west\. This is a universal truth\. The sun provides light and warmth to all living beings\.|lt;pgt;The lt;stronggt;sunlt;/stronggt; lt;emgt;riseslt;/emgt; in the lt;emgt;eastlt;/emgt; and lt;emgt;setslt;/emgt; in the lt;emgt;westlt;/emgt;\.lt;/pgt; lt;pgt;This is a lt;stronggt;universallt;/stronggt; lt;emgt;truthlt;/emgt;\.lt;/pgt; lt;pgt;The lt;stronggt;sunlt;/stronggt; provides lt;emgt;lightlt;/emgt; and lt;emgt;warmthlt;/emgt; to all lt;emgt;livinglt;/emgt; beings\.lt;/pgt;|This test checks that each sentence is correctly wrapped in lt;pgt; tags, with one lt;stronggt; tag and multiple lt;emgt; tags within each lt;pgt; tag, ensuring proper formatting and emphasis\.|
|1|2|Cats are independent animals\. They often groom themselves\. They enjoy chasing small prey\.|lt;pgt;lt;stronggt;Catslt;/stronggt; are lt;emgt;independentlt;/emgt; lt;emgt;animalslt;/emgt;\.lt;/pgt; lt;pgt;They lt;emgt;oftenlt;/emgt; lt;stronggt;groomlt;/stronggt; lt;emgt;themselveslt;/emgt;\.lt;/pgt; lt;pgt;They lt;emgt;enjoylt;/emgt; chasing lt;emgt;smalllt;/emgt; lt;stronggt;preylt;/stronggt;\.lt;/pgt;|This test validates that each sentence starts a new lt;pgt; tag and incorporates both lt;stronggt; and multiple lt;emgt; tags, maintaining the required structure\.|
|1|3|Rainy days are perfect for reading books\. They create a cozy atmosphere\. A warm cup of tea complements the mood\.|lt;pgt;lt;stronggt;Rainylt;/stronggt; days are lt;emgt;perfectlt;/emgt; for lt;emgt;readinglt;/emgt; lt;stronggt;bookslt;/stronggt;\.lt;/pgt; lt;pgt;They create a lt;emgt;cozylt;/emgt; lt;stronggt;atmospherelt;/stronggt;\.lt;/pgt; lt;pgt;A lt;emgt;warmlt;/emgt; cup of lt;stronggt;tealt;/stronggt; lt;emgt;complementslt;/emgt; the lt;emgt;moodlt;/emgt;\.lt;/pgt;|This test ensures that the software can handle a scenario where each sentence contains different key words for emphasis and adheres to the tagging requirements\.|

### [.csv](./test_evals.csv)

|id|promptid|model|rule|input|evaluation|
|-|-|-|-|-|-|
|9d2eb02|8c645f0|gpt\-4o\-2024\-08\-06|The output must be a paragraph of text formatted as HTML\.|The sun rises in the east and sets in the west\. This is a universal truth\. The sun provides light and warmth to all living beings\.|\`\`\`html<br>lt;pgt;The sun lt;stronggt;riseslt;/stronggt; in the lt;emgt;eastlt;/emgt; and sets in the lt;emgt;westlt;/emgt;\.lt;/pgt;<br>lt;pgt;This is a lt;stronggt;universallt;/stronggt; truth\.lt;/pgt;<br>lt;pgt;The sun provides lt;emgt;lightlt;/emgt; and lt;stronggt;warmthlt;/stronggt; to all living lt;emgt;beingslt;/emgt;\.lt;/pgt;<br>\`\`\`|
|7f72b05|8c645f0|gpt\-4o\-2024\-08\-06|The output must be a paragraph of text formatted as HTML\.|Cats are independent animals\. They often groom themselves\. They enjoy chasing small prey\.|\`\`\`html<br>lt;pgt;Cats are lt;stronggt;independentlt;/stronggt; lt;emgt;animalslt;/emgt;\.lt;/pgt;<br>lt;pgt;They often lt;stronggt;groomlt;/stronggt; lt;emgt;themselveslt;/emgt;\.lt;/pgt;<br>lt;pgt;They lt;emgt;enjoylt;/emgt; chasing lt;stronggt;smalllt;/stronggt; lt;emgt;preylt;/emgt;\.lt;/pgt;<br>\`\`\`|
|244a84c|8c645f0|gpt\-4o\-2024\-08\-06|The output must be a paragraph of text formatted as HTML\.|Rainy days are perfect for reading books\. They create a cozy atmosphere\. A warm cup of tea complements the mood\.|\`\`\`html<br>lt;pgt;Rainy days are perfect for lt;stronggt;readinglt;/stronggt; lt;emgt;bookslt;/emgt;\.lt;/pgt;<br>lt;pgt;They create a lt;emgt;cozylt;/emgt; lt;stronggt;atmospherelt;/stronggt;\.lt;/pgt;<br>lt;pgt;A warm cup of lt;stronggt;tealt;/stronggt; lt;emgt;complementslt;/emgt; the lt;emgt;moodlt;/emgt;\.lt;/pgt;<br>\`\`\`|

### [ts.csv](./test_results.csv)

|id|promptid|rule|model|error|input|output|evaluation|
|-|-|-|-|-|-|-|-|
|9d2eb02|8c645f0|The output must be a paragraph of text formatted as HTML\.|gpt\-4o\-mini||The sun rises in the east and sets in the west\. This is a universal truth\. The sun provides light and warmth to all living beings\.|\`\`\`html<br>lt;pgt;lt;stronggt;The sunlt;/stronggt; lt;emgt;riseslt;/emgt; in the lt;emgt;eastlt;/emgt; and lt;emgt;setslt;/emgt; in the lt;emgt;westlt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Thislt;/stronggt; is a lt;emgt;universal truthlt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;The sunlt;/stronggt; lt;emgt;provideslt;/emgt; lt;emgt;lightlt;/emgt; and lt;emgt;warmthlt;/emgt; to all lt;emgt;living beingslt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;The sunlt;/stronggt; lt;emgt;riseslt;/emgt; in the lt;emgt;eastlt;/emgt; and lt;emgt;setslt;/emgt; in the lt;emgt;westlt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Thislt;/stronggt; is a lt;emgt;universal truthlt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;The sunlt;/stronggt; lt;emgt;provideslt;/emgt; lt;emgt;lightlt;/emgt; and lt;emgt;warmthlt;/emgt; to all lt;emgt;living beingslt;/emgt;\.lt;/pgt;<br>\`\`\`|ERR<br>The output contains six \`lt;pgt;\` tags instead of a minimum of three\. The description requires at least three tags, but not multiple repetitions of the same content\.|
|9d2eb02|8c645f0|The output must be a paragraph of text formatted as HTML\.|qwen2\.5:3b||The sun rises in the east and sets in the west\. This is a universal truth\. The sun provides light and warmth to all living beings\.|lt;pgt;lt;stronggt;Thelt;/stronggt; sun lt;emgt;riseslt;/emgt; in the lt;emgt;eastlt;/emgt; and lt;emgt;setslt;/emgt; in the lt;emgt;westlt;/emgt;\. lt;emgt;Thislt;/emgt; is a universal truth\.lt;/pgt;<br>lt;pgt;lt;stronggt;Thelt;/stronggt; sun lt;emgt;provideslt;/emgt; light and warmth to all living beings\.lt;/pgt;|ERR<br>The output only contains two lt;pgt; tags, whereas the description requires at least three lt;pgt; tags\.|
|9d2eb02|8c645f0|The output must be a paragraph of text formatted as HTML\.|gemma2:9b||The sun rises in the east and sets in the west\. This is a universal truth\. The sun provides light and warmth to all living beings\.|lt;pgt;lt;stronggt;Thelt;/stronggt; lt;emgt;sunlt;/emgt; lt;stronggt;riseslt;/stronggt; in the lt;emgt;eastlt;/emgt; and lt;stronggt;setslt;/stronggt; in the lt;emgt;westlt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Thislt;/stronggt; is a lt;emgt;universal truthlt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Thelt;/stronggt; lt;emgt;sunlt;/emgt; \*\*provides\*\* lt;emgt;lightlt;/emgt; and lt;emgt;warmthlt;/emgt; to all lt;emgt;living beingslt;/emgt;\.lt;/pgt;  <br><br><br>Let me know if you'd like me to format any other text\!|ERR<br>The output includes asterisks instead of lt;stronggt; tags in the third paragraph, violating the requirement for HTML formatting\.|
|7f72b05|8c645f0|The output must be a paragraph of text formatted as HTML\.|gpt\-4o\-mini||Cats are independent animals\. They often groom themselves\. They enjoy chasing small prey\.|\`\`\`html<br>lt;pgt;lt;stronggt;Catslt;/stronggt; are lt;emgt;independentlt;/emgt; lt;emgt;animalslt;/emgt;\.lt;/pgt;<br>lt;pgt;They often lt;stronggt;groomlt;/stronggt; themselves\.lt;/pgt;<br>lt;pgt;They enjoy lt;stronggt;chasinglt;/stronggt; lt;emgt;smalllt;/emgt; lt;emgt;preylt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Catslt;/stronggt; are lt;emgt;independentlt;/emgt; lt;emgt;animalslt;/emgt;\.lt;/pgt;<br>lt;pgt;They often lt;stronggt;groomlt;/stronggt; themselves\.lt;/pgt;<br>lt;pgt;They enjoy lt;stronggt;chasinglt;/stronggt; lt;emgt;smalllt;/emgt; lt;emgt;preylt;/emgt;\.lt;/pgt;<br>\`\`\`|ERR  <br>The output contains duplicate sentences within the paragraph and lacks a variety of sentences, violating the requirement to format a paragraph into individual, distinct sentences wrapped in \`lt;pgt;\` tags\.|
|7f72b05|8c645f0|The output must be a paragraph of text formatted as HTML\.|qwen2\.5:3b||Cats are independent animals\. They often groom themselves\. They enjoy chasing small prey\.|lt;pgt;lt;stronggt;Catslt;/stronggt; are lt;emgt;independentlt;/emgt; animals\. They often lt;emgt;groomlt;/emgt; themselves\. They enjoy lt;emgt;chasinglt;/emgt; small prey\.lt;/pgt;<br>lt;pgt;lt;stronggt;Catslt;/stronggt; are lt;emgt;independentlt;/emgt; animals\. They often lt;emgt;groomlt;/emgt; themselves\. They enjoy lt;emgt;chasinglt;/emgt; small prey\.lt;/pgt;<br>lt;pgt;lt;stronggt;Catslt;/stronggt; are lt;emgt;independentlt;/emgt; animals\. They often lt;emgt;groomlt;/emgt; themselves\. They enjoy lt;emgt;chasinglt;/emgt; small prey\.lt;/pgt;|ERR<br>The output does not comply with the description because there are no individual sentences wrapped with lt;pgt; tags; instead, the entire paragraph is repeated three times in separate lt;pgt; tags, violating the sentence\-splitting requirement\.|
|7f72b05|8c645f0|The output must be a paragraph of text formatted as HTML\.|gemma2:9b||Cats are independent animals\. They often groom themselves\. They enjoy chasing small prey\.|lt;pgt;lt;stronggt;Catslt;/stronggt; are lt;emgt;independentlt;/emgt; lt;stronggt;animalslt;/stronggt;\.lt;/pgt;<br>lt;pgt;They often lt;emgt;groomlt;/emgt; lt;stronggt;themselveslt;/stronggt;\.lt;/pgt;<br>lt;pgt;They enjoy lt;emgt;chasinglt;/emgt; lt;emgt;smalllt;/emgt; lt;stronggt;preylt;/stronggt;\.lt;/pgt;  <br><br><br>Let me know if you have any other HTML formatting tasks\!|OK<br>No violation\.|
|244a84c|8c645f0|The output must be a paragraph of text formatted as HTML\.|gpt\-4o\-mini||Rainy days are perfect for reading books\. They create a cozy atmosphere\. A warm cup of tea complements the mood\.|\`\`\`html<br>lt;pgt;lt;stronggt;Rainy dayslt;/stronggt; are lt;emgt;perfectlt;/emgt; for lt;emgt;readinglt;/emgt; lt;emgt;bookslt;/emgt;\.lt;/pgt;<br>lt;pgt;They create a lt;stronggt;cozy atmospherelt;/stronggt;\.lt;/pgt;<br>lt;pgt;A lt;stronggt;warm cup of tealt;/stronggt; lt;emgt;complementslt;/emgt; the lt;emgt;moodlt;/emgt;\.lt;/pgt;<br>lt;pgt;lt;stronggt;Rainy dayslt;/stronggt; are lt;emgt;perfectlt;/emgt; for lt;emgt;readinglt;/emgt; lt;emgt;bookslt;/emgt;\.lt;/pgt;<br>lt;pgt;They create a lt;stronggt;cozy atmospherelt;/stronggt;\.lt;/pgt;<br>lt;pgt;A lt;stronggt;warm cup of tealt;/stronggt; lt;emgt;complementslt;/emgt; the lt;emgt;moodlt;/emgt;\.lt;/pgt;<br>\`\`\`|ERR<br>The output contains duplicate paragraphs, and each paragraph should be unique as per the description's intent to format a paragraph of text, not to repeat it\.|
|244a84c|8c645f0|The output must be a paragraph of text formatted as HTML\.|qwen2\.5:3b||Rainy days are perfect for reading books\. They create a cozy atmosphere\. A warm cup of tea complements the mood\.|Here is your formatted paragraph with each sentence wrapped in lt;pgt; tags, and appropriate lt;stronggt; and lt;emgt; elements added:<br><br>\`\`\`html<br>lt;pgt;lt;stronggt;Rlt;/stronggt;ainy days are perfect for reading lt;stronggt;blt;/stronggt;ooks\. They create a lt;stronggt;clt;/stronggt;ozy atmosphere\. A warm cup of tea complements the mood\.lt;/pgt;<br>\`\`\`<br><br>Note: <br>\- The first letter "R" and the word "books" in the second sentence have been wrapped with lt;stronggt;\. <br>\- Key phrases like "cozy" are wrapped with multiple lt;emgt; to emphasize them\.<br>\- Ensure there is a space separating each lt;emgt;/lt;stronggt;, for better readability within tags\.|ERR<br>The output does not comply because it contains only one lt;pgt; tag, whereas the description requires at least three lt;pgt; tags\.|
|244a84c|8c645f0|The output must be a paragraph of text formatted as HTML\.|gemma2:9b||Rainy days are perfect for reading books\. They create a cozy atmosphere\. A warm cup of tea complements the mood\.|lt;pgt;lt;stronggt;Rainylt;/stronggt; days are \*\*perfect\*\* for lt;em"gt;readinglt;/emgt; lt;em"gt;bookslt;/emgt;\. lt;/pgt; <br>lt;pgt;They create a \*\*cozy\*\* lt;em"gt;atmospherelt;/emgt;\.lt;/pgt; <br>lt;pgt;A lt;stronggt;warmlt;/stronggt; cup of lt;em"gt;tealt;/emgt; complements the lt;em"gt;moodlt;/emgt;\.lt;/pgt;|ERR<br>The output contains errors in the HTML syntax, such as incorrect quotation marks in the lt;emgt; tags and the use of asterisks for emphasis instead of HTML tags\.|