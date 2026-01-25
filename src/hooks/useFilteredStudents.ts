import { useMemo } from "react";
import { IStudent } from "@/services/users/user.interface";
import { useStudentsStore } from "@/stores/students.store";

export const useFilteredStudents = (students: IStudent[] = []) => {
  
  const { searchTerm, filterDojo, filterRol, filterActivo, } = useStudentsStore();

  return useMemo(() => {
    const searchLower = searchTerm.toLowerCase();

    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchLower) ||
        student.lastName.toLowerCase().includes(searchLower) ||
        student.identification.includes(searchTerm) ||
        student.email.toLowerCase().includes(searchLower) ||
        `${student.name} ${student.lastName}`.toLowerCase().includes(searchLower);

      const matchesDojo =
        filterDojo === "all" || student.dojo.dojo === filterDojo;

      const matchesRol =
        filterRol === "all" || student.rol.rol === filterRol;

      const matchesActivo =
        filterActivo === "all" ||
        (filterActivo === "active" && student.active) ||
        (filterActivo === "inactive" && !student.active);

      return matchesSearch && matchesDojo && matchesRol && matchesActivo;
    });
  }, [students, searchTerm, filterDojo, filterRol, filterActivo]);
};
