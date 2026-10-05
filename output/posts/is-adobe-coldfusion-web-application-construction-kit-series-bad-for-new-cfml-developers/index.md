---
title: >-
  Is Adobe ColdFusion Web Application Construction Kit series bad for new CFML
  developers?
date: '2012-01-26'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ACF
  - ColdFusion
---

I remember when I started programming <a href="http://en.wikipedia.org/wiki/ColdFusion">ColdFusion</a> fresh out of college in 1999. I had a 3 day HTML class which was my first exposure to HTML, then read books. I would "buy" the Dummy series, then exchange the unmarked book for a more advanced book on the same subject covering ColdFusion, SQL, and HTML. The <a href="http://www.amazon.com/Adobe-ColdFusion-Web-Application-Construction/dp/032166034X">Adobe ColdFusion Web Application Construction Kit</a> (CFWACK) book was my bible along with a ColdFusion video series.
Flash forward to today, would I recommend a new developer learn ColdFusion with the CFWACK book. No, the content has been updated for ColdFusion releases but the methodology has not. It seems to still teach on a procedural methodology not Object Oriented approach. Is Adobe ColdFusion Web Application Construction Kit series bad for new CFML developers? Yes, it teaches how to create a mess with unmaintainable code  <strong><em>UPDATE 2: And ugly code (see comments below about using script).</em></strong> We aren't developing one off web pages anymore but complex web applications. Even though the title says "web applications" the book misses this point.
On Amazon, I looked inside Vol 1 and the first CFML code the reader is exposed to is one template with a query, html, cfoutput in "Introducting ColdFusion". <em>I am guessing</em> Chapter 11: Creating Data-Driven Pages and Chapter 14: Using Forms to Add or Change Data are the same procedural mess with the dreaded display/action page methodology. <span style="text-decoration: line-through;">It appears the first mention of ColdFusion Components (CFC) is Part 5, Chapter 24.</span> <strong><em>UPDATE 1: I had searched v2, not v1. It appears the first mention of ColdFusion Components (CFC) is in Chapter 11 "The Basics of Structured Development". </em></strong>Also CFWACK series is huge, Vol 1 is 600 pages, Vol 2 is 600 pages, and Vol 3 is 640 pages.
This being said, I would recommend several ColdFusion books for new CFML developers.
<a href="http://www.amazon.com/ColdFusion-Developer-Tutorial-John-Farrar/dp/1849690243/ref=sr_1_4?s=books&amp;ie=UTF8&amp;qid=1327592576&amp;sr=1-4">ColdFusion 9 Developer Tutorial</a>
<a href="http://www.amazon.com/Object-Oriented-Programming-ColdFusion-Matt-Gifford/dp/1847196322#reader_1847196322">Object-Oriented Programming in ColdFusion</a><a href="http://www.coldfusionormbook.com/"></a>
<a href="http://www.coldfusionormbook.com/">ColdFusion ORM</a><br /><br /><a href="http://blogs.adobe.com/mallika/2009/10/coldfusion_9_documentation_and_learning_resources.html">Adobe ColdFusion 9 documentation set</a> (pdf/html):<br />Installing Adobe ColdFusion 9<br />Configuring and Administering Adobe ColdFusion 9<br />Developing Adobe ColdFusion 9 Applications<br />Adobe ColdFusion 9 CFML Reference
** You were able to purchase the Adobe ColdFusion documentation set for a ridiculously low price around $50 but I am not sure if it is still printed with the most recent ACF release.
Not Adobe but <a href=" http://www.amazon.com/Railo-Beginners-Guide-Mark-Drew/dp/1849513406/ref=sr_1_1?s=books&amp;ie=UTF8&amp;qid=1327593928&amp;sr=1-1">Railo 3 Beginner's Guide</a> covers CFC in chapter 3, about 70 pages into the book.