import { useParams, Link } from "react-router";
import { ArrowLeft, Calendar, MapPin, Award } from "lucide-react";
import { getMasterBySlug } from "./masterData";
import Reveal from "@/components/animation/Reveal";
import { Button } from "@/components/ui/button";

export default function MasterInfo() {
    const { slug } = useParams<{ slug: string }>();
    const master = getMasterBySlug(slug ?? "");

    if (!master) {
        return (
            <div className="min-h-screen bg-linear-to-b from-white to-gray-50 flex items-center justify-center">
                <div className="text-center px-4">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Kavoon" }}>
                        Maestro no encontrado
                    </h1>
                    <p className="text-gray-600 mb-8">No se encontró información para este maestro.</p>
                    <Button asChild variant="outline" className="border-2 border-red-500 text-red-600 hover:bg-red-50">
                        <Link to="/">Volver al inicio</Link>
                    </Button>
                </div>
            </div>
        );
    }

    const colorClasses = {
        red: {
            bg: "from-red-500 to-red-700",
            badge: "bg-red-100 text-red-700",
            text: "text-red-600",
            border: "border-red-200",
            light: "bg-red-50",
        },
        blue: {
            bg: "from-blue-500 to-blue-700",
            badge: "bg-blue-100 text-blue-700",
            text: "text-blue-600",
            border: "border-blue-200",
            light: "bg-blue-50",
        },
        yellow: {
            bg: "from-yellow-500 to-yellow-700",
            badge: "bg-yellow-100 text-yellow-700",
            text: "text-yellow-600",
            border: "border-yellow-200",
            light: "bg-yellow-50",
        },
    };

    const colors = colorClasses[master.color as keyof typeof colorClasses] || colorClasses.red;

    return (
        <div className="min-h-screen bg-linear-to-b from-white to-gray-50">

            <section className={`relative bg-linear-to-br ${colors.bg} text-white w-full`}>
                <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-5">

                    <div className="flex justify-between items-center">
                        <Reveal y={16} className="hidden sm:block">
                            <Button
                                asChild
                                variant="ghost"
                                size="lg"
                                className="text-white/80 hover:text-white hover:bg-white/10 -mr-2"
                            >
                                <Link to="/">
                                    <ArrowLeft className="h-5 w-5 mr-2" />
                                    Volver al inicio
                                </Link>
                            </Button>
                        </Reveal>
                        <div className="flex items-center justify-between gap-6">

                            <div className="flex flex-col sm:flex-row items-start gap-6">
                                <Reveal y={20}>
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/40 shrink-0 overflow-hidden">
                                        {master.image ? (
                                            <img
                                                src={master.image}
                                                alt={master.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-4xl sm:text-5xl font-bold" style={{ fontFamily: "Kavoon" }}>
                                                {master.initials}
                                            </span>
                                        )}
                                    </div>
                                </Reveal>

                                <Reveal y={18} delay={0.1}>
                                    <div>
                                        <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold mb-3">
                                            {master.art}
                                        </div>
                                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2" style={{ fontFamily: "Kavoon" }}>
                                            {master.name}
                                        </h1>
                                        <p className="text-base sm:text-lg text-white/90 mb-3">{master.subtitle}</p>

                                        <div className="flex flex-wrap gap-4 text-sm text-white/80">
                                            {master.birthYear && (
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    {master.birthYear} - {master.deathYear}
                                                </div>
                                            )}
                                            {master.birthPlace && (
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="h-4 w-4" />
                                                    {master.birthPlace}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Reveal>
                            </div>

                        </div>
                    </div>

                </div>
            </section>

            <section className="py-12 sm:py-16">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">

                        <Reveal className="mb-12" y={16}>
                            <div className={`p-6 sm:p-8 ${colors.light} rounded-2xl border ${colors.border}`}>
                                <p className="text-lg text-gray-700 leading-relaxed italic">
                                    {master.intro}
                                </p>
                            </div>
                        </Reveal>

                        {master.sections.map((section, index) => (
                            <Reveal key={index} className="mb-12" y={16} delay={index * 0.05}>
                                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-gray-100">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className={`h-10 w-10 rounded-full ${colors.badge} flex items-center justify-center`}>
                                            <Award className={`h-5 w-5 ${colors.text}`} />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Kavoon" }}>
                                            {section.title}
                                        </h2>
                                    </div>
                                    <div className="space-y-4">
                                        {section.content.map((paragraph, pIndex) => (
                                            <p key={pIndex} className="text-gray-700 leading-relaxed">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>
                        ))}

                        <Reveal y={16}>
                            <div className={`p-6 sm:p-8 bg-linear-to-br ${colors.bg} text-white rounded-2xl`}>
                                <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "Kavoon" }}>
                                    Legado
                                </h3>
                                <p className="text-white/90 leading-relaxed text-lg">
                                    {master.legacy}
                                </p>
                            </div>
                        </Reveal>

                        <Reveal className="mt-12 text-center" y={12}>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                <Link to="/#masters">Volver a Grandes Maestros</Link>
                            </Button>
                        </Reveal>

                    </div>
                </div>
            </section>

        </div>
    );
}
