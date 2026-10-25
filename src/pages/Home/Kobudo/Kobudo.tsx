import { CardComponent, CardComponentProps } from "@/components/card/CardComponent";
import Reveal from "@/components/animation/Reveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export default function Kobudo() {

    const cardsKobudo: CardComponentProps[] = [
        {
            title: "Bo (Bastón)",
            description: 'Arma de 1.8m, base del kobudo tradicional',
            icon: "棒",
            bgIcon: "bg-linear-to-br from-brand-gold to-brand-gold-deep",
            bg: "bg-linear-to-br from-yellow-50 to-yellow-100",
            border: "border-brand-gold/40",
        },
        {
            title: "Sai (Tridente)",
            description: 'Arma de metal para defensa y ataque',
            icon: "釵",
            bgIcon: "bg-linear-to-br from-brand-indigo to-brand-sumi",
            bg: "bg-linear-to-br from-blue-50 to-blue-100",
            border: "border-brand-indigo/25",
        },
        {
            title: "Tonfa",
            description: "Originalmente mango de molino, ahora arma policial",
            icon: "トンファー",
            bgIcon: "bg-linear-to-br from-brand-vermilion to-brand-vermilion-dark",
            bg: "bg-linear-to-br from-red-50 to-red-100",
            border: "border-brand-vermilion/25",
        },
        {
            title: "Nunchaku",
            description: "Dos palos de madera unidos por una cadena o cuerda",
            icon: "ヌンチャク",
            bgIcon: "bg-linear-to-br from-purple-600 to-purple-800",
            bg: "bg-linear-to-br from-purple-100 to-purple-300",
            border: "border-purple-300/40",
        }
    ];

    return (
        <section
            id="kobudo"
            aria-labelledby="kobudo-title"
            className="relative scroll-mt-32 overflow-hidden bg-brand-sumi py-20 sm:py-24"
        >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-wood-dark opacity-40" />
            <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-brand-gold/10 blur-[100px]" />


            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">

                <div className="flex flex-col items-start gap-10 lg:flex-row-reverse lg:gap-14">

                    <div className="order-2 w-full space-y-6 lg:order-1 lg:w-1/2">

                        <Reveal className="glass-dark group rounded-3xl p-2" y={20}>
                            <div className="relative overflow-hidden rounded-2xl">
                                <img
                                    src="/Hiramatsukai.jpg"
                                    alt="Práctica de Kobudo"
                                    loading="lazy"
                                    className="h-80 w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 lg:h-80"
                                />
                                <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-brand-sumi/80 via-transparent to-transparent" />
                                <div className="absolute left-4 top-4 rounded-full bg-brand-gold px-3 py-1 text-xs font-semibold text-brand-sumi shadow-soft">
                                    Kobudo Okinawense
                                </div>
                            </div>
                        </Reveal>

                        <Reveal className="glass-dark group rounded-3xl p-2" y={20} delay={0.12}>
                            <div className="relative overflow-hidden rounded-2xl">
                                <img
                                    src="/Hiramatsukai.jpg"
                                    alt="Práctica de Kobudo"
                                    loading="lazy"
                                    className="h-80 w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 lg:h-80"
                                />
                                <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-brand-sumi/80 via-transparent to-transparent" />
                                <div className="absolute left-4 top-4 rounded-full bg-brand-gold px-3 py-1 text-xs font-semibold text-brand-sumi shadow-soft">
                                    Kobudo Okinawense
                                </div>
                            </div>
                        </Reveal>

                    </div>

                    <Reveal className="order-1 w-full space-y-6 lg:order-2 lg:w-1/2" y={24}>

                        <div className="flex items-center gap-3">
                            <div className="h-11 w-11 lg:hidden">
                                <img src="/gi.jpg" alt="Karategi para practica de Kobudo" className="rounded-full" />
                            </div>
                            <span className="section-eyebrow text-brand-gold">Armas de Okinawa</span>
                        </div>

                        <h2 id="kobudo-title" className="text-right text-3xl font-semibold leading-tight text-brand-washi sm:text-4xl lg:text-5xl">
                            Kobudo <span className="text-brand-gold">Okinawense</span>
                        </h2>

                        <p className="text-measure ml-auto text-left text-base leading-relaxed text-brand-washi/75 sm:text-lg">
                            Arte marcial de Okinawa que enseña el manejo de armas.
                            Desarrollado por los campesinos y pescadores okinawenses como método de defensa personal.
                        </p>

                        <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                            {cardsKobudo.map((card, index) => (
                                <Reveal key={card.title} delay={index * 0.08} y={16}>
                                    <CardComponent card={card} />
                                </Reveal>
                            ))}
                        </div>

                        <div className="mx-auto hidden h-36 w-36 lg:block">
                            <img src="/gi.jpg" alt="Karategi para entrenamiento tradicional" className="rounded-full ring-1 ring-white/15" />
                        </div>
                    </Reveal>
                </div>

                <Reveal className="mt-10 text-center" y={14}>
                    <Button asChild variant="link" className="text-brand-gold hover:text-white">
                        <Link to="/kobudo">
                            Descubre más sobre el Kobudo
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </Button>
                </Reveal>

            </div>
        </section>
    );
}
