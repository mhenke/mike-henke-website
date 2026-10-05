---
title: Compass, SASS, and ColdFusion (or creating more maintainable css)
date: '2010-09-22'
author: Mike Henke
layout: layouts/post.njk
categories:
  - ColdFusion
excerpt: "I will be showing how to setup <a title=\"http://compass-style.org/\" href=\"http://compass-style.org/\" target=\"_blank\">Compass </a> and \r\n<a title=\"http://sass-lang.com/\" href=\"http://sass-lang.com/\" target=\"_blank\">SASS </a> to create better, more maintainable stylesheets for <a href=\"http://www.adobe.com/products/coldfusion/\">ColdFusion</a>\r\nprogrammers.\_ This will include installing Ruby and a ruby gem (library\r\npackage). We won't be coding Ruby, just leveraging one of its many\r\nlibraries. This idea was inspired by Rob Wilkerson's <a title=\"http://weblog.robwilkerson.org/post/1131885328/compass-sass-cakephp\" href=\"http://weblog.robwilkerson.org/post/1131885328/compass-sass-cakephp\" target=\"_blank\">Compass, SASS, CakePHP post.</a>"
---

I will be showing how to setup <a title="http://compass-style.org/" href="http://compass-style.org/" target="_blank">Compass </a> and 
<a title="http://sass-lang.com/" href="http://sass-lang.com/" target="_blank">Sass </a> to create better, more maintainable stylesheets for <a href="http://www.adobe.com/products/coldfusion/">ColdFusion</a> 
programmers.  This will include installing <a href="http://www.ruby-lang.org/en/">Ruby</a> and a ruby gem (library package). We won't be coding Ruby, just leveraging one of its many libraries. This idea was inspired by Rob Wilkerson's <a title="http://weblog.robwilkerson.org/post/1131885328/compass-sass-cakephp" href="http://weblog.robwilkerson.org/post/1131885328/compass-sass-cakephp" target="_blank">Compass, SASS, CakePHP post.</a>
<h2>What is Compass and Sass</h2>
<div><em>"<strong>Compass </strong>is a stylesheet authoring framework that makes your stylesheets 
and markup easier to build and maintain. With compass, you write your 
stylesheets in Sass instead of CSS." </em></div>
 
<div>"<em>With <strong><em>compass</em></strong>, you write your stylesheets in Sass instead of <em>CSS</em>. Using the power of Sass Mixins and the <em>Compass</em> community, you can apply battle-tested </em><strong><em>...</em>"</strong></div>
 
<div><em>"<strong>Sass </strong>is a meta-language on top of CSS that’s used to describe the style of 
a document cleanly and structurally, with more power than flat CSS allows. Sass 
both provides a simpler, more elegant syntax for CSS and implements various 
features that are useful for creating manageable stylesheets."</em></div>
 
<div><em>"<strong><em>Sass</em> </strong>makes CSS fun again. <em>Sass</em> is an extension of CSS3, adding nested rules, variables, mixins, selector inheritance, and more. ...</em>"</div>
<h2>Overview of Process</h2>
<div>I will be showing how to setup Compass on ColdFusion 8, JRun4, and 
Vista. The general process should be similar for other configurations and 
operating systems. </div>
<h3>The process is per system:</h3>
<div>
<ol>
<li>Install Ruby</li>
<li>Install Compass</li>
</ol>
</div>
<h3>For each project using Compass, we will:</h3>
<ol>
<li>Create a Sass folder with a configuration file</li>
<li>Optional - Install blueprint (you could use <a href="http://github.com/chriseppstein/yui-compass-plugin">YUI Compass Plugin</a> or nothing for a starting point)</li>
<li>Compile our Sass files to CSS (this can be manual or automated)</li>
</ol>
<h2>Detailed Process</h2>
<div>First, you will need to grab and install Ruby.<a title="http://www.ruby-lang.org/en/downloads/" href="http://www.ruby-lang.org/en/downloads/" target="_blank"> http://www.ruby-lang.org/en/downloads/</a> under "Ruby on Windows" said our first option was using the RubyInstaller 
<a title="http://rubyinstaller.org/downloads/" href="http://rubyinstaller.org/downloads/" target="_blank">http://rubyinstaller.org/downloads/</a> so I went there and 
downloaded Ruby 1.8.7-p302 under RubyInstallers. After installing, check to see if Ruby is there.  In the Command Prompt type: ruby --version</div>
 
