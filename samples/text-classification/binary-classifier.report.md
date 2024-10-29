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

### [test_evals.csv](./binary-classifier.test_evals.csv)

|Rule ID|Test ID|Test Input|Expected Output|Reasoning|evaluation|
|-|-|-|-|-|-|
|1|1|evidence: The report discusses recent advancements in renewable energy technologies, focusing on solar and wind power\. question: What are the recent advancements in renewable energy?|Yes\. The text contains significant information about advancements in renewable energy, specifically solar and wind power\.|The test assesses if the software can correctly identify that the text provides relevant information about the question on advancements in renewable energy\.|Yes\.<br><br>The text excerpt mentions that the report discusses recent advancements in renewable energy technologies, specifically focusing on solar and wind power\. This indicates that the report contains information that would answer the question about recent advancements in renewable energy\. The text confirms that advancements have been made in these areas, aligning directly with the question's focus on recent developments\.|
|1|2|evidence: The financial summary highlights the company's profits over the last decade\. question: How has the company's profit changed over the last ten years?|Yes\. The text provides a summary of the company's profits over the last decade, directly relevant to the question\.|This test evaluates the software's ability to recognize relevant financial information that answers the question about profit changes\.|Yes\.<br><br>The text excerpt states that the financial summary highlights the company's profits over the last decade\. This indicates that the information regarding the changes in the company's profits over the last ten years is present in the financial summary\. Therefore, the text contains relevant information to answer the question about how the company's profit has changed over that period\.|
|1|3|evidence: The document outlines the historical importance of the Silk Road and its impact on trade\. question: What impact did the Silk Road have on trade?|Yes\. The text discusses the historical importance and impact of the Silk Road on trade\.|Tests if the software can conclude that the text is relevant to the question about the Silk Road's impact on trade\.|Yes\.<br><br>The text excerpt states that the document outlines the historical importance of the Silk Road and its impact on trade\. This indicates that the document contains information relevant to answering the question about the impact the Silk Road had on trade\. Although the specific details of the impact are not provided in the excerpt, it confirms that such information is included in the document\.|
|2|1|evidence: A detailed analysis of the climate data from the past 50 years is included\. question: Is there evidence of climate change in the last century?|Yes\. The analysis of climate data over the past 50 years is relevant to assessing climate change in the last century\.|The test checks if the software correctly identifies the relevance of climate data to the question about climate change\.|No\.<br><br>The evidence provided mentions an analysis of climate data from the past 50 years\. This timeframe only covers half of the last century, and therefore does not encompass the full 100\-year period referenced in the question\. Without information extending beyond the past 50 years, the text does not provide relevant information to determine evidence of climate change throughout the entire last century\.|
|2|2|evidence: The paper discusses various theories about the origins of the universe\. question: What are the theories about the universe's origins?|Yes\. The text includes discussion on various theories about the universe's origins\.|This test challenges the software to determine the relevance of theoretical discussions to a question about universe origins\.|Yes\.<br><br>The text excerpt mentions that the paper discusses various theories about the origins of the universe\. This indicates that the content likely includes information relevant to answering the question about what those theories are\. However, the specific theories are not detailed in the excerpt provided\.|
|2|3|evidence: An in\-depth review of economic policies in South America is presented\. question: What economic policies are currently in place in South America?|Yes\. The text provides an in\-depth review of economic policies in South America, directly relevant to the question\.|Assesses if the software can identify significant economic policy information that answers the question\.|Yes\.<br><br>The text excerpt states that there is an "in\-depth review of economic policies in South America," indicating that the text likely contains detailed information about the economic policies currently in place in the region\. This suggests that the text provides relevant information to answer the question about what economic policies are currently being implemented in South America\.|
|3|1|evidence: The study examines the effects of caffeine on human health\. question: How does caffeine affect human health?|Yes\. The text examines the effects of caffeine, directly answering the question\.|Tests the software's ability to identify relevant health information in response to the question\.|Yes\.<br><br>The evidence states that the study examines the effects of caffeine on human health, which directly relates to the question of how caffeine affects human health\. The study's focus on this specific topic indicates that it likely contains information relevant to answering the question about caffeine's impact on health, though the excerpt does not detail the specific effects\.|
|3|2|evidence: A report on renewable energy sources and their benefits is provided\. question: What are the benefits of renewable energy sources?|Yes\. The report includes information on the benefits of renewable energy sources\.|Evaluates whether the software can pinpoint the relevance of benefits discussed in the text to the question\.|Yes\.<br><br>The evidence explicitly mentions a report on renewable energy sources and their benefits\. This indicates that the report likely contains information relevant to the question about the benefits of renewable energy sources\. The context suggests that the report would detail such benefits, providing a direct answer to the question posed\.|
|3|3|evidence: The document explores the history of the internet and its development over the years\. question: How has the internet developed over time?|Yes\. The text explores the history and development of the internet, relevant to the question\.|Checks if the software recognizes the historical development context in the text that answers the question\.|Yes\.<br><br>The document contains relevant information to answer the question as it explores the history of the internet and its development over the years\. This suggests that it provides insights into how the internet has evolved, which aligns directly with the inquiry about its development over time\.|

