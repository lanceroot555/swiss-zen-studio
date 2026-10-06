import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  ChevronRight,
  Globe2,
  Menu,
  MessageCircle,
  Search,
  ShoppingBag,
  Target,
  X,
} from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ServiceShowcase } from "@/components/service-showcase";
import heroIllustration from "@/assets/hero-illustration.png";
import { trackEvent } from "@/lib/analytics";
import { submitContact } from "@/lib/contact.functions";
import { pageSchema } from "@/lib/seo";
import { pageCopy, services, siteConfig, whatsappUrl, type WhatsAppLocation } from "@/lib/site-config";

const serviceIcons = [Globe2, Search, Target, ShoppingBag, BarChart3, Bot];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: pageCopy.sections.faq.items.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: pageCopy.seo.home.title },
      { name: "description", content: pageCopy.seo.home.description },
      { property: "og:title", content: pageCopy.seo.home.title },
      { property: "og:description", content: pageCopy.seo.home.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: pageSchema("/", [
      { "@context": "https://schema.org", "@type": "Organization", name: siteConfig.name, description: siteConfig.description, telephone: `+${siteConfig.phoneInternational}` },
      { ...faqSchema, mainEntity: pageCopy.sections.faq.items.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
    ]),
  }),
  component: HomePage,
});

function WaLink({ location, children, className }: { location: WhatsAppLocation; children: React.ReactNode; className?: string }) {
  return <a href={whatsappUrl(siteConfig.whatsappMessages[location])} target="_blank" rel="noreferrer" className={className} onClick={() => trackEvent("click_wa", { location })}>{children}</a>;
}

function SectionHeading({ index, eyebrow, title, description }: { index: string; eyebrow: string; title: string; description?: string }) {
  return <div className="grid items-end gap-6 lg:grid-cols-[1.2fr_1fr]"><div><p className="mb-4 text-sm font-semibold text-primary">{index} / {eyebrow}</p><h2 className="max-w-xl text-[26px] font-semibold leading-[1.3] md:text-[32px]">{title}</h2></div>{description && <p className="max-w-lg text-base leading-7 text-muted-foreground lg:justify-self-end">{description}</p>}</div>;
}

