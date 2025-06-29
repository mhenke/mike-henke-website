---
title: "So you want to create a CFWheels application? ( Part 1 )"
date: 2009-07-22
categories: 
 - "cfwheels"
 - "ColdFusion"
---

This series is heavily borrowed from [Dan Wilson](http://www.nodans.com/ "Dan Wilson")'s "So You Want to" series about [Model Glue](http://www.model-glue.com/ "Model Glue"):Unity.  This entry matches to [this post](http://www.nodans.com/index.cfm/2007/1/19/So-you-want-to-create-a-ModelGlueUnity-application--Part-1- "this post"). 
 
We will create an application to manage contacts starting from scratch. If you haven't installed [CFWheels](http://www.CFWheels.org), check [this post](/so-you-want-to-install-cfwheels "this post"). 
 
Our application will reside in the web root, accessed by the URL http://localhost . Lets look @ the files installed with CFWheels, talk about Request Handling ,and URL Rewriting.

### Directory Structure

We will cover the ones, I consider important :-) These folders are directly under the webroot. Here is a detailed list of [CFWheels files and folders](http://cfwheels.org/docs/chapter/directory-structure "CFWheels files and folders"). 
 
wheels - most important and you probably should never touch it. It is the framework heart. If upgrading, you would drop the new version of this folder into your webroot, overwriting the old version. 
 
controllers - brains of our application. It decides what models need to be called for data and which view to display. These will be cfc files. 
 
models - handle how data is read and written to our database. CFWheels creates objects to represent things in our database. These will be cfc files. 
 
views - our web pages presented to the user. These will be cfm files. 
 
config - here is our configuration. You can override some conventions here. Override Conventions? Yeah, CFWheels tries to decrease our decisions so we can focus on the important stuff but is still flexible if your heart desires. We will eventually set some things like routes, what environment we are in (development, production, etc), and maybe a database connection. 
 
images - images will go here and only here. No decisions, you can focus on your critical decisions. 
 
javascripts - javascript files will go here. Same thing, no thought, simple huh? 
 
stylesheets - cascading style sheets are put here. Enjoy, embrace [convention over configuration](http://en.wikipedia.org/wiki/Convention_over_configuration "convention over configuration").

### Request Handling

CFWheels maps requests to your code. Think [REST](http://en.wikipedia.org/wiki/Representational_State_Transfer "REST")\-like. CFWheels will most likely use a "partial URL Rewrite" to access your application. For our contact application, the URL may look something like this \[code language="coldfusion"\]
http://localhost/index.cfm/contact/list
\\[/code\]. This will list our contacts. If your web server doesn't support cgi.path\_info, you may get something like this \[code language="coldfusion"\]
http://localhost/index.cfm?controller=contact&action=list
\\[/code\]

### URL Rewriting

That partial URL Rewrite is nice but how about \[code language="coldfusion"\]
http://localhost/contact/list
\\[/code\]? This is possible if you are using Apache or IIS, sorry built in web services with JRUN or Tomcat. You can still get the goodness of convention over configuration so don't worry. 
 
To see how to setup URL Rewriting, read [this](http://cfwheels.org/docs/chapter/url-rewriting). 
 
For adding an ISAPI Filter in IIS 7, check out [this](http://technet.microsoft.com/en-us/library/cc754174%28WS.10%29.aspx "this"). Be sure to switch on ISAPI filtering through the windows settings and customization. 
 
To help CFWheels, you could document your steps and post them to the [CFWheels Google Group](http://groups.google.com/group/cfwheels "CFWheels Google group") so the guys could provide more detailed instructions. You will be helping others. Please post your os, web server, and version in the title. Be sure to check since someone may have already posted the step for your setup. 
 
In the next entry, we will add some functionality to our Contact application.
