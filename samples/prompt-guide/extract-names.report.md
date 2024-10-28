## extract-names ([json](./extract-names.report.json))


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


### [intent.txt](./extract-names.intent.txt)

`````txt
Extract model names from machine learning paper abstracts.
`````


### [input_spec.txt](./extract-names.input_spec.txt)

`````txt
The input is a string containing the abstract of a machine learning paper.  
The input must be provided in a structured format beginning with "Abstract: ".  
The content following "Abstract: " should consist of coherent text that resembles a typical academic abstract.
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


### [baseline_tests.txt](./extract-names.baseline_tests.txt)

`````txt
Abstract: "In this study, we analyze the performance of the GPT-3 model in various natural language processing tasks."

===
Abstract: "We compared the results of the newly proposed AlphaGo Zero model with those of traditional machine learning models."

===
Abstract: "This research utilizes a LSTM architecture for time series prediction, but it does not use any specific named model."
`````


### [tests.csv](./extract-names.tests.csv)

