import { useParams, Link } from "react-router";
import { ArrowLeft, Calendar, MapPin, Award } from "lucide-react";
import { getMasterBySlug } from "./masterData";
import Reveal from "@/components/animation/Reveal";
import { Button } from "@/components/ui/button";

type MasterTone = {
    hero: string;
    badge: string;
    text: string;
    border: string;
    light: string;
    icon: string;
};

const tones: Record<string, MasterTone> = {
    red: {
        hero: "from-brand-vermilion/35 via-brand-sumi/85 to-brand-sumi",
        badge: "bg-brand-vermilion/15 text-brand-vermilion ring-1 ring-brand-vermilion/25",
        text: "text-brand-vermilion",
        border: "border-brand-vermilion/25",
        light: "bg-brand-vermilion/5",
        icon: "bg-brand-vermilion/10",
    },
    blue: {
        hero: "from-brand-indigo/45 via-brand-sumi/85 to-brand-sumi",
        badge: "bg-brand-indigo/15 text-brand-indigo ring-1 ring-brand-indigo/25",
        text: "text-brand-indigo",
        border: "border-brand-indigo/25",
        light: "bg-brand-indigo/5",
        icon: "bg-brand-indigo/10",
    },
    yellow: {
        hero: "from-brand-gold/30 via-brand-sumi/85 to-brand-sumi",
        badge: "bg-brand-gold/15 text-brand-gold-deep ring-1 ring-brand-gold/30",
        text: "text-brand-gold-deep",
        border: "border-brand-gold/30",
        light: "bg-brand-gold/5",
        icon: "bg-brand-gold/15",
    },
};

export default function MasterInfo() {
    const { slug } = useParams<{ slug: string }>();
    const master = getMasterBySlug(slug ?? "");

    if (!master) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center py-20">
                <div className="glass mx-4 max-w-md rounded-3xl px-8 py-12 text-center">
                    <h1 className="font-serif text-3xl font-semibold text-brand-ink">
                        Maestro no encontrado
                    </h1>
                    <p className="mt-3 text-brand-muted">No se encontró información para este maestro.</p>
                    <Button asChild variant="brand" className="mt-8 rounded-full">
                        <Link to="/">
                            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                            Volver al inicio
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    const tone = tones[master.color] ?? tones.red;

    return (
        <div className="min-h-screen">

            <section className={`relative overflow-hidden bg-linear-to-br ${tone.hero} text-white`}>
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-wood-dark opacity-30" />

                <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

                    <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">

                        <div className="flex flex-col items-start gap-6 sm:flex-row">

                            <Reveal y={20}>
                                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border border-white/25 bg-white/10 p-1 backdrop-blur-md shadow-lift sm:h-28 sm:w-28">
                                    <div className="h-full w-full overflow-hidden rounded-full">
                                        {master.image ? (
                                            <img
                                                src={master.image}
                                                alt={master.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <span className="flex h-full w-full items-center justify-center font-serif text-4xl font-semibold text-white">
                                                {master.initials}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Reveal>

                            <Reveal y={18} delay={0.1}>
                                <div>
                                    <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-md">
                                        {master.art}
                                    </span>
                                    <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                                        {master.name}
                                    </h1>
                                    <p className="mt-2 text-base text-white/75 sm:text-lg">{master.subtitle}</p>

                                    <div className="mt-5 flex flex-wrap gap-5 text-sm text-white/70">
                                        {master.birthYear && (
                                            <span className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4" aria-hidden="true" />
                                                {master.birthYear} - {master.deathYear}
                                            </span>
                                        )}
                                        {master.birthPlace && (
                                            <span className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4" aria-hidden="true" />
                                                {master.birthPlace}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        <Reveal y={16} delay={0.15}>
                            <Button
                                asChild
                                variant="glass"
                                className="rounded-full border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                            >
                                <Link to="/">
                                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                                    Volver al inicio
                                </Link>
                            </Button>
                        </Reveal>

                    </div>

                </div>
            </section>

            <section className="py-12 sm:py-16">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

                    <Reveal className="mb-10" y={16}>
                        <div className={`mx-auto max-w-4xl rounded-3xl border-l-4 ${tone.border} ${tone.light} p-6 sm:p-8`}>
                            <p className="text-measure font-serif text-lg leading-relaxed text-brand-ink/90 italic">
                                {master.intro}
                            </p>
                        </div>
                    </Reveal>

                    <div className="space-y-6">
                        {master.sections.map((section, index) => (
                            <Reveal key={section.title} y={16} delay={index * 0.05}>
                                <article className="glass rounded-3xl p-6 sm:p-8">
                                    <div className="flex items-center gap-3">
                                        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${tone.icon}`}>
                                            <Award className={`h-5 w-5 ${tone.text}`} aria-hidden="true" />
                                        </div>
                                        <h2 className="font-serif text-2xl font-semibold text-brand-ink">
                                            {section.title}
                                        </h2>
                                    </div>
                                    <div className="mt-5 space-y-4">
                                        {section.content.map((paragraph, pIndex) => (
                                            <p key={pIndex} className="text-measure leading-relaxed text-brand-muted">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </article>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal className="mt-8" y={16}>
                        <div className="relative overflow-hidden rounded-3xl bg-brand-sumi p-7 text-brand-washi sm:p-9">
                            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-wood-dark opacity-30" />
                            <div className="relative">
                                <span className="section-eyebrow text-brand-gold">Legado</span>
                                <h3 className="mt-3 font-serif text-2xl font-semibold text-white">
                                    Una herencia viva
                                </h3>
                                <p className="text-measure mt-4 text-base leading-relaxed text-brand-washi/80 sm:text-lg">
                                    {master.legacy}
                                </p>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal className="mt-10 text-center" y={12}>
                        <Button asChild variant="glass" size="lg" className="rounded-full">
                            <Link to="/#masters">
                                Volver a Grandes Maestros
                            </Link>
                        </Button>
                    </Reveal>

                </div>
            </section>

        </div>
    );
}
