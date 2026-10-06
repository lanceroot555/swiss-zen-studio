import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// Only this address may claim the first Administrator account, and only while no Administrator exists.
const BOOTSTRAP_ADMIN_EMAIL = "adhityabudi@gmail.com";
const roleSchema = z.enum(["administrator", "editor"]);

async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "administrator" });
  if (error || !data) throw new Error("Akses ditolak. Hanya Administrator yang dapat melakukan ini.");
}

export const bootstrapAdmin = createServerFn({ method: "POST" })
  .inputValidator((d: { email: string; password: string }) => z.object({ email: z.string().trim().toLowerCase().email(), password: z.string().min(8).max(72) }).parse(d))
  .handler(async ({ data }) => {
    if (data.email !== BOOTSTRAP_ADMIN_EMAIL) throw new Error("Email ini tidak terdaftar sebagai Administrator pertama.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count } = await supabaseAdmin.from("user_roles").select("id", { count: "exact", head: true }).eq("role", "administrator");
    if ((count ?? 0) > 0) throw new Error("Administrator sudah dibuat. Silakan masuk.");
    const { data: created, error } = await supabaseAdmin.auth.admin.createUser({ email: data.email, password: data.password, email_confirm: true, user_metadata: { display_name: "Administrator" } });
    if (error || !created.user) throw new Error("Akun belum dapat dibuat. Mungkin email sudah terdaftar.");
    const { error: roleError } = await supabaseAdmin.from("user_roles").insert({ user_id: created.user.id, role: "administrator" });
    if (roleError) throw new Error("Peran belum dapat disimpan.");
    return { ok: true };
  });

export const listUsers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const [{ data: profiles }, { data: roles }] = await Promise.all([
      supabaseAdmin.from("profiles").select("id, email, display_name, created_at").order("created_at"),
      supabaseAdmin.from("user_roles").select("user_id, role"),
    ]);
    return (profiles ?? []).map((p) => ({ ...p, role: (roles ?? []).find((r) => r.user_id === p.id)?.role ?? null, isSelf: p.id === context.userId }));
  });

export const createUser = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { email: string; password: string; displayName: string; role: "administrator" | "editor" }) =>
    z.object({ email: z.string().trim().toLowerCase().email(), password: z.string().min(8).max(72), displayName: z.string().trim().min(2).max(80), role: roleSchema }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: created, error } = await supabaseAdmin.auth.admin.createUser({ email: data.email, password: data.password, email_confirm: true, user_metadata: { display_name: data.displayName } });
    if (error || !created.user) throw new Error("Pengguna belum dapat dibuat. Mungkin email sudah terdaftar.");
    await supabaseAdmin.from("profiles").update({ display_name: data.displayName }).eq("id", created.user.id);
    const { error: roleError } = await supabaseAdmin.from("user_roles").insert({ user_id: created.user.id, role: data.role });
    if (roleError) throw new Error("Peran belum dapat disimpan.");
    return { ok: true };
  });

export const setUserRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { userId: string; role: "administrator" | "editor" }) => z.object({ userId: z.string().uuid(), role: roleSchema }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    if (data.userId === context.userId) throw new Error("Anda tidak dapat mengubah peran akun sendiri.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("user_roles").delete().eq("user_id", data.userId);
    const { error } = await supabaseAdmin.from("user_roles").insert({ user_id: data.userId, role: data.role });
    if (error) throw new Error("Peran belum dapat disimpan.");
    return { ok: true };
  });

export const deleteUser = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { userId: string }) => z.object({ userId: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    if (data.userId === context.userId) throw new Error("Anda tidak dapat menghapus akun sendiri.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.auth.admin.deleteUser(data.userId);
    if (error) throw new Error("Pengguna belum dapat dihapus.");
    return { ok: true };
  });
