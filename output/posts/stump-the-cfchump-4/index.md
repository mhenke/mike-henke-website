---
title: "Stump the CFChump - 4"
date: 2012-12-03
categories: 
  - "cfchump"
  - "ColdFusion"
---

I am doing a "Stump the CFChump" series. I recently passed the [ColdFusion 9 exam](http://blogs.adobe.com/adc/2010/11/coldfusion-9-certification-exam-now-available.html) and this is material I learned while studying. I have several [CodeSchool](http://www.codeschool.com/) gift cards to giveaway so comments who answer correctly I'll email you the discount code. ["Stump the Chumps"](http://www.cartalk.com/content/stump-chumps) is from the "Car Talk" so I am spinning that title for ColdFusion. These are questions that stumped me when studying.

- Please try to not google or run the code before answering.
- This is for fun so don't be afraid to guess.
- Let others guess so phrase your comment like **"I think ... because ..."** or **"My guess is ... because ..."**.
- I ran out of [code school](http://www.codeschool.com) gift cards and will be getting more.

## Stump the CFChump 3

### Answer

C. [best comment explanation](http://mikehenke.com/post.cfm/stump-the-cfchump-3#comment-71669624-A9D0-4A03-95967CF8B3BA2955)

## Stump the CFChump 4

### Question

What tag and attribute would you use to set the maximum number of rows returned to 10 in the code below? \[code language="coldfusion"\] <cfstoredproc procedure="foo\_proc" dataSource = "MY\_SYBASE\_TEST" username = "sa" password = "" dbServer = "scup" dbName = "pubs2" returnCode = "Yes" debug = "Yes"> <!--- cfprocresult tags ---> <cfprocresult name="RS1"> <!--- cfprocparam tags ---> <cfprocparam type="IN" cfsqltype="CF\_SQL\_INTEGER" value="1"> <cfprocparam type="OUT" cfsqltype="CF\_SQL\_DATE" variable="FOO"> <!--- Close the cfstoredproc tag. ---> </cfprocparam> \[/code\]  

### Answers

A. \[code language="coldfusion"\]<cfstoredproc maxrows="10" ...=""></cfstoredproc>\[/code\] B. \[code language="coldfusion"\]<cfprocresult maxrows="10" ...="" ></cfprocresult>\[/code\] C. \[code language="coldfusion"\]<cfprocparam type="IN" maxrows="10" ...=""></cfprocparam>\[/code\] D. \[code language="coldfusion"\] <cfprocparam type="OUT" maxrows="10" ...=""></cfprocparam>\[/code\]
