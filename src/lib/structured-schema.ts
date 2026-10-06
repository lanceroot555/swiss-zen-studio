export function parseSchema(input: string): unknown | null {
  let source = input.trim();
  if (!source) return null;
  if (source.length > 100000) throw new Error("Schema maksimal 100.000 karakter.");
  if (source.startsWith("<")) {
    const blocks = [...source.matchAll(/<script\s+type=["']application\/ld\+json["']\s*>([\s\S]*?)<\/script\s*>/gi)];
    const remainder = source.replace(/<script\s+type=["']application\/ld\+json["']\s*>[\s\S]*?<\/script\s*>/gi, "").trim();
    if (!blocks.length || remainder) throw new Error("Hanya blok script application/ld+json yang diperbolehkan.");
    source = blocks.length === 1 ? (blocks[0]?.[1] ?? "") : `[${blocks.map(b => b[1]).join(",")}]`;
  }
  let value: unknown;
  try { value = JSON.parse(source); } catch { throw new Error("JSON tidak valid. Periksa tanda kutip, koma, dan kurung."); }
  const nodes = Array.isArray(value) ? value : [value];
  if (!nodes.length || nodes.some(n => !n || typeof n !== "object" || Array.isArray(n) || !("@type" in n || "@graph" in n))) throw new Error("Schema harus berupa objek JSON-LD dengan @type atau @graph.");
  return value;
}
export function serializeSchema(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");
}
export function schemaScripts(input: string, fallback?: unknown) {
  let value = fallback;
  try { value = parseSchema(input) ?? fallback; } catch { /* Invalid stored schema never executes. */ }
  return value ? [{ type: "application/ld+json", children: serializeSchema(value) }] : [];
}