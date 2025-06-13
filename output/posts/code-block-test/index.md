---
title: "Code Block Test"
date: 2025-06-11T00:00:00.000Z
categories: 
  - "test"
layout: "layouts/post.njk"
---

This is a test post to verify code block transformation.

[code language="coldfusion"]
component {
  function init() {
    return this;
  }
}
[/code]

[code language="javascript"]
function test() {
  console.log("Hello World");
}
[/code]

[code language="sql"]
SELECT * FROM users WHERE active = 1;
[/code]
