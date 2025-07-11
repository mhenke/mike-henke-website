---
title: "jTidy cfc (stand alone and CFWheels plugin)"
date: 2010-01-02
categories: 
  - "cfwheels"
  - "ColdFusion"
---

"JTidy is a Java port of HTML Tidy, a HTML syntax checker and pretty printer. Like its non-Java cousin, JTidy can be used as a tool for cleaning up malformed and faulty HTML." [More information](http://jtidy.sourceforge.net/)  
  
I was looking for something to clean up some html for pdf generation using cfdocument and found a [jtidy.cfc](http://www.koders.com/coldfusion/fid592E9E77FAE5A6BD59A69EDE020528E2F2BEC2B9.aspx) used by [Farcry](http://www.farcrycore.org/) for returning valid xHTML.  
  
If you weren't familiar, "FarCry Core is a web application framework based on the ColdFusion language. FarCry CMS is a popular content management solution built with FarCry Core."  
  
I reviewed the license and from my understanding of "GNU GPL License v3 (GPL)" I can publish my modification. I added [javaloader](http://javaloader.riaforge.org/) and did some slight modification of the code. My code changes are here for review and download: [jTidy CFC](http://github.com/mhenke/jtidy_cfc)  
  
Implementation is really easy for this version of jTidy with ColdFusion.  
  
Drop the jtidy\_cfc folder in your webroot or add cfmapping to it, then invoke the jtidy.cfc and pass in the html you want to return as valid xHTML.  
  
Here is the code for my samples, it take some not valid xhmtl examples and fixes them.  
  
\[code language="coldfusion"\]
<!--- see readme.txt for testing this example file --->

<!--- component path to jtidy.cfc --->
<cfset componentPath = "jtidy_cfc.jtidy" />

<cfsavecontent variable="test">
<html>
	<head>
		<title>jtidy test page</title>
	</head>
	<body>
	
		<!-- examples from http://en.wikipedia.org/wiki/XHTML -->
		<table id="companyAccountsTable">
			<tbody>
				<tr>
					<td>mike henke</td>
				</tr>
			</tbody>
		</table>
		
		<form action="/index.cfm">
		
		<!-- Not putting quotation marks around attribute values -->
		<input type=text value=hello />
	
		</form>
		
		<!-- Not closing non-empty elements -->
		
		
		<!-- Improperly nesting elements -->
		<em><strong>This is some text.</em></strong>
		
		<!-- Using the ampersand character outside of entities -->
		<div>Cars & Trucks</div>
		
		<!-- Not closing empty elements -->
		<br>
		
		<!-- Using the ampersand character outside of entities -->
		<div><a href="index.cfm?page=news&id=5">News</a></div>
		
		<!-- Using attribute minimization -->
		<div><textarea readonly>READ-ONLY
\\[/code\]</div> <!-- Failing to recognize that XHTML elements and attributes are case sensitive --> <P ID="ONE">The Best Page Ever</P> </body> </html> </cfsavecontent> <div></div> <cfinvoke component="#componentPath#" method="makexHTMLValid" strToParse="#test#" returnvariable="validxHTML" > <!--- <cfdump var="#validxHTML#"> ---> <div></div> <cfoutput>#validxHTML#</cfoutput> \\\[/code\] <br><br> I also created a <a href="http://cfwheels.org/plugins/listing/25">jTidy CFC plugin for CFWheels</a>.</x-turndown>
