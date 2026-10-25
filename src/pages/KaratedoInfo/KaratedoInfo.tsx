import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Target, Users, Award, BookOpen, Shield, Activity, Brain, Heart, Zap, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { ProgressStepper } from "@/components/progressStepper/Progress-stepper";
import { karatedoInfoData, katas, ProgressSteps, progressData } from "./KaratedoInfo.data";
import { AnimatePresence, motion } from "motion/react";

type SectionId = "fundamentos" | "katas" | "beneficios" | "filosofia";

const TAB_SECTIONS: { id: SectionId; label: string; icon: typeof BookOpen }[] = [
    { id: "fundamentos", label: "Fundamentos", icon: BookOpen },
    { id: "katas", label: "Katas", icon: Target },
    { id: "beneficios", label: "Beneficios", icon: Award },
    { id: "filosofia", label: "Filosofía", icon: Brain },
];

type PrincipleTone = "red" | "blue" | "yellow";

const principleTones: Record<PrincipleTone, { card: string; icon: string; text: string; dot: string }> = {
    red: {
        card: "border-brand-vermilion/20 bg-brand-vermilion/5",
        icon: "bg-brand-vermilion/10",
        text: "text-brand-vermilion",
        dot: "bg-brand-vermilion",
    },
    blue: {
        card: "border-brand-indigo/20 bg-brand-indigo/5",
        icon: "bg-brand-indigo/10",
        text: "text-brand-indigo",
        dot: "bg-brand-indigo",
    },
    yellow: {
        card: "border-brand-gold/30 bg-brand-gold/10",
        icon: "bg-brand-gold/15",
        text: "text-brand-gold-deep",
        dot: "bg-brand-gold-deep",
    },
};

