import { postDataApi, putDataApi } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useCreateActivity = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (data) => postDataApi("/activities", data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["activities"] });
        }
    });
}

export const useUpdateActivity = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => putDataApi(`/activities/${data.id}`, data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["activities"] });
        }
    });
}










