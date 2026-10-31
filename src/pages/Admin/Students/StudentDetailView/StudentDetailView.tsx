import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import {
    X, User, Mail, MapPin, Phone, Cake, Calendar, Clock, Award,
    CheckCircle, XCircle, DollarSign, School, Target, Shield, ChevronRight,
    Activity, Star
} from "lucide-react";
import { Loader } from "@/components/spinner/Loader";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import { useStudentsStore } from "@/stores/students.store";
import { useExamsByUser } from "@/hooks/useActivities";
import { calculateMartialTime, dateFormatterIntoLong, formatIdentification, formatPhoneWithCode } from "@/helpers/formatter";
import { useStudentAllInfo } from "@/hooks/useStudents";
import { IExam } from "@/services/activities/activity.interface";
import { IActivityAttendanceItem, IStudent } from "@/services/students/student.interface";

const getBeltColor = (grado: string) => {
    const colors: Record<string, string> = {
        Blanco: "bg-muted text-foreground border-border",
        Amarillo: "bg-brand-gold/15 text-yellow-800 border-yellow-300",
        Naranja: "bg-orange-100 text-orange-800 border-orange-300",
        Verde: "bg-green-100 text-green-800 border-green-300",
        Azul: "bg-blue-100 text-blue-800 border-blue-300",
        Marrón: "bg-yellow-800 text-white border-yellow-900",
        Negro: "bg-gray-900 text-white border-gray-950",
        Rojo: "bg-red-800 text-white border-red-900",
    };
    return colors[grado] || "bg-muted text-foreground border-border";
};

interface StudentDetailViewProps {
    student?: IStudent;
}

