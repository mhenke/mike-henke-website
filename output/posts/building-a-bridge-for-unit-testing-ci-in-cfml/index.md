---
title: Building a bridge for Unit Testing - CI in CFML
date: '2011-12-15'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ColdFusion
  - Jenkins
---

I would like to use unit testing and Jenkins, open-source continuous integration server, for Continuous integration (CI). CI "aims to improve the quality of software, and to reduce the time taken to deliver it, by replacing the traditional practice of applying quality control after completing all development" from <a href="http://en.wikipedia.org/wiki/Continuous_integration">wikipedia</a>. 
<em>After every presentation of unit testing and ci, I think this is the way to go.</em> I get back to the office and then the <strong>barriers to fully adopting seem too large.</strong> Time crunch is the biggested. Pretty much it comes to time needed to get a build script, ci server, source control, and <strong>THEN UNIT TESTS</strong>.
ColdFusion developers need <strong>a simple intermediate step</strong> between their <em>current process</em> to <em>full blown unit testing and CI</em>. This isn't the ultimate solution <strong>probably CF unit testing and ci gurus are wanting</strong> but it creates an intermediate step to their goal. Let's call this intermediate step a "<em>bridge</em>". Hat tip to "<a href="http://www.amazon.com/Driving-Technical-Change-Terrence-Ryan/dp/1934356603">Driving Technical Change</a>" which gave me this idea for better articulating what I am looking for <em>as an average developer in an average cfml shop</em>.
For this to happen from my perspective, a simple "<em>bridge</em>" needs to be developed like an ANT task to run a CFML compile test. This would allow an easy way to implement <strong>CI with CFML</strong> code allowing average ColdFusion developers and managers to <em>immediately see CI benefits and improved productivity without much upfront investment</em>. This middle step would <strong>open the door for more comprehensive unit testing</strong> and automating the build process. The middle step's build script could even do CSS Lint, JSLint, and clean up some stuff. Nothing full blown. It might not even automate fully the build process. These next steps like fully automating the build process and add actual units can come later.
<h2>Thoughts?<br /></h2>