import { describe, it, expect, afterEach } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync, statSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PLUGIN = resolve(__dirname, "../../../understand-anything-plugin");
const SCRIPT = join(PLUGIN, "skills/understand/build-embeddings.mjs");
const MODEL = join(PLUGIN, "models/Xenova/all-MiniLM-L6-v2/onnx/model_quantized.onnx");

// The bundled model is a Git LFS object. When LFS isn't materialised (e.g. a
// checkout without lfs:true), the working-tree file is a tiny pointer — skip
// rather than fail, since the model itself isn't really present.
const modelMaterialised = existsSync(MODEL) && statSync(MODEL).size > 1_000_000;

const SAMPLE_GRAPH = {
  version: "1.0.0",
  project: { name: "t", languages: [], frameworks: [], description: "", analyzedAt: "2026-01-01T00:00:00.000Z", gitCommitHash: "x" },
  nodes: [
    { id: "a", type: "file", name: "auth.ts", summary: "Handles user authentication and login", tags: ["auth"], complexity: "simple" },
    { id: "b", type: "file", name: "db.ts", summary: "Database connection pool", tags: ["data"], complexity: "simple" },
  ],
  edges: [], layers: [], tour: [],
};

describe("build-embeddings.mjs (bundled offline model)", () => {
  let projectRoot;
  afterEach(() => {
    if (projectRoot) rmSync(projectRoot, { recursive: true, force: true });
    projectRoot = null;
  });

  it.skipIf(!modelMaterialised)(
    "generates a 384-dim embeddings.json from the knowledge graph, fully offline",
    () => {
      projectRoot = mkdtempSync(join(tmpdir(), "ua-emb-test-"));
      mkdirSync(join(projectRoot, ".understand-anything"), { recursive: true });
      writeFileSync(
        join(projectRoot, ".understand-anything", "knowledge-graph.json"),
        JSON.stringify(SAMPLE_GRAPH),
        "utf-8",
      );

      const r = spawnSync("node", [SCRIPT, projectRoot], { encoding: "utf-8" });
      expect(r.status).toBe(0);

      const out = JSON.parse(
        readFileSync(join(projectRoot, ".understand-anything", "embeddings.json"), "utf-8"),
      );
      expect(out.model).toBe("Xenova/all-MiniLM-L6-v2");
      expect(out.dim).toBe(384);
      expect(Object.keys(out.vectors).sort()).toEqual(["a", "b"]);
      expect(out.vectors.a).toHaveLength(384);
      // Normalised vectors: L2 norm ~= 1.
      const norm = Math.sqrt(out.vectors.a.reduce((s, v) => s + v * v, 0));
      expect(norm).toBeGreaterThan(0.9);
      expect(norm).toBeLessThan(1.1);
    },
    60_000,
  );
});
