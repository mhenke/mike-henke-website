---
title: "Are you using myVariable NEQ 0?"
date: 2012-03-15
categories:
  - "ColdFusion"
---

I was looking at my code base today and noticed **NEQ 0** all over the place. Then I remembered how ColdFusion handles [Boolean values](http://help.adobe.com/en_US/ColdFusion/9.0/Developing/WSc3ff6d0ea77859461172e0811cbec09af4-7fd0.html), specifically any number is _TRUE_ except 0 which is _FALSE_. It I knew the variable was a number, then I could remove the **NEQ 0**. This was used often in the context of a query like "if recordcount neq 0 then do this". If the variable was a string or list only removing **NEQ 0** wouldn't work, I had to add "not isnumeric() or myvariable". Below is the test file to make sure the variables are returning the same boolean. I am running the **NEQ 0** check, then if true, setting a key in a structure, then running a check without **NEQ 0**. I am doing this check on a several numbers, strings, and lists.

My conclusion is you don't ever need to use **NEQ 0** with a variable that is numeric. It is cleaner and less code. For a variable that maybe a string or list when comparing to 0, it maybe easier to do **NEQ 0**

<script src="https://gist.github.com/2045802.js"></script>
