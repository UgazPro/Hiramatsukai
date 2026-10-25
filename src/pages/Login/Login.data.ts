import { z } from "zod";

export const LoginSchema = z.object({
    username: z.string().trim().min(1, { message: 'El nombre de usuario es obligatorio' }),
    password: z.string().min(1, { message: 'La contraseña es obligatoria' })
});










