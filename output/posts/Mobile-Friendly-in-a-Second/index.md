---
title: Mobile Friendly in a Second
date: '2008-01-24'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ColdFusion
---

Make your site and rss feed mobile friendly in a second with help from google. You will have to have your <a href="http://meyerweb.com/eric/tools/dencoder/">url encoded</a>. Then add the encoded url to http://www.google.com/gwt/n?u=[YourEncodedURL]I used <a href="http://tinyurl.com/">tinyurl.com</a> to make the link manageable. I created a mobile directory and added an index.cfm file with a cflocation to the link, see <a href="http://mikehenke.com/mobile">http://mikehenke.com/mobile</a>. Test on your mobile devices and let me know how it works. My Site Example: <a href="http://tinyurl.com/32qboh"><strong>http://tinyurl.com/32qboh</strong></a><a href="http://www.google.com/gwt/n?u=http%3A%2F%2Fmikehenke.com">http://www.google.com/gwt/n?u=http%3A%2F%2Fmikehenke.com</a> My RSS Feed Example: <a href="http://tinyurl.com/38anof"><strong>http://tinyurl.com/38anof</strong></a><a href="http://www.google.com/reader/m/view/feed%2Fhttp%3A%2F%2Fmikehenke.com%2Fmachblog%2F%2Findex.cfm%3Fevent%3DshowBlogRss?bu=%2Fgwt%2Fn%3Fu%3Dhttp%253A%252F%252Fmikehenke.com%252Fmachblog%252Findex.cfm&amp;source=gwt">http://www.google.com/reader/m/view/feed%2Fhttp%3A%2F%2Fmikehenke.com%2Fmachblog%2F%2Findex.cfm%3Fevent%3DshowBlogRss?bu=%2Fgwt%2Fn%3Fu%3Dhttp%253A%252F%252Fmikehenke.com%252Fmachblog%252Findex.cfm&amp;source=gwt</a> I got the idea from a <a href="http://lifehacker.com/348465/use-google-reader-to-make-any-site-mobile+friendly">lifehacker post</a> and added to it.