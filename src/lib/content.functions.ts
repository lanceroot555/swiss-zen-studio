import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type PublicPost = {
  id: string; slug: string; title: string; excerpt: string; content: string; cover_image_url: string | null; cover_alt: string;
  category: string; tags: string[]; meta_title: string; meta_description: string; published_at: string | null; updated_at: string; author_name: string;
};
const listColumns = "id, slug, title, excerpt, cover_image_url, cover_alt, category, tags, meta_title, meta_description, published_at, updated_at, author_name, content";

export const getPublicContent = createServerFn({ method: "GET" }).handler(async () => {
  const { loadContentOverrides } = await import("./public-supabase.server");
  return (await loadContentOverrides()) as Record<string, any>;
});

export const listPublishedPosts = createServerFn({ method: "GET" }).handler(async () => {
  const { createPublicSupabase } = await import("./public-supabase.server");
  const { data, error } = await createPublicSupabase().from("blog_posts").select(listColumns).order("published_at", { ascending: false }).limit(200);
  if (error) { console.error("Blog list failed", error.code); return [] as PublicPost[]; }
  return (data ?? []) as PublicPost[];
});

export const getPublishedPost = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => z.object({ slug: z.string().min(1).max(200) }).parse(d))
  .handler(async ({ data }) => {
    const { createPublicSupabase } = await import("./public-supabase.server");
    const sb = createPublicSupabase();
    const { data: post } = await sb.from("blog_posts").select(listColumns).eq("slug", data.slug).maybeSingle();
    if (!post) return null;
    const { data: related } = await sb.from("blog_posts").select(listColumns).eq("category", post.category).neq("id", post.id).order("published_at", { ascending: false }).limit(3);
    return { post: post as PublicPost, related: (related ?? []) as PublicPost[] };
  });
