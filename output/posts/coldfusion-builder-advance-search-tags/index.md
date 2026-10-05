---
title: ColdFusion Builder Advance Search = Tags
date: '2011-04-20'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ColdFusion
  - ColdFusion Builder
---

A cool feature of <a href="http://www.adobe.com/products/coldfusion-builder.html">ColdFusion Builder 2.0</a> is the Advance ColdFusion Search with tags. This is pretty sweet for example today I wanted to find all the <strong>cffile</strong> tags with the action <strong>write</strong>. Let's open up the search, Search --&gt; ColdFusion Search, to see what I am talking about. This is slightly different then normal Eclipse searches (ctrl-h).
Once the window is open, you should see a field called Search. This is defaulted to Text, but lets select <strong>Tag</strong>. This resets the window and adds "Choose Tag" with a Conditions area. So continuing with my example, for "Choose Tag" select or type cffile. In the Conditions, leave Match as "<em><strong>Any of these conditions</strong></em>", leave Conditions as "<em><strong>With attribute</strong></em>", type or select <em><strong>action</strong></em> in the next field, then <em><strong>is</strong></em>, and finally in the last input type "<em><strong>write</strong></em>". You should end up with something like this screenshot.
<img src="/assets/content/cfbst.jpg" alt="" width="640" height="400" />
Select "Find All" and in the search view a list of all the cffile tags with the action of write will appear.