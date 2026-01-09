---
title: "Ask Mike: Switching to Git and local development"
date: 2010-09-09
categories:
  - "ColdFusion"
  - "git"
---

I received an email about switching to git and local development. Mallory was gracious enough to give me permission to post the original email and my response. I hope this helps other looking to move to git along with local development.

\------------------------------------------------

Your Name: Mallory Woods

Your Email: xxx@xxx.com

Your Message:

Hi Mike,

If you look to your left you will see me jumping on the git bandwagon. If you wait just a few minutes, you will see me struggling to stay on that bandwagon and not doing a face plant and earning that video 1 million views!

I would like to ask you a few questions on git especially since you use it for CF.

Let me give you some background really quick.

ENV: CF9 (64bit Redhat Linux for PROD, STAGING and DEV)

We (my boss and I) code on Windows boxes using CF Builder.

\------------------------------------------------

This should not be an issue except for line feeds maybe.

You will have to set your individual computers up.

\*\*\*User Configuration (one-time)\*\*\*

1. Run these commands in the command prompt or git bash.

        git config --global[](http://www.google.com/url?q=http%3A%2F%2Fuser.name&sa=D&sntz=1&usg=AFQjCNFu0SPm6QpHZ5742pOucYZFgv7vIQ)[user.name](http://www.google.com/url?q=http%3A%2F%2Fuser.name&sa=D&sntz=1&usg=AFQjCNFu0SPm6QpHZ5742pOucYZFgv7vIQ) "John Doe"

        git config --global user.email johndoe@example.com

        git config --global push.default "tracking"

        git config --global pack.threads "0"

        git config --global core.autocrlf false

        git config --global apply.whitespace nowarn

        git config --global color.ui "auto"

        git config --global core.excludesfile "X:\\.gitignore"

\------------------------------------------------

don't change this directly but the config file is called .gitconfig

example: C:\\Documents and Settings\\mhenke\\.gitconfig

\------------------------------------------------

More info just google autocrlf

[http://help.github.com/dealing-with-lineendings/](http://www.google.com/url?q=http%3A%2F%2Fhelp.github.com%2Fdealing-with-lineendings%2F&sa=D&sntz=1&usg=AFQjCNG6aA-V6me1un3mkGti2_t8q6iTyQ)

\------------------------------------------------

My boss is editing code directly on the server (yeah I know that's bad) while I have a WAMP env setup and once I have changes I copy them to the DEV server.

What I would like to ask you, what is the best practice that you would recommended for CF development.

\------------------------------------------------

I would have local development (cf multiple instances) and then push/pull to the other environments like prod, dev, etc.  With git you have the flexibility of editing anywhere in case there is an emergency and you need to make changes like in prod. You would just need to commit and push to the master branch (prod) then merge down the changes to dev, your branch, etc.

\------------------------------------------------

I have been looking at blogs, and even some videos on youtube about git. I think I understand it and it will take some getting used to but I have a few questions as far as setup.

I think that we should have a git repo setup on (for Ex: DEV) in /var/www/html/project where I should have my own branch and my boss would have his.

\------------------------------------------------

Sounds fine with the branches. I would even have a dev branch. Even though you don't have to with git, it is easier to think of your branch and your bosses branch goes into dev, then the dev branch goes upstream to master (production). Changes move downstream the same way, production, dev, then boss or your branch.

to create a new repos, you can do this.  this could be on a mapped drive.

Ceate new project folder in v:\\repositories called "projectname.git"

Right click on "projectname.git" and go to GIT BASH HERE

Type "git --bare init"

Then where ever you want the code do something like this:

Type git clone -v "v:\\projectname.git" "x:\\yourname\\cfusion.ear\\cfusion.war\\projectname"

EXAMPLE:

Type git clone -v "v:\\cls.git" "C:\\Documents and Settings\\mhenke\\Desktop\\cls"

Close dos command

Then you will be able to change switch branches.  This is a key. Even though you maybe on the dev instance, your branch could be something else.

\------------------------------------------------

When we are ready to view the changes we switch the active branch? and view the changes. When we are happy with things we would merge the branches and then push the code to the Staging server.

\------------------------------------------------

I prefer my local instance to on my branches and dev.  I can switch between branches like tickets or topic work.  When ready to move do dev, I would switch to the dev branch, do a pull (getting any changes from maybe the boss), then checkout my branch and do a merge.  This will add any changes from dev to my branch.  Then I push my to my remote branch.  After that I do a checkout of dev (still on my instance) and will merge in my branch.  Test it out and if everything ok, commit and push. I am still in the dev branch, so I will switch back to my branch.

Then I will go to the dev instance. Make sure it is on the dev branch and do a pull.  This will get the latest changes (my stuff) on to the dev instance.

Sounds complicated, but it is pretty smooth.

We use this workflow but replace the rebase command with merge.

[http://vinsol.com/blog/2009/07/24/git-work-flow-for-rails-developers/](http://www.google.com/url?q=http%3A%2F%2Fvinsol.com%2Fblog%2F2009%2F07%2F24%2Fgit-work-flow-for-rails-developers%2F&sa=D&sntz=1&usg=AFQjCNEMp__NLvXuBAZ_oMWNDL0tzgRLEQ)

 [](http://www.google.com/url?q=http%3A%2F%2Fvinsol.com%2Fblog%2F2009%2F07%2F24%2Fgit-work-flow-for-rails-developers%2F&sa=D&sntz=1&usg=AFQjCNEMp__NLvXuBAZ_oMWNDL0tzgRLEQ)

You may want to watch:

CFUnited: Setting up a solid local developement Environment[](http://www.google.com/url?q=http%3A%2F%2Fow.ly%2F2pqLU&sa=D&sntz=1&usg=AFQjCNFiW7iupIQnr3_tshz_v2pprygUaw)[http://ow.ly/2pqLU](http://www.google.com/url?q=http%3A%2F%2Fow.ly%2F2pqLU&sa=D&sntz=1&usg=AFQjCNFiW7iupIQnr3_tshz_v2pprygUaw)

CFMeetup: GIT for Dummies and the slightly more enlightened[](http://www.google.com/url?q=http%3A%2F%2Fexperts.na3.acrobat.com%2Fp65645730%2F&sa=D&sntz=1&usg=AFQjCNG2v8fg_EtXW97Vulgqp1Pn4I-wcQ)[http://experts.na3.acrobat.com/p65645730/](http://www.google.com/url?q=http%3A%2F%2Fexperts.na3.acrobat.com%2Fp65645730%2F&sa=D&sntz=1&usg=AFQjCNG2v8fg_EtXW97Vulgqp1Pn4I-wcQ)

\------------------------------------------------

Please let me know if I have this right or if there is a better solution.

I had suggested to my boss that he have a local setup and test on his box and when everything is good he should push to his branch and I would do the same then we would merge the code and process.

\------------------------------------------------

Pretty much what I described above, except after pushing his branch. He would checkout dev, pull and see if there are any changes, then checkout his branch and merge in dev (if changes), if no changes he would still be in dev and merge in his branch.

\------------------------------------------------

Please let me know what is your best recommended solution.

Thanks for your time.

Mallory Woods
