---
title: Poor Man&#039;s One Code Base for Multiple ColdFusion Engines
date: '2010-06-03'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ColdFusion
  - Railo
excerpt: "I have been playing with different CFML engines for the <a href=\"http://www.cfwheels.org/\">ColdFusion\r\n on Wheels</a> codebase so I was looking for a solution where I could \r\nwork on the code in one location and have it connected to the different \r\ncfml engines directly under the webroot. There may be a solution using \r\nApache and Tomcat setting but I haven't found one yet so here is my poor\r\n man's solution to the problem. It is synching the code from one \r\nlocation to several folders representing the different CFML engines."
---

I have been playing with different CFML engines for the <a href="http://www.cfwheels.org">ColdFusion on Wheels</a> codebase so I was looking for a solution where I could work on the code in one location and have it connected to the different cfml engines directly under the webroot. There may be a solution using Apache and Tomcat settings but I haven't found one yet. Here is my poor man's solution to the problem. It is synching the code from one location to several folders representing the different CFML engines.
<h1>Prerequisite:</h1>
<a href="http://www.mattwoodward.com/blog/index.cfm?event=showEntry&amp;entryId=03233F6F-ED2C-43C7-AFF5FA2B3C3D845B">Installing and Configuring Apache 2.2, Tomcat 6.0, and Open BlueDragon on Windows 2003 Server</a> by Matt Woodward
<a href="http://www.mattwoodward.com/blog/index.cfm?event=showEntry&amp;entryId=60F08421-5F0A-41C9-940B3681A3D09D99">Open BlueDragon + Railo + ColdFusion on Tomcat</a> by Matt Woodward
<a href="http://experts.na3.acrobat.com/p13033917/">"Running Multiple CFML Engines on Apache Tomcat" Presentation</a> by Matt Woodward
<h1>Software:</h1>
<a href="http://download.cnet.com/SyncBack-Freeware/3000-2242_4-10413802.html">SyncBack Freeware</a>
Now since you have tomcat, apache, and the cfml engines setup as in Matt's instructions and installed SyncBack Freeware. Let's setup the code base in Eclipse so create a Project under your workspace called OneCodeBase and copy in your cfm files there.<br />
Next open SyncBack and create a Profile (New Button OR Profiles --&gt; New OR Control-N)<br />
Select "Backup: for copying files to another directory, drive, FTP server, etc" and next.<br />
For the named put in "OneCodeBase - Railo" and ok. A profile setup wizard will appear. Fill in the Source: C:\Users\Owner\workspace\oneCodeBase\ and Destination: C:\Program Files\Apache Software Foundation\Tomcat 6.0\webapps\railo\<br />
Then select Advanced tab. I marked the sections we will be concerned with in the Profile Setup wizard.
<img src="/images/advanced1.jpg" alt="" />
"What to do if the same file has been changed in the source &amp; destination" Section
<ul>
<li>Source overwrites destination always (backup)</li>
</ul>
"What to do if a file is in the source but not in the destination" Section
<ul>
<li>Copy file to destination</li>
</ul>
"What to do if a file is in the destination but not in the source" Section
<ul>
<li>Do Nothing, Skip the file</li>
</ul>
<br />Select Expert button, then Background tab. Check "Run this profile every" and change to 5 seconds "in the background"<br /><img src="/images/background1.jpg" alt="" /><br />(Optional) I am using git and don't need all that moved over to my web roots.<br />Select Filter tab, in the"Directories NOT to copy" Section, add .git<br />
Now select OK and No.<br />
You should see your profile updating every 5 seconds. The last run should be updating in SyncBack. Copy the profile and repeat for your other engines changing the destination.<br />
<h1>Other Approaches:</h1>
<a href="http://www.stillnetstudios.com/run-code-railo-openbd-adobe-cf-at-once/">Running your CFML code through Railo, OpenBD, and Adobe CF all at once</a> by Ryan Stille<br /><a href="http://www.compoundtheory.com/?action=displayPost&amp;ID=334">How do you test CFML against multiple versions of ColdFusion?</a> by Mark Mandel<br /><a href="http://www.carehart.org/blog/client/index.cfm/2007/8/21/multiple_cf_versions_on_IIS_XP">How would you run code against multiple CF versions at once using IIS on XP?</a> by Charlie Arehart