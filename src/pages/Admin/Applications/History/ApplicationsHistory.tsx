import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Calendar,
    Users,
    Award,
    ChevronDown,
    ChevronRight,
    CheckCircle,
    Eye
} from "lucide-react";
import { useExamsHistory, useExamsByActivity } from "@/hooks/useActivities";
import { useApplicationsStore } from "@/stores/applications.store";
import { dateFormatterIntoLong } from "@/helpers/formatter";
import { Loader } from "@/components/spinner/Loader";
import { IExam } from "@/services/activities/activity.interface";

interface ApplicationsHistoryProps {
    activeTab: string;
    getBeltColor: (grado: string) => string;
}

export default function ApplicationsHistory({ activeTab, getBeltColor }: ApplicationsHistoryProps) {
    const { openExamDetail } = useApplicationsStore();
    const { pastExams, isLoading } = useExamsHistory();
    const [expandedExamen, setExpandedExamen] = useState<number | null>(null);
    const { exams: expandedExams, isLoading: examsLoading } = useExamsByActivity(expandedExamen);

    const approved = expandedExams.filter((e: IExam) => e.status === "Aprobado");
    const visibleApproved = approved.slice(0, 4);

    return (
        <>
            {activeTab === "historial" && (
                <div className="space-y-4">
                    {isLoading && (
                        <div className="flex items-center justify-center py-16">
                            <Loader message="Cargando historial..." />
                        </div>
                    )}

                    {!isLoading && pastExams.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                            <Award className="h-16 w-16 mb-4 text-gray-300" />
                            <p className="text-lg font-medium">
                                No hay exámenes anteriores
                            </p>
                            <p className="text-sm">
                                Los exámenes finalizados aparecerán aquí.
                            </p>
                        </div>
                    )}

                    {!isLoading &&
                        pastExams.map((examen) => {
                            const isExpanded = expandedExamen === examen.id;
                            return (
                                <Card
                                    key={examen.id}
                                    className="border border-gray-300 overflow-hidden"
                                >
                                    <CardContent className="p-0">
                                        <div
                                            className="p-5 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer flex justify-between items-center"
                                            onClick={() =>
                                                setExpandedExamen(
                                                    isExpanded ? null : examen.id,
                                                )
                                            }
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-full bg-linear-to-br from-yellow-500/20 to-red-500/20 flex items-center justify-center">
                                                    <Award className="h-6 w-6 text-yellow-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg text-gray-900">
                                                        {examen.name}
                                                    </h3>
                                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                                        <Calendar className="h-4 w-4" />
                                                        <span>
                                                            {dateFormatterIntoLong(
                                                                examen.date,
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                {isExpanded ? (
                                                    <ChevronDown className="h-5 w-5 text-gray-600" />
                                                ) : (
                                                    <ChevronRight className="h-5 w-5 text-gray-600" />
                                                )}
                                            </div>
                                        </div>

                                        {isExpanded && (
                                            <div className="p-5 border-t border-gray-200 bg-white">
                                                {examsLoading && (
                                                    <div className="flex items-center justify-center py-8">
                                                        <Loader size="sm" message="Cargando resultados..." />
                                                    </div>
                                                )}

                                                {!examsLoading &&
                                                    expandedExams.length ===
                                                        0 && (
                                                        <div className="text-center py-8 text-gray-500">
                                                            <Users className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                                                            <p className="text-sm">
                                                                No hay
                                                                resultados
                                                                registrados
                                                            </p>
                                                        </div>
                                                    )}

                                                {!examsLoading &&
                                                    visibleApproved.length >
                                                        0 && (
                                                        <>
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                                                {visibleApproved.map(
                                                                    (
                                                                        exam: IExam,
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                exam.id
                                                                            }
                                                                            className="p-4 border border-gray-200 rounded-lg hover:border-yellow-400 transition-colors"
                                                                        >
                                                                            <div className="flex items-center justify-between mb-2">
                                                                                <h4 className="font-semibold text-gray-900">
                                                                                    {exam
                                                                                        .user
                                                                                        ?.name ?? ""}{" "}
                                                                                    {exam
                                                                                        .user
                                                                                        ?.lastName ??
                                                                                        ""}
                                                                                </h4>
                                                                                <Badge className="bg-green-100 text-green-800 border-green-200">
                                                                                    <CheckCircle className="h-3 w-3 mr-1" />
                                                                                    Aprobado
                                                                                </Badge>
                                                                            </div>
                                                                            <div className="flex items-center gap-2 text-sm">
                                                                                <Badge
                                                                                    className={getBeltColor(
                                                                                        exam
                                                                                            .previousRank
                                                                                            ?.belt ??
                                                                                            "",
                                                                                    )}
                                                                                >
                                                                                    {exam
                                                                                        .previousRank
                                                                                        ?.belt ??
                                                                                        "?"}
                                                                                </Badge>
                                                                                <ChevronRight className="h-3 w-3 text-gray-400" />
                                                                                <Badge
                                                                                    className={getBeltColor(
                                                                                        exam
                                                                                            .ranks
                                                                                            ?.belt ??
                                                                                            "",
                                                                                    )}
                                                                                >
                                                                                    {exam
                                                                                        .ranks
                                                                                        ?.belt ??
                                                                                        "?"}
                                                                                </Badge>
                                                                            </div>
                                                                        </div>
                                                                    ),
                                                                )}
                                                            </div>

                                                            <div className="mt-4 flex justify-center">
                                                                <Button
                                                                    variant="outline"
                                                                    className="border-yellow-300 text-yellow-700 hover:bg-yellow-50"
                                                                    onClick={() =>
                                                                        openExamDetail(
                                                                            examen.id,
                                                                        )
                                                                    }
                                                                >
                                                                    <Eye className="h-4 w-4 mr-2" />
                                                                    Ver resultado
                                                                    completo
                                                                </Button>
                                                            </div>
                                                        </>
                                                    )}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            );
                        })}
                </div>
            )}
        </>
    );
}
