import { useQuery } from "@tanstack/react-query";
import { getDojos } from "@/services/dojos/dojo.service";
import { IDojo } from "@/services/dojos/dojo.interface";

export const useDojos = () => {
  return useQuery<IDojo[]>({
    queryKey: ["dojos"],
    queryFn: getDojos,
    staleTime: 1000 * 60 * 5, // 5 min
  });
}





