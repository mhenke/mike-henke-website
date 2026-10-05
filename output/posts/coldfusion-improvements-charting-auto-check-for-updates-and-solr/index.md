---
title: ColdFusion improvements - Charting, Auto-Check for Updates, and Solr
date: '2011-11-23'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ACF
  - cf.Objective (ANZ)
  - ColdFusion
---

<a href="http://www.cfobjective.com.au/">CFObjective ANZ</a> announced <a href="/blog/coldfusion-news-from-cfoanz-keynote-twister-thunder-more/">a lot of cool news about ColdFusion</a>. I am doing a series over these announcements. The first post was about upcoming improvements with <a href="/blog/coldfusion-language-improvements-content-within-cffile-and-for-in-loop-of-queries-in-cfscript/">CFFile update and For in loop CFScript support of Queries</a>. The next was <a href="/blog/coldfusion-language-improvements-implicit-cfc-constructors-notation-and-chaining/">CFC improvements with implicit constructors, notation, and chaining</a>. This will be over ColdFusion Server auto update feature, CFChart adding html format, and several Solr enhancements.
<strong>ColdFusion Server Updates</strong>
This Auto-Check feature has a lot of developers that manage their servers excited. It seems you can select automatically check for updates at every login, schedule update checks at set interval like daily, send email notification when updates are found, and even set up a local update site. It seems you can have updates installed automatically through Admin UI or manually execute hot fix installer jar downloaded.

<table style="width: auto;" border="0">
<tbody>
<tr>
<td><a href="https://picasaweb.google.com/lh/photo/pbOKsEhTQYykGMX4Xg8jR9MTjNZETYmyPJy0liipFm0?feat=embedwebsite"><img src="https://lh5.googleusercontent.com/-5sdyML4p-AA/TsYK4bWR2tI/AAAAAAAAai8/ATUuHjkj0x0/s640/P1000917.JPG" alt="" width="640" height="480" /></a></td>
</tr>
<tr>
<td style="font-family:arial,sans-serif; font-size:11px; text-align:right">From <a href="https://picasaweb.google.com/henkemike/20111118?authuser=0&amp;feat=embedwebsite">2011-11-18</a></td>
</tr>
</tbody>
</table>

<strong>Charting Updates</strong>
Notice the format attribute can be set to html to generate a HTML chart.

<table style="width: auto;" border="0">
<tbody>
<tr>
<td><a href="https://picasaweb.google.com/lh/photo/p7o6OFNVDLcHGS9Oz3hfIdMTjNZETYmyPJy0liipFm0?feat=embedwebsite"><img src="https://lh4.googleusercontent.com/-D-HfwdLK44E/TsYLmXyAjuI/AAAAAAAAak8/COwWh528C1I/s640/P1000956.JPG" alt="" width="640" height="480" /></a></td>
</tr>
<tr>
<td style="font-family:arial,sans-serif; font-size:11px; text-align:right">From <a href="https://picasaweb.google.com/henkemike/20111118?authuser=0&amp;feat=embedwebsite">2011-11-18</a></td>
</tr>
</tbody>
</table>

HTML generated chart

<table style="width: auto;" border="0">
<tbody>
<tr>
<td><a href="https://picasaweb.google.com/lh/photo/RQMBSZboVbeJi4cLy2gXP9MTjNZETYmyPJy0liipFm0?feat=embedwebsite"><img src="https://lh5.googleusercontent.com/-_pU1-iXG2sc/TsYLoOSSgDI/AAAAAAAAalA/ChaQREfxp8U/s640/P1000958.JPG" alt="" width="640" height="480" /></a></td>
</tr>
<tr>
<td style="font-family:arial,sans-serif; font-size:11px; text-align:right">From <a href="https://picasaweb.google.com/henkemike/20111118?authuser=0&amp;feat=embedwebsite">2011-11-18</a></td>
</tr>
</tbody>
</table>

Solr updates like directly index database, custom fields, reload collections individually, and hibernate support added.

<table style="width: auto;" border="0">
<tbody>
<tr>
<td><a href="https://picasaweb.google.com/lh/photo/hBDLIIb1ryqbgQfUSn1Nw9MTjNZETYmyPJy0liipFm0?feat=embedwebsite"><img src="https://lh6.googleusercontent.com/-5G71vdFUe8Y/TsYK0bOOuPI/AAAAAAAAai0/4GcT54lk_nE/s640/P1000915.JPG" alt="" width="640" height="480" /></a></td>
</tr>
<tr>
<td style="font-family:arial,sans-serif; font-size:11px; text-align:right">From <a href="https://picasaweb.google.com/henkemike/20111118?authuser=0&amp;feat=embedwebsite">2011-11-18</a></td>
</tr>
</tbody>
</table>