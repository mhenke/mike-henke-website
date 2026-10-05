---
title: Amazon S3 and JetS3t ignoring unwanted files
date: '2007-11-06'
author: Mike Henke
layout: layouts/post.njk
categories:
  - Amazon S3
  - Software
  - Ubuntu
---

It is pretty simple to sync files using <a href="http://Ignore Files on Upload http://jets3t.s3.amazonaws.com/toolkit/configuration.html#ignore" target="_self">JetS3t Synchronize</a>. Some folders I synch contain files I don't want to store on <a href="http://aws.amazon.com/s3" target="_self">Amazon Simple Storage Service</a> (Amazon S3) such as .svn folders for Subversion. The <a href="http://jets3t.s3.amazonaws.com/toolkit/configuration.html#ignore" target="_self">Ignore Files on Upload</a> feature of JetS3t Synchronize is useful. Simply add a .jets3t-ignore file in the folder having files/folders you want to ignore then specify file/directory paths to ignored within the .jet3t-ignore file. See my <a href="../../../index.cfm?event=showEntry&amp;entryId=15C35121-188B-4E84-15CC652C61C37F82"> 						Amazon S3 and JetS3t synchronizing</a> for more about using JetS3t.Attached to this entry is a snapshot of one of my .jets3t-ignore file.