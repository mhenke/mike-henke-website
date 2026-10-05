---
title: Why Github for your ColdFusion Open Source Project
date: '2010-02-22'
author: Mike Henke
layout: layouts/post.njk
categories:
  - CFWheels
  - ColdFusion
  - Git
  - Github
---

I have been touting <a href="http://github.com">Github</a> for ColdFusion open source projects. I have a great example of why.
<a href="http://www.silverwareconsulting.com/">Bob Silverberg</a> has been working on ValidateThis for Wheels. This consists of two projects, the <a href="http://github.com/bobsilverberg/ValidateThis">ValidateThis framework</a> and a <a href="http://github.com/mhenke/validateThisCFWheels">ValidateThis Wheels plugin</a>. He <a href="http://help.github.com/forking/">forked</a> my repository of the plugin and <a href="http://github.com/bobsilverberg/validateThisCFWheels/commit/8b2de50d1ac6b348e9503e20a7d2da1d6d09a0f0">made a change</a>, then sent me a pull request. All I had to do was add Bob's remote branch to my local repository, fetch the changes, then merge in the changes, and push the update. Notice I didn't change from my branch.
<img src="/images/whyGit.jpg" alt="" />
I found the <a href="http://support.github.com/discussions/repos/2131-apply-fork-changes">commands here</a>.<br />git remote add bob git://github.com/bobsilverberg/validateThisCFWheels.git<br />git fetch bob<br />git merge bob/master<br />git push