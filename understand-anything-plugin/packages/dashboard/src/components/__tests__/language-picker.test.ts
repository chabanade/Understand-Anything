import { describe, it, expect, afterEach } from "vitest";
import { LANGUAGES } from "../LanguagePicker";
import { locales } from "../../locales/index.ts";
import { useDashboardStore } from "../../store";

describe("LanguagePicker / uiLocale", () => {
  afterEach(() => {
    // Reset the shared store so other suites are unaffected.
    useDashboardStore.getState().setUiLocale(null);
  });

  it("offers exactly the locales that are registered (no missing / extra)", () => {
    const offered = LANGUAGES.map((l) => l.key).sort();
    const registered = Object.keys(locales).sort();
    expect(offered).toEqual(registered);
  });

  it("gives every offered language a non-empty native label", () => {
    for (const lang of LANGUAGES) {
      expect(lang.label.trim().length).toBeGreaterThan(0);
    }
    // French is present (the whole point of the i18n work).
    expect(LANGUAGES.find((l) => l.key === "fr")?.label).toBe("Français");
  });

  it("store: setUiLocale overrides, null clears the override", () => {
    expect(useDashboardStore.getState().uiLocale).toBeNull();
    useDashboardStore.getState().setUiLocale("fr");
    expect(useDashboardStore.getState().uiLocale).toBe("fr");
    useDashboardStore.getState().setUiLocale(null);
    expect(useDashboardStore.getState().uiLocale).toBeNull();
  });
});
