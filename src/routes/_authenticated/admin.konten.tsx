import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { contentSections, defaultSection, type ContentKey } from "@/lib/content";
import { ValueEditor } from "@/components/admin/content-editor";
import { Button } from "@/components/ui/button";
import { AdminOnly } from "./admin";

export const Route = createFileRoute("/_authenticated/admin/konten")({ component: () => <AdminOnly><ContentPage /></AdminOnly> });

function ContentPage() {
  const router = useRouter();
  const [key, setKey] = useState<ContentKey>("home");
  const [draft, setDraft] = useState<unknown>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setDraft(structuredClone(contentSections[key].target));
  }, [key]);

  async function save() {
    setBusy(true);
    const { data: auth } = await supabase.auth.getUser();
    const { error } = await supabase.from("site_content").upsert({ key, data: draft as never, updated_by: auth.user?.id });
    setBusy(false);
    if (error) return toast.error("Konten belum tersimpan.");
    toast.success("Konten tersimpan dan tampil di website.");
    await router.invalidate();
  }
  async function reset() {
    if (!confirm("Kembalikan bagian ini ke isi awal?")) return;
    const { error } = await supabase.from("site_content").delete().eq("key", key);
    if (error) return toast.error("Gagal mengembalikan isi.");
    setDraft(defaultSection(key));
    toast.success("Isi awal dipulihkan.");
    await router.invalidate();
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Konten halaman</h1>
        <p className="mt-1 text-muted-foreground">Ubah teks setiap halaman, dari beranda sampai Tentang Kami. Perubahan langsung tampil setelah disimpan.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(contentSections) as ContentKey[]).map((k) => (
          <Button key={k} variant={k === key ? "default" : "outline"} size="sm" onClick={() => setKey(k)}>{contentSections[k].label}</Button>
        ))}
      </div>
      <div className="rounded-lg border bg-background p-5">{draft !== null && <ValueEditor name={key} value={draft} onChange={setDraft} />}</div>
      <div className="sticky bottom-0 flex gap-3 border-t bg-muted/80 py-4 backdrop-blur">
        <Button onClick={save} disabled={busy}>{busy ? "Menyimpan…" : "Simpan perubahan"}</Button>
        <Button variant="outline" onClick={reset}>Kembalikan isi awal</Button>
      </div>
    </div>
  );
}
