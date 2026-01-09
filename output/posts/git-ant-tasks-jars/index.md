---
title: "Git Ant Tasks jars"
date: 2011-09-27
categories:
  - "Ant"
  - "git"
---

The [JGit](http://www.eclipse.org/jgit/) project from [Eclipse](http://www.eclipse.org/) has been working on Eclipse and Git integration. Their [user guide](http://wiki.eclipse.org/JGit/User_Guide#Ant_Tasks) mentions an ant task but doesn't show where to download the needed jars. If you knew a little java, you could grab the source and compile a couple from [jgit's github account](https://github.com/eclipse/jgit).

\[code language="coldfusion"\]
<taskdef resource="org/eclipse/jgit/ant/ant-tasks.properties">
<classpath>
<pathelement location="path/to/org.eclipse.jgit.ant-VERSION.jar"/>
<pathelement location="path/to/org.eclipse.jgit-VERSION.jar"/>
<pathelement location="path/to/jsch-0.1.44-1.jar"/>
</classpath>
</taskdef>
\\[/code\]

I googled around and found them.

- [org.eclipse.jgit.ant-VERSION.jar](http://mavenhub.com/mvn/releases/com.madgag/org.eclipse.jgit.ant/1.0.99.0.6-UNOFFICIAL-ROBERTO-RELEASE)
- [org.eclipse.jgit-VERSION.jar](http://www.eclipse.org/jgit/download/)
- [jsch-0.1.44-1.jar](http://www.jcraft.com/jsch/)
