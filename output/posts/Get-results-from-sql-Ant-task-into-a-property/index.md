---
title: "Get results from sql Ant task into a property"
date: 2007-07-26
categories: 
  - "Ant"
---

My first attempt to create an ant using sql results within the ant script.Â  I am using MSSQL has my db server.Â  The example expects ant and sql are setup.Â  Several good blogs covering how to [ant and sql setup](http://www.thecrumb.com/wiki/Ant).Â  My next attempt will try to store the SQL result as XML, and extracting the values.

Â 

This section of code shows inserting a record and then getting the new id. <sql driver="com.microsoft.jdbc.sqlserver.SQLServerDriver" url="jdbc:microsoft:sqlserver://${sql.ip}:1433" userid="${sql.username}" password="${sql.password}" print="TRUE">  
Â Â Â  Â Â Â  insert into TABLE (column\_name)  
Â Â Â  Â Â Â  values ('value');  
</sql>  
<sql output="sql.customlook" driver="com.microsoft.jdbc.sqlserver.SQLServerDriver" url="jdbc:microsoft:sqlserver://${sql.ip}" userid="${sql.username}" password="${sql.password}"Â  print="TRUE" showheaders="FALSE">Â Â Â   
Â Â Â  Â Â Â  SELECT IDENT\_CURRENT('TABLE')  
</sql>  
<echo message="The new row has been inserted" />  
  
  
This section of code shows getting the result and setting it for later use.  
<loadfile property="sql.customlook\_id" srcFile="sql.customlook" >  
Â <filterchain>  
Â  <headfilter lines="1" />  
Â  <striplinebreaks/>  
Â  <tokenfilter>  
Â Â  <trim/>  
Â  </tokenfilter>  
Â </filterchain>  
</loadfile>  
<echo message="The new customlook has an id of ${sql.customlook\_id}" />  
  
  
This section of code shows copying a file and pasting it with the new id as its name.  
<copy file="${header}${filename}.cfm" tofile="${header}${sql.customlook\_id}.cfm" />  
<echo message="Created cfm page ${header}${sql.customlook\_id}.cfm" />
