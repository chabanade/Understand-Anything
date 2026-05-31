import { useEffect, useRef, useState } from "react";
import { useDashboardStore } from "../store";
import { useI18n } from "../contexts/I18nContext";
import type { LocaleKey } from "../locales/index.ts";

// Self-describing native labels — no translation key needed (and so we don't
// have to touch every locale file to add a "Language" string).
export const LANGUAGES: { key: LocaleKey; label: string }[] = [
  { key: "en", label: "English" },
  { key: "fr", label: "Français" },
  { key: "zh", label: "简体中文" },
  { key: "zh-TW", label: "繁體中文" },
  { key: "ja", label: "日本語" },
  { key: "ko", label: "한국어" },
  { key: "ru", label: "Русский" },
];

export function LanguagePicker() {
  const setUiLocale = useDashboardStore((s) => s.setUiLocale);
  const { localeKey } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  const current = LANGUAGES.find((l) => l.key === localeKey) ?? LANGUAGES[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-2 py-1 rounded text-xs text-text-secondary hover:text-text-primary transition-colors"
        title={current.label}
        aria-label="Change language"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className="hidden sm:inline">{current.label}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 rounded-lg glass-heavy shadow-xl z-50 p-2 space-y-1">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.key}
              onClick={() => {
                setUiLocale(lang.key);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-xs transition-colors ${
                lang.key === localeKey
                  ? "bg-accent/15 text-accent"
                  : "text-text-secondary hover:text-text-primary hover:bg-elevated"
              }`}
            >
              <span>{lang.label}</span>
              {lang.key === localeKey && (
                <svg
                  className="ml-auto w-3.5 h-3.5 text-accent"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
