import { useMemo, useState } from "react";
import Reveal from "@/components/animation/Reveal";
import InformationSchema from "@/components/informationSchemas/InformationSchema";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react"
import { Link } from "react-router";
import SpinnerComponent from "@/components/spinner/SpinnerComponent";
import { useDojos } from "@/hooks/useDojos";

const MAX_DOJOS = 4;
const FALLBACK_DOJO_IMAGE = "https://blog.marti.mx/wp-content/uploads/2023/01/conoce-que-es-karate-jpg.webp";

export default function Dojos() {

    const [showAllDojos, setShowAllDojos] = useState(false);

    const { data: dojos = [], isLoading, isError } = useDojos();

    const hasMoreThanFour = dojos.length > MAX_DOJOS;
    const visibleDojos = useMemo(
        () => (showAllDojos ? dojos : dojos.slice(0, MAX_DOJOS)),
        [showAllDojos, dojos]
    );

    const setImageDojo = (logo: string): string => {
        if(logo && logo.trim() !== "") {
            return `${import.meta.env.VITE_API_URL}/api${logo}`
        }
        return FALLBACK_DOJO_IMAGE;
    }

    if (isLoading) return <SpinnerComponent />;
    if (isError) return <SpinnerComponent />;

    return (

        <section id="dojos" aria-labelledby="dojos-title" className="px-4 md:px-16 py-10 bg-muted">

            <div className="container mx-auto">

                <div className="mx-auto text-center">

                    <Reveal y={18}>
                        <h2 id="dojos-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Dojos Afiliados
                        </h2>
                    </Reveal>

                    <Reveal y={14} delay={0.08}>
                        <p className="mt-6 text-lg leading-8 text-muted-foreground">
                            ¿Interesado en unirte a alguna de nuestras escuelas? Contáctanos para
                            más información sobre clases y horarios.
                        </p>
                    </Reveal>

                    <div className="mt-10">

                        <ul id="dojo-list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <AnimatePresence mode="popLayout">
                                {visibleDojos.map((dojo, index) => (
                                    <motion.li
                                        key={dojo.code}
                                        layout
                                        initial={{ opacity: 0, y: 22, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                                        transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
                                        className="list-none"
                                    >
                                        <Link
                                            to={`/dojos/dojo/${dojo.code}`}
                                            className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
                                            aria-label={`Ver informacion del dojo ${dojo.dojo}`}
                                        >
                                            <InformationSchema
                                                img={setImageDojo(dojo.logo)}
                                                dojo={dojo.dojo}
                                                address={dojo.address}
                                            />
                                        </Link>
                                    </motion.li>
                                ))}
                            </AnimatePresence>
                        </ul>

                    </div>

                </div>

                {hasMoreThanFour && (
                    <Reveal className="mt-10 w-full text-center" y={12}>
                        <Button
                            onClick={() => setShowAllDojos((prev) => !prev)}
                            variant="clickRed"
                            style={{ fontFamily: "JetBrains Mono" }}
                            size="lg"
                            aria-expanded={showAllDojos}
                            aria-controls="dojo-list"
                            className="text-sm font-normal px-4 py-4 hover:scale-105 active:scale-95 transition-transform duration-300"
                        >
                            <span className="flex items-center gap-2">
                                {showAllDojos ? "Ver menos" : "Ver más"}
                                <svg
                                    className={`w-5 h-5 transition-transform duration-500 ${showAllDojos ? "rotate-180" : ""
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </span>
                        </Button>
                    </Reveal>
                )}
            </div>

        </section>

    );

}
