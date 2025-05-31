---
title: "Using ColdFusion within Selenium"
date: 2007-09-24
categories: 
  - "ColdFusion"
  - "Selenium"
---

Selenium only cares the output is in its simple table structure. Please refer to Sebastien Lachance's post about [Structure of an html test](http://sebastienlachance.com/2007/08/03/getting-started-with-selenium-ide-part-2/) and James Netherton's post about [Selenium suites](http://www.jamesnetherton.com/blog/index.cfm/2007/7/2/Creating-a-Selenium-test-suite) . I use the Firefox IDE to initially create scripts and save as a cfm file. Then add the ColdFusion sweetness. Here is a simple use of ColdFusion within a Selenium test script to create a random email address. This would be useful when needing unique email addresses for testing a create new user process. _<cfset r = Randomize(5)>  
<cfset email = "#r#@test.com">_ _<tr>  
<td>type</td>  
<td>emailAddress</td>  
<td><cfoutput>#email#</cfoutput></td>  
</tr>_ Generating dynamic test scripts are easy. Here is an example of looping through all the options of a select statement with a query and verifying after submitting. _<cfquery name="selectOptions" datasource="DS">  
select select\_id, selectName from selectTable  
</cfquery>_ _<!--- loop through select options--->  
<cfloop query="selectOptions">_ _<tr>  
<td>select</td>  
<td>Select\_ID</td>  
<td>value=#selectOptions.select\_ID#</td>  
</tr>_ _<tr>  
<td>clickAndWait</td>  
<td>button</td>  
<td></td>  
</tr>_ _<tr>  
<td>verifyValue</td>  
<td>select\_ID</td>  
<td>#selectOptions.select\_ID#</td>  
</tr>_ _<!--- more checks, actions, and then return back to form --->_ _</cfloop>_
