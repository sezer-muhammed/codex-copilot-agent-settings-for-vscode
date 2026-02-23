#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
const warnings = [];

function exists(relPath) {
  return fs.existsSync(path.join(root, relPath));
}

function read(relPath) {
  return fs.readFileSync(path.join(root, relPath), "utf8");
}

function walkMarkdown(relPath) {
  const abs = path.join(root, relPath);
  if (!fs.existsSync(abs)) return [];
  const out = [];
  for (const entry of fs.readdirSync(abs, { withFileTypes: true })) {
    const childRel = path.join(relPath, entry.name).replace(/\\/g, "/");
    const childAbs = path.join(root, childRel);
    if (entry.isDirectory()) {
      out.push(...walkMarkdown(childRel));
    } else if (entry.isFile() && childRel.endsWith(".md")) {
      out.push(childRel);
    }
  }
  return out;
}

function listFiles(relPath, suffix) {
  const abs = path.join(root, relPath);
  if (!fs.existsSync(abs)) return [];
  return fs
    .readdirSync(abs, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.endsWith(suffix))
    .map((d) => path.join(relPath, d.name).replace(/\\/g, "/"));
}

function parseFrontmatter(content, relPath) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) {
    errors.push(`${relPath}: missing YAML frontmatter block`);
    return { data: {}, body: content };
  }
  const raw = match[1];
  const data = {};
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("- ")) continue;
    const idx = trimmed.indexOf(":");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    if (key) data[key] = value;
  }
  return { data, body: content.slice(match[0].length) };
}

function validateRequiredFiles() {
  const required = ["AGENTS.md", ".github/copilot-instructions.md"];
  for (const rel of required) {
    if (!exists(rel)) errors.push(`${rel}: missing required file`);
  }

  const requiredDirs = [
    ".github/instructions",
    ".github/prompts",
    ".github/agents",
  ];
  for (const rel of requiredDirs) {
    if (!exists(rel)) errors.push(`${rel}: missing required directory`);
  }
}

function validateInstructions() {
  const files = listFiles(".github/instructions", ".instructions.md");
  if (files.length === 0) warnings.push("No .instructions.md files found in .github/instructions");

  for (const rel of files) {
    const { data } = parseFrontmatter(read(rel), rel);
    if (!data.description) errors.push(`${rel}: frontmatter requires description`);
    if (!data.applyTo) errors.push(`${rel}: frontmatter requires applyTo`);
  }
}

function validatePrompts() {
  const files = listFiles(".github/prompts", ".prompt.md");
  if (files.length === 0) warnings.push("No .prompt.md files found in .github/prompts");

  for (const rel of files) {
    const { data } = parseFrontmatter(read(rel), rel);
    if (!data.description) errors.push(`${rel}: frontmatter requires description`);
  }
}

function validateAgents() {
  const files = listFiles(".github/agents", ".agent.md");
  if (files.length === 0) warnings.push("No .agent.md files found in .github/agents");

  const basenameSeen = new Set();
  const nameSeen = new Set();
  const filenameRegex = /^[a-z0-9][a-z0-9-]*\.agent\.md$/;

  for (const rel of files) {
    const filename = path.basename(rel);
    if (!filenameRegex.test(filename)) {
      errors.push(`${rel}: filename should match lowercase kebab-case .agent.md pattern`);
    }

    const basename = filename.replace(/\.agent\.md$/, "");
    if (basenameSeen.has(basename)) {
      errors.push(`${rel}: duplicate agent basename '${basename}'`);
    }
    basenameSeen.add(basename);

    const { data, body } = parseFrontmatter(read(rel), rel);
    if (!data.name) {
      errors.push(`${rel}: frontmatter requires name`);
    } else if (nameSeen.has(data.name)) {
      errors.push(`${rel}: duplicate frontmatter name '${data.name}'`);
    } else {
      nameSeen.add(data.name);
    }

    if (!data.description) errors.push(`${rel}: frontmatter requires description`);
    if (body.length > 30000) errors.push(`${rel}: body exceeds 30000 characters`);
  }
}

function validateRelativeLinks() {
  const files = ["AGENTS.md", ...walkMarkdown(".github")].filter((rel) => exists(rel));
  const linkRegex = /\[[^\]]*\]\(([^)]+)\)/g;

  for (const rel of files) {
    const content = read(rel);
    let match;
    while ((match = linkRegex.exec(content)) !== null) {
      const target = match[1].trim();
      if (!target || target.startsWith("http://") || target.startsWith("https://") || target.startsWith("mailto:") || target.startsWith("#")) {
        continue;
      }
      if (target.includes("${")) {
        continue;
      }
      const clean = target.split("#")[0].split("?")[0];
      if (!clean || clean.includes("*")) continue;
      const resolved = path.resolve(root, path.dirname(rel), clean);
      if (!fs.existsSync(resolved)) {
        errors.push(`${rel}: broken relative link '${target}'`);
      }
    }
  }
}

function printAndExit() {
  if (warnings.length) {
    console.log("Warnings:");
    for (const w of warnings) console.log(`- ${w}`);
  }

  if (errors.length) {
    console.error("Errors:");
    for (const e of errors) console.error(`- ${e}`);
    process.exit(1);
  }

  console.log("Copilot config validation passed.");
}

validateRequiredFiles();
validateInstructions();
validatePrompts();
validateAgents();
validateRelativeLinks();
printAndExit();
