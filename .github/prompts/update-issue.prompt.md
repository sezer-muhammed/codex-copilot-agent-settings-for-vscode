---
name: "update-issue"
description: "Write an issue update comment based on completed work and remaining tasks"
agent: "GitHub Issue Manager"
[vscode, execute, read, agent, edit, search, web, 'gitkraken/*', todo]
---

## Task
UPDATE mode.

Inputs:
- Issue text (or key excerpt): ${input:issue:paste issue body or relevant sections}
- Work completed (diff/summary): ${input:changes:paste PR summary/diff or file list}
- Links: ${input:links:PR URL/ID, commit SHA, docs links}
- Verification: ${input:verification:commands run + results, or 'not run'}

Rules:
- Be factual; don’t claim verification unless provided.
- Include file references where possible.
- Call out remaining work + risks.