import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPaymentMethod, createScheduleDojos, deleteScheduleDojos, getDojoMartialArts, getDojoRanks, getDojos, getDojosInfoApi, getMonthlyPayments, getPaymentMethods, postMonthlyPayments, updateDojoInfo, updateMonthlyPayments, updatePaymentMethod, updateSchedulesDojos } from "@/services/dojos/dojo.service";
import { DojoBody, DojoScheduleBody, IDojo, IDojoInfo, IDojoMartialArts, IDojoRanks } from "@/services/dojos/dojo.interface";
import { MonthlyPaymentBody, MonthlyPayments, PaymentMethodBody, PaymentMethods } from "@/services/dojos/payments.interface";

const upsertById = <T extends { id: number }>(list: T[] = [], newItem: T): T[] => {
  const existingIndex = list.findIndex((item) => item.id === newItem.id);

  if (existingIndex === -1) {
    return [newItem, ...list];
  }

  const next = [...list];
  next[existingIndex] = newItem;
  return next;
};

const isPaymentMethod = (value: unknown): value is PaymentMethods => {
  if (!value || typeof value !== "object") return false;
  const candidate = value as PaymentMethods;

  return (
    typeof candidate.id === "number" &&
    typeof candidate.payment_method === "string"
  );
};

const isMonthlyPayment = (value: unknown): value is MonthlyPayments => {
  if (!value || typeof value !== "object") return false;
  const candidate = value as MonthlyPayments;

  return (
    typeof candidate.id === "number" &&
    typeof candidate.amount === "number"
  );
};

const extractPaymentMethod = (response: unknown): PaymentMethods | null => {
  if (isPaymentMethod(response)) return response;
  if (!response || typeof response !== "object") return null;

  const wrapped = response as { data?: unknown; paymentMethod?: unknown };
  if (isPaymentMethod(wrapped.data)) return wrapped.data;
  if (isPaymentMethod(wrapped.paymentMethod)) return wrapped.paymentMethod;

  return null;
};

const extractMonthlyPayment = (response: unknown): MonthlyPayments | null => {
  if (isMonthlyPayment(response)) return response;
  if (!response || typeof response !== "object") return null;

  const wrapped = response as { data?: unknown; monthlyPayment?: unknown };
  if (isMonthlyPayment(wrapped.data)) return wrapped.data;
  if (isMonthlyPayment(wrapped.monthlyPayment)) return wrapped.monthlyPayment;

  return null;
};

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

type CreateDojoPaymentMethodPayload = PaymentMethodBody;

type CreateDojoMonthlyPaymentPayload = MonthlyPaymentBody;

type UpdateDojoPaymentMethodPayload = {
  id: number;
  paymentMethodData: PaymentMethodBody;
};

type UpdateDojoMonthlyPaymentPayload = {
  id: number;
  monthlyPaymentData: MonthlyPaymentBody;
};

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

export const useCreateDojoPaymentMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (paymentMethodData: CreateDojoPaymentMethodPayload) =>
      createPaymentMethod(paymentMethodData),
    onSuccess: (response) => {
      const createdPaymentMethod = extractPaymentMethod(response);

      if (createdPaymentMethod) {
        queryClient.setQueryData<PaymentMethods[]>(
          ["dojoPaymentMethods"],
          (current = []) => upsertById(current, createdPaymentMethod),
        );
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["dojoPaymentMethods"] });
    },
  });
}

export const useCreateDojoMonthlyPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (monthlyPaymentData: CreateDojoMonthlyPaymentPayload) =>
      postMonthlyPayments(monthlyPaymentData),
    onSuccess: (response) => {
      const createdMonthlyPayment = extractMonthlyPayment(response);

      if (createdMonthlyPayment) {
        queryClient.setQueryData<MonthlyPayments[]>(
          ["dojoMonthlyPayments"],
          (current = []) => upsertById(current, createdMonthlyPayment),
        );
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["dojoMonthlyPayments"] });
    },
  });
}

export const useUpdateDojoPaymentMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, paymentMethodData }: UpdateDojoPaymentMethodPayload) =>
      updatePaymentMethod(id, paymentMethodData),
    onSuccess: (response) => {
      const updatedPaymentMethod = extractPaymentMethod(response);

      if (updatedPaymentMethod) {
        queryClient.setQueryData<PaymentMethods[]>(
          ["dojoPaymentMethods"],
          (current = []) => upsertById(current, updatedPaymentMethod),
        );
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["dojoPaymentMethods"] });
    },
  });
}

export const useUpdateDojoMonthlyPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, monthlyPaymentData }: UpdateDojoMonthlyPaymentPayload) =>
      updateMonthlyPayments(id, monthlyPaymentData),
    onSuccess: (response) => {
      const updatedMonthlyPayment = extractMonthlyPayment(response);

      if (updatedMonthlyPayment) {
        queryClient.setQueryData<MonthlyPayments[]>(
          ["dojoMonthlyPayments"],
          (current = []) => upsertById(current, updatedMonthlyPayment),
        );
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["dojoMonthlyPayments"] });
    },
  });
}





