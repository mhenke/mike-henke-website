---
title: Why a compile test on CFML, a dynamic language?
date: '2011-12-16'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ColdFusion
  - MXUnit
---

"<a href="/blog/building-a-bridge-for-unit-testing-ci-in-cfml/">Building a bridge for unit testing and ci in cfml</a>" had great comments by <a href="http://corfield.org/">Sean Corfield</a>. One was when he asked "why (do) you want a _compile_ step in there (your ci process) at all?"
It comes back to an old Hanselminute podcast "<a href="http://hanselminutes.com/29/dynamic-vs-compiled-languages">Dynamic vs compiled languages</a>". The show talks about how programmers had a <em>safety net</em> when using a compiled language, <strong>the compiler</strong>. If the compiler passed, the program was 98% good except for some odd error. With Dynamic languages <em>the safety net was discarded</em> and nothing was there to take its place thus unit testing was introduced to take the compiler's place. Even in a dynamic language the compiler still is <strong>useful to catch syntax errors</strong>. The podcast mentions to think of the compile tests on a dynamic language as the <em>smallest unit test possible</em>.
Now take CFML and CI - for a simple indicator if your code base will work at the <strong>most basic level is the compile test</strong>. You can setup CI, <em>add the compile test and have a measurable test</em> for your manager and other developers. It gives immediate feedback on if the code works. You don't have to learn MXUNIT, learn how to create a build process, learn how to write testable code, etc.
Sean mentions setting up MXUnit via Hudson worked out of the box. That is great but <strong>what value does it give management or the developer </strong>after setup up without investing resources to learn MXUnit, create a test, create more tests, refactor code so it is testable, create new code so it is testable, etc. This is daunting and time intensive. Adding a compile test gives feedback on the whole project without more cost.
Sean also comments "I'm very surprised to hear you say setting up CI is complex and takes time. What aspects of it do you find complex?" I think it is the process as a whole. <em>Without meaningful intermediate steps</em>, the process is daunting. If it wasn't, more CFML shops would be using CI and Unit testing. My personal experience was setting up Jenkins with Git on Windows. It had some hurdles with configuring permissions, windows mappings, and path executibles.
I have Jenkins and Git work together but we are in no position to start writing unit tests for multiple reasons from code base, management sign off, and (you fill in the blank). This is where a compile test would come into place. It would give me, management, and developers feedback from CI without investing more time.
Back to what I am finding complex. Another huddle, is automating the build process. Instead of <em>tackling this in all one step</em> with CI and unit testing the intermidiate step for me is a compile test.
I am not proposing the <strong>compile test as the end solution but a bridge</strong> to more compresensive CI and Unit testing for average CFML shops.