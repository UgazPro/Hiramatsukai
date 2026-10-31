import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    Award,
    CheckCircle,
    ChevronRight,
    GraduationCap,
    Users,
    XCircle,
    CalendarDays,
} from "lucide-react";
import { useExamsByActivity } from "@/hooks/useActivities";
import { Loader } from "@/components/spinner/Loader";
import { useApplicationsStore } from "@/stores/applications.store";
import { dateFormatterIntoLong } from "@/helpers/formatter";
import { IExam } from "@/services/activities/activity.interface";

const getBeltColor = (grado: string) => {
    const colors: Record<string, string> = {
        Blanco: "bg-gray-100 text-gray-800 border-border",
        Amarillo: "bg-yellow-100 text-yellow-800 border-yellow-300",
        Naranja: "bg-orange-100 text-orange-800 border-orange-300",
        Verde: "bg-green-100 text-green-800 border-green-300",
        Azul: "bg-blue-100 text-blue-800 border-blue-300",
        Marrón: "bg-yellow-800 text-white border-yellow-900",
        Negro: "bg-gray-900 text-white border-gray-950",
        Rojo: "bg-red-800 text-white border-red-900",
    };
    return colors[grado] || "bg-gray-100 text-gray-800 border-border";
};

export default function ExamDetail() {
    const { selectedExamActivityId, closeExamDetail } = useApplicationsStore();
    const { exams, isLoading } = useExamsByActivity(selectedExamActivityId);

    const activity = exams.length > 0 ? exams[0].activity : null;
    const approved = exams.filter((e: IExam) => e.status === "Aprobado");
    const rejected = exams.filter((e: IExam) => e.status === "Reprobado");
    const pending = exams.filter((e: IExam) => e.status === "Pendiente");

    return (
        <div className="mx-auto my-3 min-h-full w-full max-w-4xl p-3 sm:my-6 sm:p-6">
            <div className="bg-card shadow-xl border border-border rounded-xl overflow-hidden">
                {isLoading && (
                    <div className="flex items-center justify-center py-20">
                        <Loader message="Cargando resultados..." />
                    </div>
                )}

                {!isLoading && exams.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                        <GraduationCap className="h-16 w-16 mb-4 text-border" />
                        <p className="text-lg font-medium">
                            No hay resultados disponibles
                        </p>
                        <Button
                            variant="outline"
                            className="mt-4 border-border"
                            onClick={closeExamDetail}
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Volver
                        </Button>
                    </div>
                )}

                {!isLoading && exams.length > 0 && (
                    <>
                        <div className="border-b border-border bg-linear-to-r from-brand-gold/10 to-brand-vermilion/10 p-4 sm:p-6">
                            <Button
                                variant="ghost"
                                className="mb-4 h-11 text-muted-foreground hover:text-foreground sm:h-9"
                                onClick={closeExamDetail}
                            >
                                <ArrowLeft data-icon="inline-start" />
                                Volver al historial
                            </Button>

                            <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                                <div className="h-14 w-14 shrink-0 rounded-full bg-linear-to-br from-brand-gold to-brand-vermilion p-0.5">
                                    <div className="flex h-full w-full items-center justify-center rounded-full bg-card">
                                        <Award className="h-7 w-7 text-brand-gold-deep" />
                                    </div>
                                </div>
                                <div className="min-w-0">
                                    <h2 className="text-xl font-bold break-words text-foreground sm:text-2xl">
                                        {activity?.name || "Examen"}
                                    </h2>
                                    <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                                        <CalendarDays className="h-4 w-4 shrink-0" />
                                        {dateFormatterIntoLong(
                                            activity?.date ?? new Date(),
                                        )}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3 mt-4">
                                <Badge
                                    variant="outline"
                                    className="bg-blue-50 text-blue-700 border-blue-200 text-sm px-3 py-1"
                                >
                                    <Users className="h-3 w-3 mr-1" />
                                    {exams.length} participantes
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-green-50 text-green-700 border-green-200 text-sm px-3 py-1"
                                >
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    {approved.length} aprobados
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-red-50 text-red-700 border-red-200 text-sm px-3 py-1"
                                >
                                    <XCircle className="h-3 w-3 mr-1" />
                                    {rejected.length} reprobados
                                </Badge>
                                {pending.length > 0 && (
                                    <Badge
                                        variant="outline"
                                        className="bg-brand-gold/15 text-brand-gold-deep border-brand-gold/30 text-sm px-3 py-1"
                                    >
                                        {pending.length} pendientes
                                    </Badge>
                                )}
                            </div>
                        </div>

                        {approved.length > 0 && (
                            <div className="border-b border-border p-4 sm:p-6">
                                <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-4">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    Aprobados ({approved.length})
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {approved.map((exam: IExam) => (
                                        <div
                                            key={exam.id}
                                            className="p-4 border border-green-200 bg-green-50/30 rounded-lg hover:border-green-400 transition-colors"
                                        >
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="h-10 w-10 rounded-full bg-linear-to-br from-green-400 to-green-600 p-0.5">
                                                    <div className="h-full w-full rounded-full bg-card flex items-center justify-center">
                                                        <span className="text-xs font-bold text-green-700">
                                                            {exam.user?.name?.charAt(
                                                                0,
                                                            ) ?? "?"}
                                                            {exam.user?.lastName?.charAt(
                                                                0,
                                                            ) ?? ""}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="min-w-0 font-semibold break-words text-foreground">
                                                        {exam.user?.name ?? ""}{" "}
                                                        {exam.user?.lastName ??
                                                            ""}
                                                    </h4>
                                                    <span className="text-xs text-muted-foreground">
                                                        {exam.ranks?.martialArt
                                                            ?.martialArt ?? ""}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-2 text-sm sm:ml-[52px]">
                                                <Badge
                                                    className={getBeltColor(
                                                        exam.previousRank
                                                            ?.belt ?? "",
                                                    )}
                                                >
                                                    {exam.previousRank
                                                        ?.belt ?? "?"}
                                                </Badge>
                                                <ChevronRight className="h-3 w-3 text-muted-foreground" />
                                                <Badge
                                                    className={getBeltColor(
                                                        exam.ranks?.belt ?? "",
                                                    )}
                                                >
                                                    {exam.ranks?.belt ?? "?"}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {rejected.length > 0 && (
                            <div className="border-b border-border p-4 sm:p-6">
                                <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-4">
                                    <XCircle className="h-5 w-5 text-red-600" />
                                    Reprobados ({rejected.length})
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {rejected.map((exam: IExam) => (
                                        <div
                                            key={exam.id}
                                            className="p-4 border border-red-200 bg-red-50/30 rounded-lg hover:border-red-400 transition-colors"
                                        >
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="h-10 w-10 rounded-full bg-linear-to-br from-red-400 to-red-600 p-0.5">
                                                    <div className="h-full w-full rounded-full bg-card flex items-center justify-center">
                                                        <span className="text-xs font-bold text-red-700">
                                                            {exam.user?.name?.charAt(
                                                                0,
                                                            ) ?? "?"}
                                                            {exam.user?.lastName?.charAt(
                                                                0,
                                                            ) ?? ""}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="min-w-0 font-semibold break-words text-foreground">
                                                        {exam.user?.name ?? ""}{" "}
                                                        {exam.user?.lastName ??
                                                            ""}
                                                    </h4>
                                                    <span className="text-xs text-muted-foreground">
                                                        {exam.ranks?.martialArt
                                                            ?.martialArt ?? ""}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-2 text-sm sm:ml-[52px]">
                                                <Badge
                                                    className={getBeltColor(
                                                        exam.previousRank
                                                            ?.belt ?? "",
                                                    )}
                                                >
                                                    {exam.previousRank
                                                        ?.belt ?? "?"}
                                                </Badge>
                                                <ChevronRight className="h-3 w-3 text-muted-foreground" />
                                                <Badge
                                                    className={getBeltColor(
                                                        exam.ranks?.belt ?? "",
                                                    )}
                                                >
                                                    {exam.ranks?.belt ?? "?"}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {pending.length > 0 && (
                            <div className="p-4 sm:p-6">
                                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                                    <Users className="h-5 w-5 text-brand-gold-deep" />
                                    Pendientes ({pending.length})
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {pending.map((exam: IExam) => (
                                        <div
                                            key={exam.id}
                                            className="p-4 border border-brand-gold/30 bg-brand-gold/10 rounded-lg hover:border-brand-gold transition-colors"
                                        >
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="h-10 w-10 rounded-full bg-linear-to-br from-brand-gold to-brand-gold-deep p-0.5">
                                                    <div className="h-full w-full rounded-full bg-card flex items-center justify-center">
                                                        <span className="text-xs font-bold text-brand-gold-deep">
                                                            {exam.user?.name?.charAt(
                                                                0,
                                                            ) ?? "?"}
                                                            {exam.user?.lastName?.charAt(
                                                                0,
                                                            ) ?? ""}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="min-w-0 font-semibold break-words text-foreground">
                                                        {exam.user?.name ?? ""}{" "}
                                                        {exam.user?.lastName ??
                                                            ""}
                                                    </h4>
                                                    <span className="text-xs text-muted-foreground">
                                                        {exam.ranks?.martialArt
                                                            ?.martialArt ?? ""}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
