---
layout: "project"
permalink: "/projects/trip-wire-photo/"
category: "projects"

title: "Trip Wire Photo"
tags: ["ifttt", "littleBits", "tasker", "join", "google-drive"]
excerpt: "Set up a trip wire using a laser (or flashlight), LittleBits, IFTTT, Tasker, Join, and Google Drive."

problem: ""
solution: ""
overview: ""
requirements: ["littleBits", "IFTTT", "Tasker", "AutoRemote"]
files: ["Hi.tsk.xml"]
---

## A) Set up the trip wire using littleBits.

 1. Connect the Power Bit to the Light Sensor
 1. (optional) Connect the light sensor to the voltage counter to see the voltage being used.
 1. Connect to the cloud bit.
 1. Shine your laser/flashlight into the light sensor

## B) Set up littleBits to IFTTT

 1. Connect littleBits to IFTTT
 1. Create a recipe that triggers when the cloudbit no longer sees the flashlight.
 1. Set up the recipe to send a message to your camera (in my case my phone)

## C) Set up AutoRemote to receive the signal from IFTTT

 1. Connect AutoRemote to IFTTT (TODO, insert link to instructions)
 1. Set up a Profile to trigger when that data is received.

## D) Set up Tasker Task

 1. Name it 'Hi' or something.
 1. Setup action to delete a file named `/DCIM/Tasker/%HiFoto`
 1. Set a variable `%HiFoto` to `%TIMEMS` (time in milliseconds)
 1. (optional) Play a music file with the sound of a camera shutter
 1. Take a photo with the front camera and name it `%HiFoto`. Optionally you can check "Discrete" to
 1. Send the photo to the location of your choice. Like using JOIN to push it to a specific device.

## E) Test it out

Try out your new laser trip wire camera.

# Possible Uses

There a bunch of possible uses for this feature.

 1. Find out which cat is using the litter box and when.
 1. Log the people who walk up to your door
 1. Scare intruders
 1. Cookie jar surveillance
 1. Show kids what animals came to a feeder
 1. Watch for packages being delivered to your door
 1. Track movement through a doggy door
 1. Any other ideas?
