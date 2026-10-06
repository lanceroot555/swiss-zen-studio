import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { bootstrapAdmin } from "@/lib/admin.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "@/assets/dimaloka-white-logo.png";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Masuk Dashboard — Dimaloka" },
      { name: "description", content: "Halaman masuk dashboard pengelolaan konten website Dimaloka." },
      { property: "og:title", content: "Masuk Dashboard — Dimaloka" },
      { property: "og:description", content: "Halaman masuk dashboard pengelolaan konten website Dimaloka." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

type Mode = "login" | "forgot" | "setup";

function AuthPage() {
  const navigate = useNavigate();
  const setup = useServerFn(bootstrapAdmin);
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
        if (error) throw error;
        toast.success("Tautan atur ulang kata sandi telah dikirim ke email Anda.");
        setMode("login");
        return;
      }
      if (mode === "setup") {
        await setup({ data: { email, password } });
        toast.success("Akun Administrator dibuat. Anda sedang masuk…");
      }
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw new Error("Email atau kata sandi salah.");
      navigate({ to: "/admin" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setBusy(false);
    }
  }

  const titles: Record<Mode, string> = { login: "Masuk dashboard", forgot: "Lupa kata sandi", setup: "Buat Administrator pertama" };

  return (
    <main className="grid min-h-screen bg-inverse text-inverse-foreground lg:grid-cols-2">
      <section className="hidden flex-col justify-between p-12 lg:flex">
        <Link to="/"><img src={logo} alt="Dimaloka" className="h-auto w-40" /></Link>
        <div>
          <h1 className="font-display text-3xl font-semibold leading-tight">Kelola isi website Dimaloka dari satu tempat.</h1>
          <p className="mt-4 max-w-md text-inverse-muted">Halaman, paket toko, dan artikel blog dengan pengecekan SEO.</p>
        </div>
        <p className="text-xs text-inverse-muted">© {new Date().getFullYear()} Dimaloka</p>
      </section>
      <section className="flex items-center justify-center bg-background p-6 text-foreground">
        <form onSubmit={submit} className="w-full max-w-sm space-y-5">
          <div>
            <Link to="/" className="text-sm text-muted-foreground lg:hidden">← Kembali ke website</Link>
            <h2 className="mt-4 text-2xl font-semibold">{titles[mode]}</h2>
            {mode === "setup" && <p className="mt-2 text-sm text-muted-foreground">Hanya bisa dilakukan sekali oleh pemilik email Administrator.</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          {mode !== "forgot" && (
            <div className="space-y-2">
              <Label htmlFor="password">Kata sandi</Label>
              <Input id="password" type="password" minLength={mode === "setup" ? 8 : undefined} autoComplete={mode === "setup" ? "new-password" : "current-password"} required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          )}
          <Button type="submit" className="w-full" disabled={busy}>{busy ? "Memproses…" : mode === "login" ? "Masuk" : mode === "forgot" ? "Kirim tautan" : "Buat & masuk"}</Button>
          <div className="flex flex-col gap-2 text-sm">
            {mode !== "login" && <button type="button" className="text-left text-primary" onClick={() => setMode("login")}>Kembali ke halaman masuk</button>}
            {mode === "login" && <button type="button" className="text-left text-primary" onClick={() => setMode("forgot")}>Lupa kata sandi?</button>}
            {mode === "login" && <button type="button" className="text-left text-muted-foreground" onClick={() => setMode("setup")}>Pertama kali? Buat akun Administrator</button>}
          </div>
        </form>
      </section>
    </main>
  );
}
