import { capabilities, techStack } from "@/lib/capabilities";
import { Check } from "lucide-react";

/**
 * Bagian "Profesional & Terukur".
 *
 * Pola mengikuti bagian "PROFESIONAL WEBSITE" pada situs referensi: visual besar
 * di satu sisi, narasi + daftar teknologi di sisi lain. Versi Dimaloka menekankan
 * alur kerja dan kanal growth, bukan hanya produksi website.
 */
export function ProfessionalSection() {
  return (
    <section id="profesional" className="border-b border-border bg-secondary" aria-labelledby="profesional-title">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-2 lg:gap-16">
        {/* Visual */}
        <div className="relative order-last lg:order-first">
          <div aria-hidden="true" className="absolute inset-0 -z-10 scale-90 rounded-full bg-primary/15 blur-3xl" />
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {capabilities.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="rounded-lg border border-border bg-background p-4 transition-colors hover:border-primary/40 sm:p-5"
              >
                <span className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
                <h3 className="mt-3 text-sm font-semibold leading-snug">{title}</h3>
                <p className="mt-1.5 text-xs leading-5 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Narasi */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">
            Profesional &amp; Terukur
          </p>
          <h2 id="profesional-title" className="mt-4 max-w-lg text-[26px] font-semibold leading-[1.2] md:text-[34px]">
            Website yang bekerja untuk bisnis Anda, bukan sekadar tampil rapi.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
            Kami susun website, pencarian, dan pemasaran sebagai satu alur yang saling menopang. Setiap tahap
            dibicarakan terbuka: apa yang dikerjakan, bagaimana diukur, dan apa langkah berikutnya. Tujuannya
            sederhana — calon pelanggan menemukan bisnis Anda, memahami penawaran, lalu menghubungi.
          </p>

          <ul className="mt-6 space-y-3">
            {[
              "Ruang lingkup dan jadwal disepakati sebelum pekerjaan dimulai",
              "Progres dibahas dengan bahasa yang mudah dipahami",
              "Setiap kanal diukur, bukan hanya dijalankan",
            ].map((point) => (
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
            <ul className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-3">
              {techStack.map(({ name, icon: Icon }) => (
                <li
                  key={name}
                  className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2"
                  title={name}
                >
                  <Icon className="size-4 text-muted-foreground" />
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
