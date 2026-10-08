import { Search, ClipboardList, Hammer, RefreshCw, type LucideIcon } from "lucide-react";
import { pageCopy } from "@/lib/site-config";

const ICONS: LucideIcon[] = [Search, ClipboardList, Hammer, RefreshCw];

/**
 * Bento grid asimetris untuk "03 / Proses Kerja".
 *
 * Layout 4 tile di grid 6 kolom (mobile: 1 kolom). Tile terbesar = langkah
 * pertama (audit), yang paling penting. Urutan logis tetap dari kiri-atas,
 * tapi ukuran tile berbeda mencerminkan bobot langkah.
 */
export function ProcessBento() {
  const steps = pageCopy.steps;
  // Definisi ukuran bento — grid 6 kolom × 2 baris
  const tiles = [
    { col: "lg:col-span-3", row: "lg:row-span-2" }, // 01 — besar (audit)
    { col: "lg:col-span-2", row: "lg:row-span-1" }, // 02 — sedang (rencana)
    { col: "lg:col-span-1", row: "lg:row-span-1" }, // 03 — kecil (pengerjaan)
    { col: "lg:col-span-3", row: "lg:row-span-1" }, // 04 — lebar (evaluasi)
  ];

  return (
    <section id="proses" className="border-t border-border bg-background" aria-labelledby="proses-title">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="mb-10">
          <p className="text-sm font-medium text-primary">03 / {pageCopy.sections.process.eyebrow}</p>
          <h2 id="proses-title" className="mt-5 max-w-xl text-[26px] font-semibold leading-tight md:text-[32px]">{pageCopy.sections.process.title}</h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">{pageCopy.sections.process.description}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-2">
          {steps.map((step, i) => {
            const Icon = ICONS[i] ?? Hammer;
            const size = tiles[i] ?? tiles[0];
            const isLarge = i === 0;
            const isWide = i === 3;
            return (
              <article
                key={step.title}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] ${size.col} ${size.row}`}
              >
                {/* Nomor besar di latar */}
                <span className="pointer-events-none absolute -right-3 -top-4 select-none text-[100px] font-extrabold leading-none text-primary/5 transition-all duration-300 group-hover:text-primary/10">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative flex items-center gap-3">
                  <span className={`flex items-center justify-center rounded-xl ${isLarge ? "size-12" : "size-10"} bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground`}>
                    <Icon className={isLarge ? "size-6" : "size-5"} />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    Langkah {i + 1}
                  </span>
                </div>

                <h3 className={`relative mt-auto ${isLarge ? "pt-6 text-2xl" : isWide ? "pt-5 text-xl" : "pt-4 text-lg"} font-semibold leading-tight`}>
                  {step.title}
                </h3>
                <p className={`relative mt-2 text-muted-foreground ${isLarge ? "text-base leading-7" : "text-sm leading-6"}`}>
                  {step.text}
                </p>

                {/* Garis aksen bawah (hanya tile besar) */}
                {isLarge && (
                  <span className="mt-6 h-1 w-16 rounded-full bg-primary/30 transition-all duration-300 group-hover:w-24 group-hover:bg-primary/60" />
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
