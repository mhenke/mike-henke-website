---
title: Stump the CFChump - 3
date: '2012-11-30'
author: Mike Henke
layout: layouts/post.njk
categories:
  - cfchump
  - ColdFusion
---

I am doing a "Stump the CFChump" series. I recently passed the <a href="http://blogs.adobe.com/adc/2010/11/coldfusion-9-certification-exam-now-available.html">ColdFusion 9 exam</a> and this is material I learned while studying. I have several <a href="http://www.codeschool.com/">CodeSchool</a> gift cards to giveaway so comments who answer correctly I'll email you the discount code. <a href="https://www.cartalk.com/content/stump-chumps">"Stump the Chumps"</a> is from the "Car Talk" so I am spinning that title for ColdFusion. These are questions that stumped me when studying.
<ul>
<li>Please try to not google or run the code before answering.</li>
<li>This is for fun so don't be afraid to guess.</li>
<li>I ran out of <a href="http://www.codeschool.com">code school</a> gift cards.</li>
</ul>
<h2>Stump the CFChump 2b</h2>
<h3>Answer</h3>
A. <a href="/blog/stump-the-cfchump-2b/#comment-F53ACB88-CEF1-48E0-8718F015E315C26E">best comment explanation</a>
<h2>Stump the CFChump 3</h2>
<h3>Question</h3>
What variable would you use to show the cumulative time required to process the query below?


```coldfusion
<cfquery name="GetParks" datasource="cfdocexamples"  result="GetResults"> 
    SELECT PARKNAME, REGION, STATE 
    FROM Parks 
    ORDER BY ParkName, State 
</cfquery> 
```


<h3>Answers</h3>

A. GetParks.ExecutionTime<br />
B. GetParks.ProcessTime<br />
C. GetResults.ExecutionTime<br />
D. GetResults.ProcessTime