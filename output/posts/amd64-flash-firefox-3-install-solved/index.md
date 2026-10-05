---
title: AMD64 Flash Firefox 3 install (solved)
date: '2008-09-06'
author: Mike Henke
layout: layouts/post.njk
categories:
  - Ubuntu
---

I installed <a href="http://www.xubuntu.org/">Xubuntu</a> 8.04 for better performance but some reason Firefox and Flash won't work properly for Adobe Connect recordings. My laptop is an Acer AMD Turion 64 so the normal Flash installation woudn't work. Here is what I did (I tried many things but think this is what worked).
I ran the getFlash script from <a href="http://ubuntuforums.org/showthread.php?t=772490">here</a>.
But Firefox 3.0.1 still wouldn't run Flash after <a href="http://www.adobe.com/shockwave/welcome/">testing</a>. So I <a href="http://tracylogan.com/index.cfm?event=showEntry&amp;entryId=69F02856-CB4A-5614-94008AC150ED0B51">found</a> and ran this command:
<em>sudo ln -sf /usr/lib/nspluginwrapper/plugins/npwrapper.libflashplayer.so /usr/lib/firefox-3.0.1/plugins/</em>
Well, Flash was working but not any Adobe Breeze recordings. I next <a href="http://ubuntuforums.org/showthread.php?p=1174435">found</a> and ran this command:
<em>sudo apt-get install lib32nss-mdns</em>
And now everything seems to be working great.