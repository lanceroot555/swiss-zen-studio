import { useState } from "react";
import { SchemaInput } from "./schema-input";
import type { pageSchemas } from "@/lib/site-config";
export function PageSchemaEditor({ value, onChange }: { value: typeof pageSchemas; onChange: (value: typeof pageSchemas) => void }) {
  const [path,setPath] = useState("/");
  const item = value.items.find(p => p.path === path);
  return <div className="space-y-5"><label className="block space-y-2"><span className="text-sm font-medium">Halaman website</span><select className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm" value={path} onChange={e=>setPath(e.target.value)}>{value.items.map(p=><option key={p.path} value={p.path}>{p.label} — {p.path}</option>)}</select></label>{item && <SchemaInput value={item.structuredSchema} onChange={structuredSchema=>onChange({items:value.items.map(p=>p.path===path?{...p,structuredSchema}:p)})}/>}</div>;
}