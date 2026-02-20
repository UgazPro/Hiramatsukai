import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDataApi, postDataApi, postDataImageApi, putDataApi, putDataImageApi } from "@/services/api";

export const useCreateStudent = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ data, imageFile }: { data: any; imageFile: File | null }) =>
    postDataImageApi("/users", data, imageFile),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["students"] });
    },
  });
};

export const useUpdateStudent = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ data, imageFile }: { data: any; imageFile: File | null }) =>
    putDataImageApi(`/users/${data.id}`, data, imageFile),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["students"] });
    },
  });
};

export const useDeleteStudent = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteDataApi("/users", id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["students"] });
    },
  });
};
