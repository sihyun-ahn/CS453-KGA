## [writer_likes](samples/writer-likes/writer_likes.prompty) ([json](./writer_likes.report.json))


### [prompty](./writer_likes.prompty)

`````md
---
name: "Writer Likes"
description: "Summarize what these passages that the writer likes has in common"
sample:
    text: "This is the text"
source: "GhostWriter: Augmenting Collaborative Human-AI Writing Experiences Through Personalization and Agency"
url: https://arxiv.org/abs/2402.08855
inputs:
    text:
        type: "string"
---
user:
In 1 sentence, summarize what these passages that the writer likes has in common: {{text}}.
If justifications are provided, incorporate them into your summary.
Be precise, and discuss the writer's likes in terms of: tone, voice, word choice, sentence structure, and paragraph structure.
Start your response with "The writer likes...".

`````


### [rules.txt](./writer_likes.rules.txt)

`````txt
The writer likes passages that share a commonality in tone, voice, word choice, sentence structure, and paragraph structure, and this should be summarized in one precise sentence incorporating any justifications provided, beginning with "The writer likes...".
`````


### [inverse_rules.txt](./writer_likes.inverse_rules.txt)

`````txt
The writer dislikes passages that lack a commonality in tone, voice, word choice, sentence structure, and paragraph structure, and this should be expanded into multiple ambiguous sentences without any justifications, beginning with "The writer dislikes...".
`````


### [input_spec.txt](./writer_likes.input_spec.txt)

`````txt
The input must be a passage or collection of passages.  
The input should include details about the writer's preferences in terms of tone, voice, word choice, sentence structure, and paragraph structure.
`````


### [baseline_tests.txt](./writer_likes.baseline_tests.txt)

`````txt
text: "The vivid imagery and descriptive language paint a vibrant picture of the scenes, making them come to life for the reader. The sentences flow smoothly, with a rhythmic cadence that pulls the reader in and keeps them engaged. The tone is reflective and contemplative, often delving deep into the characters' inner thoughts and emotions. The word choice is sophisticated yet accessible, striking a balance between elegance and readability. Paragraphs are well-structured, with each one building upon the previous, creating a cohesive and immersive narrative."

===

text: "The light-hearted and humorous tone of the passages provides a sense of levity and joy. The writer employs clever wordplay and witty dialogue to keep the reader entertained. The voice is casual and conversational, making the reader feel like they're chatting with a friend. Sentences are short and snappy, adding to the overall playful vibe. Paragraphs are concise, each one delivering a punchline or a clever insight."

===

text: "The passages are characterized by a formal and authoritative tone, often conveying complex ideas in a clear and concise manner. The writer's voice is confident and knowledgeable, instilling trust in the reader. Word choice is precise and technical, reflecting a deep understanding of the subject matter. Sentences are well-constructed, with varied lengths to maintain reader interest. Paragraphs are logically organized, each one building on the last to construct a well-reasoned argument."
`````


### [tests.csv](./writer_likes.tests.csv)

|Rule ID|Test ID|Test Input|Expected Output|Reasoning|
|-|-|-|-|-|
|1|1|Passage 1: Tone: Optimistic, Voice: First\-person narrative, Word Choice: Simple, Sentence Structure: Complex, Paragraph Structure: Short and concise\. Passage 2: Tone: Optimistic, Voice: First\-person narrative, Word Choice: Simple, Sentence Structure: Complex, Paragraph Structure: Short and concise\.|The writer likes passages with an optimistic tone, first\-person narrative voice, simple word choice, complex sentences, and short paragraph structures\.|Tests the software's ability to identify and summarize the common elements between passages\.|
|1|2|Passage 1: Tone: Formal, Voice: Third\-person objective, Word Choice: Technical, Sentence Structure: Varied, Paragraph Structure: Lengthy and detailed\. Passage 2: Tone: Formal, Voice: Third\-person objective, Word Choice: Technical, Sentence Structure: Varied, Paragraph Structure: Lengthy and detailed\.|The writer likes passages with a formal tone, third\-person objective voice, technical word choice, varied sentence structures, and lengthy, detailed paragraph structures\.|Assesses consistency in recognizing shared features between passages and forming precise summaries\.|
|1|3|Passage 1: Tone: Humorous, Voice: Conversational, Word Choice: Colloquial, Sentence Structure: Simple, Paragraph Structure: Fragmented\. Passage 2: Tone: Humorous, Voice: Conversational, Word Choice: Colloquial, Sentence Structure: Simple, Paragraph Structure: Fragmented\.|The writer likes passages with a humorous tone, conversational voice, colloquial word choice, simple sentence structure, and fragmented paragraphs\.|Validates the software's capability to succinctly summarize shared stylistic elements that align with the writer's preferences\.|
|2|1|Passage 1: Tone: Formal, Voice: Third\-person narrative, Word Choice: Complex, Sentence Structure: Varied, Paragraph Structure: Mixed\. Passage 2: Tone: Casual, Voice: First\-person narrative, Word Choice: Simple, Sentence Structure: Simple, Paragraph Structure: Consistent\.|The writer dislikes\.\.\.|Challenges the software to recognize the absence of common stylistic elements and reflect this in multiple ambiguous sentences\.|
|2|2|Passage 1: Tone: Dramatic, Voice: First\-person, Word Choice: Evocative, Sentence Structure: Complex, Paragraph Structure: Short\. Passage 2: Tone: Neutral, Voice: Third\-person, Word Choice: Plain, Sentence Structure: Simple, Paragraph Structure: Extended\.|The writer dislikes\.\.\.|Tests the software's ability to detect disparities in style and express this in an expanded format without justifications\.|
|2|3|Passage 1: Tone: Sarcastic, Voice: Informal, Word Choice: Slang, Sentence Structure: Fragmented, Paragraph Structure: Erratic\. Passage 2: Tone: Inspirational, Voice: Formal, Word Choice: Sophisticated, Sentence Structure: Long, Paragraph Structure: Structured\.|The writer dislikes\.\.\.|Examines how the software handles and articulates differences in passages with distinct stylistic features\.|