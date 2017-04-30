---
title: Task Scheduler Custom Event Trigger with XML Filter and Parameter Output
number: 16
layout: post
categories: Scripting
---

## Problem:
I want to archive user files to a secure location on their logout.  I could probably do this with a logout script but I don't want the user to have any access to the archive location.  

## Solution:
Task Scheduler can run tasks and scripts as a privileged user but be triggered by a less privileged user or even an event.  For this reason I decided to use it to manage the archiving task.  It's also useful to note, it's possible to capture data from a trigger event to pass to a task and indeed the following solution does just that.

[Technet](https://blogs.technet.microsoft.com/wincat/2011/08/25/trigger-a-powershell-script-from-a-windows-event/) and [spiceworks](https://community.spiceworks.com/how_to/123434-run-powershell-script-on-windows-event) have great articles on how to achieve this, which I followed them both in order to create my own similar solution.

In my case a number of exam service accounts have folder redirection for their desktop and user files to a network share.  These accounts might be used for several exams in one day and the old files must be archived between exams.  I decided to try and automate this at user logout as the students may be invigilated by people with basic access and ability with computers.  First I trawled the fileserver's event logs for a relevant event.  This was actually really easy to isolate and event viewer will even write you a basic query you can then add more properties too.

I decided to add a user filter at this stage rather than handling inside Powershell to keep the noise down as I'm only interested in a small fraction of the logout events.

The following is an excerpt of the finished task sequence, as xml with both the event filter and custom output parameter marked at the bottom.
![]({{ site.github.url }}/assets/images/16/xml.jpg)

Finally, for the specified users, Task Scheduler executes the Powershell script and passes in a parameter isolated manually in the above xml.  

    powershell.exe -ExecutionPolicy Bypass -file "C:\Scripts\Supported Exam File Archiving.ps1" -username $(AccountName)  

I've included the Powershell which this schedule initiates in addition to an export of the task sequence as xml.  It includes my first implementation of the Powershell's feature "SupportsShouldProcess" which is really useful and very easy to include, particularly if you have no need to further the default "-WhatIf" or "Confirm" functionality of the cmdlets you use within your script.

{% gist 7be445c5037ba78b969e966e9ef17276 %}

## Pitfalls:
-  The query inside the schedule's subscription is a bit fiddly if you aren't familiar with the syntax.  My query was failing for quite a long time and I can't say I know what I finally changed to fix it.
- It's a pain that the query language doesn't seem to support wild cards so repetitious matches must be declared longhand.  For example ` "Exam01", "Exam02", "Exam03""...` An expression such as "EXM*" or "EXM%" more familiar in SQL and regex would be far more concise.
- It might be hard to predict exactly how and when all events will occur.  Therefore, you might end up triggering too many or two few tasks.  It's therefore very important to test and regularly check a custom event trigger like this to make sure it does actually do the job you want it too.  For example I may have to cancel this schedule if the user share log-off occurs on a network interruption or a period on inactivity in addition to a full user logout on the client computer.

## Extension Ideas
- It may be more reliable to have a user log-off script trigger the scheduled task but I don't know how to achieve that at this stage.
