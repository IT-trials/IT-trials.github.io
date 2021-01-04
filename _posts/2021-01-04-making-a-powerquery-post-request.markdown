---
title:Making a PowerQuery (M) Http POST Request
number: 36
categories: powerbi
published: true
---

## Problem:
PowerBi makes it very easy for you to make http ````GET```` requests, which can sometimes be done simply from navigating through a GUI.

{% include figure 
	image_path="/assets/images/29/gui.jpg"
	alt="screenshot of the PowerBi Web Source GUI" 
%}

I talked about this process briefly in a [previous blog](/powerbi/iterating-over-multiple-endpoints-in-powerbi).

However, some ````REST```` or other data APIs require a ````POST```` request for example a request with a ````JSON```` or ````XML```` body.

There is an option to add header information in the new ````Web Source```` dialogue box.

## Solution:

I found a [recommendation on the PowerBi Community page](https://community.powerbi.com/t5/Desktop/How-to-run-POST-request-in-M/td-p/457138){:target="_blank"} to add a ````Content```` parameter to the request. 

It is worth referring to the [````Web.Conents()````](https://docs.microsoft.com/en-us/powerquery-m/web-contents){:target="_blank"} API to understand this. 

{% include figure 
	image_path="/assets/images/36/web-content-api.jpg"
	alt="screenshot of the official docs of the Web.Conents Function" 
%}

As we can see ````Web.Conents```` has an optional ````Options```` parameter of record type.  There are various options we can set here including the Header which itself a record type. Although it doesn't say here, the Content parameter is of binary type, as explained by [Imke Feldmann](https://de.linkedin.com/in/imkefeldmann){:target="_blank"} at the [BICCOUNTANT](https://www.thebiccountant.com/2018/06/05/easy-post-requests-with-power-bi-and-power-query-using-json-fromvalue/){:target="_blank"}.  Therefore you can turn an arbitrary text value into binary with ````Text.ToBinary()```` or produce a JSON or XML response from table data.


Here is a basic an example function that performs a request:

{% highlight powerquery %}
let GetReports = (Id as number) =>

    let
    //Parameters
        ClientSecret = "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
    //Variables
        Url = "https://example.domain/resource?apiKey="& ClientSecret,
        Request = "<?xml version=""1.0"" encoding=""utf-8"" ?>
    <YourTag>
        <YourData meta="""& Number.ToText(Id) &""" Status=""1"" />
    </YourTag>",
           Source = Json.Document(Web.Contents(Url, [Content=Text.ToBinary(Request)]))
    in  Source

in GetReports
{% endhighlight %}

## Pitfalls:

If you are working with string literals be careful to escape internal ````"```` by simply doubling the double quote ````""````.

Ben Gribaudo has a [great primer over at his blog](https://bengribaudo.com/blog/2018/06/26/4470/power-query-m-primer-part6-types-intro-text){:target="_blank"} on working with and escaping characters in strings.