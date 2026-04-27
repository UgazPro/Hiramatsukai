import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createScheduleDojos, deleteScheduleDojos, getDojoMartialArts, getDojoRanks, getDojos, getDojosInfoApi, getMonthlyPayments, getPaymentMethods, updateDojoInfo, updateSchedulesDojos } from "@/services/dojos/dojo.service";
import { DojoBody, DojoScheduleBody, IDojo, IDojoInfo, IDojoMartialArts, IDojoRanks } from "@/services/dojos/dojo.interface";
import { MonthlyPayments, PaymentMethods } from "@/services/dojos/payments.interface";

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
    enabled: Boolean(code),
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

type CreateDojoSchedulesPayload = {
  dojoId: number;
  schedules: DojoScheduleBody[];
}

type UpdateDojoSchedulesPayload = {
  dojoId: number;
  schedules: DojoScheduleBody[];
}

type DeleteDojoSchedulePayload = {
  scheduleId: number;
}

type UpdateDojoInfoPayload = {
  dojoId: number;
  dojoInfo: DojoBody;
}

export const useCreateDojoSchedules = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dojoId, schedules }: CreateDojoSchedulesPayload) =>
      createScheduleDojos(dojoId, schedules),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dojosInfo"] });
    },
  });
}

export const useUpdateDojoSchedules = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dojoId, schedules }: UpdateDojoSchedulesPayload) =>
      updateSchedulesDojos(dojoId, schedules),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dojosInfo"] });
    },
  });
}

export const useDeleteDojoSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ scheduleId }: DeleteDojoSchedulePayload) =>
      deleteScheduleDojos(scheduleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dojosInfo"] });
    },
  });
}

export const useUpdateDojoInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dojoId, dojoInfo }: UpdateDojoInfoPayload) =>
      updateDojoInfo(dojoId, dojoInfo),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["dojos"] });
      queryClient.invalidateQueries({ queryKey: ["dojosInfo", variables.dojoInfo.code] });
      queryClient.invalidateQueries({ queryKey: ["dojosInfo"] });
    },
  });
}

export const useDojoPaymentMethods = () => {
  return useQuery<PaymentMethods[]>({
    queryKey: ["dojoPaymentMethods"],
    queryFn: getPaymentMethods,
    staleTime: 1000 * 60 * 5,
  });
}

export const useDojoMonthlyPayments = () => {
  return useQuery<MonthlyPayments[]>({
    queryKey: ["dojoMonthlyPayments"],
    queryFn: getMonthlyPayments,
    staleTime: 1000 * 60 * 5,
  });
}





