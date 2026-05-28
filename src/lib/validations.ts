import { z } from "zod";

export const landingSectionSchema = z.object({
  title: z.string().nullable().optional(),
  subtitle: z.string().nullable().optional(),
  body: z.string().nullable().optional(),
  image_url: z.string().nullable().optional(),
  button_text: z.string().nullable().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
  is_active: z.boolean().optional(),
});

export const rotatorGroupSchema = z.object({
  name: z.string().min(2).optional(),
  strategy: z.enum(["round_robin", "equal", "percentage"]).optional(),
  is_active: z.boolean().optional(),
});

export const agentSchema = z.object({
  group_id: z.string().uuid().optional(),
  name: z.string().min(2),
  phone: z.string().regex(/^62[0-9]{8,15}$/, {
    message: "Nomor WhatsApp wajib format 62xxxxxxxx",
  }),
  percentage: z.number().min(0).max(100).optional(),
  sort_order: z.number().min(0).optional(),
  is_active: z.boolean().optional(),
});

export const themeSchema = z.object({
  brand_name: z.string().min(2).optional(),
  title: z.string().optional(),
  description: z.string().nullable().optional(),
  hero_image_url: z.string().nullable().optional(),
  logo_url: z.string().nullable().optional(),
  whatsapp_group_id: z.string().uuid().nullable().optional(),
  theme: z
    .object({
      primary_color: z.string().optional(),
      secondary_color: z.string().optional(),
      background_color: z.string().optional(),
      font_family: z.string().optional(),
      cta_text: z.string().optional(),
      cta_subtext: z.string().optional(),
    })
    .optional(),
});