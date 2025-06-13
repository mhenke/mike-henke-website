---
title: "Query of Queries - comparison exception with cfqueryparam"
date: 2011-09-28
categories: 
  - "ColdFusion"
---

Lately, I have been working on sql injection prevention measures. Mainly cfqueryparam-ing code. I was told about [a cool script by WebApper that finds and fixes any un-cfqueryparam varialbes](https://github.com/mhenke/WebApper-ColdFusion-SQL-Injection). The caveat is the script doesn't add the cfsqltype attribute to the cfqueryparam. Not a big deal but I did find a case using Query of Queries (QoQ) defaulted the value to a string but the value was actually an integer.

### Original Code

\[code language="coldfusion"\]
<cfquery name="xxx"  dbtype="query">
select * from xxx
where id = <CFQUERYPARAM Value="#xxx.id#">
</cfquery>
\\[/code\]

### Error

\[code language="coldfusion"\]
Query Of Queries runtime error.
Comparison exception while executing =.
Unsupported Type Comparison Exception: The = operator does not support comparison between the following types:
Left hand side expression type = "INTEGER".
Right hand side expression type = "STRING".
 
The error occurred in C:\JRun4\servers\mike\cfusion.ear\cfusion.war\xxx\xx\xxx\xx.cfm: line 31

29 : 	<cfquery name="xxx"  dbtype="query">
30 : 		select * from xxx
31 : 		where id = <CFQUERYPARAM Value="#xxx.id#">
32 : 	</cfquery>
\\[/code\]

### Solution

All that was needed was to define the right side as integer and now the code works.

\[code language="coldfusion"\]
<cfquery name="xxx"  dbtype="query">
select * from xxx
where id = <CFQUERYPARAM cfsqltype="cf_sql_integer" Value="#xxx.id#">
</cfquery>
\\[/code\]
