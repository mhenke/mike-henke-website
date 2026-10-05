---
title: ValidateThis - simple breakdown to using for a newbie
date: '2011-04-18'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ColdFusion
---

I have been a fan of 
	<a href="http://www.validatethis.org/">
		ValidateThis
	</a>
	(VT) for years but never had a chance to implement it yet at work. I have a newer developer under
	me and one of his task is to get VT working on a simple form. The sample demos for VT are numerous and
	the 
	<a href="http://www.validatethis.org/docs/">
		documentation
	</a>
	is outstanding. It is so plentify, it might be overwhelming for a newbie. This
	morning, I helped my co-worker setup a simple form and we wrote down the steps to implement VT.

<h3>
	Step 1
</h3>

	1) create validatethis object most likely in application.cfc/cfm



```coldfusion
<cfif NOT StructKeyExists(application, "ValidateThis")>
 <cfset ValidateThisConfig = {JSRoot="../js/"}/>
 <cfset application.ValidateThis = createObject("component", "ValidateThis.ValidateThis").init(ValidateThisConfig)/>
</cfif>
```


<h3>
	Step 2
</h3>

	2) on the page we want validated pass in the correct validation requirements (objecttype is xml 
	file, theobject is what is being validated, context is like registration, add,
	update)


a) server side after form submitted


```coldfusion
<!--- Use the validate() method to perform server-side validations on an object.  --->
<cfset result = application.ValidateThis.validate(objectType="User",theObject=form,Context=Form.Context) />
```



	b) client side on the form to be submitted



```coldfusion
<!--- Use the getInitializationScript() method to return JavaScript code to set up client-side validations.  --->
<cfset ValInit = application.ValidateThis.getInitializationScript() />
<cfhtmlhead text="#ValInit#" />

<!--- Use the getValidationScript() method to return JavaScript code for client-side validations.  
(objecttype is xml file, context is like registration, add, update)--->
<cfset ValidationScript = application.ValidateThis.getValidationScript(objectType="User",Context=Form.Context) />
<cfhtmlhead text="#ValidationScript#" />
```


<h2>Update</h2>
 After posting this, I found 
<a href="http://www.validatethis.org/docs/wiki/QuickStart_Guide.cfm">
		ValidateThis QuickStart Guide
	</a> which is a simple breakdown also.