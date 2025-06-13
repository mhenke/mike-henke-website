---
title: "ColdFusion 9 New Features - I missed Part 2"
date: 2011-08-04
categories: 
  - "acf"
  - "ColdFusion"
---

This week, I have been reviewing new features from the last [Adobe ColdFusion](http://www.adobe.com/products/coldfusion/) release. I covered some [I missed in a previous post](/post.cfm/coldfusion-9-new-features-i-missed). I know you are thinking, ACF9? It was released in Oct 2009, but it was packed with so many enhancements and perhaps some unappreciated. You can [watch ColdFusion 9 New Features](http://www.lynda.com/ColdFusion-9-tutorials/new-features/56299-2.html) from [Lynda.com](http://lynda.com) to see demonstrations and [read about the ColdFusion 9 features](http://www.adobe.com/products/coldfusion/features/) from [Adobe.com](http://adobe.com). The examples I will be using are snippets from the Lynda tutorials and cover caching page fragments, new array functions, and the new LOCAL scope.

## Caching page fragments

ACF9 makes caching page fragments even easier with two new attributes, dependsOn and stripWhiteSpace, for the cfcache instruction. dependsOn can take a list of variables that upon change will result in an update to the cached fragment or page. stripWhiteSpace strip any unnecessary white space characters from a cached page fragment to save memory usage when caching a page fragement.

\[code language="coldfusion"\]
<cfcache timespan=createtimespan(0,0,0.10) dependson="URL.id" stripWhiteSpace="true>
\\[/code\]
