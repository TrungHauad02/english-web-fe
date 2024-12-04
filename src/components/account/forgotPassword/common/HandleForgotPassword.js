import { sendOtp, verifyOtp, resetPassword } from 'api/account/forgotPasswordService';
import { toast } from 'react-toastify';

export const handleGetOtp = async (email, setStep, setTimer, setIsLoading) => {
  setIsLoading(true);
  try {
    await sendOtp(email);
    toast.success("OTP has been sent to your email.");
    setStep(2);
    setTimer(60);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      toast.error("Email not found. Please check the email address.");
    } else {
      toast.error("Failed to send OTP. Please try again.");
    }
  } finally {
    setIsLoading(false);
  }
};

export const handleVerifyOtp = async (email, otp, timer, setStep) => {
  try {
    if (timer > 0) {
      await verifyOtp(email, otp);
      toast.success("OTP verified successfully.");
      setStep(3);
    } else {
      toast.error("Invalid or expired OTP."); 
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    toast.error("Invalid or expired OTP."); 
  }
};

export const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

export const handleResetPassword = async (email, newPassword, rePassword, toggleForm) => {
  if (newPassword !== rePassword) {
    toast.error("Passwords do not match."); 
    return;
  }

  if (!validatePassword(newPassword)) {
    toast.error(
      "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character."
    );
    return;
  }

  try {
    await resetPassword(email, newPassword, rePassword);
    toast.success("Password reset successfully");
    toggleForm("signin");
  } catch (error) {
    console.error("Error resetting password:", error);
    toast.error("Failed to reset password. Please try again.");
  }
};

export const handleClickShowPassword = (showPassword, setShowPassword) => {
  setShowPassword(!showPassword);
};



