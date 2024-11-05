import { sendOtp, verifyOtp, resetPassword } from 'api/account/forgotPasswordService';

export const handleGetOtp = async (email, setStep, setTimer, setError) => {
  try {
    await sendOtp(email);
    setError("OTP has been sent to your email.");
    setStep(2);
    setTimer(60);
  } catch (error) {
    console.error("Error sending OTP:", error);
    setError("Failed to send OTP. Please try again.");
  }
};

export const handleVerifyOtp = async (email, otp, timer, setStep, setError) => {
  try {
    if (timer > 0) {
      await verifyOtp(email, otp);
      setError("OTP verified successfully.");
      setStep(3);
    } else {
      setError("Invalid or expired OTP."); 
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    setError("Invalid or expired OTP."); 
  }
};

export const handleResetPassword = async (email, newPassword, rePassword, toggleForm, setError) => {
  if (newPassword !== rePassword) {
    setError("Passwords do not match."); 
    return;
  }

  try {
    await resetPassword(email, newPassword, rePassword);
    setError("Password reset successfully"); 
    toggleForm("signin");
  } catch (error) {
    console.error("Error resetting password:", error);
    setError("Failed to reset password. Please try again.");
  }
};

export const handleClickShowPassword = (showPassword, setShowPassword) => {
  setShowPassword(!showPassword);
};



