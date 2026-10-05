---
title: Ringo - Selenium Framework by Google
date: '2008-04-20'
author: Mike Henke
layout: layouts/post.njk
categories:
  - Presentations
  - Selenium
---

After writing <a href="http://mikehenke.com/machblog//index.cfm?event=showEntry&amp;entryId=24AF689E-19B9-BA51-EE2BA7F4A9926E4E">Selenium is NOT a framework</a>, I rediscovered a presentation from Google Automating Testing Conference. It was pretty good (I think I watched it before but it didn't click). Google has developed a Selenium Framework called Ringo.
Their Selenium Framework goal is simplicity and flexibilty. Ringo has three layers: application config, ui map (heart of framework), and data map. The presenation doesn't cover specifically Ringo but ideas/best practices behind the framework developed like test case data references initial common data but can overwrite properties that need to change thus reduces data redundancy. 
Another interesting tibit is the Google team seems to have extended Firebug to create an xml skeleton for the ui map. Here is another <a href="http://adam.goucher.ca/?p=339">review of the presentation</a>. Here is the <a href="http://www.youtube.com/v/hWQdCdH77NA&amp;hl=en">presentation video</a> and the <a href="http://blanconet.googlepages.com/GTAC_SeleniumFramework.pdf">presentation slides</a>. I might watch again with the slides. I didn't discover the slides till after watching the presentation.