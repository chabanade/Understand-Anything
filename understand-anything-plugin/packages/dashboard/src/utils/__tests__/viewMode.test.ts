import { describe, it, expect } from "vitest";
import { shouldUseKnowledgeView } from "../viewMode";

const file = { type: "file" as const };
const doc = { type: "document" as const };
const fn = { type: "function" as const };

describe("shouldUseKnowledgeView", () => {
  it("honors an explicit kind", () => {
    expect(shouldUseKnowledgeView("knowledge", [file])).toBe(true);
    expect(shouldUseKnowledgeView("codebase", [doc])).toBe(false);
  });

  it("uses the structural view when the graph has code (file) nodes", () => {
    expect(shouldUseKnowledgeView(undefined, [file, fn])).toBe(false);
  });

  it("auto-switches to knowledge view for a docs-only graph (no file nodes)", () => {
    // The bug: a Markdown-only repo produced empty code clusters. With no file
    // nodes we now render the force-directed knowledge view instead.
    expect(shouldUseKnowledgeView(undefined, [doc, doc])).toBe(true);
  });

  it("defaults to knowledge view for an empty node set", () => {
    expect(shouldUseKnowledgeView(undefined, [])).toBe(true);
  });
});
