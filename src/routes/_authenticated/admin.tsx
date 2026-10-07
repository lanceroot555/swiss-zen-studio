import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { LayoutDashboard, FileText, Package, Newspaper, Users, LogOut, ExternalLink, Building2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useMyRoles } from "@/lib/use-roles";
import { Button } from "@/components/ui/button";
import logo from "@/assets/dimaloka-white-logo.png";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Dashboard — Dimaloka" }, { name: "robots", content: "noindex" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const { data, isLoading } = useMyRoles();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isAdmin = data?.roles.includes("administrator");
  const isStaff = isAdmin || data?.roles.includes("editor");

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const links = [
    { to: "/admin", label: "Ringkasan", icon: LayoutDashboard, show: true, exact: true },
    { to: "/admin/konten", label: "Konten halaman", icon: FileText, show: isAdmin },
    { to: "/admin/paket", label: "Paket toko", icon: Package, show: isAdmin },
    { to: "/admin/klien", label: "Logo klien", icon: Building2, show: isAdmin },
    { to: "/admin/profesional", label: "Profesional & Terukur", icon: Sparkles, show: isAdmin },
    { to: "/admin/blog", label: "Blog & SEO", icon: Newspaper, show: true },
    { to: "/admin/pengguna", label: "Pengguna", icon: Users, show: isAdmin },
  ] as const;

  return (
    <div className="min-h-screen bg-muted/40 lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="flex flex-col bg-inverse text-inverse-foreground lg:sticky lg:top-0 lg:h-screen">
        <div className="flex items-center justify-between p-5"><img src={logo} alt="Dimaloka" className="h-auto w-32" /></div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-1 lg:flex-col lg:overflow-visible" aria-label="Menu dashboard">
          {isStaff && links.filter((l) => l.show).map((l) => (
            <Link key={l.to} to={l.to} activeOptions={{ exact: "exact" in l }} className="flex shrink-0 items-center gap-3 rounded-md px-3 py-2 text-sm text-inverse-muted hover:bg-inverse-foreground/10 data-[status=active]:bg-inverse-foreground/10 data-[status=active]:text-inverse-foreground">
              <l.icon className="size-4" />{l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden space-y-2 border-t border-inverse-border p-4 text-xs lg:block">
          <p className="truncate text-inverse-muted">{data?.email}</p>
          <p className="font-semibold">{isAdmin ? "Administrator" : data?.roles.includes("editor") ? "Editor blog" : "Tanpa akses"}</p>
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-inverse-muted"><ExternalLink className="size-3" />Lihat website</a>
          <button onClick={signOut} className="flex items-center gap-2 text-inverse-muted"><LogOut className="size-3" />Keluar</button>
        </div>
      </aside>
      <main className="min-w-0 p-5 md:p-8">
        <div className="mb-4 flex justify-end lg:hidden"><Button variant="outline" size="sm" onClick={signOut}><LogOut />Keluar</Button></div>
        {isLoading ? <p className="text-muted-foreground">Memuat…</p> : isStaff ? <Outlet /> : (
          <div className="max-w-md rounded-lg border bg-background p-6">
            <h1 className="text-xl font-semibold">Akun belum memiliki akses</h1>
            <p className="mt-2 text-sm text-muted-foreground">Minta Administrator memberikan peran untuk akun {data?.email}.</p>
            <Button className="mt-4" onClick={signOut}>Keluar</Button>
          </div>
        )}
      </main>
    </div>
  );
}

export function AdminOnly({ children }: { children: React.ReactNode }) {
  const { data } = useMyRoles();
  if (!data?.roles.includes("administrator")) return <p className="text-muted-foreground">Halaman ini hanya untuk Administrator.</p>;
  return <>{children}</>;
}