<div>Step 1 done. Now to install Compass. With the Command Prompt still open 
type: gem install compass</div>
<div><img src="/images/compass1.jpg" alt="" width="640" height="400" /></div>
<div>Step 2 done. </div>
 
<div>These steps will only be done once on each system you want to 
use Compass and Sass. Since Compass will generate our CSS, we don't need to 
install this on environments like Production. In source control system, I would 
track the Sass and generated CSS files. In the build process just ignore the Sass files.</div>
 
<div>Now for the big finale, 1) we will setup a configuration file, 2) install 
Blueprint for a project, and 3) start a watcher (this will automate the compiling of our css). </div>
 
<div>1) Open your editor of your choice. I am using Eclipse 3.6 with <a href="http://www.adobe.com/products/coldfusion/cfbuilder/features/">ColdFusion 
Builder</a>. The project for me is a typical <a href="http://cfwheels.org/docs/1-0/chapter/directory-structure">CFWheels</a> file/folder structure but 
don't concern yourself with all the files/folders. In the webroot create a 
folder called SASS and add a file called config.rb. Paste in this code in the 
config.rb file:</div>
 


```coldfusion
http_path = '/'
sass_dir = 'src'
css_dir = '../stylesheets'
images_dir = '../images'
javascripts_dir = '../javascripts'
http_stylesheets_path = 'stylesheets'
http_javascripts_path = 'javascripts'
http_images_path = 'images'
environment = :development
output_style = :compressed
```


 
<div>The lines you may need to modify are the css_dir, images_dir, and 
javascript_dir to match your folder structure. Notice it is a relative path from 
the location of config.rb file http_stylesheets_path, http_javascripts_path, and 
http_images_path are the url path to these folders.</div>
<div><img src="/images/compass2.jpg" alt="" width="640" height="400" /></div>
 
<div>2) Optional - (you could use <a href="http://github.com/chriseppstein/yui-compass-plugin">YUI Compass Plugin</a> or nothing as a starting point) </div>
<div>In the Command Prompt type in the path to your webroot and the sass folder 
you created. For me it is 
"C:\JRun4\servers\cfwheels\cfusion.ear\cfusion.war\sass".</div>
<div>Type in and run: compass install blueprint/semantic</div>
 
<div>You will see some stuff flash by the screen. Check your editor, you will 
need to refresh in Eclipse. You should see a src folder in your sass folder 
along with some compiled css files in your stylesheet location. Feel free to check out the scss files used to generate the stylesheets.</div>
<div><img src="/images/compass3.jpg" alt="" width="640" height="400" /></div>
 
<div>3) Drop down one directory in your command prompt, so you are in your webroot and type in: compass 
watch sass</div>
<div><img src="/images/compass4.jpg" alt="" width="640" height="400" /></div>
<h2>This is just a starting point, now start exploring using Sass :-)</h2>
<div>Now you are set to start using Sass. For more on using Sass, just google it.  Here are some materal I have found.</div>
 
<div>Screencasts:</div>
<div><a href="http://compass-style.org/docs/">An introduction to Compass</a></div>
<div><a href="http://vimeo.com/4335944">Compass: A Real Stylesheet Framework</a></div>
<div><a href="http://css-tricks.com/video-screencasts/88-intro-to-compass-sass/">#88: Intro to Compass/Sass</a></div>
 
<div>Blog Entries:</div>
<div><a href="http://www.neverfriday.com/sweetfriday/2009/05/trying-out-compass-a-css-frame.html">Trying out Compass, a CSS Framework</a></div>
<div><a href="http://net.tutsplus.com/tutorials/html-css-techniques/using-compass-and-sass-for-css-in-your-next-project/">Using Compass and Sass for CSS in your Next Project</a></div>