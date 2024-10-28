## binary-classifier ([json](./binary-classifier.report.json))


### [prompty](./binary-classifier.prompty)

`````md
---
name: Binary Text Classifier
description: Given evidence and a question, answer Yes/No if the evidence contains information to answer the question.
source: Article on unsing LLMS for complex classification tasks (with small modifications)
url: https://medium.com/@olaf.lenzmann/mastering-llms-for-complex-classification-tasks-64f0bda2edf3
inputs: 
  evidence:
    type: string
  question:
    type: string
sample:
    evidence: "The U.S. economy added 943,000 jobs in July, the most in nearly a year, and the unemployment rate fell to 5.4%. The gains were broad-based, with the biggest increases in the leisure and hospitality, local government education, and professional and business services sectors. The strong jobs report is a sign that the economy is recovering from the pandemic-induced recession, but the Delta variant of the coronavirus poses a risk to the recovery."
    question: "What is the current state of the U.S. economy?"
---
system:
You are an accomplished AI.

Your job is to analyse a text excerpt and determine if it contains information that can be used to answer a given question. Carefully pay attention to the details and context of the question and of the text excerpt!

This is raw text from a page of a report:
{{evidence}}

Consider the text carefully and determine if the text contains significant and relevant information to answer the question "{{question}}". 

Think through your evaluation. Respond only with Yes or No. Then start a new paragraph and explain why.
`````


### [intent.txt](./binary-classifier.intent.txt)

`````txt
Determine if a text excerpt contains information to answer a given question.
`````


### [input_spec.txt](./binary-classifier.input_spec.txt)

`````txt
The input must include a text excerpt labeled as {{evidence}}.  
The input must include a question labeled as {{question}}.  
The text excerpt can be any raw text from a report.  
The question must be clear and contextually relevant to the text excerpt.
`````


### [rules.txt](./binary-classifier.rules.txt)

`````txt
The response must start with either "Yes" or "No" based on whether the text contains relevant information to answer the question. 
The response must start a new paragraph after the initial "Yes" or "No" answer.
The explanation must clearly detail the presence or absence of significant and relevant information in relation to the question.
The explanation must consider the details and context of both the text excerpt and the given question.
The explanation must be coherent and logically structured, providing insight into the reasoning behind the initial answer.
The explanation must avoid introducing any information not present within the text excerpt or the question.
`````


### [inverse_rules.txt](./binary-classifier.inverse_rules.txt)

`````txt
The response must never start with "Yes" or "No" regardless of the text's relevance.
The response must continue in the same paragraph after the initial response.
The explanation must obscure the presence or absence of significant information related to the question.
The explanation must ignore the details and context of both the text excerpt and the question.
The explanation must be incoherent and illogically structured, avoiding insight into the reasoning behind the initial answer.
The explanation must introduce information not present within the text excerpt or the question.
`````


### [baseline_tests.txt](./binary-classifier.baseline_tests.txt)

`````txt
evidence: "The Supreme Court ruled in favor of the Affordable Care Act, ensuring that millions of Americans will continue to receive health insurance coverage. The decision was a 7-2 ruling, with the majority opinion stating that the plaintiffs did not have the legal standing to challenge the law."
question: "Does the Supreme Court ruling affect health insurance coverage?"

===
evidence: "Scientists have discovered a new species of bird in the Amazon rainforest. This bird has a unique call that sets it apart from other species in the region. The discovery highlights the rich biodiversity of the Amazon and the importance of conservation efforts."
question: "What is unique about the new bird species discovered in the Amazon rainforest?"

===
evidence: "The city council has approved a new ordinance that will increase the minimum wage to $15 per hour over the next three years. This change is expected to benefit thousands of low-income workers and their families. The ordinance will be implemented in phases, with the first increase taking effect next year."
question: "Is the new city ordinance aimed at increasing the minimum wage?"
`````


### [tests.csv](./binary-classifier.tests.csv)

|Rule ID|Test ID|Test Input|Expected Output|Reasoning|
|-|-|-|-|-|
|1|1|evidence: The report discusses recent advancements in renewable energy technologies, focusing on solar and wind power\. question: What are the recent advancements in renewable energy?|Yes\. The text contains significant information about advancements in renewable energy, specifically solar and wind power\.|The test assesses if the software can correctly identify that the text provides relevant information about the question on advancements in renewable energy\.|
|1|2|evidence: The financial summary highlights the company's profits over the last decade\. question: How has the company's profit changed over the last ten years?|Yes\. The text provides a summary of the company's profits over the last decade, directly relevant to the question\.|This test evaluates the software's ability to recognize relevant financial information that answers the question about profit changes\.|
|1|3|evidence: The document outlines the historical importance of the Silk Road and its impact on trade\. question: What impact did the Silk Road have on trade?|Yes\. The text discusses the historical importance and impact of the Silk Road on trade\.|Tests if the software can conclude that the text is relevant to the question about the Silk Road's impact on trade\.|
|2|1|evidence: A detailed analysis of the climate data from the past 50 years is included\. question: Is there evidence of climate change in the last century?|Yes\. The analysis of climate data over the past 50 years is relevant to assessing climate change in the last century\.|The test checks if the software correctly identifies the relevance of climate data to the question about climate change\.|
|2|2|evidence: The paper discusses various theories about the origins of the universe\. question: What are the theories about the universe's origins?|Yes\. The text includes discussion on various theories about the universe's origins\.|This test challenges the software to determine the relevance of theoretical discussions to a question about universe origins\.|
|2|3|evidence: An in\-depth review of economic policies in South America is presented\. question: What economic policies are currently in place in South America?|Yes\. The text provides an in\-depth review of economic policies in South America, directly relevant to the question\.|Assesses if the software can identify significant economic policy information that answers the question\.|
|3|1|evidence: The study examines the effects of caffeine on human health\. question: How does caffeine affect human health?|Yes\. The text examines the effects of caffeine, directly answering the question\.|Tests the software's ability to identify relevant health information in response to the question\.|
|3|2|evidence: A report on renewable energy sources and their benefits is provided\. question: What are the benefits of renewable energy sources?|Yes\. The report includes information on the benefits of renewable energy sources\.|Evaluates whether the software can pinpoint the relevance of benefits discussed in the text to the question\.|
|3|3|evidence: The document explores the history of the internet and its development over the years\. question: How has the internet developed over time?|Yes\. The text explores the history and development of the internet, relevant to the question\.|Checks if the software recognizes the historical development context in the text that answers the question\.|