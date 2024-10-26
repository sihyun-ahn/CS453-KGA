## [text-to-p](samples/text-to-p/text-to-p.prompty) ([json](./text-to-p.report.json))


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


### [rules.txt](./text-to-p.rules.txt)

`````txt
The output must contain at least three `<p>` tags. 
Each sentence from the original paragraph must be wrapped in a separate `<p>` tag.
Inside each `<p>` tag, there must be one `<strong>` tag.
Inside each `<p>` tag, there must be multiple `<em>` tags.
The `<p>`, `<strong>`, and `<em>` tags must be correctly formatted as HTML.
`````


### [inverse_rules.txt](./text-to-p.inverse_rules.txt)

`````txt
Each sentence in the output must be unwrapped and not enclosed in any tags.
The output must contain fewer than three <p> tags.
Within each <p> tag, there must be no <strong> or <em> tags to emphasize key words and phrases.
`````


### [input_spec.txt](./text-to-p.input_spec.txt)

`````txt
The input is a paragraph of text.
The input must contain at least three sentences.
`````


### [baseline_tests.txt](./text-to-p.baseline_tests.txt)

`````txt
text: "Artificial intelligence is transforming the world. This transformation spans across various sectors. AI helps in improving efficiencies and creating new opportunities for innovation."

===
text: "The quick brown fox jumps over the lazy dog. This sentence is often used to test typing skills. Typing skills are important in the digital age."

===
text: "Climate change poses a significant threat to our planet. Measures to combat climate change are critical. Everyone can contribute to reducing their carbon footprint."
`````


### [tests.csv](./text-to-p.tests.csv)

`````csv
Rule ID, Test ID, Test Input, Expected Output, Reasoning
1, 1, "This is the first sentence. This is the second sentence. This is the third sentence.", "<p><strong>This is the first sentence.</strong></p><p><strong>This is the second sentence.</strong></p><p><strong>This is the third sentence.</strong></p>", "Ensures each sentence is wrapped in a <p> tag."
1, 2, "Hello world. How are you today? I am fine.", "<p><strong>Hello world.</strong></p><p><strong>How are you today?</strong></p><p><strong>I am fine.</strong></p>", "Tests basic functionality with simple sentences."
1, 3, "The quick brown fox jumps over the lazy dog. A stitch in time saves nine. To be or not to be.", "<p><strong>The quick brown fox jumps over the lazy dog.</strong></p><p><strong>A stitch in time saves nine.</strong></p><p><strong>To be or not to be.</strong></p>", "Checks standard input with different sentences."

2, 1, "This is one sentence. This is another sentence. This is yet another sentence.", "<p><strong>This is one sentence.</strong></p><p><strong>This is another sentence.</strong></p><p><strong>This is yet another sentence.</strong></p>", "Validates that at least three <p> tags are present in the output."
2, 2, "Sentence one. Sentence two. Sentence three. Sentence four.", "<p><strong>Sentence one.</strong></p><p><strong>Sentence two.</strong></p><p><strong>Sentence three.</strong></p><p><strong>Sentence four.</strong></p>", "Checks for more than three sentences ensuring at least three <p> tags."
2, 3, "First sentence. Second sentence. Third sentence.", "<p><strong>First sentence.</strong></p><p><strong>Second sentence.</strong></p><p><strong>Third sentence.</strong></p>", "Confirms that exactly three sentences result in three <p> tags."

3, 1, "This is the first key sentence. This is the second key sentence. This is the third key sentence.", "<p><strong>This is the first <em>key</em> sentence.</strong></p><p><strong>This is the second <em>key</em> sentence.</strong></p><p><strong>This is the third <em>key</em> sentence.</strong></p>", "Ensures that each <p> tag contains one <strong> tag and multiple <em> tags."
3, 2, "Important message here. Another important message there. Yet another important message.", "<p><strong><em>Important</em> message here.</strong></p><p><strong><em>Another important</em> message there.</strong></p><p><strong><em>Yet another important</em> message.</strong></p>", "Checks if multiple <em> tags are used correctly within <p> tags."
3, 3, "Emphasize this part. Don't forget this part. Pay attention to this part.", "<p><strong><em>Emphasize</em> this part.</strong></p><p><strong><em>Don't forget</em> this part.</strong></p><p><strong><em>Pay attention</em> to this part.</strong></p>", "Verifies correct usage of <strong> and <em> tags within each <p> tag."

4, 1, "First sentence. Second sentence. Third sentence.", "First sentence. Second sentence. Third sentence.", "Tests that sentences are not enclosed in any tags."
4, 2, "This is one sentence. This is another sentence. This is the last sentence.", "This is one sentence. This is another sentence. This is the last sentence.", "Ensures sentences are outputted without any tags."
4, 3, "Sentence A. Sentence B. Sentence C.", "Sentence A. Sentence B. Sentence C.", "Confirms that sentences are output as plain text."

5, 1, "Only two sentences here. And here is another.", "<p><strong>Only two sentences here.</strong></p><p><strong>And here is another.</strong></p>", "Tests that fewer than three <p> tags are present (invalid case)."
5, 2, "This is a sentence. Here is another one.", "<p><strong>This is a sentence.</strong></p><p><strong>Here is another one.</strong></p>", "Checks with exactly two sentences (invalid case)."
5, 3, "One sentence only.", "<p><strong>One sentence only.</strong></p>", "Validates output with just one sentence (invalid case)."

6, 1, "First. Second. Third.", "<p>First</p><p>Second</p><p>Third</p>", "Ensures no <strong> or <em> tags within <p> tags."
6, 2, "A quick sentence. Another quick one. Yet another quick one.", "<p>A quick sentence.</p><p>Another quick one.</p><p>Yet another quick one.</p>", "Tests absence of <strong> and <em> tags."
6, 3, "Test this. And test that. Finally test this.", "<p>Test this</p><p>And test that</p><p>Finally test this</p>", "Verifies that <p> tags do not contain <strong> or <em> tags."
`````
