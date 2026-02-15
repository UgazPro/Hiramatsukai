import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function KendoIaido() {
    
    const navigate = useNavigate();

    return (

        <section id="kendoIaido" className="py-16 sm:py-10 bg-linear-to-b from-gray-100 to-white">

            <div className="container mx-auto px-4">

                <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">

                    <div className="lg:w-1/2 w-full order-1 lg:order-2">
                        <div className="space-y-6">

                            <div className="flex items-center gap-2">

                                <div className="h-11 w-11 lg:hidden">
                                    <img src="kendoiaido.jpg" alt="" className="rounded-full" />
                                </div>

                                <h2 className="text-2xl lg:text-4xl font-bold text-gray-900">
                                    Kendo & Iaido
                                </h2>

                            </div>

                            <p className="text-lg text-gray-700 leading-relaxed">
                                El camino de la espada japonesa. Dos artes marciales tradicionales que representan
                                <span className="font-semibold text-blue-600"> el espíritu del samurái</span>.
                                Mientras el Kendo se enfoca en el combate, el Iaido perfecciona el arte del desenvaine.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">

                                {/* Kendo */}
                                <div className="flex items-start space-x-3 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">

                                    <div className="h-8 w-8 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0">
                                        <span className="text-white font-bold">剣</span>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900">Kendo</h4>
                                        <p className="text-gray-600 text-sm">"El camino de la espada" - Combate con shinai</p>
                                    </div>

                                </div>

                                {/* Iaido */}
                                <div className="flex items-start space-x-3 bg-linear-to-br from-gray-100 to-gray-200 rounded-xl p-4 border border-gray-300">

                                    <div className="h-8 w-8 rounded-full bg-linear-to-br from-gray-700 to-gray-900 flex items-center justify-center shrink-0">
                                        <span className="text-white font-bold">居</span>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900">Iaido</h4>
                                        <p className="text-gray-600 text-sm">"Arte del desenvaine" - Katana tradicional</p>
                                    </div>

                                </div>

                                {/* Bushido */}
                                <div className="flex items-start space-x-3 bg-linear-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 border border-indigo-200">

                                    <div className="h-8 w-8 rounded-full bg-linear-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shrink-0">
                                        <span className="text-white font-bold">道</span>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900">Bushido</h4>
                                        <p className="text-gray-600 text-sm">Código del samurái - Honor y disciplina</p>
                                    </div>

                                </div>

                                {/* Bogu */}
                                <div className="flex items-start space-x-3 bg-linear-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">

                                    <div className="h-8 w-8 rounded-full bg-linear-to-br from-slate-600 to-slate-800 flex items-center justify-center shrink-0">
                                        <span className="text-white font-bold">具</span>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900">Bogu</h4>
                                        <p className="text-gray-600 text-sm">Armadura tradicional - Protección y etiqueta</p>
                                    </div>

                                </div>

                            </div>

                            <div className="h-40 w-40 mx-auto lg:block hidden">
                                <img src="kendoiaido.jpg" alt="" className="rounded-full" />
                            </div>

                        </div>
                    </div>

                    <div className="lg:w-1/2 w-full space-y-9 order-2 lg:order-1">

                        <div className="relative rounded-2xl overflow-hidden">
                            <img
                                src="/Hiramatsukai.jpg"
                                alt="Práctica de Kendo"
                                className="w-full h-[400px] lg:h-[300px] object-cover object-center"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent pointer-events-none" />

                            <div className="absolute top-4 left-4 bg-linear-to-r from-blue-600 to-blue-800 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                Kendo - 剣道
                            </div>

                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="font-bold text-lg">Combate con Shinai</h3>
                                <p className="text-sm opacity-90">Armadura tradicional (Bogu)</p>
                            </div>
                        </div>

                        <div className="relative rounded-2xl overflow-hidden">
                            <img
                                src="/Hiramatsukai.jpg"
                                alt="Práctica de Iaido"
                                className="w-full h-[400px] lg:h-[300px] object-cover object-center"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent pointer-events-none" />

                            <div className="absolute top-4 left-4 bg-linear-to-r from-gray-700 to-gray-900 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                Iaido - 居合道
                            </div>

                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="font-bold text-lg">Arte del Desenvaine</h3>
                                <p className="text-sm opacity-90">Katana tradicional</p>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            <div className="mt-10 text-center">
                <Button
                    variant={`link`}
                    style={{ fontFamily: 'JetBrains Mono' }}
                    onClick={() => navigate('/kendoiaido')}
                >
                    Descubre más sobre el KOBUDO
                </Button>
            </div>

        </section>
    );
}