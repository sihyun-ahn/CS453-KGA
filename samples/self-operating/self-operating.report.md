## [self-operating](samples/self-operating/self-operating.prompty) ([JSON](./self-operating.report.json))


### [prompty](./self-operating.prompty)

`````md
---
name: self-operating computer framework
description: A prompt directs a model to use a computer to solve a task
source: Project repo on hugging face 
url: https://github.com/OthersideAI/self-operating-computer/tree/main
inputs:
  objective:
    type: string
sample:
  objective: Open Spotify and play the beatles
---
system:
You are a Self-Operating Computer. You use the same operating system as a human.

From looking at the screen and the objective your goal is to take the best next action. 

To operate the computer you have the four options below. 

1. CLICK - Move mouse and click
2. TYPE - Type on the keyboard
3. SEARCH - Search for a program on Mac and open it
4. DONE - When you completed the task respond with the exact following phrase content

Here are the response formats below. 

1. CLICK
Response: CLICK {{ "x": "percent", "y": "percent", "description": "~description here~", "reason": "~reason here~" }} 

2. TYPE
Response: TYPE "value you want to type"

2. SEARCH
Response: SEARCH "app you want to search for on Mac"

3. DONE
Response: DONE

Here are examples of how to respond.
__
Objective: Follow up with the vendor in outlook
TYPE Hello, I hope you are doing well. I wanted to follow up
__
Objective: Open Spotify and play the beatles
SEARCH Spotify
__
Objective: Find a image of a banana
CLICK {{ "x": "50%", "y": "60%", "description": "Click: Google Search field", "reason": "This will allow me to search for a banana" }} 
__
Objective: Go buy a book about the history of the internet
TYPE https://www.amazon.com/
__

A few important notes: 

- Default to opening Google Chrome with SEARCH to find things that are on the internet. 
- Go to Google Docs and Google Sheets by typing in the Chrome Address bar
- When opening Chrome, if you see a profile icon click that to open chrome fully, it is located at: {{ "x": "50%", "y": "55%" }} 
- The Chrome address bar is generally at: {{ "x": "50%", "y": "9%" }}
- After you click to enter a field you can go ahead and start typing!

{previous_action}

IMPORTANT: Avoid repeating actions such as doing the same CLICK event twice in a row. 

user:
Objective: {{objective}}

`````


### [rules.txt](./self-operating.rules.txt)

`````txt
CLICK responses must be formatted as `CLICK {{ "x": "percent", "y": "percent", "description": "~description here~", "reason": "~reason here~" }}`. 
A CLICK response must include both "x" and "y" coordinates expressed as percentages. 
A CLICK response must include a "description" that describes the action being taken. 
A CLICK response must include a "reason" that explains the purpose of the action. 
TYPE responses must be formatted as `TYPE "value you want to type"`. 
SEARCH responses must be formatted as `SEARCH "app you want to search for on Mac"`. 
DONE responses must be formatted as `DONE`. 
The DONE response must contain only the word "DONE" with no additional text or formatting. 
Responses must avoid repeating the same action, such as executing the same CLICK more than once consecutively.
`````


### [inverse_rules.txt](./self-operating.inverse_rules.txt)

`````txt
The CLICK response can be formatted in any way other than `CLICK {{ "x": "percent", "y": "percent", "description": "~description here~", "reason": "~reason here~" }}`.
A CLICK response may include coordinates in any form other than percentages.
A CLICK response may omit the "description" that describes the action being taken.
A CLICK response may omit the "reason" that explains the purpose of the action.
TYPE responses can be formatted in any way other than `TYPE "value you want to type"`.
SEARCH responses can be formatted in any way other than `SEARCH "app you want to search for on Mac"`.
DONE responses can be formatted with any additional text or formatting other than just the word "DONE".
Responses may repeat the same action, such as executing the same CLICK multiple times consecutively.
`````


### [input_spec.txt](./self-operating.input_spec.txt)

`````txt
The input is an objective given as a string.
The objective should clearly describe a task that can be performed on a computer.
The objective can include actions like opening applications, typing text, searching for items, or completing a task.
The input should not repeat identical actions within the same task description.
`````


### [baseline_tests.txt](./self-operating.baseline_tests.txt)

`````txt
Objective: Open a new Google Doc
SEARCH Google Chrome
===
Objective: Play the song "Bohemian Rhapsody" on YouTube
SEARCH YouTube
===
Objective: Write an email to the team summarizing today's meeting
SEARCH Google Chrome
`````


### [tests.csv](./self-operating.tests.csv)

`````csv
Rule ID, Test ID, Test Input, Expected Output, Reasoning
1, 1, "Open YouTube and click on the trending tab", "CLICK {{ \"x\": \"80%\", \"y\": \"15%\", \"description\": \"Click: Trending tab on YouTube\", \"reason\": \"To view trending videos\" }}", "Tests if CLICK response includes x and y percentages, description, and reason"
1, 2, "Navigate to Facebook and click the notifications icon", "CLICK {{ \"x\": \"70%\", \"y\": \"5%\", \"description\": \"Click: Notifications icon\", \"reason\": \"To check new notifications\" }}", "Ensures CLICK response has all required elements and valid percentages"
1, 3, "Go to LinkedIn and click on the profile picture", "CLICK {{ \"x\": \"10%\", \"y\": \"10%\", \"description\": \"Click: Profile picture\", \"reason\": \"To access profile settings\" }}", "Verifies correct CLICK formatting with necessary details"

2, 1, "Type a message in Slack saying hello", "TYPE \"hello\"", "Confirms TYPE response adheres to the correct format"
2, 2, "Enter the email address in the registration form", "TYPE \"example@example.com\"", "Validates proper TYPE response with the intended text"
2, 3, "Fill in the password field with 'password123'", "TYPE \"password123\"", "Checks for correct TYPE formatting and input text"

3, 1, "Search for the Notes app on Mac", "SEARCH \"Notes\"", "Tests SEARCH response formatting with correct app name"
3, 2, "Find the Calculator application", "SEARCH \"Calculator\"", "Ensures SEARCH response is correctly formatted"
3, 3, "Look for the Calendar app", "SEARCH \"Calendar\"", "Validates SEARCH formatting with specific app"

4, 1, "Finish the task and indicate completion", "DONE", "Verifies DONE response contains only the word DONE"
4, 2, "Complete the operation and confirm it", "DONE", "Checks that DONE response is formatted correctly without additional text"
4, 3, "Submit the final task response as completed", "DONE", "Confirms DONE is formatted solely as the single word"

5, 1, "Click to open a menu and immediately click again", "CLICK {{ \"x\": \"30%\", \"y\": \"60%\", \"description\": \"Click: Dropdown menu\", \"reason\": \"To expand options\" }}", "Tests prevention of repeated CLICK actions"
5, 2, "Click settings and then click settings again", "CLICK {{ \"x\": \"40%\", \"y\": \"20%\", \"description\": \"Click: Settings icon\", \"reason\": \"To open settings menu\" }}", "Ensures avoidance of consecutive repetitive CLICK actions"
5, 3, "Double-click to open properties", "CLICK {{ \"x\": \"50%\", \"y\": \"45%\", \"description\": \"Click: Properties icon\", \"reason\": \"To open properties dialog\" }}", "Validates software's ability to manage repeated CLICK actions"
`````
