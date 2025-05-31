---
title: "tsvncache.exe is a cpu hog - fix"
date: 2008-04-08
categories: 
  - "Subversion"
---

I have noticed tsvncache.exe is a cpu hog on my computer. Tsvncache.exe collects data needed to display the icon overlays for TortoiseSVN. **Fix:**  
Right-click desktop, TortoiseSVN \--> settings \--> Icon Overlay:  
1) System cache - Set either to Shell or None (mouse over options to see what they do and which one will work best for you) And/Or 2) Set Excluding/Including paths
