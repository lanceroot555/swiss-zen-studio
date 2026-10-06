import { pageCopy, servicesCopy, portfolioCopy, shopCopy, blogCopy, siteConfig, products, addons, navigationConfig, servicePages, contactPageCopy, pageSchemas } from "./site-config";
import { clientsCopy } from "./clients-content";

// Editable content sections. Overrides stored in the database are deep-merged
// onto these default objects at runtime (see applyContent).
export const contentSections = {
  home: { label: "Beranda & umum", target: pageCopy as unknown as Record<string, unknown> },
  services: { label: "Layanan", target: servicesCopy as unknown as Record<string, unknown> },
  portfolio: { label: "Portofolio", target: portfolioCopy as unknown as Record<string, unknown> },
  contactPage: { label: "Hubungi Kami", target: contactPageCopy as unknown as Record<string, unknown> },
  navigation: { label: "Menu website", target: navigationConfig as unknown as Record<string, unknown> },
  servicePages: { label: "Halaman layanan", target: servicePages as unknown as Record<string, unknown> },
  schemas: { label: "Schema Google", target: pageSchemas as unknown as Record<string, unknown> },
  blog: { label: "Halaman blog", target: blogCopy as unknown as Record<string, unknown> },
  shop: { label: "Teks toko", target: shopCopy as unknown as Record<string, unknown> },
  clients: { label: "Logo klien", target: clientsCopy as unknown as Record<string, unknown> },
  contact: { label: "Kontak & analitik", target: siteConfig as unknown as Record<string, unknown> },
} as const;
export type ContentKey = keyof typeof contentSections;
export type ProductOverride = { name?: string; harga?: number | null; tipe_harga?: "sekali_bayar" | "bulanan"; tagline?: string; deskripsi?: string; deliverables?: string[]; cocok_untuk?: string[]; timeline?: string; aktif?: boolean };
export type AddonOverride = { name?: string; harga?: number | null };
export type ContentOverrides = Record<string, unknown>;

const pristine = {
  sections: Object.fromEntries(Object.entries(contentSections).map(([k, v]) => [k, structuredClone(v.target)])) as Record<string, Record<string, unknown>>,
  products: structuredClone(products),
  addons: structuredClone(addons) as unknown as { slug: string; name: string; harga: number | null; tipe_harga: string }[],
};

export function defaultSection(key: ContentKey) {
  return structuredClone(pristine.sections[key] ?? {});
}
export function defaultProducts() {
  return structuredClone(pristine.products);
}
export function defaultAddons() {
  return structuredClone(pristine.addons);
}

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);

function deepMerge(base: Record<string, unknown>, over: Record<string, unknown>) {
  for (const [k, v] of Object.entries(over)) {
    if (!(k in base)) continue;
    const current = base[k];
    if (isObj(current) && isObj(v)) deepMerge(current, v);
    else if (Array.isArray(current) && Array.isArray(v)) base[k] = v;
    else if (typeof current === typeof v || current === null || v === null) base[k] = v;
  }
}

function resetTo(target: Record<string, unknown>, source: Record<string, unknown>) {
  for (const k of Object.keys(target)) delete target[k];
  Object.assign(target, structuredClone(source));
}

let lastApplied: ContentOverrides | null = null;

export function applyContent(overrides: ContentOverrides | null | undefined) {
  const data = overrides ?? {};
  if (lastApplied === data) return;
  lastApplied = data;
  for (const [key, section] of Object.entries(contentSections)) {
    resetTo(section.target, pristine.sections[key] ?? {});
    const over = data[key];
    if (isObj(over)) deepMerge(section.target, over);
  }
  const productOver = isObj(data["products"]) ? (data["products"] as Record<string, ProductOverride>) : {};
  products.splice(0, products.length, ...pristine.products.map((p) => ({ ...structuredClone(p), ...(productOver[p.slug] ?? {}) })));
  const addonOver = isObj(data["addons"]) ? (data["addons"] as Record<string, AddonOverride>) : {};
  const mutableAddons = addons as unknown as typeof pristine.addons;
  mutableAddons.splice(0, mutableAddons.length, ...pristine.addons.map((a) => ({ ...a, ...(addonOver[a.slug] ?? {}) })));
}
