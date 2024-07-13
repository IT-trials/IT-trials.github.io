---
title: Saving Sensitive Data to SecureStore with PowerShell
number: 42
categories: Scripting
published: true
---

## Problem:
This post generally supersedes the post [Trial#41 - Saving Sensitive Data to File with PowerShell](/scripting/saving-sensitive-data-to-file-with-powershell) with a better solution to the same problem.  

That being, saving credentials or passwords in a secure but conveniently retrievable way for later unattended use.


## Solution:
PowerShell has a group of modules to manage secret management.  These include [Microsoft.PowerShell.SecretManagement](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.secretmanagement/?view=ps-modules){:target="_blank"} and in the simple example to be demonstrated [Microsoft.PowerShell.SecretStore](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.secretstore/?view=ps-modules){:target="_blank"}.  

Others modules are available for many password and credential management systems, 24 at time of publishing @ the [PowerShell Gallery](https://www.powershellgallery.com/packages?q=Tags%3A%22SecretManagement%22){:target="_blank"}.  These include modules for 3rd party systems such as LastPass, Chromium and AWS.  I would encourage you to read the [overview](https://learn.microsoft.com/en-us/powershell/utility-modules/secretmanagement/overview?view=ps-modules){:target="_blank"} and drill into it for more information.

I will offer a basic example of how I have used a pair setup and config scripts to keep secrets including passwords and even credentials reasonable secret and my scripts clean.

{% highlight posh %}
#SecretStoreSetup.ps1

#Requires -Modules Microsoft.PowerShell.SecretManagement
#Requires -Modules Microsoft.PowerShell.SecretStore
Register-SecretVault Microsoft.PowerShell.SecretStore
Set-SecretStoreConfiguration -Authentication None
Set-Secret -Name SomeName (Get-Credential "DefaultUser" )
{% endhighlight %}


{% highlight posh %}
#Config.ps1

[pscustomobject]@{
    SomeService = 
        [pscustomobject]@{
            Cred = Get-Secret SomeName
            Host = "craigchamberlain.it"
        }
}
{% endhighlight %}

A SecureStore configured like will make credentials and secure strings accessible without a password for unattended use but only by the user who set the secret initially.  For attended scripts I would still protect the store with a password and even with 2FA if the provider supports this.  However, this method should be at least as secure as saving a string to a file and is much cleaner and simpler to use.  I would be reluctant to use either method if there are untrusted admins of the host or a reasonable possibility of skilled hacker being able to gain access to the machine.