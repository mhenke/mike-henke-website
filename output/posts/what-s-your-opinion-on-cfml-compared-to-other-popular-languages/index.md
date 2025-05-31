---
title: "What's your opinion on CFML compared to other popular languages?"
date: 2012-03-08
categories: 
  - "acf"
  - "ColdFusion"
  - "openbd"
  - "railo"
---

[Corey Spitzer](http://www.coreyspitzer.net/) tweeted me a question on [ColdFusion](http://en.wikipedia.org/wiki/ColdFusion). It is great to see interest in CFML specially from people like Corey since he is very activity in the developer and entrepreneurial community in Omaha. He specifically asked me to be objective. **@coreyspitzer: @mikehenke What's your opinion on CFML compared to other popular languages as far as popularity, dev time, leanness/bloat, tools, etc?** Comparing is hard since CFML is very flexible and almost can be thought of a technology to glue other technologies together from email servers, database systems, and other technologies. The big take away is "ColdFusion should make hard things, very easy". Here is my attempt at his request.

## Populartiy

Popularity is hard to rate since many ColdFusion applications are behind firewalls and not easily tallied. With that said, we can use some basic markers like [Github](https://github.com/) and [TOIBE](http://www.tiobe.com/index.php/content/paperinfo/tpci/index.html). [On Github CFML is currently 36](https://github.com/languages/ColdFusion). It moved up one slot I am pretty sure but has hovered around this general location for a year or so. TOIBE is a great, controversial example of rating language popularity. Several years ago TOIBE dropped ColdFusion due to it not being a "real" language but recently added back it as CFML. When it was originally in TOIBE I think it was fairly high. Currently, it broke the top 50. Another factor in popularity maybe proprietary, closed source verses open source solutions. With the open source CFML engines like [Railo](http://www.getrailo.org/) and [OpenBD](http://www.openbluedragon.org/), it gives more opportunity for a startup to use ColdFusion without upfront cost. This goes with an idea of “when an application has ever gotten smaller” so I see popularity increasing. [Adobe ColdFusion](http://www.adobe.com/products/coldfusion-family.html) is very popular in government and private sector.

### Omaha

In Omaha, the demand for ColdFusion developers seems fairly high. I know of 6 companies looking for developers. One is hiring 6 positions.

## Development Time

I have used ColdFusion only since I entered the workforce. In general would say if a CFML project is over 3 months something might be off. It is about rapid development.

## Leanness/Bloat

It all depends on the developers working on the projects :-) Use [FW1](https://github.com/seancorfield/fw1/) or [CFWheels](http://cfwheels.org/) and a CSS / JS framewrok and it should be pretty lean while focusing on the DRY principle. Legacy code with a developer copying pasting thousands of line, you'll have a lot of bloat. CFML's was built for non-programmers. It was originally built for someone, likely not a computer science background or even programming background, to connect a website to a database. The only person needed was familiarity with HTML thus why CFML has tags. As you can imagine, the ease of use can cause problems with code since a novice can start creating cool, functioning applications without much thought about good coding practices. Legacy applications I work with in ColdFusion are usually developed by a programmer with not much experience and after a while the developer just repeats their initial learning over and over since it "works" and they can get out features fast. Their initial attempts may not be the best for maintainability or adapting to code changes. Object Oriented programming, MVC concepts weren't common. As the software industry has matured so has ColdFusion and a smaller group of CFML developers. It all depends on who is coding the application and their experience. Hopefully, they have learned from previous work and know there are probably better, leaner ways to accomplish their task.

## Tools

Tools is general and I'll focus on editors. CFML has various editing options, Dreamweaver, Eclipse with different plugins ([CFEclipse](http://cfeclipse.org/) and [ColdFusion Builder](http://www.adobe.com/products/coldfusion-builder/features.html)), Sublime and CFML packages. I would refer to Charlie Arehart's [CF411](http://carehart.org/cf411/) page for tools.
