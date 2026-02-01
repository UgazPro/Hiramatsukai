import { useState } from "react";
import InformationSchema from "@/components/InformationSchema";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import SpinnerComponent from "@/components/SpinnerComponent";
import { useDojos } from "@/hooks/useDojos";

const MAX_DOJOS = 4;

export default function Dojos() {

    const [showAllDojos, setShowAllDojos] = useState(false);
    const navigate = useNavigate();

    const { data: dojos = [], isLoading, isError } = useDojos();

    const hasMoreThanFour = dojos.length > MAX_DOJOS;
    const visibleDojos = showAllDojos ? dojos : dojos.slice(0, MAX_DOJOS);

    if (isLoading) return <SpinnerComponent />;
    if (isError) return <SpinnerComponent />;

    return (

        <section id="dojos" className="px-4 md:px-16 py-10 bg-muted">

            <div className="container mx-auto">

                <div className="mx-auto text-center">

                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl animate-fade-in">
                        Dojos Afiliados
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-muted-foreground animate-fade-in-delay">
                        ¿Interesado en unirte a alguna de nuestras escuelas? Contáctanos para
                        más información sobre clases y horarios.
                    </p>

                    <div className="mt-10">

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {visibleDojos.map((dojo, index) => (
                                <div
                                    key={dojo.code}
                                    onClick={() => navigate("/dojos/dojo")}
                                    className="transition-all duration-700 ease-in-out animate-slide-up"
                                    style={{
                                        transitionDelay: `${index * 100}ms`,
                                    }}
                                >
                                    <InformationSchema
                                        img="https://blog.marti.mx/wp-content/uploads/2023/01/conoce-que-es-karate-jpg.webp"
                                        dojo={dojo.dojo}
                                        address={dojo.address}
                                    />
                                </div>
                            ))}
                        </div>
                        
                    </div>

                </div>

                {hasMoreThanFour && (
                    <div className="mt-10 w-full text-center">
                        <Button
                            onClick={() => setShowAllDojos((prev) => !prev)}
                            variant="clickRed"
                            style={{ fontFamily: "JetBrains Mono" }}
                            size="lg"
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
                    </div>
                )}
            </div>

        </section>

    );

}
