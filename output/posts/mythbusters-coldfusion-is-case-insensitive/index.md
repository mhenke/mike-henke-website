---
title: "MythBusters: ColdFusion is Case Insensitive"
date: 2008-01-20
categories:
  - "ColdFusion"
  - "MythBusters"
---

### Myth: ColdFusion is Case Insensitive

### Rated **_OTHER_**

I gave "ColdFusion is Case Insensitive" an _**Other**_ rating because some attributes' values are case-sensitive like file names. Example: [CreateObject](http://livedocs.adobe.com/coldfusion/8/htmldocs/help.html?content=functions_c-d_18.html) function's port attribute. The ColdFusion server is case-insensitive, so you can mix case but for consistency and readability you should set a standard. Basically ColdFusion tags, attributes, and variables are not case-sensitive, so you can use either <cfset> or <CFSET>.
