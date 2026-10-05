---
title: Setting up Akismet for Coldfusion
date: '2007-09-08'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ColdFusion
---

I have heard <a href="http://Akismet.com" target="_self">Akismet</a> mentioned several times so I figured I would look into it.Â  Akismet "is a collaborative effort to make comment and trackback spam a non-issue and restore innocence to blogging, so you <strong>never have to worry about spam again</strong>."Integrating Akismet with Coldfusion was easy using <a href="http://code.google.com/p/cfakismet/source" target="_self">cfakismet</a> from Google Code.Step 1:Â  You can get a free API key by <a href="http://wordpress.com/signup/">registering for a WordPress.com user account</a>. The API key will be emailed to you after you register.<em>Note: Registration was three questions (username, password, and email address) and I selected "Just a username, please"</em>Step 2: Download CFAkismet.cfc and the index page for an example from the svn repository: http://cfakismet.googlecode.com/svn/trunk/ .Step 3: Test after placing cfc and index.cfm on your server.Â  Change the index.cfm by add your url and the API key from WordPress.See my <a href="/akismet.cfm" target="_self">CFAkismet test page</a>.Â  Pretty cool and simple, uh :-)