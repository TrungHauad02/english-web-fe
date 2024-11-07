import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));

  // Kiểm tra token và thời gian hết hạn khi ứng dụng tải
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const expirationTime = localStorage.getItem("tokenExpiration");

    if (token && expirationTime && new Date() < new Date(expirationTime)) {
      setAuthenticated(true);
      setAuthToken(token);
    } else {
      // Nếu hết hạn, xóa token và cập nhật trạng thái
      localStorage.removeItem("authToken");
      localStorage.removeItem("tokenExpiration");
      setAuthenticated(false);
      setAuthToken(null);
    }
  }, []);

  // Hàm SignIn để cập nhật trạng thái xác thực và thời gian hết hạn
  function SignIn(token) {
    const expirationTime = new Date(Date.now() + 3600 * 1000).toISOString(); // Thời hạn 1 giờ
    setAuthenticated(true);
    setAuthToken(token);
    localStorage.setItem("authToken", token);
    localStorage.setItem("tokenExpiration", expirationTime);
  }

  function Logout() {
    setAuthenticated(false);
    setAuthToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("tokenExpiration");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, SignIn, Logout }}>
      {children}
    </AuthContext.Provider>
  );
}
