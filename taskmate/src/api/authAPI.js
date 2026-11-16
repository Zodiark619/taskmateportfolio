import { authApi } from "./axios";

export const login = async (data) => {
  const response = await authApi.post("/Auth/Login", data);

  return response.data;
};
export const register = async (data) => {
  const response = await authApi.post("/Auth/Register", data);

  return response.data;
};
export const refresh = async () => {
  const response = await authApi.post("/Auth/refresh");

  return response.data;
};

export const logout = async () => {
  const response = await authApi.post("/Auth/logout");

  return response.data;
};
