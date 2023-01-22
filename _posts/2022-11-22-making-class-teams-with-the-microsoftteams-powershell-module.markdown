---
title: Making Class Teams with the MicrosoftTeams PowerShell Module
number: 39
categories: Scripting
published: false
---

## Problem:
We have c. 500 different sets, each with at least one teacher and many pupils.  This information is all available from our MIS but how can we automate to provisioning of the Class Teams complete with Classroom Notebooks?

## Solution:

Microsoft provide a very helpful Module called [MicrosoftTeams](https://www.powershellgallery.com/packages/MicrosoftTeams/4.9.1).  

You might need to install and then connect to your Office365 instance before trying following along.

{% highlight posh %}
Install-Module -Name MicrosoftTeams
Connect-MicrosoftTeams
{% endhighlight %}

The template for a Class Team is called __EDU_Class__ and can be used like this

{% highlight posh %}
$newTeam = New-Team -Template EDU_Class -DisplayName "Your New Team"
{% endhighlight %}

Once you have a team, via the return object of ````New-Team```` or ````Get-Team````, you can add members and teachers using ````Add-TeamUser````. 

{% highlight posh %}
Add-TeamUser -GroupId $newTeam.GroupId -User pupil@domain.com -Role "Member"
Add-TeamUser -GroupId $newTeam.GroupId -User teacher@domain.com -Role "Owner"
{% endhighlight %}

However, this approach does not scale very.  With team creation being particularly slow and even at risk of failure due to throttling.

For this reason Microsoft also provide a batch option called ````New-CsBatchTeamsDeployment```` which is not clear in the help file but is described in the following article, [Deploy Teams at scale for frontline workers](https://learn.microsoft.com/en-us/microsoft-365/frontline/deploy-teams-at-scale?view=o365-worldwide).

Team Name       | Existing Team ID  | Visibility    | Team Template ID
---             | ---               | ---           | --- 
Your New Team   |                   | Private       | EDU_Class ??


User Full Name  |  User UPN or ID    | Team Name     | ActionType | Owner or Member	
---             |---                 |---            |---         | ---  
Mr Teacher      | teacher@domain.com | Your New Team | AddMember  | Owner
Miss Pupil      | puplil@domain.com  | Your New Team | AddMember  | Member

With these two files you can initiate a batch:

{% highlight posh %}
New-CsBatchTeamsDeployment -TeamsFilePath team.csv -UsersFilePath users.csv -UsersToNotify "admin@domain.com"
{% endhighlight %}

This all works fine so long as you don't use the Team Template ID __EDU_Class__ which means you have to create one at a time, and very carefully!!!!


