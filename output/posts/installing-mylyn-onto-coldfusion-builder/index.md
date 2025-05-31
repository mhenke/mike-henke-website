---
title: "Installing Mylyn onto ColdFusion Builder"
date: 2010-04-08
categories: 
  - "coldfusion-builder"
  - "Mylyn"
---

I'll fix up this post but this is a quick run through to install Mylyn onto ColdFusion Builder standalone. Here is a link to the 5 min [screencast of the process](http://www.screencast.com/t/NmNiYThlN2E). Add the update site (help --> install new software)  
Add http://download.eclipse.org/releases/ganymede/ as ganymede  
filter mylyn and then select  
Mylyn Bridge: Eclipse IDE  
Mylyn Focused UI  
Mylyn Task List  
Accept Legal stuff  
Apply changes, shutdown  
"C:\\Program Files (x86)\\Adobe\\Adobe ColdFusion Builder\\CFBuilder.exe" -clean  
Window - Show Views - Other  
Mylyn - Task List and Task Repositories

## screencast

I recorded the installation process, but ran out of time with the final toggling on Mylyn filter of the navigator. It isn't critical, it was to show Mylyn's Navigator filter was working, which it is since you saw me toggled the filter off in the Navigator view.
