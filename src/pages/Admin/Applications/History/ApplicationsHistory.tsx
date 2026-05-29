import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
    Calendar,
    Users,
    Award,
    ChevronDown,
    ChevronRight, CheckCircle,
    XCircle
} from "lucide-react";

interface ApplicationsHistoryProps {
    activeTab: string;
    examenesHistorial: any[];
    setExpandedExamen: (id: number | null) => void;
    expandedExamen: number | null;
    getBeltColor: (grado: string) => string;
}

export default function ApplicationsHistory({ activeTab, examenesHistorial, setExpandedExamen, expandedExamen, getBeltColor }: ApplicationsHistoryProps) {

    const formatFecha = (fecha: string) => {
        return format(new Date(fecha), "dd 'de' MMMM 'de' yyyy", { locale: es });
    };

    return (
        <>
            {activeTab === 'historial' && (
                <div className="space-y-4">
                    {examenesHistorial.map((examen) => (
                        <Card key={examen.id} className="border border-gray-300 overflow-hidden">
                            <CardContent className="p-0">
                                {/* Cabecera del examen (siempre visible) */}
                                <div
                                    className="p-5 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer flex justify-between items-center"
                                    onClick={() => setExpandedExamen(expandedExamen === examen.id ? null : examen.id)}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-full bg-linear-to-br from-amber-500/20 to-red-500/20 flex items-center justify-center">
                                            <Award className="h-6 w-6 text-amber-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900">{examen.nombre}</h3>
                                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                                <Calendar className="h-4 w-4" />
                                                <span>{formatFecha(examen.fecha)}</span>
                                                <span className="text-gray-300">|</span>
                                                <Users className="h-4 w-4" />
                                                <span>{examen.participantes.length} participantes</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {expandedExamen === examen.id ? (
                                            <ChevronDown className="h-5 w-5 text-gray-600" />
                                        ) : (
                                            <ChevronRight className="h-5 w-5 text-gray-600" />
                                        )}
                                    </div>
                                </div>

                                {/* Participantes (expandible) */}
                                {expandedExamen === examen.id && (
                                    <div className="p-5 border-t border-gray-200 bg-white">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                            {examen.participantes.map((participante: any) => (
                                                <div
                                                    key={participante.id}
                                                    className="p-4 border border-gray-200 rounded-lg hover:border-amber-400 transition-colors"
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h4 className="font-semibold text-gray-900">{participante.nombre}</h4>
                                                        {participante.aprobado ? (
                                                            <Badge className="bg-green-100 text-green-800 border-green-200">
                                                                <CheckCircle className="h-3 w-3 mr-1" />
                                                                Aprobado
                                                            </Badge>
                                                        ) : (
                                                            <Badge className="bg-red-100 text-red-800 border-red-200">
                                                                <XCircle className="h-3 w-3 mr-1" />
                                                                No aprobado
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Badge className={getBeltColor(participante.gradoActual)}>
                                                            {participante.gradoActual}
                                                        </Badge>
                                                        <ChevronRight className="h-3 w-3 text-gray-400" />
                                                        <Badge className={getBeltColor(participante.gradoObtenido)}>
                                                            {participante.gradoObtenido}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </>
    );
}
