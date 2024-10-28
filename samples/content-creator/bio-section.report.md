## [bio-section](samples/content-creator/bio-section.prompty) ([json](./bio-section.report.json))


### [prompty](./bio-section.prompty)

`````md
---
name: "Github Bio Section Generator"
description: "Generate a Github bio section based on user's skills and interests"
source: Prompty samples from repository
url: https://aminblm.github.io/awesome-chatgpt-content-creation-prompts/#act-as-a-content-creation-prompt-generator 
---
I want you to act as a Github bio section generator, providing me with unique, original, funny and compelling bio for my Github profile. I will give you a list of keywords and phrases that describe my skills and experience. Please generate a bio that is professional and highlights my strengths, while also being engaging and easy to read. Keep in mind that this bio will be used as part of my Github profile, so it should be concise and to the point. Give me three different 15-30 words bio options for my Github profile, my interests are: ChatGPT, Content Creation, Automation, Web Development. (Give me bio only)

`````


### [rules.txt](./bio-section.rules.txt)

`````txt
The output must consist of three distinct bio options.  
Each bio option must be unique.  
Each bio option must be original.  
Each bio option must be funny.  
Each bio option must be compelling.  
Each bio option must be professional.  
Each bio option must highlight the user's strengths.  
Each bio option must be engaging.  
Each bio option must be easy to read.  
Each bio option must be concise.  
Each bio option must be to the point.  
Each bio option must be between 15 to 30 words.  
The bio options must relate to the interests: ChatGPT, Content Creation, Automation, Web Development.
`````


### [inverse_rules.txt](./bio-section.inverse_rules.txt)

`````txt
The output must consist of less than three bio options.  
At least one bio option must be repeated.  
No bio option needs to be original.  
At least one bio option should be serious.  
At least one bio option should be boring.  
At least one bio option can be informal.  
Each bio option may highlight the user's weaknesses.  
At least one bio option can be dull.  
At least one bio option can be complex.  
Each bio option can be verbose.  
At least one bio option can be vague.  
Each bio option must be fewer than 15 or more than 30 words.  
The bio options must not relate to ChatGPT, Content Creation, Automation, or Web Development.
`````


### [input_spec.txt](./bio-section.input_spec.txt)

`````txt
The input is a list of keywords and phrases.
Each keyword or phrase should describe skills or experience related to the user's professional profile.
The input must include at least one keyword or phrase.
Keywords or phrases should be concise, relevant, and clearly related to the user's interests.
`````


### [baseline_tests.txt](./bio-section.baseline_tests.txt)

`````txt
interest: ChatGPT, Content Creation, Automation, Web Development

===

interest: Machine Learning, Data Science, Open Source, Community Building

===

interest: DevOps, Cloud Computing, Kubernetes, Continuous Integration
`````


### [tests.csv](./bio-section.tests.csv)

|Rule ID|Test ID|Test Input|Expected Output|Reasoning|
|-|-|-|-|-|
|1|1|ChatGPT, Automation, Web Development|Expected output includes three distinct bio options using all input interests|Tests if the software produces three distinct bios, covering all interests\.|
|1|2|Content Creation, ChatGPT, Web Development|Expected output includes three distinct bio options that incorporate each provided interest|Ensures each bio is distinct and utilizes all specified interests\.|
|1|3|Automation, Web Development, Content Creation|Expected output consists of three distinct bio options, each focusing on one or more interests|Validates the generation of three distinct bios covering different aspects\.|
|2|1|ChatGPT, Content Creation|Expected output includes unique bios for each input with no repetitions|Ensures uniqueness in the generated bio options\.|
|2|2|Automation|Expected output is three unique bio options related to Automation|Tests the uniqueness of each bio in a single\-interest scenario\.|
|2|3|Web Development, ChatGPT|Expected output consists of three unique bios tailored to the given interests|Verifies that each bio is unique and aligns with the interests\.|
|3|1|Content Creation, Automation|Each bio option should be original and not borrowed|Confirms originality by ensuring no reuse of existing phrases\.|
|3|2|Web Development, ChatGPT|Expected output should show originality in describing the user's skills|Validates the originality by checking for novel expressions\.|
|3|3|Automation|Output includes three original bios reflecting the automation expertise|Tests originality with a single\-interest input, ensuring creative expression\.|
|4|1|ChatGPT, Automation, Content Creation|Each bio contains humor, engagingly presenting skills|Tests the implementation of humor in bio descriptions\.|
|4|2|Web Development|Expected output is three funny bios focusing on web development|Ensures the bios incorporate humor relevant to the interest\.|
|4|3|Content Creation, ChatGPT|Output consists of humorous yet relevant bios|Checks the humorous portrayal of content creation and ChatGPT skills\.|
|5|1|Automation, Web Development|Each bio should be compelling and attract attention|Assesses if bios effectively captivate the reader’s interest\.|
|5|2|ChatGPT|Output includes three compelling bios centered on ChatGPT expertise|Confirms the compelling nature of bios with single\-interest input\.|
|5|3|Content Creation, Web Development|Expected bios should be compelling and focus on specified skills|Validates that bios engage readers effectively across multiple interests\.|
|6|1|Content Creation, Automation|Each bio option reflects professionalism in tone and content|Tests professionalism by assessing the tone and structure of bios\.|
|6|2|Web Development, ChatGPT|Output consists of professional bios highlighting the expertise|Ensures professional language and presentation in bios\.|
|6|3|Automation|Each bio should maintain a professional standard|Confirms professionalism with a focus on automation expertise\.|
|7|1|Web Development, Content Creation|Bios emphasize the user’s strengths in the given areas|Verifies that bios highlight key strengths effectively\.|
|7|2|ChatGPT, Automation|Each bio underscores strengths in these fields|Checks the emphasis on strengths related to ChatGPT and automation\.|
|7|3|Content Creation|Output includes bios that showcase strengths in content creation|Assesses if bios effectively highlight content creation strengths\.|
|8|1|Content Creation, Automation|Bios should be engaging and hold the reader's attention|Tests the engaging quality of bios in presenting skills\.|
|8|2|Web Development|Each bio engages the reader while focusing on web development|Ensures reader engagement with single\-interest content\.|
|8|3|ChatGPT, Content Creation|Output consists of engaging and relevant bios|Validates engagement with combined interests\.|
|9|1|Automation, Web Development|Each bio is easy to read and understand|Tests readability and clarity in bio creation\.|
|9|2|ChatGPT|Output includes easy\-to\-read bios about ChatGPT|Ensures simplicity and clarity in single\-interest bios\.|
|9|3|Content Creation, Automation|Bios should maintain clarity and ease of reading|Confirms readability with multiple interests\.|
|10|1|Web Development, ChatGPT|Each bio is concise and to the point|Tests conciseness and focus in bio creation\.|
|10|2|Content Creation|Output includes concise bios centering on content creation|Ensures brevity in single\-interest bios\.|
|10|3|Automation|Bios should be concise, focusing on automation|Confirms to\-the\-point expression in automation bios\.|
|11|1|ChatGPT, Automation|Bios should be within 15 to 30 words|Tests word count adherence for all interest combinations\.|
|11|2|Web Development|Output includes bios with required word length|Ensures compliance with word count limits\.|
|11|3|Content Creation|Each bio remains within 15 to 30 words|Validates word count in content creation bios\.|