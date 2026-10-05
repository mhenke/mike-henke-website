---
title: Git Performance commands
date: '2011-04-19'
author: Mike Henke
layout: layouts/post.njk
categories:
  - Git
---

I have a .bat file with these git commands in it which I run once in awhile to cleanup/improve performance. In my git bash, I drop the bat and the run the batch. 

git fsck --unreachable<br />git reflog expire --expire=0 --all<br />git repack -a -d -l<br />git prune<br />git gc --aggressive
 
Here is a brief discription and link for more detailed information on the commands.
<a href="http://www.kernel.org/pub/software/scm/git/docs/git-fsck.html">git-fsck</a> -
   Verifies the connectivity and validity of the objects in the database

<a href="http://www.kernel.org/pub/software/scm/git/docs/git-reflog.html">git-reflog</a> -
   Manage reflog information

<a href="http://www.kernel.org/pub/software/scm/git/docs/git-repack.html">git-repack</a> -
   Pack unpacked objects in a repository

<a href="http://www.kernel.org/pub/software/scm/git/docs/git-prune.html">git-prune</a> -
   Prune all unreachable objects from the object database

<a href="http://www.kernel.org/pub/software/scm/git/docs/git-gc.html">git-gc</a> -
   Cleanup unnecessary files and optimize the local repository