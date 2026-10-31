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
    const isStudent = userData?.roles.some(({ rol }) => rol === "Estudiante");

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader message="Cargando exámenes..." />
            </div>
        );
    }

    if (!upcomingExams.length) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                <Award className="mb-4 h-16 w-16 text-border" />
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {sortedExams.map((examen) => {
                const isNextExam = examen.id === nextExamId;
                return (
                <Card key={examen.id} className="group overflow-hidden border border-border transition-all duration-300 hover:border-brand-gold hover:shadow-lg">
                    <CardContent className="p-0">
                        <div className="border-b border-border bg-linear-to-r from-brand-gold/10 to-brand-vermilion/10 p-5 sm:p-6">
                            <div className="flex justify-between items-start">
                                <div className="h-14 w-14 rounded-full bg-linear-to-br from-brand-gold to-brand-vermilion p-0.5">
                                    <div className="flex h-full w-full items-center justify-center rounded-full bg-card">
                                        <Award className="h-7 w-7 text-brand-gold-deep" />
                                    </div>
                                </div>
                            </div>
                            <h3 className="mt-4 text-lg font-bold break-words text-foreground sm:text-xl">{examen.name}</h3>
                        </div>

                        <div className="flex flex-col gap-4 p-5 sm:p-6">
                            <div className="flex items-center gap-3">
                                <CalendarDays className="h-5 w-5 shrink-0 text-muted-foreground" />
                                <div className="min-w-0">
                                    <p className="text-sm text-muted-foreground">Fecha del examen</p>
                                    <p className="font-semibold break-words text-foreground">{dateFormatterIntoLong(examen.date)}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Users className="h-5 w-5 shrink-0 text-muted-foreground" />
                                <div className="min-w-0">
                                    <p className="text-sm text-muted-foreground">Participantes</p>
                                    <p className="font-semibold text-foreground">{examen.postulated} postulados</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                                <Button
                                    variant="outline"
                                    className="h-11 flex-1 border-border text-foreground hover:bg-muted"
                                    onClick={() => openNextExamDetail(examen)}
                                >
                                    <Eye data-icon="inline-start" />
                                    Ver detalles
                                </Button>
                                {!isStudent && (
                                    <Button
                                        disabled={!isNextExam}
                                        variant={isNextExam ? "wood" : "outline"}
                                        className="h-11 flex-1"
                                        onClick={() => {
                                            if (!isNextExam) return;
                                            setActiveTab('postulaciones');
                                            openPostulationForm(examen.id);
                                        }}
                                    >
                                        <Plus data-icon="inline-start" />
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
