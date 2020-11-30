---
title: Making OUs More Readable with a Related Table in PowerBI Model
number: 32
categories: PowerBI
series: PowerBI-AD
---

## Problem:
I my previous posts I covered connecting PowerBI to AD and forming an custom "OU" column.

The values in this "OU" column do not look great in reports if we want to select our users by OU, it would be preferable to have something neater.

For example:
````Staff```` looks better ````OU=Staff,CN=Users,DC=domain,DC=local````

## Solution:

You could certainly achieve this by manipulating the string manually or having a series of nested ````if/then/else```` statements, matching your OU's against desired outputs.

However, AD already stores a name for each OU, which will has the great benefit of staying in sync with the user objects we are querying.

Therefore, I chose to create an additional table in the PowerQuery Editor, and then form a relationship between this and my user table in the PowerBI model linked on the ````distinguishedName```` of the ````OU````.

The OU table is called ````organizationalUnit````.

<figure>
	<img src="/assets/images/32/ou-table.jpg"/>
	<figcaption>
	Selecting the organizationalUnit table from your domain's ActiveDirectory
	</figcaption>
</figure>

<figure>
	<img src="/assets/images/32/ou-relationship.jpg"/>
	<figcaption>
	Form a many to one relationship between the OU table and the User table
	</figcaption>
</figure>


On loading the ````organizationalUnit```` from your domain delete superfluous columns "top", "displayName", "msExchBaseClass".

<figure>
	<img src="/assets/images/32/delete-columns.jpg"/>
	<figcaption>
	Delete Superfluous Columns Leaving organizationalUnit and distinguishedName
	</figcaption>
</figure>

<figure>
	<img src="/assets/images/32/add-column.jpg"/>
	<figcaption>
	Add a Custom Column that drills down into organizationalUnit and return the list, or the first object in it.
	</figcaption>
</figure>

Finally remove the organizationalUnit column.

This produces the following ````PowerQuery```` expression

{% highlight powerquery %}
let
    Source = ActiveDirectory.Domains("domain.local"),
    #"domain" = Source{[Domain="domain.local"]}[Object Categories],
    organizationalUnit1 = #"domain"{[Category="organizationalUnit"]}[Objects],
    #"Removed Columns" = Table.RemoveColumns(organizationalUnit1,{"top", "displayName", "msExchBaseClass"}),
    #"Added Custom" = Table.AddColumn(#"Removed Columns", "Name", each List.First([organizationalUnit][ou])),
    #"Removed Columns1" = Table.RemoveColumns(#"Added Custom",{"organizationalUnit"})
in
    #"Removed Columns1"
{% endhighlight %}

## Pitfalls: 

This is really straight forward.  The one thing that might not be ideal is returning the first item of the list contained in the ````ou```` object. There may be some instances where the list contains more than one item and you want them all or one other than the first.


{% include other-posts-in-series.html %}
