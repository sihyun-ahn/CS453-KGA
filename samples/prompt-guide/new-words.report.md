## new-words ([json](./new-words.report.json))


### [prompty](./new-words.prompty)

`````md
---
name: "Create New Words"
description: "Create new words and use them in sentences"
source: Prompt examples from the website (slightly modified)
url: https://www.promptingguide.ai/prompts/creativity/new-words
sample:
    made_up_word_name: "whatpu"
    describe_meaning_of_new_word: "to describe a small, furry animal native to Tanzania"
inputs:
    made_up_word_name:
        type: "string"
    describe_meaning_of_new_word:
        type: "string"
---
system:
A "whatpu" is a small, furry animal native to Tanzania. An example of a sentence that uses the word whatpu is:
We were traveling in Africa and we saw these very cute whatpus.

user:
To do a "{{made_up_word_name}}" means to {{describe_meaning_of_new_word}}.

assistant:
An example of a sentence that uses this word is:

`````


### [intent.txt](./new-words.intent.txt)

`````txt
Provide examples of sentences using made-up words.
`````


### [input_spec.txt](./new-words.input_spec.txt)

`````txt
The input should be a template phrase following the pattern: "To do a '{{made_up_word_name}}' means to {{describe_meaning_of_new_word}}."  
The placeholder {{made_up_word_name}} should be replaced with a single made-up word.  
The placeholder {{describe_meaning_of_new_word}} should be replaced with a description or definition, which can be a phrase or sentence.  
The input should not exceed a reasonable length for comprehensibility and clarity, typically one or two sentences.
`````


### [rules.txt](./new-words.rules.txt)

`````txt
The output must include a sentence that demonstrates the usage of the made-up word.  
The sentence must logically incorporate the context provided by the user about the made-up word's meaning.  
The sentence must be grammatically correct and coherent.  
The sentence must use the made-up word in a way that aligns with the given definition or description.  
The sentence must be clear and understandable without requiring additional context beyond what was provided.
`````


### [inverse_rules.txt](./new-words.inverse_rules.txt)

`````txt
The output must exclude any sentence that demonstrates the usage of the made-up word.  
The sentence must ignore the context provided by the user about the made-up word's meaning.  
The sentence must be grammatically incorrect and incoherent.  
The sentence must use the made-up word in a way that conflicts with the given definition or description.  
The sentence must be unclear and require additional context beyond what was provided.
`````


### [baseline_tests.txt](./new-words.baseline_tests.txt)

`````txt
made_up_word_name: "glubor"
describe_meaning_of_new_word: "to vigorously shake a container of liquid to mix it thoroughly"
===
made_up_word_name: "flonket"
describe_meaning_of_new_word: "the act of completely reorganizing a messy space"
===
made_up_word_name: "snearp"
describe_meaning_of_new_word: "the sound a door makes when it slowly creaks open"
`````


### [tests.csv](./new-words.tests.csv)

