---
title: Set PowerShell as Default Shell for Server Core
number: 17
categories: GPO
---

## Problem:
When you log onto a server Core instance. CMD.exe is the default shell.  It can get quite frustrating launching PowerShell on every login if this is your preferred Shell.  

## Solution:
From Server 2012? there is a registry hive

[Richard J Green](https://richardjgreen.net/about/){:target="_blank"} has a great solution [here](https://richardjgreen.net/setting-powershell-default-shell-server-core/){:target="_blank"}.  I fear this might be a little heavy handed.  If this policy was accidentally applied to a client machine or gui server then the default value of explorer.exe would be over-written and the results are interesting to imagine (I haven't tested it out).  

![]({{ site.github.url }}/assets/images/17/shell.jpg)

However his WMI query is discussed later for those wanting extra filtering on what I understand to be a safer registry edit.

I chose a slightly different strategy as suggested by [Carlos Perez](https://www.darkoperator.com/about-me/){:target="_blank"} at [Dark Operator](https://www.darkoperator.com/blog/2013/1/10/set-powershell-as-your-default-shell-in-windows-2012-core.html){:target="_blank"} to create a new key (REG_SZ) called 40000 in a different hive:


    HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon\AlternateShells\AvailableShells

with the following value

    powershell.exe -noexit -command "& {set-location $env:userprofile; clear-host}"

![]({{ site.github.url }}/assets/images/17/alternateShell.png)

As Carlos explains this has an added complexity.  You must change the owner of the hive otherwise a any attempt to create a new key will fail.

For this reason my GPO has two elements, a security setting and a registry key.
![]({{ site.github.url }}/assets/images/17/sec.jpg)

### wmi query
For an extra level of safety and mainly to keep things neat you might add a wmi query to your gpo.

Here is an example from Richard J Green's solution which is very neat but only seems to only work for 2012R2 and not 2016 Core servers.

    SELECT InstallState FROM Win32_OptionalFeature WHERE (Name = "Server-Gui-Shell") AND (InstallState = "2")

And another from [technet](https://blogs.technet.microsoft.com/askds/2008/09/11/fun-with-wmi-filters-in-group-policy/){:target="_blank"} which was actually useless to me as almost all my servers had a SKU of 7 no mater what version or if they were core or not.

    SELECT OperatingSystemSKU FROM Win32_OperatingSystem WHERE OperatingSystemSKU = 12 OR OperatingSystemSKU = 39 OR OperatingSystemSKU= 14 OR OperatingSystemSKU = 41 OR OperatingSystemSKU = 13 OR OperatingSystemSKU = 40 OR OperatingSystemSKU = 29

I settled on targeting 2012R2 and 2016 Servers as I have tested for unwanted effects on gui servers.

    select * from Win32_OperatingSystem where Version like "6.3%" or Version like "10%"
    SELECT * FROM Win32_OperatingSystem WHERE ProductType = 2 OR ProductType = 3

## Pitfalls:
-  When testing for unwanted outcomes on a Server 2008 and 2016 edition with a gui, the key was ignored when running Alternate Shell from Safe Mode.  This is fine but shows a limit to the extent of this particular key.
-  The AlternateShell key may not be effective on older servers.  I haven't tested on anything older the 2012R2.  The hive was not originally present on older instances and therefore unlikely to be queried.
![]({{ site.github.url }}/assets/images/17/safeMode.jpg)
