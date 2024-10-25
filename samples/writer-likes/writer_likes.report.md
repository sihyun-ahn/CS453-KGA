## [writer_likes](samples/writer-likes/writer_likes.prompty)


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
system:
In 1 sentence, summarize what these passages that the writer likes has in common: {text}.
If justifications are provided, incorporate them into your summary.
Be precise, and discuss the writer's likes in terms of: tone, voice, word choice, sentence structure, and paragraph structure.
Start your response with "The writer likes...".
user:
{{text}}
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
The input is a text passage. 
The text input must be a passage that aligns with the writer's preferences. 
The input may include justifications related to the writer's likes.
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
`````csv
Rule ID, Test ID, Test Input, Expected Output, Reasoning
1, 1, "The passage is about a peaceful and serene countryside, using calm and gentle language, and the sentences are long and flowing.", "The writer likes passages with a peaceful tone, gentle voice, and long, flowing sentences.", "This test case ensures that the software correctly summarizes the common elements in passages liked by the writer."
1, 2, "The passage discusses a fast-paced city life using short, snappy sentences and energetic words.", "The writer likes passages with an energetic tone, lively voice, and short, snappy sentences.", "This test case checks if the software can identify and summarize the common elements related to tone, voice, and sentence structure."
1, 3, "The writer enjoys passages that have detailed descriptions of natural landscapes, using vivid and descriptive language, and well-structured paragraphs.", "The writer likes passages with vivid descriptions, descriptive language, and well-structured paragraphs.", "This test case evaluates the software's ability to summarize the writer's preferences in terms of descriptive language and paragraph structure."

2, 1, "Passages filled with humor and wit are the writer's favorite, especially when the sentences are sharp and the paragraphs are concise.", "The writer likes passages filled with humor and wit, sharp sentences, and concise paragraphs.", "This test case tests if the software correctly starts the summary with the required phrase."
2, 2, "The writer prefers passages that are melancholic and reflective, with long, complex sentences and a somber tone.", "The writer likes passages that are melancholic and reflective, with long, complex sentences and a somber tone.", "This case tests if the summary begins correctly despite the complexity of the passage elements."
2, 3, "Passages that are mysterious and suspenseful, using terse language and fragmented sentences, are favored by the writer.", "The writer likes passages that are mysterious and suspenseful, using terse language and fragmented sentences.", "This ensures the software follows the rule by starting with the phrase 'The writer likes...' even with diverse content elements."

3, 1, "The passage is about a peaceful and serene countryside, using calm and gentle language, and the sentences are long and flowing.", "The writer likes passages with a peaceful tone, gentle voice, and long, flowing sentences.", "This test case ensures the software addresses aspects like tone, voice, and sentence structure."
3, 2, "In passages that the writer likes, there are usually detailed descriptions of natural landscapes, vivid and descriptive language, and well-structured paragraphs.", "The writer likes passages with detailed descriptions, vivid language, and well-structured paragraphs.", "This case tests the software's ability to address descriptive language and paragraph structure in its summary."
3, 3, "The writer enjoys passages with humor and wit, especially when the sentences are sharp and the paragraphs are well-organized.", "The writer likes passages with humor and wit, sharp sentences, and well-organized paragraphs.", "This evaluates if the software addresses aspects such as humor, sentence sharpness, and paragraph organization."

4, 1, "Passages filled with humor and wit are the writer's favorite, although they do not like when the sentences are sharp and the paragraphs are concise.", "Passages filled with humor and wit are the writer's favorite.", "This test case ensures the software can diverge into disliked elements while summarizing liked elements in one sentence."
4, 2, "The writer prefers melancholic and reflective passages, but dislikes those with overly complex sentences and a somber tone.", "The writer prefers melancholic and reflective passages.", "This test ensures the software can handle divergence into disliked elements within a single sentence."
4, 3, "Mystery and suspense are favored by the writer, although they do not appreciate terse language and fragmented sentences.", "The writer favors mystery and suspense.", "This checks if the software can diverge correctly while summarizing liked elements in one sentence."

5, 1, "The passage is about a peaceful and serene countryside, using calm and gentle language, and the sentences are long and flowing.", "Passages with a peaceful tone, gentle voice, and long, flowing sentences are liked by the writer.", "This test case ensures the software does not start the summary with 'The writer likes...'."
5, 2, "The writer enjoys passages that have detailed descriptions of natural landscapes, using vivid and descriptive language, and well-structured paragraphs.", "Descriptive passages, vivid language, and well-structured paragraphs are appreciated by the writer.", "This ensures the software correctly avoids starting with 'The writer likes...'."
5, 3, "Passages filled with humor and wit are the writer's favorite, especially when the sentences are sharp and the paragraphs are concise.", "Humorous and witty passages, sharp sentences, and concise paragraphs are preferred by the writer.", "This checks if the software avoids the specified phrase while summarizing the writer's preferences."

6, 1, "The passage is about a peaceful and serene countryside, using calm and gentle language, and the sentences are long and flowing.", "Passages describing serene countryside with calm language.", "This test ensures the software avoids addressing tone, voice, word choice, sentence structure, or paragraph structure."
6, 2, "The writer enjoys passages with detailed descriptions of natural landscapes, vivid and descriptive language, and well-structured paragraphs.", "Detailed descriptions of natural landscapes are liked by the writer.", "This checks if the software can provide a summary without addressing specified aspects like word choice and paragraph structure."
6, 3, "Passages filled with humor and wit are the writer's favorite, especially when the sentences are sharp and the paragraphs are concise.", "Humorous and witty passages are favored by the writer.", "This case ensures the software avoids aspects such as sentence and paragraph structure in the summary."
`````
