import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ImagePlus, Trash2, Loader2, ArrowUp, ArrowDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { clientsCopy } from "@/lib/clients-content";
import type { ClientLogo } from "@/components/client-marquee";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminOnly } from "./admin";

export const Route = createFileRoute("/_authenticated/admin/klien")({ component: () => <AdminOnly><ClientsPage /></AdminOnly> });

const BUCKET = "client-logos";
const ALLOWED = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];
const MAX_BYTES = 1024 * 1024;

/** Nama file aman: huruf/angka saja, dipisah tanda hubung. */
function safeName(original: string) {
  const ext = (original.split(".").pop() ?? "png").toLowerCase().replace(/[^a-z0-9]/g, "") || "png";
  const base = original.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "logo";
  return `${base}-${Date.now().toString(36)}.${ext}`;
}

function ClientsPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [logos, setLogos] = useState<ClientLogo[]>(() => structuredClone(clientsCopy.logos));
  const [label, setLabel] = useState(() => clientsCopy.label);
  const [uploading, setUploading] = useState(false);
  const [busy, setBusy] = useState(false);

  async function persist(next: ClientLogo[], nextLabel = label) {
    setBusy(true);
    const { data: auth } = await supabase.auth.getUser();
    const { error } = await supabase.from("site_content").upsert({ key: "clients", data: { label: nextLabel, logos: next } as never, updated_by: auth.user?.id ?? null });
    setBusy(false);
    if (error) return void toast.error("Perubahan belum tersimpan.");
    toast.success("Logo klien tersimpan dan tampil di halaman depan.");
    await router.invalidate();
  }

  async function onUpload(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    const added: ClientLogo[] = [];
    for (const file of Array.from(files)) {
      if (!ALLOWED.includes(file.type)) { toast.error(`${file.name}: format harus PNG, JPG, WEBP, atau SVG.`); continue; }
      if (file.size > MAX_BYTES) { toast.error(`${file.name}: ukuran maksimal 1 MB.`); continue; }
      const path = safeName(file.name);
      const { error } = await supabase.storage.from(BUCKET).upload(path, file, { cacheControl: "31536000", upsert: false, contentType: file.type });
      if (error) { toast.error(`${file.name} gagal diunggah.`); continue; }
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      added.push({ name: file.name.replace(/\.[^.]+$/, ""), url: data.publicUrl });
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
    if (!added.length) return;
    const next = [...logos, ...added];
    setLogos(next);
    await persist(next);
  }

  async function remove(index: number) {
    if (!confirm(`Hapus logo "${logos[index].name}" dari daftar?`)) return;
    const next = logos.filter((_, i) => i !== index);
    setLogos(next);
    await persist(next);
  }

  async function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= logos.length) return;
    const next = [...logos];
    [next[index], next[target]] = [next[target], next[index]];
    setLogos(next);
    await persist(next);
  }

  async function rename(index: number, name: string) {
    setLogos(logos.map((l, i) => (i === index ? { ...l, name } : l)));
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Logo klien</h1>
        <p className="mt-1 text-muted-foreground">
          Logo yang tampil di bagian “{label}” pada halaman depan. Unggah PNG/JPG/WEBP/SVG (maks 1 MB). Urutan di sini sama dengan urutan tampil.
        </p>
      </div>

      <div className="rounded-lg border bg-background p-5">
        <label className="block space-y-1.5">
          <span className="text-sm font-medium">Judul bagian</span>
          <Input value={label} onChange={(e) => setLabel(e.target.value)} onBlur={() => persist(logos)} maxLength={80} />
        </label>
      </div>

      <div className="rounded-lg border bg-background p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-semibold">Daftar logo ({logos.length})</h2>
          <div>
            <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" multiple className="hidden" onChange={(e) => onUpload(e.target.files)} />
            <Button onClick={() => fileRef.current?.click()} disabled={uploading || busy}>
              {uploading ? <Loader2 className="animate-spin" /> : <ImagePlus />}
              {uploading ? "Mengunggah…" : "Unggah logo"}
            </Button>
          </div>
        </div>

        {logos.length === 0 ? (
          <p className="mt-5 rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
            Belum ada logo. Selama kosong, bagian ini tidak tampil di halaman depan.
          </p>
        ) : (
          <ul className="mt-5 space-y-3">
            {logos.map((logo, i) => (
              <li key={`${logo.url}-${i}`} className="flex items-center gap-4 rounded-md border p-3">
                <span className="flex size-16 shrink-0 items-center justify-center rounded border bg-muted/40">
                  <img src={logo.url} alt={logo.name} className="max-h-14 max-w-[60px] object-contain" />
                </span>
                <Input value={logo.name} onChange={(e) => rename(i, e.target.value)} onBlur={() => persist(logos)} className="flex-1" maxLength={60} />
                <div className="flex shrink-0 gap-1">
                  <Button variant="ghost" size="icon" aria-label="Naikkan urutan" disabled={i === 0 || busy} onClick={() => move(i, -1)}><ArrowUp className="size-4" /></Button>
                  <Button variant="ghost" size="icon" aria-label="Turunkan urutan" disabled={i === logos.length - 1 || busy} onClick={() => move(i, 1)}><ArrowDown className="size-4" /></Button>
                  <Button variant="ghost" size="icon" aria-label="Hapus logo" disabled={busy} onClick={() => remove(i)}><Trash2 className="size-4" /></Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
