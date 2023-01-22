---
title: Saving Sensitive Data to File with PowerShell
number: 39
categories: Scripting
published: true
---

## Problem:
You may want to store credentials on a computer for later use, either to save repeated entry or to allow for automation.  However, this information should rarely be trivially accessible to another user of the computer.  Therefore, saving credentials and other secrets in clear text is not advisable. Some form of encryption or at least obfuscation is advisable.


## Solution:
.NET and PowerShell has a Class called [````SecureString````](https://learn.microsoft.com/en-us/dotnet/api/system.security.securestring){:target="_blank"}  that can be a safer way to hold sensitive data in memory than a simple System.String.  However, it should be noted that [this is not to be considered safe, particularly on non-Windows systems](https://github.com/dotnet/platform-compat/blob/master/docs/DE0001.md){:target="_blank"} .



### Acquire your SecureString

One way to acquire a [````SecureString````] is from the host.

{% highlight posh %}
$secureString = Read-Host -AsSecureString
{% endhighlight %}

You can also convert a standard string from some other input.

{% highlight posh %}
$secureString = "Secret" | ConvertTo-SecureString -AsPlainText
{% endhighlight %}


### Persisting your SecureString
PowerShell has the [````ConvertFrom-SecureString````](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.security/convertfrom-securestring){:target="_blank"}  Cmdlet.

> The ConvertFrom-SecureString cmdlet converts a secure string (````System.Security.SecureString````) into an encrypted standard string (````System.String````). Unlike a secure string, an encrypted standard string can be saved in a file for later use.  
> -- <cite>[ConvertFrom-SecureString](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.security/convertfrom-securestring?view=powershell-7.3#description){:target="_blank"} </cite>

This is an important essential step to serialise our SecureString prior to persisting to a text file.

{% highlight posh %}
$secureString | ConvertFrom-SecureString > secret.txt
{% endhighlight %}

Or even a json structure.

{% highlight posh %}
@{
    Secret = $secureString | ConvertFrom-SecureString
} |
   ConvertTo-Json > secret.json
{% endhighlight %}

### Importing your SecureString
When you read your secure string back from file, it is in the form of an encrypted ````String````, this will almost always need to be converted back to a ````SecureString```` and ultimately a clear text ````String````.

{% highlight posh %}
$encryptedString = Get-Contents secret.txt -Raw
$secureString = $encryptedString | ConvertTo-SecureString
$clearTextString = $secureString | ConvertFrom-SecureString -AsPlainText
{% endhighlight %}