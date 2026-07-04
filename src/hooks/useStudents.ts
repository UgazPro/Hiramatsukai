import { useQuery } from "@tanstack/react-query";
import { getRoles, getUserAllInfo, getUsers, getMe } from "@/services/students/student.service";
import { IStudent, IStudentAllInfo } from "@/services/students/student.interface";
import { getUserDataSafe } from "@/helpers/token";

export const useStudents = () => {
  const user = getUserDataSafe();
  const dojoId = user?.dojoId;

  return useQuery({
    queryKey: ["students", dojoId],
    queryFn: () => getUsers(dojoId),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60,
    refetchIntervalInBackground: false,
  });
};

export const useRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
    staleTime: 1000 * 60 * 5,
  });
};

export const useStudentAllInfo = (userId: number | null) => {
  return useQuery<IStudentAllInfo>({
    queryKey: ["studentAllInfo", userId],
    queryFn: () => getUserAllInfo(userId!),
    enabled: Boolean(userId),
    staleTime: 1000 * 60 * 5,
  });
};

export const useMe = () => {
  return useQuery<IStudent>({
    queryKey: ["me"],
    queryFn: getMe,
    staleTime: 1000 * 60 * 5,
  });
};

