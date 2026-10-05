---
title: haml and sass for ColdFusion &#124; crazy ideas
date: '2010-09-16'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ColdFusion
  - OpenBD
  - Railo
---

I recently took a Rails two day class and was exposed to <a href="http://haml-lang.com">haml</a> and <a href="http://sass-lang.com">sass</a> toward the end of the training. Similar projects about reducing the noise and ugliness of basic html and css markup.
haml for cfml might look like this.



```coldfusion
#profile
  .left.column
    #date= print_date
    #address= current_user.address
  .right.column
    #email= current_user.email
    #bio= current_user.bio
```

instead of the norm cfml and html


```coldfusion
<cfoutput>
<div id="profile">
<div class="left column">
<div id="date">#print_date#</div>
<div id="address">#current_user.address#</div>
</div>
<div class="right column">
<div id="email">#current_user.email#</div>
<div id="bio">#current_user.bio#</div>
</div>
</div>
</cfoutput>
```

SASS would have the same effect for css but is easier to implement since it doesn't affect the CFML engine. Today an article was posted about <a href="http://weblog.robwilkerson.org/post/1131885328/compass-sass-cakephp">Compass, SASS, CakePHP</a> and could easily be adapted for cfml.