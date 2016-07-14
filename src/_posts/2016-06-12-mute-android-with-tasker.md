---
layout: "project"
permalink: "/projects/mute-android-with-tasker/"
category: "projects"

title: "Mute Android with Tasker"
author: "nick-mosher"
image: ""
tags: ["android", "tasker"]
excerpt: "Learn to set up Tasker to mute your Android phone when you flip it over."

problem: "I forget to mute my phone in meetings sometimes."
solution: "Mute my phone automatically by the simple act of turning it upside down on the table."
overview: |
    This solution uses Tasker for Android to sense the orientation of your phone and turn off the volume. Optionally, you can then create an exit task to return the phone to a more normal volume.

     * Orientation Face Down
     * On Entrance - Mute phone, all volumes to 0, end call, screen off
     * On Exit - Unmute phone, all voluems to 5
requirements: ["Android", "Tasker"]
files: ["Mute_Phone.tsk.xml", "Unmute.tsk.xml"]

forum_link: "http://forum.automateyourlife.org/d/25"
---

Detailed Steps
--------------

**Setup**

 1. Download and install [tasker][taskerurl]

**Profile**

 1. Create new profile: State, Sensor, Orientation
 1. Set the Orientation state to 'is Face Down'
 1. Save / Back Button

**Entrance Task**

 1. Create a new task and call it *Silent Mode*.
 1. Add Action: Audio, Silent Mode. Set to "Vibrate".
 1. Add Action: Audio, Media Volume. Set to "0".
 1. Add Action: Audio, Ringer Volume. Set to "0".
 1. Add Action: Audio, System Volume. Set to "0".
 1. Add Action: Audio, Alarm Volume. Set to "0".
 1. Add Action: Audio, Alarm Volume. Set to "0".
 1. Add Action: Audio, Alarm Volume. Set to "0".
 1. Add Action: Phone, End Call.
 1. Add Action: Display, System Lock.
 1. Back Button out

**Exit Task**

 1. Long press on the entrance tasks on Profile screen.
 1. Select "Add Exit Task"
 1. Create a new taks and call it *Normal Mode*
 1. Add Action: Audio, Silent Mode. Set to "Off".
 1. Add Action: Audio, Media Volume. Set to "5".
 1. Add Action: Audio, Ringer Volume. Set to "5".
 1. Add Action: Audio, System Volume. Set to "5".
 1. Add Action: Audio, Alarm Volume. Set to "5".
 1. Add Action: Audio, Alarm Volume. Set to "5".
 1. Add Action: Audio, Alarm Volume. Set to "5".
 1. Back Button out
