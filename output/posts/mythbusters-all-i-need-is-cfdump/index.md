---
title: "MythBusters: All I need is CFDump"
date: 2008-01-07
categories: 
  - "CFEclipse"
  - "ColdFusion"
  - "FusionDebug"
  - "MythBusters"
---

CFDump and the standard Coldfusion Debugging Error Information didn't work. Charlie Arehart has mentioned several reasons [why use a debugger when you can just use CFDump](http://carehart.org/blog/client/index.cfm/2006/9/7/fusiondebug_part2_why_use_versus_cfdump). I ran across a specific CFDUMP instance today when I found this very true. I was passing an xml string into a SQL Stored Procedure. The xml string was being set using cfsavecontent.  
  
![creating xml string](images/mb1a(1).jpg)  
  
I would get an error saying something like _**xml error in sql, page tag not closed**_ when running the page, so looking @ the xml string with CFDump everything looked fine. I knew some reason the xml was getting truncated during the call but didn't know why.  
  
![cfdump of xml structure](images/mb1b(1).jpg)  
  
I copied the query from the sql presented in the CF error message in the CFDUMP and tried it in my SQL editor and it worked fine. I also copied the xml dump and pasted in the proc and it worked. So what is the problem, why was the xml was being truncated?

### Myth: All I need is CFDump is rated Busted

Snapshot of my Expressions view: ![](images/mb1c(1).jpg)  
Notice the tabs, breaks, and returns were being saved within the xml string. When I copied the variable output from the Expression view in the left area to my SQL editor, I got the sql error. Finally, so I knew why I was getting the error and fixed it by removed all tabs, etc in my cfm page and the page worked fine.
