---
title: "Malformed uxxxx encoding in ant"
date: 2008-03-12
categories:
  - "Ant"
---

I had this issue, Malformed uxxxx encoding, when moving an ant variable into a properties file. I found this solution after a little hunting. [http://tinyurl.com/27ddb9](http://tinyurl.com/27ddb9)

Solution: Make sure you use '/' in all directory vars