### [test_results.csv](./binary-classifier.test_results.csv)

|id|promptid|model|input|output|
|-|-|-|-|-|
|12ff70f|559ef4c|gpt\-4o\-mini|evidence: The report discusses recent advancements in renewable energy technologies, focusing on solar and wind power\. question: What are the recent advancements in renewable energy?|Yes<br><br>The text excerpt provides relevant information about recent advancements in renewable energy technologies, specifically mentioning solar and wind power\. This directly addresses the question regarding what recent advancements have been made in the field of renewable energy\.|
|c0be203|559ef4c|gpt\-4o\-mini|evidence: The financial summary highlights the company's profits over the last decade\. question: How has the company's profit changed over the last ten years?|Yes<br><br>The text mentions that the financial summary highlights the company's profits over the last decade, which implies that it contains information about how those profits have changed over that time period\. This directly relates to the question regarding changes in the company's profit over the last ten years\.|
|38627d6|559ef4c|gpt\-4o\-mini|evidence: The document outlines the historical importance of the Silk Road and its impact on trade\. question: What impact did the Silk Road have on trade?|Yes<br><br>The text explicitly mentions the "impact on trade" related to the Silk Road, indicating that it contains relevant information needed to answer the question about the impact of the Silk Road on trade\. The historical context provided in the excerpt suggests that it will offer insights and details pertinent to the question being asked\.|
|7293f61|559ef4c|gpt\-4o\-mini|evidence: A detailed analysis of the climate data from the past 50 years is included\. question: Is there evidence of climate change in the last century?|No\.<br><br>The text excerpt specifically mentions a detailed analysis of climate data from the past 50 years, but it does not provide information about the last century\. Therefore, it cannot directly answer the question about evidence of climate change over that longer time frame\.|
|58b8bf8|559ef4c|gpt\-4o\-mini|evidence: The paper discusses various theories about the origins of the universe\. question: What are the theories about the universe's origins?|Yes<br><br>The text excerpt contains significant and relevant information because it specifically states that the paper discusses various theories about the origins of the universe\. This directly addresses the question asking for the theories regarding the universe's origins\.|
|3e2bd7b|559ef4c|gpt\-4o\-mini|evidence: An in\-depth review of economic policies in South America is presented\. question: What economic policies are currently in place in South America?|Yes<br><br>The text excerpt indicates that it presents an in\-depth review of economic policies in South America\. This suggests that it includes relevant information that could address the question regarding the current economic policies in that region\.|
|f3fdd65|559ef4c|gpt\-4o\-mini|evidence: The study examines the effects of caffeine on human health\. question: How does caffeine affect human health?|Yes<br><br>The text excerpt indicates that the study focuses on the effects of caffeine on human health, which directly relates to the question about how caffeine affects human health\. This suggests that the report will provide relevant information regarding the impacts of caffeine, allowing for an appropriate answer to the question\.|
|2f75794|559ef4c|gpt\-4o\-mini|evidence: A report on renewable energy sources and their benefits is provided\. question: What are the benefits of renewable energy sources?|Yes<br><br>The text excerpt mentions that it is a report on renewable energy sources and their benefits, indicating that it likely contains significant and relevant information regarding the benefits of those sources\.|
|b41d2af|559ef4c|gpt\-4o\-mini|evidence: The document explores the history of the internet and its development over the years\. question: How has the internet developed over time?|Yes\.<br><br>The text contains relevant information as it explicitly states that the document explores the history of the internet and its development over the years\. This indicates that the document likely provides insights and details regarding how the internet has evolved over time, which directly addresses the question\.|