---
title: So you want to contribute to CFWheels?
date: '2011-04-24'
author: Mike Henke
layout: layouts/post.njk
categories:
  - CFWheels
  - ColdFusion
  - Git
  - Github
---

In this blog series I will be walking through how to contribute to an open source project on <a href="https://github.com/">GitHub</a>. I will assume you:
<ul>
<li><a href="https://github.com/signup/free">Created a free GitHub account</a></li>
<li><a href="http://help.github.com/win-set-up-git/">Set up Git</a> (includes connecting to github)</li>
</ul>
 
First we will fork and setup a local repos of the <a href="http://www.CFWheels.org">CFWheels</a> project at <a href="https://github.com/cfwheels/cfwheels">https://github.com/cfwheels/cfwheels</a>. Lets refer again to the great github help. They have a walkthrough for <a href="http://help.github.com/fork-a-repo/">Fork a Repo</a>.
 
After the "Fork a Repo" is completed, open the git bash in our working folder. Type "git branch" and you should see:
 
<img src="/assets/content/contribute1.jpg" alt="" width="640" height="400" />
 
Next type "git branch -a" and you should see your local and remote branches:
 
<img src="/assets/content/contribute2.jpg" alt="" width="640" height="400" />
 
We'll create a topic branch for our change. This helps isolate our change while Wheels code continues to change. Our command to create a git remote branch is "git push origin origin:refs/heads/new_feature_name". Our topic will be adding a readme file to the CFWheels project. In the git bash type "git push origin origin:refs/heads/readme".
 
<img src="/assets/content/contribute3.jpg" alt="" width="640" height="400" />
 
Now we will checkout and track this new topic branch by using this git command "git checkout -t origin/readme"
 
<img src="/assets/content/contribute4.jpg" alt="" width="640" height="400" />
 
Now we have our local topic branch. I created a readme.md and placed it in our CFWheels folder. You can do this also. After adding a readme file, lets add our readme.md to our repo by these git commands:
git status
git add readme.md
git commit -m"adding readme"
git commit push
 
<img src="/assets/content/contribute5.jpg" alt="" width="640" height="400" />
 
The first command checked the status of our working folder, the second command added it into our git stage area, then the third command committed the change with a commit message, and fourth command pushed our change to github.
Since our contribution is ready for CFWheels to consider, we'll need to notify them. But first we need to merge our change into the new-master branch using "git checkout new-master; git merge readme --no-ff; git push;". This one line is actually chaining several git commands together. It checkouts out new-master, merges in our changes, and pushes our changes to github.
 
<img src="/assets/content/contribute6.jpg" alt="" width="640" height="400" />
 
Now we'll check our repo on GitHub. My fork of CFWheels is at <a href="https://github.com/mhenke/cfwheels">https://github.com/mhenke/cfwheels</a> . You should see a "Pull Request" button on yours. Click the button, fill out the title for the pull request and body, then press "Send Pull Request".
 
<img src="/assets/content/contribute7.jpg" alt="" width="640" height="400" />
 
Congrats, you have walked through the process of contributing to an GitHub project. This article's pull request is <a href="https://github.com/cfwheels/cfwheels/pull/7">here</a>. Our contribution was simple but any contribution is awesome and welcomed for open source projects. Next post we will show how to help with documentation with Wheels.