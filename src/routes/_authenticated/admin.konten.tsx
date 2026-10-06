import { MenuEditor } from "@/components/admin/menu-editor";
import { PageSchemaEditor } from "@/components/admin/page-schema-editor";
import { parseSchema, serializeSchema } from "@/lib/structured-schema";
import { navigationConfig, pageSchemas, type MenuItem } from "@/lib/site-config";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
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
  const [draft, setDraft] = useState<unknown>(() => structuredClone(contentSections.home.target));
  const [busy, setBusy] = useState(false);


  async function save() {
    let payload = draft;
    try {
      if (key === "schemas") { const schemas = draft as typeof pageSchemas; payload = { items: schemas.items.map(p => { const value = parseSchema(p.structuredSchema); return {...p, structuredSchema: value ? serializeSchema(value) : ""}; }) }; }
      if (key === "navigation") { const menu = draft as typeof navigationConfig; if (menu.items.some(i => !i.label.trim() || !i.href || i.children.some(c => !c.label.trim() || !c.href))) throw new Error("Lengkapi nama dan tujuan semua menu."); }
    } catch(e) { return void toast.error(e instanceof Error ? e.message : "Pengaturan tidak valid."); }
    setBusy(true);
    const { data: auth } = await supabase.auth.getUser();
    const { error } = await supabase.from("site_content").upsert({ key, data: payload as never, updated_by: auth.user?.id ?? null });
    setBusy(false);
    if (error) return void toast.error("Konten belum tersimpan.");
    toast.success("Konten tersimpan dan tampil di website.");
    await router.invalidate();
  }
  async function reset() {
    if (!confirm("Kembalikan bagian ini ke isi awal?")) return;
    const { error } = await supabase.from("site_content").delete().eq("key", key);
    if (error) return void toast.error("Gagal mengembalikan isi.");
    setDraft(defaultSection(key));
    toast.success("Isi awal dipulihkan.");
    await router.invalidate();
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Konten halaman</h1>
        <p className="mt-1 text-muted-foreground">Ubah teks setiap halaman, termasuk layanan dan Hubungi Kami. Perubahan langsung tampil setelah disimpan.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(contentSections) as ContentKey[]).map((k) => (
          <Button key={k} variant={k === key ? "default" : "outline"} size="sm" onClick={() => { setDraft(structuredClone(contentSections[k].target)); setKey(k); }}>{contentSections[k].label}</Button>
        ))}
      </div>
      <div className="rounded-lg border bg-background p-5">{draft !== null && (key === "navigation" ? <MenuEditor items={(draft as {items:MenuItem[]}).items} onChange={items=>setDraft({items})}/> : key === "schemas" ? <PageSchemaEditor value={draft as typeof pageSchemas} onChange={setDraft}/> : <ValueEditor name={key} value={draft} onChange={setDraft} />)}</div>
      <div className="sticky bottom-0 flex gap-3 border-t bg-muted/80 py-4 backdrop-blur">
        <Button onClick={save} disabled={busy}>{busy ? "Menyimpan…" : "Simpan perubahan"}</Button>
        <Button variant="outline" onClick={reset}>Kembalikan isi awal</Button>
      </div>
    </div>
  );
}
