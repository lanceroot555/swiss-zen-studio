import { Textarea } from "@/components/ui/textarea";
import { parseSchema } from "@/lib/structured-schema";
export function SchemaInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  let error = "";
  try { parseSchema(value); } catch (e) { error = e instanceof Error ? e.message : "Schema tidak valid."; }
  return <label className="block space-y-2"><span className="text-sm font-semibold">Structured schema Google (JSON-LD)</span><Textarea aria-label="Structured schema Google (JSON-LD)" rows={12} className="font-mono text-sm" value={value} onChange={e => onChange(e.target.value)} placeholder={'{\n  "@context": "https://schema.org",\n  "@type": "WebPage",\n  "name": "Nama halaman"\n}'} />{error ? <span role="alert" className="text-sm text-destructive">{error}</span> : <span className="text-xs text-muted-foreground">{value.trim() ? "JSON-LD valid. Pastikan isinya sesuai konten halaman." : "Kosongkan untuk memakai schema bawaan jika tersedia."} Tidak menjamin rich result Google.</span>}</label>;
}