import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILL = resolve(
  __dirname,
  "../../../understand-anything-plugin/skills/understand/SKILL.md",
);

describe("SKILL.md — token-cost estimate + --max-files", () => {
  const doc = readFileSync(SKILL, "utf-8");

  it("documents the --max-files flag in the options list", () => {
    expect(doc).toContain("`--max-files <N>`");
  });

  it("prints a cost estimate before the expensive LLM phase", () => {
    expect(doc).toContain("Estimated analysis size");
    expect(doc.toLowerCase()).toContain("estimate");
  });

  it("never silently truncates — skipped files are reported", () => {
    expect(doc.toLowerCase()).toContain("never");
    expect(doc).toMatch(/Skipped|skipped/);
  });

  it("propagates the cap to batching by trimming scan-result.json", () => {
    expect(doc).toContain("scan-result.json");
    expect(doc).toContain("--max-files");
  });
});
