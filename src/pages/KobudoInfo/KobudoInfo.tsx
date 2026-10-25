import { useState } from "react";
import { Book } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { GiSai } from "react-icons/gi";
import { GiNunchaku } from "react-icons/gi";
import { GiBo } from "react-icons/gi";
import { mainWeapons, additionalWeapons, katas } from "./kobudoInfo.data";
import { GiStickGrenade } from "react-icons/gi";
import { GiBaton } from "react-icons/gi";

export default function KobudoInfo() {

    const [selectedWeapon, setSelectedWeapon] = useState("bo");

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

    const [showAllKatas, setShowAllKatas] = useState(false);
    const weaponKatas = selectedWeaponData
        ? katas.filter(k => k.weapon === selectedWeaponData.name)
        : [];
    const visibleKatas = showAllKatas ? weaponKatas : weaponKatas.slice(0, 3);
    const hasMoreKatas = weaponKatas.length > 3;

    return (
        <div className="min-h-screen bg-brand-washi">
            {/* Introducción */}
            <section className="relative overflow-hidden bg-brand-washi pb-12 pt-12 lg:pb-16 lg:pt-16">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-wood opacity-25" />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
                    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                        <div>
                            <span className="section-eyebrow rounded-full border border-brand-indigo/25 bg-brand-indigo/10 px-4 py-2 text-brand-indigo">
                                Línea Matayoshi-Jinbukai
                            </span>
                            <h1 className="mt-6 text-balance font-serif text-4xl font-semibold leading-[1.1] text-brand-ink md:text-5xl lg:text-6xl">
                                Kobudo <span className="text-brand-vermilion">Matayoshi</span>
                            </h1>
                            <div aria-hidden="true" className="gold-rule mt-6 h-px w-32" />
                            <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-muted sm:text-lg">
                                Fundado por el gran maestro <strong className="font-semibold text-brand-ink">Shinko Matayoshi</strong> (1888-1947)
                                y continuado por su hijo Shinpo Matayoshi, nuestro Kobudo integra la
                                tradición Matayoshi con los refinamientos técnicos de la Jinbukai.
                            </p>
                            <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-muted sm:text-lg">
                                En la organización Hiramatsukai, enseñamos el Kobudo como un sistema completo de
                                armas tradicionales, preservando los katas originales y las aplicaciones
                                prácticas de cada arma.
                            </p>
                        </div>

                        <div className="relative">
                            <div className="group relative overflow-hidden rounded-[2rem] border border-brand-indigo/20 bg-white/55 p-7 shadow-lift backdrop-blur-md sm:p-9">
                                <div aria-hidden="true" className="absolute inset-0 bg-wood opacity-20 transition-opacity duration-500 group-hover:opacity-30" />
                                <div aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-indigo/10 blur-3xl" />

                                <div className="relative grid grid-cols-3 gap-5 text-brand-indigo/85 sm:gap-7">
                                    <GiBo className="h-16 w-full transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105 sm:h-20" />
                                    <GiSai className="h-16 w-full transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105 sm:h-20" />
                                    <GiNunchaku className="h-16 w-full transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105 sm:h-20" />
                                    <div className="col-span-3 flex items-center justify-around">
                                        <GiBaton className="h-14 w-14 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105 sm:h-16 sm:w-16" />
                                        <GiStickGrenade className="h-14 w-14 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105 sm:h-16 sm:w-16" />
                                    </div>
                                </div>

                                <div className="relative mt-7 border-t border-brand-ink/10 pt-5 text-center">
                                    <span className="section-eyebrow text-brand-gold-deep">Sistema Matayoshi</span>
                                    <h3 className="mt-2 font-serif text-2xl font-semibold text-brand-ink">
                                        5 armas principales
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Selección de Armas Principales */}
            <section className="bg-brand-washi-deep px-4 py-14 lg:px-10">
                <div className="text-center mb-8">
                    <span className="section-eyebrow text-brand-gold-deep">Sistema Matayoshi</span>
                    <h2 className="mb-4 mt-3 font-serif text-3xl font-semibold text-brand-ink sm:text-4xl">
                        Armas <span className="text-brand-vermilion">Principales</span>
                    </h2>
                    <p className="text-base text-brand-muted sm:text-lg">
                        Las cinco armas fundamentales del sistema Matayoshi
                    </p>
                </div>

                {/* Selector de Armas */}
                <div className="mb-8">
                    <div className="flex md:grid md:grid-cols-5 gap-4 overflow-x-auto pb-2 md:overflow-visible md:pb-0">
                        {mainWeapons.map((weapon) => {
                            const Icon = weapon.icon;
                            const isSelected = selectedWeapon === weapon.id;
                            return (
                                <motion.button
                                    key={weapon.id}
                                    type="button"
                                    layout
                                    initial={false}
                                    onClick={() => {
                                        setSelectedWeapon(weapon.id);
                                        setShowAllKatas(false);
                                    }}
                                    className={`relative min-w-44 md:min-w-0 cursor-pointer overflow-hidden flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 border ${isSelected
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
                                        <h3 className="text-3xl font-bold">
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
                                    {visibleKatas.map((kata, index) => (
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

                                    {hasMoreKatas && (
                                        <motion.button
                                            layout
                                            onClick={() => setShowAllKatas(prev => !prev)}
                                            className="w-full mt-4 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer"
                                            style={{
                                                background: showAllKatas
                                                    ? "transparent"
                                                    : gradientByWeapon[selectedWeaponData.id],
                                                color: showAllKatas
                                                    ? accentByWeapon[selectedWeaponData.id]
                                                    : "#ffffff",
                                                border: showAllKatas
                                                    ? `2px solid ${accentByWeapon[selectedWeaponData.id]}`
                                                    : "2px solid transparent",
                                            }}
                                        >
                                            {showAllKatas ? "▲ Mostrar menos" : `▼ Ver más (${weaponKatas.length - 3} restantes)`}
                                        </motion.button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/* Armas Adicionales */}
            <section className="lg:px-10 px-4">
                <div className="text-center mb-4">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Armas <span className="text-blue-600">Adicionales</span>
                    </h2>
                    <p className="text-xl text-gray-700">
                        Especializaciones avanzadas dentro del sistema Matayoshi
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6">
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
            <section className="lg:p-10 p-4 bg-linear-to-b from-gray-50 to-white">
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
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
        </div>
    );
}
