---
title: "Warning: cfdocument/format=pdf not 508 compliant"
date: 2010-03-25
categories:
  - "ColdFusion"
---

I am disappointed to warn ColdFusion users that Adobe ColdFusion does not support Accessibility with [cfdocument](http://livedocs.adobe.com/coldfusion/8/htmldocs/help.html?content=Tags_d-e_05.html)/format=pdf. I have submitted [a ticket](http://cfbugs.adobe.com/cfbugreport/flexbugui/cfbugtracker/main.html#bugId=82512) in the ColdFusion Bug Database for people to vote on. I also submitted a ticket via Adobe Support. Adobe Case # : \[Platinum\] : 181492502 : CFdocument issue with img tag and was told "We do not support Accessibility with cfdocument in ColdFusion 9."

### Recreating:

Create a cfm page with this code. <cfdocument format="PDF" backgroundvisible="yes" fontembed="true">  
<img src="images/logo.jpg" title="title" alt="logo">  
<span class="anyclass">

<ul>  
<li>PDF generator will add image with no alt attribute here</li>  
<li>PDF generator will add image with no alt attribute here</li> <li>PDF generator will add image with no alt attribute here</li> </ul>  
<p>&nbsp;</p>  
</span>

</cfdocument>  
Swap the img out for one you have available. Once you run this code, save the pdf. Then open the pdf in Adobe Acrobat Pro and run the Accessibility  
Report. (Advanced --> Accessibility --> Full Check). This will list 508 compliance errors.

### Summary of Errors:

- The checker found problems which may prevent the document from being fully accessible
- This document is not tagged; the reading order of the contents may be incorrect
- None of the images in this document that need alternate text have it
- All of the text in the document lacks a language specification

### Issues:

- Alt attributes are stripped from the pdf
- With li tag, an image is being added but no alt attribute

### Manual Work Around:

Using Acrobat Pro, fix the Accesibility error and save the pdf.

### Automated Work Around for Language:

Using cfpdf/action=setinfo Language does not work since [Lanuage is read only](http://livedocs.adobe.com/coldfusion/8/htmldocs/help.html?content=Tags_p-q_02.html) but Paul Hastings provided code to work around the language not being set: <cfscript>  
pdf="c:\\Inetpub\\wwwroot\\testCF\\iText\\arabicLigatureTest.PDF";  
newPDF=createObject("java","java.io.FileOutputStream").init("c:\\Inetpub\\wwwroot\\testCF\\iText\\testSetLang.PDF");  
pdfName=createObject("java","com.lowagie.text.pdf.PdfName");  
pdfString=createObject("java","com.lowagie.text.pdf.PdfString").init("AR-YE");  
pdfReader=createObject("java","com.lowagie.text.pdf.PdfReader").init(pdf);  
pdfReader.catalog.put(pdfName.LANG,pdfString);  
stamper=createObject("java","com.lowagie.text.pdf.PdfStamper").init(pdfReader,newPDF);  
stamper.close();  
</cfscript>

<cfscript>  
//now lets see if that had any effect  
newPDF="c:\\Inetpub\\wwwroot\\testCF\\iText\\testSetLang.PDF";  
pdfName=createObject("java","com.lowagie.text.pdf.PdfName");  
pdfReader=createObject("java","com.lowagie.text.pdf.PdfReader").init(newPDF

);  
catalog=pdfReader.getCatalog();  
lang=catalog.get(pdfName.LANG);  
writeOutput("language=#lang.toString()#");  
</cfscript>

### Automated Work Around for Missing Alt Attributes:

I will be looking into fixing the missing alt attributes with iText over the next couple days and will post any solutions I find.
