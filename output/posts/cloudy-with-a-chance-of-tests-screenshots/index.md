---
title: Cloudy With A Chance of Tests screenshots
date: '2012-01-19'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ColdFusion
---

I have been implementing inspection of CFML code into some legacy and new projects. The <a href="https://github.com/mhenke/Cloudy-With-A-Chance-Of-Tests">Cloudy with a Chance of Tests project</a> is designed in baby steps so anyone can use it without any changes to their code. The first step is inspecting the code's syntax locally. The next step would be starting to use a CI server. I have this step implemented. Then building unit tests and expanding the build.xml even more.  I haven't made the jump to unit testing but eventually will. 
It is really great to have a pulse of a project immediately even without unit tests. Here are screenshots of feedback from Cloudy with a Chance of Tests in the step I am on.
Jenkins project page. Notice the build history, ticket system &amp; source control integration, and duplicate code links.
<img src="http://mikehenke.com/assets/content/images/cloudy1.jpg" alt="" width="640" height="400" />
This is a great way to keep a chart to keep tabs on the projects health by keeping it DRY.
<img src="http://mikehenke.com/assets/content/images/cloudy2.jpg" alt="" width="640" height="400" />
The Dry plugin has reports to trace exactly what files and lines are being duplicated. These are ideal situations to dry the code thus making it more managable.
<img src="http://mikehenke.com/assets/content/images/cloudy3.jpg" alt="" width="640" height="400" />
Here is an actual job page. The changes from source controll are easily accessable along with a duplicate code warning.
<img src="http://mikehenke.com/assets/content/images/cloudy4.jpg" alt="" width="640" height="400" />
Here is the console output in Jenkins from the build. See the inspections and results here.
<img src="http://mikehenke.com/assets/content/images/cloudy5.jpg" alt="" width="640" height="400" />
Adding alerts for builds is critcal so the developer can address issues immediately while they are recent. Here is an email of when a broken build is fixed and back to normal.
<img src="http://mikehenke.com/assets/content/images/cloudy6.jpg" alt="" width="640" height="400" />
Here is an email from Jenkins on a build failure. You can see what change caused the problem
<img src="http://mikehenke.com/assets/content/images/cloudy7.jpg" alt="" width="640" height="400" />
Along with what files are causing issues.
<img src="http://mikehenke.com/assets/content/images/cloudy8.jpg" alt="" width="640" height="400" />