import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Calendar,
  Users,
  Award,
  ChevronDown,
  ChevronRight,
  Search, Plus,
  Clock,
  User,
  BookOpen, CheckCircle,
  XCircle,
  History, CalendarDays, GraduationCap, Edit,
  Eye
} from "lucide-react";
import { format, differenceInMonths } from "date-fns";
import { es } from "date-fns/locale";

// ================ INTERFACES ================
interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  cedula: string;
  gradoActual: string;
  gradoActualColor: string;
  imagen?: string;
}

interface Examen {
  id: number;
  fecha: string;
  nombre: string;
  tipo: 'examen' | 'postulacion' | 'historial';
  grado: string;
  participantes: ParticipanteExamen[];
  cerrado: boolean;
  fechaPostulacion?: string;
}

interface ParticipanteExamen {
  id: number;
  alumnoId: number;
  alumnoNombre: string;
  alumnoApellido: string;
  gradoActual: string;
  gradoAspira: string;
  kata: string;
  bunkai: string;
  tiempoUltimoExamen: string;
  aprobado?: boolean;
  calificacion?: number;
  observaciones?: string;
}

interface ExamenHistorial {
  id: number;
  fecha: string;
  nombre: string;
  participantes: {
    id: number;
    nombre: string;
    gradoActual: string;
    gradoObtenido: string;
    aprobado: boolean;
  }[];
}

interface Kata {
  id: number;
  nombre: string;
  nivel: string;
  tieneBunkai: boolean;
}

// ================ DATOS DE EJEMPLO ================
const examenesProximos: Examen[] = [
  {
    id: 1,
    fecha: "2025-03-15",
    nombre: "Examen de Grado - Marzo 2025",
    tipo: 'examen',
    grado: "Todos los niveles",
    participantes: [],
    cerrado: false
  },
  {
    id: 2,
    fecha: "2025-06-20",
    nombre: "Examen de Grado - Junio 2025",
    tipo: 'examen',
    grado: "Cinturones de color",
    participantes: [],
    cerrado: false
  },
  {
    id: 3,
    fecha: "2025-09-10",
    nombre: "Examen de Cinturón Negro",
    tipo: 'examen',
    grado: "Marrón - 1er Dan",
    participantes: [],
    cerrado: false
  }
];

const alumnosMock: Alumno[] = [
  { id: 1, nombre: "Juan", apellido: "Pérez", cedula: "12345678", gradoActual: "Verde", gradoActualColor: "bg-green-500" },
  { id: 2, nombre: "María", apellido: "Gómez", cedula: "87654321", gradoActual: "Azul", gradoActualColor: "bg-blue-500" },
  { id: 3, nombre: "Carlos", apellido: "Rodríguez", cedula: "45678912", gradoActual: "Amarillo", gradoActualColor: "bg-yellow-500" },
  { id: 4, nombre: "Ana", apellido: "López", cedula: "32165498", gradoActual: "Naranja", gradoActualColor: "bg-orange-500" },
  { id: 5, nombre: "Luis", apellido: "Martínez", cedula: "78912345", gradoActual: "Marrón", gradoActualColor: "bg-amber-800" },
  { id: 6, nombre: "Laura", apellido: "Fernández", cedula: "23456789", gradoActual: "Rojo", gradoActualColor: "bg-red-500" },
];

