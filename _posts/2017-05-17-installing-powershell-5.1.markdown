---
title: Installing PowerShell 5.1
number: 18
layout: post
categories: Scripting
---

## Problem:
PowerShell 5.1 is [available](https://blogs.msdn.microsoft.com/powershell/2017/01/19/windows-management-framework-wmf-5-1-released/) to keep all machines on the network up to a similar standard to the new Server 2016 and Windows 10 machines I wanted install the Windows Management Framework 5.1 everywhere.  However it doesn't install so easily as Windows Management Framework 5 for Windows 7 machines.

## Solution:
Read the release notes...
The solution is on [MSDN](https://msdn.microsoft.com/en-us/powershell/wmf/5.1/install-configure)
You need to include the `-AcceptEula` switch and maybe `-AllowRestart` although not in my case.

## Pitfalls:
-  Take a look if Windows Management Framework 3 is installed first. I will quote the above MSDN article:
    > "WMF 3.0 must not be installed. Installing WMF 5.1 over WMF 3.0 will result in the loss of the PSModulePath, which can cause other applications to fail. Before installing WMF 5.1, you must either un-install WMF 3.0, or save the PSModulePath and then restore it manually after WMF 5.1 installation is complete." 

    The following information may help you test for existence of WMF 3
    -  Windows 7 Service Pack 1
        -  64-bit versions: Windows6.1-KB2506143-x64.msu
        -  32-bit versions: Windows6.1-KB2506143-x86.msu
    -  Windows Server 2008 R2 SP1
        -  64-bit versions: Windows6.1-KB2506143-x64.msu
    -  Windows Server 2008 Service Pack 2
        -  64-bit versions: Windows6.0-KB2506146-x64.msu
        -  32-bit versions: Windows6.0-KB2506146-x86.msu

-  Note know incompatibility with following:
   - Microsoft Exchange Server 2013
   - Microsoft Exchange Server 2010 SP3
   - Skype for Business Server 2015
   - Microsoft Lync Server 2013
   - Microsoft Lync Server 2010
   - System Center 2012 R2 Service Management Automation
   See [msdn](https://msdn.microsoft.com/en-us/powershell/wmf/5.1/productincompat)
