import Reveal from "@/components/animation/Reveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";

type MasterColor = "red" | "blue" | "yellow";

const masterPalettes: Record<MasterColor, { badge: string; text: string; border: string; hover: string }> = {
    red: {
        badge: "bg-brand-vermilion/90",
        text: "text-brand-vermilion",
        border: "border-brand-vermilion/40",
        hover: "hover:bg-brand-vermilion hover:text-white hover:border-brand-vermilion",
    },
    blue: {
        badge: "bg-brand-indigo/90",
        text: "text-brand-indigo",
        border: "border-brand-indigo/35",
        hover: "hover:bg-brand-indigo hover:text-white hover:border-brand-indigo",
    },
    yellow: {
        badge: "bg-brand-gold-deep/90",
        text: "text-brand-gold-deep",
        border: "border-brand-gold/50",
        hover: "hover:bg-brand-gold-deep hover:text-white hover:border-brand-gold-deep",
    },
};

export default function GreatMasters() {

    const masters: {
        name: string;
        art: string;
        initials: string;
        image: string;
        description: string;
        link: string;
        color: MasterColor;
    }[] = [
        {
            name: "Hiramatsu Taishihan",
            art: "Karatedo",
            initials: "平",
            image: "/gijinhiramatsu.jpg",
            description: "Maestro que forjó las bases de la organización Hiramatsukai",
            link: "/maestro/hiramatsu",
            color: "red",
        },
        {
            name: "Chōjun Miyagi Sensei",
            art: "Goju-Ryu Karate-Do",
            initials: "宮",
            image: "/chojunmiyagi.jpg",
            description: "Creador del estilo Goju-Ryu, síntesis del estilo duro-suave",
            link: "/maestro/miyagi",
            color: "blue",
        },
        {
            name: "Kanken Toyama Sensei",
            art: "Kobudo",
            initials: "外",
            image: "/kankentoyama.jpg",
            description: "Maestro dedicado a la enseñanza del karatedo",
            link: "/maestro/toyama",
            color: "yellow",
        },
    ];

    return (
        <section id="masters" aria-labelledby="masters-title" className="relative scroll-mt-32 overflow-hidden bg-brand-washi py-24 lg:py-28">
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">

                <Reveal className="mx-auto mb-14 max-w-2xl text-center" y={18}>
                    <span className="section-eyebrow text-brand-gold-deep">Linaje</span>
                    <h2 id="masters-title" className="mt-4 text-balance text-3xl font-semibold text-brand-ink sm:text-4xl lg:text-6xl">
                        Grandes <span className="text-brand-vermilion">Maestros</span>
                    </h2>
                    <p className="text-measure mx-auto mt-5 text-base leading-relaxed text-brand-muted sm:text-lg">
                        Los pilares que forjaron el camino de las artes marciales en nuestra organización
                    </p>
                </Reveal>

                <div className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
                    {masters.map((master, index) => {
                        const palette = masterPalettes[master.color];

                        return (
                            <Reveal key={master.name} delay={index * 0.1} y={20} className="h-full">
                                <article className="glass group flex h-full flex-col overflow-hidden rounded-[2rem] transition-all duration-500 hover:-translate-y-2 hover:border-brand-gold/30 hover:shadow-lift">

                                    <div className="relative h-72 overflow-hidden sm:h-80 lg:h-96">
                                        {master.image ? (
                                            <img
                                                src={master.image}
                                                alt={master.name}
                                                loading="lazy"
                                                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-brand-ink to-brand-sumi">
                                                <span className="font-serif text-5xl font-bold text-white/90">
                                                    {master.initials}
                                                </span>
                                            </div>
                                        )}
                                        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-brand-sumi/80 via-brand-sumi/10 to-transparent" />
                                        <div className={`absolute right-4 top-4 rounded-full border border-white/25 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md ${palette.badge}`}>
                                            {master.art}
                                        </div>
                                    </div>

                                    <div className="flex flex-1 flex-col p-6">
                                        <h3 className="font-serif text-xl font-semibold text-brand-ink">
                                            {master.name}
                                        </h3>
                                        <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-muted">
                                            {master.description}
                                        </p>

                                        <Button
                                            asChild
                                            variant="outline"
                                            className={`mt-6 w-full rounded-full border bg-transparent transition-colors duration-300 ${palette.border} ${palette.text} ${palette.hover}`}
                                        >
                                            <Link to={master.link} className="group/btn">
                                                Ver biografía
                                                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" aria-hidden="true" />
                                            </Link>
                                        </Button>
                                    </div>

                                </article>
                            </Reveal>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