const postulacionesMock: ParticipanteExamen[] = [
  {
    id: 1,
    alumnoId: 1,
    alumnoNombre: "Juan",
    alumnoApellido: "Pérez",
    gradoActual: "Amarillo",
    gradoAspira: "Naranja",
    kata: "Heian Nidan",
    bunkai: "Heian Nidan Bunkai - Defensa contra agarres",
    tiempoUltimoExamen: "8 meses"
  },
  {
    id: 2,
    alumnoId: 2,
    alumnoNombre: "María",
    alumnoApellido: "Gómez",
    gradoActual: "Azul",
    gradoAspira: "Marrón",
    kata: "Tekki Shodan",
    bunkai: "Tekki Shodan Bunkai - Combate en línea",
    tiempoUltimoExamen: "1 año 2 meses"
  },
  {
    id: 3,
    alumnoId: 3,
    alumnoNombre: "Carlos",
    alumnoApellido: "Rodríguez",
    gradoActual: "Verde",
    gradoAspira: "Azul",
    kata: "Heian Godan",
    bunkai: "Heian Godan Bunkai - Técnicas avanzadas",
    tiempoUltimoExamen: "6 meses"
  },
  {
    id: 4,
    alumnoId: 4,
    alumnoNombre: "Ana",
    alumnoApellido: "López",
    gradoActual: "Naranja",
    gradoAspira: "Verde",
    kata: "Heian Yondan",
    bunkai: "Heian Yondan Bunkai - Defensas múltiples",
    tiempoUltimoExamen: "4 meses"
  }
];

const examenesHistorial: ExamenHistorial[] = [
  {
    id: 1,
    fecha: "2024-09-15",
    nombre: "Examen de Grado - Septiembre 2024",
    participantes: [
      { id: 1, nombre: "Juan Pérez", gradoActual: "Amarillo", gradoObtenido: "Naranja", aprobado: true },
      { id: 2, nombre: "María Gómez", gradoActual: "Azul", gradoObtenido: "Marrón", aprobado: true },
      { id: 3, nombre: "Carlos Rodríguez", gradoActual: "Verde", gradoObtenido: "Azul", aprobado: true },
      { id: 4, nombre: "Ana López", gradoActual: "Naranja", gradoObtenido: "Verde", aprobado: false }
    ]
  },
  {
    id: 2,
    fecha: "2024-06-10",
    nombre: "Examen de Grado - Junio 2024",
    participantes: [
      { id: 5, nombre: "Luis Martínez", gradoActual: "Marrón", gradoObtenido: "Negro 1er Dan", aprobado: true },
      { id: 6, nombre: "Laura Fernández", gradoActual: "Rojo", gradoObtenido: "Rojo", aprobado: false },
      { id: 7, nombre: "Pedro Sánchez", gradoActual: "Amarillo", gradoObtenido: "Naranja", aprobado: true }
    ]
  },
  {
    id: 3,
    fecha: "2024-03-20",
    nombre: "Examen de Grado - Marzo 2024",
    participantes: [
      { id: 8, nombre: "Sofía Ramírez", gradoActual: "Blanco", gradoObtenido: "Amarillo", aprobado: true },
      { id: 9, nombre: "Diego Torres", gradoActual: "Naranja", gradoObtenido: "Verde", aprobado: true },
      { id: 10, nombre: "Valentina Castro", gradoActual: "Azul", gradoObtenido: "Marrón", aprobado: true }
    ]
  },
  {
    id: 4,
    fecha: "2023-12-05",
    nombre: "Examen de Cinturón Negro",
    participantes: [
      { id: 11, nombre: "Andrés Vargas", gradoActual: "Marrón", gradoObtenido: "Negro 1er Dan", aprobado: true },
      { id: 12, nombre: "Camila Rojas", gradoActual: "Marrón", gradoObtenido: "Negro 1er Dan", aprobado: true }
    ]
  }
];

const katasMock: Kata[] = [
  { id: 1, nombre: "Heian Shodan", nivel: "Amarillo", tieneBunkai: true },
  { id: 2, nombre: "Heian Nidan", nivel: "Naranja", tieneBunkai: true },
  { id: 3, nombre: "Heian Sandan", nivel: "Verde", tieneBunkai: true },
  { id: 4, nombre: "Heian Yondan", nivel: "Azul", tieneBunkai: true },
  { id: 5, nombre: "Heian Godan", nivel: "Marrón", tieneBunkai: true },
  { id: 6, nombre: "Tekki Shodan", nivel: "Marrón", tieneBunkai: true },
  { id: 7, nombre: "Bassai Dai", nivel: "Negro", tieneBunkai: true },
  { id: 8, nombre: "Kanku Dai", nivel: "Negro", tieneBunkai: true },
];

