---
title: "My ColdFusion Debugger Setup Cheatsheat"
date: 2008-04-22
categories: 
  - "CFEclipse"
  - "ColdFusion"
  - "Eclipse"
  - "FusionDebug"
---

I will show how to setup [FusionDebug on Windows for Multiple ColdFusion instances](#FDWindows). And [ColdFusion 8 Debugger on Ubuntu](#CF8D). A hint for both is turn off "timeout request after (seconds)" in the CF Administrator so your debugging info doesn't timeout. Within Eclipse, I use the Breakpoints, Debug, Variables, and Expressions views.

![](images/EclipseDebug.jpg)

FusionDebug Windows  
  
In the Coldfusion Administrator go to the _"Enterprise Manager"_ and then _"Instance Manager"_. Click "add new instance", this example we will name it **FD1**.  
  
Check "Create Windows Service" option and **create the new instance**.  
_\*\* note : Coldfusion will automatically create the first instance on port 8301 and increment by one when creating a new instance._  
  
_**Stop** the newly created instance_ through services, _default name for this example_ would be **"Macromedia CFMX AS FD1"**.  
  
Use the FusionDebug Server Configuration Wizard to create the _new config file_. This will modify the **jvm.config** file, but for multiple instances you will need multiple jvm.config files.  
  
Users of an older version of FusionDebug will have to copy and modify the jvm.config file as described in FusionDebug Guide.  
  
The jvm.config is in JRun4in. Change address=8000 to 8001 and _save as_ new config file, with new name, example **jvm.config\_FD1**  
  
_\*\* note : each new CF instance will have to listen on a separate port. I like to keep my port number consistant like CF port 8301 will match up to debugging port 8001._  
  
Next we will _remove the cf service_ we created during installation, and have it _point to the new_ _config_ file we created.  
  
Open the **command prompt** and navigate to the bin of JRun4 then use these command:  
  
_cd C:JRun4in  
  
jrunsvc -remove "Macromedia CFMX AS wfs1"  
  
jrunsvc -install wfs1 "Macromedia CFMX AS wfs1" "Macromedia CFMX AS wfs1" -config jvm.config\_wfs1_  
  
Now **start the CF instance** and configure the FusionDebug connection through Eclipse. Repeat this process for each instance.

Snapshots of FusionDebug setup within Eclipse. **Run --> Open Debug Dialog --> FusionDebug**

![](images/FDC.jpg)

![](images/FDS.jpg)

ColdFusion 8 Debugger on Ubuntu  
  
Within ColdFusion 8 Administrator, you must **turn on RDS** and then **specify the debugger port** in the JVM settings of your application server. This example will be using port 80 for the webservice and port 8000 for debugging.

Setting the Debugging information is located at _Debugging & Logging --> Debugger Settings_. Make sure the **"Allow line debugging"** is checked also.

![](images/cf8admi.jpg)  
  
Besides this you will need to modify the jvm.config file. Mine was located **/opt/jrun4/bin**. I added  
to the "Arguments to VM" section: _\-Xdebug -Xrunjdwp:transport=dt\_socket,server=y,suspend=n,address=8000_, and restart the server.

**Be extra carefull with spaces and returns.**  
  
Full Example of section:  
_\# Arguments to VM  
java.args=-server -Xmx512m -Dsun.io.useCanonCaches=false -XX:MaxPermSize=192m -Djava.awt.headless=true -Dcoldfusion.rootDir={application.home}/ -Djava.compiler=NONE -Xnoagent -Xdebug -Xrunjdwp:transport=dt\_socket,server=y,suspend=n,address=8000_  
  
Now restart ColdFusion and you should be good ready to configure Eclipse.  
  
You will need to configure two seperate settings for CF8 Debugger.  
  
First is the _Windows --> Preferences --> ColdFusion --> RDS Configuration_

![](images/cf8EclipsePrefj.jpg)

  
Second is _Run --> Open Debug Dialog_. Add a new ColdFusion Application.

![](images/cf8EclipseDebug.jpg)
