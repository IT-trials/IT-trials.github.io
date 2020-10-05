---
title: Lambda Test Tool
number: 
categories: AWS
---

## Problem:

https://github.com/aws/aws-lambda-dotnet/tree/master/Tools/LambdaTestTool

{
    "version": "0.2.0",
    "configurations": [
        {
            "name": ".NET Core Launch (console)",
            "type": "coreclr",
            "request": "launch",
            "preLaunchTask": "build",
            "program": "<home-directory>/.dotnet/tools/dotnet-lambda-test-tool-3.1.exe",
            "args": [],
            "cwd": "${workspaceFolder}",
            "console": "internalConsole",
            "stopAtEntry": false,
            "internalConsoleOptions": "openOnSessionStart"
        },

"Cannot read keys when either application does not have a console or when console input has been redirected. Try Console.Read."


Failed to find type HelloWorld.DateConverter

## Solution:

        {
            "name": ".NET Core Launch (console Mock)",
            "type": "coreclr",
            "request": "launch",
            "preLaunchTask": "build",
            "program": "~/.dotnet/tools/dotnet-lambda-test-tool-3.1",
            "args": [],
            "cwd": "${workspaceFolder}/DynamoDBClient",
            "console": "internalConsole",
            "stopAtEntry": false,
            "internalConsoleOptions": "openOnSessionStart"
        },