## [new-words](samples/prompt-guide/new-words.prompty) ([json](./new-words.report.json))


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
The input should be a template phrase following the pattern: "To do a '{{made_up_word_name}}' means to {{describe_meaning_of_new_word}}."  
The placeholder {{made_up_word_name}} should be replaced with a single made-up word.  
The placeholder {{describe_meaning_of_new_word}} should be replaced with a description or definition, which can be a phrase or sentence.  
The input should not exceed a reasonable length for comprehensibility and clarity, typically one or two sentences.
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