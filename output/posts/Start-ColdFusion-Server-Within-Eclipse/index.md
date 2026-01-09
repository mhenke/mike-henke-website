---
title: "Start ColdFusion Server Within Eclipse"
date: 2008-02-08
categories:
  - "CFEclipse"
  - "ColdFusion"
  - "Eclipse"
---

After a lot of trial and error tonight, I am able to start and stop my ColdFusion server from Eclipse. I am working with Ubuntu, CF8, and JRun along with Eclipse 3.3.1.1, your environment may need tweaking. ![](images/run.jpg)

Before I basically ran "sudo /opt/jrun4/bin/jrun start cfusion" in a terminal to start CF even though I have created startup scripts.

### Creating a project for the jrun folder

First I created a new project using "Java Project". I named it jrun and selected "Create project from existing source" then put "/opt/jrun4" in the directory field. Then I created the start and stop items.

### Start ColdFusion JRun server in Eclipse

_Run --> Open Run Dialog_ then right-click on _Java Application_ and select _new._

**Main tab**  
Name: JRun -start cfusion  
Project: jrun  
Main class: jrunx.kernel.JRun![](images/main.jpg)

**Arguments tab**  
Program arguments: start cfusion

VM arguments: -Xms512m -Xmx512m -XX:PermSize=128m -XX:MaxPermSize=128m -Dsun.io.useCanonCaches=false -Djmx.invoke.getters=true![](images/arg.jpg)

**Common tab**  
I also decided to display in favorites menu for easy access.

### Stopping ColdFusion JRun server with Eclipse

I duplicated the starting instance. Changed the name to "JRun -stop cfusion" on the Main tab. In the Arguments tab, I changed start to stop in the Program arguments section and removed the VM arguments. My resources:

[https://help.ubuntu.com/community/PHPEclipse](https://help.ubuntu.com/community/PHPEclipse)  
[http://livedocs.adobe.com/jrun/4/Getting_Started_with_JRun/intro6.htm](http://livedocs.adobe.com/jrun/4/Getting_Started_with_JRun/intro6.htm)
[http://barefootdevelopment.blogspot.com/2006/05/debugging-j2ee-technology-apps-on-jrun.html](http://barefootdevelopment.blogspot.com/2006/05/debugging-j2ee-technology-apps-on-jrun.html)  
[http://www.myeclipseide.com/PNphpBB2-printview-t-9805-start-0.html](http://www.myeclipseide.com/PNphpBB2-printview-t-9805-start-0.html)

_Later I will show how I setup a feature of PHPEclipse to start, stop, and restart my apache server._
