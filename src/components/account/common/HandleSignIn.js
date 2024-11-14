import { signInUser } from "api/account/signInService";
import { toast } from "react-toastify";

export const handleSignIn = async (email, password, authContext, navigate) => {
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
    toast.error(error.response.data.message);
    }
};
