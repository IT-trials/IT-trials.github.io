---
title: Does C# have something like php's isset()?
number: 14
layout: post
categories: Scripting
---

## Problem:
I've been making a dogs ear of an if statement in PowerShell but what I need is an [isset](http://php.net/manual/en/function.isset.php) like method.

    if($var1 -eq $null -or $var1 -eq ""){ "There must be a much better way" }
    elseif($var2 -ne $null -and $var2 -ne ""){"This is even worse"}


## Solution:
Enter .Net static method [`[string]::IsNullOrEmpty()`](https://msdn.microsoft.com/en-us/library/system.string.isnullorempty(v=vs.110).aspx)

    if( [string]::IsNullOrEmpty($var1) ){ "Phew" }
    elseif( !([string]::IsNullOrEmpty($var2)) ){"That's a relief"}


## Pitfalls

  - This is just a rare good thing
