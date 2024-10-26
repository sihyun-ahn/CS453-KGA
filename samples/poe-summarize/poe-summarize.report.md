## [poe-summarize](samples/poe-summarize/poe-summarize.prompty) ([JSON](./poe-summarize.report.json))


### [prompty](./poe-summarize.prompty)

`````md
---
name: poe summarize with insight
description: A prompt directs a model to provide a summary with insights about an input text.
source: Louise Shark collection of system prompts
url: https://github.com/LouisShark/chatgpt_system_prompt/blob/main/prompts/official-product/poe/SummarizeWithInsight.md
inputs:
  text:
    type: string
sample:
  text: "The U.S. economy added 943,000 jobs in July, the most in nearly a year, and the unemployment rate fell to 5.4%. The gains were broad-based, with the biggest increases in the leisure and hospitality, local government education, and professional and business services sectors. The strong jobs report is a sign that the economy is recovering from the pandemic-induced recession, but the Delta variant of the coronavirus poses a risk to the recovery."
---
system:

You are a professional executive assistant. Your goal is to help the CEO save time by summarizing and deeply analyzing articles or news content.

Steps:

0. Identify the language of the content, use this language for output going forward.
1. First, summarize the main content according to the original text. Output the summary in multiple outline sections.
2. Then, further condense all the content into a one-paragraph summary to allow for the quickest understanding of the overall content.
3. Next, perform a deep dive, expanding on the content from as many aspects as possible, such as related industry, political economy, etc., to aid in understanding the deeper impacts and potential implications.
4. Finally, ask the user if they need further analysis in the context of specific other information. If provided, offer a professional and well-structured response.

Template:

## Overview

## Summary

## Deep Dive Analysis

**Rule**

- Use the same language of the main content to reply the user.
- Use sections and bold font for better organize content.
- Identify the language of the user content, use this language for all output!!!

user:
{{text}}
`````


### [rules.txt](./poe-summarize.rules.txt)

`````txt
The output must be in the same language as the original content provided by the user.
The output must first include a multiple section outline summarizing the main content according to the original text.
The output must include a one-paragraph summary that condenses all the content for quick understanding.
The output must perform a deep dive analysis expanding on the content from multiple aspects such as related industry and political economy.
The output must ask the user if they require further analysis in the context of specific other information.
The output must be organized using sections and bold font for clarity.
The output must consistently use the language identified from the user content for all responses.
`````


### [inverse_rules.txt](./poe-summarize.inverse_rules.txt)

`````txt
The output may be in a different language than the original content provided by the user.
The output must not include any outline summarizing the main content.
The output must exclude any summary and avoid condensing the content.
The output must refrain from performing any deep dive analysis.
The output must not inquire if the user requires further analysis.
The output must not use sections or bold font for clarity.
The output may use different languages inconsistently in responses.
`````


### [input_spec.txt](./poe-summarize.input_spec.txt)

`````txt
The input is a text content, specifically articles or news content.
The input must be text-based content, such as articles or news pieces.
The content can be in any language.
The input must have enough information to allow for summarization and deep analysis.
The input should be coherent and structured to facilitate identification of main ideas and deeper aspects.
Greetings or unrelated queries are not specified as part of the input scope.
`````


### [baseline_tests.txt](./poe-summarize.baseline_tests.txt)

`````txt
text: "The European Union has announced a sweeping set of new regulations aimed at curbing the power of big tech companies. The Digital Markets Act (DMA) will impose strict rules on companies such as Google, Apple, Amazon, and Facebook, including requirements to ensure fair competition and to avoid self-preferencing practices. The DMA also introduces measures to increase transparency and protect consumer data. These regulations are expected to have significant implications for the tech industry globally and could set a precedent for other regions to follow."

===
text: "In a landmark decision, the Supreme Court ruled that the Affordable Care Act (ACA) remains constitutional, preserving healthcare coverage for millions of Americans. The case was brought by a coalition of 18 states, which argued that the law's individual mandate was unconstitutional after Congress eliminated the penalty for not having health insurance. The ruling is seen as a major victory for the Biden administration and supporters of the ACA, and it underscores the ongoing legal and political battles surrounding healthcare reform in the United States."

===
text: "Japan's aging population continues to present significant economic and social challenges. With a declining birth rate and increasing life expectancy, the labor force is shrinking, and the burden on social security systems is growing. The government has introduced various policies to address these issues, such as promoting higher birth rates and increasing the retirement age. However, experts argue that more comprehensive reforms are needed, including immigration policy changes and greater support for working women, to ensure sustainable long-term growth and maintain social stability."
`````


### [tests.csv](./poe-summarize.tests.csv)

`````csv
Rule ID, Test ID, Test Input, Expected Output, Reasoning
1, 1, "El artículo proporciona un análisis detallado de la economía global actual y sus tendencias futuras.", "El output debe estar completamente en español, abordando todos los puntos mencionados.", "Ensures the software detects language and maintains it throughout the response as per rule."
1, 2, "この記事は現代のテクノロジーの進化についての考察を提供しています。", "すべての出力は日本語で提供され、内容に一貫性がある必要があります。", "Validates language detection and consistency in output language as per specified rule."
1, 3, "The article discusses the impact of climate change on global politics.", "All output sections should be in English, maintaining language consistency.", "Tests whether the software maintains English throughout and adheres to the rule."
2, 1, "The news piece highlights recent advancements in renewable energy.", "**Overview**\n**Summary**\n**Deep Dive Analysis**", "Verifies that sections are correctly organized and formatted with bold titles."
2, 2, "Este informe se centra en las tendencias de mercado actuales.", "**Overview**\n**Summary**\n**Deep Dive Analysis**", "Checks if sections are organized with bold titles in Spanish as per the rule."
2, 3, "L'article examine l'économie politique des nations émergentes.", "**Overview**\n**Summary**\n**Deep Dive Analysis**", "Ensures sections are properly formatted with bold titles in French, following the rule."
3, 1, "The article provides an in-depth look at the effects of social media on youth culture.", "Outline of key points followed by a concise paragraph summary.", "Tests for both detailed outline and a concise summary, meeting the rule's requirements."
3, 2, "Este artículo trata sobre la influencia de la inteligencia artificial en la medicina moderna.", "Estructura con múltiples puntos clave seguida de un resumen en un solo párrafo.", "Ensures multi-part outline and single-paragraph summary in Spanish."
3, 3, "L'article discute de l'impact des politiques environnementales sur la biodiversité.", "Présentation des points clés suivie d'un résumé en un seul paragraphe.", "Validates the rule by requiring a multi-part outline and a concise summary in French."
`````
