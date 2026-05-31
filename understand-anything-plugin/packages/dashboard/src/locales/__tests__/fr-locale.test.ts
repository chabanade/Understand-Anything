import { describe, it, expect } from "vitest";
import en from "../en";
import fr from "../fr";
import { resolveLocaleKey, getLocale } from "../index";

// Recursively collect the structural "key paths" of an object so we can assert
// two locales expose exactly the same shape (no missing / extra keys).
function keyPaths(obj: unknown, prefix = ""): string[] {
  if (Array.isArray(obj)) {
    return obj.flatMap((item, i) => keyPaths(item, `${prefix}[${i}]`));
  }
  if (obj && typeof obj === "object") {
    return Object.keys(obj).flatMap((k) =>
      keyPaths((obj as Record<string, unknown>)[k], prefix ? `${prefix}.${k}` : k),
    );
  }
  return [prefix];
}

describe("French locale", () => {
  it("resolves fr / French / français / fr-FR to the 'fr' key", () => {
    expect(resolveLocaleKey("fr")).toBe("fr");
    expect(resolveLocaleKey("French")).toBe("fr");
    expect(resolveLocaleKey("francais")).toBe("fr");
    expect(resolveLocaleKey("français")).toBe("fr");
    expect(resolveLocaleKey("fr-FR")).toBe("fr");
  });

  it("is registered and returned by getLocale('fr')", () => {
    expect(getLocale("fr")).toBe(fr);
  });

  it("has exactly the same key structure as the English source of truth", () => {
    expect(keyPaths(fr)).toEqual(keyPaths(en));
  });

  it("has the same number of onboarding steps as English", () => {
    expect(fr.onboarding.steps).toHaveLength(en.onboarding.steps.length);
  });

  it("contains no leftover English placeholder values", () => {
    // Spot-check a few user-facing strings actually got translated.
    expect(fr.common.back).not.toBe(en.common.back);
    expect(fr.search.placeholder).not.toBe(en.search.placeholder);
  });
});
