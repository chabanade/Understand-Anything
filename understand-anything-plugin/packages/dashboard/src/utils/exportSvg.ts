// Pure SVG builder for the graph export (PNG/SVG). Extracted from ExportMenu so
// it can be unit-tested and so colors come from the ACTIVE theme instead of
// being hardcoded to the dark-gold palette.

export interface ExportColors {
  /** Canvas background. */
  background: string;
  /** Node rectangle fill. */
  nodeFill: string;
  /** Node rectangle border. */
  nodeStroke: string;
  /** Edge line color. */
  edge: string;
  /** Node label text color. */
  text: string;
}

export interface ExportNode {
  id: string;
  type?: string;
  position: { x: number; y: number };
  width?: number | null;
  height?: number | null;
  data?: { label?: unknown };
}

export interface ExportEdge {
  source: string;
  target: string;
}

export interface ExportSvgResult {
  svgContent: string;
  width: number;
  height: number;
}

export function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Build a standalone SVG of the graph using the supplied theme colors.
 * Returns null when there are no nodes to draw.
 */
export function buildGraphSvg(
  nodes: ExportNode[],
  edges: ExportEdge[],
  colors: ExportColors,
): ExportSvgResult | null {
  if (nodes.length === 0) return null;

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  nodes.forEach((node) => {
    const x = node.position.x;
    const y = node.position.y;
    const width = node.width ?? 200;
    const height = node.height ?? 80;
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x + width);
    maxY = Math.max(maxY, y + height);
  });

  const padding = 40;
  const width = maxX - minX + padding * 2;
  const height = maxY - minY + padding * 2;
  const offsetX = -minX + padding;
  const offsetY = -minY + padding;

  let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`;
  svgContent += `<rect width="100%" height="100%" fill="${colors.background}"/>`;

  edges.forEach((edge) => {
    const sourceNode = nodes.find((n) => n.id === edge.source);
    const targetNode = nodes.find((n) => n.id === edge.target);
    if (!sourceNode || !targetNode) return;

    const sx = sourceNode.position.x + (sourceNode.width ?? 200) / 2 + offsetX;
    const sy = sourceNode.position.y + (sourceNode.height ?? 80) / 2 + offsetY;
    const tx = targetNode.position.x + (targetNode.width ?? 200) / 2 + offsetX;
    const ty = targetNode.position.y + (targetNode.height ?? 80) / 2 + offsetY;

    svgContent += `<line x1="${sx}" y1="${sy}" x2="${tx}" y2="${ty}" stroke="${colors.edge}" stroke-opacity="0.3" stroke-width="1.5"/>`;
  });

  nodes.forEach((node) => {
    if (node.type === "group") return;

    const x = node.position.x + offsetX;
    const y = node.position.y + offsetY;
    const w = node.width ?? 200;
    const h = node.height ?? 80;

    svgContent += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${colors.nodeFill}" stroke="${colors.nodeStroke}" stroke-opacity="0.4" stroke-width="1"/>`;
    svgContent += `<text x="${x + w / 2}" y="${y + h / 2}" fill="${colors.text}" text-anchor="middle" dominant-baseline="middle" font-size="12">${escapeXml(String(node.data?.label ?? node.id))}</text>`;
  });

  svgContent += `</svg>`;
  return { svgContent, width, height };
}
