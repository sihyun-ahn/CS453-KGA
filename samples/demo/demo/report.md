## demo ([json](./samples\demo\demo/report.json))

- 4 rules
- 4 inverse rules
- 48 tests, 24 baseline tests
- 48 test results, 5/48 (10%) oks, 16/48 (33%) errs

### Overview


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

|model|tests|tests compliant|baseline|baseline compliant|promptpex|promptpex compliant|promptpex positive compliant|
|-|-|-|-|-|-|-|-|
||48|5|24|3|24|2|2|

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
The input is a joke.  
The joke must be provided as a text string.  
There are no restrictions on the length of the joke.  
The joke can be in any language.
`````


### [baseline_tests.txt](./baseline_tests.txt)

`````txt
joke: "Why don't scientists trust atoms? Because they make up everything!"  
===  
joke: "I'm reading a book on anti-gravity. It's impossible to put down!"  
===  
joke: "What do you call fake spaghetti? An impasta."  
===  
joke: "I used to play piano by ear, but now I use my hands."  
===  
joke: "Why was the math book sad? Because it had too many problems."  
===  
joke: "Parallel lines have so much in common. It's a shame they'll never meet."  
===  
joke: "Why did the scarecrow win an award? Because he was outstanding in his field."  
===  
joke: "Why don't skeletons fight each other? They don't have the guts."  
===  
joke: "What do you call cheese that isn't yours? Nacho cheese."  
===  
joke: "What's orange and sounds like a parrot? A carrot."  
===  
joke: "Why can't you give Elsa a balloon? Because she will let it go."  
===  
joke: "What did the buffalo say to his son when he dropped him off at school? Bison."  
===  
joke: "Why did the bicycle fall over? It was two-tired."  
===  
joke: "I told my wife she was drawing her eyebrows too high. She looked surprised."  
===  
joke: "I used to be a baker, but I couldn't make enough dough."  
===  
joke: "Why did the tomato blush? Because it saw the salad dressing."  
===  
joke: "Why couldn’t the leopard play hide and seek? Because he was always spotted."  
===  
joke: "What's brown and sticky? A stick."  
===  
joke: ''  
===  
joke: "To the guy who invented zero: Thanks for nothing."  
===  
joke: "Why can't you hear a pterodactyl in the bathroom? Because the 'P' is silent."  
===  
joke: "Why don't programmers like nature? It has too many bugs."  
===  
joke: "I'm on a whiskey diet. I've lost three days already."  
===  
joke: "How do you organize a space party? You planet."  
`````


### [rules.txt](./rules.txt)

`````txt
1: The output must categorize the joke as either "funny" or "not funny."
2: The output must include exactly one of the two categories: "funny" or "not funny" and nothing else.
3: The output must not provide any explanation or justification for the categorization.
4: The output must directly respond to the user's input by categorizing the joke.
`````


### [inverse_rules.txt](./inverse_rules.txt)

`````txt
5: The output must not categorize the joke as either "funny" or "not funny."
6: The output must include categories other than "funny" or "not funny."
7: The output must provide an explanation or justification for the categorization.
8: The output must not directly respond to the user's input by categorizing the joke.
`````


### [tests.csv](./tests.csv)

|testinput|expectedoutput|reasoning|
|-|-|-|
|Why don't scientists trust atoms? Because they make up everything\!|funny|Tests rule adherence by ensuring the joke is categorized specifically as 'funny', in compliance with a simple pun\.|
|Why did the chicken cross the road? To get to the other side\.|not funny|Evaluates the categorization process by providing a classic, often considered bland joke, expecting 'not funny'\.|
|How do you organize a space party? You planet\.|funny|Checks if a standard science joke is correctly identified as 'funny', thereby affirming correct rule implementation\.|
|¿Qué hace una abeja en el gimnasio? Zum\-ba\.|funny|Verifies exclusivity in output by checking if only 'funny' is returned for a Spanish joke, without additional text\.|
|What do you call fake spaghetti? An im\-pasta\.|funny|Ensures nothing beyond 'funny' is provided when this pun\-heavy joke is processed, as per the rule\.|
|Why was the math book sad? Because it had too many problems\.|not funny|Tests rule compliance by confirming only 'not funny' is returned in response\.|
|How does a penguin build its house? Igloos it together\.|funny|Challenges the system by expecting no explanation accompanying the categorization of 'funny'\.|
|I told my wife she was drawing her eyebrows too high\. She looked surprised\.|funny|Ensures the joke is categorized as 'funny' without additional commentary\.|
|Two fish are in a tank\. One says, 'How do you drive this thing?'|funny|Tests for simple categorization with no explanation, maintaining rule adherence\.|
|Why don't skeletons fight each other? They don't have the guts\.|funny|Validates direct interaction by categorizing a common pun directly as 'funny'\.|
|Can February March? No, but April May\!|funny|Ensures the outcome is directly tied to the input, responding purely as 'funny'\.|
|I would avoid the sushi if I was you\. It’s a little fishy\.|not funny|Checks for a direct and precise response by expecting a 'not funny' categorization\.|
|Why did the scarecrow win an award? Because he was outstanding in his field\.|none|Evaluates whether the system refrains from categorizing, ensuring no 'funny' or 'not funny' is presented\.|
|Why did the man put his money in the blender? He wanted to make some liquid assets\.|none|Tests correctness by ensuring such relatable humor does not get categorized at all\.|
|Why are elevator jokes so good? They work on many levels\.|none|Checks system's adherence by expecting an absence of categorization\.|
|What do you call a boomerang that won't come back? A stick\.|mediocre|Challenges system to include a unique category, diverging from 'funny' or 'not funny'\.|
|Why can’t you give Elsa a balloon? Because she will let it go\.|unoriginal|Encourages additional categorization by prompting a label like 'unoriginal'\.|
|Why don’t some couples go to the gym? Because some relationships don’t work out\.|overused|Tests for supplemental outputs with an 'overused' categorization\.|
|Why did the golfer bring two pairs of pants? In case he got a hole in one\.|funny, explained: classic wordplay joke\.|Expects a justification for 'funny', testing the sufficiency of the explanation\.|
|Why was the big cat disqualified from the race? Because it was a cheetah\.|funny, explained: pun based on a double meaning\.|Anticipates a categorized and justified response explaining the humor\.|
|What happens to a frog’s car when it breaks down? It gets toad away\.|funny, explained: animal wordplay involving a frog and 'toad\.'|Verifies the presence of humor explanation alongside categorization\.|
|What do you call an alligator in a vest? An investigator\.|Message: Thanks for sharing\!|Assesses rule by ensuring the output does not categorize the joke\.|
|What do you call cheese that isn't yours? Nacho cheese\.|That's quite an interesting joke\!|Challenges software by expecting a non\-categorizing response\.|
|Why can’t your nose be 12 inches long? Because then it would be a foot\.|We hope you enjoyed the joke\.|Evaluates compliance by testing for a completely non\-categorizing, friendly response\.|

### [test_coverage.csv](./test_coverage.csv)

|id|promptid|model|ruleid|rule|input|coverage|validity|
|-|-|-|-|-|-|-|-|
|0ed7a41|ec01daf|gpt\-4o\-2024\-08\-06|1|The output must categorize the joke as either "funny" or "not funny\."|Why don't scientists trust atoms? Because they make up everything\!|funny|The input is a text string that presents a joke\. It follows a common joke structure with a setup \("Why don't scientists trust atoms?"\) and a punchline \("Because they make up everything\!"\)\. There are no restrictions on the language, length, or specific content of the joke, and this input fits within those parameters\.<br><br>OK|
|0f9d99f|ec01daf|gpt\-4o\-2024\-08\-06|1|The output must categorize the joke as either "funny" or "not funny\."|Why did the chicken cross the road? To get to the other side\.|funny|The input provided is a joke\. It asks a question and provides a punchline, which traditionally constitutes a joke format\. The input complies with the provided input specification which only requires the input to be a joke in the form of a text string, without any restrictions on length or language\. There are no elements in the input that suggest it is anything other than a joke\.<br><br>No violation\.<br>OK|
|6b5f257|ec01daf|gpt\-4o\-2024\-08\-06|1|The output must categorize the joke as either "funny" or "not funny\."|How do you organize a space party? You planet\.|funny|The input provided is a text string that contains a joke\. The joke is structured in a common format with a setup and a punchline\. The setup is "How do you organize a space party?" and the punchline is "You planet\." This meets the input specification, which requires the input to be a joke, given as a text string\. There are no length or language restrictions mentioned in the specification, and the input fits all the criteria outlined\.<br><br>No violation\.<br>OK|
|d444fdf|ec01daf|gpt\-4o\-2024\-08\-06|2|The output must include exactly one of the two categories: "funny" or "not funny" and nothing else\.|¿Qué hace una abeja en el gimnasio? Zum\-ba\.|funny|The input provided is "¿Qué hace una abeja en el gimnasio? Zum\-ba\." This input is a joke presented as a text string\. The joke is structured as a question and answer, where the question sets up a humorous expectation, and the punchline delivers the humor\. Additionally, the joke is in Spanish, which is allowed by the input specification as it states that the joke can be in any language\. The input complies with the requirement that the input must be a joke provided as a text string\. Therefore, considering all these factors, the input adheres to the input specifications\.<br><br>No violation\.<br>OK|
|675a34d|ec01daf|gpt\-4o\-2024\-08\-06|2|The output must include exactly one of the two categories: "funny" or "not funny" and nothing else\.|What do you call fake spaghetti? An im\-pasta\.|funny|The input consists of a text string that is structured as a joke\. The question "What do you call fake spaghetti?" sets up the premise, and "An im\-pasta\." serves as the punchline, which involves a play on words \("im\-pasta" sounding like "imposter"\)\. According to the input specification, the input is indeed a joke and is provided as a text string\. There are no restrictions on length or language, and thus, the input meets all the given criteria\.<br><br>No violation\.<br>OK|
|fabaf9a|ec01daf|gpt\-4o\-2024\-08\-06|2|The output must include exactly one of the two categories: "funny" or "not funny" and nothing else\.|Why was the math book sad? Because it had too many problems\.|funny|The provided input is a joke\. It includes a setup \("Why was the math book sad?"\) and a punchline \("Because it had too many problems\."\), forming a complete joke\. The length of the joke is not restricted by the input specification, and it is delivered in English, which is acceptable as the joke can be in any language\. There are no violations of the input specification\. <br><br>OK|
|7175ed9|ec01daf|gpt\-4o\-2024\-08\-06|3|The output must not provide any explanation or justification for the categorization\.|How does a penguin build its house? Igloos it together\.|funny|The input is a text string that presents a joke\. The joke involves a question with a witty answer, which fits the format of a joke\. There are no restrictions on the length or language, and the input complies with being a joke in English\. Therefore, it meets all the specifications\.<br><br>No violation\.<br>OK|
|c8d0ea9|ec01daf|gpt\-4o\-2024\-08\-06|3|The output must not provide any explanation or justification for the categorization\.|I told my wife she was drawing her eyebrows too high\. She looked surprised\.|funny|The input provided is a joke\. It is a text string and fits the structure of a joke, with a setup and a punchline involving a humorous misunderstanding\. There are no restrictions on the length of the joke, and it meets all aspects of the input specification\.<br><br>No violation\.<br>OK|
|17de5d0|ec01daf|gpt\-4o\-2024\-08\-06|3|The output must not provide any explanation or justification for the categorization\.|Two fish are in a tank\. One says, 'How do you drive this thing?'|funny|The input is a text string that is structured as a joke\. The setup involves two fish in a tank, followed by a punchline where one fish inquires humorously about driving the tank, implying a play on words between a water tank and a military tank\. Based on the input specification, there are no restrictions on the length, language, or specific type of joke\. Hence, this input meets all the criteria outlined in the specification\. <br><br>OK|
|ddcdada|ec01daf|gpt\-4o\-2024\-08\-06|4|The output must directly respond to the user's input by categorizing the joke\.|Why don't skeletons fight each other? They don't have the guts\.|funny|The input is presented as a joke\. It follows the typical structure of a joke with a setup and a punchline: "Why don't skeletons fight each other? They don't have the guts\." There are no restrictions on the length of the joke, and it is provided in text form\. The joke does not violate any part of the joke specification provided\. <br><br>No violation\.<br>OK|
|215920a|ec01daf|gpt\-4o\-2024\-08\-06|4|The output must directly respond to the user's input by categorizing the joke\.|Can February March? No, but April May\!|funny|The given input is a text string and it presents a joke, following a classic wordplay format\. The joke involves a pun using the names of months\. According to the input specification, the input should simply be a joke presented as a text string, without restrictions on its length or language\. The input satisfies these conditions as it is indeed a joke composed as text\. No elements of the input specification are violated\.<br><br>OK|
|cc6f2ab|ec01daf|gpt\-4o\-2024\-08\-06|4|The output must directly respond to the user's input by categorizing the joke\.|I would avoid the sushi if I was you\. It’s a little fishy\.|funny|The input provided is: "I would avoid the sushi if I was you\. It’s a little fishy\." <br><br>1\. \*\*Joke Identification\*\*: The input is a text string that presents a pun, which is a form of joke\. It plays on the word "fishy," which has a dual meaning: one as something suspicious and one relating to fish, which is a key component of sushi\.<br><br>2\. \*\*Specification Check\*\*: The input is clearly a joke because it uses wordplay to deliver humor\.<br><br>3\. \*\*Language Check\*\*: The joke is presented in English, which adheres to the specification that allows jokes in any language\.<br><br>Based on the reasoning above, the input complies with the input specification as it fulfills all the criteria of being a text string joke without any restrictions on length\. <br><br>OK|
|3907fe5|ec01daf|gpt\-4o\-2024\-08\-06|5|The output must not categorize the joke as either "funny" or "not funny\."|Why did the scarecrow win an award? Because he was outstanding in his field\.|funny|This input is a joke\. The format is a question followed by a punchline, which adheres to the expectation of what constitutes a joke\. It is also provided as a text string, and there are no length or language restrictions in the input specification\. Therefore, the input complies with the input specification\.<br><br>OK|
|6b6423c|ec01daf|gpt\-4o\-2024\-08\-06|5|The output must not categorize the joke as either "funny" or "not funny\."|Why did the man put his money in the blender? He wanted to make some liquid assets\.|funny|The input is a text string that presents a joke\. The content of the input is structured as a setup\-question \("Why did the man put his money in the blender?"\) followed by a punchline \("He wanted to make some liquid assets\."\), which is a common joke format\. There are no restrictions on the length of the joke or the language, and these aspects align with the input specification\.<br><br>No violation\.<br>OK|
|67c6406|ec01daf|gpt\-4o\-2024\-08\-06|5|The output must not categorize the joke as either "funny" or "not funny\."|Why are elevator jokes so good? They work on many levels\.|funny|The input provided is a joke\. It is presented as a text string and clearly follows a joke format with a setup \("Why are elevator jokes so good?"\) and punchline \("They work on many levels\."\)\. There are no restrictions on the length or language used for the joke, and this input meets the specification as it is in English and has an appropriate length for a joke\.<br><br>No violation\.<br>OK|
|6e6030e|ec01daf|gpt\-4o\-2024\-08\-06|6|The output must include categories other than "funny" or "not funny\."|What do you call a boomerang that won't come back? A stick\.|funny|The input provided, "What do you call a boomerang that won't come back? A stick\." is indeed a joke\. According to the input specification, the input must be a joke presented as a text string\. The input meets these criteria as it is a text string and clearly a joke due to its structure, which includes a setup and a punchline\. There are no additional restrictions on the joke's length or language, and there is nothing in the input that violates the given specification\.<br><br>No violation\.<br>OK|
|50c0677|ec01daf|gpt\-4o\-2024\-08\-06|6|The output must include categories other than "funny" or "not funny\."|Why can’t you give Elsa a balloon? Because she will let it go\.|funny|The input provided is a text string that delivers a joke\. The input does not specify any restrictions on the length or language of the joke, and since the input is clearly attempting to deliver humor based on a play on words from the song "Let It Go" in the context of the character Elsa, it meets the specification of being a joke\. <br><br>No violation\.<br>OK|
|c926bea|ec01daf|gpt\-4o\-2024\-08\-06|6|The output must include categories other than "funny" or "not funny\."|Why don’t some couples go to the gym? Because some relationships don’t work out\.|funny|The input provided is a text string that presents a joke\. The structure involves a setup question followed by a punchline, which fits the common format of a joke\. The content does not violate any requirements of the input specification, and it doesn't include harmful, hateful, or otherwise prohibited material\. There are no length restrictions specified, so this joke also complies in that regard\. Based on these considerations, the input follows the specification\.<br><br>No violation\.<br>OK|
|d1eeb19|ec01daf|gpt\-4o\-2024\-08\-06|7|The output must provide an explanation or justification for the categorization\.|Why did the golfer bring two pairs of pants? In case he got a hole in one\.|funny|The input provided is a text string that presents a joke\. The joke consists of a setup \("Why did the golfer bring two pairs of pants?"\) and a punchline \("In case he got a hole in one\."\)\. According to the input specification, the input must be a joke presented as a text string, with no restrictions on the length or language of the joke\.<br><br>In this case, the input directly complies with the specification as it is indeed a joke presented as a text string in English\. There are no violations of the input specification\.<br><br>OK|
|281d0ca|ec01daf|gpt\-4o\-2024\-08\-06|7|The output must provide an explanation or justification for the categorization\.|Why was the big cat disqualified from the race? Because it was a cheetah\.|funny|The input provided is a joke\. It is given as a text string and fits within the context of a standard joke structure, having a setup \("Why was the big cat disqualified from the race?"\) and a punchline \("Because it was a cheetah\."\)\. There are no restrictions on the length or language of the joke, and the input provided adheres to these specifications\. <br><br>No violation\.<br>OK|
|e15340b|ec01daf|gpt\-4o\-2024\-08\-06|7|The output must provide an explanation or justification for the categorization\.|What happens to a frog’s car when it breaks down? It gets toad away\.|funny|The given input is a joke\. It poses a question and delivers a punchline, which is a common structure for jokes\. The content is text\-based and adheres to the input specification's requirement for the input to be a joke provided as a text string\. There are no length restrictions or language limitations in the specification that are violated by this input\. Therefore, there are no violations of the input specification\.<br><br>OK|
|0bdaa2d|ec01daf|gpt\-4o\-2024\-08\-06|8|The output must not directly respond to the user's input by categorizing the joke\.|What do you call an alligator in a vest? An investigator\.|funny|The input is a text string presenting a joke\. There are no restrictions on the length or language of the joke\. Therefore, this input complies with the input specification, which simply requires the input to be a joke in text form\. <br><br>No violation\.<br>OK|
|a7032af|ec01daf|gpt\-4o\-2024\-08\-06|8|The output must not directly respond to the user's input by categorizing the joke\.|What do you call cheese that isn't yours? Nacho cheese\.|funny|The input provided is a text string that presents a joke: "What do you call cheese that isn't yours? Nacho cheese\." This complies with the input specification, which requires the input to be a joke provided in a text string format\. The joke does not have any restrictions on length and can be in any language\. Therefore, the input satisfies all the specified requirements\.<br><br>No violation\.<br>OK|
|da01850|ec01daf|gpt\-4o\-2024\-08\-06|8|The output must not directly respond to the user's input by categorizing the joke\.|Why can’t your nose be 12 inches long? Because then it would be a foot\.|funny|The input provided is a joke\. It is presented in a text string format, fulfilling the requirement for the input to be a joke\. According to the input specification, there are no restrictions on the length of the joke, and it can be in any language\. The joke uses a play on words involving the units of measurement \(inches and foot\) to create humor, which aligns with the typical structure of a joke\. There are no elements in the input that violate the input specifications\. Therefore, based on the evaluation, the input complies with the specifications\.<br><br>No violation\.<br>OK|

### [test_results.csv](./test_results.csv)

|rule|model|input|output|compliance|
|-|-|-|-|-|
|The output must categorize the joke as either "funny" or "not funny\."||Why don't scientists trust atoms? Because they make up everything\!||err|
|The output must categorize the joke as either "funny" or "not funny\."||Why did the chicken cross the road? To get to the other side\.|||
|The output must categorize the joke as either "funny" or "not funny\."||How do you organize a space party? You planet\.|||
|The output must include exactly one of the two categories: "funny" or "not funny" and nothing else\.||¿Qué hace una abeja en el gimnasio? Zum\-ba\.||ok|
|The output must include exactly one of the two categories: "funny" or "not funny" and nothing else\.||What do you call fake spaghetti? An im\-pasta\.|||
|The output must include exactly one of the two categories: "funny" or "not funny" and nothing else\.||Why was the math book sad? Because it had too many problems\.|||
|The output must not provide any explanation or justification for the categorization\.||How does a penguin build its house? Igloos it together\.|||
|The output must not provide any explanation or justification for the categorization\.||I told my wife she was drawing her eyebrows too high\. She looked surprised\.||err|
|The output must not provide any explanation or justification for the categorization\.||Two fish are in a tank\. One says, 'How do you drive this thing?'||err|
|The output must directly respond to the user's input by categorizing the joke\.||Why don't skeletons fight each other? They don't have the guts\.|||
|The output must directly respond to the user's input by categorizing the joke\.||Can February March? No, but April May\!||err|
|The output must directly respond to the user's input by categorizing the joke\.||I would avoid the sushi if I was you\. It’s a little fishy\.|||
|The output must not categorize the joke as either "funny" or "not funny\."||Why did the scarecrow win an award? Because he was outstanding in his field\.|||
|The output must not categorize the joke as either "funny" or "not funny\."||Why did the man put his money in the blender? He wanted to make some liquid assets\.|||
|The output must not categorize the joke as either "funny" or "not funny\."||Why are elevator jokes so good? They work on many levels\.||err|
|The output must include categories other than "funny" or "not funny\."||What do you call a boomerang that won't come back? A stick\.|||
|The output must include categories other than "funny" or "not funny\."||Why can’t you give Elsa a balloon? Because she will let it go\.|||
|The output must include categories other than "funny" or "not funny\."||Why don’t some couples go to the gym? Because some relationships don’t work out\.||err|
|The output must provide an explanation or justification for the categorization\.||Why did the golfer bring two pairs of pants? In case he got a hole in one\.|||
|The output must provide an explanation or justification for the categorization\.||Why was the big cat disqualified from the race? Because it was a cheetah\.|||
|The output must provide an explanation or justification for the categorization\.||What happens to a frog’s car when it breaks down? It gets toad away\.||ok|
|The output must not directly respond to the user's input by categorizing the joke\.||What do you call an alligator in a vest? An investigator\.||err|
|The output must not directly respond to the user's input by categorizing the joke\.||What do you call cheese that isn't yours? Nacho cheese\.||err|
|The output must not directly respond to the user's input by categorizing the joke\.||Why can’t your nose be 12 inches long? Because then it would be a foot\.||err|
|||joke: "Why don't scientists trust atoms? Because they make up everything\!"||ok|
|||joke: "I'm reading a book on anti\-gravity\. It's impossible to put down\!"|||
|||joke: "What do you call fake spaghetti? An impasta\."|||
|||joke: "I used to play piano by ear, but now I use my hands\."||err|
|||joke: "Why was the math book sad? Because it had too many problems\."|||
|||joke: "Parallel lines have so much in common\. It's a shame they'll never meet\."|||
|||joke: "Why did the scarecrow win an award? Because he was outstanding in his field\."||err|
|||joke: "Why don't skeletons fight each other? They don't have the guts\."||ok|
|||joke: "What do you call cheese that isn't yours? Nacho cheese\."||ok|
|||joke: "What's orange and sounds like a parrot? A carrot\."|||
|||joke: "Why can't you give Elsa a balloon? Because she will let it go\."|||
|||joke: "What did the buffalo say to his son when he dropped him off at school? Bison\."|||
|||joke: "Why did the bicycle fall over? It was two\-tired\."|||
|||joke: "I told my wife she was drawing her eyebrows too high\. She looked surprised\."|||
|||joke: "I used to be a baker, but I couldn't make enough dough\."|||
|||joke: "Why did the tomato blush? Because it saw the salad dressing\."|||
|||joke: "Why couldn’t the leopard play hide and seek? Because he was always spotted\."||err|
|||joke: "What's brown and sticky? A stick\."||err|
|||joke: ''||err|
|||joke: "To the guy who invented zero: Thanks for nothing\."|||
|||joke: "Why can't you hear a pterodactyl in the bathroom? Because the 'P' is silent\."|||
|||joke: "Why don't programmers like nature? It has too many bugs\."||err|
|||joke: "I'm on a whiskey diet\. I've lost three days already\."|||
|||joke: "How do you organize a space party? You planet\."||err|