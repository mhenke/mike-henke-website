---
title: "NoClassDefFoundError: Could not initialize class coldfusion"
date: 2009-11-03
categories:
  - "ColdFusion"
---

I started getting this error on a ColdFusion JRun instance. It was happenning only with one application. (Note: We have applications seperated by folder)

### java.lang.NoClassDefFoundError: Could not initialize class coldfusion.xml.rpc.CFCServlet

How do you fix this? I restarted the jrun instance, the iis web site, and bounced the server.

I tracked it down to my jvm.config for this particular jrun instance. I had altered it for line debugging. I replaced with the original and the "application" folder loaded fine.
