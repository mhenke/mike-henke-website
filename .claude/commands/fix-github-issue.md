---
description: "Analyze and fix GitHub issue with comprehensive workflow"
---

**🔒 SECURITY VERIFICATION REQUIRED**
Before documenting any solution details, verify no sensitive information is exposed.

Please analyze and fix the GitHub issue: $ARGUMENTS.

**📋 Issue Analysis & Fix Workflow:**

1. **Get Issue Details**: Use `gh issue view $ARGUMENTS` to fetch issue details
2. **Update Documentation**: Add issue to `.claude/issues/plan_$ARGUMENTS.md`
3. **Understand Problem**: Analyze the issue description and reproduction steps
4. **Search Codebase**: Find relevant files using search tools
5. **Plan Solution**: Document approach in the issue plan file
6. **Implement Changes**: Make necessary code modifications
7. **Test Thoroughly**:
   - Run existing tests
   - Write new tests if needed
   - Verify the fix works as expected
8. **Code Quality**: Run `npm run lint` and `npm run format` (per CLAUDE.md)
9. **Document Changes**: Update `.claude/changes-log.md` with all modifications
10. **Commit**: Create descriptive commit with "🤖 Generated with Claude Code" footer
11. **Create PR**: Use `gh pr create` with proper description

**🏗️ Project-Specific Guidelines:**

- Follow Eleventy/Nunjucks patterns established in codebase
- Maintain dark theme design consistency (#19d4fe accent)
- Preserve WordPress post routing at root level
- Test with `npm run dev` for live reload verification
- Check responsive design at 768px, 900px, 1200px breakpoints

**💡 Remember:**

- Use GitHub CLI (`gh`) for all GitHub operations
- Update issue with progress comments if needed
- Reference issue number in commit messages
- Maintain security best practices throughout
