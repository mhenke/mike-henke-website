---
title: "ColdFusion 9 New Features - I missed"
date: 2011-07-31
categories: 
  - "acf"
  - "ColdFusion"
---

This weekend, I gained a greater appreciate for the last Adobe ColdFusion release. I am pretty late to this realization since [Adobe ColdFusion 9 was released in Oct 2009](http://www.adobe.com/aboutadobe/pressroom/pressreleases/200910/AdobeColdFusion9NowAvailable.html). And there is [talk of the next release codenamed Zeus](http://blogs.adobe.com/coldfusion/2011/06/08/next-version-of-coldfusion-is-codenamed-zeus/). I think I overlooked new features of ACF9 because Hibernate integration and more CFScript support were significant. Also my work is using ACF8 so I am not able to use ACF9. My previous job, upgraded to ACF9 but the code might as well been running on MX6.1. I learned about the ColdFusion 9 New Features [watching the online training course from Lynda.com](http://www.lynda.com/ColdFusion-9-tutorials/new-features/56299-2.html). The examples I will be using are snippets from it.

Below are two features that seemed to take the spotlight from my perspective then I'll show features that I missed.

## Regularly mentioned

### Object-relational mapping

Build database-independent applications using object-relational mapping (ORM) based on the open source Hibernate library. Save time and manage database logic and connectivity without writing any SQL. Use the ORM Application Wizard in ColdFusion Builder to generate ColdFusion components (CFCs) for logic and connectivity without writing a single line of code[...](http://www.adobe.com/products/coldfusion/features/)

### CFSCRIPT support

Work faster with new support for CFSCRIPT, including full function, component, and interface definition[...](http://www.adobe.com/products/coldfusion/features/)

To see even more click on the "All Feature" tab from the link above. Now let's focus on some other improvements I missed.

## Other improvements

### Setting the default data source

In CF9, we don't have to define the datasource in the cfquery instruction anymore like:

\[code language="coldfusion"\]
<cfquery name="rsArtists" datasource="cfartgallery">
SELECT *
FROM Artists
ORDER BY Artists.LastName, Artists.FirstName, Artists.ArtistID
</cfquery>
\\[/code\]

We can define a default datasource in the Application.cfc and skip the datasource attribute in the cfquery instruction.

\[code language="coldfusion"\]
<cfset this.datasource = "cfartgallery" />

<cfquery name="rsArtists">
SELECT *
FROM Artists
ORDER BY Artists.LastName, Artists.FirstName, Artists.ArtistID
</cfquery>
\\[/code\]

### Using ternary and chained operations

These language improvements help with less verbose code while enhancing readiblity.

\[code language="coldfusion"\]
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
\\[/code\]

### Using New

One of my complaints of using CFC is the verbose, cumbersome way to use them. The New instruction removes these barriers for me.

\[code language="coldfusion"\]
<!--- old way
<cfset MyCFC = CreateObject("component", "Chapter3.cfcs.MyCFC").init() />
--->
<cfset MyCFC = new Chapter3.cfcs.MyCFC() />
\\[/code\]

## Conclusion

To watch examples of even more ColdFusion 9 features, be sure to watch [ColdFusion 9 New Features](http://www.lynda.com/ColdFusion-9-tutorials/new-features/56299-2.html)
