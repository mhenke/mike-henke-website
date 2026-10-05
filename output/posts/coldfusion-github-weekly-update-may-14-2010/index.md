---
title: ColdFusion &amp; Github Weekly Update May 14, 2010
date: '2010-05-14'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ColdFusion
  - Github
---

<a href="http://en.wikipedia.org/wiki/ColdFusion">ColdFusion</a> is still stable at 29th most popular language on <a href="http://github.com/">Github</a>. I would really like this number to climb so keep putting your small and large projects on Github since it is free. Not much new on the Github front. I did notice a nice article about "<a href="http://railsontherun.com/2008/3/3/how-to-use-github-and-submit-a-patch/">How to use github and submit a patch</a>".
I found the official announcement of <a href="http://groups.google.com/group/framework-one/browse_thread/thread/3a18a748b8d20736/">FW1 switching to Github</a> on their google group. I jumped in late, but the thread is still being commented on. I would like to point out a couple specific questions raised and my response about why github/git is different then any other Version Control System (VCS).
My initial comment is with two greater than signs like<strong> &gt;&gt; and bold</strong>. The response is with one greater than sign like<em> &gt; and italic</em>. My counter is <strong>bold</strong>.
<hr />
<strong>&gt; &gt; Why should the project remain dormant if the creator is off to other things?</strong>
<em>&gt; GitHub makes collaboration easier and more fun (I'm all for it), but it is not required to fork an OS project. If Sean disappears, the project would be dormant regardless of what versioning was used, because he's the only one with the keys - it's the fork that would be open, and that could be in any VCS.</em>
<strong>In git/github the project would not be dormant if the creator left. The project doesn't really belong to anyone. Everyone has a copy/clone of the full repository (history, files, and all). Notice how the url isn't http://github.com/fw1 , it is http://github.com/seancorfield/fw1 or http://github.com/webflint/fw1.</strong>
<hr />
<strong><strong>&gt;&gt;There could even be changes that are deemed outside the FW1 scope so not incorporated in Sean's repository yet some people may want those so they will go to the other fork with the changes.</strong></strong>
<em>&gt; Same with adding features, it's just a fork, the VCS doesn't matter.</em>
<strong>I think the VCS does matter. Let's take PayPalCFC at http://paypalcfc.riaforge.org/ in SVN. John created it for what he needed and put it on Riaforge and SVN for others. The Paypal API changes, how are you going to fork/branch that for updates and let others know about it so they can use it? John would have to grant you rights to svn or you would have to email him a patch and hope he incorporates it.</strong>