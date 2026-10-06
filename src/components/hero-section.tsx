import { motion } from "motion/react";
import { TrendingUp, Play, Star, MessageCircle, ArrowDown } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { whatsappUrl, siteConfig, pageCopy } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";

// ─── Mock data: kartu konsultasi klien ───────────────────────────
const AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100",
];

interface ConsultationItem {
  name: string;
  avatar: string;
  time: string;
  duration: string;
}
interface ClientCard {
  id: number;
  day: string;
  date: string;
  items: ConsultationItem[];
}

const CLIENT_CALLS: ClientCard[] = [
  { id: 1, day: "SEN", date: "06 OKT", items: [{ name: "Rental Mobil Bandung", avatar: AVATARS[0], time: "09:30 - 10:30", duration: "1hr" }] },
  { id: 2, day: "SEL", date: "07 OKT", items: [{ name: "Supplier Bahan", avatar: AVATARS[1], time: "11:00 - 12:00", duration: "1hr" }] },
  { id: 3, day: "KAM", date: "09 OKT", items: [{ name: "Jasa Profesional", avatar: AVATARS[2], time: "14:00 - 15:00", duration: "1hr" }, { name: "Toko Online", avatar: AVATARS[3], time: "16:00 - 16:30", duration: "30min" }] },
  { id: 4, day: "JUM", date: "10 OKT", items: [{ name: "UMKM Kuliner", avatar: AVATARS[0], time: "10:00 - 11:00", duration: "1hr" }] },
  { id: 5, day: "SEN", date: "13 OKT", items: [{ name: "Reseller Fashion", avatar: AVATARS[1], time: "13:00 - 14:00", duration: "1hr" }, { name: "E-commerce", avatar: AVATARS[2], time: "15:00 - 15:30", duration: "30min" }] },
];

// ─── Deep shadow components ──────────────────────────────────────
function DeepShadowIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-flex">
      <span className="absolute inset-0 scale-90 translate-y-1.5 rounded-2xl bg-primary opacity-60 blur-[18px]" />
      <span className="relative inline-flex items-center justify-center rounded-2xl bg-primary p-2 shadow-[0px_0px_5px_rgba(255,255,255,0.5)_inset,0px_8px_20px_rgba(242,92,64,0.35)]">
        {children}
      </span>
    </span>
  );
}

function DeepShadowButton({ children, onClick, href }: { children: React.ReactNode; onClick?: () => void; href?: string }) {
  const inner = (
    <span className="relative inline-flex">
      <span className="absolute inset-0 scale-100 translate-y-0 rounded-xl bg-[#212121] opacity-40 blur-[25px] transition-all duration-300 group-hover:scale-110 group-hover:translate-y-1" />
      <button
        onClick={onClick}
        className="relative inline-flex items-center gap-2 rounded-xl bg-[#202020] px-6 py-3.5 text-sm font-semibold text-white shadow-[0px_0px_4px_rgba(255,255,255,0.25)_inset,0px_6px_19px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:-translate-y-0.5"
      >
        {children}
      </button>
    </span>
  );
  return href ? <a href={href} target="_blank" rel="noreferrer" className="group inline-flex">{inner}</a> : <span className="group inline-flex">{inner}</span>;
}

function DeepShadowAvatar({ src, alt, size = "md", hasGlow = false }: { src: string; alt: string; size?: "sm" | "md" | "lg"; hasGlow?: boolean }) {
  const dims = { sm: "size-8", md: "size-10", lg: "size-12" };
  return (
    <span className="relative inline-flex">
      <span className={`absolute inset-0 ${dims[size]} rounded-full ${hasGlow ? "bg-primary opacity-60 blur-[18px]" : "bg-black opacity-20 blur-[12px]"}`} />
      <img src={src} alt={alt} className={`relative ${dims[size]} rounded-full object-cover ring-2 ring-white`} loading="lazy" />
    </span>
  );
}

