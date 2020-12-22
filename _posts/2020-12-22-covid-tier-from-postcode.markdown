---
title: Querying the gov.uk website for COVID-19 Tier by PostCode
number: 35
categories: Scripting
published: true
---

## Problem:
The UK Government has a special [COVID-19 Data Website](https://coronavirus.data.gov.uk/).

It has a handy tool to pull up local information given a particular.

{% include figure 
	image_path="/assets/images/35/search-by-postcode.jpg" 
	alt="closeup of tool on the https://coronavirus.data.gov.uk/ website" 
	caption="Look up a COVID-19 summary by postcode" 
%}

{% include figure 
	image_path="/assets/images/35/summary.jpg" 
	alt="closeup of custom dashboard on the https://coronavirus.data.gov.uk/ website" 
	caption="You are presented with a custom dashboard for the region the postcode falls within " 
%}

However, if you want to look up a collection of postcodes this process might be time consuming. There is an API and [docs provided](https://coronavirus.data.gov.uk/details/developers-guide){:target="_blank"}.  However, I could not see an endpoint that took a postcode.


## Solution:

Fortunately, the custom postcode dashboards are accessible by a query string.  So we can work through a set of postcodes by making a series of get requests.

{% include figure 
	image_path="/assets/images/35/query-string.jpg"
	alt="closeup of custom dashboard on the https://coronavirus.data.gov.uk/ website" 
	caption="Note the end <code>?postcode=DL10+6DN</code>" 
%}

I put together a minimal viable powershell script.  I will not explain every step here but it uses the ````Invoke-WebRequest```` ````Cmcmdlet```` to ````GET```` and parse the webpage, drill into the required page elements and interpret the human readable text into structured data.  There is quite a lot of Regex for validation and data scraping which I plan to cover in another post.

{% gist 24be9c7ffb28a0c7f2b5cdaaed87c89a %}


## Pitfalls: 

Invoke-WebRequest and the automatic parser are not especially quick or optimised.  For heavy use it would be better to write a custom tool using a common ````.NET HttpClient```` with parallel execution and an optimised scraper.

As my address list contained duplicate postcodes, I first made a list of unique postcodes and then constructed a ````Hashtable```` with the results of my above script per postcode.  I then join this ````Hashtable```` to the original set to avoid repeated lookups of the same postcode. 

{% gist 500496f9424b42a32153e591f6e577b8 %}

 Another advantage is that you can investigate missing values without iterating over the entire set of postcodes.

{% highlight powershell %}
$problemPostCode = $dict.GetEnumerator() |? {$_.Value -eq $null} 
$problemTier = $dict.GetEnumerator() |? {$_.Value.covidTier -eq $null} 

# Attempt to correct missing values
$problemTier |% {$dict[$_.Key] = .\Get-CoronovirusGovData.ps1 $_.Key }
{% endhighlight %}

There are other data points on the page that could be scraped.  However, at this point we have a geographic area for each postcode.  We would be far better served using this to query the API and obtain the structured data directly.