import { createContext, useEffect, useState } from "react";
import { type User } from "../types/User";
import { jwtDecode } from "jwt-decode";
import type { CustomJwtPayload } from "../types/CustomeJwtPayload";
import { useNavigate } from "react-router-dom";

export interface AuthContextType {
  user: Partial<User> | null;
  setUser: (user: Partial<User> | null) => void;
  logout: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<Partial<User> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const fetchCurrentUser = async () => {
      if (token) {
        try {
          const decoded = jwtDecode<CustomJwtPayload>(token);
          const now = Date.now() / 1000;
          if (decoded.exp < now) {
            logout();
            navigate("/patient-login");
          }
          setUser({
            email: decoded.email,
            fullName: decoded.fullName,
            role: decoded.role,
            status: decoded.status,
            imageUrl: decoded.imageUrl,
            patientId: decoded.patientId
          });
        } catch (error) {
          console.error("Invalid token:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    fetchCurrentUser();
  }, []);

  const logout = () => {
    const token = localStorage.getItem("accessToken");
    let role = null;

    if (token) {
      try {
        const decoded = jwtDecode<CustomJwtPayload>(token);
        role = decoded.role;
      } catch { /* empty */ }
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);

    if (role === "DOCTOR") {
      window.location.href = "/doctor-login";
    } else {
      window.location.href = "/patient-login";
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
