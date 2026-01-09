---
title: "Coldfusion with Selenium ant script"
date: 2007-09-17
categories:
  - "Ant"
  - "ColdFusion"
  - "Selenium"
---

I have been wanting to do a [Selenium](http://www.openqa.org/selenium/) ant script since John Paul Ashenfelter's presentation on Testing CF applications @ CFUnited 2007. Selenium is a test tool for web applications. It has a very simple html table structure for creating suites and tests. I use [Selenenium IDE](http://www.openqa.org/selenium-ide/) for Firefox to create initial scripts and save it as a cfm file. Then added the ColdFusion functionality such as random username generation for testing a new user process. Please read [Selenium Core](http://www.openqa.org/selenium-core/) documentation link. The links include installation, quick start, and concepts. **The core needs to be placed somewhere under web root.** You will need the [Selenium Remote Control](http://www.openqa.org/selenium-rc/) for the selenium-server.jar but for convience I included it the zip. Within the jar, we will be accessing the [SeleneseAntTask](http://release.openqa.org/selenium-remote-control/0.9.0/doc/server/org/openqa/selenium/server/ant/SeleneseAntTask.html). The [seleniun_ant_task.zip](http://mikehenke.com/machblog//uploads/enclosures/seleniun%5Fant%5Ftask%2Ezip) includes the build.xml, selenium-server.jar, testsuite.cfm, and test.cfm Note: I had to use selenium-remote-control-0.9.2-20070913.164243-129-dist.zip for the selenium-server.jar to solve the issues "[Preparing Firefox profile...](http://jira.openqa.org/browse/SRC-225)" _Directions and content of the zip:_ \_seleniumTask folder contains build.xml and selenium-server.jar. This folder can be placed anywhere. Build.xml will need the seleiumDir and resultsDir set.

tests folder contains testSuite.cfm and test.cfm. This folder **needs to be placed in the selenium core folder over the exisiting tests folder.**

files:  
build.xml - ant script to run Selenium test  
testSuite.cfm - contains the html to reference test.cfm  
test.cfm - tests http://mikehenke.com search\_ Please send me any enhancements and I'll add them to the zip.
