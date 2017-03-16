---
title: Wake on Lan Utility with DHCP Query
number: 10
layout: post
categories: Scripting
---

## Problem:
Wake on LAN for client machines on a domain with c.400 computers using a database of MAC addresses.

## Solution:
Wake On LAN or WOL, [Using Magic Packets](https://en.wikipedia.org/wiki/Wake-on-LAN#Magic_packet), requires, at the least, knowledge of the target computers Mac Address.

MAC address aren't particularly human readable and therefore we rarely use them to identify a computer without aid of software.  In my case I would like to know a MAC address by a given hostname or a list of MAC address by a given range or site.

To achieve this I first thought to refference an existing collection of MAC address, using a query againt a local [ARP Cache](https://en.wikipedia.org/wiki/Address_Resolution_Protocol#Example) was discussed but this seemed far more limited than a query against a DHCP server.

A Powershell module called the [DhcpServer Module](https://technet.microsoft.com/itpro/powershell/windows/dhcp-server/index), available on a windows dhcp server (and maybe elsewhere), has some really usefull Cmdlets for querying DHCP.  I built up an idea how to use them following this [Weekend Scripter Blog](https://blogs.technet.microsoft.com/heyscriptingguy/2013/01/13/weekend-scripter-parsing-the-dhcp-database-no-way/).

The following is a working attempt at combining both DHCP queries with an implementation of a Wake on Lan Utility from depicus' imaginatively called [Wake on Lan](https://www.depicus.com/wake-on-lan/).

Please don't presume that the following script is fully tested or developed.  I intend to use [Parameter Sets](https://blogs.technet.microsoft.com/heyscriptingguy/2011/06/30/use-parameter-sets-to-simplify-powershell-commands/) and also implement [Write-Verbose](https://blogs.technet.microsoft.com/heyscriptingguy/2014/07/30/use-powershell-to-write-verbose-output/) in place of the current Write-Output which is widely regarded as [bad practice](http://www.jsnover.com/blog/2013/12/07/write-host-considered-harmful/).

{% gist 261ad5c3084950bec65c35189eac39e0 %}

## Pitfalls

  - I found that this DHCP query only returned relatively recent Leases dependant on the life of the lease this might only be a few hours or days.  As such it thought it might struggle to turn on a machine that had been off for a month say during a summer holiday at a school.
  
  - This script just isn't finished.  It's not fully developed or tested and I might never complete it as I'm now working on a better one that queries our PDQ Inventory database for a Host's MAC Address Site(Subnet/Broadcast Address).
