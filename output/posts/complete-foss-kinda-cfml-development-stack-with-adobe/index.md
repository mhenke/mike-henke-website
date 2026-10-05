---
title: Complete FOSS (kinda) CFML Development Stack with Adobe
date: '2011-02-22'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ACF
  - CFEclipse
  - ColdFusion
  - ColdFusion Builder
  - Eclipse
  - Git
  - OpenBD
  - Railo
---

<a href="http://jamiekrug.com/blog/">Jamie Krug</a> had a great opening presentation on "<a href="http://www.opencfsummit.org/index.cfm/schedule/sessions/complete-foss-cfml-development-stack/">Complete FOSS CFML Developer Stack</a>" for the <a href="http://www.opencfsummit.org/">OpenCF Summit</a>. <a href="http://en.wikipedia.org/wiki/Free_and_open_source_software">FOSS</a> stands for free and open-source software. Jamie used Ubuntu, MySQL/PostgreSQL, Apache, Tomcat, <a href="http://www.openbluedragon.org/">OpenBD</a>/<a href="http://www.getrailo.com/">Railo</a>, <a href="http://www.cfelcipse.org">CFEclipse</a>, and <a href="http://git-scm.com/">Git</a>. He mentioned you could use any OS like Windows or Mac for the stack. Technically, this would probably not be called FOSS then. So if we take swapping out pieces another step, we could switch out the cfml engine and/or the cfml editor with <a href="http://www.adobe.com/products/coldfusion/">Adobe ColdFusion (ACF) server</a> and <a href="http://www.adobe.com/products/coldfusion/cfbuilder/features/">ColdFusion Builder</a> (CFBuilder). The developer’s edition of ACF I’ll be using is free. I’ll also be using CFBuilder for editing any code in this blog post.
I’ll walk through how to create a war using ACF9 and drop it in Tomcat like Jamie demonstrated with Railo and OpenBD. If you don’t have Tomcat and Apache installed, <a href="http://www.mattwoodward.com/blog/index.cfm?event=showEntry&amp;entryId=03233F6F-ED2C-43C7-AFF5FA2B3C3D845B">Matt Woodward has an awesome blog post on it</a>.
The process for ACF is three step: 1) create a war file via the installer. 2) drop the war in Tomcat 3) Finish the installation process via the browser.
<h2>Creating the war</h2>
1) Start the ACF9 installer. I’ll show the installer steps where I changed the defaults.
<img src="/images/foss/foss1.jpg" alt="" />
<img src="/images/foss/foss2.jpg" alt="" />
<img src="/images/foss/foss3.jpg" alt="" />
<img src="/images/foss/foss4.jpg" alt="" />
And when I finish, the installer will create a war file in C:\ColdFusion9 . 
<h2>Renaming and moving the war to Tomcat</h2>
I copied and renamed the cfusion.war located at C:\ColdFusion9 to cf9.war. Next I copy the cf9.war into my Tomcat webapps folder.
<h2>Finishing installation</h2>
I started my Apache and Tomcat instance and ran http://localhost:8080/cf9/CFIDE/administrator/
<img src="/images/foss/foss5.jpg" alt="" />
<img src="/images/foss/foss6.jpg" alt="" />
<h2>Testing installation</h2>
Now, to test I’ll use CFBuilder to create an index.cfm page. I created a project at C:\Program Files\Apache Software Foundation\Tomcat 6.0\webapps\cf9 and then an index.cfm with:
Hello World. The time is &lt;cfoutput&gt;#now()#&lt;/cfoutput&gt;.
<img src="/images/foss/foss7.jpg" alt="" />
And test the page at http://localhost:8080/cf9/index.cfm
<h2>Conclusion</h2>
Now you have an un-FOSS stack with ACF similar to what Jamie presented at OpenCF Summit. If you work through Matt’s post, you can actually make the url more friendly. Jamie did mention to me <span style="text-decoration: line-through;">ACF9’s war is missing some jar for ORM</span> Tomcat is missing some jars and <a href="http://www.silverwareconsulting.com/index.cfm/2009/8/28/Using-CF9s-ORM-Features-Under-Tomcat">Bob Silverberg has a post about resolving it</a>.