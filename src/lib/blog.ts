export function slugify(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 90);
}
export function readingTime(content: string) {
  return Math.max(1, Math.round(content.trim().split(/\s+/).filter(Boolean).length / 200));
}
export function headings(content: string) {
  return content.split("\n").filter((l) => /^##\s+/.test(l)).map((l) => { const text = l.replace(/^##\s+/, "").replace(/[*_`]/g, "").trim(); return { text, id: slugify(text) }; });
}
export function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
}
export type SeoCheck = { ok: boolean; label: string };
export function seoChecks(p: { title: string; meta_title: string; meta_description: string; focus_keyword: string; slug: string; content: string; excerpt: string; cover_image_url: string | null; cover_alt: string }): SeoCheck[] {
  const title = p.meta_title || p.title;
  const kw = p.focus_keyword.trim().toLowerCase();
  const words = p.content.trim().split(/\s+/).filter(Boolean).length;
  const firstPara = p.content.split("\n\n").find((x) => x.trim() && !x.startsWith("#")) ?? "";
  return [
    { ok: !!kw, label: "Kata kunci utama diisi" },
    { ok: title.length >= 30 && title.length <= 60, label: `Judul SEO 30–60 karakter (${title.length})` },
    { ok: p.meta_description.length >= 120 && p.meta_description.length <= 160, label: `Deskripsi meta 120–160 karakter (${p.meta_description.length})` },
    { ok: !!kw && title.toLowerCase().includes(kw), label: "Kata kunci ada di judul" },
    { ok: !!kw && p.meta_description.toLowerCase().includes(kw), label: "Kata kunci ada di deskripsi meta" },
    { ok: !!kw && p.slug.includes(slugify(kw)), label: "Kata kunci ada di slug URL" },
    { ok: !!kw && firstPara.toLowerCase().includes(kw), label: "Kata kunci muncul di paragraf pertama" },
    { ok: words >= 600, label: `Panjang artikel minimal 600 kata (${words})` },
    { ok: headings(p.content).length >= 2, label: "Minimal 2 subjudul (##)" },
    { ok: /\]\(\//.test(p.content) || /\]\(https?:\/\/[^)]*dimaloka/i.test(p.content), label: "Ada tautan internal ke halaman Dimaloka" },
    { ok: !!p.cover_image_url && p.cover_alt.length > 5, label: "Gambar sampul dengan teks alternatif" },
    { ok: p.excerpt.length >= 50, label: "Ringkasan artikel diisi" },
  ];
}
