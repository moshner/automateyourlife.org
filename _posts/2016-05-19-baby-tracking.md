---
layout: "project"
permalink: "/projects/baby-tracking/"
category: "projects"

title: "Tracking Your Baby's Body Rhythms with Tasker and IFTTT"
author: "nick-mosher"
image: ""
tags: ["android", "tasker", "autoremote", "ifttt", "google-drive"]
excerpt: "There are a multitude of apps for new parents, but they tend to have ads, paid features, or just be difficult to use. Instead, you can set up the perfect system for your needs using only a few tools."

problem: "Remembering the last sleep, changing, or feeding is hard, especially when sleep deprived."
solution: "Using Tasker and your phone you can track sleep, changings, and feedings."
overview: "There are three different goals here but all for the same purpose. Helping sleep deprived parents keep their infant baby on track without needing to buy another device."
requirements: ["Tasker", "AutoRemote", "IFTTT", "Google Drive"]
files: ["Baby_Fed.tsk.xml", "Baby_Sleep.tsk.xml", "Baby_Wake.tsk.xml", "Both.tsk.xml", "Pee.tsk.xml", "Poo.tsk.xml", "Potty.tsk.xml", "Potty_Send.tsk.xml"]
---

Part 1) Sleep Tracking
----------------------

The goal here is to create two tasks. The first "Baby Sleep" task creates a time stamp of the sleep and creates a notification in the drawer to activate task two: "Baby Wake". This second tasks is meant to calculate the time asleep and push that value to a google spreadsheet. As a bonus you will be able to restart the sleep timer if you find out the kid wasn't asleep at all.

### Part 1) Task 1: Baby Awake

 1. Create a new task and call it "Baby Awake"
 1. Create the first action as a Variable Set. Name: %BSleepDuration to: %Time - %BSleepStart. Make sure it to check the "Do Maths" box.
 1. Create a Notify Cancel action to cancel the title: "Sleep From %BSleepStart" notification.
 1. Create an AutoRemote Message with the Recipient of IFTTT. Set the Message: `sleep=:=%BSleepDuration=:=KidName`
 1. Go into IFTTT and set up an action to accept that AutoRemote notification.
 1. Set THIS to "Maker" channel to the "Event Name" of "sleep"
 1. Set THIS to "Google Drive" channel. Give it a spreadsheet and the "Format Row" of `{{OccurredAt}} ||| {{Value1}} |||{{Value2}}`

Now we should be ready to add the baby sleep task.

### Part 1) Task 2: Baby Sleep

 1. Create a new task and name it "Baby Sleep"
 1. Create the first action as a Notify Cancel. Set the title to "Sleep From %BSleepStart"
 1. Create an action to "Variable Set". Name: %BSleepStart value: %Time
 1. Create an action to create a notification with the Title of "Sleep From %BSleepStart" (no quotes.) Give it an icon and two actions (listed below)
 1. In your notification create an action and name it "Restart". Make it reset your %BSleepStart variable to the current time.
 1. In your notification action create  another sub-action and name it "Awake". Make it perform the task "Baby Awake".

Known issue: How can we make sure to calculate correctly over a day change?

### Part 1) Conclusion

Now if you set up a shortcut on your home screen you can trigger the Baby Sleep action just as soon as your little one goes to bed. Then make corrections right within your notification drawer as things change.

Part 2) Changing Times
----------------------

Ever find that you need to track your baby's bowel movements? This tracker will help log those in a spreadsheet so that you don't have to write them down or remember them. For the sleep deprived parent this could help a lot.

### Part 2) Task 1: Potty Send

 1. Create a task and call it "Potty Send"
 1. Create an AutoRemote Message with the Recipient of IFTTT. Set the Message: `potty=:=%Ptype=:=KidName`
 1. Set THIS to "Maker" channel to the "Event Name" of "potty"
 1. Set THIS to "Google Drive" channel. Give it a spreadsheet and the "Format Row" of `{{OccurredAt}} ||| {{Value1}} |||{{Value2}}`

### Part 2) Tasks 2,3,4: Pee, Poo, Both

These three tasks will be very similar. Create all three first, before you go any further.

 1. Create a task and name it Pee/Poo/Both (one each).
 1. Add an action to set a Variable. Name: %PType to pee/poo/both.
 1. Add an action to Peform Task: Potty Send.

### Part 2) Task 5: Potty

This task, when launched from a button on your home screen will ask you what type of potty your kid went and automatically log that to the spreadsheet using the other tasks in these instructions.

 1. Create a task and call it "Potty"
 1. Create an action Popup Task Buttons. Set the Text to "What Type?" with the tasks of Pee, Poo, and Both.

## Part 3) Baby Fed

This part is only one task that notifies you of the last feeding and creates a time stamp on a spreadsheet to track the feedings. It could be expanded to accept values if you want to track in the amount of food eaten.

 1. Create a task and call it "Baby Fed"
 1. Add an action to Notify Cancel with the title of "Last Feeding %BFed".
 1. Add an action to set a variable to Name: %BFed to %TIME
 1. Add an action to Notify with the title of "Last Feeding %BFed".
 1. Create an AutoRemote Message with the Recipient of IFTTT. Set the Message: `fed=:=KidName`
 1. Set THIS to "Maker" channel to the "Event Name" of "fed"
 1. Set THIS to "Google Drive" channel. Give it a spreadsheet and the "Format Row" of `{% raw %}{{OccurredAt}} ||| {{Value1}}{% endraw %}`
