import { signInUser } from "api/account/signInService";

export const handleSignIn = async (email, password, authContext, navigate, setError) => {
  try {
    // Gửi yêu cầu đăng nhập tới backend và nhận token, authenticate, và role
    const response = await signInUser({ email, password });
    const { token, authenticate, role } = response;

    if (!authenticate) {
      throw new Error("Authentication failed");
    }

    localStorage.setItem("authToken", token);

    // Xác thực người dùng trong ngữ cảnh bảo mật (AuthContext)
    authContext.SignIn(token);

    switch (role) {
      case "STUDENT":
        navigate("/student");
        break;
      case "TEACHER":
        navigate("/teacher");
        break;
      case "ADMIN":
        navigate("/admin/teacher");
        break;
      default:
        throw new Error("Invalid role");
    }

    return role; // Trả về role nếu cần
  } catch (error) {
    console.error("Lỗi trong quá trình đăng nhập:", error);
    setError("Email hoặc mật khẩu không đúng. Vui lòng thử lại.");
  }
};