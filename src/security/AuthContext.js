import { createContext, useContext, useState, useEffect } from "react";
import { getRoleFromToken } from "api/security/GetRoleToken";
import axios from "axios"; 
import { toast } from "react-toastify";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [userRole, setUserRole] = useState(() => getRoleFromToken());

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
  }, [authToken]);

  function SignIn(token) {
    const expirationTime = new Date(Date.now() + 9800 * 1000).toISOString();
    setAuthenticated(true);
    setAuthToken(token);
    localStorage.setItem("authToken", token);
    localStorage.setItem("tokenExpiration", expirationTime);
    setUserRole(getRoleFromToken());
    toast.success("Login successfully")
  }

  function Logout() {
    setAuthenticated(false);
    setAuthToken(null);
    setUserRole(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("tokenExpiration");
    toast.info("you are logged out")
  }

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          toast.error("Token has expired, please log in again!");
          Logout();
          return Promise.resolve(); 
        }
        return Promise.reject(error);
      }
    );
  
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);   

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, SignIn, Logout }}>
      {children}
    </AuthContext.Provider>
  );
}
