---
title: >-
  Adding JS/CSS compression and JS validation using YUI Compressor, JSLint, and
  jsmin to ant script
date: '2007-09-13'
author: Mike Henke
layout: layouts/post.njk
categories:
  - Ant
---

updated script - <a href="/blog/Minify-CSS-JS-ant-revisited-using-YUI-compressor/"> 						Minify CSS/JS ant revisited using YUI compressor</a>
-------
I have been expanding Alistair Davidson's wonderful <a href="http://instantbadger.blogspot.com/2004/07/general-ant-build-and-release-scripts.html" target="_self">General ANT build and release scripts</a>.   I added js and css minifying shown in <a href="http://www.julienlecomte.net/blog/2007/09/11/building-web-applications-with-apache-ant/" target="_self">Building Web Applications With Apache Ant </a>along with javascript validation through <a href="http://www.jslint.com/" target="_self">jslint</a>.
<a href="http://code.google.com/p/jslint4java/" target="_self">JSLint4Java</a> "is a java wrapper around the fabulous tool by Douglas Crockford, jslint. It provides a simple interface for detecting potential problems in JavaScript code."
<a href="http://code.google.com/p/jsmin-ant-task/" target="_self">JSMin Ant Task</a> -   "is a filter which removes comments and unnecessary whitespace from javascript files. It typically reduces filesize by half, resulting in faster downloads. It also encourages a more expressive programming style because it eliminates the download cost of clean, literate self-documentation."
<a href="http://developer.yahoo.com/yui/compressor/" target="_self">Yahoo! UI Library</a> - The YUI Compressor is JavaScript / CSS minifier designed to be 100% safe and yield a higher compression ratio than most other tools.
All downloads / scripts can be found in the links above.
-----
Basically I added three files to his root folder (build_release): <em>jslint4java-1.1+rhino.jar</em>, <em>jsmin.0.0.2.jar</em>, and <em>yuicompressor-2.1.1.jar</em>.
<strong>Then added this code to where he defines taskdef in his build.xml:</strong>
  <em> &lt;taskdef name="jsmin"<br />
               classname="net.matthaynes.jsmin.JSMin_Task"<br />
               classpath="jsmin.0.2.2.jar"/&gt;<br />
   &lt;taskdef name="jslint" <br />
                 classname="net.happygiraffe.jslint.ant.JSLintTask" <br />
              classpath="jslint4java-1.1+rhino.jar" /&gt;</em>
<strong>Then in the target jarupTempDir, I added:</strong>
<em>&lt;!-- hack till fileset is added to jslint --&gt;<br />
              &lt;delete&gt;<br />
                     &lt;fileset dir="${tempDir}/${jarfileTstamp}"&gt;<br />
                            &lt;include name = "**/*.js" /&gt;<br />
                              &lt;date datetime="${startDateTime}" when="before" /&gt;<br />
                     &lt;/fileset&gt;<br />
              &lt;/delete&gt;            <br />
              <br />
              &lt;echo&gt;Run JSLintTask&lt;/echo&gt;            <br />
              &lt;jslint dir="${tempDir}/${jarfileTstamp}"&gt; <br />
              &lt;!--<br />
                       &lt;fileset dir="${tempDir}/${jarfileTstamp}" includes="**/*.js"&gt;<br />
                              &lt;date datetime="${startDateTime}" when="after" /&gt;<br />
                     &lt;/fileset&gt;<br />
              --&gt;<br />
              &lt;/jslint&gt;<br />
       <br />
              &lt;echo&gt;Now minifying js and css files&lt;/echo&gt;            <br />
              &lt;apply executable="java" parallel="false"&gt;<br />
                      &lt;fileset dir="${tempDir}/${jarfileTstamp}" includes="**/*.js, **/*.css"&gt;<br />
                            &lt;date datetime="${startDateTime}" when="after" /&gt;<br />
                     &lt;/fileset&gt;<br />
                      &lt;arg line="-jar"/&gt;<br />
                      &lt;arg path="yuicompressor-2.1.1.jar"/&gt;<br />
                     &lt;!--<br />
                      &lt;mapper type="glob" from="*.js" to="*-min.js"/&gt;<br />
                     --&gt;<br />
              &lt;/apply&gt;</em>
<em>              &lt;!--   if want to use jsmin instead of yuicompressor<br />
              &lt;jsmin&gt;<br />
                         &lt;fileset dir="${tempDir}/${jarfileTstamp}" includes="**/*.js"&gt;<br />
                     &lt;date datetime="${startDateTime}" when="after" /&gt;<br />
                     &lt;/fileset&gt;<br />
              &lt;/jsmin&gt;<br />
              --&gt;</em>