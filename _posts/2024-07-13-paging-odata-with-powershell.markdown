---
title: Paging OData with PowerShell
number: 43
categories: Scripting
published: true
---

## Problem:
If you want to explore or utilise an OData API in PowerShell without any extra dependencies it is quite easy using just ````Invoke-WebRequest```` to acquire the response and ````ConvertFrom-Json```` to parse it into easy to handle ````PSCustomObjects````.

For example:

{% highlight posh %}
Invoke-WebRequest https://services.odata.org/TripPinRESTierService/People  |
            Select-Object -ExpandProperty Content | 
            ConvertFrom-Json |
            Select-Object -ExpandProperty value
{% endhighlight %}

However, if the endpoint has server-driven paging you will not get all of the available values with such a basic approach as you will simply get the first page of values.

## Solution:
In order to demonstrate this solution I split the unpaged response from the TripPinRESTierService into 20 files, the first 19 with the control information annotation [````@odata.nextLink````](https://docs.oasis-open.org/odata/odata-json-format/v4.01/odata-json-format-v4.01.html#sec_ControlInformationnextLinkodatanextL){:target="_blank"}.

If we start with the [first file](https://it-trials.craigchamberlain.it/assets/images/43/0.json){:target="_blank"} we can then iterate through the remaining pages until there the sequence is broken or ended.

{% highlight posh %}
$url = "https://it-trials.craigchamberlain.it/assets/images/43/0.json"

while($url){
    $odata = 
        Invoke-WebRequest $url  |
            Select-Object -ExpandProperty Content | 
            ConvertFrom-Json
    
    $url = $odata."@odata.nextLink"
    $odata.value
}
{% endhighlight %}

It would be nice to check for html status codes and perhaps have some retries but this intended to be the minimum viable solution.  I intend look at more comprehensive solutions including the Command [````Export-ODataEndpointProxy````](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.odatautils/export-odataendpointproxy?view=powershell-5.1){:target="_blank"} in a future post.  Unfortunately, this tool seems to be limited to OData versions 1.0-3.0 and may need some maintenance in order to process the TripPinRESTierService (OData 4.0).  I will investigate using a .NET client library to achieve something similar.