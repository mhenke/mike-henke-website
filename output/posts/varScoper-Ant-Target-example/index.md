---
title: "varScoper Ant Target example"
date: 2008-07-08
categories:
  - "Ant"
  - "ColdFusion"
  - "mxunit"
---

If you haven't heard of the [vaScoper tool](http://varscoper.riaforge.org/) created and maintained by [Mike Schierberl](http://www.schierberl.com/cfblog/), it is definately worth checking out. It has the stamp of approval of [Raymond Camden](http://www.coldfusionjedi.com/index.cfm/2008/5/22/VarScoper-Tool) and [Sean Corfield](http://corfield.org/blog/index.cfm/do/blog.entry/entry/varScoper_updated). Here is a varScoper ant target recently added to the [MXUnit](http://www.mxunit.org) build ant. Download both tools and give them a test drive. \_<target name="varScopeCheck" depends="init">

<!-- MUST HAVE VARSCOPER IN WEBROOT -->

<echo>Check for unscoped variables</echo>

<!-- load the varScoper task -->
<taskdef name="conGet" classname="com.varscoper.ant.task.ConditionalGet" classpathref="project.classpath" />  
  
<property file="${antrunner.file}" />  
<property name="filePathToUse" value="${webroot}"/>  
<property name="recursiveDirectory" value="true" />  
  
<conGet dest="varScoper.csv" url="_[_http://${server}:${port}/varscoper/varScoper.cfm_](http://${server}:${port}/varscoper/varScoper.cfm)_" >  
<parameter name ="filePath" value="${filePathToUse}" />  
<parameter name="displayFormat" value ="csv" />  
<parameter name="recursiveDirectory" value = "${recursiveDirectory}" />  
  
<!-- 
<FailIfNotFound pattern="&lt;results&gt;&lt;/results&gt;" />  
<FailIfFound pattern=".cfc" message="var scope violation is found." />  
<FailIfFound pattern=".cfm" message="var scope violation is found." />  
\-->  
</conGet>  
  
<!-- check csv file for any violations -->  
<loadfile srcfile="varScoper.csv" property="varScoper.cvs">  
<filterchain>  
<headfilter skip="1"/>  
<trim/>  
</filterchain>  
</loadfile>  
  
<!-- will be set if violations found else variable will be unset -->  
<echo>${varScoper.cvs}</echo>  
  
<fail message="var scope violation is found.">  
<condition>  
<isset property="varScoper.cvs"/>  
</condition>  
</fail>  
  
<echo>Successful check for unscoped variables</echo>  
</target>_
