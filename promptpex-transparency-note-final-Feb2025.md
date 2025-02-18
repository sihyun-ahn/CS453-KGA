---
title: Transparency Note
sidebar:
  order: 99
description: PromptPex is a tool designed to assist developers by exploring and testing AI model prompts.
keywords: AI prompts, LLM testing, prompt engineering, AI development, responsible AI
lastUpdated: 2025-02-18
---
# PromptPex: Responsible AI Transparency Note

## What is PromptPex?
PromptPex is an AI-driven tool developed to assist software developers in creating, managing, and testing prompts for large language models (LLMs). By treating prompts as functions, PromptPex automates the generation of test inputs and the extraction of functional specifications. It aims to enhance the efficiency and reliability of AI prompts, thereby improving their performance across various AI models.

## What can PromptPex do?
PromptPex provides a suite of functionalities including:
- Automated rule extraction from natural language prompts.
- Generation of diverse test cases to validate the performance of those prompts.
- Support for testing prompts across multiple AI models, ensuring that developers understand how their inputs are interpreted and how outputs are generated.

## What is PromptPex's intended use?
The intended use of PromptPex, as identified through its impact assessment, is to simplify the development of AI prompts by providing structured and automated tools for prompt evaluation and testing. This is aimed at improving the reliability of AI interactions and facilitating better integration of AI capabilities within software applications.

The released version of PromptPex is intended as a research prototype and should be used primarily for research purposes.  It is not intended for production use.  The goal of the release is to highlight new tools to support the development of AI systems, and to solicit feedback from the community on the tool's capabilities and limitations.

## How was PromptPex evaluated? What metrics are used to measure performance?
PromptPex undergoes rigorous evaluations focused on its ability to generate valid and diverse test cases that accurately reflect the rules defined by the prompts. Effectiveness is measured using metrics such as:
- Percentage of non-compliant outputs generated during testing.
- Groundedness of the rules extracted from prompts, which assesses whether the rules are adequately supported by the prompt descriptions.
- Validity of the test cases generated, ensuring they are relevant and applicable to the prompts being tested.

## What are the limitations of PromptPex? How can users minimize the impact of PromptPex's limitations when using the system?
Limitations include:
- Dependence on the quality of initial prompt formulations, as vague or poorly defined prompts can lead to suboptimal performance.
- Variance in rule extraction accuracy, especially with complex or idiomatic language.
To minimize these impacts, users should focus on crafting clear and precise prompts, thoroughly test against a variety of input scenarios, and continually iterate on prompt designs as needed.

## What operational factors and settings allow for effective and responsible use of PromptPex?
Effective and responsible use of PromptPex requires:
- Understanding of the underlying AI models that will be used with the prompts.
- Continuous updates and adaptations to align with advancements in AI technologies.
- Active engagement with the developer community to share insights and gathered feedback for improvements.

## How do I provide feedback on PromptPex?
To provide feedback on PromptPex, users can engage through:
- GitHub repository contributions and discussions.
- Direct communication with the development team via provided point-of-contact emails.
- Participation in community forums and developer events to share insights and suggestions for improvement.

## Foundation model best practices

Users are encouraged to leverage foundation models and LLMs that support responsible AI practices, such as Azure OpenAI. These services continually update safety and responsible AI mitigations to align with best practices in AI deployment.

## What are plugins and how does PromptPex use them?
PromptPex does not incorporate plugins, focusing instead on the core functionalities of prompt generation and testing. Expansion into plugin capabilities is an area for potential future development based on user needs and feedback.

## What data can PromptPex provide to plugins? What permissions do PromptPex plugins have?
As PromptPex currently does not utilize plugins, there are no data or permission considerations applicable at this stage of development.

## What kinds of issues may arise when using PromptPex?
Issues may arise from:
- Inaccurate rule extraction, potentially leading to incorrect tests being generated.
- Developers misapplying test cases without fully understanding their prompts' nuances.
- Unexpected results due to testing models that were not part of the initial PromptPex testing suite.
To mitigate these issues, it is crucial to thoroughly educate users on the prompt crafting process and the importance of contextual understanding.  Please see the related technical paper for more details.


### Best practices for improving system performance

Users are encouraged to familiarize themselves with effective prompt authoring practices and to remain aware of the tool's capabilities and limitations to enhance system performance.

## Learn more about responsible AI

[Microsoft AI principles](https://www.microsoft.com/en-us/ai/responsible-ai)

[Microsoft responsible AI resources](https://www.microsoft.com/en-us/ai/responsible-ai-resources)

[Microsoft Azure Learning courses on responsible AI](https://docs.microsoft.com/en-us/learn/paths/responsible-ai-business-principles/)

## Learn more about PromptPex

For more information, visit the PromptPex project page on GitHub.
Read the [PromptPex technical paper](https://arxiv.org/abs/2402.00001) for more details.

## Contact us

For feedback on this document: <zorn@microsoft.com>, <jhalleux@microsoft.com>

