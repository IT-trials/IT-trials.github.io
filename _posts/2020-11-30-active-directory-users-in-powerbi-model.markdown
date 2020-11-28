---
title: Accessing Active Directory Users in PowerBI Model
number: 30
categories: PowerBI
published: false
---

## Problem:
PowerBI has supports connecting to Active Directory as standard.  However, this is not as simple or as intuitive as either any of the popular 
Active Directory GUIs tool or the indispensable [PowerShell ActiveDirectory Module](https://docs.microsoft.com/en-us/powershell/module/addsadministration/).

I will first show how to connect to Active Directory Users and then have several more posts on the filters I applied to make a usable model.

## Solution:

Connecting to Active Directory is as easy stepping through the ````New Source```` interface.

<figure>
	![]("/assets/images/30/ad.jpg")
	<figurecaption>
	Adding an Active Directory Data to PowerBI Source
	</figurecaption>
</figure>

Scroll down to the Users Table.

<figure>
	![]("/assets/images/30/ad.jpg")
	<figurecaption>
	Selecting the User Objects
	</figurecaption>
</figure>


## Pitfalls: 

As you will see, all user types are returned; ````Service Accounts````, ````Contacts````, ````User Accounts```` ...

It is not obvious what type the users are, if they are disabled, or really any other of the information you are likely to want.

Furthermore the data returned is multi-dimensional. To make it more usable we will need to convert into a tabular form, perhaps utilising related tables.

## Related Posts:

I have produced several related posts covering the transformations I made to my import.  
Your requirements may differ from mine so I have broken it down to make it easier to pick what is useful to you.

- [Transform CN to OU]()
- [Create OUs Related Table]()
- [Create ADUserGroups Related Table]()
- [Create AccountStatus Related Table]()
