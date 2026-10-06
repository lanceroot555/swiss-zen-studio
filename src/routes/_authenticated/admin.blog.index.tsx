import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Pencil, Trash2, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatDate } from "@/lib/blog";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin/blog/")({ component: BlogAdmin });

function BlogAdmin() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-posts"],
    queryFn: async () => (await supabase.from("blog_posts").select("id, slug, title, status, category, published_at, updated_at").order("updated_at", { ascending: false })).data ?? [],
  });
  async function remove(id: string, title: string) {
    if (!confirm(`Hapus artikel "${title}"?`)) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) return void toast.error("Artikel belum terhapus.");
    toast.success("Artikel dihapus.");
    qc.invalidateQueries({ queryKey: ["admin-posts"] });
  }
  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><h1 className="text-2xl font-semibold">Blog & SEO</h1><p className="mt-1 text-muted-foreground">Tulis, optimasi, dan terbitkan artikel.</p></div>
        <Button asChild><Link to="/admin/blog/$id" params={{ id: "baru" }}>Artikel baru</Link></Button>
      </div>
      <div className="overflow-x-auto rounded-lg border bg-background">
        <table className="w-full text-sm">
          <thead className="border-b text-left text-muted-foreground"><tr><th className="p-3">Judul</th><th className="p-3">Kategori</th><th className="p-3">Status</th><th className="p-3">Tanggal</th><th className="p-3" /></tr></thead>
          <tbody>
            {isLoading && <tr><td colSpan={5} className="p-3">Memuat…</td></tr>}
            {data?.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">Belum ada artikel.</td></tr>}
            {data?.map((p) => (
              <tr key={p.id} className="border-b last:border-0">
                <td className="p-3 font-medium">{p.title}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3"><span className={p.status === "published" ? "text-primary" : "text-muted-foreground"}>{p.status === "published" ? "Terbit" : "Draf"}</span></td>
                <td className="p-3 text-muted-foreground">{formatDate(p.published_at ?? p.updated_at)}</td>
                <td className="flex justify-end gap-1 p-3">
                  {p.status === "published" && <Button asChild variant="ghost" size="icon" aria-label="Lihat"><a href={`/blog/${p.slug}`} target="_blank" rel="noreferrer"><ExternalLink className="size-4" /></a></Button>}
                  <Button asChild variant="ghost" size="icon" aria-label="Ubah"><Link to="/admin/blog/$id" params={{ id: p.id }}><Pencil className="size-4" /></Link></Button>
                  <Button variant="ghost" size="icon" aria-label="Hapus" onClick={() => remove(p.id, p.title)}><Trash2 className="size-4" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
