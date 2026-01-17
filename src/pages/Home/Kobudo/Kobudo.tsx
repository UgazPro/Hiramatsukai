import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";

export default function Kobudo() {

    const navigate = useNavigate();

    return (
        <section id="kobudo" className="py-16 sm:py-15 bg-white">
            <div className="container mx-auto px-4">

                <div className="flex flex-col lg:flex-row-reverse items-start gap-8 lg:gap-12">

                    <div className="lg:w-1/2 w-full space-y-9 order-2 lg:order-1">

                        {/* First Image */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl w-full">
                            <img
                                src="/Hiramatsukai.jpg"
                                alt="Práctica de Kobudo"
                                className="w-full h-100 lg:h-77 object-cover object-center"
                            />

                            {/* Subtle Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />

                            {/* Badge */}
                            <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                Kobudo Okinawense
                            </div>
                        </div>

                        {/* Second Image */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl w-full">
                            <img
                                src="/Hiramatsukai.jpg"
                                alt="Práctica de Kobudo"
                                className="w-full h-100 lg:h-77 object-cover object-center"
                            />
                            {/* Subtle Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />

                            {/* Badge */}
                            <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                Kobudo Okinawense
                            </div>
                        </div>

                    </div>

                    {/* Contenido Kobudo - Lado izquierdo en desktop */}
                    <div className="lg:w-1/2 w-full space-y-6 order-1 lg:order-2">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-right lg:text-left">
                            Kobudo Okinawense
                        </h2>

                        <p className="text-lg text-gray-700 leading-relaxed text-right lg:text-left">
                            Arte marcial de Okinawa que enseña el manejo de armas.
                            Desarrollado por los campesinos y pescadores okinawenses como método de defensa personal.
                        </p>

                        {/* Main Weapons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                            <div className="flex items-start space-x-3 bg-yellow-50 p-4 rounded-xl">
                                <div className="h-23 w-23 rounded-full bg-yellow-500 flex items-center justify-center shrink-0">
                                    <span className="text-white font-bold text-lg">棒</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Bo (Bastón)</h4>
                                    <p className="text-gray-600 text-sm">Arma de 1.8m, base del kobudo tradicional</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3 bg-blue-50 p-4 rounded-xl">
                                <div className="h-23 w-23 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                                    <span className="text-white font-bold text-lg">釵</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Sai (Tridente)</h4>
                                    <p className="text-gray-600 text-sm">Arma de metal para defensa y ataque</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3 bg-red-50 p-4 rounded-xl">
                                <div className="h-23 w-23 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                                    <span className="text-white font-bold text-lg">トンファー</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Tonfa</h4>
                                    <p className="text-gray-600 text-sm">Originalmente mango de molino, ahora arma policial</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3 bg-purple-50 p-4 rounded-xl">
                                <div className="h-23 w-23 rounded-full bg-purple-500 flex items-center justify-center shrink-0">
                                    <span className="text-white font-bold text-lg">ヌンチャク</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Nunchaku</h4>
                                    <p className="text-gray-600 text-sm">Dos palos unidos por cadena o cuerda</p>
                                </div>
                            </div>
                        </div>

                        <div className="h-37 w-37 mx-auto">
                            <img src="gi.jpg" alt="" />
                        </div>
                    </div>
                </div>

                <div className="mt-10 text-center">
                    <Button
                        variant={`link`}
                        style={{ fontFamily: 'JetBrains Mono' }}
                        onClick={() => navigate('/kobudo')}
                    >
                        Descubre más sobre el KOBUDO
                    </Button>
                </div>

            </div>
        </section>
    );
}
