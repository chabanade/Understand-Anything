#!/usr/bin/env node
/**
 * build-embeddings.mjs
 *
 * Generates per-node embedding vectors for semantic search and writes them to
 * <projectRoot>/.understand-anything/embeddings.json. Runs in Phase 7 of
 * /understand ONLY when --embeddings is passed (best-effort, non-fatal).
 *
 * 100% offline: uses the all-MiniLM-L6-v2 ONNX model bundled in the plugin
 * (models/Xenova/all-MiniLM-L6-v2) via @xenova/transformers with remote model
 * downloads disabled. No code or query ever leaves the machine.
 *
 * Usage:
 *   node build-embeddings.mjs <projectRoot>
 *
 * Exit code: 0 on success; non-zero on error (caller treats it as best-effort).
 */

import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = dirname(fileURLToPath(import.meta.url));
// skills/understand/ -> plugin root is two dirs up
const pluginRoot = resolve(__dirname, '../..');
const require = createRequire(resolve(pluginRoot, 'package.json'));

const MODEL_ID = 'Xenova/all-MiniLM-L6-v2';
const MODELS_DIR = resolve(pluginRoot, 'models');

// Resolve @understand-anything/core (matches build-fingerprints.mjs). Windows
// needs pathToFileURL — importing a raw "C:\..." path throws.
let core;
try {
  core = await import(pathToFileURL(require.resolve('@understand-anything/core')).href);
} catch {
  core = await import(pathToFileURL(resolve(pluginRoot, 'packages/core/dist/index.js')).href);
}
const { loadGraph, saveEmbeddings } = core;

/** Build the text we embed for a node. */
function nodeText(node) {
  return [node.name, node.summary, (node.tags || []).join(' '), node.languageNotes || '']
    .map((s) => (s || '').trim())
    .filter(Boolean)
    .join('. ');
}

async function main() {
  const [, , projectRoot] = process.argv;
  if (!projectRoot) {
    process.stderr.write('Usage: node build-embeddings.mjs <projectRoot>\n');
    process.exit(1);
  }

  const graph = loadGraph(projectRoot, { validate: false });
  if (!graph || !Array.isArray(graph.nodes) || graph.nodes.length === 0) {
    process.stderr.write('Warning: build-embeddings: no knowledge graph / nodes found — skipping.\n');
    process.exit(1);
  }

  // Load transformers.js and pin it to the bundled local model (offline).
  const { pipeline, env } = await import('@xenova/transformers');
  env.allowRemoteModels = false; // never hit the network
  env.allowLocalModels = true;
  env.localModelPath = MODELS_DIR;

  let extractor;
  try {
    extractor = await pipeline('feature-extraction', MODEL_ID, { quantized: true });
  } catch (err) {
    process.stderr.write(
      `Warning: build-embeddings: could not load bundled model at ${MODELS_DIR} ` +
      `(${err.message}) — semantic search will fall back to fuzzy.\n`,
    );
    process.exit(1);
  }

  const nodes = graph.nodes.filter((n) => nodeText(n).length > 0);
  const vectors = {};
  let dim = 0;
  const BATCH = 64;
  for (let i = 0; i < nodes.length; i += BATCH) {
    const slice = nodes.slice(i, i + BATCH);
    const out = await extractor(slice.map(nodeText), { pooling: 'mean', normalize: true });
    dim = out.dims[out.dims.length - 1];
    for (let j = 0; j < slice.length; j++) {
      vectors[slice[j].id] = Array.from(out.data.slice(j * dim, (j + 1) * dim));
    }
  }

  saveEmbeddings(projectRoot, { model: MODEL_ID, dim, vectors });
  process.stdout.write(
    `Embeddings: ${Object.keys(vectors).length} nodes embedded (${dim}-dim, model ${MODEL_ID}).\n`,
  );
}

await main();
