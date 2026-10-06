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
  Zap,
} from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import logoAsset from "@/assets/dimaloka-logo.webp.asset.json";
import { trackEvent } from "@/lib/analytics";
import { submitContact } from "@/lib/contact.functions";
import { faqs, services, siteConfig, whatsappUrl, type WhatsAppLocation } from "@/lib/site-config";

const serviceIcons = [Globe2, Search, Target, ShoppingBag, BarChart3, Bot];
const navItems = [
  ["Layanan", "#layanan"], ["Proses Kerja", "#proses"], ["Portofolio", "#portofolio"],
  ["Paket & Harga", "#harga"], ["FAQ", "#faq"], ["Blog", "/blog"],
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dimaloka — Digital Growth Partner untuk UMKM" },
      { name: "description", content: "Dimaloka membantu bisnis ditemukan, dipercaya, dan mendapatkan pelanggan melalui website, SEO, iklan, marketplace, dan automasi AI." },
      { property: "og:title", content: "Dimaloka — Digital Growth Partner untuk UMKM" },
      { property: "og:description", content: "Bantu bisnis Anda ditemukan, dipercaya, dan mendapatkan pelanggan melalui internet." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": ["Organization", "LocalBusiness"], name: "Dimaloka", description: siteConfig.description, telephone: `+${siteConfig.phoneInternational}` }) },
      { type: "application/ld+json", children: JSON.stringify(faqSchema) },
    ],
  }),
  component: HomePage,
});

