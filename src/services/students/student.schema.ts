import { z } from "zod";

export const martialArtRankSchema = z.object({
  martialArtId: z.number(),
  rankId: z.number(),
});

export const studentSchema = z.object({

  identification: z.string().nonempty('Cédula Requerida').min(7, "La cédula debe tener al menos 7 dígitos").regex(/^\d+$/, "La cédula solo debe contener números"),

  identificationType: z.string(),

  name: z.string().nonempty("Nombre Requerido").min(2, "Nombre requerido").regex(/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$/, "El nombre solo puede contener letras y espacios"),

  lastName: z.string().nonempty("Apellido Requerido").min(2, "Apellido requerido").regex(/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$/, "El apellido solo puede contener letras y espacios"),

  email: z.email("Correo inválido"),

  username: z.string().min(3, "Nombre de Usuario requerido").nonempty("Nombre de Usuario requerido").regex(/^[A-Za-z0-9]+$/, "El usuario solo puede contener letras y números"),

  address: z.string().min(3, "Dirección requerida").nonempty("Dirección requerida"),

  phone: z.string().min(7, "Teléfono requerido").nonempty("Teléfono requerido").regex(/^\d+$/, "El teléfono solo debe contener números"),

  phoneCountryCode: z.string(),

  sex: z.string().nonempty("Seleccione un género"),

  dojoId: z.number().min(1, "Seleccione un dojo"),

  rolIds: z.array(z.number().min(1)).min(1, "Seleccione al menos un rol"),

  birthday: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Fecha de nacimiento inválida",
  }),

  enrollmentDate: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Fecha de inscripción inválida",
  }),

  profileImg: z.string().optional(),

  martialArtRank: z.array(martialArtRankSchema),

});

export type StudentFormValues = z.infer<typeof studentSchema>;
