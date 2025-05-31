---
title: "Easy Eclipse performance enhancements with ini"
date: 2011-02-17
categories: 
  - "CFEclipse"
  - "coldfusion-builder"
  - "Eclipse"
---

I have a post "[Turbo Charging Eclipse](http://mikehenke.com/post.cfm/Turbo-charging-Eclipse)" and this is a follow up to show my current eclipse.ini file. I had someone recently mention my suggestions really improved their Eclipse experience. _**Warning:**_ Before modifying your eclipse.ini be sure to back it up. The ini file is notoriously easy to mess up with a misplaced space or carriage return.

## Break down of my ini  

No splash on startup. Who needs to see you are opening Eclipse or ColdFusion Builder :-) Defining the java machine location, recommended in the Eclipse docs. This is a case where the carriage return will get you. Make sure it is after the -vm and your path is on one line. The AgressiveHeap option has been known to cause issues with some jvms. Basically, Eclipse will just disappear when you are using it without notification when I had issues with it. Currently my setup allows me to use this setting fine. The other settings can be googled if you are interested in reading about them.

## My eclipse.ini  

\-nosplash  
\-vm  
C:/Program Files/Java/jdk1.6.0\_23/bin/javaw.exe  
\-vmargs  
\-XX:+AggressiveHeap  
\-XX:+AggressiveOpts  
\-XX:+UseParallelOldGC  
\-XX:ParallelGCThreads=2  
\-XX:ThreadPriorityPolicy=1  
\-Xverify:none
