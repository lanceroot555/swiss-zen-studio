import { createFileRoute } from '@tanstack/react-router';
import { CartContents } from '@/components/shop/cart-ui';
import { shopCopy as c } from '@/lib/site-config';
import { pageHead } from '@/lib/seo';
export const Route=createFileRoute('/toko/cart')({head:()=>pageHead(c.cart,c.priceNote,'/toko/cart'),component:()=> <main className="site-section max-w-2xl min-h-[60vh]"><h1 className="text-3xl font-semibold">{c.cart}</h1><CartContents/></main>});
