---
title: "IDE Talk - CFHour()"
date: 2009-04-01
categories:
  - "Ant"
  - "CFEclipse"
  - "ColdFusion"
  - "Eclipse"
---

[CFHour()](http://www.cfhour.com/) released a new podcast, IDE Talk. They talk about ColdFusion IDEs (integrating development editor) covering Homesite, Dreamweaver, and Eclipse with Aptana and CFEclipse. Audio level was tremendously better than last time. Two points, I would like to clarify about Eclipse they mention. 1) They were not able to find a solid solution to ftp/upload on save with Eclipse.

I would probably use an automatic build with Ant. Ant is a software tool for automating the build process and has tight integration with Eclipse.

Here are a couple links that will point you in the right direct to accomplish FTP on save and other cool things with Ant.

[http://www.simonwhatley.co.uk/using-ant-with-eclipse](http://www.simonwhatley.co.uk/using-ant-with-eclipse)

[http://www.thecrumb.com/wiki/ant](http://www.thecrumb.com/wiki/ant) 2) They mention Eclipse is unable to edit multipe languages within one file such as a cfml file doesn't allow js coding help/hint. This is a three fold issue.

Eclipse Editor panel allow you to modify and save files. It is language specific. The problem with ColdFusion editing is you might be using multiple "languages" in one file such as CSS, JS, HTML, and ColdFusion. Which editor is opened is based on the file extension.

A good ColdFusion Eclipse plugin will actually be four language specific editors combined into one. It will include CSS, JS, HTML, and ColdFusion when viewing a cfml file. CFEclipse currently does html and cfm. Aptana has editors for CSS, HTML, and JS sepecific files but also doesn't combine them into one editor.

Eclipse termology and concepts are often blurred with developers. I would recommend a quick read, [Eclipse IDE pocket guide](http://www.amazon.com/Eclipse-IDE-Pocket-Guide-Burnette/dp/0596100655). This will clarify some ideas such as Editor panel, Plugins, Views, Perspectives, etc.