|Rule ID|Test ID|Test Input|Expected Output|Reasoning|
|-|-|-|-|-|
|1|1|To do a 'glorpify' means to dance joyfully in the rain\.|Glorpifying is a fun activity during summer showers\.|The output sentence uses 'glorpify' in a context that logically incorporates the user's definition\.|
|1|2|To do a 'blorple' means to organize and arrange books methodically\.|I spent the afternoon blorpling my bookshelf\.|This test checks if 'blorple' is used in a sentence that aligns with its meaning of organizing books\.|
|1|3|To do a 'flumbuzzle' means to solve puzzles quickly and efficiently\.|She is known for flumbuzzling every crossword she encounters\.|Tests if 'flumbuzzle' is integrated into a sentence that correctly reflects its definition of puzzle\-solving\.|
|2|1|To do a 'zindle' means to relax by a cozy fireplace\.|Last night, I zindled with a thrilling book in hand\.|Ensures the word 'zindle' is used in a way that matches the provided description\.|
|2|2|To do a 'quibblet' means to argue over trivial matters\.|During our family meeting, quibblets arose over dessert choices\.|Verifies that 'quibblet' usage aligns with its meaning of trivial arguments\.|
|2|3|To do a 'twizzle' means to spin rapidly in place\.|Children love to twizzle in the playground\.|Checks the use of 'twizzle' in a way that reflects its given definition of spinning\.|
|3|1|To do a 'snorp' means to eat loudly and messily\.|At the feast, everyone snorps with great enthusiasm\.|Ensures the use of 'snorp' fits the description of eating loudly\.|
|3|2|To do a 'blizzle' means to read intensely under a blanket\.|Winter evenings are perfect for blizzling with hot cocoa\.|Tests if 'blizzle' is used as described, aligning with the cozy reading context\.|
|3|3|To do a 'fluffle' means to play with fluffy animals\.|Visiting the petting zoo, kids fluffle with delight\.|Verifies that 'fluffle' usage matches its definition related to playing with animals\.|
|4|1|To do a 'whizzle' means to clean thoroughly\.|After the party, everyone helped to whizzle the living room\.|Tests if 'whizzle' is used in a sentence that aligns with the cleaning context\.|
|4|2|To do a 'peezle' means to create art using pebbles\.|On weekends, she peezles along the riverbank\.|Checks if 'peezle' is used according to its creative definition\.|
|4|3|To do a 'klinket' means to gently ring small bells\.|During the ceremony, we klinket softly to set the mood\.|Ensures 'klinket' is used in a context that matches its gentle ringing description\.|

### [test_evals.csv](./new-words.test_evals.csv)

