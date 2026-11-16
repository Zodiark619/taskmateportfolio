import { useMutation } from "@tanstack/react-query";

import { login } from "../api/authAPI";
import { tokenStorage } from "../utils/tokenStorage";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      tokenStorage.setAccessToken(data.accessToken);
    },
  });
};
