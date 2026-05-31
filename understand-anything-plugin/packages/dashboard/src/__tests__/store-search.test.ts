import { describe, it, expect } from "vitest";
import { useDashboardStore } from "../store";
import type { KnowledgeGraph } from "@understand-anything/core/types";

const graph = {
  version: "1.0.0",
  project: {
    name: "t",
    languages: [],
    frameworks: [],
    description: "",
    analyzedAt: "2026-01-01T00:00:00.000Z",
    gitCommitHash: "x",
  },
  nodes: [
    { id: "a", type: "file", name: "auth.ts", summary: "authentication and login flow", tags: ["auth"], complexity: "simple" },
    { id: "b", type: "file", name: "db.ts", summary: "database pool", tags: ["data"], complexity: "simple" },
  ],
  edges: [],
  layers: [],
  tour: [],
} as unknown as KnowledgeGraph;

describe("store — search modes & semantic fallback", () => {
  it("fuzzy mode returns lexical results", () => {
    const s = useDashboardStore.getState();
    s.setGraph(graph);
    s.setSearchMode("fuzzy");
    s.setSearchQuery("auth");
    const results = useDashboardStore.getState().searchResults;
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].nodeId).toBe("a");
  });

  it("semantic mode WITHOUT embeddings falls back to fuzzy (no throw)", () => {
    const s = useDashboardStore.getState();
    s.setGraph(graph);
    expect(useDashboardStore.getState().semanticEngine).toBeNull();
    s.setSearchMode("semantic");
    expect(() => s.setSearchQuery("auth")).not.toThrow();
    // Falls back to the fuzzy result immediately.
    expect(useDashboardStore.getState().searchResults[0]?.nodeId).toBe("a");
  });

  it("setEmbeddings builds the semantic engine from the loaded graph", () => {
    const s = useDashboardStore.getState();
    s.setGraph(graph);
    s.setEmbeddings({ a: [1, 0, 0], b: [0, 1, 0] });
    expect(useDashboardStore.getState().semanticEngine).not.toBeNull();
  });

  it("setEmbeddings is a no-op when no graph is loaded", () => {
    // Fresh module state has graph=null; calling setEmbeddings must not throw.
    const s = useDashboardStore.getState();
    expect(() => s.setEmbeddings({ a: [1, 0, 0] })).not.toThrow();
  });
});
