import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { listUsers, createUser, setUserRole, deleteUser } from "@/lib/admin.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdminOnly } from "./admin";

export const Route = createFileRoute("/_authenticated/admin/pengguna")({ component: () => <AdminOnly><UsersPage /></AdminOnly> });

type Role = "administrator" | "editor";
const roleLabel = { administrator: "Administrator", editor: "Editor blog" };

function UsersPage() {
  const qc = useQueryClient();
  const fetchUsers = useServerFn(listUsers);
  const create = useServerFn(createUser);
  const changeRole = useServerFn(setUserRole);
  const remove = useServerFn(deleteUser);
  const { data: users, isLoading } = useQuery({ queryKey: ["admin-users"], queryFn: () => fetchUsers() });
  const [form, setForm] = useState({ email: "", password: "", displayName: "", role: "editor" as Role });
  const done = (msg: string) => { toast.success(msg); qc.invalidateQueries({ queryKey: ["admin-users"] }); };
  const fail = (e: unknown) => toast.error(e instanceof Error ? e.message : "Terjadi kesalahan.");

  const createMut = useMutation({ mutationFn: () => create({ data: form }), onSuccess: () => { done("Pengguna ditambahkan."); setForm({ email: "", password: "", displayName: "", role: "editor" }); }, onError: fail });
  const roleMut = useMutation({ mutationFn: (v: { userId: string; role: Role }) => changeRole({ data: v }), onSuccess: () => done("Peran diperbarui."), onError: fail });
  const delMut = useMutation({ mutationFn: (userId: string) => remove({ data: { userId } }), onSuccess: () => done("Pengguna dihapus."), onError: fail });

  function submit(e: FormEvent) { e.preventDefault(); createMut.mutate(); }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Pengguna</h1>
        <p className="mt-1 text-muted-foreground">Administrator mengelola seluruh isi website dan pengguna. Editor blog hanya mengelola artikel.</p>
      </div>
      <form onSubmit={submit} className="grid gap-4 rounded-lg border bg-background p-5 sm:grid-cols-2">
        <h2 className="font-semibold sm:col-span-2">Tambah pengguna</h2>
        <div className="space-y-1.5"><Label htmlFor="n">Nama</Label><Input id="n" required minLength={2} value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} /></div>
        <div className="space-y-1.5"><Label htmlFor="e">Email</Label><Input id="e" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
        <div className="space-y-1.5"><Label htmlFor="p">Kata sandi awal (min. 8)</Label><Input id="p" type="password" required minLength={8} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
        <div className="space-y-1.5"><Label htmlFor="r">Peran</Label>
          <select id="r" className="h-10 w-full rounded-md border bg-background px-3 text-sm" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as Role })}>
            <option value="editor">Editor blog</option><option value="administrator">Administrator</option>
          </select>
        </div>
        <div className="sm:col-span-2"><Button type="submit" disabled={createMut.isPending}>{createMut.isPending ? "Menyimpan…" : "Tambah pengguna"}</Button></div>
      </form>
      <div className="overflow-x-auto rounded-lg border bg-background">
        <table className="w-full text-sm">
          <thead className="border-b text-left text-muted-foreground"><tr><th className="p-3">Nama</th><th className="p-3">Email</th><th className="p-3">Peran</th><th className="p-3" /></tr></thead>
          <tbody>
            {isLoading && <tr><td className="p-3" colSpan={4}>Memuat…</td></tr>}
            {users?.map((u) => (
              <tr key={u.id} className="border-b last:border-0">
                <td className="p-3 font-medium">{u.display_name}{u.isSelf && <span className="ml-2 text-xs text-muted-foreground">(Anda)</span>}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">
                  {u.isSelf ? roleLabel[(u.role ?? "editor") as Role] : (
                    <select className="h-9 rounded-md border bg-background px-2" value={u.role ?? ""} onChange={(e) => roleMut.mutate({ userId: u.id, role: e.target.value as Role })}>
                      {!u.role && <option value="">Tanpa akses</option>}
                      <option value="editor">Editor blog</option><option value="administrator">Administrator</option>
                    </select>
                  )}
                </td>
                <td className="p-3 text-right">{!u.isSelf && <Button variant="ghost" size="icon" aria-label={`Hapus ${u.email}`} onClick={() => confirm(`Hapus ${u.email}?`) && delMut.mutate(u.id)}><Trash2 className="size-4" /></Button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
