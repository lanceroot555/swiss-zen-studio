import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { products, addons } from "@/lib/site-config";
import type { ProductOverride, AddonOverride } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AdminOnly } from "./admin";

export const Route = createFileRoute("/_authenticated/admin/paket")({ component: () => <AdminOnly><PackagesPage /></AdminOnly> });

const toPrice = (v: string) => (v.trim() === "" ? null : Math.max(0, Number(v.replace(/\D/g, ""))));

function PackagesPage() {
  const router = useRouter();
  const [items, setItems] = useState(() => structuredClone(products));
  const [extra, setExtra] = useState(() => structuredClone(addons) as unknown as { slug: string; name: string; harga: number | null }[]);
  const [busy, setBusy] = useState(false);
  const update = (i: number, patch: Partial<(typeof items)[number]>) => setItems(items.map((p, j) => (j === i ? { ...p, ...patch } : p)));

  async function save() {
    setBusy(true);
    const productData: Record<string, ProductOverride> = Object.fromEntries(items.map((p) => [p.slug, { name: p.name, harga: p.harga, tipe_harga: p.tipe_harga, tagline: p.tagline, deskripsi: p.deskripsi, deliverables: p.deliverables, cocok_untuk: p.cocok_untuk, timeline: p.timeline, aktif: p.aktif }]));
    const addonData: Record<string, AddonOverride> = Object.fromEntries(extra.map((a) => [a.slug, { name: a.name, harga: a.harga }]));
    const { error } = await supabase.from("site_content").upsert([{ key: "products", data: productData as never }, { key: "addons", data: addonData as never }]);
    setBusy(false);
    if (error) return toast.error("Paket belum tersimpan.");
    toast.success("Paket dan harga tersimpan.");
    await router.invalidate();
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Paket toko</h1>
        <p className="mt-1 text-muted-foreground">Kosongkan harga untuk menampilkan “Rp [X]” (harga dikonfirmasi via WhatsApp).</p>
      </div>
      {items.map((p, i) => (
        <details key={p.slug} className="rounded-lg border bg-background p-5">
          <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium">
            <span>{p.name}</span>
            <span className="text-sm text-muted-foreground">{p.harga === null ? "Rp [X]" : `Rp ${p.harga.toLocaleString("id-ID")}`} · {p.aktif ? "Aktif" : "Nonaktif"}</span>
          </summary>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2"><Label>Nama paket</Label><Input value={p.name} onChange={(e) => update(i, { name: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>Harga (Rp)</Label><Input inputMode="numeric" placeholder="Kosong = Rp [X]" value={p.harga ?? ""} onChange={(e) => update(i, { harga: toPrice(e.target.value) })} /></div>
            <div className="space-y-1.5"><Label>Tipe harga</Label>
              <select className="h-10 w-full rounded-md border bg-background px-3 text-sm" value={p.tipe_harga} onChange={(e) => update(i, { tipe_harga: e.target.value as "sekali_bayar" | "bulanan" })}>
                <option value="sekali_bayar">Sekali bayar</option><option value="bulanan">Bulanan</option>
              </select>
            </div>
            <div className="space-y-1.5 sm:col-span-2"><Label>Tagline</Label><Input value={p.tagline} onChange={(e) => update(i, { tagline: e.target.value })} /></div>
            <div className="space-y-1.5 sm:col-span-2"><Label>Deskripsi</Label><Textarea value={p.deskripsi} onChange={(e) => update(i, { deskripsi: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>Ruang lingkup (satu per baris)</Label><Textarea rows={4} value={p.deliverables.join("\n")} onChange={(e) => update(i, { deliverables: e.target.value.split("\n").filter(Boolean) })} /></div>
            <div className="space-y-1.5"><Label>Cocok untuk (satu per baris)</Label><Textarea rows={4} value={p.cocok_untuk.join("\n")} onChange={(e) => update(i, { cocok_untuk: e.target.value.split("\n").filter(Boolean) })} /></div>
            <div className="space-y-1.5 sm:col-span-2"><Label>Waktu pengerjaan</Label><Input value={p.timeline} onChange={(e) => update(i, { timeline: e.target.value })} /></div>
            <label className="flex items-center gap-3"><Switch checked={p.aktif} onCheckedChange={(v) => update(i, { aktif: v })} /><span className="text-sm">Tampilkan dan bisa dipesan</span></label>
          </div>
        </details>
      ))}
      <div className="rounded-lg border bg-background p-5">
        <h2 className="font-semibold">Tambahan opsional</h2>
        <div className="mt-4 space-y-3">
          {extra.map((a, i) => (
            <div key={a.slug} className="grid gap-3 sm:grid-cols-[1fr_200px]">
              <Input value={a.name} onChange={(e) => setExtra(extra.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} />
              <Input inputMode="numeric" placeholder="Rp [X]" value={a.harga ?? ""} onChange={(e) => setExtra(extra.map((x, j) => (j === i ? { ...x, harga: toPrice(e.target.value) } : x)))} />
            </div>
          ))}
        </div>
      </div>
      <div className="sticky bottom-0 border-t bg-muted/80 py-4 backdrop-blur"><Button onClick={save} disabled={busy}>{busy ? "Menyimpan…" : "Simpan paket"}</Button></div>
    </div>
  );
}
