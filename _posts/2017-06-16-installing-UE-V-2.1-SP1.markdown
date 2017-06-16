---
title: Installing PowerShell 5.1
number: 18
layout: post
categories: Scripting
---

## Problem:
PowerShell 5.1 is [available](https://blogs.msdn.microsoft.com/powershell/2017/01/19/windows-management-framework-wmf-5-1-released/). To standardise the version of PowerShell on the network to the level of newer Server 2016 and Windows 10 machines I want install the Windows Management Framework 5.1 everywhere possible.  However, it doesn't install so easily as Windows Management Framework 5 for Windows 7 machines.

I tweaked the existing batch file I used to deploy wmf 5 from pdq and mdt

    wusa.exe Win7AndW2K8R2-KB3191566-x64.msu /quiet /norestart

It just causes a wusa process to hang and the installation essentially stall without failing.

The following is not much better.

    powershell.exe -ExecutionPolicy Bypass -Command ".\Install-WMF5.1.ps1

## Solution:
Read the release notes...

The solution is on [MSDN](https://msdn.microsoft.com/en-us/powershell/wmf/5.1/install-configure)
You need to include the `-AcceptEula` switch and maybe `-AllowRestart` although not in my case.

On my next attempt I tried the following.

    powershell.exe -ExecutionPolicy Bypass -Command ".\Install-WMF5.1.ps1 -AcceptEula"

However it fails with the following error
![]({{ site.github.url }}/assets/images/18/cmdError.JPG)

This is because launching PowerShell from the batch file causes confusion in the script invocation path.  Including the whole directory structure solves this problem.

   powershell.exe -ExecutionPolicy Bypass -Command "c:\installer\Install-WMF5.1.ps1 -AcceptEula"
   or
   powershell.exe -ExecutionPolicy Bypass -Command "%~dp0\Install-WMF5.1.ps1 -AcceptEula"

I also had the most success with the following much simpler line which is very close to the resultant line the above PowerShell would actually return.

    start /wait wusa.exe Win7AndW2K8R2-KB3191566-x64.msu /quiet /promptrestart


## Conclusion
This final option looses all the error checking and support for both 64 and 32 bit that the PowerShell option offers so my favorite option is this one:

    powershell.exe -ExecutionPolicy Bypass -Command "%~dp0\Install-WMF5.1.ps1 -AcceptEula"


Overall the deployment of WMF 5.1 seems to be an improvement on previous editions it's just a bit fiddly.  This version seems to have done away with the need to [step up through previous versions](https://msdn.microsoft.com/en-us/powershell/wmf/5.0/requirements).  The compatibility testing and platform control managed from the installer ps1 are nice features.

## Pitfalls:
-  Take a look if Windows Management Framework 3 is installed first. I will quote the above MSDN article:
    > "WMF 3.0 must not be installed. Installing WMF 5.1 over WMF 3.0 will result in the loss of the PSModulePath, which can cause other applications to fail. Before installing WMF 5.1, you must either un-install WMF 3.0, or save the PSModulePath and then restore it manually after WMF 5.1 installation is complete."

    Hot fixes to look out for are KB2506143 & KB2506146 as per this extract from the WMF documentation:
>
    -  Windows 7 Service Pack 1
        -  64-bit versions: Windows6.1-KB2506143-x64.msu
        -  32-bit versions: Windows6.1-KB2506143-x86.msu
    -  Windows Server 2008 R2 SP1
        -  64-bit versions: Windows6.1-KB2506143-x64.msu
    -  Windows Server 2008 Service Pack 2
        -  64-bit versions: Windows6.0-KB2506146-x64.msu
        -  32-bit versions: Windows6.0-KB2506146-x86.msu

-  Note know incompatibility with following [(see msdn)](https://msdn.microsoft.com/en-us/powershell/wmf/5.1/productincompat):
   - Microsoft Exchange Server 2013
   - Microsoft Exchange Server 2010 SP3
   - Skype for Business Server 2015
   - Microsoft Lync Server 2013
   - Microsoft Lync Server 2010
   - System Center 2012 R2 Service Management Automation

-  wusa doesn't like UNC paths try mapping a drive or copy the files locally.
   ![]({{ site.github.url }}/assets/images/18/error.JPG)
