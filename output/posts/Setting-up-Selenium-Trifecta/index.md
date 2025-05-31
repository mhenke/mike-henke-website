---
title: "Setting up Selenium Trifecta"
date: 2008-09-10
categories: 
  - "ColdFusion"
  - "Selenium"
---

I will be doing a series for ColdFusion developers to setup, use the Selnium Trifecta, and incorporate Selenium tests into MXUnit.Â  The first entry will show how to setup [Selenium Core](http://selenium-core.openqa.org/), [Selenium Remote Control](http://selenium-rc.openqa.org/), and [Selenium Grid](http://selenium-grid.openqa.org/).Â  These tools will enable you to do extensive acceptance testing across browsers and operating systems.Â  Next entry will show how to create, run a selenium test, then refactor the test, so we seperate the test data from the test actions making it easier to re-use. I will be startng with a fresh instance of [Xubuntu](http://xubuntu.org/) but any OS/Web Server will work. install apache  
_sudo apt-get install apache2  
_/var/www is my apache web root so I ran _sudo chmod -R 777 /var/www  
_  
test by opening browser and going to http://localhost/  
  
[Download Selenium Core](http://release.openqa.org/selenium-core/1.0-beta-1/) (Hat tip to [Jim Priest](http://www.thecrumb.com/2008/04/01/selenium-10-beta/) for finding the link)  
use the selenium-core-1.0-beta-1.zip link  
  
unzip and rename folder selenium, then drop in web root (my example /var/www/)  
  
open up browser and try:  
http://localhost/selenium  
  
I got access denied so I ran again:  
_sudo chmod -R 777 /var/www_  
  
Bingo.Â  It works. You should see this. ![Selenium Test Runner home page](images/SeleniumSP.jpg)  
Select the Selenium TestSuite link then press the Run All Tests button.Â  This will run the sample Selenium test suite. ![Selenium Run All Test option](images/SeleniumTR.jpg)  
[Download Selenium-RC](http://selenium-rc.openqa.org/download.html )  
Version 1.0 beta 1  
Use the Major release link  
Unzip, rename rc, then drop in selenium folder (my example /var/www/selenium/)  
  
[SeleniumGRID](http://selenium-grid.openqa.org/download.html)  
Current Release (1.0.1)  
Binary Distribution  
Use the selenium-grid-1.0.1-bin.tar.bz2 link  
Unzip, rename to sg, then drop in selenium folder (my example /var/www/selenium/)  
  
run just to make sure we have permissions:  
_sudo chmod -R 777 /var/www_  
  
Commands 1) change to selenium grid folder, 2) check our ant version is 1.7.0, 3) see if selenium grid is setup  
  
_cd /var/www/selenium/sg  
ant -version  
ant sanity-check_ ![Selenium Grid Success](images/sgSuccess.jpg) Â I am going to keep this short and to the point.Â  Now we have the Selenium Trifecta setup.Â  Any questions please let me know.
