---
title: How to setup url rewriting for Wheels with JRUN
date: '2010-07-24'
author: Mike Henke
layout: layouts/post.njk
categories:
  - CFWheels
  - ColdFusion
  - jrun
excerpt: "Download the binary from <a href=\"http://www.tuckey.org/urlrewrite/#download\">Url Rewrite Filter</a> and read the instructions. It is 4 steps. I'll break from the steps after the first one.\r\nStep 1: \"extract it into your context's directory ie, so that urlrewrite.xml goes into the WEB-INF directory.\" I download urlrewritefilter-3.2.0.zip and moved the files to <code>C:\\JRun4\\servers\\cfwheels\\cfusion.ear\\cfusion.war\\WEB-INF\\</code>"
---

Download the binary from <a href="http://www.tuckey.org/urlrewrite/#download">Url Rewrite Filter</a> and read the instructions. It is 4 steps. I'll break from the steps after the first one.
Step 1: "extract it into your context's directory ie, so that urlrewrite.xml goes into the WEB-INF directory." I download urlrewritefilter-3.2.0.zip and moved the files to 
```coldfusion
C:\JRun4\servers\cfwheels\cfusion.ear\cfusion.war\WEB-INF
```

Open urlrewrite.xml, my file was located at 
```coldfusion
C:\JRun4\servers\cfwheels\cfusion.ear\cfusion.war\WEB-INF\urlrewrite.xml
```

Search for INSTALLATION, then copy the filter and filter-mapping code from it.


```coldfusion
 <filter>
  <filter-name>UrlRewriteFilter</filter-name>
  <filter-class>org.tuckey.web.filters.urlrewrite.UrlRewriteFilter</filter-class>
  <init-param>
   <param-name>logLevel</param-name>
   <param-value>WARN</param-value>
  </init-param>
 </filter>
 <filter-mapping>
  <filter-name>UrlRewriteFilter</filter-name>
  <url-pattern>/*</url-pattern>
 </filter-mapping>       
```


Next open your web.xml
Mine was located at 
```coldfusion
C:\JRun4\servers\cfwheels\cfusion.ear\cfusion.war\WEB-INF\web.xml
```

Search for 
```coldfusion
CF Monitoring Filter mappings
```
 and paste the copied filter and filter-mapping code above this.  You should be below the last 
```coldfusion
</context-param>
```
.
Restart your jrun instance and test.  My test url was 
```coldfusion
http://cfunited.local/test/status/
```
 (be sure to have the ending 
```coldfusion
/
```
)
You should be redirected to rewrite-status.  This means the url rewriting filter is working.  Now to add the CFWheels url rewriting
I used the .htaccess file within the CFWheels download for the rules below.  Copy the code below and paste it below the 
```coldfusion
something
```
 and above the 
```coldfusion
something
```
 in urlrewriting.xml.



```coldfusion
    
        
            The rule is for making CFWheels URLs prettier using URL rewriting.
			# http://cfwheels.org/docs/chapter/url-rewriting
			
			# RewriteCond %{REQUEST_URI} !^.*/(flex2gateway|jrunscripts|cfide|cfformgateway|railo-context|files|images|javascripts|miscellaneous|stylesheets|robots.txt|sitemap.xml|rewrite.cfm)($|/.*$) [NC]
			# RewriteRule ^(.*)$ ./rewrite.cfm/$1 [L]
        
		^.*/(flex2gateway|jrunscripts|cfide|cfformgateway|railo-context|files|images|javascripts|miscellaneous|stylesheets|robots.txt|sitemap.xml|rewrite.cfm)
        ^(.*)$
        /rewrite.cfm/$1
    
```
