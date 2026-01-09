---
title: "Subversion Ant for Files Changed between Two Revision Numbers"
date: 2008-06-15
categories:
  - "Ant"
  - "Subversion"
---

Here is my attempt to be able to pull a revision range from an svn repository. The ant script runs an svn log command, sets up the directory structure, then pulls the files down from the svn repository using an ant get command. It works but isn't pretty. Any deleted files will be tried to be pulled down. This could be cleaned up by removing the delete nodes from the xml. And I think the script could be modifiy to do an export on each file from the log if the svn repository is not accessible by url. I have been wanting to do this and finally was prompted by [Export Subversion Files Changed between Two Revision Numbers](http://orangepips.instantspot.com/blog/2008/03/06/Export-Subversion-Files-Changed-between-Two-Revision-Numbers). The post describes using TortoiseSVN but I was unable to get it working. This example script was modified from [General ANT build and release scripts](http://instantbadger.blogspot.com/2004/07/general-ant-build-and-release-scripts.html). The orginal script does an export, then removes any files not needed. It is time consuming if you have a large export so pulling only the changed files really speeds up the process. Other resources links: [Ant-Contrib Tasks](http://ant-contrib.sourceforge.net/) and [Subversion](http://subversion.tigris.org/). [Download Example  
](http://mikehenke.com/machblog/uploads/enclosures/svnRevision.zip)UPDATE: ADDED ZIP. EXPECTS YOU HAVE SVN in your classpath. \_<!--
export
Exports given revision from the given repository URL to temp.dir
\-->  
<target name="exportCode" description="Exports given revision from the given repository URL to temp.dir" >  
<echo>  
Exporting all files in revision ${startingRevision}:${endingRevision}  
</echo>  
<echo>  
from ${svn.repoURL}  
</echo>  
<echo>  
to ${temp.dir}/${jarfileTstamp}  
</echo>  
<echo>  
\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*  
</echo>  
<echo>  
(this may take a couple of minutes!)  
</echo>  
<echo>  
\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*  
</echo>

<mkdir dir="${temp.dir}${jarfileTstamp}" />  
  
<!-- need svn installed and in classpath -->  
  
<!-- creates log in an xml file for revision x to xx -->  
<exec executable="svn" outputproperty="svnlog.out" output="${temp.dir}${jarfileTstamp}log.xml" >  
<arg line="log --xml -v -r${startingRevision}:${endingRevision} ${svn.repoURL}" />  
</exec>  
  
<xmlproperty file="${temp.dir}${jarfileTstamp}log.xml" collapseattributes="true" />  
  
<propertyregex property="directory.path" input="${log.logentry.paths.path}" regexp="${svn.base}" casesensitive="false" replace=""/>  
  
<echo>${directory.path}</echo>  
  
<for list="${directory.path}" param = "val3" >  
<sequential>  
<mkdir dir="${temp.dir}/${jarfileTstamp}@{val3}"/>  
<delete dir="${temp.dir}/${jarfileTstamp}@{val3}"/>  
</sequential>  
</for>  
  
<for list="${directory.path}" param = "val2" >  
<sequential>  
<available file="" filepath="${temp.dir}/${jarfileTstamp}@{val2}" type="dir" property="your.file.path.here.present" />  
  
<if>  
<equals arg1="${your.file.path.here.present}" arg2="true"/>  
<else>  
<get src="${svn.repoURL}@{val2}" dest="${temp.dir}/${jarfileTstamp}@{val2}" username="${svn.username}" password="${svn.password}" ignoreerrors="true"/>  
</else>  
</if>  
<var name="your.file.path.here.present" unset="true"/>  
</sequential>  
</for>  
  
<echo>  
...files exported OK  
</echo>  
</target>_
