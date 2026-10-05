---
title: Git Ant Tasks jars
date: '2011-09-27'
author: Mike Henke
layout: layouts/post.njk
categories:
  - Ant
  - Git
---

The <a href="http://www.eclipse.org/jgit/">JGit</a> project from <a href="http://www.eclipse.org/">Eclipse</a> has been working on Eclipse and Git integration. Their <a href="http://wiki.eclipse.org/JGit/User_Guide#Ant_Tasks">user guide</a> mentions an ant task but doesn't show where to download the needed jars. If you knew a little java, you could grab the source and compile a couple from <a href="https://github.com/eclipse/jgit">jgit's github account</a>.


```coldfusion
<taskdef resource="org/eclipse/jgit/ant/ant-tasks.properties">
   <classpath>
	 <pathelement location="path/to/org.eclipse.jgit.ant-VERSION.jar"/>
	 <pathelement location="path/to/org.eclipse.jgit-VERSION.jar"/>
	 <pathelement location="path/to/jsch-0.1.44-1.jar"/>
   </classpath>
</taskdef>
```


I googled around and found them.
<ul>
<li><a href="http://mavenhub.com/mvn/releases/com.madgag/org.eclipse.jgit.ant/1.0.99.0.6-UNOFFICIAL-ROBERTO-RELEASE">org.eclipse.jgit.ant-VERSION.jar</a></li>
<li><a href="http://www.eclipse.org/jgit/download/ ">org.eclipse.jgit-VERSION.jar</a></li>
<li><a href="http://www.jcraft.com/jsch/">jsch-0.1.44-1.jar</a></li>
</ul>