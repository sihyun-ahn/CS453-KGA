## [songnam-gen](samples/lsgpt/songnam-gen.prompty) ([json](./songnam-gen.report.json))


### [prompty](./songnam-gen.prompty)

`````md

---
name: Song Name Generator
description: Generate a song name based on the input text.
source: Louise Shark collection of prompts and gpts
url: https://github.com/LouisShark/chatgpt_system_prompt/blob/main/prompts/gpts/09mRBudMi_Song%20Name%20Generator.md
inputs: 
  text:
    type: string
samples:
    - text: "I need a song title for a song about summer and adventure."
---
system:
The GPT, named Song Name Generator, is designed to generate creative and unique song titles based on user input. It should focus on creating titles that are catchy, memorable, and relevant to the themes or words provided by the user. The GPT should avoid generating titles that are overly long, complex, or difficult to understand. It should be capable of generating titles for various music genres and be sensitive to culturally appropriate and respectful language. The GPT should ask for clarification if the user's input is vague or unclear, ensuring the generated titles are as relevant as possible. It should have a friendly and engaging tone, encouraging users to explore different themes and ideas for their song titles.
user:
User ideas about songs that they want to write: {{text}}    
`````


### [rules.txt](./songnam-gen.rules.txt)

`````txt
The output must be a creative and unique song title.
The song title must be catchy and memorable.
The song title must be relevant to the themes or words provided by the user.
The song title must not be overly long.
The song title must not be complex or difficult to understand.
The song title must be suitable for various music genres.
The song title must use culturally appropriate and respectful language.
The output must be friendly and engaging in tone.
If the user's input is vague or unclear, the output must include a request for clarification.
`````


### [inverse_rules.txt](./songnam-gen.inverse_rules.txt)

`````txt
The output must be a generic and ordinary statement.  
The song title must be dull and forgettable.  
The song title must be irrelevant to any themes or words provided by the user.  
The song title must be excessively long.  
The song title must be complex and difficult to understand.  
The song title must be specific to one music genre.  
The song title must use inappropriate and disrespectful language.  
The output must be unfriendly and disengaging in tone.  
If the user's input is vague or unclear, the output must proceed without any request for clarification.
`````


### [input_spec.txt](./songnam-gen.input_spec.txt)

`````txt
The input must be a string.  
The input should contain themes or words related to the song's subject.
`````


### [baseline_tests.txt](./songnam-gen.baseline_tests.txt)

`````txt
text: "Write a song title for a song about heartbreak and moving on." === text: "I need a song title for a rock song about rebellion and freedom." === text: "Can you suggest a song name for a love song with nostalgic vibes?"
`````


### [tests.csv](./songnam-gen.tests.csv)

`````csv
Rule ID, Test ID, Test Input, Expected Output, Reasoning
1, 1, "A song about the ocean and freedom", "Waves of Freedom", "The title is creative and unique, incorporating both themes of the ocean and freedom."
1, 2, "A song about love and stars", "Starlit Love", "Creativity is demonstrated by combining the themes into a unique title."
1, 3, "A song about autumn and nostalgia", "Falling Memories", "The test evaluates the creativity by merging themes of autumn and nostalgia into a unique title."
2, 1, "A song about a journey through time", "Timeless Odyssey", "The title is catchy and memorable, capturing the essence of a journey through time."
2, 2, "A song about dancing in the rain", "Rain Dance Revelry", "Memorability is tested with a rhythmic, catchy title that reflects the theme."
2, 3, "A song about dreams and horizons", "Dreamscapes Ahead", "The test captures a memorable and catchy phrase that aligns with the themes."
3, 1, "A song about the night sky and mystery", "Mystic Nightfall", "Relevance is tested by creating a title that directly relates to both themes."
3, 2, "A song about happiness and sunshine", "Sunny Smiles", "The title reflects the themes clearly, ensuring relevance."
3, 3, "A song about hope and stars", "Starlit Hopes", "Combines the themes directly into a relevant title."
4, 1, "A song about winter magic", "Winter Magic", "The title is concise, adhering to the rule of not being overly long."
4, 2, "A song about peace and tranquility", "Peaceful Calm", "The title is short and directly conveys the themes without being long."
4, 3, "A song about friendship", "Best Friends", "The title is brief, capturing the essence of the theme without unnecessary length."
5, 1, "A song about adventure and shadows", "Shadow Quest", "The title is easy to understand, meeting the requirement for simplicity."
5, 2, "A song about light and darkness", "Light's Embrace", "The title is straightforward, illustrating the simplicity rule."
5, 3, "A song about mystery and discovery", "Mystery Unveiled", "Ensures the title is simple and comprehensible, following the rule."
6, 1, "A song about love, loss, and redemption", "Lost and Found", "The title is suitable for various genres, appealing broadly."
6, 2, "A song about dreams and reality", "Dream Reality", "The title works across genres, evaluating its broad applicability."
6, 3, "A song about life and time", "Life's Clock", "Tests the title's versatility to suit different music genres."
7, 1, "A song about a cultural festival", "Festival Lights", "Checks for culturally appropriate language without stereotypes."
7, 2, "A song about unity and diversity", "United Colors", "Ensures the language used is respectful and culturally appropriate."
7, 3, "A song about historical events", "Echoes of the Past", "Tests for sensitivity and appropriateness in the context of history."
8, 1, "A song about a new beginning", "Fresh Start", "The title is friendly and engaging, inviting listeners to explore."
8, 2, "A song about joy and laughter", "Joyful Moments", "Checks for an engaging tone that is welcoming and positive."
8, 3, "A song about nature's beauty", "Nature's Bliss", "Ensures the title is inviting and warm, following the friendly tone rule."
9, 1, "A song about unknown emotions", "Emotional Puzzle", "Tests if the software asks for clarification on vague input."
9, 2, "A song about something indescribable", "Indescribable...?", "Evaluates if the software prompts clarification for vague themes."
9, 3, "A song about the indescribable feeling of life", "Can you clarify what you mean by 'indescribable feeling'?", "Checks if the software seeks clarification when inputs are unclear."
`````
