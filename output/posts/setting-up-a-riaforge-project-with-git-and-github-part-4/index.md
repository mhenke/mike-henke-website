---
title: Setting Up a Riaforge Project with Git and GitHub (Part 4)
date: '2010-02-21'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ColdFusion
  - Github
excerpt: "<a href=\"http://www.riaforge.org\">Riaforge</a>\r\n recently added an input field for external source control sites and <a href=\"http://www.github.com/\">Github</a>\r\n now <a href=\"/post.cfm/github-recognizes-cfml\">recognizes ColdFusion syntax</a>.\r\n With these two announcements, I will demonstrate how to edit your \r\nRiaforge project information for Github . I will use <a href=\"http://jtidy.riaforge.org/\">jTidy\r\n cfc</a> for the example.\r\nFilling from top to bottom of the Edit project page, you will proceed\r\n normal until <strong>External Project URL</strong> and <strong>External Download URL</strong>."
---

<a href="https://www.riaforge.org">Riaforge</a> recently added an input field for external source control sites and <a href="http://www.github.com/">Github</a> now <a href="/blog/github-recognizes-cfml/">recognizes ColdFusion syntax</a>. With these two announcements, I will demonstrate how to edit your Riaforge project information for Github. I will use <a href="https://jtidy.riaforge.org/">jTidy cfc</a> for the example.
Filling from top to bottom of the Edit project page, you will proceed normally until <strong>External Project URL</strong> and <strong>External Download URL</strong>.
<h3>Example</h3>
External Project URL: <a href="http://github.com/mhenke/jtidy_cfc"><em>http://github.com/mhenke/jtidy_cfc</em> </a><br />External Download URL: <a href="http://github.com/mhenke/jtidy_cfc/downloads"><em>http://github.com/mhenke/jtidy_cfc/downloads</em></a>
<img src="/images/riaforge4_1.jpg" alt="" width="640" height="108" />
The next field you will be concerned with is<strong> "Enable blogging?"</strong>, select Yes. 
In the "<strong>If your project has a blog already, enter the URL here:</strong>" field put your blog or the github url you used in the "<strong>External Project URL</strong>". <a><em>http://mikehenke.com</em></a>
 In the "<strong>If your project has a blog already, enter the RSS URL here:</strong>" field put the github rss feed for your commits here. <a href="http://github.com/feeds/mhenke/commits/jtidy_cfc"><em>http://github.com/feeds/mhenke/commits/jtidy_cfc</em></a>
In the "<strong>Enable bug tracker?</strong>" field, select No.
In the "<strong>If your project has a bugtracker already, enter the URL here</strong>:" field put github issue tracker for your repository. <a href="http://github.com/mhenke/jtidy_cfc/issues"><em>http://github.com/mhenke/jtidy_cfc/issues</em></a>
In the "<strong>Enable wiki?</strong>" field, select No.
In the "<strong>If your project has an existing wiki, enter the URL here:</strong>" field, put the github wiki url for your repository here. <a href="http://wiki.github.com/mhenke/jtidy_cfc"><em>http://wiki.github.com/mhenke/jtidy_cfc</em></a>
In the "<strong>Enable Subversion?</strong>", select No.
In the "<strong>If your project has an external source control site, enter the URL here:</strong>" put your read-only github url here. <em>git://github.com/mhenke/jtidy_cfc.git</em>
<img src="/images/riaforge4_2.jpg" alt="" width="640" height="400" />
Now submit the updated information. Hopefully this helps you on using Riaforge and Github.