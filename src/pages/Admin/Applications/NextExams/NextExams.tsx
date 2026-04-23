import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Users,
    Award, Plus, CalendarDays, Eye
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface NextExamsProps {
    setActiveTab: any;
    examenesProximos: any[];
    setSelectedExamen: (examen: any) => void;
}

export default function NextExams({ setActiveTab, examenesProximos, setSelectedExamen }: NextExamsProps) {

    const formatFecha = (fecha: string) => {
        return format(new Date(fecha), "dd 'de' MMMM 'de' yyyy", { locale: es });
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {examenesProximos.map((examen) => (
                    <Card key={examen.id} className="border border-gray-300 hover:border-amber-400 hover:shadow-lg transition-all duration-300 overflow-hidden group">
                        <CardContent className="p-0">
                            <div className="bg-linear-to-r from-amber-50 to-red-50 p-6 border-b border-gray-200">
                                <div className="flex justify-between items-start">
                                    <div className="h-14 w-14 rounded-full bg-linear-to-br from-amber-500 to-red-500 p-0.5">
                                        <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                                            <Award className="h-7 w-7 text-amber-600" />
                                        </div>
                                    </div>
                                    <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                                        {examen.grado}
                                    </Badge>
                                </div>
                                <h3 className="font-bold text-xl text-gray-900 mt-4">{examen.nombre}</h3>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="flex items-center gap-3">
                                    <CalendarDays className="h-5 w-5 text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Fecha del examen</p>
                                        <p className="font-semibold text-gray-900">{formatFecha(examen.fecha)}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Users className="h-5 w-5 text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Participantes</p>
                                        <p className="font-semibold text-gray-900">{examen.participantes.length} postulados</p>
                                    </div>
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <Button
                                        variant="outline"
                                        className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100"
                                        onClick={() => setSelectedExamen(examen)}
                                    >
                                        <Eye className="h-4 w-4 mr-2" />
                                        Ver detalles
                                    </Button>
                                    <Button
                                        className="flex-1 bg-linear-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white"
                                        onClick={() => {
                                            setActiveTab('postulaciones');
                                            setSelectedExamen(examen);
                                        }}
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Postular
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    );
}
