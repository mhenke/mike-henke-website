---
title: So you want to create a CFWheels application? ( Part 2 )
date: '2009-07-26'
author: Mike Henke
layout: layouts/post.njk
categories:
  - CFWheels
  - ColdFusion
---

This <a href="http://cfwheels.org">CFWheels </a>series is heavily borrowed from <a title="Dan Wilson" href="http://www.nodans.com/">Dan Wilson</a>'s "So You Want to" series about <a title="Model Glue" href="http://www.model-glue.com/">Model Glue</a>:Unity. This entry matches to <a title="this post" href="http://www.nodans.com/index.cfm/2007/1/21/So-you-want-to-build-a-Model-Glue-Application-Part-2">this post</a>.We have <a title="installed" href="/blog/so-you-want-to-install-cfwheels/">installed</a> CFWheels and <a title="talked about the files installed, Request Handling and URL Rewriting" href="/blog/so-you-want-to-create-a-cfwheels-application-part-1/">talked about the files, Request Handling and URL Rewriting</a>. If you setup <a title="URL Rewriting" href="http://cfwheels.org/docs/chapter/url-rewriting">URL Rewriting</a>, you will be accessing our Contacts application a little differently then if you have partial URL rewriting or no URL rewriting. I'll show all three URLs.<h3>View</h3>First, lets create a folder under views called contact, then inside it create index.cfm. Place this code in index.cfm
```coldfusion
<cfoutput><html><head><title>Contact-O-Matic</title><link rel="stylesheet" type="text/css" href="/stylesheets/menu.css" media="screen" /></head><body><div><div id="banner">Contact-O-Matic</div><div><div><h2>This is index.cfm from contact folder</h2></div></div><div id="footer"> #dateformat( now(), "long")# #timeformat( now(), "long")#</div></div></body></html></cfoutput>
```
Check our page now, depending on your setup use one of these:
```coldfusion
URL Rewriting On = http://localhost/contactURL Rewriting Partial = http://localhost/index.cfm/contactURL Rewriting Off = http://localhost/index.cfm?controller=contact&action=index
```
You should see this:<img src="/assets/content//cfwheels2_image1.jpg" alt="" width="640" height="400" />At the bottom section of the browser, you can see some specific CFWheels debugging information. Notice the controller is contact and the action is index.<h3>Controller and Action</h3>Let's add the controller and action. Create a contact.cfc file in the Controller folder with this code.
```coldfusion
<cfcomponent extends="Controller"><cffunction name="index"><cfdump var="#params#"><cfabort></cffunction></cfcomponent> 
```
Add the url variable 
```coldfusion
customerid=1
```
 to your URL and run the page.
```coldfusion
URL Rewriting On = http://localhost/contact?contactid=1
```

```coldfusion
URL Rewriting Partial = http://localhost/index.cfm/contact?contactid=1
```

```coldfusion
URL Rewriting Off = http://localhost/index.cfm?controller=contact&action=index&contactid=1
```
You should see the contents of the params struct. This structure helps you by combining form and url scopes in one place. The params structure can be accessed in the view and controller, but not the model. Notice the params structure also has the action and controller named.<img src="/assets/content//cfwheels2_image2.jpg" alt="" width="640" height="400" />Remove the dump and abort from the index action in the contact controller. Place the following two lines of code in the action.
```coldfusion
<cfset contacttype = "No Contact Type Defined" /><cfset ContactTypes = "There are no contact types defined either" />
```
<h3>View again</h3>Then in the views folder, replace 
```coldfusion
<h2>This is index.cfm from contact folder</h2>
```
 in index.cfm with this:
```coldfusion
<strong>Controller:</strong> #params.Controller#<br /><strong>
```

```coldfusion
Action:</strong> #params.Action#<br />
```

```coldfusion
<strong>ContactID:</strong> #params.ContactID#<br />
```

```coldfusion
<strong>ContactType:</strong> #variables.ContactType#<br />
```

```coldfusion
<strong>ContactTypes:</strong>#variables.ContactTypes#
```
Refresh the page, you should see this.<img src="/assets/content//cfwheels2_image3.jpg" alt="" width="640" height="400" />Notice, the ContactType and ContactTypes variable we set in the controller are available in the variables scope of our view.<h3>Layouts</h3>We have covered alot, but two more things. You may have noticed our source has two html and body tags. This is because, CFWheels has a <a href="http://cfwheels.org/docs/chapter/using-layouts">layout convention</a>. This file is in view/layout.cfm. Let's move our common header and footer code to it. Change the default layout page so it looks like this:
```coldfusion
<!--- Place HTML here that should be used as the default layout of your application ---><html><head><title>Contact-O-Matic</title><link rel="stylesheet" type="text/css" href="/stylesheets/menu.css" media="screen" /></head><body><div> <cfoutput>#contentForLayout()#</cfoutput><div id="footer"><cfoutput>#dateformat( now(), "long")# #timeformat( now(), "long")# </cfoutput></div></div></body></html> 
```
The views/contact/index.cfm file should now only contain this:
```coldfusion
<cfoutput><div><div><strong>Controller:</strong> #params.Controller#<br /><strong>Action:</strong> #params.Action#<br /><strong>ContactID:</strong> #params.ContactID#<br /><strong>ContactType:</strong> #variables.ContactType#<br /><strong>ContactTypes:</strong>#variables.ContactTypes#<br /></div></div></cfoutput>
```
<h3>Partials</h3>There much cleaner. One last thing. Lets add a menu by creating a partial. <a href="http://cfwheels.org/docs/chapter/partials">Partials </a>are like using a cfinclude but more powerful within CFWheels.Create a file in the views/contact folder called _banner.cfm . The underline is a convention for signifying a partial file.Put this code in the _banner.cfm file:
```coldfusion
<div id="banner"> Contact-O-Matic <ul id="navlist"> <li><a href="#" <cfif params.action IS "index">id="current"</cfif>>Home</a></li> <li><a href="#" <cfif params.action IS "contactList">id="current"</cfif>>Contact List</a></li> <li><a href="#" <cfif params.action IS "contact">id="current"</cfif>>Contact</a></li> </ul></div>  
```
In views/contact/index.cfm add this after the openning cfoutput tag:
```coldfusion
#includePartial("banner")#
```
<h3>StyleSheet</h3> Add a menu.css file using the css from <a href="http://css.maxdesign.com.au/listamatic/horizontal05.htm">listamatic</a> into the stylesheets folder. And Voila. You should have something like this now.<img src="/assets/content//cfwheels2_image4.jpg" alt="" width="640" height="400" />In the next part of our series, we will add and save contacts with a contact form.