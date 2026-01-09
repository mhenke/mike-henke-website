---
title: "Mobile Friendly in a Second"
date: 2008-01-24
categories:
  - "ColdFusion"
---

Make your site and rss feed mobile friendly in a second with help from google. You will have to have your [url encoded](http://meyerweb.com/eric/tools/dencoder/). Then add the encoded url to http://www.google.com/gwt/n?u=\[YourEncodedURL\] I used [tinyurl.com](http://tinyurl.com/) to make the link manageable. I created a mobile directory and added an index.cfm file with a cflocation to the link, see [http://mikehenke.com/mobile](http://mikehenke.com/mobile). Test on your mobile devices and let me know how it works. My Site Example: [**http://tinyurl.com/32qboh**](http://tinyurl.com/32qboh) [http://www.google.com/gwt/n?u=http%3A%2F%2Fmikehenke.com](http://www.google.com/gwt/n?u=http%3A%2F%2Fmikehenke.com) My RSS Feed Example: [**http://tinyurl.com/38anof**](http://tinyurl.com/38anof) [http://www.google.com/reader/m/view/feed%2Fhttp%3A%2F%2Fmikehenke.com%2Fmachblog%2F%2Findex.cfm%3Fevent%3DshowBlogRss?bu=%2Fgwt%2Fn%3Fu%3Dhttp%253A%252F%252Fmikehenke.com%252Fmachblog%252Findex.cfm&source=gwt](http://www.google.com/reader/m/view/feed%2Fhttp%3A%2F%2Fmikehenke.com%2Fmachblog%2F%2Findex.cfm%3Fevent%3DshowBlogRss?bu=%2Fgwt%2Fn%3Fu%3Dhttp%253A%252F%252Fmikehenke.com%252Fmachblog%252Findex.cfm&source=gwt) I got the idea from a [lifehacker post](http://lifehacker.com/348465/use-google-reader-to-make-any-site-mobile+friendly) and added to it.
