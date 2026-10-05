---
title: So you want to create a CFWheels application? (Part 6)
date: '2009-08-20'
author: Mike Henke
layout: layouts/post.njk
categories:
  - CFWheels
  - ColdFusion
---

This <a href="http://cfwheels.org/">CFWheels </a>series is heavily borrowed from <a href="http://www.nodans.com/">Dan Wilson</a>'s "So You Want to" series about <a href="http://www.model-glue.com/">Model Glue</a>:Unity and matches to this <a title="post" href="http://www.nodans.com/index.cfm/2007/2/4/So-you-want-to-create-a-ModelGlueUnity-application--Part-6-">post</a>.Previously in this series, we <a href="/blog/so-you-want-to-install-cfwheels/">installed CFWheels</a>, discussed <a href="/blog/so-you-want-to-create-a-cfwheels-application-part-1/">some concepts in CFWheels</a>, added <a href="/blog/so-you-want-to-create-a-cfwheels-application-part-2/">our basic flow and navigation</a>, created <a href="/blog/so-you-want-to-create-a-cfwheels-application-part-3/">add and list functionality</a>, added <a href="/blog/so-you-want-to-create-a-cfwheels-application-part-4/">validation</a>, and talked in <a href="/blog/so-you-want-to-create-a-cfwheels-application-5/">more detail about the CFWheels ORM.</a>Here is a <a href="http://mikehenke.com/assets/content//SoYouWantToCFWheels.zip">zip</a>, if you want to start from this post. Unzip it in an empty webroot.Today, we will cover the CFWheels ORM a little more. Specifically the return differences between some built in ORM calls and the logic why, specify the SQL order by clause and other sql fine-tuning, and build update and delete functionality.Let's create an edit action in /Models/contact.cfc:
```coldfusion
<cffunction name="edit"> <cfset newContact = model("contact").findByKey(key=params.key, include="type")> <cfset newContact1 = model("contact").findOne(where="id=#params.key#", include="type")> <cfset types = model("type").findAll() />  <cfdump var="#newContact1#"><br> <cfdump var="#newContact#"><br> <cfdump var="#types#"> <cfabort></cffunction>
```
Now add this 
```coldfusion
<th>Actions<th>
```
 to the end of the first tr tag. And add this code to to the end of our last tr tag.
```coldfusion
<td>#linkTo(text="Edit", action="edit", key=allContacts.id)#</td>
```
 in \views\list.cfm.\views\list.cfm should look like this now.
```coldfusion
URL Rewriting On = http://localhost/contact/list
```

```coldfusion
URL Rewriting Partial = http://localhost/index.cfm/contact/list
```

```coldfusion
URL Rewriting Off = http://localhost/index.cfm?controller=contact&action=list
```
<img src="http://mikehenke.com/assets/content//cfwheels6_1.jpg" alt="" width="640" height="400" />Click on an Edit link and you should see this:<img src="http://mikehenke.com/assets/content//cfwheels6_2.jpg" alt="" width="640" height="400" />What you see here is two objects and one query. You may think this is odd since you are using the CFWheels built in ORM and you thought the ORM calls would return the same structure. I thought the same thing but when talking to Per Djurner, it made perfect sense.Here is <a href="http://groups.google.com/group/cfwheels/browse_thread/thread/bbe87f459b7a294c/8f4a1c09a37d1814?lnk=gst&amp;q=object+query#8f4a1c09a37d1814">what he said</a>:"The convention is that when you are fetching a single record from thedatabase (using findOne, findByKey etc) you will get an object back.When youare fetching multiple records you will get a query result set back.The "returnAs" argument is a way to override this convention (and it will beimproved a little more before we release 1.0).""The reasoning behind the convention is that when you are asking the databasefor multiple records it is likely that you intend to display them (ratherthan edit/delete them).In this case objects are overkill (and even more so because of the poorperformance of object creation in ColdFusion)."See the CFWheels guys are always thinking. Don't be afraid to ask @ the <a href="http://groups.google.com/group/cfwheels">CFWheels Google Group</a>.One other thing, I would like to point out is 
```coldfusion
<cfset newContact1 = model("contact").findOne(where="id=#params.key#", include="type")>
```
. See how, I easily added a where clause. This get the same results as 
```coldfusion
<cfset newContact = model("contact").findByKey(key=params.key, include="type")>
```
. 
```coldfusion
FindByKey()
```
, 
```coldfusion
FindOne()
```
 and 
```coldfusion
FindAll()
```
 accept arguments as you can see from above. We are using the where clause and include for Associations. They also accept select, order, maxRows, and a couple arguments for pagination and caching.For more <a href="http://cfwheels.org/docs/chapter/reading-records">Reading Records</a>.Remove from our edit action:
```coldfusion
 <cfdump var="#newContact1#"><br> <cfdump var="#newContact#"><br> <cfdump var="#types#"> <cfabort>
```
Test our Edit link again, and then update the contact. It should update the contact and return us to the List page For more <a href="http://cfwheels.org/docs/chapter/updating-records">Updating Records</a>.Lets add order by to our list action in controllers/contact.cfc. Replace 
```coldfusion
<cfset allContacts = model("contact").findAll(include="type") />
```
 with 
```coldfusion
<cfset allContacts = model("contact").findAll(include="type",order="name") />
```
And reload our list again.<img src="http://mikehenke.com/assets/content//cfwheels6_3.jpg" alt="" width="640" height="400" />See the SQL now has an "Order By" clause.Lets wrap this entry up by adding delete functionality. Go to /Views/list.cfm, and add 
```coldfusion
#linkTo(text="Delete", action="delete", key=allContacts.id)#
```
 after 
```coldfusion
#linkTo(text="Edit", action="edit", key=allContacts.id)#
```
.In /Controllers/contact.cfc add:
```coldfusion
 <cffunction name="delete"> <!--- delete will return true or false depending on success ---> <cfif model("contact").findByKey(params.key).delete()> <cfset flashInsert(success="Contact #params.key# was deleted.")>  <cfelse> <cfset flashInsert(error="There was an error deleting the contact.")> </cfif> <cfset redirectTo(action="list")> </cffunction>
```
Load our list again and you should see the delete link. Give it a try.<img src="http://mikehenke.com/assets/content//cfwheels6_4.jpg" alt="" width="640" height="400" />Success!For more <a href="http://cfwheels.org/docs/chapter/deleting-records">Deleting Records</a> We have a fully working Contact-O-Matic Application. Next in the series, I'll talk about Routing and Plugins in CFWheels.