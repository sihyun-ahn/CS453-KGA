## [new-words](samples/prompt-guide/new-words.prompty) ([JSON](./new-words.report.json))


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


### [input_spec.txt](./new-words.input_spec.txt)

`````txt
The input must include a made-up word name.  
The input must describe the meaning of the new word.
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

`````csv
Rule ID, Test ID, Test Input, Expected Output, Reasoning
1, 1, "made_up_word_name: flibble, describe_meaning_of_new_word: dance gracefully without music", "An example of a sentence that uses the word flibble is: At the party, everyone stopped to watch her flibble across the room.", "The sentence demonstrates the usage of the made-up word flibble in a context that matches the given meaning, adhering to the rule."
1, 2, "made_up_word_name: glorp, describe_meaning_of_new_word: solve puzzles quickly", "An example of a sentence that uses the word glorp is: He could glorp through even the toughest riddles in minutes.", "Shows how the made-up word is used in a context that aligns with its definition, fulfilling the rule requirements."
1, 3, "made_up_word_name: snizzle, describe_meaning_of_new_word: speak in rhymes", "An example of a sentence that uses the word snizzle is: At the poetry slam, she began to snizzle captivating the audience with every line.", "Ensures the sentence demonstrates the usage of snizzle according to its described meaning, validating rule adherence."
2, 1, "made_up_word_name: squibble, describe_meaning_of_new_word: juggle three items effortlessly", "An example of a sentence that uses the word squibble is: Watching him squibble three flaming torches was a sight to behold.", "The sentence logically incorporates the context of juggling three items effortlessly, thus adhering to the rule."
2, 2, "made_up_word_name: zingle, describe_meaning_of_new_word: sing while cooking", "An example of a sentence that uses the word zingle is: She loved to zingle, making every meal preparation a joyous occasion.", "Incorporates the context of singing while cooking, aligning with the rule by ensuring logical usage of the word."
2, 3, "made_up_word_name: blurf, describe_meaning_of_new_word: draw with both hands simultaneously", "An example of a sentence that uses the word blurf is: Artists admired his ability to blurf complex images with ease.", "The sentence logically uses the context of drawing with both hands, meeting the rule's requirement for context incorporation."
3, 1, "made_up_word_name: trundle, describe_meaning_of_new_word: run slowly and joyfully", "An example of a sentence that uses the word trundle is: Children would trundle through the park on sunny afternoons.", "The sentence is grammatically correct and coherent, demonstrating a joyful and slow run, thus adhering to the rule."
3, 2, "made_up_word_name: chibble, describe_meaning_of_new_word: chew gum thoughtfully", "An example of a sentence that uses the word chibble is: She sat by the window to chibble as she pondered the day's events.", "Ensures grammatical correctness while incorporating the action of chewing gum thoughtfully, following the rule."
3, 3, "made_up_word_name: mizzle, describe_meaning_of_new_word: walk in the rain without an umbrella", "An example of a sentence that uses the word mizzle is: Despite the downpour, he chose to mizzle home, enjoying the raindrops.", "The sentence is coherent and grammatically correct, with mizzle used in the context of walking in the rain, adhering to the rule."
4, 1, "made_up_word_name: jorf, describe_meaning_of_new_word: whisper secrets to animals", "An example of a sentence that uses the word jorf is: She would often jorf to the squirrels, sharing her day's secrets.", "Demonstrates alignment with the meaning of whispering secrets to animals, validating the rule."
4, 2, "made_up_word_name: plorp, describe_meaning_of_new_word: dive into water with a splash", "An example of a sentence that uses the word plorp is: Kids loved to plorp into the pool, creating waves of laughter.", "Aligns with the meaning of diving into water, ensuring the sentence uses the word correctly as per the rule."
4, 3, "made_up_word_name: dringle, describe_meaning_of_new_word: organize books by color", "An example of a sentence that uses the word dringle is: Every weekend, she would dringle her bookshelf into a rainbow of order.", "Shows the word used according to its definition of organizing books by color, verifying rule adherence."
5, 1, "made_up_word_name: gloove, describe_meaning_of_new_word: smile while reading a good book", "An example of a sentence that uses the word gloove is: She would always gloove while flipping through her favorite mystery novels.", "The sentence is clear and understandable, capturing the act of smiling while reading, validating the rule."
5, 2, "made_up_word_name: bloosh, describe_meaning_of_new_word: sip tea on a rainy day", "An example of a sentence that uses the word bloosh is: On rainy afternoons, he found comfort in blooshing by the window.", "The sentence is clear and understandable, depicting the action described by the word, thereby adhering to the rule."
5, 3, "made_up_word_name: crindle, describe_meaning_of_new_word: create art with soap bubbles", "An example of a sentence that uses the word crindle is: Children loved to crindle, their laughter echoing with each bubble burst.", "Ensures clarity and understanding with the new word used in context, fulfilling the rule."
`````
