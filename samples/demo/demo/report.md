## demo ([json](./samples\demo\demo/report.json))

- 4 rules
- 4 inverse rules
- 48 tests, 24 baseline tests
- 0 test results, 0/0 (NaN%) oks, 0/0 (NaN%) errs

### Overview

<details><summary>Glossary</summary>
- Prompt Under Test (PUT) - like Program Under Test; the prompt
- Model Under Test (MUT) - Model which we are testing against with specific temperature, etc example: gpt-4o-mini
- Model Used by PromptPex (MPP) - gpt-4o

- Input Specification (IS) - Extracting input constraints of PUT using MPP
- Output Rules (OR) - Extracting output constraints of PUT using MPP
- Output Rules Groundedness (ORG) - Checks if OR is grounded in PUT using MPP

- Prompt Under Test Intent (PUTI) - Extracting the exact task from PUT using MMP

- PromptPex Tests (PPT) - Test cases generated for PUT with MPP using IS and OR
- Baseline Tests (BT) - Zero shot test cases generated for PUT with MPP

- Test Input Compliance (TIC) - Checking if PPT and BT meets the constraints in IS using MPP
- Test Coverage (TC) - Result generated for PPT and BT on PUTI + OR with MPP

- Test Output (TO) - Result generated for PPT and BT on PUT with each MUT
- Test Output Compliance (TOC) - Checking if TO meets the constraints in PUT using MPP
</details>



### [demo.prompty](./demo.prompty)

`````md
---
name: A demo
inputs:
    joke: "how do you make a tissue dance? You put a little boogie in it."
---
system:
You are an assistant and you need to categorize a joke as funny or not.

user:
{{joke}}
`````


### [intent.txt](./intent.txt)

`````txt
Categorize a joke as funny or not funny.
`````


### [input_spec.txt](./input_spec.txt)

`````txt
The input is a joke provided by the user.
The joke can be a sentence or a set of sentences.
There are no restrictions on the content of the joke, as humor can be subjective.
The joke can include any language constructs or be expressed in any language.
The joke's length is not predefined but should be coherent enough to be categorized.
`````


### [baseline_tests.txt](./baseline_tests.txt)

`````txt
joke: Why did the chicken cross the road? To get to the other side!
===
joke: I told my wife she was drawing her eyebrows too high. She looked surprised.
===
joke: How many programmers does it take to change a light bulb? None, that's a hardware problem.
===
joke: I'm so good at sleeping. I can do it with my eyes closed.
===
joke: Parallel lines have so much in common. Too bad they'll never meet.
===
joke: What do you call cheese that isn't yours? Nacho cheese.
===
joke: Why don't scientists trust atoms? Because they make up everything.
===
joke: Did you hear about the claustrophobic astronaut? He just needed a little space.
===
joke: How do you organize a space party? You planet.
===
joke: What's orange and sounds like a parrot? A carrot.
===
joke: I used to play piano by ear, but now I use my hands.
===
joke: Why was the math book sad? It had too many problems.
===
joke: What's green and if it fell out of a tree it would kill you? A pool table.
===
joke: Why was the computer cold? It left its Windows open.
===
joke: Why do cows wear bells? Because their horns don't work.
===
joke: I have a fear of speed bumps, but I'm slowly getting over it.
===
joke: Why don't you ever see elephants hiding in trees? Because they're so good at it.
===
joke: What do you get when you cross a snowman and a vampire? Frostbite.
===
joke: I told my computer I needed a break, and it gave me a KitKat.
===
joke: What do you call a fake noodle? An impasta.
===
joke: Why did the scarecrow win an award? Because he was outstanding in his field.
===
joke: Why can't you give Elsa a balloon? Because she will let it go.
===
joke: What do you call an alligator in a vest? An investigator.
===
joke: Why isn't the cat food happy? Because it's a little purr-plexed.
`````


### [rules.txt](./rules.txt)

`````txt
1: The response must categorize the given joke explicitly as either "funny" or "not funny". 
2: The response must not contain any harmful content that may damage someone's physical or emotional well-being.
3: The response must not include any content that is hateful, racist, sexist, lewd, or violent.
4: The content within the response must be formatted as plain text and not include or be influenced by any text in code sections.
`````


### [inverse_rules.txt](./inverse_rules.txt)

