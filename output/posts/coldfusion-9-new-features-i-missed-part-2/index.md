---
title: ColdFusion 9 New Features - I missed Part 2
date: '2011-08-04'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ACF
  - ColdFusion
---

This week, I have been reviewing new features from the last <a href="http://www.adobe.com/products/coldfusion/">Adobe ColdFusion</a> release. I covered some <a href="/blog/coldfusion-9-new-features-i-missed/">I missed in a previous post</a>. I know you are thinking, ACF9? It was released in Oct 2009, but it was packed with so many enhancements and perhaps some unappreciated. You can <a href="http://www.lynda.com/ColdFusion-9-tutorials/new-features/56299-2.html">watch ColdFusion 9 New Features</a> from <a href="http://lynda.com">Lynda.com</a> to see demonstrations and <a href="http://www.adobe.com/products/coldfusion/features/">read about the ColdFusion 9 features</a> from <a href="http://adobe.com">Adobe.com</a>. The examples I will be using are snippets from the Lynda tutorials and cover caching page fragments, new array functions, and the new LOCAL scope.
<h2>Caching page fragments</h2>
ACF9 makes caching page fragments even easier with two new attributes, dependsOn and stripWhiteSpace, for the cfcache instruction. dependsOn can take a list of variables that upon change will result in an update to the cached fragment or page. stripWhiteSpace strip any unnecessary white space characters from a cached page fragment to save memory usage when caching a page fragement.


```coldfusion
<cfcache timespan=createtimespan(0,0,0.10) dependson="URL.id" stripWhiteSpace="true>
```

<h2>Working with the new array functions</h2>
Did you know ACF9 introduced new array functions? They are <a href="http://help.adobe.com/en_US/ColdFusion/9.0/CFMLRef/WSF642CCBE-FB8B-4376-956B-BD1E55C10FF9.html">ArrayFind()</a>, <a href="http://help.adobe.com/en_US/ColdFusion/9.0/CFMLRef/WS2EF4F7C2-F41D-42fe-940D-B7C0212FF3D9.html">ArrayContains()</a>, and <a href="http://help.adobe.com/en_US/ColdFusion/9.0/CFMLRef/WS50C09438-2E46-44f8-8DD7-457CD2E31435.html">ArrayDelete()</a>. 

<ul>
<li>ArrayFind searches on an array for a specified object. The function can search for simple objects such as strings or numbers and complex objects such as structures and returns the index in the array of the first match, or 0, if there is no match.
</li>
<li>ArrayContains searches an array for the presence of a specified object and returns <strong>yes</strong>, if the specified object exists in the array.
</li>
<li>ArrayDelete deletes an element from an array and returns <strong>yes</strong>, on successful deletion of the array element.
</li>
</ul>
 
<h2>Working with LOCAL scope in functions</h2>
This enhancement is demostrated in Chapter 4: CFC Enhancements and shows the new LOCAL scope in a function so you don't have data leaking. And also how now you can var anywhere in the function.


```coldfusion
        <!--- These are placed in the function's local scope --->
	<cfset LOCAL.FirstName = Arguments.TestArgument />
	<cfset var LastName = "Short" />

	<!--- These reset the values in the local scope --->
	<cfset FirstName = "Terrence" />
	<cfset LastName = "Ryan" />
```
