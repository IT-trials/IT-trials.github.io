---
title: Netsh for Windows Network Problems
number: 14
layout: post
categories: Scripting
---

## Problem:


## Solution:
To completely reset Windows network stack:

    Netsh int ip reset
    netsh winsock reset
    
and then restart computer


## Pitfalls

 - All network settings, including WiFi passwords, will be wiped
