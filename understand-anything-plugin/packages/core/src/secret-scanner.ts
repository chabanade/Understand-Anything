/**
 * Pure, dependency-free secret redaction.
 *
 * Defense-in-depth for the dashboard file preview: even though secret files are
 * excluded from analysis by `ignore-filter.ts`, any file body that is served to
 * the browser is passed through `redactSecrets` first so credentials that happen
 * to be embedded in an otherwise-normal source file are not exposed.
 *
 * Design choices (kept deliberately conservative to minimise false positives):
 * - Only *precise* patterns are redacted (PEM private-key blocks, JWTs, AWS key
 *   ids, `Bearer <token>`, and `secretName = "value"` assignments).
 * - There is intentionally NO generic high-entropy scan: git SHAs, UUIDs and
 *   base64 asset blobs would trip it. Precise patterns cover the real threat.
 * - Redaction replaces the *value* only and never adds/removes lines for the
 *   single-line rules, so the viewer's line numbers stay correct.
 *
 * Pure string-in / string-out (no fs, no crypto) so it is safe to expose on a
 * browser-safe subpath and to unit-test in isolation.
 */

export interface SecretFinding {
  /** Which rule matched (e.g. "aws-access-key", "secret-assignment"). */
  type: string;
  /** 1-based line number of the match in the input text. */
  line: number;
}

export interface RedactionResult {
  /** The input text with secret values replaced by placeholders. */
  redacted: string;
  /** One entry per redaction performed. */
  findings: SecretFinding[];
}

const REDACTED = "[REDACTED]";

function lineAt(text: string, offset: number): number {
  let line = 1;
  const end = Math.min(offset, text.length);
  for (let i = 0; i < end; i++) {
    if (text.charCodeAt(i) === 10 /* \n */) line++;
  }
  return line;
}

function applyRule(
  text: string,
  type: string,
  pattern: RegExp,
  build: (groups: Array<string | undefined>) => string,
  findings: SecretFinding[],
): string {
  return text.replace(pattern, (...args: Array<string | number | undefined>) => {
    // String.replace passes: (match, ...groups, offset, fullString)
    const offset = args[args.length - 2] as number;
    const groups = args.slice(0, args.length - 2) as Array<string | undefined>;
    findings.push({ type, line: lineAt(text, offset) });
    return build(groups);
  });
}

// PEM private key blocks (RSA, EC, OPENSSH, generic, ...).
const PRIVATE_KEY_BLOCK =
  /-----BEGIN (?:[A-Z0-9 ]+ )?PRIVATE KEY-----[\s\S]*?-----END (?:[A-Z0-9 ]+ )?PRIVATE KEY-----/g;

// JSON Web Tokens (header.payload.signature, all base64url).
const JWT = /\beyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\b/g;

// AWS access key ids (AKIA/ASIA/... + 16 uppercase/digits).
const AWS_ACCESS_KEY = /\b(?:AKIA|ASIA|AGPA|AIDA|AROA|ANPA|ANVA|ASCA)[0-9A-Z]{16}\b/g;

// `Authorization: Bearer <token>` style.
const BEARER = /\b(Bearer\s+)([A-Za-z0-9._~+/-]{16,}=*)/g;

// `secretName = "value"` / `secretName: 'value'` assignments (matching quotes).
const SECRET_ASSIGNMENT =
  /((?:api[_-]?key|apikey|secret(?:[_-]?key)?|access[_-]?token|refresh[_-]?token|client[_-]?secret|auth[_-]?token|access[_-]?key|private[_-]?key|token|password|passwd|pwd)\s*[:=]\s*)(["'])((?:\\.|[^"'\\\n]){4,})\2/gi;

/**
 * Replace secret values in `input` with placeholders. Returns the redacted text
 * and a list of findings. Safe on any text; returns the input unchanged when no
 * secrets are detected.
 */
export function redactSecrets(input: string): RedactionResult {
  const findings: SecretFinding[] = [];
  let text = input;

  text = applyRule(text, "private-key", PRIVATE_KEY_BLOCK, () => "[REDACTED PRIVATE KEY]", findings);
  text = applyRule(text, "jwt", JWT, () => "[REDACTED_JWT]", findings);
  text = applyRule(text, "aws-access-key", AWS_ACCESS_KEY, () => "[REDACTED_AWS_KEY]", findings);
  text = applyRule(text, "bearer-token", BEARER, (g) => `${g[1] ?? ""}${REDACTED}`, findings);
  text = applyRule(
    text,
    "secret-assignment",
    SECRET_ASSIGNMENT,
    (g) => `${g[1] ?? ""}${g[2] ?? ""}${REDACTED}${g[2] ?? ""}`,
    findings,
  );

  return { redacted: text, findings };
}
