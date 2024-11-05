import apiClient from "api/apiClient";

export async function sendOtp(email) {
  try {
    const res = await apiClient.post("/users/forgot-password/send-otp", { email });
    return res.data; 
  } catch (err) {
    console.error("Error sending OTP:", err);
    throw err; 
  }
}

export async function verifyOtp(email, otp) {
  try {
    const res = await apiClient.post("/users/forgot-password/verify-otp", { email, otp });
    return res.data; 
  } catch (err) {
    console.error("Error verifying OTP:", err);
    throw err; 
  }
}

export async function resetPassword(email, newPassword, confirmPassword) {
  try {
    const res = await apiClient.post("/users/forgot-password/reset-password", {
      email,
      newPassword,
      confirmPassword,
    });
    return res.data;
  } catch (err) {
    console.error("Error resetting password:", err);
    throw err;
  }
}
