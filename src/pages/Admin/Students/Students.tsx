import StudentListView from "./StudentViews/StudentListView";
import StudentGridView from "./StudentViews/StudentGridView";
import { useStudents } from "@/hooks/useStudents";
import { useFilteredStudents } from "@/hooks/useFilteredStudents";
import { useStudentsStore } from "@/stores/students.store";
import SpinnerComponent from "@/components/spinner/SpinnerComponent";
import DialogComponent from "@/components/dialog/DialogComponent";
import StudentsForm from "./StudentForm/StudentsForm";
import StudentLongCardView from "./StudentViews/StudentLongCardView";
import StudentsFilter from "./StudentFilters/StudentsFilter";
import StudentsHeader from "./StudentViews/StudentsHeader";
import StudentsNoResults from "./StudentViews/StudentsNoResults";
import StudentDetailView from "./StudentDetailView/StudentDetailView";
import PageTransitionComponent from "@/components/PageTransitionComponent";

export default function Students() {

  const { data: students = [], isLoading } = useStudents();

  const { viewMode, setViewMode, usingForm, openForm, screen, finishForm } = useStudentsStore();

  const filteredStudents = useFilteredStudents(students);

  return (

    <div className="w-full h-full">

      
      {isLoading && <SpinnerComponent />}

      <PageTransitionComponent

        primaryChildren={

          <div className="p-4">

            <>
              {/* Header */}
              <StudentsHeader viewMode={viewMode} setViewMode={setViewMode} openCreateStudent={openForm} />

              {/* Form */}
              <DialogComponent
                openDialog={usingForm}
                onClose={finishForm}
                dialogTitle="Nuevo Estudiante"
                children={<StudentsForm />}
                className="max-w-6xl"
                dialogDescription="Complete los campos para agregar un nuevo estudiante al dojo"
              />

              {/* Filter */}
              <StudentsFilter />

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
              {viewMode === "longCards" && (
                <StudentLongCardView filteredStudents={filteredStudents} />
              )}

              {/* View if no results are found */}
              {filteredStudents.length === 0 && <StudentsNoResults openCreateStudent={openForm} />}

            </>

          </div>

        }

        secondaryChildren={
          <div>

            {screen === "detail" && <div className="h-full overflow-y-auto"><StudentDetailView /></div>}

          </div>
        }

        toggle={screen === "detail" ? true : false}
      />

    </div>

  );

}



