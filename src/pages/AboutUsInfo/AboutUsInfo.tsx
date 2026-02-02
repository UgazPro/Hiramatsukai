import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Users, Award, Shield, MapPin, Globe, Calendar, Swords, TargetIcon, Zap, Mail, Phone, Facebook, Instagram, Youtube } from "lucide-react";
import CarouselComponent from "@/components/CarouselComponent";
// import TimelineSection from "@/components/TimelineSection";

export default function AboutUsInfo() {

    const [activeTab, setActiveTab] = useState("historia");

    const tabs = [
        { id: "historia", label: "Nuestra Historia", icon: Calendar },
        { id: "directiva", label: "Junta Directiva", icon: Users },
        { id: "dojos", label: "Nuestros Dojos", icon: MapPin },
        { id: "artes", label: "Artes Marciales", icon: Swords }
    ];

    const foundingMembers = [
        {
            name: "Shihan Miguel Rodríguez",
            position: "Presidente Fundador",
            rank: "8° Dan Hanshi",
            arts: ["Karate Goju-Ryu", "Kobudo Matayoshi", "Kendo Iaido"],
            image: "/shihan-miguel.jpg"
        },
        {
            name: "Sensei Ana Martínez",
            position: "Vicepresidenta Técnica",
            rank: "7° Dan Kyoshi",
            arts: ["Karate Goju-Ryu", "Kobudo", "Defensa Personal"],
            image: "/sensei-ana.jpg"
        },
        {
            name: "Sensei Carlos Takahashi",
            position: "Director de Kobudo",
            rank: "7° Dan Renshi",
            arts: ["Kobudo Matayoshi", "Armas Tradicionales", "Historia Marcial"],
            image: "/sensei-carlos.jpg"
        }
    ];

    const dojos = [
        {
            name: "Dojo Central Hiramatsukai",
            location: "Okinawa, Japón",
            headInstructor: "Shihan Miguel Rodríguez",
            arts: ["Karate", "Kobudo", "Kendo Iaido"],
            students: 250
        },
        {
            name: "Dojo del Pacífico",
            location: "California, USA",
            headInstructor: "Sensei Kenji Tanaka",
            arts: ["Karate", "Kobudo"],
            students: 180
        },
        {
            name: "Dojo Andes",
            location: "Bogotá, Colombia",
            headInstructor: "Sensei Luis Yamashita",
            arts: ["Karate", "Kobudo", "Iaido"],
            students: 150
        },
        {
            name: "Dojo Mediterráneo",
            location: "Barcelona, España",
            headInstructor: "Sensei Sofia Nakamura",
            arts: ["Karate", "Kendo"],
            students: 120
        }
    ];

    const timeline = [
        { year: "1997", event: "Fundación oficial de Hiramatsukai en Okinawa" },
        { year: "2002", event: "Primera certificación internacional de instructores" },
        { year: "2008", event: "Expansión a América con 5 dojos afiliados" },
        { year: "2014", event: "Reconocimiento por la Federación Mundial de Kobudo" },
        { year: "2019", event: "Celebración del 25° aniversario con seminario mundial" },
        { year: "2023", event: "Más de 3000 estudiantes en 15 países" }
    ];

    const arts = [
        {
            name: "Karate Goju-Ryu",
            icon: Swords,
            description: "Estilo duro-suave tradicional de Okinawa",
            color: "red",
            features: ["Kata Sanchin", "Técnicas de respiración", "Defensa personal"]
        },
        {
            name: "Kobudo Matayoshi",
            icon: TargetIcon,
            description: "Artes marciales con armas tradicionales",
            color: "blue",
            features: ["Bo, Sai, Tonfa", "Kobudo Kai", "Armas complementarias"]
        },
        {
            name: "Kendo Iaido",
            icon: Zap,
            description: "El camino de la espada japonesa",
            color: "yellow",
            features: ["Kenjutsu", "Battojutsu", "Filosofía samurái"]
        }
    ];

    return (
        <div className="min-h-screen bg-linear-to-b from-white to-gray-50">
            {/* Hero con Carousel */}
            <section className="relative">
                <div className="h-[600px] md:h-[700px]">
                    <CarouselComponent />
                </div>
            </section>

            {/* Introducción */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <Shield className="h-16 w-16 text-yellow-600 mx-auto mb-6" />
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: "Kavoon" }}>
                            Organización <span className="text-red-600">Hiramatsukai</span>
                        </h1>
                        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                            Fundada en 1997 en Okinawa, Japón, Hiramatsukai se ha dedicado a preservar y transmitir
                            las artes marciales tradicionales en su forma más pura. Con una estructura organizativa
                            sólida y una junta directiva de maestros de alto rango, mantenemos los estándares más
                            altos de excelencia marcial.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-red-600 mb-2">25+</div>
                                <div className="text-gray-600">Años de Tradición</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-600 mb-2">15</div>
                                <div className="text-gray-600">Países con Dojos Afiliados</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-yellow-600 mb-2">3000+</div>
                                <div className="text-gray-600">Estudiantes Activos</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Navegación por pestañas */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-wrap gap-2 justify-center">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 ${isActive
                                                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                            }`}
                                    >
                                        <Icon className="h-5 w-5" />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contenido de Historia */}
            {activeTab === "historia" && (
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: "Kavoon" }}>
                                        Nuestra <span className="text-red-600">Historia</span>
                                    </h2>
                                    <div className="space-y-4 text-gray-700">
                                        <p>
                                            Hiramatsukai fue fundada en 1997 por un grupo de maestros dedicados a preservar
                                            las artes marciales tradicionales de Okinawa en su forma más auténtica. El nombre
                                            "Hiramatsukai" significa "Guardián de la Tradición", reflejando nuestro compromiso
                                            con la preservación del patrimonio marcial.
                                        </p>
                                        <p>
                                            Desde nuestros inicios en un pequeño dojo en Okinawa, hemos crecido hasta convertirnos
                                            en una organización internacional con presencia en tres continentes, manteniendo
                                            siempre los más altos estándares de enseñanza y práctica.
                                        </p>
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-3xl overflow-hidden">
                                        <div className="p-8 text-white">
                                            <Calendar className="h-12 w-12 mb-4" />
                                            <h3 className="text-2xl font-bold mb-2">1997</h3>
                                            <p className="text-gray-300">Año de Fundación</p>
                                            <p className="text-sm text-gray-400 mt-4">
                                                "Comienza tu viaje marcial donde otros terminaron el suyo"
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Timeline Section */}
                            {/* <TimelineSection timeline={timeline} /> */}
                        </div>
                    </div>
                </section>
            )}

            {/* Junta Directiva */}
            {activeTab === "directiva" && (
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Kavoon" }}>
                                    Junta <span className="text-red-600">Directiva</span>
                                </h2>
                                <p className="text-xl text-gray-700">
                                    Liderazgo experimentado con décadas de dedicación a las artes marciales
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-8">
                                {foundingMembers.map((member, index) => (
                                    <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                                        <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 relative">
                                            {/* Placeholder para imagen */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Users className="h-24 w-24 text-gray-400" />
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-bold">
                                                    {member.rank}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 mb-4">{member.position}</p>
                                            <div className="space-y-2">
                                                {member.arts.map((art, idx) => (
                                                    <div key={idx} className="flex items-center text-sm text-gray-500">
                                                        <div className="h-1.5 w-1.5 bg-red-500 rounded-full mr-2"></div>
                                                        {art}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Rangos Jerárquicos */}
                            <div className="mt-20">
                                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: "Kavoon" }}>
                                    Sistema de <span className="text-red-600">Rangos</span>
                                </h3>
                                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                                    <div className="grid md:grid-cols-4 gap-6">
                                        {[
                                            { rank: "Shihan", level: "Maestro Instructor", color: "red" },
                                            { rank: "Kyoshi", level: "Instructor Principal", color: "orange" },
                                            { rank: "Renshi", level: "Instructor Certificado", color: "blue" },
                                            { rank: "Sensei", level: "Instructor", color: "green" }
                                        ].map((item, index) => (
                                            <div key={index} className="text-center p-4">
                                                <div className={`h-16 w-16 rounded-full mx-auto mb-4 flex items-center justify-center ${item.color === 'red' ? 'bg-red-100' :
                                                        item.color === 'orange' ? 'bg-orange-100' :
                                                            item.color === 'blue' ? 'bg-blue-100' : 'bg-green-100'
                                                    }`}>
                                                    <Award className={`h-8 w-8 ${item.color === 'red' ? 'text-red-600' :
                                                            item.color === 'orange' ? 'text-orange-600' :
                                                                item.color === 'blue' ? 'text-blue-600' : 'text-green-600'
                                                        }`} />
                                                </div>
                                                <h4 className="font-bold text-gray-900">{item.rank}</h4>
                                                <p className="text-sm text-gray-600">{item.level}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Nuestros Dojos */}
            {activeTab === "dojos" && (
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Kavoon" }}>
                                    Nuestros <span className="text-red-600">Dojos</span>
                                </h2>
                                <p className="text-xl text-gray-700">
                                    Red internacional de dojos certificados por Hiramatsukai
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                {dojos.map((dojo, index) => (
                                    <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-1">{dojo.name}</h3>
                                                <div className="flex items-center text-gray-600">
                                                    <MapPin className="h-4 w-4 mr-1" />
                                                    {dojo.location}
                                                </div>
                                            </div>
                                            <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-bold">
                                                {dojo.students} estudiantes
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <p className="text-gray-700 mb-2">
                                                <span className="font-semibold">Instructor Principal:</span> {dojo.headInstructor}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {dojo.arts.map((art, idx) => (
                                                    <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                                        {art}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <Button variant="outline" className="w-full border-blue-500 text-blue-600 hover:bg-blue-50">
                                            Contactar Dojo
                                        </Button>
                                    </div>
                                ))}
                            </div>

                            {/* Mapa de dojos (conceptual) */}
                            <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
                                <div className="flex items-center gap-4 mb-6">
                                    <Globe className="h-8 w-8" />
                                    <h3 className="text-2xl font-bold" style={{ fontFamily: "Kavoon" }}>
                                        Presencia <span className="text-yellow-400">Global</span>
                                    </h3>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div>
                                        <div className="text-3xl font-bold mb-2">4</div>
                                        <div className="text-gray-300">Dojos Principales</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold mb-2">12</div>
                                        <div className="text-gray-300">Dojos Afiliados</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold mb-2">15</div>
                                        <div className="text-gray-300">Países</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold mb-2">3</div>
                                        <div className="text-gray-300">Continentes</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Artes Marciales */}
            {activeTab === "artes" && (
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Kavoon" }}>
                                    Artes <span className="text-red-600">Marciales</span>
                                </h2>
                                <p className="text-xl text-gray-700">
                                    Tres disciplinas, una filosofía: excelencia marcial integral
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-8 mb-16">
                                {arts.map((art, index) => {
                                    const Icon = art.icon;
                                    return (
                                        <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                                            <div className={`p-6 bg-gradient-to-r from-${art.color}-500 to-${art.color}-600 text-white`}>
                                                <Icon className="h-12 w-12 mb-4" />
                                                <h3 className="text-2xl font-bold">{art.name}</h3>
                                                <p className="opacity-90">{art.description}</p>
                                            </div>
                                            <div className="p-6">
                                                <ul className="space-y-3">
                                                    {art.features.map((feature, idx) => (
                                                        <li key={idx} className="flex items-center">
                                                            <div className={`h-2 w-2 bg-${art.color}-500 rounded-full mr-3`}></div>
                                                            <span className="text-gray-700">{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Galería de fotos */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: "Kavoon" }}>
                                    Galería <span className="text-red-600">Hiramatsukai</span>
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[1, 2, 3, 4].map((item) => (
                                        <div key={item} className="aspect-square bg-linear-to-br from-gray-200 to-gray-300 rounded-xl overflow-hidden">
                                            <div className="h-full flex items-center justify-center">
                                                <div className="text-center">
                                                    <div className="text-4xl mb-2">
                                                        {item === 1 ? "🥋" : item === 2 ? "⚔️" : item === 3 ? "🎯" : "🌟"}
                                                    </div>
                                                    <p className="text-sm text-gray-600">Foto {item}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Footer de Contacto */}
            <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "Kavoon" }}>
                            Únete a <span className="text-yellow-400">Hiramatsukai</span>
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Forma parte de una organización seria y comprometida con la excelencia marcial
                        </p>

                        <div className="grid md:grid-cols-3 gap-8 mb-12">
                            <div className="flex items-center justify-center gap-3">
                                <Mail className="h-6 w-6 text-yellow-400" />
                                <span>info@hiramatsukai.org</span>
                            </div>
                            <div className="flex items-center justify-center gap-3">
                                <Phone className="h-6 w-6 text-yellow-400" />
                                <span>+81 98-987-6543</span>
                            </div>
                            <div className="flex items-center justify-center gap-3">
                                <MapPin className="h-6 w-6 text-yellow-400" />
                                <span>Okinawa, Japón</span>
                            </div>
                        </div>

                        <div className="flex gap-4 justify-center mb-8">
                            <Button size="icon" className="bg-white/10 hover:bg-white/20">
                                <Facebook className="h-5 w-5" />
                            </Button>
                            <Button size="icon" className="bg-white/10 hover:bg-white/20">
                                <Instagram className="h-5 w-5" />
                            </Button>
                            <Button size="icon" className="bg-white/10 hover:bg-white/20">
                                <Youtube className="h-5 w-5" />
                            </Button>
                        </div>

                        <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-12">
                            Solicitar Información
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
