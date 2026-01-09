---
title: "AMD64 Flash Firefox 3 install (solved)"
date: 2008-09-06
categories:
  - "Ubuntu"
---

I installed [Xubuntu](http://www.xubuntu.org/) 8.04 for better performance but some reason Firefox and Flash won't work properly for Adobe Connect recordings. My laptop is an Acer AMD Turion 64 so the normal Flash installation woudn't work. Here is what I did (I tried many things but think this is what worked). I ran the getFlash script from [here](http://ubuntuforums.org/showthread.php?t=772490). But Firefox 3.0.1 still wouldn't run Flash after [testing](http://www.adobe.com/shockwave/welcome/). So I [found](http://tracylogan.com/index.cfm?event=showEntry&entryId=69F02856-CB4A-5614-94008AC150ED0B51) and ran this command: _sudo ln -sf /usr/lib/nspluginwrapper/plugins/npwrapper.libflashplayer.so /usr/lib/firefox-3.0.1/plugins/_ Well, Flash was working but not any Adobe Breeze recordings. I next [found](http://ubuntuforums.org/showthread.php?p=1174435) and ran this command: _sudo apt-get install lib32nss-mdns_ And now everything seems to be working great.
