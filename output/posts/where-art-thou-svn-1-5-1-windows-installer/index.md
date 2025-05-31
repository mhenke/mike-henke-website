---
title: "Where Art Thou SVN 1.5.1 windows installer?"
date: 2008-08-05
categories: 
  - "Subversion"
---

Where Art Thou SVN 1.5.1 windows installer, I have searched and scoured google to no success. I see the [svn-1.4.6-setup.exe](http://subversion.tigris.org/files/documents/15/41686/svn-1.4.6-setup.exe) on the [Subversions Windows](http://subversion.tigris.org/servlets/ProjectDocumentList?folderID=91&expandFolder=91&folderID=260) section but no 1.5.x. Subversion’s FAQ say [simply update your client](http://subversion.tigris.org/faq.html#broken-subclipse). It is that simple but if SVN doesn't provide an installer, how shall we. Guess this is the joys of open source. Update - I read you can install VisualSVN to get the new command line. I installed it, navigated to the bin folder for me it was C:Program FilesVisualSVN Serverin and grabbed the files listed below and moved them to my SVN command line folder, which was C:Program FilesSubversionin . Last I uninstalled VisualSVN. libapr-1.dll  
libaprutil-1.dll  
libeay32.dll  
libsvn\_client-1.dll  
libsvn\_delta-1.dll  
libsvn\_diff-1.dll  
libsvn\_fs-1.dll  
libsvn\_ra-1.dll  
libsvn\_repos-1.dll  
libsvn\_subr-1.dll  
libsvn\_wc-1.dll  
mod\_authz\_svn.so  
mod\_dav\_svn.so  
ssleay32.dll  
svn.exe  
svnadmin.exe  
svndumpfilter.exe  
svnlook.exe  
svnserve.exe  
svnsync.exe  
svnversion.exe Update 2 - this approach worked for my laptop but not another computer unfortunate enough to had the latest TortoiseSVN update so it converted the working copy to 1.5. Eventually, I had to uninstall TortoiseSVN to a 1.4 version and recheckout the working as 1.4, so a cfml page could use the command line tool (1.4 - no 1.5.x update yet). UPDATED - Some added a client install file finally. Thanks. Download here [Setup-Subversion-1.5.1.en-us.msi](http://subversion.tigris.org/files/documents/15/43360/Setup-Subversion-1.5.1.en-us.msi)
