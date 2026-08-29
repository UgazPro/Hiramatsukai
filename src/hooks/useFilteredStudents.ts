import { useMemo } from "react";
import { IStudent } from "@/services/students/student.interface";
import { useStudentsStore } from "@/stores/students.store";
import { getSorted } from "@/helpers/sort";

export const useFilteredStudents = (students: IStudent[] = []) => {
  
  const { searchTerm, sort } = useStudentsStore();

  return useMemo(() => {
    const searchLower = searchTerm.toLowerCase();

    const filtered = students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchLower) ||
        student.lastName.toLowerCase().includes(searchLower) ||
        student.identification.includes(searchTerm) ||
        student.email.toLowerCase().includes(searchLower) ||
        `${student.name} ${student.lastName}`.toLowerCase().includes(searchLower);

      return matchesSearch;
    });

    return getSorted(filtered, sort);
  }, [ students, searchTerm, sort ]);
};