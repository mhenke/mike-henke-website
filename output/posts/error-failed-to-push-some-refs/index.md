---
title: "error: failed to push some refs"
date: 2011-01-26
categories: 
  - "git"
---

My co-worker received an error message when trying to do a push to our git repos. Usually a pull will fix the issue in my experience but this was different.

## Error Message  

git.exe push --progress  "origin" branchName:branchName

error: Couldn't set refs/heads/branchName To X:\\xxx.git  ! \[remote rejected\] branchName -> branchName (failed to write)

error: failed to push some refs to 'X:\\xxx.git'

## Resolution

To resolve, we had to run some clean-up/performance commands on the remote repository.

## Commands  

git fsck --unreachable  
git reflog expire --expire=0 --all  
git repack -a -d -l  
git prune  
git gc --aggressive
