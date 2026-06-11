import { useEffect } from "react";
import StudentListView from "./StudentViews/StudentListView";
import StudentGridView from "./StudentViews/StudentGridView";
import { useStudents } from "@/hooks/useStudents";
import { useFilteredStudents } from "@/hooks/useFilteredStudents";
import { useStudentsStore } from "@/stores/students.store";
import StudentsForm from "./StudentForm/StudentsForm";

import StudentsHeader from "./StudentViews/StudentsHeader";
import StudentsNoResults from "./StudentViews/StudentsNoResults";
import StudentDetailView from "./StudentDetailView/StudentDetailView";
import PageTransitionComponent from "@/components/PageTransitionComponent";

export default function Students() {

  const { data: students = [], isLoading } = useStudents();

  const { viewMode, setViewMode, screen, setScreen } = useStudentsStore();

  const filteredStudents = useFilteredStudents(students);

  useEffect(() => {
    setScreen("list");
  }, []);

  return (

    <div className="w-full h-full">

      <PageTransitionComponent
        primaryChildren={
          <div className="p-4">
            <>
              {/* Header */}
              <StudentsHeader viewMode={viewMode} setViewMode={setViewMode} />

              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-gray-200 border-t-(--redColor)" />
                    <p className="text-sm text-gray-400 animate-pulse">Cargando estudiantes...</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Views */}
                  {viewMode === "list" && (
                    <>
                      <StudentListView filteredStudents={filteredStudents} />
                      {filteredStudents.length !== 0 && (
                        <div className="text-sm text-gray-600 mt-6 text-right">
                          {filteredStudents.length} de {students.length} estudiantes
                        </div>
                      )}
                    </>
                  )}
                  {viewMode === "grid" && (
                    <StudentGridView filteredStudents={filteredStudents} />
                  )}
                  {/* View if no results are found */}
                  {filteredStudents.length === 0 && <StudentsNoResults />}
                </>
              )}

            </>

          </div>

        }

        secondaryChildren={
          <div>

            {screen === "detail" && <div className="h-full overflow-y-auto"><StudentDetailView /></div>}
            {screen === "form" && <div className="h-full overflow-y-auto"><StudentsForm /></div>}

          </div>
        }

        toggle={screen === "detail" || screen === "form"}
      />

    </div>

  );

}



