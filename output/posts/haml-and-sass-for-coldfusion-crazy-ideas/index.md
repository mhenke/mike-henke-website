---
title: "haml and sass for ColdFusion | crazy ideas"
date: 2010-09-16
categories: 
  - "ColdFusion"
  - "openbd"
  - "railo"
---

I recently took a Rails two day class and was exposed to [haml](http://haml-lang.com) and [sass](http://sass-lang.com) toward the end of the training. Similar projects about reducing the noise and ugliness of basic html and css markup. haml for cfml might look like this.

\[code language="coldfusion"\] #profile .left.column #date= print\_date #address= current\_user.address .right.column #email= current\_user.email #bio= current\_user.bio \[/code\] instead of the norm cfml and html

\[code language="coldfusion"\]

#print\_date#

#current\_user.address#

#current\_user.email#

#current\_user.bio#

\[/code\] SASS would have the same effect for css but is easier to implement since it doesn't affect the CFML engine. Today an article was posted about [Compass, SASS, CakePHP](http://weblog.robwilkerson.org/post/1131885328/compass-sass-cakephp) and could easily be adapted for cfml.
