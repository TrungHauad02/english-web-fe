export const getRoleFromToken = () => {
    const token = localStorage.getItem("authToken");
    if (!token) return null;
  
    const payloadBase64 = token.split(".")[1];
    if (!payloadBase64) return null;
  
    try {
      const payload = JSON.parse(atob(payloadBase64));
      return payload.scope; // Sử dụng `scope` để lấy vai trò  
    } catch (error) {
      console.error("Lỗi khi giải mã token:", error);
      return null;
    }
  };
  