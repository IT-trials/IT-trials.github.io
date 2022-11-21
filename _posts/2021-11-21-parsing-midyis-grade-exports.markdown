---
title: Parsing and Transforming MidYIS grade export data
number: 38
categories: powerbi
published: false
---

## Convert-MidyisToJson

### Acuire Data from CEM

[MidYIS](https://css.cemcentre.org/SecondaryPlusNet/Login.aspx)

un ******

pw ******

<figure>
	<img src="/assets/images/38/data-and-reports.png" alt="Navigate to Original Excel/PDF Reports"/>
	<figcaption>
	Navigate to Original Excel/PDF Reports
	</figcaption>
</figure>

<figure>
	<img src="/assets/images/38/download.png" alt="Download"/>
	<figcaption>
	Download
	</figcaption>
</figure>

Look for "Independent Schools' Predictions and Chances Graphs (including MIS import files)"

Download and open the file -> "MidYIS Year9 Predictions Feedback.xls"

You may need to unblock security lock:

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

Choose the Appropriate Tab e.g. GCSE (9-1) Preds & select "Generate File for MIS Import".

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

### Using the script to transform to JSON
Set the appropriate vars in the top of the script and run through line by line to check and debug or run the whole thing

<figure>
	<img src="/assets/images/38/script-variables.png" alt="Script Variables"/>
	<figcaption>
	Script Variables
	</figcaption>
</figure>