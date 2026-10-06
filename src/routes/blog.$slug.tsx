import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Link2, MessageCircle } from "lucide-react";
import { getPublishedPost } from "@/lib/content.functions";
import { blogCopy as c, siteConfig, whatsappUrl, pageCopy } from "@/lib/site-config";
import { formatDate, headings, readingTime } from "@/lib/blog";
import { Markdown } from "@/components/blog/markdown";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const res = await getPublishedPost({ data: { slug: params.slug } });
    if (!res) throw notFound();
    return res;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Artikel tidak ditemukan — Dimaloka" }] };
    const p = loaderData.post;
    const title = `${p.meta_title || p.title} — Dimaloka`;
    const desc = p.meta_description || p.excerpt;
    const url = `${siteConfig.siteUrl}/blog/${p.slug}`;
    const img = p.cover_image_url?.startsWith("https://") ? p.cover_image_url : null;
    const jsonLd = [
      { "@context": "https://schema.org", "@type": "BlogPosting", headline: p.title, description: desc, datePublished: p.published_at, dateModified: p.updated_at, author: { "@type": "Person", name: p.author_name }, publisher: { "@type": "Organization", name: "Dimaloka" }, mainEntityOfPage: url, ...(img ? { image: img } : {}), keywords: p.tags.join(", ") },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Beranda", item: siteConfig.siteUrl }, { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.siteUrl}/blog` }, { "@type": "ListItem", position: 3, name: p.title, item: url }] },
    ];
    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: title }, { property: "og:description", content: desc },
        { property: "og:type", content: "article" }, { property: "og:url", content: url },
        { property: "article:published_time", content: p.published_at ?? "" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(img ? [{ property: "og:image", content: img }, { name: "twitter:image", content: img }] : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
    };
  },
  component: Article,
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-5 py-24 text-center"><h1 className="text-2xl font-semibold">Artikel tidak ditemukan</h1><Link to="/blog" className="mt-4 inline-block text-primary">Kembali ke blog</Link></main>
  ),
  errorComponent: () => <p className="p-10 text-center">Artikel belum dapat dimuat.</p>,
});

function Article() {
  const { post: p, related } = Route.useLoaderData();
  const toc = headings(p.content);
  const [url, setUrl] = useState("");
  useEffect(() => setUrl(window.location.href), []);
  const share = [
    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${p.title} ${url}`)}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { label: "X", href: `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(p.title)}` },
  ];

  return (
    <main className="bg-background text-foreground">
      <article>
        <header className="mx-auto max-w-3xl px-5 pt-12 md:pt-16">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground"><Link to="/">Beranda</Link> / <Link to="/blog">Blog</Link> / <span>{p.category}</span></nav>
          <p className="mt-8 text-xs font-semibold uppercase tracking-wide text-primary">{p.category}</p>
          <h1 className="mt-3 font-heading text-3xl font-semibold leading-tight md:text-[40px]">{p.title}</h1>
          {p.excerpt && <p className="mt-4 text-lg leading-8 text-muted-foreground">{p.excerpt}</p>}
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-y py-4 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{p.author_name}</span><span>·</span>
            <time dateTime={p.published_at ?? undefined}>{formatDate(p.published_at)}</time><span>·</span>
            <span>{readingTime(p.content)} {c.minutes}</span>
          </div>
        </header>
        {p.cover_image_url && (
          <figure className="mx-auto mt-8 max-w-5xl px-5"><img src={p.cover_image_url} alt={p.cover_alt} className="aspect-[16/9] w-full rounded-lg object-cover" /></figure>
        )}
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-[220px_minmax(0,720px)] lg:justify-center">
          <aside className="order-first lg:order-none">
            <div className="space-y-8 lg:sticky lg:top-28">
              {toc.length > 1 && (
                <nav aria-label={c.toc} className="rounded-lg border p-4 text-sm lg:border-0 lg:p-0">
                  <p className="mb-3 font-semibold">{c.toc}</p>
                  <ol className="space-y-2 text-muted-foreground">{toc.map((h) => <li key={h.id}><a href={`#${h.id}`} className="hover:text-primary">{h.text}</a></li>)}</ol>
                </nav>
              )}
              <div className="hidden lg:block">
                <p className="mb-3 text-sm font-semibold">{c.share}</p>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  {share.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noopener" className="hover:text-primary">{s.label}</a>)}
                  <button className="flex items-center gap-1 text-left hover:text-primary" onClick={() => { navigator.clipboard.writeText(url); toast.success(c.copied); }}><Link2 className="size-3" />Salin tautan</button>
                </div>
              </div>
            </div>
          </aside>
          <div className="min-w-0">
            <Markdown content={p.content} />
            {p.tags.length > 0 && <div className="mt-10 flex flex-wrap gap-2">{p.tags.map((t) => <span key={t} className="rounded-full border px-3 py-1 text-xs text-muted-foreground">#{t}</span>)}</div>}
            <div className="mt-8 flex flex-wrap gap-2 lg:hidden">
              {share.map((s) => <Button key={s.label} asChild variant="outline" size="sm"><a href={s.href} target="_blank" rel="noopener">{s.label}</a></Button>)}
            </div>
            <div className="mt-10 border-t pt-6"><p className="text-xs text-muted-foreground">{c.author}</p><p className="mt-1 font-semibold">{p.author_name}</p></div>
            <aside className="mt-10 rounded-lg bg-inverse p-6 text-inverse-foreground md:p-8">
              <h2 className="font-heading text-xl font-semibold">{c.ctaTitle}</h2>
              <p className="mt-2 text-inverse-muted">{c.ctaText}</p>
              <Button asChild className="mt-5 rounded-full"><a href={whatsappUrl(`Halo Dimaloka! Saya membaca artikel "${p.title}" dan ingin konsultasi.`)} target="_blank" rel="noreferrer"><MessageCircle />{pageCopy.cta.whatsapp}</a></Button>
            </aside>
          </div>
        </div>
      </article>
      {related.length > 0 && (
        <section className="border-t bg-muted/40 py-14">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="font-heading text-2xl font-semibold">{c.related}</h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-3">
              {related.map((r) => (
                <Link key={r.id} to="/blog/$slug" params={{ slug: r.slug }} className="group block">
                  <div className="aspect-[16/10] overflow-hidden rounded-lg bg-muted">{r.cover_image_url && <img src={r.cover_image_url} alt={r.cover_alt} loading="lazy" className="size-full object-cover" />}</div>
                  <p className="mt-3 text-xs font-semibold uppercase text-primary">{r.category}</p>
                  <h3 className="mt-1 font-semibold leading-snug group-hover:text-primary">{r.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{formatDate(r.published_at)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
