import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDataApi, postDataApi, postDataImageApi, putDataApi } from "@/services/api";

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
    mutationFn: ({ id, data, imageFile, }: { id: number; data: any; imageFile?: File | null; }) => {

      if (imageFile) {
        return postDataImageApi(`/users/${id}`, data, imageFile);
      }

      return putDataApi(`/users/${id}`, data);
    },
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
