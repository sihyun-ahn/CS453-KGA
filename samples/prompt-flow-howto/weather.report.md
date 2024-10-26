## [weather](samples/prompt-flow-howto/weather.prompty) ([JSON](./weather.report.json))


### [prompty](./weather.prompty)

`````md
---
name: generate_weather_detailed_description
description: A prompt that generated a detaled description for a weather forecast
source: Tutorial on using prompty in .net
url: https://devblogs.microsoft.com/dotnet/add-ai-to-your-dotnet-apps-easily-with-prompty/
inputs:
  today:
    type: string
  date:
    type: string
  forecastTemperatureC:
    type: string
sample:
  today: 2024-07-16
  date: 2024-07-17
  forecastTemperatureC: 25°C
---
system:
# System:
You are an AI assistant who generated detailed weather forecast descriptions. The detailed description is a paragraph long.
You use the full description of the date, including the weekday.
You also give a reference to the forecast compared to the current date today.
As the assistant, you generate descriptions using a funny style and even add some personal flair with appropriate emojis.

# Context
Use the following context to generated a detailed weather forecast descriptions 
- Today: {{today}}
- Date: {{date}}
- TemperatureC: {{forecastTemperatureC}}
`````


### [rules.txt](./weather.rules.txt)

`````txt
The output must be a paragraph long.
The output must include a full description of the date, including the weekday.
The output must reference the forecast date compared to the current date today.
The output must be written in a funny style.
The output must include personal flair with appropriate emojis.
The output must provide a detailed weather forecast description.
`````


### [inverse_rules.txt](./weather.inverse_rules.txt)

`````txt
The output must be a single sentence.  
The output must omit any mention of the weekday.  
The output must exclude any comparison to today's date.  
The output must be written in a serious style.  
The output must avoid personal flair or emojis.  
The output must give a brief weather forecast summary.  
`````


### [input_spec.txt](./weather.input_spec.txt)

`````txt
The input is the date for the weather forecast.
The date must be in a recognizable date format (e.g., "YYYY-MM-DD", "MM-DD-YYYY").
The date should include the weekday (e.g., "Monday", "Tuesday").
`````


### [baseline_tests.txt](./weather.baseline_tests.txt)

`````txt
today: 2024-07-16
date: 2024-07-17
forecastTemperatureC: 25°C
=== 
today: 2023-11-17
date: 2023-11-18
forecastTemperatureC: -2°C
===
today: 2023-12-31
date: 2024-01-01
forecastTemperatureC: 0°C
`````


### [tests.csv](./weather.tests.csv)

`````csv
Rule ID, Test ID, Test Input, Expected Output, Reasoning
1, 1, "Today: 2023-10-10, Date: 2023-10-12, TemperatureC: 22", "A paragraph-long funny description about the weather on Thursday, 2023-10-12 with emojis, compared to Tuesday, 2023-10-10", "Tests the software's ability to generate a detailed forecast with a comparison to today, ensuring compliance with the paragraph-length requirement."
1, 2, "Today: 2023-12-01, Date: 2023-12-03, TemperatureC: -5", "A humorous, paragraph-long weather description for Sunday, 2023-12-03 with emojis, comparing it to Friday, 2023-12-01", "Ensures the output includes a complete description and comparison in a paragraph format, testing the length and style."
1, 3, "Today: 2024-02-28, Date: 2024-03-01, TemperatureC: 15", "A paragraph-long, funny weather forecast for Friday, 2024-03-01 with emojis, compared to Wednesday, 2024-02-28", "Validates that the output remains a paragraph and includes a proper comparison between dates, testing adherence to the detailed description rule."
2, 1, "Today: 2023-09-15, Date: 2023-09-17, TemperatureC: 30", "A funny paragraph mentioning Sunday, 2023-09-17 with emojis, comparing it to Friday, 2023-09-15", "Checks if the output includes the full date description, focusing on weekday inclusion."
2, 2, "Today: 2023-11-07, Date: 2023-11-09, TemperatureC: 10", "A paragraph-long forecast for Thursday, 2023-11-09, comparing it to Tuesday, 2023-11-07, with humor and emojis", "Ensures the use of the full date in the description, emphasizing the weekday."
2, 3, "Today: 2024-01-25, Date: 2024-01-27, TemperatureC: -10", "A paragraph that humorously describes Saturday, 2024-01-27 with emojis, compared to Thursday, 2024-01-25", "Validates the inclusion of the full date description in the output, with particular attention to the weekday."
3, 1, "Today: 2023-06-20, Date: 2023-06-22, TemperatureC: 25", "A paragraph that humorously describes the weather on Thursday, 2023-06-22 with emojis, compared to Tuesday, 2023-06-20", "Tests for the comparison between the forecast and the current date today, ensuring it is present and accurate."
3, 2, "Today: 2023-08-05, Date: 2023-08-07, TemperatureC: 33", "A paragraph-long humorous forecast for Monday, 2023-08-07 with emojis, compared to Saturday, 2023-08-05", "Checks if the output references the forecast in relation to today, ensuring compliance with comparative analysis."
3, 3, "Today: 2023-04-10, Date: 2023-04-12, TemperatureC: 18", "A paragraph describing Wednesday, 2023-04-12 with emojis, humorously compared to Monday, 2023-04-10", "Ensures the forecast comparison to today's date is featured in the paragraph, testing the requirement for contextual relevance."
`````
