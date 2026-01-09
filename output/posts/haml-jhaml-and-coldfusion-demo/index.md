---
title: "haml, jhaml, and ColdFusion demo"
date: 2010-09-18
categories:
  - "ColdFusion"
---

## Proof of Concept:

This is a proof of concept for using [haml](http://haml-lang.com//) with [ColdFusion](http://www.adobe.com/products/coldfusion/)

## Acknowledgements:

I altered code from these two posts and would like to thank them.

- [Using Less CSS with ColdFusion](http://blog.atozofweb.com/2010/08/using-less-css-with-coldfusion/)
- [main.haml example](http://gist.github.com/402590)

## Required

- [JavaLoader](http://javaloader.riaforge.org/)
- [Jhaml jar](http://github.com/raymyers/JHaml)
- [Jhaml dependency jars](http://github.com/raymyers/JHaml/tree/master/lib/)

## Input HAML

```
%html
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

```

## Output HTML

```
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

```

## Display HTML

<g:layoutTitle default='Adobe ColdFusion'></g:layoutTitle> ![Adobe](http://www.adobe.com/go/gn_home_logo)

[![ColdFusion](http://1337productions.com/new_images/ColdFusion_logo.png)](http://www.adobe.com/products/coldfusion/)

## Code

```
[code language="coldfusion"]Acknowlegements:
I altered code from these two posts and would like to thank them.

	http://blog.atozofweb.com/2010/08/using-less-css-with-coldfusion/
	http://gist.github.com/raw/402590/fa8a70cbe3f2ad5f2d5dad7d017db2167dc658ab/main.haml

    loadPaths = ArrayNew(1);
    loadPaths[1] = expandPath("jhaml-0.1.3.jar");
	loadPaths[2] = expandPath("commons-lang-2.5.jar");
	loadPaths[3] = expandPath("markdownj-0.3.0-1.0.2b4.jar");
	loadPaths[4] = expandPath("guava-r06.jar");

%html
  %head
    %title
      %g:layoutTitle(default="#title_variable#")
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

Input HAML
<cfset title_variable = "Adobe ColdFusion">
Title variable is actually  %g:layoutTitle(default="<cfoutput>#title_variable#</cfoutput>")
#inputhaml#

Output HTML

#xmlformat(text)#

Display HTML
#text#
[/code]

```
