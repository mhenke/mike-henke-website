---
title: "Nothingness & Null (sample training material)"
date: 2011-04-25
categories: 
  - "cf-objective"
  - "cfwheels"
  - "ColdFusion"
---

Here is a sample of training material for "[Introducting ColdFusion on Wheels](http://cfwheels-training.stagehq.com/events/659)" on May 10 through May 11 before [CF.Objective()](http://www.cfobjective.com) in Minneapolis. One of the begining iterations we will cover is "[CFML In 100 minutes](https://github.com/mhenke/CFML-in-100-minutes/blob/master/cfml100mins.textile)". Hopefully getting the class on the same level to learning [CFWheels](http://www.cfwheels.org). There are only **3 seats left** for the class so please sign up.

<iframe src="http://cfwheels-training.stagehq.com/events/659/external" marginheight="5" marginwidth="5" frameborder="0" scrolling="auto" height="250" width="500"></iframe>

## 10\. Nothingness & Null

What is _nothingness_? Is there nothingness only in outer space? Really, when we think of _nothing_ isn’t it just the absence of something? Ok, that’s too much philosophy ColdFusion did not have a way of referring to nothingness until version 9. ColdFusion can recieve a \[code language="coldfusion"\]
NULL
\\[/code\] value from an external source and maintain the \[code language="coldfusion"\]
NULL
\\[/code\] value until you try to use it. ColdFusion will convert the \[code language="coldfusion"\]
NULL
\\[/code\] into an empty string (in the case of queries) or potentially destroy the variable altogether. However now with greater support for \[code language="coldfusion"\]
NULL
\\[/code\] values, ColdFusion allows you to pass in and return a \[code language="coldfusion"\]
NULL
\\[/code\] value from a method. \[code language="coldfusion"\]
IsNull()
\\[/code\] instruction will test for \[code language="coldfusion"\]
NULL
\\[/code\] values and return \[code language="coldfusion"\]
true
\\[/code\] or \[code language="coldfusion"\]
false
\\[/code\]. If you have three eggs, eat three eggs, then you might think you have _nothing_ , but in terms of eggs you have \[code language="coldfusion"\]
0
\\[/code\]. Zero is something, its a number, and its _not nothing_. A large percentage of the errors you encounter while writing CFML code will involve a variable not existing. You thought something was there, you tried to do something to it, and you can’t do something to nothing so CFML creates an error. Lets rewrite our \[code language="coldfusion"\]
makeeggs
\\[/code\] method to illustrate \[code language="coldfusion"\]
NULL
\\[/code\] :

| **Tag** |
| --- |
|   ```  <cffunction name="makeeggs" returnType="component">    <cfargument name="quantity" type="numeric">    <cfif (IsNull(arguments.quantity)) />     <cfset this.makeEggs = "How am I supposed to make nothingness number of eggs?" />    <cfelse>     <cfset this.makeEggs = "Making your #arguments.quantity# eggs!" />     <cfset this.yourEggs = ArrayNew(1) />     <cfloop condition="#ArrayLen(this.yourEggs)# LT #arguments.quantity#" />      <cfset ArrayAppend(this.yourEggs, "Making an Egg.") />     </cfloop>    </cfif>    <cfreturn this />   </cffunction>   ```     |

| **Script** |
| --- |
|   ```  public component function makeeggs(numeric quantity){   if(IsNull(arguments.quantity)) {    this.makeEggs = "How am I supposed to make nothingness number of eggs?";   } else {    this.makeEggs = "Making your #arguments.quantity# eggs!";    this.yourEggs = ArrayNew(1);    while (ArrayLen(this.yourEggs) < arguments.quantity)  	ArrayAppend(this.yourEggs, "Making an Egg.");    }    return this;   }   ```     |

Reload the file, call \[code language="coldfusion"\]
frank.makeeggs(3)
\\[/code\] then try \[code language="coldfusion"\]
frank.makeeggs()
\\[/code\].
