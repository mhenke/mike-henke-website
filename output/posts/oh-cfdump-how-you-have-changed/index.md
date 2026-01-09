---
title: "Oh, cfdump, how you have changed"
date: 2011-08-03
categories:
  - "acf"
  - "ColdFusion"
---

I have been reviewing [Adobe ColdFusion](http://www.adobe.com/products/coldfusion/) last release and the many enhancements (some of which went under my radar). This post will cover how [CFDUMP](http://help.adobe.com/en_US/ColdFusion/9.0/CFMLRef/WSc3ff6d0ea77859461172e0811cbec22c24-7ef7.html) has improve over the years. I will go in order of the enhancements. In **MX 6.1**, COM objects are able to be displayed. In **MX 7**, the _top_ attribute was added. The _top_ attribute designates the number of rows to display. For a structure, this is the number of nested levels to display. In **ACF8**, several attributes were added. They were *show*, _format_, _hide_, _keys_, _metainfo_, _output_, and _showUDFs_.

- _show_ - default is **all**. For a query, this is a column name or a comma-delimited list of column names to display. For a structure, this is a key or a comma-delimited list of keys to display.
- _format_ - default is **text**. This attribute is used with the output attribute to specify whether to save the results of a cfdump to a file in text or HTML format.
- _hide_ - default is **all**. This is the opposite of show.
- _keys_ - default is **all**. For a structure, the number of keys to display.
- _metainfo_ - default is **yes** for query **no** for persistence CFCs. For use with queries and persistence CFCs. Includes information about the query in the cfdump results, including whether the query was cached, the execution time, and the SQLt. For persistence CFCs, if metainfo="yes", returns property attributes such as getters and setters.
- _output_ - default is **browser**. Where to send the results of cfdump. The following values are valid: browser, console, and filename
- _showUDFs_ - default is **yes**. Includes UDFs, with the methods collapsed.

In **ACF9**, the _abort_ attribute was added. If this attribute is set to "true", it stops processing the current page at the tag location.

## History

- ColdFusion MX 6.1: Added the ability to dump COM objects; it displays the methods and Get and Put properties typeinfo information for the object.
- ColdFusion MX 7: Added the top attribute.
- ColdFusion 8: Added the show, format, hide, keys, metainfo, output, and showUDFs attributes.
- ColdFusion 9: Added the attribute abort.
