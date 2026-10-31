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
                        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                            <Award className="h-16 w-16 mb-4 text-border" />
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
                                    className="border border-border overflow-hidden"
                                >
                                    <CardContent className="p-0">
                                        <div
                                            className="p-5 bg-muted/40 hover:bg-muted transition-colors cursor-pointer flex justify-between items-center"
                                            onClick={() =>
                                                setExpandedExamen(
                                                    isExpanded ? null : examen.id,
                                                )
                                            }
                                        >
                                            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                                                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-brand-gold/20 to-brand-vermilion/20 sm:size-12">
                                                    <Award className="h-6 w-6 text-brand-gold-deep" />
                                                </div>
                                                <div className="min-w-0">
                                                    <h3 className="truncate text-base font-bold text-heading sm:text-lg">
                                                        {examen.name}
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground sm:gap-3">
                                                        <Calendar className="h-4 w-4 shrink-0" />
                                                        <span className="truncate">
                                                            {dateFormatterIntoLong(
                                                                examen.date,
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="shrink-0">
                                                {isExpanded ? (
                                                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                                ) : (
                                                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                                )}
                                            </div>
                                        </div>

                                        {isExpanded && (
                                            <div className="p-5 border-t border-border bg-card">
                                                {examsLoading && (
                                                    <div className="flex items-center justify-center py-8">
                                                        <Loader size="sm" message="Cargando resultados..." />
                                                    </div>
                                                )}

                                                {!examsLoading &&
                                                    expandedExams.length ===
                                                        0 && (
                                                        <div className="text-center py-8 text-muted-foreground">
                                                            <Users className="h-10 w-10 mx-auto mb-2 text-border" />
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
                                                                            className="p-4 border border-border rounded-lg hover:border-brand-gold transition-colors"
                                                                        >
                                                                            <div className="mb-2 flex items-center justify-between gap-2">
                                                                                <h4 className="min-w-0 truncate font-semibold text-heading">
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
                                                                            <div className="flex flex-wrap items-center gap-2 text-sm">
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
                                                                                <ChevronRight className="h-3 w-3 text-muted-foreground" />
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
                                                                    className="h-11 w-full border-brand-gold/40 text-brand-gold-deep hover:bg-brand-gold/10 sm:h-9 sm:w-auto"
                                                                    onClick={() =>
                                                                        openExamDetail(
                                                                            examen.id,
                                                                        )
                                                                    }
                                                                >
                                                                    <Eye data-icon="inline-start" />
                                                                    Ver resultado completo
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
