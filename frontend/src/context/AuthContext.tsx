import { createContext, useEffect, useState } from "react";
import { type User } from "../types/User";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";

export interface AuthContextType {
  user: User | null,
  setUser: (user: User | null) => void,
  logout: () => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const response = await AuthService.getCurrentUser();
          setUser(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCurrentUser();
  }, [user]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    navigate("/patient-login")
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout}}>
      {children}
    </AuthContext.Provider>
  );
};


