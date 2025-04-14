import { Button } from "@/components/ui/ButtonComponent";
import { useNavigate } from "react-router";

export default function KendoIaido() {

    const navigate = useNavigate();

    return (
        <section id="kendoIaido" className="bg-muted py-16 px-16 sm:py-24 w-full">
            <div className="container">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Kendo Iaido</h2>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        El Kendo y el Iaido son artes marciales japonesas relacionadas con la espada, pero tienen enfoques diferentes: Kendo es el arte del combate con espadas de bambú (shinai), donde se practican duelos con armadura (bogu) y énfasis en la velocidad, la precisión y la estrategia. Iaido se enfoca en la práctica de desenvainar, cortar y volver a enfundar la katana en movimientos fluidos y controlados, generalmente contra enemigos imaginarios.
                    </p>
                    <div className="mt-10">
                        <Button
                            variant={`link`}
                            style={{ fontFamily: 'JetBrains Mono' }}
                            onClick={() => navigate('/kendoIaido')}
                        >
                            Descubre el Kobudo
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
