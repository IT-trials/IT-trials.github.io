---
title: Wake on Lan Utility with DHCP query
number: 10
layout: post
categories: Scripting
---

## Problem:
Wake on LAN on a domain with c.400 computers using a Database of MAC addresses

## Solution:

{% Gist 261ad5c3084950bec65c35189eac39e0 %}

## Pitfalls

  - Starting a build from windows no PXE boot will force the build to type REFRESH.  Watch out for unwanted state restore and increased build time.
