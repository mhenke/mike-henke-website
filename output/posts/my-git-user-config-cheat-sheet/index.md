---
title: My Git User Config Cheat Sheet
date: '2010-06-10'
author: Mike Henke
layout: layouts/post.njk
categories:
  - Git
---

This is more for my notes but here is my Git User Config Cheatsheet for setting up a new computer with git.
```coldfusion
git config --global user.name "John Doe"
```

```coldfusion
git config --global user.email johndoe@example.com
```

```coldfusion
git config --global push.default "tracking"
```

```coldfusion
git config --global pack.threads "0"
```

```coldfusion
git config --global core.autocrlf false
```

```coldfusion
git config --global apply.whitespace nowarn
```

```coldfusion
git config --global color.ui "auto"
```

```coldfusion
git config --global core.excludesfile "C:\.gitignore"
```
