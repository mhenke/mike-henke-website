---
title: "SQL Server 2005 Express error connection issue solved"
date: 2007-07-08
---

I had trouble connecting locally to SQL Server Express 2005.Â  I found a great post from Charlie Arehart's blog called [Solving error connecting to SQL Server 2005 from CFMX 6.1/7 on Localhost](http://carehart.org/blog/client/index.cfm/2006/7/8/sql2k5_Error_establishing_socket) but still got "Connection refused" or "Error establishing socket".Â  Here is specific solution for SQL Server Express 2005 after I follow everyone's helpful information: making sure Dynamic Ports was blank and port was 1433 for IPAll and IP1.Â  I switched most IP2 through IP7 "enabled" settings to NO.Â  These steps can be accomplished using SQL Server Configuration Manger, TCP/IP properties.