export default function KaratedoInfo() {

    const [activeSection, setActiveSection] = useState<SectionId>("fundamentos");
    const [activeHistory, setActiveHistory] = useState<ProgressSteps>("nahate");
    const [mobileOpenHistory, setMobileOpenHistory] = useState<ProgressSteps | null>("nahate");

    const activeHistoryIndex = useMemo(
        () => progressData.findIndex((step) => step.name === activeHistory),
        [activeHistory],
    );

    const activeHistoryEntry = useMemo(
        () => karatedoInfoData.find((info) => info.name === activeHistory),
        [activeHistory],
    );

    const goToPreviousHistory = () => {
        if (activeHistoryIndex <= 0) return;
        const previousStepName = progressData[activeHistoryIndex - 1].name;
        setActiveHistory(previousStepName);
        setMobileOpenHistory(previousStepName);
    };

    const goToNextHistory = () => {
        if (activeHistoryIndex === -1 || activeHistoryIndex >= progressData.length - 1) return;
        const nextStepName = progressData[activeHistoryIndex + 1].name;
        setActiveHistory(nextStepName);
        setMobileOpenHistory(nextStepName);
    };

    const principles: {
        title: string;
        description: string;
        icon: typeof Shield;
        color: PrincipleTone;
        examples: string[];
    }[] = [
        {
            title: "Go (Dureza)",
            description: "Técnicas lineales y poderosas",
            icon: Shield,
            color: "red",
            examples: ["Tsuki directos", "Patadas frontales", "Bloqueos firmes"]
        },
        {
            title: "Ju (Suavidad)",
            description: "Movimientos circulares y evasivos",
            icon: Zap,
            color: "blue",
            examples: ["Desvíos circulares", "Proyecciones", "Controles articulares"]
        },
        {
            title: "Kokyu (Respiración)",
            description: "Control del ki a través de la respiración",
            icon: Activity,
            color: "yellow",
            examples: ["Respiración profunda (ibuki)", "Kiai controlado", "Meditación en movimiento"]
        }
    ];

    const benefits = [
        { icon: Heart, title: "Salud Cardiovascular", description: "Mejora la resistencia y capacidad pulmonar" },
        { icon: Shield, title: "Autodefensa", description: "Técnicas prácticas para situaciones reales" },
        { icon: Brain, title: "Concentración", description: "Desarrollo de enfoque mental y disciplina" },
        { icon: Users, title: "Confianza", description: "Aumento de la autoestima y seguridad personal" }
    ];

    return (

        <div className="min-h-screen bg-brand-washi">

            {/* Main grid about Goju Ryu Karatedo */}
            <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[url('/background-karate.png')] bg-[length:520px] bg-repeat opacity-[0.06]" />

                <div className="relative mx-auto px-4">
                    <div className="mx-auto max-w-5xl text-center">
                        <div>
                            <span className="section-eyebrow rounded-full border border-brand-vermilion/25 bg-brand-vermilion/10 px-4 py-2 text-brand-vermilion">
                                Estilo Tradicional
                            </span>
                            <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight text-brand-ink md:text-5xl">
                                Goju-Ryu <span className="text-brand-vermilion">Karate-Do</span>
                            </h1>
                            <p className="text-measure mx-auto mt-6 text-base leading-relaxed text-brand-muted sm:text-lg">
                                Fundado por el gran maestro <strong className="font-semibold text-brand-ink">Chojun Miyagi</strong> (1888-1953),
                                el Goju-Ryu (estilo duro-suave) representa la síntesis perfecta entre
                                las artes marciales chinas y las técnicas indígenas de Okinawa.
                            </p>
                            <p className="text-measure mx-auto mt-4 text-base leading-relaxed text-brand-muted sm:text-lg">
                                En la organización Hiramatsukai, preservamos este legado enseñando el Goju-Ryu en su
                                forma más pura, manteniendo los katas originales y la filosofía del
                                fundador.
                            </p>
                            <Button size="lg" variant="brand" className="mt-8 rounded-full px-8">
                                Iniciar Entrenamiento
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="hidden w-full h-32 md:block">
                <ProgressStepper steps={progressData} onSelectStep={setActiveHistory} />
            </div>

            <div className="mx-auto hidden w-11/12 max-w-5xl rounded-3xl border border-brand-ink/8 bg-white/60 p-10 shadow-soft backdrop-blur-md md:block">
                {activeHistoryEntry?.content.map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-relaxed text-brand-muted last:mb-0">
                        {paragraph}
                    </p>
                ))}
            </div>

            {/* Timeline Mobile */}
            <section className="border-y border-brand-ink/10 bg-brand-washi-deep px-4 py-8 md:hidden">
                <div className="mx-auto max-w-xl">
                    <div className="mb-4 flex items-center justify-between gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={goToPreviousHistory}
                            disabled={activeHistoryIndex <= 0}
                            className="h-9 rounded-full border-brand-ink/15 px-3"
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" aria-hidden="true" />
                            Anterior
                        </Button>

                        <p className="section-eyebrow text-brand-muted">
                            Historia
                        </p>

                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={goToNextHistory}
                            disabled={activeHistoryIndex >= progressData.length - 1}
                            className="h-9 rounded-full border-brand-ink/15 px-3"
                        >
                            Siguiente
                            <ChevronRight className="h-4 w-4 ml-1" aria-hidden="true" />
                        </Button>
                    </div>

                    <div className="space-y-2">
                        {progressData.map((step) => {
                            const isActive = mobileOpenHistory === step.name;
                            const content = karatedoInfoData.find((info) => info.name === step.name)?.content ?? [];

                            return (
                                <div key={step.name} className={`overflow-hidden rounded-xl border bg-white/70 backdrop-blur-md transition-colors ${isActive ? "border-brand-vermilion/40" : "border-brand-ink/10"}`}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const nextOpen = isActive ? null : step.name;
                                            setMobileOpenHistory(nextOpen);
                                            setActiveHistory(step.name);
                                        }}
                                        aria-expanded={isActive}
                                        className={`flex w-full cursor-pointer items-center justify-between px-3 py-3 text-left transition-colors ${isActive ? "bg-brand-vermilion/5" : "bg-transparent hover:bg-brand-ink/5"}`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className={`text-xs ${isActive ? "text-brand-vermilion" : "text-brand-muted"}`}>({step.year})</span>
                                            <span className={`text-sm font-semibold ${isActive ? "text-brand-vermilion" : "text-brand-ink"}`}>{step.label}</span>
                                        </div>
                                        <ChevronDown className={`h-4 w-4 transition-transform ${isActive ? "rotate-180 text-brand-vermilion" : "text-brand-muted"}`} aria-hidden="true" />
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {isActive && (
                                            <motion.div
                                                key={`mobile-history-${step.name}`}
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.28, ease: "easeOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="space-y-2 px-3 pb-3 pt-1.5">
                                                    {content.map((paragraph, index) => (
                                                        <p key={index} className="text-sm leading-relaxed text-brand-muted">
                                                            {paragraph}
                                                        </p>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-5xl">
                        <div className="glass grid grid-cols-2 gap-2 rounded-3xl p-2 lg:flex lg:flex-wrap lg:justify-center">
                            {TAB_SECTIONS.map((section) => {
                                const Icon = section.icon;
                                const isActive = activeSection === section.id;
                                return (
                                    <motion.button
                                        key={section.id}
                                        type="button"
                                        initial={false}
                                        onClick={() => setActiveSection(section.id)}
                                        aria-pressed={isActive}
                                        className={`flex cursor-pointer items-center justify-center gap-2.5 rounded-2xl px-5 py-3.5 text-sm font-medium transition-all duration-300 lg:px-7 ${isActive
                                            ? 'bg-brand-vermilion text-white shadow-soft'
                                            : 'text-brand-muted hover:bg-white/60 hover:text-brand-ink'
                                            }`}
                                    >
                                        <Icon className="h-4 w-4" aria-hidden="true" />
                                        {section.label}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <AnimatePresence mode="wait" initial={false}>
                {activeSection === "fundamentos" && (
                    <motion.section
                        key="fundamentos"
                        className="py-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -14 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <div className="container mx-auto px-4">
                            <div>
                                <div className="mb-10 text-center">
                                    <span className="section-eyebrow text-brand-gold-deep">La esencia</span>
                                    <h2 className="mt-4 font-serif text-3xl font-semibold text-brand-ink sm:text-4xl">
                                        Principios <span className="text-brand-vermilion">Fundamentales</span>
                                    </h2>
                                    <p className="text-measure mx-auto mt-4 text-base text-brand-muted sm:text-lg">
                                        La esencia del Goju-Ryu reside en el equilibrio perfecto
                                    </p>
                                </div>

                                <div className="mb-8 grid gap-6 md:grid-cols-3">
                                    {principles.map((principle) => {
                                        const Icon = principle.icon;
                                        const tone = principleTones[principle.color];
                                        return (
                                            <div key={principle.title} className={`rounded-3xl border p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${tone.card}`}>
                                                <div className={`mb-6 inline-block rounded-2xl p-4 ${tone.icon}`}>
                                                    <Icon className={`h-8 w-8 ${tone.text}`} aria-hidden="true" />
                                                </div>
                                                <h3 className="font-serif text-2xl font-semibold text-brand-ink">{principle.title}</h3>
                                                <p className="mt-3 text-brand-muted">{principle.description}</p>
                                                <ul className="mt-6 space-y-2">
                                                    {principle.examples.map((example) => (
                                                        <li key={example} className="flex items-center text-sm text-brand-muted">
                                                            <span aria-hidden="true" className={`mr-3 h-1.5 w-1.5 rounded-full ${tone.dot}`} />
                                                            {example}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Técnicas básicas */}
                                <div className="glass rounded-3xl p-6 sm:p-8">
                                    <h3 className="mb-8 text-center font-serif text-2xl font-semibold text-brand-ink sm:text-3xl">
                                        Técnicas <span className="text-brand-vermilion">Esenciales</span>
                                    </h3>
                                    <div className="grid gap-8 md:grid-cols-2">
                                        <div>
                                            <h4 className="mb-4 font-serif text-xl font-semibold text-brand-ink">Kihon (Básicos)</h4>
                                            <div className="space-y-4">
                                                {[
                                                    "Dachi (Posturas): Sanchin, Zenkutsu, Shiko",
                                                    "Tsuki (Golpes): Seiken, Tate, Ura",
                                                    "Uke (Bloqueos): Age, Soto, Uchi, Gedan",
                                                    "Geri (Patadas): Mae, Yoko, Mawashi, Ushiro"
                                                ].map((item) => (
                                                    <div key={item} className="flex items-start">
                                                        <span aria-hidden="true" className="mt-2 mr-3 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-vermilion" />
                                                        <span className="text-sm leading-relaxed text-brand-muted">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="mb-4 font-serif text-xl font-semibold text-brand-ink">Kumite (Combate)</h4>
                                            <div className="space-y-4">
                                                {[
                                                    "Gohon Kumite (5 pasos)",
                                                    "Sanbon Kumite (3 pasos)",
                                                    "Kihon Ippon Kumite (Un paso básico)",
                                                    "Jiyu Kumite (Combate libre controlado)"
                                                ].map((item) => (
                                                    <div key={item} className="flex items-start">
                                                        <span aria-hidden="true" className="mt-2 mr-3 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-indigo" />
                                                        <span className="text-sm leading-relaxed text-brand-muted">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                )}

                {/* Sección: Katas */}
                {activeSection === "katas" && (
                    <motion.section
                        key="katas"
                        className="bg-brand-washi-deep py-14"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -14 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <div className="container mx-auto px-4">
                            <div className="w-full">
                                <div className="mb-14 text-center">
                                    <span className="section-eyebrow text-brand-gold-deep">Formas ancestrales</span>
                                    <h2 className="mt-4 font-serif text-3xl font-semibold text-brand-ink sm:text-4xl">
                                        Katas <span className="text-brand-vermilion">Tradicionales</span>
                                    </h2>
                                    <p className="text-measure mx-auto mt-4 text-base text-brand-muted sm:text-lg">
                                        Formas preestablecidas que preservan las técnicas ancestrales
                                    </p>
                                </div>

                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                    {katas.map((kata) => (
                                        <div key={kata.name} className="glass rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                                            <div className="mb-4 flex items-start justify-between gap-3">
                                                <h3 className="font-serif text-lg font-semibold text-brand-ink">{kata.name}</h3>
                                                <Target className="h-6 w-6 shrink-0 text-brand-vermilion" aria-hidden="true" />
                                            </div>
                                            <p className="text-sm leading-relaxed text-brand-muted">{kata.description}</p>
                                            <div className="mt-4 rounded-xl border border-brand-ink/8 bg-brand-washi-deep/70 p-3 text-xs leading-relaxed text-brand-muted">
                                                <strong className="font-semibold text-brand-ink">Propósito:</strong> {kata.purpose}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Kata Sanchin especial */}
                                <div className="relative mt-14 overflow-hidden rounded-3xl bg-brand-sumi p-8 text-white sm:p-10">
                                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-wood-dark opacity-30" />
                                    <div className="relative grid items-center gap-8 lg:grid-cols-2">
                                        <div>
                                            <h3 className="font-serif text-3xl font-semibold">
                                                Kata <span className="text-brand-gold">Sanchin</span>
                                            </h3>
                                            <p className="mt-4 leading-relaxed text-brand-washi/80">
                                                Considerado el kata más importante del Goju-Ryu, Sanchin significa
                                                "tres batallas" y representa la lucha por controlar cuerpo,
                                                respiración y mente.
                                            </p>
                                            <ul className="mt-6 space-y-3">
                                                {[
                                                    "Desarrollo de la postura Sanchin",
                                                    "Respiración Ibuki (sonora)",
                                                    "Endurecimiento del cuerpo (Kote Kitae)",
                                                ].map((item) => (
                                                    <li key={item} className="flex items-center gap-3 text-sm text-brand-washi/85">
                                                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="flex justify-center">
                                            <div className="flex h-56 w-56 items-center justify-center rounded-full border border-brand-gold/50 bg-white/5 backdrop-blur-md sm:h-64 sm:w-64">
                                                <div className="text-center">
                                                    <div aria-hidden="true" className="mb-2 font-serif text-6xl text-brand-gold">三</div>
                                                    <p className="font-serif text-lg">Sanchin</p>
                                                    <p className="text-sm text-brand-washi/60">Tres Batallas</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                )}

                {/* Sección: Beneficios */}
                {activeSection === "beneficios" && (
                    <motion.section
                        key="beneficios"
                        className="py-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -14 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <div className="container mx-auto px-4">
                            <div className="mb-10 text-center">
                                <span className="section-eyebrow text-brand-gold-deep">Desarrollo integral</span>
                                <h2 className="mt-4 font-serif text-3xl font-semibold text-brand-ink sm:text-4xl">
                                    Beneficios <span className="text-brand-vermilion">Integrales</span>
                                </h2>
                                <p className="text-measure mx-auto mt-4 text-base text-brand-muted sm:text-lg">
                                    Desarrollo físico, mental y espiritual a través del Karate-Do
                                </p>
                            </div>

                            <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                                {benefits.map((benefit) => {
                                    const Icon = benefit.icon;
                                    return (
                                        <div key={benefit.title} className="glass rounded-3xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                                            <div className="mb-4 inline-block rounded-2xl bg-brand-vermilion/10 p-4">
                                                <Icon className="h-7 w-7 text-brand-vermilion" aria-hidden="true" />
                                            </div>
                                            <h3 className="font-serif font-semibold text-brand-ink">{benefit.title}</h3>
                                            <p className="mt-2 text-sm leading-relaxed text-brand-muted">{benefit.description}</p>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Programa de grados */}
                            <div className="glass rounded-3xl p-6 sm:p-8">
                                <h3 className="mb-8 text-center font-serif text-2xl font-semibold text-brand-ink sm:text-3xl">
                                    Sistema de <span className="text-brand-vermilion">Grados</span>
                                </h3>
                                <div className="grid gap-8 md:grid-cols-2">
                                    <div>
                                        <h4 className="mb-4 font-serif text-xl font-semibold text-brand-ink">Kyu (Grados Inferiores)</h4>
                                        <div className="space-y-3">
                                            {[
                                                "10° Kyu (Blanco) - Principiante",
                                                "9° Kyu (Blanco Punta Amarilla) - Principiante",
                                                "8° Kyu (Blanco Raya Amarilla) - Principiante",
                                                "7° Kyu (Amarillo) - Fundamentos básicos",
                                                "6° Kyu (Verde) - Sempai (intermedio)",
                                                "5° Kyu (Azul) - Sempai avanzado",
                                                "3° Kyu (Marrón) - Sendoin",
                                                "2° Kyu (Marrón Punta Negra) - Sendoin",
                                                "1° Kyu (Marrón Raya Negra) - Sendoin",
                                                "0° Kyu (Negro) - Shidoin Shodan Ho"
                                            ].map((item) => (
                                                <div key={item} className="flex items-center gap-3">
                                                    <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold" />
                                                    <span className="text-sm text-brand-muted">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="mb-4 font-serif text-xl font-semibold text-brand-ink">Dan (Grados Superiores)</h4>
                                        <div className="space-y-3">
                                            {[
                                                "1° Dan (Shodan) - Instructor inicial",
                                                "2° Dan (Nidan) - Instructor asistente",
                                                "3° Dan (Sandan) - Instructor",
                                                "4° Dan (Yondan) - Instructor",
                                                "5° Dan (Godan) - Maestro",
                                                "6° Dan (Rokudan) - Maestro",
                                                "7° Dan (Nanadan) - Maestro (Kyoshi)",
                                                "8° Dan (Hachidan) - Gran Maestro (Hanshi)",
                                                "9° Dan (Kudan) - Gran Maestro (Hanshi)",
                                                "10° Dan (Judan) - Gran Maestro",
                                            ].map((item) => (
                                                <div key={item} className="flex items-center gap-3">
                                                    <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-vermilion" />
                                                    <span className="text-sm text-brand-muted">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                )}

                {activeSection === "filosofia" && (
                    <motion.section
                        key="filosofia"
                        className="bg-brand-washi-deep py-14"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -14 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <div className="container px-4 mx-auto">
                            <div>
                                <div className="mb-10 text-center">
                                    <span className="section-eyebrow text-brand-gold-deep">Dojo Kun</span>
                                    <h2 className="mt-4 font-serif text-3xl font-semibold text-brand-ink sm:text-4xl">
                                        Filosofía <span className="text-brand-vermilion">Hiramatsukai</span>
                                    </h2>
                                    <p className="text-measure mx-auto mt-4 text-base text-brand-muted sm:text-lg">
                                        Mente, cuerpo y espíritu en armonía.
                                    </p>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="glass rounded-3xl p-7 sm:p-8">
                                        <h3 className="mb-5 font-serif text-xl font-semibold text-brand-ink sm:text-2xl">Dojo Kun (Principios Marciales)</h3>
                                        <ul className="space-y-3 text-sm italic leading-relaxed text-brand-muted sm:text-base">
                                            <li>Lealtad por mi maestro, mi escuela y los principios de mi arte.</li>
                                            <li>Siempre me esforzaré por lo bueno y rechazaré lo malo.</li>
                                            <li>Trabajaré por la creación de la armonía entre todas las personas.</li>
                                            <li>Nunca utilizaré la violencia.</li>
                                            <li>Respetaré la vida y lo natural.</li>
                                        </ul>
                                    </div>

                                    <div className="glass rounded-3xl p-4 sm:p-8">
                                        <h3 className="mb-5 px-3 font-serif text-xl font-semibold text-brand-ink sm:px-0 sm:text-2xl">Hiramatsukai</h3>

                                        <div className="mb-4 rounded-2xl border border-brand-ink/10 bg-brand-washi-deep/70 p-4">
                                            <p className="section-eyebrow mb-2 text-brand-muted">Texto original (japonés romanizado)</p>
                                            <p className="italic leading-relaxed text-brand-muted">
                                                Hichiareva Venezuela Kyode Nanno Hedatariga Arimashoka.
                                                Karate Toa Hitoni Utaradu Hitoni Utado Koto Nakiwuo Mototo Surunari.
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-brand-vermilion/20 bg-brand-vermilion/5 p-4">
                                            <p className="section-eyebrow mb-2 text-brand-vermilion">Traducción al español</p>
                                            <p className="italic leading-relaxed text-brand-muted">
                                                Trabajaremos por Venezuela juntos como hermanos, por el bien y por la paz.
                                                La verdad del karate es: si me atacas, me defiendo; si te rindes, me voy.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
}
