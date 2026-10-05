---
title: Oh, cfdump, how you have changed
date: '2011-08-03'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ACF
  - ColdFusion
---

I have been reviewing <a href="http://www.adobe.com/products/coldfusion/">Adobe ColdFusion</a> last release and the many enhancements (some of which went under my radar). This post will cover how <a href="http://help.adobe.com/en_US/ColdFusion/9.0/CFMLRef/WSc3ff6d0ea77859461172e0811cbec22c24-7ef7.html">CFDUMP</a> has improve over the years. I will go in order of the enhancements.
In <strong>MX 6.1</strong>, COM objects are able to be displayed.
In <strong>MX 7</strong>, the <em>top</em> attribute was added. The <em>top</em> attribute designates the number of rows to display. For a structure, this is the number of nested levels to display.
In <strong>ACF8</strong>, several attributes were added. They were <em>show</em>, <em>format</em>, <em>hide</em>, <em>keys</em>, <em>metainfo</em>, <em>output</em>, and <em>showUDFs</em>.
<ul>
<li><em>show</em> - default is <strong>all</strong>. For a query, this is a column name or a comma-delimited list of column names to display. For a structure, this is a key or a comma-delimited list of keys to display.</li>
<li><em>format</em> - default is <strong>text</strong>. This attribute is used with the output attribute to specify whether to save the results of a cfdump to a file in text or HTML format.</li>
<li><em>hide</em> - default is <strong>all</strong>. This is the opposite of show.</li>
<li><em>keys</em> - default is <strong>all</strong>. For a structure, the number of keys to display.</li>
<li><em>metainfo</em> - default is <strong>yes</strong> for query <strong>no</strong> for persistence CFCs. For use with queries and persistence CFCs. Includes information about the query in the cfdump results, including whether the query was cached, the execution time, and the SQLt. For persistence CFCs, if metainfo="yes", returns property attributes such as getters and setters.</li>
<li><em>output</em> - default is <strong>browser</strong>. Where to send the results of cfdump. The following values are valid: browser, console, and filename</li>
<li><em>showUDFs</em> - default is <strong>yes</strong>. Includes UDFs, with the methods collapsed.</li>
</ul>
In <strong>ACF9</strong>, the <em>abort</em> attribute was added. If this attribute is set to "true", it stops processing the current page at the tag location.
<h2>History</h2>
<ul>
<li>ColdFusion MX 6.1: Added the ability to dump COM objects; it displays the methods and Get and Put properties typeinfo information for the object.</li>
<li>ColdFusion MX 7: Added the top attribute.</li>
<li>ColdFusion 8: Added the show, format, hide, keys, metainfo, output, and showUDFs attributes.</li>
<li>ColdFusion 9: Added the attribute abort.</li>
</ul>