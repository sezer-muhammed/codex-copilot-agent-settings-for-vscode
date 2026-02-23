---
name: "doc"
description: "Create or update documentation for a technical change"
agent: "Implementer"
tools: ["search", "read", "edit"]
---

Documentation task: ${input:task:What changed and what should be documented?}
Audience: ${input:audience:Developers, operators, end users, or mixed}

Required output:
1. Intent and constraints
2. Docs updated and why
3. Any behavior/API changes captured
4. Follow-up docs gaps

Rules:
- Prefer concise, actionable documentation.
- Keep examples sanitized and free of secrets.
