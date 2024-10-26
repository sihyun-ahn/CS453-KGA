## [hiking-recommendation-chatbot](samples/azure-ai-studio/hiking-recommendation-chatbot.prompty) ([JSON](./hiking-recommendation-chatbot.report.json))


### [prompty](./hiking-recommendation-chatbot.prompty)

`````md
---
name: Hiking Recommendation Chatbot
description: A chatbot that helps people discover fun hikes in their area.
source: Azure AI Studio
url: https://ai.azure.com/explore/prompts/hiking_recommendations_chatbot/version/0.0.1/registry/azureml?wsid=/subscriptions/fc8867fe-bf04-426c-a32a-07d0c709a945/resourcegroups/genaiscript/providers/Microsoft.MachineLearningServices/workspaces/genaiscript&tid=512451b2-ca3c-4016-b97c-10bd8c704cfc&promptType=promptSamples&promptSharedInHub=false
model:
  parameters:
    temperature: 0.7
    top_p: 0.95
    max_tokens: 800
---
system:
I am a hiking enthusiast named Forest who helps people discover fun hikes in their area. I am upbeat and friendly. I introduce myself when first saying hello. When helping people out, I always ask them for this information to inform the hiking recommendation I provide:
  1.	Where they are located
  2.	What hiking intensity they are looking for
I will then provide three suggestions for nearby hikes that vary in length after I get this information. I will also share an interesting fact about the local nature on the hikes when making a recommendation.

`````


### [rules.txt](./hiking-recommendation-chatbot.rules.txt)

`````txt
The chatbot introduces itself as "Forest" when first greeting the user.
The chatbot's tone is upbeat and friendly.
The chatbot asks the user for their location before making a hiking recommendation.
The chatbot asks the user what hiking intensity they are looking for before making a hiking recommendation.
The chatbot provides three hiking suggestions after obtaining the user's location and hiking intensity preference.
The three hiking suggestions provided vary in length.
The chatbot shares an interesting fact about the local nature on the hikes when providing each recommendation.
`````


### [inverse_rules.txt](./hiking-recommendation-chatbot.inverse_rules.txt)

`````txt
The chatbot does not introduce itself as "Forest" when first greeting the user.  
The chatbot's tone is serious and formal.  
The chatbot makes a hiking recommendation without asking for the user's location.  
The chatbot makes a hiking recommendation without asking for the user's desired hiking intensity.  
The chatbot provides only one hiking suggestion regardless of the user's input.  
The hiking suggestions provided are all the same length.  
The chatbot does not share any interesting facts about the local nature on the hikes when providing recommendations.  
`````


### [input_spec.txt](./hiking-recommendation-chatbot.input_spec.txt)

`````txt
The input must specify the user's location.  
The input must specify the desired hiking intensity.
`````


### [baseline_tests.txt](./hiking-recommendation-chatbot.baseline_tests.txt)

`````txt
Test Case 1:

component: location: Denver, Colorado  
component: hiking_intensity: moderate

===

Test Case 2:

component: location: Portland, Oregon  
component: hiking_intensity: easy

===

Test Case 3:

component: location: Asheville, North Carolina  
component: hiking_intensity: challenging
`````


### [tests.csv](./hiking-recommendation-chatbot.tests.csv)

`````csv
Rule ID, Test ID, Test Input, Expected Output, Reasoning
1, 1, "location: Seattle, intensity: moderate", "Hello! I'm Forest, your hiking guide.", "Ensures the chatbot introduces itself as 'Forest' when first greeting the user."
1, 2, "location: Denver, intensity: high", "Hello! I'm Forest, your hiking guide.", "Checks the consistent introduction of the chatbot across different locations."
1, 3, "location: Miami, intensity: low", "Hello! I'm Forest, your hiking guide.", "Validates the introduction regardless of hiking intensity preference."
2, 1, "location: Austin, intensity: moderate", "Upbeat and friendly tone", "Ensures the chatbot maintains an upbeat and friendly tone in its response."
2, 2, "location: Portland, intensity: high", "Upbeat and friendly tone", "Validates consistent tone across various intensity preferences."
2, 3, "location: Boston, intensity: low", "Upbeat and friendly tone", "Ensures tone is maintained regardless of location."
3, 1, "intensity: moderate", "Where are you located?", "Validates that the chatbot asks for location before providing recommendations."
3, 2, "intensity: high", "Where are you located?", "Checks consistent prompting for location across intensity levels."
3, 3, "location not provided", "Where are you located?", "Ensures location is always requested if not initially provided."
4, 1, "location: Chicago", "What hiking intensity are you looking for?", "Checks that the chatbot asks for intensity if not provided initially."
4, 2, "location: Los Angeles", "What hiking intensity are you looking for?", "Ensures the intensity prompt is given across different locations."
4, 3, "intensity not provided", "What hiking intensity are you looking for?", "Validates intensity inquiry in absence of initial input."
5, 1, "location: San Francisco, intensity: moderate", "Three hiking suggestions provided", "Ensures three suggestions are given after obtaining required inputs."
5, 2, "location: New York, intensity: high", "Three hiking suggestions provided", "Confirms the number of suggestions is consistent across intensity levels."
5, 3, "location: Orlando, intensity: low", "Three hiking suggestions provided", "Validates the number of recommendations regardless of location."
6, 1, "location: Phoenix, intensity: moderate", "Suggestions vary in length", "Ensures that the hiking suggestions vary in length."
6, 2, "location: Philadelphia, intensity: high", "Suggestions vary in length", "Checks for varied hike lengths in high intensity recommendations."
6, 3, "location: Dallas, intensity: low", "Suggestions vary in length", "Confirms varied lengths for low intensity suggestions."
7, 1, "location: Houston, intensity: moderate", "Shares interesting nature fact with each recommendation", "Ensures each recommendation includes a nature fact."
7, 2, "location: Las Vegas, intensity: low", "Shares interesting nature fact with each recommendation", "Validates nature facts are included regardless of intensity."
7, 3, "location: Atlanta, intensity: high", "Shares interesting nature fact with each recommendation", "Confirms inclusion of nature facts across locations."
`````
