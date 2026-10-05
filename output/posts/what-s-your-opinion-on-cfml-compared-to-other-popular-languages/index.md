---
title: What&#039;s your opinion on CFML compared to other popular languages?
date: '2012-03-08'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ACF
  - ColdFusion
  - OpenBD
  - Railo
---

<a href="http://www.coreyspitzer.net/">Corey Spitzer</a> tweeted me a question on <a href="http://en.wikipedia.org/wiki/ColdFusion">ColdFusion</a>. It is great to see interest in CFML specially from people like Corey since he is very activity in the developer and entrepreneurial community in Omaha. He specifically asked me to be objective.
<strong>@coreyspitzer: @mikehenke What's your opinion on CFML compared to other popular languages as far as popularity, dev time, leanness/bloat, tools, etc?</strong>
Comparing<strong> </strong>is hard since CFML is very flexible and almost can be thought of a technology to glue other technologies together from email servers, database systems, and other technologies. The big take away is "ColdFusion should make hard things, very easy". Here is my attempt at his request.
<h2>Populartiy</h2>
Popularity is hard to rate since many ColdFusion applications are behind firewalls and not easily tallied. With that said, we can use some basic markers like <a href="https://github.com/">Github</a> and <a href="http://www.tiobe.com/index.php/content/paperinfo/tpci/index.html">TOIBE</a>. <a href="https://github.com/languages/ColdFusion">On Github CFML is currently 36</a>. It moved up one slot I am pretty sure but has hovered around this general location for a year or so. TOIBE is a great, controversial example of rating language popularity. Several years ago TOIBE dropped ColdFusion due to it not being a "real" language but recently added back it as CFML. When it was originally in TOIBE I think it was fairly high. Currently, it broke the top 50.
Another factor in popularity maybe proprietary, closed source verses open source solutions. With the open source CFML engines like <a href="http://www.getrailo.org/">Railo</a> and <a href="http://www.openbluedragon.org/">OpenBD</a>, it gives more opportunity for a startup to use ColdFusion without upfront cost. This goes with an idea of “when an application has ever gotten smaller” so I see popularity increasing.
<a href="http://www.adobe.com/products/coldfusion-family.html">Adobe ColdFusion</a> is very popular in government and private sector.
<h3>Omaha</h3>
In Omaha, the demand for ColdFusion developers seems fairly high. I know of 6 companies looking for developers. One is hiring 6 positions.
<h2>Development Time</h2>
I have used ColdFusion only since I entered the workforce. In general would say if a CFML project is over 3 months something might be off. It is about rapid development.
<h2>Leanness/Bloat</h2>
It all depends on the developers working on the projects :-) Use <a href="https://github.com/seancorfield/fw1/">FW1</a> or <a href="http://cfwheels.org/">CFWheels</a> and a CSS / JS framewrok and it should be pretty lean while focusing on the DRY principle. Legacy code with a developer copying pasting thousands of line, you'll have a lot of bloat.
CFML's was built for non-programmers. It was originally built for someone, likely not a computer science background or even programming background, to connect a website to a database. The only person needed was familiarity with HTML thus why CFML has tags. As you can imagine, the ease of use can cause problems with code since a novice can start creating cool, functioning applications without much thought about good coding practices.
Legacy applications I work with in ColdFusion are usually developed by a programmer with not much experience and after a while the developer just repeats their initial learning over and over since it "works" and they can get out features fast. Their initial attempts may not be the best for maintainability or adapting to code changes.
Object Oriented programming, MVC concepts weren't common. As the software industry has matured so has ColdFusion and a smaller group of CFML developers. It all depends on who is coding the application and their experience. Hopefully, they have learned from previous work and know there are probably better, leaner ways to accomplish their task.
<h2>Tools</h2>
Tools is general and I'll focus on editors. CFML has various editing options, Dreamweaver, Eclipse with different plugins (<a href="http://cfeclipse.org/">CFEclipse</a> and <a href="http://www.adobe.com/products/coldfusion-builder/features.html">ColdFusion Builder</a>), Sublime and CFML packages. I would refer to Charlie Arehart's <a href="http://carehart.org/cf411/">CF411</a> page for tools.