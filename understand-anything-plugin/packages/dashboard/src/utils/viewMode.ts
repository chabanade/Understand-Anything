import type { GraphNode } from "@understand-anything/core/types";

/**
 * Decide whether to render the force-directed knowledge view instead of the
 * code-oriented structural view.
 *
 * The structural view groups nodes into folder/code clusters and only lays out
 * `file` (and function/class) nodes well. A Markdown-only repo produces no
 * `file` nodes, so the structural view shows empty clusters. In that case (no
 * structural code nodes, and not an explicit codebase) we fall back to the
 * force-directed knowledge view, which renders every node.
 */
export function shouldUseKnowledgeView(
  kind: string | undefined,
  nodes: Pick<GraphNode, "type">[],
): boolean {
  if (kind === "knowledge") return true;
  if (kind === "codebase") return false;
  return !nodes.some((n) => n.type === "file");
}
