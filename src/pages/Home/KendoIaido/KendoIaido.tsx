import { CardComponent, CardComponentProps } from "@/components/card/CardComponent";
import Reveal from "@/components/animation/Reveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export default function KendoIaido() {

    const cardsKendoIaido: CardComponentProps[] = [
        {
            title: "Kendo",
            description: '"El camino de la espada" - Combate con shinai',
            icon: "剣",
            bgIcon: "bg-linear-to-br from-brand-indigo to-brand-indigo/80",
            bg: "bg-linear-to-br from-blue-50 to-blue-100",
            border: "border-brand-indigo/25",
        },
        {
            title: "Iaido",
            description: '"Arte del desenvaine" - Katana tradicional',
            icon: "居",
            bgIcon: "bg-linear-to-br from-brand-ink to-brand-sumi",
            bg: "bg-linear-to-br from-gray-100 to-gray-200",
            border: "border-brand-ink/20",
        },
        {
            title: "Bushido",
            description: "Código del samurái - Honor y disciplina",
            icon: "道",
            bgIcon: "bg-linear-to-br from-indigo-500 to-indigo-700",
            bg: "bg-linear-to-br from-indigo-50 to-indigo-100",
            border: "border-indigo-300/40",
        },
        {
            title: "Bogu",
            description: "Armadura tradicional - Protección y etiqueta",
            icon: "具",
            bgIcon: "bg-linear-to-br from-slate-600 to-slate-800",
            bg: "bg-linear-to-br from-slate-50 to-slate-100",
            border: "border-slate-300/50",
        }
    ];

    return (

        <section id="kendoIaido" aria-labelledby="kendoiaido-title" className="relative scroll-mt-32 overflow-hidden bg-brand-washi py-20 sm:py-24">


            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">

                <div className="flex flex-col items-start gap-10 lg:flex-row lg:gap-14">

                    <div className="order-1 w-full lg:order-2 lg:w-1/2">
                        <Reveal className="space-y-6" y={24}>

                            <div className="flex items-center gap-3">
                                <div className="h-11 w-11 lg:hidden">
                                    <img src="/kendoiaido.jpg" alt="Practica de Kendo e Iaido" className="rounded-full" />
                                </div>
                                <span className="section-eyebrow text-brand-gold-deep">La espada japonesa</span>
                            </div>

                            <h2 id="kendoiaido-title" className="text-3xl font-semibold leading-tight text-brand-ink sm:text-4xl lg:text-5xl">
                                Kendo <span className="text-brand-gold-deep">&</span> Iaido
                            </h2>

                            <p className="text-measure text-base leading-relaxed text-brand-muted sm:text-lg">
                                El camino de la espada japonesa. Dos artes marciales tradicionales que representan
                                <span className="font-semibold text-brand-indigo"> el espíritu del samurái</span>.
                                Mientras el Kendo se enfoca en el combate, el Iaido perfecciona el arte del desenvaine.
                            </p>

                            <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                                {cardsKendoIaido.map((card, index) => (
                                    <Reveal key={card.title} delay={index * 0.08} y={16}>
                                        <CardComponent card={card} />
                                    </Reveal>
                                ))}
                            </div>

                            <div className="mx-auto hidden h-40 w-40 lg:block">
                                <img src="/kendoiaido.jpg" alt="Emblema de entrenamiento de espada japonesa" className="rounded-full ring-1 ring-brand-gold/30" />
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
                                <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-brand-indigo/80 via-brand-indigo/10 to-transparent" />
                                <div className="absolute left-4 top-4 rounded-full bg-brand-indigo px-3 py-1 text-xs font-semibold text-white shadow-soft">
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
                                    alt="Práctica de Iaido"
                                    loading="lazy"
                                    className="h-80 w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 lg:h-80"
                                />
                                <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-brand-sumi/80 via-brand-sumi/10 to-transparent" />
                                <div className="absolute left-4 top-4 rounded-full bg-brand-ink px-3 py-1 text-xs font-semibold text-white shadow-soft">
                                    Iaido · 居合道
                                </div>
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h3 className="font-serif text-lg font-semibold">Arte del Desenvaine</h3>
                                    <p className="text-sm text-white/75">Katana tradicional</p>
                                </div>
                            </div>
                        </Reveal>

                    </div>

                </div>

            </div>

            <Reveal className="relative mt-10 text-center" y={14}>
                <Button asChild variant="link">
                    <Link to="/kendoIaido">
                        Descubre más sobre Kendo Iaido
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                </Button>
            </Reveal>

        </section>
    );
}
