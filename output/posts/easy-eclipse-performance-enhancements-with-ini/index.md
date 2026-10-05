---
title: Easy Eclipse performance enhancements with ini
date: '2011-02-17'
author: Mike Henke
layout: layouts/post.njk
categories:
  - CFEclipse
  - ColdFusion Builder
  - Eclipse
---

I have a post "<a href="/blog/Turbo-charging-Eclipse/">Turbo Charging Eclipse</a>" and this is a follow up to show my current eclipse.ini file. I had someone recently mention my suggestions really improved their Eclipse experience. <em><strong>Warning:</strong></em> Before modifying your eclipse.ini be sure to back it up. The ini file is notoriously easy to mess up with a misplaced space or carriage return.
<h2>Break down of my ini<br /></h2>
No splash on startup. Who needs to see you are opening Eclipse or ColdFusion Builder :-)
Defining the java machine location, recommended in the Eclipse docs. This is a case where the carriage return will get you. Make sure it is after the -vm and your path is on one line.
The AgressiveHeap option has been known to cause issues with some jvms. Basically, Eclipse will just disappear when you are using it without notification when I had issues with it. Currently my setup allows me to use this setting fine.
The other settings can be googled if you are interested in reading about them.
<h2>My eclipse.ini<br /></h2>
-nosplash<br />-vm<br />C:/Program Files/Java/jdk1.6.0_23/bin/javaw.exe<br />-vmargs<br />-XX:+AggressiveHeap<br />-XX:+AggressiveOpts<br />-XX:+UseParallelOldGC<br />-XX:ParallelGCThreads=2<br />-XX:ThreadPriorityPolicy=1<br />-Xverify:none