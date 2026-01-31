import { CardComponent, CardComponentProps } from "@/components/card/CardComponent";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function Kobudo() {

    const navigate = useNavigate();

    const cardsKobudo: CardComponentProps[] = [
        {
            title: "Bo (Bastón)",
            description: 'Arma de 1.8m, base del kobudo tradicional',
            icon: "棒",
            bgIcon: "bg-linear-to-br from-yellow-500 to-yellow-600",
            bg: "bg-linear-to-br from-yellow-50 to-yellow-100",
            border: "border-yellow-200",
        },
        {
            title: "Sai (Tridente)",
            description: 'Arma de metal para defensa y ataque',
            icon: "釵",
            bgIcon: "bg-linear-to-br from-blue-500 to-blue-800",
            bg: "bg-linear-to-br from-blue-50 to-blue-100",
            border: "border-blue-200",
        },
        {
            title: "Tonfa",
            description: "Originalmente mango de molino, ahora arma policial",
            icon: "トンファー",
            bgIcon: "bg-linear-to-br from-red-500 to-red-800",
            bg: "bg-linear-to-br from-red-50 to-red-100",
            border: "border-red-200",
        },
        {
            title: "Nunchaku",
            description: "Dos palos unidos por cadena o cuerda",
            icon: "ヌンチャク",
            bgIcon: "bg-linear-to-br from-purple-600 to-purple-800",
            bg: "bg-linear-to-br from-purple-100 to-purple-300",
            border: "border-purple-200",
        }
    ];

    return (
        <section id="kobudo" className="py-16 sm:py-15 bg-white">
            <div className="container mx-auto px-4">

                <div className="flex flex-col lg:flex-row-reverse items-start gap-8 lg:gap-12">

                    <div className="lg:w-1/2 w-full space-y-9 order-2 lg:order-1">

                        {/* First Image */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl w-full">
                            <img
                                src="/Hiramatsukai.jpg"
                                alt="Práctica de Kobudo"
                                className="w-full h-100 lg:h-77 object-cover object-center"
                            />

                            {/* Subtle Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />

                            {/* Badge */}
                            <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                Kobudo Okinawense
                            </div>
                        </div>

                        {/* Second Image */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl w-full">
                            <img
                                src="/Hiramatsukai.jpg"
                                alt="Práctica de Kobudo"
                                className="w-full h-100 lg:h-77 object-cover object-center"
                            />
                            {/* Subtle Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />

                            {/* Badge */}
                            <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                Kobudo Okinawense
                            </div>
                        </div>

                    </div>

                    <div className="lg:w-1/2 w-full space-y-6 order-1 lg:order-2">

                        <div className="flex items-center gap-2">

                            <div className="h-11 w-11 lg:hidden">
                                <img src="gi.jpg" alt="" />
                            </div>

                            <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 text-right">
                                Kobudo Okinawense
                            </h2>

                        </div>

                        <p className="text-lg text-gray-700 leading-relaxed">
                            Arte marcial de Okinawa que enseña el manejo de armas.
                            Desarrollado por los campesinos y pescadores okinawenses como método de defensa personal.
                        </p>

                        {/* Main Weapons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                            {cardsKobudo.map((card, index) => (
                                <CardComponent card={card} key={index} />
                            ))}
                        </div>

                        <div className="h-37 w-37 mx-auto hidden lg:block">
                            <img src="gi.jpg" alt="" />
                        </div>
                    </div>
                </div>

                <div className="mt-10 text-center">
                    <Button
                        variant={`link`}
                        style={{ fontFamily: 'JetBrains Mono' }}
                        onClick={() => navigate('/kobudo')}
                    >
                        Descubre más sobre el KOBUDO
                    </Button>
                </div>

            </div>
        </section>
    );
}
