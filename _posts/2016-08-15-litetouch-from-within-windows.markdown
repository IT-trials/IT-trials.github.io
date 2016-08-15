---
title: Launching an MDT build from Litetouch.vbs while logged into Windows
number: 7
layout: post
categories: MDT
---

## Problem:
I want to be able to rebuild computers using MDT without turning up physically to PXE boot them.

## Solution:

Inside a deployment share there is a directory called scripts which contains many important MDT scripts including Litetouch.vbs

    .\scripts\litetouch.vbs

There is plenty of online documentation on using this to launch a capture sequence but not so much on the Windows Deployment side.

It is perfectly possible to launch a build sequence from here too.  However, you may not get the benefit of tools such as DART integration you might have baked into you PXE boot Windows PE image.  Depending on your CustomSettings.ini you may also get some un-expected things happening.

For example, I force NEW COMPUTER as deployment type but when the build is triggered from while logged into windows, the build defaults too and necessarily must run as REFRESH.

For me this caused no particularly important problems as I delete machines in AD prior to rebuilding them - no groups or the machine's OU were cloned.  Post build I was able to set this up from scratch and avoid having unwanted GPOs dirty up my nice new computer.  However, the build time increased drastically as MDT performed a backup of user data prior to rebuild.

I think this backup could probably be blocked with a task sequence modification or possibly a further rule in CustomSettings.ini but I am unsure atm.  Will try disabling the entire state restore section in my task sequences as a first port of call.

## Pitfalls

  - Starting a build from windows no PXE boot will force the build to type REFRESH.  Watch out for unwanted state restore and increased build time.
