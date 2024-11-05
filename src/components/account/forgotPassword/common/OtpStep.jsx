import React from 'react';
import { TextField, Button, Typography } from '@mui/material';

const OtpStep = ({ otp, setOtp, timer, handleVerifyOtp, handleResendOtp }) => (
  <>
    <TextField
      fullWidth
      variant="outlined"
      label="OTP"
      placeholder="Enter OTP"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
      margin="normal"
    />
    <Typography variant="body2" color="textSecondary" align="center">
      Time remaining: {timer} seconds
    </Typography>
    <Button
      fullWidth
      variant="contained"
      color="primary"
      style={{ marginTop: 16 }}
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
      disabled={timer > 0} // Vô hiệu hóa khi timer > 0
    >
      Resend OTP
    </Button>
  </>
);

export default OtpStep;
