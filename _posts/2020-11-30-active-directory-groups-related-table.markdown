---
title: Querying AD Users Group Membership with PowerBI
number: 33
categories: PowerBI
published: false
series: PowerBI-AD
---

## Problem:
Group membership can be found quite deep inside the ````securityPrincipal```` record of an AD user.  
There are two lists 
[````msds-tokenGroupNamesGlobalAndUniversal````](https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-ada2/58205720-cfeb-44bf-9b69-731898a2c750) & 
[````msds-tokenGroupNamesNoGCAcceptable````](https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-ada2/c2ec9a10-c670-423a-b542-43b8af712ed2).

I found these groups lists largely symmetrical but unfortunately but both contained unique values so for completeness, we may need to 
[Union](https://docs.microsoft.com/en-us/powerquery-m/list-union) these lists.

Furthermore, this combined list is not particularly useful until it is serialised into a single column or preferably accessed using a related table.

## Solution:

First of all, as the lists ````msds-tokenGroupNamesGlobalAndUniversal```` and ````msds-tokenGroupNamesNoGCAcceptable```` are nullable
we need to guard against this case and only return sub-item, such as the ````Common Name```` when there are items to iterate over.

Rather than writing the same code out twice for each list, lets make a function.

{% highlight powerquery %}
// GetGroups
= (securityPrincipal as record, itemName as text) as list =>
    if Record.Field(securityPrincipal, itemName) = null
    then {}
    else List.Transform(Record.Field(securityPrincipal, itemName), each _[cn])
{% endhighlight %}

We can then use this function to create a custom column combining the results of the union of the transformed lists.

{% highlight powerquery %}
= Table.AddColumn(
    #"Table1", 
    "Custom", 
    each 
       List.Union({
         GetGroups( _[securityPrincipal] ,"msds-tokenGroupNamesGlobalAndUniversal"),
         GetGroups( _[securityPrincipal] ,"msds-tokenGroupNamesNoGCAcceptable")
       })
)
{% endhighlight %}

At this point you may either flatten the list by serialising, if you have many columns in the table you want to use,
or preferably by expansion, combining a new single purpose table back with your user table in a PowerQuery many to one relationship.

### Option 1#
<figure>
	![]("/assets/images/33/extract-values.jpg")
	<figurecaption>
	Select the created column and extract values
	</figurecaption>
</figure>

<figure>
	![]("/assets/images/33/choose-delimiter.jpg")
	<figurecaption>
	Choose a delimiter that is unlikely to occur in any of your group names, such as ';'
	</figurecaption>
</figure>

### Option 2#
However I would strongly recommend creating a simple table to use in a relationship.  
For example create a table with just two columns, a foreign key such as ````distinguishedName```` or ````sAMAcountName.```` and the expanded list of groups.

<figure>
	![]("/assets/images/33/expand-column.jpg")
	<figurecaption>
	Expanding the column, creates duplicate entries in the remaining columns so this method is best attempted with a limited number of columns.
    Perhaps just a foreign key such as ````distinguishedName```` or ````sAMAcountName.````
	</figurecaption>
</figure>

<figure>
	![]("/assets/images/33/relationship.jpg")
	<figurecaption>
	This method will give you far greater control of how you select on and display the security group information.
	</figurecaption>
</figure>

{% include other-posts-in-series.html %}
