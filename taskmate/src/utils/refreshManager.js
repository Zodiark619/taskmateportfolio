import { refresh } from "../api/authAPI";

let refreshPromise = null;

export const refreshOnce = () => {
  if (!refreshPromise) {
    refreshPromise = refresh().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};
