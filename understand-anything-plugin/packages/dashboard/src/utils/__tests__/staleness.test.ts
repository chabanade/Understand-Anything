import { describe, it, expect } from "vitest";
import { formatStaleness } from "../staleness";

describe("formatStaleness", () => {
  it("localizes the message (fr/en)", () => {
    expect(formatStaleness(3, "fr")).toContain("retard de 3 commits");
    expect(formatStaleness(3, "en")).toContain("3 commits behind");
  });

  it("handles singular vs plural", () => {
    expect(formatStaleness(1, "en")).toContain("1 commit behind");
    expect(formatStaleness(2, "en")).toContain("2 commits behind");
    expect(formatStaleness(1, "fr")).toContain("1 commit ");
  });

  it("falls back to English for unknown locales", () => {
    expect(formatStaleness(5, "de")).toBe(formatStaleness(5, "en"));
  });

  it("mentions re-running /understand", () => {
    expect(formatStaleness(2, "fr")).toContain("/understand");
    expect(formatStaleness(2, "en")).toContain("/understand");
  });
});
