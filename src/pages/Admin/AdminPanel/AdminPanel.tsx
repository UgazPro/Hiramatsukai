import { useState, useEffect, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users, DollarSign, Calendar, Award, Star, Activity, Target, Gift, BarChart3, CalendarDays, School, Sparkles, BookOpen,
  type LucideIcon,
} from "lucide-react";
import { format, differenceInDays, isToday, isTomorrow } from "date-fns";
import { es } from "date-fns/locale";
import { useDashboard } from "@/hooks/useDashboard";
import AdminPanelSkeleton from "./AdminPanelSkeleton";
import { dateFormatterIntoLong } from "@/helpers/formatter";
import { cn } from "@/lib/utils";

const getBeltColor = (grado: string) => {
  const colors: Record<string, string> = {
    Blanco: "bg-gray-100 text-gray-800 border-gray-300",
    Amarillo: "bg-yellow-100 text-yellow-800 border-yellow-300",
    Naranja: "bg-orange-100 text-orange-800 border-orange-300",
    Verde: "bg-green-100 text-green-800 border-green-300",
    Azul: "bg-blue-100 text-blue-800 border-blue-300",
    Marrón: "bg-yellow-800 text-white border-yellow-900",
    Negro: "bg-gray-900 text-white border-gray-950",
    Rojo: "bg-red-800 text-white border-red-900",
  };
  return colors[grado] || "bg-gray-100 text-gray-800 border-gray-300";
};

const getInitials = (name: string, lastName: string) =>
  `${name?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`.toUpperCase();

const attendanceTones = {
  high: { text: "text-brand-gold-deep", bar: "[&_[data-slot=progress-indicator]]:bg-brand-gold" },
  mid: { text: "text-brand-gold-deep", bar: "[&_[data-slot=progress-indicator]]:bg-brand-gold-deep" },
  low: { text: "text-brand-vermilion", bar: "[&_[data-slot=progress-indicator]]:bg-brand-vermilion" },
} as const;

const getCountdownTone = (fecha: Date) => {
  if (isToday(fecha)) return "border-brand-vermilion/30 bg-brand-vermilion/10 text-brand-vermilion";
  if (isTomorrow(fecha)) return "border-brand-gold/30 bg-brand-gold/10 text-brand-gold-deep";
  return "border-brand-indigo/25 bg-brand-indigo/10 text-brand-indigo";
};

type Accent = "gold" | "vermilion" | "indigo";

const accentText: Record<Accent, string> = {
  gold: "text-brand-gold-deep",
  vermilion: "text-brand-vermilion",
  indigo: "text-brand-indigo",
};

function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  accent = "gold",
}: {
  label: string;
  value: string | number;
  hint: string;
  icon: LucideIcon;
  accent?: Accent;
}) {
  return (
    <Card className="group rounded-2xl border-border/70 bg-card/85 py-0 shadow-soft backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-gold/50 hover:shadow-lift">
      <CardContent className="flex items-start justify-between gap-3 p-5 sm:p-6">
        <div className="flex min-w-0 flex-col gap-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="font-serif text-2xl font-semibold leading-tight text-foreground break-words tabular-nums sm:text-3xl">
            {value}
          </p>
          <p className={cn("mt-1 flex items-center gap-1.5 text-xs font-medium", accentText[accent])}>
            <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
            {hint}
          </p>
        </div>
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-brand-gold/25 to-brand-vermilion/15 text-brand-gold-deep ring-1 ring-brand-gold/20 transition-transform duration-300 group-hover:scale-105 sm:size-14">
          <Icon className="size-6 sm:size-7" aria-hidden="true" />
        </span>
      </CardContent>
    </Card>
  );
}

function SectionTitle({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-gold/15 text-brand-gold-deep">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <h3 className="truncate font-serif text-lg font-semibold text-foreground">{title}</h3>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
    </div>
  );
}

