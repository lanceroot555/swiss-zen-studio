import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const indonesianPhone = /^(?:\+62|62|0)8[1-9][0-9]{6,11}$/;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter.").max(80),
  phone: z.preprocess(
    (value) => typeof value === "string" ? value.trim().replace(/[-\s()]/g, "") : value,
    z.string().regex(indonesianPhone, "Masukkan nomor WhatsApp Indonesia yang valid."),
  ),
  need: z.enum(["Website", "SEO", "Ads", "Marketplace", "Lainnya"]),
  message: z.string().trim().max(1000).optional().default(""),
  company: z.string().max(0).optional().default(""),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    if (data.company) return { ok: true, emailSent: false };

    // The submission flow is ready. Email delivery is enabled after Dimaloka's
    // sender domain is verified in Lovable Emails.
    return { ok: true, emailSent: false };
  });