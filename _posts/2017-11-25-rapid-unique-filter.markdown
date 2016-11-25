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

I found this in the following type: [HashSet(T)](https://msdn.microsoft.com/en-us/library/bb359438(v=vs.110).aspx)

Its easy to use as powershell is so concise and way faster as the data remains unsorted.
e.g.

    [System.Collections.Generic.HashSet[string]]$unique = $inputA
    
Here is a little comparison on a relatively small, sorted set of 15512 items.  1/2 a second isn't so bad but the alternative is 21x faster and that difference will grow with size of set.

    $inputA = 1..9999 + 44..4444 + 7777..8888

    #Slow
    Measure-Command  { ($inputA | sort -Unique).Count}
      TotalMilliseconds : 544.0192

    #Fast
    Measure-Command  { [System.Collections.Generic.HashSet[string]]$unique = $inputA ; $unique.count}
      TotalMilliseconds : 25.9092
