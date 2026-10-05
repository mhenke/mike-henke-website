---
title: So you want to create a CFWheels application? (Part 5)
date: '2009-08-11'
author: Mike Henke
layout: layouts/post.njk
categories:
  - CFWheels
  - ColdFusion
---

This <a href="http://cfwheels.org/">CFWheels </a>series is heavy borrowed from <a href="http://www.nodans.com/">Dan Wilson</a>'s "So You Want to" series about <a href="http://www.model-glue.com/">Model Glue</a>:Unity and matches to this <a title="post" href="http://www.nodans.com/index.cfm/2007/1/26/So-you-want-to-create-a-ModelGlueUnity-application--Part-5-.">post</a>Previously in this series, we <a href="/blog/so-you-want-to-install-cfwheels/">installed CFWheels</a>, <a title="discussed some concepts" href="/blog/so-you-want-to-create-a-cfwheels-application-part-1/">discussed some concepts</a> in CFWheels, <a href="/blog/so-you-want-to-create-a-cfwheels-application-part-2/">added our basic flow</a> and navigation, created <a title="add and list our contacts" href="/blog/so-you-want-to-create-a-cfwheels-application-part-3/">add and list functionality</a>, and <a title="validation" href="/blog/so-you-want-to-create-a-cfwheels-application-part-4/">validation</a> to our Contact-O-Matic Application. Next in the series, we will cover the built in ORM of CFWheels.An <a title="orm" href="http://en.wikipedia.org/wiki/Object-relational_mapping">Object Relation Mapper</a> (ORM) is used to translate between our <a title="Relational Database" href="http://en.wikipedia.org/wiki/Relational_Database">Relational Database</a> and our <a title="Object Oriented programming" href="http://en.wikipedia.org/wiki/Object_oriented_programming">Object Oriented programming</a>. One nice thing, it is simplifies common <a title="sql" href="http://en.wikipedia.org/wiki/SQL">sql</a> statements thus saving us time and reducing sql errors. More complex SQL will still need to be coded. Don't think you won't have to learn SQL, the ORM can't do everything better but it will make the mundane tasks simplier.<h3>CFWheel ORM</h3>I glossed over some important convention before in our series. CFWheels expects the table name to be plural like contacts, a primary keys in the tables, and the primary key column to be name id. Our Contacts table meets all these. We can override the table name and primary key column name but CFWheels does need a primary key.<h3>Database Code</h3>Lets drop our old table and create it along with a types table using this code.
```coldfusion
DROP TABLE IF EXISTS contactomatic.contacts;CREATE TABLE 'contactomatic'.'contacts' ( 'id' INTEGER UNSIGNED NOT NULL AUTO_INCREMENT, 'name' VARCHAR(<span class="cc_numeric">45) NOT NULL, 'typeid' INTEGER UNSIGNED NOT NULL, PRIMARY KEY ('id') ) ENGINE = InnoDB;
```

```coldfusion
DROP TABLE IF EXISTS contactomatic.tbl_typesofcontact; CREATE TABLE 'contactomatic'.'tbl_typesofcontact' ( 'typeid' INTEGER UNSIGNED NOT NULL AUTO_INCREMENT, 'title_for_type_of_contact' VARCHAR(<span class="cc_numeric">45) NOT NULL, PRIMARY KEY ('typeid') ) ENGINE = InnoDB;
```

```coldfusion
INSERT INTO contactomatic.tbl_typesofcontact (title_for_type_of_contact) VALUES('Friend');
```

```coldfusion
INSERT INTO contactomatic.tbl_typesofcontact (title_for_type_of_contact) VALUES('Enemy');
```

```coldfusion
INSERT INTO contactomatic.tbl_typesofcontact (title_for_type_of_contact) VALUES('Co-Worker');
```
<h3>Types Model</h3>In our /controller/contact.cfc add this code to the 
```coldfusion
new
```
 action.
```coldfusion
<cfset types = model("type").findAll() />
```
While we are in this file, replace the code in the list action with this:
```coldfusion
<cfset allContacts = model("contact").findAll(include="type") /><cfdump var="#allContacts#"><cfabort>
```
And now lets check our add form.
```coldfusion
URL Rewriting On = http://localhost/contact/new?reload=true
```

```coldfusion
URL Rewriting Partial = http://localhost/index.cfm/contact/new?reload=true
```

