---
title: Launching an MDT build from Litetouch.vbs while logged into Windows
number: 7
layout: post
categories: MDT
---

## Problem:
I want to be able to rebuild computers using MDT without turning up physically to PXE boot them.

## Solution:

It is possible to start a build from a computer booted into windows through the Litetouch.vbs

Inside a deployment share there is a directory called scripts which contains many important MDT scripts including Litetouch.vbs

    .\scripts\litetouch.vbs

![]({{ site.github.url }}/assets/images/7/litetouch.jpg)

There is plenty of online documentation on using this to launch a capture sequence but not so much on the Windows Deployment side.

This does not work in exactly the same way as a PXE build.  You may not get the benefit of tools such as DART integration you might have baked into you PXE boot Windows PE image.  Depending on your CustomSettings.ini you may also get some un-expected things happening.

For example, I force NEW COMPUTER as deployment type but when the build is triggered from while logged into windows, the build defaults to, and must run as REFRESH.

For me this caused no particularly important problems as I delete machines in AD prior to rebuilding them - no groups or the machine's OU were cloned.  Post build I was able to set this up from scratch and avoid having unwanted GPOs dirty up my nice new computer.  However, the build time increased drastically as MDT performed a backup of user data prior to rebuild.

This backup can be blocked within a task sequence and also possibly through a further rule in CustomSettings.ini but I am unsure atm.  

There are various elements within the "State Capture" of a sequence that can be disabled including, Groups, Network Settings and User Files.
There is also another section within "Preinstall" called "Offline User State Capture" and "Refresh Only - Backup" .

![]({{ site.github.url }}/assets/images/7/tsksq1.jpg)


## Pitfalls

  - Starting a build from windows no PXE boot will force the build to type REFRESH.  Watch out for unwanted state restore and increased build time.

  - Disabling the entire "State Capture" tree stops the deployment as this is where the Windows PE is applied for REFRESH only
  ![]({{ site.github.url }}/assets/images/7/tsksq.jpg)