import { CardComponent, CardComponentProps } from "@/components/card/CardComponent";
import Reveal from "@/components/animation/Reveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Kendo() {

    const cardsKendo: CardComponentProps[] = [
        {
            title: "Kumite (Combate)",
            description: "Combate con shinai y armadura tradicional",
            icon: "剣",
            bgIcon: "bg-linear-to-br from-red-500 to-red-700",
            bg: "bg-linear-to-br from-red-50 to-red-100",
            border: "border-red-200",
        },
        {
            title: "Kata (Formas)",
            description: "Formas con bokuto y shinai",
            icon: "型",
            bgIcon: "bg-linear-to-br from-blue-600 to-blue-800",
            bg: "bg-linear-to-br from-blue-50 to-blue-100",
            border: "border-blue-200",
        },
    ];

    return (
        <section id="kendo" aria-labelledby="kendo-title" className="py-16 sm:py-10 bg-linear-to-b bg-muted">
            <div className="container mx-auto px-4">

                <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">

                    <div className="lg:w-1/2 w-full order-1 lg:order-2">
                        <Reveal className="space-y-6" y={24}>

                            <div className="flex items-center gap-2">
                                <div className="h-11 w-11 lg:hidden">
                                    <img src="kendoiaido.jpg" alt="Practica de Kendo" className="rounded-full" />
                                </div>
                                <h2 id="kendo-title" className="text-2xl lg:text-4xl font-bold text-gray-900">
                                    Kendo <span className="text-red-600">剣道</span>
                                </h2>
                            </div>

                            <p className="text-lg text-gray-700 leading-relaxed">
                                "El camino de la espada". Arte marcial moderno derivado de las técnicas de combate
                                de los samuráis japoneses. El Kendo desarrolla el espíritu, la disciplina y
                                la habilidad de combate a través del uso del shinai (espada de bambú) y la armadura tradicional (bogu).
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                {cardsKendo.map((card, index) => (
                                    <Reveal key={index} delay={index * 0.08} y={16}>
                                        <CardComponent card={card} />
                                    </Reveal>
                                ))}
                            </div>

                            <div className="h-40 w-40 mx-auto lg:block hidden">
                                <img src="kendoiaido.jpg" alt="Emblema de Kendo" className="rounded-full" />
                            </div>

                        </Reveal>
                    </div>

                    <div className="lg:w-1/2 w-full space-y-9 order-2 lg:order-1">

                        <Reveal className="relative rounded-2xl overflow-hidden" y={20}>
                            <img
                                src="/Hiramatsukai.jpg"
                                alt="Práctica de Kendo"
                                className="w-full h-[400px] lg:h-[300px] object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute top-4 left-4 bg-linear-to-r from-red-600 to-red-800 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                Kendo - 剣道
                            </div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="font-bold text-lg">Combate con Shinai</h3>
                                <p className="text-sm opacity-90">Armadura tradicional (Bogu)</p>
                            </div>
                        </Reveal>

                        <Reveal className="relative rounded-2xl overflow-hidden" y={20} delay={0.12}>
                            <img
                                src="/Hiramatsukai.jpg"
                                alt="Práctica de Kendo"
                                className="w-full h-[400px] lg:h-[250px] object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute top-4 left-4 bg-linear-to-r from-red-600 to-red-800 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                Kendo - 剣道
                            </div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="font-bold text-lg">Ki-Ken-Tai Ichi</h3>
                                <p className="text-sm opacity-90">Unidad de espíritu, espada y cuerpo</p>
                            </div>
                        </Reveal>

                    </div>

                </div>

            </div>

            <Reveal className="mt-10 text-center" y={14}>
                <Button asChild variant="link" style={{ fontFamily: "JetBrains Mono" }}>
                    <Link to="/kendo">Descubre mas sobre KENDO</Link>
                </Button>
            </Reveal>

        </section>
    );
}
