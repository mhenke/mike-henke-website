---
title: ColdFusion 9 New Features - I missed
date: '2011-07-31'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ACF
  - ColdFusion
---

This weekend, I gained a greater appreciate for the last Adobe ColdFusion release. I am pretty late  to this realization since <a href="http://www.adobe.com/aboutadobe/pressroom/pressreleases/200910/AdobeColdFusion9NowAvailable.html">Adobe ColdFusion 9 was released in Oct 2009</a>. And there is <a href="http://blogs.adobe.com/coldfusion/2011/06/08/next-version-of-coldfusion-is-codenamed-zeus/">talk of the next release codenamed Zeus</a>. I think I overlooked new features of ACF9 because Hibernate integration and more CFScript support were significant. Also my work is using ACF8 so I am not able to use ACF9. My previous job, upgraded to ACF9 but the code might as well been running on MX6.1. I learned about the ColdFusion 9 New Features <a href="http://www.lynda.com/ColdFusion-9-tutorials/new-features/56299-2.html">watching the online training course from Lynda.com</a>. The examples I will be using are snippets from it.

Below are two features that seemed to take the spotlight from my perspective then I'll show features that I missed.

<h2>Regularly mentioned</h2>

<h3>Object-relational mapping</h3>

Build database-independent applications using object-relational mapping (ORM) based on the open source Hibernate library. Save time and manage database logic and connectivity without writing any SQL. Use the ORM Application Wizard in ColdFusion Builder to generate ColdFusion components (CFCs) for logic and connectivity without writing a single line of code<a href="http://www.adobe.com/products/coldfusion/features/">...</a>

<h3>CFSCRIPT support</h3>

Work faster with new support for CFSCRIPT, including full function, component, and interface definition<a href="http://www.adobe.com/products/coldfusion/features/">...</a>

To see even more click on the "All Feature" tab from the link above. Now let's focus on some other improvements I missed.

<h2>Other improvements</h2>

<h3>Setting the default data source</h3>


In CF9, we don't have to define the datasource in the cfquery instruction anymore like:



```coldfusion
<cfquery name="rsArtists" datasource="cfartgallery">
SELECT *
FROM Artists
ORDER BY Artists.LastName, Artists.FirstName, Artists.ArtistID
</cfquery>
```


We can define a default datasource in the Application.cfc and skip the datasource attribute in the cfquery instruction.



```coldfusion
<cfset this.datasource = "cfartgallery" />

<cfquery name="rsArtists">
SELECT *
FROM Artists
ORDER BY Artists.LastName, Artists.FirstName, Artists.ArtistID
</cfquery>
```


<h3>
Using ternary and chained operations
</h3>


These language improvements help with less verbose code while enhancing readiblity.



```coldfusion
<!--- old way
<cfset totalPieces = 0 />
<cfset numberSold = 0 />
--->

<cfset totalPieces = numberSold = 0 />

<cfoutput>   
<!---  old way
<cfif Val(rsArtists.IsSold)>
<cfset numberSold ++ />
</cfif>
--->

<cfset numberSold = Val(rsArtists.IsSold) ? ++ numberSold : numberSold />

<cfset totalPieces ++ />

<!--- old way
<tr class="<cfif totalPieces MOD 2 EQ 0>evenRow<cfelse>oddRow</cfif>">
--->

<tr class="#(totalPieces MOD 2 EQ 0) ? "evenRow" : "oddRow"#">
<td>#rsArtists.ArtName#</td>
<td>#YesNoFormat(rsArtists.IsSold)#</td>
</tr>
<cfoutput>
```


<h3>
Using New
</h3>


One of my complaints of using CFC is the verbose, cumbersome way to use them. The New instruction removes these barriers for me.



```coldfusion
<!--- old way
<cfset MyCFC = CreateObject("component", "Chapter3.cfcs.MyCFC").init() />
--->
<cfset MyCFC = new Chapter3.cfcs.MyCFC() />
```


<h2>Conclusion</h2>


To watch examples of even more ColdFusion 9 features, be sure to watch <a href="http://www.lynda.com/ColdFusion-9-tutorials/new-features/56299-2.html">ColdFusion 9 New Features</a>