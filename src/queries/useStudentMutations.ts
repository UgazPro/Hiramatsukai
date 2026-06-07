import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDataApi, postDataApi, postDataImageApi, putDataApi, putDataImageApi } from "@/services/api";

export const useCreateStudent = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ data, imageFile }: { data: any; imageFile: File | null }) => {
      const payload = { userData: JSON.stringify(data) };
      return postDataImageApi("/users", payload, imageFile);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["students"] });
    },
  });
};

export const useUpdateStudent = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ data, imageFile }: { data: any; imageFile: File | null }) => {
      const { id, ...dataWithoutId } = data;
      const payload = { userData: JSON.stringify(dataWithoutId) };
      return putDataImageApi(`/users/${id}`, payload, imageFile);
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
