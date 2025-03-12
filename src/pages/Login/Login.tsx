import { Link } from "react-router";


export default function Login() {
    return (

        <div className="bg-[url('/Hiramatsukai.jpg')] bg-cover bg-bottom h-screen w-full flex items-center">

            <div className="flex flex-col justify-center sm:w-1/3 mx-auto mb-5 space-y-8">
                <form action="#">
                    <div className="flex flex-col bg-black/60 p-10 rounded-lg shadow space-y-6">
                        <img src="/Logos.png" alt="" className="rounded-full" />
                        <h1 style={{ fontFamily: "Kaushan Script" }} className="font-bold text-center text-4xl text-white">Hiramat<span className="text-white">sukai</span></h1>
                        <h1 className="font-bold text-xl text-center text-white">Inicia Sesión</h1>

                        <div className="flex flex-col space-y-1">
                            <label htmlFor="username" className="text-white font-bold mb-3 pl-2">Nombre de Usuario</label>
                            <input 
                                type="text" 
                                name="username" 
                                id="username"
                                className="bg-black border-2 rounded-full px-3 py-2 w-full focus:outline-none focus:border-(--redColor) focus:shadow text-white" 
                                placeholder="ShidoinUgaz" 
                            />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label htmlFor="password" className="text-white font-bold mb-3 pl-2">Contraseña</label>
                            <input 
                                type="password" 
                                name="password" 
                                id="password"
                                className="bg-black border-2 rounded-full px-3 py-2 w-full focus:outline-none focus:border-(--redColor) focus:shadow text-white" 
                                placeholder="*********" 
                            />
                        </div>

                        <div className="flex flex-col-reverse sm:flex-row sm:justify-between items-center">
                            <Link 
                                to={"#"}
                                className="inline-block text-(--yellowColor) hover:text-(--yellowColor)/50 hover:underline"
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



    );
}
