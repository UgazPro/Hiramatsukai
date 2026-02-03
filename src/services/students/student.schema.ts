import { z } from "zod";

export const martialArtRankSchema = z.object({
  martialArtId: z.number(),
  rankId: z.number(),
});

export const studentSchema = z.object({

  identification: z.string().nonempty('Cédula Requerida').min(7, "La cédula debe tener al menos 7 caracteres"),

  name: z.string().nonempty("Nombre Requerido").min(2, "Nombre requerido"),

  lastName: z.string().nonempty("Apellido Requerido").min(2, "Apellido requerido"),

  email: z.email("Correo inválido"),

  username: z.string().min(3, "Nombre de Usuario requerido").nonempty("Nombre de Usuario requerido"),

  address: z.string().min(3, "Dirección requerida").nonempty("Dirección requerida"),

  phone: z.string().min(7, "Teléfono requerido").nonempty("Teléfono requerido"),

  sex: z.string().nonempty("Seleccione un género"),

  dojoId: z.number().min(1, "Seleccione un dojo"),

  rolId: z.number().min(1, "Seleccione un rol"),

  birthday: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Fecha de nacimiento inválida",
  }),

  enrollmentDate: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Fecha de inscripción inválida",
  }),

  profileImg: z.string().optional(),

  martialArtRank: z.array(martialArtRankSchema)
    .refine(
      ranks => {
        // al menos una pareja completa
        const hasCompletePair = ranks.some(r => r.martialArtId > 0 && r.rankId > 0);
        if (!hasCompletePair) return false;

        // ninguna pareja incompleta
        const hasIncompletePair = ranks.some(r => 
          (r.martialArtId > 0 && r.rankId === 0) ||
          (r.martialArtId === 0 && r.rankId > 0)
        );
        return !hasIncompletePair;
      },
      { message: "Debe seleccionar un arte marcial y su rango" }
    ),

});

export type StudentFormValues = z.infer<typeof studentSchema>;
