import { profesionalCopy, profesionalImage } from "@/lib/profesional-content";
import { techStack } from "@/lib/capabilities";
import { Check } from "lucide-react";

/**
 * Bagian "Profesional & Terukur".
 *
 * Pola mengikuti bagian "PROFESIONAL WEBSITE" pada situs referensi: satu visual
 * besar di satu sisi, narasi + daftar teknologi di sisi lain.
 *
 * Semua teks dan gambar berasal dari profesionalCopy, yang bisa ditimpa admin
 * lewat dashboard (site_content key `profesional`).
 */
export function ProfessionalSection() {
  const copy = profesionalCopy;

  return (
    <section id="profesional" className="border-b border-border bg-secondary" aria-labelledby="profesional-title">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-2 lg:gap-16">
        {/* Visual — PNG transparan, background mengikuti warna section */}
        <figure className="relative order-last lg:order-first">
          <img
            src={profesionalImage(copy.imageUrl)}
            width={1536}
            height={1024}
            alt={copy.imageAlt}
            loading="lazy"
            className="w-full"
          />
        </figure>

        {/* Narasi */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">
            {copy.eyebrow}
          </p>
          <h2 id="profesional-title" className="mt-4 max-w-lg text-[26px] font-semibold leading-[1.2] md:text-[34px]">
            {copy.title}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
            {copy.description}
          </p>

          <ul className="mt-6 space-y-3">
            {copy.points.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-6">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                {point}
              </li>
            ))}
          </ul>

          {/* Teknologi */}
          <div className="mt-8 border-t border-border pt-6">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
              Teknologi yang kami gunakan
            </p>
            <ul className="mt-4 flex flex-wrap items-center gap-3">
              {techStack.map(({ name, icon, color }) => (
                <li
                  key={name}
                  className="flex items-center gap-2.5 rounded-md border border-border bg-background px-3 py-2.5 transition-colors hover:border-primary/40"
                  title={name}
                >
                  <img
                    src={icon}
                    alt={`Logo ${name}`}
                    width={20}
                    height={20}
                    loading="lazy"
                    className="size-5"
                    style={{ color }}
                  />
                  <span className="text-xs font-medium">{name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
