// components/dashboard/DashboardPage.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  GraduationCap,
  DollarSign,
  Calendar,
  TrendingUp,
  Award,
  Star,
  AlertCircle,
  CheckCircle,
  Clock,
  Activity,
  Target,
  Zap,
  Shield,
  UserPlus,
  Gift,
  BookOpen,
  Medal,
  ChevronRight,
  BarChart3,
  PieChart,
  CalendarDays,
  School,
  Wallet,
  CreditCard,
  Sparkles,
  Flame,
  Crown,
  Trophy
} from "lucide-react";
import { format, differenceInDays, isToday, isTomorrow, addDays } from "date-fns";
import { es } from "date-fns/locale";

// ================ INTERFACES ================
interface EstadisticaDashboard {
  totalEstudiantes: number;
  totalAvanzados: number;
  totalIngresosMensuales: number;
  totalClasesMes: number;
  asistenciaSemanal: AsistenciaDiaria[];
  proximaActividad: Actividad;
  ingresosPorDia: IngresoDiario[];
  proximosCumpleañeros: Cumpleañero[];
  proximosExamenes: ExamenProximo[];
}

interface AsistenciaDiaria {
  dia: string;
  fecha: Date;
  estudiantes: number;
  porcentaje: number;
}

interface IngresoDiario {
  dia: string;
  monto: number;
  concepto: string;
}

interface Actividad {
  id: number;
  titulo: string;
  tipo: 'dojo' | 'organizacion';
  fecha: Date;
  hora: string;
  lugar: string;
  prioridad: 'alta' | 'media' | 'baja';
}

interface Cumpleañero {
  id: number;
  nombre: string;
  apellido: string;
  fecha: Date;
  edad: number;
  grado: string;
  imagen?: string;
}

interface ExamenProximo {
  id: number;
  nombre: string;
  fecha: Date;
  participantes: number;
  grado: string;
}

// ================ DATOS DE EJEMPLO ================
const dashboardData: EstadisticaDashboard = {
  totalEstudiantes: 156,
  totalAvanzados: 42,
  totalIngresosMensuales: 4250000,
  totalClasesMes: 48,
  asistenciaSemanal: [
    { dia: "Lun", fecha: new Date(2025, 1, 17), estudiantes: 28, porcentaje: 78 },
    { dia: "Mar", fecha: new Date(2025, 1, 18), estudiantes: 32, porcentaje: 85 },
    { dia: "Mié", fecha: new Date(2025, 1, 19), estudiantes: 30, porcentaje: 82 },
    { dia: "Jue", fecha: new Date(2025, 1, 20), estudiantes: 35, porcentaje: 90 },
    { dia: "Vie", fecha: new Date(2025, 1, 21), estudiantes: 26, porcentaje: 72 },
    { dia: "Sáb", fecha: new Date(2025, 1, 22), estudiantes: 42, porcentaje: 95 },
    { dia: "Dom", fecha: new Date(2025, 1, 23), estudiantes: 0, porcentaje: 0 },
  ],
  proximaActividad: {
    id: 1,
    titulo: "Examen de Cinturón Negro",
    tipo: "organizacion",
    fecha: new Date(2025, 1, 25, 9, 0),
    hora: "09:00",
    lugar: "Dojo Central",
    prioridad: "alta"
  },
  ingresosPorDia: [
    { dia: "Lun", monto: 125000, concepto: "Mensualidades" },
    { dia: "Mar", monto: 185000, concepto: "Mensualidades" },
    { dia: "Mié", monto: 95000, concepto: "Inscripciones" },
    { dia: "Jue", monto: 210000, concepto: "Mensualidades" },
    { dia: "Vie", monto: 75000, concepto: "Clases especiales" },
    { dia: "Sáb", monto: 320000, concepto: "Torneo" },
  ],
  proximosCumpleañeros: [
    { id: 1, nombre: "Juan", apellido: "Pérez", fecha: new Date(2025, 1, 20), edad: 26, grado: "Verde" },
    { id: 2, nombre: "María", apellido: "Gómez", fecha: new Date(2025, 1, 22), edad: 24, grado: "Azul" },
    { id: 3, nombre: "Carlos", apellido: "Rodríguez", fecha: new Date(2025, 1, 25), edad: 32, grado: "Marrón" },
    { id: 4, nombre: "Ana", apellido: "López", fecha: new Date(2025, 1, 28), edad: 22, grado: "Naranja" },
    { id: 5, nombre: "Luis", apellido: "Martínez", fecha: new Date(2025, 2, 2), edad: 29, grado: "Amarillo" },
  ],
  proximosExamenes: [
    { id: 1, nombre: "Examen de Grado - Marzo", fecha: new Date(2025, 2, 15), participantes: 18, grado: "Amarillo-Azul" },
    { id: 2, nombre: "Examen de Cinturón Negro", fecha: new Date(2025, 2, 22), participantes: 6, grado: "Negro 1er Dan" },
    { id: 3, nombre: "Examen Infantil", fecha: new Date(2025, 2, 8), participantes: 12, grado: "Blanco-Amarillo" },
  ]
};

