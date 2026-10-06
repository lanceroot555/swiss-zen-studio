import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/kebijakan-privasi")({
  head: () => ({
    meta: [
      { title: "Kebijakan Privasi — Dimaloka" },
      { name: "description", content: "Kebijakan privasi formulir konsultasi Dimaloka." },
      { property: "og:title", content: "Kebijakan Privasi — Dimaloka" },
      { property: "og:description", content: "Kebijakan privasi formulir konsultasi Dimaloka." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/kebijakan-privasi" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return <main className="min-h-screen bg-background px-5 py-20 text-foreground"><article className="mx-auto max-w-3xl"><Button asChild variant="ghost" className="mb-16"><Link to="/"><ArrowLeft /> Kembali</Link></Button><p className="mb-4 text-sm font-bold uppercase text-primary">Dimaloka</p><h1 className="text-5xl font-black md:text-7xl">Kebijakan Privasi</h1><div className="mt-12 space-y-6 border-t border-border pt-10 text-lg leading-8 text-muted-foreground"><p>Data yang Anda kirim melalui formulir konsultasi digunakan hanya untuk menanggapi kebutuhan bisnis Anda. Kami tidak menjual atau membagikan data tersebut untuk kepentingan pemasaran pihak lain.</p><p>Anda dapat meminta penghapusan data dengan menghubungi Dimaloka melalui WhatsApp yang tercantum di website.</p></div></article></main>;
}