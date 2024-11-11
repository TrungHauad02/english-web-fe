import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, TextField, Button, Stack, IconButton, InputAdornment, Typography} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { handlePasswordChange, handleClickShowNewPassword, handleClickShowReEnterPassword } from "./common/HandleChangePassword";

const ChangePassword = ({ open, handleClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showReEnterPassword, setShowReEnterPassword] = useState(false);
  const [error, setError] = useState("");

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
        {error && (
            <Typography color="error" align="center" mb={2}>
              {error}
            </Typography>
          )}
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
                  <IconButton
                    onClick={() =>
                      handleClickShowNewPassword(
                        showNewPassword,
                        setShowNewPassword
                      )
                    }
                  >
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
                  <IconButton
                    onClick={() =>
                      handleClickShowReEnterPassword(
                        showReEnterPassword,
                        setShowReEnterPassword
                      )
                    }
                  >
                    {showReEnterPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              handlePasswordChange(oldPassword, newPassword, reEnterPassword, setError, handleClose)
            }
          >
            Change Password
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
