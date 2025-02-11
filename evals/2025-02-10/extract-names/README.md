## extract-names ([json](./evals/2025-02-10/extract-names/report.json))

- 7 rules, 7/7 (100%) grounded
- 7 inverse rules
- 8 tests, 4 baseline tests
- 56 test results, 40/56 (71%) oks, 16/56 (28%) errs

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
|gpt\-4o\-mini\-2024\-07\-18|4|100%|100%|4|4|0|0|4|4|4|
|deepseek\-r1:7b|4|75%|75%|4|3|0|0|4|4|3|
|llama3\.3|4|100%|100%|4|4|0|0|4|4|4|
|phi4|4|0%|50%|4|0|0|0|4|4|0|
|gemma2:9b|4|100%|50%|4|4|0|0|4|4|4|
|qwen2\.5:3b|4|100%|75%|4|4|0|0|4|4|4|
|llama3\.2:1b|4|75%|0%|4|3|0|0|4|4|3|

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
|gpt\-4o\-mini\-2024\-07\-18|The output is an array of extracted model names from machine learning paper abstracts\.|In this paper, we introduce the Transformer model for language understanding\.|\["Transformer"\]|ok|
|gpt\-4o\-mini\-2024\-07\-18|The output is an array of extracted model names from machine learning paper abstracts\.|Our approach utilizes GPT\-3 for text generation and optimization\.|\["GPT\-3"\]|ok|
|gpt\-4o\-mini\-2024\-07\-18|The output is an array of extracted model names from machine learning paper abstracts\.|The study primarily focuses on LSTMs and their applications in time\-series forecasting\.|\["LSTMs"\]|ok|
|gpt\-4o\-mini\-2024\-07\-18|If there are model names extracted, each model name must be a string enclosed in double quotation marks\.|We propose a novel framework named SASRec for recommendation systems\.|\["SASRec"\]|ok|
|gpt\-4o\-mini\-2024\-07\-18||Abstract: In this paper, we introduce a new model, TransformerX, which significantly improves text classification tasks\. Additionally, we compare our results with other top models such as BERT and GPT\-3\.|\["TransformerX", "BERT", "GPT\-3"\]|ok|
|gpt\-4o\-mini\-2024\-07\-18||Abstract: Our study explores the efficiency of a hybrid approach combining Convolutional Neural Networks \(CNN\) and Long Short\-Term Memory \(LSTM\) networks for image recognition\.|\["Convolutional Neural Networks", "LSTM"\]|ok|
|gpt\-4o\-mini\-2024\-07\-18||Abstract: This research investigates the impact of various optimization techniques on model performance\. Experimental results are detailed without reference to a specific model name\.|\["NA"\]|ok|
|gpt\-4o\-mini\-2024\-07\-18||Abstract: We developed a novel architecture named AutoEncoder123, achieving state\-of\-the\-art results\. The performance of AutoEncoder123 is compared against previous models\.|\["AutoEncoder123"\]|ok|
|deepseek\-r1:7b|The output is an array of extracted model names from machine learning paper abstracts\.|In this paper, we introduce the Transformer model for language understanding\.|\[\["Transformer"\]\]|err|
|deepseek\-r1:7b|The output is an array of extracted model names from machine learning paper abstracts\.|Our approach utilizes GPT\-3 for text generation and optimization\.|\["GPT\-3"\]|ok|
|deepseek\-r1:7b|The output is an array of extracted model names from machine learning paper abstracts\.|The study primarily focuses on LSTMs and their applications in time\-series forecasting\.|\["LSTM"\]|ok|
|deepseek\-r1:7b|If there are model names extracted, each model name must be a string enclosed in double quotation marks\.|We propose a novel framework named SASRec for recommendation systems\.|\["SASRec"\]|ok|
|deepseek\-r1:7b||Abstract: In this paper, we introduce a new model, TransformerX, which significantly improves text classification tasks\. Additionally, we compare our results with other top models such as BERT and GPT\-3\.|\[\\"TransformerX\\", \\"BERT\\", \\"GPT\-3\\"\]|ok|
|deepseek\-r1:7b||Abstract: Our study explores the efficiency of a hybrid approach combining Convolutional Neural Networks \(CNN\) and Long Short\-Term Memory \(LSTM\) networks for image recognition\.|\["CNN", "LSTM"\]|ok|
|deepseek\-r1:7b||Abstract: This research investigates the impact of various optimization techniques on model performance\. Experimental results are detailed without reference to a specific model name\.|\["NA", "NA"\]|err|
|deepseek\-r1:7b||Abstract: We developed a novel architecture named AutoEncoder123, achieving state\-of\-the\-art results\. The performance of AutoEncoder123 is compared against previous models\.|\["AutoEncoder123"\]|ok|
|llama3\.3|The output is an array of extracted model names from machine learning paper abstracts\.|In this paper, we introduce the Transformer model for language understanding\.|\["Transformer"\]|ok|
|llama3\.3|The output is an array of extracted model names from machine learning paper abstracts\.|Our approach utilizes GPT\-3 for text generation and optimization\.|\["GPT\-3"\]|ok|
|llama3\.3|The output is an array of extracted model names from machine learning paper abstracts\.|The study primarily focuses on LSTMs and their applications in time\-series forecasting\.|\["LSTMs"\]|ok|
|llama3\.3|If there are model names extracted, each model name must be a string enclosed in double quotation marks\.|We propose a novel framework named SASRec for recommendation systems\.|\["SASRec"\]|ok|
|llama3\.3||Abstract: In this paper, we introduce a new model, TransformerX, which significantly improves text classification tasks\. Additionally, we compare our results with other top models such as BERT and GPT\-3\.|\["TransformerX", "BERT", "GPT\-3"\]|ok|
|llama3\.3||Abstract: Our study explores the efficiency of a hybrid approach combining Convolutional Neural Networks \(CNN\) and Long Short\-Term Memory \(LSTM\) networks for image recognition\.|\["Convolutional Neural Networks", "Long Short\-Term Memory"\]|ok|
|llama3\.3||Abstract: This research investigates the impact of various optimization techniques on model performance\. Experimental results are detailed without reference to a specific model name\.|\["NA"\]|ok|
|llama3\.3||Abstract: We developed a novel architecture named AutoEncoder123, achieving state\-of\-the\-art results\. The performance of AutoEncoder123 is compared against previous models\.|\["AutoEncoder123"\]|ok|
|phi4|The output is an array of extracted model names from machine learning paper abstracts\.|In this paper, we introduce the Transformer model for language understanding\.|Transformer<br><br>Transformersimilarity: "We introduce" indicates introduction of a new or specific entity/model\. "Model for language understanding" matches pattern commonly associated with machine learning models discussed in research papers\. The term "Transformer" itself is known to be widely used in the context of machine learning, particularly NLP \(Natural Language Processing\)\.|err|
|phi4|The output is an array of extracted model names from machine learning paper abstracts\.|Our approach utilizes GPT\-3 for text generation and optimization\.|GPT\-3|err|
|phi4|The output is an array of extracted model names from machine learning paper abstracts\.|The study primarily focuses on LSTMs and their applications in time\-series forecasting\.|LSTM  <br>\[“LSTM”\]|err|
|phi4|If there are model names extracted, each model name must be a string enclosed in double quotation marks\.|We propose a novel framework named SASRec for recommendation systems\.|SASRec  <br>\[Abrupt end of conversation since there's nothing else to discuss\.\]|err|
|phi4||Abstract: In this paper, we introduce a new model, TransformerX, which significantly improves text classification tasks\. Additionally, we compare our results with other top models such as BERT and GPT\-3\.|TransformerX  <br>BERT  <br>GPT\-3|err|
|phi4||Abstract: Our study explores the efficiency of a hybrid approach combining Convolutional Neural Networks \(CNN\) and Long Short\-Term Memory \(LSTM\) networks for image recognition\.|\["Convolutional Neural Networks", "Long Short\-Term Memory"\]|ok|
|phi4||Abstract: This research investigates the impact of various optimization techniques on model performance\. Experimental results are detailed without reference to a specific model name\.|NA|ok|
|phi4||Abstract: We developed a novel architecture named AutoEncoder123, achieving state\-of\-the\-art results\. The performance of AutoEncoder123 is compared against previous models\.|AutoEncoder123<br>NA|err|
|gemma2:9b|The output is an array of extracted model names from machine learning paper abstracts\.|In this paper, we introduce the Transformer model for language understanding\.|\["Transformer"\]|ok|
|gemma2:9b|The output is an array of extracted model names from machine learning paper abstracts\.|Our approach utilizes GPT\-3 for text generation and optimization\.|\["GPT\-3"\]|ok|
|gemma2:9b|The output is an array of extracted model names from machine learning paper abstracts\.|The study primarily focuses on LSTMs and their applications in time\-series forecasting\.|\["LSTM"\]|ok|
|gemma2:9b|If there are model names extracted, each model name must be a string enclosed in double quotation marks\.|We propose a novel framework named SASRec for recommendation systems\.|\["SASRec"\]|ok|
|gemma2:9b||Abstract: In this paper, we introduce a new model, TransformerX, which significantly improves text classification tasks\. Additionally, we compare our results with other top models such as BERT and GPT\-3\.|\["TransformerX", "BERT", "GPT\-3"\]|ok|
|gemma2:9b||Abstract: Our study explores the efficiency of a hybrid approach combining Convolutional Neural Networks \(CNN\) and Long Short\-Term Memory \(LSTM\) networks for image recognition\.|\["Convolutional Neural Networks", "Long Short\-Term Memory"\]|ok|
|gemma2:9b||Abstract: This research investigates the impact of various optimization techniques on model performance\. Experimental results are detailed without reference to a specific model name\.|NA <br>\[NA\]|err|
|gemma2:9b||Abstract: We developed a novel architecture named AutoEncoder123, achieving state\-of\-the\-art results\. The performance of AutoEncoder123 is compared against previous models\.|\["AutoEncoder123"\] <br>\["AutoEncoder123"\]|err|
|qwen2\.5:3b|The output is an array of extracted model names from machine learning paper abstracts\.|In this paper, we introduce the Transformer model for language understanding\.|\["Transformer"\]|ok|
|qwen2\.5:3b|The output is an array of extracted model names from machine learning paper abstracts\.|Our approach utilizes GPT\-3 for text generation and optimization\.|\["GPT\-3"\]|ok|
|qwen2\.5:3b|The output is an array of extracted model names from machine learning paper abstracts\.|The study primarily focuses on LSTMs and their applications in time\-series forecasting\.|\["LSTMs"\]|ok|
|qwen2\.5:3b|If there are model names extracted, each model name must be a string enclosed in double quotation marks\.|We propose a novel framework named SASRec for recommendation systems\.|\["SASRec"\]|ok|
|qwen2\.5:3b||Abstract: In this paper, we introduce a new model, TransformerX, which significantly improves text classification tasks\. Additionally, we compare our results with other top models such as BERT and GPT\-3\.|\["TransformerX"\]|ok|
|qwen2\.5:3b||Abstract: Our study explores the efficiency of a hybrid approach combining Convolutional Neural Networks \(CNN\) and Long Short\-Term Memory \(LSTM\) networks for image recognition\.|\["Convolutional Neural Networks", "Long Short\-Term Memory"\]|err|
|qwen2\.5:3b||Abstract: This research investigates the impact of various optimization techniques on model performance\. Experimental results are detailed without reference to a specific model name\.|\["NA"\]|ok|
|qwen2\.5:3b||Abstract: We developed a novel architecture named AutoEncoder123, achieving state\-of\-the\-art results\. The performance of AutoEncoder123 is compared against previous models\.|\["AutoEncoder123"\]|ok|
|llama3\.2:1b|The output is an array of extracted model names from machine learning paper abstracts\.|In this paper, we introduce the Transformer model for language understanding\.|NA NA|err|
|llama3\.2:1b|The output is an array of extracted model names from machine learning paper abstracts\.|Our approach utilizes GPT\-3 for text generation and optimization\.|NA|ok|
|llama3\.2:1b|The output is an array of extracted model names from machine learning paper abstracts\.|The study primarily focuses on LSTMs and their applications in time\-series forecasting\.|NA|ok|
|llama3\.2:1b|If there are model names extracted, each model name must be a string enclosed in double quotation marks\.|We propose a novel framework named SASRec for recommendation systems\.|NA|ok|
|llama3\.2:1b||Abstract: In this paper, we introduce a new model, TransformerX, which significantly improves text classification tasks\. Additionally, we compare our results with other top models such as BERT and GPT\-3\.|TransformerX<br>BERT<br>GPT\-3<br>NA|err|
|llama3\.2:1b||Abstract: Our study explores the efficiency of a hybrid approach combining Convolutional Neural Networks \(CNN\) and Long Short\-Term Memory \(LSTM\) networks for image recognition\.|NA<br>NA<br>NA<br>NA|err|
|llama3\.2:1b||Abstract: This research investigates the impact of various optimization techniques on model performance\. Experimental results are detailed without reference to a specific model name\.|NA NA<br>NA NA<br>NA NA|err|
|llama3\.2:1b||Abstract: We developed a novel architecture named AutoEncoder123, achieving state\-of\-the\-art results\. The performance of AutoEncoder123 is compared against previous models\.|AutoEncoder123<br>NA<br>AutoEncoder123 <br>AutoEncoder123|err|

### [intent.txt](./intent.txt)

`````txt
extract model names from machine learning paper abstracts
`````


### [input_spec.txt](./input_spec.txt)

`````txt
The input is a string containing the abstract of a machine learning paper.
The abstract must be written in natural language.
The abstract can include multiple sentences.
The abstract can contain technical terms and jargon related to machine learning.
The abstract can be in either formal or informal writing style.
The abstract must not contain any special control characters.
The abstract should not be empty.
The abstract can include numbers, symbols, and punctuation.
`````


### [rules.txt](./rules.txt)

`````txt
1: The output is an array of extracted model names from machine learning paper abstracts. 
2: If there are model names extracted, each model name must be a string enclosed in double quotation marks. 
3: If there are multiple extracted model names, they must be separated by commas within the array.
4: If no model names are found in the abstract or it is unclear, the output must be ["NA"]. 
5: The array must always be enclosed in square brackets. 
6: The elements inside the array should not contain any null values, spaces, or empty strings.
7: The output must be a single array regardless of the content of the abstract.
`````


### [rule_evals.csv](./rule_evals.csv)

|ruleid|rule|grounded|
|-|-|-|
|1|The output is an array of extracted model names from machine learning paper abstracts\.|ok|
|2|If there are model names extracted, each model name must be a string enclosed in double quotation marks\.|ok|
|3|If there are multiple extracted model names, they must be separated by commas within the array\.|ok|
|4|If no model names are found in the abstract or it is unclear, the output must be \["NA"\]\.|ok|
|5|The array must always be enclosed in square brackets\.|ok|
|6|The elements inside the array should not contain any null values, spaces, or empty strings\.|ok|
|7|The output must be a single array regardless of the content of the abstract\.|ok|

### [inverse_rules.txt](./inverse_rules.txt)

`````txt
8: The output is a single string constructed from model names found outside machine learning paper abstracts.
9: If there are model names found, each model name must be an integer without any quotation marks.
10: If there are multiple model names found, they must be separated by semicolons within the string.
11: If no model names are found or it is ambiguous, the output must be "N/A".
12: The string must always be enclosed in curly braces.
13: The elements inside the string should contain null values, spaces, and empty strings.
14: The output must be multiple arrays based on the content of the abstract.
`````


### [tests.csv](./tests.csv)

|testinput|expectedoutput|reasoning|
|-|-|-|
|In this paper, we introduce the Transformer model for language understanding\.|\["Transformer"\]|This abstract mentions a valid model name 'Transformer'\. The output should be an array with the model name\.|
|Our approach utilizes GPT\-3 for text generation and optimization\.|\["GPT\-3"\]|The abstract includes a model name 'GPT\-3', hence the software should return an array with this model name\.|
|The study primarily focuses on LSTMs and their applications in time\-series forecasting\.|\["LSTMs"\]|The model name 'LSTMs' is mentioned in the abstract\. The software should identify and return it in an array\.|
|We propose a novel framework named SASRec for recommendation systems\.|\["SASRec"\]|This test ensures that the model name 'SASRec' is enclosed in double quotes within the array\.|

### [test_evals.csv](./test_evals.csv)

|rule|model|input|coverage|validity|
|-|-|-|-|-|
|The output is an array of extracted model names from machine learning paper abstracts\.|gpt\-4o\-2024\-05\-13|In this paper, we introduce the Transformer model for language understanding\.|ok|ok|
|The output is an array of extracted model names from machine learning paper abstracts\.|gpt\-4o\-2024\-05\-13|Our approach utilizes GPT\-3 for text generation and optimization\.|ok|ok|
|The output is an array of extracted model names from machine learning paper abstracts\.|gpt\-4o\-2024\-05\-13|The study primarily focuses on LSTMs and their applications in time\-series forecasting\.|ok|ok|
|If there are model names extracted, each model name must be a string enclosed in double quotation marks\.|gpt\-4o\-2024\-05\-13|We propose a novel framework named SASRec for recommendation systems\.|ok|ok|

### [baseline_tests.txt](./baseline_tests.txt)

`````txt
Abstract: In this paper, we introduce a new model, TransformerX, which significantly improves text classification tasks. Additionally, we compare our results with other top models such as BERT and GPT-3.
===
Abstract: Our study explores the efficiency of a hybrid approach combining Convolutional Neural Networks (CNN) and Long Short-Term Memory (LSTM) networks for image recognition.
===
Abstract: This research investigates the impact of various optimization techniques on model performance. Experimental results are detailed without reference to a specific model name.
===
Abstract: We developed a novel architecture named AutoEncoder123, achieving state-of-the-art results. The performance of AutoEncoder123 is compared against previous models.
`````


### [rule_coverage.csv](./rule_coverage.csv)

|input|validity|validityText|baseline|coverage|
|-|-|-|-|-|
|Abstract: In this paper, we introduce a new model, TransformerX, which significantly improves text classification tasks\. Additionally, we compare our results with other top models such as BERT and GPT\-3\.|ok|The given input is a string containing the abstract of a machine learning paper\. It is written in natural language and consists of multiple sentences\. The abstract includes technical terms and jargon related to machine learning, such as "TransformerX," "text classification tasks," BERT," and "GPT\-3\." It contains numbers, symbols, and punctuation, and does not contain any special control characters\. The abstract is not empty\.<br><br>OK|1|\["TransformerX","BERT","GPT\-3"\]|
|Abstract: Our study explores the efficiency of a hybrid approach combining Convolutional Neural Networks \(CNN\) and Long Short\-Term Memory \(LSTM\) networks for image recognition\.|ok|This input does not contain any special control characters and consists of a single sentence written in natural language\. The sentence is related to machine learning, mentioning technical terms like "Convolutional Neural Networks \(CNN\)" and "Long Short\-Term Memory \(LSTM\) networks"\. The abstract is not empty, and it includes punctuation and symbols\.<br><br>OK|1|\["CNN","LSTM"\]|
|Abstract: This research investigates the impact of various optimization techniques on model performance\. Experimental results are detailed without reference to a specific model name\.|ok|The input is a textual abstract of a machine learning paper\. It does not contain any special control characters and is written in natural language\. It includes sentences and technical terms related to machine learning, and it is not empty\. <br><br>OK|1|\["NA"\]|
|Abstract: We developed a novel architecture named AutoEncoder123, achieving state\-of\-the\-art results\. The performance of AutoEncoder123 is compared against previous models\.|ok|No violation\.<br>OK|1|\["AutoEncoder123"\]|

### [baseline_test_evals.csv](./baseline_test_evals.csv)

|input|validity|
|-|-|
|Abstract: In this paper, we introduce a new model, TransformerX, which significantly improves text classification tasks\. Additionally, we compare our results with other top models such as BERT and GPT\-3\.|ok|
|Abstract: Our study explores the efficiency of a hybrid approach combining Convolutional Neural Networks \(CNN\) and Long Short\-Term Memory \(LSTM\) networks for image recognition\.|ok|
|Abstract: This research investigates the impact of various optimization techniques on model performance\. Experimental results are detailed without reference to a specific model name\.|ok|
|Abstract: We developed a novel architecture named AutoEncoder123, achieving state\-of\-the\-art results\. The performance of AutoEncoder123 is compared against previous models\.|ok|