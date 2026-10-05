---
title: haml, jhaml, and ColdFusion demo
date: '2010-09-18'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ColdFusion
excerpt: "<h2>Proof of Concept:</h2> \r\nThis is a proof of concept for using <a href=\"http://haml-lang.com//\">haml</a> with <a href=\"http://www.adobe.com/products/coldfusion/\">ColdFusion</a>\r\n\r\n<h2>Acknowledgements:</h2> \r\nI altered code from these two posts and would like to thank them. \r\n \r\n<ul> \r\n\t<li><a href=\"http://blog.atozofweb.com/2010/08/using-less-css-with-coldfusion/\">Using Less CSS with ColdFusion</a></li> \r\n\t<li><a href=\"http://gist.github.com/402590\">main.haml example</a></li> \r\n</ul>"
---

<h2>Proof of Concept:</h2> 
This is a proof of concept for using <a href="http://haml-lang.com//">haml</a> with <a href="http://www.adobe.com/products/coldfusion/">ColdFusion</a>

<h2>Acknowledgements:</h2> 
I altered code from these two posts and would like to thank them. 
 
<ul> 
	<li><a href="http://blog.atozofweb.com/2010/08/using-less-css-with-coldfusion/">Using Less CSS with ColdFusion</a></li> 
	<li><a href="http://gist.github.com/402590">main.haml example</a></li> 
</ul> 

<h2>Required</h2>
 <ul> 
	<li><a href="https://javaloader.riaforge.org/">JavaLoader</a></li> 
	<li><a href="http://github.com/raymyers/JHaml">Jhaml jar</a></li>
        <li><a href="http://github.com/raymyers/JHaml/tree/master/lib/">Jhaml dependency jars</a></li>
</ul> 
<h2>Input HAML</h2> 
<pre>%html
  %head
    %title
      %g:layoutTitle(default="Adobe ColdFusion")
    %link(rel="stylesheet" href="main.css")
    %link(rel="shortcut icon" href="favicon.png" type="image/x-icon")
    %g:layoutHead/
    %g:javascript(library="application")/
  %body
    #adobe.adobe(style="display:none;")
      %img(src="http://www.adobe.com/go/gn_home_logo" alt="Adobe")
    #ColdFusionLogo.logo
      %a(href="http://www.adobe.com/products/coldfusion/")
        %img(src="http://1337productions.com/new_images/ColdFusion_logo.png" alt="ColdFusion" border="0")/
    %g:layoutBody/
</pre> 
 
<h2>Output HTML</h2> 
 
<pre>&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;
      &lt;g:layoutTitle default='Adobe ColdFusion'&gt;&lt;/g:layoutTitle&gt;
    &lt;/title&gt;
    &lt;link href='main.css' rel='stylesheet' /&gt;
    &lt;link href='favicon.png' rel='shortcut icon' type='image/x-icon' /&gt;
    &lt;g:layoutHead /&gt;
    &lt;g:javascript library='application' /&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;div class='adobe' id='adobe' style='display:none;'&gt;
      &lt;img alt='Adobe' src='http://www.adobe.com/go/gn_home_logo' /&gt;
    &lt;/div&gt;
    &lt;div class='logo' id='ColdFusionLogo'&gt;
      &lt;a href='http://www.adobe.com/products/coldfusion/'&gt;
        &lt;img alt='ColdFusion' border='0' src='http://1337productions.com/new_images/ColdFusion_logo.png' /&gt;
      &lt;/a&gt;
    &lt;/div&gt;
    &lt;g:layoutBody /&gt;
  &lt;/body&gt;
&lt;/html&gt;
</pre> 
 
<h2>Display HTML</h2> 
<html> 
  <head> 
    <title> 
      <g:layoutTitle default='Adobe ColdFusion'></g:layoutTitle>
    </title> 
    <link href='main.css' rel='stylesheet' /> 
    <link href='favicon.png' rel='shortcut icon' type='image/x-icon' /> 
    <g:layoutHead /> 
    <g:javascript library='application' /> 
  </head> 
  <body> 
    <div class='adobe' id='adobe' style='display:none;'> 
      <img alt='Adobe' src='http://www.adobe.com/go/gn_home_logo' /> 
    </div> 
    <div class='logo' id='ColdFusionLogo'> 
      <a href='http://www.adobe.com/products/coldfusion/'> 
        <img alt='ColdFusion' border='0' src='http://1337productions.com/new_images/ColdFusion_logo.png' /> 
      </a> 
    </div> 
    <g:layoutBody /> 
  </body> 
</html> 

<h2>Code</h2>
<pre>
```coldfusion
<h2>Acknowlegements:</h2>
I altered code from these two posts and would like to thank them.

<ul>
	<li>http://blog.atozofweb.com/2010/08/using-less-css-with-coldfusion/</li>
	<li>http://gist.github.com/raw/402590/fa8a70cbe3f2ad5f2d5dad7d017db2167dc658ab/main.haml</li>
</ul>

<cfscript>
    loadPaths = ArrayNew(1);
    loadPaths[1] = expandPath("jhaml-0.1.3.jar");
	loadPaths[2] = expandPath("commons-lang-2.5.jar");
	loadPaths[3] = expandPath("markdownj-0.3.0-1.0.2b4.jar");
	loadPaths[4] = expandPath("guava-r06.jar");
</cfscript>

<cfset loader = createObject("component", "javaloader.JavaLoader").init(loadPaths, 'true') />

<cfset engine = loader.create("com.cadrlife.jhaml.JHaml").init() />
<cfset title_variable = "Adobe ColdFusion" />

<cfsavecontent variable="inputhaml">
%html
  %head
    %title
      %g:layoutTitle(default="<cfoutput>#title_variable#</cfoutput>")
    %link(rel="stylesheet" href="main.css")
    %link(rel="shortcut icon" href="favicon.png" type="image/x-icon")
    %g:layoutHead/
    %g:javascript(library="application")/
  %body
    #adobe.adobe(style="display:none;")
      %img(src="http://www.adobe.com/go/gn_home_logo" alt="Adobe")
    #ColdFusionLogo.logo
      %a(href="http://www.adobe.com/products/coldfusion/")
        %img(src="http://1337productions.com/new_images/ColdFusion_logo.png" alt="ColdFusion" border="0")/
    %g:layoutBody/
</cfsavecontent>

<h2>Input HAML</h2>
<pre><cfset title_variable = "Adobe ColdFusion">
Title variable is actually  %g:layoutTitle(default="<cfoutput>#title_variable#</cfoutput>")
<cfoutput>#inputhaml#</cfoutput>
</pre>

<h2>Output HTML</h2>
<cfset text = engine.parse(inputhaml) />
<pre><cfoutput>#xmlformat(text)#</cfoutput>
</pre>

<h2>Display HTML</h2>
<cfoutput>#text#</cfoutput>
```

</pre>