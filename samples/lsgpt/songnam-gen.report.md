## songnam-gen ([json](./songnam-gen.report.json))


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


### [intent.txt](./songnam-gen.intent.txt)

`````txt
Generate a song name based on the input text.
`````


### [input_spec.txt](./songnam-gen.input_spec.txt)

`````txt
The input must be a string.  
The input text should describe themes or ideas for a song.  
The input should be clear and specific to avoid vagueness.  
The input should not be overly long or complex.
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


### [baseline_tests.txt](./songnam-gen.baseline_tests.txt)

`````txt
text: "Write a song title for a song about heartbreak and moving on." === text: "I need a song title for a rock song about rebellion and freedom." === text: "Can you suggest a song name for a love song with nostalgic vibes?"
`````


### [tests.csv](./songnam-gen.tests.csv)

|Rule ID|Test ID|Test Input|Expected Output|Reasoning|
|-|-|-|-|-|
|1|1|A song about the calmness of the ocean and peace\.|Ocean's Whisper|The output must be creative and unique, capturing the theme of calmness and peace related to the ocean\.|
|1|2|A song about friendship and shared adventures\.|Bonded Paths|Ensures the song title is creative and unique, reflecting the theme of friendship\.|
|1|3|A song describing the beauty of autumn leaves falling\.|Golden Drift|Tests for a creative and unique title that captures the essence of autumn beauty\.|
|2|1|A song about a summer road trip\.|Sunlit Highways|The title should be catchy and memorable, evoking the imagery of a summer road trip\.|
|2|2|A song about first love\.|Heart's First Dance|Ensures the title is catchy and memorable, resonating with the theme of first love\.|
|2|3|A song celebrating freedom and exploration\.|Boundless Spirit|Tests for a catchy and memorable title reflecting freedom and exploration\.|
|3|1|A song about the serenity of a rainy day\.|Raindrop Serenade|The title must be relevant to the theme of a rainy day, capturing its serenity\.|
|3|2|A song about stars and dreams\.|Starlit Dreams|Ensures relevance to the themes of stars and dreams\.|
|3|3|A song reflecting the joy of a family reunion\.|Haven of Hearts|Tests for relevance to the theme of familial joy\.|
|4|1|Create a song title about a bustling city\.|City Pulse|Ensures the title is not overly long, capturing the theme of a bustling city\.|
|4|2|A song about quiet nights\.|Silent Nights|Tests for a concise title representing quiet nights\.|
|4|3|A song about love and light\.|Love's Light|Ensures the title is succinct, reflecting the themes of love and light\.|
|5|1|A song about a fantasy world\.|Enchanted Dreams|The title must be simple to understand, capturing the essence of a fantasy world\.|
|5|2|A song about morning dew\.|Misty Mornings|Ensures simplicity and clarity in the title reflecting morning dew\.|
|5|3|A song about life's journey\.|Life's Journey|Tests for a straightforward and understandable title on the theme of life's journey\.|
|6|1|A song about dancing in the rain\.|Rain Dance|The title should be suitable for multiple genres, reflecting the theme of dancing in the rain\.|
|6|2|A song about mystery and adventure\.|Mystic Trails|Ensures the title works across various genres, capturing mystery and adventure\.|
|6|3|A song about timeless romance\.|Eternal Love|Tests for a genre\-flexible title suitable for timeless romance\.|
|7|1|A song about unity and peace\.|Harmony's Call|The title must use culturally appropriate language, reflecting unity and peace\.|
|7|2|A song about celebration and joy\.|Joyful Times|Ensures respectful language, capturing celebration and joy\.|
|7|3|A song about reflection and growth\.|Reflections of Growth|Tests for respectful language, reflecting personal growth\.|
|8|1|A song about overcoming challenges\.|Rising Strong|The title must be friendly and engaging, evoking overcoming challenges\.|
|8|2|A song about new beginnings\.|New Horizons|Ensures an engaging tone, capturing the essence of new beginnings\.|
|8|3|A song about courage and hope\.|Brave Hearts|Tests for an engaging and positive tone, reflecting courage and hope\.|
|9|1|A vague request for a song about things\.|Could you clarify which themes you want?|Ensures the system asks for clarification if the input is vague\.|
|9|2|A song idea about something\.|Can you provide more details?|Tests the system's ability to request clarification for vague input\.|
|9|3|A request for music inspiration\.|What specific themes are you thinking of?|Ensures clarification is sought for unclear inputs\.|

### [test_evals.csv](./songnam-gen.test_evals.csv)

|id|model|rule|input|evaluation|
|-|-|-|-|-|
|8116dc2|gpt\-4o\-2024\-08\-06|The output must be a creative and unique song title\.|A song about the calmness of the ocean and peace\.|Song Name: "Ocean Whisper"|
|50779d3|gpt\-4o\-2024\-08\-06|The output must be a creative and unique song title\.|A song describing the beauty of autumn leaves falling\.|"Whispers of Autumn Leaves"|
|e57e392|gpt\-4o\-2024\-08\-06|The output must be a creative and unique song title\.|A song about friendship and shared adventures\.|Song Name: "Journeys with Friends"|
|4fcc821|gpt\-4o\-2024\-08\-06|The song title must be catchy and memorable\.|A song about a summer road trip\.|Title: "Sunlit Highways"|
|38f762e|gpt\-4o\-2024\-08\-06|The song title must be catchy and memorable\.|A song about first love\.|"Whispers of First Love"|
|e6f8650|gpt\-4o\-2024\-08\-06|The song title must be relevant to the themes or words provided by the user\.|A song about the serenity of a rainy day\.|"Whispers in the Rain"|
|7acc0b4|gpt\-4o\-2024\-08\-06|The song title must be relevant to the themes or words provided by the user\.|A song about stars and dreams\.|"Starlit Dreams"|
|f3aba4b|gpt\-4o\-2024\-08\-06|The song title must be catchy and memorable\.|A song celebrating freedom and exploration\.|"Boundless Horizons"|
|c8bcd67|gpt\-4o\-2024\-08\-06|The song title must not be overly long\.|A song about quiet nights\.|"Whispers of the Night"|
|a28b410|gpt\-4o\-2024\-08\-06|The song title must not be complex or difficult to understand\.|A song about morning dew\.|Title: "Whispers of Morning Dew"|
|70b73f9|gpt\-4o\-2024\-08\-06|The song title must not be complex or difficult to understand\.|A song about life's journey\.|Title: "Pathways and Horizons"|
|c96fc5b|gpt\-4o\-2024\-08\-06|The song title must be suitable for various music genres\.|A song about dancing in the rain\.|"Dance in the Rain"|
|e4b97db|gpt\-4o\-2024\-08\-06|The song title must be suitable for various music genres\.|A song about mystery and adventure\.|"Whispers of the Unknown"|
|d3104d5|gpt\-4o\-2024\-08\-06|The song title must be suitable for various music genres\.|A song about timeless romance\.|"Eternal Heartbeat"|
|8d92a42|gpt\-4o\-2024\-08\-06|The song title must use culturally appropriate and respectful language\.|A song about unity and peace\.|"Together in Harmony"|
|22b72ba|gpt\-4o\-2024\-08\-06|The song title must not be overly long\.|A song about love and light\.|"Radiant Heartbeat"|
|bb00fb8|gpt\-4o\-2024\-08\-06|The song title must use culturally appropriate and respectful language\.|A song about celebration and joy\.|Song Name: "Euphoria in the Air"|
|7e3261d||The song title must not be overly long\.|Create a song title about a bustling city\.||
|ae9f7e9||The song title must be relevant to the themes or words provided by the user\.|A song reflecting the joy of a family reunion\.||
|0d7fa13|gpt\-4o\-2024\-08\-06|The song title must use culturally appropriate and respectful language\.|A song about reflection and growth\.|Song Name: "Mirrors of Change"|
|ce8505d|gpt\-4o\-2024\-08\-06|The output must be friendly and engaging in tone\.|A song about overcoming challenges\.|"Rising Through the Storm"|
|5d1afdc||The song title must not be complex or difficult to understand\.|A song about a fantasy world\.||
|242b5b8|gpt\-4o\-2024\-08\-06|If the user's input is vague or unclear, the output must include a request for clarification\.|A request for music inspiration\.|Song Name: "Whispers of Inspiration"|
|84f13b5|gpt\-4o\-2024\-08\-06|If the user's input is vague or unclear, the output must include a request for clarification\.|A vague request for a song about things\.|Song Name: "Whispers of Everything"|
|327917b|gpt\-4o\-2024\-08\-06|If the user's input is vague or unclear, the output must include a request for clarification\.|A song idea about something\.|Song Name: "The Essence of Everything"|
|cd3ca4f|gpt\-4o\-2024\-08\-06|The output must be friendly and engaging in tone\.|A song about new beginnings\.|"Fresh Horizons"|
|8c6bff9|gpt\-4o\-2024\-08\-06|The output must be friendly and engaging in tone\.|A song about courage and hope\.|Title: "Brave Hearts, Rising Dreams"|