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
    const data = { name, email, password, role: "STUDENT" };
    await signUpStudent(data);

    toast.success("Sign Up successful!"); 
    toggleForm("signin"); 
  } catch (error) {
    toast.error("Sign Up failed. Please try again."); 
  }
};
