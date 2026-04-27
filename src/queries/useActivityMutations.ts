import { IActivityCreate } from "@/services/activities/activity.interface";
import { deleteDataApi, postDataApi, putDataApi } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useCreateActivity = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (data: IActivityCreate) => postDataApi("/activities", data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["activities"] });
        }
    });
}

export const useUpdateActivity = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data } : {id: number, data: IActivityCreate}) => putDataApi(`/activities/${id}`, data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["activities"] });
        }
    });
}

export const useDeleteActivity = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteDataApi("/activities", id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["activities"] });
    },
  });
};










