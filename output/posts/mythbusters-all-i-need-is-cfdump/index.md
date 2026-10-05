---
title: 'MythBusters: All I need is CFDump'
date: '2008-01-07'
author: Mike Henke
layout: layouts/post.njk
categories:
  - CFEclipse
  - ColdFusion
  - FusionDebug
  - MythBusters
---

CFDump and the standard Coldfusion Debugging Error Information didn't work. Charlie Arehart has mentioned several reasons <a href="http://carehart.org/blog/client/index.cfm/2006/9/7/fusiondebug_part2_why_use_versus_cfdump" target="_self">why use a debugger when you can just use CFDump</a>. I ran across a specific CFDUMP instance today when I found this very true. I was passing an xml string into a SQL Stored Procedure. The xml string was being set using cfsavecontent.<br />
<br />
<img width="430" height="298" src="/machblog/uploads/Image/mb1a(1).jpg" alt="creating xml string" /><br />
<br />
I would get an error saying something like<em><strong> xml error in sql, page tag not closed</strong></em> when running the page, so looking @ the xml string with CFDump everything looked fine. I knew some reason the xml was getting truncated during the call but didn't know why.<br />
<br />
<img width="417" height="232" src="/machblog/uploads/Image/mb1b(1).jpg" alt="cfdump of xml structure" /><br />
<br />
I copied the query from the sql presented in the CF error message in the CFDUMP and tried it in my SQL editor and it worked fine. I also copied the xml dump and pasted in the proc and it worked. So what is the problem, why was the xml was being truncated?
<h3>Myth: All I need is CFDump is rated <span class="Title">Busted</span></h3>
Snapshot of my Expressions view:
<img width="661" height="279" src="/machblog/uploads/Image/mb1c(1).jpg" alt="" /><br />
Notice the tabs, breaks, and returns were being saved within the xml string. When I copied the variable output from the Expression view in the left area to my SQL editor, I got the sql error. Finally, so I knew why I was getting the error and fixed it by removed all tabs, etc in my cfm page and the page worked fine.