import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  login as loginAPI,
  logout as logoutAPI,
} from "../api/authAPI";

import { refreshOnce } from "../utils/refreshManager";
import { tokenStorage } from "../utils/tokenStorage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState(null);

  // Restore authentication when application starts
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const data = await refreshOnce();

        tokenStorage.setAccessToken(data.accessToken);
        setUsername(data.username);
        setIsAuthenticated(true);
      } catch (error) {
        tokenStorage.clearAccessToken();
        setIsAuthenticated(false);
        setUsername(null);

        if (error.response?.status !== 401) {
          console.error("Authentication initialization failed:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login
  const login = async (credentials) => {
    const data = await loginAPI(credentials);

    tokenStorage.setAccessToken(data.accessToken);
    setUsername(data.username);
    setIsAuthenticated(true);

    return data;
  };

  // Logout
  const logout = async () => {
    try {
      await logoutAPI();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      tokenStorage.clearAccessToken();
      setUsername(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        username,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
