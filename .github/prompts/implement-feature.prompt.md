---
name: "implement-feature"
description: "Implement an approved plan with small diffs and explicit verification"
agent: "Implementer"
tools: ["search", "read", "edit", "execute", "fetch"]
---

Implement this plan: ${input:plan:Paste plan text}

Constraints:
- Scope limit: ${input:scope:Which files/areas are allowed?}
- Non-goals: ${input:nongoals:What should be avoided?}

Required output:
1. Intent and constraints
2. Plan executed
3. File-by-file change list
4. Verification commands and results
5. Risks and follow-ups

Rules:
- Keep diffs small and reviewable.
- Ask clarifying questions only when ambiguity changes design or touches sensitive paths.
