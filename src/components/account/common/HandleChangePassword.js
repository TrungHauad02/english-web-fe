import { changePassword } from "api/user/changePassword";
import handleError from "shared/utils/handleError";

export const handlePasswordChange = async (oldPassword, newPassword, reEnterPassword, setError, handleClose) => {
  try {
    await changePassword(oldPassword, oldPassword);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (newPassword !== reEnterPassword) {
      setError("New passwords do not match!");
      return;
    }
    if (!passwordRegex.test(newPassword)) {
      setError("New password must be at least 9 characters long and include uppercase, lowercase, a number, and a special character.");
      return;
    }

    await changePassword(oldPassword, newPassword);
    setError("");
    alert("Password changed successfully!");
    handleClose();
  } catch (error) {
    handleError(error, setError);
  }
};

export const handleClickShowNewPassword = (showNewPassword, setShowNewPassword) => {
  setShowNewPassword(!showNewPassword);
};

export const handleClickShowReEnterPassword = (showReEnterPassword, setShowReEnterPassword) => {
  setShowReEnterPassword(!showReEnterPassword);
};
