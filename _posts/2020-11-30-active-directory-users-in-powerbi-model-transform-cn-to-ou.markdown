---
title: Transform Active Directory User CN to OU in PowerBI Model
number: 31
categories: PowerBI
published: false
series: PowerBI-AD
---

## Problem:
One of the columns present in the ````Users```` table is distinguishedName.  
The OU of the user is not obviously available in the table or inside any of its records.

## Solution:

One simple solution, using the menus takes just three steps and covers over 99% of accounts in my 
domain and all of the accounts I am interested in.


If you want to retain the column distinguishedName, for example to act as a primary key, begin the process by creating a new ````Custom Column````

<figure>
	![]("/assets/images/31/copy-column.jpg")
	<figurecaption>
	Copy distinguishedName to new column with a suitable name.
	</figurecaption>
</figure>

Or else rename the existing column to OU

<figure>
	![]("/assets/images/31/rename-column.jpg")
	<figurecaption>
	Rename the Column to OU or OrganisationUnit
	</figurecaption>
</figure>

<figure>
	![]("/assets/images/31/text-after-first-ou.jpg.jpg")
	<figurecaption>
	Extract text after the first instance of "OU"
	</figurecaption>
</figure>

<figure>
	![]("/assets/images/31/prefix-ou.jpg")
	<figurecaption>
	Add "OU" back to the start of the string as the previous step removes it
	</figurecaption>
</figure>


This produces the following ````PowerQuery```` expression

{% highlight powerquery %}
#"Table1" = Table.AddColumn(#"Table0", "OU", each [distinguishedName])
#"Table2" = Table.TransformColumns(#"Table1", {{"OU", each Text.AfterDelimiter(_, ",OU="), type text}}),
#"Table3" = Table.TransformColumns(#"Table2", {{"OU", each "OU=" & _, type text}}),
{% endhighlight %}

## Pitfalls: 

Depending on your OU structure, some users may not be in an OU and their ````OU```` column will read ````OU=````.
The simplest solution is just to add a filter to remove the malformed records.

<figure>
	![]("/assets/images/31/filter-ou.jpg")
	<figurecaption>
	Filter invalid results with empty OU
	</figurecaption>
</figure>

{% highlight powerquery %}
    #"Table4" = Table.SelectRows(#"Table3", each ([OU] <> "OU="))
{% endhighlight %}

However, you could also write a more complex transform with branching logic to remove a single CN
in the case that there are no OUs but I did not need to report on these accounts anyway.

Unfortunately, I could not simply use the comma delimited structure of the distingushedName 
to remove the first element as commas are permitted in an OU string and may be very common 
and may indeed if you name ````Jane Blogs```` ````Blogs, Jane````.

These extra commas are escaped with a forward slash ````CN=Blogs/, Jane,OU=...```` 
therefore a slightly more complete solution is as follows, PowerQuery only I am afraid.

{% highlight powerquery %}
#"Table2" = Table.TransformColumns(#"Table1 , 
				{{ 
					"OU", 
					each if Text.Contains(_,"\,") 
						then  "OU=" & Text.AfterDelimiter(_, ",OU=") 
						else Text.AfterDelimiter(_, ","),
					type text
				}}
			)
{% endhighlight %}

This does not cover the edge case that the user is not in an OU but inside a CN that does have a comma.  
However, these accounts seem to be limited to those in built in containers such as 
````CN=Users,DC=domain,DC=local```` or other Microsoft/AD structures so commas in these are unlikely.

With Regular Expressions you could do a reverse lookup to check the condition of the previous ````char````
but I haven't seen this option in PowerQuery.  Comment below if you know better.

{% include other-posts-in-series.html %}