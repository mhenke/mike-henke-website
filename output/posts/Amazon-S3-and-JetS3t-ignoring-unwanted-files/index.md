---
title: "Amazon S3 and JetS3t ignoring unwanted files"
date: 2007-11-06
categories:
  - "Amazon-S3"
  - "Software"
  - "Ubuntu"
---

It is pretty simple to sync files using [JetS3t Synchronize](http://Ignore Files on Upload http://jets3t.s3.amazonaws.com/toolkit/configuration.html#ignore). Some folders I synch contain files I don't want to store on [Amazon Simple Storage Service](http://aws.amazon.com/s3) (Amazon S3) such as .svn folders for Subversion. The [Ignore Files on Upload](http://jets3t.s3.amazonaws.com/toolkit/configuration.html#ignore) feature of JetS3t Synchronize is useful. Simply add a .jets3t-ignore file in the folder having files/folders you want to ignore then specify file/directory paths to ignored within the .jet3t-ignore file. See my [Amazon S3 and JetS3t synchronizing](../../../index.cfm?event=showEntry&entryId=15C35121-188B-4E84-15CC652C61C37F82) for more about using JetS3t. Attached to this entry is a snapshot of one of my .jets3t-ignore file.
