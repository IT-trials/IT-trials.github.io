---
title: Exploring the iSAMS PowerBI Custom Connector
number: 42
categories: PowerBI
published: false
---

## Problem:
You may want to access data from iSAMS in a PowerBI dashboard.  This is possible using the [````Web.Conents()````](https://docs.microsoft.com/en-us/powerquery-m/web-contents){:target="_blank"} API.  However, you end up having to store a Api Key inside the file which is a security problem and there is quite a lot of preparation and tidying up.

## Solution:
I decided to write a custom connector to package all of this data preparation and to leverage the PowerBI security model to safeguard the key as best as I am able [(See Pitfall 1)](#Pitfall_1).  

If you wish to trial this beta version, please go ahead and download my [Custom Connector](/assets/images/42/iSAMSBatchApiDataConnector.mez).  I will make the code and a package available at github in due course.

In order to use a custom connector it you have to follow the instructions which are available in full over at the [PowerQuerySDK Docs](https://learn.microsoft.com/en-us/power-query/install-sdk#distribution-of-data-connectors){:target="_blank"}.

There are three steps:

> ### Power BI Desktop users can follow the steps below to consume a Power Query custom connector:
> 1. Copy the extension file (.mez or.pqx) into ````[Documents]/Power BI Desktop/Custom Connectors````.
> 2. In Power BI Desktop, select the ````(Not Recommended) Allow any extension to load without validation or warning```` option under ````File > Options and settings > Options > Security > Data Extensions````.
> 3. Restart Power BI Desktop. 
> -- <cite>[PowerQuerySDK Docs](https://learn.microsoft.com/en-us/power-query/install-sdk#power-bi-desktop){:target="_blank"} </cite>

![Lower your security settings](/assets/images/42/security.png)

Once you restart Power BI Desktop you should have access to the new Connector ````iSAMSBatchApi (beta)```` in the ````Other```` category.
N.B. your ````[Documents]```` may not be ````~/Documents```` and instead may be inside at ````OneDrive/Documents````.

The connector will first prompt you for the host of your instance e.g. "https://instance.domain.com"
![iSAMSBatchApi (beta)](/assets/images/42/select-host.png)

The connector will then prompt you for the host of your key e.g. "9e8bbcd9-de57-4501-b515-352f1e8c8287"
![iSAMSBatchApi (beta)](/assets/images/42/select-key.png)

Select all of the endpoints you wish to load into the Model, initially this simply covers the Free/Core portion of the BatchAPI but I would consider extending to the entire API and perhaps make a second for the RestAPI.
![PowerBI Model Diagram](/assets/images/42/get-data.png)
![PowerBI Model Diagram](/assets/images/42/relationships.png)

Once your data is loaded you can connect the tables in the model to the following specification.
![PowerBI Model Diagram](/assets/images/42/model.png)

## Pitfall 1:
N.B. it will still be sent in plain text as part of the URL so should not be used over an insecure network.  The OAuth API of the PowerQuerySDK only seems to support interactive logins with a redirect page etc. However, the OAuth version of the iSAMS API does not support this.  I may look at providing an alternative version that queries files over a file system.  The files can be retrieved securely using a ConsoleApp or PowerShell Script on a ScheduledTask. 