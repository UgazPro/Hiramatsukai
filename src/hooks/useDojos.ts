import { useQuery } from "@tanstack/react-query";
import { getDojos } from "@/services/dojos/dojo.service";

export const useDojos = () => {
  return useQuery({
    queryKey: ["dojos"],
    queryFn: getDojos,
    staleTime: 1000 * 60 * 10, // 10 min
  });
}

