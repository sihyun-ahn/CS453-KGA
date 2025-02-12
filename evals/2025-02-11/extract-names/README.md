## extract-names ([json](./evals/2025-02-11/extract-names/report.json))

- 6 rules, 6/6 (100%) grounded
- 6 inverse rules
- 2 tests, 1 baseline tests
- 12 test results, 8/12 (66%) oks, 4/12 (33%) errs

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


### [test_results.csv](./test_results.csv)

|model|tests|tests compliant|baseline compliant|tests positive|tests positive compliant|tests negative|tests negative compliant|baseline|tests valid|tests valid compliant|
|-|-|-|-|-|-|-|-|-|-|-|
|deepseek\-r1:32b|0|NaN%|100%|0|0|0|0|2|0|0|
|llama3\.3|0|NaN%|100%|0|0|0|0|2|0|0|
|phi4|0|NaN%|50%|0|0|0|0|2|0|0|
|gemma2:9b|0|NaN%|50%|0|0|0|0|2|0|0|
|qwen2\.5:3b|0|NaN%|50%|0|0|0|0|2|0|0|
|llama3\.2:1b|0|NaN%|50%|0|0|0|0|2|0|0|

### [extract-names.prompty](./extract-names.prompty)

`````md
---
name: "Extract Names from Text"
description: "Extract names from an input text"
source: Prompt examples from the website (slightly modified)
url: https://www.promptingguide.ai/prompts/information-extraction/extract-models
sample:
    input: "The model uses a transformer architecture with a BERT base model."
inputs:
    input:
        type: "string"
---
system:
Your task is to extract model names from machine learning paper abstracts. Your response is an array of the model names in the format [\"model_name\"]. If you don't find model names in the abstract or you are not sure, return [\"NA\"]
user:
Abstract: {{input}}
`````


### [test_results.csv](./test_results.csv)

|model|rule|input|output|compliance|
|-|-|-|-|-|
|deepseek\-r1:32b|||\["NA"\]|ok|
|deepseek\-r1:32b||Abstract: A deep learning approach for natural language processing tasks using transformer\-based architectures like BERT and RoBERTa to achieve state\-of\-the\-art results|\["BERT", "RoBERTa"\]|ok|
|llama3\.3|||NA|ok|
|llama3\.3||Abstract: A deep learning approach for natural language processing tasks using transformer\-based architectures like BERT and RoBERTa to achieve state\-of\-the\-art results|\["BERT", "RoBERTa"\]|ok|
|phi4|||NA|ok|
|phi4||Abstract: A deep learning approach for natural language processing tasks using transformer\-based architectures like BERT and RoBERTa to achieve state\-of\-the\-art results|BERT  <br>RoBERTa  <br><br>\[\]|err|
|gemma2:9b|||Please provide the abstract\.|err|
|gemma2:9b||Abstract: A deep learning approach for natural language processing tasks using transformer\-based architectures like BERT and RoBERTa to achieve state\-of\-the\-art results|\["BERT", "RoBERTa"\]|ok|
|qwen2\.5:3b|||NA|err|
|qwen2\.5:3b||Abstract: A deep learning approach for natural language processing tasks using transformer\-based architectures like BERT and RoBERTa to achieve state\-of\-the\-art results|\["BERT", "RoBERTa"\]|ok|
|llama3\.2:1b|||I can't fulfill this request\.|err|
|llama3\.2:1b||Abstract: A deep learning approach for natural language processing tasks using transformer\-based architectures like BERT and RoBERTa to achieve state\-of\-the\-art results|\[NA\]|ok|

### [intent.txt](./intent.txt)

`````txt
extract model names from text
`````


### [input_spec.txt](./input_spec.txt)

`````txt
The input to the chatbot is a machine learning paper abstract which can be a short text or a long paragraph.
The input can contain any combination of letters, numbers, and special characters that are typically found in academic writing.
The length of the input can vary from a few words to several hundred words.
The input may include mathematical formulas, algorithm descriptions, or technical terms related to machine learning. 
The chatbot should be able to accept abstracts with varying levels of complexity and detail.
`````


### [rules.txt](./rules.txt)

`````txt
1: The output must be a JSON array containing string values, where each string value is enclosed in double quotes.
2: The output array must contain at least one element, which can be either a model name or the string "NA".
3: If the input abstract contains one or more model names, the output array must contain all of the model names found in the abstract as separate elements.
4: If no model names are found in the input abstract, or if it is unclear what the model names are, the output array must contain a single element with the value "NA".
5: Each model name in the output array must be a string that represents the actual name of a machine learning model mentioned in the abstract.
6: The output array must not contain any duplicate model names.
`````


### [rule_evals.csv](./rule_evals.csv)

|ruleid|rule|grounded|
|-|-|-|
|1|The output must be a JSON array containing string values, where each string value is enclosed in double quotes\.|ok|
|2|The output array must contain at least one element, which can be either a model name or the string "NA"\.|ok|
|3|If the input abstract contains one or more model names, the output array must contain all of the model names found in the abstract as separate elements\.|ok|
|4|If no model names are found in the input abstract, or if it is unclear what the model names are, the output array must contain a single element with the value "NA"\.|ok|
|5|Each model name in the output array must be a string that represents the actual name of a machine learning model mentioned in the abstract\.|ok|
|6|The output array must not contain any duplicate model names\.|ok|

### [inverse_rules.txt](./inverse_rules.txt)

`````txt
7: The output is not a JSON array containing string values, where each string value is enclosed in single quotes.
8: The output array contains no elements or only empty strings.
9: If the input abstract does not contain any model names, the output array contains multiple elements with different values.
10: If all model names are found in the abstract, the output array omits some of them and contains "NA" instead.
11: Each model name in the output array is a numerical value that represents a machine learning model mentioned in the abstract.
12: The output array contains duplicate model names.
`````


### [tests.csv](./tests.csv)

|testinput|expectedoutput|reasoning|
|-|-|-|
||||

### [test_evals.csv](./test_evals.csv)

|rule|model|input|coverage|validity|
|-|-|-|-|-|
||llama3\.3||ok|err|

### [baseline_tests.txt](./baseline_tests.txt)

`````txt
Abstract: A deep learning approach for natural language processing tasks using transformer-based architectures like BERT and RoBERTa to achieve state-of-the-art results
`````


### [rule_coverage.csv](./rule_coverage.csv)

|input|validity|validityText|baseline|coverage|
|-|-|-|-|-|
|Abstract: A deep learning approach for natural language processing tasks using transformer\-based architectures like BERT and RoBERTa to achieve state\-of\-the\-art results|ok|The given input is a machine learning paper abstract that contains technical terms related to the field, such as "deep learning", "transformer\-based architectures", "BERT", and "RoBERTa"\. The input specification states that the chatbot should be able to accept abstracts with varying levels of complexity and detail, and that it can contain any combination of letters, numbers, and special characters typically found in academic writing\. Since the input is a short text containing terms related to machine learning and natural language processing, and does not include any non\-standard characters or formatting that would be outside the scope of typical academic writing, I conclude that there are no violations of the input specification\.<br><br>OK|1|\["BERT", "RoBERTa"\]|

### [baseline_test_evals.csv](./baseline_test_evals.csv)

|input|validity|
|-|-|
|Abstract: A deep learning approach for natural language processing tasks using transformer\-based architectures like BERT and RoBERTa to achieve state\-of\-the\-art results|ok|