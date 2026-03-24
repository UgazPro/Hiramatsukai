import { useQuery } from "@tanstack/react-query";
import { getDojoMartialArts, getDojoRanks, getDojos, getDojosInfoApi } from "@/services/dojos/dojo.service";
import { IDojo, IDojoInfo, IDojoMartialArts, IDojoRanks } from "@/services/dojos/dojo.interface";

export const useDojos = () => {
  return useQuery<IDojo[]>({
    queryKey: ["dojos"],
    queryFn: getDojos,
    staleTime: 1000 * 60 * 5, // 5 min
  });
}

export const useDojosInfo = (code: string) => {
  return useQuery<IDojoInfo>({
    queryKey: ["dojosInfo", code],
    queryFn: () => getDojosInfoApi(code),
    staleTime: 1000 * 60 * 5, // 5 min
  });
}

export const useDojoMartialArts = () => {
  return useQuery<IDojoMartialArts[]>({
    queryKey: ["dojoMartialArts"],
    queryFn: getDojoMartialArts,
    staleTime: 1000 * 60 * 5,
  });
}

export const useDojoRanks = () => {
  return useQuery<IDojoRanks[]>({
    queryKey: ["dojoRanks"],
    queryFn: getDojoRanks,
    staleTime: 1000 * 60 * 5,
  });
}





