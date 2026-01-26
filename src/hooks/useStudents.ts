import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/users/user.service";

export const useStudents = () => {
  return useQuery({
    queryKey: ["students"],
    queryFn: getUsers,
    staleTime: 1000 * 60 * 5, // 5 min
  });
};




