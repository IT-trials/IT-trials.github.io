---
title: Wake on Lan Utility with DHCP Query
number: 10
categories: Scripting
---

## Problem:
Wake on LAN for client machines on a domain with c.400 computers using a database of MAC addresses.

## Solution:
This post has been almost entirely superseded by a newer [post](/scripting/wake-on-lan-with-pdq-query.html).  This post may morph into a tutorial on refactoring or I may just redirect to the newer post.  

Wake On LAN or WOL, [Using Magic Packets](https://en.wikipedia.org/wiki/Wake-on-LAN#Magic_packet){:target="_blank"}, requires, at the least, knowledge of the target computers Mac Address.

MAC address aren't particularly human readable and therefore we rarely use them to identify a computer without aid of software.  In my case I would like to know a MAC address by a given hostname or a list of MAC address by a given range or site.

To achieve this I first thought to reference an existing collection of MAC address, using a query against a local [ARP Cache](https://en.wikipedia.org/wiki/Address_Resolution_Protocol#Example){:target="_blank"} was discussed but this seemed far more limited than a query against a DHCP server.

A Powershell module called the [DhcpServer Module](https://technet.microsoft.com/itpro/powershell/windows/dhcp-server/index){:target="_blank"}, available on a windows DHCP server (and maybe elsewhere), has some really useful Cmdlets for querying DHCP.  I built up an idea how to use them following this [Weekend Scripter Blog](https://blogs.technet.microsoft.com/heyscriptingguy/2013/01/13/weekend-scripter-parsing-the-dhcp-database-no-way/){:target="_blank"}.

The following is a quick and dirty attempt at combining a DHCP query with an implementation of a Wake on LAN Utility from depicus' imaginatively called [Wake on Lan](https://www.depicus.com/wake-on-lan/){:target="_blank"}.

Please don't presume that the following script is fully tested or developed. A more developed version of the same script can be found at this newer [post](/scripting/wake-on-lan-with-pdq-query.html)
Improvements include:
  - [Parameter Sets](https://blogs.technet.microsoft.com/heyscriptingguy/2011/06/30/use-parameter-sets-to-simplify-powershell-commands/){:target="_blank"}
  - Implementation of [Write-Verbose](https://blogs.technet.microsoft.com/heyscriptingguy/2014/07/30/use-powershell-to-write-verbose-output/){:target="_blank"} in place of the current Write-Output which is widely regarded as [bad practice](http://www.jsnover.com/blog/2013/12/07/write-host-considered-harmful/){:target="_blank"}.
  - More concise logic in if statements using [[string]::IsNullOrEmpty()](/scripting/does-csharp-have-isset.html)
  - Extension to query PDQ database in addition to DHCP

{% gist 261ad5c3084950bec65c35189eac39e0 %}

## Pitfalls

  - Need to initiate Wake on LAN command on a computer on the same Subnet\VLAN as the target computer or utilise a less than completely basic router config (see. [Subnet directed broadcasts](https://en.wikipedia.org/wiki/Wake-on-LAN#Subnet_directed_broadcasts){:target="_blank"}).

  - I found that this DHCP query only returned relatively recent Leases dependent on the life of the lease this might only be a few hours or days.  As such it thought it might struggle to turn on a machine that had been off for a month say during a summer holiday at a school.

  - This script just isn't finished.  It's not fully developed or tested and I might never complete it as I'm now working on a better one that queries our PDQ Inventory database for a Host's MAC Address Site(Subnet/Broadcast Address).
