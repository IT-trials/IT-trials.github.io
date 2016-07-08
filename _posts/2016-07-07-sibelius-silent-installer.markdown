---
title: Packaging Sibelius 7.1 Installer
number: 5
layout: post
categories: MDT
---

## Problem

The Sibelius installer doesn't seem to have a silent install option.  There is no support for the "/?" or "/h" switches.  
In our environment we have a manual install process that includes running an installer, an update installer, a plugin installer, a ton of files to copy and a registry mod. to make.  I want to package this as a silent install process to run from PDQ deploy and as an application in a mdt build sequence.

## Solution

The Sibelius installer does infact have a silent install option, [Avid have documented this with hints for differnt versions](http://avid.force.com/pkb/articles/en_US/how_to/en396971).  However, I've found that prequisites are causing restarts and prompts.

Powershell is ace at copying files (that don't have too long filenames) and it can do reg mods too.

One element, the Sibelius Sounds Update, looks like it will have to be done manually post deployment. The registry modification also has to be done after this update is installed.

Therefore I think it more stable to have a script that eliminates as much user interface as possible but is not silent and needs help.
## My Manual script

{% gist  7261e57d4a1790802291d1cd120bc26e %}


## My Quiet Script (requires follow up manual work)
To follow, subject to testing...


## Pitfalls
  - Sibelius installer pre-requisite "c++ 2008 redistributable x86" causes a user interaction and a restart so should be installed silently first
  - The Sibelius Sounds Update seems to be badly packaged and unresponsive to switch commands
