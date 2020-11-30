---
title: Accessing Active Directory Users in PowerBI Model
number: 30
categories: PowerBI
series: PowerBI-AD
---

## Problem:
PowerBI has supports connecting to Active Directory as standard.  However, this is not as simple or as intuitive as either the popular Active Directory GUIs tool or the indispensable [PowerShell ActiveDirectory Module](https://docs.microsoft.com/en-us/powershell/module/addsadministration/).

I will first show how to connect to Active Directory Users and then have several more posts on the filters I applied to make a set of usable models.

## Solution:

Connecting to Active Directory is as easy stepping through the ````New Source```` interface.

<figure>
	<img src="/assets/images/30/ad.jpg"/>
	<figcaption>
	Adding an Active Directory Data to PowerBI Source
	</figcaption>
</figure>

Scroll down to the Users Table.

<figure>
	<img src="/assets/images/30/ad-user-table.jpg"/>
	<figcaption>
	Selecting the User Objects
	</figcaption>
</figure>


## Pitfalls: 

As you will see, all user types are returned; ````Service Accounts````, ````Contacts````, ````User Accounts```` ...

It is not obvious what type the users are, if they are disabled, or really any other of the information you are likely to want.

Furthermore the data returned is multi-dimensional. To make it more usable we will need to convert into a tabular form, perhaps utilising related tables.

{% include other-posts-in-series.html %}
