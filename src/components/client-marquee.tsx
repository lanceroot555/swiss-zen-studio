import { useEffect, useState } from "react";

export interface ClientLogo {
  name: string;
  url: string;
}

/** Di bawah ambang ini, logo ditampilkan statis — marquee baru masuk akal kalau
 *  logonya sudah banyak, karena track harus selalu lebih lebar dari container
 *  atau logo yang sama akan terlihat dua kali sekaligus. */
const MARQUEE_THRESHOLD = 5;

/**
 * Section "Dipercaya oleh klien nasional".
 *
 * Logo dikelola lewat dashboard (Supabase Storage bucket `client-logos` +
 * override `site_content.clients`). Kalau kosong, section tidak dirender —
 * situs tidak pernah menampilkan deretan logo kosong.
 */
export function ClientMarquee({ logos, label }: { logos: ClientLogo[]; label: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const valid = logos.filter((l) => l.url.trim());
  if (!valid.length) return null;

  const scrolling = valid.length >= MARQUEE_THRESHOLD;
  // Untuk marquee: gandakan sekali supaya translateX(-50%) menyambung mulus.
  const track = scrolling ? [...valid, ...valid] : valid;

  return (
    <section id="klien" className="border-b border-border bg-background" aria-label="Dipercaya oleh">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <p className="text-center text-xs font-medium uppercase tracking-[0.32em] text-muted-foreground">
          {label}
        </p>

        {scrolling ? (
          <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
            <div
              className={`flex w-max items-center gap-10 ${mounted ? "animate-[client-marquee_26s_linear_infinite]" : ""}`}
              style={{ animationPlayState: mounted ? "running" : "paused" }}
            >
              {track.map((logo, i) => (
                <div key={`${logo.url}-${i}`} className="flex h-16 w-[170px] shrink-0 items-center justify-center" aria-hidden={i >= valid.length}>
                  <img
                    src={logo.url}
                    alt={i >= valid.length ? "" : logo.name}
                    loading="lazy"
                    draggable={false}
                    className="max-h-16 max-w-[150px] object-contain opacity-70 transition-opacity duration-300 hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {valid.map((logo) => (
              <img
                key={logo.url}
                src={logo.url}
                alt={logo.name}
                loading="lazy"
                draggable={false}
                className="h-14 w-auto max-w-[170px] object-contain opacity-70 transition-opacity duration-300 hover:opacity-100"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
