import { useRef, useState, type KeyboardEvent } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Calendar,
  Check,
  CircleAlert,
  Globe,
  IdCard,
  Mail,
  MapPin,
  Phone,
  Quote,
  Shield,
  Sparkles,
  Swords,
  TargetIcon,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import CarouselComponent from "@/components/CarouselComponent";
import Reveal from "@/components/animation/Reveal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useDojos } from "@/hooks/useDojos";
import { cn } from "@/lib/utils";

type TabId = "historia" | "directiva" | "dojos" | "artes";

type Tab = {
  id: TabId;
  label: string;
  icon: LucideIcon;
};

const tabs: Tab[] = [
  { id: "historia", label: "Nuestra Historia", icon: Calendar },
  { id: "directiva", label: "Junta Directiva", icon: Users },
  { id: "dojos", label: "Nuestros Dojos", icon: MapPin },
  { id: "artes", label: "Artes Marciales", icon: Swords },
];

const boardMembers = [
  {
    position: "Presidente",
    name: "Carlos M. Gonzalez A.",
    rank: "7mo Dan Cinturón Negro",
    id: "13.000.711",
    location: "4001 Maracaibo, Zulia, Venezuela",
    phones: ["+58 414 6220277", "+58 416 6514935"],
    email: "kyoshicarlosgonzalez@gmail.com",
  },
  {
    position: "Vice-Presidente",
    name: "Miguel A. Dávila A.",
    rank: "6to Dan Cinturón Negro",
    id: "8.504.782",
    location: "4001 Maracaibo, Zulia, Venezuela",
    phones: ["+58 414 6411694", "+58 412 6756928"],
    email: "okinawakan@gmail.com",
  },
  {
    position: "Secretario General",
    name: "Luis A. Ugaz M.",
    rank: "6to Dan Cinturón Negro",
    id: "11.393.035",
    location: "4001 Maracaibo, Zulia, Venezuela",
    phones: ["+58 412 9681574"],
    email: "kenzendougaz@gmail.com",
  },
  {
    position: "Secretario de Finanzas",
    name: "Jose B. Sanchez R.",
    rank: "3er Dan Cinturón Negro",
    id: "17.805.752",
    location: "4001 Maracaibo, Zulia, Venezuela",
    phones: ["+58 414 5950475", "+58 424 6752070"],
    email: "josben.21@gmail.com",
  },
  {
    position: "Secretario de Fichaje",
    name: "Argenis A. Castro T.",
    rank: "5to Dan Cinturón Negro",
    id: "15.408.993",
    location: "4017 Ciudad Ojeda, Zulia, Venezuela",
    phones: ["+58 424 6367361"],
    email: "argenisc-51@hotmail.com",
  },
  {
    position: "Consultor Jurídico",
    name: "Joanny V. Medina A.",
    rank: "3er Dan Cinturón Negro",
    id: "16.149.211",
    location: "4001 Maracaibo, Zulia, Venezuela",
    phones: ["+58 414 6846202"],
    email: "joanny_medina84@hotmail.com",
  },
  {
    position: "Miembro",
    name: "Elizabeth V. Gonzalez L.",
    rank: "3er Dan Cinturón Negro",
    id: "19.936.393",
    location: "4001 Maracaibo, Zulia, Venezuela",
    phones: ["+58 412 0716227"],
    email: "elizabeth.vgl@gmail.com",
  },
  {
    position: "Miembro",
    name: "Luis E. Collantes A.",
    rank: "3er Dan Cinturón Negro",
    id: "16.353.635",
    location: "4001 Maracaibo, Zulia, Venezuela",
    phones: ["+58 414 0633631"],
    email: "luiscollantes.remax@gmail.com",
  },
  {
    position: "Miembro",
    name: "Jeancarlos Morillo",
    rank: "2do Dan Cinturón Negro",
    id: "16.886.601",
    location: "4001 Maracaibo, Zulia, Venezuela",
    phones: ["+58 424 6303215"],
    email: "jeanmorillo66@gmail.com",
  },
];

