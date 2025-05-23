import { Button } from "@/components/ui/button";
import Karatedo from "./Karatedo/Karatedo";
import Kobudo from "./Kobudo/Kobudo";
import KendoIaido from "./KendoIaido/KendoIaido";
import Dojos from "./Dojos/Dojos";

export default function Home() {

    return (

        <main className="flex-1 w-full">
            <section id="home" className="relative w-full">
                <div className="absolute inset-0">
                    <img
                        src="/karateK.png"
                        alt="Karate training"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                </div>
                <div className="container relative py-24 sm:py-32 w-full">
                    <div className="mx-auto max-w-3xl text-center text-white">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Hiramatsukai</h1>
                        <p className="mt-6 text-lg leading-8">Tradición, disciplina y excelencia en las artes marciales</p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Button size="lg" variant="default" className="cursor-pointer">
                                Comienza tu viaje
                            </Button>
                            <Button size="lg" variant="outline" className="text-black cursor-pointer">
                                Conócenos
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <Karatedo />

            <Kobudo />

            <KendoIaido />

            <Dojos />

        </main>
    );
}

