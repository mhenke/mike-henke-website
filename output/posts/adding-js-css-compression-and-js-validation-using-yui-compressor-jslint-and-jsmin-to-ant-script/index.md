---
title: "Adding JS/CSS compression and JS validation using YUI Compressor, JSLint, and jsmin to ant script"
date: 2007-09-13
categories:
  - "Ant"
---

updated script - [Minify CSS/JS ant revisited using YUI compressor](/index.cfm?event=showEntry&entryId=8A5CAB53-19B9-BA51-EECADB57919F9714) ------- I have been expanding Alistair Davidson's wonderful [General ANT build and release scripts](http://instantbadger.blogspot.com/2004/07/general-ant-build-and-release-scripts.html). I added js and css minifying shown in [Building Web Applications With Apache Ant](http://www.julienlecomte.net/blog/2007/09/11/building-web-applications-with-apache-ant/) along with javascript validation through [jslint](http://www.jslint.com/). [JSLint4Java](http://code.google.com/p/jslint4java/) "is a java wrapper around the fabulous tool by Douglas Crockford, jslint. It provides a simple interface for detecting potential problems in JavaScript code." [JSMin Ant Task](http://code.google.com/p/jsmin-ant-task/) - "is a filter which removes comments and unnecessary whitespace from javascript files. It typically reduces filesize by half, resulting in faster downloads. It also encourages a more expressive programming style because it eliminates the download cost of clean, literate self-documentation." [Yahoo! UI Library](http://developer.yahoo.com/yui/compressor/) - The YUI Compressor is JavaScript / CSS minifier designed to be 100% safe and yield a higher compression ratio than most other tools. All downloads / scripts can be found in the links above. ----- Basically I added three files to his root folder (build_release): _jslint4java-1.1+rhino.jar_, _jsmin.0.0.2.jar_, and _yuicompressor-2.1.1.jar_. **Then added this code to where he defines taskdef in his build.xml:** _<taskdef name="jsmin"
classname="net.matthaynes.jsmin.JSMin\_Task"  
classpath="jsmin.0.2.2.jar"/>  
<taskdef name="jslint"  
classname="net.happygiraffe.jslint.ant.JSLintTask"  
classpath="jslint4java-1.1+rhino.jar" />_ **Then in the target jarupTempDir, I added:** \_<!-- hack till fileset is added to jslint -->
<delete>  
<fileset dir="${tempDir}/${jarfileTstamp}">  
<include name = "\*\*/\*.js" />  
<date datetime="${startDateTime}" when="before" />  
</fileset>  
</delete>

<echo>Run JSLintTask</echo>  
<jslint dir="${tempDir}/${jarfileTstamp}">

<!-- 
<fileset dir="${tempDir}/${jarfileTstamp}" includes="\*\*/\*.js">  
<date datetime="${startDateTime}" when="after" />  
</fileset>  
\-->
</jslint>  
  
<echo>Now minifying js and css files</echo>  
<apply executable="java" parallel="false">  
<fileset dir="${tempDir}/${jarfileTstamp}" includes="\*\*/\*.js, \*\*/\*.css">  
<date datetime="${startDateTime}" when="after" />  
</fileset>  
<arg line="-jar"/>  
<arg path="yuicompressor-2.1.1.jar"/>  
<!-- 
<mapper type="glob" from="\*.js" to="\*-min.js"/>  
\-->  
</apply>_ _<!-- if want to use jsmin instead of yuicompressor  
<jsmin>  
<fileset dir="${tempDir}/${jarfileTstamp}" includes="\*\*/\*.js">  
<date datetime="${startDateTime}" when="after" />  
</fileset>  
</jsmin>  
\-->_
