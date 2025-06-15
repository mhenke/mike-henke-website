---
title: "Setting up Akismet for Coldfusion"
date: 2007-09-08
categories: 
 - "ColdFusion"
---

I have heard [Akismet](http://Akismet.com) mentioned several times so I figured I would look into it.  Akismet "is a collaborative effort to make comment and trackback spam a non-issue and restore innocence to blogging, so you **never have to worry about spam again**." Integrating Akismet with Coldfusion was easy using [cfakismet](http://code.google.com/p/cfakismet/source) from Google Code. Step 1:  You can get a free API key by [registering for a WordPress.com user account](http://wordpress.com/signup/). The API key will be emailed to you after you register. _Note: Registration was three questions (username, password, and email address) and I selected "Just a username, please"_ Step 2: Download CFAkismet.cfc and the index page for an example from the svn repository: http://cfakismet.googlecode.com/svn/trunk/ . Step 3: Test after placing cfc and index.cfm on your server.  Change the index.cfm by add your url and the API key from WordPress. See my [CFAkismet test page](/akismet.cfm).  Pretty cool and simple, uh :-)
