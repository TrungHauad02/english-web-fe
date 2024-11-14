import { changePassword } from "api/user/userService";
import { toast } from "react-toastify";

export const handlePasswordChange = async (oldPassword, newPassword, reEnterPassword, handleClose) => {
  try {
    // Giả sử kiểm tra mật khẩu cũ thành công
    await changePassword(oldPassword, oldPassword);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (newPassword !== reEnterPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    if (!passwordRegex.test(newPassword)) {
      toast.error("New password must be at least 9 characters long and include uppercase, lowercase, a number, and a special character.");
      return;
    }

    await changePassword(oldPassword, newPassword);
    toast.success("Password changed successfully!");
    handleClose();
  } catch (error) {
    toast.error("An error occurred while changing the password.");
  }
};

export const handleClickShowNewPassword = (showNewPassword, setShowNewPassword) => {
  setShowNewPassword(!showNewPassword);
};

export const handleClickShowReEnterPassword = (showReEnterPassword, setShowReEnterPassword) => {
  setShowReEnterPassword(!showReEnterPassword);
};
