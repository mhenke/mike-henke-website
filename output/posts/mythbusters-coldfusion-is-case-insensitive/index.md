---
title: 'MythBusters: ColdFusion is Case Insensitive'
date: '2008-01-20'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ColdFusion
  - MythBusters
---

<h3>Myth: ColdFusion is Case Insensitive</h3>
<h3>Rated <strong><em>OTHER</em></strong></h3>
I gave "ColdFusion is Case Insensitive" an <em><strong>Other</strong></em> rating because some attributes' values are case-sensitive like file names. Example: <a target="_self" href="http://livedocs.adobe.com/coldfusion/8/htmldocs/help.html?content=functions_c-d_18.html">CreateObject</a> function's port attribute. The ColdFusion server is case-insensitive, so you can mix case but for consistency and readability you should set a standard. Basically ColdFusion tags, attributes, and variables are not case-sensitive, so you can use either &lt;cfset&gt; or &lt;CFSET&gt;.