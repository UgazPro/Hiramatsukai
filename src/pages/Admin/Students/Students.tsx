import StudentListView from "./StudentViews/StudentListView";
import StudentGridView from "./StudentViews/StudentGridView";

import { useStudents } from "@/hooks/useStudents";
import { useFilteredStudents } from "@/hooks/useFilteredStudents";

import { useStudentsStore } from "@/stores/students.store";

import SpinnerComponent from "@/components/SpinnerComponent";
import DialogComponent from "@/components/dialog/DialogComponent";
import StudentsForm from "./StudentForm/StudentsForm";
import StudentLongCardView from "./StudentViews/StudentLongCardView";
import StudentsFilter from "./StudentFilters/StudentsFilter";
import StudentsHeader from "./StudentViews/StudentsHeader";
import StudentsNoResults from "./StudentViews/StudentsNoResults";
import StudentDetailView from "./StudentDetailView/StudentDetailView";

export default function Students() {

  const { data: students = [], isLoading } = useStudents();

  const { viewMode, setViewMode, resetFilters, usingForm, openForm, screen, finishForm } = useStudentsStore();

  const filteredStudents = useFilteredStudents(students);

  return (

    <div className="relative overflow-hidden">

      <div className={`transition-transform duration-300 ${screen === "list" ? "translate-x-0" : "-translate-x-full"}`}>

        <div className="container mx-auto p-4 md:p-6">

          <>
            {/* Header */}
            <StudentsHeader viewMode={viewMode} setViewMode={setViewMode} openCreateStudent={openForm} />

            {isLoading && <SpinnerComponent />}

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
            <StudentsFilter filteredStudents={filteredStudents} students={students} />

            {/* Views */}
            {viewMode === "list" && (
              <StudentListView filteredStudents={filteredStudents} />
            )}
            {viewMode === "grid" && (
              <StudentGridView filteredStudents={filteredStudents} />
            )}
            {viewMode === "longCards" && (
              <StudentLongCardView filteredStudents={filteredStudents} />
            )}

            {/* View if no results are found */}
            {filteredStudents.length === 0 && <StudentsNoResults resetFilters={resetFilters} openCreateStudent={openForm} />}

          </>

        </div>

      </div>

      <div className={`absolute inset-0 transition-transform duration-300 ${screen === "detail" ? "translate-x-0" : "translate-x-full"}`}>

        {screen === "detail" && <div className="h-full overflow-y-auto"><StudentDetailView /></div>}

      </div>

    </div>


  );

}



