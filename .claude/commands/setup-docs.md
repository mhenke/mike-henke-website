---
description: "Establish comprehensive documentation system in .claude folder"
---

**🔒 SECURITY VERIFICATION REQUIRED**

Before documenting ANY information, perform these security checks:

1. **Scan for secrets**: Check for API keys, passwords, tokens, credentials
2. **Review URLs**: Ensure no internal/private server addresses or endpoints
3. **Check personal data**: No email addresses, names, or personal identifiers
4. **Verify business logic**: No proprietary algorithms or sensitive code details
5. **Confirm public safety**: Only document what's safe for public git repositories

**✅ ONLY DOCUMENT IF ALL CHECKS PASS**

Create our documentation system in .claude folder:

1. **session-plan.md** - Current session's approach and goals
2. **changes-log.md** - Track all file modifications with timestamps
3. **context-notes.md** - Key decisions and context for future sessions

For specific features, also create:

- **issues/plan\_$ARGUMENTS.md** (implementation plan)
- **docs/plan\_$ARGUMENTS.md** (requirements)

**Your workflow should be:**

1. Always start by updating session-plan.md with what we're doing
2. Document every file change in changes-log.md as you work
3. Add important decisions and context to context-notes.md
4. When we start new sessions, read these files first to understand previous work

**Documentation format for changes-log.md:**

```
## [Timestamp] - [Brief description]
### Files Modified:
- path/to/file.py: [what changed]
### Files Added:
- path/to/newfile.py: [purpose]
### Files Removed:
- path/to/oldfile.py: [reason]
### Notes:
- [Any important context about these changes]
```

**🔐 SECURITY GUIDELINES:**

- Never document API keys, passwords, or credentials
- Avoid internal URLs or server configurations
- Use placeholder values for sensitive data (e.g., "API_KEY_HERE")
- Review all content before writing to files

Keep all documentation concise but comprehensive. This helps maintain context across sessions and makes resuming work seamless.

Always update these as you work. Start by reading any existing docs to understand previous work.

**Remember: Security verification FIRST, then document!**
