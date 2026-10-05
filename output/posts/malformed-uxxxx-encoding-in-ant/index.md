---
title: Malformed uxxxx encoding in ant
date: '2008-03-12'
author: Mike Henke
layout: layouts/post.njk
categories:
  - Ant
---

I had this issue, Malformed uxxxx encoding, when moving an ant variable into a properties file. I found this solution after a little hunting. <a href="http://tinyurl.com/27ddb9">http://tinyurl.com/27ddb9</a>

 

<font face="Verdana, Arial" size="2">Solution: Make sure you use '/' in all directory vars </font>