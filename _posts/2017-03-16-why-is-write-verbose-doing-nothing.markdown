---
title: Enable Wake on a Windows Client
number: 13
layout: post
categories: Scripting
---

## Problem:
I made a script with some functions in it and the built in PowerShell verbose switch is doing absolutely nothing.

    ./MyScript.ps1 -verbose #I'm having to revert to write host to have a clue what is happening!

## Solution:
Give PowerShell a chance - it's made it pretty easy for you - just put cmdletbinding attribute above your parameters in any given script.

    [cmdletbinding()]
    param()

Powershell will then give you some free [common parameters](https://msdn.microsoft.com/en-us/powershell/reference/3.0/microsoft.powershell.core/about/about_commonparameters).

  - Debug (db)
  - ErrorAction (ea)
  - ErrorVariable (ev)
  - InformationAction
  - InformationVariable
  - OutVariable (ov)
  - OutBuffer (ob)
  - PipelineVariable (pv)
  - Verbose (vb)
  - WarningAction (wa)
  - WarningVariable (wv)

Thanks to Ed Wilson, Microsoft Scripting Guy, for solving my problem and leading me into this interesting topic in [his post](https://blogs.technet.microsoft.com/heyscriptingguy/2014/07/30/use-powershell-to-write-verbose-output/).

There is a lot more you can do with the [Parameter Binding Attribute](https://msdn.microsoft.com/powershell/reference/5.1/Microsoft.PowerShell.Core/about/about_Functions_CmdletBindingAttribute)

## Pitfalls

  - This is just a rare good thing
