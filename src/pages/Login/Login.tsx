import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "./Login.data";
import ErrorMessage from "@/components/form/ErrorMessage";
import { GoogleLogin } from "@react-oauth/google";
import { authGoogle, authLogin } from "@/services/auth/auth.service";
import { googleLogInData, LoginForm } from "@/services/auth/auth.interface";

export default function Login() {

    const [loginErrorMessage, setLoginErrorMessage] = useState('');

    const navigate = useNavigate();

    const defaultValues: LoginForm = {
        username: '',
        password: '',
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues,
        resolver: zodResolver(LoginSchema)
    });

    async function successfulLogin(formData: LoginForm) {

        if (formData) {

            const response = await authLogin(formData);

            if (response.success) {
                localStorage.setItem('token', response.token);
                navigate('/admin');
            }

            if (!response.success) {
                setLoginErrorMessage(response.message);

                setTimeout(() => {
                    setLoginErrorMessage('');
                }, 2000);
            }

        }
        
    }

    async function logInWithGoogle(googleResponse: googleLogInData) {
        
        if (googleResponse) {

            const response = await authGoogle({token: googleResponse.credential as string});
            console.log(response);

            if (response.success) {
                localStorage.setItem('token', response.token);
                navigate('/admin');
            }

            if (!response.success) {
                setLoginErrorMessage(response.message);

                setTimeout(() => {
                    setLoginErrorMessage('');
                }, 2000);
            }

        }
    }

    return (

        <div>
            <div className="bg-(--redColor) py-2"></div>

            <div className="bg-[url('/Hiramatsukai.jpg')] bg-cover bg-bottom h-screen w-full flex items-center">

                <div className="flex flex-col justify-center w-[90%] sm:w-1/3 mx-auto mb-5 space-y-8">
                    <form onSubmit={handleSubmit(successfulLogin)}>
                        <div className="flex flex-col bg-black/60 p-10 rounded-lg shadow space-y-6">
                            <img src="/artesmarciales.jpg" alt="Logos Hiramatsukai" className="rounded-full" />
                            {/* <h1 style={{ fontFamily: "Kaushan Script" }} className="font-bold text-center text-4xl text-white">Hiramat<span className="text-white">sukai</span></h1> */}
                            <h1 className="font-bold text-xl text-center text-white">Inicia Sesión</h1>

                            <div className="flex flex-col space-y-1">
                                <label className="text-white font-bold mb-3 pl-2">Nombre de Usuario</label>
                                <input
                                    type="text"
                                    {...register('username')}
                                    className={errors.username ? 'bg-black border-[1px] rounded-xl transition-colors px-3 py-2 w-full focus:outline-none focus:shadow text-white focus:border-(--redColor)' : 'bg-black border-[1px] rounded-xl transition-colors px-3 py-2 w-full focus:outline-none focus:shadow text-white focus:border-(--yellowColor)'}
                                    placeholder="ShidoinUgaz"
                                />
                                {errors.username && (<ErrorMessage>{errors.username.message}</ErrorMessage>)}
                            </div>

                            <div className="flex flex-col space-y-1">
                                <label className="text-white font-bold mb-3 pl-2">Contraseña</label>
                                <input
                                    type="password"
                                    {...register('password')}
                                    className={errors.password ? 'bg-black border-[1px] rounded-xl transition-colors px-3 py-2 w-full focus:outline-none focus:shadow text-white focus:border-(--redColor)' : 'bg-black border-[1px] rounded-xl transition-colors px-3 py-2 w-full focus:outline-none focus:shadow text-white focus:border-(--yellowColor)'}
                                    placeholder="*********"
                                />
                                {errors.password && (<ErrorMessage>{errors.password?.message}</ErrorMessage>)}
                                {loginErrorMessage && (<ErrorMessage>{loginErrorMessage}</ErrorMessage>)}
                            </div>

                            <GoogleLogin
                                onSuccess={(credentialResponse) => {
                                    logInWithGoogle(credentialResponse);
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />

                            <div className="flex flex-col-reverse sm:flex-row sm:justify-between items-center">
                                <Link
                                    to={"#"}
                                    className="inline-block text-(--yellowColor)/80 transition-all hover:text-(--yellowColor) mt-5 lg:mt-0"
                                >
                                    ¿Olvidaste tu Contraseña?
                                </Link>

                                <button
                                    type="submit"
                                    className="bg-(--redColor)/80 text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-(--redColor) hover:cursor-pointer transition-colors"
                                >
                                    Iniciar Sesión
                                </button>
                            </div>

                        </div>
                    </form>
                </div>

            </div>
        </div>



    );
}
