---
title: Setting up MXUnit Eclipse plugin with CFWheels
date: '2011-09-26'
author: Mike Henke
layout: layouts/post.njk
categories:
  - CFWheels
  - ColdFusion
  - MXUnit
---

I setup up <a href="http://mxunit.org/">MXUnit</a> Eclipse plugin with <a href="http://cfwheels.org/">CFWheels</a> this afternoon. The <a href="http://cfinnovate.com:9082/display/default/MXUnit+Documentation">MXUnit documentation</a> is very good. I downloaded MXUnit and dropped the mxunit folder in my Wheels root which happens to be the web root also. Then I <a href="http://cfinnovate.com:9082/display/default/Install+the+Eclipse+Plugin">installed the MXUnit Eclipse plugin</a>. Once installed, I <a href="http://cfinnovate.com:9082/display/default/Running+your+Tests+under+the+Application+Scope+--+Custom+RemoteFacades">created custom Remote Facade</a> in my wheels application web root.
<img src="/assets/content/cfw-mx1.jpg" alt="" width="640" height="400" />
Next I point the Eclipse project containing the Wheels application to the new remote facade URL as mentioned in the directions above: Right click on the project name in the Navigator or Project Explorer, Select "Properties"Select - "MXUnit Properties" then add the path to your custom remote URL. And I tested using the "Test Facade URL" button.
<img src="/assets/content/cfw-mx2.jpg" alt="" width="640" height="400" />
Next I walked through the <a href="http://cfinnovate.com:9082/display/default/Configure+and+Test+the+Plugin">Configure and Test the Plugin</a> section from MXUnit's documentation and here are my results.
<img src="/assets/content/cfw-mx3.jpg" alt="" width="640" height="400" />