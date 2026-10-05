---
title: tsvncache.exe is a cpu hog - fix
date: '2008-04-08'
author: Mike Henke
layout: layouts/post.njk
categories:
  - Subversion
---

<font size="2" face="Verdana"><span style="font-size: 10pt; font-family: Verdana;">I have noticed tsvncache.exe is a cpu hog on my computer. Tsvncache.exe collects data needed to display the icon overlays for TortoiseSVN.</span></font>
<strong><font size="2" face="Verdana"><span style="font-size: 10pt; font-family: Verdana;">Fix:</span></font></strong><font size="2" face="Verdana"><span style="font-size: 10pt; font-family: Verdana;"> <br />
</span></font>
<font size="2" face="Verdana"><span style="font-size: 10pt; font-family: Verdana;">Right-click desktop, TortoiseSVN </span></font><font size="2" face="Wingdings"><span style="font-size: 10pt; font-family: Wingdings;"><font face="Verdana">--&gt; </font></span></font><font size="2" face="Verdana"><span style="font-size: 10pt; font-family: Verdana;">settings </span></font><font size="2" face="Wingdings"><span style="font-size: 10pt; font-family: Wingdings;"><font face="Verdana">--&gt; </font></span></font><font size="2" face="Verdana"><span style="font-size: 10pt; font-family: Verdana;">Icon Overlay: <br />
</span></font>
<font size="2" face="Verdana"><span style="font-size: 10pt; font-family: Verdana;">1) System cache - Set either to Shell or None (mouse over options to see what they do and which one will work best for you)</span></font>
<font size="2" face="Verdana"><span style="font-size: 10pt; font-family: Verdana;">And/Or</span></font><font size="2" face="Verdana"><span style="font-size: 10pt; font-family: Verdana;"> </span></font>
<font size="2" face="Verdana"><span style="font-size: 10pt; font-family: Verdana;">2) Set Excluding/Including paths</span></font>