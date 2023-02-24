---
title: Parsing and Transforming ALIS grade export data
categories: Scripting
number: 37
published: true
---
## Problem:
At the school at which I work, we had no way of importing our baseline [ALIS](https://www.cem.org/ALIS){:target="_blank"} scores into our MIS and other custom reporting tools.  At times this information was simply input by hand into forms in the MIS.  I decided to work out how to parse exports so that this was not necessary.  I have a [partner article on the MidYIS baseline system](/scripting/parsing-midyis-grade-exports){:target="_blank"}.

## Solution:
I will add an appendix with [instructions on how I acquired the data](#data-acquisition) but will dive straight into the implementation of how I chose to parse and transform 

Once you have your file, open and save as xlsx.  The OpenOfficeSDK used in the [ImportExcel module](https://www.powershellgallery.com/packages/ImportExcel){:target="_blank"} cannot open xls files.  You may need to install the module

{% highlight posh %}
Install-Module -Name ImportExcel 
{% endhighlight %}

Now load the file up in PowerShell.

{% highlight posh %}
$import = Open-ExcelPackage -Path ".\AlisExport.xlsx"
{% endhighlight %}

The data is flat, many lines per pupil per subject.  I find a graph structure more convenient and so populate a HashTable as I iterate over each line, skipping the first 5.  I use a complex key for my HashTable using all the information I will need to match the pupils against my MIS.

Although I iterate over Column B, I use each cells row ID to jump to other cells in the row to pick out other data of interest.

{% highlight posh %}
$PredictedGradeHash = @{}

$import.Workbook.Worksheets["Sheet1"].Cells["B:B"] | 
    ForEach-Object {
        $row = $_.Start.Row
        if($row -gt 5){
            $PupilName = $_.Value
            $Gender = $import.Workbook.Worksheets["Sheet1"].Cells["C$row"].Value
            $DOB = $import.Workbook.Worksheets["Sheet1"].Cells["D$row"].Value
            $pupilId = $PupilName + "::" + $Gender + "::" + $DOB
            if(-not $PredictedGradeHash.ContainsKey($pupilId )){
                $PredictedGradeHash.Add($pupilId , @{})
            }
            $Subject = $import.Workbook.Worksheets["Sheet1"].Cells["G$row"].Value
            $AlisPredictedGrade = $import.Workbook.Worksheets["Sheet1"].Cells["N$row"].Value
            $PredictedGradeHash[$pupilId].Add($Subject, $AlisPredictedGrade)
        }
    }
{% endhighlight %}

You may now export this or process further to match your pupils to another system.  If I cover this in another article I shall post a link here.

<h2 id="data-acquisition">Acquire Data from CEM</h2>

Head over to _Cambridge University Press_ & _Assessment's Centre for Evaluation Monitoring_ and log into the [Alis](https://css.cemcentre.org/ALIS/Site/LoginTemplate.aspx){:target="_blank"} portal using your school's credentials.

Drill down into the __Reports -> Predictive Data__ page
<figure>
	<img src="/assets/images/37/data-and-reports.png" alt="Navigate to Original Excel/PDF Reports"/>
	<figcaption>
	Navigate to Original Excel/PDF Reports
	</figcaption>
</figure>

Look for __Predictions - Spreadsheet__

<figure>
	<img src="/assets/images/37/download.png" alt="Download"/>
	<figcaption>
	Download
	</figcaption>
</figure>
