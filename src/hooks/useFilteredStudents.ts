import { useMemo } from "react";
import { IStudent } from "@/services/students/student.interface";
import { useStudentsStore } from "@/stores/students.store";

export const useFilteredStudents = (students: IStudent[] = []) => {
  
  const { searchTerm } = useStudentsStore();

  return useMemo(() => {
    const searchLower = searchTerm.toLowerCase();

    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchLower) ||
        student.lastName.toLowerCase().includes(searchLower) ||
        student.identification.includes(searchTerm) ||
        student.email.toLowerCase().includes(searchLower) ||
        `${student.name} ${student.lastName}`.toLowerCase().includes(searchLower);

      return matchesSearch;
    });
  }, [ students, searchTerm ]);
};
