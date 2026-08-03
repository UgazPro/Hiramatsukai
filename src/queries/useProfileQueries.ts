import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/services/profile/profile.service";
import { transformProfile } from "@/utils/transformProfile";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const raw = await getProfile();
      return transformProfile(raw as any);
    },
    staleTime: 1000 * 60 * 5,
  });
};
