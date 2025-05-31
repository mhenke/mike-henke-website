---
title: "Turbo-charging Eclipse"
date: 2008-04-26
categories: 
  - "CFEclipse"
  - "Eclipse"
  - "Mylyn"
---

I changed my [eclipse.ini](http://wiki.eclipse.org/Eclipse.ini) file around after researching some jvm option settings. I primarily use CFEclipse, Mylyn, and Subclipse. I am not a jvm options expert, but I [referenced several articles](#LU). Before modifying the eclipse.ini file please back it up. The ini file can be error prone with returns and spaces. My [simple test](#bt) shows an improvement in times. If someone knows how to test and benchmark Eclipse startup and performance better I would be interested in learning how. **eclipse.ini** file  
_\-nosplash  
\-vmargs  
\-XX:+[AggressiveHeap](#AH)  
\-XX:+[AggressiveOpts](#AO)  
\-XX:+[UseParallelOldGC](#UPOGC)  
\-XX:[ParallelGCThreads](#PGT)\=2  
\-XX:[ThreadPriorityPolicy](#TPP)\=1  
\-Xverify:none_  
  
  
What the options/settings do (these explainations are from the [articles listed below](#LU)):  
  
**\-XX:+AggressiveHeap**  
  
The -XX:+AggressiveHeap option inspects the machine resources (size of memory and number of processors) and attempts to set various parameters to be optimal for long-running, memory allocation-intensive jobs. It was originally intended for machines with large amounts of memory and a large number of CPUs, but in the J2SE platform, version 1.4.1 and later it has shown itself to be useful even on four processor machines. With this option the throughput collector (-XX:+[**UseParallelGC**](#UPGC)) is used along with adaptive sizing (-XX:+[**UseAdaptiveSizePolicy**](#UASP)). The physical memory on the machines must be at least 256MB before AggressiveHeap can be used. The size of the initial heap is calculated based on the size of the physical memory and attempts to make maximal use of the physical memory for the heap (i.e., the algorithms attempt to use heaps nearly as large as the total physical memory). **UseAdaptiveSizePolicy**  
A feature available with the throughput collector in the J2SE platform, version 1.4.1 and later releases is the use of adaptive sizing (-XX:+UseAdaptiveSizePolicy), which is on by default. Adaptive sizing keeps statistics about garbage collection times, allocation rates, and the free space in the heap after a collection. These statistics are used to make decisions regarding changes to the sizes of the young generation and tenured generation so as to best fit the behavior of the application. Use the command line option -verbose:gc to see the resulting sizes of the heap.  
  
**UseParallelGC**  
Use the Parallel Scavenge garbage collector  
  
**UseParallelOldGC**  
Use the Parallel Old garbage collector  
  
**\-XX:+AggressiveOpts**  
Turns on point performance optimizations that are expected to be on by default in upcoming releases. The changes grouped by this flag are minor changes to JVM runtime compiled code and not distinct performance features (such as BiasedLocking and ParallelOldGC). This is a good flag to try the JVM engineering team's latest performance tweaks for upcoming releases. Note: this option is experimental! The specific optimizations enabled by this option can change from release to release and even build to build. You should reevaluate the effects of this option with prior to deploying a new release of Java.  
**  
ParallelGCThreads**  
Number of parallel threads parallel gc will use  
  
**ThreadPriorityPolicy**  
0 : Normal. VM chooses priorities that are appropriate for normal applications. On Solaris NORM\_PRIORITY and above are mapped to normal native priority. Java priorities below NORM\_PRIORITY" map to lower native priority values. On Windows applications" are allowed to use higher native priorities. However, with ThreadPriorityPolicy=0, VM will not use the highest possible" native priority, THREAD\_PRIORITY\_TIME\_CRITICAL, as it may interfere with system threads. On Linux thread priorities are ignored because the OS does not support static priority in SCHED\_OTHER scheduling class which is the only choice for" non-root, non-realtime applications. 1 : Aggressive. Java thread priorities map over to the entire range of native thread priorities. Higher Java thread priorities map to higher native thread priorities. This policy should be used with care, as sometimes it can cause performance degradation in the application and/or the entire system. On Linux this policy requires root privilege.  
  
  
_**Links used for gathering information on the settings**_ [The most complete list of -XX options for Java 6 JVM](http://www.md.pp.ru/~eu/jdk6options.html)  
  
[Java Garbage Collection Tuning](http://www.folgmann.com/en/j2ee/gc.html)  
  
[Turbo-charging Java HotSpot Virtual Machine, v1.4.x to Improve the Performance and Scalability of Application Servers](http://java.sun.com/developer/technicalArticles/Programming/turbo/)  
[  
Java Tuning White Paper](http://java.sun.com/performance/reference/whitepapers/tuning.html)  
[  
Tuning Garbage Collection with the 1.4.2 Java\[tm\] Virtual Machine](http://java.sun.com/docs/hotspot/gc1.4.2/) ----- I am using a crude benchmark test against my Windows XP laptop using _eclipse java -jar startup.jar -debug_

|  | turbo-charged eclipse.ini |  | eclipse-SDK-3.3.2-win32 eclipse.ini |  |
| --- | --- | --- | --- | --- |
| Time to load bundles | 15 | 16 | 16 | 15 |
| Starting application | 640 | 625 | 1094 | 938 |
| Application Started | 5640 | 5641 | 10328 | 8245 |
