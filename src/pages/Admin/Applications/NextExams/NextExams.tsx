import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Plus, CalendarDays, Eye } from "lucide-react";
import { dateFormatterIntoLong } from "@/helpers/formatter";
import { useApplicationsStore } from "@/stores/applications.store";
import { IActivity } from "@/services/activities/activity.interface";
import { TabType } from "../ApplicationsTabs";
import { Loader } from "@/components/spinner/Loader";
import { useUserData } from "@/helpers/token";

interface NextExamsProps {
    setActiveTab: (tab: TabType) => void;
    upcomingExams: IActivity[];
    // setSelectedExamen: (examen: IActivity) => void;
    isLoading: boolean;
}

export default function NextExams({ setActiveTab, upcomingExams, /* setSelectedExamen, */ isLoading }: NextExamsProps) {

    const { openPostulationForm, openNextExamDetail } = useApplicationsStore();
    const userData = useUserData();
    const isStudent = userData?.rol.rol === "Estudiante";
    
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader message="Cargando exámenes..." />
            </div>
        );
    }

    if (!upcomingExams.length) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                <Award className="h-16 w-16 mb-4 text-gray-300" />
                <p className="text-lg font-medium">No hay exámenes próximos</p>
                <p className="text-sm">Los próximos exámenes aparecerán aquí una vez creados.</p>
            </div>
        );
    }

    const sortedExams = [...upcomingExams].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const nextExamId = sortedExams[0]?.id;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedExams.map((examen) => {
                const isNextExam = examen.id === nextExamId;
                return (
                <Card key={examen.id} className="border border-gray-300 hover:border-yellow-400 hover:shadow-lg transition-all duration-300 overflow-hidden group">
                    <CardContent className="p-0">
                        <div className="bg-linear-to-r from-yellow-50 to-red-50 p-6 border-b border-gray-200">
                            <div className="flex justify-between items-start">
                                <div className="h-14 w-14 rounded-full bg-linear-to-br from-yellow-500 to-red-500 p-0.5">
                                    <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                                        <Award className="h-7 w-7 text-yellow-600" />
                                    </div>
                                </div>
                            </div>
                            <h3 className="font-bold text-xl text-gray-900 mt-4">{examen.name}</h3>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="flex items-center gap-3">
                                <CalendarDays className="h-5 w-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Fecha del examen</p>
                                    <p className="font-semibold text-gray-900">{dateFormatterIntoLong(examen.date)}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Users className="h-5 w-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Participantes</p>
                                    <p className="font-semibold text-gray-900">{examen.postulated} postulados</p>
                                </div>
                            </div>

                            <div className="pt-4 flex flex-col sm:flex-row gap-3">
                                <Button
                                    variant="outline"
                                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100"
                                    onClick={() => openNextExamDetail(examen)}
                                >
                                    <Eye className="h-4 w-4 mr-2" />
                                    Ver detalles
                                </Button>
                                {!isStudent && (
                                    <Button
                                        disabled={!isNextExam}
                                        className={`flex-1 text-white ${isNextExam ? "bg-linear-to-r from-yellow-500 to-yellow-600 hover:from-yellow-700 hover:to-yellow-800" : "bg-gray-400 cursor-not-allowed"}`}
                                        onClick={() => {
                                            if (!isNextExam) return;
                                            setActiveTab('postulaciones');
                                            // setSelectedExamen(examen);
                                            openPostulationForm(examen.id);
                                        }}
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        {isNextExam ? "Postular" : "Próximamente"}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            );
            })}
        </div>
    );
}
