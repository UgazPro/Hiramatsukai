import InformationSchema from "@/components/InformationSchema";
import { Link, useNavigate } from "react-router";

export default function Dojos() {

    const navigate = useNavigate();

    return (
        <section id="dojos" className="px-16 py-16 sm:py-24">
            <div className="container">
                <div className="mx-auto text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Dojos Afiliados</h2>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        ¿Interesado en unirte a alguna de nuestras escuelas? Contáctanos para más información sobre clases y horarios.
                    </p>
                    <div className="mt-10 lg:grid lg:grid-cols-4 justify-around items-center gap-10 flex-wrap w-full">
                        <InformationSchema
                            img="https://blog.marti.mx/wp-content/uploads/2023/01/conoce-que-es-karate-jpg.webp"
                            dojo="Kenzendo"
                            address="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                        />
                        <InformationSchema
                            img="https://blog.marti.mx/wp-content/uploads/2023/01/conoce-que-es-karate-jpg.webp"
                            dojo="Okikonbukan"
                            address="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                        />
                        <InformationSchema
                            img="https://blog.marti.mx/wp-content/uploads/2023/01/conoce-que-es-karate-jpg.webp"
                            dojo="Okinawakan"
                            address="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                        />
                        <InformationSchema
                            img="https://blog.marti.mx/wp-content/uploads/2023/01/conoce-que-es-karate-jpg.webp"
                            dojo="Syudo Kan"
                            address="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                        />
                    </div>
                </div>
            </div>

            <div className="mt-10 w-full text-center">
                <Link
                    to="/dojos"
                    style={{ fontFamily: 'JetBrains Mono' }}
                    className="px-4 py-2 rounded-lg border-2 border-(--redColor) cursor-pointer hover:bg-(--redColor) hover:text-white transition-color"
                >
                    Ver más
                </Link>
            </div>

        </section>
    );
}
