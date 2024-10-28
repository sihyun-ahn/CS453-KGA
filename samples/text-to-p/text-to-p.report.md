## [text-to-p](samples/text-to-p/text-to-p.prompty) ([json](./text-to-p.report.json))


### [prompty](./text-to-p.prompty)

`````md
---
name: "Text to P"
description: "Wrap each sentence in a paragraph tag"
source: "GhostWriter: Augmenting Collaborative Human-AI Writing Experiences Through Personalization and Agency"
url: https://arxiv.org/abs/2402.08855.
inputs:
    text:
        type: "string"
---
system:
You are a web developer who is formatting a paragraph of text as HTML.
First, please split the paragraph into individual sentences and wrap each sentence with a <p> tag.
**Your answer should have at least three <p> tags.**
Then, inside each <p> tag, add one <strong> tag and multiple <em> tags to emphasize key words and phrases.
user:
{{text}}
`````


### [rules.txt](./text-to-p.rules.txt)

`````txt
The output must contain at least three `<p>` tags. 
Each sentence from the original paragraph must be wrapped in a separate `<p>` tag.
Inside each `<p>` tag, there must be one `<strong>` tag.
Inside each `<p>` tag, there must be multiple `<em>` tags.
The `<p>`, `<strong>`, and `<em>` tags must be correctly formatted as HTML.
`````


### [inverse_rules.txt](./text-to-p.inverse_rules.txt)

`````txt
Each sentence in the output must be unwrapped and not enclosed in any tags.
The output must contain fewer than three <p> tags.
Within each <p> tag, there must be no <strong> or <em> tags to emphasize key words and phrases.
`````


### [input_spec.txt](./text-to-p.input_spec.txt)

`````txt
The input is a paragraph of text.
The input must contain at least three sentences.
Each sentence should be a complete thought.
Sentences should be discernible through punctuation like periods, exclamation marks, or question marks.
The input may contain words or phrases that can be emphasized.
`````


### [baseline_tests.txt](./text-to-p.baseline_tests.txt)

`````txt
text: "Artificial intelligence is transforming the world. This transformation spans across various sectors. AI helps in improving efficiencies and creating new opportunities for innovation."

===
text: "The quick brown fox jumps over the lazy dog. This sentence is often used to test typing skills. Typing skills are important in the digital age."

===
text: "Climate change poses a significant threat to our planet. Measures to combat climate change are critical. Everyone can contribute to reducing their carbon footprint."
`````


### [tests.csv](./text-to-p.tests.csv)

