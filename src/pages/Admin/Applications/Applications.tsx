import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import NextExams from "./NextExams/NextExams";
import NextExamDetail from "./NextExams/NextExamDetail";
import ApplyStudents from "./ApplyStudents/ApplyStudents";
import ApplicationsHistory from "./History/ApplicationsHistory";
import ApplicationsStudentsHistory from "./Students/ApplicationsStudentsHistory";
import PostulationForm from "./PostulationForm/PostulationForm";
import ExamDetail from "./History/ExamDetail";
import StudentDetail from "./Students/StudentDetail";
import { applicationsTabs, TabType } from "./ApplicationsTabs";
import TabsComponent from "@/components/tabs/TabsComponent";
import PageTransitionComponent from "@/components/PageTransitionComponent";
import { useUpcomingExams, useAppliedStudents } from "@/hooks/useActivities";
import { useDojoMartialArts } from "@/hooks/useDojos";
import { useApplicationsStore } from "@/stores/applications.store";

// ================ COMPONENTES ================

export default function Applications() {

  const [activeTab, setActiveTab] = useState<TabType>('examenes');
  const [searchTerm, setSearchTerm] = useState('');

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
  const getBeltColor = (grado: string) => {
    const colors: Record<string, string> = {
      'Blanco': 'bg-gray-100 text-gray-800',
      'Amarillo': 'bg-yellow-100 text-yellow-800',
      'Naranja': 'bg-orange-100 text-orange-800',
      'Verde': 'bg-green-100 text-green-800',
      'Azul': 'bg-blue-100 text-blue-800',
      'Marrón': 'bg-yellow-800 text-white',
      'Negro': 'bg-gray-900 text-white',
      'Rojo': 'bg-red-800 text-white',
    };
    return colors[grado] || 'bg-gray-100 text-gray-800';
  };

  const renderSecondaryChildren = () => {
    if (screen === "postulationForm") return <PostulationForm />;
    if (screen === "examDetail") return <ExamDetail />;
    if (screen === "studentDetail") return <StudentDetail />;
    if (screen === "nextExamDetail") return <NextExamDetail />;
    return null;
  };

  return (
    <div className="w-full h-full">

      <PageTransitionComponent
        primaryChildren={
          <div className="p-4">

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
                  className="bg-linear-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-white shadow-md hover:shadow-lg transition-all"
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
                  // setSelectedExamen={setSelectedExamen}
                  isLoading={isLoading}
                />
              )}

              {/* Pestaña: Postulaciones */}
              <ApplyStudents
                activeTab={activeTab}
                appliedStudents={appliedStudents}
                isLoading={isAppliedLoading}
                getBeltColor={getBeltColor}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                martialArtsMap={martialArtsMap}
              />

              {/* Pestaña: Historial */}
              <ApplicationsHistory
                activeTab={activeTab}
                getBeltColor={getBeltColor}
                // martialArtsMap={martialArtsMap}
              />

              {/* Pestaña: Alumnos */}
              <ApplicationsStudentsHistory
                activeTab={activeTab}
                getBeltColor={getBeltColor}
              />
            </div>

          </div>
        }

        secondaryChildren={renderSecondaryChildren()}

        toggle={screen === "postulationForm" || screen === "examDetail" || screen === "studentDetail" || screen === "nextExamDetail"}
      />

    </div>
  );
}
