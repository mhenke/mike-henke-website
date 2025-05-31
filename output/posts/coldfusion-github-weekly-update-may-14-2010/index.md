---
title: "ColdFusion & Github Weekly Update May 14, 2010"
date: 2010-05-14
categories: 
  - "ColdFusion"
  - "github"
---

[ColdFusion](http://en.wikipedia.org/wiki/ColdFusion) is still stable at 29th most popular language on [Github](http://github.com/). I would really like this number to climb so keep putting your small and large projects on Github since it is free. Not much new on the Github front. I did notice a nice article about "[How to use github and submit a patch](http://railsontherun.com/2008/3/3/how-to-use-github-and-submit-a-patch/)". I found the official announcement of [FW1 switching to Github](http://groups.google.com/group/framework-one/browse_thread/thread/3a18a748b8d20736/) on their google group. I jumped in late, but the thread is still being commented on. I would like to point out a couple specific questions raised and my response about why github/git is different then any other Version Control System (VCS). My initial comment is with two greater than signs like **>> and bold**. The response is with one greater than sign like _> and italic_. My counter is **bold**.

* * *

**\> > Why should the project remain dormant if the creator is off to other things?** _\> GitHub makes collaboration easier and more fun (I'm all for it), but it is not required to fork an OS project. If Sean disappears, the project would be dormant regardless of what versioning was used, because he's the only one with the keys - it's the fork that would be open, and that could be in any VCS._ **In git/github the project would not be dormant if the creator left. The project doesn't really belong to anyone. Everyone has a copy/clone of the full repository (history, files, and all). Notice how the url isn't http://github.com/fw1 , it is http://github.com/seancorfield/fw1 or http://github.com/webflint/fw1.**

* * *

****\>>There could even be changes that are deemed outside the FW1 scope so not incorporated in Sean's repository yet some people may want those so they will go to the other fork with the changes.**** _\> Same with adding features, it's just a fork, the VCS doesn't matter._ **I think the VCS does matter. Let's take PayPalCFC at http://paypalcfc.riaforge.org/ in SVN. John created it for what he needed and put it on Riaforge and SVN for others. The Paypal API changes, how are you going to fork/branch that for updates and let others know about it so they can use it? John would have to grant you rights to svn or you would have to email him a patch and hope he incorporates it.**
