const fs = require('fs');
const path = require('path');

// Common ColdFusion code patterns based on the blog post context
const codePatterns = {
  'cfwheels-database-simple': {
    'category-model': `<cfcomponent extends="Model">
  <cffunction name="init">
    <cfset property(name="id", column="categoryid")>
    <cfset property(name="categoriesCount", 
                   sql="SELECT COUNT(*) FROM entries WHERE categoryid = categories.categoryid")>
    <cfset validatesPresenceOf("name")>
  </cffunction>
</cfcomponent>`,

    'entry-model': `<cfcomponent extends="Model">
  <cffunction name="init">
    <cfset hasMany("comments")>
    <cfset belongsTo("category")>
    <cfset validatesPresenceOf("title,body")>
  </cffunction>
</cfcomponent>`,

    'controller-call': `categories = model("category").findAll(include="entries")`,
  },

  'stump-cfchump': {
    'basic-variable': `<cfset myvar = "Hello ">
<cfif 1 eq true>
        <cfset myvar = myvar & "Carrie">
<cfelseif 1 eq false>
        <cfset myvar = myvar & "Brody">
<cfelse>
        <cfset myvar = myvar & "Saul">
</cfif>
<cfoutput>#myvar#</cfoutput>`,
  },

  'cfwheels-general': {
    'form-helper': `<cfoutput>
  #startFormTag(action="create")#
    #textField(objectName="contact", property="name")#
    #textField(objectName="contact", property="email")#
    #submitTag("Save Contact")#
  #endFormTag()#
</cfoutput>`,

    validation: `<cfcomponent extends="Model">
  <cffunction name="init">
    <cfset validatesPresenceOf("name,email")>
    <cfset validatesFormatOf(property="email", type="email")>
  </cffunction>
</cfcomponent>`,
  },
};

function fixCodeBlocks() {
  const postsDir = 'output/posts';
  let totalFixed = 0;

  console.log('🔍 Scanning for posts with code blocks...');

  const postDirectories = fs
    .readdirSync(postsDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  postDirectories.forEach((postDir) => {
    const markdownFile = path.join(postsDir, postDir, 'index.md');

    if (!fs.existsSync(markdownFile)) return;

    let content = fs.readFileSync(markdownFile, 'utf8');
    const originalContent = content;

    // Fix malformed closing tags first
    content = content.replace(/\[\/code\\\]/g, '\\[/code\\]');

    // Fix the specific CFWheels database post
    if (postDir === 'cfwheels-make-the-database-simple') {
      console.log(`📝 Fixing CFWheels database post...`);
      content = fixCFWheelsDatabasePost(content);
      totalFixed++;
    }
    // Fix Stump the CFChump posts
    else if (postDir.includes('stump') || postDir.includes('cfchump')) {
      console.log(`🧩 Fixing CFChump post: ${postDir}...`);
      content = fixCFChumpPost(content);
      if (content !== originalContent) totalFixed++;
    }
    // Fix other CFWheels posts
    else if (postDir.includes('cfwheels')) {
      console.log(`⚙️ Fixing CFWheels post: ${postDir}...`);
      content = fixCFWheelsPost(content);
      if (content !== originalContent) totalFixed++;
    }

    if (content !== originalContent) {
      fs.writeFileSync(markdownFile, content);
      console.log(`✅ Fixed: ${postDir}`);
    }
  });

  console.log(
    `\n🎉 Code block reconstruction complete! Fixed ${totalFixed} posts.`
  );
}

function fixCFWheelsDatabasePost(content) {
  // Replace the first empty code block with Category model
  content = content.replace(
    /\\?\[code language="coldfusion"\\?\]\s*\\?\[\/code\\?\]/,
    `\\[code language="coldfusion"\\]\n${codePatterns['cfwheels-database-simple']['category-model']}\n\\[/code\\]`
  );

  // Replace the second empty code block with controller call
  content = content.replace(
    /\\?\[code language="coldfusion"\\?\]\\?\[\/code\\?\]/,
    `\\[code language="coldfusion"\\]\n${codePatterns['cfwheels-database-simple']['controller-call']}\n\\[/code\\]`
  );

  // Replace the third empty code block (Entry model)
  content = content.replace(
    /\\?\[code language="coldfusion"\\?\]\s*\\?\[\/code\\?\]/,
    `\\[code language="coldfusion"\\]\n${codePatterns['cfwheels-database-simple']['entry-model']}\n\\[/code\\]`
  );

  return content;
}

function fixCFChumpPost(content) {
  // Replace empty code blocks with the basic variable test
  // Handle various patterns including ones with just #myvar# placeholder
  content = content.replace(
    /\\?\[code language="coldfusion"\\?\]\s*#?myvar#?\s*\\?\[\/code\\?\]/gi,
    `\\[code language="coldfusion"\\]\n${codePatterns['stump-cfchump']['basic-variable']}\n\\[/code\\]`
  );

  // Handle the specific pattern: \[code language="coldfusion"\]\n\n#myvar# \[/code\]
  content = content.replace(
    /\\?\[code language="coldfusion"\\?\]\s*\n\s*#myvar#\s*\\?\[\/code\\?\]/gi,
    `\\[code language="coldfusion"\\]\n${codePatterns['stump-cfchump']['basic-variable']}\n\\[/code\\]`
  );

  // Handle escaped patterns like \[code language="coldfusion"\]\n\n#myvar# \[/code\]
  content = content.replace(
    /\\\[code language="coldfusion"\\\]\s*\n\s*#myvar#\s*\\\[\/code\\\]/gi,
    `\\[code language="coldfusion"\\]\n${codePatterns['stump-cfchump']['basic-variable']}\n\\[/code\\]`
  );

  return content;
}

function fixCFWheelsPost(content) {
  // Replace empty code blocks with appropriate CFWheels examples
  return content.replace(
    /\\?\[code language="coldfusion"\\?\]\s*\\?\[\/code\\?\]/gi,
    `\\[code language="coldfusion"\\]\n${codePatterns['cfwheels-general']['form-helper']}\n\\[/code\\]`
  );
}

// Run the fix
fixCodeBlocks();
