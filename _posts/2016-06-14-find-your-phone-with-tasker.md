---
layout: "project"
permalink: "/projects/mute-android-with-tasker/"
category: "projects"

title: "Find Your Phone with Tasker"
image: ""
tags: ["android", "tasker", "join", "pebble", "pebble-tasker", "ifttt", "gmail"]
excerpt: "For people who routinely lose their phones, it can be handy to be able to send yourself a text message or email to trigger a loud notification to help you find it."

problem: "I frequently misplace my phone and have no phone with which to call it."
solution: "Trigger a sound effect on the phone remotely from my watch, email, or web browser."
overview: |
    The trick here is to make sure that we can locate the phone _even if it is muted_. So the first thing we do is create a task that turns all your volumes up, plays and endless loop of music, and pops up a message to end the music as soon as it is found. After that we need to think about the best way to trigger this feature. There a many ways to trigger it but we are going to cover three here:

     1. From your Pebble watch
     1. From an email to yourself
     1. From a web browser using Join by joaoapps.
requirements: []
files: ["End_Find_Phone.tsk.xml", "Find_Phone.tsk.xml", "Find_Phone_Via_AutoRemote.prf.xml", "Find_Phone_Via_Join.prf.xml"]
---

Set Up the Tasks
================

Requirements
------------

 * Android
 * Tasker App for Android
 * Secure Settings app for Android
 * (You do not need a rooted device)

Detailed Steps
--------------

### Kill Music

Make this task first so that when you are ready to test the other actions/tasks you can easily stop the music.

 1. Add Media: Music Stop

### Find Phone

 1. Create a new task and call it Find Phone.
 1. Add Plugin: Secure Settings.
 1. Edit Configuration of the secure settings:
 1. Select Actions -> Wake Device
 1. Set the wake type to "Screen & Keyboard Lights On
 1. Duration: 5 seconds
 1. Save and exit
 1. Add Action: Audio, Silent Mode. Set to "Off".
 1. Add Action: Audio, Media Volume. Set to "7".
 1. Add Action: Audio, Ringer Volume. Set to "7".
 1. Add Action: Audio, System Volume. Set to "7".
 1. Add Media: Play Music.
 1. Select a ringtone you like. Make sure it is loud.
 1. Check the play loop checkbox so that the ringtone continues to play until you find the phone.
 1. Add Alert: Popup Task Buttons. Text: Found Me! Task: End Find Phone
 1. Back Button out

Trigger Task: From Your Pebble Watch
====================================

Requirements
------------

 * Android
 * Pebble Watch
 * Pebble Tasker

Detailed Steps
--------------

 1. Open PebbleTasker
 1. Set a default task to: Find Phone

Trigger Task: From Your Email
====================================

Requirements
------------

 * Android
 * AutoRemote App
 * IFTTT
 * Gmail
 * Tasker

Detailed Steps
--------------

 1. [Configure your AutoRemote App to connect to IFTTT](https://www.reddit.com/r/tasker/comments/3arbeh/how_to_hookup_tasker_to_ifttt_using_autoremote/)
 1. Create a profile in Tasker to accept an incoming Event > Plugin > AutoRemote action with the text of FindPhone
 1. Create a new recipe in IFTTT
 1. Select THIS and find your gmail channel.
 1. Search for the subject of "Find Phone" and the sender of yourself.
 1. Set your THAT action for the Maker Channel
 1. URL: https://autoremotejoaomgcd.appspot.com/sendmessage?key=YOURKEY&message=FindPhone
 1. Method: Post
 1. All else blank
 1. Save and test it.

Trigger Task: From Your Browser
====================================

Requirements
------------

 * Join by joaoapps for Android
 * Join by joaoapps for Chrome
 * Tasker

Detailed Steps
--------------

 1. Install Join on your Android
 1. Create a new profile in Tasker  to accept an incoming Event > Plugin > Join
 1. Edit Configuration
 1. Text Filter > Text Filter = FindPhone
 1. Set the Task to be "Find Phone"
 1. Install Join on your Chrome browser on the computer
 1. Click the Join icon and "Send a Tasker Command" value = FindPhone
 1. Enjoy

Parting Thoughts
================

There are many ways to trigger this task and many alternatives to filling this need. These are just a few that I've found helpful. At some point I plan on setting up a button to trigger that action as well. This will help find the phone quickly without having to find my pebble or computer.
