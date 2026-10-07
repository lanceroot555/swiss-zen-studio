import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ImagePlus, Trash2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { profesionalCopy, profesionalImage } from "@/lib/profesional-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AdminOnly } from "./admin";

export const Route = createFileRoute("/_authenticated/admin/profesional")({ component: () => <AdminOnly><ProfesionalPage /></AdminOnly> });

const BUCKET = "site-images";
const ALLOWED = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];
const MAX_BYTES = 2 * 1024 * 1024;

function safeName(original: string) {
  const ext = (original.split(".").pop() ?? "png").toLowerCase().replace(/[^a-z0-9]/g, "") || "png";
  const base = original.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "gambar";
  return `profesional-${base}-${Date.now().toString(36)}.${ext}`;
}

function ProfesionalPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState(() => ({
    eyebrow: profesionalCopy.eyebrow,
    title: profesionalCopy.title,
    description: profesionalCopy.description,
    points: [...profesionalCopy.points] as string[],
    imageUrl: profesionalCopy.imageUrl,
    imageAlt: profesionalCopy.imageAlt,
  }));
  const [uploading, setUploading] = useState(false);
  const [busy, setBusy] = useState(false);

  const set = (patch: Partial<typeof draft>) => setDraft((d) => ({ ...d, ...patch }));

  async function persist(next = draft) {
    setBusy(true);
    const { data: auth } = await supabase.auth.getUser();
    const { error } = await supabase.from("site_content").upsert({ key: "profesional", data: next as never, updated_by: auth.user?.id ?? null });
    setBusy(false);
    if (error) return void toast.error("Perubahan belum tersimpan.");
    toast.success("Bagian Profesional & Terukur tersimpan dan tampil di halaman depan.");
    await router.invalidate();
  }

  async function onUpload(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    if (!ALLOWED.includes(file.type)) return void toast.error("Format harus PNG, JPG, WEBP, atau SVG.");
    if (file.size > MAX_BYTES) return void toast.error("Ukuran maksimal 2 MB.");
    setUploading(true);
    const path = safeName(file.name);
    const { error } = await supabase.storage.from(BUCKET).upload(path, file, { cacheControl: "31536000", upsert: false, contentType: file.type });
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
    if (error) return void toast.error("Gambar gagal diunggah.");
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    const next = { ...draft, imageUrl: data.publicUrl };
    setDraft(next);
    await persist(next);
  }

  async function resetImage() {
    const next = { ...draft, imageUrl: "" };
    setDraft(next);
    await persist(next);
    toast.success("Kembali ke ilustrasi bawaan.");
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Profesional &amp; Terukur</h1>
        <p className="mt-1 text-muted-foreground">
          Isi bagian kedua halaman depan. Kosongkan gambar untuk memakai ilustrasi bawaan.
        </p>
      </div>

      <div className="space-y-4 rounded-lg border bg-background p-5">
        <div className="space-y-1.5"><label className="text-sm font-medium">Label kecil</label><Input value={draft.eyebrow} onChange={(e) => set({ eyebrow: e.target.value })} maxLength={60} /></div>
        <div className="space-y-1.5"><label className="text-sm font-medium">Judul</label><Textarea value={draft.title} onChange={(e) => set({ title: e.target.value })} rows={2} maxLength={160} /></div>
        <div className="space-y-1.5"><label className="text-sm font-medium">Deskripsi</label><Textarea value={draft.description} onChange={(e) => set({ description: e.target.value })} rows={5} maxLength={800} /></div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Poin penting (satu per baris)</label>
          <Textarea value={draft.points.join("\n")} onChange={(e) => set({ points: e.target.value.split("\n") })} rows={4} />
        </div>
      </div>

      <div className="rounded-lg border bg-background p-5">
        <h2 className="font-semibold">Gambar</h2>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex size-40 shrink-0 items-center justify-center rounded-md border bg-muted/30 p-2">
            <img src={profesionalImage(draft.imageUrl)} alt={draft.imageAlt} className="max-h-full max-w-full object-contain" />
          </div>
          <div className="flex-1 space-y-3">
            <div className="space-y-1.5"><label className="text-sm font-medium">Teks alternatif (untuk SEO)</label><Input value={draft.imageAlt} onChange={(e) => set({ imageAlt: e.target.value })} maxLength={160} /></div>
            <div className="flex flex-wrap gap-2">
              <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" className="hidden" onChange={(e) => onUpload(e.target.files)} />
              <Button onClick={() => fileRef.current?.click()} disabled={uploading || busy}>
                {uploading ? <Loader2 className="animate-spin" /> : <ImagePlus />}
                {uploading ? "Mengunggah…" : "Ganti gambar"}
              </Button>
              {draft.imageUrl && <Button variant="outline" onClick={resetImage} disabled={busy}><Trash2 />Pakai ilustrasi bawaan</Button>}
            </div>
            <p className="text-xs leading-5 text-muted-foreground">PNG/JPG/WEBP/SVG, maksimal 2 MB. Gunakan PNG transparan agar menyatu dengan warna latar bagian ini.</p>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 border-t bg-muted/80 py-4 backdrop-blur">
        <Button onClick={() => persist()} disabled={busy}>{busy ? "Menyimpan…" : "Simpan perubahan"}</Button>
      </div>
    </div>
  );
}
