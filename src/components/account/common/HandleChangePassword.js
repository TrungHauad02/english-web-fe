import { changePassword } from "api/user/userService";
import { toast } from "react-toastify";

export const handlePasswordChange = async (oldPassword, newPassword, reEnterPassword, handleClose) => {
  try {
    await changePassword(oldPassword, oldPassword);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (newPassword !== reEnterPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    if (!passwordRegex.test(newPassword)) {
      toast.error("New password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.");
      return;
    }

    await changePassword(oldPassword, newPassword);
    toast.success("Password changed successfully!");
    handleClose();
  } catch (error) {
    console.error("Error details:", error);

    if (error.response) {
      const errorMessage = error.response.data.message || "Unknown error occurred";
      if (errorMessage === "Old password is incorrect") {
        toast.error("Old password is incorrect!");
      } else {
        toast.error(`${errorMessage}`);
      }
    } else if (error.message) {
      toast.error(`Error: ${error.message}`);
    } else {
      toast.error("An unknown error occurred.");
    }
  }
};

export const handleClickShowNewPassword = (showNewPassword, setShowNewPassword) => {
  setShowNewPassword(!showNewPassword);
};

export const handleClickShowReEnterPassword = (showReEnterPassword, setShowReEnterPassword) => {
  setShowReEnterPassword(!showReEnterPassword);
};
