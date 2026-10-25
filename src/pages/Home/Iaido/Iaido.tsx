import { CardComponent, CardComponentProps } from "@/components/card/CardComponent";
import Reveal from "@/components/animation/Reveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export default function Iaido() {

    const cardsIaido: CardComponentProps[] = [
        {
            title: "Iaito (Espada)",
            description: "Espada sin filo para práctica segura",
            icon: "居",
            bgIcon: "bg-linear-to-br from-brand-ink to-brand-sumi",
            bg: "bg-linear-to-br from-gray-100 to-gray-200",
            border: "border-brand-ink/20",
        },
        {
            title: "Kata (Formas)",
            description: "Secuencias de desenvaine y corte",
            icon: "型",
            bgIcon: "bg-linear-to-br from-brand-indigo to-brand-sumi",
            bg: "bg-linear-to-br from-indigo-50 to-indigo-100",
            border: "border-brand-indigo/25",
        },
    ];

    return (
        <section id="iaido" aria-labelledby="iaido-title" className="relative scroll-mt-32 overflow-hidden bg-brand-washi-deep py-20 sm:py-24">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-wood opacity-40" />


            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">

                <div className="flex flex-col items-start gap-10 lg:flex-row-reverse lg:gap-14">

                    <div className="order-1 w-full lg:order-2 lg:w-1/2">
                        <Reveal className="space-y-6" y={24}>

                            <div className="flex items-center gap-3">
                                <div className="h-11 w-11 lg:hidden">
                                    <img src="/kendoiaido.jpg" alt="Practica de Iaido" className="rounded-full" />
                                </div>
                                <span className="section-eyebrow text-brand-gold-deep">El camino de la presencia</span>
                            </div>

                            <h2 id="iaido-title" className="text-right text-3xl font-semibold leading-tight text-brand-ink sm:text-4xl lg:text-5xl">
                                Iaido <span className="text-brand-indigo">居合道</span>
                            </h2>

                            <p className="text-measure ml-auto text-left text-base leading-relaxed text-brand-muted sm:text-lg">
                                "El camino de la presencia mental". Arte del desenvaine rápido y preciso,
                                donde el practicante perfecciona la extracción de la katana, el corte y
                                el envaine en movimientos fluidos. El Iaido desarrolla la concentración,
                                la disciplina mental y la armonía entre cuerpo y mente.
                            </p>

                            <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                                {cardsIaido.map((card, index) => (
                                    <Reveal key={card.title} delay={index * 0.08} y={16}>
                                        <CardComponent card={card} />
                                    </Reveal>
                                ))}
                            </div>

                            <div className="mx-auto hidden h-40 w-40 lg:block">
                                <img src="/kendoiaido.jpg" alt="Emblema de Iaido" className="rounded-full ring-1 ring-brand-indigo/25" />
                            </div>

                        </Reveal>
                    </div>

                    <div className="order-2 w-full space-y-6 lg:order-1 lg:w-1/2">

                        <Reveal className="glass group rounded-3xl p-2" y={20}>
                            <div className="relative overflow-hidden rounded-2xl">
                                <img
                                    src="/Hiramatsukai.jpg"
                                    alt="Práctica de Iaido"
                                    loading="lazy"
                                    className="h-80 w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 lg:h-72"
                                />
                                <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-brand-sumi/80 via-brand-sumi/10 to-transparent" />
                                <div className="absolute left-4 top-4 rounded-full bg-brand-indigo px-3 py-1 text-xs font-semibold text-white shadow-soft">
                                    Iaido · 居合道
                                </div>
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h3 className="font-serif text-lg font-semibold">Arte del Desenvaine</h3>
                                    <p className="text-sm text-white/75">Katana tradicional</p>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal className="glass group rounded-3xl p-2" y={20} delay={0.12}>
                            <div className="relative overflow-hidden rounded-2xl">
                                <img
                                    src="/Hiramatsukai.jpg"
                                    alt="Práctica de Iaido"
                                    loading="lazy"
                                    className="h-80 w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 lg:h-72"
                                />
                                <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-brand-sumi/80 via-brand-sumi/10 to-transparent" />
                                <div className="absolute left-4 top-4 rounded-full bg-brand-indigo px-3 py-1 text-xs font-semibold text-white shadow-soft">
                                    Iaido · 居合道
                                </div>
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h3 className="font-serif text-lg font-semibold">Meditación en Movimiento</h3>
                                    <p className="text-sm text-white/75">Zanshin · Conciencia alerta</p>
                                </div>
                            </div>
                        </Reveal>

                    </div>

                </div>

            </div>

            <Reveal className="relative mt-10 text-center" y={14}>
                <Button asChild variant="link">
                    <Link to="/iaido">
                        Descubre más sobre el Iaido
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                </Button>
            </Reveal>

        </section>
    );
}
