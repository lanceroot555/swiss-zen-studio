import { schemaScripts } from './structured-schema';
import { siteConfig, pageSchemas } from './site-config';
export function pageHead(title:string,description:string,path:string){return {scripts: pageSchema(path),meta:[{title:`${title} — Dimaloka`},{name:'description',content:description},{property:'og:title',content:`${title} — Dimaloka`},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}],links:[{rel:'canonical',href:siteConfig.siteUrl+path}]}}

export function pageSchema(path: string, fallback?: unknown) { return schemaScripts(pageSchemas.items.find(p=>p.path===path)?.structuredSchema ?? "", fallback); }
