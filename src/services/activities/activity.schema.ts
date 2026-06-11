import { z } from "zod";

export const ActivitySchema = z.object({
    name: z.string().min(1, "Nombre Requerido").min(5, "Nombre requerido"),
    date: z.date().refine((date) => !isNaN(date.getTime()), {
        message: "Fecha de la Actividad inválida",
    }),
    time: z.string().regex(/^\d{2}:\d{2}$/, "Hora inválida (HH:mm)"),
    place: z.string().min(1, "Lugar Requerido"),
    type: z.string().min(1, "Tipo de Actividad Requerido"),
    price: z.number().nonnegative("El precio no puede ser negativo"),
    description: z.string().min(1, "Descripción Requerida"),
    dojoIds: z.array(z.number()).min(1, "Seleccione al menos un dojo"),
    latitude: z.number(),
    longitude: z.number(),
});

export type ActivityFormValues = z.infer<typeof ActivitySchema>;
