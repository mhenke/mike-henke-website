---
title: CFWheels make the database simple
date: '2010-08-05'
author: Mike Henke
layout: layouts/post.njk
categories:
  - CFWheels
  - ColdFusion
excerpt: "I am working on porting <a href=\"http://github.com/mhenke/litepost\">Litepost</a> to <a href=\"http://www.cfwheels.org\">Wheels</a>. Wheels had <a href=\"http://cfwheels.org/blog/litepost-contest/\">a Litepost competition</a> awhile ago but didn’t follow the Litepost comparison idea.Litepost was conceived to compare different frameworks using essentially the same code. Once done, you will be able to compare how the same app is done in <a href=\"http://www.coldboxframework.com/\">ColdBox</a>, <a href=\"www.fusebox.org/\">Fusebox</a>, <a href=\"http://fw1.riaforge.org/\">FW/1</a>, <a href=\"http://www.mach-ii.com/\">Mach-II</a>, <a href=\"http://www.model-glue.com/\">Model-Glue</a>, and Wheels.\r\n\r\nI am wanted to quick show how the <a href=\"http://cfwheels.org/docs/chapter/object-relational-mapping\">Wheels Object Relational Mapper</a> makes database calls very simple and intuitive."
---

I am working on porting <a href="http://github.com/mhenke/litepost">Litepost</a> to <a href="http://www.cfwheels.org">Wheels</a>. Wheels had <a href="http://cfwheels.org/blog/litepost-contest/">a Litepost competition</a> awhile ago but didn’t follow the Litepost comparison idea.Litepost was conceived to compare different frameworks using essentially the same code. Once done, you will be able to compare how the same app is done in <a href="http://www.coldboxframework.com/">ColdBox</a>, <a href="https://www.fusebox.org/">Fusebox</a>, <a href="https://fw1.riaforge.org/">FW/1</a>, <a href="http://www.mach-ii.com/">Mach-II</a>, <a href="http://www.model-glue.com/">Model-Glue</a>, and Wheels.

I am wanted to quick show how the <a href="http://cfwheels.org/docs/chapter/object-relational-mapping">Wheels Object Relational Mapper</a> makes database calls very simple and intuitive.

Here is the 
```coldfusion
\Models\Category.cfc
```



```coldfusion
<cfcomponent extends="Model" output="false">
	<cffunction name="init">
		<cfset property(name="id", column="categoryid")>
		<cfset property(name="categoriesCount", sql="(SELECT COUNT(*) FROM entries WHERE categories.categoryid = entries.categoryId)")> 
		<cfset validatesPresenceOf(properties="category")>
		<cfset belongsTo("Entry")>
	</cffunction>
</cfcomponent>
```


See how everything about the Categories table is self contained and self documenting?Wheels is even smart enough with <a href="http://cfwheels.org/docs/chapter/conventions">Wheels conventions</a> to realize the table name for 
```coldfusion
\Models\Category.cfc
```
 is categories.

The first <a href="http://cfwheels.org/docs/function/property">properties()</a> function is renaming a column into something more in-line with the Wheels conventions. It adds an "AS id" to the sql for the categoryid column. No more inconsistent sql commands :-)

The second property is a really wicked trick called <a href="http://cfwheels.org/docs/chapter/calculated-properties">Calculated Properties</a>. Thanks to <a href="http://groups.google.com/group/cfwheels/msg/6cb3322328a415fd">Raul for showing me how to do it</a>. It is actually doing a count of all the entries matching a categoryid. Now when the category model is called like 
```coldfusion
<cfset categories = model('category').findAll() />
```
 in the controller, it will have a new column called 
```coldfusion
categoriesCount
```
 with the count.

The next function <a href="http://cfwheels.org/docs/function/validatespresenceof">validatesPresenceOf()</a> is actually part of Wheels built in <a href="http://cfwheels.org/docs/chapter/object-validation">Object Validation</a>.

Another cool feature of the Wheels ORM is the deleteEntry action in the 
```coldfusion
\Controller\Blog.cfc
```
. Look no sql and the command will delete all the associated comments, then delete the actual entry.


```coldfusion
aEntry = model("entry").findByKey( id );
		aEntry.deleteAllComments();
		aEntry.delete();
```


How does it know to create a 
```coldfusion
deleteAllComments()
```
 function on the 
```coldfusion
aEntry object
```
? It was told in the 
```coldfusion
\Models\Entry.cfc
```
 with a <a href="http://cfwheels.org/docs/chapter/associations">hasMany association</a>. 


```coldfusion
<cfcomponent extends="Model" output="false">
	<cffunction name="init">
		<cfset property(name="id", column="entryid")>
		<cfset validatesPresenceOf(properties="title,body")>
		 <cfset hasMany("comments")>
		 <cfset hasOne("category")>
	</cffunction>
</cfcomponent>
```


I could even create a <a href="http://cfwheels.org/docs/chapter/object-callbacks">Callback</a> so when a delete of an Entry anywhere, it automatically deletes any related comments.