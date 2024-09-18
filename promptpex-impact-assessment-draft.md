# Impact Assessment for PromptPex Project

## Section 1: Project Information

### Project profile

**1.1** Complete the project information below.

Project Name: PromptPex  
Group: Microsoft Research  
Point of contact: Peli de Halleux (jhalleux@microsoft.com), Ben Zorn (zorn@microsoft.com)  
Authors: Peli de Halleux, Ben Zorn, Reshabh Sharma (Summer 2024 intern) 
Contributors with affiliations: Reshabh Sharma, University of Washington  

### Project components and timeline

**1.2** The PromptPex project is designed to assist developers in creating and maintaining effective prompts for AI models by treating prompts as functions and generating test inputs for unit testing. This involves automatically extracting rules from natural language prompts and generating test cases to assess prompt performance on various models. The project has developed a browser-hosted user interface and plans to expand its capabilities based on user feedback and testing outcomes. The team aims to enhance PromptPex's ability to handle diverse AI models and intends to showcase its utility at upcoming AI and developer conferences. The timeline includes further research collaborations and potential partnerships to integrate PromptPex into broader development workflows.

### Supporting material

**1.3** Supplementary information about the PromptPex project can be found in the following links:

- GitHub repository: [PromptPex](https://github.com/microsoft/promptpex)

### Project goal and overview

**1.4** The goal of the PromptPex project is to simplify the process of creating effective AI prompts by providing automated tools for rule extraction and test case generation. This aims to improve the reliability and performance of AI prompts across different models, making them more accessible and easier to manage for developers. By fostering an environment where prompt quality can be consistently evaluated and improved, PromptPex seeks to enhance the integration of AI capabilities into software projects.

### Relationship to products

**1.5** PromptPex has the potential to integrate with Microsoft’s suite of development tools, offering developers a seamless way to enhance AI capabilities within their applications. While there are no current plans for direct product integration, PromptPex could serve as a valuable tool for teams working with AI models, providing a structured approach to prompt management. Future collaborations with product teams may explore embedding PromptPex functionalities into existing Microsoft development platforms.

## Section 2: Sharing

### What?

**2.1** At this milestone, the following assets are planned to be shared:

- Demo
- Source code
- Project webpage
- User documentation

### Who?

**2.2** The intended recipients of the shared assets are:

- Open Source/Public
- Developers and AI researchers
- Internal product teams

### Why?

**2.3** The goals for sharing these assets are to:

- Engage with the developer community to enhance the tool through collaboration
- Demonstrate Microsoft’s commitment to innovative AI solutions
- Gather feedback to refine and improve PromptPex’s capabilities

## Section 3: Data information and considerations

### Data documentation

**3.1** PromptPex dues not include any data release. No data was used to train PromptPex.

### Data reflections

**3.2** The data used in PromptPex consists primarily of natural language prompts and model outputs. These data sources are critical for the tool’s ability to generate rules and test cases. While the data used does not inherently contain sensitive information, it is important to consider how variations in language and context could impact the effectiveness of the extracted rules. Ensuring that a diverse range of prompts and scenarios are tested will help mitigate biases and enhance the tool’s robustness.

## Section 4: Project impacts and limitations

### Impacts of sharing

**4.1** Sharing PromptPex is expected to significantly impact the field of AI development by providing a standardized approach for evaluating and refining prompts across models. By facilitating improved prompt reliability, PromptPex can contribute to more consistent AI model performance, benefiting both developers and end-users. Additionally, open-source sharing will encourage community contributions and foster innovation in prompt engineering.

### Known limitations

**4.2** Current limitations of the system include its reliance on the quality of initial prompts and the potential for variances in rule extraction accuracy across different languages or contexts. The effectiveness of PromptPex is also dependent on the models it supports; as such, continuous updates and adaptations are necessary to align with evolving AI technologies and user needs.

### Risks of sharing

**4.3** If a malicious entity were to misuse PromptPex, they could potentially develop prompts designed to manipulate AI outputs unethically. The project documentation includes best practices and guidelines to encourage responsible use, minimizing the risk of such misuse.

**4.4** Unintentional misuse could arise if developers over-rely on generated test cases without understanding the nuances of their specific prompts. Educating users on the tool’s capabilities and limitations is crucial to preventing such scenarios.

### Mitigations for immediate risks

**4.5** Mitigations for risks identified include:

- Ethics and Responsible AI statements in user documentation
- Providing clear guidelines on appropriate prompt development and testing
- Encouraging community feedback and iterative improvements

## Section 5: Thinking into the future

### Possible real-world uses

**5.1** Real-world uses of PromptPex could include aiding developers in creating more efficient AI-driven applications, supporting educational tools for teaching AI development, and enhancing AI research by providing a framework for prompt evaluation and improvement.

### Possible real-world misuses

**5.2** Potential misuses could involve the creation of prompts that exploit model biases or produce misleading outputs. By emphasizing transparency and ethical considerations, these risks can be mitigated.

### Stakeholders

**5.3** Stakeholders include developers, AI researchers, educators, and end-users of AI-driven applications.

### Intended Uses

**5.4** The intended use cases for PromptPex involve improving prompt quality in AI development, thereby enhancing model outputs and contributing to more reliable AI applications.

### Harms and mitigations

**5.7** Potential harms include over-reliance on automated testing and the propagation of biases in prompts. Providing comprehensive documentation and fostering a community of practice around responsible AI use are key mitigations.

PromptPex uses LLMs in the creation of its rules and test cases.  To
reduce the potential for harms from the content generated in 
PromptPex, we recommend only using AI models that support Responsible
AI practices as described below.

#### Foundation model best practices

We strongly encourage PromptPex users to use foundation models and
LLMs that support robust Responsible AI mitigations, such as the Azure
Open AI (AOAI) services. Such services continually update the safety and
RAI mitigations to track our up-to-date understanding on how to deploy
and use foundation models most responsibly. Here are resources to help
understand and use best practices when employing foundations models 
for scripts and applications:

- [Blog post on responsible AI features in AOAI that were presented at Ignite 2023](https://techcommunity.microsoft.com/t5/ai-azure-ai-services-blog/announcing-new-ai-safety-amp-responsible-ai-features-in-azure/ba-p/3983686)
- [Transparency note for Azure OpenAI Service](https://learn.microsoft.com/en-us/legal/cognitive-services/openai/transparency-note?tabs=text)
- [Microsoft Office of Responsible AI (ORA) Best Practices on using AOAI models](https://learn.microsoft.com/en-us/legal/cognitive-services/openai/overview)

## Learn more about responsible AI

[Microsoft AI
principles](https://www.microsoft.com/en-us/ai/responsible-ai)

[Microsoft responsible AI
resources](https://www.microsoft.com/en-us/ai/responsible-ai-resources)

[Microsoft Azure Learning courses on responsible
AI](https://docs.microsoft.com/en-us/learn/paths/responsible-ai-business-principles/)

