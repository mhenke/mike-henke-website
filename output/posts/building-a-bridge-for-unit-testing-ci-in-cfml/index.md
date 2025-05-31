---
title: "Building a bridge for Unit Testing - CI in CFML"
date: 2011-12-15
categories: 
  - "ColdFusion"
  - "jenkins"
---

I would like to use unit testing and Jenkins, open-source continuous integration server, for Continuous integration (CI). CI "aims to improve the quality of software, and to reduce the time taken to deliver it, by replacing the traditional practice of applying quality control after completing all development" from [wikipedia](http://en.wikipedia.org/wiki/Continuous_integration). _After every presentation of unit testing and ci, I think this is the way to go._ I get back to the office and then the **barriers to fully adopting seem too large.** Time crunch is the biggested. Pretty much it comes to time needed to get a build script, ci server, source control, and **THEN UNIT TESTS**. ColdFusion developers need **a simple intermediate step** between their _current process_ to _full blown unit testing and CI_. This isn't the ultimate solution **probably CF unit testing and ci gurus are wanting** but it creates an intermediate step to their goal. Let's call this intermediate step a "_bridge_". Hat tip to "[Driving Technical Change](http://www.amazon.com/Driving-Technical-Change-Terrence-Ryan/dp/1934356603)" which gave me this idea for better articulating what I am looking for _as an average developer in an average cfml shop_. For this to happen from my perspective, a simple "_bridge_" needs to be developed like an ANT task to run a CFML compile test. This would allow an easy way to implement **CI with CFML** code allowing average ColdFusion developers and managers to _immediately see CI benefits and improved productivity without much upfront investment_. This middle step would **open the door for more comprehensive unit testing** and automating the build process. The middle step's build script could even do CSS Lint, JSLint, and clean up some stuff. Nothing full blown. It might not even automate fully the build process. These next steps like fully automating the build process and add actual units can come later.

## Thoughts?
