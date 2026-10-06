import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pageCopy } from "@/lib/site-config";

export const Route = createFileRoute("/kebijakan-privasi")({
  head: () => ({
    meta: [
      { title: pageCopy.seo.privacy.title },
      { name: "description", content: pageCopy.seo.privacy.description },
      { property: "og:title", content: pageCopy.seo.privacy.title },
      { property: "og:description", content: pageCopy.seo.privacy.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return <main className="min-h-screen bg-background px-5 py-20 text-foreground"><article className="mx-auto max-w-3xl"><Button asChild variant="ghost" className="mb-16"><Link to="/"><ArrowLeft /> {pageCopy.cta.back}</Link></Button><p className="mb-4 text-sm font-bold uppercase text-primary">Dimaloka</p><h1 className="text-[32px] font-bold md:text-[44px]">{pageCopy.privacy.title}</h1><div className="mt-12 space-y-6 border-t border-border pt-10 text-[17px] leading-8 text-muted-foreground">{pageCopy.privacy.paragraphs.map(text => <p key={text}>{text}</p>)}</div></article></main>;
}