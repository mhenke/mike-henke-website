---
title: 'Eclipse: Starting fresh a little less Painful'
date: '2008-10-16'
author: Mike Henke
layout: layouts/post.njk
categories:
  - CFEclipse
  - Eclipse
---

Having problems with a corrupted Eclipse instance like<a href="http://mikehenke.com/machblog/index.cfm?event=showEntry&amp;entryId=FA78BD3D-188B-4E84-15C225362B1283AB"> line number not showing up</a> or some other funky issue and you swear you have done all the correct steps to get it to work. Maybe starting with a fresh version of Eclipse is the best route.
Most people think of restarting with a pristine version of Eclipse as a hassle, you have to reset all your update sites, get your projects, and other small time consuming tasks.
Here are two tricks to make this process a little less painful. Exporting your update site list and getting your projects back quickly. I am using Eclipse SDK Version: 3.3.2 so depending on your Eclipse version it maybe slightly different.
Exporting Update Site:<br />
Help --&gt; Software Updates --&gt; Find and Install --&gt; Search for new features to install --&gt; Export sites...
<img src="/machblog/images/fresh1.jpg" alt="Install Update Sites" />
This will create a xml file you can then use to import your site list into the pristine version of Eclipse following the same process but using "Import sites..."
Then install the plugins you want.
So you have all the plugins but your Navigator has none of your old projects.
Restoring your projects:<br />
Right-click in the Navigator view and select Import...
<img src="/machblog/images/fresh2.jpg" alt="Eclipse Navigator Right-Click Menu" />
Then select General --&gt; Existing Projects into Workspace
<img src="/machblog/images/fresh3.jpg" alt="Eclipse - Import Existing Projects" />
In the next screen put your C drive or equivalent in the "Select root directory:" input field and select Next. Eclipse will search your drive and find any project folder. You can them select which project folders to add and select Finish.
Now you have your plugins and projects, it is just a little work adding your views and arranging to your liking.