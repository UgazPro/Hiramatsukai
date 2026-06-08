import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import {
    X, User, Mail, MapPin, Phone, Cake, Calendar, Clock, Award,
    CheckCircle, XCircle, DollarSign, School, Target, Shield, ChevronRight,
    Activity, Star, Loader2
} from "lucide-react";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import { useStudentsStore } from "@/stores/students.store";
import { useExamsByUser } from "@/hooks/useActivities";
import { calculateMartialTime, dateFormatterIntoLong, formatNumberWithDots, formatPhoneNumber } from "@/helpers/formatter";
import { useStudentAllInfo } from "@/hooks/useStudents";

const getCinturonColor = (grado: string) => {
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

export default function StudentDetailView() {

    const { selectedStudent, setScreen, startEdit } = useStudentsStore();
    const { data: allInfo, isLoading: dynamicLoading } = useStudentAllInfo(selectedStudent?.id ?? null);
    const { exams, isLoading: examsLoading } = useExamsByUser(selectedStudent?.id ?? null);

    const examsByMartialArt = useMemo(() => {
        const groups: Record<string, { name: string; exams: any[] }> = {};
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
        <div className="min-h-full p-6 relative w-full max-w-7xl mx-auto my-6 bg-white shadow-xl border border-gray-200 rounded-xl">

            {/* Header */}
            <div className="bg-linear-to-r from-amber-50 to-red-50 border-b border-gray-300 rounded-lg">
                <h2 className="p-6">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                            <div className="h-20 w-20 rounded-full bg-linear-to-br from-amber-500 to-red-500 p-1 flex-shrink-0">
                                <div className="h-full w-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                                    {selectedStudent.profileImg ? (
                                        <img
                                            src={selectedStudent.profileImg}
                                            className="h-full w-full rounded-full object-cover"
                                            alt="Perfil"
                                        />
                                    ) : (
                                        <User className="h-10 w-10 text-amber-600" />
                                    )}
                                </div>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900">
                                    {selectedStudent.name} {selectedStudent.lastName}
                                </h2>
                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                    {selectedStudent.userRanks.length > 0 && (
                                        <>
                                            <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-base px-3 py-1">
                                                <Shield className="h-4 w-4 mr-1" />
                                                {selectedStudent.userRanks[0].rank.belt}
                                            </Badge>
                                            <Badge className="bg-gray-100 text-gray-800 border-gray-200">
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
                                <p className="text-sm text-gray-500 mt-1.5">
                                    @{selectedStudent.username}
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setScreen("list")}
                            className="h-8 w-8 p-0 hover:bg-white/50"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </h2>
            </div>

            {/* Main screen */}
            <div className="p-6 space-y-8">

                {/* Row 1: Info Personal + Info Contacto */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <Card className="border border-gray-300 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <User className="h-5 w-5 text-amber-600" />
                                <h3 className="text-lg font-semibold text-gray-900">Información Personal</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Cédula</p>
                                    <p className="font-mono font-medium text-gray-900">{formatNumberWithDots(selectedStudent.identification)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Sexo</p>
                                    <p className="font-medium text-gray-900">{selectedStudent.sex}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Fecha de Nacimiento</p>
                                    <div className="flex items-center gap-2">
                                        <Cake className="h-4 w-4 text-gray-500" />
                                        <p className="font-medium text-gray-900">{dateFormatterIntoLong(selectedStudent.birthday)}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Usuario</p>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-900">@{selectedStudent.username}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-gray-300 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Mail className="h-5 w-5 text-amber-600" />
                                <h3 className="text-lg font-semibold text-gray-900">Información de Contacto</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                        <Mail className="h-5 w-5 text-gray-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500 mb-1">Email</p>
                                        <p className="font-medium text-gray-900 break-all">{selectedStudent.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                        <Phone className="h-5 w-5 text-gray-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500 mb-1">Teléfono</p>
                                        <p className="font-medium text-gray-900">{formatPhoneNumber(selectedStudent.phone)}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                        <MapPin className="h-5 w-5 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Dirección</p>
                                        <p className="font-medium text-gray-900">{selectedStudent.address}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Row 2: Dojo + Asistencia + Pagos */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <Card className="border border-gray-300 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <School className="h-5 w-5 text-amber-600" />
                                <h3 className="text-lg font-semibold text-gray-900">Información del Dojo</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Dojo</p>
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-full bg-linear-to-br from-amber-500/20 to-red-500/20 flex items-center justify-center">
                                            <Target className="h-4 w-4 text-amber-600" />
                                        </div>
                                        <p className="font-semibold text-gray-900">{selectedStudent.dojo.dojo}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Fecha de Inscripción</p>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-gray-500" />
                                        <p className="font-medium text-gray-900">{dateFormatterIntoLong(selectedStudent.enrollmentDate)}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Tiempo Practicando</p>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-gray-500" />
                                        <p className="font-medium text-gray-900">{calculateMartialTime(selectedStudent.enrollmentDate).text}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-gray-300 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Activity className="h-5 w-5 text-amber-600" />
                                    <h3 className="text-lg font-semibold text-gray-900">Asistencia</h3>
                                </div>
                                {!dynamicLoading && allInfo && (
                                    <Badge className={`text-sm px-3 py-1 ${
                                        allInfo.attendancePercentage >= 80
                                            ? "bg-green-100 text-green-800 border-green-200"
                                            : allInfo.attendancePercentage >= 60
                                                ? "bg-amber-100 text-amber-800 border-amber-200"
                                                : "bg-red-100 text-red-800 border-red-200"
                                    }`}>
                                        {allInfo.attendancePercentage}%
                                    </Badge>
                                )}
                            </div>
                            <div className="space-y-4">
                                {dynamicLoading ? (
                                    <div className="flex items-center justify-center py-8 text-gray-400">
                                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                        <span className="text-sm">Cargando...</span>
                                    </div>
                                ) : allInfo ? (
                                    <>
                                        <div>
                                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                                <span>Porcentaje de Asistencia</span>
                                                <span className="font-medium">{allInfo.attendancePercentage}%</span>
                                            </div>
                                            <Progress
                                                value={allInfo.attendancePercentage}
                                                className="h-2 bg-gray-200"
                                            />
                                        </div>
                                        <div className="text-center pt-2">
                                            <p className="text-sm text-gray-600">
                                                {allInfo.attendancePercentage >= 80 ? (
                                                    <span className="text-green-600 font-medium">¡Excelente asistencia!</span>
                                                ) : allInfo.attendancePercentage >= 60 ? (
                                                    <span className="text-amber-600 font-medium">Asistencia regular</span>
                                                ) : (
                                                    <span className="text-red-600 font-medium">Asistencia baja</span>
                                                )}
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-sm text-gray-500 text-center py-4">Sin datos de asistencia</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-gray-300 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <DollarSign className="h-5 w-5 text-amber-600" />
                                <h3 className="text-lg font-semibold text-gray-900">Estado de Pagos</h3>
                            </div>
                            <div className="space-y-4">
                                {dynamicLoading ? (
                                    <div className="flex items-center justify-center py-8 text-gray-400">
                                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                        <span className="text-sm">Cargando...</span>
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
                </div>

                {/* Row 3: Exámenes por Arte Marcial (reemplaza Historial) */}
                <Card className="border border-gray-300 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Award className="h-5 w-5 text-amber-600" />
                            <h3 className="text-lg font-semibold text-gray-900">Exámenes por Arte Marcial</h3>
                        </div>

                        {examsLoading && (
                            <div className="flex items-center justify-center py-8 text-gray-400">
                                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                <span className="text-sm">Cargando exámenes...</span>
                            </div>
                        )}

                        {!examsLoading && exams.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                <Award className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                                <p className="text-sm">No hay exámenes registrados</p>
                            </div>
                        )}

                        {!examsLoading && examsByMartialArt.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {examsByMartialArt.map((group) => (
                                    <div key={group.name} className="border border-gray-200 rounded-xl p-4 space-y-3">
                                        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                                            <div className="h-7 w-7 rounded-lg bg-amber-100 flex items-center justify-center">
                                                <Award className="h-4 w-4 text-amber-700" />
                                            </div>
                                            <span className="font-bold text-gray-900">{group.name}</span>
                                            <span className="text-xs text-gray-500">({group.exams.length})</span>
                                        </div>

                                        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                                            {group.exams.map((exam: any) => (
                                                <div
                                                    key={exam.id}
                                                    className={`p-3 rounded-lg border text-sm transition-colors ${
                                                        exam.status === "Aprobado"
                                                            ? "border-green-200 bg-green-50/30"
                                                            : exam.status === "Reprobado"
                                                                ? "border-red-200 bg-red-50/30"
                                                                : "border-yellow-200 bg-yellow-50/30"
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between mb-1.5">
                                                        <span className="text-xs text-gray-500 truncate max-w-[60%]">
                                                            {exam.activity?.name ?? "Examen"}
                                                        </span>
                                                        <Badge className={`text-[10px] px-1.5 py-0 ${
                                                            exam.status === "Aprobado"
                                                                ? "bg-green-100 text-green-800 border-green-200"
                                                                : exam.status === "Reprobado"
                                                                    ? "bg-red-100 text-red-800 border-red-200"
                                                                    : "bg-yellow-100 text-yellow-800 border-yellow-200"
                                                        }`}>
                                                            {exam.status === "Aprobado" ? "✓" : exam.status === "Reprobado" ? "✗" : "?"}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex items-center gap-1 flex-wrap">
                                                        <Badge className={getCinturonColor(exam.previousRank?.belt ?? "") + " text-[10px] px-1.5 py-0"}>
                                                            {exam.previousRank?.belt ?? "?"}
                                                        </Badge>
                                                        <ChevronRight className="h-2.5 w-2.5 text-gray-400" />
                                                        <Badge className={getCinturonColor(exam.ranks?.belt ?? "") + " text-[10px] px-1.5 py-0"}>
                                                            {exam.ranks?.belt ?? "?"}
                                                        </Badge>
                                                        <span className="text-[10px] text-gray-400 ml-auto">
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
                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Próximo Examen Postulado</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <Calendar className="h-4 w-4 text-amber-600" />
                                            <p className="font-semibold text-gray-900">
                                                {allInfo.upcomingExam.name} — {dateFormatterIntoLong(allInfo.upcomingExam.date)}
                                            </p>
                                        </div>
                                    </div>
                                    <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                                        <Award className="h-3 w-3 mr-1" />
                                        Pendiente
                                    </Badge>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Row 4: Actividades Asistidas */}
                <Card className="border border-gray-300 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Activity className="h-5 w-5 text-amber-600" />
                            <h3 className="text-lg font-semibold text-gray-900">Actividades Asistidas</h3>
                        </div>

                        {dynamicLoading && (
                            <div className="flex items-center justify-center py-8 text-gray-400">
                                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                <span className="text-sm">Cargando...</span>
                            </div>
                        )}

                        {!dynamicLoading && activitiesTop.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                <Star className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                                <p className="text-sm">No ha asistido a actividades especiales</p>
                            </div>
                        )}

                        {!dynamicLoading && activitiesTop.length > 0 && (
                            <>
                                <div className="space-y-3">
                                    {activitiesTop.map((item: any) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-3 p-3 bg-linear-to-r from-white to-amber-50 rounded-lg border border-amber-200 hover:border-amber-300 transition-colors group"
                                        >
                                            <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 group-hover:bg-amber-200 transition-colors">
                                                <Star className="h-4 w-4 text-amber-600" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900">{item.activity.name}</p>
                                                <p className="text-xs text-gray-500">{dateFormatterIntoLong(item.activity.date)}</p>
                                            </div>
                                            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-amber-600 transition-colors" />
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 pt-3 border-t border-gray-200 text-center">
                                    <p className="text-sm text-gray-600">
                                        Ha asistido a {allInfo?.activityAttendanceHistory.length ?? 0} actividades especiales
                                    </p>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-300 p-4 z-20">
                <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                        Última actualización: {format(new Date(), "dd/MM/yyyy 'a las' HH:mm", { locale: es })}
                    </div>
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            className="border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                            onClick={() => setScreen("list")}
                        >
                            Cerrar
                        </Button>
                        <Button
                            className="bg-linear-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white cursor-pointer"
                            onClick={() => startEdit(selectedStudent!)}
                        >
                            Editar Información
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