function WaLink({ location, children, className }: { location: WhatsAppLocation; children: React.ReactNode; className?: string }) {
  return <a href={whatsappUrl(siteConfig.whatsappMessages[location])} target="_blank" rel="noreferrer" className={className} onClick={() => trackEvent("click_wa", { location })}>{children}</a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm"><div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 md:px-8"><a href="#top" aria-label="Dimaloka - kembali ke atas"><img src={logoAsset.url} alt="Dimaloka" className="h-8 w-auto" /></a><nav className="hidden items-center gap-6 lg:flex" aria-label="Navigasi utama">{navItems.map(([label, href]) => href.startsWith("/") ? <Link key={label} to={href} className="text-sm font-semibold text-muted-foreground hover:text-primary">{label}</Link> : <a key={label} href={href} className="text-sm font-semibold text-muted-foreground hover:text-primary">{label}</a>)}</nav><div className="flex items-center gap-2"><Button asChild className="h-11 rounded-none px-4 font-bold"><WaLink location="navbar"><MessageCircle /> <span className="hidden sm:inline">Konsultasi Gratis</span><span className="sm:hidden">Konsultasi</span></WaLink></Button><Button variant="outline" size="icon" className="h-11 w-11 rounded-none lg:hidden" aria-label={open ? "Tutup menu" : "Buka menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button></div></div>{open && <nav className="border-t border-border bg-background px-5 py-5 lg:hidden" aria-label="Navigasi mobile">{navItems.map(([label, href]) => href.startsWith("/") ? <Link key={label} to={href} onClick={() => setOpen(false)} className="flex min-h-12 items-center border-b border-border text-lg font-bold">{label}</Link> : <a key={label} href={href} onClick={() => setOpen(false)} className="flex min-h-12 items-center border-b border-border text-lg font-bold">{label}</a>)}</nav>}</header>;
}

function HeroVisual() {
  return <div className="relative min-h-[420px] overflow-hidden bg-primary p-6 text-primary-foreground md:min-h-[560px] md:p-10" aria-label="Alur pertumbuhan digital dari traffic menjadi pelanggan"><div className="absolute right-0 top-0 h-32 w-32 bg-accent" /><div className="relative flex h-full flex-col justify-between"><div className="flex items-center justify-between text-xs font-bold uppercase"><span>Growth system</span><span>01—05</span></div><div className="my-14 space-y-3">{["Traffic", "Website", "Conversion", "Customer", "Growth"].map((item, index) => <div key={item} className="flex items-center gap-3"><span className="w-6 text-xs opacity-60">0{index + 1}</span><div className={`flex h-14 flex-1 items-center justify-between border border-primary-foreground/35 px-4 ${index === 4 ? "bg-primary-foreground text-primary" : ""}`}><span className="font-display text-xl font-black uppercase md:text-2xl">{item}</span>{index < 4 ? <ArrowDown className="h-4 w-4" /> : <Zap className="h-5 w-5" />}</div></div>)}</div><p className="max-w-xs text-sm leading-6 opacity-80">Satu strategi. Kanal yang saling terhubung. Hasil yang bisa dipantau.</p></div></div>;
}

function SectionHeading({ index, eyebrow, title, description }: { index: string; eyebrow: string; title: string; description?: string }) {
  return <div className="grid gap-6 border-t border-foreground pt-5 md:grid-cols-[1fr_3fr]"><div className="text-sm font-bold text-primary">{index} / {eyebrow}</div><div><h2 className="max-w-4xl text-4xl font-black leading-[1.02] md:text-6xl">{title}</h2>{description && <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>}</div></div>;
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
    catch (caught) { setError(caught instanceof Error ? caught.message : "Formulir belum dapat dikirim. Silakan coba lagi."); setStatus("error"); }
  }

  if (status === "success") {
    const fallback = `Halo Dimaloka! Saya ${result.name}, barusan isi form di website. Kebutuhan: ${result.need}.`;
    return <div className="flex min-h-[420px] flex-col justify-center border border-primary bg-background p-7 md:p-10"><div className="mb-6 flex h-12 w-12 items-center justify-center bg-primary text-primary-foreground"><Check /></div><h3 className="text-3xl font-black">Terima kasih, {result.name}.</h3><p className="mt-4 leading-7 text-muted-foreground">Permintaan Anda sudah diterima. Agar respons lebih cepat, lanjutkan percakapan melalui WhatsApp.</p><Button asChild size="lg" className="mt-8 h-13 rounded-none"><a href={whatsappUrl(fallback)} target="_blank" rel="noreferrer" onClick={() => trackEvent("click_wa", { location: "form_fallback" })}><MessageCircle /> Lanjut chat WhatsApp</a></Button></div>;
  }

  return <form onSubmit={handleSubmit} className="border border-border bg-background p-6 md:p-8" noValidate><div className="grid gap-5"><div><Label htmlFor="name">Nama *</Label><Input id="name" name="name" required minLength={2} maxLength={80} className="mt-2 h-12 rounded-none" placeholder="Nama Anda" /></div><div><Label htmlFor="phone">Nomor WhatsApp *</Label><Input id="phone" name="phone" required inputMode="tel" className="mt-2 h-12 rounded-none" placeholder="08xxxxxxxxxx" /></div><div><Label htmlFor="need">Kebutuhan</Label><select id="need" name="need" className="mt-2 h-12 w-full rounded-none border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"><option>Website</option><option>SEO</option><option>Ads</option><option>Marketplace</option><option>Lainnya</option></select></div><div><Label htmlFor="message">Ceritakan singkat (opsional)</Label><Textarea id="message" name="message" maxLength={1000} className="mt-2 min-h-28 rounded-none" placeholder="Target atau kendala bisnis Anda" /></div><input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />{status === "error" && <p role="alert" className="text-sm text-destructive">{error}</p>}<Button type="submit" size="lg" disabled={status === "sending"} className="h-13 rounded-none font-bold">{status === "sending" ? "Mengirim..." : "Kirim Permintaan"}<ArrowRight /></Button><p className="text-xs leading-5 text-muted-foreground">Dengan mengirim, Anda menyetujui <Link to="/kebijakan-privasi" className="underline">kebijakan privasi</Link> kami.</p></div></form>;
}

