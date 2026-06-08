import { z } from "zod";

export const PostulationSchema = z.object({
  activityId: z.number({ message: "Seleccione un examen" }).min(1, "Seleccione un examen"),
});

export type PostulationFormValues = z.infer<typeof PostulationSchema>;
