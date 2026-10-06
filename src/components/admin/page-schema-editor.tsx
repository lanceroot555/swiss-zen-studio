import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useState } from "react";
import { SchemaInput } from "./schema-input";
import type { pageSchemas } from "@/lib/site-config";
export function PageSchemaEditor({ value, onChange }: { value: typeof pageSchemas; onChange: (value: typeof pageSchemas) => void }) {
  const [path,setPath] = useState("/");
  const item = value.items.find(p => p.path === path);
  return <div className="space-y-5"><label className="block space-y-2"><span className="text-sm font-medium">Halaman website</span><Select value={path} onValueChange={setPath}><SelectTrigger aria-label="Halaman website" className="h-11"><SelectValue/></SelectTrigger><SelectContent>{value.items.map(p=><SelectItem key={p.path} value={p.path}>{p.label} — {p.path}</SelectItem>)}</SelectContent></Select></label>{item && <SchemaInput value={item.structuredSchema} onChange={structuredSchema=>onChange({items:value.items.map(p=>p.path===path?{...p,structuredSchema}:p)})}/>}</div>;
}