import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Atur Ulang Kata Sandi — Dimaloka" },
      { name: "description", content: "Atur kata sandi baru untuk akun dashboard Dimaloka." },
      { property: "og:title", content: "Atur Ulang Kata Sandi — Dimaloka" },
      { property: "og:description", content: "Atur kata sandi baru untuk akun dashboard Dimaloka." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) return void toast.error("Kata sandi belum dapat diperbarui. Minta tautan baru.");
    toast.success("Kata sandi diperbarui.");
    navigate({ to: "/admin" });
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <form onSubmit={submit} className="w-full max-w-sm space-y-5">
        <h1 className="text-2xl font-semibold">Atur kata sandi baru</h1>
        <div className="space-y-2">
          <Label htmlFor="pw">Kata sandi baru (minimal 8 karakter)</Label>
          <Input id="pw" type="password" minLength={8} required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button type="submit" className="w-full" disabled={busy}>Simpan</Button>
      </form>
    </main>
  );
}
