---
title: "Eclipse Basic tutorial for CFBuilder / CFEclipse"
date: 2011-01-10
categories: 
  - "CFEclipse"
  - "ColdFusion"
  - "coldfusion-builder"
---

My last several posts have been using [Eclipse](http://www.eclipse.org) with [CFBuilder](http://www.adobe.com/products/coldfusion/cfbuilder/features) or [CFEclipse](http://www.cfeclipse.org). It is very important ColdFusion Builder and CFEclipse users understand Eclipse. The Eclipse documentation is a great place to start understanding Eclipse. I read the [Basic tutorial](http://help.eclipse.org/helios/advanced/print.jsp?topic=/org.eclipse.platform.doc.user/gettingStarted/qs-01.htm) this weekend. You can find it under the Workspace -> Getting Started section of the [Eclipse documentation](http://www.eclipse.org/documentation/). If you don't want to read the 56 pages, this post will have direct text from the documentation I highlighted and found critical as reading. **Note:** As I wrote out this post, I stopped with section 13 of 20 for the Basic tutorial. As you read my highlights, hopefully you'll see how comprehensive and useful the tutorial is. There is great information over tasks, rearranging editor/views, local history, comparing, and perspectives that I won't highlight.

## Highlights

1\. The Workbench  
A Workbench window offers one or more perspectives. A perspective contains editors and views, such as the Project Explorer. Multiple Workbench windows can be opened simultaneously.  
  
Note you can get the Welcome view back at any time by selecting ‘Help > Welcome’  
  
2\. Editors and views  
it is important to first be familiar with the various elements of the Workbench. A Workbench consists of:  
  
    \* perspectives  
    \* views  
    \* editors  
  
A perspective is a group of views and editors in the Workbench window.  
  
A view is a visual component within the Workbench. It is typically used to navigate a list or hierarchy of information (such as the resources in the Workbench), or display properties for the active editor. Modifications made in a view are saved immediately.  
  
An editor is also a visual component within the Workbench. It is typically used to edit or browse a resource. The visual presentation might be text or a diagram. Typically, editors are launched by clicking on a resource in a view. Modifications made in an editor follow an open-save-close lifecycle model.  
  
We use the term "part" to mean either a view or an editor. Parts can be active or inactive, but only one part can be active at any one time.  The active part is the one whose title bar is highlighted.  
  
If an editor tab is not highlighted it indicates the editor is not active, however views may show information based on the last active editor.  
  
2.1. Editors  
Depending on the type of file that is being edited, the appropriate editor is displayed in the editor area.  
  
When an editor is active, the Workbench menu bar and toolbar contain operations applicable to the editor.  
  
The editors can be stacked in the editor area and individual editors can be activated by clicking the tab for the editor  
  
If a resource does not have an associated editor, the Workbench will attempt to launch an external editor registered with the platform.  
  
Editors can be cycled through using the back and forward arrow buttons in the toolbar.  
  
2.2. Views  
The primary use of Views is to provide navigation of the information in the Workbench.  
  
A view might appear by itself or stacked with other views in a tabbed notebook.  
  
Views have two menus. The first, which is accessed by right clicking on the view's tab, allows the view to be manipulated in much the same manner as the menu associated with the Workbench window.  
  
The second menu, called the "view pull-down menu", is accessed by clicking the down arrow View down arrow. The view pull-down menu typically contains operations that apply to the entire contents of the view, but not to a specific item shown in the view.  
  
A view can be displayed by selecting it from the Window > Show View menu.  
  
Additional views are available by choosing Other... at the bottom of the Show View sub-menu. This is just one of the many features that provide for the creation of a custom work environment.  
  
Through the normal course of using the Workbench you will open, move, resize, and close views. If you'd like to restore the perspective back to its original state, you can select the Window > Reset Perspective menu operation.  
  
3.1. Using the File menu  
Create a second project called JaneQuser2 using the same steps, but instead of clicking Finish, click Next. At this point you can specify other projects that project JaneQuser2 depends on. Since we want to create two independent projects we will not select any of the projects in the Project References table.  
  
3.2. Using the popup  
Now that we have our project we will create a folder. Note: There is now also an Advanced button. This button when selected allows you to enter a location outside of a project's hierarchy as the location for one of its folders. This is called a linked folder.  
  
3.3. Using the New button  
Then select the Link with Editor Link with Editor button in the local toolbar or view menu Link with Editor of one of the navigation views. Lastly, click on the editor tab for JanesFile.txt. Notice how the navigation view updated itself to select the file you are currently editing (JanesFile.txt). If you don't like this automatic update you can easily turn it off by deselecting Link with Editor.  
  
5\. Navigating resources  
One important view to become familiar with is one of the navigation views, which displays information about the contents of the Workbench and how the resources relate to each other in a hierarchy.  
  
The Workbench contains projects, which in turn contain folders and/or files. Projects, folders, and files are collectively called resources.  
  
5.1. Open resources in the Project Explorer  
The Workbench remembers the last editor that was used for editing a specific file. This makes it easier to use the same editor down the road.  
  
The default editors can be configured using the General > Editors > File Associations preference page.  
  
6\. Files  
The projects, folders and files that you create with the Workbench are all stored under a single directory that represents your workspace. The location of the workspace was set in the dialog that first opens when you start the Workbench.  
  
All of the projects, folders and files that you create with the Workbench are stored as normal directories and files on the machine.  
  
7\. Exporting files  
Files can be exported from the Workbench either by:  
    \* Dragging and dropping to the file system (on most platforms), or  
    \* Copying and pasting to the file system, or  
    \* Using the Export wizard.  
  
8\. Importing files  
Files can be imported into the Workbench either by :  
    \* dragging and dropping from the file system, or  
    \* copying and pasting from the file system, or  
    \* Using the Import wizard.  
  
10\. Working with other editors  
Instructions have been given explaining how to import and export resources from the Workbench. This section will look at how to edit Workbench resources using the following three approaches:  
  
    \* External editors launched by the Workbench  
    \* Embedded OLE documents Windows only  
    \* External editors launched without the Workbench's knowledge  
  
12\. Searching  
In this section, Search Search button will be used to perform a text search across the resources that are shown in the navigation view.  
  
12.1. Starting a search  
  
Step 4. The kinds of files to include in the search can be specified in the File name patterns field. Click Choose... to open the Select Types dialog. This dialog provides a quick way to select from a list of registered extensions.  
  
Step 5. In the Scope field, specify the files and folders to include in the search. The choices are: the entire workspace, the currently selected resources in the Workbench, or a working set which is a named, customized group of files and folders. Leave the scope as workspace.  
  
Step 6. Use the Customize button to choose what kinds of searches are available in the dialog. This setting may be left unchanged.  
  
  
12.2. The Search view  
  
Step 2. It is sometimes useful to remove uninteresting matches from the search results. The Search view's popup menu allows you to do this using Remove Selected Matches which removes any selected file entries (and all matches in them) from the Search view. Note that this only removes the entries in the Search view, it does not effect the files themselves.  
  
Step 4. The Search view updates to show the results of the new search.  
  
Use the drop down button on the Search view's toolbar to move back and forth between the two search results.
