## self-operating ([json](./self-operating.report.json))


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


### [intent.txt](./self-operating.intent.txt)

`````txt
Take the best next action on a computer to complete a given objective.
`````


### [input_spec.txt](./self-operating.input_spec.txt)

`````txt
Objective: The input must be a string describing a task or goal to be achieved using a computer.
The objective should clearly specify an action such as opening a program, typing a message, searching for information, or completing a task.
The objective should not include any instructions related to the output formats or response examples.
The objective string must not instruct the system to repeat any previous actions consecutively.
The objective should not include any unnecessary greetings or unrelated content.
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



### [test_results.csv](./self-operating.test_results.csv)

|id|promptid|model|error|input|output|
|-|-|-|-|-|-|
|59067a2|c771fd9|gpt\-4o\-mini||Objective: Open Google Chrome to search for cat pictures|To search for cat pictures in Google Chrome, follow these steps:<br><br>1\. Open Google Chrome\.<br>2\. In the address bar, type "images\.google\.com" and press Enter\.<br>3\. In the search box, type "cat pictures" and press Enter\.<br>4\. Browse through the results to find the cat pictures you like\!<br><br>Enjoy your search\!|
|a4b4078|c771fd9|gpt\-4o\-mini||Objective: Search for recipes in Chrome|To search for recipes in Chrome, follow these steps:<br><br>1\. \*\*Open Chrome\*\*: Launch the Google Chrome browser on your device\.<br><br>2\. \*\*Go to Google\*\*: In the address bar, type \`www\.google\.com\` and press \`Enter\`\.<br><br>3\. \*\*Search for Recipes\*\*: Type in specific keywords for the type of recipe you're looking for \(e\.g\., "chocolate cake recipe," "vegan pasta recipe," or simply "easy dinner recipes"\)\. <br><br>4\. \*\*Use Filters\*\*: After the search results appear, you can filter your search by clicking on "Images," "Videos," or "News" to find different types of recipe content\.<br><br>5\. \*\*Explore Recipe Sites\*\*: You can also directly visit popular recipe websites like AllRecipes, Food Network, or BBC Good Food for curated recipes\.<br><br>6\. \*\*Bookmark or Save\*\*: If you find a recipe you like, consider bookmarking the page or saving it for future reference\.<br><br>That’s it\! Happy cooking\!|
|b5b3447|c771fd9|gpt\-4o\-mini||Objective: Click on the Spotify icon on the desktop|To click on the Spotify icon on your desktop, follow these steps:<br><br>1\. \*\*Locate the Desktop\*\*: Minimize or close any open windows to see your desktop clearly\.<br>2\. \*\*Find the Spotify Icon\*\*: Look for the green Spotify logo, which typically appears as a circle with three curved lines inside it\.<br>3\. \*\*Click the Icon\*\*: Use your mouse or trackpad to move the cursor over the Spotify icon and click it once\.<br><br>This will launch the Spotify application\. If you have any issues finding the icon, you might want to check your taskbar or search for Spotify in the Start menu\.|
|043eb86|c771fd9|gpt\-4o\-mini||Objective: Go to Google Docs and start a new document|To start a new document in Google Docs, follow these steps:<br><br>1\. Open your web browser and go to \[Google Docs\]\(https://docs\.google\.com\)\.<br>2\. Sign in with your Google account if you aren't already\.<br>3\. Once you’re on the Google Docs homepage, click on the “Blank” option or choose a template to start a new document\.<br><br>You can now begin typing in your new document\! Let me know if you need further assistance\.|
|354a19f|c771fd9|gpt\-4o\-mini||Objective: Access a bookmarked page in Chrome|To access a bookmarked page in Chrome, follow these steps:<br><br>1\. \*\*Open Chrome\*\*: Launch the Google Chrome browser on your computer or device\.<br><br>2\. \*\*Access Bookmarks\*\*:<br>   \- On a computer: Click on the three vertical dots \(menu\) in the top right corner, hover over "Bookmarks," and select "Bookmark Manager" or "Show bookmarks bar" to see your bookmarks\.<br>   \- On a mobile device: Tap on the three dots \(menu\) in the top right corner, then tap on "Bookmarks\."<br><br>3\. \*\*Select Your Bookmark\*\*: Browse through your bookmarks and click on the one you want to access\.<br><br>4\. \*\*Open the Bookmark\*\*: Clicking on the bookmark will take you directly to the webpage\.<br><br>If you have the bookmarks bar enabled, you can also quickly access bookmarks by clicking on them directly from the bar below the address bar\.|
|cab5c80|c771fd9|gpt\-4o\-mini||Objective: Select a file from the desktop|To select a file from your desktop, follow these steps:<br><br>1\. \*\*Minimize or Close Open Windows\*\*: Ensure you can see your desktop clearly\.<br>  <br>2\. \*\*Locate the File\*\*: Look for the file you want to select on your desktop\.<br><br>3\. \*\*Single Click\*\*: Click once on the file to select it\. The file should become highlighted\.<br><br>4\. \*\*Open or Use the File\*\*: <br>   \- To open it, double\-click the file\.<br>   \- To right\-click for options, click the file with the right mouse button\.<br><br>If you need help with a specific operating system, let me know\!|
|3b98670|c771fd9|gpt\-4o\-mini||Objective: Open Twitter|To open Twitter, you can follow these steps:<br><br>1\. \*\*On a Computer:\*\*<br>   \- Open a web browser \(like Chrome, Firefox, etc\.\)\.<br>   \- Type in the URL: \`www\.twitter\.com\` and press Enter\.<br><br>2\. \*\*On a Mobile Device:\*\*<br>   \- Open the Twitter app if you have it installed\. If not, you can download it from the App Store \(iOS\) or Google Play Store \(Android\)\.<br>   \- Alternatively, open a web browser and type in the URL: \`www\.twitter\.com\`\.<br><br>Once you're on Twitter, you can log in or create a new account if you don't have one yet\!|
|e4f071f|c771fd9|gpt\-4o\-mini||Objective: Launch Calculator|To launch a calculator on your device, you can follow these steps based on your operating system:<br><br>\#\#\# Windows:<br>1\. Press the \*\*Windows key\*\* on your keyboard\.<br>2\. Type "Calculator" and press \*\*Enter\*\*\.<br><br>\#\#\# macOS:<br>1\. Open \*\*Launchpad\*\* from the dock\.<br>2\. Type "Calculator" in the search bar and click on it\.<br><br>\#\#\# Linux:<br>1\. Open the terminal\.<br>2\. Type \`gnome\-calculator\` \(for GNOME\) or \`kcalc\` \(for KDE\) and press \*\*Enter\*\*\.<br><br>\#\#\# Mobile \(iOS/Android\):<br>\- Look for the Calculator app in your app drawer or home screen and tap on it\.<br><br>Let me know if you need help with anything else\!|
|3c82254|c771fd9|gpt\-4o\-mini||Objective: Find Visual Studio Code|To find Visual Studio Code on your computer, follow these steps based on your operating system:<br><br>\#\#\# For Windows:<br>1\. \*\*Start Menu\*\*: Click on the Start menu \(Windows icon\) in the bottom\-left corner\. Type "Visual Studio Code" in the search bar\. You should see it in the search results\.<br>2\. \*\*Desktop Shortcut\*\*: If you have a shortcut on your desktop, look for the Visual Studio Code icon there\.<br>3\. \*\*File Explorer\*\*: Open File Explorer and navigate to \`C:\\Program Files\\Microsoft VS Code\\Code\.exe\`\.<br><br>\#\#\# For macOS:<br>1\. \*\*Spotlight Search\*\*: Press \`Command \(⌘\) \+ Space\` to open Spotlight\. Type "Visual Studio Code" and press \`Enter\`\.<br>2\. \*\*Applications Folder\*\*: Open Finder and go to the Applications folder\. Look for "Visual Studio Code\."<br><br>\#\#\# For Linux:<br>1\. \*\*Terminal\*\*: Open a terminal and type \`code\`\. If it's installed correctly, this should launch Visual Studio Code\.<br>2\. \*\*Application Menu\*\*: Check your application menu for Visual Studio Code\. It might be listed under programming or development tools\.<br><br>If you don't have Visual Studio Code installed, you can download it from the \[official website\]\(https://code\.visualstudio\.com/\)\.|
|f82297a|c771fd9|gpt\-4o\-mini||Objective: Type a message in a chat application|Sure\! Here’s a sample message you could use in a chat application:<br><br>\-\-\-<br><br>Hey everyone\! Hope you’re all doing well\. Just wanted to check in and see how things are going\. Looking forward to catching up soon\!<br><br>\-\-\-<br><br>Feel free to modify it to suit your needs\!|
|dc6ddeb|c771fd9|gpt\-4o\-mini||Objective: Enter a password in a login field|To enter a password in a login field, follow these steps:<br><br>1\. \*\*Open the Login Page\*\*: Navigate to the website or application where you want to log in\.<br><br>2\. \*\*Locate the Login Field\*\*: Find the area labeled "Username" or "Email" and "Password\."<br><br>3\. \*\*Enter Username/Email\*\*: Click on the username or email field and type in your user ID or email address\.<br><br>4\. \*\*Enter Password\*\*: Click on the password field and type in your password\. Make sure to enter it correctly, paying attention to uppercase and lowercase letters\.<br><br>5\. \*\*Submit the Form\*\*: Once both fields are filled in, click the "Login" or "Submit" button to proceed\.<br><br>6\. \*\*Check for Errors\*\*: If there are any issues, double\-check your entries and ensure that cookies and JavaScript are enabled in your browser\.<br><br>Always ensure that you are entering your password on a secure and trusted website\.|
|feda0eb|c771fd9|gpt\-4o\-mini||Objective: Fill in an online form's email field|To fill in an online form's email field, follow these steps:<br><br>1\. \*\*Locate the Email Field\*\*: Navigate to the form and find the section designated for the email address\.<br><br>2\. \*\*Click on the Field\*\*: Click inside the email input box to activate it\.<br><br>3\. \*\*Enter Your Email\*\*: Type in your email address carefully, ensuring it's in the correct format \(e\.g\., example@domain\.com\)\.<br><br>4\. \*\*Check for Errors\*\*: Review your entry for any typos or mistakes\.<br><br>5\. \*\*Submit\*\*: Once the email is entered and verified, continue with the rest of the form or submit it as needed\.<br><br>If you need specific instructions on formatting or requirements for the email field, let me know\!|
|3330a60|c771fd9|gpt\-4o\-mini||Objective: Complete the task of sending an email|To complete the task of sending an email, follow these steps:<br><br>1\. \*\*Open Your Email Client\*\*: Launch the application or website you use for email \(like Gmail, Outlook, etc\.\)\.<br><br>2\. \*\*Compose a New Email\*\*:<br>   \- Click on the "Compose" or "New Message" button\.<br><br>3\. \*\*Fill in the Details\*\*:<br>   \- \*\*To\*\*: Enter the recipient's email address\.<br>   \- \*\*Subject\*\*: Write a brief subject line to summarize the email's purpose\.<br>   \- \*\*Body\*\*: Write your message\. Be clear and concise\.<br><br>4\. \*\*Add Attachments \(if necessary\)\*\*: If you need to send files, look for the attachment icon \(usually a paperclip\) and select the files you want to include\.<br><br>5\. \*\*Review\*\*: Check your email for any spelling or grammatical errors and ensure you've included all necessary information\.<br><br>6\. \*\*Send\*\*: Once you're satisfied, click the "Send" button\.<br><br>If you have specific content you want to include in the email, let me know, and I can help you draft it\!|
|d50231b|c771fd9|gpt\-4o\-mini||Objective: Finish creating a presentation|Sure\! To help you finish your presentation, could you please provide more details? Here are a few questions to get started:<br><br>1\. \*\*Topic\*\*: What is the main topic of your presentation?<br>2\. \*\*Audience\*\*: Who are you presenting to?<br>3\. \*\*Structure\*\*: Do you have a specific structure in mind \(e\.g\., introduction, body, conclusion\)?<br>4\. \*\*Content\*\*: What content do you already have, and what do you need to add?<br>5\. \*\*Visuals\*\*: Are there any specific visuals or graphics you want to include?<br><br>Feel free to share any other details that might help\!|
|4d52454|c771fd9|gpt\-4o\-mini||Objective: End the process of editing a document|To end the process of editing a document, you can follow these steps:<br><br>1\. \*\*Save Your Changes\*\*: If you want to keep the edits, make sure to save the document\. This can usually be done by clicking on the "Save" icon or selecting "File" gt; "Save\."<br><br>2\. \*\*Close the Document\*\*: After saving, you can close the document by clicking the "X" in the corner of the window or selecting "File" gt; "Close\."<br><br>3\. \*\*Quit the Application\*\*: If you want to exit the entire application, select "File" gt; "Exit" or close the application window\.<br><br>4\. \*\*Check for Unsaved Changes\*\*: If prompted, decide whether to save any unsaved changes before closing\.<br><br>If you need help with a specific application or platform, let me know\!|