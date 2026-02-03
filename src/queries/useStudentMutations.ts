import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postDataApi, postDataImageApi } from "@/services/api";

export const useCreateStudent = () => {

    const qc = useQueryClient();

    return useMutation({
        mutationFn: ({ data, imageFile }: { data: any; imageFile: File }) => postDataImageApi("/users", data, imageFile),
        onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["students"] });
        },
    });
    
};
