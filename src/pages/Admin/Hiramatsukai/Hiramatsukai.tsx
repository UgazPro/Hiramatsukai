import { useEffect, useMemo, useState } from "react";
import { User, ChevronRight, Shield, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "@/components/spinner/Loader";
import { TableComponent, Column } from "@/components/table/TableComponent";
import { useAppliedStudents } from "@/hooks/useActivities";
import { useDojoMartialArts } from "@/hooks/useDojos";
import { IAppliedStudent } from "@/services/activities/activity.interface";
import { dateFormatterIntoLong } from "@/helpers/formatter";

const getBeltColor = (grado: string) => {
    const colors: Record<string, string> = {
        'Blanco': 'bg-white text-gray-800 border border-gray-300',
        'Blanco Punta Amarillo': 'bg-white text-gray-800 border border-gray-300',
        'Blanco Raya Amarillo': 'bg-white text-gray-800 border border-gray-300',
        'Amarillo': 'bg-yellow-200 text-yellow-800',
        'Naranja': 'bg-orange-300 text-orange-800',
        'Verde': 'bg-green-100 text-green-800',
        'Azul': 'bg-blue-100 text-blue-800',
        'Marrón': 'bg-yellow-800 text-white',
        'Negro': 'bg-gray-900 text-white',
        'Rojo': 'bg-red-800 text-white',
    };
    return colors[grado] || 'bg-gray-100 text-gray-800';
};

const getBeltBg = (grado: string) => {
    const colors: Record<string, string> = {
        'Blanco': 'from-gray-100 to-gray-200',
        'Blanco Punta Amarillo': 'from-gray-100 to-gray-200',
        'Blanco Raya Amarillo': 'from-gray-100 to-gray-200',
        'Amarillo': 'from-yellow-400 to-yellow-500',
        'Naranja': 'from-orange-400 to-orange-500',
        'Verde': 'from-green-400 to-green-500',
        'Azul': 'from-blue-400 to-blue-500',
        'Marrón': 'from-yellow-700 to-yellow-800',
        'Negro': 'from-gray-700 to-gray-900',
        'Rojo': 'from-red-600 to-red-800',
    };
    return colors[grado] || 'from-gray-300 to-gray-400';
};

const maLogos: Record<string, string> = {
    Karate: "/karate-icono.png",
    Kobudo: "/kobudo-icono.png",
};

function getMaLogo(name: string) {
    return maLogos[name] || "/kendo-iaido-icono.png";
}

const RANK_ORDER = ['Blanco', 'Blanco Punta Amarillo', 'Blanco Raya Amarillo', 'Amarillo', 'Naranja', 'Verde', 'Azul', 'Marrón', 'Negro', 'Rojo'];

type ViewMode = "table" | "cards";

export default function Hiramatsukai() {
    const [selectedArt, setSelectedArt] = useState<string>("all");
    const [viewMode, setViewMode] = useState<ViewMode>("cards");
    const { appliedStudents, isLoading } = useAppliedStudents();
    const { data: martialArts = [] } = useDojoMartialArts();

    useEffect(() => {
        const isMobile = window.innerWidth < 1024;
        setViewMode(isMobile ? "cards" : "table");
    }, []);

    const martialArtsMap = useMemo(() => {
        const map: Record<number, string> = {};
        for (const ma of martialArts) {
            map[ma.id] = ma.martialArt;
        }
        return map;
    }, [martialArts]);

    const artsWithStudents = useMemo(() => {
        const arts = new Set<string>();
        for (const student of appliedStudents) {
            const artId = student.ranks?.martialArtId ?? student.martialArtId;
            arts.add(martialArtsMap[artId] || "Sin arte marcial");
        }
        return Array.from(arts);
    }, [appliedStudents, martialArtsMap]);

    const filteredStudents = useMemo(() => {
        if (selectedArt === "all") return appliedStudents;
        return appliedStudents.filter((s: IAppliedStudent) => {
            const artId = s.ranks?.martialArtId ?? s.martialArtId;
            const artName = martialArtsMap[artId] || "Sin arte marcial";
            return artName === selectedArt;
        });
    }, [appliedStudents, selectedArt, martialArtsMap]);

    const groupedByMartialArt = useMemo(() => {
        const byArt: Record<string, Record<string, IAppliedStudent[]>> = {};
        for (const student of filteredStudents) {
            const martialArtId = student.ranks?.martialArtId ?? student.martialArtId;
            const artName = martialArtsMap[martialArtId] || "Sin arte marcial";
            const rank = student.ranks?.belt || "Sin rango";
            if (!byArt[artName]) byArt[artName] = {};
            if (!byArt[artName][rank]) byArt[artName][rank] = [];
            byArt[artName][rank].push(student);
        }
        for (const art of Object.keys(byArt)) {
            const sorted = Object.entries(byArt[art]).sort(
                (a, b) => RANK_ORDER.indexOf(a[0]) - RANK_ORDER.indexOf(b[0])
            );
            byArt[art] = Object.fromEntries(sorted);
        }
        return byArt;
    }, [filteredStudents, martialArtsMap]);

    const summary = useMemo(() => {
        const byRank: Record<string, number> = {};
        for (const s of filteredStudents) {
            const rank = s.ranks?.belt || "Sin rango";
            byRank[rank] = (byRank[rank] || 0) + 1;
        }
        const sortedRank = Object.entries(byRank).sort(
            (a, b) => RANK_ORDER.indexOf(a[0]) - RANK_ORDER.indexOf(b[0])
        );
        return { total: filteredStudents.length, byRank: Object.fromEntries(sortedRank) };
    }, [filteredStudents]);

    const tableColumns: Column<IAppliedStudent>[] = [
        {
            header: "Nombre",
            render: (s) => (
                <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-full bg-linear-to-br ${getBeltBg(s.currentRank?.belt || "")} flex items-center justify-center shrink-0`}>
                        <span className="text-xs font-bold text-white">
                            {s.user?.name?.[0]}{s.user?.lastName?.[0]}
                        </span>
                    </div>
                    <span className="font-medium text-gray-900">{s.user?.name} {s.user?.lastName}</span>
                </div>
            ),
        },
        {
            header: "Arte Marcial",
            render: (s) => {
                const artId = s.ranks?.martialArtId ?? s.martialArtId;
                const art = martialArtsMap[artId] || "Sin arte marcial";
                return (
                    <div className="flex items-center gap-2">
                        <img src={getMaLogo(art)} alt={art} className="h-4 w-4 object-contain" />
                        <span>{art}</span>
                    </div>
                );
            },
        },
        {
            header: "Rango Actual",
            render: (s) => (
                <Badge className={`${getBeltColor(s.currentRank?.belt || "")} text-xs`} variant="outline">
                    {s.currentRank?.belt || "Sin rango"}
                </Badge>
            ),
        },
        {
            header: "Rango Objetivo",
            render: (s) => (
                <Badge className={`${getBeltColor(s.ranks?.belt || "")} text-xs font-bold`} variant="outline">
                    {s.ranks?.belt || "?"}
                </Badge>
            ),
        },
        {
            header: "Actividad",
            render: (s) => <span className="text-sm">{s.activity?.name || "-"}</span>,
        },
        {
            header: "Fecha",
            render: (s) => (
                <span className="text-sm text-gray-500">
                    {s.activity?.date ? dateFormatterIntoLong(s.activity.date) : "-"}
                </span>
            ),
        },
    ];

    const views = [
        { key: "table" as ViewMode, icon: List },
        { key: "cards" as ViewMode, icon: LayoutGrid },
    ];

    return (
        <div className="p-4">
            {/* Header + Filter Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-linear-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg">
                        <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Hiramatsukai</h1>
                        <p className="text-gray-500">Alumnos postulados a exámenes</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                    {/* Art filter buttons */}
                    {appliedStudents.length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap">
                            <button
                                onClick={() => setSelectedArt("all")}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    selectedArt === "all"
                                        ? "bg-red-600 text-white shadow-md"
                                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                                }`}
                            >
                                Todos
                            </button>
                            {artsWithStudents.map((art) => (
                                <button
                                    key={art}
                                    onClick={() => setSelectedArt(art)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                        selectedArt === art
                                            ? "bg-red-600 text-white shadow-md"
                                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                                    }`}
                                >
                                    <img src={getMaLogo(art)} alt={art} className="h-4 w-4 object-contain" />
                                    {art}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* View toggle */}
                    <div className="hidden lg:flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                        {views.map(({ key, icon: Icon }) => (
                            <Button
                                key={key}
                                variant={viewMode === key ? "secondary" : "ghost"}
                                size="sm"
                                onClick={() => setViewMode(key)}
                                className={`rounded-none border-r border-gray-300 ${
                                    viewMode === key
                                        ? "bg-red-600 text-white hover:bg-red-700"
                                        : "text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                                <Icon className="h-4 w-4" />
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            {isLoading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader size="lg" message="Cargando postulaciones..." />
                </div>
            ) : appliedStudents.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                    <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <User className="h-10 w-10 text-gray-300" />
                    </div>
                    <p className="text-lg font-medium">No hay postulaciones</p>
                    <p className="text-sm">No se encontraron alumnos postulados a exámenes.</p>
                </div>
            ) : (
                <>
                    {/* Summary Cards — 2 columns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        {/* Total */}
                        <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
                            <p className="text-sm text-gray-500 mb-1">Total Postulados</p>
                            <p className="text-4xl font-bold text-gray-900">{summary.total}</p>
                            <p className="text-xs text-gray-400 mt-1">alumnos</p>
                        </div>

                        {/* Por rango */}
                        <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
                            <p className="text-sm text-gray-500 mb-3">Por Rango Objetivo</p>
                            <div className="space-y-1.5">
                                {Object.entries(summary.byRank).map(([rank, count]) => (
                                    <div key={rank} className="flex items-center justify-between">
                                        <Badge className={`${getBeltColor(rank)} text-xs`} variant="outline">{rank}</Badge>
                                        <span className="text-sm font-bold text-gray-900">{count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Table or Cards */}
                    {viewMode === "table" ? (
                        <TableComponent data={filteredStudents} columns={tableColumns} />
                    ) : (
                        <div className="space-y-15">
                            {Object.entries(groupedByMartialArt).map(([artName, ranks]) => {
                                const totalByArt = Object.values(ranks).reduce((sum, arr) => sum + arr.length, 0);

                                return (
                                    <div key={artName}>
                                        {/* Martial Art Header */}
                                        <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-gray-200">
                                            <div className="h-10 w-10 rounded-lg overflow-hidden shadow-md shrink-0">
                                                <img src={getMaLogo(artName)} alt={artName} className="w-full h-full object-contain" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold text-gray-900">{artName}</h2>
                                                <p className="text-sm text-gray-500">{totalByArt} alumno{totalByArt !== 1 ? "s" : ""}</p>
                                            </div>
                                        </div>

                                        {/* Ranks within this martial art */}
                                        <div className="space-y-8 ml-2">
                                            {Object.entries(ranks).map(([rank, students], index) => (
                                                <div key={rank}>
                                                    {/* Rank Sub-Header */}
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className={`h-8 w-8 rounded-md bg-linear-to-br ${getBeltBg(rank)} flex items-center justify-center shadow-sm`}>
                                                            <span className="text-xs font-bold text-gray-900">{index + 1}</span>
                                                        </div>
                                                        <div>
                                                            <h3 className="text-lg font-bold text-gray-900">{rank}</h3>
                                                        </div>
                                                    </div>

                                                    {/* Students Grid */}
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                                        {students.map((student: IAppliedStudent) => (
                                                            <Card
                                                                key={student.id}
                                                                className="border border-gray-200 hover:border-yellow-400 hover:shadow-lg transition-all duration-300 overflow-hidden group"
                                                            >
                                                                <div className={`h-1.5 bg-linear-to-r ${getBeltBg(student.ranks?.belt || "")}`} />
                                                                <CardContent className="p-4">
                                                                    <div className="flex items-center gap-3 mb-3">
                                                                        <div className={`h-12 w-12 rounded-full bg-linear-to-br ${getBeltBg(student.currentRank?.belt || "")} flex items-center justify-center shrink-0 ring-2 ring-white shadow-md`}>
                                                                            <span className="text-sm font-bold text-white">
                                                                                {student.user?.name?.[0]}{student.user?.lastName?.[0]}
                                                                            </span>
                                                                        </div>
                                                                        <div className="min-w-0">
                                                                            <p className="font-semibold text-gray-900 truncate">
                                                                                {student.user?.name} {student.user?.lastName}
                                                                            </p>
                                                                        </div>
                                                                    </div>

                                                                    <div className="space-y-2 text-sm">
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="text-gray-400 text-xs">Actual:</span>
                                                                            <Badge className={`${getBeltColor(student.currentRank?.belt || "")} text-xs`} variant="outline">
                                                                                {student.currentRank?.belt || "Sin rango"}
                                                                            </Badge>
                                                                        </div>
                                                                        <div className="flex items-center gap-2">
                                                                            <ChevronRight className="h-3 w-3 text-gray-300" />
                                                                            <span className="text-gray-400 text-xs">Objetivo:</span>
                                                                            <Badge className={`${getBeltColor(student.ranks?.belt || "")} text-xs font-bold`} variant="outline">
                                                                                {student.ranks?.belt || "?"}
                                                                            </Badge>
                                                                        </div>
                                                                        {student.activity?.date && (
                                                                            <p className="text-xs text-gray-400 pt-1 border-t border-gray-100 mt-2">
                                                                                {dateFormatterIntoLong(student.activity.date)}
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                </CardContent>
                                                            </Card>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
