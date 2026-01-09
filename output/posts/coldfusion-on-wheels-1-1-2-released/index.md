---
title: "ColdFusion On Wheels 1.1.2 Released"
date: 2011-02-01
categories:
  - "cfwheels"
  - "ColdFusion"
---

Here is a list of issues resolved from the [CHANGELOG](https://github.com/cfwheels/cfwheels/blob/v1.1.2/wheels/CHANGELOG):

- \[code language="coldfusion"\]
  select()
  \\[/code\], \[code language="coldfusion"\]
  selectTag()
  \\[/code\] allow an array of structs to be passed to options
- Changed \[code language="coldfusion"\]
  default
  \\[/code\] argument on includeContent() to \[code language="coldfusion"\]
  defaultValue
  \\[/code\]
- Add \[code language="coldfusion"\]
  when
  \\[/code\] argument to \[code language="coldfusion"\]
  validate()
  \\[/code\]
- Added the \[code language="coldfusion"\]
  varchar_ignorecase
  \\[/code\] type to the H2 adapter
- Fix so that the full table name is always retuned
- Pagination with \[code language="coldfusion"\]
  parameterize
  \\[/code\] set to \[code language="coldfusion"\]
  false
  \\[/code\] for numeric keys
- Blank should be the selected value when \[code language="coldfusion"\]
  includeBlank
  \\[/code\] is set in \[code language="coldfusion"\]
  select()
  \\[/code\]
- \[code language="coldfusion"\]
  validatesLengthOf()
  \\[/code\] failed when both maximum and minimum were specified

![](images/blur.jpg)
