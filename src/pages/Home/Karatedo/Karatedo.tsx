import { GraduationCap, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Karatedo() {
    return (
        <section id="karate" className="bg-muted py-16 px-16 sm:py-24 w-full">
            <div className="w-full flex items-start justify-between ">
                <div className="mx-auto max-w-2xl lg:mx-0 ">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Goju-ryu Karate</h2>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        El Goju-ryu es un estilo tradicional de karate que combina técnicas duras (go) y suaves (ju).
                        Desarrollado en Okinawa, este estilo enfatiza tanto la fuerza como la fluidez en sus movimientos.
                    </p>
                </div>

                <div className="">
                    Imagen
                </div>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                <div className="flex flex-col items-start">
                    <div className="rounded-md bg-primary p-2 text-primary-foreground">
                        <GraduationCap className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">Instrucción Experta</h3>
                    <p className="mt-2 text-muted-foreground">
                        Instructores altamente calificados con años de experiencia en Goju-ryu.
                    </p>
                </div>
                <div className="flex flex-col items-start">
                    <div className="rounded-md bg-primary p-2 text-primary-foreground">
                        <MapPin className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">Instalaciones</h3>
                    <p className="mt-2 text-muted-foreground">
                        Dojo tradicional completamente equipado para tu entrenamiento.
                    </p>
                </div>
                <div className="flex flex-col items-start">
                    <div className="rounded-md bg-primary p-2 text-primary-foreground">
                        <GraduationCap className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">Desarrollo Personal</h3>
                    <p className="mt-2 text-muted-foreground">
                        Enfoque en el crecimiento físico y espiritual a través del karate.
                    </p>
                </div>

                <div className="mt-10">
                    <Button size="lg" className="cursor-pointer">Descubre el KarateDo</Button>
                </div>
            </div>
        </section>
    );
}
