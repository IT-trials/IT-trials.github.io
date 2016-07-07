---
title: Relative Paths in Scripts
trial: 6
layout: post
categories: scripting
---

## Problem:
I want to put a batch file in with a load of instalation media on a server share, access it from a UNC path, and have it install a list of probrams with given params.

## Solution:

Use Powershell, it can execute over UNC

If you must use a .bat file you can map a UNC path as a drive for the period of the script using pushd/popd.

e.g.

    pushd \\Server\Share\Dir
    .\someApp.exe /Parameter1 /Parameter2
    popd

This can be improved by using a special bat variable that passes in the location of the batch file.  Give the following a try:

    echo %~dp0
    PAUSE

It will echo out the path of the bat files parent directory.

This can be used in a script as follows.

    pushd %~dp0
    .\someApp.exe /Parameter1 /Parameter2
    popd

## Pitfalls

  - This works fine from MDT and if you navigate to the file and execute by double clicking.  However, when I tried to use from PDQ deploy, I found that PDQ copies the .bat down to the target machine and "%~dp0" echos out a useless file path.  This could be fixed by clicking "copy all files but I'm trying to map a drive to avoid copying several gigabytes of installation media.
