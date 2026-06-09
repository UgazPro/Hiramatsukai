import { IStudent } from "@/services/students/student.interface";
import { useStudentsStore } from "@/stores/students.store";
import { useDeleteStudent } from "@/queries/useStudentMutations";
import { TableComponent } from "@/components/table/TableComponent";
import { getStudentColumns } from "@/services/students/student.tables";

interface StudentListViewProps {
    filteredStudents: IStudent[];
}

export default function StudentListView({ filteredStudents }: StudentListViewProps) {

    const { startEdit } = useStudentsStore();

    const selectStudent = useStudentsStore((state) => state.selectStudent);

    const { mutateAsync: deleteStudent } = useDeleteStudent();

    const columns = getStudentColumns({ startEdit, deleteStudent, });

    return (

        <div className="rounded-lg border border-gray-300 shadow-sm overflow-hidden bg-white">

            <TableComponent
                data={filteredStudents}
                columns={columns}
                onRowClick={(student) => {
                    selectStudent(student);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }}
            />

        </div>

    );

}






