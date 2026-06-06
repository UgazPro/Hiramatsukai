import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
import PostulationForm from "./PostulationForm/PostulationForm";
import ExamDetail from "./History/ExamDetail";
import { applicationsTabs, TabType } from "./ApplicationsTabs";
import TabsComponent from "@/components/tabs/TabsComponent";
import PageTransitionComponent from "@/components/PageTransitionComponent";
import { dateFormatterIntoLong } from "@/helpers/formatter";
import { useUpcomingExams, useAppliedStudents } from "@/hooks/useActivities";
import { useDojoMartialArts } from "@/hooks/useDojos";
import { useApplicationsStore } from "@/stores/applications.store";

// ================ DATOS DE EJEMPLO ================
const alumnosMock = [
  { id: 1, nombre: "Juan", apellido: "Pérez", cedula: "12345678", gradoActual: "Verde", gradoActualColor: "bg-green-500" },
  { id: 2, nombre: "María", apellido: "Gómez", cedula: "87654321", gradoActual: "Azul", gradoActualColor: "bg-blue-500" },
  { id: 3, nombre: "Carlos", apellido: "Rodríguez", cedula: "45678912", gradoActual: "Amarillo", gradoActualColor: "bg-yellow-500" },
  { id: 4, nombre: "Ana", apellido: "López", cedula: "32165498", gradoActual: "Naranja", gradoActualColor: "bg-orange-500" },
  { id: 5, nombre: "Luis", apellido: "Martínez", cedula: "78912345", gradoActual: "Marrón", gradoActualColor: "bg-amber-800" },
  { id: 6, nombre: "Laura", apellido: "Fernández", cedula: "23456789", gradoActual: "Rojo", gradoActualColor: "bg-red-500" },
];

const examenesEstudiante: any[] = [];

// ================ COMPONENTES ================

export default function Applications() {

  const [activeTab, setActiveTab] = useState<TabType>('examenes');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExamen, setSelectedExamen] = useState<any>(null);
  const [selectedAlumno, setSelectedAlumno] = useState<any>(null);
  const [showAlumnoModal, setShowAlumnoModal] = useState(false);

  const { screen, openPostulationForm } = useApplicationsStore();
  const { upcomingExams, isLoading } = useUpcomingExams();
  const { appliedStudents, isLoading: isAppliedLoading } = useAppliedStudents();
  const { data: martialArts = [] } = useDojoMartialArts();

  const martialArtsMap = useMemo(() => {
    const map: Record<number, string> = {};
    for (const ma of martialArts) {
      map[ma.id] = ma.martialArt;
    }
    return map;
  }, [martialArts]);

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
    <div className="w-full h-full">

      <PageTransitionComponent
        primaryChildren={
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
                  className="bg-linear-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white shadow-md hover:shadow-lg transition-all"
                  onClick={() => openPostulationForm()}
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
                  upcomingExams={upcomingExams}
                  setSelectedExamen={setSelectedExamen}
                  isLoading={isLoading}
                />
              )}

              {/* Pestaña: Postulaciones */}
              <ApplyStudents
                activeTab={activeTab}
                appliedStudents={appliedStudents}
                isLoading={isAppliedLoading}
                getCinturonColor={getCinturonColor}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                martialArtsMap={martialArtsMap}
              />

              {/* Pestaña: Historial */}
              <ApplicationsHistory
                activeTab={activeTab}
                getCinturonColor={getCinturonColor}
                martialArtsMap={martialArtsMap}
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

          </div>
        }

        secondaryChildren={
          screen === "postulationForm" ? <PostulationForm /> : <ExamDetail />
        }

        toggle={screen === "postulationForm" || screen === "examDetail"}
      />

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
              {examenesEstudiante.length === 0 && (
                <p className="text-gray-500 text-sm">No hay exámenes registrados para este alumno.</p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
