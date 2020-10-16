---
title: Installing Microsoft User Experience Virtualization (UE-V) 2.1 SP1
number: 19
categories: Scripting
redirect_from: /scripting/installing-UE-V-2.1-SP1
---

## Problem:
Microsoft User Experience Virtualization or UE-V has largely replaced more traditional roaming profiles.  I'm currently rolling this out on Windows 7 to use sympathetically with the growing collection of Windows 10 machines which natively support UE-V and really doesn't work well with roaming profiles. UE-V is [available as part of the Microsoft Desktop Optimization Pack - MDOP](https://technet.microsoft.com/en-us/windows/mdop.aspx){:target="_blank"}.

I want to deploy with pdq using a silent installer.


## Solution:
If you only have an environment with both x64 and x86 machines use the "AnyCPU" installer with the following parameters

    start /wait AgentSetup.exe /Silent /NoRestart AcceptLicenceTerms=True SettingsStoragePath="\\server\Share"

Alternatively save around an extra 10mb of file transfer and an unnecessary unzip and use a dedicated installer for x64 or x86

    start /wait AgentSetupx64.msi /qn /NoRestart AcceptLicenseTerms=True SettingsStoragePath="\\server\Share"
    or
    start /wait AgentSetupx86.msi /qn /NoRestart AcceptLicenseTerms=True SettingsStoragePath="\\server\Share"


## Pitfalls:
-  This seems to work well.  
-  Beware `/AcceptLicenseTerms=True` or  `/SettingsStoragePath="\\server\Share"` will both fail.  This is typical of Public Parameters which do not require a leading `/` or `-`.  However I learned my lesson here as hadn't used them previously.