function ConsultationForm() {
  const sendContact = useServerFn(submitContact);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState({ name: "", need: "Website" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("sending"); setError("");
    const form = new FormData(event.currentTarget);
    const data = { name: String(form.get("name") ?? ""), phone: String(form.get("phone") ?? ""), need: String(form.get("need") ?? "Website") as "Website" | "SEO" | "Ads" | "Marketplace" | "Lainnya", message: String(form.get("message") ?? ""), company: String(form.get("company") ?? "") };
    try { await sendContact({ data }); setResult({ name: data.name, need: data.need }); setStatus("success"); trackEvent("submit_form", { need: data.need }); }
    catch (caught) { setError(caught instanceof Error ? caught.message : pageCopy.form.error); setStatus("error"); }
  }

  if (status === "success") {
    const fallback = `${pageCopy.form.fallbackPrefix} ${result.name}, ${pageCopy.form.fallbackContext} ${result.need}.`;
    return <div className="flex min-h-[420px] flex-col justify-center border border-primary bg-background p-7 md:p-10"><div className="mb-6 flex h-12 w-12 items-center justify-center bg-primary text-primary-foreground"><Check /></div><h3 className="text-3xl font-black">{pageCopy.form.thanks} {result.name}.</h3><p className="mt-4 leading-7 text-muted-foreground">{pageCopy.form.received}</p><Button asChild size="lg" className="mt-8 h-13 rounded-md"><a href={whatsappUrl(fallback)} target="_blank" rel="noreferrer" onClick={() => trackEvent("click_wa", { location: "form_fallback" })}><MessageCircle /> {pageCopy.form.continue}</a></Button></div>;
  }

  return <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-background p-6 md:p-8" noValidate><div className="grid gap-5"><div><Label htmlFor="name">{pageCopy.form.name}</Label><Input id="name" name="name" required minLength={2} maxLength={80} className="mt-2 h-12 rounded-md" placeholder={pageCopy.form.namePlaceholder} /></div><div><Label htmlFor="phone">{pageCopy.form.phone}</Label><Input id="phone" name="phone" required inputMode="tel" className="mt-2 h-12 rounded-md" placeholder={pageCopy.form.phonePlaceholder} /></div><div><Label htmlFor="need">{pageCopy.form.need}</Label><select id="need" name="need" className="mt-2 h-12 w-full rounded-md border border-input bg-background px-3 text-base focus:outline-none focus:ring-2 focus:ring-ring">{pageCopy.form.needs.map(need => <option key={need}>{need}</option>)}</select></div><div><Label htmlFor="message">{pageCopy.form.message}</Label><Textarea id="message" name="message" maxLength={1000} className="mt-2 min-h-28 rounded-md" placeholder={pageCopy.form.messagePlaceholder} /></div><input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />{status === "error" && <p role="alert" className="text-sm text-destructive">{error}</p>}<Button type="submit" size="lg" disabled={status === "sending"} className="h-13 rounded-md font-bold">{status === "sending" ? pageCopy.form.sending : pageCopy.form.submit}<ArrowRight /></Button><p className="text-sm leading-6 text-muted-foreground">{pageCopy.form.consent} <Link to="/kebijakan-privasi" className="underline">{pageCopy.form.privacy}</Link> {pageCopy.form.consentEnd}</p></div></form>;
}

function HomePage() {
  const [showFloating, setShowFloating] = useState(false);
  useEffect(() => { const onScroll = () => setShowFloating(window.scrollY > 300); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  return <div id="top" className="bg-background text-foreground"><main>
    <section className="overflow-hidden bg-inverse section-glow-dark text-inverse-foreground" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-2 lg:gap-16">
        <div className="hero-copy">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-inverse-border px-3 py-1.5 text-xs font-semibold text-inverse-foreground"><span className="size-1.5 rounded-full bg-primary" />{pageCopy.hero.label}</div>
          <h1 id="hero-title" className="max-w-xl text-[30px] font-extrabold leading-[1.25] md:text-[40px]">{pageCopy.hero.title}</h1>
          <p className="mt-6 max-w-xl text-base font-semibold leading-7 text-inverse-foreground">{pageCopy.hero.description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3"><Button asChild size="lg" className="h-12 rounded-full px-6 text-sm font-semibold shadow-none"><WaLink location="hero"><MessageCircle className="size-4" />{pageCopy.cta.whatsapp}</WaLink></Button><Button asChild variant="outline" size="lg" className="h-12 rounded-full border-inverse-border bg-transparent px-6 text-sm text-inverse-foreground shadow-none hover:bg-inverse-foreground/10 hover:text-inverse-foreground"><a href="#layanan">{pageCopy.cta.services}<ArrowDown /></a></Button></div>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 border-t border-inverse-border pt-6 text-sm font-medium leading-6 text-inverse-foreground">{pageCopy.hero.trust.map(text => <span key={text} className="flex items-center gap-2"><Check className="size-3.5 text-primary" />{text}</span>)}</div>
        </div>
        <figure className="hero-visual relative mx-auto w-full max-w-[560px]"><div aria-hidden="true" className="absolute inset-0 -z-10 scale-90 rounded-full bg-primary/20 blur-3xl" /><img src={heroIllustration} width={1408} height={1024} alt={pageCopy.hero.visualAlt} fetchPriority="high" className="hero-visual-image aspect-[1.375] w-full rounded-2xl object-cover" /><figcaption className="mt-4 text-center text-xs font-medium leading-5 text-inverse-foreground">{pageCopy.hero.visualCaption}</figcaption></figure>
      </div>
    </section>

    <ServiceShowcase />

    <section className="border-y border-border bg-secondary section-glow-light"><div className="site-section"><SectionHeading index="02" {...pageCopy.sections.why} /><div className="mt-10 grid gap-x-12 md:grid-cols-2">{pageCopy.principles.map((item,i) => <article key={item.title} className="border-b border-border py-7"><span className="text-xs text-primary">0{i+1}</span><h3 className="mt-4 text-xl font-semibold">{item.title}</h3><p className="mt-3 max-w-lg text-base leading-7 text-muted-foreground">{item.text}</p></article>)}</div></div></section>

    <section id="proses" className="site-section"><SectionHeading index="03" {...pageCopy.sections.process} /><div className="mt-12 grid gap-8 md:grid-cols-4">{pageCopy.steps.map((step,i) => <article key={step.title} className="border-t border-border pt-5"><span className="text-sm text-primary">0{i+1}</span><h3 className="mt-6 text-lg font-semibold">{step.title}</h3><p className="mt-3 text-base leading-7 text-muted-foreground">{step.text}</p></article>)}</div></section>

    <section id="portofolio" className="site-section"><SectionHeading index="04" {...pageCopy.sections.portfolio} /><div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-b border-border pb-7 "><p className="text-sm text-muted-foreground">{pageCopy.portfolioPending}</p><Button asChild variant="link" className="p-0"><Link to="/portofolio">{pageCopy.cta.discuss}<ArrowRight /></Link></Button></div></section>

    <div className="mx-auto max-w-7xl px-5 md:px-8"><Button asChild className="h-12"><Link to="/toko">Lihat semua paket & beli online<ArrowRight /></Link></Button></div>
    <section id="harga" className="site-section"><SectionHeading index="05" {...pageCopy.sections.pricing} /><div className="mt-12 grid gap-6 lg:grid-cols-3">{pageCopy.plans.map((plan,i) => <article key={plan.name} className={`flex flex-col rounded-lg border p-7 ${i === 1 ? "border-primary bg-secondary" : "border-border"}`}><span className="text-xs text-primary">0{i+1}</span><h3 className="mt-6 text-[26px] font-semibold">{plan.name}</h3><p className="mt-2 text-base text-muted-foreground">{plan.sub}</p><p className="mt-7 border-t border-border pt-6 text-lg font-medium">{pageCopy.pricePlaceholder}</p><ul className="mt-6 flex-1 space-y-4">{plan.items.map(item => <li key={item} className="flex gap-3 text-base"><Check className="mt-1 size-4 shrink-0 text-primary" />{item}</li>)}</ul><Button asChild variant={i === 1 ? "default" : "outline"} className="mt-8 h-12 rounded-sm shadow-none"><WaLink location={plan.location}>{pageCopy.cta.package}<ArrowRight /></WaLink></Button></article>)}</div></section>

    <section className="border-y border-border bg-secondary section-glow-light"><div className="site-section"><SectionHeading index="06" {...pageCopy.sections.testimonials} /></div></section>

    <section id="faq" className="site-section grid gap-10 lg:grid-cols-[.85fr_1.15fr]"><div><p className="text-sm font-medium text-primary">07 / {pageCopy.sections.faq.eyebrow}</p><h2 className="mt-5 text-[26px] font-semibold leading-tight md:text-[32px]">{pageCopy.sections.faq.title}</h2><p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">{pageCopy.sections.faq.description}</p></div><Accordion type="single" collapsible className="border-t border-border">{pageCopy.sections.faq.items.map((faq,i) => <AccordionItem key={faq.question} value={`faq-${i}`}><AccordionTrigger className="min-h-16 text-base font-medium hover:no-underline">{faq.question}</AccordionTrigger><AccordionContent className="pb-6 text-base leading-7 text-muted-foreground">{faq.answer}</AccordionContent></AccordionItem>)}</Accordion></section>

    <section className="site-section"><SectionHeading index="08" {...pageCopy.sections.insights} /><div className="mt-9 grid gap-x-8 md:grid-cols-3">{pageCopy.insights.map(item => <article key={item.title} className="border-b border-border py-7"><span className="text-xs text-primary">{item.category} · {pageCopy.pending}</span><h3 className="mt-5 text-xl font-semibold leading-snug">{item.title}</h3><p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">{pageCopy.preparing}<ChevronRight className="size-4" /></p></article>)}</div><Button asChild variant="link" className="mt-6 px-0"><Link to="/blog">{pageCopy.cta.blog}<ArrowRight /></Link></Button></section>

    <section id="konsultasi" className="border-t border-border bg-secondary section-glow-light"><div className="site-section grid gap-12 lg:grid-cols-2 lg:items-start"><div><p className="text-sm font-medium text-primary">09 / {pageCopy.sections.consultation.eyebrow}</p><h2 className="mt-6 max-w-lg text-[26px] font-semibold leading-[1.2] md:text-[32px]">{pageCopy.sections.consultation.title}</h2><p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground">{pageCopy.sections.consultation.description}</p><div className="mt-8 border-t border-border pt-6"><p className="text-sm">{pageCopy.sections.consultation.direct}</p><Button asChild variant="link" className="mt-3 h-11 px-0 text-base"><WaLink location="hero"><MessageCircle />{siteConfig.phoneDisplay}</WaLink></Button></div></div><ConsultationForm /></div></section>
  </main></div>;
}
