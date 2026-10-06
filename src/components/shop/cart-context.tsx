import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { cartItemSchema, resolveCart, type CartItem } from '@/lib/shop';
import { trackEvent } from '@/lib/analytics';
import { shopCopy } from '@/lib/site-config';
const key='dimaloka-cart-v1';
interface CartContextValue {items:CartItem[];ready:boolean;open:boolean;error:string;setOpen:(open:boolean)=>void;add:(items:CartItem[])=>void;update:(slug:string,addon:boolean,qty:number)=>void;remove:(slug:string,addon:boolean)=>void;clear:()=>void}
const CartContext=createContext<CartContextValue|null>(null);
function decode(value:string|null) { try {const result=cartItemSchema.array().max(30).safeParse(JSON.parse(value??'[]'));return result.success?result.data:[]}catch{return []} }
export function CartProvider({children}:{children:ReactNode}) {
 const [items,setItems]=useState<CartItem[]>([]);const [ready,setReady]=useState(false);const [open,setDrawer]=useState(false);const [error,setError]=useState('');
 useEffect(()=>{try{setItems(decode(localStorage.getItem(key)))}catch{setError(shopCopy.errors.storage)}setReady(true);const sync=(e:StorageEvent)=>{if(e.key===key)setItems(decode(e.newValue))};window.addEventListener('storage',sync);return()=>window.removeEventListener('storage',sync)},[]);
 function save(next:CartItem[]){setItems(next);try{localStorage.setItem(key,JSON.stringify(next));setError('')}catch{setError(shopCopy.errors.storage)}}
 function setOpen(value:boolean){setDrawer(value);if(value)trackEvent('view_cart',{item_count:String(items.reduce((s,i)=>s+i.qty,0))})}
 function add(newItems:CartItem[]){const next=[...items];for(const item of newItems){const old=next.find(i=>i.slug===item.slug&&i.addon===item.addon);if(old)old.qty=Math.min(20,old.qty+item.qty);else if(next.length<30)next.push({...item,qty:Math.min(20,item.qty)})}save(next);trackEvent('add_to_cart',{items:JSON.stringify(resolveCart(newItems).map(l=>({item_id:l.slug,item_name:l.name,quantity:l.qty})))});setDrawer(true)}
 return <CartContext.Provider value={{items,ready,open,error,setOpen,add,update:(slug,addon,qty)=>save(items.map(i=>i.slug===slug&&i.addon===addon?{...i,qty:Math.max(1,Math.min(20,qty))}:i)),remove:(slug,addon)=>save(items.filter(i=>i.slug!==slug||i.addon!==addon)),clear:()=>save([])}}>{children}</CartContext.Provider>;
}
export function useCart(){const value=useContext(CartContext);if(!value)throw new Error('Cart provider required');return value}
