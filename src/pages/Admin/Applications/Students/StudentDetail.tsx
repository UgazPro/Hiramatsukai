import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    Award,
    CheckCircle,
    ChevronRight,
    GraduationCap,
    Loader2,
    User,
    XCircle,
    CalendarDays,
} from "lucide-react";
import { useExamsByUser } from "@/hooks/useActivities";
import { useApplicationsStore } from "@/stores/applications.store";
import { useStudents } from "@/hooks/useStudents";
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

export default function StudentDetail() {
    const { selectedStudentId, closeStudentDetail } = useApplicationsStore();
    const { data: students = [] } = useStudents();
    const { exams, isLoading } = useExamsByUser(selectedStudentId);

    const student = useMemo(
        () => students.find((s: any) => s.id === selectedStudentId) ?? null,
        [students, selectedStudentId],
    );

    const approvedCount = exams.filter(
        (e: any) => e.status === "Aprobado",
    ).length;
    const rejectedCount = exams.filter(
        (e: any) => e.status === "Reprobado",
    ).length;
    const pendingCount = exams.filter(
        (e: any) => e.status === "Pendiente",
    ).length;

    const getInitials = (name: string, lastName: string) => {
        return `${name?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`.toUpperCase();
    };

    return (
        <div className="min-h-full p-6 w-full max-w-4xl mx-auto my-6">
            <div className="bg-white shadow-xl border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-linear-to-r from-amber-50 to-red-50 border-b border-gray-200 p-6">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="mb-4 text-gray-600 hover:text-gray-900"
                        onClick={closeStudentDetail}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver a alumnos
                    </Button>

                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-linear-to-br from-amber-500 to-red-500 p-0.5">
                            <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                                {student?.profileImg ? (
                                    <img
                                        src={student.profileImg}
                                        alt=""
                                        className="h-full w-full rounded-full object-cover"
                                    />
                                ) : (
                                    <User className="h-8 w-8 text-amber-600" />
                                )}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {student?.name ?? ""} {student?.lastName ?? ""}
                            </h2>
                            {student?.identification && (
                                <p className="text-gray-600 text-sm mt-1">
                                    C.I: {student.identification}
                                </p>
                            )}
                            {student?.userRanks && student.userRanks.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {(student.userRanks as any[]).map(
                                        (ur: any, i: number) => (
                                            <Badge
                                                key={i}
                                                className={getBeltColor(
                                                    ur.rank?.belt ?? "",
                                                )}
                                            >
                                                {ur.martialArt?.martialArt ??
                                                    ""}{" "}
                                                — {ur.rank?.belt ?? ""}
                                            </Badge>
                                        ),
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {exams.length > 0 && (
                        <div className="flex flex-wrap gap-3 mt-4">
                            <Badge
                                variant="outline"
                                className="bg-blue-50 text-blue-700 border-blue-200 text-sm px-3 py-1"
                            >
                                {exams.length} exámenes
                            </Badge>
                            <Badge
                                variant="outline"
                                className="bg-green-50 text-green-700 border-green-200 text-sm px-3 py-1"
                            >
                                <CheckCircle className="h-3 w-3 mr-1" />
                                {approvedCount} aprobados
                            </Badge>
                            <Badge
                                variant="outline"
                                className="bg-red-50 text-red-700 border-red-200 text-sm px-3 py-1"
                            >
                                <XCircle className="h-3 w-3 mr-1" />
                                {rejectedCount} reprobados
                            </Badge>
                            {pendingCount > 0 && (
                                <Badge
                                    variant="outline"
                                    className="bg-yellow-50 text-yellow-700 border-yellow-200 text-sm px-3 py-1"
                                >
                                    {pendingCount} pendientes
                                </Badge>
                            )}
                        </div>
                    )}
                </div>

                <div className="p-6">
                    {isLoading && (
                        <div className="flex items-center justify-center py-16">
                            <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
                            <span className="ml-3 text-gray-600">
                                Cargando historial de exámenes...
                            </span>
                        </div>
                    )}

                    {!isLoading && exams.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                            <GraduationCap className="h-16 w-16 mb-4 text-gray-300" />
                            <p className="text-lg font-medium">
                                No hay exámenes registrados
                            </p>
                            <p className="text-sm">
                                Este alumno aún no ha presentado ningún
                                examen.
                            </p>
                        </div>
                    )}

                    {!isLoading && exams.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <Award className="h-5 w-5 text-amber-600" />
                                Historial de Exámenes
                            </h3>
                            {exams.map((exam: any) => (
                                <div
                                    key={exam.id}
                                    className={`p-5 rounded-xl border-2 transition-all ${
                                        exam.status === "Aprobado"
                                            ? "border-green-200 bg-green-50/20"
                                            : exam.status === "Reprobado"
                                              ? "border-red-200 bg-red-50/20"
                                              : "border-yellow-200 bg-yellow-50/20"
                                    }`}
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                                    exam.status === "Aprobado"
                                                        ? "bg-green-100 text-green-700"
                                                        : exam.status ===
                                                            "Reprobado"
                                                          ? "bg-red-100 text-red-700"
                                                          : "bg-yellow-100 text-yellow-700"
                                                }`}
                                            >
                                                <Award className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">
                                                    {exam.activity?.name ??
                                                        "Examen"}
                                                </p>
                                                <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                                    <CalendarDays className="h-3 w-3" />
                                                    {dateFormatterIntoLong(
                                                        exam.date ??
                                                            exam.activity
                                                                ?.date,
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <Badge
                                            className={
                                                exam.status === "Aprobado"
                                                    ? "bg-green-100 text-green-800 border-green-200"
                                                    : exam.status ===
                                                        "Reprobado"
                                                      ? "bg-red-100 text-red-800 border-red-200"
                                                      : "bg-yellow-100 text-yellow-800 border-yellow-200"
                                            }
                                        >
                                            {exam.status === "Aprobado" && (
                                                <CheckCircle className="h-3 w-3 mr-1" />
                                            )}
                                            {exam.status === "Reprobado" && (
                                                <XCircle className="h-3 w-3 mr-1" />
                                            )}
                                            {exam.status}
                                        </Badge>
                                    </div>

                                    <div className="mt-3 flex flex-wrap items-center gap-2 text-sm ml-[52px]">
                                        <span className="text-gray-500 text-xs">
                                            {exam.ranks?.martialArt
                                                ?.martialArt ?? ""}
                                        </span>
                                        <span className="text-gray-300">|</span>
                                        <Badge
                                            className={getBeltColor(
                                                exam.previousRank?.belt ?? "",
                                            )}
                                        >
                                            {exam.previousRank?.belt ?? "?"}
                                        </Badge>
                                        <ChevronRight className="h-3 w-3 text-gray-400" />
                                        <Badge
                                            className={getBeltColor(
                                                exam.ranks?.belt ?? "",
                                            )}
                                        >
                                            {exam.ranks?.belt ?? "?"}
                                        </Badge>
                                        {(exam.previousRank?.code ||
                                            exam.ranks?.code) && (
                                            <>
                                                <span className="text-gray-300">
                                                    |
                                                </span>
                                                <span className="text-gray-500 text-xs">
                                                    {exam.previousRank?.code ??
                                                        ""}
                                                    {exam.previousRank
                                                        ?.rank_name &&
                                                        ` (${exam.previousRank.rank_name})`}
                                                    {" → "}
                                                    {exam.ranks?.code ?? ""}
                                                    {exam.ranks?.rank_name &&
                                                        ` (${exam.ranks.rank_name})`}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
