---
id: "FindYourPhoneWithTasker"
title: "Find Your Phone with Tasker"
url: "https://github.com/moshner/FindYourPhoneWithTasker"
problem: "I frequently misplace my phone and have no phone with which to call it."
solution: "Trigger a sound effect on the phone remotely from my watch, email, or web browser."
image: "icon-phone-search.png"
tags: ["android", "tasker", "join", "pebble", "pebble-tasker", "ifttt", "gmail"]
---
# Find Your Phone With Tasker

<img src="icon-phone-search--black.png" width="72" height="108" title="Find your phone icon" />

**Problem**: I frequently misplace my phone and have no phone with which to call it.

**Solution**: Trigger a sound effect on the phone remotely from my watch, email, or web browser.

Overview
--------

The trick here is to make sure that we can locate the phone _even if it is muted_. So the first thing we do is create a task that turns all your volumes up, plays and endless loop of music, and pop's up a message to end the music as soon as it is found. After that we need to think about the best way to trigger this feature. There a many ways to trigger it but we are going to cover three here:
1) From your Pebble watch, 2) From an email to yourself, 3) From a web browser using Join by joaoapps.

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
2. Add Plugin: Secure Settings.
3. Edit Configuration of the secure settings: 
4. Select Actions -> Wake Device
5. Set the wake type to "Screen & Keyboard Lights On
6. Duration: 5 seconds
7. Save and exit
2. Add Action: Audio, Silent Mode. Set to "Off".
3. Add Action: Audio, Media Volume. Set to "7".
4. Add Action: Audio, Ringer Volume. Set to "7".
5. Add Action: Audio, System Volume. Set to "7".
6. Add Media: Play Music. 
7. Select a ringtone you like. Make sure it is loud.
7. Check the play loop checkbox so that the ringtone continues to play until you find the phone.
8. Add Alert: Popup Task Buttons. Text: Found Me! Task: End Find Phone
9. Back Button out
 

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
2. Set a default task to: Find Phone

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
2. Create a profile in Tasker to accept an incoming Event > Plugin > AutoRemote action with the text of FindPhone
3. Create a new recipe in IFTTT
4. Select THIS and find your gmail channel.
5. Search for the subject of "Find Phone" and the sender of yourself.
6. Set your THAT action for the Maker Channel
7. URL: https://autoremotejoaomgcd.appspot.com/sendmessage?key=YOURKEY&message=FindPhone
8. Method: Post
9. All else blank
10. Save and test it.

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
2. Create a new profile in Tasker  to accept an incoming Event > Plugin > Join
3. Edit Configuration
4. Text Filter > Text Filter = FindPhone
5. Set the Task to be "Find Phone"
6. Install Join on your Chrome browser on the computer
7. Click the Join icon and "Send a Tasker Command" value = FindPhone
8. Enjoy

Parting Thoughts
================
There are many ways to trigger this task and many alternatives to filling this need. These are just a few that I've found helpful. At some point I plan on setting up a button to trigger that action as well. This will help find the phone quickly without having to find my pebble or computer.
