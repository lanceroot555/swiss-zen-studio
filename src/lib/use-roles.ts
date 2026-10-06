import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useMyRoles() {
  return useQuery({
    queryKey: ["my-roles"],
    queryFn: async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) return { userId: null, email: "", roles: [] as string[] };
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", auth.user.id);
      return { userId: auth.user.id, email: auth.user.email ?? "", roles: (data ?? []).map((r) => r.role as string) };
    },
  });
}
