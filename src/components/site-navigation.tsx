import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { navigationConfig } from "@/lib/site-config";
import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

const staticPaths = ["/", "/layanan", "/hubungi-kami", "/portofolio", "/toko", "/blog", "/kebijakan-privasi", "/toko/cart", "/toko/checkout"] as const;
function isStaticPath(path: string): path is typeof staticPaths[number] { return staticPaths.some(p => p === path); }

export function MenuLink({ href, children, onClick, className, linkRef }: { href: string; children: ReactNode; onClick?: (() => void) | undefined; className?: string | undefined; linkRef?: ((el: HTMLAnchorElement | null) => void) | undefined }) {
  if (isStaticPath(href)) return <Link ref={linkRef} to={href} onClick={onClick} className={className}>{children}</Link>;
  if (/^\/layanan\/[^/]+$/.test(href)) return <Link ref={linkRef} to="/layanan/$slug" params={{ slug: href.slice(9) }} onClick={onClick} className={className}>{children}</Link>;
  if (/^\/toko\/p\/[^/]+$/.test(href)) return <Link ref={linkRef} to="/toko/p/$slug" params={{ slug: href.slice(8) }} onClick={onClick} className={className}>{children}</Link>;
  if (/^\/blog\/[^/]+$/.test(href)) return <Link ref={linkRef} to="/blog/$slug" params={{ slug: href.slice(6) }} onClick={onClick} className={className}>{children}</Link>;
  if (/^https:\/\//.test(href)) return <a ref={linkRef} href={href} rel="noopener noreferrer" target="_blank" onClick={onClick} className={className}>{children}</a>;
  return null;
}

function Submenu({ label, children, onNavigate }: { label: string; children: { href: string; label: string; visible: boolean }[]; onNavigate?: (() => void) | undefined }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const menuId = useId();
  const items = children.filter(c => c.visible);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const closeAndFocusButton = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onButtonKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => itemRefs.current[0]?.focus());
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => itemRefs.current[items.length - 1]?.focus());
    }
  };

  const onMenuKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const current = itemRefs.current.findIndex(el => el === document.activeElement);
    if (e.key === "Escape") {
      e.preventDefault();
      closeAndFocusButton();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      itemRefs.current[(current + 1) % items.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      itemRefs.current[(current - 1 + items.length) % items.length]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      itemRefs.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      itemRefs.current[items.length - 1]?.focus();
    } else if (e.key === "Tab" && !e.shiftKey && current === items.length - 1) {
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        aria-label={`Submenu ${label}`}
        onClick={() => setOpen(o => !o)}
        onKeyDown={onButtonKeyDown}
        className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-inverse-muted transition-colors hover:bg-inverse-muted/10 hover:text-inverse-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-inverse"
      >
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ease-out ${open ? "rotate-180" : ""}`} strokeWidth={2} aria-hidden="true" />
      </button>
      <div
        id={menuId}
        role="menu"
        aria-label={label}
        hidden={!open}
        onKeyDown={onMenuKeyDown}
        className="min-w-64 border-l border-inverse-border bg-inverse px-4 py-2 lg:absolute lg:right-0 lg:top-10 lg:rounded-md lg:border lg:shadow-lg"
      >
        {items.map((c, j) => (
          <MenuLink
            key={`${c.href}-${j}`}
            href={c.href}
            onClick={() => { setOpen(false); onNavigate?.(); }}
            linkRef={el => { itemRefs.current[j] = el; }}
            className="block rounded-sm px-3 py-2.5 text-sm font-medium text-inverse-foreground/90 transition-colors hover:text-inverse-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {c.label}
          </MenuLink>
        ))}
      </div>
    </div>
  );
}

export function SiteNavigation({ onNavigate, footer = false }: { onNavigate?: () => void; footer?: boolean }) {
  return <>{navigationConfig.items.filter(i => i.visible).map((item, i) => <div key={`${item.href}-${i}`} className={footer ? "" : "relative"}>
    <MenuLink href={item.href} onClick={onNavigate} className={footer
      ? "block rounded-sm py-1.5 text-sm font-semibold text-inverse-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      : "block rounded-sm px-1 py-2.5 text-sm font-semibold text-inverse-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-inverse"}>{item.label}</MenuLink>
    {!footer && item.children.some(c => c.visible) && <Submenu label={item.label} children={item.children} onNavigate={onNavigate} />}
  </div>)}</>;
}