function DashboardEmpty({ icon: Icon, message }: { icon: LucideIcon; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

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
    const today = new Date();
    const todaySinHora = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const dias = differenceInDays(fecha, todaySinHora);
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
    return <AdminPanelSkeleton />;
  }

  return (
    <div className="flex w-full flex-col gap-6 p-3 sm:p-4 md:p-6 lg:p-8 xl:gap-8">
      {/* Header */}
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1.5">
          <span className="section-eyebrow text-brand-gold-deep">Panel del Dojo</span>
          <h1 className="font-serif text-2xl font-semibold leading-tight text-foreground sm:text-3xl lg:text-4xl">
            ¡Bienvenido, {user?.name ?? "Sensei"} {user?.lastName ?? ""}!
          </h1>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="size-4 shrink-0" aria-hidden="true" />
            <span className="capitalize">{format(currentTime, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}</span>
          </p>
        </div>
        <Badge
          variant="outline"
          className="w-fit shrink-0 gap-2 rounded-full border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-sm font-medium text-brand-gold-deep"
        >
          <Sparkles aria-hidden="true" />
          {totalEstudiantes} estudiantes activos
        </Badge>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4 xl:gap-6">
        <StatCard
          label="Total Estudiantes"
          value={totalEstudiantes}
          hint="Activos en el dojo"
          icon={Users}
          accent="gold"
        />
        <StatCard
          label="Cinturones Avanzados"
          value={advancedCount}
          hint="Marrón y Negro"
          icon={Award}
          accent="indigo"
        />
        <StatCard
          label="Ingresos Mensuales"
          value={formatMoneda(monthlyIncome)}
          hint="Mes actual"
          icon={DollarSign}
          accent="gold"
        />
        <StatCard
          label="Clases del Mes"
          value={classesThisMonth}
          hint="Actividades programadas"
          icon={Activity}
          accent="vermilion"
        />
      </div>

      {/* Row 2: Weekly Attendance + Next Activities / Birthdays */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {/* Weekly Attendance */}
        <Card className="rounded-2xl border-border/70 bg-card/85 shadow-soft backdrop-blur-sm lg:col-span-2">
          <CardContent className="flex flex-col gap-6 p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <SectionTitle icon={BarChart3} title="Asistencia Semanal" />
              <Badge
                variant="outline"
                className="shrink-0 rounded-full border-brand-gold/30 bg-brand-gold/10 text-xs font-medium text-brand-gold-deep"
              >
                Promedio: {averageAttendance}%
              </Badge>
            </div>

            {(!weeklyAttendance || weeklyAttendance.every(d => d.estudiantes === 0)) ? (
              <DashboardEmpty icon={Activity} message="Sin datos de asistencia esta semana" />
            ) : (
              <div className="flex flex-col gap-4">
                {weeklyAttendance.map((dia) => {
                  const pct = totalEstudiantes > 0
                    ? Math.round((dia.estudiantes / totalEstudiantes) * 100)
                    : 0;
                  const tone = dia.estudiantes >= (maxAttendance * 0.8)
                    ? "high"
                    : dia.estudiantes >= (maxAttendance * 0.5)
                      ? "mid"
                      : "low";
                  const { text, bar } = attendanceTones[tone];

                  return (
                    <div key={dia.dia} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <div className="flex min-w-0 items-center gap-2">
                          <span className="w-8 shrink-0 font-medium text-foreground">{dia.dia}</span>
                          <span className="truncate text-muted-foreground">{dia.estudiantes} estudiantes</span>
                        </div>
                        <span className={cn("shrink-0 font-semibold tabular-nums", text)}>{pct}%</span>
                      </div>
                      <Progress value={pct} className={cn("h-2.5 bg-brand-sumi/10", bar)} />
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
          <Card className="overflow-hidden rounded-2xl border-border/70 bg-card/85 py-0 shadow-soft backdrop-blur-sm">
            <div className="flex items-center gap-3 border-b border-white/10 bg-brand-sumi px-5 py-4 text-brand-washi">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-gold/15 text-brand-gold">
                <Star className="size-5" aria-hidden="true" />
              </span>
              <h3 className="font-serif text-base font-semibold">Próximas Actividades</h3>
            </div>
            <CardContent className="flex flex-col gap-4 p-5">
              {nextActivities.length === 0 ? (
                <DashboardEmpty icon={Target} message="No hay actividades próximas" />
              ) : (
                nextActivities.map((act) => (
                  <div key={act.id} className="flex items-start gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold-deep">
                      <Target className="size-5" aria-hidden="true" />
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <p className="truncate font-medium text-foreground">{act.name}</p>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CalendarDays className="size-3.5 shrink-0" aria-hidden="true" />
                        <span className="truncate">{dateFormatterIntoLong(act.date)}</span>
                      </div>
                      <Badge
                        variant="outline"
                        className="mt-0.5 w-fit rounded-full border-brand-gold/25 bg-brand-gold/10 text-[10px] font-medium text-brand-gold-deep"
                      >
                        {diasRestantes(new Date(act.date))}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/70 bg-card/85 shadow-soft backdrop-blur-sm">
            <CardContent className="flex flex-col gap-4 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <SectionTitle icon={Gift} title="Próximos Cumpleaños" />
                {birthdays.length > 0 && (
                  <Badge
                    variant="outline"
                    className="shrink-0 rounded-full border-brand-gold/30 bg-brand-gold/10 text-xs font-medium text-brand-gold-deep"
                  >
                    {birthdays.length} próximos
                  </Badge>
                )}
              </div>

              {birthdays.length === 0 ? (
                <DashboardEmpty icon={Gift} message="No hay cumpleaños próximos" />
              ) : (
                <div className="flex flex-col gap-2.5">
                  {birthdays.map((cumple) => (
                    <div
                      key={cumple.id}
                      className="flex items-center justify-between gap-2 rounded-xl bg-muted/40 p-2.5 transition-colors duration-200 hover:bg-brand-gold/10"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <Avatar className="size-10 shrink-0 ring-1 ring-brand-gold/50">
                          {cumple.imagen ? (
                            <AvatarImage src={cumple.imagen} alt={cumple.nombre} />
                          ) : null}
                          <AvatarFallback className="bg-linear-to-br from-brand-gold to-brand-vermilion text-xs font-semibold text-white">
                            {getInitials(cumple.nombre, cumple.apellido)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex min-w-0 flex-col gap-1">
                          <p className="truncate text-sm font-semibold text-foreground">
                            {cumple.nombre} {cumple.apellido}
                          </p>
                          <div className="flex min-w-0 items-center gap-1.5">
                            <Badge className={cn("rounded-full px-1.5 text-[10px] font-medium", getBeltColor(cumple.grado))}>
                              {cumple.grado}
                            </Badge>
                            <span className="text-muted-foreground">·</span>
                            <span className="shrink-0 text-xs text-muted-foreground">{cumple.edad} años</span>
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn("shrink-0 rounded-full text-[10px] font-medium", getCountdownTone(cumple.fecha))}
                      >
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
      <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        <Card className="rounded-2xl border-border/70 bg-card/85 shadow-soft backdrop-blur-sm lg:col-span-2">
          <CardContent className="flex flex-col gap-6 p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <SectionTitle icon={Award} title="Próximos Exámenes" />
              {nextExams.length > 0 && (
                <Badge
                  variant="outline"
                  className="shrink-0 rounded-full border-brand-gold/30 bg-brand-gold/10 text-xs font-medium text-brand-gold-deep"
                >
                  {nextExams.length} próximos
                </Badge>
              )}
            </div>

            {nextExams.length === 0 ? (
              <DashboardEmpty icon={Award} message="No hay exámenes próximos" />
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {nextExams.map((examen) => (
                  <Card
                    key={examen.id}
                    className="rounded-xl border-border/60 bg-card/60 py-0 transition-colors duration-300 hover:border-brand-gold/50 hover:shadow-soft"
                  >
                    <CardContent className="flex flex-col gap-3 p-4">
                      <div className="flex items-start justify-between gap-2">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold-deep">
                          <Award className="size-5" aria-hidden="true" />
                        </span>
                        <Badge
                          variant="outline"
                          className="shrink-0 rounded-full border-brand-gold/25 bg-brand-gold/10 text-[10px] font-medium text-brand-gold-deep"
                        >
                          {examen.type}
                        </Badge>
                      </div>
                      <h4 className="truncate font-serif text-base font-semibold text-foreground">{examen.name}</h4>
                      <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="size-3.5 shrink-0" aria-hidden="true" />
                          <span className="truncate">{dateFormatterIntoLong(examen.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <School className="size-3.5 shrink-0" aria-hidden="true" />
                          <span className="truncate">{examen.place}</span>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="w-fit rounded-full border-brand-gold/25 bg-brand-gold/10 text-[10px] font-medium text-brand-gold-deep"
                      >
                        {diasRestantes(new Date(examen.date))}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Next Classes */}
        <Card className="rounded-2xl border-border/70 bg-card/85 shadow-soft backdrop-blur-sm">
          <CardContent className="flex flex-col gap-4 p-5 sm:p-6">
            <SectionTitle icon={BookOpen} title="Próximas Clases" />

            {upcomingClassesNext.length === 0 ? (
              <DashboardEmpty icon={CalendarDays} message="No hay clases próximas" />
            ) : (
              <div className="flex flex-col gap-2.5">
                {upcomingClassesNext.map((cls) => (
                  <div
                    key={cls.id}
                    className="flex items-center gap-3 rounded-xl bg-muted/40 p-2.5 transition-colors duration-200 hover:bg-brand-gold/10"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold-deep">
                      <Activity className="size-4" aria-hidden="true" />
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <p className="truncate text-sm font-medium text-foreground">{cls.name}</p>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CalendarDays className="size-3 shrink-0" aria-hidden="true" />
                        <span className="truncate">{dateFormatterIntoLong(cls.date)}</span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="shrink-0 rounded-full border-brand-gold/25 bg-brand-gold/10 text-[10px] font-medium text-brand-gold-deep"
                    >
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
