import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Stack,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const ChangePassword = ({ open, handleClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showReEnterPassword, setShowReEnterPassword] = useState(false);

  const fakeCurrentPassword = "123"; // Fake current password for validation

  // Handle password change logic
  const handlePasswordChange = () => {
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

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleClickShowReEnterPassword = () => {
    setShowReEnterPassword(!showReEnterPassword);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            label="Old Password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Enter your old password"
            fullWidth
          />
          <TextField
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your new password"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowNewPassword}>
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Re-enter New Password"
            type={showReEnterPassword ? "text" : "password"}
            value={reEnterPassword}
            onChange={(e) => setReEnterPassword(e.target.value)}
            placeholder="Re-enter your new password"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowReEnterPassword}>
                    {showReEnterPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handlePasswordChange}
          >
            Change Password
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
