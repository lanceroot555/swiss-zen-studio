import type { ClientLogo } from "@/components/client-marquee";

/**
 * Section "Dipercaya oleh klien nasional".
 *
 * Disimpan sebagai override terpisah (key `clients`) supaya dashboard admin bisa
 * mengelola logonya tanpa menyentuh objek siteConfig yang readonly.
 */
export const clientsCopy = {
  label: "Dipercaya oleh",
  logos: [] as ClientLogo[],
};

export type ClientsContent = typeof clientsCopy;
