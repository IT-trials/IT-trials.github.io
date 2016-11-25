---
title: Filter Unique Elements in A Set
number: 9
layout: post
categories: Scripting
---
## Problem
Using Powershell, find and count the unique entries in a set ($set) containing unsorted, repeated characters.

## Solution
A first scan of solutions online provided the following.

    $set | sort -unique

This wasn't very quick on large sets and I was interested in fining a .Net data type specialized for unique values.

I found this in the following type:

Its easy to use as powershell is so concise and way faster as the data remains unsorted.