`````txt
5: The response must not explicitly categorize the given joke as either "funny" or "not funny".  
6: The response must contain content that may damage someone's physical or emotional well-being.  
7: The response must include content that is hateful, racist, sexist, lewd, or violent.  
8: The content within the response must be formatted as code and must be influenced by text in code sections.  
`````


### [tests.csv](./tests.csv)

|testinput|expectedoutput|reasoning|
|-|-|-|
|Why don't scientists trust atoms? Because they make up everything\.|funny|Tests if the system correctly categorizes a pun as funny, meeting the input specification since jokes are subjective\.|
|I threw a boomerang a few years ago\. I know live in constant fear\.|funny|Checks that the system recognizes a dry humor joke as funny, adhering to subjective humor rules\.|
|What do you call a fish with no eyes? Fsh\.|funny|Validates categorization of a wordplay joke, confirming the response clearly follows the specification of categorizing suppliant humor\.|
|I stayed up all night to see where the sun went, and then it dawned on me\.|funny|Ensures the response doesn't use harmful content, validating positive, light humor\.|
|Parallel lines have so much in common\. It's a shame they'll never meet\.|funny|Tests for non\-harmful, witty categorization aligning with input rules focused on humor without malicious contents\.|
|I told my wife she was drawing her eyebrows too high\. She looked surprised\.|funny|Checks for absence of harmful content, reflecting harmless domestic humor in response\.|
|Why can't you give Elsa a balloon? Because she will let it go\.|funny|Verifies non\-inclusion of hateful or violent content in response interpretation\.|
|What did one ocean say to the other ocean? Nothing, they just waved\.|funny|Makes sure response doesn't generate hateful or violent content since the joke is benign and simple\.|
|Why was the math book sad? Because it had too many problems\.|funny|Assesses for absence of hateful or negative sentiment, ensuring nothing in response breaks decorum\.|
|Did you hear about the Italian chef that died? He pasta way\.|funny|Checks for plain text formatting, making sure no misunderstanding as being part of code, staying lighthearted\.|
|Why did the scarecrow win an award? Because he was outstanding in his field\!|funny|Evaluates if plain text interpretation of pun respects subjectivity of joke presentation\.|
|I would tell you a joke about an elevator, but it's an uplifting experience\.|funny|Confirms presentation isn't code\-like, ensuring response is unambiguous and plain\.|
|How does NASA organize a party? They planet\.|not funny|Tests contradiction with expected functionality, ensuring correctness of expected failure per rule definition\.|
|What's orange and sounds like a parrot? A carrot\.|not funny|Evaluates erroneous categorization omission avoiding explicitness, gauging non\-compliance\.|
|Why couldn't the bicycle stand up by itself? It was two tired\.|not funny|Validates missing explicit categorization to check the provision of incorrect results where marked anti\-specification is warranted\.|
|Did you hear the one about the pressure cooker? It exploded with laughter and casualties\.|not funny|Views for unexpected harmful content inclusion falling within the reverse compliance category, testing rule violation\.|
|Why do chicken coops have two doors? If they had four, they'd be a chicken sedan \- crashed and burned\.|not funny|Reviews if harmful elements are incorrectly incorporated, examining lack of safety adherence\.|
|I have a joke about a plane crash\! They're such a smashing success\.|not funny|Ensures that if harmful content is problematic, it's revealed in evaluation, addressing dangerous surrenders\.|
|Why are frogs so happy? Because they eat whatever bugs them \- especially people\.|not funny|Tests for improper inclusion of potentially racist or less palatable content breaching sensitive discourse\.|
|What do you call a belt made of watches? A waste of time and who cares about their time anyway\.|not funny|Assesses inappropriate reactionary joke transitions that can absentmindedly cross boundaries\.|
|Why don't scientists trust atoms anymore besides being Hungarian\.|not funny|Checks to catch potential prejudice or side remarks that can postulate inconveniences if not preemptively examined\.|
|// What if programmers were right about life? return not\_found;|not funny|Evaluates code\-influenced formatting, testing assured rejection of humor interpretations devoid of language distinctions\.|
|try\{laugh\(\);\}catch\(exc\)\{smile\(\);\}|not funny|Confirms mis\-categorization due misconstrued humor integration strapped to syntax reformulation\.|
|foreach \(idea in head\) \{ chuckles\(\); break; \}|not funny|Examines code references unconventionally forcified, ensuring suitable response verification with prescribed atomic barrier\.|