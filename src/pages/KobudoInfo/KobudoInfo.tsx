import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Target, Shield, Book } from "lucide-react";
import CarouselComponent from "@/components/CarouselComponent";
import { AnimatePresence, motion } from "motion/react";
import { GiSai } from "react-icons/gi";
import { GiNunchaku } from "react-icons/gi";
import { GiStickGrenade } from "react-icons/gi";
import { GiBo } from "react-icons/gi";
import { GiBaton } from "react-icons/gi";

export default function KobudoInfo() {

    const [selectedWeapon, setSelectedWeapon] = useState("bo");

    const mainWeapons = [
        {
            id: "bo",
            name: "Bo",
            description: "Bastón largo de 1.8 metros",
            icon: GiBo,
            length: "180 cm",
            material: "Roble rojo o blanco",
            origin: "Palo de caminante o herramienta agrícola",
            techniques: ["Tsuki (estocadas)", "Uchi (golpes)", "Barridos", "Bloqueos"],
            color: "yellow"
        },
        {
            id: "sai",
            name: "Sai",
            description: "Tridente de metal para defensa",
            icon: GiSai,
            length: "45-50 cm",
            material: "Acero forjado",
            origin: "Herramienta agrícola o de pesca",
            techniques: ["Atrapamiento", "Golpes de punta", "Bloqueos", "Desarmes"],
            color: "blue"
        },
        {
            id: "tonfa",
            name: "Tonfa",
            description: "Porra con mango lateral",
            icon: GiBaton,
            length: "50-60 cm",
            material: "Madera dura (roble)",
            origin: "Mango de molino de arroz",
            techniques: ["Rotaciones", "Golpes potentes", "Bloqueos", "Controles"],
            color: "red"
        },
        {
            id: "nunchaku",
            name: "Nunchaku",
            description: "Dos palos unidos por cadena o cuerda",
            icon: GiNunchaku,
            length: "30 cm cada palo",
            material: "Madera dura y cadena de acero",
            origin: "Trilladora de arroz",
            techniques: ["Golpes giratorios", "Bloqueos", "Atrapamientos", "Fintas"],
            color: "purple"
        },
        {
            id: "kai",
            name: "Kai",
            description: "Remo okyanawense",
            icon: GiStickGrenade,
            length: "160-180 cm",
            material: "Madera de camelia",
            origin: "Remo de pescador",
            techniques: ["Cortes amplios", "Barridos", "Golpes de hoja", "Defensa marítima"],
            color: "green"
        }
    ];

    const additionalWeapons = [
        { name: "Korunkua", type: "Báculo", description: "Báculo utilizado por ancianos" },
        { name: "Tekko", type: "Puño de hierro", description: "Armadura de mano metálica" },
        { name: "Kama", type: "Hoz", description: "Herramienta agrícola de doble filo" },
        { name: "Tinbei", type: "Escudo y lanza", description: "Escudo de caparazón con lanza corta" },
        { name: "Sansetsukon", type: "Nunchaku triple", description: "Tres secciones unidas por cadenas" }
    ];

    const katas = [
        { name: "Shushi no Kon", weapon: "Bo", level: "Avanzado", style: "Matayoshi" },
        { name: "Chikin no Sai", weapon: "Sai", level: "Intermedio", style: "Matayoshi" },
        { name: "Hamahiga no Tonfa", weapon: "Tonfa", level: "Intermedio", style: "Jinbukai" },
        { name: "Maezato no Nunchaku", weapon: "Nunchaku", level: "Básico", style: "Matayoshi" },
        { name: "Chatan Yara no Kai", weapon: "Kai", level: "Avanzado", style: "Matayoshi" }
    ];

    const selectedWeaponData = mainWeapons.find(w => w.id === selectedWeapon);
    const accentByWeapon: Record<string, string> = {
        bo: "#8b5a2b",
        sai: "#1d4ed8",
        tonfa: "#dc2626",
        nunchaku: "#7c3aed",
        kai: "#15803d",
    };
    const gradientByWeapon: Record<string, string> = {
        bo: "linear-gradient(90deg, #7a4d24 0%, #9a6835 100%)",
        sai: "linear-gradient(90deg, #1e40af 0%, #1d4ed8 100%)",
        tonfa: "linear-gradient(90deg, #b91c1c 0%, #dc2626 100%)",
        nunchaku: "linear-gradient(90deg, #6d28d9 0%, #7c3aed 100%)",
        kai: "linear-gradient(90deg, #166534 0%, #15803d 100%)",
    };

    return (

        <div className="min-h-screen bg-linear-to-b from-white to-gray-50">
            <section className="relative">
                <div className="h-[600px] md:h-[700px]">
                    <CarouselComponent />
                </div>
            </section>

            {/* Introducción */}
            <section className="bg-white">
                <div className="px-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-block px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-bold mb-6">
                                Línea Matayoshi-Jinbukai
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: "Kavoon" }}>
                                Kobudo <span className="text-blue-600">Matayoshi</span>
                            </h1>
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                Fundado por el gran maestro <strong>Shinko Matayoshi</strong> (1888-1947)
                                y continuado por su hijo Shinpo Matayoshi, nuestro Kobudo integra la
                                tradición Matayoshi con los refinamientos técnicos de la Jinbukai.
                            </p>
                            <p className="text-lg text-gray-700 mb-8">
                                En Hiramatsukai, enseñamos el Kobudo como un sistema completo de
                                armas tradicionales, preservando las katas originales y las aplicaciones
                                prácticas de cada arma.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8">
                                    Aprender Kobudo
                                </Button>
                                <Button size="lg" variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50">
                                    Ver Demostración
                                </Button>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-3xl p-1">
                                <div className="bg-white rounded-2xl p-8">
                                    <div className="aspect-square rounded-xl overflow-hidden bg-linear-to-br from-blue-50 to-white flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="grid grid-cols-2 gap-4">
                                                <GiBo className="h-12 w-12 text-blue-500" />
                                                <GiSai className="h-12 w-12 text-blue-500" />
                                                <Target className="h-12 w-12 text-blue-500" />
                                                <GiNunchaku className="h-12 w-12 text-blue-500" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mt-4" style={{ fontFamily: "Kavoon" }}>
                                                5 Armas Principales
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Selección de Armas Principales */}
            <section className="p-10 bg-gray-50">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Kavoon" }}>
                        Armas <span className="text-blue-600">Principales</span>
                    </h2>
                    <p className="text-xl text-gray-700">
                        Las cinco armas fundamentales del sistema Matayoshi
                    </p>
                </div>

                {/* Selector de Armas */}
                <div className="mb-8">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {mainWeapons.map((weapon) => {
                            const Icon = weapon.icon;
                            const isSelected = selectedWeapon === weapon.id;
                            return (
                                <motion.button
                                    key={weapon.id}
                                    type="button"
                                    layout
                                    initial={false}
                                    onClick={() => setSelectedWeapon(weapon.id)}
                                    className={`relative overflow-hidden flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 border ${isSelected
                                        ? "text-white shadow-lg scale-105 border-transparent"
                                        : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
                                        }`}
                                >
                                    {isSelected ? (
                                        <motion.span
                                            layoutId="kobudo-weapon-highlight"
                                            className="absolute inset-0 rounded-2xl"
                                            style={{ backgroundColor: accentByWeapon[weapon.id] ?? "#2563eb" }}
                                            transition={{ type: "spring", stiffness: 320, damping: 28 }}
                                        />
                                    ) : null}

                                    <Icon
                                        className="relative z-10 h-8 w-8 mb-3"
                                        style={{ color: isSelected ? "#ffffff" : accentByWeapon[weapon.id] }}
                                    />
                                    <span className="relative z-10 font-bold">{weapon.name}</span>
                                    <span className="relative z-10 text-sm mt-1 opacity-80">{weapon.description}</span>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* Detalle del Arma Seleccionada */}
                <AnimatePresence mode="wait" initial={false}>
                    {selectedWeaponData && (
                        <motion.div
                            key={selectedWeaponData.id}
                            className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-4"
                            initial={{ opacity: 0, y: 16, scale: 0.99 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -12, scale: 0.99 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <div
                                className="p-8 md:p-12 text-white"
                                style={{
                                    background: gradientByWeapon[selectedWeaponData.id] ?? "linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)",
                                }}
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-3xl font-bold" style={{ fontFamily: "Kavoon" }}>
                                            {selectedWeaponData.name}
                                        </h3>
                                        <p className="opacity-90">{selectedWeaponData.description}</p>
                                    </div>
                                    <selectedWeaponData.icon className="h-16 w-16 opacity-80" />
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="font-bold text-lg mb-2">Características</h4>
                                        <div className="space-y-2">
                                            <div className="flex">
                                                <span className="w-32 opacity-80">Longitud:</span>
                                                <span>{selectedWeaponData.length}</span>
                                            </div>
                                            <div className="flex">
                                                <span className="w-32 opacity-80">Material:</span>
                                                <span>{selectedWeaponData.material}</span>
                                            </div>
                                            <div className="flex">
                                                <span className="w-32 opacity-80">Origen:</span>
                                                <span>{selectedWeaponData.origin}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-2">Técnicas Principales</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedWeaponData.techniques.map((tech, index) => (
                                                <span key={index} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8">
                                <h4 className="text-2xl font-bold text-gray-900 mb-6">Katas Específicos</h4>
                                <div className="space-y-4">
                                    {katas
                                        .filter(kata => kata.weapon === selectedWeaponData.name)
                                        .map((kata, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: 12 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.06 * index, duration: 0.22 }}
                                                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                                            >
                                                <div>
                                                    <h5 className="font-bold text-gray-900">{kata.name}</h5>
                                                    <div className="flex items-center gap-4 mt-1">
                                                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                                            {kata.level}
                                                        </span>
                                                        <span className="text-sm text-gray-600">{kata.style}</span>
                                                    </div>
                                                </div>
                                                <Book className="h-6 w-6 text-gray-400" />
                                            </motion.div>
                                        ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/* Armas Adicionales */}
            <section className="px-10">
                <div className="text-center mb-4">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Kavoon" }}>
                        Armas <span className="text-blue-600">Adicionales</span>
                    </h2>
                    <p className="text-xl text-gray-700">
                        Especializaciones avanzadas dentro del sistema Matayoshi
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {additionalWeapons.map((weapon, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                            <div className="text-center">
                                <div className="inline-block p-3 bg-gray-100 rounded-xl mb-4">
                                    <GiBo className="h-8 w-8 text-gray-600" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1">{weapon.name}</h3>
                                <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-bold mb-3 inline-block">
                                    {weapon.type}
                                </div>
                                <p className="text-sm text-gray-600">{weapon.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Sistema de Grados */}
            <section className="p-10 bg-linear-to-b from-gray-50 to-white">
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Kavoon" }}>
                            Sistema de <span className="text-blue-600">Grados</span>
                        </h2>
                        <p className="text-xl text-gray-700">
                            Especialización progresiva en armas tradicionales
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-blue-600">初</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Nivel Básico</h3>
                            <p className="text-gray-600 mb-4">
                                Fundamentos de Bo y Sai. Posturas básicas y movimientos esenciales.
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-yellow-600">中</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Nivel Intermedio</h3>
                            <p className="text-gray-600 mb-4">
                                Tonfa y Nunchaku. Katas completos y aplicaciones prácticas.
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-red-600">高</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Nivel Avanzado</h3>
                            <p className="text-gray-600 mb-4">
                                Kai y armas adicionales. Maestría en el sistema completo.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-10 bg-linear-to-r from-gray-900 to-gray-800">
                <div className="container mx-auto px-8">
                    <div className="text-center text-white">
                        <Shield className="h-16 w-16 mx-auto mb-6" />
                        <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "Kavoon" }}>
                            Domina el Arte de las <span className="text-yellow-400">Armas Tradicionales</span>
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Entrenamiento riguroso, historia viva, técnica depurada
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white px-8">
                                Inscribirse en Kobudo
                            </Button>
                            <Button size="lg" variant="outline" className="border-2 border-white text-black hover:bg-white/10">
                                Seminario de Armas
                            </Button>
                        </div>
                        <p className="mt-8 text-gray-400">
                            Equipo profesional incluido • Clases especializadas • Certificación internacional
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
