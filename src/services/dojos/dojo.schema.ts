import { z } from "zod";

const DojoSocialMediaSchema = z.object({
  socialMedia: z.string().min(1, "Red social requerida"),
  link: z.string().min(1, "Enlace requerido"),
  directUrl: z.string().optional(),
});

export const DojoSchema = z.object({
  dojo: z.string().min(1, "Nombre requerido"),
  code: z.string().min(1, "Código requerido"),
  address: z.string().min(1, "Dirección requerida"),
  addressShort: z.string().min(1, "Dirección corta requerida"),
  phone: z.string().min(1, "Teléfono requerido"),
  email: z.email("Email inválido"),
  description: z.string().min(1, "Descripción requerida"),
  founded: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Fecha de fundación inválida",
  }),
  slogan: z.string().min(1, "Eslogan requerido"),
  translate: z.string().min(1, "Traducción requerida"),
  latitude: z.number({ message: "Latitud requerida" }),
  longitude: z.number({ message: "Longitud requerida" }),
  martialArts: z.array(z.number()).min(1, "Seleccione al menos un arte marcial"),
  parentDojoId: z.number().nullable().optional(),
  socialMedia: z.array(DojoSocialMediaSchema),
});

export type DojoFormValues = z.infer<typeof DojoSchema>;
