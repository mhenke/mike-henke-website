---
title: "Using results from sql Ant task PART 2"
date: 2007-10-11
categories: 
  - "Ant"
---

This expands on my [first entry of using sql results from ant](http://mikehenke.com/machblog/index.cfm?event=showEntry&entryId=055A6924-188B-4E84-1534BBFD052A04CA) to do other ant process with sql results. This Ant script will store SQL results as an XML file and extracting the values using two different techniques, [xmlproperty](http://ant.apache.org/manual/CoreTasks/xmlproperty.html) and [xmltask](http://www.oopsconsultancy.com/software/xmltask/). I use a _for_ loop which comes from [Ant-Contrib](http://sourceforge.net/projects/ant-contrib/). Ant-Contrib is a complilation of [several tasks and types](http://ant-contrib.sourceforge.net/ant-contrib/manual/tasks/index.html). _This code assumes you have ant setup with sql and using MSSQL with Northwind. It will work with other databases as long as you can produce well-formed xml. For convience I included the jars for ant-contrib and xmltask.  
_My solution for getting well-formed xml was built into Microsoft SQL Server using 'FOR XML RAW' then adding a root tag around the result. I wanted XML initially to import it by xmlproperty but found xmlproperty a little limiting. I came across xmltask which has alot of features. The meat of the post is in the code and echo statements so take a look. There is alot going on so I may break this code into simplier blocks for more emphasis on certain actions and expand on them individually. **To run:** simply unzip then run the build.xml. It will ask for your username, password, and database ip for Microsoft Server. And ask for which scenerio to run (A or B). A: uses xmltask and B: uses xmlproperty. NOTE: The zip contains build.xml, ant-contrib-1.0b3.jar, xmltask-v1.15.1.jar, root\_end.txt, and root.txt. **_This ant runs a query, saves the results as a file,  
manipulates the file to be loaded as xml,  
And loops through the results doing other individual queries_**
