---
title: Git Performance - spring cleaning your repository
date: '2012-03-13'
author: Mike Henke
layout: layouts/post.njk
categories:
  - Git
---

I blogged about "<a href="/blog/git-performance-commands/">Git Performance Commands</a>" before. Basically these commands are spring cleaning for your git repository. I run them occasionally at work. I love chaining git commands together so here are the commands chained.
<strong>git fsck --unreachable &amp;&amp; git reflog expire --expire=0 --all &amp;&amp; git repack -a -d -l &amp;&amp; git prune &amp;&amp; git gc --aggressive</strong>
Here is what it looks like ran in the git bash.
<img src="http://mikehenke.com/assets/content/images/gitperf.jpg" alt="" width="640" height="527" />