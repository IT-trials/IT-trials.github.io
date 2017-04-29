---
title: Task Scheduler: Custom Event Trigger with XML Filter and Parameter Output
number: 16
layout: post
categories: Scripting
---

## Problem:
I want to archive user files to a secure location on their logout.  I could probably do this with a logout script but I don't want the user to have any access to the archive location.  

## Solution:
Task Scheduler can run tasks and scripts as a privileged user but be triggered by a less privileged user or even an event.  For this reason I decided to use it to manage the archiving task.  It's also useful to note, it's possible to capture data an event to pass to a task.

[Technet Artical](https://blogs.technet.microsoft.com/wincat/2011/08/25/trigger-a-powershell-script-from-a-windows-event/) and [spiceworks](https://community.spiceworks.com/how_to/123434-run-powershell-script-on-windows-event) have great articles on how to achieve this, which I followed to create my solution.

{% gist 45d291f9e9fcf68f8a4741d433920717 %}
