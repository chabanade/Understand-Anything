import { describe, it, expect } from "vitest";
import { redactSecrets } from "../secret-scanner";

describe("redactSecrets", () => {
  it("redacts AWS access key ids", () => {
    const { redacted, findings } = redactSecrets(
      'const key = "AKIAIOSFODNN7EXAMPLE";',
    );
    expect(redacted).not.toContain("AKIAIOSFODNN7EXAMPLE");
    expect(redacted).toContain("[REDACTED_AWS_KEY]");
    expect(findings.some((f) => f.type === "aws-access-key")).toBe(true);
  });

  it("redacts PEM private key blocks", () => {
    const pem =
      "-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEA0Z3...\nabcDEF123==\n-----END RSA PRIVATE KEY-----";
    const { redacted } = redactSecrets(`before\n${pem}\nafter`);
    expect(redacted).toContain("[REDACTED PRIVATE KEY]");
    expect(redacted).not.toContain("MIIEpAIBAAKCAQEA0Z3");
    expect(redacted).toContain("before");
    expect(redacted).toContain("after");
  });

  it("redacts secret-named assignments (value only, keeps the key + quotes)", () => {
    const samples = [
      'api_key = "sk-supersecret-value-123"',
      "password: 'hunter2hunter2'",
      'access_token="ya29.AVeryLongTokenValueHere"',
      'client_secret = "abcd-1234-efgh-5678"',
    ];
    for (const s of samples) {
      const { redacted } = redactSecrets(s);
      expect(redacted).toContain("[REDACTED]");
      expect(redacted).not.toContain("supersecret");
      expect(redacted).not.toContain("hunter2hunter2");
      expect(redacted).not.toContain("ya29.AVeryLongTokenValueHere");
      expect(redacted).not.toContain("abcd-1234-efgh-5678");
    }
  });

  it("redacts JWTs and Bearer tokens", () => {
    const jwt =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dQw4w9WgXcQabcdEFGhij";
    expect(redactSecrets(jwt).redacted).toContain("[REDACTED_JWT]");

    const auth = "Authorization: Bearer abcDEF1234567890ghiJKL==";
    const out = redactSecrets(auth).redacted;
    expect(out).toContain("Bearer [REDACTED]");
    expect(out).not.toContain("abcDEF1234567890ghiJKL");
  });

  it("leaves ordinary code and non-secret values intact (no false positives)", () => {
    const code = [
      "const commit = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4';", // git SHA-1
      "const id = '550e8400-e29b-41d4-a716-446655440000';", // UUID
      'const greeting = "hello world";',
      "import { foo } from './bar';",
      "export function getToken() { return 42; }",
      'const apiUrl = "https://api.example.com/v1";',
    ].join("\n");
    const { redacted, findings } = redactSecrets(code);
    expect(redacted).toBe(code);
    expect(findings).toHaveLength(0);
  });

  it("returns input unchanged when there is nothing to redact", () => {
    const text = "just some normal text\nwith two lines";
    expect(redactSecrets(text)).toEqual({ redacted: text, findings: [] });
  });

  it("reports the line number of each finding", () => {
    const text = 'line1\nline2\napi_key = "secretsecret"\nline4';
    const { findings } = redactSecrets(text);
    expect(findings).toHaveLength(1);
    expect(findings[0].line).toBe(3);
  });
});
