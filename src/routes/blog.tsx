import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog Digital Marketing — Dimaloka" },
      { name: "description", content: "Panduan praktis seputar SEO, iklan digital, dan website untuk bisnis Indonesia." },
      { property: "og:title", content: "Blog Digital Marketing — Dimaloka" },
      { property: "og:description", content: "Panduan praktis seputar SEO, iklan digital, dan website untuk bisnis Indonesia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  return <main className="min-h-screen bg-background px-5 py-20 text-foreground"><div className="mx-auto max-w-5xl"><Button asChild variant="ghost" className="mb-16"><Link to="/"><ArrowLeft /> Kembali</Link></Button><p className="mb-4 text-sm font-bold uppercase text-primary">Wawasan Dimaloka</p><h1 className="max-w-3xl text-5xl font-black leading-[1.02] md:text-7xl">Catatan untuk bisnis yang ingin tumbuh di internet.</h1><div className="mt-16 border-y border-border py-10"><p className="max-w-xl text-lg text-muted-foreground">Artikel pertama sedang kami siapkan. Tidak ada konten pengisi atau klaim yang dibuat-buat di sini.</p></div></div></main>;
}