---
title: "ValidateThis - simple breakdown to using for a newbie"
date: 2011-04-18
categories: 
  - "ColdFusion"
---

I have been a fan of [ValidateThis](http://www.validatethis.org/) (VT) for years but never had a chance to implement it yet at work. I have a newer developer under me and one of his task is to get VT working on a simple form. The sample demos for VT are numerous and the [documentation](http://www.validatethis.org/docs/) is outstanding. It is so plentify, it might be overwhelming for a newbie. This morning, I helped my co-worker setup a simple form and we wrote down the steps to implement VT.

### Step 1

1) create validatethis object most likely in application.cfc/cfm

\[code language="coldfusion"\] \[/code\]

### Step 2

2) on the page we want validated pass in the correct validation requirements (objecttype is xml file, theobject is what is being validated, context is like registration, add, update)

a) server side after form submitted

\[code language="coldfusion"\] \[/code\]

b) client side on the form to be submitted

\[code language="coldfusion"\]

\[/code\]

## Update

After posting this, I found [ValidateThis QuickStart Guide](http://www.validatethis.org/docs/wiki/QuickStart_Guide.cfm) which is a simple breakdown also.
