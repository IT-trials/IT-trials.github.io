---
title: Enable Wake on a Windows Client
number: 12
layout: post
categories: Scripting
---

## Problem:
I found a lot of posts suggesting to enable WOL from a windows GUI and maybe others offering a registry modification. I had no luck with either on our domain.
![]({{ site.github.url }}/assets/images/12/gui.jpg)

## Solution:
My boss suggested the following, using netsh, and it worked a dream.

   Netsh int ip set int {AdapterName} forcearpndwolpattern=enabled

We found that almost all devices on our Domain had one of two Adapter names depending if they were "Windows 7 Pro" or "Windows 10 Education"):- "Ethernet”  or ”Local Area Connection”

You can get a list of your own adapters with the following command:

    netsh int ip show int

I ran a lot of remote commands from PDQ to check that all contactable machines had the right adapter names:

    int ip show int | findstr "Local Area Connection" 1>null && (Echo.True) || (Echo.FALSE)

I put a few lines of the netsh command with various adapter names in a batch file and then run this as a computer shutdown script for all machines on the Domain.  

## Pitfalls

  - Running a script every time a machine shuts down does takes a fraction of a second and it isn't particularly elegant.  However it seems to have a 100% success rate.

  - It might be worth taking the time to sort this in a "Power Plan" or some such system that can be set to "apply once and do not reapply" and be slightly more readable to someone trying to understand what the netsh command is all about at some point in the future.