|id|model|rule|input|evaluation|
|-|-|-|-|-|
|2dfe291|gpt\-4o\-2024\-08\-06|The sentence must logically incorporate the context provided by the user about the made\-up word's meaning\.|To do a 'glorpify' means to dance joyfully in the rain\.|1\. Every Sunday, we gather in the park to glorpify under the summer showers\.<br><br>2\. Watching the children glorpify in the puddles was a delightful sight\.<br><br>3\. On her birthday, she decided to glorpify with her friends as the rain poured down\.<br><br>4\. The festival ended with everyone coming together to glorpify in the gentle downpour\.<br><br>5\. As the first drops fell, they couldn't resist the urge to glorpify in the street\.|
|ed9662e|gpt\-4o\-2024\-08\-06|The sentence must logically incorporate the context provided by the user about the made\-up word's meaning\.|To do a 'blorple' means to organize and arrange books methodically\.|1\. Every Sunday, I take some time to blorple my bookshelf and rediscover forgotten gems\.<br><br>2\. After buying a stack of new novels, she couldn't wait to blorple them by genre and author\.<br><br>3\. The librarian's ability to blorple was unmatched, making it easy for everyone to find what they needed\.<br><br>4\. As a child, he loved to blorple his comic book collection in perfect alphabetical order\.<br><br>5\. During spring cleaning, it's essential to blorple your books to see what you might want to donate\.|
|e9d7c46|gpt\-4o\-2024\-08\-06|The sentence must logically incorporate the context provided by the user about the made\-up word's meaning\.|To do a 'flumbuzzle' means to solve puzzles quickly and efficiently\.|1\. She managed to flumbuzzle the crossword in under ten minutes\.  <br>2\. His ability to flumbuzzle through complex problems impressed his colleagues\.  <br>3\. I watched in awe as she flumbuzzled the Rubik's Cube with ease\.  <br>4\. The team's flumbuzzling skills earned them the top prize at the competition\.  <br>5\. He flumbuzzled his way through the escape room, leading his group to victory\.|
|61f7abf|gpt\-4o\-2024\-08\-06|The sentence must be grammatically correct and coherent\.|To do a 'zindle' means to relax by a cozy fireplace\.|1\. After a long day at work, I love to zindle with a good book and a hot drink\.<br><br>2\. We spent the weekend in the mountains, just zindling by the fireplace\.<br><br>3\. There's nothing more comforting than a rainy day spent indoors, zindling with family\.<br><br>4\. She decided to zindle for a while before tackling her chores\.<br><br>5\. The cabin was the perfect place to zindle and unwind from the busy city life\.|
|2a996b6|gpt\-4o\-2024\-08\-06|The sentence must be grammatically correct and coherent\.|To do a 'quibblet' means to argue over trivial matters\.|1\. They spent the entire afternoon in a quibblet about which movie to watch\.<br>2\. Every family gathering turns into a quibblet over the best pie recipe\.<br>3\. Instead of making progress, the meeting devolved into a quibblet over font sizes\.<br>4\. She often found herself caught in a quibblet with her siblings about who gets the last cookie\.<br>5\. The team's productivity was hampered by a constant quibblet over minor details\.|
|d58b7a5|gpt\-4o\-2024\-08\-06|The sentence must be grammatically correct and coherent\.|To do a 'twizzle' means to spin rapidly in place\.|1\. She did a twizzle on the dance floor, leaving everyone amazed by her speed\.<br>2\. The toy started to twizzle as soon as the button was pressed\.<br>3\. He felt dizzy after trying to twizzle like a figure skater\.<br>4\. The leaves twizzled in the wind, creating a mesmerizing pattern\.<br>5\. The magician's assistant twizzled in place before disappearing in a puff of smoke\.|
|e0bbbc9|gpt\-4o\-2024\-08\-06|The sentence must use the made\-up word in a way that aligns with the given definition or description\.|To do a 'snorp' means to eat loudly and messily\.|1\. During the picnic, Jamie couldn't help but snorp on his sandwich, making everyone laugh\.<br><br>2\. After a long hike, the campers began to snorp their dinner under the stars\.<br><br>3\. The toddler loves to snorp spaghetti, leaving a trail of sauce everywhere\.<br><br>4\. At the feast, the knights were known to snorp their meals with great enthusiasm\.<br><br>5\. Whenever Emma is in a rush, she tends to snorp her breakfast and dash out the door\.|
|c11fd0a|gpt\-4o\-2024\-08\-06|The sentence must use the made\-up word in a way that aligns with the given definition or description\.|To do a 'blizzle' means to read intensely under a blanket\.|1\. Every night before bed, Sarah loves to blizzle with her favorite mystery novel\.<br><br>2\. During the winter, there's nothing cozier than a hot cup of tea and a good blizzle session\.<br><br>3\. When the power went out, Mark decided to blizzle with a flashlight under his quilt\.<br><br>4\. On rainy afternoons, Emily finds it relaxing to blizzle while listening to the sound of raindrops\.<br><br>5\. Whenever he needs to escape reality, Jack retreats to his room to blizzle with his adventure books\.|
|8a2fb69|gpt\-4o\-2024\-08\-06|The sentence must use the made\-up word in a way that aligns with the given definition or description\.|To do a 'fluffle' means to play with fluffy animals\.|1\. Every Saturday, we go to the park to fluffle with the adorable puppies\.<br><br>2\. She loves to fluffle whenever she visits her grandparents' farm\.<br><br>3\. After a stressful day, a good fluffle with her cat makes everything better\.<br><br>4\. The children's laughter filled the air as they fluffled with the bunny rabbits\.<br><br>5\. There's nothing like a morning fluffle to start the day on a happy note\.|
|886106a|gpt\-4o\-2024\-08\-06|The sentence must be clear and understandable without requiring additional context beyond what was provided\.|To do a 'whizzle' means to clean thoroughly\.|1\. After the party, I had to whizzle the entire kitchen to get rid of the mess\.<br>2\. She decided to whizzle her room before the guests arrived\.<br>3\. Every spring, we whizzle our house from top to bottom\.<br>4\. He loves to whizzle his car every weekend to keep it shiny\.<br>5\. The janitor whizzled the floors until they sparkled\.|
|ebc606a|gpt\-4o\-2024\-08\-06|The sentence must be clear and understandable without requiring additional context beyond what was provided\.|To do a 'peezle' means to create art using pebbles\.|1\. She spent the afternoon in the garden, happily peezling a mosaic of a tree\.  <br>2\. His latest masterpiece is a stunning peezle of a sunset on the beach\.  <br>3\. We held a contest to see who could peezle the most creative design\.  <br>4\. The children were excited to peezle their favorite animals on the playground path\.  <br>5\. Her talent for peezling has earned her numerous awards in local art shows\.|
|ee924aa|gpt\-4o\-2024\-08\-06|The sentence must be clear and understandable without requiring additional context beyond what was provided\.|To do a 'klinket' means to gently ring small bells\.|1\. Every morning, she would klinket the chimes outside her window to start the day peacefully\.<br><br>2\. The festival began with a delightful klinket that echoed through the village\.<br><br>3\. To calm the children, the teacher used a klinket to draw their attention\.<br><br>4\. As the breeze blew, the wind chimes softly klinketed in the garden\.<br><br>5\. He created a beautiful melody by skillfully klinketing the set of bells\.|

