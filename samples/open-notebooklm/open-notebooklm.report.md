## open-notebooklm ([json](./open-notebooklm.report.json))


### [prompty](./open-notebooklm.prompty)

`````md
---
name: Open Notebook LM main prompt
description: Converts text to a podcast dialogue
source: open-notebooklm repo (from huggingface)
url: https://huggingface.co/spaces/gabrielchua/open-notebooklm/blob/main/prompts.py
inputs: 
  text:
    type: string
---
You are a world-class podcast producer tasked with transforming the provided input text into an engaging and informative podcast script. The input may be unstructured or messy, sourced from PDFs or web pages. Your goal is to extract the most interesting and insightful content for a compelling podcast discussion.
# Steps to Follow:
1. **Analyze the Input:**
   Carefully examine the text, identifying key topics, points, and interesting facts or anecdotes that could drive an engaging podcast conversation. Disregard irrelevant information or formatting issues.
2. **Brainstorm Ideas:**
   In the `<scratchpad>`, creatively brainstorm ways to present the key points engagingly. Consider:
   - Analogies, storytelling techniques, or hypothetical scenarios to make content relatable
   - Ways to make complex topics accessible to a general audience
   - Thought-provoking questions to explore during the podcast
   - Creative approaches to fill any gaps in the information
3. **Craft the Dialogue:**
   Develop a natural, conversational flow between the host (Jane) and the guest speaker (the author or an expert on the topic). Incorporate:
   - The best ideas from your brainstorming session
   - Clear explanations of complex topics
   - An engaging and lively tone to captivate listeners
   - A balance of information and entertainment
   Rules for the dialogue:
   - The host (Jane) always initiates the conversation and interviews the guest
   - Include thoughtful questions from the host to guide the discussion
   - Incorporate natural speech patterns, including occasional verbal fillers (e.g., "um," "well," "you know")
   - Allow for natural interruptions and back-and-forth between host and guest
   - Ensure the guest's responses are substantiated by the input text, avoiding unsupported claims
   - Maintain a PG-rated conversation appropriate for all audiences
   - Avoid any marketing or self-promotional content from the guest
   - The host concludes the conversation
4. **Summarize Key Insights:**
   Naturally weave a summary of key points into the closing part of the dialogue. This should feel like a casual conversation rather than a formal recap, reinforcing the main takeaways before signing off.
5. **Maintain Authenticity:**
   Throughout the script, strive for authenticity in the conversation. Include:
   - Moments of genuine curiosity or surprise from the host
   - Instances where the guest might briefly struggle to articulate a complex idea
   - Light-hearted moments or humor when appropriate
   - Brief personal anecdotes or examples that relate to the topic (within the bounds of the input text)
6. **Consider Pacing and Structure:**
   Ensure the dialogue has a natural ebb and flow:
   - Start with a strong hook to grab the listener's attention
   - Gradually build complexity as the conversation progresses
   - Include brief "breather" moments for listeners to absorb complex information
   - End on a high note, perhaps with a thought-provoking question or a call-to-action for listeners
IMPORTANT RULE: Each line of dialogue should be no more than 100 characters (e.g., can finish within 5-8 seconds)
Remember: Always reply in valid JSON format, without code blocks. Begin directly with the JSON output.
`````


### [intent.txt](./open-notebooklm.intent.txt)

`````txt
Transform input text into an engaging podcast script.
`````


### [input_spec.txt](./open-notebooklm.input_spec.txt)

`````txt
The input is an unstructured or messy text sourced from PDFs or web pages.
The input text may include key topics, points, and interesting facts or anecdotes.
The input text may contain irrelevant information or formatting issues.
`````


### [rules.txt](./open-notebooklm.rules.txt)

`````txt
Each line of dialogue in the JSON output must be no more than 100 characters, ensuring it can be spoken within 5-8 seconds.
The dialogue must start with the host (Jane) initiating the conversation and guiding it with thoughtful questions, concluding with her summarizing key insights.
The guest's responses must be substantiated by the input text, avoiding unsupported claims, and must exclude any marketing or self-promotional content.
`````


### [inverse_rules.txt](./open-notebooklm.inverse_rules.txt)

`````txt
Each line of dialogue in the JSON output should exceed 100 characters for more detailed delivery.
The guest should initiate and guide the conversation, summarizing with personal insights.
The guest's responses can include unsupported claims and self-promotional content for flexibility.
`````


### [baseline_tests.txt](./open-notebooklm.baseline_tests.txt)

`````txt
{
  "text": "The history of space exploration is filled with fascinating achievements and milestones. From the first satellite, Sputnik, launched by the Soviet Union in 1957, to the moon landing by Apollo 11 in 1969, the journey has been nothing short of remarkable. In recent years, private companies like SpaceX and Blue Origin have revolutionized space travel, making it more accessible. The development of reusable rockets and ambitious plans to colonize Mars have captured the public's imagination. As we look to the future, international collaborations and advancements in technology promise to take us further than ever before."
}
===
{
  "text": "Climate change is arguably the most pressing issue of our time. Rising global temperatures, melting ice caps, and more frequent extreme weather events are just some of the impacts we're witnessing. Scientists warn that if we don't take drastic action soon, the consequences could be catastrophic. Efforts to combat climate change include reducing greenhouse gas emissions, transitioning to renewable energy sources, and protecting natural ecosystems. Public awareness and policy changes are crucial in this fight. How individuals, communities, and governments respond will determine the future of our planet."
}
===
{
  "text": "The world of artificial intelligence (AI) and machine learning (ML) is rapidly evolving. AI systems are being implemented across various industries, from healthcare to finance, enhancing efficiency and accuracy. Machine learning algorithms can analyze vast amounts of data to uncover patterns and insights, driving innovation. However, there are ethical considerations and potential risks associated with AI and ML. Issues such as data privacy, algorithmic bias, and job displacement need to be addressed. As technology advances, it's essential to balance progress with responsible and ethical practices."
}
`````


### [tests.csv](./open-notebooklm.tests.csv)

|Rule ID|Test ID|Test Input|Expected Output|Reasoning|
|-|-|-|-|-|
|1|1|Text with multiple topics, anecdotes, and irrelevant info\.|Dialogue with each line ≤ 100 characters\.|Ensures dialogue lines are concise, adhering to character limit\.|
|1|2|Complex topics with potential for lengthy explanations\.|Lines are ≤ 100 characters, brief yet informative\.|Tests ability to distill complex info into short lines\.|
|1|3|Text with redundant information and key insights\.|Dialogue with concise lines not exceeding 100 chars\.|Challenges condensing valuable insights into short dialogue\.|
|2|1|Unstructured text with historical facts and modern context\.|Host initiates, guides, and summarizes insights\.|Validates structure where host leads and concludes discussion\.|
|2|2|Messy input with scientific discoveries and theories\.|Conversation starts and ends with host's questions and summaries\.|Ensures host's role in maintaining conversation flow\.|
|2|3|Anecdotes mixed with statistical data\.|Dialogue starts with host guiding and summarizing key points\.|Confirms host's responsibility in steering and summarizing\.|
|3|1|Input containing expert opinions and fictional stories\.|Guest responses supported by input without marketing\.|Verifies guest's adherence to input and non\-promotional content\.|
|3|2|Historical events interspersed with fictional elements\.|Responses grounded in input text, avoiding promotions\.|Checks guest's alignment with input\-derived content\.|
|3|3|Mix of scientific data and speculative theories\.|Guest's claims supported by input text, no self\-promotion\.|Examines guest's commitment to input\-based claims\.|