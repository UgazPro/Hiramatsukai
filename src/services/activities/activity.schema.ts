import { z } from "zod";

export const ActivitySchema = z.object({

    name: z.string().nonempty("Nombre Requerido").min(5, "Nombre requerido"),

    date: z.date().refine((date) => !isNaN(date.getTime()), {
        message: "Fecha de la Actividad inválida",
    }),

    place: z.string().nonempty("Lugar Requerido"),

    price: z.number("Precio Requerido"),

    type: z.string().nonempty("Tipo de Actividad Requerido"),

    description: z.string().nonempty("Descripción Requerida"),

    dojoIds: z.array(z.number()).min(1, "Seleccione al menos un dojo"),

    latitude: z.number(),

    longitude: z.number(),

});

export type ActivityFormValues = z.infer<typeof ActivitySchema>;
