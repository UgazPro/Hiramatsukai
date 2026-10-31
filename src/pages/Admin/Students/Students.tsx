import { useEffect } from "react";
import StudentListView from "./StudentViews/StudentListView";
import StudentGridView from "./StudentViews/StudentGridView";
import { useStudents } from "@/hooks/useStudents";
import { useFilteredStudents } from "@/hooks/useFilteredStudents";
import { useStudentsStore } from "@/stores/students.store";
import StudentsForm from "./StudentForm/StudentsForm";

import StudentsHeader from "./StudentViews/StudentsHeader";
import StudentsNoResults from "./StudentViews/StudentsNoResults";
import StudentsSkeleton from "./StudentViews/StudentsSkeleton";
import StudentDetailView from "./StudentDetailView/StudentDetailView";
import PageTransitionComponent from "@/components/PageTransitionComponent";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function Students() {

  const dojoFilter = useStudentsStore((state) => state.dojoFilter);

  const { data: students = [], isLoading } = useStudents(dojoFilter);

  const { viewMode, setViewMode, screen, setScreen } = useStudentsStore();

  const filteredStudents = useFilteredStudents(students);

  const isMobile = useMediaQuery("(max-width: 639px)");

  useEffect(() => {
    setScreen("list");
  }, []);

  useEffect(() => {
    if (isMobile) setViewMode("grid");
  }, [isMobile, setViewMode]);

  return (

    <div className="w-full h-full">

      <PageTransitionComponent
        primaryChildren={
          <div className="p-3 sm:p-4 md:p-6">
            <>
              {/* Header */}
              <StudentsHeader viewMode={viewMode} setViewMode={setViewMode} />

              {isLoading ? (
                <StudentsSkeleton />
              ) : (
                <>
                  {/* Views */}
                  {viewMode === "list" && (
                    <>
                      <StudentListView filteredStudents={filteredStudents} />
                      {filteredStudents.length !== 0 && (
                        <div className="mt-6 text-right text-sm text-muted-foreground">
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



