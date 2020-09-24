---
title: Costs
number: 
layout: post
categories: AWS
---

## Problem:
Should I have a table with pre-computed values for each valid input or should I compute on demand from the minimum number of rows. 

I have 139522 valid days in the range.  Each row has a size of ~98.89 bytes so may DB will be ~13797269 bytes (13.80MB or 0.014 GB)

This is well within the free band and is a long way from large scale dataset for this service.

## Solution:
It's probably worth cashing pre-computed answers if indexes are efficient.  Latency for computation may or may not be higher than query.  However there is the benefit of having one less dependency.