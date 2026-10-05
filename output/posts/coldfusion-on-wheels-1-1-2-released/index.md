---
title: ColdFusion On Wheels 1.1.2 Released
date: '2011-02-01'
author: Mike Henke
layout: layouts/post.njk
categories:
  - CFWheels
  - ColdFusion
---

<span style="color: #151515; font-family: Arial, Helvetica, sans-serif; font-size: 16px;">
</span>
<p style="line-height: 1.5em;">Here is a list of issues resolved from the <a style="color: #b00701; font-family: 'Trebuchet MS', Verdana, sans-serif;" href="https://github.com/cfwheels/cfwheels/blob/v1.1.2/wheels/CHANGELOG">CHANGELOG</a>:
<ul>
<li style="list-style-type: square;">
```coldfusion
select()
```
, 
```coldfusion
selectTag()
```
 allow an array of structs to be passed to options</li>
<li style="list-style-type: square;">Changed 
```coldfusion
default
```
 argument on includeContent() to 
```coldfusion
defaultValue
```
</li>
<li style="list-style-type: square;">Add 
```coldfusion
when
```
 argument to 
```coldfusion
validate()
```
</li>
<li style="list-style-type: square;">Added the 
```coldfusion
varchar_ignorecase
```
 type to the H2 adapter</li>
<li style="list-style-type: square;">Fix so that the full table name is always retuned</li>
<li style="list-style-type: square;">Pagination with 
```coldfusion
parameterize
```
 set to 
```coldfusion
false
```
 for numeric keys</li>
<li style="list-style-type: square;">Blank should be the selected value when 
```coldfusion
includeBlank
```
 is set in 
```coldfusion
select()
```
</li>
<li style="list-style-type: square;">
```coldfusion
validatesLengthOf()
```
 failed when both maximum and minimum were specified</li>
</ul>
<div><img src="http://mikehenke.com/assets/content/blur.jpg" alt="" width="600" height="658" /><br /></div>