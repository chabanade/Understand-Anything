import { useDashboardStore } from "../store";
import { useI18n } from "../contexts/I18nContext";
import { formatStaleness } from "../utils/staleness";

/**
 * A thin banner shown when the knowledge graph is behind the repo's HEAD
 * (commits landed since it was built). Server-computed via /staleness.json;
 * renders nothing when the graph is fresh or staleness can't be determined.
 */
export default function StalenessBanner() {
  const staleness = useDashboardStore((s) => s.staleness);
  const { localeKey } = useI18n();

  if (!staleness || !staleness.available || staleness.commitsBehind <= 0) {
    return null;
  }

  return (
    <div
      role="status"
      className="px-3 py-1.5 text-xs text-center bg-amber-500/15 text-amber-300 border-b border-amber-500/30"
    >
      ⚠️ {formatStaleness(staleness.commitsBehind, localeKey)}
    </div>
  );
}
