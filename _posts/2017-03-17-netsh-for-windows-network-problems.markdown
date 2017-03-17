---
title: Netsh for Windows Network Problems
number: 14
layout: post
categories: Scripting
---

## Problem:
You have a network adapter that is not working. You've tried everything you can think of under change adapter settings - No unwanted IP address, Proxy, VPN or DNS settings.  Is there anything to try other than trying to replace corrupted drivers or even rebuild the computer?

## Solution:
Try resetting the whole network stack.

To completely reset Windows network stack:

    Netsh int ip reset
    netsh winsock reset
    
and then restart computer


## Pitfalls

 - All network settings, including WiFi passwords, will be wiped
