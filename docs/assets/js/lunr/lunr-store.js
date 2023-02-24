var store = [{
        "title": "Office 2013 Rearm",
        "excerpt":"Error: Microsoft Office 2013 (or Higher) is failing to activate via KMS on machines built from MDT with Office pre-installed on the wim image. Applies to: MDT 2013 Update 1 or Less/Microsoft Office 2013 or Greater Cause: Office is given a unique ID (CMID) during installation. This is being copied...","categories": ["MDT"],
        "tags": [],
        "url": "/mdt/office2016-rearm",
        "teaser": null
      },{
        "title": "ArtCAM 2015 R2 - JewelSmith Deployment",
        "excerpt":"Problem: ArtCAM 2015 R2 - JewelSmith is used by DT at our school. It has no silent install option, a very long installation process and lots of manual user interaction. The first installer leaves you with an application with a massive bug and a second installer with updates has to...","categories": ["MDT"],
        "tags": [],
        "url": "/mdt/deploy-artcam2015r2",
        "teaser": null
      },{
        "title": "KeyShot",
        "excerpt":"Problem: KeyShot is installed as part of ArtCam 2015 R2 at our school. I found that users were being prompted for a license/product activation even though the product should be automatically licensed in the ArtCam Installation. Solution: Point KeyShot at the .lic file at using Group Policy ArtCam 2015 R2...","categories": ["GPO"],
        "tags": [],
        "url": "/gpo/deploy-keyshot5",
        "teaser": null
      },{
        "title": "SolidWorks 2016 Silent Install",
        "excerpt":"Problem: The silent installer doesn’t work from command line. Forget PDQ deploy/SSCM/MDT task sequence deployment or make it work yourself. Solution: Read the docs and write a script: prerequisites installer My Script… so far: The following script was intended to be run from the root of an admin image made...","categories": ["MDT"],
        "tags": [],
        "url": "/mdt/solidworks2016",
        "teaser": null
      },{
        "title": "Packaging Sibelius 7.1 Installer",
        "excerpt":"Problem The Sibelius installer doesn’t initially seem to have a silent install option. The usual /s &amp; /q switches have no effect. There is also no support for the “/?” or “/h” switches. In our environment we have a manual install process that includes running an installer, an update installer,...","categories": ["MDT"],
        "tags": [],
        "url": "/mdt/sibelius-silent-installer",
        "teaser": null
      },{
        "title": "Relative Paths in Scripts",
        "excerpt":"Problem: I want to put a batch file in with a load of installation media on a server share, access it from a UNC path, and have it install a list of programs with given switches and parameters. Solution: Use Powershell, it can natively execute over UNC and has support...","categories": ["Scripting"],
        "tags": [],
        "url": "/scripting/relative-paths-in-scripts",
        "teaser": null
      },{
        "title": "Launching an MDT build from Litetouch.vbs while logged into Windows",
        "excerpt":"Problem: I want to be able to rebuild computers using MDT without turning up physically to PXE boot them. Solution: It is possible to start a build from a computer booted into windows through the Litetouch.vbs Inside a deployment share there is a directory called scripts which contains many important...","categories": ["MDT"],
        "tags": [],
        "url": "/mdt/litetouch-from-within-windows",
        "teaser": null
      },{
        "title": "Lego Mindstorm & WeDo",
        "excerpt":"Problem Create a Silent Installer for Mindstorm EV3 Edu &amp; WeDo. These packages seem to contain development platforms, drivers and configuration upload utilities for two classes of Lego Controllers. Mindstorm was so easy it’s not worth mentioning but WeDo provided a couple of challenges Solution Mindstorm installs simply using the...","categories": ["Scripting"],
        "tags": [],
        "url": "/scripting/lego",
        "teaser": null
      },{
        "title": "Filter Unique Elements in A Set",
        "excerpt":"Problem Using Powershell, find and count the unique entries in a set $set containing unsorted, repeated characters. Solution A first scan of solutions online provided the following. $set | sort -unique This wasn’t very quick on large sets and I was interested in finding a .NET data type specialized for...","categories": ["Scripting"],
        "tags": [],
        "url": "/scripting/rapid-unique-filter",
        "teaser": null
      },{
        "title": "Wake on Lan Utility with DHCP Query",
        "excerpt":"Problem: Wake on LAN for client machines on a domain with c.400 computers using a database of MAC addresses. Solution: This post has been almost entirely superseded by a newer post. This post may morph into a tutorial on refactoring or I may just redirect to the newer post. Wake...","categories": ["Scripting"],
        "tags": [],
        "url": "/scripting/wake-on-lan-with-dhcp-utility",
        "teaser": null
      },{
        "title": "Does C# have something like php's isset()?",
        "excerpt":"Problem: I’ve been making a dogs ear of an if statement in PowerShell but what I need is an isset like method. if($var1 -eq $null -or $var1 -eq \"\"){ \"There must be a much better way\" } elseif($var2 -ne $null -and $var2 -ne \"\"){\"This is even worse\"} Solution: Enter .Net...","categories": ["Scripting"],
        "tags": [],
        "url": "/scripting/does-csharp-have-isset",
        "teaser": null
      },{
        "title": "Enable Wake on a Windows Client",
        "excerpt":"Problem: I found a lot of posts suggesting to enable WOL from a windows GUI and maybe others offering a registry modification. I had no luck with either on our domain. Solution: My boss, a linux man, suggested the following, using netsh, and it worked a dream. Netsh int ip...","categories": ["Scripting"],
        "tags": [],
        "url": "/scripting/enable-wake-on-lan-on-windows-clients",
        "teaser": null
      },{
        "title": "Why is Write-Verbose not Doing Anything?",
        "excerpt":"Problem: I made a script with some functions in it and the built in PowerShell verbose switch is doing absolutely nothing. ./MyScript.ps1 -verbose #I'm having to revert to write host to have a clue what is happening! Solution: Give PowerShell a chance - it’s made it pretty easy for you...","categories": ["Scripting"],
        "tags": [],
        "url": "/scripting/why-is-write-verbose-doing-nothing",
        "teaser": null
      },{
        "title": "Netsh for Windows Network Problems",
        "excerpt":"Problem: You have a network adapter that is not working. You’ve tried everything you can think of under change adapter settings - No unwanted IP address, Proxy, VPN or DNS settings. Is there anything to try other than trying to replace corrupted drivers or even rebuild the computer? Solution: Try...","categories": ["Scripting"],
        "tags": [],
        "url": "/scripting/netsh-for-windows-network-problems",
        "teaser": null
      },{
        "title": "Wake on Lan Utility with PDQ Query and DHCP Option",
        "excerpt":"Problem: Wake on LAN for client machines on a domain with c.400 computers using a database of MAC addresses. Solution: Wake On LAN or WOL, Using Magic Packets, requires, at the least, knowledge of the target computers Mac Address. MAC address aren’t particularly human readable and therefore we rarely use...","categories": ["Scripting"],
        "tags": [],
        "url": "/scripting/wake-on-lan-with-pdq-query",
        "teaser": null
      },{
        "title": "Task Scheduler Custom Event Trigger with XML Filter and Parameter Output",
        "excerpt":"Problem: I want to archive user files to a secure location on their logout. I could probably do this with a logout script but I don’t want the user to have any access to the archive location. Solution: Task Scheduler can run tasks and scripts as a privileged user but...","categories": ["Scripting"],
        "tags": [],
        "url": "/scripting/task-scheduler-custom-event-trigger-with-xml-filter",
        "teaser": null
      },{
        "title": "Installing PowerShell 5.1",
        "excerpt":"Problem: PowerShell 5.1 is available. To standardise the version of PowerShell on the network to the level of newer Server 2016 and Windows 10 machines I want install the Windows Management Framework 5.1 everywhere possible. However, it doesn’t install so easily as Windows Management Framework 5 for Windows 7 machines....","categories": ["Scripting"],
        "tags": [],
        "url": "/scripting/installing-powershell-5-point-1",
        "teaser": null
      },{
        "title": "Set PowerShell as Default Shell for Server Core",
        "excerpt":"Problem: When you log onto a server Core instance. CMD.exe is the default shell. It can get quite frustrating launching PowerShell on every login if this is your preferred Shell. Solution: From Server 2012? there is a registry hive Richard J Green has a great solution here. I fear this...","categories": ["GPO"],
        "tags": [],
        "url": "/gpo/set-powershell-as-default-shell-for-server-core",
        "teaser": null
      },{
        "title": "Installing Microsoft User Experience Virtualization (UE-V) 2.1 SP1",
        "excerpt":"Problem: Microsoft User Experience Virtualization or UE-V has largely replaced more traditional roaming profiles. I’m currently rolling this out on Windows 7 to use sympathetically with the growing collection of Windows 10 machines which natively support UE-V and really doesn’t work well with roaming profiles. UE-V is available as part...","categories": ["Scripting"],
        "tags": [],
        "url": "/scripting/installing-uev-2-point-1-sp1",
        "teaser": null
      },{
        "title": "Passing a Scriptblock with Arguments to a New Powershell Instance",
        "excerpt":"Problem: Its quite hard to Pass a Scriptblock with Arguments to a new powershell instance. In a normal process the following works perfectly: $arg = \"HAM\" $command = {param($ham) write-host $ham} &amp; $command $arg However the following and hundred of similar more complex variations produced odd string based output and...","categories": ["Scripting"],
        "tags": [],
        "url": "/scripting/passing-a-scriptblock-with-arguments-to-a-new-powershell-instance",
        "teaser": null
      },{
        "title": "DynamoDB database not found \"Amazon.DynamoDBv2.Model.ResourceNotFoundException\"",
        "excerpt":"Problem: Following a basic AWS SDK for .NET setup as per Matthew Harper ‘s helpful beginner tutorial My program was throwing an “Amazon.DynamoDBv2.Model.ResourceNotFoundException”. The following line turned out to be at fault blame: AmazonDynamoDBClient client = new AmazonDynamoDBClient(credentials); When instantiating the AmazonDynamoDBClient, if no Region is passed to the constructor...","categories": ["AWS"],
        "tags": [],
        "url": "/aws/dynamodb-database-not-found-exception",
        "teaser": null
      },{
        "title": "DynamoDB Reserved Keyword \"ValidationException\"",
        "excerpt":"Problem: If you follow AWS’s executive summary regarding the naming of keys, particularly primary keys , as of date of publishing (11th Sept. 2020) you may note there is no mention of reserved keywords. You may very well only hear about reserved keywords when you try and query your nicely...","categories": ["AWS"],
        "tags": [],
        "url": "/aws/dynamodb-reserved-keyword-validation-exception",
        "teaser": null
      },{
        "title": "Amplify Build Errors (Jekyll Static Site)",
        "excerpt":"Problem: If you have been developing against up-to-date versions of Jekyll, Ruby or Bundle, you may get some version issues when you first add a site to AWS Amplify. 2020-09-11T17:36:19.251Z [WARNING]: Warning: the running version of Bundler (2.0.1) is older than the version that created the lockfile (2.1.4). We suggest...","categories": ["AWS"],
        "tags": [],
        "url": "/aws/aws-amplify-build-failures",
        "teaser": null
      },{
        "title": "Lambda Local Invocation DynamoDB Request Hanging and Eventual \"CLR/System.Net.Http.HttpRequestException\"",
        "excerpt":"Problem: When attempting to query or interact with a local DynamoDB instance from a local invocation of a Lambda Function, the request hangs for a considerable period and then raises an CLR/System.Net.Http.HttpRequestException. With the message: \"Cannot assign requested address\" N.B. With .NET version 3.1, it can be hard to pinpoint...","categories": ["AWS"],
        "tags": [],
        "url": "/aws/lambda-function-local-invocation-dynamodb-http-request-exception",
        "teaser": null
      },{
        "title": "Invalid DynamoDB KeyConditionExpression \"ValidationException\"",
        "excerpt":"Problem: If you attempt to use the DynamoDB KeyConditionExpression like you might a SQL query, and chain on several clauses with the and keyword, you may experience one of the two following error messages in the a Amazon.DynamoDBv2.AmazonDynamoDBException \"ValidationException\" \"Conditions can be of length 1 or 2 only\" \"Query condition...","categories": ["AWS"],
        "tags": [],
        "url": "/aws/invalid-dynamodb-key-condition-expression",
        "teaser": null
      },{
        "title": "Migrate DynamoDB Table Remote/Cloud",
        "excerpt":"Problem: You may need a method to migrate in and out of AWS if you: Develop a dataset locally and want to move to the cloud Need too develop locally against data originating in the cloud Solution: AWS has an enterprise level solution, Data Pipeline which may not be required...","categories": ["AWS"],
        "tags": [],
        "url": "/aws/migrate-dynamodb-table",
        "teaser": null
      },{
        "title": "Migrate Git LFS files from Netlify Large Media to another LFS provider",
        "excerpt":"Problem: If you want to fork or even clone a repository that is using Netlify Large Media as it’s Git Large File Storage provider, the large files may not be available to you. For example I want to process my some Netlify Large Media assets using gulp to standardise filetype...","categories": ["Azure"],
        "tags": [],
        "url": "/azure/migrate-git-lfs-from-netlify-lm",
        "teaser": null
      },{
        "title": "How To Debug Someone Else's NuGet Package in VSCode",
        "excerpt":"Problem: There may come a time when you want to investigate unexpected behaviour or even an exceptions while using a NuGet package. Without some configuration, or tooling such as dotPeek, you probably cannot follow the stack trace outside the boundary of your source code. Solution: I found the following article...","categories": ["Debugging"],
        "tags": [],
        "url": "/debugging/debug-someone-elses-nuget-package",
        "teaser": null
      },{
        "title": "Iterating Over Multiple API Endpoints in a PowerBI Query",
        "excerpt":"Problem: It is straight forward to source data from a web request in PowerBI. You can do so by selecting Get Data -&gt; Web. Optionally, under advanced you can “Add Parts” to your URL. For example, the code behind below, found in the advanced editor, is generated by the URL...","categories": ["PowerBI"],
        "tags": [],
        "url": "/powerbi/iterating-over-multiple-endpoints-in-powerbi",
        "teaser": null
      },{
        "title": "Accessing Active Directory Users in PowerBI Model",
        "excerpt":"Problem: PowerBI has supports connecting to Active Directory as standard. However, this is not as simple or as intuitive as either the popular Active Directory GUIs tool or the indispensable PowerShell ActiveDirectory Module. I will first show how to connect to Active Directory Users and then have several more posts...","categories": ["PowerBI"],
        "tags": [],
        "url": "/powerbi/active-directory-users-in-powerbi-model",
        "teaser": null
      },{
        "title": "Transform Active Directory User CN to OU in PowerBI Model",
        "excerpt":"Problem: One of the columns present in the Users table is distinguishedName. The OU of the user is not obviously available in the table or inside any of its records. Solution: One simple solution, using the menus takes just three steps and covers over 99% of accounts in my domain...","categories": ["PowerBI"],
        "tags": [],
        "url": "/powerbi/active-directory-users-in-powerbi-model-transform-cn-to-ou",
        "teaser": null
      },{
        "title": "Making OUs More Readable with a Related Table in PowerBI Model",
        "excerpt":"Problem: I my previous posts I covered connecting PowerBI to AD and forming an custom “OU” column. The values in this “OU” column do not look great in reports if we want to select our users by OU, it would be preferable to have something neater. For example: Staff looks...","categories": ["PowerBI"],
        "tags": [],
        "url": "/powerbi/active-directory-ou-related-table",
        "teaser": null
      },{
        "title": "Querying AD Users Group Membership with PowerBI",
        "excerpt":"Problem: Group membership can be found quite deep inside the securityPrincipal record of an AD user. There are two lists msds-tokenGroupNamesGlobalAndUniversal &amp; msds-tokenGroupNamesNoGCAcceptable. I found these groups lists largely symmetrical but unfortunately but both contained unique values so for completeness, we may need to Union these lists. Furthermore, this combined...","categories": ["PowerBI"],
        "tags": [],
        "url": "/powerbi/active-directory-groups-related-table",
        "teaser": null
      },{
        "title": "AD User Account Status in PowerBI Model",
        "excerpt":"Problem: I my previous posts I covered connecting PowerBI to AD and forming and returning user account data. However, on inspecting the results it is not clear if users are enabled, disabled or in any other given state. This might be really important if you are attempting to use PowerBi...","categories": ["PowerBI"],
        "tags": [],
        "url": "/powerbi/active-directory-account-status-related-table",
        "teaser": null
      },{
        "title": "Querying the gov.uk website for COVID-19 Tier by PostCode",
        "excerpt":"Problem: The UK Government has a special COVID-19 Data Website. It has a handy tool to pull up local information given a particular. Look up a COVID-19 summary by postcode You are presented with a custom dashboard for the region the postcode falls within However, if you want to look...","categories": ["Scripting"],
        "tags": [],
        "url": "/scripting/covid-tier-from-postcode",
        "teaser": null
      },{
        "title": "Making a PowerQuery (M) Http POST Request",
        "excerpt":"Problem: PowerBi makes it very easy for you to make http GET requests, which can sometimes be done simply from navigating through a GUI. I talked about this process briefly in a previous blog. However, some REST or other data APIs require a POST request for example a request with...","categories": ["powerbi"],
        "tags": [],
        "url": "/powerbi/making-a-powerquery-post-request",
        "teaser": null
      },{
        "title": "Parsing and Transforming ALIS grade export data",
        "excerpt":"Problem: At the school at which I work, we had no way of importing our baseline ALIS scores into our MIS and other custom reporting tools. At times this information was simply input by hand into forms in the MIS. I decided to work out how to parse exports so...","categories": ["Scripting"],
        "tags": [],
        "url": "/scripting/parsing-alis-grade-exports",
        "teaser": null
      },{
        "title": "Parsing and Transforming MidYIS grade export data",
        "excerpt":"Problem: At the school at which I work, we had no way of importing our baseline MidYIS scores into our MIS and other custom reporting tools. At times this information was simply input by hand into forms in the MIS. I decided to work out how to parse exports so...","categories": ["Scripting"],
        "tags": [],
        "url": "/scripting/parsing-midyis-grade-exports",
        "teaser": null
      },{
        "title": "Making Class Teams with the MicrosoftTeams PowerShell Module",
        "excerpt":"Problem: We have c. 500 different sets, each with at least one teacher and many pupils. This information is all available from our MIS but how can we automate to provisioning of the Class Teams complete with Classroom Notebooks? Solution: Microsoft provide a very helpful Module called MicrosoftTeams. You might...","categories": ["Scripting"],
        "tags": [],
        "url": "/scripting/making-class-teams-with-the-microsoftteams-powershell-module",
        "teaser": null
      },{
        "title": "Populate Active Directory with iSAMS Pupil Data",
        "excerpt":"Problem: If you work at a school using iSAMS, it is probably your trusted data source for pupil info such as preferred name. But who maintains AD to make sure changes propagate to your Global Address List? Solution: PowerShell makes the management of Active Directory very easy using the ActiveDirectory...","categories": ["Scripting"],
        "tags": [],
        "url": "/scripting/populate-active-directory-with-isams-pupil-data",
        "teaser": null
      },{
        "title": "Saving Sensitive Data to File with PowerShell",
        "excerpt":"Problem: You may want to store credentials on a computer for later use, either to save repeated entry or to allow for automation. However, this information should rarely be trivially accessible to another user of the computer. Therefore, saving credentials and other secrets in clear text is not advisable. Some...","categories": ["Scripting"],
        "tags": [],
        "url": "/scripting/saving-sensitive-data-to-file-with-powershell",
        "teaser": null
      }]
