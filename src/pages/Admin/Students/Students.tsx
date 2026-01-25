import StudentListView from "./StudentViews/StudentListView";
import StudentGridView from "./StudentViews/StudentGridView";
import StudentCardView from "./StudentViews/StudentCardView";

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

export default function Students() {

  const { data: students = [], isLoading } = useStudents();

  const { viewMode, setViewMode, resetFilters, isCreateStudentOpen, openCreateStudent, closeCreateStudent } = useStudentsStore();

  const filteredStudents = useFilteredStudents(students);

  return (

    <div className="container mx-auto p-4 md:p-6">

      {isLoading ? (
        <SpinnerComponent />
      ) : (

        <>
          {/* Header */}
          <StudentsHeader viewMode={viewMode} setViewMode={setViewMode} openCreateStudent={openCreateStudent} />

          {/* Form */}
          <DialogComponent
            openDialog={isCreateStudentOpen}
            onClose={closeCreateStudent}
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
          {viewMode === "cards" && (
            <StudentCardView filteredStudents={filteredStudents} />
          )}
          {viewMode === "longCards" && (
            <StudentLongCardView filteredStudents={filteredStudents} />
          )}

          {/* View if no results are found */}
          {filteredStudents.length === 0 && <StudentsNoResults resetFilters={resetFilters} openCreateStudent={openCreateStudent} />}
        </>

      )}

    </div>

  );

}



