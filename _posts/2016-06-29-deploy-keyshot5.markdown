---
layout: post
title: "KeyShot"
number: 3
categories: GPO
---

## Problem:
KeyShot is installed as part of ArtCam 2015 R2 at our school.  I found that users were being prompted for a license/product activation even though the product should be automatically licensed in the ArtCam Installation.

![]({{ site.github.url }}/assets/images/3/keyshot.png)

## Solution:
Point KeyShot at the .lic file at using Group Policy

![]({{ site.github.url }}/assets/images/3/reg.jpg)

ArtCam 2015 R2 stores a licence file at the following location:

    C:\Program Files\ArtCAM 2015 R2\Keyshot\keyshot4.lic

KeyShot will look here and not prompt user for input if a registry key points to the containing directory

    C:\Program Files\ArtCAM 2015 R2\Keyshot\

## Other Pitfalls:

  * KeyShot needs to be installed for "all users".  Otherwise it will try to read/write files to the installing users home directory, e.g. "C:\Users\Administrator\Documents\Keyshot 5" :(
  * I originally thought this error was caused by the Deployment method - via MDT Reference Machine Capture - this assumption proved to be wrong.
