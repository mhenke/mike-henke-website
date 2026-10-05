---
title: Google Page Speed Service Comparison with my site
date: '2011-07-29'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ColdFusion
---

During my morning Google Reader review, I noticed a couple posts on <a href="http://code.google.com/speed/pss/">Google Page Speed Service</a>   (<a href="http://googlecode.blogspot.com/2011/07/page-speed-service-web-performance.html">Page Speed Service: Web performance, delivered</a> and <a href="http://www.sitepoint.com/google-page-speed-service">Will You Use Google’s New Page Speed Service?</a> ) so I decided to run the <a href="http://www.webpagetest.org/">comparison test</a> against Henke.ws. It is a simple blog site using <a href="http://www.mangoblog.org/">MangoBlog</a> and <a href="http://en.wikipedia.org/wiki/ColdFusion">ColdFusion</a>. Here are the test results.
<img src="http://mikehenke.com/assets/content/gps1.jpg" alt="" width="640" height="400" />
Below is the current page speed scorecard.
<img src="http://mikehenke.com/assets/content/gps2.jpg" alt="" width="640" height="400" />
This is the Google Page Speed service scorecard.
<img src="http://mikehenke.com/assets/content/gps3.jpg" alt="" width="640" height="400" />
This is the current page performance results.
<img src="http://mikehenke.com/assets/content/gps4.jpg" alt="" />
This is the Google Page Speed service performance results.
<img src="http://mikehenke.com/assets/content/gps5.jpg" alt="" width="640" height="400" />
<h2>Conclusion<br /></h2>
I filled out <a href="https://docs.google.com/a/google.com/spreadsheet/viewform?hl=en_US&amp;formkey=dDdjcmNBZFZsX2c0SkJPQnR3aGdnd0E6MQ">the form to try the service</a>. The real saving was compression of the document from nearly 500 kb to 200 kb and requests from repeated views (32 to 10). Suprisingly repeated load times, seemed to decrease but first view was slightly faster. The <a href="http://www.webpagetest.org/result/110729_65_b9af2a0b62794b475085c12c42190db0/">full results</a> are here for you to review and dig through. The Visual Comparison is pretty wicked.