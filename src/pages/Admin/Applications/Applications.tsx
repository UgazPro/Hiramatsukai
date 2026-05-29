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
  Calendar, ChevronRight, Plus, User, CheckCircle,
  XCircle
} from "lucide-react";
import NextExams from "./NextExams/NextExams";
import ApplyStudents from "./ApplyStudents/ApplyStudents";
import ApplicationsHistory from "./History/ApplicationsHistory";
import ApplicationsStudentsHistory from "./Students/ApplicationsStudentsHistory";
import { applicationsTabs, TabType } from "./ApplicationsTabs";
import TabsComponent from "@/components/tabs/TabsComponent";
import { useActivities } from "@/hooks/useActivities";
import { dateFormatterIntoLong } from "@/helpers/formatter";

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

export default function Applications() {

  const [activeTab, setActiveTab] = useState<TabType>('examenes');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExamen, setSelectedExamen] = useState<Examen | null>(null);
  const [expandedExamen, setExpandedExamen] = useState<number | null>(null);
  const [selectedAlumno, setSelectedAlumno] = useState<Alumno | null>(null);
  const [showPostulacionModal, setShowPostulacionModal] = useState(false);
  const [showAlumnoModal, setShowAlumnoModal] = useState(false);

  const { activitiesData, isLoading } = useActivities();
  const filteredActivities = activitiesData.filter(activity => activity.type === 'Examen');

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

  return (

    <div className="p-4 md:p-10">

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sistema de Postulaciones</h1>
          <p className="text-gray-600 mt-2">
            Gestiona exámenes, postulaciones e historial de alumnos
          </p>
        </div>

        <button onClick={() => console.log("Actividades:", filteredActivities)}>Hola</button>

        {/* Botón de acción según pestaña */}
        {activeTab === 'postulaciones' && (
          <Button
            className="bg-linear-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white shadow-md hover:shadow-lg transition-all"
            onClick={() => setShowPostulacionModal(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nueva Postulación
          </Button>
        )}
      </div>

      {/* Tabs */}
      <TabsComponent
        tabs={applicationsTabs}
        activeTab={activeTab}
        onChange={setActiveTab}
        className="mb-8 max-w-3xl"
      />

      {/* Contenido según pestaña */}
      <div className="space-y-6">
        {/* Pestaña: Próximos Exámenes */}
        {activeTab === 'examenes' && (
          <NextExams
            setActiveTab={setActiveTab}
            examenesProximos={examenesProximos}
            setSelectedExamen={setSelectedExamen}
          />
        )}

        {/* Pestaña: Postulaciones */}
        <ApplyStudents
          activeTab={activeTab}
          postulacionesMock={postulacionesMock}
          getCinturonColor={getCinturonColor}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* Pestaña: Historial */}
        <ApplicationsHistory
          activeTab={activeTab}
          examenesHistorial={examenesHistorial}
          getCinturonColor={getCinturonColor}
          setExpandedExamen={setExpandedExamen}
          expandedExamen={expandedExamen}
        />

        {/* Pestaña: Alumnos */}
        <ApplicationsStudentsHistory
          activeTab={activeTab}
          alumnosMock={alumnosMock}
          setSelectedAlumno={setSelectedAlumno}
          setShowAlumnoModal={setShowAlumnoModal}
          getCinturonColor={getCinturonColor}
        />
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
                      {examen.nombre} - {dateFormatterIntoLong(examen.fecha)}
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
              <Button className="bg-linear-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white">
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
            <div className="flex items-center gap-6 p-4 bg-linear-to-r from-amber-50 to-red-50 rounded-lg border border-gray-200">
              <div className="h-20 w-20 rounded-full bg-linear-to-br from-amber-500 to-red-500 p-1">
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
                              <span className="text-sm text-gray-600">{dateFormatterIntoLong(examen.fecha)}</span>
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