---
title: 'Warning: cfdocument/format=pdf not 508 compliant'
date: '2010-03-25'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ColdFusion
excerpt: "I am disappointed to warn ColdFusion users that Adobe ColdFusion does not support Accessibility with <a href=\"http://livedocs.adobe.com/coldfusion/8/htmldocs/help.html?content=Tags_d-e_05.html\">cfdocument</a>/format=pdf. I have submitted <a href=\"http://cfbugs.adobe.com/cfbugreport/flexbugui/cfbugtracker/main.html#bugId=82512\">a ticket</a>\r\nin the ColdFusion Bug Database for people to vote on. I also submitted\r\na ticket via Adobe Support. Adobe Case # : [Platinum] : 181492502 :\r\nCFdocument issue with img tag and was told \"We do not support\r\nAccessibility with cfdocument in ColdFusion 9.\"....."
---

I am disappointed to warn ColdFusion users that Adobe ColdFusion does not support Accessibility with <a href="http://livedocs.adobe.com/coldfusion/8/htmldocs/help.html?content=Tags_d-e_05.html">cfdocument</a>/format=pdf. I have submitted <a href="http://cfbugs.adobe.com/cfbugreport/flexbugui/cfbugtracker/main.html#bugId=82512">a ticket</a> in the ColdFusion Bug Database for people to vote on. I also submitted a ticket via Adobe Support. Adobe Case # : [Platinum] : 181492502 : CFdocument issue with img tag and was told "We do not support Accessibility with cfdocument in ColdFusion 9."
<h3>Recreating:</h3>
Create a cfm page with this code.
&lt;cfdocument format="PDF" backgroundvisible="yes" fontembed="true"&gt;<br />&lt;img src="images/logo.jpg" title="title" alt="logo"&gt;<br />&lt;span class="anyclass"&gt;<br />&lt;ul&gt;<br />&lt;li&gt;PDF generator will add image with no alt attribute here&lt;/li&gt;<br />&lt;li&gt;PDF generator will add image with no alt attribute here&lt;/li&gt;
&lt;li&gt;PDF generator will add image with no alt attribute here&lt;/li&gt;
&lt;/ul&gt;<br />&lt;p&gt;&amp;nbsp;&lt;/p&gt;<br />&lt;/span&gt;

&lt;/cfdocument&gt;<br />Swap the img out for one you have available. Once you run this code, save the pdf. Then open the pdf in Adobe Acrobat Pro and run the Accessibility<br />Report. (Advanced --&gt; Accessibility --&gt; Full Check). This will list 508 compliance errors.
<h3>Summary of Errors:</h3>
<ul>
<li>The checker found problems which may prevent the document from being fully accessible</li>
<li>This document is not tagged; the reading order of the contents may be incorrect</li>
<li>None of the images in this document that need alternate text have it</li>
<li>All of the text in the document lacks a language specification</li>
</ul>
<h3>Issues:</h3>
<ul>
<li>Alt attributes are stripped from the pdf</li>
<li>With li tag, an image is being added but no alt attribute</li>
</ul>
<h3>Manual Work Around:</h3>
Using Acrobat Pro, fix the Accesibility error and save the pdf.
<h3>Automated Work Around for Language:</h3>
Using cfpdf/action=setinfo Language does not work since <a href="http://livedocs.adobe.com/coldfusion/8/htmldocs/help.html?content=Tags_p-q_02.html">Lanuage is read only</a> but Paul Hastings provided code to work around the language not being set:
&lt;cfscript&gt; <br /> pdf="c:\Inetpub\wwwroot\testCF\iText\arabicLigatureTest.PDF"; <br /> newPDF=createObject("java","java.io.FileOutputStream").init("c:\Inetpub\wwwroot\testCF\iText\testSetLang.PDF"); <br /> pdfName=createObject("java","com.lowagie.text.pdf.PdfName"); <br /> pdfString=createObject("java","com.lowagie.text.pdf.PdfString").init("AR-YE"); <br /> pdfReader=createObject("java","com.lowagie.text.pdf.PdfReader").init(pdf); <br /> pdfReader.catalog.put(pdfName.LANG,pdfString); <br /> stamper=createObject("java","com.lowagie.text.pdf.PdfStamper").init(pdfReader,newPDF); <br /> stamper.close(); <br /> &lt;/cfscript&gt; 

&lt;cfscript&gt; <br /> //now lets see if that had any effect <br /> newPDF="c:\Inetpub\wwwroot\testCF\iText\testSetLang.PDF"; <br /> pdfName=createObject("java","com.lowagie.text.pdf.PdfName"); <br /> pdfReader=createObject("java","com.lowagie.text.pdf.PdfReader").init(newPDF

); <br /> catalog=pdfReader.getCatalog(); <br /> lang=catalog.get(pdfName.LANG); <br /> writeOutput("language=#lang.toString()#"); <br /> &lt;/cfscript&gt; 
<h3>Automated Work Around for Missing Alt Attributes:</h3>
I will be looking into fixing the missing alt attributes with iText over the next couple days and will post any solutions I find.