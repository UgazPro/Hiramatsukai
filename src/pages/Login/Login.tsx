import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleLogin } from "@react-oauth/google";

import { LoginSchema } from "./Login.data";
import ErrorMessage from "@/components/form/ErrorMessage";
import { LoginForm, googleLogInData } from "@/services/auth/auth.interface";
import { useLoginMutation, useGoogleLoginMutation } from "@/queries/useAuthMutations";
import SpinnerComponent from "@/components/SpinnerComponent";

export default function Login() {
    const [loginErrorMessage, setLoginErrorMessage] = useState("");

    const loginMutation = useLoginMutation();
    const googleLoginMutation = useGoogleLoginMutation();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        resolver: zodResolver(LoginSchema),
    });

    const onSubmit = async (data: LoginForm) => {
        try {
            await loginMutation.mutateAsync(data);
            
        } catch (error: any) {
            setLoginErrorMessage(error.message || "Error al iniciar sesión");
            setTimeout(() => setLoginErrorMessage(""), 2500);
        }
    };

    const onGoogleSuccess = async (googleResponse: googleLogInData) => {
        try {
            if (!googleResponse.credential) throw new Error("No se obtuvo credencial de Google");
            await googleLoginMutation.mutateAsync({ token: googleResponse.credential });
        } catch (error: any) {
            setLoginErrorMessage(error.message || "Error al iniciar sesión con Google");
            setTimeout(() => setLoginErrorMessage(""), 2500);
        }
    };

    const isLoading = false;

    return (

        <div>
            {isLoading && <SpinnerComponent />}
                
            <>
                <div className="bg-(--redColor) py-2"></div>

                <div className="bg-[url('/Hiramatsukai.jpg')] bg-cover bg-bottom h-screen w-full flex items-center">
                    <div className="flex flex-col justify-center w-[90%] sm:w-1/3 mx-auto mb-5 space-y-8">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col bg-black/60 p-10 rounded-lg shadow space-y-6">
                                <img src="/artesmarciales.jpg" alt="Logos Hiramatsukai" className="rounded-full" />

                                <h1 className="font-bold text-xl text-center text-white">Inicia Sesión</h1>

                                {/* Username */}
                                <div className="flex flex-col space-y-1">
                                    <label className="text-white font-bold mb-3 pl-2">Nombre de Usuario</label>
                                    <input
                                        type="text"
                                        {...register("username")}
                                        className="bg-black border rounded-xl px-3 py-2 text-white focus:outline-none focus:border-(--yellowColor)"
                                        placeholder="ShidoinUgaz"
                                    />
                                    {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
                                </div>

                                {/* Password */}
                                <div className="flex flex-col space-y-1">
                                    <label className="text-white font-bold mb-3 pl-2">Contraseña</label>
                                    <input
                                        type="password"
                                        {...register("password")}
                                        className="bg-black border rounded-xl px-3 py-2 text-white focus:outline-none focus:border-(--yellowColor)"
                                        placeholder="*********"
                                    />
                                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                                    {loginErrorMessage && <ErrorMessage>{loginErrorMessage}</ErrorMessage>}
                                </div>

                                {/* Google Login */}
                                <GoogleLogin
                                    onSuccess={onGoogleSuccess}
                                    onError={() => setLoginErrorMessage("Error al iniciar sesión con Google")}
                                />

                                <div className="flex flex-col-reverse sm:flex-row sm:justify-between items-center">
                                    <Link
                                        to="#"
                                        className="text-(--yellowColor)/80 hover:text-(--yellowColor) mt-5 lg:mt-0"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </Link>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="bg-(--redColor)/80 text-white font-bold px-5 py-2 rounded hover:bg-(--redColor) hover:cursor-pointer"
                                    >
                                        Iniciar Sesión
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        </div>
    );
}
