---
title: "9 Features Bolt Must Have"
date: 2009-05-18
categories: 
  - "CFEclipse"
  - "ColdFusion"
  - "coldfusion-builder"
  - "Eclipse"
---

This list is features I feel are very important for a ColdFusion IDE.  
  
1\. Mylyn Bridge I use [Mylyn](http://www.eclipse.org/mylyn/) daily for work because it helps me multitask and track my time. Currently for ColdFusion files in [CFEclipse](http://www.cfeclipse.org/), Mylyn is defaulted to a file view which is nice, but [Bolt](http://labs.adobe.com/wiki/index.php/Bolt) needs to have a bridge to get even more out of the Mylyn. See the statement below for more of detail. Also the new bug/issue tracker for Bolt/Centuar needs to have a connector to Mylyn for easy entry of ideas and bugs for Bolt through Eclipse. "Mylyn requires a bridge to all the tools and languages you work with (such as Ruby and JSPs). If you lack a bridge specific to the programming language or other file type that you work with, Mylyn still provides focusing down to the file level .... but won't have the fine-grained declaration filtering (for example, in the Outline view), the automatic folding of declarations in the editor, or advanced features such as task Context Test Suites." [more](http://www.ibm.com/developerworks/java/library/j-mylyn2/)  
2\. ColdFusion Explorer similar to Ruby Explorer The default Navigator view and Outline view is nice but Bolt needs to take it a step further by combining the views into a ColdFusion Explorer view similiar to the Ruby Explorer view from [RadRails](http://www.aptana.com/rails). Single-click an element in Outline view or Ruby Explorer will take you to the line of code within the file. A must have :-)

| **Ruby Explorer top and Outline view of a rb file** | Â  | **Navigator View top and Outline of cfc file** |
| --- | --- | --- |
|   ![](images/File)   | Â  |   ![](images/File)   |

3\. Respect and do not conflict with Eclipse shortcuts  

Don't get tricked up with default Eclipse shortcuts like Ctrl-3 is actually an Eclipse shortcut for a quick search. Also remember other common Eclipse shortcuts like Ctrl-shift-l. A friend, [Ryan Stille](http://www.stillnetstudios.com/), suggested "They should keep the common CFEclipse shortcuts for convention and ease of adoption."  

  

4\. All Bolt Preferences should be searchable

  

This is simple but a must for any Eclipse plug-in since preference setting are sometimes hard to find. Bolt needs to put all editable preferences into the filter and ctrl-3 search.  
  
**Example of a filter in perferences.**  

![](images/File)

  
  

5\. Code Formatting

  

Please have ctrl-shift-f format/indent my code (I am lazy but need nicely formatted code, one less thing for me to do). I missed this feature when I initially switched to CFEclipse, but I would hope Bolt will have it.  

  

  

6\. Don't become too overbearing

  
Another simple but important user experience when using Eclipse. Aptanta is thought of by some users as annoying with their "My Aptana/Message Center". Their messages become spam-like within Eclipse, not good.  

  

  

7\. Don't blur Eclipse features with Bolt features  

  

Adobe needs to stress the foundation is Eclipse for Bolt users. This is where additional power of knowing Eclipse comes into play such as "[Working with local history](http://help.eclipse.org/ganymede/topic/org.eclipse.platform.doc.user/tasks/tasks-1f.htm?resultof=%22%6c%6f%63%61%6c%22%20%22%68%69%73%74%6f%72%79%22%20%22%68%69%73%74%6f%72%69%22%20)." See My post about [Top 6 underused Eclipse shortcuts](/post.cfm/Top-6-underused-Eclipse-shortcuts-for-CFEclipse).

  

  

8\. Implement ideas from Eclipse Platform and Java's Tips and Tricks

  

Bolt needs to keep pushing forward by implementing and advancing the ColdFusion IDE with ideas and new features added to [Eclipse](http://help.eclipse.org/ganymede/topic/org.eclipse.platform.doc.user/tips/platform_tips.html) and [Java](http://help.eclipse.org/ganymede/topic/org.eclipse.jdt.doc.user/tips/jdt_tips.html) Tips and Tricks. Both links are must read for any Eclipse developer.

  
  

9\. Bolt Toolbars/Menu details easily hidden

  

Our workspace is limited, why take up valuable real estate with toolbars and menus, you don't use.

  
**How to customize the toolbars/menu icons.**  

![](images/File)

**  
Notice the Menubar details and Toolbar details sections in the screenshot below to remove elements.**  

![](images/File)

  

  
  
Feel free to comment with any Must Have features you feel Bolt needs.