export default function AdminPanel() {
  const [data] = useState<EstadisticaDashboard>(dashboardData);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Actualizar hora actual cada minuto
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Formatear moneda
  const formatMoneda = (monto: number) => {
    return new Intl.NumberFormat('es-CL', { 
      style: 'currency', 
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0 
    }).format(monto);
  };

  // Formatear fecha
  const formatFecha = (fecha: Date) => {
    return format(fecha, "dd 'de' MMMM", { locale: es });
  };

  // Calcular días restantes
  const diasRestantes = (fecha: Date) => {
    const dias = differenceInDays(fecha, new Date());
    if (dias === 0) return "Hoy";
    if (dias === 1) return "Mañana";
    if (dias < 0) return "Pasado";
    return `En ${dias} días`;
  };

  // Obtener color de prioridad
  const getPrioridadColor = (prioridad: string) => {
    switch(prioridad) {
      case 'alta': return 'bg-red-100 text-red-800 border-red-200';
      case 'media': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'baja': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8">
      {/* Header con saludo y fecha */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            ¡Bienvenido, Sensei!
          </h1>
          <p className="text-gray-600 mt-2 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {format(currentTime, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-amber-100 text-amber-800 border-amber-200 px-4 py-2">
            <Sparkles className="h-4 w-4 mr-2" />
            {data.totalEstudiantes} Estudiantes Activos
          </Badge>
        </div>
      </div>

      {/* Tarjetas de estadísticas principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Estudiantes */}
        <Card className="border border-gray-300 hover:border-amber-400 hover:shadow-lg transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Estudiantes</p>
                <h3 className="text-3xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
                  {data.totalEstudiantes}
                </h3>
                <p className="text-sm text-green-600 mt-2 flex items-center">
                  <UserPlus className="h-3 w-3 mr-1" />
                  +8 este mes
                </p>
              </div>
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-amber-500/20 to-red-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="h-7 w-7 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cinturones Avanzados */}
        <Card className="border border-gray-300 hover:border-amber-400 hover:shadow-lg transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Cinturones Avanzados</p>
                <h3 className="text-3xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
                  {data.totalAvanzados}
                </h3>
                <p className="text-sm text-gray-600 mt-2 flex items-center">
                  <Crown className="h-3 w-3 mr-1 text-amber-600" />
                  Marrón y Negro
                </p>
              </div>
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-amber-500/20 to-red-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award className="h-7 w-7 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ingresos Mensuales */}
        <Card className="border border-gray-300 hover:border-amber-400 hover:shadow-lg transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Ingresos Mensuales</p>
                <h3 className="text-3xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
                  {formatMoneda(data.totalIngresosMensuales)}
                </h3>
                <p className="text-sm text-green-600 mt-2 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% vs mes anterior
                </p>
              </div>
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-amber-500/20 to-red-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <DollarSign className="h-7 w-7 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clases del Mes */}
        <Card className="border border-gray-300 hover:border-amber-400 hover:shadow-lg transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Clases del Mes</p>
                <h3 className="text-3xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
                  {data.totalClasesMes}
                </h3>
                <p className="text-sm text-amber-600 mt-2 flex items-center">
                  <Flame className="h-3 w-3 mr-1" />
                  4 clases por día
                </p>
              </div>
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-amber-500/20 to-red-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Activity className="h-7 w-7 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos y actividades principales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de asistencia semanal (col-span-2) */}
        <Card className="lg:col-span-2 border border-gray-300 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-amber-600" />
                <h3 className="text-lg font-semibold text-gray-900">Asistencia Semanal</h3>
              </div>
              <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                Promedio: 78%
              </Badge>
            </div>

            <div className="space-y-4">
              {data.asistenciaSemanal.map((dia) => (
                <div key={dia.dia} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 w-8">{dia.dia}</span>
                      <span className="text-gray-600">{dia.estudiantes} estudiantes</span>
                    </div>
                    <span className={`font-medium ${
                      dia.porcentaje >= 80 ? 'text-green-600' : 
                      dia.porcentaje >= 60 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {dia.porcentaje}%
                    </span>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={dia.porcentaje} 
                      className={`h-3 ${
                        dia.porcentaje >= 80 ? 'bg-green-500' : 
                        dia.porcentaje >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Gráfico de ingresos diarios */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-amber-600" />
                <h4 className="font-semibold text-gray-900">Ingresos por Día</h4>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {data.ingresosPorDia.map((ingreso, index) => (
                  <div key={index} className="text-center">
                    <div className="h-24 flex flex-col justify-end">
                      <div 
                        className="bg-gradient-to-t from-amber-500 to-red-500 rounded-t-lg transition-all hover:from-amber-600 hover:to-red-600"
                        style={{ height: `${(ingreso.monto / 350000) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-700 mt-2 block">{ingreso.dia}</span>
                    <span className="text-xs text-gray-500">{formatMoneda(ingreso.monto)}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Columna derecha: Actividades y alertas */}
        <div className="space-y-6">
          {/* Próxima actividad */}
          <Card className="border border-gray-300 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-amber-500 to-red-500 p-4 text-white">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  <h3 className="font-semibold">Próxima Actividad</h3>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-500/20 to-red-500/20 flex items-center justify-center flex-shrink-0">
                    <Target className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{data.proximaActividad.titulo}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getPrioridadColor(data.proximaActividad.prioridad)}>
                        {data.proximaActividad.prioridad === 'alta' ? 'Urgente' : 
                         data.proximaActividad.prioridad === 'media' ? 'Próximo' : 'Recordatorio'}
                      </Badge>
                      <Badge className={`${
                        data.proximaActividad.tipo === 'dojo' 
                          ? 'bg-blue-100 text-blue-800 border-blue-200' 
                          : 'bg-purple-100 text-purple-800 border-purple-200'
                      }`}>
                        {data.proximaActividad.tipo === 'dojo' ? 'Dojo' : 'Organización'}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">
                      {format(data.proximaActividad.fecha, "EEEE d 'de' MMMM, yyyy", { locale: es })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">{data.proximaActividad.hora}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Activity className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">{data.proximaActividad.lugar}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="w-full bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white">
                    Ver detalles
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Próximos cumpleaños */}
          <Card className="border border-gray-300 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-amber-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Próximos Cumpleaños</h3>
                </div>
                <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                  {data.proximosCumpleañeros.length} esta semana
                </Badge>
              </div>

              <div className="space-y-3">
                {data.proximosCumpleañeros.map((cumple) => (
                  <div key={cumple.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-amber-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-amber-500">
                        <AvatarFallback className="bg-gradient-to-br from-amber-500 to-red-500 text-white">
                          {cumple.nombre[0]}{cumple.apellido[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {cumple.nombre} {cumple.apellido}
                        </p>
                        <div className="flex items-center gap-2 text-xs">
                          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
                            {cumple.grado}
                          </Badge>
                          <span className="text-gray-500">·</span>
                          <span className="text-gray-500">{cumple.edad} años</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={`${
                        isToday(cumple.fecha) ? 'bg-green-100 text-green-800 border-green-200' :
                        isTomorrow(cumple.fecha) ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                        'bg-blue-100 text-blue-800 border-blue-200'
                      }`}>
                        {diasRestantes(cumple.fecha)}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        {format(cumple.fecha, "dd/MM")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Fila inferior: Próximos exámenes y otros KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Próximos exámenes (col-span-2) */}
        <Card className="lg:col-span-2 border border-gray-300 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-600" />
                <h3 className="text-lg font-semibold text-gray-900">Próximos Exámenes</h3>
              </div>
              <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-100">
                Ver todos
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.proximosExamenes.map((examen) => (
                <Card key={examen.id} className="border border-gray-200 hover:border-amber-400 transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-500/20 to-red-500/20 flex items-center justify-center">
                        <Award className="h-5 w-5 text-amber-600" />
                      </div>
                      <Badge className="bg-red-100 text-red-800 border-red-200">
                        {examen.grado}
                      </Badge>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{examen.nombre}</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-3 w-3" />
                        <span>{format(examen.fecha, "dd 'de' MMMM", { locale: es })}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="h-3 w-3" />
                        <span>{examen.participantes} participantes</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-xs">
                        {diasRestantes(examen.fecha)}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mini KPIs y métricas rápidas */}
        <Card className="border border-gray-300 shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-600" />
              Métricas Rápidas
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Al día con pagos</p>
                    <p className="text-xl font-bold text-gray-900">112</p>
                  </div>
                </div>
                <span className="text-sm text-green-600">72%</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Deben este mes</p>
                    <p className="text-xl font-bold text-gray-900">28</p>
                  </div>
                </div>
                <span className="text-sm text-yellow-600">18%</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Morosos</p>
                    <p className="text-xl font-bold text-gray-900">16</p>
                  </div>
                </div>
                <span className="text-sm text-red-600">10%</span>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Próxima clase</span>
                  <Badge className="bg-amber-100 text-amber-800 border-amber-200">Hoy 18:00</Badge>
                </div>
                <Progress value={75} className="h-2 bg-gray-200" />
                <p className="text-xs text-gray-500 mt-2">15 estudiantes confirmados</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}