---
title: Managing Complex Sharepoint Folder Structure with Powershell
number: 43
categories: Scripting
published: false
---

## Problem:
When pupils store all of their information in their own OneDrives it is not easy for teachers to track progress and offer comments.

We do not really want to use Teams as these are frequently quite temporary and per set rather than per subject, meaning that when a pupil moves sets or year work would have to be migrated which is messy.

The teachers really want to be able to see a year groups work all together, in the same place for the whole of the pupil's time at school so we settled on the following format. Each year would be grouped by their leaving year, which would have 2-3 logical periods of study, for example GSCE, A Level, which contain a number of subjects, each containing the pupils as leaves in this tree.

- 2027 
    - Middle School
        - Mathematics
            - Cratchit, Robert
            - Potter, Harry
            - Stones, Margo       
        - English
            - Cratchit, Robert
            - Potter, Harry
            - Stones, Margo 

To make things harder, we need to make sure that each pupil is only able to read and edit their own work but I'll cover that in a companion article.

## Solution:

The Microsoft 365 Platform Community Microsoft provide a very helpful 3rd Party Module called [PnP.PowerShell](https://pnp.github.io/powershell/).  



