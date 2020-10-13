---
title: How To Debug Someone Else's NuGet Package in VSCode
number: 28
categories: Debugging
---

## Problem:
There may come a time when you want to investigate unexpected behaviour or even an exceptions while using a NuGet package.

Without some configuration, or tooling such as [dotPeek](https://www.jetbrains.com/decompiler/){:target="_blank"}, you probably cannot follow the stack trace outside the boundary of your source code. 

## Solution:

I found the following [article](https://geeklearning.io/how-to-debug-a-net-core-nuget-package/){:target="_blank"} by [Arnaud](https://geeklearning.io/author/arnaud/){:target="_blank"} which explains the concept of sourcing symbol files for the packages you need to debug.  However, the instructions are for VisualStudio so needed tweaking for VS Code.  I added the following to the debug task I wanted to dig deeper with.

{% highlight json %}
"justMyCode": false,
"enableStepFiltering": false,
"requireExactSource": false,
"symbolOptions": {
    "searchPaths": [],
    "searchMicrosoftSymbolServer": true,
    "searchNuGetOrgSymbolServer": true
}
{% endhighlight%}

I found this worked to an extent, perhaps only to the boundary of the listed NuGet package and not its dependencies.  Please comment below if you have any improvements or suggestions.