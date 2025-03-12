import { Button } from "@/components/ui/button"

export default function Kobudo() {
    return (
        <section id="kobudo" className="py-16 px-16 sm:py-24">


            <div className="w-full flex items-start justify-between">
                <div>img</div>

                <div className="mx-auto max-w-2xl lg:mx-0 ">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-right">Kobudo</h2>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground text-right">
                        El Kobudo es el arte marcial tradicional de las armas de Okinawa. En nuestra escuela, enseñamos el
                        manejo de diversas armas tradicionales como el bo, sai, tonfa y nunchaku.
                    </p>
                </div>
            </div>

            <div className="mt-10">
                <Button size="lg" className="cursor-pointer">Descubre el Kobudo</Button>
            </div>

        </section>
    );
}
