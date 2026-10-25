import Reveal from "@/components/animation/Reveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export default function HiramatsukaiInfo() {

    const logos = [
        { src: "/karate-icono.png", alt: "Hiramatsukai Karatedo", label: "Karatedo" },
        { src: "/kobudo-icono.png", alt: "Hiramatsukai Kobudo", label: "Kobudo" },
        { src: "/kendo-iaido-icono.png", alt: "Hiramatsukai Kendo Iaido", label: "Kendo Iaido" },
    ];

    return (
        <section
            id="hiramatsukai"
            aria-labelledby="hiramatsukai-title"
            className="relative scroll-mt-32 overflow-hidden bg-brand-washi-deep py-24 lg:py-28"
        >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-wood opacity-45" />

            <div className="relative px-4 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-7xl">

                    <Reveal y={18}>
                        <div className="glass grid items-center gap-10 rounded-[2rem] p-7 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:p-14">

                            <div className="text-center lg:text-left">
                                <span className="section-eyebrow text-brand-gold-deep">La organización</span>
                                <h2
                                    id="hiramatsukai-title"
                                    className="mt-4 text-balance text-3xl font-semibold leading-[1.1] text-brand-ink sm:text-4xl lg:text-6xl"
                                >
                                    Hiramatsukai <span className="text-brand-vermilion">Internacional</span>
                                </h2>
                                <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-brand-muted sm:text-lg lg:mx-0">
                                    Fundada en 1997 en Okinawa, Japón, Hiramatsukai se ha dedicado a preservar y transmitir
                                    las artes marciales tradicionales en su forma más pura.
                                </p>

                                <div aria-hidden="true" className="gold-rule mt-7 h-px w-32 lg:mx-0 mx-auto" />
                            </div>

                            <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
                                {logos.map((logo) => (
                                    <div
                                        key={logo.label}
                                        className="group flex w-28 flex-col items-center gap-3 rounded-2xl border border-brand-ink/8 bg-white/60 p-4 shadow-soft backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-gold/40 hover:bg-white/90 hover:shadow-lift sm:w-32"
                                    >
                                        <div className="h-18 w-18 overflow-hidden rounded-full bg-white/80 p-2 ring-1 ring-brand-gold/35 transition-all duration-500 group-hover:scale-105 group-hover:ring-brand-gold sm:h-20 sm:w-20">
                                            <img
                                                src={logo.src}
                                                alt={logo.alt}
                                                loading="lazy"
                                                className="h-full w-full object-contain"
                                            />
                                        </div>
                                        <span className="text-center font-serif text-xs font-semibold text-brand-ink sm:text-sm">
                                            {logo.label}
                                        </span>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </Reveal>

                    <Reveal className="mt-8 text-center" y={12}>
                        <Button asChild variant="glass" size="lg" className="rounded-full">
                            <Link to="/nosotros">
                                Descubre más sobre Hiramatsukai
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                        </Button>
                    </Reveal>

                </div>
            </div>
        </section>
    );
}
