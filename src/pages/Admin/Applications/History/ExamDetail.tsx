import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    Award,
    CheckCircle,
    ChevronRight,
    GraduationCap,
    Loader2,
    Users,
    XCircle,
    CalendarDays,
} from "lucide-react";
import { useExamsByActivity } from "@/hooks/useActivities";
import { useApplicationsStore } from "@/stores/applications.store";
import { dateFormatterIntoLong } from "@/helpers/formatter";

const getBeltColor = (grado: string) => {
    const colors: Record<string, string> = {
        Blanco: "bg-gray-100 text-gray-800 border-gray-300",
        Amarillo: "bg-yellow-100 text-yellow-800 border-yellow-300",
        Naranja: "bg-orange-100 text-orange-800 border-orange-300",
        Verde: "bg-green-100 text-green-800 border-green-300",
        Azul: "bg-blue-100 text-blue-800 border-blue-300",
        Marrón: "bg-amber-800 text-white border-amber-900",
        Negro: "bg-gray-900 text-white border-gray-950",
        Rojo: "bg-red-800 text-white border-red-900",
    };
    return colors[grado] || "bg-gray-100 text-gray-800 border-gray-300";
};

export default function ExamDetail() {
    const { selectedExamActivityId, closeExamDetail } = useApplicationsStore();
    const { exams, isLoading } = useExamsByActivity(selectedExamActivityId);

    const activity = exams.length > 0 ? exams[0].activity : null;
    const approved = exams.filter((e: any) => e.status === "Aprobado");
    const rejected = exams.filter((e: any) => e.status === "Reprobado");
    const pending = exams.filter((e: any) => e.status === "Pendiente");

    return (
        <div className="min-h-full p-6 w-full max-w-4xl mx-auto my-6">
            <div className="bg-white shadow-xl border border-gray-200 rounded-xl overflow-hidden">
                {isLoading && (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
                        <span className="ml-3 text-gray-600">
                            Cargando resultados...
                        </span>
                    </div>
                )}

                {!isLoading && exams.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                        <GraduationCap className="h-16 w-16 mb-4 text-gray-300" />
                        <p className="text-lg font-medium">
                            No hay resultados disponibles
                        </p>
                        <Button
                            variant="outline"
                            className="mt-4 border-gray-300"
                            onClick={closeExamDetail}
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Volver
                        </Button>
                    </div>
                )}

                {!isLoading && exams.length > 0 && (
                    <>
                        <div className="bg-linear-to-r from-amber-50 to-red-50 border-b border-gray-200 p-6">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="mb-4 text-gray-600 hover:text-gray-900"
                                onClick={closeExamDetail}
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Volver al historial
                            </Button>

                            <div className="flex items-center gap-4">
                                <div className="h-14 w-14 rounded-full bg-linear-to-br from-amber-500 to-red-500 p-0.5">
                                    <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                                        <Award className="h-7 w-7 text-amber-600" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {activity?.name || "Examen"}
                                    </h2>
                                    <p className="text-gray-600 text-sm mt-1 flex items-center gap-2">
                                        <CalendarDays className="h-4 w-4" />
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
                                        className="bg-yellow-50 text-yellow-700 border-yellow-200 text-sm px-3 py-1"
                                    >
                                        {pending.length} pendientes
                                    </Badge>
                                )}
                            </div>
                        </div>

                        {approved.length > 0 && (
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    Aprobados ({approved.length})
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {approved.map((exam: any) => (
                                        <div
                                            key={exam.id}
                                            className="p-4 border border-green-200 bg-green-50/30 rounded-lg hover:border-green-400 transition-colors"
                                        >
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="h-10 w-10 rounded-full bg-linear-to-br from-green-400 to-green-600 p-0.5">
                                                    <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
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
                                                    <h4 className="font-semibold text-gray-900">
                                                        {exam.user?.name ?? ""}{" "}
                                                        {exam.user?.lastName ??
                                                            ""}
                                                    </h4>
                                                    <span className="text-xs text-gray-500">
                                                        {exam.ranks?.martialArt
                                                            ?.martialArt ?? ""}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm ml-[52px]">
                                                <Badge
                                                    className={getBeltColor(
                                                        exam.previousRank
                                                            ?.belt ?? "",
                                                    )}
                                                >
                                                    {exam.previousRank
                                                        ?.belt ?? "?"}
                                                </Badge>
                                                <ChevronRight className="h-3 w-3 text-gray-400" />
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
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                                    <XCircle className="h-5 w-5 text-red-600" />
                                    Reprobados ({rejected.length})
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {rejected.map((exam: any) => (
                                        <div
                                            key={exam.id}
                                            className="p-4 border border-red-200 bg-red-50/30 rounded-lg hover:border-red-400 transition-colors"
                                        >
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="h-10 w-10 rounded-full bg-linear-to-br from-red-400 to-red-600 p-0.5">
                                                    <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
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
                                                    <h4 className="font-semibold text-gray-900">
                                                        {exam.user?.name ?? ""}{" "}
                                                        {exam.user?.lastName ??
                                                            ""}
                                                    </h4>
                                                    <span className="text-xs text-gray-500">
                                                        {exam.ranks?.martialArt
                                                            ?.martialArt ?? ""}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm ml-[52px]">
                                                <Badge
                                                    className={getBeltColor(
                                                        exam.previousRank
                                                            ?.belt ?? "",
                                                    )}
                                                >
                                                    {exam.previousRank
                                                        ?.belt ?? "?"}
                                                </Badge>
                                                <ChevronRight className="h-3 w-3 text-gray-400" />
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
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                                    <Users className="h-5 w-5 text-yellow-600" />
                                    Pendientes ({pending.length})
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {pending.map((exam: any) => (
                                        <div
                                            key={exam.id}
                                            className="p-4 border border-yellow-200 bg-yellow-50/30 rounded-lg hover:border-yellow-400 transition-colors"
                                        >
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="h-10 w-10 rounded-full bg-linear-to-br from-yellow-400 to-yellow-600 p-0.5">
                                                    <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                                                        <span className="text-xs font-bold text-yellow-700">
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
                                                    <h4 className="font-semibold text-gray-900">
                                                        {exam.user?.name ?? ""}{" "}
                                                        {exam.user?.lastName ??
                                                            ""}
                                                    </h4>
                                                    <span className="text-xs text-gray-500">
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