function HomePage() {
  const [showFloating, setShowFloating] = useState(false);
  useEffect(() => { const onScroll = () => setShowFloating(window.scrollY > 300); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  return <div id="top" className="bg-background text-foreground"><Header /><main>
    <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:px-8 md:py-20 lg:grid-cols-[1.08fr_.92fr] lg:items-center"><div><div className="mb-10 flex items-center gap-3 text-xs font-bold uppercase text-primary"><span className="h-px w-10 bg-primary" /> Digital Growth Partner</div><h1 className="max-w-4xl text-5xl font-black leading-[.95] md:text-7xl lg:text-[5.2rem]">Bisnis Anda ditemukan, dipercaya, dan didatangi pelanggan.</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">Dimaloka menyatukan website, SEO, iklan, marketplace, dan AI automation untuk menghasilkan pelanggan—bukan sekadar membuat website.</p><div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button asChild size="lg" className="h-14 rounded-none px-6 text-base font-bold"><WaLink location="hero"><MessageCircle /> Konsultasi via WhatsApp</WaLink></Button><Button asChild size="lg" variant="outline" className="h-14 rounded-none px-6 text-base font-bold"><a href="#layanan">Lihat layanan <ArrowDown /></a></Button></div><p className="mt-6 text-sm font-semibold text-muted-foreground">Konsultasi awal gratis · Tanpa komitmen · Rekomendasi sesuai kebutuhan</p></div><HeroVisual /></section>

    <section className="border-y border-border bg-secondary"><div className="mx-auto grid max-w-7xl divide-y divide-border px-5 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-8">{[["01", "Mulai dari audit"], ["02", "Strategi lintas kanal"], ["03", "Laporan yang jelas"]].map(([n, text]) => <div key={n} className="flex items-center gap-5 py-7 md:px-8 first:pl-0"><span className="text-xs font-bold text-primary">{n}</span><span className="font-display text-lg font-black uppercase">{text}</span></div>)}</div></section>

    <section id="layanan" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 md:px-8 md:py-32"><SectionHeading index="01" eyebrow="Layanan" title="Kanal digital yang bekerja sebagai satu sistem." description="Pilih layanan yang paling relevan, atau biarkan kami menyusun kombinasi yang tepat berdasarkan target bisnis Anda." /><div className="mt-16 grid border-l border-t border-border md:grid-cols-2 lg:grid-cols-3">{services.map((service, index) => { const Icon = serviceIcons[index]; return <article key={service.key} className="group min-h-72 border-b border-r border-border p-7 transition-colors hover:bg-secondary md:p-9"><div className="flex items-start justify-between"><span className="text-sm font-bold text-primary">{service.key}</span><Icon className="h-7 w-7 text-primary" /></div><h3 className="mt-14 text-2xl font-black">{service.title}</h3><p className="mt-4 leading-7 text-muted-foreground">{service.description}</p><a href="#konsultasi" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-primary">Pelajari <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a></article>; })}</div></section>

    <section className="bg-foreground py-24 text-background md:py-32"><div className="mx-auto max-w-7xl px-5 md:px-8"><div className="grid gap-6 border-t border-background/30 pt-5 md:grid-cols-[1fr_3fr]"><span className="text-sm font-bold text-accent">02 / Kenapa Dimaloka</span><h2 className="max-w-4xl text-4xl font-black leading-[1.02] md:text-6xl">Bukan vendor sekali pakai. Partner yang ikut memikirkan pertumbuhan.</h2></div><div className="mt-16 grid gap-px bg-background/20 md:grid-cols-2">{[["Bukan sekadar bikin website", "Kami optimasi jalur hingga calon pelanggan menghubungi bisnis Anda."], ["Bukan laporan kosong", "Traffic, inquiry, dan progres disajikan dengan bahasa yang mudah dipahami."], ["Bukan strategi seragam", "Kanal dipilih berdasarkan target, kondisi bisnis, dan data audit."], ["Bukan kerja tanpa arah", "Target, progres, dan langkah berikutnya dibahas secara transparan."]].map(([title, text], i) => <div key={title} className="bg-foreground p-7 md:p-10"><span className="text-xs text-accent">0{i + 1}</span><h3 className="mt-8 text-2xl font-black">{title}</h3><p className="mt-4 max-w-md leading-7 text-background/65">{text}</p></div>)}</div></div></section>

    <section id="proses" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 md:px-8 md:py-32"><SectionHeading index="03" eyebrow="Proses Kerja" title="Empat langkah. Satu tujuan yang terukur." /><div className="mt-16 grid gap-0 md:grid-cols-4">{[["Audit & Konsultasi", "Kami bedah kondisi bisnis dan kanal digital Anda."], ["Strategi", "Kami pilih kanal berdasarkan target dan peluang."], ["Eksekusi", "Build dan optimasi dengan progres transparan."], ["Growth & Laporan", "Evaluasi rutin, iterasi, lalu scale yang bekerja."]].map(([title, text], i) => <div key={title} className="relative border-l border-border pb-12 pl-8 md:border-l-0 md:border-t md:pb-0 md:pl-0 md:pr-8 md:pt-9"><span className="absolute -left-4 top-0 flex h-8 w-8 items-center justify-center bg-primary text-xs font-bold text-primary-foreground md:-top-4 md:left-0">{i + 1}</span><h3 className="text-xl font-black">{title}</h3><p className="mt-4 leading-7 text-muted-foreground">{text}</p></div>)}</div></section>

    <section id="portofolio" className="scroll-mt-24 bg-secondary py-24 md:py-32"><div className="mx-auto max-w-7xl px-5 md:px-8"><SectionHeading index="04" eyebrow="Portofolio" title="Bukti harus nyata, bukan angka rekaan." description="Studi kasus terverifikasi sedang disiapkan. Sementara itu, kami terbuka untuk membedah peluang bisnis Anda melalui audit awal gratis." /><div className="mt-14 border border-border bg-background p-8 md:flex md:items-center md:justify-between md:p-12"><div><p className="text-sm font-bold uppercase text-primary">Portofolio segera hadir</p><h3 className="mt-3 text-2xl font-black">Ingin bisnis Anda menjadi studi kasus berikutnya?</h3></div><Button asChild className="mt-6 h-12 rounded-none md:mt-0"><WaLink location="hero">Mulai dari audit <ArrowRight /></WaLink></Button></div></div></section>

    <section id="harga" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 md:px-8 md:py-32"><SectionHeading index="05" eyebrow="Paket & Harga" title="Mulai sesuai kebutuhan. Bertumbuh saat waktunya tepat." description="Harga ditentukan setelah kebutuhan dipahami, jadi Anda tidak membayar hal yang tidak diperlukan." /><div className="mt-16 grid border-l border-t border-border lg:grid-cols-3">{[{name:"Starter",sub:"Website / Landing Page",items:["Struktur fokus konversi","Tampilan mobile-first","Dasar SEO teknis"],location:"starter" as const},{name:"Growth",sub:"Website + SEO Local",items:["Fondasi website","Optimasi pencarian lokal","Pemantauan progres"],location:"growth" as const},{name:"Scale",sub:"Digital Growth Package",items:["Strategi lintas kanal","Eksekusi terintegrasi","Laporan dan iterasi"],location:"scale" as const}].map((plan, i) => <article key={plan.name} className={`border-b border-r border-border p-7 md:p-9 ${i === 1 ? "bg-primary text-primary-foreground" : ""}`}><span className={`text-xs font-bold uppercase ${i === 1 ? "text-primary-foreground/70" : "text-primary"}`}>Paket 0{i + 1}</span><h3 className="mt-8 text-4xl font-black">{plan.name}</h3><p className={`mt-2 ${i === 1 ? "text-primary-foreground/75" : "text-muted-foreground"}`}>{plan.sub}</p><div className="my-8 h-px bg-current opacity-20" /><p className="text-2xl font-black">Konsultasikan kebutuhan</p><ul className="mt-7 space-y-4">{plan.items.map(item => <li key={item} className="flex gap-3 text-sm"><Check className="h-4 w-4 shrink-0" /> {item}</li>)}</ul><Button asChild variant={i === 1 ? "secondary" : "outline"} className="mt-9 h-12 w-full rounded-none"><WaLink location={plan.location}>Tanya paket <ArrowRight /></WaLink></Button></article>)}</div></section>

    <section className="border-y border-border bg-secondary py-24"><div className="mx-auto max-w-7xl px-5 md:px-8"><SectionHeading index="06" eyebrow="Testimoni" title="Kami memilih menunggu cerita yang benar-benar terjadi." description="Testimoni klien terverifikasi akan tampil di sini. Kami tidak menggunakan nama, foto, atau hasil palsu untuk terlihat meyakinkan." /></div></section>

    <section id="faq" className="mx-auto grid max-w-7xl scroll-mt-24 gap-14 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-sm font-bold text-primary">07 / FAQ</p><h2 className="mt-5 text-4xl font-black leading-tight md:text-6xl">Pertanyaan sebelum mulai.</h2><p className="mt-6 max-w-md leading-7 text-muted-foreground">Belum menemukan jawaban? Hubungi kami langsung melalui WhatsApp.</p></div><Accordion type="single" collapsible className="border-t border-border">{faqs.map((faq, i) => <AccordionItem key={faq.question} value={`faq-${i}`}><AccordionTrigger className="min-h-16 text-base font-bold hover:no-underline">{faq.question}</AccordionTrigger><AccordionContent className="max-w-2xl pb-6 leading-7 text-muted-foreground">{faq.answer}</AccordionContent></AccordionItem>)}</Accordion></section>

    <section className="bg-foreground py-24 text-background"><div className="mx-auto max-w-7xl px-5 md:px-8"><div className="flex items-end justify-between border-b border-background/30 pb-6"><div><p className="text-sm font-bold text-accent">08 / Wawasan</p><h2 className="mt-4 text-4xl font-black md:text-5xl">Belajar bertumbuh.</h2></div><Button asChild variant="secondary" className="hidden rounded-none sm:inline-flex"><Link to="/blog">Lihat blog <ArrowRight /></Link></Button></div><div className="grid divide-y divide-background/20 md:grid-cols-3 md:divide-x md:divide-y-0">{[["SEO Tips", "Bagaimana pelanggan mencari bisnis lokal di Google"], ["Ads", "Iklan bukan sekadar menambah traffic"], ["Website", "Tanda website Anda belum menghasilkan inquiry"]].map(([cat,title], i) => <article key={title} className="py-9 md:px-8 first:pl-0"><span className="text-xs font-bold text-accent">{cat} · Segera hadir</span><h3 className="mt-6 text-2xl font-black leading-tight">{title}</h3><span className="mt-10 inline-flex items-center gap-2 text-sm text-background/60">Sedang disiapkan <ChevronRight className="h-4 w-4" /></span></article>)}</div></div></section>

    <section id="konsultasi" className="scroll-mt-24 bg-accent py-24 md:py-32"><div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-2 lg:items-start"><div><p className="text-sm font-bold uppercase text-foreground/70">Konsultasi gratis</p><h2 className="mt-5 text-5xl font-black leading-[.98] md:text-7xl">Siap bikin bisnis Anda ditemukan di Google?</h2><p className="mt-7 max-w-lg text-lg leading-8 text-foreground/75">Kami audit dulu, baru rekomendasi. Tanpa komitmen dan tanpa jargon yang membingungkan.</p><div className="mt-10 border-t border-foreground/25 pt-6"><p className="text-sm font-bold">Lebih nyaman chat langsung?</p><Button asChild variant="outline" className="mt-4 h-12 rounded-none border-foreground bg-transparent"><WaLink location="hero"><MessageCircle /> {siteConfig.phoneDisplay}</WaLink></Button></div></div><ConsultationForm /></div></section>
  </main><footer className="bg-foreground py-16 text-background"><div className="mx-auto max-w-7xl px-5 md:px-8"><div className="grid gap-12 border-b border-background/20 pb-14 md:grid-cols-4"><div className="md:col-span-2"><img src={logoAsset.url} alt="Dimaloka" className="h-9 w-auto brightness-0 invert" /><p className="mt-6 max-w-sm leading-7 text-background/65">{siteConfig.description}</p></div><div><h3 className="text-sm font-bold uppercase text-accent">Menu</h3><div className="mt-5 flex flex-col gap-3 text-sm text-background/70"><a href="#layanan">Layanan</a><a href="#proses">Proses kerja</a><a href="#harga">Paket & harga</a><Link to="/blog">Blog</Link></div></div><div><h3 className="text-sm font-bold uppercase text-accent">Kontak</h3><div className="mt-5 flex flex-col gap-3 text-sm text-background/70"><WaLink location="navbar">WhatsApp {siteConfig.phoneDisplay}</WaLink><span>Alamat akan segera diperbarui</span><span>Media sosial segera hadir</span></div></div></div><div className="flex flex-col gap-4 pt-7 text-xs text-background/55 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Dimaloka. Seluruh hak dilindungi.</p><Link to="/kebijakan-privasi" className="hover:text-background">Kebijakan Privasi</Link></div></div></footer>{showFloating && <Button asChild size="icon" className="fixed bottom-5 right-5 z-30 h-14 w-14 rounded-full shadow-xl" title="Chat Dimaloka via WhatsApp"><WaLink location="floating" className="flex h-full w-full items-center justify-center" ><MessageCircle className="h-6 w-6" /><span className="sr-only">Chat WhatsApp</span></WaLink></Button>}</div>;
}