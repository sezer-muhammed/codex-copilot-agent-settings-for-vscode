---
name: "release-notes"
description: "Generate release notes from a set of changes with risk and rollout notes"
agent: "Planner"
---

Changes to summarize: ${input:changes:List commits, PRs, or change summary}
Release audience: ${input:audience:internal or external}

Output format:
1. Highlights
2. Breaking or behavior changes
3. Risk notes
4. Rollout and verification notes
5. Follow-up actions

Rules:
- Keep language clear and factual.
- Include only user-relevant changes.
