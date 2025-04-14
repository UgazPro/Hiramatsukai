import { z } from "zod";

export const LoginSchema = z.object({
    username: z.string().refine(text => text !== '',{message: 'El nombre de usuario es obligatorio'}),
    password: z.string().refine(text => text !== '',{message: 'La contraseña es obligatoria'})
});










