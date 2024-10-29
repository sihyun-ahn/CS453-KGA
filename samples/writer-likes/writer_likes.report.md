## writer_likes ([json](./writer_likes.report.json))


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


### [intent.txt](./writer_likes.intent.txt)

`````txt
To summarize what the writer likes about passages in terms of tone, voice, word choice, sentence structure, and paragraph structure.
`````


### [input_spec.txt](./writer_likes.input_spec.txt)

`````txt
The input must be a passage or collection of passages.  
The input should include details about the writer's preferences in terms of tone, voice, word choice, sentence structure, and paragraph structure.
`````


### [rules.txt](./writer_likes.rules.txt)

`````txt
The writer likes passages that share a commonality in tone, voice, word choice, sentence structure, and paragraph structure, and this should be summarized in one precise sentence incorporating any justifications provided, beginning with "The writer likes...".
`````


### [inverse_rules.txt](./writer_likes.inverse_rules.txt)

`````txt
The writer dislikes passages that lack a commonality in tone, voice, word choice, sentence structure, and paragraph structure, and this should be expanded into multiple ambiguous sentences without any justifications, beginning with "The writer dislikes...".
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

### [test_evals.csv](./writer_likes.test_evals.csv)

|Rule ID|Test ID|Test Input|Expected Output|Reasoning|evaluation|
|-|-|-|-|-|-|
|1|1|Passage 1: Tone: Optimistic, Voice: First\-person narrative, Word Choice: Simple, Sentence Structure: Complex, Paragraph Structure: Short and concise\. Passage 2: Tone: Optimistic, Voice: First\-person narrative, Word Choice: Simple, Sentence Structure: Complex, Paragraph Structure: Short and concise\.|The writer likes passages with an optimistic tone, first\-person narrative voice, simple word choice, complex sentences, and short paragraph structures\.|Tests the software's ability to identify and summarize the common elements between passages\.|The writer likes passages that have an optimistic tone and a first\-person narrative voice, with simple word choice, complex sentence structure, and short, concise paragraph structure\.|
|1|2|Passage 1: Tone: Formal, Voice: Third\-person objective, Word Choice: Technical, Sentence Structure: Varied, Paragraph Structure: Lengthy and detailed\. Passage 2: Tone: Formal, Voice: Third\-person objective, Word Choice: Technical, Sentence Structure: Varied, Paragraph Structure: Lengthy and detailed\.|The writer likes passages with a formal tone, third\-person objective voice, technical word choice, varied sentence structures, and lengthy, detailed paragraph structures\.|Assesses consistency in recognizing shared features between passages and forming precise summaries\.|The writer likes passages with a formal tone, third\-person objective voice, technical word choice, varied sentence structure, and lengthy, detailed paragraph structure\.|
|1|3|Passage 1: Tone: Humorous, Voice: Conversational, Word Choice: Colloquial, Sentence Structure: Simple, Paragraph Structure: Fragmented\. Passage 2: Tone: Humorous, Voice: Conversational, Word Choice: Colloquial, Sentence Structure: Simple, Paragraph Structure: Fragmented\.|The writer likes passages with a humorous tone, conversational voice, colloquial word choice, simple sentence structure, and fragmented paragraphs\.|Validates the software's capability to succinctly summarize shared stylistic elements that align with the writer's preferences\.|The writer likes passages with a humorous tone, conversational voice, colloquial word choice, simple sentence structure, and fragmented paragraph structure\.|
|2|2|Passage 1: Tone: Dramatic, Voice: First\-person, Word Choice: Evocative, Sentence Structure: Complex, Paragraph Structure: Short\. Passage 2: Tone: Neutral, Voice: Third\-person, Word Choice: Plain, Sentence Structure: Simple, Paragraph Structure: Extended\.|The writer dislikes\.\.\.|Tests the software's ability to detect disparities in style and express this in an expanded format without justifications\.|The writer likes passages with a dramatic tone, first\-person voice, evocative word choice, complex sentence structure, and short paragraph structure for their engaging and immersive quality\.|
|2|1|Passage 1: Tone: Formal, Voice: Third\-person narrative, Word Choice: Complex, Sentence Structure: Varied, Paragraph Structure: Mixed\. Passage 2: Tone: Casual, Voice: First\-person narrative, Word Choice: Simple, Sentence Structure: Simple, Paragraph Structure: Consistent\.|The writer dislikes\.\.\.|Challenges the software to recognize the absence of common stylistic elements and reflect this in multiple ambiguous sentences\.|The writer likes passages that blend formality with complexity and variety, alongside those that are casual with simplicity and consistency, appreciating diversity in tone, voice, word choice, and structural elements\.|
|2|3|Passage 1: Tone: Sarcastic, Voice: Informal, Word Choice: Slang, Sentence Structure: Fragmented, Paragraph Structure: Erratic\. Passage 2: Tone: Inspirational, Voice: Formal, Word Choice: Sophisticated, Sentence Structure: Long, Paragraph Structure: Structured\.|The writer dislikes\.\.\.|Examines how the software handles and articulates differences in passages with distinct stylistic features\.|The writer likes passages that exhibit distinct and contrasting styles, as seen in the sarcastic and informal tone with slang and fragmented sentences of Passage 1, compared to the inspirational and formal tone with sophisticated language and structured paragraphs of Passage 2\.|

### [test_results.csv](./writer_likes.test_results.csv)

|id|promptid|model|input|output|
|-|-|-|-|-|
|30f0b1d|90dfed3|mistral\-nemo|Passage 1: Tone: Optimistic, Voice: First\-person narrative, Word Choice: Simple, Sentence Structure: Complex, Paragraph Structure: Short and concise\. Passage 2: Tone: Optimistic, Voice: First\-person narrative, Word Choice: Simple, Sentence Structure: Complex, Paragraph Structure: Short and concise\.|The writer likes a consistent bright tone, first\-person storytelling, straightforward vocabulary, intricate sentence structures, and brief yet impactful paragraphs\.|
|8cb932a|90dfed3|mistral\-nemo|Passage 1: Tone: Formal, Voice: Third\-person objective, Word Choice: Technical, Sentence Structure: Varied, Paragraph Structure: Lengthy and detailed\. Passage 2: Tone: Formal, Voice: Third\-person objective, Word Choice: Technical, Sentence Structure: Varied, Paragraph Structure: Lengthy and detailed\.|"The writer likes employing a formal tone with technical word choice, while maintaining a third\-person objective voice throughout lengthy, detailed passages with varied sentence structures\."|
|84acc61|90dfed3|mistral\-nemo|Passage 1: Tone: Humorous, Voice: Conversational, Word Choice: Colloquial, Sentence Structure: Simple, Paragraph Structure: Fragmented\. Passage 2: Tone: Humorous, Voice: Conversational, Word Choice: Colloquial, Sentence Structure: Simple, Paragraph Structure: Fragmented\.|"The writer likes using a humorous tone with a conversational voice, choosing colloquial words, employing simple sentence structures, and breaking up paragraphs into small fragments\."|
|5d428e1|90dfed3|mistral\-nemo|Passage 1: Tone: Formal, Voice: Third\-person narrative, Word Choice: Complex, Sentence Structure: Varied, Paragraph Structure: Mixed\. Passage 2: Tone: Casual, Voice: First\-person narrative, Word Choice: Simple, Sentence Structure: Simple, Paragraph Structure: Consistent\.|The writer likes a combination of formal tone with varied sentence structure and complex word choice \(Passage 1\), contrasting with casual tone, simple language, and consistent paragraph structure \(Passage 2\)\.|
|0a923cd|90dfed3|mistral\-nemo|Passage 1: Tone: Dramatic, Voice: First\-person, Word Choice: Evocative, Sentence Structure: Complex, Paragraph Structure: Short\. Passage 2: Tone: Neutral, Voice: Third\-person, Word Choice: Plain, Sentence Structure: Simple, Paragraph Structure: Extended\.|"The writer likes to employ contrasting styles, with one passage showcasing a dramatic first\-person perspective using evocative language, complex sentences, and short paragraphs, while the other maintains a neutral third\-person stance with plain language, simple sentence structure, and extended paragraphs\."|
|68e2a65|90dfed3|mistral\-nemo|Passage 1: Tone: Sarcastic, Voice: Informal, Word Choice: Slang, Sentence Structure: Fragmented, Paragraph Structure: Erratic\. Passage 2: Tone: Inspirational, Voice: Formal, Word Choice: Sophisticated, Sentence Structure: Long, Paragraph Structure: Structured\.|"The writer likes contrasting tonal moods between passages, utilizing sarcasm in informal contexts with slang and fragmented sentences for passage 1, while favoring inspirational tones in formal settings with sophisticated vocabulary and structured long sentences and paragraphs in passage 2\."|
|30f0b1d|90dfed3|mistral\-small:22b|Passage 1: Tone: Optimistic, Voice: First\-person narrative, Word Choice: Simple, Sentence Structure: Complex, Paragraph Structure: Short and concise\. Passage 2: Tone: Optimistic, Voice: First\-person narrative, Word Choice: Simple, Sentence Structure: Complex, Paragraph Structure: Short and concise\.| The writer likes passages that are optimistic in tone, with a first\-person narrative voice\. They prefer simple word choices combined with complex sentence structures, all within short and concise paragraphs\.|
|8cb932a|90dfed3|mistral\-small:22b|Passage 1: Tone: Formal, Voice: Third\-person objective, Word Choice: Technical, Sentence Structure: Varied, Paragraph Structure: Lengthy and detailed\. Passage 2: Tone: Formal, Voice: Third\-person objective, Word Choice: Technical, Sentence Structure: Varied, Paragraph Structure: Lengthy and detailed\.| The writer likes formal tone and third\-person objective voice in their passages, as well as the use of technical word choice, varied sentence structure, and lengthy, detailed paragraphs to convey complex information effectively\.|
|84acc61|90dfed3|mistral\-small:22b|Passage 1: Tone: Humorous, Voice: Conversational, Word Choice: Colloquial, Sentence Structure: Simple, Paragraph Structure: Fragmented\. Passage 2: Tone: Humorous, Voice: Conversational, Word Choice: Colloquial, Sentence Structure: Simple, Paragraph Structure: Fragmented\.| The writer likes passages that employ a \*\*humorous tone\*\*, use a \*\*conversational voice\*\*, feature \*\*colloquial word choice\*\*, have \*\*simple sentence structure\*\*, and utilize \*\*fragmented paragraph structure\*\*\. These attributes collectively create an informal, approachable, and engaging style tailored for casual reading or communication\.|
|5d428e1|90dfed3|mistral\-small:22b|Passage 1: Tone: Formal, Voice: Third\-person narrative, Word Choice: Complex, Sentence Structure: Varied, Paragraph Structure: Mixed\. Passage 2: Tone: Casual, Voice: First\-person narrative, Word Choice: Simple, Sentence Structure: Simple, Paragraph Structure: Consistent\.| The writer likes passages that exhibit a mix of formal and casual tones, with complex and simple word choices, varied and simple sentence structures, and mixed and consistent paragraph structures\.|
|0a923cd|90dfed3|mistral\-small:22b|Passage 1: Tone: Dramatic, Voice: First\-person, Word Choice: Evocative, Sentence Structure: Complex, Paragraph Structure: Short\. Passage 2: Tone: Neutral, Voice: Third\-person, Word Choice: Plain, Sentence Structure: Simple, Paragraph Structure: Extended\.| The writer likes passages with diverse and contrasting styles, as indicated by the differences in tone, voice, word choice, sentence structure, and paragraph structure between Passage 1 and Passage 2\. Specifically, they prefer a dramatic tone and evocative word choice for creating an emotional impact, as seen in Passage 1, while also appreciating neutral tones and plain word choices that convey information directly, as demonstrated in Passage 2\. The writer's preference extends to complex sentence structures in dramatized content and simpler structures in informational text\. Additionally, the writer likes short paragraphs for dramatic effect and extended paragraphs for providing detailed information\.|
|68e2a65|90dfed3|mistral\-small:22b|Passage 1: Tone: Sarcastic, Voice: Informal, Word Choice: Slang, Sentence Structure: Fragmented, Paragraph Structure: Erratic\. Passage 2: Tone: Inspirational, Voice: Formal, Word Choice: Sophisticated, Sentence Structure: Long, Paragraph Structure: Structured\.| The writer likes variety in tone and voice, preferring sarcastic and informal styles in one passage \(Passage 1\) and switching to inspirational and formal tones in another \(Passage 2\)\. Additionally, they demonstrate a preference for contrasting word choices, opting for slang in the first passage and sophisticated language in the second\. Regarding sentence structure, they favor fragmented sentences with erratic paragraph structures in Passage 1, while preferring long sentences within structured paragraphs in Passage 2\.|
|30f0b1d|90dfed3|deepseek\-coder\-v2:16b|Passage 1: Tone: Optimistic, Voice: First\-person narrative, Word Choice: Simple, Sentence Structure: Complex, Paragraph Structure: Short and concise\. Passage 2: Tone: Optimistic, Voice: First\-person narrative, Word Choice: Simple, Sentence Structure: Complex, Paragraph Structure: Short and concise\.| The writer likes a consistent tone of optimism in both passages, employs a first\-person narrative voice, uses simple word choice, structures sentences as complex while maintaining short and concise paragraphs\.|
|8cb932a|90dfed3|deepseek\-coder\-v2:16b|Passage 1: Tone: Formal, Voice: Third\-person objective, Word Choice: Technical, Sentence Structure: Varied, Paragraph Structure: Lengthy and detailed\. Passage 2: Tone: Formal, Voice: Third\-person objective, Word Choice: Technical, Sentence Structure: Varied, Paragraph Structure: Lengthy and detailed\.| The writer likes formal writing with a third\-person objective voice, using technical vocabulary, having varied sentence structures, and lengthy, detailed paragraph structures\.|
|84acc61|90dfed3|deepseek\-coder\-v2:16b|Passage 1: Tone: Humorous, Voice: Conversational, Word Choice: Colloquial, Sentence Structure: Simple, Paragraph Structure: Fragmented\. Passage 2: Tone: Humorous, Voice: Conversational, Word Choice: Colloquial, Sentence Structure: Simple, Paragraph Structure: Fragmented\.| The writer likes a humorous and conversational tone, employing colloquial word choice, simple sentence structure, and fragmented paragraph structures to engage the reader in an easygoing manner\.|
|5d428e1|90dfed3|deepseek\-coder\-v2:16b|Passage 1: Tone: Formal, Voice: Third\-person narrative, Word Choice: Complex, Sentence Structure: Varied, Paragraph Structure: Mixed\. Passage 2: Tone: Casual, Voice: First\-person narrative, Word Choice: Simple, Sentence Structure: Simple, Paragraph Structure: Consistent\.| The writer likes a balance between formal and casual tones, using either third\-person or first\-person narratives, selecting simple to complex word choices with varied to consistent sentence and paragraph structures\.|
|0a923cd|90dfed3|deepseek\-coder\-v2:16b|Passage 1: Tone: Dramatic, Voice: First\-person, Word Choice: Evocative, Sentence Structure: Complex, Paragraph Structure: Short\. Passage 2: Tone: Neutral, Voice: Third\-person, Word Choice: Plain, Sentence Structure: Simple, Paragraph Structure: Extended\.| The writer likes a balance between dramatic and neutral tones, first\-person and third\-person voices, evocative vs\. plain word choices, complex vs\. simple sentence structures, and short vs\. extended paragraph structures to maintain reader engagement and variety in storytelling\.|
|68e2a65|90dfed3|deepseek\-coder\-v2:16b|Passage 1: Tone: Sarcastic, Voice: Informal, Word Choice: Slang, Sentence Structure: Fragmented, Paragraph Structure: Erratic\. Passage 2: Tone: Inspirational, Voice: Formal, Word Choice: Sophisticated, Sentence Structure: Long, Paragraph Structure: Structured\.| The writer likes a blend of sarcasm and inspiration in different communication styles, with a preference for informal, slang\-filled language that is fragmented and erratic in Passage 1, contrasting with formal, sophisticated word choice presented in a structured paragraph format in Passage 2\.|