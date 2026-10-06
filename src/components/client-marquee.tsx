import { useEffect, useState } from "react";

export interface ClientLogo {
  name: string;
  url: string;
}

/** Jarak antar logo (px). */
const GAP = 56;
/** Lebar tetap tiap slot logo. */
const SLOT_W = 170;
/** Lebar minimum satu set logo sebelum digandakan, supaya track selalu lebih
 *  lebar dari layar — kalau tidak, logo yang sama terlihat dua kali sekaligus. */
const MIN_SET_W = 1400;

/**
 * Section "Dipercaya oleh klien nasional".
 *
 * Logo dikelola lewat dashboard (Supabase Storage bucket `client-logos` +
 * override `site_content.clients`). Kosong = section tidak dirender.
 *
 * Selalu berjalan sebagai marquee: daftar diulang sampai cukup lebar, lalu
 * digandakan sekali supaya animasi translateX(-50%) menyambung tanpa jeda.
 */
export function ClientMarquee({ logos, label }: { logos: ClientLogo[]; label: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const valid = logos.filter((l) => l.url.trim());
  if (!valid.length) return null;

  const step = SLOT_W + GAP;
  const copies = Math.max(1, Math.ceil(MIN_SET_W / (valid.length * step)));
  const set = Array.from({ length: copies }).flatMap(() => valid);
  const track = [...set, ...set];

  return (
    <section id="klien" className="border-b border-border bg-background" aria-label="Dipercaya oleh">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <p className="text-center text-xs font-medium uppercase tracking-[0.32em] text-muted-foreground">
          {label}
        </p>

        <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div
            className={`flex w-max items-center ${mounted ? "animate-[client-marquee_26s_linear_infinite]" : ""}`}
            style={{ gap: GAP, animationPlayState: mounted ? "running" : "paused" }}
          >
            {track.map((logo, i) => (
              <div
                key={`${logo.url}-${i}`}
                className="flex shrink-0 items-center justify-center"
                style={{ width: SLOT_W, height: 64 }}
                aria-hidden={i >= set.length}
              >
                <img
                  src={logo.url}
                  alt={i >= set.length ? "" : logo.name}
                  loading="lazy"
                  draggable={false}
                  className="max-h-16 max-w-[150px] object-contain opacity-70 transition-opacity duration-300 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
