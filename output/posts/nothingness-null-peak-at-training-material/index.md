---
title: Nothingness &amp; Null (sample training material)
date: '2011-04-25'
author: Mike Henke
layout: layouts/post.njk
categories:
  - cf.Objective
  - CFWheels
  - ColdFusion
---

Here is a sample of training material for "<a href="http://cfwheels-training.stagehq.com/events/659">Introducting ColdFusion on Wheels</a>" on May 10 through May 11 before <a href="http://www.cfobjective.com">CF.Objective()</a> in Minneapolis. One of the begining iterations we will cover is "<a href="https://github.com/mhenke/CFML-in-100-minutes/blob/master/cfml100mins.textile">CFML In 100 minutes</a>". Hopefully getting the class on the same level to learning <a href="http://www.cfwheels.org">CFWheels</a>. There are only <strong>3 seats left</strong> for the class so please sign up.
<div><iframe src="http://cfwheels-training.stagehq.com/events/659/external" 
        marginheight="5" marginwidth="5" frameborder="0" scrolling="auto"
        height="250" width="500">
</iframe>
</div>
<h2>10. Nothingness &amp; Null</h2>
What is <em>nothingness</em>? Is there nothingness only in outer space? Really, when we think of <em>nothing</em> isn’t it just the absence of something? Ok, that’s too much philosophy
ColdFusion did not have a way of referring to nothingness until version 9. ColdFusion can recieve a 
```coldfusion
NULL
```
 value from an external source and maintain the 
```coldfusion
NULL
```
 value until you try to use it. ColdFusion will convert the 
```coldfusion
NULL
```
 into an empty string (in the case of queries) or potentially destroy the variable altogether. However now with greater support for 
```coldfusion
NULL
```
 values, ColdFusion allows you to pass in and return a 
```coldfusion
NULL
```
 value from a method. 
```coldfusion
IsNull()
```
 instruction will test for 
```coldfusion
NULL
```
 values and return 
```coldfusion
true
```
 or 
```coldfusion
false
```
.
If you have three eggs, eat three eggs, then you might think you have <em>nothing</em> , but in terms of eggs you have 
```coldfusion
0
```
. Zero is something, its a number, and its <em>not nothing</em>.
A large percentage of the errors you encounter while writing CFML code will involve a variable not existing. You thought something was there, you tried to do something to it, and you can’t do something to nothing so CFML creates an error. Lets rewrite our 
```coldfusion
makeeggs
```
 method to illustrate 
```coldfusion
NULL
```
 :
<table border="0">
<tbody>
<tr>
<td><strong>Tag</strong></td>
</tr>
<tr>
<td>
<div class="highlight">
<pre> <span class="nb">&lt;cffunction</span> <span class="nv">name</span><span class="o">=</span><span class="s2">"makeeggs"</span> <span class="nv">returnType</span><span class="o">=</span><span class="s2">"component"</span><span class="nb">&gt;</span> 
  <span class="nb">&lt;cfargument</span> <span class="nv">name</span><span class="o">=</span><span class="s2">"quantity"</span> <span class="nv">type</span><span class="o">=</span><span class="s2">"numeric"</span><span class="nb">&gt;</span> 
  <span class="nb">&lt;cfif</span> <span class="p">(</span><span class="nf">IsNull</span><span class="p">(</span><span class="nv">arguments.quantity</span><span class="p">))</span> <span class="o">/</span><span class="nb">&gt;</span> 
   <span class="nb">&lt;cfset</span> <span class="nv">this.makeEggs</span> <span class="o">=</span> <span class="s2">"How am I supposed to make nothingness number of eggs?"</span> <span class="o">/</span><span class="nb">&gt;</span> 
  <span class="nb">&lt;cfelse&gt;</span> 
   <span class="nb">&lt;cfset</span> <span class="nv">this.makeEggs</span> <span class="o">=</span> <span class="s2">"Making your </span><span class="s-Interp">#arguments.quantity#</span><span class="s2"> eggs!"</span> <span class="o">/</span><span class="nb">&gt;</span> 
   <span class="nb">&lt;cfset</span> <span class="nv">this.yourEggs</span> <span class="o">=</span> <span class="nf">ArrayNew</span><span class="p">(</span><span class="m">1</span><span class="p">)</span> <span class="o">/</span><span class="nb">&gt;</span> 
   <span class="nb">&lt;cfloop</span> <span class="nv">condition</span><span class="o">=</span><span class="s2">"</span><span class="s-Interp">#ArrayLen(this.yourEggs)#</span><span class="s2"> LT </span><span class="s-Interp">#arguments.quantity#</span><span class="s2">"</span> <span class="o">/</span><span class="nb">&gt;</span> 
    <span class="nb">&lt;cfset</span> <span class="nf">ArrayAppend</span><span class="p">(</span><span class="nv">this.yourEggs</span><span class="p">,</span> <span class="s2">"Making an Egg."</span><span class="p">)</span> <span class="o">/</span><span class="nb">&gt;</span> 
   <span class="nb">&lt;/cfloop&gt;</span> 
  <span class="nb">&lt;/cfif&gt;</span> 
  <span class="nb">&lt;cfreturn</span> <span class="nv">this</span> <span class="o">/</span><span class="nb">&gt;</span> 
 <span class="nb">&lt;/cffunction&gt;</span> 
</pre>
</div>
</td>
</tr>
</tbody>
</table>
<table border="0">
<tbody>
<tr>
<td><strong>Script</strong></td>
</tr>
<tr>
<td>
<div class="highlight">
<pre> public component function makeeggs(numeric quantity){
  if(IsNull(arguments.quantity)) {
   this.makeEggs = "How am I supposed to make nothingness number of eggs?";
  } else {
   this.makeEggs = "Making your #arguments.quantity# eggs!";
   this.yourEggs = ArrayNew(1);
   while (ArrayLen(this.yourEggs) <span class="nt">&lt; arguments</span><span class="err">.</span><span class="na">quantity</span><span class="err">)</span> 
	<span class="na">ArrayAppend</span><span class="err">(</span><span class="na">this</span><span class="err">.</span><span class="na">yourEggs</span><span class="err">,</span> <span class="err">"</span><span class="na">Making</span> <span class="na">an</span> <span class="na">Egg</span><span class="err">.");</span> 
  <span class="err">}</span> 
  <span class="na">return</span> <span class="na">this</span><span class="err">;</span> 
 <span class="err">}</span> 
</pre>
</div>
</td>
</tr>
</tbody>
</table>
Reload the file, call 
```coldfusion
frank.makeeggs(3)
```
 then try 
```coldfusion
frank.makeeggs()
```
.