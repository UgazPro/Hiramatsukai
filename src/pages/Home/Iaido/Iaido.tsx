import { CardComponent, CardComponentProps } from "@/components/card/CardComponent";
import Reveal from "@/components/animation/Reveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Iaido() {

    const cardsIaido: CardComponentProps[] = [
        {
            title: "Iaito (Espada)",
            description: "Espada sin filo para práctica segura",
            icon: "居",
            bgIcon: "bg-linear-to-br from-gray-700 to-gray-900",
            bg: "bg-linear-to-br from-gray-100 to-gray-200",
            border: "border-gray-300",
        },
        {
            title: "Kata (Formas)",
            description: "Secuencias de desenvaine y corte",
            icon: "型",
            bgIcon: "bg-linear-to-br from-indigo-500 to-indigo-700",
            bg: "bg-linear-to-br from-indigo-50 to-indigo-100",
            border: "border-indigo-200",
        },
    ];

    return (
        <section id="iaido" aria-labelledby="iaido-title" className="py-16 sm:py-10 bg-white">
            <div className="container mx-auto px-4">

                <div className="flex flex-col lg:flex-row-reverse items-start gap-8 lg:gap-12">

                    <div className="lg:w-1/2 w-full order-1 lg:order-2">
                        <Reveal className="space-y-6" y={24}>

                            <div className="flex items-center gap-2">
                                <div className="h-11 w-11 lg:hidden">
                                    <img src="kendoiaido.jpg" alt="Practica de Iaido" className="rounded-full" />
                                </div>
                                <h2 id="iaido-title" className="text-2xl lg:text-4xl font-bold text-gray-900 text-right">
                                    Iaido <span className="text-indigo-600">居合道</span>
                                </h2>
                            </div>

                            <p className="text-lg text-gray-700 leading-relaxed">
                                "El camino de la presencia mental". Arte del desenvaine rápido y preciso,
                                donde el practicante perfecciona la extracción de la katana, el corte y
                                el envaine en movimientos fluidos. El Iaido desarrolla la concentración,
                                la disciplina mental y la armonía entre cuerpo y mente.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                {cardsIaido.map((card, index) => (
                                    <Reveal key={index} delay={index * 0.08} y={16}>
                                        <CardComponent card={card} />
                                    </Reveal>
                                ))}
                            </div>

                            <div className="h-40 w-40 mx-auto hidden lg:block">
                                <img src="kendoiaido.jpg" alt="Emblema de Iaido" className="rounded-full" />
                            </div>

                        </Reveal>
                    </div>

                    <div className="lg:w-1/2 w-full space-y-9 order-2 lg:order-1">

                        <Reveal className="relative rounded-2xl overflow-hidden shadow-2xl" y={20}>
                            <img
                                src="/Hiramatsukai.jpg"
                                alt="Práctica de Iaido"
                                className="w-full h-100 lg:h-62.5 object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
                            <div className="absolute top-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                Iaido - 居合道
                            </div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="font-bold text-lg">Arte del Desenvaine</h3>
                                <p className="text-sm opacity-90">Katana tradicional</p>
                            </div>
                        </Reveal>

                        <Reveal className="relative rounded-2xl overflow-hidden shadow-2xl" y={20} delay={0.12}>
                            <img
                                src="/Hiramatsukai.jpg"
                                alt="Práctica de Iaido"
                                className="w-full h-[400px] lg:h-[250px] object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
                            <div className="absolute top-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                Iaido - 居合道
                            </div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="font-bold text-lg">Meditación en Movimiento</h3>
                                <p className="text-sm opacity-90">Zanshin - Conciencia alerta</p>
                            </div>
                        </Reveal>

                    </div>

                </div>

            </div>

            <Reveal className="mt-10 text-center" y={14}>
                <Button asChild variant="link" style={{ fontFamily: "JetBrains Mono" }}>
                    <Link to="/iaido">Descubre mas sobre IAIDO</Link>
                </Button>
            </Reveal>

        </section>
    );
}
