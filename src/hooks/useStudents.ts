import { useQuery } from "@tanstack/react-query";
import { getRoles, getUsers } from "@/services/students/student.service";

export const useStudents = () => {
  return useQuery({
    queryKey: ["students"],
    queryFn: getUsers,
    staleTime: 1000 * 60 * 5,
  });
};

export const useRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
    staleTime: 1000 * 60 * 5,
  });
};





