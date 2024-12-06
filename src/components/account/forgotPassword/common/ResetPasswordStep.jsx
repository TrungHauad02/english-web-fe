import React from 'react';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useColor from "shared/color/Color";

const ResetPasswordStep = ({
  newPassword,
  setNewPassword,
  rePassword,
  setRePassword,
  showPassword,
  handleClickShowPassword,
  handleResetPassword,
}) => {
  const {Color2} = useColor(); 

  return (
    <>
      <TextField
        fullWidth
        variant="outlined"
        label="New Password"
        type={showPassword ? 'text' : 'password'}
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleResetPassword();
          }
      }}
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Re-enter Password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Re-enter Password"
        value={rePassword}
        onChange={(e) => setRePassword(e.target.value)}
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleResetPassword();
          }
      }}
      />
      <Button
        fullWidth
        variant="contained"
        style={{
          marginTop: 16,
          backgroundColor: Color2, 
        }}
        onClick={handleResetPassword}
      >
        Reset Password
      </Button>
    </>
  );
};

export default ResetPasswordStep;
