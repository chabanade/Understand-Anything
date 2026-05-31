export interface StalenessInfo {
  available: boolean;
  /** Commits the analyzed repo has advanced since the graph was built. */
  commitsBehind: number;
  graphCommit?: string;
}

/**
 * Localized one-line staleness message. Kept self-contained (not in the i18n
 * locale objects) so adding it doesn't force a key into all seven locale files.
 * Falls back to English for unknown locales.
 */
export function formatStaleness(commitsBehind: number, localeKey: string): string {
  const n = commitsBehind;
  const s = n > 1 ? "s" : "";
  const messages: Record<string, string> = {
    en: `Graph is ${n} commit${s} behind — re-run /understand to refresh.`,
    fr: `Graphe en retard de ${n} commit${s} — relancez /understand pour le mettre à jour.`,
    zh: `知识图已落后 ${n} 个提交 — 请重新运行 /understand 更新。`,
    "zh-TW": `知識圖已落後 ${n} 個提交 — 請重新執行 /understand 更新。`,
    ja: `グラフは ${n} コミット遅れています — /understand を再実行して更新してください。`,
    ko: `그래프가 ${n} 커밋 뒤처져 있습니다 — /understand 를 다시 실행하세요.`,
    ru: `Граф отстаёт на ${n} коммит(ов) — перезапустите /understand для обновления.`,
  };
  return messages[localeKey] ?? messages.en;
}
