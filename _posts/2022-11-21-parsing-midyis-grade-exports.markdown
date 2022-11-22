---
title: Parsing and Transforming MidYIS grade export data
number: 38
categories: Scripting
published: true
---

## Problem:
At the school at which I work, we had no way of importing our baseline [MidYIS](https://www.cem.org/midyis) scores into our MIS and other custom reporting tools.  At times this information was simply input by hand into forms in the MIS.  I decided to work out how to parse exports so that this was not necessary.  I have a [partner article on the ALIS baseline system](/scripting/parsing-alis-grade-exports).

## Solution:
I will add an appendix with [instructions on how I acquired the data](#data-acquisition) but will dive straight into the implementation of how I chose to parse and transform 

Once you have your file for example __MidYIS Year9 Predictions Feedback.xls__ you may need to unblock a windows security lock and enable content:

<figure>
	<img src="/assets/images/38/unblock.png" alt="Unblock"/>
	<figcaption>
	Unblock
	</figcaption>
</figure>

<figure>
	<img src="/assets/images/38/enable-content.png" alt="Enable Content"/>
	<figcaption>
	Enable Content
	</figcaption>
</figure>

Choose the Appropriate Tab e.g. __GCSE (9-1) Preds__ and then select __Generate File for MIS Import__.

<figure>
	<img src="/assets/images/38/navigate-tab.png" alt="Choose the Appropriate Tab"/>
	<figcaption>
	Choose the Appropriate Tab
	</figcaption>
</figure>

<figure>
	<img src="/assets/images/38/generate-xml.png" alt="Generate XML"/>
	<figcaption>
	Generate XML
	</figcaption>
</figure>

### Interpreting the file with PowerShell

You can use the .NET  ````XML```` type to get a structured object from a valid XML document e.g. If you are working with a huge file you could be more careful and scan through a memory stream for the content of interest.

{% highlight posh %}
$import = [XML](Get-Content ".\PredIE9XML_000XXXXX.xml")
{% endhighlight %}

If we explore the data we can traverse to a Node containing all of our predicted results.

{% highlight posh %}
$import["ResultFile"]["ResultNode"]
{% endhighlight %}

A single child Node of this contains all the data associated to a particular pupil in the result node.

{% highlight posh %}
$import["ResultFile"]["ResultNode"][0]["Result"]
{% endhighlight %}

However, many of the fields have values that I wish to tidy up.  Chief amongst this is the subject title which is normalised across another node which must be referenced by a foreign key, the __AspectExternalId__.

The subjects are stored in the __AspectNode__ and the content of a single subject in the child node __Aspect__.

{% highlight posh %}
["ResultFile"]["AspectNode"]
["ResultFile"]["AspectNode"][0]["Aspect"]
{% endhighlight %}

One could find the relevant Aspect using a ````Where-Object```` but this is inefficient and will require excessive enumeration.

A more efficient way of doing this is to enumerate the Aspects once and assemble a HashTable table keyed on the primary key.

I take the opportunity while doing this of cleaning the Title too which is prefixed with the text "GCSE 9-1 " and suffixed with the text " I Year9 Pred" e.g. "GCSE 9-1 Mathematics I Year9 Pred".  I strip this out with a little regex.

{% highlight posh %}
$Name = @{
            Name = "Name"; 
            Expression = { 
                if($_.Name -Match "GCSE 9-1 (?<Subject>[a-zA-Z ]+) I Year9 Pred"){
                    $Matches.Subject
                }
            }
        }

$subjectHash = @{}

$import["ResultFile"]["AspectNode"] | 
    Select-Object -ExpandProperty "Aspect" | 
    Select-Object -Property $Name, ExternalId |
    ForEach-Object {
        $subjectHash.Add($_.ExternalId, $_.Name)
    }
{% endhighlight %}

We can now iterate over the pupils' results forming up the data in a clean and more friendly format.

{% highlight posh %}
$subjectFromId = @{
    Name = "Subject";
    Expression = {
        $subjectHash[$_.AspectExternalId]
    }
}

$Forename = @{
    Name = "Forename";
    Expression = {
        $_.Forename.Trim()
    }
}

$Surname = @{
    Name = "Surname";
    Expression = {
        $_.Surname.Trim()
    }
}

$Attainment = @{Name="Attainment"; Expression = {$_."ResultValue"}}

$data = $import["ResultFile"]["ResultNode"] | 
    Select-Object -ExpandProperty "Result" |
    Select-Object -Property DOB, $Forename, $Surname, Gender, $subjectFromId, $Attainment 
{% endhighlight %}

The data can now be exported onto a JSON file or flattened into a csv or even back into XML.  However, before I export I needed to add a foreign key to match the pupils with our MIS and custom reporting system.

If I cover this in another article I shall post a link here.

<h2 id="data-acquisition">Acquire Data from CEM</h2>

Head over to _Cambridge University Press_ & _Assessment's Centre for Evaluation Monitoring_ and log into the [MidYIS](https://css.cemcentre.org/SecondaryPlusNet/Login.aspx) portal using your school's credentials.

Drill down into the __Reports -> Data and Reports__ page

<figure>
	<img src="/assets/images/38/data-and-reports.png" alt="Navigate to Original Excel/PDF Reports"/>
	<figcaption>
	Navigate to Original Excel/PDF Reports
	</figcaption>
</figure>

Drill down into __Original Excel/PDF Reports__ and download your file.

<figure>
	<img src="/assets/images/38/download.png" alt="Download"/>
	<figcaption>
	Download
	</figcaption>
</figure>

For example I use the __Independent Schools' Predictions and Chances Graphs (including MIS import files)__ you might use a similar one.
