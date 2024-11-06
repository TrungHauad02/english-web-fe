import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));

  // Kiểm tra token trong localStorage khi ứng dụng tải
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthenticated(true); // Cập nhật trạng thái nếu token tồn tại
      setAuthToken(token);
    }
  }, []);

  // Hàm SignIn để cập nhật trạng thái xác thực
  function SignIn(token) {
    setAuthenticated(true); // Đặt trạng thái thành true
    setAuthToken(token);
    localStorage.setItem("authToken", token); // Lưu token vào localStorage
  }  

  function Logout() {
    setAuthenticated(false); // Đặt trạng thái thành false khi đăng xuất
    setAuthToken(null);
    localStorage.removeItem("authToken");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, SignIn, Logout }}>
      {children}
    </AuthContext.Provider>
  );
}
