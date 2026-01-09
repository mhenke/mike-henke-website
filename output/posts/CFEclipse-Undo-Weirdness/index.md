---
title: "CFEclipse Undo Weirdness"
date: 2008-09-22
categories:
  - "CFEclipse"
  - "ColdFusion"
  - "Eclipse"
---

I heard today the "undo weirdness" in CFEclipse is due to the "Trim trailing spaces before saving" being turned on. This option checkbox is under Windows - Preferences - CFEclipse - Editor There have been [several thread](http://groups.google.com/group/cfeclipse-users/search?hl=en&group=cfeclipse-users&q=undo) in the [CFEclipse Google Group](http://groups.google.com/group/cfeclipse-users?hl=en) over this. If you haven't noticed this behavior, CFEclipse editor can't handle undo's and starts placing angle brackets in odd places or starts breaking up ColdFusion tags with text. Hopefully this post helps people experiencing this issue. Basically uncheck this trim/save option :-)
