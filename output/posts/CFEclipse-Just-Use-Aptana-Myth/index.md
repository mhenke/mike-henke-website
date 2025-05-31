---
title: "CFEclipse Just Use Aptana Myth"
date: 2007-11-20
categories: 
  - "CFEclipse"
---

Lot of the CFEclipse users say use [Aptana](http://aptana.com/). Clarification usually not provided with the generally helpful advice is Aptana doesn't open ColdFusion related file extension by default.  
  
Editors allow you to edit, save, and revert the editor’s content. Editors have built-in language-specific knowledge. _Functionality of editors aren't combined._ Which editor is open is based on File Association set in Preferences by file extension (Preferences --> General --> Editors --> File Associations). ![File Association within Preferences](images/fileassociations.jpg) Aptana has several editors along with multiple useful views. CFEclipse has one editor along with multiple useful views. Aptana editors can be used with files like html, htm, css, js, and xml not cfm related .  
  
The File association default is what editor will be used when opening the file. When right-clicking on the file then "Open With" you can see default and other associated file editors. It is possible to open the file with non-associated editors using Other. Multiple editors can be associated with a file extension and one editor set as the default editor but _only one editor will be used._

Take a look @ my snapshots of opening a cfm file with Aptana HTML editor verses CFEclipse editor.  
  
Notice the Aptana HTML editor _doesn't recognize the cf tags_.

Aptana HTML Editor with a cfm file:  
![Aptana HTML Editor with cfm file](images/aptanaHTML.jpg) The code insight is different and the color formatting schema is different. CFEclipse Editor with a cfm file:  
![CFEclipse editor with cfm file](images/cfeclipse.jpg) This post is in regards to a discussion occuring @ CFEclipse User Group named [CFEclipse and HTML](http://groups.google.com/group/cfeclipse-users/browse_thread/thread/2b756673f546f7fe).
