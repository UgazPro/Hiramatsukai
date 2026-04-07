import { Button } from "@/components/ui/button";
import Reveal from "@/components/animation/Reveal";
import { motion } from "motion/react"
import { Link } from "react-router";

export default function AboutUs() {

    return (
        <section
            id="home"
            aria-labelledby="home-title"
            className="relative w-full min-h-[77vh] flex items-center justify-center overflow-hidden"
        >
            <div className="absolute inset-0">
                <div className="absolute inset-0 -top-1/2">
                    <motion.img
                        src="/Hiramatsukai.jpg"
                        alt="Entrenamiento de artes marciales en Hiramatsukai"
                        className="w-full h-full object-cover object-top"
                        initial={{ scale: 1.08 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 1.1, ease: "easeOut" }}
                    />
                </div>
                <div className="absolute inset-0 bg-black/60" />
            </div>

            
            <div className="relative w-full flex items-center justify-center">
                <div className="max-w-2xl text-center text-white px-4">
                    <Reveal y={18} duration={0.6}>
                        <header>
                        <h1
                            id="home-title"
                            className="text-4xl md:text-6xl font-bold mb-6"
                        >
                            Hiramatsukai Internacional
                        </h1>
                        </header>
                    </Reveal>

                    <Reveal y={16} delay={0.12} duration={0.55}>
                        <p className="text-xl md:text-2xl mb-10 text-gray-100">
                            Tradición, disciplina y excelencia en las artes marciales
                        </p>
                    </Reveal>

                    <Reveal y={16} delay={0.2} duration={0.55}>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-6 text-base" style={{ fontFamily: "Kavoon" }}>
                            <a href="#karate">Comienza tu viaje</a>
                        </Button>

                        <Button asChild size="lg" variant="clickRed" className="border-2 border-white text-white hover:bg-gray-500 px-8 py-6 text-base" style={{ fontFamily: "Kavoon" }}>
                            <Link to="/nosotros">Conocenos</Link>
                        </Button>
                        </div>
                    </Reveal>
                </div>
        </div>
        </section>
    );
}
