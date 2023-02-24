---
title: Making Class Teams with the MicrosoftTeams PowerShell Module
number: 39
categories: Scripting
---

## Problem:
We have c. 500 different sets, each with at least one teacher and many pupils.  This information is all available from our MIS but how can we automate to provisioning of the Class Teams complete with Classroom Notebooks?

## Solution:

Microsoft provide a very helpful Module called [MicrosoftTeams](https://www.powershellgallery.com/packages/MicrosoftTeams/4.9.1){:target="_blank"}.  

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

Although this approach does work, it runs into problems at scale.  Team creation can be very slow and even at failure prone due to throttling.  For this reason, I found it better to create the teams in several passes with error correction and then populate the sets once this stage is complete.

I get my set information from my MIS in a particular format which might not match your own.  All the same you may find this script a useful resource when creating your own.  I did find some slightly annoying loops when an email address from the MIS did not quite match AD, where a member would be added and removed on each pass, keep your data consistent where you can and look out for similar problems.

{%  gist cf6cae2cecb8343d1b8a361256d12a83 %}

## Batching - Not currently supported:

In the future, there may be better approaches such as batching.  Microsoft also provide a batch option called ````New-CsBatchTeamsDeployment```` which is not clear in the help file but is described in the following article, [Deploy Teams at scale for frontline workers](https://learn.microsoft.com/en-us/microsoft-365/frontline/deploy-teams-at-scale?view=o365-worldwide){:target="_blank"}.

I attempted to use this API using the following tables in csv format.

Team Name       | Existing Team ID  | Visibility    | Team Template ID
---             | ---               | ---           | --- 
Your New Team   |                   | Private       | EDU_Class


User Full Name  |  User UPN or ID    | Team Name     | ActionType | Owner or Member	
---             |---                 |---            |---         | ---  
Mr Teacher      | teacher@domain.com | Your New Team | AddMember  | Owner
Miss Pupil      | puplil@domain.com  | Your New Team | AddMember  | Member

{% highlight posh %}
New-CsBatchTeamsDeployment -TeamsFilePath team.csv -UsersFilePath users.csv -UsersToNotify "admin@domain.com"
{% endhighlight %}

However, the Team Template ID __EDU_Class__ is unsupported which makes this approach useless at this time.  [I have asked Microsoft](https://feedbackportal.microsoft.com/feedback/idea/d0a569bf-f47b-ed11-a81b-000d3ae32cd0){:target="_blank"} if they are going to support this Template or if it operates under a different name but have yet to receive an answer. Please up-vote this if you would like to make Teams this way.


## School Data Sync (SDS):
You may be able to plug your MIS directly into SDS.  It is too prescriptive for our needs but I believe that it could be used to create teams from a custom system for example using the [csv data ingestion](https://learn.microsoft.com/en-gb/schooldatasync/data-ingestion-with-sds-v2.1-csv){:target="_blank"} API.  I may look at using this for Teams creation next school year.

## Microsoft Graph:
I have used Microsoft Graph a little bit now to get data on Teams Assignments and it seems really powerful.  It looks like this might become a good alternative to the Teams Module, please see the [MSGraph Create educationClass endpoint.](https://learn.microsoft.com/en-us/graph/api/educationroot-post-classes?view=graph-rest-beta&tabs=http){:target="_blank"}