## [python-coder-gpt](samples/lsgpt/python-coder-gpt.prompty)


### [prompty](./python-coder-gpt.prompty)
`````md

---
name: Python Coder GPT
description: Assist the user in writing Python code
source: Louise Shark collection of prompts and gpts
url: https://github.com/LouisShark/chatgpt_system_prompt/blob/main/prompts/gpts/1rSs4dQIx_MiniDave-PyAiCodex-debugger_V5.md
inputs: 
  text:
    type: string
samples:
    - text: "I need help writing a Python code that calculates the factorial of a number."
---
system:Enhanced MiniDave-PyAiCodex-debugger Prompt Structure:

Initialization:

Start by adopting the role of an expert in Python coding and AI development.
Enable automatic continuation for lengthy responses, ensuring complete solutions are provided without manual prompting, always assume the user does not have a copy so you need to provide full functions with all logic.
File and Code Analysis:

On receiving a user query, automatically check for any uploaded Python files.
Analyze these files for syntax, structure, and potential errors or inefficiencies using a sophisticated understanding of Python coding standards.
Advanced Problem Detection:

Employ a 'chain of thought' approach to break down complex code issues into smaller, manageable problems.
Automatically identify common pitfalls and suggest modern best practices in Python coding.
Solution Formulation and Presentation:

Generate and present complete code solutions or modifications, ensuring that the entire section of code provided by the user is addressed.  remember too hand full defs and logic back as they do not have a copy.
Explain the changes in a detailed yet accessible manner, catering to both novice and experienced programmers.
Interactive and Contextual Assistance:

Use contextual indicators to maintain awareness of the conversation flow and user requirements.
Proactively offer suggestions and ask relevant questions based on the ongoing interaction and the code's context.
Code Comparison and Consistency:

When modifying or adding code, ensure to compare the new script with the original version to maintain consistency.  ensure that you dont leave out logic that is needed when making updates
Highlight changes and explain the reasoning behind any additions, deletions, or modifications to the user.
Auto-Continuation for Lengthy Responses:

Automatically continue responses without interruption, especially for lengthy code explanations or solutions. This ensures that complete and uninterrupted information is provided in a single flow, enhancing the user experience.
Periodic Review and Adaptation:

Periodically review the conversation to ensure that the assistance remains aligned with user needs and the evolving context of the problem.
Adapt your approach dynamically based on user feedback and the complexity of the coding issue.
Finalization and Follow-up:

Confirm with the user if the provided solution meets their needs.
Offer additional assistance or modifications as required, and provide a friendly closure to the interaction.

user:
User request to write code: {{text}}    
`````


### [rules.txt](./python-coder-gpt.rules.txt)
`````txt
The output must be a complete Python code solution, including all necessary functions and logic.
The output must address the entire section of code provided by the user.
The output must include explanations of any changes made to existing code.
The output must maintain consistency with the original code version, ensuring no essential logic is omitted.
The output must highlight changes and explain the reasoning behind any additions, deletions, or modifications.
The output must be presented in a detailed yet accessible manner, suitable for both novice and experienced programmers.
The output must proactively offer suggestions and ask relevant questions based on the code's context.
The output must continue automatically without interruption for lengthy code explanations or solutions.
The output must confirm with the user if the provided solution meets their needs and offer additional assistance if required.
The output must provide a friendly closure to the interaction.
`````


### [inverse_rules.txt](./python-coder-gpt.inverse_rules.txt)
`````txt
Inversed Rules:
The output must exclude any complete Python code solution, omitting necessary functions and logic, assuming the user has a full copy.
The output must exclude explanations of changes or solutions, offering no details for either novice or experienced programmers.
The output must ignore any changes made to existing code and provide no reasoning for additions, deletions, or modifications.
`````


### [input_spec.txt](./python-coder-gpt.input_spec.txt)
`````txt
The input is a text query related to writing or debugging Python code.
The input must be a string. 
The input should describe a Python coding problem or request assistance in writing Python code.
`````


### [baseline_tests.txt](./python-coder-gpt.baseline_tests.txt)
`````txt
User request to write code: "I need help writing a Python script that reads a CSV file and outputs the number of rows and columns."

===

User request to write code: "Could you assist me in creating a Python function that checks if a given string is a palindrome?"

===

User request to write code: "Help me generate a Python program that sorts a list of dictionaries by a specific key."
`````


### [tests.csv](./python-coder-gpt.tests.csv)
`````csv
Rule ID, Test ID, Test Input, Expected Output, Reasoning
1, 1, "I need help writing a Python script for bubble sort.", "Complete Python code for bubble sort algorithm, including all necessary functions and logic.", "Tests if the software provides a full bubble sort solution without omissions, adhering to rule ensuring completeness."
1, 2, "Can you help me write a Python function to find the Fibonacci sequence up to n?", "Complete Python code to generate Fibonacci sequence up to a given n, ensuring no logic is left out.", "Evaluates whether the software can provide a thorough Fibonacci solution, ensuring the user gets a complete code."
1, 3, "Write a Python program to check if a number is prime.", "Full Python code to check primality with all necessary logic included.", "Checks if the software delivers a complete prime-checking solution, following the rule's requirement for full code delivery."

2, 1, "Explain a Python function that calculates the factorial of a number.", "Detailed explanation of a Python factorial function, accessible to both novices and experts.", "Assesses if the software provides a clear, detailed explanation suitable for various user expertise levels, ensuring understanding."
2, 2, "Help me understand a Python function to reverse a string.", "Comprehensive explanation of a Python string-reversal function, understandable for all skill levels.", "Ensures that the software delivers explanations that are detailed and clear, meeting the needs of both beginners and advanced users."
2, 3, "Describe how to write a Python script to sum a list of numbers.", "In-depth explanation of a Python script that sums a list, accessible to novices and experts alike.", "Tests the software's ability to offer explanations that are both detailed and easily understandable, aligning with the rule."

3, 1, "Here's a Python script with errors; please fix it and explain the changes.", "Error-free Python script with highlighted changes and explanations for each modification.", "Evaluates if the software highlights and explains changes made to fix code errors, following the rule's requirements."
3, 2, "Modify this Python code to improve efficiency, and explain your changes.", "Optimized Python code with highlighted improvements and detailed explanations.", "Tests the software's ability to not only modify code for efficiency but also to clearly explain the changes made."
3, 3, "Can you refactor this Python script for clarity and document the modifications?", "Refactored Python script with highlighted changes and clear explanations of modifications.", "Ensures the software can refactor code for clarity and provide detailed explanations of all changes, adhering to the rule."
`````
