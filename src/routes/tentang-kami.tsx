import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { aboutCopy as c, whatsappUrl, siteConfig, pageCopy } from "@/lib/site-config";
import { pageHead } from "@/lib/seo";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/tentang-kami")({
  head: () => pageHead(c.seoTitle, c.seoDescription, "/tentang-kami"),
  component: About,
});

function About() {
  return (
    <main className="bg-background text-foreground">
      <section className="bg-inverse py-16 text-inverse-foreground md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="text-xs font-semibold tracking-widest text-primary">{c.eyebrow}</p>
          <h1 className="mt-3 max-w-3xl font-heading text-3xl font-semibold leading-tight md:text-4xl">{c.title}</h1>
          <p className="mt-4 max-w-2xl text-inverse-muted">{c.description}</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-3 md:px-8">
        {c.sections.map((s) => (
          <div key={s.title} className="border-t pt-6"><h2 className="font-heading text-xl font-semibold">{s.title}</h2><p className="mt-3 leading-7 text-muted-foreground">{s.text}</p></div>
        ))}
      </section>
      {c.values.length > 0 && (
        <section className="bg-muted/40 py-16">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:grid-cols-2 lg:grid-cols-4 md:px-8">
            {c.values.map((v) => <div key={v.title} className="rounded-lg border bg-background p-6"><h3 className="font-semibold">{v.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{v.text}</p></div>)}
          </div>
        </section>
      )}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <h2 className="font-heading text-2xl font-semibold">{c.ctaTitle}</h2>
        <p className="mt-2 text-muted-foreground">{c.ctaText}</p>
        <Button asChild className="mt-6 rounded-full"><a href={whatsappUrl(siteConfig.whatsappMessages.hero)} target="_blank" rel="noreferrer"><MessageCircle />{pageCopy.cta.whatsapp}</a></Button>
      </section>
    </main>
  );
}
