import { useEffect, useState } from "react";
import InformationSchema from "@/components/InformationSchema";
import { Button } from "@/components/ui/button";
import { IDojo } from "@/services/dojos/dojo.interface";
import { getDojos } from "@/services/dojos/dojo.service";
import { useNavigate } from "react-router";

export default function Dojos() {

    const [showAllDojos, setShowAllDojos] = useState<boolean>(false);
    const [showAllDojosTime, setShowAllDojosTime] = useState<boolean>(false);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    // Getting all Dojos
    const [ dojos, setDojos ] = useState<IDojo[]>([]);

    useEffect( () => {
        gettingDojos();
    }, []);

    const navigate = useNavigate();

    const gettingDojos = async () => {
        const response = await getDojos();
        setDojos(response);
    }

    const handleToggleDojos = () => {

        if (!isAnimating) {

            setIsAnimating(true);
            setShowAllDojos(!showAllDojos);
            
            if (isAnimating) {
                setShowAllDojosTime(true);
            } else {

                setTimeout(() => {

                    setShowAllDojosTime(true);
                }, 200);
            }

            setTimeout(() => {
                setIsAnimating(false);
            }, 600);

        }

    };

    return (

        <section id="dojos" className="px-4 md:px-16 py-10 bg-muted">

            <div className="container mx-auto">

                <div className="mx-auto text-center">

                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl animate-fade-in">Dojos Afiliados</h2>

                    <p className="mt-6 text-lg leading-8 text-muted-foreground animate-fade-in-delay">
                        ¿Interesado en unirte a alguna de nuestras escuelas? Contáctanos para más información sobre clases y horarios.
                    </p>

                    <div className="mt-10 relative">

                        {/* Dojos Principales */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {dojos.slice(0, 4).map((dojo, index) => (
                                <div
                                    key={dojo.dojo}
                                    className={`animate-slide-up delay-${index} `}
                                    onClick={() => navigate('/dojos/dojo')}
                                >
                                    <InformationSchema
                                        img={'https://blog.marti.mx/wp-content/uploads/2023/01/conoce-que-es-karate-jpg.webp'}
                                        dojo={dojo.dojo}
                                        address={dojo.address}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Dojos adicionales */}
                        <div
                            className={`
                            transition-all duration-500 ease-in-out overflow-hidden
                            ${showAllDojos ? 'max-h-500 opacity-100 mt-8' : 'max-h-0 opacity-0'}
                        `}
                        >

                            <div className="relative pt-8">

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {dojos.slice(4, dojos.length).map((dojo, index) => (
                                        <div
                                            key={dojo.dojo}
                                            className={`${showAllDojosTime ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}
                                            style={{ transitionDelay: showAllDojosTime ? `${index * 100}ms` : '0ms' }}
                                        >
                                            <InformationSchema
                                                img={'https://blog.marti.mx/wp-content/uploads/2023/01/conoce-que-es-karate-jpg.webp'}
                                                dojo={dojo.dojo}
                                                address={dojo.address}
                                            />
                                        </div>
                                    ))}
                                </div>

                            </div>

                        </div> {/* Fin Dojos adicionales */}

                    </div>

                </div>

                <div className="mt-10 w-full text-center"> {/* Botón */}

                    <Button
                        onClick={handleToggleDojos}
                        variant={'clickRed'}
                        style={{ fontFamily: 'JetBrains Mono' }}
                        size={'lg'}
                        className="text-sm font-normal px-4 py-4 hover:scale-105 active:scale-95 transition-transform duration-300 relative overflow-hidden group"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {showAllDojos ? "Ver menos" : "Ver más"}
                            <svg
                                className={`w-5 h-5 transition-transform duration-500 ${showAllDojos ? 'rotate-180' : ''}`}
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

            </div>

        </section>

    );

}