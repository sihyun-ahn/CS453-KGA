## [extract-names](samples/prompt-guide/extract-names.prompty) ([json](./extract-names.report.json))


### [prompty](./extract-names.prompty)

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


### [rules.txt](./extract-names.rules.txt)

`````txt
The output must be an array of model names extracted from the machine learning paper abstract.
Each model name in the output array must be enclosed in double quotes.
The model names in the output array must be separated by commas.
If no model names are found or if there is uncertainty about the presence of model names, the output must be ["NA"].
The array must always be present, even if it contains only the value ["NA"].
`````


### [inverse_rules.txt](./extract-names.inverse_rules.txt)

`````txt
Do not include any model names in quotation marks within the array.
If no model names are found, list all possible names instead of 'NA'.
Ensure no model names are formatted as elements within the array.
`````


### [input_spec.txt](./extract-names.input_spec.txt)

`````txt
The input is a machine learning paper abstract.  
The input should be in textual format.
`````


### [baseline_tests.txt](./extract-names.baseline_tests.txt)

`````txt
Abstract: "In this study, we analyze the performance of the GPT-3 model in various natural language processing tasks."

===
Abstract: "We compared the results of the newly proposed AlphaGo Zero model with those of traditional machine learning models."

===
Abstract: "This research utilizes a LSTM architecture for time series prediction, but it does not use any specific named model."
`````


### [tests.csv](./extract-names.tests.csv)

`````csv
Rule ID, Test ID, Test Input, Expected Output, Reasoning
1, 1, "In this paper, we introduce a novel machine learning model called DeepNet that significantly improves accuracy.", ["DeepNet"], "The test checks if the software correctly extracts and formats the model name within the array."
1, 2, "We present a new algorithm, FastAI, which outperforms the current state-of-the-art.", ["FastAI"], "Ensures the software captures and formats the model name within the array correctly."
1, 3, "This study explores the architecture of Transformer models, specifically BERT and GPT-3.", ["Transformer", "BERT", "GPT-3"], "Validates extraction and formatting of multiple model names within the array."
2, 1, "This research explores the effects of various optimizers.", ["NA"], "Tests if the software returns 'NA' when no model names are present."
2, 2, "The impact of data augmentation techniques on model performance is discussed.", ["NA"], "Ensures the software correctly identifies the absence of model names and returns 'NA'."
2, 3, "An overview of reinforcement learning techniques is provided.", ["NA"], "Confirms the software returns 'NA' when no model names are detected."
3, 1, "Our model, EfficientNet, reduces computational cost while maintaining accuracy.", ["EfficientNet"], "Tests adherence to the correct array format with a single model name."
3, 2, "In this paper, we introduce models like VGG16 and ResNet50.", ["VGG16", "ResNet50"], "Checks if multiple model names are formatted correctly within the array."
3, 3, "We propose a system built upon the foundations of existing neural networks.", ["NA"], "Tests if the software returns 'NA' when no specific model names are mentioned."
`````
