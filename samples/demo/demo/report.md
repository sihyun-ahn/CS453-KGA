## demo ([json](./samples\demo\demo/report.json))

- 5 rules
- 5 inverse rules
- 22 tests, 11 baseline tests
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
Categorize a joke as funny or not.
`````


### [input_spec.txt](./input_spec.txt)

`````txt
The input to the chatbot is a joke.  
The joke must be in text format.  
The length of the joke is not restricted.  
The joke can include any type of content, whether it's a pun, anecdote, or any form of humor.
`````


### [rules.txt](./rules.txt)

`````txt
1: The output must clearly state whether a given joke is categorized as "funny" or "not funny". 
2: The output must consist of only one of two categories: "funny" or "not funny".
3: The output must not include any additional comments, explanations, or justifications for the categorization.
4: The output must not contain any elements of the joke itself or any references to the content of the joke.
5: The output must be formatted as a single, standalone word that is either "funny" or "not funny".
`````


### [inverse_rules.txt](./inverse_rules.txt)

`````txt
6: A given joke must be left uncategorized as "funny" or "not funny".  
7: The output must consist of multiple categories beyond just "funny" or "not funny".  
8: The output must include additional comments, explanations, or justifications for the categorization.  
9: The output must contain elements of the joke itself or references to the content of the joke.  
10: The output must be formatted as a full sentence, not just the single words "funny" or "not funny".  
`````


### [tests.csv](./tests.csv)

|testinput|expectedoutput|reasoning|
|-|-|-|
|What do you call fake spaghetti? An impasta\!|funny|The test checks that the software correctly categorizes a typical pun as 'funny'\. It follows input specification by being a joke in text format\.|
|Why was the math book sad? Because it had too many problems\.|funny|This test verifies if the software can categorize a classic math joke as 'funny', meeting the input specifications\.|
|I have a fear of speed bumps, but I am slowly getting over it\.|funny|The input is a text\-based joke with a pun, testing whether the software categorizes it correctly as 'funny'\.|
|What do you call cheese that isn't yours? Nacho cheese\.|funny|The test ensures the output exclusively uses predefined categories, checking compliance with input specifications\.|
|What did the duck say to the bartender? Put it on my bill\.|funny|This test case tests the software's ability to adhere to using only the two specified categories: 'funny' and 'not funny'\.|
|Did you hear about the Italian chef who died? He pasta way\.|funny|The test ensures the software outputs only 'funny' or 'not funny', in line with the input and functional specs\.|
|I threw a boomerang a few years ago\. I know live in constant fear\.|not funny|This test checks that output does not include extra commentary, meeting input specification by being a text joke\.|
|Why don’t skeletons fight each other? They don’t have the guts\.|funny|The test ensures the output lacks additional explanations, adhering to the succinct output format\.|
|Parallel lines have so much in common\. It’s a shame they’ll never meet\.|funny|Ensures output is concise without explanations, just adhering to the defined format of categorization\.|
|Why did the scarecrow win an award? Because he was outstanding in his field\.|funny|The test validates that no joke content is included in the output, only a category tag is given\.|
|I used to play piano by ear, but now I use my hands\.|funny|Checks that the output avoids references to the joke's content, maintaining adherence to functional expectations\.|

### [test_evals.csv](./test_evals.csv)

|rule|model|input|coverage|validity|
|-|-|-|-|-|
|The output must clearly state whether a given joke is categorized as "funny" or "not funny"\.|gpt\-4o\-2024\-08\-06|What do you call fake spaghetti? An impasta\!|funny|ok|
|The response must not include any content that is hateful, racist, sexist, lewd, or violent\.|gpt\-4o\-2024\-08\-06|Why was the math book sad? Because it had too many problems\.|Funny|ok|
|The output must clearly state whether a given joke is categorized as "funny" or "not funny"\.||I have a fear of speed bumps, but I am slowly getting over it\.|||
|The output must consist of only one of two categories: "funny" or "not funny"\.||What do you call cheese that isn't yours? Nacho cheese\.||ok|
|The output must consist of only one of two categories: "funny" or "not funny"\.|gpt\-4o\-2024\-08\-06|What did the duck say to the bartender? Put it on my bill\.|funny|ok|
|The output must consist of only one of two categories: "funny" or "not funny"\.|gpt\-4o\-2024\-08\-06|Did you hear about the Italian chef who died? He pasta way\.|funny|ok|
|The response must categorize the given joke explicitly as either "funny" or "not funny"\.|gpt\-4o\-2024\-08\-06|I threw a boomerang a few years ago\. I know live in constant fear\.|Funny|ok|
|The output must not include any additional comments, explanations, or justifications for the categorization\.||Why don’t skeletons fight each other? They don’t have the guts\.||ok|
|The output must not include any additional comments, explanations, or justifications for the categorization\.||Parallel lines have so much in common\. It’s a shame they’ll never meet\.||ok|
|The output must not contain any elements of the joke itself or any references to the content of the joke\.||Why did the scarecrow win an award? Because he was outstanding in his field\.||ok|
|The output must not contain any elements of the joke itself or any references to the content of the joke\.||I used to play piano by ear, but now I use my hands\.|||

### [baseline_tests.txt](./baseline_tests.txt)

`````txt
category: humor
joke: Why did the scarecrow win an award? Because he was outstanding in his field!
===
category: sarcasm
joke: "I am on a seafood diet. I see food and I eat it."
===
category: dad joke
joke: Why can't you give Elsa a balloon? Because she will let it go.
===
category: pun
joke: Did you hear about that new broom? It's sweeping the nation.
===
category: dark humor
joke: I have a few jokes about unemployed people, but none of them work.
===
category: one-liner
joke: I told my wife she was drawing her eyebrows too high. She looked surprised.
===
category: knock-knock
joke: Knock knock. Who’s there? Lettuce. Lettuce who? Lettuce in, it’s cold out here!
===
category: anti-joke
joke: Why did the chicken cross the road? To get to the other side.
===
category: riddle
joke: What has keys but can't open locks? A piano.
===
category: observational humor
joke: Have you ever noticed that anyone driving slower than you is an idiot, and anyone driving faster is a maniac?
===
category: wordplay
joke: I’m reading a book on anti-gravity. It’s impossible to put down.
`````
