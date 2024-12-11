## extract-names ([json](./evals\v8\extract-names/report.json))

- 11 rules
- 11 inverse rules
- 26 tests, 13 baseline tests

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


### [intent.txt](./intent.txt)

`````txt
extract model names from machine learning paper abstracts
`````


### [input_spec.txt](./input_spec.txt)

`````txt
The input is a string representing the abstract of a machine learning paper.  
The input must contain text that is typically found in academic paper abstracts.  
The input may include model names, technical terms, and references to methods or techniques.  
The length of the input is not explicitly restricted, but it should be within a reasonable range typical for abstracts.
`````


### [rules.txt](./rules.txt)

`````txt
1: The response must be an array formatted with square brackets surrounding the elements, e.g., ["element1", "element2"].
2: Each model name in the array should be a distinct string enclosed within double quotes.
3: The array must not contain any additional elements or data that are not explicitly identified as model names in the abstract.
4: If no model names are identified in the abstract, the response must be the array ["NA"].
5: If there is any uncertainty about whether a string is a model name, the response must be ["NA"].
6: The response array must contain no more than one element with the value "NA".
7: The response must not contain any null, undefined, or empty string elements.
8: The response must not contain any characters or punctuation that are not part of the correct array formatting or model names.
9: Whitespace should not be included outside of the square brackets in the response.
10: The response must not include an explanation, commentary, or any text other than the required array of model names.
11: There must not be any trailing commas or extra punctuation inside the square brackets.
`````


### [inverse_rules.txt](./inverse_rules.txt)

`````txt
12: The response should be formatted as a dictionary, not an array.
13: Each model name should be duplicated multiple times in the response.
14: The response must include additional elements or data not related to model names.
15: If no model names are identified in the abstract, the response must be an empty array.
16: If there is any uncertainty, the response should include an unsure explanation.
17: There must be more than one "NA" element if any exist at all.
18: The response must contain several empty string elements.
19: The response should be filled with various non-essential characters and extra punctuation.
20: Whitespace should be copious both inside and outside of the square brackets.
21: The response must be heavily annotated with explanations and commentary.
22: There should be multiple trailing commas and excessive punctuation inside the square brackets.
`````


### [tests.csv](./tests.csv)



### [test_evals.csv](./test_evals.csv)

|rule|model|input|coverage|validity|
|-|-|-|-|-|
|The response must be an array formatted with square brackets surrounding the elements, e\.g\., \["element1", "element2"\]\.|gpt\-4o\-2024\-08\-06|We introduce a novel machine learning architecture, Transformer\-X, that\.\.\.|ok|ok|
|The response must be an array formatted with square brackets surrounding the elements, e\.g\., \["element1", "element2"\]\.|gpt\-4o\-2024\-08\-06|This paper presents DeepVision and RapidNet, two advanced models for\.\.\.|ok|ok|
|The response must be an array formatted with square brackets surrounding the elements, e\.g\., \["element1", "element2"\]\.|gpt\-4o\-2024\-08\-06|Our study evaluates models like NeuralWave, which are critical\.\.\.|ok|ok|
|Each model name in the array should be a distinct string enclosed within double quotes\.|gpt\-4o\-2024\-08\-06|By employing AlphaGo Zero, this technique surpasses previous methods\.\.\.|ok|err|
|Each model name in the array should be a distinct string enclosed within double quotes\.|gpt\-4o\-2024\-08\-06|Different architectures such as BERT and GPT\-3 enable superior performance\.\.\.|ok|ok|
|Each model name in the array should be a distinct string enclosed within double quotes\.|gpt\-4o\-2024\-08\-06|The technology leverages ResNet; it innovates over earlier models\.\.\.|ok|err|
|The array must not contain any additional elements or data that are not explicitly identified as model names in the abstract\.|gpt\-4o\-2024\-08\-06|Analyzing methods like GradientBoost but without naming it\.\.\.|ok|err|
|The array must not contain any additional elements or data that are not explicitly identified as model names in the abstract\.|gpt\-4o\-2024\-08\-06|Our approach uses no specific name but relates concepts\.\.\.|ok|err|
|The array must not contain any additional elements or data that are not explicitly identified as model names in the abstract\.|gpt\-4o\-2024\-08\-06|Implementations are influenced by theoretical approaches rather than\.\.\.|ok|err|
|If no model names are identified in the abstract, the response must be the array \["NA"\]\.|gpt\-4o\-2024\-08\-06|Discussion involves solely data preprocessing techniques rather than model specifics\.|ok|err|
|If no model names are identified in the abstract, the response must be the array \["NA"\]\.|gpt\-4o\-2024\-08\-06|While effective, the approach doesn't label any model explicitly\.|ok|err|
|If no model names are identified in the abstract, the response must be the array \["NA"\]\.|gpt\-4o\-2024\-08\-06|The text focuses on broader applications, not individual model mention\.|ok|err|
|If there is any uncertainty about whether a string is a model name, the response must be \["NA"\]\.|gpt\-4o\-2024\-08\-06|With indirect references, the model name is ambiguous\.\.\.|ok|err|

### [baseline_tests.txt](./baseline_tests.txt)

`````txt
Abstract: In recent years, the development of deep learning algorithms has surged, leading to the introduction of models like BERT and GPT-3 that have revolutionized natural language processing tasks.
===
Abstract: This study introduces a novel model, designed specifically for image segmentation, called SegNet, which significantly outperforms traditional methods.
===
Abstract: Our experimental results demonstrate the superiority of the new architecture, named ResNet, in enhancing the accuracy of visual recognition tasks.
===
Abstract: We propose a transformer-based approach, ContactAttention, which significantly advances state-of-the-art performance in protein folding prediction.
===
Abstract: The research presents RecursiveGAN for generating high-resolution satellite images, showcasing improved fidelity over conventional GANs.
===
Abstract: Here, we explore the application of a model dubbed OptiPath for optimizing traffic routing in urban settings, reducing congestion by up to 30%.
===
Abstract: Compared to existing models, including EfficientNet and MobileNet, our proposed network, SimpNet, achieves higher efficiency with fewer parameters.
===
Abstract: Introducing a model called PhraseFinder that enhances indexing and retrieval capabilities in large-scale databases compared to standard techniques.
===
Abstract: In our investigation, we adapt the classic SVM model to develop what we call SVM+, tailored for text classification under constrained resources.
===
Abstract: For this research, don't find the mention of a particular model name but emphasis on theoretical development for improving ML frameworks.
===
Abstract: We provide extensive benchmarks using models like InceptionV3 and ResNext, showcasing their performance across diverse datasets.
===
Abstract: Our project focuses on enhancing predictive maintenance through a model titled MaintAI, demonstrating increased robustness in diagnosis.
===
Abstract: Although our method builds upon known architectures, there is no specific model name introduced in this analysis for our algorithms.
`````
