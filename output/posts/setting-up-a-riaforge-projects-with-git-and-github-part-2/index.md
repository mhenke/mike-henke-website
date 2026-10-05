---
title: Setting Up a Riaforge Project with Git and Github (Part 2)
date: '2009-08-30'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ColdFusion
  - Git
---

This is a series over using <a href="http://riaforge.org/">Riaforge</a> with <a href="http://git-scm.com/">Git</a> and <a href="https://github.com/">GitHub</a>. So far we <a href="/blog/setting-up-a-riaforge-projects-with-git-and-github-part-1/">installed some software</a>, next we will register for a free GitHub, create a repository, and clone it.<br /><br />Registering will only take a couple seconds. Go to the <a href="https://github.com/signup/free">signup page</a>.<br /><br />Fill out the information but skip the SSH Public Key field. After submitting the registration form, you will be presented the dashboard screen. Select "Create a Repository" and fill out this page. Put in your RiaForge project name in the "Project Name" field, add a little description in that field (be sure to put mention ColdFusion), in the "Homepage URL" field copy your RiaForge url, and hit the "Create Repository" button.<br /><br /><img src="http://mikehenke.com/assets/content//git2_1.jpg" alt="" width="640" height="400" /><br /><br />Next page will have some information we can skip for now. Click on the link below "Importing a Subversion Repo?". Paste in your SVN Repository URL where is says "SVN Repository URL". Click "Import SVN Authors". GitHub will read your SVN repository and display any authors it finds. <br /><br /><strong>READ CAREFULLY HERE.</strong> Either fill out all the authors as shown or NONE. Also when you submit this form, the import process may take only minutes up to 5 days depending on the size of your repository. You will recieve and email from GitHub when the process is finished.<br /><br />After submitting you will be taken back to the master page of your new GitHub repository for this project.<h3>Configuring Local System</h3>Let's configure our local system now and create a SSH public key. This will be used to authenticate you when doing push and pull commands to git. Open up the command prompt and run these commands. Replace your information with mine.<br />Click return/yes on any popups.<br /><br />
```coldfusion
git config --global user.name "mhenke"
```

```coldfusion
git config --global user.email "henke.mike@gmail.com"
```

```coldfusion
ssh-keygen -t rsa
```

```coldfusion
git config --global core.autocrlf true
```
This 
```coldfusion
ssh-keygen
```
 command will create a .ssh folder and two files inside it. This folder is located at "C:\Users\Owner\.ssh" for me. Inside are two files, id_rsa and id_rsa.pub. The first is your private key and the second is your public key.<br /><br />Let's test the authentication. Go back to your command prompt and type in this command.<br /><br />
```coldfusion
ssh git@github.com
```
Hopefully you see something like this.<br /><br /><img src="http://mikehenke.com/assets/content//git2_4.jpg" alt="" width="640" height="400" /><h3>Workaround</h3>Next is step is kinda a work around for something TortoiseGit installed and will be used to for our private clone.<br /><br />Open up, PuttyGen. It should be under the Start menu, TortoiseGit. Next load our private key we created. File --&gt; "Load private key" and then naviagate to our id_rsa file. You will have to select "All Files (*.*)" so you can see our private key and press Open.<br /><br /><img src="http://mikehenke.com/assets/content//git2_5.jpg" alt="" width="640" height="400" /><br /><br />A dialog box will open and press ok. Next select, File --&gt; "Save private key". Click "Yes" and put in "id_rsa.ppk" and then save. This is for our workaround.<br /><br />Next we will copy the key shown in PuttyGen and paste it into GitHub. If you are still logged into GitHub, there should be an "account" link toward the right top of the page. Select that and then scroll down. Under "SSH Public Keys" select "add another public key", put in the title "rsa_id", paste in the copied key from PuttyGen and save it.<br /><br />One last thing while here on the GitHub Account page, scroll back toward the top and you should see a "Your User Information" panel. Select the "Global Git Config" link. GitHub is user friendly and will prove snippets for you to copy, paste, and run. Copy the second line and run it in your command prompt. <br /><br />
```coldfusion
git config --global github.token xxxxxxxxGITHUBTOKENxxxxxxxxxxx
```
<h3>Cloning</h3>Let's wrap up the long entry by running cloning our git repository. Navigate on GitHub to the repository home page. Click on the link next to "Your Clone URL". Copy this snippet to your command prompt and run it.<br /><br /><img src="http://mikehenke.com/assets/content//git2_6.jpg" alt="" width="640" height="400" /><br /><br />This is the work around error, I mentioned. Create a text file and paste in this.<br /><br />
```coldfusion
start "start pageant" /B "C:\Program Files\TortoiseGit\bin\pageant.exe" "C:/Users/Owner/.ssh/id_rsa.ppk"
```

```coldfusion
exit
```
<br />And save it as github.bat. Create a shortcut and put it in your startup or if you want just run the batch when you are using GitHub. Run the batch file now and you should see an new icon your Notification area.<br /><br />Now rerun our clone command in our dos prompt.<br /><br /><img src="http://mikehenke.com/assets/content//git2_7.jpg" alt="" width="640" height="400" /><h3>Conclusion<br /></h3>Well, now you have a working copy of our GitHub repos. We covered alot and my next post will explain more in depth what we did, along with how to work with our new clone. I recommend watching the "<a href="http://www.pragprog.com/screencasts/v-scgithub/insider-guide-to-github">Insider Guide to GitHub</a>" screencast and "<a href="http://gitcasts.com/posts/setup-initialization-and-cloning">Setup, Initialization and Cloning</a>" episode from <a href="http://gitcasts.com/">GitCast</a>. <br /><br />For more on what we did read these links.<br /><a href="http://help.github.com/git-email-settings/">Setting user name, email and GitHub token</a><br /><a href="http://github.com/guides/providing-your-ssh-key">Guides: Providing your SSH Key</a> <br /><a href="http://github.com/guides/dealing-with-newlines-in-git">Guides: Dealing with newlines in git</a>