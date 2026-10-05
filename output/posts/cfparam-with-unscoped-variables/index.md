---
title: cfparam with unscoped variables
date: '2011-01-04'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ColdFusion
---

I thought an unscoped parameter when using <a href="http://help.adobe.com/en_US/ColdFusion/9.0/CFMLRef/WSc3ff6d0ea77859461172e0811cbec22c24-7faf.html">CFPARAM</a> would be placed into the variables scope if the parameter didn't exist in the variables scope, similiar to <a href="http://help.adobe.com/en_US/ColdFusion/9.0/CFMLRef/WSc3ff6d0ea77859461172e0811cbec22c24-7ffd.html">CFSET</a> when no scope is defined. Today I realized, CFPARAM doesn't always set an unscoped parameter to the variables scope. Here is a code example to explain better.
<h2>Code Example</h2>
<img src="/images/scope0.jpg" alt="" width="640" height="400" />
So when you run this the page should see something like this.
<h2>Code Results</h2>
<img src="/images/scope1.jpg" alt="" />
Everything Cool? Now, add to the url in the address bar <strong>?mike=cool</strong> and reload the page.
Error, What happenned?
<h2>Error Results</h2>
<img src="/images/scope2.jpg" alt="" />
Well, it seems <strong>variables.mike</strong> is undefined because CFPARAM is similar in regards to how ColdFusion <a href="http://help.adobe.com/en_US/ColdFusion/9.0/Developing/WSc3ff6d0ea77859461172e0811cbec09af4-7fdf.html">evaluates an unscoped variable</a>. CFPARAM tests for the existence of an unscoped parameter in <em>every scope</em>. Since in our error example, mike parameter is already defined, cfparam finds it and drives on. In the first example, mike parameter doesn't exist in any scope, so cfparam provides mike in the variables scope.