---
title: "RDS, ColdFusion 8 Debugger, and Eclipse"
date: 2007-12-01
categories:
  - "CFEclipse"
  - "ColdFusion"
  - "Eclipse"
---

I tried using the ColdFusion 8 Debugger through Eclipse but kept getting an error message saying "Unable to contact the RDS Server 'localhost.'" Not to helpful :-) I am a big fan of Fusion Debug. My problem was two fold. 1. My web.xml file had RDS commented out in a couple spots. The file for me was located @ /opt/coldfusion8/wwwroot/WEB-INF. I uncommented the portions out. 2. RDS default in Eclipse was using port 8500. My port was actually 80. This setting was found within Eclipse, Window--> Preferences --> ColdFusion --> RDS Configuration.
