import { createContext, useContext, useState, useEffect } from "react";
import { getRoleFromToken } from "api/security/GetRoleToken";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [userRole, setUserRole] = useState(getRoleFromToken());

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const expirationTime = localStorage.getItem("tokenExpiration");

    if (token && expirationTime && new Date() < new Date(expirationTime)) {
      setAuthenticated(true);
      setAuthToken(token);
      setUserRole(getRoleFromToken()); 
    } else {
      localStorage.removeItem("authToken");
      localStorage.removeItem("tokenExpiration");
      setAuthenticated(false);
      setAuthToken(null);
      setUserRole(null);
    }
  }, []);

  function SignIn(token) {
    const expirationTime = new Date(Date.now() + 3600 * 1000).toISOString();
    setAuthenticated(true);
    setAuthToken(token);
    localStorage.setItem("authToken", token);
    localStorage.setItem("tokenExpiration", expirationTime);

    setUserRole(getRoleFromToken());
  }

  function Logout() {
    setAuthenticated(false);
    setAuthToken(null);
    setUserRole(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("tokenExpiration");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, SignIn, Logout }}>
      {children}
    </AuthContext.Provider>
  );
}
