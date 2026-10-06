import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { listPublishedPosts, type PublicPost } from "@/lib/content.functions";
import { blogCopy as c } from "@/lib/site-config";
import { formatDate, readingTime } from "@/lib/blog";
import { pageHead } from "@/lib/seo";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/blog/")({
  loader: () => listPublishedPosts(),
  head: () => pageHead("Blog SEO, Website & Digital Marketing", c.description, "/blog"),
  component: BlogIndex,
  errorComponent: () => <p className="p-10 text-center">Blog belum dapat dimuat.</p>,
  notFoundComponent: () => <p className="p-10 text-center">Halaman tidak ditemukan.</p>,
});

function Meta({ p }: { p: PublicPost }) {
  return <p className="text-xs text-muted-foreground"><time dateTime={p.published_at ?? undefined}>{formatDate(p.published_at)}</time> · {readingTime(p.content)} {c.minutes}</p>;
}

function Card({ p }: { p: PublicPost }) {
  return (
    <article className="group flex flex-col">
      <Link to="/blog/$slug" params={{ slug: p.slug }} className="block aspect-[16/10] overflow-hidden rounded-lg bg-muted">
        {p.cover_image_url && <img src={p.cover_image_url} alt={p.cover_alt} loading="lazy" className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />}
      </Link>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-primary">{p.category}</p>
      <h2 className="mt-2 text-lg font-semibold leading-snug"><Link to="/blog/$slug" params={{ slug: p.slug }} className="hover:text-primary">{p.title}</Link></h2>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{p.excerpt}</p>
      <div className="mt-3"><Meta p={p} /></div>
    </article>
  );
}

function BlogIndex() {
  const posts = Route.useLoaderData();
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const cats = useMemo(() => Array.from(new Set(posts.map((p) => p.category))), [posts]);
  const filtered = posts.filter((p) => (cat === "all" || p.category === cat) && (p.title + p.excerpt + p.tags.join(" ")).toLowerCase().includes(q.toLowerCase()));
  const [featured, ...rest] = filtered;
  const showFeatured = featured && cat === "all" && !q;
  const list = showFeatured ? rest : filtered;

  return (
    <main className="bg-background text-foreground">
      <section className="bg-inverse section-glow-dark py-16 text-inverse-foreground md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <nav aria-label="Breadcrumb" className="text-xs text-inverse-muted"><Link to="/">Beranda</Link> / <span>Blog</span></nav>
          <p className="mt-6 text-xs font-semibold tracking-widest text-primary">{c.eyebrow}</p>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-semibold leading-tight md:text-4xl">{c.title}</h1>
          <p className="mt-4 max-w-2xl text-inverse-muted">{c.description}</p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        {posts.length === 0 ? <p className="max-w-xl border-y py-10 text-muted-foreground">{c.empty}</p> : (
          <>
            <div className="flex flex-col gap-4 border-b pb-6 md:flex-row md:items-center md:justify-between">
              <div className="flex gap-2 overflow-x-auto" role="tablist">
                {[["all", c.all], ...cats.map((x) => [x, x])].map(([k, l]) => (
                  <button key={k} role="tab" aria-selected={cat === k} onClick={() => setCat(k!)} className={`shrink-0 rounded-full border px-4 py-1.5 text-sm ${cat === k ? "border-foreground bg-foreground text-background" : "text-muted-foreground"}`}>{l}</button>
                ))}
              </div>
              <label className="relative md:w-72"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><span className="sr-only">{c.search}</span><Input className="pl-9" placeholder={c.search} value={q} onChange={(e) => setQ(e.target.value)} /></label>
            </div>
            {showFeatured && (
              <article className="grid gap-8 border-b py-10 md:grid-cols-2 md:items-center">
                <Link to="/blog/$slug" params={{ slug: featured.slug }} className="block aspect-[16/10] overflow-hidden rounded-lg bg-muted">
                  {featured.cover_image_url && <img src={featured.cover_image_url} alt={featured.cover_alt} className="size-full object-cover" />}
                </Link>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">{c.featured} · {featured.category}</p>
                  <h2 className="mt-3 font-display text-2xl font-semibold leading-snug md:text-3xl"><Link to="/blog/$slug" params={{ slug: featured.slug }} className="hover:text-primary">{featured.title}</Link></h2>
                  <p className="mt-3 leading-7 text-muted-foreground">{featured.excerpt}</p>
                  <div className="mt-4"><Meta p={featured} /></div>
                  <Link to="/blog/$slug" params={{ slug: featured.slug }} className="mt-5 inline-block text-sm font-semibold text-primary">{c.readMore} →</Link>
                </div>
              </article>
            )}
            {list.length === 0 && !showFeatured ? <p className="py-10 text-muted-foreground">{c.noResult}</p> : (
              <div className="grid gap-x-8 gap-y-12 py-10 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <Card key={p.id} p={p} />)}</div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
