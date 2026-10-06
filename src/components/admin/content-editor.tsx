import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const LOCKED = new Set(["location", "image", "key", "slug"]);
const LABELS: Record<string, string> = {
  title: "Judul", description: "Deskripsi", eyebrow: "Label kecil", text: "Teks", name: "Nama", label: "Label", items: "Daftar", seo: "SEO", intro: "Penjelasan layanan", introTitle: "Judul penjelasan", audiences: "Untuk siapa", deliverables: "Cakupan pekerjaan", process: "Proses kerja", copy: "Judul bagian & tombol", publicEmail: "Email publik", address: "Alamat", mapsUrl: "Tautan Google Maps",
  hero: "Bagian pembuka", cta: "Tombol", sections: "Bagian", principles: "Prinsip", steps: "Langkah kerja", plans: "Paket", insights: "Wawasan",
  form: "Formulir", footer: "Footer", blog: "Blog", privacy: "Privasi", faq: "FAQ", question: "Pertanyaan", answer: "Jawaban", navigation: "Menu",
  paragraphs: "Paragraf", values: "Nilai", features: "Fitur", concepts: "Konsep", category: "Kategori", errors: "Pesan kesalahan", fields: "Kolom formulir",
  placeholders: "Contoh isian", wa: "Pesan WhatsApp", whatsappMessages: "Pesan WhatsApp", social: "Media sosial", analytics: "Analitik",
  phoneDisplay: "Nomor telepon (tampilan)", phoneInternational: "Nomor WhatsApp (format 62…)", notificationEmail: "Email notifikasi", tagline: "Tagline", siteUrl: "Alamat website",
  ga4Id: "ID Google Analytics 4", metaPixelId: "ID Meta Pixel", seoTitle: "Judul SEO", seoDescription: "Deskripsi SEO", ctaTitle: "Judul ajakan", ctaText: "Teks ajakan",
};
const humanize = (k: string) => LABELS[k] ?? k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

function emptyLike(v: unknown): unknown {
  if (typeof v === "string") return "";
  if (typeof v === "number") return 0;
  if (typeof v === "boolean") return false;
  if (Array.isArray(v)) return v.map(emptyLike);
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, LOCKED.has(k) ? x : emptyLike(x)]));
  return v;
}

export function ValueEditor({ name, value, onChange, depth = 0 }: { name: string; value: unknown; onChange: (v: unknown) => void; depth?: number }) {
  const id = `f-${name}-${depth}-${Math.random().toString(36).slice(2, 7)}`;
  if (typeof value === "string") {
    const long = value.length > 70 || value.includes("\n");
    return (
      <label className="block space-y-1.5">
        <span className="text-sm font-medium">{humanize(name)}</span>
        {LOCKED.has(name) ? <Input value={value} disabled /> : long
          ? <Textarea id={id} value={value} rows={Math.min(8, Math.ceil(value.length / 80) + 1)} onChange={(e) => onChange(e.target.value)} />
          : <Input id={id} value={value} onChange={(e) => onChange(e.target.value)} />}
      </label>
    );
  }
  if (typeof value === "number") return <label className="block space-y-1.5"><span className="text-sm font-medium">{humanize(name)}</span><Input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} /></label>;
  if (typeof value === "boolean") return <label className="flex items-center gap-3"><Switch checked={value} onCheckedChange={onChange} /><span className="text-sm">{humanize(name)}</span></label>;
  if (Array.isArray(value)) {
    return (
      <fieldset className="space-y-3 rounded-md border p-4">
        <legend className="px-1 text-sm font-semibold">{humanize(name)}</legend>
        {value.map((item, i) => (
          <div key={i} className="flex gap-2">
            <div className="min-w-0 flex-1 space-y-3"><ValueEditor name={`${i + 1}`} value={item} depth={depth + 1} onChange={(v) => onChange(value.map((x, j) => (j === i ? v : x)))} /></div>
            <Button type="button" variant="ghost" size="icon" aria-label="Hapus" onClick={() => onChange(value.filter((_, j) => j !== i))}><Trash2 className="size-4" /></Button>
          </div>
        ))}
        {value.length > 0 && <Button type="button" variant="outline" size="sm" onClick={() => onChange([...value, emptyLike(value[value.length - 1])])}><Plus />Tambah</Button>}
      </fieldset>
    );
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    const body = entries.map(([k, v]) => <ValueEditor key={k} name={k} value={v} depth={depth + 1} onChange={(nv) => onChange({ ...(value as object), [k]: nv })} />);
    if (depth === 0) return <div className="space-y-5">{body}</div>;
    return <fieldset className="space-y-4 rounded-md border p-4"><legend className="px-1 text-sm font-semibold">{humanize(name)}</legend>{body}</fieldset>;
  }
  return null;
}
