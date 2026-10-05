---
title: Application-Specific Data Sources - Database Context
date: '2012-04-04'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ColdFusion
---

Last night, a co-worker stumbled on an interesting situation with using <a href="http://www.bennadel.com/blog/1642-Learning-ColdFusion-9-Application-Specific-Data-Sources.htm">application-specific data sources</a> and the <a href="http://msdn.microsoft.com/en-us/library/ms188366.aspx">USE</a> sql command.
We had a something like this.

```coldfusion
<CFQUERY NAME="output">
	exec mydatabase2.dbo.dbfunctionopen
	SELECT	.....
	exec mydatabase2.dbo.dbfunctionclose	
</CFQUERY>
```
	

He wanted mydatabase2 for the select so he added the USE sql command. I might have specified the datasource but here is where it got interesting.


```coldfusion
<CFQUERY NAME="output">
	use mydatabase2		
	exec mydatabase2.dbo.dbfunctionopen
	SELECT	.....
	exec mydatabase2.dbo.dbfunctionclose
</CFQUERY>
```
	

The query ran fine but subsequent queries stopped working on the page. We found out the USE command changed the context for the  queries below where it was used. To fix this, he added another USE command switching the database context back to the default.


```coldfusion
<CFQUERY NAME="output">
	use mydatabase2		
	exec mydatabase2.dbo.dbfunctionopen
	SELECT	.....
	exec mydatabase2.dbo.dbfunctionclose
	use mydatabasedefault
</CFQUERY>
```
	

I found this interesting since I didn't know commands like USE could affect other queries. I haven't had time to review the docs so this might be documented and explained but wanted to post about it.