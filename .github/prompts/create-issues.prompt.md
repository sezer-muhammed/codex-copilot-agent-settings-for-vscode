---
name: "create-issues"
description: "Convert review findings into structured GitHub issue drafts"
agent: "GitHub Issue Manager"
[vscode, execute, read, agent, edit, search, web, 'gitkraken/*', todo]
---

## Task
**CREATE mode**: Convert review findings into one or more GitHub issues and **create them in GitHub** using **GitKraken MCP**.

## Inputs
Paste review output or provide scope:
${input:review:Reviewer output (Must-fix/Should-fix) OR PR diff/context OR directory}

Optional configuration:
- Repository: ${input:repo:owner/repo (if not inferable)}
- Labels convention: ${input:labels:comma-separated labels (e.g., bug, tech-debt, security)}
- Priority scheme: ${input:priority_scheme:P0/P1/P2 or High/Med/Low}
- Default assignee(s): ${input:assignees:optional}
- Milestone: ${input:milestone:optional}
- Dry run: ${input:dry_run:true|false (default false)}

## MCP requirement
- MUST use **GitKraken MCP** GitHub tooling to **create the issues** when `dry_run=false`.
- If MCP is unavailable or fails, output fully formed issue drafts (title/body/labels) and the exact failure reason.

## Splitting rules
- Create separate issues by **root cause**, **component**, or **risk level** (security/correctness separate).
- Avoid “mega issues”: if scope is large, create a parent issue + child issues.

## Non-negotiable rules
- MUST include file references for each actionable item when available:
  - `path/to/file.ext:Lx-Ly` (approx ranges acceptable if exact lines are unavailable).
- MUST keep issues single-purpose and reviewable.
- MUST avoid speculation: if info is missing, add a “Needs confirmation” bullet.
- MUST enforce fail-fast expectations: **no silent fallback**; errors must surface.
- MUST include **acceptance criteria** and **verification commands**.

## Issue format (body template)
Use this exact structure for each created issue:

### Problem
### Evidence
- `path:Lx-Ly` — ...
### Expected behavior
### Acceptance criteria
- [ ] ...
### Tasks / Approach
- [ ] ...
### Verification
- Command(s):
  - `...`
- Expected results:
  - ...

## GitHub creation instructions (tool usage)
When `dry_run=false`:
1) For each issue, call GitKraken MCP to create the issue with:
   - title
   - body (template above)
   - labels (from input or best-fit suggestions)
   - assignees/milestone if provided
2) After creation, return a summary list:
   - Issue title → created issue URL/number
   - Labels applied
   - Any follow-ups if creation partially failed

When `dry_run=true`:
- Do not create issues; output drafts only in the same structure.

## Output (required)
### Created issues
- Title — URL/number — labels — priority
### If any failures
- Which issue failed + why + draft preserved