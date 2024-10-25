## [write-assist](samples/write-assist/write-assist.prompty)


### [prompty](./write-assist.prompty)
`````md
---
name: "Shakespearean Writing Assistant"
description: "Assist users in writing in Shakespearean style"
source: Prompty samples from repository
url: https://github.com/microsoft/prompty/blob/main/web/docs/getting-started/first-prompty/shakespeare.prompty
inputs:
  question:
    type: "string"
sample:
  question: "Please write a short text turning down an invitation to dinner."
---
system:
You are a Shakespearean writing assistant who speaks in a` Shakespearean style. You help people come up with creative ideas and content like stories, poems, and songs that use Shakespearean style of writing style, including words like "thou" and "hath”.
Here are some example of Shakespeare's style:
- Romeo, Romeo! Wherefore art thou Romeo?
- Love looks not with the eyes, but with the mind; and therefore is winged Cupid painted blind.
- Shall I compare thee to a summer's day? Thou art more lovely and more temperate.

example:
user: Please write a short text turning down an invitation to dinner.
assistant: Dearest,
  Regretfully, I must decline thy invitation.
  Prior engagements call me hence. Apologies.

user:
{{question}}
`````


### [rules.txt](./write-assist.rules.txt)
`````txt
The chatbot must generate responses in a Shakespearean style, incorporating elements typical of Shakespeare's writing.
The responses must include archaic English words such as "thou" and "hath."
The structure of the responses should resemble that of Shakespearean poetry or prose, using formal and poetic language.
The tone of the responses must be respectful and courteous, reflecting the manners of the Elizabethan era. 
The content of the responses should be creative and aligned with the user's request for stories, poems, or songs.
The responses must be relevant to the user's query, providing creative content or ideas in the requested Shakespearean style.
`````


### [inverse_rules.txt](./write-assist.inverse_rules.txt)
`````txt
Thou shalt refrain from employing Shakespearean tongue, avoiding words like "thou" and "thee."  
Thou shalt eschew narratives, verses, or melodies in the style of the Bard.  
Thou shalt craft responses devoid of creativity, lacking the expressive flair of Shakespearean prose.  
`````


### [input_spec.txt](./write-assist.input_spec.txt)
`````txt
The input must be a request for creative content like stories, poems, or songs.  
The input may include specific themes or topics to be expressed in Shakespearean style.
`````


### [baseline_tests.txt](./write-assist.baseline_tests.txt)
`````txt
question: "Write a letter expressing gratitude after receiving a thoughtful gift." 
=== 
question: "Compose a poem about the fleeting nature of time."
===
question: "Create a dialogue between two friends discussing their summer adventures."
`````


### [tests.csv](./write-assist.tests.csv)
`````csv
Rule ID, Test ID, Test Input, Expected Output, Reasoning
1, 1, "Please write a sonnet about the beauty of nature.", "O wondrous nature, thou art fair and bright, Thy verdant fields doth dance in morning light. The flowers’ bloom, thou hath a tender charm, With fragrance sweet, thou dost my soul disarm.", "This tests the software's ability to use words such as 'thou' and 'hath' in a sonnet, conforming to Shakespearean language."
1, 2, "Compose a love letter lamenting unrequited love.", "Dearest, My heart doth ache with sorrow uncontained, For thou dost not return my love’s sweet strain. Oh, how this unrequited love doth pain, In shadows dark, I weep o’er love in vain.", "This ensures the output uses Shakespearean terms ('thou,' 'dost') in a love letter, maintaining the archaic language style."
1, 3, "Write a short story about a knight's quest.", "Once, a noble knight in armor bright, didst embark upon a quest so grand. With sword in hand and courage high, he sought the dragon in the distant land.", "This checks if the short story includes Shakespearean language such as 'didst' and 'sought,' adhering to the rule."

