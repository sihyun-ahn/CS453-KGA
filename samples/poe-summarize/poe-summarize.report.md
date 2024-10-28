## poe-summarize ([json](./poe-summarize.report.json))


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


### [intent.txt](./poe-summarize.intent.txt)

`````txt
Help the CEO save time by summarizing and deeply analyzing articles or news content.
`````


### [input_spec.txt](./poe-summarize.input_spec.txt)

`````txt
The input is an article or news content provided as text.
The content can be in any language.
The input must contain coherent and structured information suitable for summarization.
There are no specific restrictions on the length of the input text.
The input should be text-based and does not include any non-text elements like images or videos.
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


### [baseline_tests.txt](./poe-summarize.baseline_tests.txt)

`````txt
text: "The European Union has announced a sweeping set of new regulations aimed at curbing the power of big tech companies. The Digital Markets Act (DMA) will impose strict rules on companies such as Google, Apple, Amazon, and Facebook, including requirements to ensure fair competition and to avoid self-preferencing practices. The DMA also introduces measures to increase transparency and protect consumer data. These regulations are expected to have significant implications for the tech industry globally and could set a precedent for other regions to follow."

===
text: "In a landmark decision, the Supreme Court ruled that the Affordable Care Act (ACA) remains constitutional, preserving healthcare coverage for millions of Americans. The case was brought by a coalition of 18 states, which argued that the law's individual mandate was unconstitutional after Congress eliminated the penalty for not having health insurance. The ruling is seen as a major victory for the Biden administration and supporters of the ACA, and it underscores the ongoing legal and political battles surrounding healthcare reform in the United States."

===
text: "Japan's aging population continues to present significant economic and social challenges. With a declining birth rate and increasing life expectancy, the labor force is shrinking, and the burden on social security systems is growing. The government has introduced various policies to address these issues, such as promoting higher birth rates and increasing the retirement age. However, experts argue that more comprehensive reforms are needed, including immigration policy changes and greater support for working women, to ensure sustainable long-term growth and maintain social stability."
`````


### [tests.csv](./poe-summarize.tests.csv)

|Rule ID|Test ID|Test Input|Expected Output|Reasoning|
|-|-|-|-|-|
|1|1|El presidente anunció nuevas medidas económicas para mejorar la situación del país\. Estas incluyen la reducción de impuestos y el aumento del gasto en infraestructura\.|All outputs in Spanish, including summaries and analyses\.|The input is in Spanish, ensuring the software uses the same language for output\.|
|1|2|Le président a annoncé de nouvelles mesures économiques pour améliorer la situation du pays, y compris la réduction des impôts et l'augmentation des dépenses d'infrastructure\.|Tous les résultats en français, y compris les résumés et les analyses\.|The input is in French, testing language identification for consistent output\.|
|1|3|Der Präsident hat neue wirtschaftliche Maßnahmen angekündigt, um die Lage des Landes zu verbessern\. Dazu gehören Steuersenkungen und erhöhte Infrastrukturinvestitionen\.|Alle Ausgaben auf Deutsch, einschließlich Zusammenfassungen und Analysen\.|The input is in German, checking consistent language use in output\.|
|2|1|The climate conference highlighted the urgent need for global action\. Key topics included renewable energy, emissions reduction, and international cooperation\.|\#\# Overview \#\# Summary \#\# Deep Dive Analysis|Testing the inclusion of a multi\-section outline summarizing the main content\.|
|2|2|La conferencia climática destacó la necesidad urgente de una acción global\. Se discutieron temas clave como las energías renovables, la reducción de emisiones y la cooperación internacional\.|\#\# Resumen \#\# Sumario \#\# Análisis en Profundidad|Ensures the software outputs a structured outline in Spanish as per input language\.|
|2|3|La conférence sur le climat a mis en lumière la nécessité d'une action mondiale urgente\. Les sujets clés incluaient les énergies renouvelables, la réduction des émissions et la coopération internationale\.|\#\# Aperçu \#\# Résumé \#\# Analyse Approfondie|The test checks the creation of a structured outline in French, matching input language\.|
|3|1|The tech company reported a significant increase in quarterly earnings due to its successful new product launch\.|A one\-paragraph summary of the entire content\.|Validates that the software condenses the content into a single paragraph for quick understanding\.|
|3|2|La empresa tecnológica informó un aumento significativo en las ganancias trimestrales gracias al exitoso lanzamiento de su nuevo producto\.|Un resumen en un solo párrafo de todo el contenido\.|Ensures the software creates a concise one\-paragraph summary in Spanish\.|
|3|3|La société technologique a rapporté une augmentation significative des bénéfices trimestriels grâce au lancement réussi de son nouveau produit\.|Un résumé en un seul paragraphe de tout le contenu\.|Tests the software's ability to create a one\-paragraph summary in French\.|
|4|1|The article discusses the impact of renewable energy on global markets, highlighting economic and environmental benefits\.|Detailed analysis on economic impacts, environmental benefits, and market changes\.|Checks if the software performs a deep dive analysis on multiple aspects of the content\.|
|4|2|El artículo trata sobre el impacto de las energías renovables en los mercados globales, destacando beneficios económicos y ambientales\.|Análisis detallado sobre impactos económicos, beneficios ambientales y cambios en el mercado\.|Verifies deep dive analysis in Spanish, covering multiple aspects\.|
|4|3|L'article traite de l'impact des énergies renouvelables sur les marchés mondiaux, mettant en évidence des avantages économiques et environnementaux\.|Analyse approfondie sur les impacts économiques, les avantages environnementaux et les changements du marché\.|Ensures comprehensive deep dive analysis in French\.|
|5|1|The global economy is shifting due to technological advancements\. Would you like further analysis in the context of these changes?|Prompt asking if further analysis is needed, followed by a structured response if required\.|Tests the software's ability to inquire about further analysis and provide structured responses\.|
|5|2|La economía global está cambiando debido a los avances tecnológicos\. ¿Necesita un análisis adicional en el contexto de estos cambios?|Pregunta sobre la necesidad de un análisis adicional, seguido de una respuesta estructurada si es necesario\.|Validates the inquiry and response mechanism in Spanish\.|
|5|3|L'économie mondiale évolue en raison des avancées technologiques\. Souhaitez\-vous une analyse supplémentaire dans le contexte de ces changements?|Demande si une analyse supplémentaire est nécessaire, suivie d'une réponse structurée si nécessaire\.|Verifies the software's prompt and response function in French\.|
|6|1|Technology trends are rapidly evolving, influencing various sectors\. \*\*Overview\*\* \*\*Summary\*\* \*\*Deep Dive Analysis\*\*|Organized sections using bold font for clarity\.|Checks if the output is organized using sections and bold font for better clarity\.|
|6|2|Las tendencias tecnológicas están evolucionando rápidamente, influyendo en varios sectores\. \*\*Descripción General\*\* \*\*Resumen\*\* \*\*Análisis en Profundidad\*\*|Secciones organizadas con fuente en negrita para mayor claridad\.|Ensures section organization and bold font usage in Spanish\.|
|6|3|Les tendances technologiques évoluent rapidement, influençant divers secteurs\. \*\*Aperçu\*\* \*\*Résumé\*\* \*\*Analyse Approfondie\*\*|Sections organisées avec une police en gras pour plus de clarté\.|Validates the use of sections and bold font in French\.|