// ─── Client card untuk marquee ───────────────────────────────────
function ClientCardItem({ card, index }: { card: ClientCard; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`mb-4 rounded-2xl bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] ${index % 2 === 0 ? "rotate-3" : "-rotate-3"}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-bold text-[#202020]">{card.day}</span>
        <span className="text-xs text-neutral-400">{card.date}</span>
      </div>
      <div className="space-y-3">
        {card.items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 border-b border-dashed border-neutral-200 pb-3 last:border-0 last:pb-0">
            <DeepShadowAvatar src={item.avatar} alt={item.name} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-[#202020]">{item.name}</p>
              <p className="text-[10px] text-neutral-400">{item.time} · {item.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main hero section ───────────────────────────────────────────
export function HeroSection() {
  const heroWA = whatsappUrl(siteConfig.whatsappMessages.hero);
  const tripleCalls = [...CLIENT_CALLS, ...CLIENT_CALLS, ...CLIENT_CALLS];

  return (
    <section className="relative overflow-hidden bg-[#F7F7F7]" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-12 md:px-8 md:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        {/* Left side */}
        <div className="flex flex-col justify-center">
          {/* Pulse badge */}
          <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-[#D1F2D1] px-3 py-1.5">
            <span className="size-2 animate-pulse rounded-full bg-[#52D352] shadow-[0_0_8px_rgba(82,211,82,0.6)]" />
            <span className="text-xs font-bold uppercase tracking-wide text-[#52D352]">Konsultasi Gratis</span>
          </div>

          {/* Headline */}
          <h1 id="hero-title" className="font-[var(--font-display)] max-w-xl text-[32px] font-bold leading-[1.15] tracking-[-0.02em] text-[#202020] md:text-[48px]">
            Bisnis Anda {" "}
            <DeepShadowIcon>
              <TrendingUp className="size-5 -rotate-6 text-white" />
            </DeepShadowIcon>
            {" "}ditemukan
            <br />
            dan dipercaya di internet
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-lg text-base leading-7 text-neutral-500">
            Dimaloka membantu UMKM membangun website, mengoptimalkan SEO, serta mengelola iklan, marketplace, dan AI automation. Mulai dari kebutuhan bisnis Anda, bukan sekadar menambah kanal digital.
          </p>

          {/* CTA row */}
          <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
            <DeepShadowButton href={heroWA} onClick={() => trackEvent("click_wa", { location: "hero" })}>
              <MessageCircle className="size-4" />
              Konsultasi via WhatsApp
            </DeepShadowButton>
            <a href="#layanan" className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-3.5 text-sm font-semibold text-neutral-600 transition-colors hover:bg-neutral-50">
              <Play className="size-3.5 fill-neutral-600" />
              Lihat Layanan
              <ArrowDown className="size-3.5" />
            </a>
          </div>

          {/* Social proof */}
          <div className="mt-10 flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-3">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-neutral-400">Klien Terverifikasi</p>
                <div className="flex items-center gap-2">
                  <DeepShadowAvatar src={AVATARS[0]} alt="Klien 1" size="md" />
                  <DeepShadowAvatar src={AVATARS[1]} alt="Klien 2" size="lg" hasGlow />
                  <DeepShadowAvatar src={AVATARS[2]} alt="Klien 3" size="md" />
                  <DeepShadowAvatar src={AVATARS[3]} alt="Klien 4" size="lg" />
                </div>
              </div>
            </div>
            <div className="hidden h-12 w-px bg-neutral-300 sm:block" />
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-neutral-400">Layanan Terbaik 5/5</p>
              <div className="flex items-center gap-1">
                {[0, 1, 2, 3, 4].map(i => (
                  <Star key={i} className="size-4 text-[#FFB648] fill-[#FFB648]" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right side — infinite marquee */}
        <div className="relative h-[600px] overflow-hidden lg:h-full">
          {/* Top fade */}
          <div className="absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-[#F7F7F7] to-transparent sm:h-40" />
          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-[#F7F7F7] to-transparent sm:h-40" />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1">
            {/* Primary track */}
            <motion.div
              animate={{ y: [0, -1200] }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            >
              {tripleCalls.map((card, i) => (
                <ClientCardItem key={`a-${i}`} card={card} index={i} />
              ))}
            </motion.div>

            {/* Secondary track (tablet) */}
            <motion.div
              className="hidden md:block lg:hidden"
              animate={{ y: [-600, -1800] }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            >
              {tripleCalls.map((card, i) => (
                <ClientCardItem key={`b-${i}`} card={card} index={i + 1} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
