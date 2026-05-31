import { describe, it, expect } from "vitest";
import { buildGraphSvg, escapeXml, type ExportColors, type ExportNode } from "../exportSvg";

const LIGHT: ExportColors = {
  background: "#ffffff",
  nodeFill: "#eeeeee",
  nodeStroke: "#123456",
  edge: "#654321",
  text: "#abcdef",
};

const nodes: ExportNode[] = [
  { id: "a", position: { x: 0, y: 0 }, width: 100, height: 50, data: { label: "Node A" } },
  { id: "b", position: { x: 200, y: 100 }, width: 100, height: 50, data: { label: "Node B" } },
];
const edges = [{ source: "a", target: "b" }];

describe("buildGraphSvg", () => {
  it("returns null when there are no nodes", () => {
    expect(buildGraphSvg([], [], LIGHT)).toBeNull();
  });

  it("uses the supplied theme colors, not the old hardcoded dark palette", () => {
    const result = buildGraphSvg(nodes, edges, LIGHT);
    expect(result).not.toBeNull();
    const svg = result!.svgContent;
    // background rect follows the theme
    expect(svg).toContain('fill="#ffffff"');
    expect(svg).not.toContain("#0a0a0a"); // old hardcoded background
    expect(svg).not.toContain("#1a1a1a"); // old hardcoded node fill
    expect(svg).not.toContain("rgba(212,165,116"); // old hardcoded accent
    // node + edge + text colors all come from the palette
    expect(svg).toContain('fill="#eeeeee"');
    expect(svg).toContain('stroke="#123456"');
    expect(svg).toContain('stroke="#654321"');
    expect(svg).toContain('fill="#abcdef"');
  });

  it("renders one line per edge and a rect+text per node", () => {
    const svg = buildGraphSvg(nodes, edges, LIGHT)!.svgContent;
    expect((svg.match(/<line /g) ?? []).length).toBe(1);
    expect((svg.match(/<rect /g) ?? []).length).toBe(1 + nodes.length); // background + nodes
    expect(svg).toContain("Node A");
    expect(svg).toContain("Node B");
  });

  it("falls back to the node id when there is no label", () => {
    const svg = buildGraphSvg(
      [{ id: "lonely", position: { x: 0, y: 0 }, width: 80, height: 40 }],
      [],
      LIGHT,
    )!.svgContent;
    expect(svg).toContain("lonely");
  });

  it("skips group nodes", () => {
    const svg = buildGraphSvg(
      [
        { id: "g", type: "group", position: { x: 0, y: 0 }, width: 300, height: 300 },
        { id: "a", position: { x: 10, y: 10 }, width: 80, height: 40, data: { label: "A" } },
      ],
      [],
      LIGHT,
    )!.svgContent;
    // background + the single non-group node = 2 rects
    expect((svg.match(/<rect /g) ?? []).length).toBe(2);
  });

  it("escapes XML in labels", () => {
    expect(escapeXml('<a> & "b"')).toBe("&lt;a&gt; &amp; &quot;b&quot;");
  });
});
