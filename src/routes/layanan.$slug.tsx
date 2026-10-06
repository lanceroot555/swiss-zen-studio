import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, CheckCircle2, MessageCircle, Plus } from "lucide-react";
import { servicePages, siteConfig, whatsappUrl } from "@/lib/site-config";
import { pageHead, pageSchema } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import photoWebsite from "@/assets/layanan-website.jpg";
import photoSeo from "@/assets/layanan-seo.jpg";
import photoAds from "@/assets/layanan-ads.jpg";
import photoMarketplace from "@/assets/layanan-marketplace.jpg";
import photoKonten from "@/assets/layanan-konten.jpg";
import photoAi from "@/assets/layanan-ai.jpg";
import mockDesktop from "@/assets/mockup-desktop.jpg";
import mockMobile from "@/assets/mockup-mobile.jpg";

const photos: Record<string, string> = { website: photoWebsite, seo: photoSeo, ads: photoAds, marketplace: photoMarketplace, konten: photoKonten, ai: photoAi };

export const Route = createFileRoute("/layanan/$slug")({
  beforeLoad: ({ params }) => { if (!servicePages.items.some((s) => s.slug === params.slug)) throw notFound(); },
  head: ({ params }) => {
    const s = servicePages.items.find((s) => s.slug === params.slug);
    if (!s) return { ...pageHead("Layanan tidak ditemukan", "Halaman layanan Dimaloka tidak tersedia.", "/layanan"), meta: [{ title: "Layanan tidak ditemukan — Dimaloka" }, { name: "robots", content: "noindex" }] };
    const path = `/layanan/${s.slug}`;
    return { ...pageHead(s.seoTitle, s.seoDescription, path), scripts: pageSchema(path, [{ "@context": "https://schema.org", "@type": "Service", name: s.heroTitle ?? s.title, serviceType: s.title, description: s.seoDescription, url: siteConfig.siteUrl + path, areaServed: "ID", provider: { "@type": "Organization", name: siteConfig.name } }, ...(s.faq.length ? [{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: s.faq.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) }] : [])]) };
  },
  component: Service,
  notFoundComponent: () => <main className="site-section"><h1 className="text-2xl font-semibold">Layanan tidak ditemukan</h1><Link to="/layanan" className="mt-5 block text-primary">Semua layanan</Link></main>,
});

function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`text-xs font-bold uppercase tracking-[0.18em] ${light ? "text-primary" : "text-primary"}`}>{children}</p>;
}

