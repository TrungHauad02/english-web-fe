export const getIdToken = () => {
    const token = sessionStorage.getItem("authToken");
    if (!token) return null;
  
    const payloadBase64 = token.split(".")[1];
    if (!payloadBase64) return null;
  
    try {
      const payload = JSON.parse(atob(payloadBase64));
      return payload.id;
    } catch (error) {
      console.error("Lỗi khi giải mã token:", error);
      return null;
    }
  };
  