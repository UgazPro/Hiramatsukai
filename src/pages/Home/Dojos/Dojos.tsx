import { useMemo, useState } from "react";
import Reveal from "@/components/animation/Reveal";
import InformationSchema from "@/components/informationSchemas/InformationSchema";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react"
import { Link } from "react-router";
import SpinnerComponent from "@/components/spinner/SpinnerComponent";
import { useDojos } from "@/hooks/useDojos";
import { ChevronDown } from "lucide-react";
import { Loader } from "@/components/spinner/Loader";

const MAX_DOJOS = 4;

export default function Dojos() {

    const [showAllDojos, setShowAllDojos] = useState(false);

    const { data: dojos = [], isLoading, isError } = useDojos();

    const hasMoreThanFour = dojos.length > MAX_DOJOS;
    const visibleDojos = useMemo(
        () => (showAllDojos ? dojos : dojos.slice(0, MAX_DOJOS)),
        [showAllDojos, dojos]
    );

    if (isError) return <SpinnerComponent />;

    return (

        <section
            id="dojos"
            aria-labelledby="dojos-title"
            className="relative scroll-mt-32 overflow-hidden bg-brand-washi px-4 py-20 md:px-16 sm:py-24"
        >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-wood opacity-40" />

            <div className="relative mx-auto max-w-7xl">

                <div className="text-center">

                    <Reveal y={18}>
                        <h2 id="dojos-title" className="mt-4 text-3xl font-semibold text-brand-ink sm:text-4xl lg:text-5xl">
                            Dojos <span className="text-brand-vermilion">Afiliados</span>
                        </h2>
                    </Reveal>

                    <Reveal y={14} delay={0.08}>
                        <p className="text-measure mx-auto mt-5 text-base leading-relaxed text-brand-muted sm:text-lg">
                            ¿Interesado en unirte a alguna de nuestras escuelas? Contáctanos para
                            más información sobre clases y horarios.
                        </p>
                    </Reveal>

                    <div className="mt-12">

                        {isLoading ? <div className="flex flex-col items-center gap-2"><Loader message="Cargando dojos..." /></div> : (
                            <ul id="dojo-list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                                                className="block h-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-brand-washi-deep"
                                                aria-label={`Ver informacion del dojo ${dojo.dojo}`}
                                            >
                                                <InformationSchema
                                                    img={dojo.logo}
                                                    dojo={dojo.dojo}
                                                    address={dojo.address}
                                                />
                                            </Link>
                                        </motion.li>
                                    ))}
                                </AnimatePresence>
                            </ul>
                        )}

                    </div>

                </div>

                {hasMoreThanFour && (
                    <Reveal className="mt-10 w-full text-center" y={12}>
                        <Button
                            type="button"
                            onClick={() => setShowAllDojos((prev) => !prev)}
                            variant="brand"
                            size="lg"
                            aria-expanded={showAllDojos}
                            aria-controls="dojo-list"
                            className="rounded-full px-6"
                        >
                            {showAllDojos ? "Ver menos" : "Ver más dojos"}
                            <ChevronDown
                                className={`h-4 w-4 transition-transform duration-500 ${showAllDojos ? "rotate-180" : ""}`}
                                aria-hidden="true"
                            />
                        </Button>
                    </Reveal>
                )}
            </div>

        </section>

    );

}