// ================ COMPONENTES ================
type TabType = 'examenes' | 'postulaciones' | 'historial' | 'alumnos';

export default function Applications() {
  const [activeTab, setActiveTab] = useState<TabType>('examenes');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExamen, setSelectedExamen] = useState<Examen | null>(null);
  const [expandedExamen, setExpandedExamen] = useState<number | null>(null);
  const [selectedAlumno, setSelectedAlumno] = useState<Alumno | null>(null);
  const [showPostulacionModal, setShowPostulacionModal] = useState(false);
  const [showAlumnoModal, setShowAlumnoModal] = useState(false);

  // Formulario de postulación
  const [formPostulacion, setFormPostulacion] = useState({
    alumnoId: '',
    examenId: '',
    gradoAspira: '',
    kata: '',
    bunkai: ''
  });

  // Formatear fecha
  const formatFecha = (fecha: string) => {
    return format(new Date(fecha), "dd 'de' MMMM 'de' yyyy", { locale: es });
  };

  // Obtener color del cinturón
  const getCinturonColor = (grado: string) => {
    const colors: Record<string, string> = {
      'Blanco': 'bg-gray-100 text-gray-800',
      'Amarillo': 'bg-yellow-100 text-yellow-800',
      'Naranja': 'bg-orange-100 text-orange-800',
      'Verde': 'bg-green-100 text-green-800',
      'Azul': 'bg-blue-100 text-blue-800',
      'Marrón': 'bg-amber-800 text-white',
      'Negro': 'bg-gray-900 text-white',
      'Rojo': 'bg-red-800 text-white',
    };
    return colors[grado] || 'bg-gray-100 text-gray-800';
  };

  // Calcular tiempo desde último examen
  const calcularTiempoUltimoExamen = (fechaUltimoExamen: string) => {
    const meses = differenceInMonths(new Date(), new Date(fechaUltimoExamen));
    if (meses < 12) return `${meses} meses`;
    const años = Math.floor(meses / 12);
    const mesesRestantes = meses % 12;
    return mesesRestantes > 0 ? `${años} año${años > 1 ? 's' : ''} ${mesesRestantes} meses` : `${años} año${años > 1 ? 's' : ''}`;
  };

  return (
    
    <div className="p-4 md:p-10">

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sistema de Postulaciones</h1>
          <p className="text-gray-600 mt-2">
            Gestiona exámenes, postulaciones e historial de alumnos
          </p>
        </div>

        {/* Botón de acción según pestaña */}
        {activeTab === 'postulaciones' && (
          <Button
            className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white shadow-md hover:shadow-lg transition-all"
            onClick={() => setShowPostulacionModal(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nueva Postulación
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 p-1 bg-gray-100 rounded-xl border border-gray-300 max-w-2xl">
        <Button
          variant={activeTab === 'examenes' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('examenes')}
          className={`flex-1 rounded-lg transition-all duration-300 ${activeTab === 'examenes'
            ? 'bg-gradient-to-r from-amber-600 to-red-600 text-white shadow-md'
            : 'text-gray-700 hover:bg-gray-200'
            }`}
        >
          <Calendar className="h-4 w-4 mr-2" />
          Próximos Exámenes
        </Button>
        <Button
          variant={activeTab === 'postulaciones' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('postulaciones')}
          className={`flex-1 rounded-lg transition-all duration-300 ${activeTab === 'postulaciones'
            ? 'bg-gradient-to-r from-amber-600 to-red-600 text-white shadow-md'
            : 'text-gray-700 hover:bg-gray-200'
            }`}
        >
          <Users className="h-4 w-4 mr-2" />
          Postulaciones
        </Button>
        <Button
          variant={activeTab === 'historial' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('historial')}
          className={`flex-1 rounded-lg transition-all duration-300 ${activeTab === 'historial'
            ? 'bg-gradient-to-r from-amber-600 to-red-600 text-white shadow-md'
            : 'text-gray-700 hover:bg-gray-200'
            }`}
        >
          <History className="h-4 w-4 mr-2" />
          Historial
        </Button>
        <Button
          variant={activeTab === 'alumnos' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('alumnos')}
          className={`flex-1 rounded-lg transition-all duration-300 ${activeTab === 'alumnos'
            ? 'bg-gradient-to-r from-amber-600 to-red-600 text-white shadow-md'
            : 'text-gray-700 hover:bg-gray-200'
            }`}
        >
          <GraduationCap className="h-4 w-4 mr-2" />
          Alumnos
        </Button>
      </div>

      {/* Contenido según pestaña */}
      <div className="space-y-6">
        {/* Pestaña: Próximos Exámenes */}
        {activeTab === 'examenes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examenesProximos.map((examen) => (
              <Card key={examen.id} className="border border-gray-300 hover:border-amber-400 hover:shadow-lg transition-all duration-300 overflow-hidden group">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-amber-50 to-red-50 p-6 border-b border-gray-200">
                    <div className="flex justify-between items-start">
                      <div className="h-14 w-14 rounded-full bg-gradient-to-br from-amber-500 to-red-500 p-0.5">
                        <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                          <Award className="h-7 w-7 text-amber-600" />
                        </div>
                      </div>
                      <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                        {examen.grado}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mt-4">{examen.nombre}</h3>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <CalendarDays className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Fecha del examen</p>
                        <p className="font-semibold text-gray-900">{formatFecha(examen.fecha)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Participantes</p>
                        <p className="font-semibold text-gray-900">{examen.participantes.length} postulados</p>
                      </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                      <Button
                        variant="outline"
                        className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100"
                        onClick={() => setSelectedExamen(examen)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Ver detalles
                      </Button>
                      <Button
                        className="flex-1 bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white"
                        onClick={() => {
                          setActiveTab('postulaciones');
                          setSelectedExamen(examen);
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Postular
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pestaña: Postulaciones */}
        {activeTab === 'postulaciones' && (
          <div className="space-y-6">
            {/* Filtros y búsqueda */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar postulante..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-gray-300"
                />
              </div>
              <Select defaultValue="todos">
                <SelectTrigger className="w-full sm:w-48 border-gray-300">
                  <SelectValue placeholder="Filtrar por grado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los grados</SelectItem>
                  <SelectItem value="amarillo">Amarillo</SelectItem>
                  <SelectItem value="naranja">Naranja</SelectItem>
                  <SelectItem value="verde">Verde</SelectItem>
                  <SelectItem value="azul">Azul</SelectItem>
                  <SelectItem value="marron">Marrón</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Grid de postulaciones */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {postulacionesMock.map((postulacion) => (
                <Card key={postulacion.id} className="border border-gray-300 hover:border-amber-400 hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-0">
                    <div className="p-5 bg-gradient-to-br from-white to-amber-50 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-amber-500 to-red-500 p-0.5">
                          <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                            <User className="h-7 w-7 text-amber-600" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">
                            {postulacion.alumnoNombre} {postulacion.alumnoApellido}
                          </h3>
                          <div className="flex gap-2 mt-1">
                            <Badge className={getCinturonColor(postulacion.gradoActual)}>
                              {postulacion.gradoActual}
                            </Badge>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                            <Badge className={getCinturonColor(postulacion.gradoAspira)}>
                              {postulacion.gradoAspira}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Kata a presentar</p>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-amber-600" />
                          <span className="font-medium text-gray-900">{postulacion.kata}</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 mb-1">Bunkai</p>
                        <p className="text-sm text-gray-700 line-clamp-2">{postulacion.bunkai}</p>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">
                          Último examen: <span className="font-semibold text-gray-900">{postulacion.tiempoUltimoExamen}</span>
                        </span>
                      </div>

                      <div className="pt-4 flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100">
                          <Eye className="h-4 w-4 mr-2" />
                          Ver
                        </Button>
                        <Button size="sm" className="flex-1 bg-amber-600 hover:bg-amber-700 text-white">
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Pestaña: Historial */}
        {activeTab === 'historial' && (
          <div className="space-y-4">
            {examenesHistorial.map((examen) => (
              <Card key={examen.id} className="border border-gray-300 overflow-hidden">
                <CardContent className="p-0">
                  {/* Cabecera del examen (siempre visible) */}
                  <div
                    className="p-5 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer flex justify-between items-center"
                    onClick={() => setExpandedExamen(expandedExamen === examen.id ? null : examen.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-500/20 to-red-500/20 flex items-center justify-center">
                        <Award className="h-6 w-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{examen.nombre}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{formatFecha(examen.fecha)}</span>
                          <span className="text-gray-300">|</span>
                          <Users className="h-4 w-4" />
                          <span>{examen.participantes.length} participantes</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      {expandedExamen === examen.id ? (
                        <ChevronDown className="h-5 w-5 text-gray-600" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-600" />
                      )}
                    </div>
                  </div>

                  {/* Participantes (expandible) */}
                  {expandedExamen === examen.id && (
                    <div className="p-5 border-t border-gray-200 bg-white">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {examen.participantes.map((participante) => (
                          <div
                            key={participante.id}
                            className="p-4 border border-gray-200 rounded-lg hover:border-amber-400 transition-colors"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{participante.nombre}</h4>
                              {participante.aprobado ? (
                                <Badge className="bg-green-100 text-green-800 border-green-200">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Aprobado
                                </Badge>
                              ) : (
                                <Badge className="bg-red-100 text-red-800 border-red-200">
                                  <XCircle className="h-3 w-3 mr-1" />
                                  No aprobado
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Badge className={getCinturonColor(participante.gradoActual)}>
                                {participante.gradoActual}
                              </Badge>
                              <ChevronRight className="h-3 w-3 text-gray-400" />
                              <Badge className={getCinturonColor(participante.gradoObtenido)}>
                                {participante.gradoObtenido}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pestaña: Alumnos */}
        {activeTab === 'alumnos' && (
          <div className="space-y-6">
            {/* Búsqueda */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar alumno..."
                className="pl-10 bg-white border-gray-300"
              />
            </div>

            {/* Grid de alumnos */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {alumnosMock.map((alumno) => (
                <Card
                  key={alumno.id}
                  className="border border-gray-300 hover:border-amber-400 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => {
                    setSelectedAlumno(alumno);
                    setShowAlumnoModal(true);
                  }}
                >
                  <CardContent className="p-5">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-4">
                        <div className="h-20 w-20 rounded-full bg-gradient-to-br from-amber-500 to-red-500 p-1">
                          <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                            <User className="h-10 w-10 text-amber-600" />
                          </div>
                        </div>
                        <div className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white ${alumno.gradoActualColor}`} />
                      </div>

                      <h3 className="font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
                        {alumno.nombre} {alumno.apellido}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">C.I: {alumno.cedula}</p>

                      <div className="mt-3">
                        <Badge className={getCinturonColor(alumno.gradoActual)}>
                          {alumno.gradoActual}
                        </Badge>
                      </div>

                      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                          Ver historial →
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal de Nueva Postulación */}
      <Dialog open={showPostulacionModal} onOpenChange={setShowPostulacionModal}>
        <DialogContent className="max-w-2xl bg-white border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">Nueva Postulación</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Selección de examen */}
            <div className="space-y-2">
              <Label className="text-gray-900">Examen a postular</Label>
              <Select>
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Seleccionar examen" />
                </SelectTrigger>
                <SelectContent>
                  {examenesProximos.map((examen) => (
                    <SelectItem key={examen.id} value={examen.id.toString()}>
                      {examen.nombre} - {formatFecha(examen.fecha)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Selección de alumno */}
            <div className="space-y-2">
              <Label className="text-gray-900">Alumno</Label>
              <Select>
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Seleccionar alumno" />
                </SelectTrigger>
                <SelectContent>
                  {alumnosMock.map((alumno) => (
                    <SelectItem key={alumno.id} value={alumno.id.toString()}>
                      {alumno.nombre} {alumno.apellido} - {alumno.gradoActual}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Grado al que aspira */}
            <div className="space-y-2">
              <Label className="text-gray-900">Grado al que aspira</Label>
              <Select>
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Seleccionar grado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="amarillo">Amarillo</SelectItem>
                  <SelectItem value="naranja">Naranja</SelectItem>
                  <SelectItem value="verde">Verde</SelectItem>
                  <SelectItem value="azul">Azul</SelectItem>
                  <SelectItem value="marron">Marrón</SelectItem>
                  <SelectItem value="negro">Negro 1er Dan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Kata a presentar */}
            <div className="space-y-2">
              <Label className="text-gray-900">Kata a presentar</Label>
              <Select>
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Seleccionar kata" />
                </SelectTrigger>
                <SelectContent>
                  {katasMock.map((kata) => (
                    <SelectItem key={kata.id} value={kata.nombre}>
                      {kata.nombre} - {kata.nivel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Bunkai */}
            <div className="space-y-2">
              <Label className="text-gray-900">Bunkai a presentar</Label>
              <Input
                placeholder="Descripción del bunkai"
                className="border-gray-300"
              />
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowPostulacionModal(false)}
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </Button>
              <Button className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white">
                Crear Postulación
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Historial de Alumno */}
      <Dialog open={showAlumnoModal} onOpenChange={setShowAlumnoModal}>
        <DialogContent className="max-w-4xl bg-white border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Historial de {selectedAlumno?.nombre} {selectedAlumno?.apellido}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Información del alumno */}
            <div className="flex items-center gap-6 p-4 bg-gradient-to-r from-amber-50 to-red-50 rounded-lg border border-gray-200">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-amber-500 to-red-500 p-1">
                <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                  <User className="h-10 w-10 text-amber-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedAlumno?.nombre} {selectedAlumno?.apellido}
                </h3>
                <p className="text-gray-600">C.I: {selectedAlumno?.cedula}</p>
                <div className="flex gap-2 mt-2">
                  <Badge className={getCinturonColor(selectedAlumno?.gradoActual || '')}>
                    Grado actual: {selectedAlumno?.gradoActual}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Historial de exámenes */}
            <h4 className="font-semibold text-lg text-gray-900">Exámenes Presentados</h4>
            <div className="space-y-4">
              {examenesHistorial.flatMap(examen =>
                examen.participantes
                  .filter(p => p.nombre.includes(selectedAlumno?.nombre || ''))
                  .map(participante => (
                    <Card key={participante.id} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-gray-900">{examen.nombre}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600">{formatFecha(examen.fecha)}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              <Badge className={getCinturonColor(participante.gradoActual)}>
                                {participante.gradoActual}
                              </Badge>
                              <ChevronRight className="h-4 w-4 text-gray-400" />
                              <Badge className={getCinturonColor(participante.gradoObtenido)}>
                                {participante.gradoObtenido}
                              </Badge>
                            </div>
                            {participante.aprobado ? (
                              <Badge className="mt-2 bg-green-100 text-green-800 border-green-200">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Aprobado
                              </Badge>
                            ) : (
                              <Badge className="mt-2 bg-red-100 text-red-800 border-red-200">
                                <XCircle className="h-3 w-3 mr-1" />
                                No aprobado
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}