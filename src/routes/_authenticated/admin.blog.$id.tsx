import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Check, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { slugify, seoChecks, readingTime } from "@/lib/blog";
import { siteConfig } from "@/lib/site-config";
import { Markdown } from "@/components/blog/markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_authenticated/admin/blog/$id")({ component: Editor });

const empty = { slug: "", title: "", excerpt: "", content: "", cover_image_url: "" as string | null, cover_alt: "", category: "SEO", tags: [] as string[], meta_title: "", meta_description: "", focus_keyword: "", status: "draft", published_at: null as string | null, author_name: "Tim Dimaloka" };
type Post = typeof empty;

function Editor() {
  const { id } = Route.useParams();
  const isNew = id === "baru";
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [post, setPost] = useState<Post>(empty);
  const [slugTouched, setSlugTouched] = useState(false);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [busy, setBusy] = useState(false);

  const { data } = useQuery({
    queryKey: ["admin-post", id],
    enabled: !isNew,
    queryFn: async () => (await supabase.from("blog_posts").select("*").eq("id", id).maybeSingle()).data,
  });
  useEffect(() => {
    if (data) { const { id: _i, created_at: _c, updated_at: _u, author_id: _a, ...rest } = data; setPost(rest as Post); setSlugTouched(true); }
  }, [data]);

  const set = (patch: Partial<Post>) => setPost((p) => ({ ...p, ...patch }));
  const checks = seoChecks({ ...post, cover_image_url: post.cover_image_url });
  const score = Math.round((checks.filter((c) => c.ok).length / checks.length) * 100);

  async function save(status: "draft" | "published") {
    if (!post.title.trim() || !post.slug.trim()) return void toast.error("Judul dan slug wajib diisi.");
    setBusy(true);
    const { data: auth } = await supabase.auth.getUser();
    const payload = { ...post, status, cover_image_url: post.cover_image_url || null, published_at: status === "published" ? post.published_at ?? new Date().toISOString() : post.published_at };
    const res = isNew
      ? await supabase.from("blog_posts").insert({ ...payload, author_id: auth.user?.id ?? null }).select("id").single()
      : await supabase.from("blog_posts").update(payload).eq("id", id).select("id").single();
    setBusy(false);
    if (res.error) return void toast.error(res.error.code === "23505" ? "Slug sudah dipakai artikel lain." : "Artikel belum tersimpan.");
    set({ status, published_at: payload.published_at });
    toast.success(status === "published" ? "Artikel diterbitkan." : "Draf tersimpan.");
    qc.invalidateQueries({ queryKey: ["admin-posts"] });
    if (isNew) navigate({ to: "/admin/blog/$id", params: { id: res.data.id }, replace: true });
  }

  const serpTitle = (post.meta_title || post.title || "Judul artikel") + " — Dimaloka";
  return (
    <div className="max-w-6xl space-y-6">
      <Link to="/admin/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground"><ArrowLeft className="size-4" />Semua artikel</Link>
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-5 rounded-lg border bg-background p-5">
          <div className="space-y-1.5"><Label htmlFor="t">Judul artikel (H1)</Label><Input id="t" className="text-lg" value={post.title} onChange={(e) => set({ title: e.target.value, ...(slugTouched ? {} : { slug: slugify(e.target.value) }) })} /></div>
          <div className="space-y-1.5"><Label htmlFor="s">Slug URL</Label><div className="flex items-center gap-2 text-sm text-muted-foreground">/blog/<Input id="s" value={post.slug} onChange={(e) => { setSlugTouched(true); set({ slug: slugify(e.target.value) }); }} /></div></div>
          <div className="space-y-1.5"><Label htmlFor="ex">Ringkasan (tampil di daftar artikel)</Label><Textarea id="ex" rows={2} value={post.excerpt} onChange={(e) => set({ excerpt: e.target.value })} /></div>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <Label>Isi artikel</Label>
              <div className="flex gap-1">
                <Button type="button" size="sm" variant={tab === "write" ? "default" : "ghost"} onClick={() => setTab("write")}>Tulis</Button>
                <Button type="button" size="sm" variant={tab === "preview" ? "default" : "ghost"} onClick={() => setTab("preview")}>Pratinjau</Button>
              </div>
            </div>
            {tab === "write" ? (
              <>
                <Textarea rows={22} className="font-mono text-sm" value={post.content} onChange={(e) => set({ content: e.target.value })} placeholder={"Paragraf pembuka yang menyebut kata kunci...\n\n## Subjudul pertama\n\nIsi bagian...\n\n- poin daftar\n\n**teks tebal**, [tautan](/toko)"} />
                <p className="mt-2 text-xs text-muted-foreground">Format: ## subjudul, ### sub-subjudul, **tebal**, - daftar, [teks](url), ![alt](url-gambar). Estimasi {readingTime(post.content)} menit baca.</p>
              </>
            ) : <div className="min-h-64 rounded-md border p-5"><Markdown content={post.content || "_Belum ada isi._"} /></div>}
          </div>
        </div>
        <aside className="space-y-5">
          <div className="space-y-3 rounded-lg border bg-background p-5">
            <p className="text-sm">Status: <strong>{post.status === "published" ? "Terbit" : "Draf"}</strong></p>
            <div className="flex flex-wrap gap-2">
              <Button disabled={busy} onClick={() => save("published")}>{post.status === "published" ? "Perbarui" : "Terbitkan"}</Button>
              <Button disabled={busy} variant="outline" onClick={() => save("draft")}>{post.status === "published" ? "Jadikan draf" : "Simpan draf"}</Button>
            </div>
          </div>
          <div className="space-y-4 rounded-lg border bg-background p-5">
            <h2 className="font-semibold">Detail</h2>
            <div className="space-y-1.5"><Label>Kategori</Label><Input value={post.category} onChange={(e) => set({ category: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>Tag (pisahkan koma)</Label><Input value={post.tags.join(", ")} onChange={(e) => set({ tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })} /></div>
            <div className="space-y-1.5"><Label>Penulis</Label><Input value={post.author_name} onChange={(e) => set({ author_name: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>URL gambar sampul</Label><Input placeholder="https://…" value={post.cover_image_url ?? ""} onChange={(e) => set({ cover_image_url: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>Teks alternatif gambar</Label><Input value={post.cover_alt} onChange={(e) => set({ cover_alt: e.target.value })} /></div>
          </div>
          <div className="space-y-4 rounded-lg border bg-background p-5">
            <div className="flex items-center justify-between"><h2 className="font-semibold">Optimasi SEO</h2><span className={`text-sm font-semibold ${score >= 75 ? "text-primary" : "text-muted-foreground"}`}>{score}/100</span></div>
            <div className="space-y-1.5"><Label>Kata kunci utama</Label><Input value={post.focus_keyword} onChange={(e) => set({ focus_keyword: e.target.value })} placeholder="contoh: jasa seo umkm" /></div>
            <div className="space-y-1.5"><Label>Judul SEO</Label><Input value={post.meta_title} placeholder={post.title} onChange={(e) => set({ meta_title: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>Deskripsi meta</Label><Textarea rows={3} value={post.meta_description} onChange={(e) => set({ meta_description: e.target.value })} /></div>
            <div className="rounded-md border p-3">
              <p className="text-xs text-muted-foreground">Pratinjau Google</p>
              <p className="mt-1 truncate text-xs">{siteConfig.siteUrl.replace(/^https?:\/\//, "")} › blog › {post.slug || "slug"}</p>
              <p className="truncate text-base text-primary">{serpTitle}</p>
              <p className="line-clamp-2 text-xs text-muted-foreground">{post.meta_description || post.excerpt || "Deskripsi meta akan tampil di sini."}</p>
            </div>
            <ul className="space-y-1.5 text-sm">
              {checks.map((c) => <li key={c.label} className="flex gap-2">{c.ok ? <Check className="size-4 shrink-0 text-primary" /> : <X className="size-4 shrink-0 text-muted-foreground" />}<span className={c.ok ? "" : "text-muted-foreground"}>{c.label}</span></li>)}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