|Rule ID|Test ID|Test Input|Expected Output|Reasoning|
|-|-|-|-|-|
|1|1|The sun rises in the east\. The moon glows at night\. The stars twinkle brightly\.|lt;pgt;The sun rises in the east\. lt;stronggt;sunlt;/stronggt; rises in the lt;emgt;eastlt;/emgt;\.lt;/pgt;lt;pgt;The moon glows at night\. lt;stronggt;moonlt;/stronggt; glows at lt;emgt;nightlt;/emgt;\.lt;/pgt;lt;pgt;The stars twinkle brightly\. lt;stronggt;starslt;/stronggt; twinkle lt;emgt;brightlylt;/emgt;\.lt;/pgt;|Ensures that each sentence is wrapped in a separate lt;pgt; tag with correct formatting\.|
|1|2|Rain is soothing\. Thunder roars\. Lightning strikes\.|lt;pgt;Rain is soothing\. lt;stronggt;Rainlt;/stronggt; is lt;emgt;soothinglt;/emgt;\.lt;/pgt;lt;pgt;Thunder roars\. lt;stronggt;Thunderlt;/stronggt; lt;emgt;roarslt;/emgt;\.lt;/pgt;lt;pgt;Lightning strikes\. lt;stronggt;Lightninglt;/stronggt; lt;emgt;strikeslt;/emgt;\.lt;/pgt;|Validates that each sentence is separated and lt;stronggt; and lt;emgt; tags are present in each lt;pgt;\.|
|1|3|Dogs bark\. Cats meow\. Birds sing\.|lt;pgt;Dogs bark\. lt;stronggt;Dogslt;/stronggt; lt;emgt;barklt;/emgt;\.lt;/pgt;lt;pgt;Cats meow\. lt;stronggt;Catslt;/stronggt; lt;emgt;meowlt;/emgt;\.lt;/pgt;lt;pgt;Birds sing\. lt;stronggt;Birdslt;/stronggt; lt;emgt;singlt;/emgt;\.lt;/pgt;|Tests that the software correctly formats sentences with required tags\.|
|2|1|Apples are red\. Bananas are yellow\. Grapes are green\.|lt;pgt;Apples are red\. lt;stronggt;Appleslt;/stronggt; are lt;emgt;redlt;/emgt;\.lt;/pgt;lt;pgt;Bananas are yellow\. lt;stronggt;Bananaslt;/stronggt; are lt;emgt;yellowlt;/emgt;\.lt;/pgt;lt;pgt;Grapes are green\. lt;stronggt;Grapeslt;/stronggt; are lt;emgt;greenlt;/emgt;\.lt;/pgt;|Checks that each sentence is individually wrapped in lt;pgt; tags\.|
|2|2|Coffee is hot\. Tea is warm\. Juice is cold\.|lt;pgt;Coffee is hot\. lt;stronggt;Coffeelt;/stronggt; is lt;emgt;hotlt;/emgt;\.lt;/pgt;lt;pgt;Tea is warm\. lt;stronggt;Tealt;/stronggt; is lt;emgt;warmlt;/emgt;\.lt;/pgt;lt;pgt;Juice is cold\. lt;stronggt;Juicelt;/stronggt; is lt;emgt;coldlt;/emgt;\.lt;/pgt;|Verifies separation of sentences into distinct lt;pgt; tags\.|
|2|3|Mountains are tall\. Rivers flow\. Oceans are vast\.|lt;pgt;Mountains are tall\. lt;stronggt;Mountainslt;/stronggt; are lt;emgt;talllt;/emgt;\.lt;/pgt;lt;pgt;Rivers flow\. lt;stronggt;Riverslt;/stronggt; lt;emgt;flowlt;/emgt;\.lt;/pgt;lt;pgt;Oceans are vast\. lt;stronggt;Oceanslt;/stronggt; are lt;emgt;vastlt;/emgt;\.lt;/pgt;|Ensures each sentence is wrapped in a lt;pgt; tag\.|
|3|1|The sky is clear\. The grass is green\. Flowers bloom\.|lt;pgt;The sky is clear\. lt;stronggt;skylt;/stronggt; is lt;emgt;clearlt;/emgt;\.lt;/pgt;lt;pgt;The grass is green\. lt;stronggt;grasslt;/stronggt; is lt;emgt;greenlt;/emgt;\.lt;/pgt;lt;pgt;Flowers bloom\. lt;stronggt;Flowerslt;/stronggt; lt;emgt;bloomlt;/emgt;\.lt;/pgt;|Tests for presence of lt;stronggt; tags in each lt;pgt;\.|
|3|2|Books are educational\. Movies entertain\. Music soothes\.|lt;pgt;Books are educational\. lt;stronggt;Bookslt;/stronggt; are lt;emgt;educationallt;/emgt;\.lt;/pgt;lt;pgt;Movies entertain\. lt;stronggt;Movieslt;/stronggt; lt;emgt;entertainlt;/emgt;\.lt;/pgt;lt;pgt;Music soothes\. lt;stronggt;Musiclt;/stronggt; lt;emgt;sootheslt;/emgt;\.lt;/pgt;|Checks for a single lt;stronggt; tag in each lt;pgt;\.|
|3|3|Water is essential\. Air is vital\. Earth is home\.|lt;pgt;Water is essential\. lt;stronggt;Waterlt;/stronggt; is lt;emgt;essentiallt;/emgt;\.lt;/pgt;lt;pgt;Air is vital\. lt;stronggt;Airlt;/stronggt; is lt;emgt;vitallt;/emgt;\.lt;/pgt;lt;pgt;Earth is home\. lt;stronggt;Earthlt;/stronggt; is lt;emgt;homelt;/emgt;\.lt;/pgt;|Verifies correct placement of lt;stronggt; tag\.|
|4|1|The city never sleeps\. Life is bustling\. Dreams are made\.|lt;pgt;The city never sleeps\. lt;stronggt;citylt;/stronggt; never lt;emgt;sleepslt;/emgt;\.lt;/pgt;lt;pgt;Life is bustling\. lt;stronggt;Lifelt;/stronggt; is lt;emgt;bustlinglt;/emgt;\.lt;/pgt;lt;pgt;Dreams are made\. lt;stronggt;Dreamslt;/stronggt; are lt;emgt;madelt;/emgt;\.lt;/pgt;|Tests for multiple lt;emgt; tags in each lt;pgt;\.|
|4|2|Technology advances\. Innovations grow\. Ideas evolve\.|lt;pgt;Technology advances\. lt;stronggt;Technologylt;/stronggt; lt;emgt;advanceslt;/emgt;\.lt;/pgt;lt;pgt;Innovations grow\. lt;stronggt;Innovationslt;/stronggt; lt;emgt;growlt;/emgt;\.lt;/pgt;lt;pgt;Ideas evolve\. lt;stronggt;Ideaslt;/stronggt; lt;emgt;evolvelt;/emgt;\.lt;/pgt;|Ensures multiple lt;emgt; tags per lt;pgt;\.|
|4|3|Art inspires\. Science discovers\. Literature enlightens\.|lt;pgt;Art inspires\. lt;stronggt;Artlt;/stronggt; lt;emgt;inspireslt;/emgt;\.lt;/pgt;lt;pgt;Science discovers\. lt;stronggt;Sciencelt;/stronggt; lt;emgt;discoverslt;/emgt;\.lt;/pgt;lt;pgt;Literature enlightens\. lt;stronggt;Literaturelt;/stronggt; lt;emgt;enlightenslt;/emgt;\.lt;/pgt;|Validates presence of multiple lt;emgt; tags\.|
|5|1|Happiness is a choice\. Joy is contagious\. Love is powerful\.|lt;pgt;Happiness is a choice\. lt;stronggt;Happinesslt;/stronggt; is a lt;emgt;choicelt;/emgt;\.lt;/pgt;lt;pgt;Joy is contagious\. lt;stronggt;Joylt;/stronggt; is lt;emgt;contagiouslt;/emgt;\.lt;/pgt;lt;pgt;Love is powerful\. lt;stronggt;Lovelt;/stronggt; is lt;emgt;powerfullt;/emgt;\.lt;/pgt;|Checks HTML formatting correctness\.|
|5|2|Books tell stories\. Art creates emotions\. Music evokes memories\.|lt;pgt;Books tell stories\. lt;stronggt;Bookslt;/stronggt; tell lt;emgt;storieslt;/emgt;\.lt;/pgt;lt;pgt;Art creates emotions\. lt;stronggt;Artlt;/stronggt; creates lt;emgt;emotionslt;/emgt;\.lt;/pgt;lt;pgt;Music evokes memories\. lt;stronggt;Musiclt;/stronggt; evokes lt;emgt;memorieslt;/emgt;\.lt;/pgt;|Ensures HTML tags are correctly formatted\.|
|5|3|Winter is cold\. Spring is fresh\. Summer is warm\.|lt;pgt;Winter is cold\. lt;stronggt;Winterlt;/stronggt; is lt;emgt;coldlt;/emgt;\.lt;/pgt;lt;pgt;Spring is fresh\. lt;stronggt;Springlt;/stronggt; is lt;emgt;freshlt;/emgt;\.lt;/pgt;lt;pgt;Summer is warm\. lt;stronggt;Summerlt;/stronggt; is lt;emgt;warmlt;/emgt;\.lt;/pgt;|Validates correct HTML syntax\.|
|6|1|The sun rises\. The moon glows\.|lt;pgt;The sun rises\. lt;stronggt;sunlt;/stronggt; lt;emgt;riseslt;/emgt;\.lt;/pgt;lt;pgt;The moon glows\. lt;stronggt;moonlt;/stronggt; lt;emgt;glowslt;/emgt;\.lt;/pgt;|Tests for fewer than three lt;pgt; tags\.|
|6|2|Birds sing\. Dogs bark\.|lt;pgt;Birds sing\. lt;stronggt;Birdslt;/stronggt; lt;emgt;singlt;/emgt;\.lt;/pgt;lt;pgt;Dogs bark\. lt;stronggt;Dogslt;/stronggt; lt;emgt;barklt;/emgt;\.lt;/pgt;|Validates handling when fewer sentences are provided\.|
|6|3|Cats meow\. Fish swim\.|lt;pgt;Cats meow\. lt;stronggt;Catslt;/stronggt; lt;emgt;meowlt;/emgt;\.lt;/pgt;lt;pgt;Fish swim\. lt;stronggt;Fishlt;/stronggt; lt;emgt;swimlt;/emgt;\.lt;/pgt;|Confirms behavior with less than three sentences\.|
|7|1|Cars drive fast\. Trains are quick\. Planes fly high\.|lt;pgt;Cars drive fast\.lt;/pgt;lt;pgt;Trains are quick\.lt;/pgt;lt;pgt;Planes fly high\.lt;/pgt;|Checks absence of lt;stronggt; and lt;emgt; tags\.|
|7|2|The earth rotates\. The sun shines\. The moon orbits\.|lt;pgt;The earth rotates\.lt;/pgt;lt;pgt;The sun shines\.lt;/pgt;lt;pgt;The moon orbits\.lt;/pgt;|Verifies missing emphasis tags\.|
|7|3|Fish swim\. Birds fly\. Mammals walk\.|lt;pgt;Fish swim\.lt;/pgt;lt;pgt;Birds fly\.lt;/pgt;lt;pgt;Mammals walk\.lt;/pgt;|Tests output without lt;stronggt; and lt;emgt; tags\.|