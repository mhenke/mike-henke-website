---
title: ColdFusion Builder 2.0.1 beta and Mylyn
date: '2012-02-18'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ACF
  - ColdFusion
  - ColdFusion Builder
  - Mylyn
---

There was a tweet by <a href="https://twitter.com/#!/lolajl">lolajl</a> about frustrations with installing <a href="http://www.eclipse.org/mylyn/">Mylyn</a> on the CFBuilder2.0.1 beta. My recommendation was to skip trying the standalone then adding Mylyn. I would use <a href="http://eclipse.org">Eclipse</a>, then add CFB as a plugin. Below are the steps, I ran through when i installed CFB on Windows.
1) Download
<ul>
<li><a href="http://labs.adobe.com/technologies/coldfusion10/#coldfusion_builder">ColdFusion Builder 2.0.1 beta</a></li>
<li><a href="http://www.eclipse.org/downloads/">Eclipse Indigo (3.7.1)</a> - Eclipse IDE for Java EE Developers- 64bit windows</li>
</ul>
<img src="http://mikehenke.com/assets/content/cfbb1.jpg" alt="" width="485" height="300" />
2) Unzip Eclipse<br /><br />3) Start cfb installer, "run as administrator"
<ul>
<li>next</li>
<li>accept, next</li>
<li>ColdFusion Builder plugins within Eclipse, next</li>
<li>next</li>
<li>this will be different, depending on your eclipse folder location, mine was C:\Users\Scott\Desktop\eclipse</li>
<li>finish up wizard</li>
</ul>
<br />noting the time to install cfb from starting installer to installation complete: 2 minutes 54 seconds<br /><br />4) Start Eclipse, C:\Users\Scott\Desktop\eclipse\eclipse.exe, open<br /><br />first time opening eclipse, so select a workspace. this is where eclipse data is stored like projects.<br /><br />- C:\Users\Scott\workspace<br /><br />check use this as the default, ok
<img src="http://mikehenke.com/assets/content/cfbb2.jpg" alt="" width="640" height="400" /><br /><br />arrange, views
<img src="http://mikehenke.com/assets/content/cfbb3.jpg" alt="" />
 
and create new project. C:\Users\Scott\workspace\testing<br /><img src="http://mikehenke.com/assets/content/cfbb4.jpg" alt="" />
5) lets grab some cfml files from github for testing CFB. using <a href="https://github.com/seancorfield/fw1">fw1</a> since it is the most watched ColdFusion project.<br />copy to project location (notice my project isn't linked to a cf server, this is just for testing cfb)
<img src="http://mikehenke.com/assets/content/cfbb5.jpg" alt="" width="640" height="400" />
Refresh project in eclipse, open Application.cfc
<img src="http://mikehenke.com/assets/content/cfbb6.jpg" alt="" /><br />adding mylyn views to ColdFusion perspective<br /><br />ctrl-3 - type "mylyn" in the quick access window
<img src="http://mikehenke.com/assets/content/cfbb7.jpg" alt="" /><br /><br />select the three views, had to individual, couldn't highlight all three at once.<br /><br />throws them somewhere, mine was lower right.
<img src="http://mikehenke.com/assets/content/cfbb8.jpg" alt="" /><br /><br />once you have the perspective, setup how you like it, i recommend saving it as myXXXX so you can reset it easily.<br /><br /><br />Missing ColdFusion Perspective?<br />control-3 then type in coldfusion
<img src="http://mikehenke.com/assets/content/cfbb9.jpg" alt="" />