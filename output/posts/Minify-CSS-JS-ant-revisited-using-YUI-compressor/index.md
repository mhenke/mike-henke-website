---
title: "Minify CSS/JS ant revisited using YUI compressor"
date: 2008-06-15
categories: 
  - "Ant"
---

I have revisited adding [Yui compressor](http://developer.yahoo.com/yui/compressor/) into my work's ant build script to minify JS and CSS scripts. The current jar was yuicompressor-2.3.5.jar . It took a lot of playing around but I finally stumbled on how to get it to work. Here is the snippet for the yuicompressor. I had to jump through a couple hoops like overriding the current js/css scripts with the optimized js/css scripts. I'll release a [full working copy in a zip](http://mikehenke.com/machblog/uploads/enclosures/yuiCompressor2_3_5.zip), you can run against your webroot. We achieved an average 18% compression rate for all our js/css files. UPDATED: ADDED ZIP EXAMPLE Orginal Post: [Adding JS/CSS compression and JS validation using YUI Compressor, JSLint, and jsmin to ant script](http://mikehenke.com/machblog//index.cfm?event=showEntry&entryId=FF861D0D-188B-4E84-15F0F8C8EBBF61FD)

_<!-- 
minify  
Now minifying js and css files  
\-->  
<target name="minify" depends="exportCode" description="Now minifying js and css files">_

_<echo>  
Now minifying js and css files  
</echo>  
  
<apply executable="java" parallel="false" dest="${webroot}${temp.dir}${jarfileTstamp}">  
<fileset dir="${temp.dir}${jarfileTstamp}" includes="\*\*/\*.js" />  
<arg line="-jar"/>  
<arg path="${webroot}libyuicompressor-2.3.5.jar" />  
<arg line="-v"/>  
<srcfile/>  
<arg line="-o"/>  
<mapper type="glob" from="\*.js" to="\*-min.js"/>  
<targetfile/>  
</apply>  
  
<move todir="${webroot}${temp.dir}/${jarfileTstamp}" overwrite="true">  
<fileset dir="${webroot}${temp.dir}${jarfileTstamp}" />  
<mapper type="glob" from="\*-min.js" to="\*.js"/>  
</move>  
  
<apply executable="java" parallel="false" dest="${webroot}${temp.dir}${jarfileTstamp}">  
<fileset dir="${webroot}${temp.dir}${jarfileTstamp}" includes="\*\*/\*.css" />  
<arg line="-jar"/>  
<arg path="${webroot}libyuicompressor-2.3.5.jar" />  
<arg line="-v"/>  
<srcfile/>  
<arg line="-o"/>  
<mapper type="glob" from="\*.css" to="\*-min.css"/>  
<targetfile/>  
</apply>  
  
<move todir="${webroot}${temp.dir}/${jarfileTstamp}" overwrite="true" >  
<fileset dir="${webroot}${temp.dir}${jarfileTstamp}" />  
<mapper type="glob" from="\*-min.css" to="\*.css"/>  
</move>  
</target>_
