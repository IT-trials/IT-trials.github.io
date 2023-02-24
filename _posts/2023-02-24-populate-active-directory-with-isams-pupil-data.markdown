---
title: Populate Active Directory with iSAMS Pupil Data
number: 40
categories: Scripting
published: true
---

## Problem:
If you work at a school using iSAMS, it is probably your trusted data source for pupil info such as preferred name.  But who maintains AD to make sure changes propagate to your ````Global Address List````?


## Solution:
PowerShell makes the management of Active Directory very easy using the [ActiveDirectory](https://learn.microsoft.com/en-us/powershell/module/activedirectory/){:target="_blank"} Module.

I have published a client and [PowerShell Module](https://github.com/CraigChamberlain/IsamsBatchApiClient.NET.Core){:target="_blank"} the the iSAMS Batch API.

This can be installed from the PowerShell Gallery:
{% highlight posh %}
Install-Module -Name IsamsBatchApi
{% endhighlight %}

We can use these modules to acquire the data and and make changes to Active Directory.

### Acquiring the Pupil Data
The simplest way to get the data is using an API Key

{% highlight posh %}
$pupils = Get-IsamsCurrentPupil -ApiKey "0A1C996B-8E74-4388-A3C4-8DA1E30ADA57"  -IsamsInstance "https://school.isams.cloud"  
{% endhighlight %}

However, this authentication method will be phased out in the future and you will need to Connect using OATH
{% highlight posh %}
Connect-Isams -ClientID "Your_ID" -ClientSecret "Your_SECRET" -IsamsInstance "https://school.isams.cloud" 
$pupils = Get-IsamsCurrentPupil 
Disconnect-Isams
{% endhighlight %}

### Matching with Active Directory
In our environment, the iSAMS property ````SchoolCode```` matches the AD property ````SamAccountName```` which is also a valid [````-Identity````](https://learn.microsoft.com/en-us/powershell/module/activedirectory/get-aduser#-identity){:target="_blank"} property of the ````Get-ADUser````.

Therefore we can iterate over our pupils and attempt to get our AD users like this.

{% highlight posh %}
$pupils | 
    ForEach-Object {
        $user = Get-ADUser $_.SchoolCode -Properties EmployeeID, EmployeeNumber, DisplayName
        # Some action
    }
{% endhighlight %}

However, the iSAMS property ````SchoolCode```` is not a perfect primary key - there is no guarantee of uniqueness and it might change throughout a pupils school career.  Therefore, I prefer to use the iSAMS properties ````Id```` and ````SchoolId```` which I write into the AD properties ````EmployeeID```` and ````EmployeeNumber````.

{% highlight posh %}
Set-ADUser $user -EmployeeID $_.Id -Confirm
Set-ADUser $user -EmployeeNumber $_.SchoolId -Confirm  
{% endhighlight %}

### Example Script
You may be able to use the following script as a starting point for your own environment.  

I store restricted information in a config file using a method I describe in [my next post]({% post_url 2023-02-24-saving-sensitive-data-to-file-with-powershell %})

The following will persist details with at least some obfuscation to file.

{% highlight posh %}
@{
    BatchAPI = @{
        Host = Read-Host -Prompt "Input your iSAMS instance e.g. https://school.isams.cloud"| ConvertTo-SecureString -AsPlainText -Force | ConvertFrom-SecureString
        ClientID = Read-Host -AsSecureString -Prompt "Input your Client ID e.g. 6283d2d5-2518-4999-9db0-cc5c81750069" | ConvertFrom-SecureString
        ClientSecret = Read-Host -AsSecureString -Prompt "Input your Client Secret e.g. 69bd76b9-00ca-44d7-8e86-72368c33c33f" | ConvertFrom-SecureString
    }
    ActiveDirectory = @{
        PupilSearchBase = Read-Host -Prompt "Input the OU you pupils are stored in e.g. OU=Pupils,DC=domain,DC=local"| ConvertTo-SecureString -AsPlainText -Force | ConvertFrom-SecureString
        StaffSearchBase= Read-Host -Prompt "Input the OU you staff are stored in e.g. OU=Staff,DC=domain,DC=local"| ConvertTo-SecureString -AsPlainText -Force | ConvertFrom-SecureString
    }
} | 
    ConvertTo-Json > config.json
{% endhighlight %}

The following script loads this information so it need not be input manually every time it is run.  It will prompt for user confirmation when a new match between AD and iSAMS is found before writing the iSAMS primary key to the AD user.  AD Users with a matching iSAMS ID will have other properties updated to match iSAMS as required.  Furthermore, a set of pupils that may need to be created in AD are collected in the variable ````$isamsUsersToCreate````.

{% gist d70a2804f20abe8ca2a96654d2d587c6 %}