import { Button } from "@/components/ui/button";
import { Zap, Target, Shield, Brain, Sparkles } from "lucide-react";
import CarouselComponent from "@/components/CarouselComponent";
import { Link } from "react-router";

export default function IaidoInfo() {

    const iaidoForms = [
        { name: "Mae", description: "Corte frontal desde posición seiza", level: "Shoden" },
        { name: "Ushiro", description: "Corte hacia atrás con giro", level: "Shoden" },
        { name: "Ukenagashi", description: "Desvío y corte simultáneo", level: "Chuden" },
        { name: "Tsuka Ate", description: "Golpe con la empuñadura", level: "Chuden" },
        { name: "Kesagiri", description: "Corte diagonal en ambos sentidos", level: "Okuden" },
        { name: "Morotezuki", description: "Estocada a dos manos", level: "Okuden" }
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
                                <div className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-bold mb-6">
                                    Arte del Desenvaine
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: "Kavoon" }}>
                                    Iaido <span className="text-indigo-600">居合道</span>
                                </h1>
                                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                    "El camino de la presencia mental". Arte del desenvaine rápido y preciso,
                                    donde el practicante perfecciona la extracción de la katana, el corte y
                                    el envaine en movimientos fluidos. El Iaido desarrolla la concentración,
                                    la disciplina mental y la armonía entre cuerpo y mente.
                                </p>
                                <p className="text-lg text-gray-700 mb-8">
                                    En Hiramatsukai, enseñamos el Iaido como un camino de perfeccionamiento
                                    personal, preservando las formas tradicionales y la filosofía del samurái.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8">
                                        Comenzar Entrenamiento
                                    </Button>
                                    <Button asChild size="lg" variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50">
                                        <Link to="/">Volver al inicio</Link>
                                    </Button>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="bg-linear-to-br from-gray-700 to-gray-900 rounded-3xl p-1">
                                    <div className="bg-white rounded-2xl p-8">
                                        <div className="aspect-square rounded-xl overflow-hidden bg-linear-to-br from-gray-100 to-white flex items-center justify-center">
                                            <div className="text-center">
                                                <Zap className="h-24 w-24 text-gray-800 mx-auto mb-4" />
                                                <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Kavoon" }}>
                                                    Iaido
                                                </h3>
                                                <div className="flex gap-4 justify-center mt-4">
                                                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full">居合道</span>
                                                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full">Presencia</span>
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

            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-block p-3 bg-indigo-100 rounded-full mb-4">
                                <Zap className="h-8 w-8 text-indigo-600" />
                            </div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Kavoon" }}>
                                Iaido <span className="text-indigo-600">居合道</span>
                            </h2>
                            <p className="text-xl text-gray-700">
                                "El camino de la presencia mental" - Arte del desenvaine rápido y preciso
                            </p>
                        </div>

                        <div className="mb-16">
                            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: "Kavoon" }}>
                                Formas <span className="text-indigo-600">Tradicionales</span> (Kata)
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {iaidoForms.map((form, index) => (
                                    <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h4 className="text-xl font-bold text-gray-900">{form.name}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${form.level === 'Shoden' ? 'bg-green-100 text-green-800' :
                                                            form.level === 'Chuden' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-red-100 text-red-800'
                                                        }`}>
                                                        {form.level}
                                                    </span>
                                                </div>
                                            </div>
                                            <Target className="h-8 w-8 text-indigo-500" />
                                        </div>
                                        <p className="text-gray-700">{form.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-16">
                            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: "Kavoon" }}>
                                Secuencia de <span className="text-indigo-600">Iaido</span>
                            </h3>
                            <div className="grid md:grid-cols-4 gap-6">
                                {[
                                    { step: "Nukitsuke", description: "Desenvaine y corte simultáneo" },
                                    { step: "Kirioroshi", description: "Corte principal descendente" },
                                    { step: "Chiburi", description: "Sacudida de la sangre" },
                                    { step: "Noto", description: "Envaine de la espada" }
                                ].map((item, index) => (
                                    <div key={index} className="text-center">
                                        <div className="relative">
                                            <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <span className="text-2xl font-bold text-indigo-600">{index + 1}</span>
                                            </div>
                                            {index < 3 && (
                                                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-indigo-200"></div>
                                            )}
                                        </div>
                                        <h4 className="font-bold text-gray-900 mb-2">{item.step}</h4>
                                        <p className="text-sm text-gray-600">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: "Kavoon" }}>
                                Equipo <span className="text-indigo-600">Esencial</span>
                            </h3>
                            <div className="grid md:grid-cols-3 gap-8">
                                {[
                                    {
                                        name: "Iaito",
                                        description: "Espada sin filo para práctica",
                                        features: ["Peso balanceado", "Sin filo", "Material: aleación de zinc/aluminio"]
                                    },
                                    {
                                        name: "Shinken",
                                        description: "Katana auténtica afilada",
                                        features: ["Acero forjado tradicionalmente", "Filo real", "Para practicantes avanzados"]
                                    },
                                    {
                                        name: "Obi y Hakama",
                                        description: "Vestimenta tradicional",
                                        features: ["Obi (cinturón ancho)", "Hakama (pantalón plisado)", "Keikogi (chaqueta)"]
                                    }
                                ].map((item, index) => (
                                    <div key={index} className="bg-linear-to-b from-indigo-50 to-white rounded-2xl p-6 border border-indigo-100">
                                        <h4 className="text-xl font-bold text-gray-900 mb-3">{item.name}</h4>
                                        <p className="text-gray-700 mb-4">{item.description}</p>
                                        <ul className="space-y-2">
                                            {item.features.map((feature, idx) => (
                                                <li key={idx} className="text-sm text-gray-600 flex items-center">
                                                    <div className="h-1.5 w-1.5 bg-indigo-500 rounded-full mr-2"></div>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Kavoon" }}>
                                Beneficios del <span className="text-indigo-600">Iaido</span>
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
                                    icon: Sparkles,
                                    title: "Presencia",
                                    description: "Desarrollo de carisma y autoridad natural",
                                    color: "yellow"
                                }
                            ].map((benefit, index) => {
                                const Icon = benefit.icon;
                                return (
                                    <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                                        <div className={`inline-block p-4 ${benefit.color === 'purple' ? 'bg-purple-100' : benefit.color === 'blue' ? 'bg-blue-100' : 'bg-yellow-100'} rounded-2xl mb-4`}>
                                            <Icon className={`h-8 w-8 ${benefit.color === 'purple' ? 'text-purple-600' : benefit.color === 'blue' ? 'text-blue-600' : 'text-yellow-600'}`} />
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

            <section className="py-20 bg-linear-to-r from-gray-800 to-gray-900">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <Zap className="h-16 w-16 mx-auto mb-6" />
                        <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "Kavoon" }}>
                            Descubre el Camino del <span className="text-yellow-400">Iaido</span>
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Tradición samurái, presencia mental, excelencia técnica
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white px-8">
                                Probar Clase de Iaido
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
