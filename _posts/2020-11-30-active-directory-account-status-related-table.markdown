---
title: AD User Account Status in PowerBI Model
number: 34
categories: PowerBI
published: false
series: PowerBI-AD
---

## Problem:

I my previous posts I covered connecting PowerBI to AD and forming and returning user account data.

However, on inspecting the results it is not clear if users are enabled, disabled or in any other given state.  This might be really important if you are attempting to use PowerBi to reconcile HR or other databases to ensure consistency.

## Solution:

The account status is quite readily accessible in the ````userAccountControl```` item of the ````user```` record.

<figure>
	![]("/assets/images/34/user-account-control.jpg")
	<figurecaption>
	Drill into the user column to find the userAccountControl field
	</figurecaption>
</figure>

However, userAccountControl is a [bit mask]("https://en.wikipedia.org/wiki/Mask_(computing)") and is not immediately comprehensible.

Some posts provide a simple explanation that 512 is enabled and 514 is disabled.  This is true, but not the complete story. This value actually encodes boolean values for 22 potentially independent options. Therefore there are 2^22 or 4,194,304 possible permutations of this number half of which are disabled, half of which are enabled.

Given the ponderous number of permutations and the relative unlikely occurrence of most of them it makes much more sense to extract meaning from the result using logic than using a related table.

Windows OS Hub have published an excellent article on this with a [PowerShell function]("http://woshub.com/decoding-ad-useraccountcontrol-value/") [PowerShell function]("http://woshub.com/decoding-ad-useraccountcontrol-value/")

My first solution was to manually create a table limited to just the values that occur in my active directory, using the above PowerShell function, creating my own a pretty name and a boolean field to say if the account is disabled or enabled.

<figure>
	![]("/assets/images/34/account-status.jpg")
	<figurecaption>
	Form a many to one relationship between the OU table and the User table
	</figurecaption>
</figure>

This works perfectly well but I may have to add further rows as my active directory hosts more account status combinations.

It would be straight forward to make a function, using a bitwise operator, that determined if any given account was disabled or not.  This work be ideal as a custom column on your user table.

{% highlight powerquery %}
= (UAC as number)  =>
    Number.BitwiseAnd(UAC, 2) = 2
{% endhighlight %}

To cover all eventualities, and provide the most options for filtering and chopping your user table, we could dynamically create a related table to help us resolve the ````userAccountControl```` bit map.  

To start the process, I ported the Windows OS Hub, PowerShell function into PowerQuery.  I chose to return a list, rather than a combined string as it gives us the option to create a many to many relationship later on or serialise in a different form at a later point.  

{% highlight powerquery %}
= (UAC as number) as list =>
let 
  flags = {
    "SCRIPT",
    "ACCOUNTDISABLE",
    "RESERVED",
    "HOMEDIR_REQUIRED",
    "LOCKOUT",
    "PASSWD_NOTREQD",
    "PASSWD_CANT_CHANGE",
    "ENCRYPTED_TEXT_PWD_ALLOWED",
    "TEMP_DUPLICATE_ACCOUNT",
    "NORMAL_ACCOUNT",
    "RESERVED",
    "INTERDOMAIN_TRUST_ACCOUNT",
    "WORKSTATION_TRUST_ACCOUNT",
    "SERVER_TRUST_ACCOUNT",
    "RESERVED",
    "RESERVED",
    "DONT_EXPIRE_PASSWORD",
    "MNS_LOGON_ACCOUNT",
    "SMARTCARD_REQUIRED",
    "TRUSTED_FOR_DELEGATION",
    "NOT_DELEGATED",
    "USE_DES_KEY_ONLY",
    "DONT_REQ_PREAUTH",
    "PASSWORD_EXPIRED",
    "TRUSTED_TO_AUTH_FOR_DELEGATION",
    "RESERVED",
    "PARTIAL_SECRETS_ACCOUNT",
    "RESERVED",
    "RESERVED",
    "RESERVED",
    "RESERVED",
    "RESERVED"
  },
  attributes = "",
  enumerable = List.Numbers(0,List.Count(flags)),
  itterateBitMap = 
    List.Select(
      enumerable, 
      each Number.BitwiseAnd(UAC, Number.Power(2,_)) <> 0
    ),
  filteredFlags = List.Transform(itterateBitMap, each flags{_} )
in
  filteredFlags
{% endhighlight %}

Now we can then generate a the set of ````userAccountControl```` bit maps our ````ActiveDirectory```` currently contains and produce a computed result for each.

{% highlight powerquery %}
= let
userAccountControlCodes = List.RemoveNulls(List.Distinct(Table.Column(AllADUsers,"userAccountControl"))),
table1 = Table.FromList(userAccountControlCodes, Splitter.SplitByNothing(), {"userAccountControlCodes"}, null, ExtraValues.Error)
in 
Table.AddColumn(table1, "DecodedUAC", each DecodeUserAccountControl(_[userAccountControlCodes]) )
{% endhighlight %}


<figure>
	![]("/assets/images/34/resolved-user-account-control-bit-map.jpg")
	<figurecaption>
	A Dynamically Produced Table of All the Required ````userAccountControl```` Values and a human readable representation
	</figurecaption>
</figure>

At this point you may prefer to serialise the lists.  I recommend that you ````Expand to New Rows```` and use this to create a many to many relationship to your user table in PowerBI.

<figure>
	![]("/assets/images/34/resolved-user-account-control-bit-map-expanded.jpg")
	<figurecaption>
	A Dynamically Produced Table of All the Required ````userAccountControl```` Values and a human readable representation
	</figurecaption>
</figure>



{% include other-posts-in-series.html %}