---
title: 'Ask Mike: Switching to Git and local development'
date: '2010-09-09'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ColdFusion
  - Git
excerpt: "<p style=\"line-height: 1.15; text-indent: 0pt; direction: ltr; margin-left: 4pt;\">\r\n\t<span style=\"color: #000000; font-size: 11pt; font-family: Arial;\">\r\nI received an email about switching to git and local development.\r\nMallory was gracious enough to give me permission to post the original\r\nemail and my response. I hope this helps other looking to move to git\r\nalong with local development.</span>\r\n\r\n<p style=\"line-height: 1.15; text-indent: 0pt; direction: ltr; margin-left: 4pt;\">\r\n\t<span style=\"color: #3366ff; font-size: 11pt; font-family: Arial;\">------------------------------------------------</span>\r\n\r\n<p style=\"line-height: 1.15; text-indent: 0pt; direction: ltr; margin-left: 4pt;\">\r\n\t<span style=\"color: #000000; font-size: 11pt; font-family: Arial;\">Your Name: Mallory Woods</span>\r\n\r\n<p style=\"line-height: 1.15; text-indent: 0pt; direction: ltr; margin-left: 4pt;\">\r\n\t<span style=\"color: #000000; font-size: 11pt; font-family: Arial;\">Your Email: xxx@xxx.com</span>\r\n\r\n<p style=\"line-height: 1.15; text-indent: 0pt; direction: ltr; margin-left: 4pt;\">\r\n\t<span style=\"color: #000000; font-size: 11pt; font-family: Arial;\">Your Message: </span>\r\n\r\n<p style=\"line-height: 1.15; text-indent: 0pt; direction: ltr; margin-left: 4pt;\">\r\n\t<span style=\"color: #000000; font-size: 11pt; font-family: Arial;\">\_</span>\r\n\r\n<p style=\"line-height: 1.15; text-indent: 0pt; direction: ltr; margin-left: 4pt;\">\r\n\t<span style=\"color: #000000; font-size: 11pt; font-family: Arial;\">Hi Mike,</span>\r\n\r\n<p style=\"line-height: 1.15; text-indent: 0pt; direction: ltr; margin-left: 4pt;\">\r\n\t<span style=\"color: #000000; font-size: 11pt; font-family: Arial;\">\_</span>\r\n\r\n<p style=\"line-height: 1.15; text-indent: 0pt; direction: ltr; margin-left: 4pt;\">\r\n\t<span style=\"color: #000000; font-size: 11pt; font-family: Arial;\">If\r\nyou look to your left you will see me jumping on the git bandwagon. If\r\nyou wait just a few minutes, you will see me struggling to stay on that\r\nbandwagon and not doing a face plant and earning that video 1 million\r\nviews!</span>\r\n\r\n<p style=\"line-height: 1.15; text-indent: 0pt; direction: ltr; margin-left: 4pt;\">\r\n\t<span style=\"color: #000000; font-size: 11pt; font-family: Arial;\">\_</span>\r\n\r\n<p style=\"line-height: 1.15; text-indent: 0pt; direction: ltr; margin-left: 4pt;\">\r\n\t<span style=\"color: #000000; font-size: 11pt; font-family: Arial;\">I would like to ask you a few questions on git especially since you use it for CF....</span>"
---

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #000000; font-size: 11pt; font-family: Arial;">
	I received an email about switching to git and local development. Mallory was gracious enough to give me permission to post the original email and my response. I hope this helps other looking to move to git along with local development.</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">------------------------------------------------</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #000000; font-size: 11pt; font-family: Arial;">Your Name: Mallory Woods</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #000000; font-size: 11pt; font-family: Arial;">Your Email: xxx@xxx.com</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #000000; font-size: 11pt; font-family: Arial;">Your Message: </span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #000000; font-size: 11pt; font-family: Arial;"> </span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #000000; font-size: 11pt; font-family: Arial;">Hi Mike,</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #000000; font-size: 11pt; font-family: Arial;"> </span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #000000; font-size: 11pt; font-family: Arial;">If you look to your left you will see me jumping on the git bandwagon. If you wait just a few minutes, you will see me struggling to stay on that bandwagon and not doing a face plant and earning that video 1 million views!</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #000000; font-size: 11pt; font-family: Arial;"> </span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #000000; font-size: 11pt; font-family: Arial;">I would like to ask you a few questions on git especially since you use it for CF.</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #000000; font-size: 11pt; font-family: Arial;"> </span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #000000; font-size: 11pt; font-family: Arial;">Let me give you some background really quick.</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #000000; font-size: 11pt; font-family: Arial;"> </span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #000000; font-size: 11pt; font-family: Arial;">ENV: CF9 (64bit Redhat Linux for PROD, STAGING and DEV)</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #000000; font-size: 11pt; font-family: Arial;">We (my boss and I) code on Windows boxes using CF Builder.</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">------------------------------------------------</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">This should not be an issue except for line feeds maybe.</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;"> </span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">You will have to set your individual computers up.</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;"> </span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">***User Configuration (one-time)***</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">1) Run these commands in the command prompt or git bash.</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">        git config --global</span><span style="color: #3366ff; font-size: 11pt; font-family: Arial;"><a href="http://www.google.com/url?q=http%3A%2F%2Fuser.name&amp;sa=D&amp;sntz=1&amp;usg=AFQjCNFu0SPm6QpHZ5742pOucYZFgv7vIQ"></a></span><span style="color: #000099; font-size: 11pt; font-family: Arial; text-decoration: underline;"><a href="http://www.google.com/url?q=http%3A%2F%2Fuser.name&amp;sa=D&amp;sntz=1&amp;usg=AFQjCNFu0SPm6QpHZ5742pOucYZFgv7vIQ">user.name</a></span><span style="color: #3366ff; font-size: 11pt; font-family: Arial;"> "John Doe"</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">        git config --global user.email johndoe@example.com</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">        git config --global push.default "tracking"</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">        git config --global pack.threads "0"</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">        git config --global core.autocrlf false</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">        git config --global apply.whitespace nowarn</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">        git config --global color.ui "auto"</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">        git config --global core.excludesfile "X:\.gitignore"</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">------------------------------------------------</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">don't change this directly but the config file is called .gitconfig</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">example: C:\Documents and Settings\mhenke\.gitconfig</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">------------------------------------------------</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">More info just google autocrlf</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #000099; font-size: 11pt; font-family: Arial; text-decoration: underline;"><a href="http://www.google.com/url?q=http%3A%2F%2Fhelp.github.com%2Fdealing-with-lineendings%2F&amp;sa=D&amp;sntz=1&amp;usg=AFQjCNG6aA-V6me1un3mkGti2_t8q6iTyQ">http://help.github.com/dealing-with-lineendings/</a></span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">------------------------------------------------</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #000000; font-size: 11pt; font-family: Arial;">My boss is editing code directly on the server (yeah I know that's bad) while I have a WAMP env setup and once I have changes I copy them to the DEV server.</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #000000; font-size: 11pt; font-family: Arial;"> </span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #000000; font-size: 11pt; font-family: Arial;">What I would like to ask you, what is the best practice that you would recommended for CF development.</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">------------------------------------------------</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">I would have local development (cf multiple instances) and then push/pull to the other environments like prod, dev, etc.  With git you have the flexibility of editing anywhere in case there is an emergency and you need to make changes like in prod. You would just need to commit and push to the master branch (prod) then merge down the changes to dev, your branch, etc.</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">------------------------------------------------</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #000000; font-size: 11pt; font-family: Arial;">I have been looking at blogs, and even some videos on youtube about git. I think I understand it and it will take some getting used to but I have a few questions as far as setup.</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #000000; font-size: 11pt; font-family: Arial;"> </span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #000000; font-size: 11pt; font-family: Arial;">I think that we should have a git repo setup on (for Ex: DEV) in /var/www/html/project where I should have my own branch and my boss would have his.</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">------------------------------------------------</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">Sounds fine with the branches. I would even have a dev branch. Even though you don't have to with git, it is easier to think of your branch and your bosses branch goes into dev, then the dev branch goes upstream to master (production). Changes move downstream the same way, production, dev, then boss or your branch.</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;"> </span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">to create a new repos, you can do this.  this could be on a mapped drive.</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;"> </span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">Ceate new project folder in v:\repositories called "projectname.git"</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">Right click on "projectname.git" and go to GIT BASH HERE</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">Type "git --bare init"</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;"> </span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">Then where ever you want the code do something like this:</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;"> </span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">Type git clone -v "v:\projectname.git" "x:\yourname\cfusion.ear\cfusion.war\projectname"</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">EXAMPLE:</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">Type git clone -v "v:\cls.git" "C:\Documents and Settings\mhenke\Desktop\cls"</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">Close dos command</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;"> </span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">Then you will be able to change switch branches.  This is a key. Even though you maybe on the dev instance, your branch could be something else.</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">------------------------------------------------</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #000000; font-size: 11pt; font-family: Arial;">When we are ready to view the changes we switch the active branch? and view the changes. When we are happy with things we would merge the branches and then push the code to the Staging server.</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">------------------------------------------------</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">I prefer my local instance to on my branches and dev.  I can switch between branches like tickets or topic work.  When ready to move do dev, I would switch to the dev branch, do a pull (getting any changes from maybe the boss), then checkout my branch and do a merge.  This will add any changes from dev to my branch.  Then I push my to my remote branch.  After that I do a checkout of dev (still on my instance) and will merge in my branch.  Test it out and if everything ok, commit and push. I am still in the dev branch, so I will switch back to my branch.</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;"> </span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">Then I will go to the dev instance. Make sure it is on the dev branch and do a pull.  This will get the latest changes (my stuff) on to the dev instance.</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;"> </span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">Sounds complicated, but it is pretty smooth.</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;"> </span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">We use this workflow but replace the rebase command with merge.</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;"> </span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #000099; font-size: 11pt; font-family: Arial; text-decoration: underline;"><a href="http://www.google.com/url?q=http%3A%2F%2Fvinsol.com%2Fblog%2F2009%2F07%2F24%2Fgit-work-flow-for-rails-developers%2F&amp;sa=D&amp;sntz=1&amp;usg=AFQjCNEMp__NLvXuBAZ_oMWNDL0tzgRLEQ">http://vinsol.com/blog/2009/07/24/git-work-flow-for-rails-developers/</a></span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #000099; font-size: 11pt; font-family: Arial; text-decoration: underline;"><a href="http://www.google.com/url?q=http%3A%2F%2Fvinsol.com%2Fblog%2F2009%2F07%2F24%2Fgit-work-flow-for-rails-developers%2F&amp;sa=D&amp;sntz=1&amp;usg=AFQjCNEMp__NLvXuBAZ_oMWNDL0tzgRLEQ"> </a></span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">You may want to watch:</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;"> </span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">CFUnited: Setting up a solid local developement Environment</span><span style="color: #3366ff; font-size: 11pt; font-family: Arial;"><a href="http://www.google.com/url?q=http%3A%2F%2Fow.ly%2F2pqLU&amp;sa=D&amp;sntz=1&amp;usg=AFQjCNFiW7iupIQnr3_tshz_v2pprygUaw"></a></span><span style="color: #000099; font-size: 11pt; font-family: Arial; text-decoration: underline;"><a href="http://www.google.com/url?q=http%3A%2F%2Fow.ly%2F2pqLU&amp;sa=D&amp;sntz=1&amp;usg=AFQjCNFiW7iupIQnr3_tshz_v2pprygUaw">http://ow.ly/2pqLU</a></span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">CFMeetup: GIT for Dummies and the slightly more enlightened</span><span style="color: #3366ff; font-size: 11pt; font-family: Arial;"><a href="http://www.google.com/url?q=http%3A%2F%2Fexperts.na3.acrobat.com%2Fp65645730%2F&amp;sa=D&amp;sntz=1&amp;usg=AFQjCNG2v8fg_EtXW97Vulgqp1Pn4I-wcQ"></a></span><span style="color: #000099; font-size: 11pt; font-family: Arial; text-decoration: underline;"><a href="http://www.google.com/url?q=http%3A%2F%2Fexperts.na3.acrobat.com%2Fp65645730%2F&amp;sa=D&amp;sntz=1&amp;usg=AFQjCNG2v8fg_EtXW97Vulgqp1Pn4I-wcQ">http://experts.na3.acrobat.com/p65645730/</a></span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">------------------------------------------------</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #000000; font-size: 11pt; font-family: Arial;">Please let me know if I have this right or if there is a better solution.</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #000000; font-size: 11pt; font-family: Arial;"> </span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #000000; font-size: 11pt; font-family: Arial;">I had suggested to my boss that he have a local setup and test on his box and when everything is good he should push to his branch and I would do the same then we would merge the code and process.</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">------------------------------------------------</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">Pretty much what I described above, except after pushing his branch. He would checkout dev, pull and see if there are any changes, then checkout his branch and merge in dev (if changes), if no changes he would still be in dev and merge in his branch.</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #3366ff; font-size: 11pt; font-family: Arial;">------------------------------------------------</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #000000; font-size: 11pt; font-family: Arial;">Please let me know what is your best recommended solution.</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #000000; font-size: 11pt; font-family: Arial;"> </span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #000000; font-size: 11pt; font-family: Arial;">Thanks for your time.</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #000000; font-size: 11pt; font-family: Arial;"> </span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #000000; font-size: 11pt; font-family: Arial;">Mallory Woods</span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr; margin-left: 4.0pt;">
	<span style="color: #000000; font-size: 11pt; font-family: Arial;"> </span>

<p style="line-height: 1.15; text-indent: 0.0pt; direction: ltr;">
	<span style="color: #000000; font-size: 11pt; font-family: Arial;"> </span>