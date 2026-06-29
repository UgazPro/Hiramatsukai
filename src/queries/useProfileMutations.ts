import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putDataImageApi } from "@/services/api";
import { changePassword } from "@/services/profile/profile.service";

interface UpdateProfileParams {
  data: Record<string, unknown>;
  imageFile?: File | null;
}

export const useUpdateProfile = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ data, imageFile }: UpdateProfileParams) => {
      const payload = { userData: JSON.stringify(data) };
      return putDataImageApi("/users/info", payload, imageFile ?? null);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

interface ChangePasswordParams {
  oldPassword: string;
  password: string;
}

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordParams) => changePassword(data),
  });
};
