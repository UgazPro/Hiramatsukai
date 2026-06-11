import { useState, useEffect, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users, DollarSign, Calendar, TrendingUp, Award, Star, Activity, Target, UserPlus, Gift, BarChart3, CalendarDays, School, Flame,
  BookOpen, Sparkles, Crown
} from "lucide-react";
import { format, differenceInDays, isToday, isTomorrow } from "date-fns";
import { es } from "date-fns/locale";
import { Loader } from "@/components/spinner/Loader";
import { useDashboard } from "@/hooks/useDashboard";
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

const getInitials = (name: string, lastName: string) =>
  `${name?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`.toUpperCase();

export default function AdminPanel() {
  const {
    user, totalEstudiantes, advancedCount, birthdays, nextExams,
    nextActivities, classesThisMonth, monthlyIncome, weeklyAttendance,
    averageAttendance, upcomingClassesNext, isLoading,
  } = useDashboard();

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatMoneda = (monto: number = 0) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(monto);

  const diasRestantes = (fecha: Date) => {
    const dias = differenceInDays(fecha, new Date());
    if (dias === 0) return "Hoy";
    if (dias === 1) return "Mañana";
    if (dias < 0) return "Pasado";
    return `En ${dias} días`;
  };

  const maxAttendance = useMemo(
    () => Math.max(...(weeklyAttendance ?? []).map(d => d.estudiantes), 1),
    [weeklyAttendance],
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader message="Cargando dashboard..." />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            ¡Bienvenido, {user?.name ?? "Sensei"} {user?.lastName ?? ""}!
          </h1>
          <p className="text-gray-600 mt-2 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {format(currentTime, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
          </p>
        </div>
        <Badge className="bg-amber-100 text-amber-800 border-amber-200 px-4 py-2">
          <Sparkles className="h-4 w-4 mr-2" />
          {totalEstudiantes} Estudiantes Activos
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border border-gray-300 hover:border-amber-400 hover:shadow-lg transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Estudiantes</p>
                <h3 className="text-3xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
                  {totalEstudiantes}
                </h3>
                <p className="text-sm text-green-600 mt-2 flex items-center">
                  <UserPlus className="h-3 w-3 mr-1" />
                  Activos en el dojo
                </p>
              </div>
              <div className="h-14 w-14 rounded-full bg-linear-to-br from-amber-500/20 to-red-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="h-7 w-7 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-300 hover:border-amber-400 hover:shadow-lg transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Cinturones Avanzados</p>
                <h3 className="text-3xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
                  {advancedCount}
                </h3>
                <p className="text-sm text-gray-600 mt-2 flex items-center">
                  <Crown className="h-3 w-3 mr-1 text-amber-600" />
                  Marrón y Negro
                </p>
              </div>
              <div className="h-14 w-14 rounded-full bg-linear-to-br from-amber-500/20 to-red-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award className="h-7 w-7 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-300 hover:border-amber-400 hover:shadow-lg transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Ingresos Mensuales</p>
                <h3 className="text-3xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
                  {formatMoneda(monthlyIncome)}
                </h3>
                <p className="text-sm text-amber-600 mt-2 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Mes actual
                </p>
              </div>
              <div className="h-14 w-14 rounded-full bg-linear-to-br from-amber-500/20 to-red-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <DollarSign className="h-7 w-7 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-300 hover:border-amber-400 hover:shadow-lg transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Clases del Mes</p>
                <h3 className="text-3xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
                  {classesThisMonth}
                </h3>
                <p className="text-sm text-amber-600 mt-2 flex items-center">
                  <Flame className="h-3 w-3 mr-1" />
                  Actividades programadas
                </p>
              </div>
              <div className="h-14 w-14 rounded-full bg-linear-to-br from-amber-500/20 to-red-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Activity className="h-7 w-7 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Weekly Attendance + Next Activities / Birthdays */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Attendance */}
        <Card className="lg:col-span-2 border border-gray-300 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-amber-600" />
                <h3 className="text-lg font-semibold text-gray-900">Asistencia Semanal</h3>
              </div>
              <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                Promedio: {averageAttendance}%
              </Badge>
            </div>

            {(!weeklyAttendance || weeklyAttendance.every(d => d.estudiantes === 0)) ? (
              <div className="text-center py-8 text-gray-500">
                <Activity className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">Sin datos de asistencia esta semana</p>
              </div>
            ) : (
              <div className="space-y-4">
                {weeklyAttendance.map((dia) => (
                  <div key={dia.dia} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 w-8">{dia.dia}</span>
                        <span className="text-gray-600">{dia.estudiantes} estudiantes</span>
                      </div>
                      <span className={`font-medium ${dia.estudiantes >= (maxAttendance * 0.8) ? 'text-green-600' :
                          dia.estudiantes >= (maxAttendance * 0.5) ? 'text-amber-600' : 'text-red-600'
                        }`}>
                        {totalEstudiantes > 0 ? Math.round((dia.estudiantes / totalEstudiantes) * 100) : 0}%
                      </span>
                    </div>
                    <Progress
                      value={totalEstudiantes > 0 ? (dia.estudiantes / totalEstudiantes) * 100 : 0}
                      className={`h-3 ${dia.estudiantes >= (maxAttendance * 0.8) ? 'bg-green-500' :
                          dia.estudiantes >= (maxAttendance * 0.5) ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                    />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="space-y-6">
          <Card className="border border-gray-300 shadow-sm">
            <CardContent className="p-0">
              <div className="bg-linear-to-r from-amber-50 to-red-50 border-b border-gray-200 p-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-600" />
                  <h3 className="font-semibold text-gray-900">Próximas Actividades</h3>
                </div>
              </div>
              <div className="p-5 space-y-4">
                {nextActivities.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">No hay actividades próximas</p>
                ) : (
                  nextActivities.map((act) => (
                    <div key={act.id} className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-linear-to-br from-amber-500/20 to-red-500/20 flex items-center justify-center flex-shrink-0">
                        <Target className="h-5 w-5 text-amber-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 truncate">{act.name}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <CalendarDays className="h-3 w-3" />
                          <span>{dateFormatterIntoLong(act.date)}</span>
                        </div>
                        <Badge className="mt-1 bg-amber-100 text-amber-800 border-amber-200 text-[10px]">
                          {diasRestantes(new Date(act.date))}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-300 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-amber-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Próximos Cumpleaños</h3>
                </div>
                {birthdays.length > 0 && (
                  <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                    {birthdays.length} próximos
                  </Badge>
                )}
              </div>

              {birthdays.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  <Gift className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  No hay cumpleaños próximos
                </p>
              ) : (
                <div className="space-y-3">
                  {birthdays.map((cumple) => (
                    <div key={cumple.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-amber-50 transition-colors">
                      <div className="flex items-center gap-3 min-w-0">
                        <Avatar className="h-10 w-10 border-2 border-amber-500 flex-shrink-0">
                          {cumple.imagen ? (
                            <AvatarImage src={cumple.imagen} alt={cumple.nombre} />
                          ) : null}
                          <AvatarFallback className="bg-linear-to-br from-amber-500 to-red-500 text-white text-xs">
                            {getInitials(cumple.nombre, cumple.apellido)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 text-sm truncate">
                            {cumple.nombre} {cumple.apellido}
                          </p>
                          <div className="flex items-center gap-2 text-xs">
                            <Badge className={`${getBeltColor(cumple.grado)} text-[10px] px-1.5 py-0`}>
                              {cumple.grado}
                            </Badge>
                            <span className="text-gray-500">·</span>
                            <span className="text-gray-500">{cumple.edad} años</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={`ml-2 flex-shrink-0 ${isToday(cumple.fecha) ? 'bg-green-100 text-green-800 border-green-200' :
                          isTomorrow(cumple.fecha) ? 'bg-amber-100 text-amber-800 border-amber-200' :
                            'bg-blue-100 text-blue-800 border-blue-200'
                        }`}>
                        {diasRestantes(cumple.fecha)}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Row 3: Upcoming Exams + Next Classes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border border-gray-300 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-600" />
                <h3 className="text-lg font-semibold text-gray-900">Próximos Exámenes</h3>
              </div>
              {nextExams.length > 0 && (
                <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                  {nextExams.length} próximos
                </Badge>
              )}
            </div>

            {nextExams.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Award className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No hay exámenes próximos</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {nextExams.map((examen) => (
                  <Card key={examen.id} className="border border-gray-200 hover:border-amber-400 transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="h-10 w-10 rounded-full bg-linear-to-br from-amber-500/20 to-red-500/20 flex items-center justify-center">
                          <Award className="h-5 w-5 text-amber-600" />
                        </div>
                        <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                          {examen.type}
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2 truncate">{examen.name}</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="h-3 w-3" />
                          <span>{dateFormatterIntoLong(examen.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <School className="h-3 w-3" />
                          <span className="truncate">{examen.place}</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-xs">
                          {diasRestantes(new Date(examen.date))}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Next Classes */}
        <Card className="border border-gray-300 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-amber-600" />
              <h3 className="text-lg font-semibold text-gray-900">Próximas Clases</h3>
            </div>

            {upcomingClassesNext.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <CalendarDays className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No hay clases próximas</p>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingClassesNext.map((cls) => (
                  <div key={cls.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-amber-50 transition-colors">
                    <div className="h-9 w-9 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <Activity className="h-4 w-4 text-amber-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 text-sm truncate">{cls.name}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                        <CalendarDays className="h-3 w-3" />
                        <span>{dateFormatterIntoLong(cls.date)}</span>
                      </div>
                    </div>
                    <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-[10px] flex-shrink-0">
                      {diasRestantes(new Date(cls.date))}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
