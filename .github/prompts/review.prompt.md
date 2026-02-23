---
name: "review"
description: "Perform a structured review with severity buckets and precise file references"
agent: "Reviewer"
tools: ["search", "read", "fetch"]
---

Review scope: ${input:scope:Changed files, PR diff, or directory}

Required output:
1. Must-fix issues
2. Should-fix issues
3. Suggestions
4. Verification commands

Rules:
- Include exact file references for every must-fix/should-fix item.
- Prioritize correctness first, then security, maintainability, and performance.
