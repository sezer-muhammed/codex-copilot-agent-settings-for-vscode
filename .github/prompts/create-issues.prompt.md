---
name: "create-issues"
description: "Convert review findings into structured GitHub issues"
agent: "GitHub Issue Manager"
---

## Task
CREATE mode: Convert review findings into one or more GitHub issues and create them in GitHub.

The agent MUST attempt issue creation using available GitHub tooling exposed through MCP (including GitKraken MCP when available).

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

## Tooling Requirement
- MUST attempt issue creation using **real-world tooling** when `dry_run=false`.
- The agent SHOULD prioritize **MCP GitHub tooling** (e.g., `gitkraken/issues_create`) if available.
- If MCP issue creation tools are unavailable, the agent MUST fallback to the **`gh` CLI** (using `execute/runInTerminal`).
- If all creation attempts fail:
  - output fully formed issue drafts,
  - clearly explain the failure reason (e.g., tool not found, authentication error),
  - preserve all generated issue content without loss.

## Execution Rules

### Creation behavior
- When `dry_run=false`, the agent MUST execute the creation command(s).
- Issues must be generated first, then created.
- Creation must follow the defined issue template exactly.

### Splitting rules
Create separate issues when:
- root causes differ,
- components or modules differ,
- severity differs (security vs correctness),
- scope exceeds a reasonable single change.

Avoid mega-issues. Prefer focused, reviewable work units.

## Non-Negotiable Rules
- MUST include file references when available using format:
  path/to/file.ext:Lx-Ly
- MUST keep each issue single-purpose.
- MUST avoid speculation; unknown details must be marked as "Needs confirmation".
- MUST enforce fail-fast expectations:
  - no silent fallback behavior,
  - failures must be visible and actionable.
- MUST include acceptance criteria and verification steps.

## Issue Body Template (REQUIRED)

Each created issue MUST follow this structure:

Title  
Clear, searchable title describing component + problem.

Problem  
Clear description of the issue and its impact.

Evidence  
- path:Lx-Ly — explanation

Expected behavior  
What should happen instead.

Acceptance criteria  
- [ ] Condition 1  
- [ ] Condition 2

Tasks / Approach  
- [ ] Implementation step  
- [ ] Validation step

Verification  
Commands or actions required to confirm the fix, plus expected successful outcome.

Labels  
Applicable labels from provided conventions or inferred best-fit.

Priority  
Priority level according to provided scheme.

## Execution Workflow

When `dry_run=false`:
1. Generate the issue content according to the template.
2. Create each issue using either:
   - **MCP GitHub creation tools** (if recognized in the toolset), **OR**
   - **`gh issue create`** CLI command as a robust fallback.
3. Apply:
   - Labels (using `--label` for CLI)
   - Assignees (using `--assignee` for CLI)
   - Milestone (using `--milestone` for CLI)
4. Return a summary list with the URLs of the created issues.

When `dry_run=true`:
- Do NOT create issues.
- Output drafts only using the same structure.

## Output (REQUIRED)

Created Issues
- Title — Issue URL/Number — Labels — Priority

Failures (if any)
- Issue title
- Failure reason
- Draft issue preserved below