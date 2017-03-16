---
title: Wake on Lan Utility with PDQ Query
number: 11
layout: post
categories: Scripting
---

## Problem:
Wake on LAN for client machines on a domain with c.400 computers using a database of MAC addresses.

## Solution:
Wake On LAN or WOL, [Using Magic Packets](https://en.wikipedia.org/wiki/Wake-on-LAN#Magic_packet),
requires, at the least, knowledge of the target computers Mac Address.

MAC address aren't particularly human readable and therefore we rarely use them to identify a computer without aid of software.  
In my case I would like to know a MAC address by a given hostname or a list of MAC address by a given range or site.

To achieve this I first thought to reference an existing collection of MAC address,
using a query against a local [ARP Cache](https://en.wikipedia.org/wiki/Address_Resolution_Protocol#Example)
was discussed but this seemed far more limited than a query against a DHCP server.

The following is a working attempt at combining both DHCP queries with an implementation of a Wake on LAN Utility
from depicus' imaginatively called [Wake on Lan](https://www.depicus.com/wake-on-lan/).

I intend to use [Parameter Sets](https://blogs.technet.microsoft.com/heyscriptingguy/2011/06/30/use-parameter-sets-to-simplify-powershell-commands/)

{% gist 96960b1830ba029c302919e1cdeb9645 %}

## Pitfalls

  -  Need to initiate Wake on LAN command on a computer on the same Subnet\VLAN as the target computer or utilise a less than completely basic router config (see. [Subnet directed broadcasts](https://en.wikipedia.org/wiki/Wake-on-LAN#Subnet_directed_broadcasts)).
