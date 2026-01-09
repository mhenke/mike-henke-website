---
title: "Selenium is NOT a framework"
date: 2008-04-06
categories:
  - "Selenium"
---

[Selenium](http://selenium.openqa.org/) is not a [framework](http://en.wikipedia.org/wiki/Software_framework) but needs one desperately. I have noticed some references to Selenium as a framework thus this blog posting. (Selenium is an "Open source test automation tool for executing scenarios against web applications to validate browser compatibility and system functionality.")

I am using the [Template method pattern](http://en.wikipedia.org/wiki/Template_method_pattern) to creating my own Selenium Framework. The template method pattern is the famous MVC pattern used in many frameworks without the controller. "Different templates could be applied to the same set of data or APIs and produce different results." The model is my selenium data scripts. The view is my selenium action scripts I am trying to encapulate what varies into different data and action scripts then I can interchange data with actions. Example, I store url variables seperate in different selenium scripts. This way I can change out the url script and run the actions scripts against development or production without much hassle.

I am using Selenium's store function then harvest the values. My asserts are variables within the data scripts since different data may produce different results.

My reason for trying the Template method pattern is I am not able to use the id value so I am using xpath which is brittle. If the ui changes, I can recreate the action script and not worry about data. I tie the data and action templates together with Selenium test suites. Example, I'll run the same login action script but call different data scripts.

I read one post about overcoming the brittleness of Selenium which the person states "We use custom extension to insulate QA person from having to deal with such issue and concentrate on writing more tests." and will look into this approach also.
