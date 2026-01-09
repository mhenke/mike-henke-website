---
title: "Pimping my Eclipse startup and other shizzle"
date: 2007-12-29
categories:
  - "Eclipse"
  - "Subversion"
---

A couple weeks ago when writing the entry, [UnEclipsing CFEclipse Line Numbers](http://mikehenke.com/machblog/index.cfm?event=showEntry&entryId=FA78BD3D-188B-4E84-15C225362B1283AB), I stumbled on a couple interesting settings in preferences to pimp my Eclipse EDI ![](images/teeth_smile.gif)

On the net is plenty of info for tweaking eclipse.ini file or adding variables to eclipse executable for performance but I hadn't seen anything about the settings below.

### Plug-ins activated on startup

_Windows --> Preferences_ then type **"startup"** in filter or navigate to _General --> Startup and Shutdown_. The settings I found interesting were "Refresh workspace on startup" and "Plug-ins activated on startup". I unchecked all plugins I don't use like Eclipse Monkey and most Aptana plugins.

### Always run in background

_Windows --> Preferences_ then type **"background"** in the filter or navigate to _General._ I toggled on "Show heap status" and "Always run in background". Not really a performance tweak but will allow processes not to bring my use of Eclipse to a halt. And I can easily see my heap size in case I need to modify it.

### Workspace

_Windows --> Preferences --> General --> Workspace_. I checked Build, Refresh, and Save automatically. This is more for builds but Refresh automatically does run every so often.

### Aptana Start page

Windows --> Preferences then type **"start page"** in the filter or navigate to Aptana --> Start Page. I set the option to "Never display after startup". No more annoying Aptana splash page. I read people complaining Aptana taking over Eclipse and I noticed it becoming more intrusive also. This change and the next below should help.

### Automatic Updates

_Windows --> Preferences --> Aptana --> Updates_, you could shut off the options to improve startup, but I have Aptana find new updates and download automatically checked on. I do the same with general Eclipse plugins under _Windows --> Preferences --> Install/Update_. I check "Automatically select mirrors" under _Install/Update --> Automatically Updates_ and I specify "look for updates" every Monday and again download automatically.

### SVN Menu Icon

Nothing to do with performance but a cool setting I didn't know existed. _Windows --> Preferences --> Team --> SVN --> Menu Icons_, you can set icons Eclipse uses for Subversion. My options were default, TortoiseSVN, or Subversion. Very neat.
