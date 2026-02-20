import { postDataApi } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useCreateActivity = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (data) => postDataApi("/activities", data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["students"] });
        }
    });
}








