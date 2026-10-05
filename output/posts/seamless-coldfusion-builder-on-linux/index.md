---
title: Seamless ColdFusion Builder on Linux
date: '2011-06-28'
author: Mike Henke
layout: layouts/post.njk
categories:
  - CFEclipse
  - ColdFusion
  - ColdFusion Builder
  - Linux
  - Xubuntu
---

I recently switched to <a href="http://www.xubuntu.org/">Xubuntu</a> as mentioned in a couple recent posts. This weekend I was playing around with <a href="/blog/developers-guide-to-turnkey-tomcat-apache-with-coldfusion-engines/">Turnkey Tomcat-Apache-ColdFusion</a> and used <a href="http://www.eclipse.org/">Eclipse</a> to connect to the virtual machine. I found <a href="http://cfeclipse.org/">CFEclipse</a> wouldn't save the cfml file using a <a href="http://www.eclipse.org/tm/">RSE</a> connection unless I switched the file editor but I would lose syntax and highlighting. <a href="http://www.adobe.com/products/coldfusion-builder/features.html">ColdFusion Builder</a> and seamless <a href="http://www.virtualbox.org/">Virtualbox</a> to the rescue. Take a look at my Xubuntu screen with CFBuilder behind Thunar (File Manager).
<img src="http://mikehenke.com/assets/content/cfl.jpg" alt="" width="640" height="400" />
The key is to setup a VirtualBox machine with Windows and then install <a href="http://www.virtualbox.org/manual/ch04.html">Guest Additions</a> on the vm. Next install and start ColdFusion Builder in the vm and then go into seamless mode. You can select <strong>right Ctrl-L</strong> or from the vm menu select <strong>Machine - Switch to Seamless Mode</strong> to start/end seamless mode. I did try CFBuilder with <a href="http://www.winehq.org/">Wine</a> on Linux but didn't have much success.