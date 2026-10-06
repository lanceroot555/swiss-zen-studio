import { Link } from "@tanstack/react-router";
import { navigationConfig } from "@/lib/site-config";
import type { ReactNode } from "react";
const staticPaths = ["/", "/layanan", "/hubungi-kami", "/portofolio", "/toko", "/blog", "/kebijakan-privasi", "/toko/cart", "/toko/checkout"] as const;
function isStaticPath(path: string): path is typeof staticPaths[number] { return staticPaths.some(p => p === path); }
export function MenuLink({ href, children, onClick, className }: { href: string; children: ReactNode; onClick?: () => void; className?: string }) {
  if (isStaticPath(href)) return <Link to={href} onClick={onClick} className={className}>{children}</Link>;
  if (/^\/layanan\/[^/]+$/.test(href)) return <Link to="/layanan/$slug" params={{ slug: href.slice(9) }} onClick={onClick} className={className}>{children}</Link>;
  if (/^\/toko\/p\/[^/]+$/.test(href)) return <Link to="/toko/p/$slug" params={{ slug: href.slice(8) }} onClick={onClick} className={className}>{children}</Link>;
  if (/^\/blog\/[^/]+$/.test(href)) return <Link to="/blog/$slug" params={{ slug: href.slice(6) }} onClick={onClick} className={className}>{children}</Link>;
  if (/^https:\/\//.test(href)) return <a href={href} rel="noopener noreferrer" target="_blank" onClick={onClick} className={className}>{children}</a>;
  return null;
}
export function SiteNavigation({ onNavigate, footer = false }: { onNavigate?: () => void; footer?: boolean }) {
  return <>{navigationConfig.items.filter(i => i.visible).map((item, i) => <div key={`${item.href}-${i}`} className={footer ? "" : "relative"}>
    <MenuLink href={item.href} onClick={onNavigate} className="block py-2 text-sm transition-colors hover:text-inverse-foreground">{item.label}</MenuLink>
    {!footer && item.children.some(c => c.visible) && <details className="lg:absolute lg:right-0 lg:top-1.5 lg:translate-x-5"><summary aria-label={`Submenu ${item.label}`} className="cursor-pointer list-none px-2 py-1 text-xs">⌄</summary><div className="min-w-64 border-l border-inverse-border bg-inverse px-4 py-2 lg:absolute lg:right-0 lg:top-10 lg:rounded-md lg:border lg:shadow-lg">{item.children.filter(c => c.visible).map((c, j) => <MenuLink key={`${c.href}-${j}`} href={c.href} onClick={onNavigate} className="block py-2.5 text-sm text-inverse-muted hover:text-inverse-foreground">{c.label}</MenuLink>)}</div></details>}
  </div>)}</>;
}