---
title: "CFWheels make the database simple"
date: 2010-08-05
categories: 
  - "cfwheels"
  - "ColdFusion"
---

I am working on porting [Litepost](http://github.com/mhenke/litepost) to [Wheels](http://www.cfwheels.org). Wheels had [a Litepost competition](http://cfwheels.org/blog/litepost-contest/) awhile ago but didn’t follow the Litepost comparison idea.Litepost was conceived to compare different frameworks using essentially the same code. Once done, you will be able to compare how the same app is done in [ColdBox](http://www.coldboxframework.com/), [Fusebox](www.fusebox.org/), [FW/1](http://fw1.riaforge.org/), [Mach-II](http://www.mach-ii.com/), [Model-Glue](http://www.model-glue.com/), and Wheels.

I am wanted to quick show how the [Wheels Object Relational Mapper](http://cfwheels.org/docs/chapter/object-relational-mapping) makes database calls very simple and intuitive.

Here is the \[code language="coldfusion"\]
\Models\Category.cfc
\\[/code\]

\[code language="coldfusion"\]
<cfcomponent extends="Model" output="false">
	<cffunction name="init">
		<cfset property(name="id", column="categoryid")>
		<cfset property(name="categoriesCount", sql="(SELECT COUNT(*) FROM entries WHERE categories.categoryid = entries.categoryId)")> 
		<cfset validatesPresenceOf(properties="category")>
		<cfset belongsTo("Entry")>
	</cffunction>
</cfcomponent>
\\[/code\]

See how everything about the Categories table is self contained and self documenting?Wheels is even smart enough with [Wheels conventions](http://cfwheels.org/docs/chapter/conventions) to realize the table name for \[code language="coldfusion"\]
\Models\Category.cfc
\\[/code\] is categories.

The first [properties()](http://cfwheels.org/docs/function/property) function is renaming a column into something more in-line with the Wheels conventions. It adds an "AS id" to the sql for the categoryid column. No more inconsistent sql commands :-)

The second property is a really wicked trick called [Calculated Properties](http://cfwheels.org/docs/chapter/calculated-properties). Thanks to [Raul for showing me how to do it](http://groups.google.com/group/cfwheels/msg/6cb3322328a415fd). It is actually doing a count of all the entries matching a categoryid. Now when the category model is called like \[code language="coldfusion"\]
<cfset categories = model('category').findAll() />
\\[/code\] in the controller, it will have a new column called \[code language="coldfusion"\]
categoriesCount
\\[/code\] with the count.

The next function [validatesPresenceOf()](http://cfwheels.org/docs/function/validatespresenceof) is actually part of Wheels built in [Object Validation](http://cfwheels.org/docs/chapter/object-validation).

Another cool feature of the Wheels ORM is the deleteEntry action in the \[code language="coldfusion"\]
\Controller\Blog.cfc
\\[/code\]. Look no sql and the command will delete all the associated comments, then delete the actual entry.

\[code language="coldfusion"\]
aEntry = model("entry").findByKey( id );
		aEntry.deleteAllComments();
		aEntry.delete();
\\[/code\]

How does it know to create a \[code language="coldfusion"\]
deleteAllComments()
\\[/code\] function on the \[code language="coldfusion"\]
aEntry object
\\[/code\]? It was told in the \[code language="coldfusion"\]
\Models\Entry.cfc
\\[/code\] with a [hasMany association](http://cfwheels.org/docs/chapter/associations).

\[code language="coldfusion"\]
<cfcomponent extends="Model" output="false">
	<cffunction name="init">
		<cfset property(name="id", column="entryid")>
		<cfset validatesPresenceOf(properties="title,body")>
		 <cfset hasMany("comments")>
		 <cfset hasOne("category")>
	</cffunction>
</cfcomponent>
\\[/code\]

I could even create a [Callback](http://cfwheels.org/docs/chapter/object-callbacks) so when a delete of an Entry anywhere, it automatically deletes any related comments.
