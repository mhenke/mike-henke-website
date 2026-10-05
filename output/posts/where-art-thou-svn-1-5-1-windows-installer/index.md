---
title: Where Art Thou SVN 1.5.1 windows installer?
date: '2008-08-05'
author: Mike Henke
layout: layouts/post.njk
categories:
  - Subversion
---

Where Art Thou SVN 1.5.1 windows installer, I have searched and scoured google to no success. I see the <a href="http://subversion.tigris.org/files/documents/15/41686/svn-1.4.6-setup.exe">svn-1.4.6-setup.exe</a> on the <a href="http://subversion.tigris.org/servlets/ProjectDocumentList?folderID=91&amp;expandFolder=91&amp;folderID=260"><font color="#800080">Subversions Windows</font></a> section but no 1.5.x. Subversion&rsquo;s FAQ say <a href="http://subversion.tigris.org/faq.html#broken-subclipse">simply update your client</a>. It is that simple but if SVN doesn't provide an installer, how shall we. Guess this is the joys of open source.
Update - I read you can install VisualSVN to get the new command line. I installed it, navigated to the bin folder for me it was C:Program FilesVisualSVN Serverin and grabbed the files listed below and moved them to my SVN command line folder, which was C:Program FilesSubversionin . Last I uninstalled VisualSVN.
libapr-1.dll<br />
libaprutil-1.dll<br />
libeay32.dll<br />
libsvn_client-1.dll<br />
libsvn_delta-1.dll<br />
libsvn_diff-1.dll<br />
libsvn_fs-1.dll<br />
libsvn_ra-1.dll<br />
libsvn_repos-1.dll<br />
libsvn_subr-1.dll<br />
libsvn_wc-1.dll<br />
mod_authz_svn.so<br />
mod_dav_svn.so<br />
ssleay32.dll<br />
svn.exe<br />
svnadmin.exe<br />
svndumpfilter.exe<br />
svnlook.exe<br />
svnserve.exe<br />
svnsync.exe<br />
svnversion.exe
Update 2 - this approach worked for my laptop but not another computer unfortunate enough to had the latest TortoiseSVN update so it converted the working copy to 1.5. Eventually, I had to uninstall TortoiseSVN to a 1.4 version and recheckout the working as 1.4, so a cfml page could use the command line tool (1.4 - no 1.5.x update yet).
UPDATED - Some added a client install file finally. Thanks. Download here <a href="http://subversion.tigris.org/files/documents/15/43360/Setup-Subversion-1.5.1.en-us.msi">Setup-Subversion-1.5.1.en-us.msi</a>