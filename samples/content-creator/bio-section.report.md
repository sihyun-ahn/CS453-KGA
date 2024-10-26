## [bio-section](samples/content-creator/bio-section.prompty) ([JSON](./bio-section.report.json))


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
The input is a list of keywords and phrases describing skills and experience.
The input must include keywords related to skills.
The input must include phrases describing experience or interests.
The input should not exceed a reasonable number of keywords and phrases to ensure conciseness.
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

`````csv
Rule ID, Test ID, Test Input, Expected Output, Reasoning
1, 1, "keywords: ChatGPT, Content Creation, Automation, Web Development; phrases: skilled in web automation, passionate about AI", "Three distinct bio options", "Ensures software generates three separate bios, testing distinctness requirement"
1, 2, "keywords: AI, Blogging, Coding, Development; phrases: experienced in automation and content strategy", "Three distinct bio options", "Verifies the generation of three different bios from varied skill sets"
1, 3, "keywords: ChatGPT, Widgets, Scripting, Web Design; phrases: loves automating tasks and crafting web experiences", "Three distinct bio options", "Confirms distinctness with diverse but relevant inputs"
2, 1, "keywords: ChatGPT, Content Creation, Automation, Web Development; phrases: adept in AI-driven web solutions", "Unique bio options", "Checks uniqueness by using specific skills and experiences"
2, 2, "keywords: Python, Writing, Tech, UI/UX; phrases: enjoys creating automated systems and engaging content", "Unique bio options", "Tests for unique outputs with different keyword combinations"
2, 3, "keywords: JavaScript, Blogging, Robotics, Design; phrases: skilled in robotic process automation", "Unique bio options", "Ensures unique bios with related but different technical interests"
3, 1, "keywords: ChatGPT, Content Creation, Automation, Web Development; phrases: AI enthusiast and coder", "Original bio options", "Challenges originality by requesting bios with specific wording"
3, 2, "keywords: SEO, Programming, Gadgets, Frontend; phrases: passionate about tech and web innovation", "Original bio options", "Checks originality with overlapping but distinct expertise areas"
3, 3, "keywords: C++, Writing, AI, Backend; phrases: fascinated by intelligent systems", "Original bio options", "Tests originality with a focus on backend and AI development"
4, 1, "keywords: ChatGPT, Content Creation, Automation, Web Development; phrases: humor-infused coder", "Funny bio options", "Ensures bios incorporate humor while reflecting skills"
4, 2, "keywords: Python, Creative Writing, Data Science, HTML; phrases: finds joy in debugging and dad jokes", "Funny bio options", "Tests humor integration with technical and creative skills"
4, 3, "keywords: Java, Illustration, Machine Learning, CSS; phrases: blends art and code with a smile", "Funny bio options", "Verifies humor presence with artistic and coding interests"
5, 1, "keywords: ChatGPT, Content Creation, Automation, Web Development; phrases: compelling storyteller in tech", "Compelling bio options", "Assesses bios' ability to captivate the audience with tech narratives"
5, 2, "keywords: PHP, Editing, Analytics, Responsive Design; phrases: compelling narratives in digital transformation", "Compelling bio options", "Tests compelling nature with emphasis on digital storytelling"
5, 3, "keywords: Ruby, Filmmaking, Algorithms, Graphic Design; phrases: weaves compelling tech solutions", "Compelling bio options", "Ensures bios are compelling by combining tech with creative fields"
6, 1, "keywords: ChatGPT, Content Creation, Automation, Web Development; phrases: professional in digital crafting", "Professional bio options", "Confirms professionalism in bios while highlighting key areas"
6, 2, "keywords: SQL, Journalism, Cybersecurity, UX; phrases: professional networker in tech", "Professional bio options", "Tests professionalism with a blend of tech and communication skills"
6, 3, "keywords: Swift, Photography, Blockchain, Branding; phrases: professional excellence in tech and design", "Professional bio options", "Ensures professional tone while blending technology and creativity"
7, 1, "keywords: ChatGPT, Content Creation, Automation, Web Development; phrases: strengths in innovative tech solutions", "Bios highlighting strengths", "Checks if bios effectively highlight user's key strengths"
7, 2, "keywords: Linux, Scriptwriting, Quantum Computing, Marketing; phrases: strengths in cutting-edge technology", "Bios highlighting strengths", "Tests the highlighting of strengths with diverse tech skills"
7, 3, "keywords: Kotlin, Content Strategy, Internet of Things, Visual Arts; phrases: showcases strengths in digital artistry", "Bios highlighting strengths", "Ensures bios accentuate strengths by blending tech and art"
8, 1, "keywords: ChatGPT, Content Creation, Automation, Web Development; phrases: engaging storyteller in tech", "Engaging bio options", "Confirms bios maintain engagement while reflecting tech interests"
8, 2, "keywords: Rust, Blogging, VR, Branding; phrases: engaging narratives in virtual reality", "Engaging bio options", "Tests engagement by incorporating rapidly evolving tech topics"
8, 3, "keywords: Go, Public Speaking, AI Ethics, E-commerce; phrases: engaging in ethical tech discussions", "Engaging bio options", "Ensures engaging bios with focus on ethics and commerce"
9, 1, "keywords: ChatGPT, Content Creation, Automation, Web Development; phrases: easy-to-read tech bios", "Easy-to-read bio options", "Ensures readability by simplifying complex tech concepts"
9, 2, "keywords: Perl, Screenwriting, AI Research, Product Design; phrases: easy-reading blend of tech and art", "Easy-to-read bio options", "Tests readability with a combination of tech and creative writing"
9, 3, "keywords: Visual Basic, Editing, Cloud Computing, Advertising; phrases: clear and concise tech narratives", "Easy-to-read bio options", "Confirms clear language use in complex tech fields"
10, 1, "keywords: ChatGPT, Content Creation, Automation, Web Development; phrases: concise web developer", "Concise bio options", "Tests conciseness by requiring precise language and clear messaging"
10, 2, "keywords: Haskell, Video Editing, Big Data, SEO; phrases: concise tech insights", "Concise bio options", "Ensures bios are succinct yet informative about diverse tech interests"
10, 3, "keywords: COBOL, Photography, Deep Learning, Social Media; phrases: concise descriptions of tech prowess", "Concise bio options", "Verifies conciseness in conveying sophisticated tech expertise"
11, 1, "keywords: ChatGPT, Content Creation, Automation, Web Development; phrases: direct tech innovator", "To-the-point bio options", "Confirms direct language use while showcasing tech innovation"
11, 2, "keywords: Shell, Media Production, Robotics, User Experience; phrases: direct and clear tech vision", "To-the-point bio options", "Tests directness by combining tech complexity with clear messaging"
11, 3, "keywords: Scala, Editing, Quantum Algorithms, Market Trends; phrases: direct tech strategies", "To-the-point bio options", "Ensures bios are straightforward in explaining intricate tech strategies"
12, 1, "keywords: ChatGPT, Content Creation, Automation, Web Development; phrases: bios within 15-30 words", "Bio options within 15-30 words", "Checks word count adherence to stay concise yet complete"
12, 2, "keywords: Dart, Audio Production, Neuromorphic Computing, Branding; phrases: bio options limited to 30 words", "Bio options within 15-30 words", "Tests word count constraint with varied tech domains"
12, 3, "keywords: Assembly, Storytelling, Cloud Security, Digital Marketing; phrases: precise bio options", "Bio options within 15-30 words", "Confirms word count rule while diversifying tech and marketing skills"
13, 1, "keywords: ChatGPT, Content Creation, Automation, Web Development; phrases: focus on AI and web-related interests", "Bios relate to interests", "Ensures bios reflect the specified areas of interest effectively"
13, 2, "keywords: HTML, Creative Strategy, Machine Learning, Digital Art; phrases: centered around digital creativity", "Bios relate to interests", "Tests the relevance to interests while expanding creativity"
13, 3, "keywords: CSS, Storytelling, AI Development, Branding; phrases: highlights AI and creative storytelling", "Bios relate to interests", "Verifies all bios connect to the specified interests effectively"
`````
