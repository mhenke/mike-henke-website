---
title: I want Eclipse to be like Dreamweaver
date: '2011-03-10'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ColdFusion
  - ColdFusion Builder
  - Eclipse
---

I have a friend who emailed me last night after downloading <a href="http://labs.adobe.com/technologies/coldfusionbuilder2/">a public beta</a> for Adobe's second generation of an IDE based on <a href="http://www.eclipse.org">Eclipse</a> which enables developers to rapidly build, deploy, and maintain robust Internet applications for the enterprise.
He had two gripes: Key Assists and Auto-closing tags. I'll show how to turn the Eclipse based IDE he downloaded into a more Dreamweaver like experience. Go ahead, <a href="http://www.adobe.com/cfusion/entitlement/index.cfm?e=labs_coldfusionbuilder2">download and install ColdFusion Builder 2</a> so you can walk through these steps with me. <em><strong>UPDATED:</strong></em> <em>The installation can be as an Eclipse plugin or standalone.</em>
Please forgive me since I haven't used Dreamweaver in years, so feel free to contribute comments on other ways you make Eclipse more like Dreamweaver.
<h2>Key Assists</h2>
Under the Window --&gt; Preferences --&gt; ColdFusion --&gt; Profiles, select Dreamweaver. That is it. Now you should have Dreamweaver shortcuts and even color coding.
<img src="/images/mde/mde1.jpg" alt="" />
<h2>Auto-closing Tags</h2>
Eclipse's preferences are sometime hard to find settings. With the Preferences window still up type "Typing" in the filter and select Typing under ColdFusion --&gt; Profiles --&gt; Editor. On the Typing panel, under Auto-close tags select "When typing '&gt;' of start tag". Then repeat this general process for the other Typing panels under HTML.
<img src="/images/mde/mde2.jpg" alt="" />
This concludes my post about how to make Eclipse more like Dreamweaver.