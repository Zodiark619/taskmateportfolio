let accessToken = null;

export const tokenStorage = {
  getAccessToken: () => accessToken,

  setAccessToken: (token) => {
    accessToken = token;
  },

  clearAccessToken: () => {
    accessToken = null;
  },
};
