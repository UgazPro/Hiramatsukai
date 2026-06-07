import { useQuery } from "@tanstack/react-query";
import { getRoles, getUsers } from "@/services/students/student.service";
import { getUserDataSafe } from "@/helpers/token";

export const useStudents = () => {
  const user = getUserDataSafe();
  const dojoId = user?.dojoId;

  return useQuery({
    queryKey: ["students", dojoId],
    queryFn: () => getUsers(dojoId),
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





