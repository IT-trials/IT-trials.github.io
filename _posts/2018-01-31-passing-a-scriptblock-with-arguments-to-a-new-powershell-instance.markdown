---
title: Passing a Scriptblock with Arguments to a New Powershell Instance
number: 20
layout: post
categories: Scripting
---

## Problem:
Its quite hard to Pass a Scriptblock with Arguments to a new powershell instance.  

In a normal process the following works perfectly:

    $arg = "HAM"
    $command = {param($ham) write-host $ham}
    & $command $arg

However the following and hundred of similar more complex variations produced odd string based output and useless errors

    Start-Process powershell -ArgumentList "-noexit -command & $command $arg"

    & : The term 'param' is not recognized as the name of a cmdlet, function, script file, or operable program. Check the
spelling of the name, or if a path was included, verify that the path is correct and try again.
At line:1 char:3
+ & param($ham) write-host $ham HAM
+   ~~~~~
    + CategoryInfo          : ObjectNotFound: (param:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException


I spent at least an hour trying lots of slightly different syntax arrangements, escaped characters.  I even tried passing a command "-" as I haven't bothered learning all the meanings of this syntax.

    PowerShell[.exe]
             [-Command { - | <script-block> [-args <arg-array>]
                           | <string> [<CommandParameters>] } ]

Also [SS64](https://ss64.com/ps/powershell.html) have a more descriptive but equally elusive, to me, description:

    -Command          Execute the specified commands (and any parameters) as though they
                      were typed at the PowerShell prompt, and then exit, unless NoExit is specified.
                      The value of Command can be "-", a string. or a script block.

                      If the value of Command is "-", the command is read from standard input.


Anyway there are lots of ways to get this wrong and lots of bad workarounds.



## Solution:
![]({{ site.github.url }}/assets/images/20/Success.JPG)
I finally found an acceptable syntax for passing arguments to a new powershell instance.  It is actually in line with the above quoted syntax `-Command <script-block> [-args <arg-array>]`.  

After many different variations with odd output and useless errors. I did finally get a useful type error using an variation including an "Invoke-Command".

    $arg = "HAM"
    $command = {param($ham) write-host $ham}
    Start-Process powershell -ArgumentList "-noexit -command invoke-command -scriptblock $command -argumentlist $arg"


    Invoke-Command : Cannot bind parameter 'ScriptBlock'. Cannot convert the "param" value of type "System.String" to type
    "System.Management.Automation.ScriptBlock".


As this stated that my $command parameter was of type string and must be a script-block I tried to through on another set of curly braces.

In addition to getting better error messages, using the Invoke-Command gives you the recognisable "-ArgumentList" parameter to operate against the given Command that you are missing with the standard [powershell.exe parameters](https://docs.microsoft.com/en-us/powershell/scripting/core-powershell/console/powershell.exe-command-line-help?view=powershell-5.1).

    Start-Process powershell -ArgumentList "-noexit -command invoke-command -scriptblock {$command} -argumentlist $arg"

No need for any extra complex escaping or unwanted persisted variables.  Just keep the script block in curly braces so it remains a script block on arrival in the new session.  At least in this simple case.  It also works without the invoke-command as follows

    $arg = "HAM"
    $command = {param($ham) write-host $ham}

    Start-Process powershell -ArgumentList "-noexit -command & {$command}  $arg"
