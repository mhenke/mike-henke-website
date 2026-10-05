---
title: CFEclipse / Eclipse - Show Annotations
date: '2008-07-23'
author: Mike Henke
layout: layouts/post.njk
categories:
  - CFEclipse
  - Eclipse
---

I did a quick search for good examples of the Show Annotations feature in Eclipse but didn't find any so I figured I would post some. I also checked Eclipse's documentation and found none. The closest I came was <a href="http://www.thecrumb.com/2008/02/07/cfeclipse-in-the-gutter/">a post</a> by Jim <strike>Crumb</strike> Priest.
Starting in the the Navigator View, I right-click on the file, then select Team --&gt; Show Annotation
<img src="http://mikehenke.com/machblog/images/showAnnotation1.jpg" alt="Show Annotation" />
Then after the file processes, the file appears in my Editor panel. In the gutter, I have information related to each line and how it got to the current state. If I mouse-over the line number, I get information about the line and it "boxs" out the other lines also changed with the specific commit.
<img src="http://mikehenke.com/machblog/images/showAnnotation2.jpg" alt="Show Annotation" />
This last image shows different options to customize the coloring and information shown in the gutter by right-clicking on the gutter.
<img src="http://mikehenke.com/machblog/images/showAnnotation3.jpg" alt="Show Annotation" />