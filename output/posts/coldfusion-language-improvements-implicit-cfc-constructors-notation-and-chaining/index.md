---
title: "ColdFusion language improvements - Implicit CFC Constructors, notation, and chaining"
date: 2011-11-22
categories:
  - "acf"
  - "cf-objective-anz"
  - "ColdFusion"
---

I attended [CFObjective ANZ](http://www.cfobjective.com.au/) this past week. Terrence Ryan announced [a lot of cool news about ColdFusion](/coldfusion-news-from-cfoanz-keynote-twister-thunder-more). I am going to doing a series over these announcements. The first post was about upcoming improvements with [CFFile update and For in loop CFScript support of Queries](http://mikehenke.com/coldfusion-language-improvements-content-within-cffile-and-for-in-loop-of-queries-in-cfscript). This post will show slides about CFC improvements with implicit constructors, notation, and chaining.   This first slides show how you would code the cfc to take advantage of implicit constructors.

| [![](images/P1000934.JPG)](https://picasaweb.google.com/lh/photo/H06n7McoymofT-4EqzLXyg?feat=embedwebsite) |
| ---------------------------------------------------------------------------------------------------------- |
| From [2011-11-18](https://picasaweb.google.com/henkemike/20111118?authuser=0&feat=embedwebsite)            |

This slide shows how you can then call the set on the cfc constructors.

| [![](images/P1000935.JPG)](https://picasaweb.google.com/lh/photo/pwF0JntnmWGaNi8_VMxrBw?feat=embedwebsite) |
| ---------------------------------------------------------------------------------------------------------- |
| From [2011-11-18](https://picasaweb.google.com/henkemike/20111118?authuser=0&feat=embedwebsite)            |

This slide shows how you can also set the values. I think this is different then using a set/get. This is very similiar to [ColdFusion on Wheels](http://cfwheels.org) ORM. Notice with this first call, the object is returning itself into the variable, **_mark_**, then setting something into the _**this**_ scope.

| [![](images/P1000936.JPG)](https://picasaweb.google.com/lh/photo/sRouvYpxoDhgIJ_a04bX5w?feat=embedwebsite) |
| ---------------------------------------------------------------------------------------------------------- |
| From [2011-11-18](https://picasaweb.google.com/henkemike/20111118?authuser=0&feat=embedwebsite)            |

This slide shows how you can chain menthod calls. This is showing setting actions but I would think you can chain any existing method calls.

| [![](images/P1000937.JPG)](https://picasaweb.google.com/lh/photo/FRBRovZ0AW2H2xghhzMaJQ?feat=embedwebsite) |
| ---------------------------------------------------------------------------------------------------------- |
| From [2011-11-18](https://picasaweb.google.com/henkemike/20111118?authuser=0&feat=embedwebsite)            |
