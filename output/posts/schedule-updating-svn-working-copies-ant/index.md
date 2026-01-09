---
title: "Schedule Updating SVN Working Copies -- ANT"
date: 2008-04-08
categories:
  - "Ant"
  - "Subversion"
---

I watched Mark Esher's presention "[ANT On The Wire: Using FTP, Email, SVN, and VSS](http://experts.acrobat.com/p99499145/)" a couple weeks ago and liked the idea of scheduling an ant to do my SVN updates before I get into the office. He was kind enough to provide [a zip of his files](http://mxunit.org/doc/zip/CFMeetup_AntWired.zip) from the presention. Please watch the presentation to see how to setup ant.

I modified his code a little so the following is based off his zip and assumes you have everything working he covered. I am storing a list of my working copy locations, my svn username, and my svn password in his unames.properties files. I changed the GetLatest.xml code to an update instead of a checkout and added a loop so I could update all my working copys. The looping feature is accomplished with [Ant-Contrib](http://ant-contrib.sourceforge.net/). You will have to install this like Mark shows for the other jars.

I made a bat file to fire off the GetLatest.xml Ant. It also creates a log file for the latest run. I created a shortcurt of the bat file, putting it in my start menu so I can fire it easily. I also put a shortcut in my startup just incase Windows Task Scheduler doesn't work. I set Windows Task Scheduler to run the bat file every morning before I get into the office.  
[  
Included in my zip](http://mikehenke.com/machblog/uploads/enclosures/GetLatest.zip) is the revised GetLatest.xml, unames.properties, GetLatest.bat, and GetLatest.log files _Files in zip:  
**[GetLatest.xml](#GetLatest_XML)** \- ant script to run svn update over a list of working copy paths_  
_[**unames.properties**](#unames) - contains variabes settings such svn login information and working copy paths_  
_[**GetLatest.bat**](#GetLatest_bat) - runs the GetLatest.xml ant and outputs a log files\_\_
**GetLatest.log** - output from running the GetLatest.bat_ **GetLatest.xml**  
\_<project name="Update SVN Working Copies -- ANT" default="updateSVN" basedir=".">
<target name="init" depends="defTasks">  
<property name="unames.file" value="buildprops/unames.properties" />

<!-- reads this properties file and adds all properties therein as ant properties -->
<property file="${unames.file}" />  
</target>  
  
<target name="updateSVN" depends="init">  
<for list="${wc.locations}" param = "val">  
<sequential>  
<svn username="${svn.username}" password="${svn.password}">  
<update dir="@{val}" />  
</svn>  
<echo>testSVN Successfull for @{val}</echo>  
</sequential>  
</for>  
</target>  
  
<target name="defTasks">  
<!-- set the standard DSTAMP, TSTAMP, TODAY properties -->  
<tstamp />  
<echo>${TODAY} ${TSTAMP}</echo>  
<path id="project.classpath">  
<pathelement location="${ant.home}libsvnant.jar" />  
<pathelement location="${ant.home}libsvnClientAdapter.jar" />  
<pathelement location="${ant.home}libsvnjavahl.jar" />  
</path>  
  
<taskdef name="svn" classname="org.tigris.subversion.svnant.SvnTask" />  
  
<taskdef resource="net/sf/antcontrib/antlib.xml">  
<classpath>  
<pathelement location="${ant.home}libant-contrib-1.0b3.jar"/>  
</classpath>  
</taskdef>  
</target>  
</project>_ **unames.properties**  
_#for ftp  
ftp.username=???  
ftp.password=???  
ftp.site=???  
#for email  
email.from=???  
email.to=???  
email.host=???  
#for svn  
svn.username=yourUsername  
svn.password=yourPassword  
#list of working copy locations comma seperated  
wc.locations=C:/location/workingCopy1/,C:/location/workingCopy2/,C:/location/workingCopy3/_ **GetLatest.bat**  
_ant -buildfile GetLatest.xml -v -logfile GetLatest.log_
