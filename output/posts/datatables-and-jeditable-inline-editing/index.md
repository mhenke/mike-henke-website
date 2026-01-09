---
title: "DataTables and Jeditable with Tabbing (inline editing)"
date: 2011-09-16
categories:
  - "jquery"
---

The last couple weeks (off and on) I have been working on editing [DataTables](http://www.datatables.net/) with [jEditable](http://www.appelsiini.net/projects/jeditable). If you haven't seen Datatables, you should check it out. The examples are great and implementing is easy. Datatables makes changing any table layout into a dynamic sort and filter a breeze. You'll look like a Rockstar. With that said, we wanted to allow editing the cells in the table. The [DataTables editing example](http://www.datatables.net/examples/api/editable.html) was great but it forced the user to click a cell, change, press return to save, then repeat. We wanted to tab to for saving and going to the next cell. I kinda got it working using [Tab key with JEditable fields](http://stackoverflow.com/questions/885616/tab-key-with-jeditable-fields/888801) but 1) on last column doesn't go to the next row, first cell AND 2) when after tab saves and goes to the next cell, it would be nice if all the text was highlighted. With that said, here is the sample code.

\[code language="coldfusion"\]

<script type="text/javascript"><!--
$(document).ready(function() {
	/* Init DataTables */
	var oTable = $('#example').dataTable();

	/* Apply the jEditable handlers to the table */
	$('td', oTable.fnGetNodes()).editable( '/index.cfm/futurepremiums/update', {
		"callback": function( sValue, y ) {
			var aPos = oTable.fnGetPosition( this );
			oTable.fnUpdate( sValue, aPos[0], aPos[1] );
		},
		"submitdata": function ( value, settings ) {
			return {
				"row_id": this.parentNode.getAttribute('id'),
				"column": oTable.fnGetPosition( this )[2]
			};
		},
		"height": "14px"
	});

	$('td.editbox').bind('keydown', function(event) {
        if(event.keyCode==9) {
            $(this).find("input").submit();
            if ($(this).is(".lasteditbox")) {
                $("td.editbox:first").click();
            } else {
		$(this).next("td.editbox").click();
            }
            return false;
		}
	});
});
// --></script>

\\[/code\]

Then in the td tags for each cell, I added the \[code language="coldfusion"\]
class="editbox"
\\[/code\]
