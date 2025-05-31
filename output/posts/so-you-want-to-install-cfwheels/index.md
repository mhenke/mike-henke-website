---
title: "So you want to install CFWheels?"
date: 2009-07-21
categories: 
  - "cfwheels"
---

I am doing a series for the [CFWheels](http://cfwheels.org) framework similar to [Dan Wilson](http://www.nodans.com)'s "So you want to" series for [Model Glue](http://www.model-glue.com/ ):Unity. Here is his . I will try to match each post but using CFWheels. My first post will cover installing CFWheels.  
  
CFWheels is a framework based on [Ruby on Rails](http://www.rubyonrails.org). I love the idea of [Convention over Configuration](http://en.wikipedia.org/wiki/Convention_over_configuration) when it comes to ColdFusion coding.

### Installation

  
You can find the latest builds [here](http://cfwheels.googlecode.com/svn/trunk/) in svn. The download page is [here](http://cfwheels.org/download). I will be using 0.9.3 and these instructions assume you will have the framework in webroot.  
  
Unzip the contents of cfwheels.0.9.3.zip into your webroot. You should see alot of folders and files. All the folders and files have a purpose, which might seem obvious for some like images or javascripts folders. Others might not make to much sense now like plugins or views, but don't worry. All the files and folders are there for a reason which we will cover in upcoming posts.  
  
To verify the directories were created properly, run http://localhost/ If everything has been installed correctly, you will see: **Congratulations!** **You have successfully installed version 0.9.3 of Wheels.**  
Welcome to the wonderful world of Wheels, I hope you will enjoy it! CFWheels is running now, next post will be how to get the cool rewrite.Â  You must be using Apache or IIS for this to work. Sorry people using the built in web server with ColdFusion, you are stuck using http://localhost/index.cfm/cfc\_name/method\_name instead of the cool http://localhost/cfc\_name/method\_name
