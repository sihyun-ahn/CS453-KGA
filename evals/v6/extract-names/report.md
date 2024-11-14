## extract-names ([json](./evals\v6\extract-names/report.json))

- 7 rules
- 7 inverse rules
- 85 tests, 43 baseline tests

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
Extract model names from machine learning paper abstracts.
`````


### [input_spec.txt](./input_spec.txt)

`````txt
The input is a text section extracted from a machine learning paper abstract.
The input should contain sentences and phrases that describe models, methods, or techniques used in machine learning research.
The input can include technical terms, acronyms, and specific model names relevant to machine learning.
The input can be of any length, but it should contain enough content to potentially include model names.
The input should not include non-textual elements such as tables or figures descriptions.
`````


### [rules.txt](./rules.txt)

`````txt
1: The output must be an array.  
2: The array must contain strings representing model names extracted from the machine learning paper abstract.  
3: If there are model names found, each model name must be a string element within the array.  
4: If no model names are found or if it is not clear if there are model names, the array must contain the single string "NA".  
5: The array must be formatted with double quotes around each element.  
6: The response must be in a standardized format regardless of the content of the abstract provided.  
7: The array must always be returned as the output even if no valid model names are found.
`````


### [inverse_rules.txt](./inverse_rules.txt)

`````txt
8: The output must not be an array.  
9: The array must exclude strings representing model names extracted from the machine learning paper abstract.  
10: If there are model names found, each model name must not be a string element within the array.  
11: If no model names are found or if it is not clear if there are model names, the array must not contain the single string "NA".  
12: The array must be formatted without double quotes around each element.  
13: The response must vary based on the content of the abstract provided.  
14: The array must never be returned as the output even if valid model names are found.
`````


### [tests.csv](./tests.csv)



### [test_evals.csv](./test_evals.csv)

|rule|model|input|coverage|validity|
|-|-|-|-|-|
|The output must be an array\.|gpt\-4o\-2024\-08\-06|In this study, we introduce a novel algorithm called Fast\-RCNN and demonstrate its applicability in object detection\.|\["Fast\-RCNN"\]|ok|
|The output must be an array\.|gpt\-4o\-2024\-08\-06|The model proposed, BERT, has shown significant improvements in natural language processing tasks\.|Output:<br>\["BERT"\]|ok|
|The output must be an array\.|gpt\-4o\-2024\-08\-06|A comprehensive survey on clustering techniques, but no specific model names mentioned\.|\["NA"\]|err|
|The array must contain strings representing model names extracted from the machine learning paper abstract\.|gpt\-4o\-2024\-08\-06|Deep learning models such as ResNet and VGG play a critical role in image classification\.|Output:<br>\["ResNet", "VGG"\]|ok|
|The array must contain strings representing model names extracted from the machine learning paper abstract\.|gpt\-4o\-2024\-08\-06|Advancements have been made using LSTM and GRU, highlighting their impact\.|Output:<br>\["LSTM", "GRU"\]|ok|
|The array must contain strings representing model names extracted from the machine learning paper abstract\.|gpt\-4o\-2024\-08\-06|We focus on the application of traditional methods without explicitly naming models\.|\["NA"\]|err|
|If there are model names found, each model name must be a string element within the array\.|gpt\-4o\-2024\-08\-06|The Spacy NLP framework exhibits substantial improvements over previous techniques\.|Output:<br>\["NA"\]|ok|
|If there are model names found, each model name must be a string element within the array\.|gpt\-4o\-2024\-08\-06|An introduction of a variant named Transformer improves upon traditional methods significantly\.|\["Transformer"\]|ok|
|If there are model names found, each model name must be a string element within the array\.|gpt\-4o\-2024\-08\-06|Discussion on various techniques including random forests and k\-nearest neighbor without model\-naming specificity\.|Output:<br>\["NA"\]|ok|
|If no model names are found or if it is not clear if there are model names, the array must contain the single string "NA"\.|gpt\-4o\-2024\-08\-06|While discussing neural networks, no particular model names were specified\.|\["NA"\]|ok|
|If no model names are found or if it is not clear if there are model names, the array must contain the single string "NA"\.|gpt\-4o\-2024\-08\-06|Our analysis shows improvements, yet novel terminologies like QuickNet were notably absent\.|\["QuickNet"\]|err|
|If no model names are found or if it is not clear if there are model names, the array must contain the single string "NA"\.|gpt\-4o\-2024\-08\-06|Machine learning is evolving, however, the tools and models employed remain unnamed\.|Output:<br>\["NA"\]|err|
|The array must be formatted with double quotes around each element\.|gpt\-4o\-2024\-08\-06|The neural architecture, LeNet, stands out in digit classification tasks\.|\["LeNet"\]|ok|
|The array must be formatted with double quotes around each element\.|gpt\-4o\-2024\-08\-06|Frameworks such as YOLO have revolutionized real\-time object detection\.|Output:<br>\["YOLO"\]|ok|
|The array must be formatted with double quotes around each element\.|gpt\-4o\-2024\-08\-06|Techniques developed further classify without naming models directly\.|\["NA"\]|err|
|The response must be in a standardized format regardless of the content of the abstract provided\.|gpt\-4o\-2024\-08\-06|Enhancements on AlexNet have brought about a new wave in image processing\.|\["AlexNet"\]|ok|
|The response must be in a standardized format regardless of the content of the abstract provided\.|gpt\-4o\-2024\-08\-06|GPT\-3 is among the state\-of\-the\-art models known for language generation\.|\["GPT\-3"\]|ok|
|The response must be in a standardized format regardless of the content of the abstract provided\.|gpt\-4o\-2024\-08\-06|Without focusing on specific models, we survey ecosystem impacts\.|Output:<br>\["NA"\]|err|
|The array must always be returned as the output even if no valid model names are found\.|gpt\-4o\-2024\-08\-06|The method incorporates SVM but doesn't specify further models in text\.|\["SVM"\]|ok|
|The array must always be returned as the output even if no valid model names are found\.|gpt\-4o\-2024\-08\-06|Bayesian networks were illustrated without explicit model name diversity\.|Output:<br>\["NA"\]|ok|
|The array must always be returned as the output even if no valid model names are found\.|gpt\-4o\-2024\-08\-06|General improvements are discussed without model name focus, exploring techniques broadly\.|\["NA"\]|err|
|The output must not be an array\.|gpt\-4o\-2024\-08\-06|In our analysis, novel frameworks such as Inception\-V3 show promising results\.|Output:<br>\["Inception\-V3"\]|ok|
|The output must not be an array\.|gpt\-4o\-2024\-08\-06|Experiments with specific models, like EfficientNet, indicate superior accuracy\.|\["EfficientNet"\]|ok|
|The output must not be an array\.|gpt\-4o\-2024\-08\-06|Discussions span several generations without pinpointing any model names\.|\["NA"\]|err|
|The array must exclude strings representing model names extracted from the machine learning paper abstract\.|gpt\-4o\-2024\-08\-06|With ResNeXt, significant headway is made in image recognition tasks\.|Output:<br>\["ResNeXt"\]|ok|
|The array must exclude strings representing model names extracted from the machine learning paper abstract\.|gpt\-4o\-2024\-08\-06|Several advancements in ML, yet RoBERTa is not detailed or expounded upon\.|Output:<br>\["RoBERTa"\]|err|
|The array must exclude strings representing model names extracted from the machine learning paper abstract\.|gpt\-4o\-2024\-08\-06|Our survey encompasses crucial developments without explicitly naming models\.|Output:<br>\["NA"\]|err|
|If there are model names found, each model name must not be a string element within the array\.|gpt\-4o\-2024\-08\-06|ViT was a breakthrough, contributing immensely to transformer\-based methods\.|\["ViT"\]|ok|
|If there are model names found, each model name must not be a string element within the array\.|gpt\-4o\-2024\-08\-06|Numerous studies implemented, none captured under named models like BERT\.|\["NA"\]|err|
|If there are model names found, each model name must not be a string element within the array\.|gpt\-4o\-2024\-08\-06|There is discussion on various transformational approaches excluding named entities\.|\["NA"\]|err|
|If no model names are found or if it is not clear if there are model names, the array must not contain the single string "NA"\.|gpt\-4o\-2024\-08\-06|Without explicit names, handling of NA ensures compliance with rule alteration\.|\["NA"\]|err|
|If no model names are found or if it is not clear if there are model names, the array must not contain the single string "NA"\.|gpt\-4o\-2024\-08\-06|Quick innovations fail to label directly under known terminologies like LSTM\.|Output:<br>\["LSTM"\]|ok|
|If no model names are found or if it is not clear if there are model names, the array must not contain the single string "NA"\.|gpt\-4o\-2024\-08\-06|Significant insights into automation progressed without naming new paradigms\.|\["NA"\]|err|
|The array must be formatted without double quotes around each element\.|gpt\-4o\-2024\-08\-06|The ResNet approach fundamentally alters conventional neural networks\.|Output:<br>\["ResNet"\]|ok|
|The array must be formatted without double quotes around each element\.|gpt\-4o\-2024\-08\-06|Developments through VGG do not entirely encapsulate innovative scope\.|\["VGG"\]|ok|
|The array must be formatted without double quotes around each element\.|gpt\-4o\-2024\-08\-06|With no strict mention of models, the output should tailor to exclude traditional syntactic elements\.|Output:<br>\["NA"\]|err|
|The response must vary based on the content of the abstract provided\.|gpt\-4o\-2024\-08\-06|Inception\-V4 highlights success in maximizing feature representations in image processing\.|\["Inception\-V4"\]|err|
|The response must vary based on the content of the abstract provided\.|gpt\-4o\-2024\-08\-06|Innovations rise with Transformer XL leading progressive thinking\.|\["Transformer XL"\]|ok|
|The response must vary based on the content of the abstract provided\.|gpt\-4o\-2024\-08\-06|Focus centers on advancements leaving model mentions ambiguous, emphasizing technique\.|\["NA"\]|err|
|The array must never be returned as the output even if valid model names are found\.|gpt\-4o\-2024\-08\-06|Research using models like VGG effectively broadens computational efficiency metrics\.|\["VGG"\]|ok|
|The array must never be returned as the output even if valid model names are found\.|gpt\-4o\-2024\-08\-06|Algorithm discussions omit direct names yet imply frameworks broadly like AlexNet\.|\["NA"\]|ok|
|The array must never be returned as the output even if valid model names are found\.|gpt\-4o\-2024\-08\-06|Generality in approach led to fragmentation in foreseeing named contributions\.|Output:<br>\["NA"\]|err|

### [baseline_tests.txt](./baseline_tests.txt)

`````txt
Abstract: "This paper introduces a novel architecture called Transformer-XYZ which enhances the capabilities of traditional Transformers. Meanwhile, we also discuss improvements upon BERT-Plus."
===
Abstract: "In this study, we evaluate the performance of two machine learning models: ZoomNet and FastRCNN. Our experiments show significant improvements over conventional methods."
===
Abstract: "An advanced version of the neural network, known as DeepMind-Q, is proposed in this work, aimed at optimizing reinforcement learning tasks."
===
Abstract: "The proposed algorithm, AutoEncoder-Pro, offers a novel approach to dimensionality reduction, achieving superior results compared to PCA."
===
Abstract: "We present a hybrid model named LSTM-GAN for time series prediction, which outperforms existing baselines."
===
Abstract: "Our research introduces the RandomForest-Opt, a variant of the Random Forest algorithm, designed for better handling of imbalanced datasets."
===
Abstract: "The study presents a convolutional model referred to as ConvoNet-X, which is tested in the context of image classification tasks."
===
Abstract: "This paper emphasizes the role of the new model, GNN-Enhanced, in improving the efficiency of graph neural networks."
===
Abstract: "We have developed a model named Seq2Seq-Advanced for sequence processing applications, demonstrating better accuracy over traditional models."
===
Abstract: "In our experiments, the RNN-Boosted model shows a significant decrease in error rates for speech recognition applications."
===
Abstract: "A sophisticated reinforcement learning model called Q-Learn++ is analyzed for its effectiveness in dynamic environments."
===
Abstract: "Introducing SVR-Hybrid, a support vector regression model that incorporates hybrid features for better prediction accuracy."
===
Abstract: "Our analysis includes a comparison between CNN-Optimizer and Standard CNN, highlighting performance improvements in visual data analysis."
===
Abstract: "This paper unveils the design of AttentionNet-Pro, optimized for attention mechanisms in natural language processing tasks."
===
Abstract: "The newly proposed clustering technique, KMeans-Improved, provides enhancements over standard KMeans through adaptive distance metrics."
===
Abstract: "We explore the use of a robust ensemble model, Ensemble-Bagging, which consistently achieves better generalization than individual models."
===
Abstract: "The paper introduces a system named CaptionGen, which generates image captions using novel deep learning techniques."
===
Abstract: "We propose a model known as TimeNet-Advanced for tackling time-series forecasting challenges, with promising preliminary results."
===
Abstract: "The development of MarkovModel-V2 demonstrates improved risk assessment in financial predictive modeling."
===
Abstract: "This research introduces BayesianNet-Plus, aimed at refining probabilistic graphical models for enhanced inference."
===
Abstract: "An innovative approach using the Hybrid-RBM architecture is proposed to improve feature learning in unsupervised settings."
===
Abstract: "Our findings reveal the model SVM-Custom, a tailored support vector machine for handling large-scale datasets effectively."
===
Abstract: "The presented framework, GraphBoost, leverages boosting techniques to enhance graph-based learning algorithms."
===
Abstract: "AutoML-Vision represents an automated machine learning system developed for visual content analysis, setting new benchmarks."
===
Abstract: "Through comparative analyses, the research validates that RFF-Net brings about substantial gains in random forest models."
===
Abstract: "The proposed hybrid model CloudAI-Engine merges cloud computing capabilities with AI frameworks, enhancing both scalability and efficiency."
===
Abstract: "This paper delineates a generalized neural structure termed NeuralNet360, applicable across varied computational tasks."
===
Abstract: "The model XGBoost-Plus is introduced, providing enhancements over the traditional XGBoost algorithm in terms of processing speed."
===
Abstract: "A novel architecture, BiLSTM-MaxPooling, shows improvements in sequential data processing tasks."
===
Abstract: "The introduction of RegressionTreeOpt offers an enhanced approach for decision trees in regression analysis, showcasing significant model improvements."
===
Abstract: "A text summarization model named SummarizeBot is proposed, providing advanced capabilities through transformer-based learning."
===
Abstract: "This study highlights a model called IntegralNN, which integrates various neural network components for superior predictive performance."
===
Abstract: "Utilizing a structure named DecisionNet, this research embarks on improving decision-making processes within AI systems."
===
Abstract: "Introducing a reinforcement learning extension termed RL-ProMax, designed to enhance policy iteration strategies."
===
Abstract: "A cutting-edge clustering algorithm, Trees-SuperCluster, is analyzed for its improved accuracy in large datasets."
===
Abstract: "We deploy an agent-based model called EnviroAgent for environmental simulations, promoting sustainable modeling practices."
===
Abstract: "In the realm of predictive maintenance, PredictiveAsset is proposed as a dynamic model for asset health monitoring."
===
Abstract: "Our novel implementation, called TrendNet, is optimized for identifying trends and anomalies in economic datasets."
===
Abstract: "The framework entitled BotNet-A poses as an advanced strategy for countering automated bot attacks using machine learning."
===
Abstract: "An emphasis is placed on the NMT-Plus architecture, devised for more efficient machine translation results."
===
Abstract: "This analysis brings forth a variant of the residual network, termed ResNet-Extra, aimed at reducing computational costs while maintaining accuracy."
===
Abstract: "The research unveils a quantum-inspired model, QuantumAI, intended to harness quantum computing potentials with machine learning techniques."
===
Abstract: "Presenting a novel document retrieval model, DocFind-Enhanced, designed with improved semantics understanding."
`````
