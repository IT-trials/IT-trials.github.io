---
title: Wake on Lan Utility with PDQ Query and DHCP Option
number: 15
layout: post
categories: Scripting
---

## Problem:
Wake on LAN for client machines on a domain with c.400 computers using a database of MAC addresses.

## Solution:
Wake On LAN or WOL, [Using Magic Packets](https://en.wikipedia.org/wiki/Wake-on-LAN#Magic_packet),
requires, at the least, knowledge of the target computers Mac Address.

MAC address aren't particularly human readable and therefore we rarely use them to identify a computer without aid of software.  In my case I would like to know a MAC address by a given hostname or a list of MAC address by a given range or site.

To achieve this I first thought to reference an existing collection of MAC address,
using a query against a local [ARP Cache](https://en.wikipedia.org/wiki/Address_Resolution_Protocol#Example)
was discussed but this seemed far more limited than a query against a DHCP server.

I did a rough and dirty proof of concept in this [previous post](https://it-trials.github.io/scripting/wake-on-lan-with-dhcp-utility.html).  However all of the important content is included here and the solution is far more refined.

The following is a working attempt at combining two ways of querying computer Mac Address with an implementation of a Wake on LAN Utility
from depicus' imaginatively called [Wake on Lan](https://www.depicus.com/wake-on-lan/).

{% gist 96960b1830ba029c302919e1cdeb9645 %}

## Pitfalls

  -  Need to initiate Wake on LAN command on a computer on the same Subnet\VLAN as the target computer or utilise a less than completely basic router config (see. [Subnet directed broadcasts](https://en.wikipedia.org/wiki/Wake-on-LAN#Subnet_directed_broadcasts)).
  -  This can be achieved with some success within PDQ inventory without the need for a new tool.  However, I have been frustrated by the programs implementation of a heartbeat which can give a false positive on computers that are turned off and whose last know IP address has been leased to another host which then responds in place of the target host.  In further defense of this additional PowerShell solution, it can more easily be used on subnets outside the scope of a pdq instance and can be more easily automated as part of a maintenance or productivity schedule.
  -  I believe that SSCM might have a toolset which completely encompasses all of these features but there are many domains too small to justify the need for SSCM.

## Extension Ideas

  -  Invoke WOL command on a remote server that is inside the subnet of the target computer. e.g. `-ScriptBlock {function:WOL} -ArgumentList $Mac, $scope, $subnet`
  -  Break all company specific information into a config file.
  -  Include feature to test for WOL success with logging and a repeat cycle for failed attempts.
