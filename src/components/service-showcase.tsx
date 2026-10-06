import { useRef } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import web from '@/assets/service-website.jpg';
import commerce from '@/assets/service-commerce.jpg';
import marketing from '@/assets/service-marketing.jpg';
import { servicePages, servicesCopy as c } from '@/lib/site-config';
export const showcaseImages={website:web,commerce,marketing};
export function ServiceShowcase(){
  const track=useRef<HTMLDivElement>(null);
  function move(direction:number){
    const el=track.current;
    const first=el?.firstElementChild;
    if(!el||!first)return;
    const distance=first.getBoundingClientRect().width+parseFloat(getComputedStyle(el).gap);
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({left:direction*distance,behavior:reduced?'instant':'smooth'});
  }
  return <><section id="layanan" className="bg-inverse section-glow-dark text-inverse-foreground"><div className="site-section">
    <div className="max-w-2xl"><p className="text-xs font-bold text-primary">{c.eyebrow}</p><h2 className="mt-4 text-[28px] font-extrabold leading-snug md:text-[32px]">{c.title}</h2><p className="mt-5 text-base leading-7 text-inverse-muted">{c.description}</p></div>
    <div ref={track} className="service-track mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto py-4 [scrollbar-width:none]">
      {servicePages.items.map((s,i)=><Link to="/layanan/$slug" params={{slug:s.slug}} key={s.slug} className="service-slide group flex w-[88%] shrink-0 snap-start flex-col overflow-hidden rounded-lg border border-inverse-border bg-inverse-foreground/3 outline-offset-4 focus-visible:outline-primary sm:w-[46%] lg:w-[calc((100%-3rem)/3)]">
        <div className="overflow-hidden bg-inverse-foreground/3 p-5"><img src={[web,marketing,marketing,commerce,web,marketing][i]} width={1200} height={912} loading="lazy" alt={`${c.sample}: ${s.title}`} className="service-slide-image aspect-[1.35] w-full rounded-md object-cover"/></div>
        <div className="flex min-h-28 flex-1 items-center justify-between gap-4 border-t border-inverse-border px-6 py-6 transition-colors duration-500 group-hover:border-primary/30"><h3 className="text-lg font-bold leading-7">{s.title}</h3><span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-inverse-border transition-all duration-300 group-hover:scale-110 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"><ArrowUpRight className="size-5 transition-transform duration-300 group-hover:rotate-45"/></span></div>
      </Link>)}
    </div>
    <div className="mt-5 flex items-center justify-between gap-5"><p className="max-w-sm text-xs leading-5 text-inverse-muted">{c.sample}</p><div className="flex shrink-0 gap-3"><Button variant="outline" size="icon" aria-label={c.previous} title={c.previous} className="size-12 rounded-full border-inverse-border bg-transparent text-inverse-muted transition-all duration-300 hover:border-inverse-foreground/30 hover:bg-inverse-foreground/5 hover:text-inverse-foreground active:scale-95" onClick={()=>move(-1)}><ArrowLeft/></Button><Button variant="outline" size="icon" aria-label={c.next} title={c.next} className="size-12 rounded-full border-primary/30 bg-primary/10 text-primary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground active:scale-95" onClick={()=>move(1)}><ArrowRight/></Button></div></div>
  </div></section><section className="site-section"><div className="grid items-center gap-10 lg:grid-cols-2"><div><p className="text-xs font-semibold text-primary">{c.customLabel}</p><h2 className="mt-4 text-[28px] font-semibold leading-snug md:text-[32px]">{c.customTitle}</h2><p className="mt-5 text-base leading-7 text-muted-foreground">{c.customText}</p><Button asChild className="mt-7 h-12"><Link to="/toko">{c.shopCta}<ArrowRight className="size-4"/></Link></Button></div><figure><img src={web} width={1200} height={912} loading="lazy" alt={c.sample} className="aspect-[1.35] w-full rounded-lg object-cover"/><figcaption className="mt-3 text-xs text-muted-foreground">{c.sample}</figcaption></figure></div><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{c.features.map(f=><div className="flex items-center gap-3 border-b border-border py-5 text-sm font-semibold" key={f}><Check className="size-5 text-primary"/>{f}</div>)}</div></section></>}
