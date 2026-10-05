---
title: ciFusion - Continuous Improvement of ColdFusion
date: '2009-06-21'
author: Mike Henke
layout: layouts/post.njk
categories:
  - CFEclipse
  - ColdFusion
  - ColdFusion Builder
  - Eclipse
---

I am working on <a href="https://cifusion.riaforge.org/">ciFusion</a>, a Bolt Extension, for Continuous Improvement of ColdFusion Code. It seems Java and .Net have many tools for metrics and code analysis but ColdFusion is several years behind. I am hoping to leverage already existing Java tools since ColdFusion works so well with it.Currently, ciFusion has a duplicate code check and a compile check. Think of the compile check as the <span style="text-decoration: line-through;">smallest</span> weakest possible Unit Test without a unit testing framework like <a href="http://www.mxunit.org">MXUnit</a>. I would like to focus on the "big five" code analysis areas from <a href="http://www.ibm.com/developerworks/java/library/j-ap01117/ ">Continuous Improvement of Code through Eclipse</a>:<ul><li>Coding standards </li><li>Code duplication </li><li>Code coverage</li><li>Dependency analysis</li><li>Complexity monitoring</li></ul>If you would like to help, shoot me an email henke <em>dot </em>mike <em>at</em> <em>gmail dot com</em>.<h3><span class="mw-headline">Pre-Alpha - <a href="https://cifusion.riaforge.org/">http://cifusion.riaforge.org/</a></span></h3>