export default function StudentDetailView({ student: propStudent }: StudentDetailViewProps = {}) {

    const store = useStudentsStore();
    const selectedStudent = propStudent ?? store.selectedStudent;
    const setScreen = store.setScreen;
    const startEdit = store.startEdit;
    const { data: allInfo, isLoading: dynamicLoading } = useStudentAllInfo(selectedStudent?.id ?? null);
    const { exams, isLoading: examsLoading } = useExamsByUser(selectedStudent?.id ?? null);

    const examsByMartialArt = useMemo(() => {
        const groups: Record<string, { name: string; exams: IExam[] }> = {};
        for (const exam of exams) {
            const name = exam.ranks?.martialArt?.martialArt ?? "Otro";
            if (!groups[name]) groups[name] = { name, exams: [] };
            groups[name].exams.push(exam);
        }
        return Object.values(groups);
    }, [exams]);

    const activitiesTop = useMemo(
        () => (allInfo?.activityAttendanceHistory ?? []).slice(0, 4),
        [allInfo],
    );

    if (!selectedStudent) return null;

    return (
        <div className="mx-2 my-3 flex flex-col rounded-xl border border-border bg-card shadow-xl sm:mx-5">

            {/* Header */}
            <div className="shrink-0 border-b border-border bg-linear-to-r from-brand-gold/10 to-brand-vermilion/10">
                <h2 className="p-4 sm:p-6">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                            <div className="h-16 w-16 shrink-0 rounded-full bg-linear-to-br from-brand-gold to-brand-vermilion p-1 sm:h-20 sm:w-20">
                                <div className="h-full w-full rounded-full bg-card flex items-center justify-center overflow-hidden">
                                    {selectedStudent.profileImg ? (
                                        <img
                                            src={selectedStudent.profileImg}
                                            className="h-full w-full rounded-full object-cover"
                                            alt="Perfil"
                                        />
                                    ) : (
                                        <User className="h-10 w-10 text-brand-gold-deep" />
                                    )}
                                </div>
                            </div>
                            <div className="min-w-0">
                                <h2 className="text-xl font-bold break-words text-foreground sm:text-3xl">
                                    {selectedStudent.name} {selectedStudent.lastName}
                                </h2>
                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                    {selectedStudent.userRanks.length > 0 && (
                                        <>
                                            <Badge className="bg-brand-gold/15 text-brand-gold-deep border-brand-gold/30 text-base px-3 py-1">
                                                <Shield className="h-4 w-4 mr-1" />
                                                {selectedStudent.userRanks[0].rank.belt}
                                            </Badge>
                                            <Badge className="bg-muted text-foreground border-border">
                                                {selectedStudent.userRanks[0].rank.code}
                                            </Badge>
                                        </>
                                    )}
                                    {selectedStudent.active ? (
                                        <Badge className="bg-green-100 text-green-800 border-green-200">
                                            <CheckCircle className="h-3 w-3 mr-1" />
                                            Activo
                                        </Badge>
                                    ) : (
                                        <Badge className="bg-red-100 text-red-800 border-red-200">
                                            <XCircle className="h-3 w-3 mr-1" />
                                            Inactivo
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1.5">
                                    @{selectedStudent.username}
                                </p>
                            </div>
                        </div>
                        {!propStudent && (
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Cerrar detalle"
                            onClick={() => setScreen("list")}
                            className="size-11 shrink-0 self-start hover:bg-muted sm:size-9"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                        )}
                    </div>
                </h2>
            </div>

            {/* Main screen */}
            <div className="flex-1 space-y-6 p-4 sm:space-y-8 sm:p-6">

                {/* Row 1: Info Personal + Info Contacto + Info Dojo */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">

                    <Card className="border border-border shadow-sm">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <User className="h-5 w-5 text-brand-gold-deep" />
                                <h3 className="text-lg font-semibold text-foreground">Información Personal</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Cédula</p>
                                    <p className="font-mono font-medium text-foreground">{formatIdentification(selectedStudent.identification)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Sexo</p>
                                    <p className="font-medium text-foreground">{selectedStudent.sex}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Fecha de Nacimiento</p>
                                    <div className="flex items-center gap-2">
                                        <Cake className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium text-foreground">{dateFormatterIntoLong(selectedStudent.birthday)}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Usuario</p>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-foreground">@{selectedStudent.username}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-border shadow-sm">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Mail className="h-5 w-5 text-brand-gold-deep" />
                                <h3 className="text-lg font-semibold text-foreground">Información de Contacto</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                                        <Mail className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm text-muted-foreground mb-1">Email</p>
                                        <p className="font-medium text-foreground break-all">{selectedStudent.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                                        <Phone className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm text-muted-foreground mb-1">Teléfono</p>
                                        <p className="font-medium text-foreground">{formatPhoneWithCode(selectedStudent.phone)}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                                        <MapPin className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Dirección</p>
                                        <p className="font-medium text-foreground">{selectedStudent.address}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-border shadow-sm">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <School className="h-5 w-5 text-brand-gold-deep" />
                                <h3 className="text-lg font-semibold text-foreground">Información del Dojo</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Dojo</p>
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-full bg-linear-to-br from-brand-gold/20 to-brand-vermilion/20 flex items-center justify-center">
                                            <Target className="h-4 w-4 text-brand-gold-deep" />
                                        </div>
                                        <p className="font-semibold text-foreground">{selectedStudent.dojo.dojo}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Fecha de Inscripción</p>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium text-foreground">{dateFormatterIntoLong(selectedStudent.enrollmentDate)}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Tiempo Practicando</p>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium text-foreground">{calculateMartialTime(selectedStudent.enrollmentDate).text}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Row 2: Asistencia + Pagos + Actividades */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">

                    <Card className="border border-border shadow-sm">
                        <CardContent className="p-4 sm:p-6">
                            <div className="mb-4 flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    <Activity className="h-5 w-5 text-brand-gold-deep" />
                                    <h3 className="text-lg font-semibold text-foreground">Asistencia</h3>
                                </div>
                                {!dynamicLoading && allInfo && (
                                    <Badge className={`text-sm px-3 py-1 ${
                                        allInfo.attendancePercentage >= 80
                                            ? "bg-green-100 text-green-800 border-green-200"
                                            : allInfo.attendancePercentage >= 60
                                                ? "bg-brand-gold/15 text-brand-gold-deep border-brand-gold/30"
                                                : "bg-red-100 text-red-800 border-red-200"
                                    }`}>
                                        {allInfo.attendancePercentage}%
                                    </Badge>
                                )}
                            </div>
                            <div className="space-y-4">
                                {dynamicLoading ? (
                                    <div className="flex items-center justify-center py-8 text-muted-foreground">
                                        <Loader size="sm" message="Cargando..." />
                                    </div>
                                ) : allInfo ? (
                                    <>
                                        <div>
                                            <div className="flex justify-between text-sm text-muted-foreground mb-1">
                                                <span>Porcentaje de Asistencia</span>
                                                <span className="font-medium">{allInfo.attendancePercentage}%</span>
                                            </div>
                                            <Progress
                                                value={allInfo.attendancePercentage}
                                                className="h-2 bg-muted"
                                            />
                                        </div>
                                        <div className="text-center pt-2">
                                            <p className="text-sm text-muted-foreground">
                                                {allInfo.attendancePercentage >= 80 ? (
                                                    <span className="text-green-600 font-medium">¡Excelente asistencia!</span>
                                                ) : allInfo.attendancePercentage >= 60 ? (
                                                    <span className="text-brand-gold-deep font-medium">Asistencia regular</span>
                                                ) : (
                                                    <span className="text-red-600 font-medium">Asistencia baja</span>
                                                )}
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-sm text-muted-foreground text-center py-4">Sin datos de asistencia</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-border shadow-sm">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <DollarSign className="h-5 w-5 text-brand-gold-deep" />
                                <h3 className="text-lg font-semibold text-foreground">Estado de Pagos</h3>
                            </div>
                            <div className="space-y-4">
                                {dynamicLoading ? (
                                    <div className="flex items-center justify-center py-8 text-muted-foreground">
                                        <Loader size="sm" message="Cargando..." />
                                    </div>
                                ) : (
                                    <div className="text-center py-4">
                                        {allInfo?.paymentStatus === 'AL_DIA' ? (
                                            <div className="space-y-2">
                                                <div className="h-16 w-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                                                    <CheckCircle className="h-8 w-8 text-green-600" />
                                                </div>
                                                <p className="font-semibold text-green-700 text-lg">Al día con los pagos</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                <div className="h-16 w-16 mx-auto rounded-full bg-red-100 flex items-center justify-center">
                                                    <XCircle className="h-8 w-8 text-red-600" />
                                                </div>
                                                <p className="font-semibold text-red-700 text-lg">Pagos pendientes</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-border shadow-sm">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Activity className="h-5 w-5 text-brand-gold-deep" />
                                <h3 className="text-lg font-semibold text-foreground">Actividades Asistidas</h3>
                            </div>

                            {dynamicLoading && (
                                <div className="flex items-center justify-center py-8 text-muted-foreground">
                                    <Loader size="sm" message="Cargando..." />
                                </div>
                            )}

                            {!dynamicLoading && activitiesTop.length === 0 && (
                                <div className="text-center py-8 text-muted-foreground">
                                    <Star className="h-10 w-10 mx-auto mb-2 text-border" />
                                    <p className="text-sm">No ha asistido a actividades especiales</p>
                                </div>
                            )}

                            {!dynamicLoading && activitiesTop.length > 0 && (
                                <>
                                    <div className="space-y-2">
                                        {activitiesTop.map((item: IActivityAttendanceItem) => (
                                            <div
                                                key={item.id}
                                                className="flex items-center gap-2 p-2.5 rounded-lg border border-border hover:border-border transition-colors group"
                                            >
                                                <div className="h-7 w-7 rounded-full bg-brand-gold/15 flex items-center justify-center shrink-0">
                                                    <Star className="h-3.5 w-3.5 text-brand-gold-deep" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-foreground truncate">{item.activity.name}</p>
                                                    <p className="text-[10px] text-muted-foreground">{dateFormatterIntoLong(item.activity.date)}</p>
                                                </div>
                                                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-3 pt-2 border-t border-border text-center">
                                        <p className="text-xs text-muted-foreground">
                                            Ha asistido a {allInfo?.activityAttendanceHistory.length ?? 0} actividades especiales
                                        </p>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Row 3: Exámenes por Arte Marcial */}
                <Card className="border border-border shadow-sm">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Award className="h-5 w-5 text-brand-gold-deep" />
                            <h3 className="text-lg font-semibold text-foreground">Exámenes por Arte Marcial</h3>
                        </div>

                        {examsLoading && (
                            <div className="flex items-center justify-center py-8 text-muted-foreground">
                                <Loader size="sm" message="Cargando exámenes..." />
                            </div>
                        )}

                        {!examsLoading && exams.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                                <Award className="h-10 w-10 mx-auto mb-2 text-border" />
                                <p className="text-sm">No hay exámenes registrados</p>
                            </div>
                        )}

                        {!examsLoading && examsByMartialArt.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {examsByMartialArt.map((group) => (
                                    <div key={group.name} className="border border-border rounded-xl p-4 space-y-3">
                                        <div className="flex items-center gap-2 pb-2 border-b border-border">
                                            <div className="h-7 w-7 rounded-lg bg-brand-gold/15 flex items-center justify-center">
                                                <Award className="h-4 w-4 text-brand-gold-deep" />
                                            </div>
                                            <span className="font-bold text-foreground">{group.name}</span>
                                            <span className="text-xs text-muted-foreground">({group.exams.length})</span>
                                        </div>

                                        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                                            {group.exams.map((exam: IExam) => (
                                                <div
                                                    key={exam.id}
                                                    className={`p-3 rounded-lg border text-sm transition-colors ${
                                                        exam.status === "Aprobado"
                                                            ? "border-green-200 bg-green-50/30"
                                                            : exam.status === "Reprobado"
                                                                ? "border-red-200 bg-red-50/30"
                                                                : "border-brand-gold/30 bg-brand-gold/10"
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between mb-1.5">
                                                        <span className="min-w-0 truncate text-xs text-muted-foreground">
                                                            {exam.activity?.name ?? "Examen"}
                                                        </span>
                                                        <Badge className={`text-[10px] px-1.5 py-0 ${
                                                            exam.status === "Aprobado"
                                                                ? "bg-green-100 text-green-800 border-green-200"
                                                                : exam.status === "Reprobado"
                                                                    ? "bg-red-100 text-red-800 border-red-200"
                                                                    : "bg-brand-gold/15 text-brand-gold-deep border-brand-gold/30"
                                                        }`}>
                                                            {exam.status === "Aprobado" ? "✓" : exam.status === "Reprobado" ? "✗" : "?"}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex items-center gap-1 flex-wrap">
                                                        <Badge className={getBeltColor(exam.previousRank?.belt ?? "") + " text-[10px] px-1.5 py-0"}>
                                                            {exam.previousRank?.belt ?? "?"}
                                                        </Badge>
                                                        <ChevronRight className="h-2.5 w-2.5 text-muted-foreground" />
                                                        <Badge className={getBeltColor(exam.ranks?.belt ?? "") + " text-[10px] px-1.5 py-0"}>
                                                            {exam.ranks?.belt ?? "?"}
                                                        </Badge>
                                                        <span className="text-[10px] text-muted-foreground ml-auto">
                                                            {dateFormatterIntoLong(exam.activity?.date ?? exam.createdAt)}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {!examsLoading && allInfo?.upcomingExam && (
                            <div className="mt-6 pt-4 border-t border-border">
                                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                                    <div className="min-w-0">
                                        <p className="text-sm text-muted-foreground">Próximo Examen Postulado</p>
                                        <div className="mt-0.5 flex min-w-0 items-center gap-2">
                                            <Calendar className="h-4 w-4 shrink-0 text-brand-gold-deep" />
                                            <p className="min-w-0 font-semibold break-words text-foreground">
                                                {allInfo.upcomingExam.name} — {dateFormatterIntoLong(allInfo.upcomingExam.date)}
                                            </p>
                                        </div>
                                    </div>
                                    <Badge className="w-fit shrink-0 border-brand-gold/30 bg-brand-gold/15 text-brand-gold-deep">
                                        <Award className="h-3 w-3 mr-1" />
                                        Pendiente
                                    </Badge>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

            </div>

            {/* Footer */}
            {!propStudent && (
            <div className="border-t border-border bg-card p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-muted-foreground">
                        Última actualización: {format(new Date(), "dd/MM/yyyy 'a las' HH:mm", { locale: es })}
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                        <Button
                            variant="outline"
                            className="h-11 w-full cursor-pointer border-border text-foreground hover:bg-muted/40 sm:h-9 sm:w-auto"
                            onClick={() => setScreen("list")}
                        >
                            Cerrar
                        </Button>
                        <Button
                            className="h-11 w-full cursor-pointer bg-brand-vermilion text-white hover:bg-brand-vermilion-dark sm:h-9 sm:w-auto"
                            onClick={() => startEdit(selectedStudent!)}
                        >
                            Editar Información
                        </Button>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}
