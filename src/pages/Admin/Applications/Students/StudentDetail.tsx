import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    Award,
    CheckCircle,
    ChevronRight,
    GraduationCap,
    User,
    XCircle,
    CalendarDays,
} from "lucide-react";
import { useExamsByUser } from "@/hooks/useActivities";
import { useApplicationsStore } from "@/stores/applications.store";
import { useStudents } from "@/hooks/useStudents";
import { dateFormatterIntoLong } from "@/helpers/formatter";
import { IExam } from "@/services/activities/activity.interface";
import { Loader } from "@/components/spinner/Loader";
import { IStudent, StudentRanks } from "@/services/students/student.interface";

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

export default function StudentDetail() {
    const { selectedStudentId, closeStudentDetail } = useApplicationsStore();
    const { data: students = [] } = useStudents();
    const { exams, isLoading } = useExamsByUser(selectedStudentId);

    const student = useMemo(
        () => students.find((s: IStudent) => s.id === selectedStudentId) ?? null,
        [students, selectedStudentId],
    );

    const approvedCount = exams.filter(
        (e: IExam) => e.status === "Aprobado",
    ).length;
    const rejectedCount = exams.filter(
        (e: IExam) => e.status === "Reprobado",
    ).length;
    const pendingCount = exams.filter(
        (e: IExam) => e.status === "Pendiente",
    ).length;

    // const getInitials = (name: string, lastName: string) => {
    //     return `${name?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`.toUpperCase();
    // };

    return (
        <div className="mx-auto my-3 min-h-full w-full max-w-4xl p-3 sm:my-6 sm:p-6">
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xl">
                <div className="border-b border-border bg-linear-to-r from-brand-gold/10 to-brand-vermilion/10 p-4 sm:p-6">
                    <Button
                        variant="ghost"
                        className="mb-4 h-11 text-muted-foreground hover:text-foreground sm:h-9"
                        onClick={closeStudentDetail}
                    >
                        <ArrowLeft data-icon="inline-start" />
                        Volver a alumnos
                    </Button>

                    <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                        <div className="h-16 w-16 shrink-0 rounded-full bg-linear-to-br from-brand-gold to-brand-vermilion p-0.5">
                            <div className="h-full w-full rounded-full bg-card flex items-center justify-center">
                                {student?.profileImg ? (
                                    <img
                                        src={student.profileImg}
                                        alt=""
                                        className="h-full w-full rounded-full object-cover"
                                    />
                                ) : (
                                    <User className="h-8 w-8 text-brand-gold-deep" />
                                )}
                            </div>
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-xl font-bold break-words text-heading sm:text-2xl">
                                {student?.name ?? ""} {student?.lastName ?? ""}
                            </h2>
                            {student?.identification && (
                                <p className="text-muted-foreground text-sm mt-1">
                                    C.I: {student.identification}
                                </p>
                            )}
                            {student?.userRanks && student.userRanks.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {(student.userRanks as StudentRanks[]).map(
                                        (ur: StudentRanks, i: number) => (
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
                                className="border-brand-indigo/20 bg-brand-indigo/10 text-sm text-brand-indigo px-3 py-1"
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
                                    className="bg-brand-gold/15 text-brand-gold-deep border-brand-gold/30 text-sm px-3 py-1"
                                >
                                    {pendingCount} pendientes
                                </Badge>
                            )}
                        </div>
                    )}
                </div>

                <div className="p-4 sm:p-6">
                    {isLoading && (
                        <div className="flex items-center justify-center py-16">
                            <Loader message="Cargando historial de exámenes..." />
                        </div>
                    )}

                    {!isLoading && exams.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                            <GraduationCap className="h-16 w-16 mb-4 text-border" />
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
                            <h3 className="text-lg font-bold text-heading flex items-center gap-2">
                                <Award className="h-5 w-5 text-brand-gold-deep" />
                                Historial de Exámenes
                            </h3>
                            {exams.map((exam: IExam) => (
                                <div
                                    key={exam.id}
                                    className={`rounded-xl border-2 p-4 transition-all sm:p-5 ${
                                        exam.status === "Aprobado"
                                            ? "border-green-200 bg-green-50/20"
                                            : exam.status === "Reprobado"
                                              ? "border-red-200 bg-red-50/20"
                                              : "border-brand-gold/30 bg-brand-gold/10"
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
                                                          : "bg-brand-gold/15 text-brand-gold-deep"
                                                }`}
                                            >
                                                <Award className="h-5 w-5" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-semibold break-words text-foreground">
                                                    {exam.activity?.name ??
                                                        "Examen"}
                                                </p>
                                                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                                    <CalendarDays className="h-3 w-3" />
                                                    {dateFormatterIntoLong(
                                                        exam.createdAt ??
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
                                                      : "bg-yellow-100 text-yellow-800 border-brand-gold/30"
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

                                    <div className="mt-3 flex flex-wrap items-center gap-2 text-sm sm:ml-[52px]">
                                        <span className="text-muted-foreground text-xs">
                                            {exam.ranks?.martialArt
                                                ?.martialArt ?? ""}
                                        </span>
                                        <span className="text-border">|</span>
                                        <Badge
                                            className={getBeltColor(
                                                exam.previousRank?.belt ?? "",
                                            )}
                                        >
                                            {exam.previousRank?.belt ?? "?"}
                                        </Badge>
                                        <ChevronRight className="h-3 w-3 text-muted-foreground" />
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
                                                <span className="text-border">
                                                    |
                                                </span>
                                                <span className="text-muted-foreground text-xs">
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
