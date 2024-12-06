import React from 'react';
import { TextField, Button, Typography } from '@mui/material';
import useColor from "shared/color/Color";

const OtpStep = ({ otp, setOtp, timer, handleVerifyOtp, handleResendOtp }) => {
  const { Color2} = useColor(); 

  return (
    <>
      <TextField
        fullWidth
        variant="outlined"
        label="OTP"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        margin="normal"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleVerifyOtp();
          }
      }}
      />
      <Typography variant="body2" color="textSecondary" align="center">
        Time remaining: {timer} seconds
      </Typography>
      <Button
        fullWidth
        variant="contained"
        style={{ marginTop: 16, backgroundColor: Color2 }} 
        onClick={handleVerifyOtp}
        disabled={timer <= 0}
      >
        Verify OTP
      </Button>
      <Button
        fullWidth
        variant="text"
        color="primary"
        style={{ marginTop: 8 }}
        onClick={handleResendOtp}
        disabled={timer > 0} 
      >
        Resend OTP
      </Button>
    </>
  );
};

export default OtpStep;
