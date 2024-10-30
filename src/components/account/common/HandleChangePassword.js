export const handlePasswordChange = (oldPassword,newPassword,reEnterPassword,fakeCurrentPassword,handleClose) => {
    if (oldPassword !== fakeCurrentPassword) {
      alert("Old password is incorrect!");
      return;
    }
    if (newPassword !== reEnterPassword) {
      alert("New passwords do not match!");
      return;
    }
    alert("Password changed successfully!");
    handleClose();
  };
  
  export const handleClickShowNewPassword = (showNewPassword, setShowNewPassword) => {
    setShowNewPassword(!showNewPassword);
  };
  
  export const handleClickShowReEnterPassword = (showReEnterPassword, setShowReEnterPassword) => {
    setShowReEnterPassword(!showReEnterPassword);
  };
  