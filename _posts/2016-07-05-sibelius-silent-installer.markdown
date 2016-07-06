---
title: Packaging Sibelius 7.1 Installer
trial: 5
layout: post
---

## Problem

The Sibelius installer doesn't seem to have a silent install option.  I an installer, an update installer, a plugin installer, a ton of files to copy and a registry mod. to make.

## Solution

The Sibelius installer does infact have a silent install option, [Avid have documented this with hints for differnt versions](http://avid.force.com/pkb/articles/en_US/how_to/en396971).

Powershell is ace at copying files (that don't have too long filenames) and it can do reg mods too.

## My script

{% gist  7261e57d4a1790802291d1cd120bc26e %}

## Pitfalls

  - Sibelius installer pre-requisite "c++ 2008 redistributable x86" causes a user interaction and a restart so should be installed silently first
  - The Sibelius Sounds Update seems to be badly packaged and unresponsive to switch commands
