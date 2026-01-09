---
title: "Git Performance commands"
date: 2011-04-19
categories:
  - "git"
---

I have a .bat file with these git commands in it which I run once in awhile to cleanup/improve performance. In my git bash, I drop the bat and the run the batch.

git fsck --unreachable  
git reflog expire --expire=0 --all  
git repack -a -d -l  
git prune  
git gc --aggressive   Here is a brief discription and link for more detailed information on the commands. [git-fsck](http://www.kernel.org/pub/software/scm/git/docs/git-fsck.html) - Verifies the connectivity and validity of the objects in the database

[git-reflog](http://www.kernel.org/pub/software/scm/git/docs/git-reflog.html) - Manage reflog information

[git-repack](http://www.kernel.org/pub/software/scm/git/docs/git-repack.html) - Pack unpacked objects in a repository

[git-prune](http://www.kernel.org/pub/software/scm/git/docs/git-prune.html) - Prune all unreachable objects from the object database

[git-gc](http://www.kernel.org/pub/software/scm/git/docs/git-gc.html) - Cleanup unnecessary files and optimize the local repository
