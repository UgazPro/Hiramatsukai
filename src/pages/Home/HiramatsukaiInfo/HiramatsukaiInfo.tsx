import Reveal from "@/components/animation/Reveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function HiramatsukaiInfo() {

    const logos = [
        { src: "/karate-icono.png", alt: "Hiramatsukai Karatedo", label: "Karatedo" },
        { src: "/kobudo-icono.png", alt: "Hiramatsukai Kobudo", label: "Kobudo" },
        { src: "/kendo-iaido-icono.png", alt: "Hiramatsukai Kendo Iaido", label: "Kendo Iaido" },
    ];

    return (
        <section id="hiramatsukai" aria-labelledby="hiramatsukai-title" className="py-16 sm:py-20 bg-muted">
            <div className="px-4 sm:px-8 lg:px-16">

                <div className="max-w-6xl mx-auto">

                    <Reveal className="mb-12" y={18}>
                        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

                            <div className="flex-1 text-center lg:text-left">
                                <h2 id="hiramatsukai-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Kavoon" }}>
                                    Hiramatsukai <span className="text-red-600">Internacional</span>
                                </h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Fundada en 1997 en Okinawa, Japón, Hiramatsukai se ha dedicado a preservar y transmitir
                                    las artes marciales tradicionales en su forma más pura.
                                </p>
                            </div>

                            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 shrink-0">
                                {logos.map((logo, index) => (
                                    <div
                                        key={index}
                                        className="group flex flex-col items-center"
                                    >
                                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-white shadow-md group-hover:shadow-lg transition-shadow duration-300 flex items-center justify-center p-2 border border-gray-100">
                                            <img
                                                src={logo.src}
                                                alt={logo.alt}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <span className="mt-2 text-xs sm:text-sm font-bold text-gray-700" style={{ fontFamily: "Kavoon" }}>
                                            {logo.label}
                                        </span>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </Reveal>

                    <Reveal className="text-center" y={12}>
                        <Button asChild variant="link" style={{ fontFamily: "JetBrains Mono" }}>
                            <Link to="/nosotros">Descubre mas sobre la HIRAMATSUKAI</Link>
                        </Button>
                    </Reveal>

                </div>

            </div>
        </section>
    );
}
