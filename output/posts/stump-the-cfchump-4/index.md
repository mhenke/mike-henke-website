---
title: Stump the CFChump - 4
date: '2012-12-03'
author: Mike Henke
layout: layouts/post.njk
categories:
  - cfchump
  - ColdFusion
---

I am doing a "Stump the CFChump" series. I recently passed the <a href="http://blogs.adobe.com/adc/2010/11/coldfusion-9-certification-exam-now-available.html">ColdFusion 9 exam</a> and this is material I learned while studying. I have several <a href="http://www.codeschool.com/">CodeSchool</a> gift cards to giveaway so comments who answer correctly I'll email you the discount code. <a href="http://www.cartalk.com/content/stump-chumps">"Stump the Chumps"</a> is from the "Car Talk" so I am spinning that title for ColdFusion. These are questions that stumped me when studying.
<ul>
	<li>Please try to not google or run the code before answering.</li>
	<li>This is for fun so don't be afraid to guess.</li>
	<li>Let others guess so phrase your comment like <b>"I think ... because ..."</b> or <b>"My guess is ... because ..."</b>.</li>
	<li>I ran out of <a href="http://www.codeschool.com">code school</a> gift cards and will be getting more.</li>
</ul>
<h2>Stump the CFChump 3</h2>
<h3>Answer</h3>
C. <a href="/blog/stump-the-cfchump-3/#comment-71669624-A9D0-4A03-95967CF8B3BA2955">best comment explanation</a>
<h2>Stump the CFChump 4</h2>
<h3>Question</h3>
What tag and attribute would you use to set the maximum number of rows returned to 10 in the code below?

```coldfusion
<cfstoredproc procedure="foo_proc"
dataSource = "MY_SYBASE_TEST" username = "sa"
password = "" dbServer = "scup" dbName = "pubs2"
returnCode = "Yes" debug = "Yes">
<!--- cfprocresult tags --->
<cfprocresult name="RS1">
<!--- cfprocparam tags --->
<cfprocparam type="IN" cfsqltype="CF_SQL_INTEGER" value="1">
<cfprocparam type="OUT" cfsqltype="CF_SQL_DATE" variable="FOO">
<!--- Close the cfstoredproc tag. --->
</cfprocparam>
```

&nbsp;
<h3>Answers</h3>
A. 
```coldfusion
<cfstoredproc maxrows="10" ...=""></cfstoredproc>
```

B. 
```coldfusion
<cfprocresult maxrows="10" ...="" ></cfprocresult>
```

C. 
```coldfusion
<cfprocparam type="IN" maxrows="10" ...=""></cfprocparam>
```

D. 
```coldfusion
 <cfprocparam type="OUT" maxrows="10" ...=""></cfprocparam>
```
