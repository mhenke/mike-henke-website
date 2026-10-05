---
title: Adding Eclipse Helios Update site
date: '2011-03-06'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ColdFusion
  - ColdFusion Builder
  - Eclipse
---

I downloaded an Adobe software package based on <a href="http://www.eclipse.org/">Eclipse</a> for building web applications and installed it as standalone. The software package didn't contain a couple Eclipse tools I use for collaboration. This post will show how to add the latest Eclipse (Helios) update site and install Eclipse tools.
These steps should work for any software packages based on Eclipse missing the Eclipse update site. I will be using <a href="http://labs.adobe.com/technologies/coldfusionbuilder2/">Adobe ColdFusion Builder 2</a> beta and installing <a href="http://www.eclipse.org/mylyn/">Mylyn</a> and <a href="http://www.eclipse.org/egit/">eGit</a>.
<h2>Adding Eclipse Update site</h2>
On the Eclipse menu, select <strong><em>Help</em></strong> --&gt; <em style="font-weight: bold; ">Install New Software</em> and an Install window should appear. In the "Work with:" field, paste in <strong><em>http://download.eclipse.org/releases/helios/</em></strong> and click <strong><em>Add</em></strong>.
<img src="http://mikehenke.com/images/hus/hus01.jpg" alt="" />
An "Add Repository" window should appear with the Helios URL in the Location field. You can type Helios in the Name field and click <em><strong>OK</strong></em>. Eclipse will eventually display all the software available at the Helios update site.
Tick off the tools you want and click <strong><em>Next</em></strong>. I am installing Mylyn and eGit. 
<img src="http://mikehenke.com/images/hus/hus02.jpg" alt="" />
Eclipse will chug along "Calculating requirements and dependencies" then if everything is ok, display an "Install Details" window. Click <strong><em>Next</em></strong>, accept licenses on Review Licenses windows, and click <strong><em>Finish</em></strong>. Eclipse will install the items and when complete, ask for you to "<strong><em>Restart Now</em></strong>",  "<em>Not Now</em>", or "<em><strong>Apply Changes Now</strong></em>". I usually select "Restart Now". Eclipse documentation does suggest after installing new software to run the clean argument. For this example, I would open the command prompt and run "<strong style="font-style: italic;">C:\Program Files (x86)\Adobe\Adobe ColdFusion Builder 2 Beta\CFBuilder.exe" -clean</strong> to start Eclipse.