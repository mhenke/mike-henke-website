---
title: Gmail, CF8, and MachBlog...
date: '2007-08-23'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ColdFusion
---

I made a quick hack to Machblog to support Google SMTP servers.Â  I will go back and add the property to the xml file later.Â  The hack was very easy since I am running Coldfusion 8.Â  I added the attribute useTLS = "yes" to any cfmail tags I found in the code.Â 
Here are some links about this topic:
<a href="http://groups.google.com/group/mach-ii-for-coldfusion/browse_frm/thread/608cdead2943930d" target="_blank">Peter about adding TLS securty support for Machblog</a><br />
<a href="http://tacfug.org/blog/index.cfm/2007/5/30/ColdFusion-8-likes-Google-Apps" target="_blank">Setting up TLS mail server through Coldfusion Admin</a><br />
<a href="http://livedocs.adobe.com/coldfusion/8/htmldocs/help.html?content=Tags_m-o_01.html#2355015" target="_blank">CFMAIL tag for CF8 on livedocs.adobe.com</a>