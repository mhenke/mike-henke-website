---
title: "CFCompile Ant snippet"
date: 2008-06-19
categories: 
  - "Ant"
  - "ColdFusion"
---

I have been working on a build.xml file for work that updates the local working copy, runs [MXunit](http://mxunit.org) tests, create JUnit reports based on MXunit results, [minifies js/css](http://mikehenke.com/machblog//index.cfm?event=showEntry&entryId=8A5CAB53-19B9-BA51-EECADB57919F9714), grabs only [modified files between revisions](http://mikehenke.com/machblog//index.cfm?event=showEntry&entryId=8D3AAA71-19B9-BA51-EEF8E251D9BE0A45), [crunches](http://webalfee.wordpress.com/2008/06/17/what-is-html-chrunching/) ColdFusion files, checks compile errors, and also will check for unscoped vars in cfcs using [varScoper](http://varscoper.riaforge.org/).

Here is a snippet for the checking ColdFusion compiling using cfcompile. I'll release the full build.xml, lib, and buildprops when I have the unscoped var target working.

_<!-- 
compileCheck  
Compiles the ColdFusion files for any syntax errors  
\-->  
<target name="compileCheck">  
<echo>Check Coldfusion Compile for ${webroot}${temp.dir}${jarfileTstamp}</echo>  
  
<exec failonerror="true" dir="${cfcompile\_path}" executable="cmd.exe" output="${webroot}${temp.dir}${jarfileTstamp}compile${jarfileTstamp}.txt" >  
<env key="JAVA\_HOME" value="${JAVA\_HOME}"/>  
<arg line="/c cfcompile.bat ${webroot}${temp.dir}${jarfileTstamp}" />  
</exec>  
<!-- need to check log for failures -->  
<loadfile srcfile="${webroot}${temp.dir}${jarfileTstamp}compile${jarfileTstamp}.txt" property="src.file.cferrors">  
<filterchain>  
<LineContainsRegExp>  
<regexp pattern="Error\*"/>  
</LineContainsRegExp>  
</filterchain>  
</loadfile>  
<echo>${src.file.cferrors}</echo>  
<fail>  
<condition>  
<isset property="src.file.cferrors"/>  
</condition>  
</fail>  
</target>_

Related Posts:

[Use eclipse, ant and cfcompile.bat to precompile your code](http://www.webdevref.com/blog/index.cfm?t=Use_eclipse,_ant_and_cfcompile.bat_to_precompile_your_code&mode=entry&entry=79C9D104-12CC-9590-8A5C8AA23FF93A8B&dv=link)

[Snarling radioactive ants!](http://hofo.com/post.cfm/snarling-radioactive-ants "Permalink to Snarling radioactive ants!")
