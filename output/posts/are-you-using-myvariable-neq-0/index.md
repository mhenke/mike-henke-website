---
title: Are you using myVariable NEQ 0?
date: '2012-03-15'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ColdFusion
---

I was looking at my code base today and noticed <strong>NEQ 0</strong> all over the place. Then I remembered how ColdFusion handles <a href="http://help.adobe.com/en_US/ColdFusion/9.0/Developing/WSc3ff6d0ea77859461172e0811cbec09af4-7fd0.html">Boolean values</a>, specifically any number is <em>TRUE</em> except 0 which is <em>FALSE</em>.
It I knew the variable was a number, then I could remove the <strong>NEQ 0</strong>. This was used often in the context of a query like "if recordcount neq 0 then do this". If the variable was a string or list only removing <strong>NEQ 0</strong> wouldn't work, I had to add "not isnumeric() or myvariable". Below is the test file to make sure the variables are returning the same boolean.
I am running the <strong>NEQ 0</strong> check, then if true, setting a key in a structure, then running a check without <strong>NEQ 0</strong>. I am doing this check on a several numbers, strings, and lists.

My conclusion is you don't ever need to use <strong>NEQ 0</strong> with a variable that is numeric. It is cleaner and less code. For a variable that maybe a string or list when comparing to 0, it maybe easier to do <strong>NEQ 0</strong> 
<script src="https://gist.github.com/2045802.js"> </script>