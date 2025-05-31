---
title: "Cool Ant file trick and concept"
date: 2008-06-25
categories: 
  - "Ant"
---

I watched [Qasim Rasheed's](http://www.QasimRasheed.com) [CFUnited](http://www.cfunited.com) presentation on [Continuous Integration with SVN, ANT, CFUnit & Selenium](http://partners.adobe.acrobat.com/p27287024/). I picked up a fundamental [concept](#concept), Conditional Execution, and a cool [trick](#trick). The concept was the _if_ and _unless_ attribute of an ant target. I have read about them but it was great to see them in action. He covered it quick so I had to watch that section a couple times.  
  
Basically:  
  
<target name="if" if="propertyName" ...> I run if propertyName is define </target>  
  
<target name="unless" unless="propertyName" ...> I run if propertyName is NOT defined </target> so <property name="propertyName" value="true" /> <target .... depends="if,unless" > hello </target> Both targets would be called but _if_ would only actually run. If propertyName wasn't defined both targets would be called but only _unless_ would actually run.  
  
The trick was in an Ant File **(using the Ant Editor - thanks Jim)** pressing Ctrl and mouse over properties (example _${property}_) , the _${property}_ will turn blue and underlined. If you click the _${property}_, the editor will jump to where the property is defined in the file. If the property was set in a property file, the editor will jump to where the property file is defined in the ant file. If you hold Ctrl and click on the property file, the editor will open up the file. Pretty sweet. I wonder how Ant files are doing this since it would be interesting to have this feature in CFEclipse for some variables. I guess this **Ctrl-Click** feature is - Go to declaration of object at cursor.