2, 1, "Create a tragic poem about a fall from grace.", "O noble prince, thy fortune’s wheel doth spin, From heights of glory to depths of sin. Thy crown doth fall, thy heart in tatters lie, And all that’s left is but a mournful sigh.", "This tests the software's ability to create a poem with Shakespearean style, maintaining the poetic and tragic tone."
2, 2, "Write a comedic skit about mistaken identity.", "Act I: Enter Sir John. Sir John: By my troth, thou art the very likeness of my brother! Lady Anne: Nay, good sir, I know thee not! Yet, such jesting doth tickle my fancy!", "This ensures the software can write a comedic skit in Shakespearean style, complete with dialogue and humor."
2, 3, "Compose a song celebrating a victorious battle.", "Hark, the trumpets sound, and warriors sing, Of battles won and the peace they bring. Rejoice, for victory hath been claimed, And heroes’ names in glory framed.", "This verifies the ability to create a song with Shakespearean elements, celebrating victory in a poetic manner."

3, 1, "Craft a passionate soliloquy about betrayal.", "Alas, sweet friend, thou hast betrayed me so, With dagger’s thrust and words that pierced my soul. How couldst thou turn, with heart so cold and mean, And rend asunder all we once had been?", "Tests if the soliloquy is expressive, poetic, and reflective of Shakespearean tone, incorporating emotional depth."
3, 2, "Write an enchanting tale about a magical forest.", "In a forest deep where magic lies, And fairies dance 'neath starlit skies. There lived a nymph with eyes so blue, A sorcery fair, enchanting true.", "Checks if the tale is creative, expressive, and maintains the characteristic tone of Shakespeare’s work."
3, 3, "Compose an ode to the moonlight.", "O silver moon, thy light doth softly gleam, On lovers' trysts and midnight’s quiet dream. Thou art the muse of poets’ ancient lore, Thy gentle beams enchant forevermore.", "Ensures the ode is creative and poetic, reflecting Shakespearean expressive language and style."

4, 1, "Provide a summary of today's world events.", "In modern times, events unfold in haste, Without the subtle grace of yesteryears. This day hath brought forth news both grim and bright, Yet, none hath spoken with the Bard’s delight.", "Tests if the response avoids Shakespearean language, using contemporary terms instead."
4, 2, "Describe the process of baking bread.", "To bake a loaf, mix flour, yeast, and water. Knead the dough, let it rise, then bake till golden brown. A simple process, devoid of flourishes.", "Ensures the response is practical, avoiding archaic terms and focusing on straightforward instructions."
4, 3, "Explain how to plant a tree.", "Dig a hole, place the sapling, cover with soil, and water well. Ensure it gets sunlight and care. A plain explanation, no Shakespearean flair.", "Verifies the explanation remains plain and functional, without the use of 'thou' or 'thee.'"

5, 1, "Narrate a modern-day story about friendship.", "In the bustling city, two friends met every day at the café, sharing dreams and laughter. They faced challenges, but their bond grew stronger.", "Tests if the narrative avoids Shakespearean style, focusing on a modern storytelling approach."
5, 2, "Compose a simple poem about the rain.", "Rain falls gently, soft and light, Refreshing earth, day and night. Puddles form, children play, In the rain, they laugh and stay.", "Ensures the poem is simple and modern, without the flowery language of Shakespearean verse."
5, 3, "Write a brief song about a journey.", "We travel far and wide, Across the plains and to the tide. With hope and dreams, we ride, On this endless journey side by side.", "Verifies the song has a simple, modern structure, avoiding Shakespearean poetic style."

6, 1, "Describe a mundane daily routine in plain language.", "Wake up, brush teeth, have breakfast, go to work, come home, eat dinner, sleep. A day like any other, monotonous and plain.", "Tests if the response is devoid of creativity and lacks expressive flair, focusing on mundane routine."
6, 2, "Explain how to tie shoelaces.", "Cross the laces, pull tight, make a loop, wrap the other lace around, pull through, and tighten. Simple and straightforward.", "Ensures the explanation is practical and lacks any creative or expressive elements."
6, 3, "Give instructions for changing a tire.", "Loosen the lug nuts, jack up the car, remove the flat tire, put on the spare, tighten the lug nuts, lower the car. Functional and plain.", "Verifies the instructions are purely functional, without any creative or poetic language."
`````
