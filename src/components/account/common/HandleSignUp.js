import { signUpStudent } from "api/account/signUpStudentService";
import { toast } from "react-toastify";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

export const handleClickShowPassword = (showPassword, setShowPassword) => {
  setShowPassword(!showPassword);
};

export const handleSignUp = async (name, email, password, rePassword, toggleForm, emailInputRef) => {
  if (!name || !email || !password || !rePassword) {
    toast.error("Please fill in all fields.");
    return;
  }

  if (!validateEmail(email)) {
    toast.error("Invalid email format. Please enter a valid email address.");
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
    return;
  }

  if (!validatePassword(password)) {
    toast.error(
      "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character."
    );
    return;
  }

  if (password !== rePassword) {
    toast.error("Passwords do not match.");
    return;
  }

  try {
    const data = { 
      name, 
      email, 
      password, 
      role: "STUDENT", 
      startDate: new Date().toISOString().split("T")[0],
    };
    await signUpStudent(data);

    toast.success("Sign up successful!"); 
    toggleForm("signin"); 
  } catch (err) {
    if (err.response) {
      const { status, data } = err.response;

      if (status === 409) {
        toast.error("Email already exists. Please use another email.");
      } else if (status === 401) {
        toast.error("Unauthorized. Please check your credentials.");
      } else {
        toast.error("Sign up failed. Please try again.");
      }
      console.error("Error response:", data);
    } else if (err.request) {
      toast.error("Network error. Please check your internet connection.");
    } else {
      toast.error("An unexpected error occurred.");
      console.error("Unexpected error:", err);
    }
  }
};
