import { createContext, useContext, useState, useEffect } from "react";
import { getRoleFromToken } from "api/security/GetRoleToken";
import axios from "axios"; 
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(
    !!sessionStorage.getItem("authToken")
  );
  const [authToken, setAuthToken] = useState(sessionStorage.getItem("authToken"));
  const [userRole, setUserRole] = useState(() => getRoleFromToken());

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    const expirationTime = sessionStorage.getItem("tokenExpiration");

    if (token && expirationTime && new Date() < new Date(expirationTime)) {
      setAuthenticated(true);
      setAuthToken(token);
      setUserRole(getRoleFromToken());
    } else {
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("tokenExpiration");
      setAuthenticated(false);
      setAuthToken(null);
      setUserRole(null);
    }
  }, [authToken]);

  function SignIn(token) {
    const expirationTime = new Date(Date.now() + 9800 * 1000).toISOString();
    setAuthenticated(true);
    setAuthToken(token);
    sessionStorage.setItem("authToken", token);
    sessionStorage.setItem("tokenExpiration", expirationTime);
    setUserRole(getRoleFromToken());
    toast.success("Login successfully")
  }

  function Logout() {
    setAuthenticated(false);
    setAuthToken(null);
    setUserRole(null);
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("tokenExpiration");
    Cookies.remove('JSESSIONID'); 
    toast.info("Logout");
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
