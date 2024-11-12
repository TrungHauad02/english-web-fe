import { signInUser } from "api/account/signInService";

export const handleSignIn = async (email, password, authContext, navigate, setError) => {
  try {
    const response = await signInUser({ email, password });
    const { token, authenticate, role } = response;

    if (!authenticate) {
      throw new Error("Authentication failed");
    }

    localStorage.setItem("authToken", token);

    authContext.SignIn(token);

    switch (role) {
      case "STUDENT":
        navigate("/student");
        break;
      case "TEACHER":
        navigate("/teacher");
        break;
      case "ADMIN":
        navigate("/admin");
        break;
      default:
        throw new Error("Invalid role");
    }

    return role;
  } catch (error) {
    setError("Email hoặc mật khẩu không đúng. Vui lòng thử lại.");
  }
};