function Service() {
  const { slug } = Route.useParams();
  const s = servicePages.items.find((s) => s.slug === slug);
  const c = servicePages.copy;
  const [tab, setTab] = useState(0);
  if (!s) return null;
  const wa = whatsappUrl(`Halo Dimaloka! Saya ingin konsultasi tentang ${s.title}.`);
  const features = s.features ?? [];
  const active = features[tab] ?? features[0];
  const photo = photos[s.photo ?? "website"] ?? photoWebsite;

  return (
    <main>
      {/* Hero */}
      <section className="bg-inverse text-inverse-foreground">
        <div className="site-section grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-xs font-medium text-inverse-foreground/80"><Link to="/">Home</Link><span>/</span><Link to="/layanan">Layanan</Link><span>/</span><span>{s.title}</span></nav>
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-primary">{s.eyebrow ?? "Layanan Dimaloka"}</p>
            <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight md:text-[44px]">{s.heroTitle ?? s.seoTitle}</h1>
            <p className="mt-5 max-w-xl text-base font-medium leading-8 text-inverse-foreground/90">{s.heroText ?? s.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="h-12 rounded-full px-6"><a href={wa} target="_blank" rel="noreferrer"><MessageCircle className="size-4" />{c.consult}</a></Button>
              <Button asChild variant="outline" className="h-12 rounded-full border-inverse-border bg-transparent px-6 text-inverse-foreground hover:bg-inverse-foreground/10 hover:text-inverse-foreground"><a href="#fitur">Lihat fitur<ArrowRight className="size-4" /></a></Button>
            </div>
          </div>
          <figure className="hero-visual">
            <img src={photo} alt={`${s.title} — ilustrasi pemilik bisnis`} width={1280} height={960} className="aspect-[4/3] w-full rounded-2xl object-cover" />
          </figure>
        </div>
      </section>

      {/* Why */}
      {s.whyPoints && (
        <section className="site-section">
          <div className="max-w-2xl"><h2 className="font-display text-2xl font-bold leading-snug md:text-3xl">{s.whyTitle}</h2><p className="mt-4 leading-8 text-muted-foreground">{s.whyText}</p></div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {s.whyPoints.map((w, i) => <div key={w.title} className="rounded-xl border p-6"><span className="text-sm font-bold text-primary">0{i + 1}</span><h3 className="mt-4 text-lg font-semibold">{w.title}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{w.text}</p></div>)}
          </div>
        </section>
      )}

      {/* Feature tabs */}
      {active && (
        <section id="fitur" className="scroll-mt-24 border-y bg-secondary">
          <div className="site-section">
            <Eyebrow>{s.featureEyebrow}</Eyebrow>
            <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold leading-snug md:text-3xl">{s.featureTitle}</h2>
            <div role="tablist" aria-label={s.featureTitle} className="mt-8 flex gap-2 overflow-x-auto pb-2">
              {features.map((f, i) => <button key={f.tab} role="tab" aria-selected={i === tab} onClick={() => setTab(i)} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${i === tab ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:border-foreground/40"}`}>{f.tab}</button>)}
            </div>
            <div key={tab} role="tabpanel" className="mt-6 grid items-center gap-10 rounded-2xl bg-background p-6 md:p-10 lg:grid-cols-2 animate-[reveal-content_.5s_ease-out]">
              <div>
                <Eyebrow>{active.tab}</Eyebrow>
                <h3 className="mt-3 font-display text-xl font-bold md:text-2xl">{active.title}</h3>
                <p className="mt-4 leading-8 text-muted-foreground">{active.text}</p>
                <ul className="mt-6 space-y-3">{active.bullets.map((b) => <li key={b} className="flex gap-3 text-sm font-medium"><CheckCircle2 className="size-5 shrink-0 text-primary" />{b}</li>)}</ul>
              </div>
              <figure>
                <div className="overflow-hidden rounded-xl border shadow-sm"><div className="flex gap-1.5 border-b bg-muted px-3 py-2"><span className="size-2.5 rounded-full bg-foreground/20" /><span className="size-2.5 rounded-full bg-foreground/20" /><span className="size-2.5 rounded-full bg-foreground/20" /></div><img src={mockDesktop} alt="Contoh tampilan website buatan Dimaloka" loading="lazy" width={1440} height={900} className="w-full" /></div>
                <figcaption className="mt-3 text-xs text-muted-foreground">Contoh tampilan nyata: halaman Paket & Harga Dimaloka</figcaption>
              </figure>
            </div>
          </div>
        </section>
      )}

      {/* Custom features */}
      {s.customFeatures && (
        <section className="site-section">
          <Eyebrow>Fitur Lainnya</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold leading-snug md:text-3xl">{s.customTitle}</h2>
          <p className="mt-4 max-w-2xl leading-8 text-muted-foreground">{s.customText}</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {s.customFeatures.map((f) => <div key={f.title} className="group rounded-xl border p-6 transition-all hover:-translate-y-1 hover:border-primary"><Plus className="size-5 text-primary transition-transform group-hover:rotate-90" /><h3 className="mt-4 font-semibold">{f.title}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{f.text}</p></div>)}
          </div>
        </section>
      )}

      {/* Devices */}
      {s.devicePoints && (
        <section className="bg-inverse text-inverse-foreground">
          <div className="site-section grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow light>{s.deviceEyebrow}</Eyebrow>
              <h2 className="mt-3 font-display text-2xl font-bold leading-snug md:text-3xl">{s.deviceTitle}</h2>
              <ul className="mt-8 space-y-6">{s.devicePoints.map((d) => <li key={d.title} className="flex gap-4"><Check className="mt-1 size-5 shrink-0 text-primary" /><div><p className="font-semibold">{d.title}</p><p className="mt-1 text-sm leading-7 text-inverse-foreground/85">{d.text}</p></div></li>)}</ul>
            </div>
            <figure className="relative pb-8 pr-6">
              <div className="overflow-hidden rounded-xl border-4 border-inverse-border"><img src={mockDesktop} alt="Tampilan desktop website Dimaloka" loading="lazy" width={1440} height={900} className="w-full" /></div>
              <div className="absolute bottom-0 right-0 w-[28%] overflow-hidden rounded-[1.4rem] border-[5px] border-inverse-border bg-inverse shadow-2xl"><img src={mockMobile} alt="Tampilan ponsel website Dimaloka" loading="lazy" width={390} height={844} className="w-full" /></div>
              <figcaption className="sr-only">Tangkapan layar nyata website Dimaloka di desktop dan ponsel</figcaption>
            </figure>
          </div>
        </section>
      )}

      {/* Benefits */}
      {s.benefits && (
        <section className="site-section">
          <div className="max-w-2xl"><Eyebrow>Benefit Layanan</Eyebrow><h2 className="mt-3 font-display text-2xl font-bold leading-snug md:text-3xl">{s.benefitTitle}</h2><p className="mt-4 leading-8 text-muted-foreground">{s.benefitText}</p></div>
          <div className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {s.benefits.map((b) => <div key={b.title} className="border-t py-6"><h3 className="font-semibold">{b.title}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{b.text}</p></div>)}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="border-t">
        <div className="site-section grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <h2 className="font-display text-2xl font-bold">{c.faqTitle}</h2>
          <Accordion type="single" collapsible>{s.faq.map((f, i) => <AccordionItem key={i} value={String(i)}><AccordionTrigger className="text-left text-base">{f.question}</AccordionTrigger><AccordionContent className="leading-7 text-muted-foreground">{f.answer}</AccordionContent></AccordionItem>)}</Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-inverse text-inverse-foreground">
        <div className="site-section grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <Eyebrow light>Siap Mulai</Eyebrow>
            <h2 className="mt-3 max-w-3xl font-display text-2xl font-bold leading-snug md:text-3xl">{s.ctaTitle}</h2>
            <p className="mt-4 max-w-2xl leading-7 text-inverse-foreground/85">{s.ctaText}</p>
            {s.ctaPoints && <ul className="mt-6 space-y-2">{s.ctaPoints.map((p) => <li key={p} className="flex gap-3 text-sm font-medium"><Check className="size-4 shrink-0 text-primary" />{p}</li>)}</ul>}
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button asChild className="h-12 rounded-full px-6"><a href={wa} target="_blank" rel="noreferrer"><MessageCircle className="size-4" />Konsultasi via WhatsApp</a></Button>
            <Button asChild variant="outline" className="h-12 rounded-full border-inverse-border bg-transparent px-6 text-inverse-foreground hover:bg-inverse-foreground/10 hover:text-inverse-foreground"><Link to="/toko">{c.packages}</Link></Button>
          </div>
        </div>
      </section>
    </main>
  );
}
