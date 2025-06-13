---
title: "running Adobe ColdFusion 9 on CF8 with simple url rewriting"
date: 2011-07-06
categories: 
  - "acf"
  - "ColdFusion"
  - "jrun"
---

At work, we use are transitioning to [Adobe ColdFusion 9](http://www.adobe.com/products/coldfusion/). Our local development is multiple instances created with an Adobe ColdFusion 8 installer. It was very easy to get an ACF9 instance going. We created a ACF9 war and used that when creating a new instance in the ColdFusion administrator. I noticed simple friendly urls like index.cfm/myController/myAction wasn't working in CF9. It came down to uncommenting a section in the web.xml for ACF9(SES).  
  
For me, the web.xml was C:\\JRun4\\servers\\ACF9\\cfusion.ear\\cfusion.war\\WEB-INF\\web.xml . Search for SES (around line 436) and then remove the comments around:

\[code language="coldfusion"\]
<servlet-mapping id="coldfusion_mapping_6">
     <servlet-name>CfmServlet</servlet-name>
     <url-pattern>*.cfml/*</url-pattern>
  </servlet-mapping>
  <servlet-mapping id="coldfusion_mapping_7">
    <servlet-name>CfmServlet</servlet-name>
    <url-pattern>*.cfm/*</url-pattern>
  </servlet-mapping>
  <servlet-mapping id="coldfusion_mapping_8">
    <servlet-name>CFCServlet</servlet-name>
    <url-pattern>*.cfc/*</url-pattern>
  </servlet-mapping>
\\[/code\] Next restart your instance and you should have rewriting working.