const arts = [
  {
    name: "Karate Goju-Ryu",
    icon: Swords,
    kanji: "空手",
    description: "Estilo duro-suave tradicional de Okinawa",
    features: [
      "Kata Sanchin",
      "Técnicas de respiración",
      "Defensa personal",
    ],
    href: "/karatedo",
    header: "from-brand-vermilion via-brand-vermilion-dark to-brand-vermilion-dark",
    accent: "text-brand-vermilion-dark",
    hover: "hover:border-brand-vermilion/40",
  },
  {
    name: "Kobudo Matayoshi",
    icon: TargetIcon,
    kanji: "古武道",
    description: "Artes marciales con armas tradicionales",
    features: ["Bo, Sai, Tonfa", "Kobudo Kai", "Armas complementarias"],
    href: "/kobudo",
    header: "from-brand-chestnut via-brand-copper-deep to-brand-chestnut-dark",
    accent: "text-brand-copper-deep",
    hover: "hover:border-brand-copper/40",
  },
  {
    name: "Kendo Iaido",
    icon: Zap,
    kanji: "剣道",
    description: "El camino de la espada japonesa",
    features: ["Kenjutsu", "Battojutsu", "Filosofía samurái"],
    href: "/kendo",
    header: "from-brand-wood-dark via-brand-sumi to-brand-sumi",
    accent: "text-brand-wood-dark",
    hover: "hover:border-brand-wood/50",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

export default function AboutUsInfo() {
  const [activeTab, setActiveTab] = useState<TabId>("historia");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const shouldReduceMotion = useReducedMotion();

  const {
    data: dojos = [],
    isLoading,
    isError,
    refetch,
  } = useDojos();

  const yearsOfTradition = new Date().getFullYear() - 1997;

  const stats = [
    {
      icon: Calendar,
      value: `${yearsOfTradition}+`,
      label: "Años de tradición",
      tone: "bg-brand-vermilion/10 text-brand-vermilion-dark",
    },
    {
      icon: Globe,
      value: "15",
      label: "Países con dojos afiliados",
      tone: "bg-brand-chestnut/10 text-brand-copper-deep",
    },
    {
      icon: Users,
      value: "3000+",
      label: "Estudiantes activos",
      tone: "bg-brand-gold/15 text-brand-gold-deep",
    },
  ];

  const goToTab = (tab: TabId) => {
    setActiveTab(tab);
    const section = document.getElementById("secciones");
    if (section) {
      section.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const lastIndex = tabs.length - 1;
    let nextIndex = index;

    if (event.key === "ArrowRight") {
      nextIndex = index === lastIndex ? 0 : index + 1;
    } else if (event.key === "ArrowLeft") {
      nextIndex = index === 0 ? lastIndex : index - 1;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = lastIndex;
    } else {
      return;
    }

    event.preventDefault();
    setActiveTab(tabs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="min-h-dvh">
      <section
        aria-labelledby="about-title"
        className="relative isolate flex min-h-[72vh] items-center overflow-hidden"
      >
        <img
          src="/Hiramatsukai.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[62%_35%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-brand-sumi via-brand-sumi/85 to-brand-sumi/35"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-brand-sumi via-transparent to-brand-sumi/50"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-wood-dark opacity-15 mix-blend-overlay"
        />

        <div className="relative mx-auto grid w-full max-w-350 items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-12 lg:py-28">
          <div>
            <Reveal y={14} duration={0.5}>
              <span className="section-eyebrow rounded-full border border-brand-copper-light/40 bg-brand-sumi/60 px-4 py-2 text-brand-copper-light backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Hiramatsukai · Desde 1997
              </span>
            </Reveal>

            <Reveal y={18} duration={0.6} delay={0.08}>
              <h1
                id="about-title"
                className="mt-7 text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)] sm:text-5xl lg:text-6xl"
              >
                Sobre
                <span className="mt-2 block text-brand-copper-light">
                  Nosotros
                </span>
              </h1>
            </Reveal>

            <Reveal y={16} delay={0.16} duration={0.55}>
              <div
                aria-hidden="true"
                className="gold-rule mt-7 h-px w-40"
              />
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-washi/90 drop-shadow-[0_1px_10px_rgba(0,0,0,0.6)] md:text-xl">
                Una organización dedicada a preservar y transmitir las artes
                marciales tradicionales de Okinawa con maestros de alto rango,
                una estructura sólida y una comunidad que crece en todo el
                mundo.
              </p>
            </Reveal>

            <Reveal y={16} delay={0.24} duration={0.55}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button
                  type="button"
                  size="lg"
                  variant="brand"
                  onClick={() => goToTab("historia")}
                  className="group h-12 rounded-full px-8 text-base shadow-gold"
                >
                  Explorar la organización
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="glass"
                  onClick={() => goToTab("dojos")}
                  className="h-12 rounded-full border-brand-gold/50 bg-brand-sumi/20 px-8 text-base text-white backdrop-blur-md hover:border-brand-copper-light/60 hover:bg-brand-copper-light hover:text-brand-sumi"
                >
                  Ver dojos
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal
            className="hidden lg:block"
            y={24}
            delay={0.2}
            duration={0.65}
          >
            <div className="glass-dark rounded-3xl p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="section-eyebrow text-brand-copper-light">
                  Ficha institucional
                </span>
                <Shield
                  className="h-6 w-6 shrink-0 text-brand-gold"
                  aria-hidden="true"
                />
              </div>

              <dl className="mt-6 space-y-4 text-sm">
                <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="text-brand-washi/55">Fundación</dt>
                  <dd className="text-right font-medium text-brand-washi">
                    1997 · Okinawa, Japón
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="text-brand-washi/55">Disciplinas</dt>
                  <dd className="text-right font-medium text-brand-washi">
                    Karatedo · Kobudo · Kendo Iaido
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-brand-washi/55">Alcance</dt>
                  <dd className="text-right font-medium text-brand-washi">
                    15 países · 3 continentes
                  </dd>
                </div>
              </dl>

              <div aria-hidden="true" className="gold-rule my-6 h-px w-full" />

              <blockquote className="flex gap-3 text-brand-washi/75">
                <Quote
                  className="h-5 w-5 shrink-0 text-brand-gold"
                  aria-hidden="true"
                />
                <p className="text-sm leading-relaxed">
                  “Comienza tu viaje marcial donde otros terminaron el suyo”.
                </p>
              </blockquote>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-card">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-wood opacity-20"
        />
        <div className="relative px-5 py-16 sm:px-8 lg:py-20">
          <div className="text-center">
            <Reveal y={14} duration={0.5}>
              <span className="section-eyebrow text-brand-copper-deep">
                Nuestra esencia
              </span>
            </Reveal>

            <Reveal y={16} delay={0.06} duration={0.55}>
              <h2 className="mt-4 text-balance font-serif text-3xl font-semibold text-heading sm:text-4xl lg:text-5xl">
                Organización{" "}
                <span className="text-heading-accent">Hiramatsukai</span>
              </h2>
            </Reveal>

            <Reveal y={12} delay={0.1} duration={0.5}>
              <div
                aria-hidden="true"
                className="gold-rule mx-auto mt-6 h-px w-32"
              />
            </Reveal>

            <Reveal y={16} delay={0.14} duration={0.55}>
              <p className="text-measure mx-auto mt-6 text-base leading-relaxed text-brand-muted sm:text-lg">
                Fundada en 1997 en Okinawa, Japón, Hiramatsukai se ha dedicado a
                preservar y transmitir las artes marciales tradicionales en su
                forma más pura. Con una estructura organizativa sólida y una
                junta directiva de maestros de alto rango, mantenemos los
                estándares más altos de excelencia marcial.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Reveal
                  key={stat.label}
                  className="h-full"
                  delay={index * 0.06}
                  y={18}
                >
                  <div className="glass group flex h-full flex-col items-center rounded-3xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                    <span
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105",
                        stat.tone,
                      )}
                    >
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <p className="mt-4 font-serif text-3xl font-semibold text-heading sm:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-sm leading-snug text-brand-muted">
                      {stat.label}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="secciones"
        aria-labelledby="about-sections-title"
        className="scroll-mt-32 bg-muted/40 py-10 lg:py-14"
      >
        <div className="px-5 sm:px-16">
          <h2 id="about-sections-title" className="sr-only">
            Secciones de la organización
          </h2>

          <div
            role="tablist"
            aria-label="Secciones de la organización"
            className="glass mx-auto grid max-w-4xl grid-cols-2 gap-2 rounded-3xl p-2 lg:grid-cols-4"
          >
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls="secciones-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTab(tab.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={cn(
                    "flex cursor-pointer items-center justify-center gap-2 rounded-2xl px-3 py-3 text-xs font-medium transition-all duration-300 focus-visible:outline-offset-4 sm:text-sm lg:text-base",
                    isActive
                      ? "bg-brand-vermilion text-white shadow-soft"
                      : "text-brand-muted hover:bg-card/70 hover:text-brand-ink",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="mt-10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeTab}
                role="tabpanel"
                id="secciones-panel"
                aria-labelledby={`tab-${activeTab}`}
                tabIndex={0}
                initial={
                  shouldReduceMotion ? false : { opacity: 0, y: 16 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={
                  shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }
                }
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.3,
                  ease: "easeOut",
                }}
                className="outline-none focus-visible:ring-2 focus-visible:ring-brand-copper/40"
              >
                {activeTab === "historia" && (
                  <div className="space-y-12">
                    <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
                      <Reveal y={18}>
                        <div>
                          <span className="section-eyebrow text-brand-copper-deep">
                            Nuestra historia
                          </span>
                          <h3 className="mt-4 text-balance font-serif text-2xl font-semibold text-heading sm:text-3xl lg:text-4xl">
                            Una tradición que{" "}
                            <span className="text-heading-accent">
                              trasciende generaciones
                            </span>
                          </h3>
                          <p className="mt-5 leading-relaxed text-brand-muted">
                            La Hiramatsukai fue fundada en 1997 por un grupo de
                            maestros dedicados a preservar las artes marciales
                            tradicionales de Okinawa en su forma más auténtica,
                            impartidas por el Maestro Hiramatsu.
                          </p>
                          <p className="mt-4 leading-relaxed text-brand-muted">
                            Desde entonces, el linaje se sostiene en la práctica
                            constante, la transmisión directa de los maestros y
                            el compromiso de cada dojo con la excelencia
                            marcial.
                          </p>

                          <div className="mt-6 flex flex-wrap gap-2.5">
                            {["Okinawa · 1997", "3 disciplinas", "15 países"].map(
                              (item) => (
                                <span
                                  key={item}
                                  className="inline-flex items-center gap-2 rounded-full border border-brand-wood/20 bg-card/70 px-3 py-1.5 text-xs font-medium text-brand-wood-deep"
                                >
                                  <span
                                    aria-hidden="true"
                                    className="h-1.5 w-1.5 rounded-full bg-brand-copper"
                                  />
                                  {item}
                                </span>
                              ),
                            )}
                          </div>
                        </div>
                      </Reveal>

                      <Reveal y={22} delay={0.08}>
                        <div className="relative">
                          <div
                            aria-hidden="true"
                            className="absolute -inset-4 rounded-4xl bg-linear-to-br from-brand-copper/15 to-brand-vermilion/10 blur-2xl"
                          />
                          <div className="relative overflow-hidden rounded-3xl border border-brand-vermilion/20 bg-linear-to-br from-brand-vermilion/10 via-brand-washi-card to-brand-sand/40 p-8 text-brand-ink">
                            <Calendar
                              className="h-12 w-12 text-brand-vermilion"
                              aria-hidden="true"
                            />
                            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted">
                              Año de fundación
                            </p>
                            <p className="mt-2 font-serif text-5xl font-semibold text-brand-vermilion-dark">
                              1997
                            </p>
                            <div
                              aria-hidden="true"
                              className="gold-rule my-6 h-px w-full"
                            />
                            <blockquote className="text-lg leading-relaxed text-brand-ink/80">
                              “Comienza tu viaje marcial donde otros terminaron
                              el suyo”.
                            </blockquote>
                            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted">
                              Okinawa · Japón
                            </p>
                          </div>
                        </div>
                      </Reveal>
                    </div>

                    <Reveal y={18}>
                      <div className="overflow-hidden rounded-3xl border border-brand-wood/20 bg-card shadow-soft">
                        <div className="px-6 pt-6 sm:px-8">
                          <span className="section-eyebrow text-brand-copper-deep">
                            Galería
                          </span>
                          <h3 className="mt-3 font-serif text-2xl font-semibold text-heading">
                            Nuestro día a día
                          </h3>
                        </div>
                        <div className="mt-6">
                          <CarouselComponent height="h-[380px] sm:h-[460px] lg:h-[520px]" />
                        </div>
                      </div>
                    </Reveal>
                  </div>
                )}

                {activeTab === "directiva" && (
                  <div className="space-y-10">
                    <Reveal y={16}>
                      <div className="mx-auto max-w-3xl text-center">
                        <span className="section-eyebrow text-brand-copper-deep">
                          Liderazgo
                        </span>
                        <h3 className="mt-4 text-balance font-serif text-3xl font-semibold text-heading sm:text-4xl">
                          Junta{" "}
                          <span className="text-heading-accent">Directiva</span>
                        </h3>
                        <p className="text-measure mx-auto mt-4 leading-relaxed text-brand-muted">
                          Liderazgo experimentado con décadas de dedicación a
                          las artes marciales.
                        </p>
                      </div>
                    </Reveal>

                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                      {boardMembers.map((member, index) => (
                        <Reveal
                          key={member.email}
                          className="h-full"
                          delay={Math.min(index * 0.04, 0.24)}
                          y={18}
                        >
                          <article className="glass flex h-full flex-col rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                            <div className="flex items-start gap-4">
                              <Avatar
                                size="lg"
                                className="bg-brand-vermilion/10 text-brand-vermilion-dark ring-1 ring-brand-vermilion/20"
                              >
                                <AvatarFallback className="text-sm font-semibold">
                                  {getInitials(member.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="min-w-0">
                                <span className="inline-flex rounded-full bg-brand-vermilion/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-brand-vermilion-dark">
                                  {member.position}
                                </span>
                                <h4 className="mt-2 font-serif text-lg font-semibold leading-snug text-heading">
                                  {member.name}
                                </h4>
                                <p className="mt-1 flex items-center gap-1.5 text-sm text-brand-copper-deep">
                                  <Award
                                    className="h-4 w-4 shrink-0"
                                    aria-hidden="true"
                                  />
                                  {member.rank}
                                </p>
                              </div>
                            </div>

                            <div
                              aria-hidden="true"
                              className="my-5 h-px w-full bg-brand-wood/15"
                            />

                            <ul className="space-y-2.5 text-sm text-brand-muted">
                              <li className="flex items-start gap-2">
                                <MapPin
                                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-copper"
                                  aria-hidden="true"
                                />
                                <span>{member.location}</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <IdCard
                                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-copper"
                                  aria-hidden="true"
                                />
                                <span>C.I: {member.id}</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Phone
                                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-copper"
                                  aria-hidden="true"
                                />
                                <span className="flex flex-col">
                                  {member.phones.map((phone) => (
                                    <a
                                      key={phone}
                                      href={phoneHref(phone)}
                                      className="transition-colors hover:text-brand-vermilion"
                                    >
                                      {phone}
                                    </a>
                                  ))}
                                </span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Mail
                                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-copper"
                                  aria-hidden="true"
                                />
                                <a
                                  href={`mailto:${member.email}`}
                                  className="break-all transition-colors hover:text-brand-vermilion"
                                >
                                  {member.email}
                                </a>
                              </li>
                            </ul>
                          </article>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "dojos" && (
                  <div className="space-y-10">
                    <Reveal y={16}>
                      <div className="mx-auto max-w-3xl text-center">
                        <span className="section-eyebrow text-brand-copper-deep">
                          Estamos cerca
                        </span>
                        <h3 className="mt-4 text-balance font-serif text-3xl font-semibold text-heading sm:text-4xl">
                          Nuestros{" "}
                          <span className="text-heading-accent">Dojos</span>
                        </h3>
                        <p className="text-measure mx-auto mt-4 leading-relaxed text-brand-muted">
                          Una red de espacios dedicados a la práctica y
                          transmisión de las artes marciales tradicionales.
                        </p>
                      </div>
                    </Reveal>

                    {isLoading ? (
                      <div
                        className="grid gap-5 md:grid-cols-2"
                        aria-busy="true"
                      >
                        <p className="sr-only">Cargando dojos…</p>
                        {Array.from({ length: 4 }).map((_, index) => (
                          <div
                            key={index}
                            aria-hidden="true"
                            className="h-64 animate-pulse rounded-3xl border border-brand-wood/10 bg-card/60"
                          />
                        ))}
                      </div>
                    ) : isError ? (
                      <div className="glass mx-auto max-w-xl rounded-3xl p-8 text-center">
                        <CircleAlert
                          className="mx-auto h-10 w-10 text-brand-vermilion"
                          aria-hidden="true"
                        />
                        <h4 className="mt-4 font-serif text-xl font-semibold text-heading">
                          No pudimos cargar los dojos
                        </h4>
                        <p className="mt-2 text-sm text-brand-muted">
                          Revisa tu conexión e intenta nuevamente.
                        </p>
                        <Button
                          type="button"
                          variant="wood"
                          onClick={() => refetch()}
                          className="mt-5 rounded-full"
                        >
                          Reintentar
                        </Button>
                      </div>
                    ) : dojos.length === 0 ? (
                      <div className="glass mx-auto max-w-xl rounded-3xl p-8 text-center">
                        <MapPin
                          className="mx-auto h-10 w-10 text-brand-copper"
                          aria-hidden="true"
                        />
                        <h4 className="mt-4 font-serif text-xl font-semibold text-heading">
                          Aún no hay dojos registrados
                        </h4>
                        <p className="mt-2 text-sm text-brand-muted">
                          Estamos actualizando nuestra red de dojos. Vuelve
                          pronto para conocer más.
                        </p>
                      </div>
                    ) : (
                      <div className="grid gap-5 md:grid-cols-2">
                        {dojos.map((dojo, index) => {
                          const instructor = dojo.leaderInstructor;
                          const instructorName = instructor
                            ? `${instructor.name} ${instructor.lastName}`.trim()
                            : "";
                          const instructorRank =
                            instructor?.userRanks?.[0]?.rank?.rank_name;

                          return (
                            <Reveal
                              key={dojo.id}
                              className="h-full"
                              delay={Math.min(index * 0.05, 0.25)}
                              y={18}
                            >
                              <article className="glass flex h-full flex-col rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="min-w-0">
                                    <h4 className="font-serif text-xl font-semibold text-heading">
                                      {dojo.dojo}
                                    </h4>
                                    <p className="mt-2 flex items-start gap-2 text-sm text-brand-muted">
                                      <MapPin
                                        className="mt-0.5 h-4 w-4 shrink-0 text-brand-copper"
                                        aria-hidden="true"
                                      />
                                      <span className="line-clamp-2">
                                        {dojo.address}
                                      </span>
                                    </p>
                                  </div>
                                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand-vermilion/10 px-3 py-1 text-xs font-semibold text-brand-vermilion-dark">
                                    <Users
                                      className="h-3.5 w-3.5"
                                      aria-hidden="true"
                                    />
                                    {dojo.students}
                                  </span>
                                </div>

                                <div className="mt-5 flex items-center gap-3 rounded-2xl border border-brand-wood/15 bg-card/60 p-3">
                                  <Avatar className="bg-brand-chestnut/10 text-brand-chestnut ring-1 ring-brand-wood/20">
                                    {instructor?.profileImg ? (
                                      <AvatarImage
                                        src={instructor.profileImg}
                                        alt={instructorName}
                                      />
                                    ) : null}
                                    <AvatarFallback className="text-xs font-semibold">
                                      {instructorName
                                        ? getInitials(instructorName)
                                        : "HI"}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="min-w-0 text-sm">
                                    <p className="truncate font-medium text-heading">
                                      {instructorName || "Instructor por confirmar"}
                                    </p>
                                    <p className="text-xs text-brand-muted">
                                      {instructorRank || "Instructor"}
                                    </p>
                                  </div>
                                </div>

                                {dojo.dojoMartialArts.length > 0 && (
                                  <div className="mt-4 flex flex-wrap gap-2">
                                    {dojo.dojoMartialArts.map((art) => (
                                      <span
                                        key={art.id}
                                        className="inline-flex items-center gap-1.5 rounded-full bg-brand-sand/60 px-2.5 py-1 text-xs font-medium text-brand-wood-deep"
                                      >
                                        <img
                                          src={`/${art.icon}`}
                                          alt=""
                                          aria-hidden="true"
                                          className={
                                            art.martialArt === "Kobudo"
                                              ? "h-5 w-7 object-contain"
                                              : "h-6 w-6 object-contain"
                                          }
                                        />
                                        {art.martialArt}
                                      </span>
                                    ))}
                                  </div>
                                )}

                                <div className="mt-auto pt-5">
                                  <Button
                                    asChild
                                    variant="ghost"
                                    className="w-full justify-between rounded-full border border-brand-wood/20 text-brand-ink hover:bg-brand-copper/10"
                                  >
                                    <Link to={`/dojos/dojo/${dojo.code}`}>
                                      Conocer dojo
                                      <ArrowUpRight
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                      />
                                    </Link>
                                  </Button>
                                </div>
                              </article>
                            </Reveal>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "artes" && (
                  <div className="space-y-10">
                    <Reveal y={16}>
                      <div className="mx-auto max-w-3xl text-center">
                        <span className="section-eyebrow text-brand-copper-deep">
                          Disciplinas
                        </span>
                        <h3 className="mt-4 text-balance font-serif text-3xl font-semibold text-heading sm:text-4xl">
                          Artes{" "}
                          <span className="text-heading-accent">Marciales</span>
                        </h3>
                        <p className="text-measure mx-auto mt-4 leading-relaxed text-brand-muted">
                          Tres disciplinas, una filosofía: excelencia marcial
                          integral.
                        </p>
                      </div>
                    </Reveal>

                    <div className="grid gap-6 md:grid-cols-3">
                      {arts.map((art, index) => {
                        const Icon = art.icon;
                        return (
                          <Reveal
                            key={art.name}
                            className="h-full"
                            delay={Math.min(index * 0.06, 0.18)}
                            y={18}
                          >
                            <article
                              className={cn(
                                "group flex h-full flex-col overflow-hidden rounded-3xl border border-brand-wood/15 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
                                art.hover,
                              )}
                            >
                              <div
                                className={cn(
                                  "relative overflow-hidden bg-linear-to-br p-6 text-white",
                                  art.header,
                                )}
                              >
                                <span
                                  aria-hidden="true"
                                  className="absolute -right-1 -top-3 font-serif text-7xl leading-none text-white/10"
                                >
                                  {art.kanji}
                                </span>
                                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md">
                                  <Icon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                </div>
                                <h4 className="relative mt-5 font-serif text-2xl font-semibold text-white">
                                  {art.name}
                                </h4>
                                <p className="relative mt-2 text-sm leading-relaxed text-white/85">
                                  {art.description}
                                </p>
                              </div>

                              <div className="flex flex-1 flex-col p-6">
                                <ul className="space-y-3">
                                  {art.features.map((feature) => (
                                    <li
                                      key={feature}
                                      className="flex items-start gap-2.5 text-sm text-brand-muted"
                                    >
                                      <Check
                                        className={cn(
                                          "mt-0.5 h-4 w-4 shrink-0",
                                          art.accent,
                                        )}
                                        aria-hidden="true"
                                      />
                                      {feature}
                                    </li>
                                  ))}
                                </ul>

                                <div className="mt-auto pt-6">
                                  <Button
                                    asChild
                                    variant="ghost"
                                    className={cn(
                                      "w-full justify-between rounded-full border border-brand-wood/15 hover:bg-brand-sand/50",
                                      art.accent,
                                    )}
                                  >
                                    <Link to={art.href}>
                                      Explorar
                                      <ArrowRight
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                      />
                                    </Link>
                                  </Button>
                                </div>
                              </div>
                            </article>
                          </Reveal>
                        );
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
