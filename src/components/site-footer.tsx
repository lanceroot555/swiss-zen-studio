import { Link } from '@tanstack/react-router';
import { MessageCircle, Mail, Phone, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiteNavigation } from './site-navigation';
import logo from '@/assets/dimaloka-white-logo.png.asset.json';
import { pageCopy, siteConfig, servicePages, contactPageCopy, whatsappUrl } from '@/lib/site-config';

export function SiteFooter() {
  const email = contactPageCopy.publicEmail.trim();
  return (
    <>
      <footer className="border-t border-inverse-border bg-inverse section-glow-dark text-inverse-foreground">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-16">
          <div className="grid gap-12 border-b border-inverse-border pb-12 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand + kontak */}
            <div>
              <img src={logo.url} alt={siteConfig.name} className="h-auto w-40" />
              <p className="mt-5 max-w-xs text-sm leading-7 text-inverse-muted">{siteConfig.description}</p>
              <ul className="mt-6 space-y-3 text-sm font-semibold">
                <li>
                  <a
                    className="inline-flex items-center gap-3 transition-colors hover:text-inverse-muted"
                    href={whatsappUrl(siteConfig.whatsappMessages.navbar)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="flex size-9 items-center justify-center rounded-full border border-inverse-border">
                      <Phone className="size-4" />
                    </span>
                    {siteConfig.phoneDisplay}
                  </a>
                </li>
                {email ? (
                  <li>
                    <a
                      className="inline-flex items-center gap-3 transition-colors hover:text-inverse-muted"
                      href={`mailto:${email}`}
                    >
                      <span className="flex size-9 items-center justify-center rounded-full border border-inverse-border">
                        <Mail className="size-4" />
                      </span>
                      {email}
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>

            {/* Menu */}
            <nav aria-label="Menu footer">
              <h3 className="text-sm font-bold uppercase tracking-wider">{pageCopy.footer.menu}</h3>
              <div className="mt-5 flex flex-col items-start gap-3 text-sm font-semibold">
                <SiteNavigation footer />
              </div>
            </nav>

            {/* Layanan */}
            <nav aria-label="Layanan footer">
              <h3 className="text-sm font-bold uppercase tracking-wider">Layanan</h3>
              <ul className="mt-5 space-y-3 text-sm font-semibold">
                {servicePages.items.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to="/layanan/$slug"
                      params={{ slug: s.slug }}
                      className="text-inverse-muted transition-colors hover:text-inverse-foreground"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Konsultasi */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider">Konsultasi gratis</h3>
              <p className="mt-5 text-sm leading-7 text-inverse-muted">
                Ceritakan kebutuhan bisnis Anda. Kami bantu susun langkah yang tepat, tanpa komitmen.
              </p>
              <a
                href={whatsappUrl(siteConfig.whatsappMessages.navbar)}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Chat WhatsApp
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 text-xs text-inverse-muted">
            <p>
              © {new Date().getFullYear()} {siteConfig.name}. {pageCopy.footer.rights}
            </p>
            <div className="flex gap-4 font-semibold">
              <Link to="/kebijakan-privasi" className="transition-colors hover:text-inverse-foreground">
                {pageCopy.footer.privacy}
              </Link>
              <Link to="/auth" className="transition-colors hover:text-inverse-foreground">
                Masuk admin
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <Button asChild size="icon" className="fixed bottom-5 right-5 z-30 size-14 rounded-full" title={pageCopy.cta.floatTitle}>
        <a href={whatsappUrl(siteConfig.whatsappMessages.floating)} target="_blank" rel="noreferrer" aria-label={pageCopy.cta.float}>
          <MessageCircle className="size-6" />
        </a>
      </Button>
    </>
  );
}
