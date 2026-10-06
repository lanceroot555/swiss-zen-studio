import { createServerFn } from '@tanstack/react-start';
import { getRequestHeader } from '@tanstack/react-start/server';
import { checkoutSchema, resolveCart, totals, orderMessage, type CheckoutData } from './shop';
import { shopCopy, whatsappUrl } from './site-config';
export const submitOrder = createServerFn({method:'POST'}).inputValidator((data:CheckoutData)=>checkoutSchema.parse(data)).handler(async({data})=>{
 if(data.company) throw new Error(shopCopy.errors.spam);
 const lines=resolveCart(data.items);
 if(lines.some(l=>!l.available) || !lines.some(l=>!l.addon)) throw new Error(shopCopy.errors.cart);
 // Guest writes are an intentionally public capability. Validate and resolve all trusted catalog values before privileged persistence; no public read endpoint exists.
 const {supabaseAdmin}=await import('@/integrations/supabase/client.server');
 const source=getRequestHeader('cf-connecting-ip') ?? data.phone;
 const hashBuffer=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(`${source}:${data.phone}`));
 const hash=Array.from(new Uint8Array(hashBuffer),b=>b.toString(16).padStart(2,'0')).join('');
 const {data:allowed,error:limitError}=await supabaseAdmin.rpc('claim_order_attempt',{p_source_hash:hash});
 if(limitError) throw new Error(shopCopy.errors.failed);
 if(!allowed) throw new Error(shopCopy.errors.limit);
 const total=totals(lines);
 const date=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Jakarta',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()).replaceAll('-','');
 let number='';
 for(let attempt=0;attempt<8;attempt++) {
  const random=new Uint32Array(1);crypto.getRandomValues(random);
  const candidate=`DM-${date}-${String((random[0]??0)%1000).padStart(3,'0')}`;
  const {error}=await supabaseAdmin.from('orders').insert({request_id:data.requestId,order_number:candidate,nama:data.name,wa:data.phone,email:data.email,bisnis:data.business,timeline:data.timeline,catatan:data.notes,items:lines.map(l=>({slug:l.slug,name:l.name,qty:l.qty,harga:l.harga,tipe:l.tipe,addon:l.addon})),total_sekali:total.once,total_bulanan:total.monthly});
  if(!error) {number=candidate;break;}
  if(error.code!=='23505') {console.error('Order persistence failed',error.code);throw new Error(shopCopy.errors.failed);}
  // Idempotent replay: only return the previous number when both request ID and submitted contact identify this same order.
  const {data:existing}=await supabaseAdmin.from('orders').select('order_number').eq('request_id',data.requestId).eq('wa',data.phone).eq('email',data.email).maybeSingle();
  if(existing){number=existing.order_number;break;}
 }
 if(!number)throw new Error(shopCopy.errors.failed);
 return {number,url:whatsappUrl(orderMessage(number,data,lines)),items:lines,total};
});