```coldfusion
URL Rewriting Off = http://localhost/index.cfm?controller=contact&action=new
```
<img src="http://mikehenke.com/assets/content/cfwheels5_1.jpg" alt="" height="400" width="640"><h3>Table Naming</h3>Well, you can see CFWheels assumes we have a types table since our newly created model cfc's name is type. Our table's name is actually tbl_typesofcontact,we could rename the cfc to tbl_typesofcontact.cfc, but CFWheels convention also says our table name should be plural. Lets tell (configure)CFWheels we already have a table name that doesn't fit in CFWheel's conventions.Add this code to our type.cfc in the models folder.
```coldfusion
<cffunction name="init"><cfset table("tbl_typesofcontact") /><cfset property(name="title", column="title_for_type_of_contact") /></cffunction>
```
Ã¿As you can see, we tell CFWheels our table's actual name. Also we give the long column name, title_for_type_of_contact, a shorter name, title. See how easy it is to override CFWheel's table conventions. It would have been easier if initially our table was named contacttypes and the model cfc contacttype.cfc but sometimes this won't be an option.Reload our page and you should now see our old form but look @ our debug information<img src="http://mikehenke.com/assets/content/cfwheels5_2.jpg" alt="" height="400" width="640">Notice we have a new query. This was created by the code, 
```coldfusion
<cfset types = model("type").findAll() />
```
,we added to our 
```coldfusion
new
```
 action in /controllers/contact.cfc.<h3>Select Helper</h3>Lets add our select box populated from this query to our form using a CFWheels helper.Replace in /view/new.cfm
```coldfusion
<span class="cc_normaltag"><div>#textField(objectName="newContact", property="type", label="Type")#<span class="cc_normaltag"></div>
```
With
```coldfusion
<span class="cc_normaltag"><div>#select(objectName="newContact", property="typeid", options=types, label="Type", includeBlank="")#<span class="cc_normaltag"></div>
```
The select helper takes our blank new object, the typeid column (property), the types object, and we add a label of Type. For more information on Helper Forms, look through the code in \wheels\view\forms.cfm.Load the page again, and now you should see the select dop down box. Lets submit the form.<img src="http://mikehenke.com/assets/content/cfwheels5_4.jpg" alt="" height="400" width="640">Weird, we selected a valid contact type from our new select drop down box, but our validation is catching it.This is because the value the form is submitting is actually the typeid not the title.Well, lets change our validation and add an association to mark typeid as a foreign key.In our model/contact.cfc change the code to match this.
```coldfusion
<cfcomponent extends="Model" output="false"><cffunction name="init"><cfset validatesPresenceOf(property="name",message="Name is Required") /><cfset validatesPresenceOf(property="typeid",message="Type of Contact is Required") /><cfset validatesUniquenessOf(property="name", message="Name is already present") /><cfset belongsTo(name="type", foreignKey="typeid")></cffunction></cfcomponent>
```
We basically made sure the typeid is present instead of type and declared a datebase relationship (association).Following CFWheels convention, we could use 
```coldfusion
<cfset belongTo("type")>
```
 if we followed our CFWheels naming convention for the primary keyof a table but instead of id, we have typeid so we need to tell CFWheels.Lets try to submit the form again.<img src="http://mikehenke.com/assets/content/cfwheels5_5.jpg" alt="" height="400" width="640">We are making progress, looks like the form submitted and executed our cfdump and cfabort in /controllers/contact.cfc<h3>Association</h3>Here is where our association we set in /models/contact.cfc comes to play. CFWheels ORM joins the tbl_typesofcontact table with the contacts table.This happens because we added the association declaring the foriegn key in our /models/contacts.cfc and in creating the query, we told it to include type. 
```coldfusion
<cfset allContacts = model("contact").findAll(include="type") />
```
Remove 
```coldfusion
<cfdump var="#allContacts#"><cfabort>
```
 from /controllers/contact.cfc in the list action and reload our list.
```coldfusion
URL Rewriting On = http://localhost/contact/list?reload=true
```

```coldfusion
URL Rewriting Partial = http://localhost/index.cfm/contact/list?reload=true
```

```coldfusion
URL Rewriting Off = http://localhost/index.cfm?controller=contact&action=list&reload=true
```
<img src="http://mikehenke.com/assets/content/cfwheels5_6.jpg" alt="" height="400" width="640">More on <a href="http://cfwheels.org/docs/chapter/associations">Associations</a>We did alot of work with the built in ORM. You did a good job. Next post, we will cover the return differences between some built in ORM callsand the logic why, how to specify the return columns, specify the where clause, and create advance queries.Hopefully after that, we will cover editing and deleting records.