---
title: "Is it customary to have SQL in CFWheels Controllers?"
date: 2012-07-18
categories: 
  - "cfwheels"
---

I had this question emailed to me "Is it customary to have SQL in CFWheels Controllers?"

**No. If it is very complex sql or a stored proc, I would create a cfc representing it in the models folder like this:**

models/myStoredProc.cfc

\[code language="coldfusion"\]
<cfcomponent extends="Model">
<cffunction name="myfirststoredproc">
<cfstoredproc procedure="spListRegions">
<cfprocresult name="qRegions">
 </cfstoredproc>
<cfreturn spListRegions>
</cffunction>
</cfcomponent>
\\[/code\]

then in the controller call and pass in the values:

\[code language="coldfusion"\]
<cfset smellyCode= model("myStoredProc").myfirststoredproc(1)>
\\[/code\]

Once using wheels, you'll get a smell testing going. Complex SQL and stored procs will seem out of place in the actual controller since the Controller should only gather and process. Hopefully this helps :-)
