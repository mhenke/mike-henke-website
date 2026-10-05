---
title: Schedule Updating SVN Working Copies -- ANT
date: '2008-04-08'
author: Mike Henke
layout: layouts/post.njk
categories:
  - Ant
  - Subversion
---

I watched Mark Esher's presention "<a href="http://experts.acrobat.com/p99499145/">ANT On The Wire: Using FTP, Email, SVN, and VSS</a>" a couple weeks ago and liked the idea of scheduling an ant to do my SVN updates before I get into the office. He was kind enough to provide <a href="http://mxunit.org/doc/zip/CFMeetup_AntWired.zip">a zip of his files</a> from the presention. Please watch the presentation to see how to setup ant.<br />
<br />
I modified his code a little so the following is based off his zip and assumes you have everything working he covered. I am storing a list of my working copy locations, my svn username, and my svn password in his unames.properties files. I changed the GetLatest.xml code to an update instead of a checkout and added a loop so I could update all my working copys. The looping feature is accomplished with <a href="http://ant-contrib.sourceforge.net/">Ant-Contrib</a>. You will have to install this like Mark shows for the other jars.<br />
<br />
I made a bat file to fire off the GetLatest.xml Ant. It also creates a log file for the latest run.
I created a shortcurt of the bat file, putting it in my start menu so I can fire it easily. I also put a shortcut in my startup just incase Windows Task Scheduler doesn't work. I set Windows Task Scheduler to run the bat file every morning before I get into the office.<br />
<a href="http://mikehenke.com/machblog/uploads/enclosures/GetLatest.zip"><br />
Included in my zip</a> is the revised GetLatest.xml, unames.properties, GetLatest.bat, and GetLatest.log files
<em> Files in zip:<br />
<strong><a href="#GetLatest_XML"> GetLatest.xml</a> </strong>- ant script to run svn update over a list of working copy paths</em><br />
<em><a href="#unames"><strong>unames.properties</strong></a> - contains variabes settings such svn login information and working copy paths</em><br />
<em><a href="#GetLatest_bat"><strong> GetLatest.bat</strong></a> - runs the GetLatest.xml ant and outputs a log files</em><em><br />
<strong> GetLatest.log</strong> - output from running the GetLatest.bat</em>
 
<a name="GetLatest_XML"><strong>GetLatest.xml</strong> </a><br />
<em>&lt;project name="Update SVN Working Copies -- ANT" default="updateSVN" basedir="."&gt; <br />
 &lt;target name="init" depends="defTasks"&gt; <br />
 &lt;property name="unames.file" value="buildprops/unames.properties" /&gt; <br />
 &lt;!-- reads this properties file and adds all properties therein as ant properties --&gt; <br />
 &lt;property file="${unames.file}" /&gt; <br />
 &lt;/target&gt; <br />
 <br />
 &lt;target name="updateSVN" depends="init"&gt; <br />
 &lt;for list="${wc.locations}" param = "val"&gt; <br />
 &lt;sequential&gt; <br />
 &lt;svn username="${svn.username}" password="${svn.password}"&gt; <br />
 &lt;update dir="@{val}" /&gt; <br />
 &lt;/svn&gt; <br />
 &lt;echo&gt;testSVN Successfull for @{val}&lt;/echo&gt; <br />
 &lt;/sequential&gt; <br />
 &lt;/for&gt; <br />
 &lt;/target&gt; <br />
 <br />
 &lt;target name="defTasks"&gt; <br />
 &lt;!-- set the standard DSTAMP, TSTAMP, TODAY properties --&gt; <br />
 &lt;tstamp /&gt; <br />
 &lt;echo&gt;${TODAY} ${TSTAMP}&lt;/echo&gt; <br />
 &lt;path id="project.classpath"&gt; <br />
 &lt;pathelement location="${ant.home}libsvnant.jar" /&gt; <br />
 &lt;pathelement location="${ant.home}libsvnClientAdapter.jar" /&gt; <br />
 &lt;pathelement location="${ant.home}libsvnjavahl.jar" /&gt; <br />
 &lt;/path&gt; <br />
 <br />
 &lt;taskdef name="svn" classname="org.tigris.subversion.svnant.SvnTask" /&gt; <br />
 <br />
 &lt;taskdef resource="net/sf/antcontrib/antlib.xml"&gt; <br />
 &lt;classpath&gt; <br />
 &lt;pathelement location="${ant.home}libant-contrib-1.0b3.jar"/&gt; <br />
 &lt;/classpath&gt; <br />
 &lt;/taskdef&gt; <br />
 &lt;/target&gt; <br />
&lt;/project&gt;</em>
 <a name="unames"><strong>unames.properties</strong></a><br />
<em>#for ftp <br />
ftp.username=??? <br />
ftp.password=??? <br />
ftp.site=??? <br />
#for email <br />
email.from=??? <br />
email.to=??? <br />
email.host=??? <br />
#for svn <br />
svn.username=yourUsername <br />
svn.password=yourPassword <br />
#list of working copy locations comma seperated <br />
wc.locations=C:/location/workingCopy1/,C:/location/workingCopy2/,C:/location/workingCopy3/</em>
<a name="GetLatest_bat"><strong>GetLatest.bat</strong></a><br />
<em>ant -buildfile GetLatest.xml -v -logfile GetLatest.log</em>