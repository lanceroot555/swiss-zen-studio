import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pageCopy } from "@/lib/site-config";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: pageCopy.seo.blog.title },
      { name: "description", content: pageCopy.seo.blog.description },
      { property: "og:title", content: pageCopy.seo.blog.title },
      { property: "og:description", content: pageCopy.seo.blog.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  return <main className="min-h-screen bg-background px-5 py-20 text-foreground"><div className="mx-auto max-w-5xl"><Button asChild variant="ghost" className="mb-16"><Link to="/"><ArrowLeft /> {pageCopy.cta.back}</Link></Button><p className="mb-4 text-sm font-bold uppercase text-primary">{pageCopy.blog.eyebrow}</p><h1 className="max-w-3xl text-[32px] font-bold leading-[1.15] md:text-[44px]">{pageCopy.blog.title}</h1><div className="mt-16 border-y border-border py-10"><p className="max-w-xl text-[17px] text-muted-foreground">{pageCopy.blog.pending}</p></div></div></main>;
}