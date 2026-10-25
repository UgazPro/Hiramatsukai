import { CardComponent, CardComponentProps } from "@/components/card/CardComponent";
import Reveal from "@/components/animation/Reveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export default function Kendo() {

    const cardsKendo: CardComponentProps[] = [
        {
            title: "Kumite (Combate)",
            description: "Combate con shinai y armadura tradicional",
            icon: "剣",
            bgIcon: "bg-linear-to-br from-brand-vermilion to-brand-vermilion-dark",
            bg: "bg-linear-to-br from-red-50 to-red-100",
            border: "border-brand-vermilion/25",
        },
        {
            title: "Kata (Formas)",
            description: "Formas con bokuto y shinai",
            icon: "型",
            bgIcon: "bg-linear-to-br from-brand-indigo to-brand-sumi",
            bg: "bg-linear-to-br from-blue-50 to-blue-100",
            border: "border-brand-indigo/25",
        },
    ];

    return (
        <section id="kendo" aria-labelledby="kendo-title" className="relative scroll-mt-32 overflow-hidden bg-brand-washi py-20 sm:py-24">

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">

                <div className="flex flex-col items-start gap-10 lg:flex-row lg:gap-14">

                    <div className="order-1 w-full lg:order-2 lg:w-1/2">
                        <Reveal className="space-y-6" y={24}>

                            <div className="flex items-center gap-3">
                                <div className="h-11 w-11 lg:hidden">
                                    <img src="/kendoiaido.jpg" alt="Practica de Kendo" className="rounded-full" />
                                </div>
                                <span className="section-eyebrow text-brand-gold-deep">Esgrima japonesa</span>
                            </div>

                            <h2 id="kendo-title" className="text-3xl font-semibold leading-tight text-brand-ink sm:text-4xl lg:text-5xl">
                                Kendo <span className="text-brand-vermilion">剣道</span>
                            </h2>

                            <p className="text-measure text-base leading-relaxed text-brand-muted sm:text-lg">
                                "El camino de la espada". Arte marcial moderno derivado de las técnicas de combate
                                de los samuráis japoneses. El Kendo desarrolla el espíritu, la disciplina y
                                la habilidad de combate a través del uso del shinai (espada de bambú) y la armadura tradicional (bogu).
                            </p>

                            <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                                {cardsKendo.map((card, index) => (
                                    <Reveal key={card.title} delay={index * 0.08} y={16}>
                                        <CardComponent card={card} />
                                    </Reveal>
                                ))}
                            </div>

                            <div className="mx-auto hidden h-40 w-40 lg:block">
                                <img src="/kendoiaido.jpg" alt="Emblema de Kendo" className="rounded-full ring-1 ring-brand-gold/30" />
                            </div>

                        </Reveal>
                    </div>

                    <div className="order-2 w-full space-y-6 lg:order-1 lg:w-1/2">

                        <Reveal className="glass group rounded-3xl p-2" y={20}>
                            <div className="relative overflow-hidden rounded-2xl">
                                <img
                                    src="/Hiramatsukai.jpg"
                                    alt="Práctica de Kendo"
                                    loading="lazy"
                                    className="h-80 w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 lg:h-80"
                                />
                                <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-brand-sumi/80 via-brand-sumi/10 to-transparent" />
                                <div className="absolute left-4 top-4 rounded-full bg-brand-vermilion px-3 py-1 text-xs font-semibold text-white shadow-soft">
                                    Kendo · 剣道
                                </div>
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h3 className="font-serif text-lg font-semibold">Combate con Shinai</h3>
                                    <p className="text-sm text-white/75">Armadura tradicional (Bogu)</p>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal className="glass group rounded-3xl p-2" y={20} delay={0.12}>
                            <div className="relative overflow-hidden rounded-2xl">
                                <img
                                    src="/Hiramatsukai.jpg"
                                    alt="Práctica de Kendo"
                                    loading="lazy"
                                    className="h-80 w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 lg:h-80"
                                />
                                <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-brand-sumi/80 via-brand-sumi/10 to-transparent" />
                                <div className="absolute left-4 top-4 rounded-full bg-brand-vermilion px-3 py-1 text-xs font-semibold text-white shadow-soft">
                                    Kendo · 剣道
                                </div>
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h3 className="font-serif text-lg font-semibold">Ki-Ken-Tai Ichi</h3>
                                    <p className="text-sm text-white/75">Unidad de espíritu, espada y cuerpo</p>
                                </div>
                            </div>
                        </Reveal>

                    </div>

                </div>

            </div>

            <Reveal className="relative mt-10 text-center" y={14}>
                <Button asChild variant="link">
                    <Link to="/kendo">
                        Descubre más sobre el Kendo
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                </Button>
            </Reveal>

        </section>
    );
}
