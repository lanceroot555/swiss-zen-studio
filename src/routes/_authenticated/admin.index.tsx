import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useMyRoles } from "@/lib/use-roles";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin/")({ component: Overview });

function Overview() {
  const { data: me } = useMyRoles();
  const isAdmin = me?.roles.includes("administrator");
  const { data } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: async () => {
      const { data } = await supabase.from("blog_posts").select("status");
      const posts = data ?? [];
      return { total: posts.length, published: posts.filter((p) => p.status === "published").length };
    },
  });
  const cards = [
    { label: "Total artikel", value: data?.total ?? "–" },
    { label: "Artikel terbit", value: data?.published ?? "–" },
    { label: "Draf", value: data ? data.total - data.published : "–" },
  ];
  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Selamat datang</h1>
        <p className="mt-1 text-muted-foreground">{isAdmin ? "Kelola seluruh isi website, paket toko, blog, dan pengguna." : "Kelola artikel blog dan optimasi SEO-nya."}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="rounded-lg border bg-background p-5">
            <p className="text-sm text-muted-foreground">{c.label}</p>
            <p className="mt-2 text-3xl font-semibold">{c.value}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <Button asChild><Link to="/admin/blog/$id" params={{ id: "baru" }}>Tulis artikel baru</Link></Button>
        {isAdmin && <Button asChild variant="outline"><Link to="/admin/konten">Ubah konten halaman</Link></Button>}
        {isAdmin && <Button asChild variant="outline"><Link to="/admin/paket">Atur paket & harga</Link></Button>}
      </div>
    </div>
  );
}
