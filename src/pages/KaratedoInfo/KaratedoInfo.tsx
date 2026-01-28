import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Swords, Target, Users, Award, BookOpen, Shield, Activity, Brain, Heart, Zap } from "lucide-react";
import CarouselComponent from "@/components/CarouselComponent";
import { ProgressStepper, ProgressStepperProps } from "@/components/progressStepper/Progress-stepper";

export default function KaratedoInfo() {

    const [activeSection, setActiveSection] = useState("fundamentos");

    const katas = [
        { name: "Sanchin", level: "Shodan", description: "Kata fundamental de respiración y estructura", purpose: "Desarrollo de la postura y respiración ibuki" },
        { name: "Saifa", level: "Nidan", description: "Primer kata superior", purpose: "Técnicas de desgarre y control" },
        { name: "Seiyunchin", level: "Sandan", description: "Kata de agarres y proyecciones", purpose: "Trabajo de distancia corta" },
        { name: "Shisochin", level: "Yondan", description: "Kata de los cuatro puntos cardinales", purpose: "Defensa en todas direcciones" },
        { name: "Seipai", level: "Godan", description: "Kata de los 18 movimientos", purpose: "Técnicas ocultas y aplicaciones" },
        { name: "Kururunfa", level: "Rokudan", description: "Kata fluido como el agua", purpose: "Movimientos circulares y evasiones" },
        { name: "Seisan", level: "Nanadan", description: "Kata de las 13 manos", purpose: "Contraataques rápidos" },
        { name: "Suparinpei", level: "Hachidan", description: "Kata de los 108 movimientos", purpose: "Perfeccionamiento técnico total" }
    ];

    const progressData: ProgressStepperProps[] = [
        { active: true, year: "1929", label: "Fundación del Goju-Ryu por Chojun Miyagi" },
        { active: false, year: "1940", label: "Difusión internacional del Goju-Ryu" },
        { active: false, year: "1953", label: "Fallecimiento de Chojun Miyagi" },
        { active: false, year: "1960", label: "Establecimiento de la Federación Mundial de Goju-Ryu" },
        { active: false, year: "1980", label: "Incorporación de técnicas modernas de entrenamiento" },
        { active: false, year: "2000", label: "Globalización y expansión del Goju-Ryu" },
        { active: false, year: "2020", label: "Adaptación a nuevas tecnologías y métodos de enseñanza" }
    ]

    const principles = [
        {
            title: "Go (Dureza)",
            description: "Técnicas lineales y poderosas",
            icon: Shield,
            color: "red",
            examples: ["Tsuki directos", "Kicks frontales", "Bloqueos firmes"]
        },
        {
            title: "Ju (Suavidad)",
            description: "Movimientos circulares y evasivos",
            icon: Zap,
            color: "blue",
            examples: ["Desvíos circulares", "Proyecciones", "Controles articulares"]
        },
        {
            title: "Kokyu (Respiración)",
            description: "Control del ki a través de la respiración",
            icon: Activity,
            color: "yellow",
            examples: ["Respiración Ibuki", "Kiai controlado", "Meditación en movimiento"]
        }
    ];

    const benefits = [
        { icon: Heart, title: "Salud Cardiovascular", description: "Mejora la resistencia y capacidad pulmonar" },
        { icon: Shield, title: "Autodefensa", description: "Técnicas prácticas para situaciones reales" },
        { icon: Brain, title: "Concentración", description: "Desarrollo de enfoque mental y disciplina" },
        { icon: Users, title: "Confianza", description: "Aumento de la autoestima y seguridad personal" }
    ];

    return (

        <div className="min-h-screen bg-linear-to-b from-white to-gray-50">

            {/* Carousel */}
            <section className="relative">
                <div className="h-[600px] md:h-[700px]">
                    <CarouselComponent />
                </div>
            </section>



            {/* Main grid about Goju Ryu Karatedo */}
            <section className="py-10 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="inline-block px-4 py-2 bg-red-500 text-white rounded-full text-sm font-bold mb-6">
                                    Estilo Tradicional
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: "Kavoon" }}>
                                    Goju-Ryu <span className="text-red-600">Karate-Do</span>
                                </h1>
                                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                    Fundado por el gran maestro <strong>Chojun Miyagi</strong> (1888-1953),
                                    el Goju-Ryu (estilo duro-suave) representa la síntesis perfecta entre
                                    las artes marciales chinas y las técnicas indígenas de Okinawa.
                                </p>
                                <p className="text-lg text-gray-700 mb-8">
                                    En Hiramatsukai, preservamos este legado enseñando el Goju-Ryu en su
                                    forma más pura, manteniendo los katas originales y la filosofía del
                                    fundador.
                                </p>
                                <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white px-8">
                                    Iniciar Entrenamiento
                                </Button>
                            </div>
                            <div className="relative">
                                <div className="bg-linear-to-br from-red-500 to-red-600 rounded-3xl p-1">
                                    <div className="bg-white rounded-2xl p-8">
                                        <div className="aspect-square rounded-xl overflow-hidden bg-linear-to-br from-red-50 to-white flex items-center justify-center">
                                            <div className="text-center">
                                                <Swords className="h-24 w-24 text-red-500 mx-auto mb-4" />
                                                <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Kavoon" }}>
                                                    Fundado en 1929
                                                </h3>
                                                <p className="text-gray-600 mt-2">Por Chojun Miyagi</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="w-full border-2 h-80 mt-20">
                <ProgressStepper steps={progressData} />
            </div>

            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-wrap gap-2 justify-center">
                            {[
                                { id: "fundamentos", label: "Fundamentos", icon: BookOpen },
                                { id: "katas", label: "Katas", icon: Target },
                                { id: "beneficios", label: "Beneficios", icon: Award },
                                { id: "filosofia", label: "Filosofía", icon: Brain }
                            ].map((section) => {
                                const Icon = section.icon;
                                const isActive = activeSection === section.id;
                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 ${isActive
                                            ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                            }`}
                                    >
                                        <Icon className="h-5 w-5" />
                                        {section.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {activeSection === "fundamentos" && (
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Kavoon" }}>
                                    Principios <span className="text-red-600">Fundamentales</span>
                                </h2>
                                <p className="text-xl text-gray-700">
                                    La esencia del Goju-Ryu reside en el equilibrio perfecto
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-8 mb-16">
                                {principles.map((principle, index) => {
                                    const Icon = principle.icon;
                                    return (
                                        <div key={index} className={`bg-linear-to-b from-${principle.color}-50 to-white rounded-2xl p-8 border border-${principle.color}-100`}>
                                            <div className={`inline-block p-4 bg-${principle.color}-100 rounded-2xl mb-6`}>
                                                <Icon className={`h-8 w-8 text-${principle.color}-600`} />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{principle.title}</h3>
                                            <p className="text-gray-700 mb-6">{principle.description}</p>
                                            <ul className="space-y-2">
                                                {principle.examples.map((example, idx) => (
                                                    <li key={idx} className="text-gray-600 flex items-center">
                                                        <div className={`h-1.5 w-1.5 bg-${principle.color}-500 rounded-full mr-3`}></div>
                                                        {example}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Técnicas básicas */}
                            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                                <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: "Kavoon" }}>
                                    Técnicas <span className="text-red-600">Esenciales</span>
                                </h3>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900 mb-4">Kihon (Básicos)</h4>
                                        <div className="space-y-4">
                                            {[
                                                "Dachi (Posturas): Sanchin, Zenkutsu, Shiko",
                                                "Tsuki (Golpes): Seiken, Tate, Ura",
                                                "Uke (Bloqueos): Age, Soto, Uchi, Gedan",
                                                "Geri (Patadas): Mae, Yoko, Mawashi, Ushiro"
                                            ].map((item, index) => (
                                                <div key={index} className="flex items-start">
                                                    <div className="h-2 w-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                                                    <span className="text-gray-700">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900 mb-4">Kumite (Combate)</h4>
                                        <div className="space-y-4">
                                            {[
                                                "Gohon Kumite (5 pasos)",
                                                "Sanbon Kumite (3 pasos)",
                                                "Kihon Ippon Kumite (Un paso básico)",
                                                "Jiyu Kumite (Combate libre controlado)"
                                            ].map((item, index) => (
                                                <div key={index} className="flex items-start">
                                                    <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                                                    <span className="text-gray-700">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Sección: Katas */}
            {activeSection === "katas" && (
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Kavoon" }}>
                                    Katas <span className="text-red-600">Tradicionales</span>
                                </h2>
                                <p className="text-xl text-gray-700">
                                    Formas preestablecidas que preservan las técnicas ancestrales
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                {katas.map((kata, index) => (
                                    <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900">{kata.name}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-bold">
                                                        {kata.level}
                                                    </span>
                                                </div>
                                            </div>
                                            <Target className="h-8 w-8 text-red-500" />
                                        </div>
                                        <p className="text-gray-700 mb-4">{kata.description}</p>
                                        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                            <strong>Propósito:</strong> {kata.purpose}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Kata Sanchin especial */}
                            <div className="mt-16 bg-gradient-to-r from-red-500 to-red-600 rounded-3xl p-8 text-white">
                                <div className="grid lg:grid-cols-2 gap-8 items-center">
                                    <div>
                                        <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: "Kavoon" }}>
                                            Kata <span className="text-yellow-300">Sanchin</span>
                                        </h3>
                                        <p className="mb-6 opacity-90">
                                            Considerado el kata más importante del Goju-Ryu, Sanchin significa
                                            "tres batallas" y representa la lucha por controlar cuerpo,
                                            respiración y mente.
                                        </p>
                                        <ul className="space-y-2">
                                            <li className="flex items-center">
                                                <div className="h-2 w-2 bg-yellow-300 rounded-full mr-3"></div>
                                                <span>Desarrollo de la postura Sanchin</span>
                                            </li>
                                            <li className="flex items-center">
                                                <div className="h-2 w-2 bg-yellow-300 rounded-full mr-3"></div>
                                                <span>Respiración Ibuki (sonora)</span>
                                            </li>
                                            <li className="flex items-center">
                                                <div className="h-2 w-2 bg-yellow-300 rounded-full mr-3"></div>
                                                <span>Endurecimiento del cuerpo (Kote Kitae)</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="flex justify-center">
                                        <div className="h-64 w-64 rounded-full border-4 border-yellow-300 flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="text-6xl mb-2">三</div>
                                                <p className="text-lg">Sanchin</p>
                                                <p className="text-sm opacity-80">Tres Batallas</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Sección: Beneficios */}
            {activeSection === "beneficios" && (
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Kavoon" }}>
                                    Beneficios <span className="text-red-600">Integrales</span>
                                </h2>
                                <p className="text-xl text-gray-700">
                                    Desarrollo físico, mental y espiritual a través del Karate-Do
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                                {benefits.map((benefit, index) => {
                                    const Icon = benefit.icon;
                                    return (
                                        <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                                            <div className="inline-block p-4 bg-red-100 rounded-2xl mb-4">
                                                <Icon className="h-8 w-8 text-red-600" />
                                            </div>
                                            <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                                            <p className="text-gray-600 text-sm">{benefit.description}</p>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Programa de grados */}
                            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                                <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: "Kavoon" }}>
                                    Sistema de <span className="text-red-600">Grados</span>
                                </h3>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900 mb-4">Kyu (Grados Inferiores)</h4>
                                        <div className="space-y-3">
                                            {[
                                                "10° Kyu (Blanco) - Principiante",
                                                "8° Kyu (Amarillo) - Fundamentos básicos",
                                                "6° Kyu (Verde) - Técnicas intermedias",
                                                "4° Kyu (Azul) - Katas básicos completos",
                                                "2° Kyu (Marrón) - Preparación para cinturón negro"
                                            ].map((item, index) => (
                                                <div key={index} className="flex items-center">
                                                    <div className="h-2 w-2 bg-yellow-500 rounded-full mr-3"></div>
                                                    <span className="text-gray-700">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900 mb-4">Dan (Grados Superiores)</h4>
                                        <div className="space-y-3">
                                            {[
                                                "1° Dan (Shodan) - Principio del aprendizaje",
                                                "3° Dan (Sandan) - Instructor asistente",
                                                "5° Dan (Godan) - Instructor principal",
                                                "7° Dan (Nanadan) - Maestro (Kyoshi)",
                                                "8° Dan (Hachidan) - Gran Maestro (Hanshi)"
                                            ].map((item, index) => (
                                                <div key={index} className="flex items-center">
                                                    <div className="h-2 w-2 bg-red-500 rounded-full mr-3"></div>
                                                    <span className="text-gray-700">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Final */}
            <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <Swords className="h-16 w-16 mx-auto mb-6" />
                        <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "Kavoon" }}>
                            Comienza tu Camino en el <span className="text-yellow-400">Goju-Ryu</span>
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Entrenamiento tradicional, instructores certificados, filosofía de vida
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white px-8">
                                Probar Clase de Prueba
                            </Button>
                            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                                Solicitar Información
                            </Button>
                        </div>
                        <p className="mt-8 text-gray-400">
                            Clases para todas las edades • Grupos reducidos • Seguimiento personalizado
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
