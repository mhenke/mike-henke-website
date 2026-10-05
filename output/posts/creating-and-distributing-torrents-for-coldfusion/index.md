---
title: Creating and distributing torrents for ColdFusion
date: '2010-02-15'
author: Mike Henke
layout: layouts/post.njk
categories:
  - Amazon S3
  - ColdFusion
---

I have been venturing into creating and distributing torrents for ColdFusion related downloads like <a href="http://mikehenke.com-torrents.s3.amazonaws.com/marc0_3.torrent">MARC 0.3</a> (MySQL, Apache, <a href="http://www.getrailo.com/">Railo</a>, and <a href="http://www.cfwheels.org/">ColdFusion On Wheels</a>) virtual machine. I decided on using my website and <a href="https://s3.amazonaws.com">Amazon Simple Storage Service</a> (Amazon S3) to host the actual files the torrent will use. 
<h3>Torrent Vocabulary</h3>
A <em>Web Tracker</em> is a server that keeps track of which seeds and peers 
are in the swarm.
A <em>seeder</em> is a peer that has a complete copy of the torrent
 and still offers it for upload.
A <em>Web seed </em>is an http or ftp sever that makes the file available for download.
An <em>Announcment </em>tells the Web Tracker, it should add this download to the list of peers in the swarm.
A <em>swarm</em> is all peers (including seeders) sharing a torrent are called a <em>swarm</em>
Some definitions are from <a href="http://en.wikipedia.org/wiki/BitTorrent_vocabulary">http://en.wikipedia.org/wiki/BitTorrent_vocabulary</a>.
<h3>Web Tracker</h3>
I am using <a href="http://openbittorrent.com/">OpenBittorrent</a>. The announcement url is http://tracker.openbittorrent.com/announce .
<h3>Creating the Web Seeds</h3>
I will be using my site and Amazon S3 so I uploaded the files using <a href="http://filezilla-project.org">FileZilla</a> and <a href="http://jets3t.s3.amazonaws.com/applications/applications.html">Jets3t Cockpit</a>. The initial upload may take awhile into Amazon S3 . If you have multiple Amazon S3 buckets, the subsequent copy and move option in Jets3t Cockpit will speed up the process.
<img src="/images/torrent2.jpg" alt="" />
I use <a href="http://www.s3fox.net/">S3Fox</a>
 plugin to control access to the files on Amazon S3. Make sure the 
access is read. Now we have the web seeds ready and will create the torrent.
<h3>Creating the torrent</h3>
I am using <a href="http://www.bittorrent.com" target="_self">BitTorrent</a> to create the torrent. Creating the torrent using BitTorrent is very straight forward (File --&gt; Create New Torrent). You will need to select where the file is located on your computer then provide a tracker and any web seeds you created. Next select "Create and save as".
<img src="/images/torrent1.jpg" alt="" />
Now you will be prompted to save the torrent file you will distribute to people. Once saved, you can upload the torrent to where you want people to download it from.
You can use Amazon S3 to create a torrent while convenient (all you do is add ?torrent to the end of the url to the file) seems limited. I haven't figured out a way to include other web seeds to this torrent.  It uses an amazon web tracker for announcements.
<h3>Distributing the torrent</h3>
I uploaded the torrent to Amazon S3 since my site doesn't seem to allow download of torrent files and provided the url to people. You can also email the torrent or pass it around on your thumb drive.