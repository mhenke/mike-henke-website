---
title: 'Get results from sql Ant task into a property'
date: 2007-07-25
categories:
  - 'Ant'
---

My first attempt to create an ant using sql results within the ant script. I am using MSSQL as my db server. The example expects ant and sql are setup. Several good blogs covering how to [ant and sql setup](http://www.thecrumb.com/wiki/Ant). My next attempt will try to store the SQL result as XML, and extracting the values.

This section of code shows inserting a record and then getting the new id:

```xml
<sql driver="com.microsoft.jdbc.sqlserver.SQLServerDriver"
     url="jdbc:microsoft:sqlserver://${sql.ip}:1433"
     userid="${sql.username}"
     password="${sql.password}"
     print="TRUE">
    insert into TABLE (column_name)
    values ('value');
</sql>

<sql output="sql.customlook"
     driver="com.microsoft.jdbc.sqlserver.SQLServerDriver"
     url="jdbc:microsoft:sqlserver://${sql.ip}"
     userid="${sql.username}"
     password="${sql.password}"
     print="TRUE"
     showheaders="FALSE">
    SELECT IDENT_CURRENT('TABLE')
</sql>

<echo message="The new row has been inserted" />
```

This section of code shows getting the result and setting it for later use:

```xml
<loadfile property="sql.customlook_id" srcFile="sql.customlook">
    <filterchain>
        <headfilter lines="1" />
        <striplinebreaks/>
        <tokenfilter>
            <trim/>
        </tokenfilter>
    </filterchain>
</loadfile>

<echo message="The new customlook has an id of ${sql.customlook_id}" />
```

This section of code shows copying a file and pasting it with the new id as its name:

```xml
<copy file="${header}${filename}.cfm" tofile="${header}${sql.customlook_id}.cfm" />
<echo message="Created cfm page ${header}${sql.customlook_id}.cfm" />
```
