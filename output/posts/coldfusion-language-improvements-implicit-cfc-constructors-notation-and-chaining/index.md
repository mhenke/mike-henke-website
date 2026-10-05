---
title: >-
  ColdFusion language improvements - Implicit CFC Constructors, notation, and
  chaining
date: '2011-11-22'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ACF
  - cf.Objective (ANZ)
  - ColdFusion
---

I attended <a href="http://www.cfobjective.com.au/">CFObjective ANZ</a> this past week. Terrence Ryan announced <a href="/blog/coldfusion-news-from-cfoanz-keynote-twister-thunder-more/">a lot
 of cool news about ColdFusion</a>. I am going to doing a series over these 
announcements. The first post was about upcoming improvements with <a href="/blog/coldfusion-language-improvements-content-within-cffile-and-for-in-loop-of-queries-in-cfscript/">CFFile update and For in loop CFScript support of Queries</a>. This post will show slides about CFC improvements with implicit constructors, notation, and chaining.
 
This first slides show how you would code the cfc to take advantage of implicit constructors.

<table style="width: auto;" border="0">
<tbody>
<tr>
<td><a href="https://picasaweb.google.com/lh/photo/H06n7McoymofT-4EqzLXyg?feat=embedwebsite"><img src="https://lh6.googleusercontent.com/-oZiejlmY6T8/TsYLM_mEpDI/AAAAAAAAajw/KNqsjvhNofo/s640/P1000934.JPG" alt="" width="640" height="480" /></a></td>
</tr>
<tr>
<td style="font-family:arial,sans-serif; font-size:11px; text-align:right">From <a href="https://picasaweb.google.com/henkemike/20111118?authuser=0&amp;feat=embedwebsite">2011-11-18</a></td>
</tr>
</tbody>
</table>

This slide shows how you can then call the set on the cfc constructors.

<table style="width: auto;" border="0">
<tbody>
<tr>
<td><a href="https://picasaweb.google.com/lh/photo/pwF0JntnmWGaNi8_VMxrBw?feat=embedwebsite"><img src="https://lh5.googleusercontent.com/-3AR7tgq5b94/TsYLOki4bMI/AAAAAAAAaj0/s1LmxLB8Uhc/s640/P1000935.JPG" alt="" width="640" height="480" /></a></td>
</tr>
<tr>
<td style="font-family:arial,sans-serif; font-size:11px; text-align:right">From <a href="https://picasaweb.google.com/henkemike/20111118?authuser=0&amp;feat=embedwebsite">2011-11-18</a></td>
</tr>
</tbody>
</table>

This slide shows how you can also set the values. I think this is different then using a set/get. This is very similiar to <a href="http://cfwheels.org">ColdFusion on Wheels</a> ORM. Notice with this first call, the object is returning itself into the variable, <strong><em>mark</em></strong>, then setting something into the <em><strong>this</strong></em> scope.

<table style="width: auto;" border="0">
<tbody>
<tr>
<td><a href="https://picasaweb.google.com/lh/photo/sRouvYpxoDhgIJ_a04bX5w?feat=embedwebsite"><img src="https://lh6.googleusercontent.com/-ZIBXBH33ZLM/TsYLQPgbijI/AAAAAAAAaj4/hJbJ5egQ354/s640/P1000936.JPG" alt="" width="640" height="480" /></a></td>
</tr>
<tr>
<td style="font-family:arial,sans-serif; font-size:11px; text-align:right">From <a href="https://picasaweb.google.com/henkemike/20111118?authuser=0&amp;feat=embedwebsite">2011-11-18</a></td>
</tr>
</tbody>
</table>

This slide shows how you can chain menthod calls. This is showing setting actions but I would think you can chain any existing method calls.

<table style="width: auto;" border="0">
<tbody>
<tr>
<td><a href="https://picasaweb.google.com/lh/photo/FRBRovZ0AW2H2xghhzMaJQ?feat=embedwebsite"><img src="https://lh4.googleusercontent.com/-QrRgRoATLo0/TsYLRuc3y6I/AAAAAAAAaj8/_rxkgGmCBhk/s640/P1000937.JPG" alt="" width="640" height="480" /></a></td>
</tr>
<tr>
<td style="font-family:arial,sans-serif; font-size:11px; text-align:right">From <a href="https://picasaweb.google.com/henkemike/20111118?authuser=0&amp;feat=embedwebsite">2011-11-18</a></td>
</tr>
</tbody>
</table>