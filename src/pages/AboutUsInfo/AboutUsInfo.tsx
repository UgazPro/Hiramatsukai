import { useState } from "react";
import { Users, Award, Shield, MapPin, Globe, Calendar, Swords, TargetIcon, Zap, Mail } from "lucide-react";
import CarouselComponent from "@/components/CarouselComponent";
import { useDojos } from "@/hooks/useDojos";

export default function AboutUsInfo() {

    const [activeTab, setActiveTab] = useState("historia");

    const tabs = [
        { id: "historia", label: "Nuestra Historia", icon: Calendar },
        { id: "directiva", label: "Junta Directiva", icon: Users },
        { id: "dojos", label: "Nuestros Dojos", icon: MapPin },
        { id: "artes", label: "Artes Marciales", icon: Swords }
    ];

    const boardMembers = [
        {
            position: "Presidente",
            name: "Carlos M. Gonzalez A.",
            rank: "7mo Dan Cinturón Negro",
            id: "13.000.711",
            location: "4001 Maracaibo, Zulia, Venezuela",
            phones: ["+58 414 6220277", "+58 416 6514935"],
            email: "kyoshicarlosgonzalez@gmail.com"
        },
        {
            position: "Vice-Presidente",
            name: "Miguel A. Dávila A.",
            rank: "7mo Dan Cinturón Negro",
            id: "8.504.782",
            location: "4001 Maracaibo, Zulia, Venezuela",
            phones: ["+58 414 6411694", "+58 412 6756928"],
            email: "okinawakan@gmail.com"
        },
        {
            position: "Secretario General",
            name: "Luis A. Ugaz M.",
            rank: "6to Dan Cinturón Negro",
            id: "11.393.035",
            location: "4001 Maracaibo, Zulia, Venezuela",
            phones: ["+58 412 9681574"],
            email: "kenzendougaz@gmail.com"
        },
        {
            position: "Secretario de Finanzas",
            name: "Jose B. Sanchez R.",
            rank: "3er Dan Cinturón Negro",
            id: "17.805.752",
            location: "4001 Maracaibo, Zulia, Venezuela",
            phones: ["+58 414 5950475", "+58 424 6752070"],
            email: "josben.21@gmail.com"
        },
        {
            position: "Secretario de Fichaje",
            name: "Argenis A. Castro T.",
            rank: "5to Dan Cinturón Negro",
            id: "15.408.993",
            location: "4017 Ciudad Ojeda, Zulia, Venezuela",
            phones: ["+58 424 6367361"],
            email: "argenisc-51@hotmail.com"
        },
        {
            position: "Consultor Jurídico",
            name: "Joanny V. Medina A.",
            rank: "3er Dan Cinturón Negro",
            id: "16.149.211",
            location: "4001 Maracaibo, Zulia, Venezuela",
            phones: ["+58 414 6846202"],
            email: "joanny_medina84@hotmail.com"
        },
        {
            position: "Miembro",
            name: "Elizabeth V. Gonzalez L.",
            rank: "3er Dan Cinturón Negro",
            id: "19.936.393",
            location: "4001 Maracaibo, Zulia, Venezuela",
            phones: ["+58 412 0716227"],
            email: "elizabeth.vgl@gmail.com"
        },
        {
            position: "Miembro",
            name: "Luis E. Collantes A.",
            rank: "3er Dan Cinturón Negro",
            id: "16.353.635",
            location: "4001 Maracaibo, Zulia, Venezuela",
            phones: ["+58 414 0633631"],
            email: "luiscollantes.remax@gmail.com"
        },
        {
            position: "Miembro",
            name: "Jeancarlos Morillo",
            rank: "2do Dan Cinturón Negro",
            id: "16.886.601",
            location: "4001 Maracaibo, Zulia, Venezuela",
            phones: ["+58 424 6303215"],
            email: "jeanmorillo66@gmail.com"
        }
    ];

    const { data: dojos = [] } = useDojos();

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
                <div className="h-150 md:h-175">
                    <CarouselComponent />
                </div>
            </section>

            {/* Introducción */}
            <section className="bg-white">
                <div className="px-4">
                    <div className="text-center">
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
                        <div className="hidden  grid-cols-1 md:grid-cols-3 gap-8 mt-12">
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
            <section className="py-8 bg-gray-50">
                <div className="px-4">
                    <div className="">
                        <div className="flex flex-wrap gap-2 justify-center">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 ${isActive
                                            ? 'bg-linear-to-r from-red-500 to-red-600 text-white shadow-lg'
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
                <section className="py-8">
                    <div className="px-4">
                        <div>
                            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: "Kavoon" }}>
                                        Nuestra <span className="text-red-600">Historia</span>
                                    </h2>
                                    <div className="space-y-4 text-gray-700">
                                        <p>
                                            La Hiramatsukai fue fundada en 1997 por un grupo de maestros dedicados a preservar
                                            las artes marciales tradicionales de Okinawa en su forma más auténtica impartidas por el Maestro Hiramatsu.
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
                <section className="py-8 bg-gray-50">
                    <div className="px-4">
                        <div>
                            <div className="text-center mb-12">
                                <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Kavoon" }}>
                                    Junta <span className="text-red-600">Directiva</span>
                                </h2>
                                <p className="text-xl text-gray-700">
                                    Liderazgo experimentado con décadas de dedicación a las artes marciales
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {boardMembers.map((member, index) => (
                                    <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-bold uppercase">
                                                {member.position}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                        <div className="flex items-center gap-2 mb-4">
                                            <Award className="h-4 w-4 text-red-500" />
                                            <span className="text-sm font-semibold text-gray-700">{member.rank}</span>
                                        </div>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <MapPin className="h-4 w-4 text-gray-400 mr-2 shrink-0" />
                                                {member.location}
                                            </div>
                                            <div className="flex items-center">
                                                <Users className="h-4 w-4 text-gray-400 mr-2 shrink-0" />
                                                C.I: {member.id}
                                            </div>
                                            <div className="flex items-start">
                                                <Globe className="h-4 w-4 text-gray-400 mr-2 shrink-0 mt-0.5" />
                                                <div>
                                                    <a href={`tel:${member.phones[0].replace(/[^+\d]/g, "")}`} className="hover:text-red-600 block">
                                                        {member.phones.join(" / ")}
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <Mail className="h-4 w-4 text-gray-400 mr-2 shrink-0" />
                                                <a href={`mailto:${member.email}`} className="hover:text-red-600 break-all">
                                                    {member.email}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Rangos Jerárquicos */}
                            <div className="mt-20 hidden">
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
                <section>
                    <div className="px-4">
                        <div>
                            <div className="text-center mb-12">
                                <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Kavoon" }}>
                                    Nuestros <span className="text-red-600">Dojos</span>
                                </h2>
                                {/* <p className="text-xl text-gray-700">
                                    Red internacional de dojos certificados por Hiramatsukai
                                </p> */}
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                {dojos.map((dojo, index) => (
                                    <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-1">{dojo.dojo}</h3>
                                                <div className="flex items-center text-gray-600">
                                                    <MapPin className="h-4 w-4 mr-1" />
                                                    <p className="text-gray-600 whitespace-nowrap text-ellipsis overflow-hidden w-80">{dojo.address}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-center py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-bold min-w-30">
                                                {dojo.students} estudiantes
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <p className="text-gray-700 mb-2">
                                                <span className="font-semibold">Instructor Principal:</span> {dojo.leaderInstructor?.userRanks?.[0]?.rank?.rank_name} {dojo.leaderInstructor?.name} {dojo.leaderInstructor?.lastName}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {dojo.dojoMartialArts.map((art, idx) => (
                                                    <span key={idx} className="flex items-center gap-2 py-1 px-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                                                        <img src={`/${art.icon}`} className="w-8 h-8" alt={art.martialArt} /> {art.martialArt}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
{/* 
                                        <Button variant="outline" className="w-full border-blue-500 text-blue-600 hover:bg-blue-50">
                                            Contactar Dojo
                                        </Button> */}
                                    </div>
                                ))}
                            </div>

                            {/* Mapa de dojos (conceptual) */}
                            <div className="hidden mt-16 bg-linear-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
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
                    <div className="px-4">
                        <div>
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
                                            <div className={`p-6 bg-linear-to-r from-${art.color}-500 to-${art.color}-600 text-white`}>
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
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
