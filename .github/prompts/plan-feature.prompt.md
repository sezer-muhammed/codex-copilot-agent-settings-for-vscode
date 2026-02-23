---
name: "plan-feature"
description: "Create a phased implementation plan with assumptions, risk controls, and test strategy"
agent: "Planner"
---

Task: ${input:feature:Describe the feature}

Context:
- Impacted area: ${input:area:Which folder/package is impacted?}
- Constraints: ${input:constraints:Compatibility, performance, security, timeline}
- Guidance spine: [AGENTS.md](../../AGENTS.md)

Output format (required):
1. Intent and constraints
2. Assumptions + open questions (max 2 questions)
3. Phased plan with file targets
4. Test strategy (unit/integration/e2e as needed)
5. Risks, rollout, and fallback

Constraints:
- Do not write code.
- Prefer the smallest shippable milestone first.
