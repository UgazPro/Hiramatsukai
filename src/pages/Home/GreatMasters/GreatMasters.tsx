import Reveal from "@/components/animation/Reveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function GreatMasters() {

    const masters = [
        {
            name: "Hiramatsu Taishihan",
            art: "Karatedo",
            initials: "平",
            image: "/gijinhiramatsu.jpg",
            description: "Maestro que forjó las bases de la organización Hiramatsukai",
            link: "/maestro/hiramatsu",
            color: "red",
        },
        {
            name: "Chōjun Miyagi Sensei",
            art: "Goju-Ryu Karate-Do",
            initials: "宮",
            image: "/chojunmiyagi.jpg",
            description: "Creador del estilo Goju-Ryu, síntesis del estilo duro-suave",
            link: "/maestro/miyagi",
            color: "blue",
        },
        {
            name: "Kanken Toyama Sensei",
            art: "Kobudo",
            initials: "外",
            image: "/kankentoyama.jpg",
            description: "Maestro dedicado a la enseñanza del karatedo",
            link: "/maestro/toyama",
            color: "yellow",
        },
    ];

    return (
        <section id="masters" aria-labelledby="masters-title" className="py-16 sm:py-20 bg-white">
            <div className="container mx-auto px-4">

                <Reveal className="text-center mb-12" y={18}>
                    <h2 id="masters-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Kavoon" }}>
                        Grandes <span className="text-red-600">Maestros</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Los pilares que forjaron el camino de las artes marciales en nuestra organización
                    </p>
                </Reveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
                    {masters.map((master, index) => (
                        <Reveal key={index} delay={index * 0.1} y={20}>
                            <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 h-full flex flex-col">

                                <div className={`relative h-72 sm:h-80 bg-linear-to-br ${
                                    master.color === 'red' ? 'from-red-500 to-red-700' :
                                    master.color === 'blue' ? 'from-blue-500 to-blue-700' :
                                    'from-yellow-500 to-yellow-700'
                                } flex items-center justify-center overflow-hidden`}>
                                    {master.image ? (
                                        <img
                                            src={master.image}
                                            alt={master.name}
                                            className="w-full h-full object-cover object-top"
                                        />
                                    ) : (
                                        <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/40">
                                            <span className="text-5xl font-bold text-white" style={{ fontFamily: "Kavoon" }}>
                                                {master.initials}
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold">
                                        {master.art}
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Kavoon" }}>
                                        {master.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4 flex-1">
                                        {master.description}
                                    </p>

                                    <Button
                                        asChild
                                        variant="outline"
                                        className={`w-full border-2 ${
                                            master.color === 'red' ? 'border-red-500 text-red-600 hover:bg-red-50' :
                                            master.color === 'blue' ? 'border-blue-500 text-blue-600 hover:bg-blue-50' :
                                            'border-yellow-500 text-yellow-600 hover:bg-yellow-50'
                                        }`}
                                        style={{ fontFamily: "JetBrains Mono" }}
                                    >
                                        <Link to={master.link}>Ver biografía</Link>
                                    </Button>
                                </div>

                            </div>
                        </Reveal>
                    ))}
                </div>

            </div>
        </section>
    );
}