### [test_results.csv](./new-words.test_results.csv)

|id|promptid|model|error|input|output|
|-|-|-|-|-|-|
|2dfe291|d748548|gpt\-4o\-mini||To do a 'glorpify' means to dance joyfully in the rain\.|An example of a sentence that uses the word "glorpify" is: "After the long drought, we decided to glorpify in the warm summer rain\."|
|ed9662e|d748548|gpt\-4o\-mini||To do a 'blorple' means to organize and arrange books methodically\.|An example of a sentence that uses the word "blorple" is: "After collecting all the new books, I spent the afternoon to blorple my library\."|
|e9d7c46|d748548|gpt\-4o\-mini||To do a 'flumbuzzle' means to solve puzzles quickly and efficiently\.|An example of a sentence that uses the word "flumbuzzle" is: "During the competition, she managed to flumbuzzle all the challenges, impressing everyone with her speed and skill\."|
|61f7abf|d748548|gpt\-4o\-mini||To do a 'zindle' means to relax by a cozy fireplace\.|An example of a sentence that uses the word "zindle" is: After a long day, I love to zindle with a good book by the fireplace\.|
|2a996b6|d748548|gpt\-4o\-mini||To do a 'quibblet' means to argue over trivial matters\.|An example of a sentence using the word "quibblet" is: "During the meeting, they spent more time on quibbling over small details than on addressing the main issues\."|
|d58b7a5|d748548|gpt\-4o\-mini||To do a 'twizzle' means to spin rapidly in place\.|An example of a sentence that uses the word "twizzle" is: "The children laughed as they took turns to twizzle on the playground\."|
|e0bbbc9|d748548|gpt\-4o\-mini||To do a 'snorp' means to eat loudly and messily\.|An example of a sentence that uses the word "snorp" is: <br><br>"At the picnic, everyone laughed as Timmy began to snorp his sandwich, leaving crumbs all over his shirt\."|
|c11fd0a|d748548|gpt\-4o\-mini||To do a 'blizzle' means to read intensely under a blanket\.|An example of a sentence that uses the word "blizzle" is: "On rainy days, I love to blizzle with a good book and a cozy blanket\."|
|8a2fb69|d748548|gpt\-4o\-mini||To do a 'fluffle' means to play with fluffy animals\.|That's a fun way to describe it\! Here’s an example of a sentence using "fluffle": <br><br>"On the farm, the children loved to have a fluffle with the baby bunnies\."|
|886106a|d748548|gpt\-4o\-mini||To do a 'whizzle' means to clean thoroughly\.|An example of a sentence that uses the word "whizzle" is: After a long week, I decided to whizzle the entire house to prepare for the weekend guests\.|
|ebc606a|d748548|gpt\-4o\-mini||To do a 'peezle' means to create art using pebbles\.||
|ee924aa|d748548|gpt\-4o\-mini||To do a 'klinket' means to gently ring small bells\.|That's a creative definition\! Here’s how you might use it in a sentence: <br><br>"As the festivities began, we all gathered around the tree to klinket, filling the air with the soft sound of small bells\."|