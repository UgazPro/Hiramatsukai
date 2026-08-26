import { Button } from "@/components/ui/button";
import { Sword, Shield, Brain } from "lucide-react";
import CarouselComponent from "@/components/CarouselComponent";
import { Link } from "react-router";

export default function KendoInfo() {

    const kendoEquipment = [
        {
            name: "Shinai",
            description: "Espada de bambú para práctica",
            parts: ["Cuatro láminas de bambú", "Tsuka (empuñadura)", "Tsuba (guardamano)"],
            purpose: "Entrenamiento de golpes controlados"
        },
        {
            name: "Bogu",
            description: "Armadura protectora completa",
            parts: ["Men (máscara)", "Do (pechera)", "Kote (guantes)", "Tare (faldón)"],
            purpose: "Protección para combate realista"
        },
        {
            name: "Bokuto",
            description: "Espada de madera para katas",
            parts: ["Madera de roble japonés", "Forma de katana real"],
            purpose: "Práctica de formas y posturas"
        }
    ];

    const principles = [
        {
            title: "Ki-Ken-Tai Ichi",
            description: "Unidad de espíritu, espada y cuerpo",
            meaning: "Cada movimiento debe integrar completamente estos tres elementos"
        },
        {
            title: "Zanshin",
            description: "Conciencia alerta permanente",
            meaning: "Estado de atención completa antes, durante y después de la técnica"
        },
        {
            title: "Metsuke",
            description: "Mirada penetrante",
            meaning: "Visión periférica que observa al oponente como un todo"
        },
        {
            title: "Seme",
            description: "Presión ofensiva",
            meaning: "Dominar el centro y romper la guardia del oponente"
        }
    ];

    return (
        <div className="min-h-screen bg-linear-to-b from-white to-gray-50">

            <section className="relative">
                <div className="h-[600px] md:h-[700px]">
                    <CarouselComponent />
                </div>
            </section>

            <section className="py-10 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="inline-block px-4 py-2 bg-red-500 text-white rounded-full text-sm font-bold mb-6">
                                    La Vía de la Espada
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: "Kavoon" }}>
                                    Kendo <span className="text-red-600">剣道</span>
                                </h1>
                                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                    "El camino de la espada". Arte marcial moderno derivado de las técnicas de combate
                                    de los samuráis japoneses. El Kendo desarrolla el espíritu, la disciplina y
                                    la habilidad de combate a través del uso del shinai (espada de bambú) y la armadura
                                    tradicional (bogu).
                                </p>
                                <p className="text-lg text-gray-700 mb-8">
                                    En Hiramatsukai, enseñamos el Kendo como un sistema integral que combina
                                    la práctica física con el desarrollo del carácter y la ética marcial.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white px-8">
                                        Comenzar Entrenamiento
                                    </Button>
                                    <Button asChild size="lg" variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50">
                                        <Link to="/">Volver al inicio</Link>
                                    </Button>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="bg-linear-to-br from-red-500 to-red-700 rounded-3xl p-1">
                                    <div className="bg-white rounded-2xl p-8">
                                        <div className="aspect-square rounded-xl overflow-hidden bg-linear-to-br from-red-50 to-white flex items-center justify-center">
                                            <div className="text-center">
                                                <Sword className="h-24 w-24 text-red-600 mx-auto mb-4" />
                                                <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Kavoon" }}>
                                                    Kendo
                                                </h3>
                                                <div className="flex gap-4 justify-center mt-4">
                                                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full">剣道</span>
                                                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full">Camino</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-block p-3 bg-red-100 rounded-full mb-4">
                                <Sword className="h-8 w-8 text-red-600" />
                            </div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Kavoon" }}>
                                Equipo <span className="text-red-600">del Kendo</span>
                            </h2>
                            <p className="text-xl text-gray-700">
                                Instrumentos esenciales para la práctica de esta disciplina
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            {kendoEquipment.map((item, index) => (
                                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.name}</h3>
                                    <p className="text-gray-600 mb-4">{item.description}</p>
                                    <div className="mb-4">
                                        <h4 className="font-semibold text-gray-900 mb-2">Componentes:</h4>
                                        <ul className="space-y-1">
                                            {item.parts.map((part, idx) => (
                                                <li key={idx} className="text-sm text-gray-600 flex items-center">
                                                    <div className="h-1.5 w-1.5 bg-red-500 rounded-full mr-2"></div>
                                                    {part}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="text-sm text-gray-700 bg-red-50 p-3 rounded-lg">
                                        <strong>Propósito:</strong> {item.purpose}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-16">
                            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: "Kavoon" }}>
                                Áreas de <span className="text-red-600">Golpe</span> (Datotsu-bui)
                            </h3>
                            <div className="grid md:grid-cols-4 gap-6">
                                {[
                                    { area: "Men", location: "Cabeza", point: "Centro de la frente" },
                                    { area: "Kote", location: "Muñeca", point: "Muñeca derecha o izquierda" },
                                    { area: "Do", location: "Torso", point: "Costados del torso" },
                                    { area: "Tsuki", location: "Garganta", point: "Protegida por el men" }
                                ].map((item, index) => (
                                    <div key={index} className="text-center p-6">
                                        <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <span className="text-2xl font-bold text-red-600">{item.area.charAt(0)}</span>
                                        </div>
                                        <h4 className="font-bold text-gray-900 text-lg mb-1">{item.area}</h4>
                                        <p className="text-gray-600 mb-2">{item.location}</p>
                                        <p className="text-sm text-gray-500">{item.point}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: "Kavoon" }}>
                                Principios <span className="text-red-600">Fundamentales</span>
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {principles.map((principle, index) => (
                                    <div key={index} className="bg-linear-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200">
                                        <h4 className="text-xl font-bold text-gray-900 mb-3">{principle.title}</h4>
                                        <p className="text-gray-700 mb-3">{principle.description}</p>
                                        <p className="text-gray-600 italic">{principle.meaning}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Kavoon" }}>
                                Beneficios del <span className="text-red-600">Kendo</span>
                            </h2>
                            <p className="text-xl text-gray-700">
                                Desarrollo integral a través de la disciplina de la espada
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Brain,
                                    title: "Concentración",
                                    description: "Desarrollo de atención plena y enfoque mental",
                                    color: "purple"
                                },
                                {
                                    icon: Shield,
                                    title: "Autodisciplina",
                                    description: "Cultivo de la perseverancia y control personal",
                                    color: "blue"
                                },
                                {
                                    icon: Sword,
                                    title: "Respeto",
                                    description: "Hacia los oponentes, instructores y la tradición",
                                    color: "red"
                                }
                            ].map((benefit, index) => {
                                const Icon = benefit.icon;
                                return (
                                    <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                                        <div className={`inline-block p-4 ${benefit.color === 'purple' ? 'bg-purple-100' : benefit.color === 'blue' ? 'bg-blue-100' : 'bg-red-100'} rounded-2xl mb-4`}>
                                            <Icon className={`h-8 w-8 ${benefit.color === 'purple' ? 'text-purple-600' : benefit.color === 'blue' ? 'text-blue-600' : 'text-red-600'}`} />
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-xl mb-3">{benefit.title}</h3>
                                        <p className="text-gray-600">{benefit.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-linear-to-r from-red-600 to-red-800">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <Sword className="h-16 w-16 mx-auto mb-6" />
                        <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "Kavoon" }}>
                            Descubre el Camino del <span className="text-yellow-300">Kendo</span>
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Tradición samurái, disciplina mental, excelencia marcial
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white px-8">
                                Probar Clase de Kendo
                            </Button>
                            <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                                <Link to="/">Volver al inicio</Link>
                            </Button>
                        </div>
                        <p className="mt-8 text-white/70">
                            Equipo profesional disponible • Instructores certificados • Clases tradicionales y modernas
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
