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

\[code language="coldfusion"\] ArrayFind(), [ArrayContains()](http://help.adobe.com/en_US/ColdFusion/9.0/CFMLRef/WS2EF4F7C2-F41D-42fe-940D-B7C0212FF3D9.html), and [ArrayDelete()](http://help.adobe.com/en_US/ColdFusion/9.0/CFMLRef/WS50C09438-2E46-44f8-8DD7-457CD2E31435.html).

- ArrayFind searches on an array for a specified object. The function can search for simple objects such as strings or numbers and complex objects such as structures and returns the index in the array of the first match, or 0, if there is no match.
- ArrayContains searches an array for the presence of a specified object and returns **yes**, if the specified object exists in the array.
- ArrayDelete deletes an element from an array and returns **yes**, on successful deletion of the array element.

 

## Working with LOCAL scope in functions

This enhancement is demostrated in Chapter 4: CFC Enhancements and shows the new LOCAL scope in a function so you don't have data leaking. And also how now you can var anywhere in the function.

\[code language="coldfusion"\]

\[/code\]
