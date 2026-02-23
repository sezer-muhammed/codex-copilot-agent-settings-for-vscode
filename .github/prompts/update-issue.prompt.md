---
name: "update-issue"
description: "Summarize work progress and verification into a structured GitHub issue comment"
agent: "GitHub Issue Manager"
target: "vscode"
---

## Task
**UPDATE mode**: Produce a structured comment on an existing GitHub issue following a completed task or verification.

The agent MUST attempt to post the comment using available GitHub tooling (GitKraken MCP or `gh` CLI).

## Inputs
- Issue number / URL: ${input:issue:Which issue are we updating?}
- Summary of work: ${input:changes:What was completed/changed?}
- Remaining tasks: ${input:remaining:What is still pending?}
- Verification results: ${input:verification:Test results or 'Not Run'}
- Relevant links: ${input:links:PR ID, commit SHAs, or docs URLs}
- Close issue: ${input:close:true|false (Set to true if tasks are completed and verification passed)}
- Dry run: ${input:dry_run:true|false (default false)}

## Tooling Requirement
- MUST attempt to post the comment using **real-world tooling** when `dry_run=false`.
- The agent SHOULD prioritize **GitKraken MCP** (`gitkraken/issues_add_comment`) if available.
- If MCP is unavailable, the agent MUST fallback to the **`gh issue comment`** CLI command (via `execute/runInTerminal`).
- If `close_issue=true`, the agent MUST also close the issue using **`gh issue close <number>`**.
- If all attempts fail, output the fully formed comment draft and the error details.

## Execution Rules

### Comment template (REQUIRED)
Each posted comment MUST follow this structure:

### Progress Summary
One paragraph summary of current status and impact.

### Completed
- [x] Item 1 (extracted from input)

### Remaining / Risks
- [ ] Item 1 (extracted from input)

### Verification
- Command: `...`
- Result: `...` (or "Not Run")

### Links
- PR: [ID/URL]
- Commits: [SHA]

## Execution Workflow

When `dry_run=false`:
1. Generate the comment content according to the template.
2. Identify the target issue number from the input.
3. Post the comment using:
   - `gitkraken/issues_add_comment` **OR**
   - `gh issue comment <number> --body "<content>"`
4. If `Close issue` is true or if all tasks are completed and verification passed, close the issue:
   - `gh issue close <number>`
5. Return a summary showing the target issue, update status, and closure status.

When `dry_run=true`:
- Do NOT post the comment.
- Output the draft content only.

## Output (REQUIRED)
- **Target Issue**: URL or Number
- **Update Status**: Success/Failure
- **Draft/Final Comment Content**
- **Error Logic** (if failure occurred)