---
title: Developers Guide to Turnkey Tomcat Apache with ColdFusion Engines
date: '2011-06-23'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ACF
  - ColdFusion
  - OpenBD
  - Railo
---

This post is a combination of several posts and shows how to setup <a href="http://www.turnkeylinux.org/">Turnkey</a> Tomcat Apache's virtual box with different <a href="http://en.wikipedia.org/wiki/ColdFusion">ColdFusion</a> engines. 
"Turnkey Linux is a virtual appliance library that integrates and 
polishes the very best open source software into ready to use solutions.
 Each virtual appliance is optimized for ease of use and can be deployed in just a few minutes on bare metal, a virtual machine and in the cloud."  <a href="http://www.turnkeylinux.org/about">More</a>
Here are the posts I referenced when writing this one.
<ul>
<li><a href="http://www.packtpub.com/article/develop-php-web-applications-netbeans-virtualbox-turnkey-lamp-appliance">http://www.packtpub.com/article/develop-php-web-applications-netbeans-virtualbox-turnkey-lamp-appliance</a></li>
<li><a href="http://www.atentia.net/2011/02/turnkey-linux-getting-my-app-running-on-tomcat-easy-wa/">http://www.atentia.net/2011/02/turnkey-linux-getting-my-app-running-on-tomcat-easy-wa/</a></li>
<li><a href="http://www.turnkeylinux.org/docs/installation-appliances-virtualbox">http://www.turnkeylinux.org/docs/installation-appliances-virtualbox</a></li>
</ul>
<h2>Download / Install VirtualBox and Turnkey VM</h2>
Go to the VirtualBox Web site and download the most recent version: <a href=" http://download.virtualbox.org/">http://download.virtualbox.org/</a>
After downloading VirtualBox, install it:
<ul>
<li>Go to the Turnkey Linux Web site and download the Tomcat-Apache appliance: <a href="http://www.turnkeylinux.org/tomcat-apache">http://www.turnkeylinux.org/tomcat-apache</a></li>
<li>Unzip Turnkey and you should see three files: txt, vmdk, and vmx</li>
</ul>
<h2>Create a virtual machine</h2>
<ul>
<li>Open VirtualBox and click on the New button to create a virtual machine (VM)</li>
<li>In VirtualBox, launch the VM creation wizard by clicking the New button</li>
<li>OS Type: Select Linux / Ubuntu as your operating system</li>
<li>Virtual Hard Disk: Select "use an existing hard disk", navigate to the directory where you extraced the ZIP, and select the VMDK hard disk image</li>
</ul>
<div><img src="/images/ttace/ttacf01.png" alt="" width="651" height="452" /><br /></div>
<h2>BASIC VM CONFIGURATION</h2>
After you've created the new VM, you'll need to tweak its configuration before starting it:
<ul>
<li>Settings &gt; System &gt; Processor &gt; Enable PAE/NX</li>
<li>PAE: This is required as the linux-virtual kernel in the VM optimized images uses PAE to allow addressing of more than 4GB of memory.</li>
<li>NX: refers to the CPU feature required by VirtualBox to support PAE. All new CPUs support NX but some older ones may not.</li>
</ul>
<div><img src="/images/ttace/ttacf02.png" alt="" /><br /></div>
<ul>
<li>Settings &gt; Network &gt; Adapter 1 &gt; Attach to: bridged</li>
<li>Bridging your VM connects it to the local network your host machine is on.</li>
</ul>
<div><img src="/images/ttace/ttacf03.png" alt="" /><br /></div>
Now start your virtual appliance for the first time.
Once started, fill out the passwords for root, tomcat, and mysql. Yeah, turnkey even has a db setup for you. On security updates, I said install. This may take awhile. Once fully updated and ready, you should see this.
<img src="/images/ttace/ttacf04.png" alt="" />
<span style="font-size: 15px; font-weight: bold; ">Deploy Wars</span>
Download the ColdFusion server instances, we'll use <a href="http://www.adobe.com/products/coldfusion/">Adobe</a>, <a href="http://www.getrailo.com/">Railo</a>, and <a href="http://www.openbluedragon.org/">OpenBD</a>. Adobe unlike the others makes you create your war via the installer. Once you have the 3 wars, upload them using the Tomcat Manager. I renamed the wars, cf9, railo, and openbd.
Go you Web address, mine is https://192.168.1.5 then select the Tomcat Web Apps link and sign in. Click through the security warning.
<img src="/images/ttace/ttacf05.png" alt="" />
Go to the WAR file to deploy section, Choose File and Deploy. Repeat for each war. When completed you should see the  3 ColdFusion engines running and the path the name of the war like this picture with cf9 in the path column.
<img src="/images/ttace/ttacf06.png" alt="" />
<h2>Configure Apache</h2>
https://192.168.1.6:12320/ or from the command prompt ssh to our vm. I am going to show this with ssh so I can copy/paste.
<img src="/images/ttace/ttacf07.png" alt="" />
Run this command: <strong><em>nano /etc/tomcat6/mod_jk.conf</em></strong>
Paste/Type in this at the end of the file:
<strong><em>JkMount /cf9 ajp13_worker</em></strong>
<strong><em>JkMount /cf9/* ajp13_worker</em></strong>
<strong><em>JkMount /railo ajp13_worker</em></strong>
<strong><em>JkMount /railo/* ajp13_worker</em></strong>
<strong><em>JkMount /openbd ajp13_worker</em></strong>
<strong><em>JkMount /openbd/* ajp13_worker</em></strong>
Exit the file but first save it using: ctrl-o to save and ctrl-x to exit
Then reset Apache by running this command: <strong><em>/etc/init.d/apache2 restart</em></strong>
<h2>Testing our ColdFusion Engines</h2>
Now try your CF engines like http://192.168.1.5/railo or https://192.168.1.5/openbd . For ACF9, you'll have to go to http://192.168.1.5/cf9/CFIDE/administrator/ and finish the ACF installation process.
<img src="/images/ttace/ttacf8.png" alt="" />
<img src="/images/ttace/ttacf09.png" alt="" />
<img src="/images/ttace/ttacf10.png" alt="" />
Next post, I'll show how to hookup Eclipse to our new virtual CF servers and start developing code.